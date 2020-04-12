import Http from "./axios";
const operation = "/api-operation";
const user = "/api-user";

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
  // 选择店铺
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
}