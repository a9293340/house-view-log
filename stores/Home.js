import { defineStore } from "pinia";

export const useHomeStore = defineStore("homeStore", () => {
	const count = ref(0);
	const addCount = () => {
		count.value++;
	};

	return {
		count,
		addCount,
	};
});
