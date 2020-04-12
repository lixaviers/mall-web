<template>
  
</template>


<style>
</style>

<script>
import Util from '../libs/util';
import Api from '../libs/api';
export default {
    data () {
        return {
            isCollapsed: false
        }
    },
    created() {
        let userInfo = Util.getUserInfo();
        if(!userInfo) {
            this.$router.push({name: 'login'});
        }
        this.nickName = userInfo.nickName;
    },
    computed: {
        sidebarFold: {
            get () { return this.$store.state.sidebarFold },
            set (val) { this.$store.commit('updateSidebarFold', val) }
        },
    },
    methods: {
        action(name) {
            if(name === 'userCenter') {

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
    }
}
</script>
