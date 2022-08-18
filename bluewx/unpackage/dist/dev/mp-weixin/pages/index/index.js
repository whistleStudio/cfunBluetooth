"use strict";
var common_vendor = require("../../common/vendor.js");
var utils_bt = require("../../utils/bt.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    let iState = common_vendor.reactive({
      isBtInit: false,
      devList: [],
      actId: -1,
      mode: -1
    });
    function switchChange(ev) {
      if (ev.detail.value) {
        btInit();
      } else {
        devDis();
      }
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
    function devClick(i, devId) {
      if (iState.actId != i) {
        utils_bt.bt.disconnectDev();
        iState.actId = i;
        console.log("connect", devId);
        (async () => {
          iState.mode = 0;
          if (await utils_bt.bt.connectDev(devId))
            iState.mode = 1;
          else {
            iState.actId = -1;
            iState.mode = -1;
          }
        })();
      }
    }
    function devDis() {
      iState.isBtInit = false;
      iState.actId = -1;
      iState.mode = -1;
      iState.devList.length = 0;
      utils_bt.bt.closeBtAdapter();
    }
    common_vendor.onMounted(() => {
      utils_bt.bt.onFound(iState.devList);
      utils_bt.bt.onBtAdapterSta(() => {
        devDis();
      });
    });
    common_vendor.onPullDownRefresh(() => {
      if (iState.isBtInit) {
        utils_bt.bt.search();
        common_vendor.index.showLoading({
          title: "\u6B63\u5728\u641C\u7D22\u65B0\u8BBE\u5907"
        });
        setTimeout(function() {
          utils_bt.bt.stopSearch();
          common_vendor.index.stopPullDownRefresh();
          common_vendor.index.hideLoading();
        }, 3e3);
      } else {
        common_vendor.index.stopPullDownRefresh();
        common_vendor.index.showToast({
          title: "\u84DD\u7259\u672A\u521D\u59CB\u5316",
          icon: "error"
        });
      }
    });
    common_vendor.onShareAppMessage(() => {
      return {
        title: "\u521B\u8DA3\u84DD\u7259\u5C0F\u7A0B\u5E8F",
        path: "/pages/index/index"
      };
    });
    common_vendor.onShareTimeline(() => {
      return {
        title: "\u521B\u8DA3\u84DD\u7259\u5C0F\u7A0B\u5E8F",
        path: "/pages/index/index"
      };
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(switchChange),
        b: common_vendor.unref(iState).isBtInit
      }, common_vendor.unref(iState).isBtInit ? {
        c: common_vendor.f(common_vendor.unref(iState).devList, (v, i, i0) => {
          return common_vendor.e({
            a: common_vendor.t(v.name),
            b: common_vendor.unref(iState).actId == i
          }, common_vendor.unref(iState).actId == i ? {
            c: common_vendor.unref(iState).mode == 0 ? 1 : "",
            d: common_vendor.unref(iState).mode == 1 ? 1 : ""
          } : {}, {
            e: i,
            f: common_vendor.o(($event) => devClick(i, v.deviceId), i)
          });
        })
      } : {});
    };
  }
};
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/43542/Documents/WorkSpace/CFun World/j. \u7F51\u7AD9/cfunblue/bluewx/pages/index/index.vue"]]);
_sfc_main.__runtimeHooks = 6;
wx.createPage(MiniProgramPage);
