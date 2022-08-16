"use strict";
var common_vendor = require("../common/vendor.js");
var utils_bt = require("../utils/bt.js");
function useJoyBtn(btArr) {
  let tim1 = Array(4).fill(0), tim2 = Array(4).fill(0);
  const btnSta = common_vendor.reactive({
    isBtnAct: Array(4).fill(0)
  });
  function btnTouchStart(i) {
    console.log("---tap---", i);
    btnSta.isBtnAct[i] = 1;
    common_vendor.index.vibrateShort({
      success: function() {
      }
    });
    clearTimeout(tim1[i]);
    tim1[i] = setTimeout(() => {
      btArr[4 + i] = 1;
      let buffer = new Uint8Array(btArr).buffer;
      console.log(buffer);
      utils_bt.bt.writeBuffer(buffer);
    }, 200);
  }
  function btnTouchEnd(i) {
    btnSta.isBtnAct[i] = 0;
    clearTimeout(tim2[i]);
    tim2[i] = setTimeout(() => {
      btArr[4 + i] = 0;
      let buffer = new Uint8Array(btArr).buffer;
      console.log(buffer);
      utils_bt.bt.writeBuffer(buffer);
    }, 220);
  }
  return { btnSta, btnTouchStart, btnTouchEnd };
}
exports.useJoyBtn = useJoyBtn;
