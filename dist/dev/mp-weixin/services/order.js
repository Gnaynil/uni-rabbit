"use strict";
const utils_http = require("../utils/http.js");
const getMemberOrderPreAPI = () => {
  return utils_http.httpInstance({
    method: "GET",
    url: "/member/order/pre"
  });
};
const getMemberOrderPreNowAPI = (data) => {
  return utils_http.httpInstance({
    method: "GET",
    url: "/member/order/pre/now",
    data
  });
};
const postMemberOrderAPI = (data) => {
  return utils_http.httpInstance({
    method: "POST",
    url: "/member/order",
    data
  });
};
const getMemberOrderByIdAPI = (id) => {
  return utils_http.httpInstance({
    method: "GET",
    url: `/member/order/${id}`
  });
};
const getPayMockAPI = (data) => {
  return utils_http.httpInstance({
    method: "GET",
    url: "/pay/mock",
    data
  });
};
const getMemberOrderConsignmentByIdAPI = (id) => {
  return utils_http.httpInstance({
    method: "GET",
    url: `/member/order/consignment/${id}`
  });
};
const putMemberOrderReceiptByIdAPI = (id) => {
  return utils_http.httpInstance({
    method: "PUT",
    url: `/member/order/${id}/receipt`
  });
};
exports.getMemberOrderByIdAPI = getMemberOrderByIdAPI;
exports.getMemberOrderConsignmentByIdAPI = getMemberOrderConsignmentByIdAPI;
exports.getMemberOrderPreAPI = getMemberOrderPreAPI;
exports.getMemberOrderPreNowAPI = getMemberOrderPreNowAPI;
exports.getPayMockAPI = getPayMockAPI;
exports.postMemberOrderAPI = postMemberOrderAPI;
exports.putMemberOrderReceiptByIdAPI = putMemberOrderReceiptByIdAPI;
//# sourceMappingURL=order.js.map
