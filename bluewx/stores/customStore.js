import {defineStore} from "pinia"

export const useCustomStore = defineStore('custom', {
	state: () => {
		return {
			staArr: Array(6).fill(0),
			nameArr: ["按钮A", "按钮B", "按钮C", "按钮D", "滑杆X", "滑杆Y"]
		}
	}
})