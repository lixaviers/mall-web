<template>
    <div class="suyan__head">
        <div class="suyan__shop__head">
            <h2>{{title}}</h2>
            <span>{{nickName}}&nbsp;<a @click="logout">退出</a></span>
        </div>
        <div>
            <router-view @child-event="setTitle" />
        </div>
    </div>
</template>

<script>
    import Util from '../libs/util';
    import API from '../libs/api';
    export default {
        data() {
            return {
                nickName: '',
                title: '',
            }
        },
        created() {
            this.nickName = Util.getUserInfo().nickName;
        },
        methods: {
            setTitle(name) {
                this.title = name;
            },
            logout() {
                API.userShopLogout().then((res)=> {
                    Util.removeToken();
                    // Util.removeUserInfo();
                    this.$router.push({name: 'login'});
                });
            }
        }
    }
</script>