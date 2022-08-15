"use strict";
var common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_test2 = common_vendor.resolveComponent("test");
  _easycom_test2();
}
const _easycom_test = () => "../../components/test/test.js";
if (!Math) {
  _easycom_test();
}
const _sfc_main = {
  __name: "custom",
  setup(__props) {
    function tap1() {
      console.log(1);
    }
    function tap2() {
      console.log(2);
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(tap1),
        b: common_vendor.o(tap2)
      };
    };
  }
};
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/43542/Documents/WorkSpace/CFun World/j. \u7F51\u7AD9/cfunblue/bluewx/pages/custom/custom.vue"]]);
wx.createPage(MiniProgramPage);
