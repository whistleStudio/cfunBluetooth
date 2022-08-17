<template>
	<view class="mode flex-row-center">
		<text>{{cmState.btnMode?"按钮":"开关"}}模式</text>
		<button size="mini" @click="btnModeSwap"><text class="iconfont icon-qiehuan"></text></button>
	</view>
	<view class="btn-group">
		<ul class="flex-row-center btn-group-ul">
			<li v-for="(v,i) in Array(4)" :key="i" class="btn-group-li">
				<!-- 编辑 -->
				<view v-if="(i+2)!=cmState.editIdx" class="btn-edit">
					<text>{{customStore.nameArr[i+2]}}</text>
					<text class="iconfont icon-bianji edit-icon" @click="editIconClick(i+2)"></text>
				</view>
				<view v-else class="input-edit">
					<input @blur="ipBlur" @confirm="ipConfirm(i+2, $event)" type="text" placeholder="≤7个字符" placeholder-style="color:rgb(180,180,180)">
				</view>
				<!-- 按钮&开关 -->
				<button v-if="cmState.btnMode" @touchstart="btnTouchStart(i+2)" @touchend="btnTouchEnd(i+2)" hover-class="btn-hover" size="mini">{{String.fromCharCode(65+i)}}</button>
				<switch v-else @change="swChange(i+2, $event)" color="#4dc7f1" />
			</li>
		</ul>
	</view>
	<view class="slider-group">
		<ul class="slider-group-ul">
			<li v-for="(v, i) in Array(2)" :key="i" class="slider-group-li">
				<!-- 编辑 -->
				<view v-if="i!=cmState.editIdx" class="slider-edit">
					<text>{{customStore.nameArr[i]}}</text>
					<text class="iconfont icon-bianji slider-edit-icon" @click="editIconClick(i)"></text>
					<text>{{String.fromCharCode(88+i)}}:{{customStore.staArr[i]}}</text>
				</view>
				<view v-else class="input-edit">
					<input @blur="ipBlur" @confirm="ipConfirm(i, $event)" type="text" placeholder="≤7个字符" placeholder-style="color:rgb(180,180,180)">
				</view>
				<!-- 滑杆 -->
				<slider activeColor=" #4dc7f1" @change="sliderChange(i, $event)" :value="customStore.staArr[i]"/>
			</li>
		</ul>
	</view>
</template>

<script setup>
	import {reactive} from "vue"
	import {onHide,onShow} from '@dcloudio/uni-app'
	import {useCustomStore} from "@/stores/customStore"
	import throttle from "@/utils/throttle.js"
	
	// #ifdef MP-WEIXIN
	import bt from "@/utils/bt.js"
	// #endif

	const customStore = useCustomStore()
	const cmState = reactive({
		btnMode: 1,
		editIdx: -1,
		arrBuf: [0xdd, 0x77, 50, 50, 0, 0, 0, 0]
	})
  onShow(() => {
		btWrite()
  })
	/* 蓝牙发送 */
	function btWrite () {
		let buf = new Uint8Array([0xdd, 0x77, ...customStore.staArr]).buffer
		// #ifdef MP-WEIXIN
		bt.writeBuffer(buf)
		// #endif
	}
	/* 模式切换 */
	const btnModeSwap = throttle.invLimit(()=>{
		uni.vibrateShort()
		customStore.$patch((state) => {
			for (let i=2; i<6; i++) {
				state.staArr[i] = 0
			}
		})
		cmState.btnMode = !cmState.btnMode
		btWrite()
	})

	/* 按钮按下 */
	const btnTouchStart = throttle.invLimit((i)=>{
		uni.vibrateShort()
		customStore.staArr[i] = 1
		btWrite()
	})
	/* 按钮松开 */
	function btnTouchEnd (i) {
		customStore.staArr[i] = 0
		btWrite()
	}
	/* 开关操作 */
	const swChange = throttle.invLimit((idx, ev)=>{
		let {value} = ev.detail
		customStore.staArr[idx] = Number(value)
		btWrite()
	})
	
	/* 滑杆移动 */
	const sliderChange = throttle.invLimit((idx, ev) => {
		let {value} = ev.detail
		customStore.staArr[idx] = value
		btWrite()
	})
	
	/* 编辑按钮点击 */
	function editIconClick (i) {
		cmState.editIdx = i
	}
	/* 输入框失焦 */
	function ipBlur () {
		cmState.editIdx = -1
	}
	/* 输入框确定 */
	function ipConfirm (idx, ev) {
		let {value} = ev.detail
		value = value.slice(0,7)
		customStore.nameArr[idx] = value
	}

 </script>

<style lang="scss" src="./custom.scss"></style>
