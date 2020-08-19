<template>
  <div class="text-white">
    <div class="w-screen min-h-screen bg-primary ">
      <nuxt />

    </div>

    <Footer />
  </div>
</template>

<script>
  import Footer from '../components/Footer';

  export default {
    components: { Footer }
  }
</script>

<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  overflow-x: hidden;
}
</style>
