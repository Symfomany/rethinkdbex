<template>
  <div class="hello">

    <h1>Nb de personnes connecté {{ nbCo }}</h1>
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
        name: '',
        nbCo: 0
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
        this.$socket.emit('remove', serie);
      }
    },
    sockets: {
      connect() {
        console.log('socket connected!!!!!!!!!!');
      },
      resultat(result) {
        this.series = result;
      },
      nb(data) {
        console.log(data.nb)
        this.nbCo = data.nb;
      },
      nouveau(nouveau) {
        this.series.push(nouveau)
      },
      remove(nouveau) {
        let pos = this.series.findIndex((elt) => elt.id == nouveau.id);
        this.series.splice(pos, 1)
      }
    },
  }
</script>