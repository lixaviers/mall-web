import Vue from 'vue';
import ViewUI from 'view-design';
import VueRouter from 'vue-router';
import Routers from './router';
import store from './store';
import Util from './libs/util';
import App from './app.vue';
import 'view-design/dist/styles/iview.css';
import './styles/common.less';

Vue.use(VueRouter);
Vue.use(ViewUI);

// 路由配置
const RouterConfig = {
    mode: 'history',
    routes: Routers
};
const router = new VueRouter(RouterConfig);

router.beforeEach((to, from, next) => {
    ViewUI.LoadingBar.start();
    Util.title(to.meta.title);
    let menuList = [];
    Routers.forEach(item=>{
        item.children.forEach(child=>{
            menuList.push(child);
        })
    })
    sessionStorage.setItem('menuList', JSON.stringify(menuList || '[]'))
    next();
});

router.afterEach((to, from, next) => {
    ViewUI.LoadingBar.finish();
    window.scrollTo(0, 0);
});

new Vue({
    el: '#app',
    router: router,
    store,
    render: h => h(App)
});
