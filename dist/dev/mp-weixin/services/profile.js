"use strict";
const utils_http = require("../utils/http.js");
const getMemberProfileAPI = () => {
  return utils_http.httpInstance({
    method: "GET",
    url: "/member/profile"
  });
};
const putMemberProfileAPI = (data) => {
  return utils_http.httpInstance({
    method: "PUT",
    url: "/member/profile",
    data
  });
};
exports.getMemberProfileAPI = getMemberProfileAPI;
exports.putMemberProfileAPI = putMemberProfileAPI;
//# sourceMappingURL=profile.js.map
