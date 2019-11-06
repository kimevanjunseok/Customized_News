import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import Trend from 'vuetrend'
import VueAnalytics from 'vue-analytics'
import './axios'
import VueDraggable from "vue-draggable";
import 'expose-loader?$!expose-loader?jQuery!jquery'
Vue.use(VueDraggable);

Vue.prototype.$http = axios

// vue drag tree
import VueDragTree from 'vue-drag-tree'
import 'vue-drag-tree/dist/vue-drag-tree.min.css'
Vue.use(VueDragTree)

Vue.config.productionTip = false

import infiniteScroll from "vue-infinite-scroll";



Vue.use(infiniteScroll);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

Vue.use(Trend)

Vue.use(VueAnalytics, {
  id: 'UA-143664405-1',
  router,
  autoTracking: {
    pageviewOnLoad: false
  }
})
