<template>
    <div>
        <aside class="suyan__aside">
            <div>
                <h1 class="navbar__brand"><a href="/#/home">素焉商城</a></h1>
            </div>
            <el-menu background-color="#515a6e" text-color="#fff" active-text-color="#17b3a3"
                 :default-active="menuActiveName || 'home'" @select="gotoRouteHandle">
                <el-menu-item style="padding: 0 10px 10px 15px;" v-for="item in menuList" :key="item.id" :index="item.name">
                    <i class="el-icon-setting"></i>
                    <span slot="title">{{item.meta.title}}</span>
                </el-menu-item>
            </el-menu>
        </aside>
        <aside class="suyan__sub__aside" v-if="subMenuList.length > 0">
            <div>
                <h2 class="title">{{subTitleName}}</h2>
            </div>
            <el-menu ref="menus" :default-active="subMenuActiveName" active-text-color="#17b3a3" @select="gotoRouteHandle">
                <el-menu-item v-for="item in subMenuList" :key="item.id" :index="item.name">
                    <span>{{ item.meta.title }}</span>
                </el-menu-item>
            </el-menu>
        </aside>
        <nav class="suyan__nav" :class="{ 'site': this.$route.meta.parentName }">
            <span class="page__title">{{this.$route.meta.title}}</span>
            <div style="float: right; margin: 10px 20px;">
                <el-dropdown @command="action" trigger="click">
                    <!-- <a href="javascript:void(0)" class="avatar">
                        <Avatar icon="ios-person" />
                        {{nickName}}
                    </a> -->
                    <span class="el-dropdown-link">
                        {{nickName}}<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="userCenter">个人中心</el-dropdown-item>
                        <el-dropdown-item command="logout">退出</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </nav>
    </div>
  
</template>


<style>
</style>

<script>
import Util from '../libs/util';
import Api from '../libs/api';
export default {
    computed: {
    },
    watch: {
      $route: 'routeHandle'
    },
    data () {
        return {
            nickName: '',
            shopName: '',
            menuList: [],
            subMenuList: [],
            menuActiveName: '',
            subMenuActiveName: '',
            subTitleName: '',
        }
    },
    created () {
        let userInfo = Util.getUserInfo();
        if(!userInfo) {
            this.$router.push({name: 'login'});
        }
        this.nickName = userInfo.nickName;
        this.shopName = userInfo.shopName;
        this.menuList = JSON.parse(sessionStorage.getItem('menuList') || '[]');
        this.routeHandle(this.$route);
    },
    methods: {
        // 路由操作
        routeHandle (route) {
            let menuActiveName = this.menuActiveName;
            let subMenuActiveName;
            if(route.meta.parentName) {
                this.menuActiveName = this.$route.meta.parentName;
                if(!route.meta.isMenu) {
                    // 如果当前路由不是菜单，选中的子菜单取[activeName]
                    subMenuActiveName = this.$route.meta.activeName;
                } else {
                    subMenuActiveName = this.$route.name;
                }
            } else {
                this.menuActiveName = this.$route.name;
            }
            this.subMenuActiveName = subMenuActiveName;
            if(this.menuActiveName != menuActiveName) {
                // 获取列表
                var tab = this.menuList.filter(item => item.name === this.menuActiveName)[0];
                if(tab.children) {
                    this.subMenuList = tab.children.filter(item => item.meta.isMenu);
                    this.subTitleName = tab.meta.subTitle;
                    let t= this;
                    this.$nextTick(()=>{
                        this.$refs.menus.activeIndex = subMenuActiveName;
                    })
                } else {
                    this.subMenuList = [];
                }
            }
        },
        // 通过menuId与动态(菜单)路由进行匹配跳转至指定路由
        gotoRouteHandle (name) {
            console.log(name)
            this.$router.push({ name: name })
        },
        action(command) {
            console.log(command)
            if(command === 'userCenter') {

            } else {
                this.logout();
            }
        },
        logout() {
            Api.userShopLogout().then((res)=> {
                Util.removeToken();
                // Util.removeUserInfo();
                this.$router.push({name: 'login'});
            });
        }
    },
}
</script>
