<script setup>
import { Loader } from "@googlemaps/js-api-loader";
import { reactive, onBeforeMount, ref } from "vue";
import { mapNearByStation } from "@/utils/arrayFunction.js";
import { nearbySearch_async, setMapNull } from "@/utils/mapApi.js";
import backgroundImage from "@/assets/image/background.jpg";
import { storeToRefs } from "pinia";

const { setNearByStation } = useMapStore();
const { nearBySearchStation } = storeToRefs(useMapStore());
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

let currentMark = null;

const autoComplete = ref("");
const informationBlockStatus = ref(0);

const searchFindData = () => {
	console.log(autoComplete.value);
	console.log(states.autocomplete.getPlace());
};

const goToCenter = () => {
	states.map.setCenter({
		lat: currentLatLng.lat,
		lng: currentLatLng.lng,
	});
	states.map.setZoom(12);
};

const getStationInformation = (station) => {
	console.log(station);
};

const initMap = async () => {
	states.map.addListener("click", async (event) => {
		setNearByStation(
			await mapNearByStation(
				["公寓", "大樓", "大廈", "宅", "邸"].map(
					async (el) =>
						await nearbySearch_async(
							states,
							{
								location: new states.google.maps.LatLng(
									event.latLng.lat(),
									event.latLng.lng()
								),
								radius: 5,
								keyword: el,
							},
							true
						)
				)
			)
		);
		if (currentMark) setMapNull(currentMark);
		currentMark = new states.google.maps.Marker({
			position: { lat: event.latLng.lat(), lng: event.latLng.lng() },
			map: states.map,
			title: "You Pick Here!",
		});
		if (nearBySearchStation.value.length) switchHandler.info = false;
		informationBlockStatus.value = 0;
		console.log(nearBySearchStation.value);
	});
};

const initGoogle = async () => {
	navigator.geolocation.getCurrentPosition((position) => {
		currentLatLng.lat = position.coords.latitude;
		currentLatLng.lng = position.coords.longitude;
	});

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
};

onBeforeMount(async () => {
	await initGoogle();
	await initMap();
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
					@click="() => (switchHandler.info = true)"
				/>
			</header>
			<NearByStationList
				v-if="informationBlockStatus === 0"
				@station="getStationInformation"
			/>
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
		@apply w-full h-96 duration-300 fixed right-0 bottom-0 bg-cover bg-no-repeat bg-top rounded-tl-xl rounded-tr-xl box-border shadow-black shadow-lg p-3;
		.information-header {
			@apply w-full h-10 mb-3 flex flex-row;
		}
	}
	.information-block-lg {
		@apply lg:w-96 lg:h-full lg:top-0 lg:rounded-bl-xl lg:bg-center lg:rounded-tr-none;
	}
	.information-block-close {
		@apply -bottom-96 lg:bottom-0 lg:-right-96;
	}
}
</style>
