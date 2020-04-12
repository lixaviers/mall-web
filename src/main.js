import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import router from './router';
import Api from './libs/api';
import 'element-ui/lib/theme-chalk/index.css';
import './styles/common.less';

Vue.config.productionTip = false;
Vue.use(VueRouter);

Vue.prototype.Http = Api

new Vue({
  el: '#app',
  router: router,
  render: h => h(App),
}).$mount('#app')
