"use strict";
var common_vendor = require("../common/vendor.js");
const useCustomStore = common_vendor.defineStore("custom", {
  state: () => {
    return {
      staArr: Array(6).fill(0),
      nameArr: ["\u6570\u636EX", "\u6570\u636EY", "\u6570\u636EA", "\u6570\u636EB", "\u6570\u636EC", "\u6570\u636ED"]
    };
  }
});
exports.useCustomStore = useCustomStore;
