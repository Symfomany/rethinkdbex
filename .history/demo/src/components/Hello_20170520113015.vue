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
        console.log('socket connected!!')
      },
      customEmit: function (val) {
        console.log('this method was fired by the socket server. eg: io.emit("customEmit", data)')
      }
    },
    created() {


      this.$options.sockets.result = (data) => {
        console.log('laaaa')
        console.log(data)
        this.series = data;
      }
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