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

