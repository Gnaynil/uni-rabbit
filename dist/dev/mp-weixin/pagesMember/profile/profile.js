"use strict";
const common_vendor = require("../../common/vendor.js");
const services_profile = require("../../services/profile.js");
const stores_modules_member = require("../../stores/modules/member.js");
require("../../utils/http.js");
require("../../stores/index.js");
const _sfc_main = {
  __name: "profile",
  setup(__props) {
    const { safeAreaInsets } = common_vendor.index.getSystemInfoSync();
    const memberStore = stores_modules_member.useMemberStore();
    const profile = common_vendor.ref({});
    const getUserData = async () => {
      const res = await services_profile.getMemberProfileAPI();
      profile.value = res.result;
    };
    common_vendor.onLoad(() => {
      getUserData();
    });
    const onAvatarChange = () => {
      common_vendor.index.chooseMedia({
        //文件个数
        count: 1,
        mediaType: ["image"],
        success: (res) => {
          const { tempFilePath } = res.tempFiles[0];
          common_vendor.index.uploadFile({
            url: "/member/profile/avatar",
            name: "file",
            //后端数据字段名
            filePath: tempFilePath,
            //新头像
            success: (res2) => {
              if (res2.statusCode === 200) {
                const { avatar } = JSON.parse(res2.data).result;
                profile.value.avatar = avatar;
                memberStore.profile.avatar = avatar;
                common_vendor.index.showToast({ icon: "success", title: "更新成功" });
              } else {
                common_vendor.index.showToast({ icon: "error", title: "出现错误" });
              }
            }
          });
        }
      });
    };
    const onGenderChange = (e) => {
      profile.value.gender = e.detail.value;
    };
    const onBirthdayChange = (e) => {
      profile.value.birthday = e.detail.value;
    };
    let fullLocationCode = ["", "", ""];
    const onFullLocationChange = (e) => {
      profile.value.fullLocation = e.detail.value.join(" ");
      fullLocationCode = e.detail.code;
    };
    const onSubmit = async () => {
      const { nickname, gender, birthday, profession } = profile.value;
      console.log(fullLocationCode);
      let res = {};
      if (!fullLocationCode[0]) {
        res = await services_profile.putMemberProfileAPI({
          nickname,
          gender,
          birthday,
          profession
        });
      } else {
        res = await services_profile.putMemberProfileAPI({
          nickname,
          gender,
          birthday,
          profession,
          provinceCode: fullLocationCode[0],
          cityCode: fullLocationCode[1],
          countyCode: fullLocationCode[2]
        });
      }
      memberStore.profile.nickname = res.result.nickname;
      memberStore.profile.profession = res.result.profession;
      common_vendor.index.showToast({ icon: "success", title: "更新成功" });
      setTimeout(() => {
        common_vendor.index.navigateBack();
      }, 500);
    };
    return (_ctx, _cache) => {
      var _a, _b;
      return common_vendor.e({
        a: ((_a = common_vendor.unref(safeAreaInsets)) == null ? void 0 : _a.top) + "px",
        b: profile.value.avatar,
        c: common_vendor.o(onAvatarChange),
        d: common_vendor.t(profile.value.account),
        e: profile.value.nickname,
        f: common_vendor.o(($event) => profile.value.nickname = $event.detail.value),
        g: profile.value.gender === "男",
        h: profile.value.gender === "女",
        i: common_vendor.o(onGenderChange),
        j: profile.value.birthday
      }, profile.value.birthday ? {
        k: common_vendor.t(profile.value.birthday)
      } : {}, {
        l: /* @__PURE__ */ new Date(),
        m: profile.value.birthday,
        n: common_vendor.o(onBirthdayChange),
        o: profile.value.fullLocation
      }, profile.value.fullLocation ? {
        p: common_vendor.t(profile.value.fullLocation)
      } : {}, {
        q: (_b = profile.value.fullLocation) == null ? void 0 : _b.split(" "),
        r: common_vendor.o(onFullLocationChange),
        s: profile.value.profession,
        t: common_vendor.o(($event) => profile.value.profession = $event.detail.value),
        v: common_vendor.o(onSubmit)
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/code/uni-rabbit/src/pagesMember/profile/profile.vue"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=profile.js.map
