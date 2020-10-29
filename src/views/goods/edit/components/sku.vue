<template>
    <div>
        <el-form-item label="启用规格">
            <el-checkbox v-model="value.isMoreSpec" size="large">启用商品规格后，商品的价格及库存以商品规格为准</el-checkbox>
        </el-form-item>
        <div v-if="value.isMoreSpec" style="padding: 0 40px 0 60px;">
            <template v-if="specifications.length != 0">
                <div class="spec" v-for="(spec,index) in specifications" :key="index" v-show="value.isMoreSpec">
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
    </div>
</template>

<script>
import Util from '@/libs/util';
import Api from '@/libs/api.js';
export default {
    props: {
        value: Object
    },
    data () {
        return {
            specifications: [],
            newSpecName: ['', ''],
            arr: [],
        }
    },
    created() {
        // 初始化规格数据
        var obj = {}
        obj.name = "";
        obj.values = []
        this.specifications.push(obj)
    },
    computed: {
        // 表格数据
        tableData() {
            var arr = this.value.specPrices;
            for (var i = 0; i < arr.length; i++) {
                let _array = arr[i].specifications.filter((element) => {return element != ""});
                if(_array) {
                    for (var j = 0; j < arr[i].specifications.length; j++) {
                        (arr[i]['spec' + j]) = arr[i].specifications[j];
                    }
                }
            }
            this.value.tableData = arr;
            return arr
        },
    },
    methods: {
        addSpecificationName() {
            // alert()
            var obj = {}
            obj.name = "";
            obj.values = []
            this.specifications.push(obj)
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
        deleteSpec(index, spec) {
            spec.splice(index, 1)
            this.mySpecPrices(this.specCombinations())
        },
        modiSpec(specName, spec, index) {
            spec[index] = specName;
            this.mySpecPrices(this.specCombinations())
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
                    var oldItem = this.value.specPrices.filter((element) => {
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
            
            this.value.specPrices = arrWra
        },
        arraySpanMethod({ row, column, rowIndex, columnIndex }) {
            
        },
    }
}
</script>

<style lang="less">
</style>