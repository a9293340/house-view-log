<script setup>
import { Loader } from "@googlemaps/js-api-loader";
import { reactive, onBeforeMount, ref } from "vue";
import { mapNearByStation } from "@/utils/arrayFunction.js";
import {
	getMapPhoto,
	setMapNull,
	makeMarker,
	nearbyApi,
} from "@/utils/mapApi.js";
import { storeToRefs } from "pinia";
import { ElMessageBox } from "element-plus";
import newHouseImg from "@/assets/image/new_house.png";
import housePointImg from "@/assets/image/house_point.png";
import backgroundImage from "@/assets/image/background.jpg";

const { setNearByStation, setPickLatLng, setStates, setPickHousePoint } =
	useMapStore();
const { nearBySearchStation } = storeToRefs(useMapStore());
const { setErrorLog } = useAppStore();
const states = reactive({
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
const currentLatLng = reactive({
	lat: null,
	lng: null,
});

const switchHandler = reactive({
	info: true,
});

const housePoints = ref([]);

// Marker
let currentMark = null;
let newPointMark = null;
let housePointsMarker = [];

const autoComplete = ref("");
const informationBlockStatus = ref(0);

const goToHousePointInfoDetailPage = async (hPoint) => {
	// console.log(hPoint);
	setPickHousePoint(hPoint);
	toggleBounce(hPoint.place_id);
	if (switchHandler.info) switchHandler.info = false;
	informationBlockStatus.value = 1;
};

const getStationInformation = async (station) => {
	// console.log(station);
	let info = {
		lat: station.geometry.location.lat,
		lng: station.geometry.location.lng,
		vicinity: station.vicinity,
		name: station.name,
		place_id: station.place_id,
		photos: [],
	};

	// 打API 核對place_id 有Data則直接導入Page2
	if (housePointsMarker.find((x) => x.place_id === info.place_id)) {
		if (currentMark) setMapNull(currentMark);
		const hPoint = housePoints.value.find((x) => x.place_id === info.place_id);
		await goToHousePointInfoDetailPage(hPoint);
		return;
	}
	if (station.photos)
		info.photos = station.photos.map((el) => getMapPhoto(el.photo_reference));
	if (station) {
		if (currentMark) setMapNull(currentMark);
		if (newPointMark) setMapNull(newPointMark);
		newPointMark = makeMarker(
			states,
			info.lat,
			info.lng,
			info.name,
			newHouseImg,
			40
		);
		goToCenter(info.lat, info.lng, 20);
		newPointMark.addListener("click", () => {
			ElMessageBox.confirm("請問要對此物件加入看房評論嗎?", "Warning", {
				confirmButtonText: "Yes",
				cancelButtonText: "No",
				type: "warning",
			}).then(async () => {
				const res = await $fetch("/api/house_point/create", {
					method: "POST",
					body: info,
				});
				if (!res.status) {
					await setHousePoints();
					await goToHousePointInfoDetailPage(info);
					if (newPointMark) setMapNull(newPointMark);
				}
			});
		});
	}
};

const searchFindData = async () => {
	const autoSearch = states.autocomplete.getPlace();
	// 判斷走auto complete 或是走手動search
	const jud = autoSearch && autoSearch.name.indexOf(autoComplete.value) !== -1;
	const location = jud
		? {
				lat: autoSearch.geometry.location.lat(),
				lng: autoSearch.geometry.location.lng(),
		  }
		: {
				lat: currentLatLng.lat,
				lng: currentLatLng.lng,
		  };
	changeMarkerAndOpenInformationBlock(
		(
			await nearbyApi(
				location.lat,
				location.lng,
				5,
				jud ? autoSearch.name : autoComplete.value
			)
		).results,
		location.lat,
		location.lng
	);
	goToCenter(location.lat, location.lng);
};

const goToCenter = (
	lat = currentLatLng.lat,
	lng = currentLatLng.lng,
	zoom = 15
) => {
	states.map.setCenter({
		lat,
		lng,
	});
	states.map.setZoom(zoom);
};

const changeMarkerAndOpenInformationBlock = (station, lat, lng) => {
	setNearByStation(station);
	setPickLatLng(lat, lng);

	if (!nearBySearchStation.value) {
		setErrorLog({
			title: "Nearby Search Failed!",
			type: "error",
			description: "找不到符合搜尋之目標",
		});
		return;
	}

	if (currentMark) setMapNull(currentMark);
	currentMark = makeMarker(states, lat, lng, "You Pick Here!", null);
	switchHandler.info = false;
	informationBlockStatus.value = 0;
};

const toggleBounce = (place_id) => {
	for (let i = 0; i < housePointsMarker.length; i++) {
		const marker = housePointsMarker[i].marker;
		if (housePointsMarker[i].place_id === place_id)
			marker.setAnimation(states.google.maps.Animation.BOUNCE);
		else marker.setAnimation(null);
	}
};

const bounceTurnOff = () => {
	for (let i = 0; i < housePointsMarker.length; i++) {
		const marker = housePointsMarker[i].marker;
		marker.setAnimation(null);
	}
};

const closeInfoBlock = () => {
	switchHandler.info = true;
	if (currentMark) setMapNull(currentMark);
	if (newPointMark) setMapNull(newPointMark);
	bounceTurnOff();
};

const setHousePoints = async () => {
	if (housePointsMarker.length) {
		for (let i = 0; i < housePointsMarker.length; i++) {
			const marker = housePointsMarker[i].marker;
			setMapNull(marker);
		}
	}
	housePointsMarker = [];
	housePoints.value = await $fetch("/api/house_point");
	for (let i = 0; i < housePoints.value.length; i++) {
		const hPoint = housePoints.value[i];
		housePointsMarker.push({
			place_id: hPoint.place_id,
			marker: null,
		});

		const idx = housePointsMarker.findIndex(
			(x) => x.place_id === hPoint.place_id
		);

		housePointsMarker[idx].marker = makeMarker(
			states,
			hPoint.lat,
			hPoint.lng,
			hPoint.name,
			housePointImg,
			40
		);
		housePointsMarker[idx].marker.addListener("click", async () => {
			// console.log(hPoint);
			await goToHousePointInfoDetailPage(hPoint);
		});
	}
};

const initMap = async () => {
	states.map.addListener("click", async (event) => {
		if (newPointMark) setMapNull(newPointMark);
		changeMarkerAndOpenInformationBlock(
			await mapNearByStation(
				["公寓", "大樓", "大廈", "宅", "邸"].map(
					async (el) =>
						(
							await nearbyApi(event.latLng.lat(), event.latLng.lng(), 5, el)
						).results
				)
			),
			event.latLng.lat(),
			event.latLng.lng()
		);
	});
};

const initGoogle = async () => {
	navigator.geolocation.getCurrentPosition((position) => {
		currentLatLng.lat = position.coords.latitude;
		currentLatLng.lng = position.coords.longitude;
	});

	if (!currentLatLng.lat) currentLatLng.lat = 25.029829;
	if (!currentLatLng.lng) currentLatLng.lng = 121.5432936;

	const loader = new Loader({
		apiKey: import.meta.env.VITE_MAPKEY,
		version: "weekly",
		libraries: ["places"],
		language: "zh-TW",
	});
	states.google = await loader.load();
	states.map = new states.google.maps.Map(document.getElementById("map"), {
		center: { lat: currentLatLng.lat, lng: currentLatLng.lng },
		zoom: 12,
		mapTypeControl: false,
		fullscreenControl: false,
		streetViewControl: false,
		minZoom: 10,
		maxZoom: 20,
	});
	states.autocomplete = new google.maps.places.Autocomplete(
		document.getElementById("google-auto-complete"),
		{
			fields: ["geometry", "icon", "name"],
			bounds: {
				north: currentLatLng.lat + 0.2,
				south: currentLatLng.lat - 0.2,
				east: currentLatLng.lng + 0.2,
				west: currentLatLng.lng - 0.2,
			},
		}
	);
	states.service = new states.google.maps.places.PlacesService(states.map);
	states.streetService = new google.maps.StreetViewService();
	states.directionsService = new states.google.maps.DirectionsService();
	states.infoWindow = new states.google.maps.InfoWindow();

	setStates(states);
};

onBeforeMount(async () => {
	await initGoogle();
	await initMap();
	await setHousePoints();
});
</script>

<template>
	<div class="map">
		<div id="map"></div>
		<div class="map-search">
			<el-input
				class="w-full h-full"
				id="google-auto-complete"
				v-model="autoComplete"
			>
				<template #prepend>
					<IconTemplate
						@click="goToCenter"
						:size.number="24"
						:cursor="true"
						color="blue"
						icon="bxs-map"
					/>
				</template>
				<template #append>
					<IconTemplate
						@click="searchFindData"
						:size.number="24"
						:cursor="true"
						icon="ic-baseline-search"
					/>
				</template>
			</el-input>
		</div>
		<div
			:class="[
				'information-block',
				'information-block-lg',
				{
					'information-block-close': switchHandler.info,
				},
			]"
			:style="`background-image: url(${backgroundImage})`"
		>
			<header class="information-header">
				<IconTemplate
					color="blue"
					icon="ic-baseline-close"
					:cursor="true"
					@click="closeInfoBlock"
				/>
			</header>
			<NearByStationList
				v-if="informationBlockStatus === 0"
				@station="getStationInformation"
			/>
			<HousePointInfoPage v-if="informationBlockStatus === 1" />
		</div>
	</div>
</template>

<style lang="scss" scoped>
.map {
	@apply w-full h-full overflow-hidden;
	#map {
		@apply w-full h-full relative;
	}
	.map-search {
		@apply fixed lg:w-96 w-[calc(100%-1rem)] h-10  z-10 top-5 lg:left-5 left-2;
	}
	.information-block {
		@apply w-full h-128 duration-300 fixed right-0 bottom-0 bg-cover bg-no-repeat bg-top rounded-tl-xl rounded-tr-xl box-border shadow-black shadow-lg p-3;
		.information-header {
			@apply w-full h-10 mb-3 flex flex-row;
		}
	}
	.information-block-lg {
		@apply lg:w-128 lg:h-full lg:top-0 lg:rounded-bl-xl lg:bg-center lg:rounded-tr-none;
	}
	.information-block-close {
		@apply -bottom-128 lg:bottom-0 lg:-right-128;
	}
}
</style>
