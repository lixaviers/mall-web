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
            <el-form-item label="砍价商品" prop="goodsSkuCode">
                <el-button type="warning" @click="goodsFlag = true">选择商品</el-button>
                <el-card v-if="goods != null" class="mt10">
                    <p>{{goods.goodsName}}</p>
                    <p>
                        <el-tag>规格编码：{{goods.skuCode}}</el-tag>
                        <el-tag class="ml10">规格：{{goods.specValue}}</el-tag>
                        <el-tag class="ml10">价格：<span class="red">￥{{goods.price}}</span></el-tag>
                        <el-tag class="ml10">库存：{{goods.inventory}}</el-tag>
                    </p>
                </el-card>
            </el-form-item>
            <el-form-item label="库存" prop="inventory">
                <el-input-number :min="1" :max="99999999" :precision="0" v-model="bargainForm.inventory" />
            </el-form-item>
            <el-form-item label="砍价阶梯">
                <el-card v-for="(item, index) in bargainForm.itemList" :key="index" class="mb10" style="background: #F8F9FC;position:relative;">
                    <el-row style="position: absolute;top: -5px;left: 0;">
                        <el-tag>阶段{{index+1}}</el-tag>
                        <span class="error ml10">{{bargainForm.itemList[index].errorText}}</span>
                    </el-row>
                    <el-button style="position: absolute;top: 0;right: 0;" @click="delItem(index)" v-show="bargainForm.itemList.length > 2" type="warning" class="ml20">删除</el-button>
                    <el-row class="mt20">
                        <span>帮砍人数：</span>
                        <el-input v-model="item.numberMin" :maxlength="4" style="width: 120px;">
                            <template slot="append">人</template>
                        </el-input>
                        <span class="ml5 mr5">至</span>
                        <el-input v-model="item.numberMax" :maxlength="4" style="width: 120px;">
                            <template slot="append">人</template>
                        </el-input>
                        <span class="ml20">总砍价比例：</span>
                        <el-input v-model="item.promotionMin" :maxlength="2" style="width: 120px;">
                            <template slot="append">%</template>
                        </el-input>
                        <span class="ml5 mr5">至</span>
                        <el-input v-model="item.promotionMax" :maxlength="2" style="width: 120px;">
                            <template slot="append">%</template>
                        </el-input>
                    </el-row>
                </el-card>
                <el-button @click="addItem" v-show="bargainForm.itemList.length < 5" type="primary">新增阶梯</el-button>
                <span class="error ml10">{{bargainError}}</span>
            </el-form-item>
            <el-form-item label="业务逻辑">
                <p>用户发起砍价为第一刀砍价，砍价比例在15%-20%之间</p>
                <p>砍价阶梯比例在65%-75%之间</p>
                <p>剩余5%-20%在首次分享里分配</p>
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
    props: {
        activity: {
            type: Object
        },
    },
    data () {
        return {
            // 砍价错误
            bargainError: '',
            // 商品弹框展示标识
            goodsFlag: false,
            goods: null,
            rules: {
                activityName: [
                    { required: true, message: '请输入活动名称', trigger: 'blur' },
                ],
                inventory: [
                    { required: true, message: '请输入库存', trigger: 'blur' }
                ],
                goodsSkuCode: [
                    {required: true, message: '请选择参与商品', trigger: 'blur' }
                ],
            },
            bargainForm: {
                id: '',
                validityDateType: 1,
                inventory: '',
                goodsSkuCode: '',
                itemList: [
                    {numberMin: '1', numberMax: '1', promotionMin: '35', promotionMax: '40'},
                    {numberMin: '1', numberMax: '1', promotionMin: '30', promotionMax: '35'},
                ]
            },
            loading: false,
            buttonText: '立即创建',
        }
    },
    created() {
        // id，用来判断新增还是编辑
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
            this.bargainForm.goodsSkuCode = goods.skuCode;
            console.log(this.bargainForm.goodsSkuCode);
        },
        // 删除阶梯
        delItem(index) {
            this.bargainForm.itemList.splice(index, 1);
        },
        // 新增阶梯
        addItem() {
            this.bargainForm.itemList.push({numberMin: '', numberMax: '', promotionMin: '', promotionMax: ''});
        },
        // 提交
        onSubmit(formName) {
            this.$refs[formName].validate((valid) => {

                if (valid) {

                    // 验证砍价阶梯
                    let sumPromotionMin = 0, sumPromotionMax = 0;
                    for(var i=0; i<this.bargainForm.itemList.length; i++) {
                        let item = this.bargainForm.itemList[i];
                        if(!item.numberMin || item.numberMin == '' || !item.numberMax || item.numberMax == '') {
                            item.errorText = "帮砍人数不能为空";
                            this.$set(this.bargainForm.itemList, i, item);
                            return;
                        } else if(!Number.isInteger(Number(item.numberMin)) || !Number.isInteger(Number(item.numberMax))) {
                            item.errorText = "帮砍人数只能为数字";
                            this.$set(this.bargainForm.itemList, i, item);
                            return;
                        } else if(Number(item.numberMin) < 1 || Number(item.numberMax) < 1) {
                            item.errorText = "帮砍人数必须大于0";
                            this.$set(this.bargainForm.itemList, i, item);
                            return;
                        } else if(Number(item.numberMin) > Number(item.numberMax)) {
                            item.errorText = "帮砍人数范围错误";
                            this.$set(this.bargainForm.itemList, i, item);
                            return;
                        } else if(!item.promotionMin || item.promotionMin == '' || !item.promotionMax || item.promotionMax == '') {
                            item.errorText = "砍价比例不能为空";
                            this.$set(this.bargainForm.itemList, i, item);
                            return;
                        } else if(!Number.isInteger(Number(item.promotionMin)) || !Number.isInteger(Number(item.promotionMax))) {
                            item.errorText = "砍价比例只能为数字";
                            this.$set(this.bargainForm.itemList, i, item);
                            return;
                        } else if(Number(item.promotionMin) < 1 || Number(item.promotionMax) < 1) {
                            item.errorText = "砍价比例必须大于0";
                            this.$set(this.bargainForm.itemList, i, item);
                            return;
                        }  else if(Number(item.promotionMin) > 85 || Number(item.promotionMax) > 85) {
                            item.errorText = "砍价比例不能大于85";
                            this.$set(this.bargainForm.itemList, i, item);
                            return;
                        }  else if(Number(item.promotionMin) > Number(item.promotionMax)) {
                            item.errorText = "砍价比例范围错误";
                            this.$set(this.bargainForm.itemList, i, item);
                            return;
                        } else {
                            item.errorText = "";
                            this.$set(this.bargainForm.itemList, i, item);
                        }
                        sumPromotionMin += Number(item.promotionMin);
                        sumPromotionMax += Number(item.promotionMax);
                    }
                    if(sumPromotionMin > sumPromotionMax) {
                        this.bargainError = '砍价总最小比例不能大于砍价总最大比例';
                        return;
                    } else if(sumPromotionMin < 65 || sumPromotionMax > 75) {
                        this.bargainError = '砍价总比例在65-75之间';
                        return;
                    } else {
                        this.bargainError = '';
                    }

                    
                    // this.bargainForm.startTime = Util.dateFormatter(this.bargainForm.effectTime[0]);
                    // this.bargainForm.endTime = Util.dateFormatter(this.bargainForm.effectTime[1]);
                    // this.loading = true;
                    console.log(this.bargainForm);
                    return;
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
