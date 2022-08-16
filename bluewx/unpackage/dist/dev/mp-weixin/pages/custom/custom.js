"use strict";
var common_vendor = require("../../common/vendor.js");
var stores_customStore = require("../../stores/customStore.js");
var utils_throttle = require("../../utils/throttle.js");
const _sfc_main = {
  __name: "custom",
  setup(__props) {
    const customStore = stores_customStore.useCustomStore();
    const cmState = common_vendor.reactive({
      editIdx: -1
    });
    function editIconClick(i) {
      cmState.editIdx = i;
    }
    function ipBlur() {
      cmState.editIdx = -1;
    }
    const btnTouchStart = utils_throttle.throttle.invLimit((i) => {
      console.log("`````", i);
      customStore.$patch((state) => {
        state.staArr[i] = 1;
      });
    });
    function btnTouchEnd(i) {
      customStore.$patch((state) => {
        state.staArr[i] = 0;
      });
    }
    const sliderChange = utils_throttle.throttle.invLimit((idx, ev) => {
      console.log(idx);
    });
    function ipConfirm(idx, ev) {
      let { value } = ev.detail;
      value = value.slice(0, 7);
      customStore.$patch((state) => {
        state.nameArr[idx] = value;
      });
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(Array(4), (v, i, i0) => {
          return common_vendor.e({
            a: i != cmState.editIdx
          }, i != cmState.editIdx ? {
            b: common_vendor.t(common_vendor.unref(customStore).nameArr[i]),
            c: common_vendor.o(($event) => editIconClick(i))
          } : {
            d: common_vendor.o(ipBlur),
            e: common_vendor.o(($event) => ipConfirm(i, $event))
          }, {
            f: common_vendor.t(String.fromCharCode(65 + i)),
            g: common_vendor.o(($event) => common_vendor.unref(btnTouchStart)(i)),
            h: common_vendor.o(($event) => btnTouchEnd(i)),
            i
          });
        }),
        b: common_vendor.f(Array(2), (v, i, i0) => {
          return common_vendor.e({
            a: 4 + i != cmState.editIdx
          }, 4 + i != cmState.editIdx ? {
            b: common_vendor.t(common_vendor.unref(customStore).nameArr[i + 4]),
            c: common_vendor.o(($event) => editIconClick(i + 4)),
            d: common_vendor.t(String.fromCharCode(88 + i)),
            e: common_vendor.t(common_vendor.unref(customStore).staArr[i + 4])
          } : {
            f: common_vendor.o(ipBlur),
            g: common_vendor.o(($event) => ipConfirm(i + 4, $event))
          }, {
            h: common_vendor.o(($event) => common_vendor.unref(sliderChange)(4 + i, $event)),
            i: common_vendor.unref(customStore).staArr[i + 4],
            j: i
          });
        })
      };
    };
  }
};
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/43542/Documents/WorkSpace/CFun World/j. \u7F51\u7AD9/cfunblue/bluewx/pages/custom/custom.vue"]]);
wx.createPage(MiniProgramPage);
