"use strict";var t=require("../../common/vendor.js"),e=require("../../stores/customStore.js"),r=require("../../utils/throttle.js"),o=require("../../utils/bt.js");const n={__name:"custom",setup(n){const i=e.useCustomStore(),a=t.reactive({btnMode:0,editIdx:-1,arrBuf:[221,119,50,50,0,0,0,0]});function u(){let t=new Uint8Array([221,119,...i.staArr]).buffer;o.bt.writeBuffer(t)}t.onShow((()=>{u()}));const d=r.throttle.invLimit((()=>{t.index.vibrateShort(),i.$patch((t=>{for(let e=2;e<6;e++)t.staArr[e]=0})),a.btnMode=!a.btnMode,u()})),s=r.throttle.invLimit((e=>{t.index.vibrateShort(),i.staArr[e]=1,u()}));const f=r.throttle.invLimit(((t,e)=>{let{value:r}=e.detail;i.staArr[t]=Number(r),u()})),c=r.throttle.invLimit(((t,e)=>{let{value:r}=e.detail;i.staArr[t]=r,u()}));function l(t){a.editIdx=t}function m(){a.editIdx=-1}function b(t,e){let{value:r}=e.detail;r=r.slice(0,7),i.nameArr[t]=r}return(e,r)=>({a:t.t(a.btnMode?"按钮":"开关"),b:t.o(((...e)=>t.unref(d)&&t.unref(d)(...e))),c:t.f(Array(4),((e,r,o)=>t.e({a:r+2!=a.editIdx},r+2!=a.editIdx?{b:t.t(t.unref(i).nameArr[r+2]),c:t.o((t=>l(r+2)))}:{d:t.o(m),e:t.o((t=>b(r+2,t)))},a.btnMode?{f:t.t(String.fromCharCode(65+r)),g:t.o((e=>t.unref(s)(r+2))),h:t.o((t=>function(t){i.staArr[t]=0,u()}(r+2)))}:{i:t.o((e=>t.unref(f)(r+2,e)))},{j:r}))),d:a.btnMode,e:t.f(Array(2),((e,r,o)=>t.e({a:r!=a.editIdx},r!=a.editIdx?{b:t.t(t.unref(i).nameArr[r]),c:t.o((t=>l(r))),d:t.t(String.fromCharCode(88+r)),e:t.t(t.unref(i).staArr[r])}:{f:t.o(m),g:t.o((t=>b(r,t)))},{h:t.o((e=>t.unref(c)(r,e))),i:t.unref(i).staArr[r],j:r})))})}};wx.createPage(n);
