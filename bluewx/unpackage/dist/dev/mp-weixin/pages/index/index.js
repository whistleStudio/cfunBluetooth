"use strict";
var common_vendor = require("../../common/vendor.js");
var utils_bt = require("../../utils/bt.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    let iState = common_vendor.reactive({
      isBtInit: false,
      devList: []
    });
    function switchChange(ev) {
      if (ev.detail.value) {
        btInit();
      } else
        iState.isBtInit = false;
    }
    async function btInit() {
      try {
        if (await utils_bt.bt.init())
          iState.isBtInit = true;
        await utils_bt.bt.search();
      } catch (e) {
        console.log(e);
      }
    }
    common_vendor.onMounted(() => {
      utils_bt.bt.onFound(iState.devList);
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(switchChange),
        b: common_vendor.unref(iState).isBtInit
      }, common_vendor.unref(iState).isBtInit ? {
        c: common_vendor.f(common_vendor.unref(iState).devList, (v, i, i0) => {
          return {
            a: i
          };
        })
      } : {});
    };
  }
};
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/43542/Documents/WorkSpace/CFun World/j. \u7F51\u7AD9/cfunblue/bluewx/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
