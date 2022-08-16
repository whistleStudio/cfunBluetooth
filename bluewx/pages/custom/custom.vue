<template>
	<view class="mode">
		<text>模式切换</text>
	</view>
	<view class="btn-group">
		<ul class="flex-row-center">
			<li v-for="(v,i) in Array(4)" :key="i">
				<view v-if="i!=cmState.editIdx" class="btn-edit">
					<text>{{customStore.nameArr[i]}}</text>
					<text class="iconfont icon-bianji edit-icon" @click="editIconClick(i)"></text>
				</view>
				<view v-else class="input-edit">
					<input @blur="ipBlur" @confirm="ipConfirm(i, $event)" type="text" placeholder="≤7个字符" placeholder-style="color:rgb(180,180,180)">
				</view>
				<button @touchstart="btnTouchStart(i)" @touchend="btnTouchEnd(i)" hover-class="btn-hover" size="mini">{{String.fromCharCode(65+i)}}</button>
			</li>
		</ul>
	</view>
	<view class="slider-group">
		<ul>
			<li v-for="(v, i) in Array(2)" :key="i">
				<view v-if="(4+i)!=cmState.editIdx" class="slider-edit">
					<text>{{customStore.nameArr[i+4]}}</text>
					<text class="iconfont icon-bianji slider-edit-icon" @click="editIconClick(i+4)"></text>
					<text>{{String.fromCharCode(88+i)}}:{{customStore.staArr[i+4]}}</text>
				</view>
				<view v-else class="input-edit">
					<input @blur="ipBlur" @confirm="ipConfirm(i+4, $event)" type="text" placeholder="≤7个字符" placeholder-style="color:rgb(180,180,180)">
				</view>
				<slider activeColor=" #4dc7f1" @change="sliderChange(4+i, $event)" :value="customStore.staArr[i+4]"/>
			</li>
		</ul>
	</view>
</template>

<script setup>
	import {reactive} from "vue"
	import {useCustomStore} from "@/stores/customStore"
	import throttle from "@/utils/throttle.js"
	
	const customStore = useCustomStore()
	const cmState = reactive({
		editIdx: -1
	})
	/* 编辑按钮点击 */
	function editIconClick (i) {
		cmState.editIdx = i
	}
	/* 输入框失焦 */
	function ipBlur () {
		cmState.editIdx = -1
	}
	/* 按钮按下 */
	const btnTouchStart = throttle.invLimit((i)=>{
		console.log("`````",i)
		customStore.$patch((state) => {
			state.staArr[i] = 1
		})
	})

	/* 按钮松开 */
	function btnTouchEnd (i) {
		customStore.$patch((state) => {
			state.staArr[i] = 0
		})
	}
	/* 滑杆移动 */
	const sliderChange = throttle.invLimit((idx, ev) => {
		console.log(idx)
	})
	// function sliderChange (idx, ev) {
	// 	let {value} = ev.detail
	// 	customStore.$patch((state) => {
	// 		state.staArr[idx] = value
	// 	})
	// }
	/* 输入狂确定 */
	function ipConfirm (idx, ev) {
		let {value} = ev.detail
		value = value.slice(0,7)
		customStore.$patch((state) => {
			state.nameArr[idx] = value
		})
	}
 </script>

<style lang="scss">
	.btn-group {
		margin-top: 50rpx;
		width: 100%;
		height: 500rpx;
		font-family: $fontF;
		
		>ul {
			margin: 0 auto;
			width: 95%;
			padding: 20rpx;
			height: 100%;
			flex-wrap: wrap;
			justify-content: space-between;
			background-color: $gray250;
			box-sizing: border-box;
			border-radius: 20rpx;
			>li {
				width: 45%;
				height: 200rpx;
				.btn-edit {
					width: 100%;
					line-height: 70rpx;
					font-size: 30rpx;
					.edit-icon {
						float: right;
						font-size: 40rpx;
						margin-right: 10rpx;
						color: $decorateColor;
					}
				}
				>button {
					width: 100%;
					line-height: 80rpx;
					background-color: $mainColor;
					color: white;
					font-size: 40rpx;
				}
				.btn-hover {
					box-shadow: 1px 1px 1px 1px gray inset;
					background-color: $mainColorDeep;
				}
			}
		}
	}
	.slider-group {
		margin-top: 50rpx;
		width: 100%;
		height: 400rpx;
		>ul {
			margin: 0 auto;
			width: 95%;
			height: 100%;
			background-color: $gray250;
			padding: 20rpx;
			border-radius: 20rpx;
			box-sizing: border-box;
			>li {
				height: 160rpx;
				margin-bottom: 30rpx;
				.slider-edit {
					line-height: 70rpx;
					.slider-edit-icon {
						margin-left: 30rpx;
						font-size: 40rpx;
						color: $decorateColor;
					}
					text {
						&:last-of-type {
							float: right;
							margin-right: 10rpx;
						}
					}
				}
				.input-edit {
					width: 280rpx !important;
				}
			}
		}
	}
	.input-edit {
		width: 100%;
		height: 70rpx;
		>input {
			width: 100%;
			height: 60rpx;
			border: 1px solid $gray150;
			box-sizing: border-box;
			border-radius: 10rpx;
			text-indent: 15rpx;
		}
	}
</style>
