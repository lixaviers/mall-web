<template>
    <aside class="suyan__aside">
        <Menu :active-name="menuActiveName || 'home'" width="auto" theme="dark" @on-select="gotoRouteHandle">
            <MenuItem v-for="item in menuList" :key="item.id" :name="item.name">
                <Icon type="ios-navigate"></Icon>
                <span>{{ item.meta.title }}</span>
            </MenuItem>
        </Menu>
    </aside>
  
</template>


<style>
</style>

<script>
export default {
    watch: {
      $route: 'routeHandle'
    },
    data () {
        return {
        }
    },
    created () {
        this.menuList = JSON.parse(sessionStorage.getItem('menuList') || '[]');
        this.routeHandle(this.$route);
    },
    methods: {
        // 路由操作
        routeHandle (route) {
            if (route.meta.isTab) {
                // tab选中, 不存在先添加
                var tab = this.mainTabs.filter(item => item.name === route.name)[0];
                if (!tab) {
                    tab = {
                        id: route.meta.id || route.name,
                        name: route.name,
                        title: route.meta.title,
                        tabName: route.meta.tabName,
                        path: route.path
                    }
                    this.mainTabs = this.mainTabs.concat(tab);
                }
                this.menuActiveName = tab.id + '';
                this.mainTabsActiveName = tab.name;
            }
        },
        // 通过menuId与动态(菜单)路由进行匹配跳转至指定路由
        gotoRouteHandle (name) {
            this.$router.push({ name: name })
        }
    },
    computed: {
        mainTabs: {
            get () {
                return this.$store.state.mainTabs
            },
            set (val) {
                this.$store.commit('updateMainTabs', val)
            }
        },
        menuActiveName: {
            get () {
                return this.$store.state.menuActiveName
            },
            set (val) {
                this.$store.commit('updateMenuActiveName', val)
            }
        },
        mainTabsActiveName: {
            get () {
                return this.$store.state.mainTabsActiveName
            },
            set (val) {
                this.$store.commit('updateMainTabsActiveName', val)
            }
        }
    }
}
</script>
