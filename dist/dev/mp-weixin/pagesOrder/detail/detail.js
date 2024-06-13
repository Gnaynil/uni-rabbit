"use strict";
const common_vendor = require("../../common/vendor.js");
const composables_index = require("../../composables/index.js");
const services_order = require("../../services/order.js");
require("../../utils/http.js");
require("../../stores/index.js");
require("../../stores/modules/member.js");
if (!Array) {
  const _easycom_uni_countdown2 = common_vendor.resolveComponent("uni-countdown");
  const _easycom_XtxGuess2 = common_vendor.resolveComponent("XtxGuess");
  const _component_PageSkeleton = common_vendor.resolveComponent("PageSkeleton");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_countdown2 + _easycom_XtxGuess2 + _component_PageSkeleton + _easycom_uni_popup2)();
}
const _easycom_uni_countdown = () => "../../node-modules/@dcloudio/uni-ui/lib/uni-countdown/uni-countdown.js";
const _easycom_XtxGuess = () => "../../components/XtxGuess.js";
const _easycom_uni_popup = () => "../../node-modules/@dcloudio/uni-ui/lib/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uni_countdown + _easycom_XtxGuess + _easycom_uni_popup)();
}
const _sfc_main = {
  __name: "detail",
  props: {
    id: String
  },
  setup(__props) {
    const query = __props;
    const { safeAreaInsets } = common_vendor.index.getSystemInfoSync();
    const { guessRef, onScrolltolower } = composables_index.useGuessList();
    const popup = common_vendor.ref();
    const reasonList = common_vendor.ref([
      "商品无货",
      "不想要了",
      "商品信息填错了",
      "地址信息填写错误",
      "商品降价",
      "其它"
    ]);
    const reason = common_vendor.ref("");
    const onCopy = (id) => {
      common_vendor.index.setClipboardData({ data: id });
    };
    const pages = getCurrentPages();
    const pageInstance = pages.at(-1);
    common_vendor.onReady(() => {
      pageInstance.animate(
        ".navbar",
        //选择器
        [{ backgroundColor: "transparent" }, { backgroundColor: "#f8f8f8" }],
        // 关键帧信息
        1e3,
        // 动画持续时长
        {
          scrollSource: "#scroller",
          // scroll-view 的选择器
          startScrollOffset: 0,
          // 开始滚动偏移量
          endScrollOffset: 50,
          // 停止滚动偏移量
          timeRange: 1e3
          // 时间长度
        }
      );
      pageInstance.animate(".navbar .title", [{ color: "transparent" }, { color: "#000" }], 1e3, {
        scrollSource: "#scroller",
        timeRange: 1e3,
        startScrollOffset: 0,
        endScrollOffset: 50
      });
      pageInstance.animate(".navbar .back", [{ color: "#fff" }, { color: "#000" }], 1e3, {
        scrollSource: "#scroller",
        timeRange: 1e3,
        startScrollOffset: 0,
        endScrollOffset: 50
      });
    });
    const orderStateList = [
      { id: 0, text: "" },
      { id: 1, text: "待付款" },
      { id: 2, text: "待发货" },
      { id: 3, text: "待收货" },
      { id: 4, text: "待评价" },
      { id: 5, text: "已完成" },
      { id: 6, text: "已取消" }
    ];
    const order = common_vendor.ref();
    const getMemberOrderByIdData = async () => {
      const res = await services_order.getMemberOrderByIdAPI(query.id);
      order.value = res.result;
      if ([orderStateList[3].id, orderStateList[4].id, , orderStateList[5].id].includes(
        order.value.orderState
      )) {
        getMemberOrderLogisticsByIdData();
      }
    };
    common_vendor.onLoad(() => getMemberOrderByIdData());
    const onTimeUp = () => {
      order.value.orderState = orderStateList[6].id;
    };
    const isDev = true;
    const onOrderPay = async () => {
      {
        await services_order.getPayMockAPI({ orderId: query.id });
      }
      common_vendor.index.redirectTo({ url: `/pagesOrder/payment/payment?id=${query.id}` });
    };
    const onOrderSend = async () => {
      {
        await services_order.getMemberOrderConsignmentByIdAPI(query.id);
        common_vendor.index.showToast({ icon: "success", title: "模拟发货完成" });
        order.value.orderState = orderStateList[2].id;
      }
    };
    const onOrderConfirm = () => {
      common_vendor.index.showModal({
        content: "为保障您的权益，请收到货并确认无误后，再确认收货",
        success: async (success) => {
          console.log(success);
          if (success.confirm) {
            const res = await services_order.putMemberOrderReceiptByIdAPI(query.id);
            order.value = res.result;
          }
        }
      });
    };
    const logisticsList = common_vendor.ref([]);
    const getMemberOrderLogisticsByIdData = async () => {
      const res = await services_order.getMemberOrderLogisticsByIdAPI(query.id);
      logisticsList.value = res.result.list;
    };
    const onOrderDelete = () => {
      common_vendor.index.showModal({
        content: "是否删除订单",
        success: async (success) => {
          if (success.confirm) {
            await services_order.deleteMemberOrderAPI({ ids: [query.id] });
            common_vendor.index.redirectTo({ url: "/pagesOrder/list/list" });
          }
        }
      });
    };
    const cancelOrder = async () => {
      await services_order.getMemberOrderCancelByIdAPI(query.id, { cancelReason: reason.value });
      common_vendor.index.redirectTo({ url: "/pagesOrder/list/list" });
    };
    return (_ctx, _cache) => {
      var _a, _b, _c, _d, _e, _f, _g;
      return common_vendor.e({
        a: common_vendor.unref(pages).length > 1
      }, common_vendor.unref(pages).length > 1 ? {} : {}, {
        b: ((_a = common_vendor.unref(safeAreaInsets)) == null ? void 0 : _a.top) + "px",
        c: order.value
      }, order.value ? common_vendor.e({
        d: ((_b = order.value) == null ? void 0 : _b.orderState) === orderStateList[1].id
      }, ((_c = order.value) == null ? void 0 : _c.orderState) === orderStateList[1].id ? {
        e: common_vendor.t(order.value.payMoney.toFixed(2)),
        f: common_vendor.o(onTimeUp),
        g: common_vendor.p({
          second: order.value.countdown,
          color: "#fff",
          ["show-day"]: false,
          ["show-colon"]: false,
          ["splitor-color"]: "#fff"
        }),
        h: common_vendor.o(onOrderPay)
      } : common_vendor.e({
        i: common_vendor.t(orderStateList[(_d = order.value) == null ? void 0 : _d.orderState].text),
        j: `/pagesOrder/create/create?orderId=${query.id}`,
        k: common_vendor.unref(isDev) && order.value.orderState == orderStateList[2].id
      }, common_vendor.unref(isDev) && order.value.orderState == orderStateList[2].id ? {
        l: common_vendor.o(onOrderSend)
      } : {}), {
        m: ((_e = common_vendor.unref(safeAreaInsets)) == null ? void 0 : _e.top) + 20 + "px",
        n: common_vendor.f(logisticsList.value, (item, k0, i0) => {
          return {
            a: common_vendor.t(item.text),
            b: common_vendor.t(item.time),
            c: item.id
          };
        }),
        o: common_vendor.t(order.value.receiverContact),
        p: common_vendor.t(order.value.receiverMobile),
        q: common_vendor.t(order.value.receiverAddress),
        r: common_vendor.f(order.value.skus, (item, k0, i0) => {
          return {
            a: item.image,
            b: common_vendor.t(item.name),
            c: common_vendor.t(item.attrsText),
            d: common_vendor.t(item.curPrice.toFixed(2)),
            e: common_vendor.t(item.quantity),
            f: item.id,
            g: `/pages/goods/goods?id=${item.spuId}`
          };
        }),
        s: order.value.orderState == orderStateList[4].id
      }, order.value.orderState == orderStateList[4].id ? {} : {}, {
        t: common_vendor.t(order.value.totalMoney.toFixed(2)),
        v: common_vendor.t(order.value.postFee.toFixed(2)),
        w: common_vendor.t(order.value.payMoney.toFixed(2)),
        x: common_vendor.t(query.id),
        y: common_vendor.o(($event) => onCopy(query.id)),
        z: common_vendor.t(order.value.createTime),
        A: common_vendor.sr(guessRef, "34188534-1", {
          "k": "guessRef"
        }),
        B: ((_f = common_vendor.unref(safeAreaInsets)) == null ? void 0 : _f.bottom) + "px",
        C: order.value.orderState == orderStateList[1].id
      }, order.value.orderState == orderStateList[1].id ? {
        D: common_vendor.o(onOrderPay),
        E: common_vendor.o(($event) => {
          var _a2, _b2;
          return (_b2 = (_a2 = popup.value) == null ? void 0 : _a2.open) == null ? void 0 : _b2.call(_a2);
        })
      } : common_vendor.e({
        F: `/pagesOrder/create/create?orderId=${query.id}`,
        G: order.value.orderState == orderStateList[3].id
      }, order.value.orderState == orderStateList[3].id ? {
        H: common_vendor.o(onOrderConfirm)
      } : {}, {
        I: order.value.orderState == orderStateList[4].id
      }, order.value.orderState == orderStateList[4].id ? {} : {}, {
        J: order.value.orderState >= orderStateList[4].id
      }, order.value.orderState >= orderStateList[4].id ? {
        K: common_vendor.o(onOrderDelete)
      } : {}), {
        L: ((_g = common_vendor.unref(safeAreaInsets)) == null ? void 0 : _g.bottom) + "px"
      }) : {}, {
        M: common_vendor.o((...args) => common_vendor.unref(onScrolltolower) && common_vendor.unref(onScrolltolower)(...args)),
        N: common_vendor.f(reasonList.value, (item, k0, i0) => {
          return {
            a: common_vendor.t(item),
            b: item === reason.value ? 1 : "",
            c: item,
            d: common_vendor.o(($event) => reason.value = item, item)
          };
        }),
        O: common_vendor.o(($event) => {
          var _a2, _b2;
          return (_b2 = (_a2 = popup.value) == null ? void 0 : _a2.close) == null ? void 0 : _b2.call(_a2);
        }),
        P: common_vendor.o(($event) => cancelOrder()),
        Q: common_vendor.sr(popup, "34188534-3", {
          "k": "popup"
        }),
        R: common_vendor.p({
          type: "bottom",
          ["background-color"]: "#fff"
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/code/uni-rabbit/src/pagesOrder/detail/detail.vue"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=detail.js.map
