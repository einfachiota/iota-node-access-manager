import Vue from 'vue'
import store from './store'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'

import VueClipboard from 'vue-clipboard2'

Vue.use(VueClipboard)

import VueSocketIO from 'vue-socket.io'

Vue.use(new VueSocketIO({
  debug: true,
  connection: 'http://localhost:3000',
  vuex: {
    store,
    actionPrefix: 'SOCKET_',
    mutationPrefix: 'SOCKET_'
  },
  options: { path: "/payments/socket" } //Optional options
}))


import './custom.scss'

Vue.use(BootstrapVue)

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
