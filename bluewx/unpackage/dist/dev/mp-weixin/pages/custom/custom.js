"use strict";
var common_vendor = require("../../common/vendor.js");
var stores_customStore = require("../../stores/customStore.js");
var utils_throttle = require("../../utils/throttle.js");
var utils_bt = require("../../utils/bt.js");
const _sfc_main = {
  __name: "custom",
  setup(__props) {
    const customStore = stores_customStore.useCustomStore();
    const cmState = common_vendor.reactive({
      btnMode: 1,
      editIdx: -1,
      arrBuf: [221, 119, 50, 50, 0, 0, 0, 0]
    });
    common_vendor.onShow(() => {
      btWrite();
    });
    function btWrite() {
      let buf = new Uint8Array([221, 119, ...customStore.staArr]).buffer;
      utils_bt.bt.writeBuffer(buf);
    }
    const btnModeSwap = utils_throttle.throttle.invLimit(() => {
      common_vendor.index.vibrateShort();
      customStore.$patch((state) => {
        for (let i = 2; i < 6; i++) {
          state.staArr[i] = 0;
        }
      });
      cmState.btnMode = !cmState.btnMode;
      btWrite();
    });
    const btnTouchStart = utils_throttle.throttle.invLimit((i) => {
      common_vendor.index.vibrateShort();
      customStore.staArr[i] = 1;
      btWrite();
    });
    function btnTouchEnd(i) {
      customStore.staArr[i] = 0;
      btWrite();
    }
    const swChange = utils_throttle.throttle.invLimit((idx, ev) => {
      let { value } = ev.detail;
      customStore.staArr[idx] = Number(value);
      btWrite();
    });
    const sliderChange = utils_throttle.throttle.invLimit((idx, ev) => {
      let { value } = ev.detail;
      customStore.staArr[idx] = value;
      btWrite();
    });
    function editIconClick(i) {
      cmState.editIdx = i;
    }
    function ipBlur() {
      cmState.editIdx = -1;
    }
    function ipConfirm(idx, ev) {
      let { value } = ev.detail;
      value = value.slice(0, 7);
      customStore.nameArr[idx] = value;
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(cmState.btnMode ? "\u6309\u94AE" : "\u5F00\u5173"),
        b: common_vendor.o((...args) => common_vendor.unref(btnModeSwap) && common_vendor.unref(btnModeSwap)(...args)),
        c: common_vendor.f(Array(4), (v, i, i0) => {
          return common_vendor.e({
            a: i + 2 != cmState.editIdx
          }, i + 2 != cmState.editIdx ? {
            b: common_vendor.t(common_vendor.unref(customStore).nameArr[i + 2]),
            c: common_vendor.o(($event) => editIconClick(i + 2))
          } : {
            d: common_vendor.o(ipBlur),
            e: common_vendor.o(($event) => ipConfirm(i + 2, $event))
          }, cmState.btnMode ? {
            f: common_vendor.t(String.fromCharCode(65 + i)),
            g: common_vendor.o(($event) => common_vendor.unref(btnTouchStart)(i + 2)),
            h: common_vendor.o(($event) => btnTouchEnd(i + 2))
          } : {
            i: common_vendor.o(($event) => common_vendor.unref(swChange)(i + 2, $event))
          }, {
            j: i
          });
        }),
        d: cmState.btnMode,
        e: common_vendor.f(Array(2), (v, i, i0) => {
          return common_vendor.e({
            a: i != cmState.editIdx
          }, i != cmState.editIdx ? {
            b: common_vendor.t(common_vendor.unref(customStore).nameArr[i]),
            c: common_vendor.o(($event) => editIconClick(i)),
            d: common_vendor.t(String.fromCharCode(88 + i)),
            e: common_vendor.t(common_vendor.unref(customStore).staArr[i])
          } : {
            f: common_vendor.o(ipBlur),
            g: common_vendor.o(($event) => ipConfirm(i, $event))
          }, {
            h: common_vendor.o(($event) => common_vendor.unref(sliderChange)(i, $event)),
            i: common_vendor.unref(customStore).staArr[i],
            j: i
          });
        })
      };
    };
  }
};
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/43542/Documents/WorkSpace/CFun World/j. \u7F51\u7AD9/cfunblue/bluewx/pages/custom/custom.vue"]]);
wx.createPage(MiniProgramPage);
