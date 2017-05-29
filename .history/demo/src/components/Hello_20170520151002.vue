<template>
  <div class="hello">
    <ol>
      <li v-for="serie in series">{{ serie.title }} <button @click="remove(serie)">X</button></li>
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
        let data = { title: this.name };
        this.series.push(data)
        this.$socket.emit('nouveau', data);
        this.name = ""
      },
      remove(serie) {
        this.series.splice(this.series.indexOf(serie), 1)
        this.$socket.emit('remove', data);
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
      },
      nouveau(nouveau) {
        this.series.push(nouveau)
      }
    },
  }
</script>