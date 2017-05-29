<template>
  <div class="post">

    <h3>Détail</h3>

    <button type="button" @click="back">Retour a la liste</button>
    <div class="row">
      <div class="col s12">
        <span class="chip">{{ post.categorie }}</span>
        <h4>{{ post.title }}</h4>
        <p>{{ post.description }}</p>
      </div>
    </div>

    <router-link class="btn" :to="'/detail/$route.params.id /note'">Voir sa note</router-link>
    <router-view></router-view>


  </div>
</template>

<script>
  export default {
    name: 'detail',
    data() {
      return {
        post: {}
      }
    },
    created() {
      this.$http.get('http://localhost:3000/detail/' + this.$route.params.id).then(response => {
        this.post = response.body;
      });
    },
    methods: {
      back() {
        this.$router.push({ name: 'Post' })
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