(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0b362d"],{"27c5":function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"suyan__shop__create"},[a("div",{staticClass:"content"},[a("el-row",{staticClass:"suyan__steps"},[a("el-col",{staticClass:"steps__item finish",attrs:{span:8}},[a("div",{staticClass:"steps__step finish"},[t._v("1.经营信息")])]),a("el-col",{staticClass:"steps__item",attrs:{span:8}},[a("div",{staticClass:"steps__step"},[t._v("2.店铺信息")])]),a("el-col",{staticClass:"steps__item",attrs:{span:8}},[a("div",{staticClass:"steps__step"},[t._v("3.完成")])])],1),a("div",{staticClass:"create"},[a("h1",[t._v("请选择你的主营商品")]),a("el-form",{ref:"formInline",staticClass:"form"},[a("el-cascader",{staticStyle:{width:"350px"},attrs:{placeholder:"请选择类目",options:t.categoryList,expandTrigger:"click"},on:{change:t.select}}),a("el-form-item",{staticStyle:{"margin-top":"40px","text-align":"center"}},[a("el-button",{attrs:{disabled:!t.categoryId,type:"primary"},on:{click:function(e){return t.next()}}},[t._v("下一步")])],1)],1)],1)],1)])},i=[],c=(a("fe59"),a("08ba"),a("c276")),n=a("09bb"),r={computed:{},data:function(){return{nickName:"",categoryId:"",categoryName:"",categoryList:[]}},created:function(){this.$emit("child-event",this.$route.meta.title),this.nickName=c["a"].getUserInfo().nickName,this.getCategoryData()},methods:{getCategoryData:function(){var t=this;n["a"].operationCategoryGetTree().then((function(e){e.data.forEach((function(e){var a;e.childCategoryList&&(a=[],e.childCategoryList.forEach((function(t){a.push({value:t.id,label:t.categoryName})}))),t.categoryList.push({value:e.id,label:e.categoryName,children:a})}))}))},select:function(t){t&&(this.categoryId=t[t.length-1])},next:function(){this.$router.push({name:"shopCreateInfo",query:{categoryId:this.categoryId}})}}},o=r,l=a("9ca4"),p=Object(l["a"])(o,s,i,!1,null,null,null);e["default"]=p.exports}}]);
//# sourceMappingURL=chunk-2d0b362d.a2bc7f6d.js.map