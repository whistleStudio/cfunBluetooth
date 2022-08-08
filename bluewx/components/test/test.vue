<template>
	<button @click="init">init</button>
	<button @click="search">search</button>
	<!-- <button @click="find">find</button> -->
	<ul class="dev-list">
		<li v-for="(v, i) in devList" :key="i" @click="liClick(i)">
			<text>{{v.name}} -- {{v.id}}</text>
			<text v-if="actId==i">√</text>
		</li>
	</ul>
</template>

<script>
	import {reactive, toRefs} from "vue"
	
	export default {
		name: "test",
		setup () {
			let bt = reactive({
				actId: -1,
				devList: [],
				init () {
					uni.openBluetoothAdapter({
					  success(res) {
					    console.log("😀success---", res)
					  },
						fail (e) {
							console.log("😔---", e)
						}
					})
				},
				search () {
					uni.startBluetoothDevicesDiscovery({
						powerLevel:"high",
					  success(res) {
					    console.log("search--", res)
					  }
					})
				},
				liClick (i) {
					this.actId = i
					/* 建立连接 */
					uni.createBLEConnection({
					  deviceId: this.devList[i].id,
					  success: res=>{
					    console.log("connect -- ", res)
							/* 获取服务 uuid */
							setTimeout(()=>{
								uni.getBLEDeviceServices({
								  deviceId: this.devList[i].id,
								  success: res => {
								    console.log('device services:', res.services)
										let uuid = res.services[0].uuid
										uni.getBLEDeviceCharacteristics({
										  deviceId: this.devList[i].id,
										  // 这里的 serviceId 需要在 getBLEDeviceServices 接口中获取
										  serviceId: uuid,
										  success: (res) => {
										    console.log('device getBLEDeviceCharacteristics:', res.characteristics)
												console.log(uuid)
												const characteristics = res.characteristics
												uni.notifyBLECharacteristicValueChange({
												  state: true, // 启用 notify 功能
												  // 这里的 deviceId 需要已经通过 createBLEConnection 与对应设备建立链接,设备的特征值支持 notify 或者 indicate 才可以成功调用
												  deviceId: this.devList[i].id,
												  // 这里的 serviceId 需要在 getBLEDeviceServices 接口中获取
												  serviceId: uuid,
												  // 这里的 characteristicId 需要在 getBLEDeviceCharacteristics 接口中获取
												  characteristicId: characteristics[0].uuid,
												  success: res => {
												    console.log('notifyBLECharacteristicValueChange success', res.errMsg)
														//监听低功耗蓝牙设备的特征值变化事件
														uni.onBLECharacteristicValueChange(function (res) {
														  console.log(`characteristic ${res.characteristicId} has changed, now is ${res.value}`)
														  console.log(ab2hex(res.value))
														})
														// 向蓝牙设备发送一个0x00的16进制数据
														// const buffer = new ArrayBuffer(1)
														// const dataView = new DataView(buffer)
														// dataView.setUint8(0, 0)
														let array = [0xdd, 0x77, 3, 4, 0, 0, 0, 0]
														let buffer = new Uint8Array(array).buffer
														uni.writeBLECharacteristicValue({
														  // 这里的 deviceId 需要在 getBluetoothDevices 或 onBluetoothDeviceFound 接口中获取
														  deviceId: this.devList[i].id,
														  // 这里的 serviceId 需要在 getBLEDeviceServices 接口中获取
														  serviceId: uuid,
														  // 这里的 characteristicId 需要在 getBLEDeviceCharacteristics 接口中获取
														  characteristicId: characteristics[1].uuid,
														  // 这里的value是ArrayBuffer类型
														  value: buffer,
														  success(res) {
														    console.log('writeBLECharacteristicValue success', res.errMsg)
														  },
															fail(err) {console.log("writeBLECharacteristicValue fail: ", err)}
														})
														
														
												  },
													fail () {console.log("notify fail")}
												})
										  }
										})
								  }
								})
							},1000)
							uni.stopBluetoothDevicesDiscovery({
							  success(res) {
							    console.log("stop search -- ", res)
							  }
							})
					  }
					})
				}
			})
			uni.onBluetoothDeviceFound(function (res) {
				if (res?.devices[0]?.name) {
					let dev = res.devices[0]
					console.log('new device list has founded')
					console.dir(res)
					bt.devList.push({name: dev.name, id: dev.deviceId})
				}
			})
			// ArrayBuffer转16进度字符串示例
			function ab2hex(buffer) {
			  const hexArr = Array.prototype.map.call(
			    new Uint8Array(buffer),
			    function (bit) {
			      return ('00' + bit.toString(16)).slice(-2)
			    }
			  )
			  return hexArr.join('')
			}
			return {
				...toRefs(bt)
			}
		}
	}
</script>

<style lang="scss">
	button {
		margin: 50rpx 0;
	}
	.dev-list {
		margin: 0;
		padding: 0;
		list-style: none;
		width: 100%;	
		>li {
			margin: 20rpx 0;
			padding: 0 30rpx;
			width: 100%;
			height: 80rpx;
			border: 1px solid steelblue;
			box-sizing: border-box;
			text {
				font-size: 30rpx;
				line-height: 80rpx;
				&:last-of-type {
					// float: right;
				}
			}
			
		}
	}
</style>
