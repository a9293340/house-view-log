<script setup>
import { storeToRefs } from "pinia";

const emit = defineEmits(["station"]);
const { nearBySearchStation } = storeToRefs(useMapStore());

const getStationInfo = (station) => {
	emit("station", station);
};
</script>

<template>
	<div class="near-by-station-list">
		<p>請選取您所需要的標的 :</p>
		<div
			class="station-name"
			v-for="station in nearBySearchStation"
			:key="station.geometry"
			@click="getStationInfo(station)"
		>
			{{ station.name }}
		</div>
	</div>
</template>

<style lang="scss" scoped>
.near-by-station-list {
	@apply w-full h-full flex flex-col;
	p {
		@apply text-xl text-congo-brown-800 mb-6 font-extrabold;
	}
	.station-name {
		@apply ml-2 font-bold text-lg mb-3 cursor-pointer hover:text-blue-400 duration-150;
	}
}
</style>
