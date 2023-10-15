<script setup>
import { storeToRefs } from 'pinia';

const { pickHousePoint } = storeToRefs(useMapStore());
</script>

<template>
  <div class="house-point-info-page">
    <div class="house-info-cards">
      <img
        :src="pickHousePoint.photos[0]"
        v-if="pickHousePoint.photos.length"
        class="house-view"
        alt=""
      />
      <h1>{{ pickHousePoint.name }}</h1>
      <div class="info-line">
        <IconTemplate color="black" :size="20" icon="entypo-address" class="mr-2" />
        <p>地址 :</p>
        <span>{{ pickHousePoint.vicinity }}</span>
      </div>
      <div class="info-line">
        <IconTemplate color="black" :size="20" icon="ep-coordinate" class="mr-2" />
        <p>座標 :</p>
        <span>{{ pickHousePoint.lat }},{{ pickHousePoint.lng }}</span>
      </div>
    </div>
    <div class="house-forum-zone"></div>
  </div>
</template>

<style lang="scss" scoped>
.house-point-info-page {
  @apply w-full h-full flex flex-row lg:flex-col;
  .house-info-cards {
    @apply lg:mb-3 mr-2 lg:mr-0 lg:w-full w-5/12 h-76 lg:h-80 flex flex-col items-center rounded-lg box-border shadow-lg bg-white border border-gray-200 p-3;
    .house-view {
      @apply lg:h-44 lg:block hidden mb-2;
    }
    h1 {
      @apply text-gray-700 font-bold text-2xl lg:text-3xl;
    }
    .info-line {
      @apply w-full flex flex-row mt-2 items-center;
      p {
        @apply text-gray-500 font-semibold mr-2 text-base lg:text-xl;
      }
      span {
        @apply text-congo-brown-500 font-medium text-base lg:text-xl;
      }
    }
  }
  .house-forum-zone {
    @apply lg:w-full w-7/12 h-76 lg:h-[calc(100%-24rem)] overflow-auto scrollbar-thin scrollbar-track-rounded-lg;
  }
}
</style>
