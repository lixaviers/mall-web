<template>
    <div class="gooods__edit">
        <el-card class="mb20">
            <span>当前类目：{{goodsCategoryInfo.fullNamePath}}</span>
                <el-button type="primary" @click="changeGoodsCategory" class="ml20">切换类目</el-button>
        </el-card>
        <basic ref="goodsBasicRef" :goodsForm="goodsForm" :isEdit="isEdit"></basic>
        <el-form :model="goodsForm" ref="goodsForm" label-width="150px" :rules="rules">
            <sale v-model="goodsForm"></sale>
            <graphic v-model="goodsForm"></graphic>
            
            <div class="goods__edit__footer">
                <el-button type="primary" :loading="loading" @click="onSubmit('goodsForm')">{{buttonText}}</el-button>
                <el-button @click="$router.push({name:'goodsList'})">取消发布</el-button>
            </div>
        </el-form>
    </div>
</template>
<script>
import Util from '@/libs/util';
import Api from '@/libs/api.js';
import Basic from './components/basic';
export default {
    components: { Basic, Sale:() => import("./components/sale"), Graphic:() => import("./components/graphic")},
    data () {
        return {
            rules: {
                minimumQuantity: [
                    { required: true, message: '请输入起订量', trigger: 'blur' },
                ],
                fileList: [
                    { type: 'array', required: true, message: '请输入商品详情', trigger: 'change' }
                ],
                description: [
                    {required: true, message: '请输入商品详情', trigger: 'blur' }
                ],
            },
            props: {
                label: 'categoryName',
                value: 'id',
                children: 'childCategoryList'
            },
            isEdit: false,
            goodsCategoryList: [],
            // 商品品牌列表
            goodsBrandList: [],
            // 商品类目信息
            goodsCategoryInfo: {},
            goodsForm: {
                id: '',
                description: '',
                isPerPersonLimit: false,
                perPersonLimit: 0,
                minimumQuantity: 1,
                goodsName: '',
                goodsCategoryId: '',
                brandId: '',
                price: '',
                inventory: '',
                originalPrice: '',
                skuList: [],
                isMoreSpec: null,
                expressFreight: 0,
                // 商品类目属性列表信息
                goodsCategoryAttributeList: {},
                // 价格错误标识
                priceErrorFlag: false,
                fileList: [],
                specPrices: [],
            },
            loading: false,
            buttonText: '提交商品信息',
            specifications: [],
        }
    },
    created() {
        // 商品id，用来判断新增还是编辑
        let id = this.$route.query.id;
        // 商品类目id
        let goodsCategoryId = this.$route.query.goodsCategoryId;
        if(!id && !goodsCategoryId) {
            // 商品id和商品类目id不存在，调回选择商品类目页面
            this.$router.push({name: 'editGoodsCategory'});
        }
        if(id) {
            this.isEdit = true;
            this.buttonText = '保存商品信息';
            // 获取商品详情
            Api.goodsGet(id).then((res)=> {
                this.goodsForm.id = res.data.id;
                this.goodsForm.pictureUrls = res.data.pictureUrls;
                // 回显商品图片
                if(this.goodsForm.pictureUrls) {
                    let pics = this.goodsForm.pictureUrls.split(',');
                    for(let i=0;i<pics.length;i++) {
                        this.goodsForm.fileList.push({url: pics[i]});
                    }
                }
                this.goodsForm.description = res.data.description;
                this.goodsForm.perPersonLimit = res.data.perPersonLimit;
                if(this.goodsForm.perPersonLimit > 0) {
                    this.goodsForm.isPerPersonLimit = true;
                }
                this.goodsForm.goodsName = res.data.goodsName;
                this.goodsForm.goodsCategoryId = res.data.goodsCategoryId;
                this.goodsForm.attributeList = res.data.attributeList;
                if(goodsCategoryId) {
                    this.goodsForm.goodsCategoryId = goodsCategoryId;
                }
                this.$refs['goodsBasicRef'].getDataList();
                this.getGoodsCategoryInfo();
                this.goodsForm.brandId = res.data.brandId;
                this.goodsForm.listPrice = res.data.listPrice;
                this.goodsForm.minimumQuantity = res.data.minimumQuantity;
                this.goodsForm.originalPrice = res.data.originalPrice;
                this.goodsForm.skuList = res.data.skuList;
                this.goodsForm.isMoreSpec = res.data.isMoreSpec;
                this.goodsForm.expressFreight = res.data.expressFreight;
                this.specifications = res.data.specificationList;
                if(this.goodsForm.isMoreSpec) {
                    // 多规格
                    let arr = [], skuList = res.data.skuList;
                    for (var i = 0; i < skuList.length; i++) {
                        arr.push({prices: {inventory: skuList[i].inventory, price: skuList[i].price}});
                        let specValue = skuList[i].specValue.split(",");
                        arr[i].specifications = specValue;
                        arr[i].id = skuList[i].id;
                        for (var j = 0; j < specValue.length; j++) {
                            (arr[i]['spec' + j]) = specValue[j];
                        }
                    }
                    this.goodsForm.specPrices = arr;
                } else {
                    this.goodsForm.inventory = res.data.skuList[0].inventory;
                    this.specifications = [];
                    this.specifications.push({name: "", values: []});
                    this.goodsForm.specPrices = [];
                }
            });
        } else {
            this.goodsForm.isMoreSpec = false;
            this.goodsForm.goodsCategoryId = goodsCategoryId;
            this.goodsForm.specPrices = [];
            this.getGoodsCategoryInfo();
        }

    },
    methods: {
        // 获取商品类目信息
        getGoodsCategoryInfo() {
            Api.goodsCategoryGet(this.goodsForm.goodsCategoryId).then((res) => {
                this.goodsCategoryInfo = res.data;
            });
        },
        // 获取类目属性选择的值
        getGoodsCategoryAttributeSelect() {
            let list = this.goodsForm.goodsCategoryAttributeList, attributeList = [];
            if(list && list.length > 0) {
                list.forEach(item => {
                    if(item.value || item.valueId) {
                        attributeList.push({attributeId: item.id, attributeValueId: item.valueId, attributeValueName: item.value});
                    }
                });
            }
            this.goodsForm.attributeList = attributeList;
        },
        // 提交
        onSubmit(formName) {
            this.getGoodsCategoryAttributeSelect();
            console.log(this.goodsForm);
            const valid1 = new Promise((resolve,reject)=>{
                this.$refs['goodsBasicRef'].$refs['goodsForm'].validate(valid=>{
                    if(valid) {
                        resolve();
                    } else {
                        reject();
                    }
                })
            });
            const valid2 = new Promise((resolve,reject)=>{
                this.$refs[formName].validate(valid=>{
                    if(valid) {
                        resolve();
                    } else {
                        reject();
                    }
                })
            });
            Promise.all([valid1, valid2]).then(()=>{
                if(!this.goodsForm.isMoreSpec && !this.goodsForm.listPrice) {
                    this.goodsForm.priceErrorFlag = true;
                    return;
                }
                this.loading = true;
                this.goodsForm.priceErrorFlag = false;
                if(!this.goodsForm.isPerPersonLimit) {
                    this.goodsForm.perPersonLimit = 0;
                }
                let arr = this.goodsForm.tableData;
                if(this.goodsForm.isMoreSpec) {
                    for (var i = 0; i < arr.length; i++) {
                        let specValue = '';
                        for (var j = 0; j < arr[i].specifications.length; j++) {
                            specValue += arr[i].specifications[j];
                            if(j != arr[i].specifications.length - 1) {
                                specValue += ',';
                            }
                        }
                        arr[i].specValue = specValue;
                        arr[i].price = arr[i].prices.price;
                        arr[i].inventory = arr[i].prices.inventory;
                    }
                    this.goodsForm.skuList = arr;
                    this.goodsForm.goodsSpecificationList = this.specifications;
                } else {
                    if(!this.goodsForm.skuList || this.goodsForm.skuList.length == 0) {
                        this.goodsForm.skuList = [{price:this.goodsForm.listPrice, inventory: this.goodsForm.inventory}];
                    } else {
                        this.goodsForm.skuList[0].price = this.goodsForm.listPrice;
                        this.goodsForm.skuList[0].inventory= this.goodsForm.inventory;
                    }
                }
                Api.goodsAdd(this.goodsForm).then((res)=> {
                    if(this.goodsForm.id) {
                        Util.messageSuccess("保存成功");
                    } else {
                        Util.messageSuccess("创建成功");
                    }
                    this.$router.push({name:'goodsList'});
                }).finally((res) => {
                    if(this.loading)this.loading = false;
                });
            });
        },
        // 切换类目
        changeGoodsCategory() {
            this.$router.push({name: 'editGoodsCategory',query: {id: this.goodsForm.id, goodsCategoryId: this.goodsForm.goodsCategoryId}});
        },
    }
}
</script>

<style lang="less">
    .gooods__edit {
        padding-bottom: 72px;
    }
    .goods__attribute > .el-form-item__content {
        float: right;
        width: 860px;
    }
    .card__container {
        clear: both;
        width: 1024px; 
        margin: 0 auto;
    }
    .goods__edit__footer {
        width: 100%;
        position: fixed;
        bottom: 0;
        left: 0;
        height: 72px;
        line-height: 72px;
        text-align: center;
        background: #fff;
        border-top: 2px solid #4A77FF;
        z-index: 999;
        .el-button+.el-button {
            margin-left: 20px;
        }
    }
</style>