<template>
    <div>
        <el-card shadow="always">
            <el-row v-if="recentlyReleasedGoodsCategory">历史发布：<el-button type="text" @click="next(recentlyReleasedGoodsCategory.id)">{{recentlyReleasedGoodsCategory.categoryName}}</el-button></el-row>
            <el-card class="mb10" style="height: 65px;">
                <span class="float-left">已选类目：</span><el-tag v-for="(item, index) in selectList" :key="index" class="mr5">{{item.categoryName}}</el-tag>
                <el-button class="float-right" :disabled="disabled" type="primary" @click="next('')">下一步，发布商品</el-button>
            </el-card>
            <el-row style="width: 220px;border: 1px solid #f3f3f3" class="pb5 float-left mr20 mb20" v-for="(item, topIndex) in list" :key="'topIndex' + topIndex">
                <el-row class="category__list" style="width: 220px; text-align: center;background: #4a9ff9;color: #fff;cursor: auto;">{{topIndex+1}}级类目</el-row>
                <div v-for="(child, childIndex) in item" :key="'childIndex' + childIndex">
                    <div class="category__list" @click="categorySelete(child, topIndex)" :class="child.class">{{child.categoryName}}</div>
                </div>
            </el-row>
            <div v-show="loading" class="el-loading-mask">
                <div class="el-loading-spinner">
                    <svg viewBox="25 25 50 50" class="circular">
                        <circle cx="50" cy="50" r="20" fill="none" class="path"></circle>
                    </svg>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script>
import Util from '@/libs/util';
import Api from '@/libs/api.js';
export default {
    data () {
        return {
            id: '',
            disabled: true,
            loading: true,
            list: [],
            selectList: [],
            goodsCategoryId: '',
            recentlyReleasedGoodsCategory: null,
            
        }
    },
    created() {
        // 商品id
        this.id = this.$route.query.id;
        this.getCategoryData(0, 0, true, true);
    },
    methods: {
        // 获取商品类目
        getCategoryData(parentId, index, loading, flag, id) {
            this.loading = loading;
            Api.goodsCategoryGetByParentId(parentId, 2).then((res)=> {
                if(res.data && res.data.length > 0) {
                    res.data.forEach(item => {
                        if(id && item.id == id) {
                            item.class = 'selected';
                            this.selectList[index] = item;
                        }
                        item.index = index;
                    });
                    this.disabled = true;
                    this.list[index] = res.data;
                    this.list.splice(index + 1, 999);
                } else {
                    this.disabled = false;
                    this.goodsCategoryId = parentId;
                    console.log('this.goodsCategoryId', this.goodsCategoryId)
                }
                if(flag) {
                    this.getGoodsCategoryRecentlyReleasedGoodsCategory();
                }
                // this.selectCategory();
                // 强制更新DOM
                this.$forceUpdate();
                this.loading = false;
            });
        },
        // 获取最近发布的商品类目
        getGoodsCategoryRecentlyReleasedGoodsCategory() {
            Api.getGoodsCategoryRecentlyReleasedGoodsCategory().then((res)=> {
                this.recentlyReleasedGoodsCategory = res.data;

                // 如果是重新选择类目，根据传入进来的id反选
                let goodsCategoryId = this.$route.query.goodsCategoryId;
                if(goodsCategoryId) {
                    Api.goodsCategoryGet(goodsCategoryId).then((res) => {
                        this.initializeSelectedCategory(res.data);
                    });
                } else {
                    if(res.data) {
                        this.initializeSelectedCategory(res.data);
                    }
                }

            });
        },
        // 反选类目
        initializeSelectedCategory(obj) {
            let list = obj.fullIdPath.split('-');
            this.list[0].forEach(item => {
                if(item.id == list[0]) {
                    item.class = 'selected';
                    this.selectList[0] = item;
                }
            });
            for(var i=0; i<list.length; i++) {
                this.getCategoryData(list[i], i + 1, false, false, list[i + 1]);
            }
        },
        // 选择类目
        categorySelete(obj, index) {
            this.selectList[index] = obj;
            this.getCategoryData(obj.id, obj.index + 1, false);
            this.$forceUpdate();
            this.selectCategory();
            this.selectList.splice(index + 1, 999);
        },
        selectCategory() {
            for(var i=0; i<this.selectList.length; i++) {
                if(this.list[i]) {
                    this.list[i].forEach(item => {
                        if(item.id === this.selectList[i].id) {
                            item.class = 'selected';
                        } else {
                            item.class = '';
                        }
                    });
                }
            }
        },
        next(id) {
            if(id) {
                this.goodsCategoryId = id;
            }
            this.$router.push({name: 'goodsEdit', query: {id: this.id, goodsCategoryId: this.goodsCategoryId}});
        }
    }
}
</script>

<style lang="less">
    .category__list {
        border: 1px solid #EBEEF5;
        background-color: #FFF;
        color: #303133;
        padding: 10px 20px;
        width: 190px;
        margin: 0 auto 5px auto;
        display: block;
        cursor: pointer;
    }
    .category__list.selected {
        background: #f4f4f4;
    }
</style>