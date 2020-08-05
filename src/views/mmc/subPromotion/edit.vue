<template>
    <div class="gooods__edit">
        <el-card shadow="always">
            <el-form :model="subPromotionForm" ref="subPromotionForm" label-width="120px" :rules="rules">
                <h3>基本信息</h3>
                <el-divider></el-divider>
                <el-form-item label="订单促销名称" prop="subPromotionName">
                    <el-input v-model="subPromotionForm.subPromotionName" placeholder="订单促销名称" style="width: 400px" maxlength="50" show-word-limit></el-input>
                </el-form-item>
                <el-form-item label="订单促销类型">
                    <el-select v-model="subPromotionForm.subPromotionType" placeholder="请选择">
                        <el-option
                            v-for="item in subPromotionTypeOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                    <div class="el-form-item__error" v-if="subPromotionTypeErrorFlag">{{subPromotionTypeErrorText}}</div>
                </el-form-item>
                <el-form-item>
                    <span v-if="subPromotionForm.subPromotionType == 21 || subPromotionForm.subPromotionType == 22 || subPromotionForm.subPromotionType == 23">
                        <span v-if="subPromotionForm.subPromotionType == 22">每</span>满&nbsp;<el-input-number style="width:150px" :min="0.01" :max="99999999" :precision="2" v-model="subPromotionForm.orderFullAmount" />&nbsp;元
                    </span>
                    <span v-if="subPromotionForm.subPromotionType == 21 || subPromotionForm.subPromotionType == 22">
                        优惠&nbsp;<el-input-number style="width:150px" :min="0.01" :max="99999999" :precision="2" v-model="subPromotionForm.promotionAmount" />&nbsp;元
                    </span>
                    <span v-if="subPromotionForm.subPromotionType == 23">
                        优惠&nbsp;<el-input-number style="width:150px" :min="0.1" :max="9.9" :precision="1" v-model="subPromotionForm.discountAmount" />&nbsp;折
                    </span>
                    <span v-if="subPromotionForm.subPromotionType == 22 || subPromotionForm.subPromotionType == 23">
                        封顶优惠&nbsp;<el-input-number style="width:150px" :max="99999999" :precision="2" v-model="subPromotionForm.promotionMaxAmount" />&nbsp;元
                    </span>
                    <div v-if="subPromotionForm.subPromotionType == 24">
                        <div v-for="(item, index) in promotionAmountScope" :key="index" class="mb10">
                            满&nbsp;<el-input-number style="width:150px" :min="0.01" :max="99999999" :precision="2" v-model="item.orderFullAmount" />&nbsp;元
                            优惠&nbsp;<el-input-number style="width:150px" :min="0.01" :max="99999999" :precision="2" v-model="item.promotionAmount" />&nbsp;元
                            <el-button class="ml20" v-if="promotionAmountScope.length > 2" @click="delPromotionAmountScope(index)" type="danger">删除阶梯</el-button>
                            <span class="ml10" style="color: #F56C6C;">{{item.error}}</span>
                        </div>
                        <el-button class="ml20" v-if="promotionAmountScope.length < 5" @click="addPromotionAmountScope()">新增阶梯</el-button>
                    </div>
                </el-form-item>
                <el-form-item label="生效时间" prop="effectTime">
                    <el-date-picker
                        v-model="subPromotionForm.effectTime"
                        @input="testClick" :picker-options="pickerOptions"
                        type="datetimerange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        :default-time="['00:00:00', '23:59:59']">
                    </el-date-picker>
                </el-form-item>
                <h3>适用范围</h3>
                <el-divider></el-divider>
                <el-form-item label="使用范围">
                    <el-radio-group v-model="subPromotionForm.subPromotionScope">
                        <el-radio-button label="1">全店铺</el-radio-button>
                        <el-radio-button label="2">按商品类目</el-radio-button>
                    </el-radio-group>
                    <promotion-scope :data="goodsCategoryList" :defaultCheckeds="goodsCategoryCheckeds" @close="scopeClose" :visible="goodsCategoryVisible"></promotion-scope>
                    <div v-show="subPromotionForm.subPromotionScope==2" class="mt10 mb10"><el-button @click="subPromotionScopeChange">选择商品类目</el-button></div>
                    <ul v-show="goodsCategoryCheckedList">
                        <el-tag @close="goodsCategoryCheckedClose(item)" v-for="item in goodsCategoryCheckedList" :key="item.goodsCategoryId" closable class="mr5">{{item.goodsCategoryName}}</el-tag>
                    </ul>
                    <div v-show="goodsCategoryErrorFlag" class="el-form-item__error">请选择商品类目</div>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" :loading="loading" @click="onSubmit('subPromotionForm')">{{buttonText}}</el-button>
                    <el-button @click="$router.push({name:'subPromotionList'})">取消</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>
