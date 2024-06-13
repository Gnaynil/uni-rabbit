"use strict";
const common_vendor = require("../../../common/vendor.js");
const services_order = require("../../../services/order.js");
require("../../../utils/http.js");
require("../../../stores/index.js");
require("../../../stores/modules/member.js");
const _sfc_main = {
  __name: "OrderList",
  props: { orderState: Number },
  setup(__props) {
    const props = __props;
    const { safeAreaInsets } = common_vendor.index.getSystemInfoSync();
    const orderStateList = [
      { id: 0, text: "" },
      { id: 1, text: "待付款" },
      { id: 2, text: "待发货" },
      { id: 3, text: "待收货" },
      { id: 4, text: "待评价" },
      { id: 5, text: "已完成" },
      { id: 6, text: "已取消" }
    ];
    const queryParams = {
      page: 1,
      pageSize: 5,
      orderState: props.orderState
    };
    const orderList = common_vendor.ref([]);
    const getOrderList = async () => {
      const res = await services_order.getMemberOrderAPI(queryParams);
      orderList.value = res.result.items;
      console.log(orderList.value);
    };
    common_vendor.onMounted(() => {
      getOrderList();
    });
    const onOrderPay = async (id) => {
      {
        await services_order.getPayMockAPI({ orderId: id });
      }
      common_vendor.index.showToast({
        title: "支付成功"
      });
      const order = orderList.value.find((v) => v.id === id);
      order.orderState = orderStateList[2].id;
    };
    return (_ctx, _cache) => {
      var _a;
      return common_vendor.e({
        a: orderList.value
      }, orderList.value ? {
        b: common_vendor.f(orderList.value, (item, k0, i0) => {
          return common_vendor.e({
            a: common_vendor.t(item.createTime),
            b: common_vendor.t(orderStateList[item.orderState].text),
            c: item.orderState >= orderStateList[4].id
          }, item.orderState >= orderStateList[4].id ? {} : {}, {
            d: common_vendor.f(item.skus, (sku, k1, i1) => {
              return {
                a: sku.image,
                b: common_vendor.t(sku.name),
                c: common_vendor.t(sku.attrsText),
                d: sku.id
              };
            }),
            e: `/pagesOrder/detail/detail?id=${item.id}`,
            f: common_vendor.t(item.totalNum),
            g: common_vendor.t(item.payMoney.toFixed(2)),
            h: item.orderState === orderStateList[1].id
          }, item.orderState === orderStateList[1].id ? {
            i: common_vendor.o(($event) => onOrderPay(item.id), item.id)
          } : common_vendor.e({
            j: `/pagesOrder/create/create?orderId=${item.id}`,
            k: item.orderState === orderStateList[3].id
          }, item.orderState === orderStateList[3].id ? {} : {}), {
            l: item.id
          });
        })
      } : {}, {
        c: common_vendor.t("没有更多数据~"),
        d: ((_a = common_vendor.unref(safeAreaInsets)) == null ? void 0 : _a.bottom) + "px"
      });
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/code/uni-rabbit/src/pagesOrder/list/components/OrderList.vue"]]);
wx.createComponent(Component);
//# sourceMappingURL=OrderList.js.map
