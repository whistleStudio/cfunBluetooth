let a = 1

// {
// 	let a = 2
// 	function c () {
// 		console.log(a)
// 	}
// }
function b (obj) {
	obj.fn()
}
{
	a = 2
	b({
		fn(){
			console.log(a)
		}
	})
}
a = 3
// let a = 4