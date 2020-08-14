<template>
    <div class="gooods__edit">
        <el-card shadow="always">
            <el-form :model="goodsForm" ref="goodsForm" label-width="120px" :rules="rules">
                <el-form-item label="商品名" prop="goodsName">
                    <el-input v-model="goodsForm.goodsName" placeholder="商品名" style="width: 400px" maxlength="50" show-word-limit></el-input>
                </el-form-item>
                <el-form-item label="商品类目" prop="goodsCategorySelectList">
                    <el-cascader @change="categoryChange" :props="props" v-model="goodsForm.goodsCategorySelectList" :options="goodsCategoryList" style="width: 400px" placeholder="请选择"></el-cascader>
                </el-form-item>
                <el-form-item label="商品品牌" prop="brandId">
                    <el-select v-model="goodsForm.brandId" placeholder="请选择">
                        <el-option
                        v-for="item in goodsBrandList"
                        :key="item.id"
                        :label="item.brandName"
                        :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="划线价（元）">
                    <el-input v-model="goodsForm.originalPrice" style="width:200px"></el-input>
                </el-form-item>
                <el-form-item label="启用规格">
                    <el-checkbox v-model="goodsForm.isMoreSpec" size="large"></el-checkbox>
                    <span class="tip"> 启用商品规格后，商品的价格及库存以商品规格为准</span>
                </el-form-item>
                <div v-if="goodsForm.isMoreSpec" style="padding: 0 40px 0 60px;">
                    <template v-if="specifications.length != 0">
                        <div class="spec" v-for="(spec,index) in specifications" :key="index" v-show="goodsForm.isMoreSpec">
                            <div>
                                <el-row class="mt10 mb10 group__title name">
                                    规格名:
                                    <el-input placeholder="请输入规格名，例如：尺寸" v-model.trim.lazy="spec.name" style="width:200px"></el-input>
                                    <el-button type="warning" :disabled="specifications.length === 1" @click="deleteType(index)" style="margin-left: 10px;">删除规格</el-button>
                                </el-row>
                                <el-row class="group__title" v-show="spec.name">
                                    规格值:
                                    <el-input placeholder="请输入规格值，例如：XXL" v-model.trim.lazy="newSpecName[index]" style="width:200px" />
                                    <el-button @click="addSpec(spec.values, newSpecName[index], index)" style="margin-left: 10px;">添加</el-button>
                                </el-row>
                                <el-row class="group__title" v-show="spec.values.length > 0">
                                    规格值:
                                    <div v-for="(specValue,index) in spec.values" :key="index" class="value">
                                            <el-input placeholder="" v-model.lazy="spec.values[index]" @blur="modiSpec(specValue,spec.values,index)" :disabled="false" style="width:200px;">
                                                <el-button  slot="append" @click="deleteSpec(index,spec.values)">删除</el-button>
                                            </el-input>
                                    </div>
                                    <br>
                                    <br>
                                </el-row>
                            </div>
                        </div>
                    </template>
                    <el-button type="primary" @click="addSpecificationName">添加规格</el-button>
                    <div class="mt20 mb20">
                        <template>
                            <!-- specifications不存在直接不渲染 -->
                            <template v-if="specifications.length != 0">
                                <!-- <el-table :data="tableData" border :style="{width:specifications.length*100+402+'px'}" key='aTable'> -->
                                <el-table :data="tableData" border key='aTable' :span-method="arraySpanMethod">
                                    <el-table-column v-for="(item, index) in specifications" :key="index" :prop="'spec' + index" :label="item.name">
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
                        <el-input-number style="width:200px" :min="0" :max="99999999.99" :precision="2" v-model="goodsForm.listPrice" />
                        <div v-show="priceErrorFlag" class="el-form-item__error">请输入价格</div>
                    </el-form-item>
                    <el-form-item label="库存">
                        <el-input-number style="width:200px" :min="1" :max="99999999" :precision="0" v-model="goodsForm.inventory" />
                    </el-form-item>
                </div>
                <el-form-item label="限购">
                    <el-checkbox v-model="isPerPersonLimit" size="large">限制每人可购买数量</el-checkbox>
                </el-form-item>
                <el-form-item v-if="isPerPersonLimit" label="限购">
                    <el-input-number style="width:200px" :min="0" :max="99999999" :precision="0" v-model="goodsForm.perPersonLimit" />&nbsp;个
                </el-form-item>
                <el-form-item label="起订量" prop="minimumQuantity">
                    <el-input-number style="width:200px" :min="1" :max="99999999" :precision="0" v-model="goodsForm.minimumQuantity" />&nbsp;元
                </el-form-item>
                <el-form-item label="快递运费">
                    <el-input-number style="width:200px" :min="0" :max="99999999" :precision="2" v-model="goodsForm.expressFreight" />&nbsp;元
                </el-form-item>
                <el-form-item label="商品图片">
                    <!--<multi-upload v-model="pictureUrls"></multi-upload> -->
                    <el-upload
                        action="/api/file/upload" list-type="picture-card"
                        :on-success="fileSuccess" :on-remove="fileRemove"
                        :file-list="fileList">
                        <el-button size="small" type="primary">点击上传</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload>
                </el-form-item>
                <el-form-item label="商品详情" prop="description">
                    <tinymce :width="995" :height="300" v-model="goodsForm.description"></tinymce>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" :loading="loading" @click="onSubmit('goodsForm')">{{buttonText}}</el-button>
                    <el-button @click="$router.push({name:'goodsList'})">取消</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>
