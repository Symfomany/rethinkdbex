<template>
  <div class="chat">

  </div>
</template>

<script>
  export default {
    name: 'hello',
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