/* 蓝牙使用 */
export default {
	devId: undefined,
	svId: undefined,
	chaId: undefined,
	/* 初始化 */
	init () {
		return new Promise ((rsv, rej) => {
			uni.openBluetoothAdapter({
			  success(res) {
			    console.log("😀success---", res)
					rsv(res)
			  },
				fail (e) {
					console.log("😔---", e)
					$hint("当前蓝牙不可用")
					rej(e)
				}
			})
		}) 
	},
	/* 开启搜索 */
	search () {
		return new Promise ((rsv, rej) => {
			uni.startBluetoothDevicesDiscovery({
			  success(res) {
			    console.log("search--", res)
					rsv(res)
			  },
				fail(e) {rej(e)}
			})
		})
	},
	async connectDev (devId) {
		this.devId = devId
		try {
			await createConnect (this.devId)
			stopDevDiscovery()
			this.svId = await getDevService(this.devId)
			this.chaId = await getDevCharacteristics(this.devId, this.svId)
			return true
		} catch(e) {"connect fail -- ", e}
	},
	/* 断开连接 */
	disconnectDev () {
		if (this.devId) {
			uni.closeBLEConnection({
			  deviceId: this.devId,
			  success(res) {
			    console.log(res)
			  },
				fail (e) {console.log(e)}
			})
		}
	},
	/* 关闭蓝牙模块, 释放系统资源 */
	closeBtAdapter () {
		uni.closeBluetoothAdapter({
		  success(res) {
		    console.log(res)
		  }
		})
	},
	/* 向低功耗蓝牙设备特征值中 写入二进制数据， {write: true} */
	writeBuffer (buf) {
		uni.writeBLECharacteristicValue({
		  // 这里的 deviceId 需要在 getBluetoothDevices 或 onBluetoothDeviceFound 接口中获取
		  deviceId: this.devId,
		  // 这里的 serviceId 需要在 getBLEDeviceServices 接口中获取
		  serviceId: this.svId,
		  // 这里的 characteristicId 需要在 getBLEDeviceCharacteristics 接口中获取
		  characteristicId: this.chaId,
		  // 这里的value是ArrayBuffer类型
		  value: buf,
		  success(res) {
		    console.log('writeBLECharacteristicValue success', res.errMsg)
		  },
			fail(err) {console.log("writeBLECharacteristicValue fail: ", err)}
		})
	},
	/* 蓝牙适配器状态监听 */
	onBtAdapterSta (cb=()=>{}) {
		uni.onBluetoothAdapterStateChange(function (res) {
			if (!res.available) {
				cb()
				$hint("当前蓝牙不可用")
			}
		})
	},
	/* 搜索监听 */
	onFound (devList) {
		uni.onBluetoothDeviceFound(function (res) {
			if (res?.devices[0]?.name) {
				let dev = res.devices[0]
				console.log('new device list has founded')
				console.dir(res)
				devList.push({name: dev.name, deviceId: dev.deviceId})
			}
		})
	},
}

/* --------------------------------------------- */


/* 1 建立连接 */
function createConnect (deviceId) {
	return new Promise((rsv, rej) => {
		uni.createBLEConnection({
		  // 这里的 deviceId 需要已经通过 createBLEConnection 与对应设备建立链接
		  deviceId,
		  success(res) {
		    console.log(res)
				rsv(res)
		  },
			fail(e) {rej(e)}
		})
	})
}

/* 2 停止搜寻附近的蓝牙外围设备,减少功耗 */
function stopDevDiscovery () {
	uni.stopBluetoothDevicesDiscovery({
	  success(res) {
	    console.log(res)
	  }
	})
}

/* 3 获取蓝牙设备所有服务 */
function getDevService (deviceId) {
	return new Promise((rsv, rej) => {
		// 连接后直接调用容易错误，延时1秒
		setTimeout(()=>{
			uni.getBLEDeviceServices({
			  // 这里的 deviceId 需要已经通过 createBLEConnection 与对应设备建立链接
			  deviceId,
			  success (res) {
			    console.log('device services:', res.services)
					// 找到主服务id
					let svId
					for (let v of res.services) {
						if (v.isPrimary) {
							svId = v.uuid
							break
						}
					}
					if (svId) rsv(svId)
					else rej("no primary service")
			  },
				fail (e) {rej(e)}
			})
		}, 1000)
	})
}

/* 4 获取蓝牙设备某个服务中所有特征值 */
function getDevCharacteristics (deviceId, serviceId) {
	return new Promise((rsv, rej) => {
		uni.getBLEDeviceCharacteristics({
		  // 这里的 deviceId 需要已经通过 createBLEConnection 与对应设备建立链接
		  deviceId,
		  // 这里的 serviceId 需要在 getBLEDeviceServices 接口中获取
		  serviceId,
		  success(res) {
		    console.log('device getBLEDeviceCharacteristics:', res.characteristics)
				//找到{write:true}特征值
				let chaId
				for (let v of res.characteristics) {
					if (v?.properties?.write) {
						chaId = v.uuid
						break
					}
				}
				if (chaId) rsv(chaId)
				else rej("no write characteristic")
		  },
			fail(e) {console.log(e)}
		})
	})
}


function $hint (err, icon="error") {
	uni.showToast({
		title: err,
		icon
	})
}