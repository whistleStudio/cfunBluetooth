/* joystick - axis */
import {ref, reactive, nextTick} from "vue"
import bt from "@/utils/bt.js"

export default function (btArr) {
	const D=160, d=70
	const InitX = (D-d)/2, InitY = (D-d)/2
	let tim1 = 0, tim2 = 0//节流计时器
	
	
	const joySta = reactive({
		x: InitX,
		y: InitY, 
		oldX: InitX,
		oldY: InitY,
		angle: 0,
		isArrowShow: false,
		joyOpacity: 0.3,
	})
	
	/* 十字轴移动 */
	function mvMove (ev) {
		let {x, y, source} = ev.detail
		// console.log("change-", source, x)
		joySta.oldX = x
		joySta.oldY = y
		if (source==="touch") {
			arrowPos(x, y)
			//传蓝牙
			clearTimeout(tim1)
			tim1 = setTimeout(()=>{
				let btX = x/(D-d)*100, btY = y/(D-d)*100
				btArr[2] = btY
				btArr[3] = btX
				let buffer = new Uint8Array(btArr).buffer
				console.log(buffer)
				bt.writeBuffer(buffer)
			},200)
		}
	}
	/* 十字轴开始移动 */
	function mvStart () {
		joySta.isArrowShow = true
		joySta.joyOpacity = 1
	}
	/* 十字轴回中 */
	function mvRelease () {
		joySta.x = joySta.oldX
		joySta.y = joySta.oldY
		joySta.isArrowShow = false
		joySta.joyOpacity = 0.3
		nextTick(()=>{
				joySta.x = InitX
				joySta.y = InitY
		})
		//传蓝牙
		clearTimeout(tim2)
		tim2 = setTimeout(()=>{
			btArr[2] = 50
			btArr[3] = 50
			let buffer = new Uint8Array(btArr).buffer
			bt.writeBuffer(buffer)
		},220)
	}
	/* 定位十字轴箭头位置 */
	function arrowPos (x,y) {
		x = x-InitX
		y = InitY-y
		let X = Math.abs(x), Y = Math.abs(y)
		let angle = Math.atan(Y/X)*180/Math.PI
		switch (true) {
			case x>0 && y<0:
				joySta.angle = angle
				break
			case x<0 && y>0:
				joySta.angle = 180+angle
				break
			case x<0 && y<0:
				joySta.angle = 180-angle
				break
			case x>0 && y>0:
				joySta.angle = 360-angle
				break
		}
		// console.log("angle---", angle)
	}
	
	return {joySta, mvMove, mvStart, mvRelease, arrowPos}
}