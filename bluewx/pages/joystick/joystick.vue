<template>
	<view class="joystick flex-col-center" :style="{height: wH+'px'}">
		<movable-area class="axis">
			<movable-view class="axis-center" direction="all" animation="false" :x="joySta.x" :y="joySta.y" @change="mvMove" @touchend="mvRelease"></movable-view>
			<view class="arrow">
				
			</view>
		</movable-area>
		<view class="btn-group">
			<button @click="test">test</button>
		</view>
	</view>
</template>

<script setup>
	import {ref,reactive,nextTick,onBeforeMount} from "vue"
	const InitX = (160-70)/2, InitY = (160-70)/2
	const joySta = reactive({
		x: InitX,
		y: InitY, 
		oldX: 0,
		oldY: 0,
	})
	let wH = ref(0)
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
	/* 十字轴回中 */
	function mvRelease () {
		console.log("release", joySta)
		joySta.x = joySta.oldX
		joySta.y = joySta.oldY
		nextTick(()=>{
				joySta.x = InitX
				joySta.y = InitY
		})
		console.log("release3", joySta)
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
		console.log("angle---", angle)
	}
	
	onBeforeMount(()=>{
		wH.value = uni.getSystemInfoSync().windowHeight
	})
</script>

<style lang="scss">
	.joystick {
		background-color: $gray150;
		box-sizing: border-box;
		padding: 50rpx;
		position: relative;
		.axis {
			width: 160px;
			height: 160px;
			background-color: rgba(255,255,255,0.5);
			border-radius: 50%;
			.axis-center {
				width: 70px;
				height: 70px;
				border-radius: 50%;
				background-color: orange;
			}
		}
		.arrow {
			position: absolute;
			width: 38px;
			height: 104px;
			background: url("@/static/joyarrow.png") center/contain no-repeat;
			left: 89%;
			top: 50%;
			transform: translateY(-50%);
		}
	}
</style>
