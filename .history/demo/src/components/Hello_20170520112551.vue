<template>
  <div class="hello">
    <ul>
      <li v-for="serie in series">{{ serie.title }}</li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'hello',
    data() {
      return {
        series: []
      }
    },
    sockets: {
      connect: function () {
        console.log('socket connected')
      },
    },
    created() {
      this.$http.get('http://localhost:3000/').then(response => {
        this.series = response.body;
      }, response => {
        // error callback
      });
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>