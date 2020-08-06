<template>
    <div class="gooods__edit">
        <el-card shadow="always">
            <el-form :model="couponForm" ref="couponForm" label-width="120px" :rules="rules">
                <h3>基本信息</h3>
                <el-divider></el-divider>
                <el-form-item label="优惠券名称" prop="couponName">
                    <el-input v-model="couponForm.couponName" placeholder="优惠券名称" style="width: 400px" maxlength="50" show-word-limit></el-input>
                </el-form-item>
                <el-form-item label="优惠券类型">
                    <el-select v-model="couponForm.couponType" placeholder="请选择">
                        <el-option
                            v-for="item in couponTypeOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                    <div class="el-form-item__error" v-if="couponTypeErrorFlag">{{couponTypeErrorText}}</div>
                </el-form-item>
                <el-form-item>
                    <span v-if="couponForm.couponType == 2 || couponForm.couponType == 3 || couponForm.couponType == 4">
                        <span v-if="couponForm.couponType == 3">每</span>满&nbsp;<el-input-number style="width:150px" :min="0.01" :max="99999999" :precision="2" v-model="couponForm.orderFullAmount" />&nbsp;元
                    </span>
                    <span v-if="couponForm.couponType == 1 || couponForm.couponType == 2 || couponForm.couponType == 3">
                        优惠&nbsp;<el-input-number style="width:150px" :min="0.01" :max="99999999" :precision="2" v-model="couponForm.promotionAmount" />&nbsp;元
                    </span>
                    <span v-if="couponForm.couponType == 4">
                        优惠&nbsp;<el-input-number style="width:150px" :min="0.1" :max="9.9" :precision="1" v-model="couponForm.discountAmount" />&nbsp;折
                    </span>
                    <span v-if="couponForm.couponType == 3 || couponForm.couponType == 4">
                        封顶优惠&nbsp;<el-input-number style="width:150px" :max="99999999" :precision="2" v-model="couponForm.promotionMaxAmount" />&nbsp;元
                    </span>
                    <div v-if="couponForm.couponType == 5">
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
                        v-model="couponForm.effectTime"
                        @input="testClick" :picker-options="pickerOptions"
                        type="datetimerange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        :default-time="['00:00:00', '23:59:59']">
                    </el-date-picker>
                </el-form-item>
                <h3>限制条件</h3>
                <el-divider></el-divider>
                <el-form-item label="限购">
                    <el-radio v-model="couponForm.useType" :label="1">免费</el-radio>
                    <el-radio v-model="couponForm.useType" :label="2">付费</el-radio>
                </el-form-item>
                <el-form-item v-if="couponForm.useType == 2" label="价格">
                    <el-input-number style="width:200px" :min="0.01" :max="99999999" :precision="2" v-model="couponForm.price" />&nbsp;元
                </el-form-item>
                <el-form-item label="限领">
                    <el-checkbox v-model="isPersonLimit" size="large">限制每人可领张数</el-checkbox>
                    <el-input-number v-if="isPersonLimit" style="width:100px;margin-left:10px;" :min="0" :max="99999999" :precision="0" v-model="couponForm.personLimit" />
                </el-form-item>
                <el-form-item label="限用">
                    <el-checkbox v-model="isOrderLimit" size="large">限制每个订单可以使用张数</el-checkbox>
                    <el-input-number v-if="isOrderLimit" style="width:100px;margin-left:10px;" :min="0" :max="99999999" :precision="0" v-model="couponForm.orderLimit" />
                </el-form-item>
                <h3>适用范围</h3>
                <el-divider></el-divider>
                <el-form-item label="使用范围">
                    <el-radio-group v-model="couponForm.couponScope">
                        <el-radio-button label="1">全店铺</el-radio-button>
                        <el-radio-button label="2">按商品类目</el-radio-button>
                    </el-radio-group>
                    <promotion-scope :data="goodsCategoryList" :defaultCheckeds="goodsCategoryCheckeds" @close="scopeClose" :visible="goodsCategoryVisible"></promotion-scope>
                    <div v-show="couponForm.couponScope==2" class="mt10 mb10"><el-button @click="couponScopeChange">选择商品类目</el-button></div>
                    <ul v-show="goodsCategoryCheckedList">
                        <el-tag @close="goodsCategoryCheckedClose(item)" v-for="item in goodsCategoryCheckedList" :key="item.goodsCategoryId" closable class="mr5">{{item.goodsCategoryName}}</el-tag>
                    </ul>
                    <div v-show="goodsCategoryErrorFlag" class="el-form-item__error">请选择商品类目</div>
                </el-form-item>
                <el-form-item label="渠道">
                    <div class="mb10" v-for="(item, index) in channelList" :key="item.id">
                        <el-checkbox v-model="channelList[index].checked">{{item.label}}</el-checkbox>
                        <el-input-number v-show="channelList[index].checked" :min="1" :max="99999999" :precision="0" v-model="channelList[index].inventory" class="ml10" />
                        <div v-show="channelErrorFlag" class="el-form-item__error">渠道数据错误</div>
                    </div>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" :loading="loading" @click="onSubmit('couponForm')">{{buttonText}}</el-button>
                    <el-button @click="$router.push({name:'couponList'})">取消</el-button>
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
            // 优惠券渠道
            channelList: [],
            // 渠道错误标识
            channelErrorFlag: false,
            // 商品类目错误标识
            goodsCategoryErrorFlag: false,
            // 使用范围商品类目展示标识
            goodsCategoryVisible: false,
            goodsCategoryList:[],
            // 选中的商品类目
            goodsCategoryCheckeds:[],
            goodsCategoryCheckedList: [],
            rules: {
                couponName: [
                    { required: true, message: '请输入优惠券名称', trigger: 'blur' },
                ],
                effectTime: [
                    { type: 'array', required: true, message: '请选择生效时间', trigger: 'change' }
                ],
                description: [
                    {required: true, message: '请输入商品详情', trigger: 'blur' }
                ],
            },
            // 优惠券类型选项
            couponTypeOptions: [],
            // 是否限制每人可领张数
            isPersonLimit: false,
            // 是否限制订单可以使用张数
            isOrderLimit: false,
            // 阶梯满减
            promotionAmountScope: [
                {orderFullAmount: '', promotionAmount: '',},
                {orderFullAmount: '', promotionAmount: '',}
            ],
            couponForm: {
                id: '',
                couponName: '',
                couponType: 1,
                promotionAmount: '',
                orderFullAmount: '',
                discountAmount: '',
                promotionMaxAmount: '',
                effectTime: '',
                useType: 1,
                personLimit: 0,
                orderLimit: 0,
                price: 0,
                couponScope: 1,
                promotionScopeList: [],
                // 优惠券渠道
                channelList: [],
            },
            // 优惠券错误标志
            couponTypeErrorFlag: false,
            couponTypeErrorText: '',
            loading: false,
            buttonText: '立即创建',
        }
    },
    created() {
        // 获取优惠券类型列表
        API.getPromotionTypes(1).then((res)=> {
            this.couponTypeOptions = res.data;
            // 获取渠道列表
            API.getCouponChannelTypes().then((res)=> {
                this.channelList = res.data;
                
                // 优惠券id，用来判断新增还是编辑
                let id = this.$route.query.id;
                if(id) {
                    this.buttonText = '立即保存';
                    // 获取商品详情
                    API.couponGet(id).then((res)=> {
                        this.couponForm = res.data;
                        this.promotionAmountScope = res.data.promotionAmountScopeList;
                        if(res.data.personLimit > 0) {
                            this.isPersonLimit = true;
                        }
                        if(res.data.orderLimit > 0) {
                            this.isOrderLimit = true;
                        }
                        // 设置时间选择
                        this.$set(this.couponForm, "effectTime", [new Date(res.data.startTime), new Date(res.data.endTime)]);
                        this.goodsCategoryCheckedList = res.data.promotionScopeList;

                        res.data.channelList.forEach(item => {
                            this.channelList.forEach(channel => {
                                if(channel.value == item.channelId) {
                                    channel.checked = true;
                                    channel.inventory = item.inventory;
                                }
                            });
                        });

                    });
                }
            });
        });
        

    },
    methods: {
        // 使用范围
        couponScopeChange() {
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
                this.couponForm.effectTime = [];
                this.$set(this.couponForm, "effectTime", [e[0], e[1]]);
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
                    if(this.couponForm.couponType == 2 || this.couponForm.couponType == 3) {
                        // 满减券
                        if(this.couponForm.orderFullAmount <= this.couponForm.promotionAmount) {
                            this.couponTypeErrorFlag = true;
                            this.couponTypeErrorText = '订单金额必须大于优惠金额';
                            return;
                        } else {
                            this.couponTypeErrorFlag = false;
                        }
                    } else if(this.couponForm.couponType == 5) {
                        // 阶梯满减券
                        let minOrderFullAmount, minPromotionAmount;
                        for(var i=0; i < this.promotionAmountScope.length; i++) {
                            if(this.promotionAmountScope[i].orderFullAmount <= this.promotionAmountScope[i].promotionAmount) {
                                this.couponTypeErrorFlag = true;
                                this.couponTypeErrorText = '阶梯有误';
                                return;
                            }
                            if(i == 0) {
                                minOrderFullAmount = this.promotionAmountScope[i].orderFullAmount;
                                minPromotionAmount = this.promotionAmountScope[i].promotionAmount;
                            } else {
                                if(minOrderFullAmount >= this.promotionAmountScope[i].orderFullAmount || minPromotionAmount >= this.promotionAmountScope[i].promotionAmount) {
                                    this.couponTypeErrorFlag = true;
                                    this.couponTypeErrorText = '阶梯有误';
                                    return;
                                }
                            }
                        }
                        this.couponTypeErrorFlag = false;
                        this.couponForm.promotionScopeList = this.promotionAmountScope;
                    }
                    if(this.couponForm.couponScope == 2) {
                        // 使用范围 按商品类目
                        if(!this.goodsCategoryCheckedList || this.goodsCategoryCheckedList.length == 0) {
                            this.goodsCategoryErrorFlag = true;
                            return;
                        }
                        this.couponForm.promotionScopeList = this.goodsCategoryCheckedList;
                    }

                    // 验证渠道
                    let channelList = [];
                    this.channelList.forEach(item => {
                        if(item.checked) {
                            if(!item.inventory) {
                                this.channelErrorFlag = true;
                                return;
                            }
                            channelList.push({channelId: item.value, inventory: item.inventory, isIssueTime: false});
                        }
                    });
                    if(!channelList || channelList.length == 0) {
                            this.channelErrorFlag = true;
                            return;
                    }

                    this.channelErrorFlag = false;
                    this.couponForm.channelList = channelList;
                    this.goodsCategoryErrorFlag = false;
                    this.couponForm.startTime = Util.dateFormatter(this.couponForm.effectTime[0]);
                    this.couponForm.endTime = Util.dateFormatter(this.couponForm.effectTime[1]);
                    this.loading = true;
                    console.log(this.couponForm);
                    API.couponAdd(this.couponForm).then((res)=> {
                        console.log(res);
                        if(this.couponForm.id) {
                            Util.messageSuccess("保存成功");
                        } else {
                            Util.messageSuccess("创建成功");
                        }
                        this.$router.push({name:'couponList'});
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
