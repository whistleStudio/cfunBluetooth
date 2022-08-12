<template>
	<view class="joystick flex-col-center" :style="{height: wH+'px'}" @touchstart="setAxisPos">
		<movable-area class="axis" :style="{left: joySta.axisX+'px', top: joySta.axisY+'px'}">
			<movable-view class="axis-center" direction="all" animation="false" :x="joySta.x" :y="joySta.y" :style="{opacity: joySta.joyOpacity}"
			@change="mvMove" @touchstart="mvStart" @touchend="mvRelease" ></movable-view>
			<view v-show="joySta.isArrowShow" class="arrow" :style="{transform: `translate(-50%, -50%) rotate(${joySta.angle}deg)`}">
			</view>
			<view class="dir" :style="{opacity: joySta.joyOpacity}"  @click="test">
				
			</view>
		</movable-area>
<!-- 		<view class="btn-group">
			<button @click="test">test</button>
		</view> -->
		<view ref="oMV">
			abcdefg
		</view>
	</view>
</template>

<script setup>
	import {ref,reactive,nextTick,onBeforeMount,onMounted, getCurrentInstance} from "vue"
	const InitX = (160-70)/2, InitY = (160-70)/2
	const joySta = reactive({
		axisX: 40,
		axisY: 40,
		x: InitX,
		y: InitY, 
		oldX: 0,
		oldY: 0,
		angle: 0,
		isArrowShow: false,
		joyOpacity: 0.3,
	})
	let wH = ref(0) //可使用窗口高度 Number
	let wW = ref(0) //可使用窗口宽度
	let oMV = ref(null)
	let currentInstance
	/* 定位十字轴中心位置 */
	function setAxisPos (ev) {
		console.log(ev)
		let {pageX, pageY} = ev.touches[0]
		// 中心点只允许在安全区
		const cirR = 160/2
		const SafeGap = 40 + cirR
		console.log("!!!!", pageX, wW.value)
		let aX = safeP(pageX, SafeGap, wW.value)
		let aY = safeP(pageY, SafeGap, wH.value/2)
		joySta.axisX = aX - cirR
		joySta.axisY = aY - cirR
		// console.log(oMv)
		// oMV.emit("click")
		oMV.value.click()
	}
	/* 十字轴移动 */
	function mvMove (ev) {
		let {x, y, source} = ev.detail
		console.log("change-", source, x)
		joySta.oldX = x
		joySta.oldY = y
		if (source==="touch") {
			arrowPos(x, y)
		}
	}
	/* 十字轴开始移动 */
	function mvStart () {
		joySta.isArrowShow = true
		joySta.joyOpacity = 1
	}
	/* 十字轴回中 */
	function mvRelease () {
		joySta.x = joySta.oldX
		joySta.y = joySta.oldY
		joySta.isArrowShow = false
		joySta.joyOpacity = 0.3
		nextTick(()=>{
				joySta.x = InitX
				joySta.y = InitY
		})
	}
	function test () {
		// joySta.x = 0
		// joySta.y = 0
	}
	/* 定位十字轴箭头位置 */
	function arrowPos (x,y) {
		x = x-InitX
		y = InitY-y
		let X = Math.abs(x), Y = Math.abs(y)
		let angle = Math.atan(Y/X)*180/Math.PI
		switch (true) {
			case x>0 && y<0:
				joySta.angle = angle
				break
			case x<0 && y>0:
				joySta.angle = 180+angle
				break
			case x<0 && y<0:
				joySta.angle = 180-angle
				break
			case x>0 && y>0:
				joySta.angle = 360-angle
				break
		}
		console.log("angle---", angle)
	}
	
	function safeP (p, gap, max) {
		switch (true) {
			case p < gap:
				return gap
			case p > max-gap:
				return max-gap
			default:
				return p
		}
	}
	
	onBeforeMount(()=>{
		const sysInfo = uni.getSystemInfoSync()
		wH.value = sysInfo.windowHeight
		wW.value = sysInfo.windowWidth
	})
	
	onMounted(()=>{
		console.log("oMV", oMV.value.innerHTML)
		currentInstance = getCurrentInstance()
		console.log("comv", currentInstance.ctx.$refs.oMV.textContent)
	})
</script>

<style lang="scss">
	.joystick {
		background-color: $gray150;
		box-sizing: border-box;
		// padding: 50rpx;
		position: relative;
		.axis {
			width: 160px;
			height: 160px;
			background-color: rgba(0,0,0,0.05);
			border: 1px solid rgba(0,0,0,0.1);
			border-radius: 50%;
			position: absolute;
			.axis-center {
				width: 70px;
				height: 70px;
				border-radius: 50%;
				background: url("@/static/joy-c.png") center/contain no-repeat;
				z-index: 9;
			}
		}
		.arrow {
			position: absolute;
			width: 198px;
			height: 198px;
			background: url("@/static/joy_arrow.png") center/contain no-repeat;
			left: 50%;
			top: 50%;
			z-index: 2;
		}
		.dir {
			width: 138px;
			height: 138px;
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
			background: url("@/static/joy-dir.png") center/contain no-repeat;
		}
	}
</style>
