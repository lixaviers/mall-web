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
                <el-card v-for="(item, index) in bargainForm.bargainItemList" :key="index" class="mb10" style="background: #F8F9FC;position:relative;">
                    <el-row style="position: absolute;top: -5px;left: 0;">
                        <el-tag>阶段{{index+1}}</el-tag>
                        <span class="error ml10">{{bargainForm.bargainItemList[index].errorText}}</span>
                    </el-row>
                    <el-button style="position: absolute;top: 0;right: 0;" @click="delItem(index)" v-show="bargainForm.bargainItemList.length > 2" type="warning" class="ml20">删除</el-button>
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
                        <el-input v-model="item.bargainMin" :maxlength="2" style="width: 120px;">
                            <template slot="append">%</template>
                        </el-input>
                        <span class="ml5 mr5">至</span>
                        <el-input v-model="item.bargainMax" :maxlength="2" style="width: 120px;">
                            <template slot="append">%</template>
                        </el-input>
                    </el-row>
                </el-card>
                <el-button @click="addItem" v-show="bargainForm.bargainItemList.length < 5" type="primary">新增阶梯</el-button>
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
                bargainItemList: [
                    {numberMin: '', numberMax: '', bargainMin: '', bargainMax: ''},
                    {numberMin: '', numberMax: '', bargainMin: '', bargainMax: ''},
                ]
            },
            loading: false,
            buttonText: '立即创建',
        }
    },
    created() {
    },
    methods: {
        getBargainInfo(obj) {
            this.bargainForm = obj;
            this.buttonText = '立即保存';
            // 查询商品信息
            API.goodsSkuGet(obj.goodsSkuCode).then((res)=> {
                this.goods = res.data;
            });
        },
        // 选择商品
        selectGoods(goods) {
            this.goodsFlag = false;
            this.goods = goods;
            this.bargainForm.goodsSkuCode = goods.skuCode;
        },
        // 删除阶梯
        delItem(index) {
            this.bargainForm.bargainItemList.splice(index, 1);
        },
        // 新增阶梯
        addItem() {
            this.bargainForm.bargainItemList.push({numberMin: '', numberMax: '', bargainMin: '', bargainMax: ''});
        },
        // 提交
        onSubmit(formName) {
            this.$refs[formName].validate((valid) => {

                if (valid) {

                    // 验证砍价阶梯
                    let sumPromotionMin = 0, sumPromotionMax = 0;
                    for(var i=0; i < this.bargainForm.bargainItemList.length; i++) {
                        let item = this.bargainForm.bargainItemList[i];
                        if(!item.numberMin || item.numberMin == '' || !item.numberMax || item.numberMax == '') {
                            item.errorText = "帮砍人数不能为空";
                            this.$set(this.bargainForm.bargainItemList, i, item);
                            return;
                        } else if(!Number.isInteger(Number(item.numberMin)) || !Number.isInteger(Number(item.numberMax))) {
                            item.errorText = "帮砍人数只能为数字";
                            this.$set(this.bargainForm.bargainItemList, i, item);
                            return;
                        } else if(Number(item.numberMin) < 1 || Number(item.numberMax) < 1) {
                            item.errorText = "帮砍人数必须大于0";
                            this.$set(this.bargainForm.bargainItemList, i, item);
                            return;
                        } else if(Number(item.numberMin) > Number(item.numberMax)) {
                            item.errorText = "帮砍人数范围错误";
                            this.$set(this.bargainForm.bargainItemList, i, item);
                            return;
                        } else if(!item.bargainMin || item.bargainMin == '' || !item.bargainMax || item.bargainMax == '') {
                            item.errorText = "砍价比例不能为空";
                            this.$set(this.bargainForm.bargainItemList, i, item);
                            return;
                        } else if(!Number.isInteger(Number(item.bargainMin)) || !Number.isInteger(Number(item.bargainMax))) {
                            item.errorText = "砍价比例只能为数字";
                            this.$set(this.bargainForm.bargainItemList, i, item);
                            return;
                        } else if(Number(item.bargainMin) < 1 || Number(item.bargainMax) < 1) {
                            item.errorText = "砍价比例必须大于0";
                            this.$set(this.bargainForm.bargainItemList, i, item);
                            return;
                        }  else if(Number(item.bargainMin) > 85 || Number(item.bargainMax) > 85) {
                            item.errorText = "砍价比例不能大于85";
                            this.$set(this.bargainForm.bargainItemList, i, item);
                            return;
                        }  else if(Number(item.bargainMin) > Number(item.bargainMax)) {
                            item.errorText = "砍价比例范围错误";
                            this.$set(this.bargainForm.bargainItemList, i, item);
                            return;
                        } else {
                            item.errorText = "";
                            this.$set(this.bargainForm.bargainItemList, i, item);
                        }
                        sumPromotionMin += Number(item.bargainMin);
                        sumPromotionMax += Number(item.bargainMax);
                        item.promotionMin = Number(item.bargainMin) / 1000 * 10;
                        item.promotionMax = Number(item.bargainMax) / 1000 * 10;
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
                    
                    this.bargainForm.startTime = Util.dateFormatter(this.activity.effectTime[0]);
                    this.bargainForm.endTime = Util.dateFormatter(this.activity.effectTime[1]);
                    this.bargainForm.id = this.activity.id;
                    this.bargainForm.activityRule = this.activity.activityRule;
                    this.bargainForm.price = this.goods.price;
                    this.loading = true;
                    console.log('this.bargainForm', this.bargainForm);
                    API.bargainEdit(this.bargainForm).then((res)=> {
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
