<template>
    <div>
        <el-card shadow="always">
            <div slot="header" class="clearfix">
                <span>基本信息</span>
            </div>
            <el-form ref="shopInfoForm" :rules="rule" label-width="120px" :model="shopInfoForm" style="width: 500px;">
                <el-form-item label="店铺名称：" prop="shopName">
                    <el-input v-model="shopInfoForm.shopName" maxlength="50" show-word-limit></el-input>
                </el-form-item>
                <el-form-item label="创建时间：">
                    {{shopInfoForm.createTime}}
                </el-form-item>
                <el-form-item label="店铺简介：">
                    <el-input type="textarea" v-model="shopInfoForm.shopIntroduction" :autosize="{ minRows: 3, maxRows: 5 }" maxlength="100" show-word-limit></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit('shopInfoForm')" :loading="loading">保存</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>
<script>
    import Util from '../../../libs/util';
    import API from '../../../libs/api.js'
    export default {
        data() {
            return {
                loading: false,
                shopInfoForm: {
                    shopName: '',
                    createTime: '',
                    shopIntroduction: ''
                },
                rule: {
                    shopName: [
                        { required: true, message: '请填写店铺名称', trigger: 'blur' },
                    ],
                }
            };
        },
        created() {
            this.getShopInfo();
        },
        methods: {
            onSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.loading = true;
                        API.operationShopUpdate(this.shopInfoForm).then((res)=> {
                            Util.messageSuccess('保存成功')
                        }).finally((res) => {
                            if(this.loading)this.loading = false;
                            this.$router.push({name: 'shopInfo'});
                        });
                    }
                })
            },
            getShopInfo() {
                API.operationShopInfo().then((res)=> {
                    this.shopInfoForm = res.data;
                    this.shopInfoForm.createTime = Util.dateFormatter(res.data.createTime);
                });
            },
        }
    }
</script>