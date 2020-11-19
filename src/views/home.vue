<template>
    <div class="suyan__home">
        <main class="main">
            <p class="title">{{shopName}}</p>
            <p class="title mt10">实时概况</p>
            <el-row class="ssgk">
                <el-col :span="6" class="item">
                    <p class="text">支付订单数</p>
                    <p class="number">0</p>
                </el-col>
                <el-col :span="6" class="item">
                    <p class="text">支付金额(元)</p>
                    <p class="number">0.00</p>
                </el-col>
                <el-col :span="6" class="item">
                    <p class="text">浏览量</p>
                    <p class="number">0</p>
                </el-col>
                <el-col :span="6" class="item">
                    <p class="text">累积客户数</p>
                    <p class="number">0</p>
                </el-col>
            </el-row>
            <p class="title">常用工具</p>
            <el-row class="ssgk cygj">
                <el-col :span="6" class="item">
                    <a @click="$router.push({name: 'editGoodsCategory'});">发布商品</a>
                </el-col>
                <el-col :span="6" class="item">
                    <a>会员管理</a>
                </el-col>
                <el-col :span="6" class="item">
                    <a>订单管理</a>
                </el-col>
                <el-col :span="6" class="item">
                    <a @click="$router.push({name: 'shopInfo'})">店铺管理</a>
                </el-col>
            </el-row>
            <p class="title">最新推荐</p>
            <div class="zxtj">
                <el-row :gutter="16">
                    <el-col :span="6">
                        <div class="zxtj__item first">拼团</div>
                    </el-col>
                    <el-col :span="6">
                        <div class="zxtj__item second">砍价</div>
                    </el-col>
                    <el-col :span="6">
                        <div class="zxtj__item third">秒杀</div>
                    </el-col>
                    <el-col :span="6">
                        <div class="zxtj__item fourth">更多</div>
                    </el-col>
                </el-row>
            </div>
        </main>
        <aside class="home__aside">
            <div class="aside__item">
                <div class="item__title">消息中心</div>
                <ul class="item_list">
                    <li>第一条消息</li>
                    <li>第一条消息</li>
                    <li>第一条消息</li>
                    <li>第一条消息</li>
                    <li>第一条消息</li>
                </ul>
            </div>
            <div class="aside__item mt20">
                <div class="item__title">消息中心</div>
                <ul class="item_list">
                    <li>第一条消息</li>
                    <li>第一条消息</li>
                    <li>第一条消息</li>
                    <li>第一条消息</li>
                    <li>第一条消息</li>
                </ul>
            </div>
            <div class="aside__item mt20">
                <div class="item__title">消息中心</div>
                <ul class="item_list">
                    <li>第一条消息</li>
                    <li>第一条消息</li>
                    <li>第一条消息</li>
                    <li>第一条消息</li>
                    <li>第一条消息</li>
                </ul>
            </div>
        </aside>
    </div>
</template>

<script>
import Util from '../libs/util';
import Api from '../libs/api';
export default {
    data () {
        return {
            shopName: '',
        }
    },
    created () {
        let userInfo = Util.getUserInfo();
        if(!userInfo) {
            this.$router.push({name: 'login'});
        }
        this.shopName = userInfo.shopName;
    },
    methods: {
       
    },
}
</script>
