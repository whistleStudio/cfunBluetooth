"use strict";
var common_vendor = require("../common/vendor.js");
var bt = {
  devId: void 0,
  svId: void 0,
  chaId: void 0,
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
          console.log(e);
          rej(e);
        }
      });
    });
  },
  stopSearch() {
    stopDevDiscovery();
  },
  async connectDev(devId) {
    this.devId = devId;
    try {
      await createConnect(this.devId);
      stopDevDiscovery();
      this.svId = await getDevService(this.devId);
      this.chaId = await getDevCharacteristics(this.devId, this.svId);
      return true;
    } catch (e) {
      $hint("\u8BBE\u5907\u8FDE\u63A5\u5F02\u5E38");
      console.log("connect fail -- ", e);
      return false;
    }
  },
  disconnectDev() {
    if (this.devId) {
      common_vendor.index.closeBLEConnection({
        deviceId: this.devId,
        success(res) {
          console.log(res);
        },
        fail(e) {
          console.log(e);
        }
      });
    }
  },
  closeBtAdapter() {
    common_vendor.index.closeBluetoothAdapter({
      success(res) {
        console.log(res);
      }
    });
  },
  writeBuffer(buf) {
    common_vendor.index.writeBLECharacteristicValue({
      deviceId: this.devId,
      serviceId: this.svId,
      characteristicId: this.chaId,
      value: buf,
      success(res) {
        console.log("writeBLECharacteristicValue success", res.errMsg);
      },
      fail(err) {
        console.log("writeBLECharacteristicValue fail: ", err);
      }
    });
  },
  onBtAdapterSta(cb = () => {
  }) {
    common_vendor.index.onBluetoothAdapterStateChange(function(res) {
      if (!res.available) {
        cb();
        $hint("\u5F53\u524D\u84DD\u7259\u4E0D\u53EF\u7528");
      }
    });
  },
  onFound(devList) {
    let sysInfo = common_vendor.index.getSystemInfoSync();
    common_vendor.index.onBluetoothDeviceFound(function(res) {
      var _a;
      if ((_a = res == null ? void 0 : res.devices[0]) == null ? void 0 : _a.name) {
        let dev = res.devices[0];
        console.log("new device list has founded");
        if (sysInfo.osName == "ios") {
          if (devFilter(devList, dev))
            devList.push({ name: dev.name, deviceId: dev.deviceId });
        } else
          devList.push({ name: dev.name, deviceId: dev.deviceId });
      }
    });
  }
};
function createConnect(deviceId) {
  return new Promise((rsv, rej) => {
    common_vendor.index.createBLEConnection({
      deviceId,
      success(res) {
        console.log(res);
        rsv(res);
      },
      fail(e) {
        rej(e);
      }
    });
  });
}
function stopDevDiscovery() {
  console.log("stopDiscovery");
  common_vendor.index.stopBluetoothDevicesDiscovery({
    success(res) {
      console.log(res);
    }
  });
}
function getDevService(deviceId) {
  return new Promise((rsv, rej) => {
    setTimeout(() => {
      common_vendor.index.getBLEDeviceServices({
        deviceId,
        success(res) {
          console.log("device services:", res.services);
          let svId;
          for (let v of res.services) {
            if (v.isPrimary) {
              svId = v.uuid;
              break;
            }
          }
          if (svId)
            rsv(svId);
          else
            rej("no primary service");
        },
        fail(e) {
          rej(e);
        }
      });
    }, 1e3);
  });
}
function getDevCharacteristics(deviceId, serviceId) {
  return new Promise((rsv, rej) => {
    common_vendor.index.getBLEDeviceCharacteristics({
      deviceId,
      serviceId,
      success(res) {
        var _a;
        console.log("device getBLEDeviceCharacteristics:", res.characteristics);
        let chaId;
        for (let v of res.characteristics) {
          if ((_a = v == null ? void 0 : v.properties) == null ? void 0 : _a.write) {
            chaId = v.uuid;
            break;
          }
        }
        if (chaId)
          rsv(chaId);
        else
          rej("no write characteristic");
      },
      fail(e) {
        console.log(e);
      }
    });
  });
}
function devFilter(devList, dev) {
  let isNew = true;
  devList.forEach((e) => {
    if (dev.name == e.name)
      isNew = false;
  });
  return isNew;
}
function $hint(err, icon = "error") {
  common_vendor.index.showToast({
    title: err,
    icon
  });
}
exports.bt = bt;
