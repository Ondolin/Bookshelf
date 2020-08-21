<template>
  <div class="bg-popup overflow-auto fixed w-screen h-screen top-0 left-0 z-20 p-4 md:p-6 animate__animated animate__fadeIn animate__faster" v-if="active">
    <div class="relative bg-primary max-w-xl mx-auto p-4 md:p-6 rounded-lg shadow-2xl animate__animated animate__fadeInDown animate__faster">

      <!-- Header in case it is used -->
      <h2 class="text-2xl tracking-wider select-none" v-if="title">{{title}}</h2>

      <div class="w-24 mt-2 h-px bg-accent mb-4"/>

      <slot/>

      <!-- Close icon in the top right -->
      <div v-if="clearStoreAfterClosing !== true" class="absolute top-0 right-0 w-16 h-16 flex justify-center items-center" @click="active = false">
        <img src="icon-close.png" class="w-5 h-5 invert-effect"/>
      </div>

      <div v-if="clearStoreAfterClosing === true" class="absolute top-0 right-0 w-16 h-16 flex justify-center items-center" @click="clearStore()">
        <img src="icon-close.png" class="w-5 h-5 invert-effect"/>
      </div>

    </div>
  </div>
</template>
<script>
  import "animate.css/animate.min.css";

  export default {
    data() {
      return {
        active: false
      }
    },
    props: ["title", "clearStoreAfterClosing"],
    methods: {
      clearStore() {
        this.$root.$emit('closeScanBookPopup');
      }
    }
  }
</script>

