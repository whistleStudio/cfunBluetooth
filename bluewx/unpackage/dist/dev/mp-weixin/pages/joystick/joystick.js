"use strict";
var common_vendor = require("../../common/vendor.js");
var hooks_useJoyAxis = require("../../hooks/useJoyAxis.js");
var hooks_useJoyBtn = require("../../hooks/useJoyBtn.js");
var utils_bt = require("../../utils/bt.js");
const _sfc_main = {
  __name: "joystick",
  setup(__props) {
    const btArr = [221, 119, 0, 0, 0, 0, 0, 0];
    const { joySta, mvMove, mvStart, mvRelease, arrowPos } = hooks_useJoyAxis.useJoyAxis(btArr);
    const { btnSta, btnTouchStart, btnTouchEnd } = hooks_useJoyBtn.useJoyBtn(btArr);
    let wH = common_vendor.ref(0);
    let wW = common_vendor.ref(0);
    common_vendor.onBeforeMount(() => {
      const sysInfo = common_vendor.index.getSystemInfoSync();
      wH.value = sysInfo.windowHeight;
      wW.value = sysInfo.windowWidth;
    });
    common_vendor.onShow(() => {
      utils_bt.bt.writeBuffer(new Uint8Array([221, 119, 0, 0, 0, 0, 0, 0]).buffer);
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.unref(joySta).x,
        b: common_vendor.unref(joySta).y,
        c: common_vendor.unref(joySta).joyOpacity,
        d: common_vendor.o((...args) => common_vendor.unref(mvMove) && common_vendor.unref(mvMove)(...args)),
        e: common_vendor.o((...args) => common_vendor.unref(mvStart) && common_vendor.unref(mvStart)(...args)),
        f: common_vendor.o((...args) => common_vendor.unref(mvRelease) && common_vendor.unref(mvRelease)(...args)),
        g: common_vendor.unref(joySta).isArrowShow,
        h: `translate(-50%, -50%) rotate(${common_vendor.unref(joySta).angle}deg)`,
        i: common_vendor.unref(joySta).joyOpacity,
        j: common_vendor.f(Array(4), (v, i, i0) => {
          return {
            a: common_vendor.t(String.fromCharCode(65 + i)),
            b: common_vendor.o(($event) => common_vendor.unref(btnTouchStart)(i)),
            c: common_vendor.o(($event) => common_vendor.unref(btnTouchEnd)(i)),
            d: common_vendor.unref(btnSta).isBtnAct[i] ? 1 : ""
          };
        }),
        k: common_vendor.unref(wH) + "px"
      };
    };
  }
};
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/43542/Documents/WorkSpace/CFun World/j. \u7F51\u7AD9/cfunblue/bluewx/pages/joystick/joystick.vue"]]);
wx.createPage(MiniProgramPage);
