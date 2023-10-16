<script setup>
const props = defineProps({
	msg: {
		type: String,
		default: "",
	},
	check: {
		type: Boolean,
		default: false,
	},
});
</script>

<template>
	<p
		:class="{
			'not-right': !props.check,
		}"
	>
		<IconTemplate
			class="mr-3"
			color="green"
			:size="24"
			icon="material-symbols:check-circle-outline"
			v-if="props.check"
		/>
		<IconTemplate
			class="mr-3"
			color="red"
			:size="24"
			icon="mi:circle-error"
			v-else
		/>
		{{ props.msg }}
	</p>
</template>

<style lang="scss" scoped>
p {
	@apply flex flex-row items-center text-green-400;
}
p.not-right {
	@apply text-red-600;
}
</style>
