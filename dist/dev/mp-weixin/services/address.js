"use strict";
const utils_http = require("../utils/http.js");
const postMemberAddressAPI = (data) => {
  return utils_http.httpInstance({
    method: "POST",
    url: "/member/address",
    data
  });
};
const getMemberAddressAPI = () => {
  return utils_http.httpInstance({
    method: "GET",
    url: "/member/address"
  });
};
const getMemberAddressByIdAPI = (id) => {
  return utils_http.httpInstance({
    method: "GET",
    url: `/member/address/${id}`
  });
};
const putMemberAddressByIdAPI = (id, data) => {
  return utils_http.httpInstance({
    method: "PUT",
    url: `/member/address/${id}`,
    data
  });
};
const deleteMemberAddressByIdAPI = (id) => {
  return utils_http.httpInstance({
    method: "DELETE",
    url: `/member/address/${id}`
  });
};
exports.deleteMemberAddressByIdAPI = deleteMemberAddressByIdAPI;
exports.getMemberAddressAPI = getMemberAddressAPI;
exports.getMemberAddressByIdAPI = getMemberAddressByIdAPI;
exports.postMemberAddressAPI = postMemberAddressAPI;
exports.putMemberAddressByIdAPI = putMemberAddressByIdAPI;
//# sourceMappingURL=address.js.map
