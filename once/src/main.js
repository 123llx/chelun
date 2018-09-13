import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import lazyload from 'vue-lazyload'
Vue.use(lazyload)
// Vue.use(lazyload,{
//     loading:'./assets/timg.jpg'
//   })
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
