<template>
	<editor
		v-model="editorValue"
		:init="init"
		api-key="i8819yepbj3rs122cg7lfc104hh24s9mw6xkdiuprqz2salp"
	></editor>
</template>

<script setup>
import { ref, watch, toRefs } from "vue";
// TinyMCE-Vue
import Editor from "@tinymce/tinymce-vue";
let tinymce;

const init = ref({});

// if (process.client) {
tinymce = await import("tinymce/tinymce");
// 外觀
await import("tinymce/skins/ui/oxide/skin.css");
await import("tinymce/themes/silver/index.js");
await import("tinymce/icons/default/index.js");
await import("tinymce/plugins/emoticons/index.js");
await import("tinymce/plugins/emoticons/js/emojis.js");
await import("tinymce/plugins/table/index.js");
await import("tinymce/plugins/quickbars/index.js");
await import("tinymce/plugins/advlist/index.js");
await import("tinymce/plugins/anchor/index.js");
await import("tinymce/plugins/autolink/index.js");
await import("tinymce/plugins/charmap/index.js");
await import("tinymce/plugins/code/index.js");
await import("tinymce/plugins/codesample/index.js");
await import("tinymce/plugins/image/index.js");
await import("tinymce/plugins/link/index.js");
await import("tinymce/plugins/lists/index.js");
await import("tinymce/plugins/media/index.js");
await import("tinymce/plugins/searchreplace/index.js");
await import("tinymce/plugins/visualblocks/index.js");
await import("tinymce/plugins/textcolor/index.js");
await import("tinymce-i18n/langs5/zh_TW.js");

function pickerCallback(cb, value, meta) {
	console.log(tinymce.activeEditor);
	let input = document.createElement("input");
	input.setAttribute("type", "file");
	input.setAttribute("accept", "image/*");

	input.onchange = function () {
		let file = this.files[0];
		let reader = new FileReader();
		reader.onload = function () {
			let id = "blobid" + new Date().getTime();
			let blobCache = tinymce.activeEditor.editorUpload.blobCache;
			let base64 = reader.result.split(",")[1];
			let blobInfo = blobCache.create(id, file, base64);
			blobCache.add(blobInfo);
			cb(blobInfo.blobUri(), { title: file.name });
		};
		reader.readAsDataURL(file);
	};

	input.click();
}

init.value = {
	language: "zh_TW",
	height: 500,
	menubar: false,
	content_css: false,
	skin: false,
	plugins: props.plugins,
	toolbar: props.toolbar,
	quickbars_insert_toolbar: false,
	branding: false,
	file_picker_types: "image",
	file_picker_callback: pickerCallback,
	content_style:
		"body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
};
// }

const props = defineProps({
	modelValue: {
		type: String,
		default: "",
	},
	plugins: {
		type: [String, Array],
		default:
			"anchor autolink charmap codesample emoticons image textcolor link lists media searchreplace table visualblocks",
	},
	toolbar: {
		type: [String, Array],
		default:
			"undo redo | forecolor backcolor | blocks fontfamily fontsize | bold italic underline strikethrough| link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat | searchreplace",
	},
});

const emit = defineEmits(["update:modelValue"]);

const { modelValue } = toRefs(props);
const editorValue = ref(modelValue.value);

watch(modelValue, (newValue) => {
	editorValue.value = newValue;
});

watch(editorValue, (newValue) => {
	emit("update:modelValue", newValue);
});
</script>
