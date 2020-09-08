(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-e89468b8"],{"44e4":function(t,e,a){var i=a("1c8b"),r=a("cb06");i({target:"Number",stat:!0},{isInteger:r})},"93ee":function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"gooods__edit"},[a("el-card",{attrs:{shadow:"always"}},[a("el-steps",{staticStyle:{"max-width":"1000px"},attrs:{active:t.stepIndex,simple:"","finish-status":"success"}},[a("el-step",{attrs:{title:"设置活动信息",icon:"el-icon-edit"}}),a("el-step",{attrs:{title:"设置砍价商品",icon:"el-icon-edit"}})],1),a("activity",{directives:[{name:"show",rawName:"v-show",value:0==t.stepIndex,expression:"stepIndex == 0"}],ref:"activity",on:{setActivity:t.setActivity}}),a("goods",{directives:[{name:"show",rawName:"v-show",value:1==t.stepIndex,expression:"stepIndex == 1"}],ref:"bargainItem",attrs:{activity:t.activity}})],1)],1)},r=[],n=(a("fe59"),a("08ba"),a("c276")),o=a("09bb"),s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"gooods__edit"},[a("el-form",{ref:"activityForm",staticClass:"mt20",attrs:{model:t.activityForm,"label-width":"120px",rules:t.rules}},[a("el-form-item",{attrs:{label:"生效时间",prop:"effectTime"}},[a("el-date-picker",{attrs:{"picker-options":t.pickerOptions,type:"datetimerange","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期","default-time":["00:00:00","23:59:59"]},on:{input:t.testClick},model:{value:t.activityForm.effectTime,callback:function(e){t.$set(t.activityForm,"effectTime",e)},expression:"activityForm.effectTime"}})],1),a("el-form-item",{attrs:{label:"活动规则",prop:"activityRule"}},[a("el-input",{staticStyle:{width:"500px"},attrs:{type:"textarea",maxlength:"2000","show-word-limit":"",autosize:{minRows:10,maxRows:15}},model:{value:t.activityForm.activityRule,callback:function(e){t.$set(t.activityForm,"activityRule",e)},expression:"activityForm.activityRule"}})],1),a("el-form-item",[a("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.next("activityForm")}}},[t._v("下一步")]),a("el-button",{on:{click:function(e){return t.$router.push({name:"bargainList"})}}},[t._v("取消")])],1)],1)],1)},l=[],c={data:function(){return{pickerOptions:{shortcuts:[{text:"有效期一周",onClick:function(t){var e=new Date,a=new Date;e.setTime(a.getTime()+6048e5),t.$emit("pick",[a,e])}},{text:"有效期一个月",onClick:function(t){var e=new Date,a=new Date;e.setTime(a.getTime()+2592e6),t.$emit("pick",[a,e])}},{text:"有效期三个月",onClick:function(t){var e=new Date,a=new Date;e.setTime(a.getTime()+7776e6),t.$emit("pick",[a,e])}},{text:"有效期半年",onClick:function(t){var e=new Date,a=new Date;e.setTime(a.getTime()+15552e6),t.$emit("pick",[a,e])}},{text:"有效期一年",onClick:function(t){var e=new Date,a=new Date;e.setTime(a.getTime()+31536e6),t.$emit("pick",[a,e])}}]},rules:{effectTime:[{type:"array",required:!0,message:"请选择生效时间",trigger:"change"}],activityRule:[{required:!0,message:"请输入活动规则",trigger:"blur"}]},activityForm:{id:"",effectTime:"",activityRule:""}}},created:function(){},methods:{getBargainInfo:function(t){this.activityForm=t,this.$set(this.activityForm,"effectTime",[new Date(t.startTime),new Date(t.endTime)])},testClick:function(t){var e=this;this.$nextTick((function(){e.activityForm.effectTime=[],e.$set(e.activityForm,"effectTime",[t[0],t[1]])}))},next:function(t){var e=this;this.$refs[t].validate((function(t){if(!t)return!1;e.$emit("setActivity",e.activityForm)}))}}},u=c,m=a("9ca4"),g=Object(m["a"])(u,s,l,!1,null,null,null),b=g.exports,d=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"gooods__edit"},[a("el-form",{ref:"bargainForm",staticClass:"mt20",attrs:{model:t.bargainForm,"label-width":"120px",rules:t.rules}},[a("el-form-item",{attrs:{label:"砍价有效期"}},[a("el-radio-group",{model:{value:t.bargainForm.validityDateType,callback:function(e){t.$set(t.bargainForm,"validityDateType",e)},expression:"bargainForm.validityDateType"}},[a("el-radio-button",{attrs:{label:"1"}},[t._v("24小时")]),a("el-radio-button",{attrs:{label:"2"}},[t._v("48小时")]),a("el-radio-button",{attrs:{label:"3"}},[t._v("72小时")])],1)],1),a("el-form-item",{attrs:{label:"砍价商品",prop:"goodsSkuCode"}},[a("el-button",{attrs:{type:"warning"},on:{click:function(e){t.goodsFlag=!0}}},[t._v("选择商品")]),null!=t.goods?a("el-card",{staticClass:"mt10"},[a("p",[t._v(t._s(t.goods.goodsName))]),a("p",[a("el-tag",[t._v("规格编码："+t._s(t.goods.skuCode))]),a("el-tag",{staticClass:"ml10"},[t._v("规格："+t._s(t.goods.specValue))]),a("el-tag",{staticClass:"ml10"},[t._v("价格："),a("span",{staticClass:"red"},[t._v("￥"+t._s(t.goods.price))])]),a("el-tag",{staticClass:"ml10"},[t._v("库存："+t._s(t.goods.inventory))])],1)]):t._e()],1),a("el-form-item",{attrs:{label:"库存",prop:"inventory"}},[a("el-input-number",{attrs:{min:1,max:99999999,precision:0},model:{value:t.bargainForm.inventory,callback:function(e){t.$set(t.bargainForm,"inventory",e)},expression:"bargainForm.inventory"}})],1),a("el-form-item",{attrs:{label:"砍价阶梯"}},[t._l(t.bargainForm.bargainItemList,(function(e,i){return a("el-card",{key:i,staticClass:"mb10",staticStyle:{background:"#F8F9FC",position:"relative"}},[a("el-row",{staticStyle:{position:"absolute",top:"-5px",left:"0"}},[a("el-tag",[t._v("阶段"+t._s(i+1))]),a("span",{staticClass:"error ml10"},[t._v(t._s(t.bargainForm.bargainItemList[i].errorText))])],1),a("el-button",{directives:[{name:"show",rawName:"v-show",value:t.bargainForm.bargainItemList.length>2,expression:"bargainForm.bargainItemList.length > 2"}],staticClass:"ml20",staticStyle:{position:"absolute",top:"0",right:"0"},attrs:{type:"warning"},on:{click:function(e){return t.delItem(i)}}},[t._v("删除")]),a("el-row",{staticClass:"mt20"},[a("span",[t._v("帮砍人数：")]),a("el-input",{staticStyle:{width:"120px"},attrs:{maxlength:4},model:{value:e.numberMin,callback:function(a){t.$set(e,"numberMin",a)},expression:"item.numberMin"}},[a("template",{slot:"append"},[t._v("人")])],2),a("span",{staticClass:"ml5 mr5"},[t._v("至")]),a("el-input",{staticStyle:{width:"120px"},attrs:{maxlength:4},model:{value:e.numberMax,callback:function(a){t.$set(e,"numberMax",a)},expression:"item.numberMax"}},[a("template",{slot:"append"},[t._v("人")])],2),a("span",{staticClass:"ml20"},[t._v("总砍价比例：")]),a("el-input",{staticStyle:{width:"120px"},attrs:{maxlength:2},model:{value:e.bargainMin,callback:function(a){t.$set(e,"bargainMin",a)},expression:"item.bargainMin"}},[a("template",{slot:"append"},[t._v("%")])],2),a("span",{staticClass:"ml5 mr5"},[t._v("至")]),a("el-input",{staticStyle:{width:"120px"},attrs:{maxlength:2},model:{value:e.bargainMax,callback:function(a){t.$set(e,"bargainMax",a)},expression:"item.bargainMax"}},[a("template",{slot:"append"},[t._v("%")])],2)],1)],1)})),a("el-button",{directives:[{name:"show",rawName:"v-show",value:t.bargainForm.bargainItemList.length<5,expression:"bargainForm.bargainItemList.length < 5"}],attrs:{type:"primary"},on:{click:t.addItem}},[t._v("新增阶梯")]),a("span",{staticClass:"error ml10"},[t._v(t._s(t.bargainError))])],2),a("el-form-item",{attrs:{label:"业务逻辑"}},[a("p",[t._v("用户发起砍价为第一刀砍价，砍价比例在15%-20%之间")]),a("p",[t._v("砍价阶梯比例在65%-75%之间")]),a("p",[t._v("剩余5%-20%在首次分享里分配")])]),a("el-form-item",[a("el-button",{attrs:{type:"primary",loading:t.loading},on:{click:function(e){return t.onSubmit("bargainForm")}}},[t._v(t._s(t.buttonText))]),a("el-button",{on:{click:function(e){return t.$router.push({name:"bargainList"})}}},[t._v("取消")])],1)],1),a("goods-list",{attrs:{visible:t.goodsFlag},on:{selectGoods:t.selectGoods}})],1)},p=[],f=(a("ea69"),a("513c"),a("44e4"),a("e18c"),function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("el-dialog",{attrs:{width:t.width,title:"请选择商品","show-close":!1,visible:t.visible,"close-on-click-modal":!1},on:{"update:visible":function(e){t.visible=e}}},[a("el-form",{attrs:{inline:!0,model:t.query}},[a("el-form-item",{attrs:{label:"商品名称"}},[a("el-input",{attrs:{placeholder:"商品名称"},model:{value:t.query.goodsNameLike,callback:function(e){t.$set(t.query,"goodsNameLike",e)},expression:"query.goodsNameLike"}})],1),a("el-form-item",[a("el-button",{attrs:{type:"primary"},on:{click:t.getGoodsList}},[t._v("查询")])],1)],1),a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.goodsList}},[a("el-table-column",{attrs:{fixed:"left",label:"操作",width:"80"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{type:"primary"},nativeOn:{click:function(a){return a.preventDefault(),t.selectGoods(e.row)}}},[t._v("选择")])]}}])}),a("el-table-column",{attrs:{prop:"skuCode",label:"商品编码",width:"80"}}),a("el-table-column",{attrs:{prop:"goodsId",label:"商品id",width:"80"}}),a("el-table-column",{attrs:{prop:"goodsName",label:"商品名称"}}),a("el-table-column",{attrs:{prop:"specValue",label:"规格",width:"100"}}),a("el-table-column",{attrs:{prop:"price",label:"价格",width:"80"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",{staticClass:"red"},[t._v(t._s(e.row.price))])]}}])}),a("el-table-column",{attrs:{prop:"inventory",label:"库存",width:"80"}})],1),a("el-pagination",{staticClass:"mt20",attrs:{"current-page":t.query.pageNo,"page-sizes":[10,20,50,100],"page-size":t.query.pageSize,layout:"total, sizes, prev, pager, next",total:t.query.total},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange,"update:currentPage":function(e){return t.$set(t.query,"pageNo",e)},"update:current-page":function(e){return t.$set(t.query,"pageNo",e)}}})],1)}),v=[],h={props:{visible:{type:Boolean,default:function(){return!1}},width:{type:String,default:function(){return"800px"}}},data:function(){return{goodsList:[],query:{pageNo:1,pageSize:10,total:0,goodsNameLike:"",sales:"",commonStatus:1,orderBy:"id DESC"}}},created:function(){},methods:{handleSizeChange:function(t){this.query.pageSize=t,this.getGoodsList()},handleCurrentChange:function(t){this.query.pageNo=t,this.getGoodsList()},getGoodsList:function(){var t=this;o["a"].goodsSkuQuery(this.query).then((function(e){console.log(e.data),t.query.pageNo=e.data.pageNo,t.query.pageSize=e.data.pageSize,t.query.total=e.data.totalRecords,e.data.totalRecords>0&&e.data.records.forEach((function(t){t.createTime=n["a"].dateFormatter(t.createTime)})),t.goodsList=e.data.records}))},selectGoods:function(t){this.$emit("selectGoods",t)}}},y=h,x=Object(m["a"])(y,f,v,!1,null,null,null),F=x.exports,w={components:{GoodsList:F},props:{activity:{type:Object}},data:function(){return{bargainError:"",goodsFlag:!1,goods:null,rules:{inventory:[{required:!0,message:"请输入库存",trigger:"blur"}],goodsSkuCode:[{required:!0,message:"请选择参与商品",trigger:"blur"}]},bargainForm:{id:"",validityDateType:1,inventory:"",goodsSkuCode:"",bargainItemList:[{numberMin:"",numberMax:"",bargainMin:"",bargainMax:""},{numberMin:"",numberMax:"",bargainMin:"",bargainMax:""}]},loading:!1,buttonText:"立即创建"}},created:function(){},methods:{getBargainInfo:function(t){var e=this;this.bargainForm=t,this.buttonText="立即保存",o["a"].goodsSkuGet(t.goodsSkuCode).then((function(t){e.goods=t.data}))},selectGoods:function(t){this.goodsFlag=!1,this.goods=t,this.bargainForm.goodsSkuCode=t.skuCode},delItem:function(t){this.bargainForm.bargainItemList.splice(t,1)},addItem:function(){this.bargainForm.bargainItemList.push({numberMin:"",numberMax:"",bargainMin:"",bargainMax:""})},onSubmit:function(t){var e=this;this.$refs[t].validate((function(t){if(!t)return!1;for(var a=0,i=0,r=0;r<e.bargainForm.bargainItemList.length;r++){var s=e.bargainForm.bargainItemList[r];if(!s.numberMin||""==s.numberMin||!s.numberMax||""==s.numberMax)return s.errorText="帮砍人数不能为空",void e.$set(e.bargainForm.bargainItemList,r,s);if(!Number.isInteger(Number(s.numberMin))||!Number.isInteger(Number(s.numberMax)))return s.errorText="帮砍人数只能为数字",void e.$set(e.bargainForm.bargainItemList,r,s);if(Number(s.numberMin)<1||Number(s.numberMax)<1)return s.errorText="帮砍人数必须大于0",void e.$set(e.bargainForm.bargainItemList,r,s);if(Number(s.numberMin)>Number(s.numberMax))return s.errorText="帮砍人数范围错误",void e.$set(e.bargainForm.bargainItemList,r,s);if(!s.bargainMin||""==s.bargainMin||!s.bargainMax||""==s.bargainMax)return s.errorText="砍价比例不能为空",void e.$set(e.bargainForm.bargainItemList,r,s);if(!Number.isInteger(Number(s.bargainMin))||!Number.isInteger(Number(s.bargainMax)))return s.errorText="砍价比例只能为数字",void e.$set(e.bargainForm.bargainItemList,r,s);if(Number(s.bargainMin)<1||Number(s.bargainMax)<1)return s.errorText="砍价比例必须大于0",void e.$set(e.bargainForm.bargainItemList,r,s);if(Number(s.bargainMin)>85||Number(s.bargainMax)>85)return s.errorText="砍价比例不能大于85",void e.$set(e.bargainForm.bargainItemList,r,s);if(Number(s.bargainMin)>Number(s.bargainMax))return s.errorText="砍价比例范围错误",void e.$set(e.bargainForm.bargainItemList,r,s);s.errorText="",e.$set(e.bargainForm.bargainItemList,r,s),a+=Number(s.bargainMin),i+=Number(s.bargainMax),s.promotionMin=Number(s.bargainMin)/1e3*10,s.promotionMax=Number(s.bargainMax)/1e3*10}a>i?e.bargainError="砍价总最小比例不能大于砍价总最大比例":a<65||i>75?e.bargainError="砍价总比例在65-75之间":(e.bargainError="",e.bargainForm.startTime=n["a"].dateFormatter(e.activity.effectTime[0]),e.bargainForm.endTime=n["a"].dateFormatter(e.activity.effectTime[1]),e.bargainForm.id=e.activity.id,e.bargainForm.activityRule=e.activity.activityRule,e.bargainForm.price=e.goods.price,e.loading=!0,console.log("this.bargainForm",e.bargainForm),o["a"].bargainEdit(e.bargainForm).then((function(t){console.log(t),e.bargainForm.id?n["a"].messageSuccess("保存成功"):n["a"].messageSuccess("创建成功"),e.$router.push({name:"bargainList"})})).finally((function(t){e.loading&&(e.loading=!1)})))}))}}},_=w,M=Object(m["a"])(_,d,p,!1,null,null,null),k=M.exports,T={components:{Activity:b,Goods:k},data:function(){return{stepIndex:0,activity:{}}},created:function(){var t=this,e=this.$route.query.id;e&&(this.buttonText="立即保存",o["a"].bargainGet(e).then((function(e){e.data.bargainItemList.forEach((function(t){t.bargainMin=100*t.promotionMin,t.bargainMax=100*t.promotionMax})),t.$refs.activity.getBargainInfo(e.data),t.$refs.bargainItem.getBargainInfo(e.data)})))},methods:{setActivity:function(t){this.activity=t,this.stepIndex=1}}},C=T,I=Object(m["a"])(C,i,r,!1,null,null,null);e["default"]=I.exports},cb06:function(t,e,a){var i=a("a719"),r=Math.floor;t.exports=function(t){return!i(t)&&isFinite(t)&&r(t)===t}},ea69:function(t,e,a){"use strict";var i=a("1c8b"),r=a("e1d6"),n=a("3da3"),o=a("d88d"),s=a("3553"),l=a("1ca1"),c=a("1bbd"),u=a("1ea7"),m=a("ff9c"),g=u("splice"),b=m("splice",{ACCESSORS:!0,0:0,1:2}),d=Math.max,p=Math.min,f=9007199254740991,v="Maximum allowed length exceeded";i({target:"Array",proto:!0,forced:!g||!b},{splice:function(t,e){var a,i,u,m,g,b,h=s(this),y=o(h.length),x=r(t,y),F=arguments.length;if(0===F?a=i=0:1===F?(a=0,i=y-x):(a=F-2,i=p(d(n(e),0),y-x)),y+a-i>f)throw TypeError(v);for(u=l(h,i),m=0;m<i;m++)g=x+m,g in h&&c(u,m,h[g]);if(u.length=i,a<i){for(m=x;m<y-i;m++)g=m+i,b=m+a,g in h?h[b]=h[g]:delete h[b];for(m=y;m>y-i+a;m--)delete h[m-1]}else if(a>i)for(m=y-i;m>x;m--)g=m+i-1,b=m+a-1,g in h?h[b]=h[g]:delete h[b];for(m=0;m<a;m++)h[m+x]=arguments[m+2];return h.length=y-i+a,u}})}}]);
//# sourceMappingURL=chunk-e89468b8.f3437c3f.js.map