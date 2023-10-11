<script setup>
import { Loader } from '@googlemaps/js-api-loader';
import { watch, reactive, onBeforeMount, ref, onMounted } from 'vue';

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
  marker: null,
});

const autoComplete = ref('');

const searchFindData = () => {
  console.log(autoComplete.value);
  console.log(states.autocomplete.getPlace());
};

const initGoogle = async () => {
  navigator.geolocation.getCurrentPosition(position => {
    currentLatLng.lat = position.coords.latitude;
    currentLatLng.lng = position.coords.longitude;
  });

  const loader = new Loader({
    apiKey: import.meta.env.VITE_MAPKEY,
    version: 'weekly',
    libraries: ['places'],
    language: 'zh-TW',
  });
  states.google = await loader.load();
  states.map = new states.google.maps.Map(document.getElementById('map'), {
    center: { lat: currentLatLng.lat, lng: currentLatLng.lng },
    zoom: 12,
    mapTypeControl: false,
    fullscreenControl: false,
    streetViewControl: false,
    minZoom: 10,
    maxZoom: 15,
  });
  states.autocomplete = new google.maps.places.Autocomplete(
    document.getElementById('google-auto-complete'),
    {
      fields: ['address_components', 'geometry', 'icon', 'name'],
      bounds: {
        north: currentLatLng.lat + 0.2,
        south: currentLatLng.lat - 0.2,
        east: currentLatLng.lng + 0.2,
        west: currentLatLng.lng - 0.2,
      },
      types: ['establishment'],
    },
  );
};

onBeforeMount(async () => {
  await initGoogle();
});
</script>

<template>
  <div class="map">
    <div id="map"></div>
    <div class="fixed w-96 h-10 z-10 top-5 left-5">
      <el-input class="w-full h-full" id="google-auto-complete" v-model="autoComplete">
        <template #prepend>
          <el-icon :size="24" color="blue">
            <Icon icon="bxs-map" />
          </el-icon>
        </template>
        <template #append>
          <el-icon :size="24" @click="searchFindData">
            <Icon icon="ic-baseline-search" />
          </el-icon>
        </template>
      </el-input>
    </div>
  </div>
</template>

<style lang="scss">
.el-input-group__append {
  @apply cursor-pointer;
}
</style>

<style lang="scss" scoped>
.map {
  @apply w-full h-full overflow-hidden;
  #map {
    @apply w-full h-full relative;
  }
}
</style>
