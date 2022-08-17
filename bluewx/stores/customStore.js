import {defineStore} from "pinia"

export const useCustomStore = defineStore('custom', {
	state: () => {
		return {
			staArr: Array(6).fill(0),
			nameArr: ["数据X", "数据Y","数据A", "数据B", "数据C", "数据D"]
		}
	}
})