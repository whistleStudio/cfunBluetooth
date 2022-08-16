export default {
	invLimit (fn, opt={inv:200}) {
		let validate = true
		let tim = 0
		return () => {
			if (validate) fn(...arguments)
			else uni.showToast({
				title:`跟不上你手速啦\n休息一会儿`,
				icon: "none"
			})
			validate = false
			clearTimeout(tim)
			tim = setTimeout(()=>{
				validate = true
			}, opt.inv)
		}
	}
}