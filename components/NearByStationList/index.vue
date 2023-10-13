<script setup>
import { storeToRefs } from "pinia";
import { nearbySearch_async } from "@/utils/mapApi.js";

const emit = defineEmits(["station"]);
const { nearBySearchStation, states, pickLatLng } = storeToRefs(useMapStore());
const { setNearByStation } = useMapStore();
const searchNearByStation = ref("");

const searchNearBy = async () => {
	const nearBy = await nearbySearch_async(
		states.value,
		{
			location: new states.value.google.maps.LatLng(
				pickLatLng.value.lat,
				pickLatLng.value.lng
			),
			radius: 5,
			keyword: searchNearByStation.value,
		},
		true
	);
	setNearByStation(nearBy);
};

const getStationInfo = (station) => {
	emit("station", station);
};
</script>

<template>
	<div class="near-by-station-list">
		<p>若在下列沒發現您想尋找的目標，可直接輸入 :</p>
		<el-input
			class="info-input"
			id="google-auto-complete"
			v-model="searchNearByStation"
		>
			<template #append>
				<IconTemplate
					@click="searchNearBy"
					:size.number="24"
					:cursor="true"
					icon="ic-baseline-search"
				/>
			</template>
		</el-input>
		<p>請選取您想查詢的標的 :</p>
		<div class="stations">
			<div
				class="station-name"
				v-for="station in nearBySearchStation"
				:key="station.geometry"
				@click="getStationInfo(station)"
			>
				{{ station.name }}
			</div>
		</div>
	</div>
</template>

<style>
.info-input {
	@apply lg:w-full w-112 h-auto lg:mb-5 mb-2;
}
</style>
<style lang="scss" scoped>
.near-by-station-list {
	@apply w-full h-full flex flex-col;
	p {
		@apply text-xl text-congo-brown-800 lg:mb-6 mb-2 font-extrabold;
	}
	.stations {
		@apply w-full lg:h-144 h-auto overflow-auto scrollbar-thin scrollbar-thumb-black scrollbar-thumb-rounded-lg flex lg:flex-col flex-row flex-wrap lg:flex-nowrap;
		.station-name {
			@apply lg:ml-2 lg:mr-0 mr-3 font-bold text-lg mb-3 cursor-pointer hover:text-blue-400 duration-150;
		}
	}
}
</style>
