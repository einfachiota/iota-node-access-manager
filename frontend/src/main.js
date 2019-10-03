import Vue from 'vue'
import router from './router'
import store from './store'
import App from './App.vue'


import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import VueClipboard from 'vue-clipboard2'

Vue.use(VueClipboard)

import VueSocketIO from 'vue-socket.io'
const BACKEND_URL = process.env.VUE_APP_BACKEND_URL

Vue.use(new VueSocketIO({
  debug: true,
  connection: BACKEND_URL,
  vuex: {
    store,
    actionPrefix: 'SOCKET_',
    mutationPrefix: 'SOCKET_'
  },
  options: { path: "/payments/socket" } //Optional options
}))


Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
