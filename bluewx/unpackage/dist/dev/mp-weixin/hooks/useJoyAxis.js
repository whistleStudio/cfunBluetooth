"use strict";
var common_vendor = require("../common/vendor.js");
var utils_bt = require("../utils/bt.js");
function useJoyAxis(btArr) {
  const D = 160, d = 70;
  const InitX = (D - d) / 2, InitY = (D - d) / 2;
  let tim1 = 0;
  let validate1 = true;
  const joySta = common_vendor.reactive({
    x: InitX,
    y: InitY,
    oldX: InitX,
    oldY: InitY,
    angle: 0,
    isArrowShow: false,
    joyOpacity: 0.3
  });
  function mvMove(ev) {
    let { x, y, source } = ev.detail;
    joySta.oldX = x;
    joySta.oldY = y;
    if (source === "touch") {
      arrowPos(x, y);
      if (validate1) {
        let btX = x / (D - d) * 200 - 100, btY = y / (D - d) * 200 - 100;
        writeAxisBuf(btArr, btY, btX);
        validate1 = false;
        setTimeout(() => validate1 = true, 100);
      } else
        clearInterval(tim1);
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
    writeAxisBuf(btArr, 0, 0);
  }
  function writeAxisBuf(btArr2, v2, v3) {
    console.log(v2, v3);
    btArr2[2] = v2;
    btArr2[3] = v3;
    let buffer = new Uint8Array(btArr2).buffer;
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
