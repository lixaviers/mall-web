<template>
    <div>
        <el-form :model="goodsForm" inline ref="goodsForm" label-width="150px">
            <el-card shadow="always">
                <div slot="header" class="clearfix">
                    <span>基础信息</span>
                </div>
                <el-row class="card__container">
                    <el-form-item label="商品名" prop="goodsName" :rules="{ required: true, message: '请输入商品名称', trigger: 'blur' }">
                        <el-input v-model="goodsForm.goodsName" placeholder="商品名" style="width: 400px" maxlength="50" show-word-limit></el-input>
                    </el-form-item>
                    <el-form-item label="商品分类" prop="goodsClassId">
                        <el-cascader v-model="goodsClassSeletedList" :options="goodsClassList" @change="goodsClassChange" :props="{ expandTrigger: 'hover', label: 'className', value: 'id' }"></el-cascader>
                    </el-form-item>
                    <el-form-item label="类目属性" class="goods__attribute">
                        <div style="color:#949494;font-size: 12px;">错误填写商品属性，可能会引起商品下架或搜索流量减少，影响您的正常销售，请认真准确填写！</div>
                        <el-row class="attribute__container">
                            <el-col :span="11">
                                <el-form-item label="商品品牌" :rules="{ required: true, message: '请选择品牌', trigger: 'blur' }" prop="brandId">
                                    <el-select v-model="goodsForm.brandId" placeholder="请选择">
                                        <el-option v-for="item in goodsBrandList" :key="item.id" :label="item.brandName" :value="item.id"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="11" v-for="(item, index) in goodsForm.goodsCategoryAttributeList" :key="'index' + index">
                                <el-form-item :rules="item.isMust ? {required: true, message: item.attributeName + '不能为空', trigger: 'blur'} : null"
                                :label="item.attributeName" 
                                :prop="item.isEnum ? 'goodsCategoryAttributeList.' + index + '.valueId' : 'goodsCategoryAttributeList.' + index + '.value'">
                                    <el-select v-if="item.isEnum" v-model="item.valueId" filterable placeholder="请选择">
                                        <el-option v-for="valueItem in item.attributeValues" :key="'valueItem' + valueItem.id" :label="valueItem.valueName" :value="valueItem.id">
                                        </el-option>
                                    </el-select>
                                    <el-input v-if="!item.isEnum" v-model="item.value"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form-item>
                </el-row>
            </el-card>
        </el-form>
    </div>
</template>

<script>
import Util from '@/libs/util';
import Api from '@/libs/api.js';
export default {
    props: {
        goodsForm: Object,
        isEdit: {
            type: Boolean,
            required: false,
            default() {
                return false
            },
        },
    },
    data () {
        return {
            goodsClassSeletedList: [],
            goodsBrandList: [],
            goodsClassList: [],
        }
    },
    created() {
        if(!this.isEdit) {
            this.getGoodsBrandList();
            this.goodsCategoryAttributeGetTreeByCategoryId();
            this.getGoodsClassList();
        }
    },
    methods: {
        getDataList() {
            this.getGoodsBrandList();
            this.goodsCategoryAttributeGetTreeByCategoryId();
            this.getGoodsClassList();
        },
        // 获取商品品牌列表
        getGoodsBrandList() {
            Api.goodsBrandGet(this.goodsForm.goodsCategoryId).then((res)=> {
                this.goodsBrandList = res.data;
            });
        },
        // 获取类目属性
        goodsCategoryAttributeGetTreeByCategoryId() {
            Api.goodsCategoryAttributeGetTreeByCategoryId(this.goodsForm.goodsCategoryId).then((res) => {
                if(this.isEdit) {
                    // 反选属性
                    res.data.forEach((goodsAttribute, index) => {
                        this.goodsForm.attributeList.forEach(attributeLast => {
                            if(goodsAttribute.id == attributeLast.goodsCategoryAttributeId) {
                                goodsAttribute.valueId = attributeLast.goodsCategoryAttributeValueId;
                                goodsAttribute.value = attributeLast.goodsCategoryAttributeValueName;
                            }
                        });
                    });
                }
                this.goodsForm.goodsCategoryAttributeList = res.data;
            });
        },
        onSubmit(formName) {
            this.$refs[formName].validate((valid) => {
                console.log('valid', valid);
            });
        },
        // 获取商品分类列表
        getGoodsClassList() {
            Api.goodsClassQuery({pageSize: 10000000}).then((res)=> {
                if(res.data.records) {
                    let goodsClassId = this.goodsForm.goodsClassId;
                    if(goodsClassId && goodsClassId != 0) {
                        // 回显商品分类
                        this.getGoodsClassSeletedList(goodsClassId, res.data.records);
                        if(this.goodsClassSeletedList && this.goodsClassSeletedList.length > 1) {
                            let list = [];
                            for(var i = this.goodsClassSeletedList.length -1; i>=0 ; i--) {
                                list.push(this.goodsClassSeletedList[i]);
                            }
                            this.goodsClassSeletedList = list;
                        }
                    }
                    this.goodsClassList = Util.treeDataTranslate(res.data.records);
                } else {
                    this.goodsClassList = [];
                }
            });
        },
        getGoodsClassSeletedList(id, list) {
            list.forEach(item => {
                console.log('id', id);
                if(id == item.id) {
                    this.goodsClassSeletedList.push(item.id);
                    if(item.parentId != 0) {
                        this.getGoodsClassSeletedList(item.parentId, list);
                    }
                }
            });
        },
        goodsClassChange(obj) {
            this.goodsForm.goodsClassId = obj[obj.length -1];
        }
    }
}
</script>

<style lang="less">
    .attribute__container {
        background: #fcfcfc;
        border: 1px solid #eee;
        padding: 30px 0 15px 20px;
        .el-form-item__label{
            font-size: 12px;
        }
    }

</style>