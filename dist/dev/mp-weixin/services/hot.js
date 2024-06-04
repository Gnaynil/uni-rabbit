"use strict";
const utils_http = require("../utils/http.js");
const getHotRecommendAPI = (url, data) => {
  return utils_http.httpInstance({
    method: "GET",
    url,
    data
  });
};
exports.getHotRecommendAPI = getHotRecommendAPI;
//# sourceMappingURL=hot.js.map
