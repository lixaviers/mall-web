<template>
    <el-card shadow="always" class="mt20">
        <div slot="header" class="clearfix">
            <span>销售信息</span>
        </div>
        <el-row class="card__container">
            <sku v-model="value"></sku>
            <el-form-item label="划线价（元）">
                <el-input v-model="value.originalPrice" style="width:200px"></el-input>
            </el-form-item>
            <el-row v-show="!value.isMoreSpec">
                <el-form-item label="价格（元）">
                    <el-input-number style="width:200px" :min="0" :max="99999999.99" :precision="2" v-model="value.listPrice" />
                    <div v-show="value.priceErrorFlag" class="el-form-item__error">请输入价格</div>
                </el-form-item>
                <el-form-item label="库存">
                    <el-input-number style="width:200px" :min="1" :max="99999999" :precision="0" v-model="value.inventory" />
                </el-form-item>
            </el-row>
            <el-form-item label="限购">
                <el-checkbox v-model="value.isPerPersonLimit" size="large">限制每人可购买数量</el-checkbox>
            </el-form-item>
            <el-form-item v-if="value.isPerPersonLimit" label="限购">
                <el-input-number style="width:200px" :min="0" :max="99999999" :precision="0" v-model="value.perPersonLimit" />&nbsp;个
            </el-form-item>
            <el-form-item label="起订量" prop="minimumQuantity">
                <el-input-number style="width:200px" :min="1" :max="99999999" :precision="0" v-model="value.minimumQuantity" />&nbsp;个
            </el-form-item>
            <el-form-item label="快递运费">
                <el-input-number style="width:200px" :min="0" :max="99999999" :precision="2" v-model="value.expressFreight" />&nbsp;元
            </el-form-item>
        </el-row>
    </el-card>
</template>

<script>
import Util from '@/libs/util';
import Api from '@/libs/api.js';
import Sku from './sku';
export default {
    components: {Sku},
    props: {
        value: Object
    },
    data () {
        return {
        }
    },
    created() {
    },
    methods: {
    }
}
</script>

<style lang="less">
</style>