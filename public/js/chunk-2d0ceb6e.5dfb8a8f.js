(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0ceb6e"],{6141:function(t,e,o){"use strict";o.r(e);var a=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",[o("el-card",{attrs:{shadow:"always"}},[o("el-row",[o("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.$router.push({name:"subPromotionEdit"})}}},[t._v("创建订单促销")])],1),o("el-form",{staticClass:"mt20",attrs:{inline:!0,model:t.query}},[o("el-form-item",{attrs:{label:"订单促销名称"}},[o("el-input",{attrs:{placeholder:"订单促销名称"},model:{value:t.query.subPromotionNameLike,callback:function(e){t.$set(t.query,"subPromotionNameLike",e)},expression:"query.subPromotionNameLike"}})],1),o("el-form-item",{attrs:{label:"类型"}},[o("el-select",{attrs:{placeholder:"全部"},model:{value:t.query.subPromotionType,callback:function(e){t.$set(t.query,"subPromotionType",e)},expression:"query.subPromotionType"}},[o("el-option",{attrs:{value:""}},[t._v("全部")]),t._l(t.subPromotionTypeOptions,(function(t){return o("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})}))],2)],1),o("el-form-item",[o("el-button",{attrs:{type:"primary"},on:{click:t.getSubPromotionList}},[t._v("查询")])],1)],1),o("el-table",{staticStyle:{width:"100%"},attrs:{data:t.goodsList}},[o("el-table-column",{attrs:{prop:"id",label:"ID",width:"100"}}),o("el-table-column",{attrs:{prop:"subPromotionName",label:"订单促销名称"}}),o("el-table-column",{attrs:{prop:"subPormotionTypeDesc",label:"类型",width:"120"}}),o("el-table-column",{attrs:{prop:"startTime",label:"生效时间",width:"150"}}),o("el-table-column",{attrs:{prop:"endTime",label:"失效时间",width:"150"}}),o("el-table-column",{attrs:{label:"状态",width:"120"},scopedSlots:t._u([{key:"default",fn:function(e){return[1==e.row.subPromotionStatus?o("el-tag",{attrs:{type:"info"}},[t._v("已保存")]):o("el-tag",[t._v("1111")])]}}])}),o("el-table-column",{attrs:{prop:"createTime",label:"创建时间",sortable:"",width:"150"}}),o("el-table-column",{attrs:{label:"操作",width:"150"},scopedSlots:t._u([{key:"default",fn:function(e){return[o("el-button",{on:{click:function(o){return t.handleEdit(e.row)}}},[t._v("编辑")])]}}])})],1),o("el-pagination",{staticClass:"mt20",attrs:{"current-page":t.query.pageNo,"page-sizes":[10,20,50,100],"page-size":t.query.pageSize,layout:"total, sizes, prev, pager, next",total:t.query.total},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange,"update:currentPage":function(e){return t.$set(t.query,"pageNo",e)},"update:current-page":function(e){return t.$set(t.query,"pageNo",e)}}})],1)],1)},r=[],n=(o("c276"),o("09bb")),i={data:function(){return{subPromotionTypeOptions:[],goodsList:[],query:{pageNo:1,pageSize:20,total:0,subPromotionNameLike:"",subPromotionType:"",orderBy:"id DESC"}}},created:function(){this.getCouponTypeList(),this.getSubPromotionList()},methods:{handleEdit:function(t){this.$router.push({name:"subPromotionEdit",query:{id:t.id}})},handleSizeChange:function(t){this.query.pageSize=t,this.getSubPromotionList()},handleCurrentChange:function(t){this.query.pageNo=t,this.getSubPromotionList()},getCouponTypeList:function(){var t=this;n["a"].getPromotionTypes(2).then((function(e){t.subPromotionTypeOptions=e.data}))},getSubPromotionList:function(){var t=this;n["a"].subPromotionQuery(this.query).then((function(e){t.query.pageNo=e.data.pageNo,t.query.pageSize=e.data.pageSize,t.query.total=e.data.totalRecords,t.goodsList=e.data.records}))}}},l=i,u=o("9ca4"),s=Object(u["a"])(l,a,r,!1,null,null,null);e["default"]=s.exports}}]);
//# sourceMappingURL=chunk-2d0ceb6e.5dfb8a8f.js.map