<template>
  <div class="gmap">
    <div class="google-map" id="map"></div>
  </div>
</template>

<script>
import db from '@/firebase/init'

export default {
  name: 'Gmap',
  data () {
    return {
      lat: 53,
      lng: -2,
      center: { lat: this.lat, lng: this.lng }
    }
  },
  methods: {
    renderMap () {
      const map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: this.lat, lng: this.lng },
        zoom: 6,
        maxZoom: 50,
        minZoom: 2,
        streetViewControl: false
      })

      db.firestore().collection('users').get()
        .then((users) => {
          users.docs.forEach(doc => {
            let data = doc.data()
            if (data.geolocation) {
              let marker = new google.maps.Marker({
                position: {
                  lat: data.geolocation.lat,
                  lng: data.geolocation.lng
                },
                map: map
              })
              marker.addListener('click', () => {
                this.$router.push({ name: 'ViewProfile', params: { id: doc.id } })
              })
            }
          })
        })
      return map
    }
  },
  mounted () {
    let user = db.auth().currentUser

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(pos => {
        this.lat = pos.coords.latitude
        this.lng = pos.coords.longitude
        db.firestore().collection('users').where('user_id', '==', user.uid).get()
          .then(snapshot => {
            snapshot.forEach(doc => {
              db.firestore().collection('users').doc(doc.id).update({
                geolocation: {
                  lat: pos.coords.latitude,
                  lng: pos.coords.longitude
                }
              })
            })
          }).then(() => {
            this.renderMap()
          })
      }, (err) => {
        alert(err)
        this.renderMap()
      }, { maximumAge: 60000, timeout: 3000 })
    } else {
      this.renderMap()
    }
  },
  metaInfo: {
    title: 'Gmap'
  }
}
</script>

<style>
  .google-map {
    width: 100%;
    height: 100%;
    margin: 0 auto;
    background: #fff;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
  }
</style>
