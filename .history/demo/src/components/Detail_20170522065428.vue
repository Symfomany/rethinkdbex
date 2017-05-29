<template>
  <div class="post">

    <h3>Détail</h3>


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
        console.log(this.newPost.categorie);

        let formData = this.$refs.formUpload;
        let oData = new FormData(formData);
        oData.append("title", this.newPost.title);
        oData.append("description", this.newPost.description);
        oData.append("categorie", this.newPost.categorie);
        oData.append("visible", this.newPost.visible);
        oData.append("note", this.newPost.note);

        this.$http.post('http://localhost:3000/send', oData).then((res) => {
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