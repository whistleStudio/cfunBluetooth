"use strict";
var common_vendor = require("../common/vendor.js");
function useJoyBtn() {
  const btnSta = common_vendor.reactive({
    isBtnAct: Array(4).fill(false)
  });
  function btnTouchStart(i) {
    console.log("---tap---", i);
    btnSta.isBtnAct[i] = true;
  }
  function btnTouchEnd(i) {
    btnSta.isBtnAct[i] = false;
  }
  return { btnSta, btnTouchStart, btnTouchEnd };
}
exports.useJoyBtn = useJoyBtn;
