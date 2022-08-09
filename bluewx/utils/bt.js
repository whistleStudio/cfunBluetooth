/* 蓝牙使用 */
export default {
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
	/* 搜索监听 */
	onFound (devList) {
		uni.onBluetoothDeviceFound(function (res) {
			if (res?.devices[0]?.name) {
				let dev = res.devices[0]
				console.log('new device list has founded')
				console.dir(res)
				devList.push({name: dev.name, id: dev.deviceId})
			}
		})
	}
}

// uni.onBluetoothDeviceFound(function (res) {
// 	if (res?.devices[0]?.name) {
// 		let dev = res.devices[0]
// 		console.log('new device list has founded')
// 		console.dir(res)
// 		bt.devList.push({name: dev.name, id: dev.deviceId})
// 	}
// })

function $hint (err, icon="error") {
	uni.showToast({
		title: err,
		icon
	})
}