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
    created() {
      this.$socket.on("resultat", function (data) {
        console.log("laaaaaa")
      });
    },
    sockets: {
      connect() {
        console.log('socket connected!!');
      },
      resultat(result) {
        console.log('this method was fired by the socket server. eg: io.emit("customEmit", data)')
        console.log(result)
      }

    },
  }
</script>