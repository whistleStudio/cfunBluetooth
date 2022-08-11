"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "joystick",
  setup(__props) {
    const InitX = (160 - 70) / 2, InitY = (160 - 70) / 2;
    const joySta = common_vendor.reactive({
      x: InitX,
      y: InitY,
      oldX: 0,
      oldY: 0
    });
    let wH = common_vendor.ref(0);
    function mvMove(ev) {
      let { x, y, source } = ev.detail;
      console.log("change-", source, x);
      joySta.oldX = x;
      joySta.oldY = y;
      if (source === "touch") {
        arrowPos(x, y);
      }
    }
    function mvRelease() {
      console.log("release", joySta);
      joySta.x = joySta.oldX;
      joySta.y = joySta.oldY;
      common_vendor.nextTick(() => {
        joySta.x = InitX;
        joySta.y = InitY;
      });
      console.log("release3", joySta);
    }
    function test() {
    }
    function arrowPos(x, y) {
      x = x - InitX;
      y = InitY - y;
      let X = Math.abs(x), Y = Math.abs(y);
      let angle = Math.atan(Y / X) * 180 / Math.PI;
      console.log("angle---", angle);
    }
    common_vendor.onBeforeMount(() => {
      wH.value = common_vendor.index.getSystemInfoSync().windowHeight;
    });
    return (_ctx, _cache) => {
      return {
        a: joySta.x,
        b: joySta.y,
        c: common_vendor.o(mvMove),
        d: common_vendor.o(mvRelease),
        e: common_vendor.o(test),
        f: common_vendor.unref(wH) + "px"
      };
    };
  }
};
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/43542/Documents/WorkSpace/CFun World/j. \u7F51\u7AD9/cfunblue/bluewx/pages/joystick/joystick.vue"]]);
wx.createPage(MiniProgramPage);
