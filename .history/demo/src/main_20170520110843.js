// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource';

Vue.use(VueResource);
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
  data() {
    return {
      series: []
    }
  },
  created() {
    this.$http.get('http://localhost:3000/').then(response => {
      series = response;
    }, response => {
      // error callback
    });
  }
})
