<template>
    <div>
        <div class="shop__list__infobar mt20">
            <el-avatar icon="el-icon-user-solid" size="large" />
            <label> {{nickName}}</label>
            <el-button class="float-right" type="primary" @click="$router.push({name: 'shopCreate'});">创建店铺</el-button>
        </div>
        <div class="shop__list">
            <el-row>
                <el-col :span="8" v-for="item in shopList" :key="item.id">
                    <div class="shop__list__item" @click="selectShop(item.id)">
                        <div class="name">{{item.shopName}}</div>
                        <div class="desc">创建时间：{{item.createTime}}</div>
                        <div class="desc"><label class="type">微商城</label></div>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    import Util from '../../../libs/util';
    import API from '../../../libs/api.js'
    export default {
        data() {
            return {
                shopList: [],
            }
        },
        created() {
            this.$emit('child-event', this.$route.meta.title);
            this.nickName = Util.getUserInfo().nickName;
            this.getShopList();
        },
        methods: {
            getShopList() {
                API.operationShopList().then((res)=> {
                    if(res.data) {
                        // res.data.forEach(item => {
                            // item.createTime = Util.dateFormatter(item.createTime);
                        // });
                        this.shopList = res.data;
                    }
                });
            },
            selectShop(id) {
                API.operationSelectShop(id).then((res)=> {
                    this.$router.push({name: 'home'});
                });
            },
        }
    }
</script>