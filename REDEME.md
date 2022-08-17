### [08081609] setup

包含已调通的蓝牙组件test

### [08081717]

创建了tabbar

### [08091727]

蓝牙初始化+搜索

列表显示

微信小程序默认tabbar不能用iconfont

### [08101735]

-  完成蓝牙连接相关封装
- 巩固async await promise 使用
- 巩固作用域相关内容

```javascript
let a = {
  b: 1,
  c (cb) {
    cb()
  }
}
let b = 2
a.c(()=>{
  console.log(b) //2， 回调作用域为a的同级作用域
})
```

- 不改变内存地址，清空数组方法: arr.length = 0
- 【uniapp bug】switch checked属性 更改不刷新视图

### [08111733]

- 高度自适应 用 `uni.getSystemInfo(OBJECT)`, 获取其中windowHeight除去默认导航和tabbar
- 【今日关键】绑定属性设置值时，如果前后两次值相同将不会触发vue视图刷新；多出现在非双向绑定的数据，事件改变了实际的值，但属性绑定的值还停留在之前的预设值，这个时候如果想还原预设值就会没效果,解决办法->>https://uniapp.dcloud.net.cn/tutorial/vue-api.html#componentsolutions[组件属性设置不生效解决办法], nextTick确保之前数据改变更新DOM后再更新
- 打算仿农药做个虚拟手柄
- 【uniapp bug】movable-view: x, y设置结合touchend有问题

### [08121727]

- 【注意】微信小程序貌似不支持vue的 属性 样式绑定对象变量写法

```vue
<template>
<!-- wx无效 -->
<view :style="vStyle" @click="w+=100"> </view>
<!-- 这样可以 -->
<view :style="{width: w}" @click="w+=100"> </view>
</template>

import {ref, reactive} from "vue"
<script setup>
  let w = ref(100)
  const vStyle = reactive({
    width: w + 'px'
  })
</script>
```

- 【问题】ref trigger

### [08151728]

-  放弃移动十字轴
- 导入scss文件 直接import "" 不要加url()
- useJoyAxis useJoyBtn 抽离；
- 【待解决】蓝牙数据发送过快，接收端有积压，要加节流函数 √

### [08161138]

- joystick页面功能基本OK

### [08161741]

- custom页面样式基本完成，模式切换没做
- 【待解决】节流传参 √ ----------- 箭头函数没有arguments
- 用了pinia做状态管理

### [08171630]

- 因为有些标签微信小程序里不支持，比如ul li,所以写样式时，尽量还是用class
- 增加custom按钮/开关切换功能
- joystick custom页面 onShow发送一次数据，做初始化
- 增加下拉刷新搜索开放蓝牙discovery 3秒后关闭
- 增加连接设备异常时处理
- 增加首页  cartoon
- 【已提交】