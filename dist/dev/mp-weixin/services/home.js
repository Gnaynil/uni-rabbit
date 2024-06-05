"use strict";
const utils_http = require("../utils/http.js");
const getHomeBannerAPI = (distributionSite = "1") => {
  return utils_http.httpInstance({
    method: "GET",
    url: "/home/banner",
    data: {
      distributionSite
    }
  });
};
const getHomeCategoryAPI = () => {
  return utils_http.httpInstance({
    method: "GET",
    url: "/home/category/mutli"
  });
};
const getHomeHotItemAPI = () => {
  return utils_http.httpInstance({
    method: "GET",
    url: "/home/hot/mutli"
  });
};
const getHomeGoodsGuessLikeAPI = (data) => {
  return utils_http.httpInstance({
    method: "GET",
    url: "/home/goods/guessLike",
    data
  });
};
exports.getHomeBannerAPI = getHomeBannerAPI;
exports.getHomeCategoryAPI = getHomeCategoryAPI;
exports.getHomeGoodsGuessLikeAPI = getHomeGoodsGuessLikeAPI;
exports.getHomeHotItemAPI = getHomeHotItemAPI;
//# sourceMappingURL=home.js.map
