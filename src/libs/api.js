import Http from "./axios";
const operation = "/api/operation-b";
const user = "/api/user-b";
const goods = "/api/goods-b/b";
const mmc = "/api/mmc-b";


export default {
    // ---------运营平台相关---------
    // 获取类目树
    operationCategoryGetTree() {
        return Http.get(`${operation}/b/category/getTree`);
    },
    // 获取地址信息
    operationGetAddress(id) {
        return Http.get(`${operation}/b/address/get/${id}`);
    },
    // 创建店铺
    operationShopAdd(params) {
        return Http.post(`${operation}/b/shop/add`, params);
    },
    // 店铺列表
    operationShopList() {
        return Http.get(`${operation}/b/shop/list`);
    },
    // 店铺信息
    operationShopInfo() {
        return Http.get(`${operation}/b/shop/info`);
    },
    // 店铺信息
    operationShopInfo() {
        return Http.get(`${operation}/b/shop/info`);
    },
    // 修改店铺信息
    operationShopUpdate(params) {
        return Http.post(`${operation}/b/shop/update`, params);
    },
    operationSelectShop(id) {
        return Http.get(`${operation}/b/shop/select/${id}`);
    },


    // ---------用户中心相关---------
    // 发送验证码
    userSendSmsVerCode(params) {
    return Http.post(`${user}/b/sms/sendVerifyCode`, params);
    },
    // 商户注册
    userShopRegister(params) {
        return Http.post(`${user}/b/shopUser/register`, params);
    },
    // 商户登录
    userShopLogin(params) {
        return Http.post(`${user}/b/shopUser/login`, params);
    },
    // 商户退出
    userShopLogout() {
        return Http.post(`${user}/b/shopUser/logout`);
    },


    // ---------商品中心相关---------
    goodsCategoryGet(type) {
        return Http.get(`${goods}/goodsCategory/get/${type}`);
    },
    // 获取商品类目树
    goodsCategoryGetTree(type) {
        return Http.get(`${goods}/goodsCategory/getTree/${type}`);
    },
    goodsCategoryGetByParentId(parentId, type) {
        return Http.get(`${goods}/goodsCategory/getByParentId/${parentId}/${type}`);
    },
    // 获取商品类目属性列表信息
    goodsCategoryAttributeGetTreeByCategoryId(categoryId) {
        return Http.get(`${goods}/goodsCategoryAttribute/getTreeByCategoryId/${categoryId}`);
    },
    // 获取最近发布的商品类目
    getGoodsCategoryRecentlyReleasedGoodsCategory() {
        return Http.get(`${goods}/goodsCategory/getRecentlyReleasedGoodsCategory`);
    },
    // 创建商品
    goodsAdd(params) {
        return Http.post(`${goods}/goods/addOrUpdate`, params);
    },
    // 查询商品
    goodsQuery(params) {
        return Http.post(`${goods}/goods/query`, params);
    },
    goodsSkuQuery(params) {
        return Http.post(`${goods}/goodsSku/query`, params);
    },
    // 查询商品
    goodsGet(id) {
        return Http.get(`${goods}/goods/get/${id}`);
    },
    goodsSkuGet(skuCode) {
        return Http.get(`${goods}/goodsSku/get?skuCode=${skuCode}`);
    },
    // 商品上下架
    goodsShelves(id, opt) {
        return Http.post(`${goods}/goods/shelves/${id}/${opt}`);
    },
    // 查询商品品牌
    goodsBrandGet(categoryId) {
        return Http.get(`${goods}/goodsBrand/get/${categoryId}`);
    },
    // 查询商品分类
    goodsClassQuery(params) {
        return Http.post(`${goods}/goodsClass/query`, params);
    },
    goodsClassAddOrUpdate(params) {
        return Http.post(`${goods}/goodsClass/addOrUpdate`, params);
    },
    goodsClassGet(id) {
        return Http.get(`${goods}/goodsClass/get/${id}`);
    },
    goodsClassDelete(id) {
        return Http.post(`${goods}/goodsClass/delete/${id}`);
    },

    // ---------营销中心相关---------
    // 查询优惠券
    couponQuery(params) {
        return Http.post(`${mmc}/b/coupon/query`, params);
    },
    couponAdd(params) {
        return Http.post(`${mmc}/b/coupon/addOrUpdate`, params);
    },
    getCouponChannelTypes() {
        return Http.get(`${mmc}/b/couponChannel/getTypes`);
    },
    getPromotionTypes(type) {
        return Http.get(`${mmc}/b/promotion/getTypes/${type}`);
    },
    // 查询优惠券
    couponGet(id) {
        return Http.get(`${mmc}/b/coupon/get/${id}`);
    },
    // 查询订单促销
    subPromotionQuery(params) {
        return Http.post(`${mmc}/b/subPromotion/query`, params);
    },
    subPromotionAdd(params) {
        return Http.post(`${mmc}/b/subPromotion/addOrUpdate`, params);
    },
    subPromotionGet(id) {
        return Http.get(`${mmc}/b/subPromotion/get/${id}`);
    },
    // 查询砍价
    bargainQuery(params) {
        return Http.post(`${mmc}/b/bargain/query`, params);
    },
    // 新增/编辑砍价
    bargainEdit(params) {
        return Http.post(`${mmc}/b/bargain/addOrUpdate`, params);
    },
    // 查询砍价
    bargainGet(id) {
        return Http.get(`${mmc}/b/bargain/get/${id}`);
    },
    

}