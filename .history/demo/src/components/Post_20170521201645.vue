<template>
  <div class="post">

    <h1>Nb de personnes connecté {{ nbCo }}</h1>
    <ul class="collection">
      <transition-group name="list" tag="p">
        <li class="list-item collection-item" :key="post.id" v-for="post in posts">{{ post.title }} <button @click="remove(post)">X</button></li>
      </transition-group>
    </ul>

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
        console.log(data)
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

<style>
  .list-enter-active, .list-leave-active {
    transition: all 1s;
  }
  .list-enter, .list-leave-to /* .list-leave-active for <2.1.8 */ {
    opacity: 0;
    transform: translateX(5px);
  }
</style>