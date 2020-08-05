<template>
    <el-dialog
        title="请选择商品类目"
        :visible.sync="visible"
        :close-on-click-modal="false"
        width="30%"
        :before-close="handleClose">
        <el-tree
            :data="data"
            show-checkbox
            node-key="id"
            ref="tree"
            highlight-current :props="goodsCategoryProps">
        </el-tree>
        <span slot="footer" class="dialog-footer">
            <el-button @click="handleClose">取 消</el-button>
            <el-button type="primary" @click="close">确 定</el-button>
        </span>
    </el-dialog>
</template>
<script>
import Util from '../../../libs/util';
import API from '../../../libs/api.js';
export default {
    props: {
        data: {
            type: Array,
            default: () => {
                return []
            }
        },
        visible: {
            type: Boolean,
            default: () => {
                return false
            }
        }
    },
    data() {
        return {
            goodsCategoryProps: {
                children: 'childCategoryList',
                label: 'categoryName'
            },
        }
    },
    methods: {
        close() {
            let checkedNodes = this.$refs.tree.getCheckedNodes();
            // 这里只传最底层类目
            let childList = [];
            if(checkedNodes) {
                checkedNodes.forEach(item => {
                    if(!item.childCategoryList) {
                        childList.push({goodsCategoryId: item.id, goodsCategoryName: item.categoryName});
                    }
                });
            }
            this.$emit('close', childList);
        },
        handleClose(done) {
            this.$confirm('确认关闭？')
            .then(_ => {
                this.$emit('close', []);
                done();
            })
            .catch(_ => {});
        }
    }
}
</script>