"use strict";
const common_vendor = require("../../common/vendor.js");
const services_goods = require("../../services/goods.js");
require("../../utils/http.js");
require("../../stores/index.js");
require("../../stores/modules/member.js");
if (!Array) {
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  _easycom_uni_popup2();
}
const _easycom_uni_popup = () => "../../node-modules/@dcloudio/uni-ui/lib/uni-popup/uni-popup.js";
if (!Math) {
  (PageSkeleton + AddressPanel + ServicePanel + _easycom_uni_popup)();
}
const AddressPanel = () => "./components/AddressPanel.js";
const ServicePanel = () => "./components/ServicePanel.js";
const PageSkeleton = () => "./components/PageSkeleton.js";
const _sfc_main = {
  __name: "goods",
  props: {
    id: {
      type: String,
      default: ""
    }
  },
  setup(__props) {
    const props = __props;
    const { safeAreaInsets } = common_vendor.index.getSystemInfoSync();
    console.log(props);
    const goodsList = common_vendor.ref([]);
    const getGoodsList = async () => {
      const res = await services_goods.getGoodsByIdAPI(props.id);
      goodsList.value = res.result;
    };
    const isFinish = common_vendor.ref(false);
    common_vendor.onLoad(async () => {
      await getGoodsList();
      isFinish.value = true;
    });
    const currentIndex = common_vendor.ref(0);
    const onChange = (e) => {
      currentIndex.value = e.detail.current;
    };
    const onTapImage = (url) => {
      common_vendor.index.previewImage({
        current: url,
        urls: goodsList.value.mainPictures
      });
    };
    const popup = common_vendor.ref();
    const popupName = common_vendor.ref();
    const openPopup = (name) => {
      popupName.value = name;
      popup.value.open();
    };
    return (_ctx, _cache) => {
      var _a, _b, _c, _d, _e, _f;
      return common_vendor.e({
        a: isFinish.value
      }, isFinish.value ? {
        b: common_vendor.f((_a = goodsList.value) == null ? void 0 : _a.mainPictures, (item, index, i0) => {
          return {
            a: item,
            b: common_vendor.o(($event) => onTapImage(item), item),
            c: item
          };
        }),
        c: common_vendor.o(onChange),
        d: common_vendor.t(currentIndex.value + 1),
        e: common_vendor.t((_c = (_b = goodsList.value) == null ? void 0 : _b.mainPictures) == null ? void 0 : _c.length),
        f: common_vendor.t(goodsList.value.price),
        g: common_vendor.t(goodsList.value.name),
        h: common_vendor.t(goodsList.value.desc),
        i: common_vendor.o(($event) => openPopup("address")),
        j: common_vendor.o(($event) => openPopup("service")),
        k: common_vendor.f((_d = goodsList.value.details) == null ? void 0 : _d.properties, (item, k0, i0) => {
          return {
            a: common_vendor.t(item.name),
            b: common_vendor.t(item.value),
            c: item.name
          };
        }),
        l: common_vendor.f((_e = goodsList.value.details) == null ? void 0 : _e.pictures, (item, k0, i0) => {
          return {
            a: item,
            b: item
          };
        }),
        m: common_vendor.f(goodsList.value.similarProducts, (item, k0, i0) => {
          return {
            a: item.picture,
            b: common_vendor.t(item.name),
            c: common_vendor.t(item.price),
            d: item.id,
            e: `/pages/goods/goods?id=${item.id}`
          };
        })
      } : {}, {
        n: ((_f = common_vendor.unref(safeAreaInsets)) == null ? void 0 : _f.bottom) + "px",
        o: popupName.value === "address"
      }, popupName.value === "address" ? {
        p: common_vendor.o(($event) => {
          var _a2;
          return (_a2 = popup.value) == null ? void 0 : _a2.close();
        })
      } : {}, {
        q: popupName.value === "service"
      }, popupName.value === "service" ? {
        r: common_vendor.o(($event) => {
          var _a2;
          return (_a2 = popup.value) == null ? void 0 : _a2.close();
        })
      } : {}, {
        s: common_vendor.sr(popup, "02d9cc46-1", {
          "k": "popup"
        }),
        t: common_vendor.p({
          type: "bottom",
          backgroundColor: "#fff"
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/code/uni-rabbit/src/pages/goods/goods.vue"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=goods.js.map