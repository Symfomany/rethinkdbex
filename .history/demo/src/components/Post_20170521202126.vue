<template>
  <div class="post">

    <h3>Articles</h3>
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
        this.posts.push({})
      },
      remove(post) {
        let pos = this.series.findIndex((elt) => elt.id == post.id);
        this.posts.splice(pos, 1)
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