<template>
  <div class="hello">
    <ol>
      <li v-for="serie in series">{{ serie.title }}</li>
    </ol>
  </div>
</template>

<script>
  export default {
    name: 'hello',
    data() {
      return {
        series: []
      }
    },
    created() {
      this.$socket.emit('hi');
    },
    sockets: {
      connect() {
        console.log('socket connected!!!!!!!!!!');
      },
      resultat(result) {
        this.series = result;
      }

    },
  }
</script>