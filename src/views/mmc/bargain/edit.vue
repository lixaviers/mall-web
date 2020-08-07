<template>
    <div class="gooods__edit">
        <el-card shadow="always">
            <el-steps :active="stepIndex" simple finish-status="success" style="max-width: 1000px;">
                <el-step title="设置活动信息" icon="el-icon-edit"></el-step>
                <el-step title="设置砍价商品" icon="el-icon-edit"></el-step>
            </el-steps>
            <activity v-show="stepIndex == 0" @setActivity="setActivity"></activity>
            <goods v-show="stepIndex == 1" :activity="activity"></goods>
        </el-card>
    </div>
</template>
<script>
import Util from '../../../libs/util';
import API from '../../../libs/api.js';
import Activity from './activity';
import Goods from './goods';
export default {
    components: {Activity, Goods},
    data () {
        return {
            stepIndex: 1,
            activity: {}
        }
    },
    created() { 
        // 优惠券id，用来判断新增还是编辑
        let id = this.$route.query.id;
        if(id) {
            this.buttonText = '立即保存';
            // 获取商品详情
            API.couponGet(id).then((res)=> {
                this.bargainForm = res.data;
                // 设置时间选择
                // this.$set(this.bargainForm, "effectTime", [new Date(res.data.startTime), new Date(res.data.endTime)]);
                this.goodsCategoryCheckedList = res.data.promotionScopeList;
            });
        }
    },
    methods: {
        setActivity(obj) {
            this.activity = obj;
            this.stepIndex = 1;
        }
    }
}
</script>
