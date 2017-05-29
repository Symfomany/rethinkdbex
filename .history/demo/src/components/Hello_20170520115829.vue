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
      connect() {
        console.log('socket connected!!');
      },
      disconnect() {
        console.log('socket connected!!');
      },
      hello() {
        console.log('ok')
      },
      resultat(result) {
        console.log('this method was fired by the socket server. eg: io.emit("customEmit", data)')
        console.log(result)
      }

    },
  }
</script>