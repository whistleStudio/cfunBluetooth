<template>
	<view class="joystick flex-col-center" :style="{height: wH+'px'}">
		<movable-area class="axis">
			<movable-view class="axis-center" direction="all" animation="false" :x="joySta.x" :y="joySta.y" :style="{opacity: joySta.joyOpacity}"
			@change="mvMove" @touchstart="mvStart" @touchend="mvRelease" damping=35	></movable-view>
			<view v-show="joySta.isArrowShow" class="arrow" :style="{transform: `translate(-50%, -50%) rotate(${joySta.angle}deg)`}">
			</view>
			<view class="dir" :style="{opacity: joySta.joyOpacity}"></view>
		</movable-area>
		<view class="btn-group">
			<button class="btn" v-for="(v, i) in Array(4)" @touchstart="btnTouchStart(i)" @touchend="btnTouchEnd(i)" :class="{btnAct: btnSta.isBtnAct[i]}">{{String.fromCharCode(65+i)}}</button>
		</view>
	</view>
</template>

<script setup>
	import {ref,reactive,nextTick,onBeforeMount,onMounted} from "vue"
	import useJoyAxis from "../../hooks/useJoyAxis.js"
	import useJoyBtn from "../../hooks/useJoyBtn.js"
	
	const btArr = [0xdd, 0x77, 50, 50, 0, 0, 0, 0]
	const {joySta, mvMove, mvStart, mvRelease, arrowPos} = useJoyAxis(btArr)
	const {btnSta, btnTouchStart, btnTouchEnd} = useJoyBtn(btArr)

	let wH = ref(0) //可使用窗口高度 Number
	let wW = ref(0) //可使用窗口宽度
	onBeforeMount(()=>{
		const sysInfo = uni.getSystemInfoSync()
		wH.value = sysInfo.windowHeight
		wW.value = sysInfo.windowWidth
	})
</script>

<style src="./joystick.scss" lang="scss"></style>

