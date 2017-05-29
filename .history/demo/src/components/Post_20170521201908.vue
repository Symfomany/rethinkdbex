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
    name: 'post',
    data() {
      return {
        posts: [],
      }
    },
    methods: {
      send() {
        let data = { title: this.name };

      },
      remove(serie) {

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