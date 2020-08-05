<template>
    <div>
        <el-card shadow="always">
            <el-row>
                <el-button type="primary" @click="$router.push({name: 'subPromotionEdit'});">创建订单促销</el-button>
            </el-row>
            <el-form :inline="true" :model="query" class="mt20">
                <el-form-item label="订单促销名称">
                    <el-input v-model="query.subPromotionNameLike" placeholder="订单促销名称"></el-input>
                </el-form-item>
                <el-form-item label="类型">
                    <el-select v-model="query.subPromotionType" placeholder="全部">
                        <el-option value=''>全部</el-option>
                        <el-option
                            v-for="item in subPromotionTypeOptions"
                            :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="getSubPromotionList">查询</el-button>
                </el-form-item>
            </el-form>
            <el-table :data="goodsList" style="width: 100%">
                <el-table-column prop="id" label="ID" width="100"></el-table-column>
                <el-table-column prop="subPromotionName" label="订单促销名称"></el-table-column>
                <el-table-column prop="subPormotionTypeDesc" label="类型" width="120"></el-table-column>
                <el-table-column prop="startTime" label="生效时间" width="150"></el-table-column>
                <el-table-column prop="endTime" label="失效时间" width="150"></el-table-column>
                <el-table-column label="状态" width="120">
                    <template slot-scope="scope">
                        <el-tag v-if="scope.row.subPromotionStatus==1" type="info">已保存</el-tag>
                        <el-tag v-else>1111</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="createTime" label="创建时间" sortable width="150"></el-table-column>
                <el-table-column label="操作" width="150">
                    <template slot-scope="scope">
                        <el-button @click="handleEdit(scope.row)">编辑</el-button>
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
import Util from '../../../libs/util';
import API from '../../../libs/api.js';
export default {
    data () {
        return {
            // 类型选项
            subPromotionTypeOptions: [],
            goodsList: [],
            query: {
                pageNo: 1,
                pageSize: 20,
                total: 0,
                subPromotionNameLike: '',
                subPromotionType: '',
                orderBy: 'id DESC',
            }
        }
    },
    created() {
        this.getCouponTypeList();
        this.getSubPromotionList();
    },
    methods: {
        // 编辑
        handleEdit(row) {
            this.$router.push({name:'subPromotionEdit',query:{id: row.id}});
        },
        // 变换每页条数
        handleSizeChange(val) {
            this.query.pageSize = val;
            this.getSubPromotionList();
        },
        // 变换页数
        handleCurrentChange(val) {
            this.query.pageNo = val;
            this.getSubPromotionList();
        },
        // 获取列表
        getCouponTypeList() {
            API.getPromotionTypes(2).then((res)=> {
                this.subPromotionTypeOptions = res.data;
            });
        },
        // 获取列表
        getSubPromotionList() {
            API.subPromotionQuery(this.query).then((res)=> {
                this.query.pageNo = res.data.pageNo;
                this.query.pageSize = res.data.pageSize;
                this.query.total = res.data.totalRecords;
                this.goodsList = res.data.records;
            });
        },
    }
}
</script>