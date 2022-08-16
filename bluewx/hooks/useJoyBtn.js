/* joystick-btn group */
import {reactive} from "vue"	
import bt from "@/utils/bt.js"
	
export default function (btArr) {
	let tim1 = Array(4).fill(0), tim2 = Array(4).fill(0)
	const btnSta = reactive({
		isBtnAct: Array(4).fill(0)
	})
	
	function btnTouchStart (i) {
		console.log("---tap---", i)
		btnSta.isBtnAct[i] = 1
		// 按键振动反馈
		uni.vibrateShort({
			success: function () {
				// console.log('success');
			}
		});
		// writeBuf
		clearTimeout(tim1[i])
		tim1[i] = setTimeout(()=>{
			btArr[4+i] = 1
			let buffer = new Uint8Array(btArr).buffer
			console.log(buffer)
			bt.writeBuffer(buffer)
		},200)	
	}
	function btnTouchEnd (i) {
		btnSta.isBtnAct[i] = 0
		clearTimeout(tim2[i])
		tim2[i] = setTimeout(()=>{
			btArr[4+i] = 0
			let buffer = new Uint8Array(btArr).buffer
			console.log(buffer)
			bt.writeBuffer(buffer)
		},220)	
	}
	
	return {btnSta, btnTouchStart, btnTouchEnd}
}