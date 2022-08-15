"use strict";
var common_vendor = require("../common/vendor.js");
var utils_bt = require("../utils/bt.js");
function useJoyAxis() {
  const D = 160, d = 70;
  const InitX = (D - d) / 2, InitY = (D - d) / 2;
  const joySta = common_vendor.reactive({
    x: InitX,
    y: InitY,
    oldX: InitX,
    oldY: InitY,
    angle: 0,
    isArrowShow: false,
    joyOpacity: 0.3,
    btArr: [221, 119, 50, 50, 0, 0, 0, 0]
  });
  function mvMove(ev) {
    let { x, y, source } = ev.detail;
    joySta.oldX = x;
    joySta.oldY = y;
    if (source === "touch") {
      arrowPos(x, y);
      let btX = x / (D - d) * 100, btY = y / (D - d) * 100;
      joySta.btArr[2] = btX;
      joySta.btArr[3] = btY;
      let buffer = new Uint8Array(joySta.btArr).buffer;
      console.log(buffer);
      utils_bt.bt.writeBuffer(buffer);
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
    joySta.btArr[2] = 50;
    joySta.btArr[3] = 50;
    let buffer = new Uint8Array(joySta.btArr).buffer;
    utils_bt.bt.writeBuffer(buffer);
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
  }
  return { joySta, mvMove, mvStart, mvRelease, arrowPos };
}
exports.useJoyAxis = useJoyAxis;
