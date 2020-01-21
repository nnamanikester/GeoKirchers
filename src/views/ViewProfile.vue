<template>
  <div class="view-profile container">
    <div class="card" v-if="profile">
      <h2 class="center deep-purple-text">{{ profile.alias }}'s Wall</h2>
      <ul class="comments collection">
        <li v-for="(comment, index) in comments" :key="index">
          <div class="deep-purple-text capitalize from" v-if="user.alias === comment.from">You</div>
          <div class="deep-purple-text capitalize from" v-else>{{ comment.from }}</div>
          <div class="grey-text text-darken-3 content">{{ comment.content }}</div>
          <div class="grey-text time">{{ comment.timestamp }}</div>
        </li>
      </ul>
      <form @submit.prevent="addComment">
        <div class="field">
          <label for="comment">Add a Comment: </label>
          <input type="text" v-model="newComment" name="comment">
          <p class="red-text" v-if="feedback">{{ feedback }}</p>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import db from '@/firebase/init'
import moment from 'moment'

export default {
  name: 'ViewProfile',
  data () {
    return {
      profile: null,
      newComment: null,
      feedback: null,
      user: null,
      comments: []
    }
  },
  methods: {
    addComment () {
      if (this.newComment) {
        this.feedback = null
        db.firestore().collection('comments').add({
          content: this.newComment,
          to: this.$route.params.id,
          from: this.user.alias,
          timestamp: Date.now()
        })
          .then(() => {
            this.newComment = null
          })
      } else {
        this.feedback = 'You must enter a comment to submit!'
      }
    }
  },
  created () {
    let ref = db.firestore().collection('users')

    // get user data
    ref.where('user_id', '==', db.auth().currentUser.uid).get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          this.user = doc.data()
          this.user.id = doc.id
        })
      })

    // Get profile data
    ref.doc(this.$route.params.id).get()
      .then(user => {
        this.profile = user.data()
        this.profile.id = user.id
      })

    // get comments
    db.firestore().collection('comments').where('to', '==', this.$route.params.id).onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        if (change.type === 'added') {
          this.comments.unshift({
            from: change.doc.data().from,
            content: change.doc.data().content,
            timestamp: moment(change.doc.data().timestamp).format('lll')
          })
        }
      })
    })
  },
  metaInfo: {
    title: 'View Profile'
  }
}
</script>

<style>
  .view-profile .card {
    padding: 20px;
    margin-top: 60px;
  }
  .view-profile h2 {
    text-transform: capitalize;
    font-size: 2em;
    margin-top: 0;
  }
  .view-profile li {
    padding: 10px;
    border-bottom: 1px solid #eee;
  }
  .view-profile {
    max-width: 600px;
  }
  .view-profile .time {
    font-size: 0.8em;
    font-style: italic;
  }
  .view-profile .from {
    font-weight: 700;
    text-transform: capitalize;
  }
</style>
