<template>
  <div class="chat">

  </div>
</template>

<script>
  export default {
    name: 'chat',
    data() {
      return {

      }
    },
    methods: {

    },
    sockets: {
      connect() {
        console.log('socket connected!!!!!!!!!!');
      },
    },
  }
</script>