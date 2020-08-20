<template>
  <div class="bg-accent rounded-full fixed right-0 bottom-0 m-8 w-12 h-12 hover:bg-accent-light select-none animate__animated animate__fadeInUp animate__delay-1s" v-if="$store.state.user.user != null" @click="openAddBookPopup">
    <div class="w-full h-full flex justify-center items-center text-5xl font-bold">
      <img src="icon-plus.png" class="w-8 h-8 invert-effect"/>
    </div>
  </div>
</template>
<script>
  export default {
    methods: {
      openAddBookPopup() {
        this.$root.$emit('openAddBookPopup');
      }
    }
  }
</script>
