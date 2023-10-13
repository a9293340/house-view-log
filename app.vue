<script lang="ts" setup>
import { storeToRefs } from "pinia";

const { errorLog } = storeToRefs(useAppStore());
</script>

<template>
	<div id="app">
		<NuxtPage />
		<el-alert
			class="alert"
			v-show="errorLog.isShow"
			:title="errorLog.title"
			:type="errorLog.type"
			:description="errorLog.description"
			show-icon
		/>
	</div>
</template>

<style lang="scss">
#app {
	@apply w-full h-screen m-0 p-0 relative;
	.alert {
		@apply w-144 fixed left-1/2 top-0 -translate-x-1/2;
	}
}
</style>
