"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  name: "test",
  setup() {
    let bt = common_vendor.reactive({
      actId: -1,
      devList: [],
      init() {
        common_vendor.index.openBluetoothAdapter({
          success(res) {
            console.log("\u{1F600}success---", res);
          },
          fail(e) {
            console.log("\u{1F614}---", e);
          }
        });
      },
      search() {
        common_vendor.index.startBluetoothDevicesDiscovery({
          powerLevel: "high",
          success(res) {
            console.log("search--", res);
          }
        });
      },
      liClick(i) {
        this.actId = i;
        common_vendor.index.createBLEConnection({
          deviceId: this.devList[i].id,
          success: (res) => {
            console.log("connect -- ", res);
            setTimeout(() => {
              common_vendor.index.getBLEDeviceServices({
                deviceId: this.devList[i].id,
                success: (res2) => {
                  console.log("device services:", res2.services);
                  let uuid = res2.services[0].uuid;
                  common_vendor.index.getBLEDeviceCharacteristics({
                    deviceId: this.devList[i].id,
                    serviceId: uuid,
                    success: (res3) => {
                      console.log("device getBLEDeviceCharacteristics:", res3.characteristics);
                      console.log(uuid);
                      const characteristics = res3.characteristics;
                      common_vendor.index.notifyBLECharacteristicValueChange({
                        state: true,
                        deviceId: this.devList[i].id,
                        serviceId: uuid,
                        characteristicId: characteristics[0].uuid,
                        success: (res4) => {
                          console.log("notifyBLECharacteristicValueChange success", res4.errMsg);
                          common_vendor.index.onBLECharacteristicValueChange(function(res5) {
                            console.log(`characteristic ${res5.characteristicId} has changed, now is ${res5.value}`);
                            console.log(ab2hex(res5.value));
                          });
                          let array = [221, 119, 3, 4, 0, 0, 0, 0];
                          let buffer = new Uint8Array(array).buffer;
                          common_vendor.index.writeBLECharacteristicValue({
                            deviceId: this.devList[i].id,
                            serviceId: uuid,
                            characteristicId: characteristics[1].uuid,
                            value: buffer,
                            success(res5) {
                              console.log("writeBLECharacteristicValue success", res5.errMsg);
                            },
                            fail(err) {
                              console.log("writeBLECharacteristicValue fail: ", err);
                            }
                          });
                        },
                        fail() {
                          console.log("notify fail");
                        }
                      });
                    }
                  });
                }
              });
            }, 1e3);
            common_vendor.index.stopBluetoothDevicesDiscovery({
              success(res2) {
                console.log("stop search -- ", res2);
              }
            });
          }
        });
      }
    });
    common_vendor.index.onBluetoothDeviceFound(function(res) {
      var _a;
      if ((_a = res == null ? void 0 : res.devices[0]) == null ? void 0 : _a.name) {
        let dev = res.devices[0];
        console.log("new device list has founded");
        console.dir(res);
        bt.devList.push({ name: dev.name, id: dev.deviceId });
      }
    });
    function ab2hex(buffer) {
      const hexArr = Array.prototype.map.call(new Uint8Array(buffer), function(bit) {
        return ("00" + bit.toString(16)).slice(-2);
      });
      return hexArr.join("");
    }
    return __spreadValues({}, common_vendor.toRefs(bt));
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => _ctx.init && _ctx.init(...args)),
    b: common_vendor.o((...args) => _ctx.search && _ctx.search(...args)),
    c: common_vendor.f(_ctx.devList, (v, i, i0) => {
      return common_vendor.e({
        a: common_vendor.t(v.name),
        b: common_vendor.t(v.id),
        c: _ctx.actId == i
      }, _ctx.actId == i ? {} : {}, {
        d: i,
        e: common_vendor.o(($event) => _ctx.liClick(i), i)
      });
    })
  };
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/43542/Documents/WorkSpace/CFun World/j. \u7F51\u7AD9/cfunblue/bluewx/components/test/test.vue"]]);
wx.createComponent(Component);
