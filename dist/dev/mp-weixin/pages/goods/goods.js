"use strict";
const common_vendor = require("../../common/vendor.js");
const services_goods = require("../../services/goods.js");
const services_cart = require("../../services/cart.js");
require("../../utils/http.js");
require("../../stores/index.js");
require("../../stores/modules/member.js");
if (!Array) {
  const _easycom_vk_data_goods_sku_popup2 = common_vendor.resolveComponent("vk-data-goods-sku-popup");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_vk_data_goods_sku_popup2 + _easycom_uni_popup2)();
}
const _easycom_vk_data_goods_sku_popup = () => "../../components/vk-data-goods-sku-popup/vk-data-goods-sku-popup.js";
const _easycom_uni_popup = () => "../../node-modules/@dcloudio/uni-ui/lib/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_vk_data_goods_sku_popup + PageSkeleton + AddressPanel + ServicePanel + _easycom_uni_popup)();
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
    const goodsList = common_vendor.ref([]);
    const getGoodsList = async () => {
      const res = await services_goods.getGoodsByIdAPI(props.id);
      goodsList.value = res.result;
      console.log(goodsList.value);
      localdata.value = {
        _id: res.result.id,
        name: res.result.name,
        goods_thumb: res.result.mainPictures[0],
        spec_list: res.result.specs.map((v) => {
          return { name: v.name, list: v.values };
        }),
        sku_list: res.result.skus.map((v) => {
          return {
            _id: v.id,
            goods_id: res.result.id,
            goods_name: res.result.name,
            image: v.picture,
            price: v.price * 100,
            stock: v.inventory,
            sku_name_arr: v.specs.map((vv) => vv.valueName)
          };
        })
      };
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
    const isShowSku = common_vendor.ref(false);
    const localdata = common_vendor.ref({});
    const mode = common_vendor.ref(1);
    const openSkuPopup = (val) => {
      isShowSku.value = true;
      mode.value = val;
    };
    const skuPopupRef = common_vendor.ref();
    const selectArrText = common_vendor.computed(() => {
      var _a, _b;
      return ((_b = (_a = skuPopupRef.value) == null ? void 0 : _a.selectArr) == null ? void 0 : _b.join(" ").trim()) || "请选择商品规格";
    });
    const onAddCart = async (e) => {
      await services_cart.postMemberCartAPI({ skuId: e._id, count: e.buy_num });
      common_vendor.index.showToast({
        title: "添加成功"
      });
      setTimeout(() => {
        isShowSku.value = false;
      }, 500);
    };
    return (_ctx, _cache) => {
      var _a, _b, _c, _d, _e, _f;
      return common_vendor.e({
        a: common_vendor.sr(skuPopupRef, "02d9cc46-0", {
          "k": "skuPopupRef"
        }),
        b: common_vendor.o(onAddCart),
        c: common_vendor.o(($event) => isShowSku.value = $event),
        d: common_vendor.p({
          localdata: localdata.value,
          mode: mode.value,
          ["add-cart-background-color"]: "#FFA868",
          ["buy-now-background-color"]: "#27BA9B",
          ["actived-style"]: {
            color: "#27BA9B",
            borderColor: "#27BA9B",
            backgroundColor: "#E9F8F5"
          },
          modelValue: isShowSku.value
        }),
        e: isFinish.value
      }, isFinish.value ? {
        f: common_vendor.f((_a = goodsList.value) == null ? void 0 : _a.mainPictures, (item, index, i0) => {
          return {
            a: item,
            b: common_vendor.o(($event) => onTapImage(item), item),
            c: item
          };
        }),
        g: common_vendor.o(onChange),
        h: common_vendor.t(currentIndex.value + 1),
        i: common_vendor.t((_c = (_b = goodsList.value) == null ? void 0 : _b.mainPictures) == null ? void 0 : _c.length),
        j: common_vendor.t(goodsList.value.price),
        k: common_vendor.t(goodsList.value.name),
        l: common_vendor.t(goodsList.value.desc),
        m: common_vendor.t(common_vendor.unref(selectArrText)),
        n: common_vendor.o(($event) => openSkuPopup(1)),
        o: common_vendor.o(($event) => openPopup("address")),
        p: common_vendor.o(($event) => openPopup("service")),
        q: common_vendor.f((_d = goodsList.value.details) == null ? void 0 : _d.properties, (item, k0, i0) => {
          return {
            a: common_vendor.t(item.name),
            b: common_vendor.t(item.value),
            c: item.name
          };
        }),
        r: common_vendor.f((_e = goodsList.value.details) == null ? void 0 : _e.pictures, (item, k0, i0) => {
          return {
            a: item,
            b: item
          };
        }),
        s: common_vendor.f(goodsList.value.similarProducts, (item, k0, i0) => {
          return {
            a: item.picture,
            b: common_vendor.t(item.name),
            c: common_vendor.t(item.price),
            d: item.id,
            e: `/pages/goods/goods?id=${item.id}`
          };
        })
      } : {}, {
        t: common_vendor.o(($event) => openSkuPopup(2)),
        v: common_vendor.o(($event) => openSkuPopup(3)),
        w: ((_f = common_vendor.unref(safeAreaInsets)) == null ? void 0 : _f.bottom) + "px",
        x: popupName.value === "address"
      }, popupName.value === "address" ? {
        y: common_vendor.o(($event) => {
          var _a2;
          return (_a2 = popup.value) == null ? void 0 : _a2.close();
        })
      } : {}, {
        z: popupName.value === "service"
      }, popupName.value === "service" ? {
        A: common_vendor.o(($event) => {
          var _a2;
          return (_a2 = popup.value) == null ? void 0 : _a2.close();
        })
      } : {}, {
        B: common_vendor.sr(popup, "02d9cc46-2", {
          "k": "popup"
        }),
        C: common_vendor.p({
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
