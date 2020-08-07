<template>
    <el-dialog :width="width" title="请选择商品" :show-close="false"
        :visible.sync="visible" :close-on-click-modal="false">
        <el-form :inline="true" :model="query">
            <el-form-item label="商品名称">
                <el-input v-model="query.goodsNameLike" placeholder="商品名称"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="getGoodsList">查询</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="goodsList" style="width: 100%">
            <el-table-column fixed="left" label="操作" width="80">
            <template slot-scope="scope">
                <el-button @click.native.prevent="selectGoods(scope.row)" type="primary">选择</el-button>
            </template>
            </el-table-column>
            <el-table-column prop="skuCode" label="商品编码" width="80"></el-table-column>
            <el-table-column prop="goodsId" label="商品id" width="80"></el-table-column>
            <el-table-column prop="goodsName" label="商品名称"></el-table-column>
            <el-table-column prop="specValue" label="规格" width="100"></el-table-column>
            <el-table-column prop="price" label="价格" width="80">
                <template slot-scope="scope">
                    <span class="red">{{scope.row.price}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="inventory" label="库存" width="80"></el-table-column>
        </el-table>
        <el-pagination
        class="mt20"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="query.pageNo"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="query.pageSize"
        layout="total, sizes, prev, pager, next"
        :total="query.total">
        </el-pagination>
    </el-dialog>
</template>

<script>
import Util from '../../libs/util';
import API from '../../libs/api.js';
export default {
    props: {
        visible: {
            type: Boolean,
            default: () => {
                return false
            }
        },
        width: {
            type: String,
            default: () => {
                return '800px'
            }
        }
    },
    data () {
        return {
            goodsList: [],
            query: {
                pageNo: 1,
                pageSize: 10,
                total: 0,
                goodsNameLike: '',
                sales: '',
                goodsStatus: 1,
            }
        }
    },
    created() {
    },
    methods: {
        // 变换每页条数
        handleSizeChange(val) {
            this.query.pageSize = val;
            this.getGoodsList();
        },
        // 变换页数
        handleCurrentChange(val) {
            this.query.pageNo = val;
            this.getGoodsList();
        },
        // 获取商品列表
        getGoodsList() {
            API.goodsSkuQuery(this.query).then((res)=> {
                console.log(res.data)
                this.query.pageNo = res.data.pageNo;
                this.query.pageSize = res.data.pageSize;
                this.query.total = res.data.totalRecords;
                if(res.data.totalRecords > 0) {
                    res.data.records.forEach(item => {
                        item.createTime = Util.dateFormatter(item.createTime);
                    });
                }
                this.goodsList = res.data.records;
            });
        },
        // 选择商品
        selectGoods(row) {
            this.$emit('selectGoods', row);
        }
    }
}
</script>
