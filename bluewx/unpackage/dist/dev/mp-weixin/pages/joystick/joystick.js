"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "joystick",
  setup(__props) {
    const InitX = (160 - 70) / 2, InitY = (160 - 70) / 2;
    const joySta = common_vendor.reactive({
      axisX: 40,
      axisY: 40,
      x: InitX,
      y: InitY,
      oldX: 0,
      oldY: 0,
      angle: 0,
      isArrowShow: false,
      joyOpacity: 0.3
    });
    let wH = common_vendor.ref(0);
    let wW = common_vendor.ref(0);
    let oMV = common_vendor.ref(null);
    let currentInstance;
    function setAxisPos(ev) {
      console.log(ev);
      let { pageX, pageY } = ev.touches[0];
      const cirR = 160 / 2;
      const SafeGap = 40 + cirR;
      console.log("!!!!", pageX, wW.value);
      let aX = safeP(pageX, SafeGap, wW.value);
      let aY = safeP(pageY, SafeGap, wH.value / 2);
      joySta.axisX = aX - cirR;
      joySta.axisY = aY - cirR;
      oMV.value.click();
    }
    function mvMove(ev) {
      let { x, y, source } = ev.detail;
      console.log("change-", source, x);
      joySta.oldX = x;
      joySta.oldY = y;
      if (source === "touch") {
        arrowPos(x, y);
      }
    }
    function mvStart() {
      joySta.isArrowShow = true;
      joySta.joyOpacity = 1;
    }
    function mvRelease() {
      joySta.x = joySta.oldX;
      joySta.y = joySta.oldY;
      joySta.isArrowShow = false;
      joySta.joyOpacity = 0.3;
      common_vendor.nextTick(() => {
        joySta.x = InitX;
        joySta.y = InitY;
      });
    }
    function test() {
    }
    function arrowPos(x, y) {
      x = x - InitX;
      y = InitY - y;
      let X = Math.abs(x), Y = Math.abs(y);
      let angle = Math.atan(Y / X) * 180 / Math.PI;
      switch (true) {
        case (x > 0 && y < 0):
          joySta.angle = angle;
          break;
        case (x < 0 && y > 0):
          joySta.angle = 180 + angle;
          break;
        case (x < 0 && y < 0):
          joySta.angle = 180 - angle;
          break;
        case (x > 0 && y > 0):
          joySta.angle = 360 - angle;
          break;
      }
      console.log("angle---", angle);
    }
    function safeP(p, gap, max) {
      switch (true) {
        case p < gap:
          return gap;
        case p > max - gap:
          return max - gap;
        default:
          return p;
      }
    }
    common_vendor.onBeforeMount(() => {
      const sysInfo = common_vendor.index.getSystemInfoSync();
      wH.value = sysInfo.windowHeight;
      wW.value = sysInfo.windowWidth;
    });
    common_vendor.onMounted(() => {
      console.log("oMV", oMV.value.innerHTML);
      currentInstance = common_vendor.getCurrentInstance();
      console.log("comv", currentInstance.ctx.$refs.oMV.textContent);
    });
    return (_ctx, _cache) => {
      return {
        a: joySta.x,
        b: joySta.y,
        c: joySta.joyOpacity,
        d: common_vendor.o(mvMove),
        e: common_vendor.o(mvStart),
        f: common_vendor.o(mvRelease),
        g: joySta.isArrowShow,
        h: `translate(-50%, -50%) rotate(${joySta.angle}deg)`,
        i: joySta.joyOpacity,
        j: common_vendor.o(test),
        k: joySta.axisX + "px",
        l: joySta.axisY + "px",
        m: common_vendor.unref(wH) + "px",
        n: common_vendor.o(setAxisPos)
      };
    };
  }
};
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/43542/Documents/WorkSpace/CFun World/j. \u7F51\u7AD9/cfunblue/bluewx/pages/joystick/joystick.vue"]]);
wx.createPage(MiniProgramPage);
