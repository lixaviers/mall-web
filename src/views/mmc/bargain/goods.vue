<template>
    <div class="gooods__edit">
        <el-form :model="bargainForm" ref="bargainForm" label-width="120px" :rules="rules" class="mt20">
            <el-form-item label="砍价有效期">
                <el-radio-group v-model="bargainForm.validityDateType">
                    <el-radio-button label="1">24小时</el-radio-button>
                    <el-radio-button label="2">48小时</el-radio-button>
                    <el-radio-button label="3">72小时</el-radio-button>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="砍价商品" prop="activityRule">
                <el-button type="warning" @click="goodsFlag = true">选择商品</el-button>
                <el-card v-if="goods != null" class="mt10">
                    <p>{{goods.goodsName}}</p>
                    <p>
                        <el-tag>规格：{{goods.specValue}}</el-tag>
                        <el-tag class="ml10">价格：<span class="red">￥{{goods.price}}</span></el-tag>
                        <el-tag class="ml10">库存：{{goods.inventory}}</el-tag>
                    </p>
                </el-card>
            </el-form-item>
            <el-form-item label="库存">
                <el-input-number :min="1" :max="99999999" :precision="0" v-model="bargainForm.inventory" />
            </el-form-item>
            <el-form-item label="砍价阶梯">
                <el-card v-for="(item, index) in bargainForm.itemList" :key="index" class="mb10" style="background: #F8F9FC;position:relative;">
                    <el-tag style="position: absolute;top: 0;left: 0;">阶段{{index+1}}</el-tag>
                    <span>帮砍人数：</span>
                    <el-input v-model="item.numberMax" style="width: 150px;">
                        <template slot="append">人</template>
                    </el-input>
                    <span class="ml20">总砍价比例：</span>
                    <el-input v-model="item.promotionMin" :maxlength="2" style="width: 120px;">
                        <template slot="append">%</template>
                    </el-input>
                    <span class="ml5 mr5">至</span>
                    <el-input v-model="item.promotionMxa" :maxlength="2" style="width: 120px;">
                        <template slot="append">%</template>
                    </el-input>
                    <el-button @click="" v-show="bargainForm.itemList.length > 2" type="warning" class="ml20">删除</el-button>
                </el-card>
                <el-button @click="addItem" v-show="bargainForm.itemList.length < 5" type="primary">新增阶梯</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" :loading="loading" @click="onSubmit('bargainForm')">{{buttonText}}</el-button>
                <el-button @click="$router.push({name:'bargainList'})">取消</el-button>
            </el-form-item>
        </el-form>
        <goods-list :visible="goodsFlag" @selectGoods="selectGoods"></goods-list>
    </div>
</template>
<script>
import Util from '../../../libs/util';
import API from '../../../libs/api.js';
import GoodsList from '@/components/goodsList';
export default {
    components: {GoodsList},
    data () {
        return {
            // 商品弹框展示标识
            goodsFlag: false,
            goods: null,
            rules: {
                activityName: [
                    { required: true, message: '请输入活动名称', trigger: 'blur' },
                ],
                effectTime: [
                    { type: 'array', required: true, message: '请选择生效时间', trigger: 'change' }
                ],
                activityRule: [
                    {required: true, message: '请输入活动规则', trigger: 'blur' }
                ],
            },
            bargainForm: {
                id: '',
                validityDateType: 1,
                inventory: '',
                itemList: [
                    {numberMin: 0, numberMax: '', promotionMin: '', promotionMax: ''},
                    {numberMin: '', numberMax: '', promotionMin: '', promotionMax: ''},
                ]
            },
            loading: false,
            buttonText: '立即创建',
        }
    },
    created() {
                
        // 优惠券id，用来判断新增还是编辑
        let id = this.$route.query.id;
        if(id) {
            this.buttonText = '立即保存';
            // 获取商品详情
            API.couponGet(id).then((res)=> {
                this.bargainForm = res.data;
                // 设置时间选择
                this.$set(this.bargainForm, "effectTime", [new Date(res.data.startTime), new Date(res.data.endTime)]);
                this.goodsCategoryCheckedList = res.data.promotionScopeList;
            });
        }
        

    },
    methods: {
        // 选择商品
        selectGoods(goods) {
            this.goodsFlag = false;
            this.goods = goods;
        },
        // 新增阶梯
        addItem() {
            this.bargainForm.itemList.push({numberMin: 0, numberMax: '', promotionMin: '', promotionMax: ''});
        },
        // 提交
        onSubmit(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    
                    this.bargainForm.startTime = Util.dateFormatter(this.bargainForm.effectTime[0]);
                    this.bargainForm.endTime = Util.dateFormatter(this.bargainForm.effectTime[1]);
                    this.loading = true;
                    console.log(this.bargainForm);
                    API.couponAdd(this.bargainForm).then((res)=> {
                        console.log(res);
                        if(this.bargainForm.id) {
                            Util.messageSuccess("保存成功");
                        } else {
                            Util.messageSuccess("创建成功");
                        }
                        this.$router.push({name:'bargainList'});
                    }).finally((res) => {
                        if(this.loading)this.loading = false;
                    });
                } else {
                    return false;
                }
            });
        },
    }
}
</script>
