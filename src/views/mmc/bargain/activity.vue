<template>
    <div class="gooods__edit">
        <el-form :model="activityForm" ref="activityForm" label-width="120px" :rules="rules" class="mt20">
            <el-form-item label="生效时间" prop="effectTime">
                <el-date-picker
                    v-model="activityForm.effectTime"
                    @input="testClick" :picker-options="pickerOptions"
                    type="datetimerange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    :default-time="['00:00:00', '23:59:59']">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="活动规则" prop="activityRule">
                <el-input type="textarea" v-model="activityForm.activityRule" 
                    style="width: 500px;"
                    maxlength="2000" show-word-limit
                    :autosize="{ minRows: 10, maxRows: 15 }"
                    >
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="next('activityForm')">下一步</el-button>
                <el-button @click="$router.push({name:'bargainList'})">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import Util from '../../../libs/util';
import API from '../../../libs/api.js';
export default {
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
            rules: {
                effectTime: [
                    { type: 'array', required: true, message: '请选择生效时间', trigger: 'change' }
                ],
                activityRule: [
                    {required: true, message: '请输入活动规则', trigger: 'blur' }
                ],
            },
            activityForm: {
                id: '',
                effectTime: '',
                activityRule: '',
            },
        }
    },
    created() {
    },
    methods: {
        getBargainInfo(obj) {
            this.activityForm = obj;
            // 设置时间选择
            this.$set(this.activityForm, "effectTime", [new Date(obj.startTime), new Date(obj.endTime)]);
        },
        testClick(e) {
            this.$nextTick(() => {
                this.activityForm.effectTime = [];
                this.$set(this.activityForm, "effectTime", [e[0], e[1]]);
            });
        },
        next(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$emit('setActivity', this.activityForm);
                } else {
                    return false;
                }
            });
        },
    }
}
</script>
