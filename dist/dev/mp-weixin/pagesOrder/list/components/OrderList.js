"use strict";
const common_vendor = require("../../../common/vendor.js");
const services_order = require("../../../services/order.js");
require("../../../utils/http.js");
require("../../../stores/member.js");
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
    const finish = common_vendor.ref(false);
    const orderList = common_vendor.ref([]);
    const getOrderList = async () => {
      const res = await services_order.getMemberOrderAPI(queryParams);
      if (!finish.value) {
        orderList.value = orderList.value.concat(...res.result.items);
      }
      if (queryParams.page < res.result.pages) {
        queryParams.page++;
      } else {
        finish.value = true;
      }
    };
    const onScrolltolower = () => {
      if (!finish.value) {
        getOrderList();
      }
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
    const onOrderDelete = (id) => {
      common_vendor.index.showModal({
        content: "是否删除订单",
        success: async (success) => {
          if (success.confirm) {
            await services_order.deleteMemberOrderAPI({ ids: [id] });
            common_vendor.index.redirectTo({ url: "/pagesOrder/list/list" });
          }
        }
      });
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
          }, item.orderState >= orderStateList[4].id ? {
            d: common_vendor.o(($event) => onOrderDelete(item.id), item.id)
          } : {}, {
            e: common_vendor.f(item.skus, (sku, k1, i1) => {
              return {
                a: sku.image,
                b: common_vendor.t(sku.name),
                c: common_vendor.t(sku.attrsText),
                d: sku.id
              };
            }),
            f: `/pagesOrder/detail/detail?id=${item.id}`,
            g: common_vendor.t(item.totalNum),
            h: common_vendor.t(item.payMoney.toFixed(2)),
            i: item.orderState === orderStateList[1].id
          }, item.orderState === orderStateList[1].id ? {
            j: common_vendor.o(($event) => onOrderPay(item.id), item.id)
          } : common_vendor.e({
            k: `/pagesOrder/create/create?orderId=${item.id}`,
            l: item.orderState === orderStateList[3].id
          }, item.orderState === orderStateList[3].id ? {} : {}), {
            m: item.id
          });
        })
      } : {}, {
        c: common_vendor.t(finish.value ? "没有更多数据~" : "正在加载..."),
        d: ((_a = common_vendor.unref(safeAreaInsets)) == null ? void 0 : _a.bottom) + "px",
        e: common_vendor.o(onScrolltolower)
      });
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/code/uni-rabbit/src/pagesOrder/list/components/OrderList.vue"]]);
wx.createComponent(Component);
//# sourceMappingURL=OrderList.js.map
