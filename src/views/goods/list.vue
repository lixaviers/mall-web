<template>
    <div>
        <el-card shadow="always">
            <el-row>
                <el-button type="primary" @click="$router.push({name: 'editGoodsCategory'});">发布商品</el-button>
            </el-row>
            <el-form :inline="true" :model="query" class="mt20">
                <el-form-item label="商品名称">
                    <el-input v-model="query.goodsNameLike" placeholder="商品名称"></el-input>
                </el-form-item>
                <el-form-item label="类型">
                    <el-select v-model="query.goodsStatus" placeholder="全部" style="width: 100px;">
                        <el-option value='' label="全部"></el-option>
                        <el-option :value='1' label="上架"></el-option>
                        <el-option :value='2' label="下架"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="getGoodsList">查询</el-button>
                </el-form-item>
            </el-form>
            <el-table
                :data="goodsList"
                style="width: 100%"
            >
                <el-table-column prop="goodsName" label="商品名称"></el-table-column>
                <el-table-column prop="inventory" label="库存" sortable width="100"></el-table-column>
                <el-table-column prop="viewCount" label="浏览量" sortable width="100"></el-table-column>
                <el-table-column prop="sales" label="销量" sortable width="100"></el-table-column>
                <el-table-column prop="goodsStatus" label="状态" width="120">
                    <template slot-scope="scope">
                        <el-tag v-if="scope.row.goodsStatus == 1" type="success">已上架</el-tag>
                        <el-tag v-else-if="scope.row.goodsStatus == 2" type="warning">已下架</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="createTime" label="创建时间" sortable width="150"></el-table-column>
                <el-table-column fixed="right" label="操作" width="150">
                    <template slot-scope="scope">
                        <el-button @click="handleEdit(scope.row)" type="primary">编辑</el-button>
                        <el-popconfirm v-if="scope.row.goodsStatus == 1" title="确定下架商品吗？" @onConfirm="handleShelves(scope.row.id, 2)" class="ml10">
                            <el-button slot="reference">下架</el-button>
                        </el-popconfirm>
                        <el-popconfirm v-if="scope.row.goodsStatus == 2" title="确定上架商品吗？" @onConfirm="handleShelves(scope.row.id, 1)" class="ml10">
                            <el-button slot="reference">上架</el-button>
                        </el-popconfirm>
                    </template>
                </el-table-column>
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
        </el-card>
    </div>
</template>

<script>
import Util from '../../libs/util';
import API from '../../libs/api.js';
export default {
    data () {
        return {
            goodsList: [],
            query: {
                pageNo: 1,
                pageSize: 20,
                total: 0,
                goodsNameLike: '',
                goodsStatus: '',
                orderBy: 'id DESC',
            }
        }
    },
    created() {
        this.getGoodsList();
    },
    methods: {
        // 编辑商品
        handleEdit(row) {
            this.$router.push({name:'goodsEdit',query:{id: row.id}});
        },
        handleShelves(id, opt) {
            API.goodsShelves(id, opt).then((res)=> {
                this.getGoodsList();
            });
        },
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
            API.goodsQuery(this.query).then((res)=> {
                console.log(res.data)
                this.query.pageNo = res.data.pageNo;
                this.query.pageSize = res.data.pageSize;
                this.query.total = res.data.totalRecords;
                //if(res.data.totalRecords > 0) {
                    //res.data.records.forEach(item => {
                        //item.createTime = Util.dateFormatter(item.createTime);
                    //});
                //}
                this.goodsList = res.data.records;
            });
        },
    }
}
</script>