<script>
import Util from '../../libs/util';
import API from '../../libs/api.js';
import Tinymce from '@/components/tinymce';
export default {
    components: {Tinymce},
    data () {
        return {
            rules: {
                goodsName: [
                    { required: true, message: '请输入商品名称', trigger: 'blur' },
                ],
                brandId: [
                    { required: true, message: '请选择品牌', trigger: 'blur' },
                ],
                goodsCategorySelectList: [
                    { type: 'array', required: true, message: '请选择商品类目', trigger: 'change' }
                ],
                minimumQuantity: [
                    { required: true, message: '请输入起订量', trigger: 'blur' },
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
            // 价格错误标识
            priceErrorFlag: false,
            goodsCategoryList: [],
            // 商品品牌列表
            goodsBrandList: [],
            isPerPersonLimit: false,
            goodsForm: {
                id: '',
                description: '',
                perPersonLimit: 0,
                minimumQuantity: 1,
                goodsName: '',
                goodsCategorySelectList: null,
                goodsCategoryId: '',
                brandId: '',
                price: '',
                inventory: '',
                originalPrice: '',
                skuList: [],
                isMoreSpec: null,
                expressFreight: 0,
            },
            loading: false,
            buttonText: '立即创建',
            arr: [],
            specifications: [],
            specPrices: [],
            newSpecName: ['', ''],
            fileList: []
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
        },
    },
    created() {
        // 商品id，用来判断新增还是编辑
        let id = this.$route.query.id;
        if(id) {
            this.buttonText = '立即保存';
            // 获取商品详情
            API.goodsGet(id).then((res)=> {
                // this.goodsForm = res.data;
                // 这里不能直接赋值对象，否则会触发[商品类目]的校验
                this.goodsForm.id = res.data.id;
                this.goodsForm.brandId = res.data.brandId;
                this.goodsForm.pictureUrls = res.data.pictureUrls;
                // 回显商品图片
                if(this.goodsForm.pictureUrls) {
                    let pics = this.goodsForm.pictureUrls.split(',');
                    for(let i=0;i<pics.length;i++) {
                        this.fileList.push({url: pics[i]});
                    }
                }
                this.goodsForm.description = res.data.description;
                this.goodsForm.perPersonLimit = res.data.perPersonLimit;
                if(this.goodsForm.perPersonLimit > 0) {
                    this.isPerPersonLimit = true;
                }
                this.goodsForm.goodsName = res.data.goodsName;
                this.goodsForm.goodsCategoryId = res.data.goodsCategoryId;
                // 获取商品类目
                this.getGoodsBrandList();
                this.goodsForm.listPrice = res.data.listPrice;
                this.goodsForm.minimumQuantity = res.data.minimumQuantity;
                this.goodsForm.originalPrice = res.data.originalPrice;
                this.goodsForm.skuList = res.data.skuList;
                this.goodsForm.isMoreSpec = res.data.isMoreSpec;
                this.goodsForm.expressFreight = res.data.expressFreight;
                this.getCategoryData();
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
                    this.specPrices = arr;
                } else {
                    this.goodsForm.inventory = res.data.skuList[0].inventory;
                    this.specifications = [];
                    this.specifications.push({name: "", values: []});
                    this.specPrices = [];
                }
            });
        } else {
            // 初始化规格数据
            var obj = {}
            obj.name = "";
            obj.values = []
            this.specifications.push(obj)
            this.goodsForm.isMoreSpec = false;
            this.specPrices = [];
            this.getCategoryData();
        }

    },
    methods: {
        // 图片移除
        fileRemove(file, fileList) {
            let pictureUrls = '';
            for(var i=0; i<fileList.length; i++) {
                pictureUrls += fileList[i].url;
                if(i != fileList.length -1) {
                    pictureUrls += ',';
                }
            }
            this.goodsForm.pictureUrls = pictureUrls;
        },
        // 图片上传成功
        fileSuccess(response, file, fileList) {
            this.fileList.push(file);
            if(this.goodsForm.pictureUrls) {
                this.goodsForm.pictureUrls += ',' + response.data;
            } else {
                this.goodsForm.pictureUrls = response.data;
            }
        },
        // 切换类目
        categoryChange(obj) {
            this.goodsForm.goodsCategoryId = obj[obj.length -1];
            this.getGoodsBrandList();
        },
        // 获取商品品牌列表
        getGoodsBrandList() {
            API.goodsBrandGet(this.goodsForm.goodsCategoryId).then((res)=> {
                this.goodsBrandList = res.data;
            });
        },
        // 回显商品类目
        getCategoryCheck() {
            let id = this.goodsForm.goodsCategoryId;
            this.goodsCategoryList.forEach((item, index) => {
                if(id === item.id) {
                    this.goodsForm.goodsCategorySelectList = [item.id];
                    return;
                }
                if(item.childCategoryList) {
                    item.childCategoryList.forEach(child => {
                        if(id === child.id) {
                            this.goodsForm.goodsCategorySelectList = [item.id, child.id];
                            return;
                        }
                        if(child.childCategoryList) {
                            child.childCategoryList.forEach(_child => {
                                if(id === _child.id) {
                                    this.goodsForm.goodsCategorySelectList = [item.id, child.id, _child.id];
                                    return;
                                }
                                if(_child.childCategoryList) {
                                    _child.childCategoryList.forEach(_lastChild => {
                                        if(id === _lastChild.id) {
                                            this.goodsForm.goodsCategorySelectList = [item.id, child.id, _child.id, _lastChild.id];
                                            return;
                                        }
                                    })
                                }
                            })
                        }
                    })
                }
            });
        }, 
        // 获取商品类目
        getCategoryData() {
            API.goodsCategoryGetTree(2).then((res)=> {
                this.goodsCategoryList = res.data;
                this.getCategoryCheck();
            });
        },
        // 提交
        onSubmit(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if(!this.goodsForm.isMoreSpec && !this.goodsForm.listPrice) {
                        this.priceErrorFlag = true;
                        return;
                    }
                    this.loading = true;
                    this.priceErrorFlag = false;
                    if(!this.isPerPersonLimit) {
                        this.goodsForm.perPersonLimit = 0;
                    }
                    let category = this.goodsForm.goodsCategorySelectList;
                    this.goodsForm.goodsCategoryId = category[category.length - 1];
                    let arr = this.tableData;
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
                    API.goodsAdd(this.goodsForm).then((res)=> {
                        if(this.goodsForm.id) {
                            Util.messageSuccess("保存成功");
                        } else {
                            Util.messageSuccess("创建成功");
                        }
                        this.$router.push({name:'goodsList'});
                    }).finally((res) => {
                        if(this.loading)this.loading = false;
                    });
                } else {
                    return false;
                }
            });
        },
        arraySpanMethod({ row, column, rowIndex, columnIndex }) {
            
        },
        // 批量修改
        renderHeader(h, { column, $index }) {
            const t = this;
            let tableData = t.tableData;
            return h("div", [
                h("span", column.label),
                h("i", {
                    class: "el-icon-plus",
                    style: "color:#17b3a3;margin-left:5px;cursor: pointer;",
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
        addSpecificationName() {
            // alert()
            var obj = {}
            obj.name = "";
            obj.values = []
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
                var arr = this.specifications[i].values;
                if (arr.length == 0) {
                    arr = ['']
                }
                specArr[i] = arr;
            }
            return this.createAry(specArr);
        },
        // 规格价格数据
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
                        obj.prices = oldItem[0].prices;
                        obj.id = oldItem[0].id;
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
