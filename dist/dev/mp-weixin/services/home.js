"use strict";
const utils_http = require("../utils/http.js");
const getHomeBannerAPI = (distributionSite = 1) => {
  return utils_http.httpInstance({
    method: "GET",
    url: "/home/banner",
    data: {
      distributionSite
    }
  });
};
exports.getHomeBannerAPI = getHomeBannerAPI;
//# sourceMappingURL=home.js.map
