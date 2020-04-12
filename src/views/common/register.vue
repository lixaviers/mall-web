<template>
    <div class="suyan__login">
        <div class="brand__info">
            <h1>素焉商城</h1>
            <h2 class="intro">基于Vue、Element构建开发，提供一套电商解决方案。</h2>
        </div>
        <div class="login__main">
            <h3 class="login__title">免费注册</h3>
            <el-form :model="formItem" :rules="registerRule" label-width="0" ref="registerForm">
                <el-form-item prop="mobile">
                    <el-input v-model="formItem.mobile" maxlength="11" show-word-limit placeholder="手机号" />
                </el-form-item>
                <el-form-item prop="smsVerCode">
                    <el-row>
                        <el-col :span="15">
                            <el-input maxlength="6" v-model="formItem.smsVerCode" placeholder="验证码" />
                        </el-col>
                        <el-col v-show="!sendSmsFlag" :span="5">
                            <el-button type="primary" ghost @click="sendSmsVerCode" :loading="smsBtnLoading" style="width: 115px;">发送验证码</el-button>
                        </el-col>
                        <el-col v-show="sendSmsFlag" :span="5">
                            <el-button style="width: 115px;" type="primary" disabled>{{countdown}}s</el-button>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item prop="userPwd">
                    <el-input type="password" maxlength="20" v-model="formItem.userPwd" placeholder="8-20位字符" />
                </el-form-item>
                <el-form-item prop="confirmPwd">
                    <el-input type="password" maxlength="20" v-model="formItem.confirmPwd" placeholder="请再次输入密码" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" class="login_submit" :loading="btnLoading" @click="handleSubmit('registerForm')">注册</el-button>
                </el-form-item>
                <p>已有账号？&nbsp;<a @click="$router.push({name: 'login'})">立即登录</a></p>
            </el-form>
        </div>
    </div>
</template>

<script>
import Util from '../../libs/util';
import API from '../../libs/api.js'
export default {
    data () {
        return {
            sendSmsFlag: false,
            smsBtnLoading: false,
            btnLoading: false,
            countdown: 60,
            formItem: {
                mobile: '17701744230',
                smsVerCode: '000000',
                userPwd: '123456789',
                confirmPwd: '123456789',
            },
            registerRule: {
                mobile: [
                    { required: true, message: '请填写手机号', trigger: 'blur' },
                    { pattern: /^1\d{10}$/, message: '手机号格式错误', trigger: 'blur' }
                ],
                smsVerCode: [
                    { required: true, message: '请填写6位验证码', trigger: 'blur' },
                    { min:6, max: 6, message: '请填写6位验证码', trigger: 'blur' },
                ],
                userPwd: [
                    { required: true, message: '请填写密码', trigger: 'blur' },
                    { min:8, max: 20, message: '密码格式错误', trigger: 'blur' },
                ],
                confirmPwd: [
                    { required: true, message: '请确认密码', trigger: 'blur' },
                    {
                        validator: (rule,value,callback) => {
                            if(value!==this.formItem.userPwd) {
                                callback(new Error('两次输入密码不一致'));
                            } else {
                                callback();
                            }
                        },
                    trigger:'blur'
                    }
                ]
            }
        }
    },
    computed: {
        sidebarFold: {
            get () { return this.$store.state.sidebarFold },
            set (val) { this.$store.commit('updateSidebarFold', val) }
        },
        nickName: {
            get () { return this.$store.state.nickName },
            set (val) { this.$store.commit('updateNickName', val) }
        },
    },
    methods: {
        handleSubmit(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.btnLoading = true,
                    API.userShopRegister(this.formItem).then((res)=> {
                        Util.setToken(res.data.sessionId);
                        Util.setUserInfo(res.data);
                        this.$router.push({name: 'shopCreate'});
                    }).finally((res) => {
                        if(this.btnLoading)this.btnLoading = false;
                    });
                }
            })
        },
        sendSmsVerCode() {
            let _t = this;
            if(!_t.sendSmsFlag) {
                if(!/^1\d{10}$/.test(_t.formItem.mobile)) {
                    this.$Message.error('手机号格式错误');
                    return;
                }
                _t.smsBtnLoading = true;
                let channel = 'operationb';
                let sign = Util.md5Encrypt(_t.formItem.mobile + channel + "8e8618b39dfbb0c298425e42f479b3dd");
                let _data = {mobile: _t.formItem.mobile, channel: channel, sign: sign, source: "storeRegister"};
                API.userSendSmsVerCode(_data).then((res)=> {
                    Util.messageSuccess('短信发送成功');
                    _t.sendSmsFlag = true;
                    let _interval = setInterval(() => {
                        _t.countdown = _t.countdown - 1;
                        if(_t.countdown <= 0) {
                            _t.sendSmsFlag = false;
                            _t.countdown = 60;
                            window.clearTimeout(_interval);
                        }
                    }, 1000);
                }).finally((res) => {
                    if(_t.smsBtnLoading)this.smsBtnLoading = false;
                });
            }
        }
    }
}
</script>
