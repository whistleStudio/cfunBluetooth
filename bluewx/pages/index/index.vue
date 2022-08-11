<template>
	<view>
		<view class="top">
			<view class="head flex-row-center pdlr20">
				<text>蓝牙</text>
				<switch color="#4dc7f1" @change="switchChange" />
			</view>
			<text class="pdlr20">设备列表</text>
		</view>

		<view class="dev-list">
			<ul v-if="iState.isBtInit" class="dev-list-ul">
				<li v-for="(v,i) in iState.devList" :key="i" @click="devClick(i, v.deviceId)" class="flex-row-center pdlr20 dev-list-li">
					<text>{{v.name}}</text>
					<view v-if="iState.actId == i" :class="{connecting: iState.mode==0, 'icon-lianjie': iState.mode==1}" class="iconfont">
						
					</view>
				</li>
			</ul>
		</view>
	</view>
</template>

<script setup>
	import {reactive, toRefs, onMounted} from "vue"
	import bt from "@/utils/bt.js"
	
	let iState = reactive({
		isBtInit: false, 
		devList: [],
		actId: -1,
		mode: -1
	})
	/* 开关状态监控 */
	function switchChange (ev) {
		if (ev.detail.value) {
			btInit()
		} else {
			devDis()
		}
	}
	/* 蓝牙初始化 */
	async function btInit () {
		try {
			if (await bt.init()) iState.isBtInit = true	
			await bt.search()
		}catch(e){console.log(e)}
	}
	/* 连接指定设备 */
	function devClick (i, devId) {
		if (iState.actId != i) {
			bt.disconnectDev()
			iState.actId = i
			console.log("connect", devId)
			;(async ()=>{
				iState.mode = 0
				//---------- 设备连接异常时, 待调整 --------------
				if(await bt.connectDev(devId)) iState.mode = 1
				else {iState.actId=-1;iState.mode=-1}
			})()
		}
		// bt.connectDev(devId)
	}
	/* 蓝牙断开时 */
	function devDis () {
		iState.isBtInit=false
		iState.actId=-1
		iState.mode=-1
		iState.devList.length = 0
		bt.closeBtAdapter()
	}
	
	
	onMounted(()=>{
		bt.onFound(iState.devList)
		bt.onBtAdapterSta(()=>{
			devDis()
		})
	})
</script>


<style lang="scss">
	$gap: 10rpx;
	.top {
		width: 100%;
		position: fixed;
		background-color: white;
		height: 150rpx;
		box-sizing: border-box;
		.head {
			width: 100%;
			height: 100rpx;
			font: $fontF;
			text {
				color: $gray100;
			}
			switch {
				margin-left: auto;
			}
		}
		>text {
			display: block;
			font: 30rpx/50rpx $fontF;
			background-color: $mainColor;
			color: white;
		}
	}
	.dev-list {
		font: $fontF;
		box-sizing: border-box;
		ul {
			// padding: calc(150rpx + $gap) 0 calc(55px + $gap);
			li {
				font: 35rpx/80rpx $fontF;
				background-color: $gray250;
				margin-bottom: 10rpx;
				&:last-of-type {
					margin-bottom: 0;
				}
				>view {
					width: 60rpx;
					height: 60rpx;
					margin-left: auto;
					margin-right: 15rpx;
					font-size: 40rpx;
					line-height: 60rpx;
					color: $decorateColor;
				}
				.connecting {
					background: url("@/static/font/connecting.gif") center/contain no-repeat;
				}
			}
		}
	}
	// --------小程序真机调试用------
	.dev-list-ul {
		padding: calc(150rpx + 10rpx) 0 calc(55px + 10rpx);
	}
	.dev-list-li {
		line-height: 80rpx;
		background-color: lightskyblue;
		margin-bottom: 10rpx;
	}
</style>