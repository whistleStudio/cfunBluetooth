"use strict";
var common_vendor = require("../common/vendor.js");
var bt = {
  init() {
    return new Promise((rsv, rej) => {
      common_vendor.index.openBluetoothAdapter({
        success(res) {
          console.log("\u{1F600}success---", res);
          rsv(res);
        },
        fail(e) {
          console.log("\u{1F614}---", e);
          $hint("\u5F53\u524D\u84DD\u7259\u4E0D\u53EF\u7528");
          rej(e);
        }
      });
    });
  },
  search() {
    return new Promise((rsv, rej) => {
      common_vendor.index.startBluetoothDevicesDiscovery({
        success(res) {
          console.log("search--", res);
          rsv(res);
        },
        fail(e) {
          rej(e);
        }
      });
    });
  },
  onFound(devList) {
    common_vendor.index.onBluetoothDeviceFound(function(res) {
      var _a;
      if ((_a = res == null ? void 0 : res.devices[0]) == null ? void 0 : _a.name) {
        let dev = res.devices[0];
        console.log("new device list has founded");
        console.dir(res);
        devList.push({ name: dev.name, id: dev.deviceId });
      }
    });
  }
};
function $hint(err, icon = "error") {
  common_vendor.index.showToast({
    title: err,
    icon
  });
}
exports.bt = bt;
