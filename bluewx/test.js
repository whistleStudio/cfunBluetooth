function a () {
	return new Promise((rsv, rej) =>{
		setTimeout(() => {
			console.log("xxxx")
			rej("error")
		}, 2000)
	}) 
}

;(async ()=>{
	try {
		await a ()
	} catch(e)console.log(e)
	console.log("over")
})()