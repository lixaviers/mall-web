<template>
    <div>
        <el-card shadow="always">
            <h3>店铺信息</h3>
            <p class="mt10">{{shopInfo.shopName}}</p>
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
                    if(!res.data.shopIntroduction) {
                        this.shopInfo.shopIntroduction = '暂无';
                        this.shopInfo.createTime = Util.dateFormatter(res.data.createTime);
                    }
                });
            },
        }
    }
</script>