import Vue from 'vue';
import Router from 'vue-router';
import ElementUI from 'element-ui';
import Util from './libs/util';

Vue.use(ElementUI, { size: 'small', zIndex: 3000 });

/**
 * 重写路由的push方法
 */
const routerPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}
// 全局路由(无需嵌套上左右整体布局)
const globalRoutes = [
    {
      path: '/login', name: 'login', meta: {title: '登录'},
      component: (resolve) => require(['./views/common/login.vue'], resolve),
    },
    {
      path: '/register', name: 'register', meta: {title: '注册'},
      component: (resolve) => require(['./views/common/register.vue'], resolve),
    },
    {
        path: '/goods/edit', name: 'goodsEdit', component: (resolve) => require(['./views/goods/edit/index.vue'], resolve),
        meta: {
            title: '发布商品', isMenu: false, parentName: 'goods', 
            // 选中的子菜单名称
            activeName: 'goodsList',
        }
    },
    {
        path: '/shopHeader',
        component: (resolve) => require(['./components/shopHeader.vue'], resolve),
        children: [
            {
              path: '/shop/create', name: 'shopCreate', meta: {title: '创建店铺'},
              component: (resolve) => require(['./views/operation/shop/create.vue'], resolve),
            },
            {
              path: '/shop/createInfo', name: 'shopCreateInfo', meta: {title: '创建店铺'},
              component: (resolve) => require(['./views/operation/shop/createInfo.vue'], resolve),
            },
            {
              path: '/shop/list', name: 'shopList', meta: {title: '选择店铺'},
              component: (resolve) => require(['./views/operation/shop/list.vue'], resolve),
            },
        ]
    },
    {
      path: '/404', name: '404', meta: {title: '页面未找到'},
      component: (resolve) => require(['./views/common/404.vue'], resolve),
    },
]
const menuRouters = [
    {
        path: '/', name: '', redirect: {name: 'home'}, component: (resolve) => require(['./views/main.vue'], resolve),
        meta: {
            title: '首页'
        },
        children: [
            {
                path: '/home', name: 'home', component: (resolve) => require(['./views/home.vue'], resolve),
                meta: {
                    title: '首页',
                    isTab: false,
                },
            },
            {
                path: 'member',
                name: 'member',
                meta: {
                    title: '会员',
                },
                component: (resolve) => require(['./views/member.vue'], resolve)
            },
            {
                path: '/goods', name: 'goods', redirect: {name: 'goodsList'}, component: (resolve) => require(['./views/index.vue'], resolve),
                meta: {
                    title: '商品', subTitle: '商品中心',
                },
                children: [
                    {
                        path: 'list', name: 'goodsList', component: (resolve) => require(['./views/goods/list.vue'], resolve),
                        meta: {
                            title: '商品管理', isMenu: true, parentName: 'goods',
                        }
                    },
                    {
                        path: 'class', name: 'goodsClassList', component: (resolve) => require(['./views/goods/class/index.vue'], resolve),
                        meta: {
                            title: '商品分类', isMenu: true, parentName: 'goods',
                        }
                    },
                    {
                        path: 'editGoodsCategory', name: 'editGoodsCategory', component: (resolve) => require(['./views/goods/edit/category.vue'], resolve),
                        meta: {
                            title: '发布商品', isMenu: false, parentName: 'goods', 
                            // 选中的子菜单名称
                            activeName: 'goodsList',
                        }
                    },
                ]
            },
            {
                path: '/mmc', name: 'mmc', redirect: {name: 'couponList'}, component: (resolve) => require(['./views/index.vue'], resolve),
                meta: {
                    title: '营销', subTitle: '营销管理',
                },
                children: [
                    {
                        path: 'coupon/list', name: 'couponList', component: (resolve) => require(['./views/mmc/coupon/list.vue'], resolve),
                        meta: {
                            title: '优惠券管理', isMenu: true, parentName: 'mmc',
                        }
                    },
                    {
                        path: 'coupon/edit', name: 'couponEdit', component: (resolve) => require(['./views/mmc/coupon/edit.vue'], resolve),
                        meta: {
                            title: '创建优惠券', isMenu: false, parentName: 'mmc', 
                            // 选中的子菜单名称
                            activeName: 'couponList',
                        }
                    },
                    {
                        path: 'subPromotion/list', name: 'subPromotionList', component: (resolve) => require(['./views/mmc/subPromotion/list.vue'], resolve),
                        meta: {
                            title: '订单促销', isMenu: true, parentName: 'mmc',
                        }
                    },
                    {
                        path: 'subPromotion/edit', name: 'subPromotionEdit', component: (resolve) => require(['./views/mmc/subPromotion/edit.vue'], resolve),
                        meta: {
                            title: '创建订单促销', isMenu: false, parentName: 'mmc', 
                            // 选中的子菜单名称
                            activeName: 'subPromotionList',
                        }
                    },
                    {
                        path: 'bargain/list', name: 'bargainList', component: (resolve) => require(['./views/mmc/bargain/list.vue'], resolve),
                        meta: {
                            title: '砍价活动', isMenu: true, parentName: 'mmc',
                        }
                    },
                    {
                        path: 'bargain/edit', name: 'bargainEdit', component: (resolve) => require(['./views/mmc/bargain/edit.vue'], resolve),
                        meta: {
                            title: '创建砍价活动', isMenu: false, parentName: 'mmc', 
                            // 选中的子菜单名称
                            activeName: 'bargainList',
                        }
                    },
                ]
            },
            {
                path: 'shop', name: 'store',  redirect: {name: 'shopInfo'}, component: (resolve) => require(['./views/index.vue'], resolve),
                meta: { 
                    title: '店铺', subTitle: '店铺管理', 
                },
                children: [
                    {
                        path: 'info', name: 'shopInfo', component: (resolve) => require(['./views/operation/shop/info.vue'], resolve),
                        meta: {
                            title: '店铺信息', isMenu: true, parentName: 'store',
                        }
                    },
                    {
                        path: 'edit', name: 'storeEdit', component: (resolve) => require(['./views/operation/shop/edit.vue'], resolve),
                        meta: {
                            title: '编辑基本信息', isMenu: false, parentName: 'store', activeName: 'shopInfo',
                        }
                    },
                ]
            }
        ],
    }
];
const router = new Router({
    routes: globalRoutes.concat(menuRouters).concat({ path: '*', redirect: { name: '404' }})
});

router.beforeEach((to, from, next) => {
    // ViewUI.LoadingBar.start();
    Util.title(to.meta.title);
    let menuList = [];
    menuRouters.forEach(item=>{
        item.children.forEach(child=>{
            menuList.push(child);
        })
    })
    sessionStorage.setItem('menuList', JSON.stringify(menuList || '[]'))
    next();
});

router.afterEach((to, from, next) => {
    // ViewUI.LoadingBar.finish();
    window.scrollTo(0, 0);
});

export default router;