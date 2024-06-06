"use strict";
const utils_http = require("../utils/http.js");
const postLoginWxMinSimpleAPI = (phoneNumber) => {
  return utils_http.httpInstance({
    method: "POST",
    url: "/login/wxMin/simple",
    data: {
      phoneNumber
    }
  });
};
exports.postLoginWxMinSimpleAPI = postLoginWxMinSimpleAPI;
//# sourceMappingURL=login.js.map
