<template>
    <div>
        <el-card shadow="always">
            <div slot="header" class="clearfix">
                <span>店铺信息</span>
                <el-button style="float: right; padding: 3px 0" @click="$router.push({name: 'storeEdit'})" type="text">编辑</el-button>
            </div>
            <p>店铺名称：{{shopInfo.shopName}}</p>
            <p class="mt5">店铺编号：{{shopInfo.id}}</p>
            <p class="mt5">创建时间：{{shopInfo.createTime}}</p>
            <p class="mt5">店铺简介：{{shopInfo.shopIntroduction}}</p>
        </el-card>
    </div>
</template>
<script>
    import Util from '../../../libs/util';
    import API from '../../../libs/api.js'
    export default {
        data() {
            return {
                shopInfo: {

                },
            }
        },
        created() {
            this.getShopInfo();
        },
        methods: {
            getShopInfo() {
                API.operationShopInfo().then((res)=> {
                    this.shopInfo = res.data;
                    this.shopInfo.createTime = Util.dateFormatter(res.data.createTime);
                    if(!res.data.shopIntroduction) {
                        this.shopInfo.shopIntroduction = '暂无';
                    }
                });
            },
        }
    }
</script>