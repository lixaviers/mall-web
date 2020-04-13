<template>
    <div class="gooods__edit">
        <el-form :model="goodsForm" ref="goodsForm" label-width="120px" :rules="rules">
            <el-form-item label="商品名" prop="goodsName">
                <el-input v-model="goodsForm.goodsName" placeholder="商品名" style="width: 400px" maxlength="50" show-word-limit></el-input>
            </el-form-item>
            <el-form-item label="商品类目" prop="goodsCategoryId">
                <el-cascader v-model="goodsForm.goodsCategoryId" :options="goodsCategoryList" style="width: 400px" placeholder="请选择省 / 市 / 区"></el-cascader>
            </el-form-item>
            <el-form-item label="划线价（元）">
                <el-input v-model="goodsForm.originalPrice" style="width:200px"></el-input>
            </el-form-item>
            <el-form-item label="启用规格">
                <el-checkbox v-model="goodsForm.isMoreSpec" size="large"></el-checkbox>
                <span class="tip"> 启用商品规格后，商品的价格及库存以商品规格为准</span>
            </el-form-item>
            <div v-show="goodsForm.isMoreSpec" style="padding: 0 40px 0 60px;">
                <template v-if="specifications.length != 0">
                    <div class="spec" v-for="(spec,index) in specifications" :key="index" v-show="goodsForm.isMoreSpec">
                        <div>
                            <el-row class="mt10 mb10 group__title name">
                                规格名:
                                <el-input placeholder="请输入规格名，例如：尺寸" v-model.trim.lazy="spec.type" style="width:200px"></el-input>
                                <el-button type="warning" :disabled="specifications.length === 1" @click="deleteType(index)" style="margin-left: 10px;">删除规格</el-button>
                            </el-row>
                            <el-row class="group__title" v-show="spec.type">
                                规格值:
                                <el-input placeholder="请输入规格值，例如：XXL" v-model.trim.lazy="newSpecName[index]" style="width:200px" />
                                <el-button @click="addSpec(spec.children, newSpecName[index], index)" style="margin-left: 10px;">添加</el-button>
                            </el-row>
                            <el-row class="group__title" v-show="spec.children.length > 0">
                                规格值:
                                <div v-for="(specName,index) in spec.children" :key="index" class="value">
                                        <el-input placeholder="" v-model.lazy="spec.children[index]" @blur="modiSpec(specName,spec.children,index)" :disabled="false" style="width:200px;">
                                            <el-button  slot="append" @click="deleteSpec(index,spec.children)">删除</el-button>
                                        </el-input>
                                </div>
                                <br>
                                <br>
                            </el-row>
                        </div>
                    </div>
                </template>
                <el-button type="primary" @click="addType">添加规格</el-button>
                <div class="mt20 mb20">
                    <template>
                        <!-- specifications不存在直接不渲染 -->
                        <template v-if="specifications.length != 0">
                            <!-- <el-table :data="tableData" border :style="{width:specifications.length*100+402+'px'}" key='aTable'> -->
                            <el-table :data="tableData" border key='aTable' :span-method="arraySpanMethod">
                                <el-table-column v-for="(item, index) in specifications" :key="index" :prop="'spec' + index" :label="item.type">
                                </el-table-column>
                                <el-table-column prop="prices.price" label="价格" min-width="200" :render-header="renderHeader">
                                    <template slot-scope="scope">
                                        <el-input-number size="mini" :min="0" :max="99999999.99" :precision="2" v-model="scope.row.prices.price"></el-input-number>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="prices.inventory" label="库存" min-width="200" :render-header="renderHeader">
                                    <template slot-scope="scope">
                                        <el-input-number size="mini" :min="0" :max="99999999" :precision="0" v-model="scope.row.prices.inventory"></el-input-number>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </template>
                    </template>
                </div>
            </div>
            
            <div v-show="!goodsForm.isMoreSpec">
                <el-form-item label="价格（元）">
                    <el-input-number style="width:200px" :min="0" :max="99999999.99" :precision="2" v-model="goodsForm.price" />
                </el-form-item>
                <el-form-item label="库存">
                    <el-input-number style="width:200px" :min="0" :max="99999999" :precision="0" v-model="goodsForm.inventory" />
                </el-form-item>
            </div>
            <el-form-item label="限购">
                <el-checkbox v-model="isPerPersonLimit" size="large">限制每人可购买数量</el-checkbox>
            </el-form-item>
            <el-form-item v-if="isPerPersonLimit" label="限购">
                <el-input-number style="width:200px" :min="0" :max="99999999" :precision="0" v-model="goodsForm.perPersonLimit" />&nbsp;个
            </el-form-item>
            
            <el-form-item>
                <el-button type="primary" @click="onSubmit('goodsForm')">立即创建</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import Util from '../../libs/util';
