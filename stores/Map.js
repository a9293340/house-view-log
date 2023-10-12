import { defineStore } from "pinia";

export const useMapStore = defineStore("MapStore", () => {
	const nearBySearchStation = ref([]);
	const setNearByStation = (arr) => (nearBySearchStation.value = arr);

	return {
		nearBySearchStation,
		setNearByStation,
	};
});
