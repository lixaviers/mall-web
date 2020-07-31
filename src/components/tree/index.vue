<template>
    <div class="suyan-tree">
        <div :style="'padding-left:' + paddingLeft + 'px'" v-for="item in data">
            <div class="checkbox layui-form-checked">
                <i></i>
            </div>
            <span>{{item.label}}</span>
            <tree :data="item.children" :paddingLeft="paddingLeft + 20"></tree>
        </div>
    </div>
</template>


<script>
import Tree from '@/components/tree';
export default {
    components: {Tree},
    name: 'tree',
    props: {
        data: {
            type: Array,
            required: false,
            default: () => {
                return []
            }
        },
        paddingLeft: {
            type: Number,
            default: () => {
                return 0
            }
        }
    }
}

</script>

<style lang="less">
    .suyan-tree {
        .checkbox {
            height: auto!important;
            line-height: normal!important;
            width: 20px;
            min-height: 18px;
            border: none!important;
            margin-right: 0;
            padding-right: 0;
            background: 0 0;
            display: inline-block;
            vertical-align: middle;

            i {
                display: inline-block;
                right: auto;
                left: 0;
                width: 16px;
                height: 16px;
                line-height: 16px;
                border: 1px solid #d2d2d2;
                font-size: 12px;
                border-radius: 2px;
                background-color: #fff;
                -webkit-transition: .1s linear;
                transition: .1s linear;
            }
        }
    }
</style>