<script>
import Util from '../../../libs/util';
import API from '../../../libs/api.js';
import PromotionScope from '@/components/promotionScope';
export default {
    components: {PromotionScope},
    data () {
        return {
            // 时间快捷选项
            pickerOptions: {
                shortcuts: [{
                    text: '有效期一周',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        end.setTime(start.getTime() + 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '有效期一个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        end.setTime(start.getTime() + 3600 * 1000 * 24 * 30);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '有效期三个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        end.setTime(start.getTime() + 3600 * 1000 * 24 * 90);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '有效期半年',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        end.setTime(start.getTime() + 3600 * 1000 * 24 * 180);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '有效期一年',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        end.setTime(start.getTime() + 3600 * 1000 * 24 * 365);
                        picker.$emit('pick', [start, end]);
                    }
                }]
            },
            // 商品类目错误标识
            goodsCategoryErrorFlag: false,
            // 使用范围商品类目展示标识
            goodsCategoryVisible: false,
            goodsCategoryList:[],
            // 选中的商品类目
            goodsCategoryCheckeds:[],
            goodsCategoryCheckedList: [],
            rules: {
                subPromotionName: [
                    { required: true, message: '请输入订单促销名称', trigger: 'blur' },
                ],
                effectTime: [
                    { type: 'array', required: true, message: '请选择生效时间', trigger: 'change' }
                ],
                description: [
                    {required: true, message: '请输入商品详情', trigger: 'blur' }
                ],
            },
            // 优惠券类型选项
            subPromotionTypeOptions: [],
            // 阶梯满减
            promotionAmountScope: [
                {orderFullAmount: '', promotionAmount: '',},
                {orderFullAmount: '', promotionAmount: '',}
            ],
            subPromotionForm: {
                id: '',
                subPromotionName: '',
                subPromotionType: 21,
                promotionAmount: '',
                orderFullAmount: '',
                discountAmount: '',
                promotionMaxAmount: '',
                effectTime: '',
                subPromotionScope: 1,
                promotionScopeList: []
            },
            // 优惠券错误标志
            subPromotionTypeErrorFlag: false,
            subPromotionTypeErrorText: '',
            loading: false,
            buttonText: '立即创建',
        }
    },
    created() {
        this.getSubPromotionTypeList();
        // 优惠券id，用来判断新增还是编辑
        let id = this.$route.query.id;
        if(id) {
            this.buttonText = '立即保存';
            // 获取商品详情
            API.subPromotionGet(id).then((res)=> {
                this.subPromotionForm = res.data;
                this.promotionAmountScope = res.data.promotionAmountScopeList;
                // 设置时间选择
                this.$set(this.subPromotionForm, "effectTime", [new Date(res.data.startTime), new Date(res.data.endTime)]);
                this.goodsCategoryCheckedList = res.data.promotionScopeList;
            });
        } else {
        }

    },
    methods: {
        // 使用范围
        subPromotionScopeChange() {
            if(!this.goodsCategoryList || this.goodsCategoryList.length == 0) {
                this.getCategoryData();
            } else {
                this.goodsCategoryVisible = true;
            }
            if(this.goodsCategoryCheckedList) {
                let goodsCategoryCheckeds = [];
                this.goodsCategoryCheckedList.forEach(item => {
                    goodsCategoryCheckeds.push(item.goodsCategoryId);
                });
                this.goodsCategoryCheckeds = goodsCategoryCheckeds;
            }
            console.log(this.goodsCategoryCheckeds)
        },
        // 删除已选择的类目
        goodsCategoryCheckedClose(obj) {
            this.goodsCategoryCheckedList.splice(this.goodsCategoryCheckedList.indexOf(obj), 1);
            console.log(this.goodsCategoryCheckedList)
        },
        scopeClose(goodsCategoryCheckedList) {
            this.goodsCategoryVisible = false;
            this.goodsCategoryCheckedList = goodsCategoryCheckedList;
        },
        // 获取商品类目
        getCategoryData() {
            API.goodsCategoryGetTree(2).then((res)=> {
                this.goodsCategoryList = res.data;
                this.goodsCategoryVisible = true;
            });
        },
        testClick(e) {
            this.$nextTick(() => {
                this.subPromotionForm.effectTime = [];
                this.$set(this.subPromotionForm, "effectTime", [e[0], e[1]]);
            });
        },
        // 获取列表
        getSubPromotionTypeList() {
            API.getPromotionTypes(2).then((res)=> {
                this.subPromotionTypeOptions = res.data;
            });
        },
        // 新增阶梯
        addPromotionAmountScope() {
            this.promotionAmountScope.push({orderFullAmount: '', promotionAmount: '',});
        },
        // 删除阶梯
        delPromotionAmountScope(index) {
            this.promotionAmountScope.splice(index, 1);
        },
        // 提交
        onSubmit(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if(this.subPromotionForm.subPromotionType == 21 || this.subPromotionForm.subPromotionType == 22) {
                        // 满减
                        if(this.subPromotionForm.orderFullAmount <= this.subPromotionForm.promotionAmount) {
                            this.subPromotionTypeErrorFlag = true;
                            this.subPromotionTypeErrorText = '订单金额必须大于优惠金额';
                            return;
                        } else {
                            this.subPromotionTypeErrorFlag = false;
                        }
                    } else if(this.subPromotionForm.subPromotionType == 24) {
                        // 阶梯满减
                        let minOrderFullAmount, minPromotionAmount;
                        for(var i=0; i < this.promotionAmountScope.length; i++) {
                            if(this.promotionAmountScope[i].orderFullAmount <= this.promotionAmountScope[i].promotionAmount) {
                                this.subPromotionTypeErrorFlag = true;
                                this.subPromotionTypeErrorText = '阶梯有误';
                                return;
                            }
                            if(i == 0) {
                                minOrderFullAmount = this.promotionAmountScope[i].orderFullAmount;
                                minPromotionAmount = this.promotionAmountScope[i].promotionAmount;
                            } else {
                                if(minOrderFullAmount >= this.promotionAmountScope[i].orderFullAmount || minPromotionAmount >= this.promotionAmountScope[i].promotionAmount) {
                                    this.subPromotionTypeErrorFlag = true;
                                    this.subPromotionTypeErrorText = '阶梯有误';
                                    return;
                                }
                            }
                        }
                        this.subPromotionTypeErrorFlag = false;
                        this.subPromotionForm.promotionScopeList = this.promotionAmountScope;
                    } else if(this.subPromotionForm.subPromotionType == 23) {
                        this.subPromotionForm.promotionAmount = null;
                    }
                    if(this.subPromotionForm.subPromotionScope == 2) {
                        // 使用范围 按商品类目
                        if(!this.goodsCategoryCheckedList || this.goodsCategoryCheckedList.length == 0) {
                            this.goodsCategoryErrorFlag = true;
                            return;
                        }
                        this.subPromotionForm.promotionScopeList = this.goodsCategoryCheckedList;
                    }
                    this.goodsCategoryErrorFlag = false;
                    this.subPromotionForm.startTime = Util.dateFormatter(this.subPromotionForm.effectTime[0]);
                    this.subPromotionForm.endTime = Util.dateFormatter(this.subPromotionForm.effectTime[1]);
                    this.loading = true;
                    console.log(this.subPromotionForm);
                    API.subPromotionAdd(this.subPromotionForm).then((res)=> {
                        console.log(res);
                        if(this.subPromotionForm.id) {
                            Util.messageSuccess("保存成功");
                        } else {
                            Util.messageSuccess("创建成功");
                        }
                        this.$router.push({name:'subPromotionList'});
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
