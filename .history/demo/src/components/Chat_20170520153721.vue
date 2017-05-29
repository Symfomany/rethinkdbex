<template>
  <div class="chat">

  </div>
</template>

<script>
  export default {
    name: 'hello',
    data() {
      return {
        series: [],
        name: ''
      }
    },
    methods: {
      send() {
        let data = { title: this.name };
        this.series.push(data)
        this.$socket.emit('nouveau', data);
        this.name = ""
      },
      remove(serie) {
        this.series.splice(this.series.indexOf(serie), 1)
        this.$socket.emit('remove', serie);
      }
    },
    created() {
      this.$socket.emit('hi');
    },
    sockets: {
      connect() {
        console.log('socket connected!!!!!!!!!!');
      },

    },
  }
</script>