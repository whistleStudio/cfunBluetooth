/* joystick - axis */
import {ref, reactive, nextTick} from "vue"
import bt from "@/utils/bt.js"

export default function (btArr) {
	const D=160, d=70
	const InitX = (D-d)/2, InitY = (D-d)/2
	let tim1 = 0, tim2 = 0//防抖、节流计时器
	let validate1 = true //节流校验标志
	
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
			// 传蓝牙-防抖
			// clearTimeout(tim1)
			// tim1 = setTimeout(()=>{
			// 	let btX = x/(D-d)*200-100, btY = y/(D-d)*200-100
			// 	writeAxisBuf (btArr, btY, btX)
			// },200)
			
			// 传蓝牙-节流
			if (validate1) {
				let btX = x/(D-d)*200-100, btY = y/(D-d)*200-100
				writeAxisBuf (btArr, btY, btX)
				validate1 = false
				setTimeout(()=>validate1=true, 100)
			} else clearInterval(tim1)
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
		//传蓝牙-防抖
		// clearTimeout(tim2)
		// tim2 = setTimeout(()=>{
		// 	writeAxisBuf (btArr, 0, 0)
		// },220)
		//传蓝牙-不防抖
		writeAxisBuf (btArr, 0, 0)
	}
	
	function writeAxisBuf (btArr, v2, v3) {
		console.log(v2, v3)
		btArr[2] = v2
		btArr[3] = v3
		let buffer = new Uint8Array(btArr).buffer
		bt.writeBuffer(buffer)
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