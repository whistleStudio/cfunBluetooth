<template>
	<button @click="init">init</button>
	<button @click="search">search</button>
	<!-- <button @click="find">find</button> -->
	<ul class="dev-list">
		<li v-for="(v, i) in devList" :key="i" @click="liClick(i)">
			<text>{{v.name}} -- {{v.id}}</text>
			<text v-if="actId==i">â</text>
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
					    console.log("ðsuccess---", res)
					  },
						fail (e) {
							console.log("ð---", e)
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
					/* å»ºç«è¿æ¥ */
					uni.createBLEConnection({
					  deviceId: this.devList[i].id,
					  success: res=>{
					    console.log("connect -- ", res)
							/* è·åæå¡ uuid */
							setTimeout(()=>{
								uni.getBLEDeviceServices({
								  deviceId: this.devList[i].id,
								  success: res => {
								    console.log('device services:', res.services)
										let uuid = res.services[0].uuid
										uni.getBLEDeviceCharacteristics({
										  deviceId: this.devList[i].id,
										  // è¿éç serviceId éè¦å¨ getBLEDeviceServices æ¥å£ä¸­è·å
										  serviceId: uuid,
										  success: (res) => {
										    console.log('device getBLEDeviceCharacteristics:', res.characteristics)
												console.log(uuid)
												const characteristics = res.characteristics
												uni.notifyBLECharacteristicValueChange({
												  state: true, // å¯ç¨ notify åè½
												  // è¿éç deviceId éè¦å·²ç»éè¿ createBLEConnection ä¸å¯¹åºè®¾å¤å»ºç«é¾æ¥,è®¾å¤çç¹å¾å¼æ¯æ notify æè indicate æå¯ä»¥æåè°ç¨
												  deviceId: this.devList[i].id,
												  // è¿éç serviceId éè¦å¨ getBLEDeviceServices æ¥å£ä¸­è·å
												  serviceId: uuid,
												  // è¿éç characteristicId éè¦å¨ getBLEDeviceCharacteristics æ¥å£ä¸­è·å
												  characteristicId: characteristics[0].uuid,
												  success: res => {
												    console.log('notifyBLECharacteristicValueChange success', res.errMsg)
														//çå¬ä½åèèçè®¾å¤çç¹å¾å¼ååäºä»¶
														uni.onBLECharacteristicValueChange(function (res) {
														  console.log(`characteristic ${res.characteristicId} has changed, now is ${res.value}`)
														  console.log(ab2hex(res.value))
														})
														// åèçè®¾å¤åéä¸ä¸ª0x00ç16è¿å¶æ°æ®
														// const buffer = new ArrayBuffer(1)
														// const dataView = new DataView(buffer)
														// dataView.setUint8(0, 0)
														let array = [0xdd, 0x77, 3, 4, 0, 0, 0, 0]
														let buffer = new Uint8Array(array).buffer
														uni.writeBLECharacteristicValue({
														  // è¿éç deviceId éè¦å¨ getBluetoothDevices æ onBluetoothDeviceFound æ¥å£ä¸­è·å
														  deviceId: this.devList[i].id,
														  // è¿éç serviceId éè¦å¨ getBLEDeviceServices æ¥å£ä¸­è·å
														  serviceId: uuid,
														  // è¿éç characteristicId éè¦å¨ getBLEDeviceCharacteristics æ¥å£ä¸­è·å
														  characteristicId: characteristics[1].uuid,
														  // è¿éçvalueæ¯ArrayBufferç±»å
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
			// ArrayBufferè½¬16è¿åº¦å­ç¬¦ä¸²ç¤ºä¾
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
