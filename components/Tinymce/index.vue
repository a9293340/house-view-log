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

if (process.client) {
	tinymce = await import("tinymce/tinymce");
	// 外觀
	// await import("tinymce/skins/ui/oxide/skin.css");
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
		fontsize_formats: "8pt 10pt 12pt 14pt 16pt 18pt 20pt 22pt 24pt 36pt",
		font_formats:
			"微軟雅黑='微軟雅黑';宋體='宋體';黑體='黑體';仿宋='仿宋';楷體='楷體';隸書='隸書';Andale Mono=andale mono,times;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;Comic Sans MS=comic sans ms,sans-serif;Courier New=courier new,courier;Georgia=georgia,palatino;Helvetica=helvetica;Impact=impact,chicago;Symbol=symbol;Tahoma=tahoma,arial,helvetica,sans-serif;Terminal=terminal,monaco;Times New Roman=times new roman,times;Trebuchet MS=trebuchet ms,geneva;Verdana=verdana,geneva;Webdings=webdings;Wingdings=wingdings",
		branding: false,
		images_file_types: "jpg,svg,webp,png,jpeg,ico",
		default_link_target: "_blank",
		deprecation_warnings: false,
		images_upload_handler: async (blobInfo, success, failure) => {
			console.log(blobInfo);
			let params = new FormData();
			params.append("file", blobInfo.blob());
			const path = (
				await useFetch("/api/upload", {
					method: "post",
					body: params,
				})
			).data.value?.path[0];
			console.log(path);
			if (path) success(path);
			else failure("upload failed");
		},
		content_style:
			"body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
	};
}

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
			"undo redo | forecolor backcolor | fontselect | fontsizeselect | bold italic underline strikethrough| link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat | searchreplace",
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
