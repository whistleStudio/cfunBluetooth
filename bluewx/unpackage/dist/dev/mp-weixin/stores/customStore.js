"use strict";
var common_vendor = require("../common/vendor.js");
const useCustomStore = common_vendor.defineStore("custom", {
  state: () => {
    return {
      staArr: Array(6).fill(0),
      nameArr: ["\u6309\u94AEA", "\u6309\u94AEB", "\u6309\u94AEC", "\u6309\u94AED", "\u6ED1\u6746X", "\u6ED1\u6746Y"]
    };
  }
});
exports.useCustomStore = useCustomStore;
