<template>
  <div>
    <div id="quagga"></div>
    <div v-for="code in codes" class="block">
      {{code}}
    </div>
  </div>
</template>
<script>
  import Quagga from '@ericblade/quagga2';

  export default {
    data() {
      return {
        codes: []
      }
    },
    mounted () {
      Quagga.init({
        inputStream : {
          name : "Live",
          type : "LiveStream",
          target: document.querySelector('#quagga')    // Or '#yourElement' (optional)
        },
        decoder : {
          readers : ["ean_reader"]
        }
      }, function(err) {
        if (err) {
          console.log(err);
          return
        }
        console.log("Initialization finished. Ready to start");
        Quagga.start();
        Quagga.onDetected(isbn => {
          console.log(isbn)
          this.codes.push(isbn.code)
        });
      });
    }
  }
</script>
<style>
  #quagga canvas {
    display: none;
  }
</style>
