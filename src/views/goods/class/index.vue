<template>
    <div>
        <el-card shadow="always">
            <el-form :inline="true" :model="query" class="mt20">
                <el-button type="primary" @click="addOrUpdateHandle()">新增分类</el-button>
                <el-form-item label="" class="ml20">
                    <el-input v-model="query.classNameLike" placeholder="搜索商品分类" @keyup.enter.native="getDataList()">
                        <el-button slot="append" icon="el-icon-search" @click="getDataList"></el-button>
                    </el-input>
                </el-form-item>
            </el-form>
            <el-table
                :data="goodsList"
                style="width: 100%"
            >
                <table-tree-column prop="className" label="分类名称"></table-tree-column>
                <el-table-column prop="createTime" label="创建时间" sortable width="150"></el-table-column>
                <el-table-column fixed="right" label="操作" width="180">
                    <template slot-scope="scope">
                        <el-button @click="addOrUpdateHandle('', scope.row.id)" type="text">添加子分类</el-button>
                        <el-button @click="addOrUpdateHandle(scope.row.id, 0)" type="text">编辑</el-button>
                        <el-popconfirm v-if="!scope.row.children" title="确定删除该分类？" @onConfirm="deleteHandle(scope.row.id)" class="ml10">
                            <el-button slot="reference" type="text">删除</el-button>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
        <!-- 弹窗, 新增 / 修改 -->
        <edit v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"></edit>
    </div>
</template>

<script>
import Util from '@/libs/util';
import API from '@/libs/api.js';
import TableTreeColumn from '@/components/table-tree-column';
import Edit from './edit';
export default {
    components: {
      Edit, TableTreeColumn
    },
    data () {
        return {
            addOrUpdateVisible: false,
            goodsList: [],
            query: {
                pageNo: 1,
                pageSize: 10000000,
                classNameLike: '',
            }
        }
    },
    created() {
        this.getDataList();
    },
    methods: {
        // 新增 / 修改
        addOrUpdateHandle (id, parentId) {
            this.addOrUpdateVisible = true;
            this.$nextTick(() => {
                this.$refs.addOrUpdate.init(id, parentId);
            })
        },
        // 获取列表
        getDataList() {
            API.goodsClassQuery(this.query).then((res)=> {
                if(res.data.records) {
                    this.goodsList = Util.treeDataTranslate(res.data.records);
                } else {
                    this.goodsList = [];
                }
            });
        },
        deleteHandle(id) {
            API.goodsClassDelete(id).then((res)=> {
                this.getDataList();
            });
        }
    }
}
</script>
