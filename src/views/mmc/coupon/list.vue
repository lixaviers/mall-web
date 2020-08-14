<template>
    <div>
        <el-card shadow="always">
            <el-row>
                <el-button type="primary" @click="$router.push({name: 'couponEdit'});">创建优惠券</el-button>
            </el-row>
            <el-form :inline="true" :model="query" class="mt20">
                <el-form-item label="优惠券名称">
                    <el-input v-model="query.couponNameLike" placeholder="优惠券名称"></el-input>
                </el-form-item>
                <el-form-item label="类型">
                    <el-select v-model="query.couponType" placeholder="全部">
                        <el-option value='' label="全部"></el-option>
                        <el-option
                            v-for="item in couponTypeOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="getCouponList">查询</el-button>
                </el-form-item>
            </el-form>
            <el-table
                :data="goodsList"
                style="width: 100%"
            >
                <el-table-column prop="id" label="ID" width="100"></el-table-column>
                <el-table-column prop="couponName" label="优惠券名称"></el-table-column>
                <el-table-column prop="couponTypeDesc" label="类型" width="120"></el-table-column>
                <el-table-column prop="startTime" label="生效时间" width="150"></el-table-column>
                <el-table-column prop="endTime" label="失效时间" width="150"></el-table-column>
                <el-table-column prop="inventory" label="库存" sortable width="120"></el-table-column>
                <el-table-column label="状态" width="120">
                    <template slot-scope="scope">
                        <el-tag v-if="scope.row.couponStatus==1" type="info">已保存</el-tag>
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
            // 优惠券类型选项
            couponTypeOptions: [],
            goodsList: [],
            query: {
                pageNo: 1,
                pageSize: 20,
                total: 0,
                couponNameLike: '',
                couponType: '',
                orderBy: 'id DESC',
            }
        }
    },
    created() {
        this.getCouponTypeList();
        this.getCouponList();
    },
    methods: {
        // 编辑
        handleEdit(row) {
            this.$router.push({name:'couponEdit',query:{id: row.id}});
        },
        // 变换每页条数
        handleSizeChange(val) {
            this.query.pageSize = val;
            this.getCouponList();
        },
        // 变换页数
        handleCurrentChange(val) {
            this.query.pageNo = val;
            this.getCouponList();
        },
        // 获取列表
        getCouponTypeList() {
            API.getPromotionTypes(1).then((res)=> {
                this.couponTypeOptions = res.data;
            });
        },
        // 获取列表
        getCouponList() {
            API.couponQuery(this.query).then((res)=> {
                this.query.pageNo = res.data.pageNo;
                this.query.pageSize = res.data.pageSize;
                this.query.total = res.data.totalRecords;
                this.goodsList = res.data.records;
            });
        },
    }
}
</script>