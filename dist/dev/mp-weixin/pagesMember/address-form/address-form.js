"use strict";
const common_vendor = require("../../common/vendor.js");
const services_address = require("../../services/address.js");
require("../../utils/http.js");
require("../../stores/member.js");
if (!Array) {
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  (_easycom_uni_forms_item2 + _easycom_uni_forms2)();
}
const _easycom_uni_forms_item = () => "../../node-modules/@dcloudio/uni-ui/lib/uni-forms-item/uni-forms-item.js";
const _easycom_uni_forms = () => "../../node-modules/@dcloudio/uni-ui/lib/uni-forms/uni-forms.js";
if (!Math) {
  (_easycom_uni_forms_item + _easycom_uni_forms)();
}
const _sfc_main = {
  __name: "address-form",
  props: {
    id: {
      type: String,
      default: ""
    }
  },
  setup(__props) {
    const query = __props;
    common_vendor.index.setNavigationBarTitle({
      title: query.id ? "修改地址" : "新建地址"
    });
    const form = common_vendor.ref({
      receiver: "",
      // 收货人
      contact: "",
      // 联系方式
      fullLocation: "",
      // 省市区(前端展示)
      provinceCode: "",
      // 省份编码(后端参数)
      cityCode: "",
      // 城市编码(后端参数)
      countyCode: "",
      // 区/县编码(后端参数)
      address: "",
      // 详细地址
      isDefault: 0
      // 默认地址，1为是，0为否
    });
    const rules = {
      receiver: {
        rules: [{ required: true, errorMessage: "请输入收货人姓名" }]
      },
      contact: {
        rules: [
          { required: true, errorMessage: "请输入联系方式" },
          { pattern: /^1[3-9]\d{9}$/, errorMessage: "手机号格式不正确" }
        ]
      },
      fullLocation: {
        rules: [{ required: true, errorMessage: "请选择所在地区" }]
      },
      address: {
        rules: [{ required: true, errorMessage: "请输入详细地址" }]
      }
    };
    const onFullLocationChange = (e) => {
      form.value.provinceCode = e.detail.code[0];
      form.value.cityCode = e.detail.code[1];
      form.value.countyCode = e.detail.code[2];
      form.value.fullLocation = e.detail.value.join(" ");
    };
    const onSwitchChange = (e) => {
      if (e.detail.value) {
        form.value.isDefault = 1;
      } else {
        form.value.isDefault = 0;
      }
    };
    const formRef = common_vendor.ref();
    const SaveAddress = async () => {
      try {
        await formRef.value.validate();
        if (query.id) {
          await services_address.putMemberAddressByIdAPI(query.id, form.value);
          common_vendor.index.showToast({
            title: "修改成功"
          });
          setTimeout(() => {
            common_vendor.index.navigateBack();
          }, 500);
        } else {
          await services_address.postMemberAddressAPI(form.value);
          common_vendor.index.showToast({
            title: "添加成功"
          });
          setTimeout(() => {
            common_vendor.index.navigateBack();
          }, 500);
        }
      } catch (e) {
        common_vendor.index.showToast({
          icon: "error",
          title: "请填写完整信息"
        });
      }
    };
    const getAddress = async () => {
      const res = await services_address.getMemberAddressByIdAPI(query.id);
      form.value = res.result;
    };
    const isFinish = common_vendor.ref(false);
    common_vendor.onLoad(async () => {
      if (query.id) {
        await getAddress();
        isFinish.value = true;
      } else {
        isFinish.value = true;
      }
    });
    return (_ctx, _cache) => {
      var _a;
      return common_vendor.e({
        a: isFinish.value
      }, isFinish.value ? common_vendor.e({
        b: form.value.receiver,
        c: common_vendor.o(($event) => form.value.receiver = $event.detail.value),
        d: common_vendor.p({
          name: "receiver"
        }),
        e: form.value.contact,
        f: common_vendor.o(($event) => form.value.contact = $event.detail.value),
        g: common_vendor.p({
          name: "contact"
        }),
        h: form.value.fullLocation
      }, form.value.fullLocation ? {
        i: common_vendor.t(form.value.fullLocation)
      } : {}, {
        j: (_a = form.value.fullLocation) == null ? void 0 : _a.split(" "),
        k: common_vendor.o(onFullLocationChange),
        l: common_vendor.p({
          name: "fullLocation"
        }),
        m: form.value.address,
        n: common_vendor.o(($event) => form.value.address = $event.detail.value),
        o: common_vendor.p({
          name: "address"
        }),
        p: common_vendor.o(onSwitchChange),
        q: form.value.isDefault === 1,
        r: common_vendor.sr(formRef, "d8b42f9c-0", {
          "k": "formRef"
        }),
        s: common_vendor.p({
          rules,
          model: form.value
        })
      }) : {}, {
        t: isFinish.value
      }, isFinish.value ? {
        v: common_vendor.o(SaveAddress)
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/code/uni-rabbit/src/pagesMember/address-form/address-form.vue"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=address-form.js.map
