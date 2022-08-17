"use strict";
var common_vendor = require("../common/vendor.js");
var throttle = {
  invLimit(fn, opt = { inv: 200 }) {
    let validate = true;
    let tim = 0;
    return function() {
      if (validate)
        fn(...arguments);
      else
        common_vendor.index.showToast({
          title: `\u8DDF\u4E0D\u4E0A\u4F60\u624B\u901F\u5566
\u4F11\u606F\u4E00\u4F1A\u513F`,
          icon: "none"
        });
      validate = false;
      clearTimeout(tim);
      tim = setTimeout(() => {
        validate = true;
      }, opt.inv);
    };
  }
};
exports.throttle = throttle;
