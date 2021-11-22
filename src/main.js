import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import Vuetify from 'vuetify';

import App from './App.vue';
import { routes } from './routes';
import store from './store/store';

Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(Vuetify);

const router = new VueRouter({
  mode: 'history',
  routes,
});

new Vue({
  el: '#app',
  vuetify: new Vuetify(),
  router,
  store,
  render: (h) => h(App),
});
