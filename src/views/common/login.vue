<template>
    <div class="suyan__login">
        <div class="brand__info">
            <h1>素焉商城</h1>
            <h2 class="intro">基于Vue、Element构建开发，提供一套电商解决方案。</h2>
        </div>
        <div class="login__main">
            <h3 class="login__title">商户登录</h3>
            <el-form :model="loginForm" label-width="0" :rules="loginRule" ref="loginForm">
                <el-form-item prop="mobile">
                    <el-input v-model="loginForm.mobile" placeholder="手机号" maxlength="11" />
                </el-form-item>
                <el-form-item prop="userPwd">
                    <el-input v-model="loginForm.userPwd" placeholder="密码" type="password" maxlength="20" />
                </el-form-item>
                <el-form-item>
                    <el-button class="login_submit" :loading="btnLoading" type="primary" @click="handleSubmit('loginForm')">登录</el-button>
                </el-form-item>
                <p>还没有账号？&nbsp;<a @click="$router.push({name: 'register'})">立即注册</a></p>
            </el-form>
        </div>
    </div>
</template>

<script>
import Util from '../../libs/util';
import API from '../../libs/api.js';
export default {
    data () {
        return {
            btnLoading: false,
            loginForm: {
                mobile: '13112341234',
                userPwd: '123456789',
            },
            loginRule: {
                mobile: [
                    { required: true, message: '请填写手机号', trigger: 'blur' },
                    { pattern: /^1\d{10}$/, message: '手机号格式错误', trigger: 'blur' }
                ],
                userPwd: [
                    { required: true, message: '请填写密码', trigger: 'blur' },
                ],
            }
        }
    },
    methods: {
        handleSubmit(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.btnLoading = true;
                    API.userShopLogin(this.loginForm).then((res)=> {
                        Util.setToken(res.data.sessionId);
                        Util.setUserInfo(res.data);
                        if(res.data.shopId) {
                            this.$router.push({name: 'home'});
                        } else {
                            this.$router.push({name: 'shopList'});
                        }
                    }).finally((res) => {
                        if(this.btnLoading)this.btnLoading = false;
                    });
                }
            })
        },
    }
}
</script>
