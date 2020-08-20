<template>
  <div id="quagga"></div>
</template>
<script>
  import Quagga from '@ericblade/quagga2';

  export default {
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
        Quagga.onDetected(isbn => console.log(isbn));
      });
    }
  }
</script>
<style>
  #quagga canvas {
    display: none;
  }
</style>
