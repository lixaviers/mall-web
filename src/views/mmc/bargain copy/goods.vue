<template>
    <div class="gooods__edit">
        <el-card shadow="always">
            <el-form :model="bargainForm" ref="bargainForm" label-width="120px" :rules="rules" class="mt20">
                <el-form-item label="活动名称" prop="activityName">
                    <el-input v-model="bargainForm.activityName" placeholder="活动名称" style="width: 400px" maxlength="50" show-word-limit></el-input>
                </el-form-item>
                <el-form-item label="生效时间" prop="effectTime">
                    <el-date-picker
                        v-model="bargainForm.effectTime"
                        @input="testClick" :picker-options="pickerOptions"
                        type="datetimerange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        :default-time="['00:00:00', '23:59:59']">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="活动规则" prop="activityRule">
                    <el-input type="textarea" v-model="bargainForm.activityRule" 
                        style="width: 500px;"
                        maxlength="2000" show-word-limit
                        :autosize="{ minRows: 10, maxRows: 15 }"
                        >
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit('bargainForm')">下一步</el-button>
                    <el-button type="primary" :loading="loading" @click="onSubmit('bargainForm')">{{buttonText}}</el-button>
                    <el-button @click="$router.push({name:'bargainList'})">取消</el-button>
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
            stepIndex:
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
                activityName: '',
                effectTime: '',
                activityRule: '',
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
