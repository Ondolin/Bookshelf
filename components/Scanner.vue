<template>
  <div>
    <div id="quagga"></div>
    {{code}}
  </div>
</template>
<script>
  import Quagga from '@ericblade/quagga2';

  export default {
    data() {
      return {
        code: null
      }
    },
    mounted () {
      let self  = this;
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
        console.info("Quagga initialization finished. Ready to start");
        Quagga.start();
      });

      Quagga.onDetected(isbn => {
        if (self.validateISBN(isbn.codeResult.code) && !self.$store.state.scan.scans.includes(isbn.codeResult.code)){
          self.$store.dispatch("scan/addScan", isbn.codeResult.code);
        }
      });

      this.$root.$on("startQuagga", () => {
        Quagga.start();
      });
      this.$root.$on("stopQuagga", () => {
        Quagga.stop();
      });
    },
    methods: {
      validateISBN(isbn) {
        if (!isbn.match("^(?=(?:\\D*\\d){10}(?:(?:\\D*\\d){3})?$)[\\d-]+$"))
          return false;

        let sum,
          weight,
          digit,
          check,
          i;

        isbn = isbn.replace(/[^0-9X]/gi, '');

        if (isbn.length != 10 && isbn.length != 13) {
          return false;
        }

        if (isbn.length == 13) {
          sum = 0;
          for (i = 0; i < 12; i++) {
            digit = parseInt(isbn[i]);
            if (i % 2 == 1) {
              sum += 3*digit;
            } else {
              sum += digit;
            }
          }
          check = (10 - (sum % 10)) % 10;
          return (check == isbn[isbn.length-1]);
        }

        if (isbn.length == 10) {
          weight = 10;
          sum = 0;
          for (i = 0; i < 9; i++) {
            digit = parseInt(isbn[i]);
            sum += weight*digit;
            weight--;
          }
          check = 11 - (sum % 11);
          if (check == 10) {
            check = 'X';
          }
          return (check == isbn[isbn.length-1].toUpperCase());
        }
      }
    },
  }
</script>
<style>
  #quagga canvas {
    display: none;
  }
</style>
