<template>
  <div class="hello">
    <ol>
      <li v-for="serie in series">{{ serie.title }}</li>
    </ol>

    <form @submit.prevent="send">
      Name: <input type="text" v-model="name">
    </form>

  </div>
</template>

<script>
  export default {
    name: 'hello',
    data() {
      return {
        series: [],
        name: ''
      }
    },
    methods: {
      send() {
        console.log('ok');
        this.series.push({ title: this.name })
        this.name = ""
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