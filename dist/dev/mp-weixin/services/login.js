"use strict";
const utils_http = require("../utils/http.js");
const PostLoginAPI = (data) => {
  return utils_http.httpInstance({
    method: "POST",
    url: "/login",
    data
  });
};
exports.PostLoginAPI = PostLoginAPI;
//# sourceMappingURL=login.js.map
