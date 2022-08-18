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
	<view class="bt-cartoon">
		
	</view>
</template>

<script setup>
	import {reactive, toRefs, onMounted} from "vue"
	import {onPullDownRefresh, onShareAppMessage, onShareTimeline} from "@dcloudio/uni-app"
	
	// #ifdef MP-WEIXIN
	import bt from "@/utils/bt.js"
	// #endif
	
	let iState = reactive({
		isBtInit: false, 
		devList: [],
		actId: -1,
		mode: -1
	})
	// #ifdef MP-WEIXIN
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
	/* 初次加载 */
	onMounted(()=>{
		bt.onFound(iState.devList)
		bt.onBtAdapterSta(()=>{
			devDis()
		})
	})
	/* 下拉刷新搜索开启, 3秒后关闭 */
	onPullDownRefresh(()=>{
		// bt.stopSearch()
		if (iState.isBtInit) {
			bt.search()
			uni.showLoading({
				title:"正在搜索新设备"
			})
			setTimeout(function () {
				bt.stopSearch()
				uni.stopPullDownRefresh()
				uni.hideLoading()
			}, 3000);
		} else {
			uni.stopPullDownRefresh()
			uni.showToast({
				title: "蓝牙未初始化",
				icon: "error"
			})
		}

	})
	/* 允许分享 */
	onShareAppMessage(()=>{
		return {
			title: "创趣蓝牙小程序",
			path: '/pages/index/index'
		}
	})
	onShareTimeline(()=>{
		return {
			title: "创趣蓝牙小程序",
			path: '/pages/index/index'
		}
	})
	// #endif
</script>

<style lang="scss" src="./index.scss"></style>