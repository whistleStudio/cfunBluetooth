import {reactive} from "vue"	
	
export default function () {
	const btnSta = reactive({
		isBtnAct: Array(4).fill(false)
	})
	
	function btnTouchStart (i) {
		console.log("---tap---", i)
		btnSta.isBtnAct[i] = true
	}
	function btnTouchEnd (i) {
		btnSta.isBtnAct[i] = false
	}
	
	return {btnSta, btnTouchStart, btnTouchEnd}
}