<template>
  <div class="navbar">
    <nav class="deep-purple darken-1">
      <div class="container">
        <router-link class="left" :to="{ name: 'Gmap' }">GeoKirchers!</router-link>
        <ul class="right">
          <li v-if="!user"><router-link :to="{ name: 'Signup' }">Signup</router-link></li>
          <li v-if="!user"><router-link :to="{ name: 'Login' }">Login</router-link></li>
          <li v-if="user"><a>{{ user.email }}</a></li>
          <li v-if="user"><a href="#" @click="logout">Logout</a></li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
import db from '@/firebase/init'

export default {
  name: 'Navbar',
  data () {
    return {
      user: null
    }
  },
  methods: {
    logout () {
      if (db.auth().currentUser) {
        db.auth().signOut()
          .then(() => {
            this.$router.push({ name: 'Login' })
          })
          .catch(err => {
            alert(err)
          })
      } else {
        return;
      }
    }
  },
  created () {
    db.auth().onAuthStateChanged((user) => {
      if (user) {
        this.user = user
      } else {
        this.user = null
      }
    })
  }
}
</script>

<style>

</style>
