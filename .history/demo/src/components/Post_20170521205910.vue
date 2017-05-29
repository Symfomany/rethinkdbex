<template>
  <div class="post">

    <h3>Articles</h3>


    <div class="row">
      <div class="col s6">
        <transition-group name="list" tag="p">
          <div class="list-item" :key="post.id" v-for="post in posts">
            <span class="chip">{{ post.categorie }}</span>
            <h4>{{ post.title }}</h4>
            <p>{{ post.description }}</p>
            <button class="waves-effect waves-light btn" @click="remove(post)">X</button>
            <hr />
          </div>
        </transition-group>
      </div>

      <form class="col s6">

        <div class="row">
          <div class="input-field col s6">
            <input id="titre" type="text" class="validate">
            <label for="titre">Titre</label>
          </div>
        </div>

        <div class="row">

          <div class="input-field col s12">
            <select>
      <option value="" disabled selected>Choose your option</option>
      <option value="1">Option 1</option>
      <option value="2">Option 2</option>
      <option value="3">Option 3</option>
    </select>
            <label>Materialize Select</label>
          </div>
        </div>


      </form>
    </div>


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
    transition: all 0.4s;
  }
  .list-enter, .list-leave-to /* .list-leave-active for <2.1.8 */ {
    opacity: 0;
    transform: translateX(15px);
  }
  div.list-item h4{
    font-size: 2rem;
  }
</style>