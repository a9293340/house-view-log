<script lang="ts" setup>
import {
	Check,
	Delete,
	Edit,
	Message,
	Search,
	Star,
} from "@element-plus/icons-vue";
import TinycmeEditor from "@/components/Tinymce/index.vue";
// import Editor from "@tinymce/tinymce-vue";

const editorData = ref("<p>Content of the editor.</p>");
const isShow = ref(false);

const showEdit = () => (isShow.value = !isShow.value);
const getEditData = () => console.log(editorData.value);

onMounted(() => {
	setTimeout(() => {
		isShow.value = true;
	}, 100);
});
</script>

<template>
	<div>
		<div class="flex flex-row">
			<el-button @click="showEdit">Default</el-button>
			<el-button type="primary" @click="getEditData">Primary</el-button>
			<el-button type="success">Success</el-button>
			<el-button type="info">Info</el-button>
			<el-button type="warning">Warning</el-button>
			<el-button type="danger">Danger</el-button>
		</div>
		<br />
		<div class="flex flex-row">
			<el-button :icon="Search" circle />
			<el-button type="primary" :icon="Edit" circle />
			<el-button type="success" :icon="Check" circle />
			<el-button type="info" :icon="Message" circle />
			<el-button type="warning" :icon="Star" circle />
			<el-button type="danger" :icon="Delete" circle />
		</div>
	</div>
	<div class="flex flex-row">
		I'm using an Iconify Icon! <Icon icon="mdi:black-mesa" />
	</div>
	<form>
		<label for="locale-select">{{ $t("language") }}: </label>
		<select id="locale-select" v-model="$i18n.locale">
			<option value="en">en</option>
			<option value="zh">zh</option>
		</select>
	</form>
	<tinycme-editor v-model="editorData" v-if="isShow"></tinycme-editor>
	<pre v-html="editorData"></pre>
</template>

<style lang="scss"></style>
