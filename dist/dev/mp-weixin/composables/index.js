"use strict";
const common_vendor = require("../common/vendor.js");
const useGuessList = () => {
  const guessRef = common_vendor.ref();
  const onScrolltolower = () => {
    var _a;
    console.log("到底了");
    (_a = guessRef.value) == null ? void 0 : _a.getMore();
  };
  return { guessRef, onScrolltolower };
};
exports.useGuessList = useGuessList;
//# sourceMappingURL=index.js.map
