<template>
    <div  class="suyan__shop__create">
        <el-row class="suyan__steps">
            <el-col :span="8" class="steps__item finish">
                <div class="steps__step finish">1.经营信息</div>
            </el-col>
            <el-col :span="8" class="steps__item finish">
                <div class="steps__step">2.店铺信息</div>
            </el-col>
            <el-col :span="8" class="steps__item">
                <div class="steps__step">3.完成</div>
            </el-col>
        </el-row>
        <div class="create__shop">
            <el-form ref="createForm" :model="createForm" :rules="createRule" label-width="80">
                <el-form-item label="店铺名称" prop="shopName">
                    <el-input v-model="createForm.shopName" maxlength="15" style="width: 350px;" placeholder="请输入店铺名称，15字以内" />
                </el-form-item>
                <el-form-item label="店铺地址" prop="address">
                    <el-cascader v-model="createForm.address" :props="props" style="width: 350px" placeholder="请选择省 / 市 / 区"></el-cascader>
                </el-form-item>
                <el-form-item label="详细地址" prop="detailAddress">
                    <el-input v-model="createForm.detailAddress" placeholder="请填写详细地址" style="width: 350px;" />
                </el-form-item>
                <el-form-item>
                    <el-button style="margin-left: 80px;" type="primary" @click="handleSubmit('createForm')">创建店铺</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    import Util from '../../../libs/util';
    import API from '../../../libs/api.js'
    export default {
        computed: {
        },
        data() {
            return {
                nickName: '',
                createForm: {
                    categoryId: '',
                    shopName: '',
                    provinceId: '',
                    cityId: '',
                    areaId: '',
                    detailAddress: '',
                    address: [],
                },
                provinceList: [],
                
                createRule: {
                    shopName: [
                        { required: true, message: '请填写店铺名称', trigger: 'blur' }
                    ],
                    detailAddress: [
                        { required: true, message: '请填写店铺详细地址', trigger: 'blur' }
                    ],
                    address: [
                        { type: 'array', required: true, message: '请选择省 / 市 / 区', trigger: 'change' }
                    ]
                },
                props: {
                    lazy: true,
                    lazyLoad(node, resolve) {
                        console.log(node);
                        if(node.value) {
                            API.operationGetAddress(node.value).then((res)=> {
                                let list = [];
                                res.data.forEach(bean => {
                                    if(node.level === 2) {
                                        list.push({value: bean.id,label: bean.name, leaf: true});
                                    } else {
                                        list.push({value: bean.id,label: bean.name, loading: false, leaf: false});
                                    }
                                });
                                resolve(list);
                            });
                        } else {
                            API.operationGetAddress(1).then((res)=> {
                                let provinceList = [];
                                res.data.forEach(item => {
                                    provinceList.push({value: item.id,label: item.name, children:[], loading: false, addressLevel: item.addressLevel});
                                });
                                resolve(provinceList);
                            });
                        }
                    }
                },
            }
        },
        created() {
            this.$emit('child-event', this.$route.meta.title);
            this.nickName = Util.getUserInfo().nickName;
            // let categoryId = this.$route.params.categoryId;
            let categoryId = this.$route.query.categoryId;
            if(!categoryId) {
                this.$router.push({name:'shopCreate'});
            }
            this.createForm.categoryId = categoryId;
        },
        methods: {
            handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.createForm.provinceId = this.createForm.address[0];
                        this.createForm.cityId = this.createForm.address[1];
                        this.createForm.areaId = this.createForm.address[2];
                        API.operationShopAdd(this.createForm).then((res)=> {
                            this.$router.push({name:'shopList'});
                        });
                    }
                })
            },
        }
    }
</script>