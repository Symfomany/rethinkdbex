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

  </div>
</template>

<script>
  export default {
    name: 'detail',
    data() {
      return {
      }
    },
    created() {
      this.$http.get('http://localhost:3000/detail/' + $route.params.id).then(response => {
        this.posts = response.body;
      });
    },
    methods: {
      back() {
        router.push({ path: 'home' })
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