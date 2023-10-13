import { defineStore } from "pinia";

export const useMapStore = defineStore("MapStore", () => {
	const nearBySearchStation = ref([]);
	const setNearByStation = (arr) => (nearBySearchStation.value = arr);
	const pickLatLng = ref({
		lat: 0,
		lng: 0,
	});

	const pickHousePoint = ref({});

	const setPickHousePoint = (point) => (pickHousePoint.value = point);

	const setPickLatLng = (lat, lng) => {
		pickLatLng.value = {
			lat,
			lng,
		};
	};

	const states = ref({
		google: null,
		map: null,
		panorama: null,
		service: null,
		directionsService: null,
		directionsRender: null,
		infoWindow: null,
		streetService: null,
		autocomplete: null,
	});

	const setStates = (state) => {
		if (state.google) states.value.google = state.google;
		if (state.map) states.value.map = state.map;
		if (state.panorama) states.value.panorama = state.panorama;
		if (state.service) states.value.service = state.service;
		if (state.directionsService)
			states.value.directionsService = state.directionsService;
		if (state.directionsRender)
			states.value.directionsRender = state.directionsRender;
		if (state.infoWindow) states.value.infoWindow = state.infoWindow;
		if (state.streetService) states.value.streetService = state.streetService;
		if (state.autocomplete) states.value.autocomplete = state.autocomplete;
	};

	return {
		nearBySearchStation,
		setNearByStation,
		pickLatLng,
		setPickLatLng,
		setStates,
		states,
		pickHousePoint,
		setPickHousePoint,
	};
});
