<script setup>
const props = defineProps({
	size: {
		type: Number,
		default: 24,
	},
	color: {
		type: String,
		default: "black",
	},
	icon: {
		type: String,
		default: "ic-baseline-close",
	},
	cursor: {
		type: Boolean,
		default: false,
	},
});
</script>

<template>
	<el-icon
		:class="{
			pointer: props.cursor,
		}"
		:size="props.size"
		:color="props.color"
	>
		<Icon :icon="icon" />
	</el-icon>
</template>

<style lang="scss">
.pointer {
	@apply cursor-pointer;
}
</style>
