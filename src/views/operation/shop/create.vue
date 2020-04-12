<template>
    <div class="suyan__shop__create">
        <div class="content">
            <el-row class="suyan__steps">
                <el-col :span="8" class="steps__item finish">
                    <div class="steps__step finish">1.经营信息</div>
                </el-col>
                <el-col :span="8" class="steps__item">
                    <div class="steps__step">2.店铺信息</div>
                </el-col>
                <el-col :span="8" class="steps__item">
                    <div class="steps__step">3.完成</div>
                </el-col>
            </el-row>

            <div class="create">
                <h1>请选择你的主营商品</h1>
                <el-form ref="formInline" class="form">
                    <el-cascader placeholder="请选择类目" :options="categoryList" expandTrigger="click" @change="select" style="width: 350px"></el-cascader>
                    <el-form-item style="margin-top: 40px;text-align: center;">
                        <el-button :disabled="!categoryId" type="primary" @click="next()">下一步</el-button>
                    </el-form-item>
                </el-form>
            </div>
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
                categoryId: '',
                categoryName: '',
                categoryList: [],
            }
        },
        created() {
            this.$emit('child-event', this.$route.meta.title);
            this.nickName = Util.getUserInfo().nickName;
            this.getCategoryData();
        },
        methods: {
            getCategoryData() {
                API.operationCategoryGetTree().then((res)=> {
                    res.data.forEach(item => {
                        let children;
                        if(item.childCategoryList) {
                            children = [];
                            item.childCategoryList.forEach(child => {
                                children.push({value: child.id, label: child.categoryName});
                            });
                        }
                        this.categoryList.push({value: item.id, label: item.categoryName, children: children});
                    });
                    // this.categoryList = res.data;
                });

            },
            select(val) {
                if(val) {
                    this.categoryId = val[val.length - 1];
                }
            },
            next() {
                // this.$router.push({name:'shopCreateInfo',params:{categoryId:this.categoryId}});
                this.$router.push({name:'shopCreateInfo',query:{categoryId:this.categoryId}});
            }
        }
    }
</script>