import API from '../../libs/api.js';
export default {
    data () {
        return {
            rules: {
                goodsName: [
                    { required: true, message: '请输入商品名称', trigger: 'blur' },
                ],
                goodsCategoryId: [
                    { type: 'array', required: true, message: '请选择商品类目', trigger: 'change' }
                ],
            },
            goodsCategoryList: [],
            isPerPersonLimit: false,
            goodsForm: {
                perPersonLimit: 0,
                goodsName: '',
                goodsCategoryId: '',
                price: '',
                inventory: '',
                originalPrice: '',
                skuList: [],
                isMoreSpec: null,
            },
            arr: [1, 3, 5],
            visible2: false,
            // from backend
            specifications: [],
            // from backend
            specPrices: [],
            newSpecName: ['', '']
        }
    },
    computed: {
        // 表格数据
        tableData() {
            var arr = this.specPrices;
            for (var i = 0; i < arr.length; i++) {
                let _array = arr[i].specifications.filter((element) => {return element != ""});
                if(_array) {
                    for (var j = 0; j < arr[i].specifications.length; j++) {
                        (arr[i]['spec' + j]) = arr[i].specifications[j];
                    }
                }
            }
            return arr
        }
    },
    created() {
        this.getCategoryData();
        this.specifications = this._specifications
        this.specifications = [];
        this.specPrices = [];

        if (this.specifications.length == 0) {
            // 初始化规格数据
            var obj = {}
            obj.type = "";
            obj.children = []
            this.specifications.push(obj)

          // 初始化价格数据
            var _obj = [{}]
            _obj[0].specifications = ['']
            _obj[0].prices = {
                price: 0,
                inventory: 0
            }
            this.specPrices = _obj
            this.goodsForm.isMoreSpec = false;
        } else {
            this.goodsForm.isMoreSpec = true;
        }
    },
    methods: {
        getCategoryData() {
            API.goodsCategoryGetTree().then((res)=> {
                res.data.forEach(item => {
                    let children;
                    if(item.childCategoryList) {
                        children = [];
                        item.childCategoryList.forEach(child => {
                            let _children;
                            if(child.childCategoryList) {
                                _children = [];
                                child.childCategoryList.forEach(_child => {
                                    _children.push({value: _child.id, label: _child.categoryName});
                                });
                                children.push({value: child.id, label: child.categoryName, children: _children});
                            } else{
                                children.push({value: child.id, label: child.categoryName});
                            }
                            
                        });
                    }
                    this.goodsCategoryList.push({value: item.id, label: item.categoryName, children: children});
                });
            });
        },
        onSubmit(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if(this.isPerPersonLimit) {
                        this.goodsForm.perPersonLimit = 0;
                    }
                    let category = this.goodsForm.goodsCategoryId;
                    this.goodsForm.goodsCategoryId = category[category.length - 1];
                    let arr = this.tableData;
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
                    if(this.goodsForm.isMoreSpec) {
                        this.goodsForm.skuList = arr;
                    } else {
                        this.goodsForm.skuList = [];
                    }

                    console.log(this.goodsForm);
                } else {
                    return false;
                }
            });
        },
        arraySpanMethod({ row, column, rowIndex, columnIndex }) {
            
        },
        renderHeader(h, { column, $index }) {
            const t = this;
            let tableData = t.tableData;
            return h("div", [
                h("span", column.label),
                h("i", {
                    class: "el-icon-plus",
                    style: "color:#62BFC4;margin-left:5px;cursor: pointer;",
                    on: {
                        click: function() {
                            t.$prompt("", "批量修改本列", {
                                confirmButtonText: "确定",
                                cancelButtonText: "取消"
                            }).then(({ value }) => {
                                tableData.forEach(item => {
                                    if (column.property == "prices.price") {
                                        item.prices.price = value;
                                    }
                                    if (column.property == "prices.inventory") {
                                        item.prices.inventory = value;
                                    }
                                });
                                if (column.property == "stock") {
                                    t.stockCount();
                                }
                            }).catch(() => {});
                        }
                    }
                })
            ]);
        },
        deleteType(index) {
            if(this.specifications.length === 1) {
                return;
            }
            var r = confirm('确定删除规格名么?')
            if (r) {
                this.specifications.splice(index, 1)
                this.mySpecPrices(this.specCombinations())
            } else {
                return
            }
        },
        deleteSpec(index, spec) {
            spec.splice(index, 1)
            this.mySpecPrices(this.specCombinations())
        },
        modiSpec(specName, spec, index) {
            spec[index] = specName;
            this.mySpecPrices(this.specCombinations())
        },
        addType() {
            // alert()
            var obj = {}
            obj.type = "";
            obj.children = []
            this.specifications.push(obj)
        },
        addSpec(spec, newSpecName, index) {
            // 检测新规格名是否规范 1, 不为空. 2,不重复
            if (!newSpecName) {
                alert('规格值名称不能为空')
                return
            } else if (spec.includes(newSpecName)) {
                alert('规格值名称不能为重复')
                return
            }
            spec.push(newSpecName)
            
            var specCombinations = this.specCombinations()
            this.mySpecPrices(specCombinations)

            this.newSpecName[index] = ''
        },
        modiPrice() {

        },
        createAry (item) {
            const result = item.reduce((last, current) => {
                const array = [];
                last.forEach(par1 => {
                    current.forEach(par2 => {
                    array.push(par1 + ',' + par2)
                    })
                });
                return array
                });
            return result.map(val => val.split(','))

        },
        // 规格组合数组
        specCombinations() {
            var specArr = [];
            for(var i = 0; i < this.specifications.length; i++) {
                var arr = this.specifications[i].children;
                if (arr.length == 0) {
                    arr = ['']
                }
                specArr[i] = arr;
            }
            return this.createAry(specArr);
        },
        // 规格价格数据 local
        // 数据更新
        mySpecPrices(specCombinations) {
            var arrWra = []
            // 规格组合 数组
            var arr = specCombinations;
            if(arr) {
                for (var i = 0; i < arr.length; i++) {
                    // 新增 规格价格 项
                    var obj = {};
                    obj.specifications = arr[i];
                    // !注意 a类型为数组
                    // 对比 新的 规格组合数组 与原价格数组
                    var oldItem = this.specPrices.filter((element) => {
                        return element.specifications + "" === arr[i] + "";
                    });
                    if (oldItem.length) {
                        obj.prices = oldItem[0].prices
                    } else {
                        obj.prices = {
                            price: 0,
                            inventory: 0
                        };
                    }
                    arrWra.push(obj);
                }
            }
            
            this.specPrices = arrWra
        },
    }
}
</script>
