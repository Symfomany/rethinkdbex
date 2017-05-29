<template>
  <div class="post">

    <h3>Articles</h3>

    <div>
      <transition-group name="list" tag="p">
        <div class="list-item" :key="post.id" v-for="post in posts">
          <h4>{{ post.title }}</h4>
          <p></p>
          <button @click="remove(post)">X</button>
          <hr />
        </div>
      </transition-group>
    </div>


    <form>


    </form>

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
    created() {
      this.$http.get('http://localhost:3000/').then(response => {
        this.posts = response.body;
      });
    },
    methods: {
      send() {
        this.posts.push({})
      },
      remove(post) {
        let pos = this.posts.findIndex((elt) => elt.id == post.id);
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