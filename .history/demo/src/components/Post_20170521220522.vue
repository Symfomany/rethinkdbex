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

      <form enctype="multipart/form-data" class="col s6">

        <div class="input-field col s6">
          <input v-model="newPost.title" id="titre" type="text" class="validate">
          <label for="titre">Titre de l'article</label>
        </div>

        <div class="input-field col s12">
          <textarea v-model="newPost.description" id="description" class="materialize-textarea"></textarea>
          <label for="description">Description entière</label>
        </div>


        <div class="input-field col s12">
          <div class="file-field input-field">
            <div class="btn">
              <span>Image de l'article</span>
              <input type="file" ref="sampleFile" name="sampleFile" accept="image/*" capture="capture">
            </div>
            <div class="file-path-wrapper">
              <input class="file-path validate" type="text">
            </div>
          </div>
        </div>

        <div class="input-field col s12">
          <select v-model="newPost.categorie">
              <option disabled selected>Choisissez la catégorie</option>
              <option v-for="categorie in categories" :value="categorie">{{ categorie }}</option>
            </select>
          <label>Catégorie affectée</label>
        </div>

        <div class="input-field col s12">
          <p>
            <input v-model="newPost.visible" type="checkbox" id="test5" />
            <label for="test5">Visible sur le site</label>
          </p>
        </div>

        <div class="input-field col s12">
          <p>
            <input v-model="newPost.note" type="range" id="note" min="1" max="10" />
          </p>
        </div>


        <div class="input-field col s12">
          <button @click="send" class="btn waves-effect waves-light" type="button" name="action">Ajouter cette article
            <i class="material-icons right">send</i>
          </button>
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

        newPost: {
          title: '',
          description: '',
          categorie: '',
          visible: false,
          image: null,
          note: 3
        },
        categories: ['Sport', 'Politique', 'Finance', 'Amour']
      }
    },
    created() {
      this.$http.get('http://localhost:3000/').then(response => {
        this.posts = response.body;
      });
    },
    methods: {
      send() {
        this.newPost.id = this.posts.length + 1;
        this.posts.push(this.newPost)
        /*this.$http.post('http://localhost:3000/send', this.newPost).then((res) => {
          console.log(res)
        })*/

        /*var formData = new FormData();
        formData.append('image', this.file);*/
        console.log(this.refs.sampleFile)
        this.$http.post('http://localhost:3000/send', this.newPost, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then((res) => {
          console.log(res)
        })
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