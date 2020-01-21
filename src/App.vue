<template>
  <div id="app">
    <Navbar />
    <router-view/>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'

export default {
  name: 'App',
  components: {
    Navbar
  },
  metaInfo: {
    title: '',
    titleTemplate: '%s - Geo Kirchers'
  }
}
</script>

<style>
 body {
   background: #ddd;
 }
</style>
