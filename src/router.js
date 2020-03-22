const routers = [
    {
        path: '/',
        meta: {
            title: '首页'
        },
        redirect: {path: '/home'},
        component: (resolve) => require(['./views/index.vue'], resolve),
        children: [
            {
                path: 'home',
                name: 'home',
                meta: {
                    title: '首页',
                    isTab: false
                },
                component: (resolve) => require(['./views/home.vue'], resolve)
            },
            {
                path: 'member',
                name: 'member',
                meta: {
                    title: '会员',
                    isTab: true,
                    tabName: '会员管理'
                },
                component: (resolve) => require(['./views/member.vue'], resolve)
            },
            {
                path: 'store',
                name: 'store',
                meta: {
                    title: '店铺',
                    isTab: true,
                    tabName: '店铺管理'
                },
                component: (resolve) => require(['./views/store.vue'], resolve)
            }
        ],
    }
];
export default routers;