<script setup>
import { storeToRefs } from "pinia";
import NoImage from "@/assets/image/no-image.png";
import { ElMessageBox } from "element-plus";

const editForumDialogTrigger = ref(false);
const openHtmlTrigger = ref(false);
const dialogWidth = ref("85%");
const showForum = ref({});
const forumInfo = ref([]);
const isEdit = ref(false);
const nowPickEditForumId = ref("");
const cookie = useCookie("house-view");

const editorData = ref("<p>Content of the editor.</p>");
const createInfo = reactive({
	author: cookie.value ? cookie.value.admin.account : "",
	title: "",
});
const { pickHousePoint } = storeToRefs(useMapStore());
const { setErrorLog } = useAppStore();

watch(pickHousePoint, async () => {
	await getForumInfo();
});

const dialogSummitHandler = async () => {
	// console.log(createInfo);
	// console.log(editorData.value);
	// console.log(pickHousePoint.value.place_id);
	if (!createInfo.title || !editorData.value) {
		let errorMsg = "";
		if (!createInfo.title) errorMsg += "標題/";
		if (!editorData.value) errorMsg += "內容";
		setErrorLog({
			title: "Edit/Create Failed!",
			type: "error",
			description: `尚有必填內容未填寫(${errorMsg})`,
		});
		return;
	}

	ElMessageBox.alert("您已經成功新增此筆記 !", "提醒", {
		confirmButtonText: "OK!",
	}).then(async () => {
		// console.log(nowPickEditForumId.value);
		let res;
		if (!isEdit.value)
			res = await $fetch("/api/house_forum/create", {
				method: "POST",
				body: {
					title: createInfo.title,
					author: cookie.value.admin._id,
					place_id: pickHousePoint.value.place_id,
					content: editorData.value,
					time:
						new Date().toLocaleDateString() +
						" " +
						new Date().toLocaleTimeString(),
				},
			});
		else
			res = await $fetch("/api/house_forum/edit", {
				method: "PUT",
				body: {
					title: createInfo.title,
					author: cookie.value.admin._id,
					place_id: pickHousePoint.value.place_id,
					_id: nowPickEditForumId.value,
					content: editorData.value,
					time:
						new Date().toLocaleDateString() +
						" " +
						new Date().toLocaleTimeString(),
				},
			});

		// console.log(res);
		if (!res.status) await getForumInfo();

		editForumDialogTrigger.value = false;
	});
};

const getForumInfo = async () =>
	(forumInfo.value = await $fetch("/api/house_forum", {
		method: "POST",
		body: {
			place_id: pickHousePoint.value.place_id,
		},
	}));

const editForum = (forum) => {
	// console.log(forum);
	createInfo.author = forum.author_name;
	createInfo.title = forum.title;
	editorData.value = forum.content;
	nowPickEditForumId.value = forum._id;
	isEdit.value = true;
	editForumDialogTrigger.value = true;
};

const createForum = () => {
	isEdit.value = false;
	createInfo.author = cookie.value.admin.account;
	// console.log(createInfo);
	editForumDialogTrigger.value = true;
};

const openHtml = (forum) => {
	showForum.value = forum;
	openHtmlTrigger.value = true;
};

onMounted(async () => {
	await getForumInfo();
	window.onresize = () => {
		dialogWidth.value = document.body.clientWidth > 1024 ? "85%" : "95%";
	};
	// console.log(cookie.value.admin);
});
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
			<img :src="NoImage" v-else class="house-view" alt="" />
			<h1>{{ pickHousePoint.name }}</h1>
			<div class="info-line">
				<IconTemplate
					color="black"
					:size="20"
					icon="entypo-address"
					class="mr-2"
				/>
				<p>地址 :</p>
				<span>{{ pickHousePoint.vicinity }}</span>
			</div>
			<div class="info-line">
				<IconTemplate
					color="black"
					:size="20"
					icon="ep-coordinate"
					class="mr-2"
				/>
				<p>座標 :</p>
				<span>{{ pickHousePoint.lat }},{{ pickHousePoint.lng }}</span>
			</div>
		</div>
		<div class="house-forum-zone">
			<div class="add-forum" v-if="cookie" @click="createForum">+</div>
			<div class="forum-info" v-for="forum in forumInfo" :key="forum._id">
				<div class="title">
					<p class="title-font" @click="openHtml(forum)">
						{{ forum.title }}
					</p>
					<p
						class="close"
						@click="editForum(forum)"
						v-if="cookie && forum.author === cookie.admin._id"
					>
						edit
					</p>
				</div>
				<div class="title">
					<p class="sub">{{ forum.author_name }}</p>
					<p class="sub">{{ forum.time }}</p>
				</div>
			</div>
		</div>
	</div>

	<!-- Create / Edit -->
	<el-dialog
		:width="dialogWidth"
		top="80px"
		v-model="editForumDialogTrigger"
		title="新增內容"
		class="dialog-css"
	>
		<el-form-item label="標題 :">
			<el-input class="w-full mb-3" v-model="createInfo.title" />
		</el-form-item>
		<el-form-item label="創作者 :">
			<el-input
				class="w-full mb-3 text-white"
				v-model="createInfo.author"
				disabled
			/>
		</el-form-item>
		<Tinymce v-model="editorData" v-show="editForumDialogTrigger"></Tinymce>
		<div class="flex flex-row mt-4">
			<el-button @click="dialogSummitHandler"> 送出 </el-button>
			<el-button @click="editForumDialogTrigger = false"> 取消 </el-button>
		</div>
	</el-dialog>

	<!-- html -->
	<el-dialog
		:width="dialogWidth"
		top="80px"
		v-model="openHtmlTrigger"
		title="詳細內容"
		class="dialog-css"
	>
		<div class="show-info">
			<pre v-html="showForum.content"></pre>
		</div>
	</el-dialog>
</template>

<style>
.dialog-css {
	@apply rounded-lg;
}
</style>

<style lang="scss" scoped>
.house-point-info-page {
	@apply w-full h-full flex flex-col;
	.house-info-cards {
		@apply lg:mb-3 mr-2 lg:mr-0 w-full h-auto lg:h-80 flex flex-row lg:flex-col items-center rounded-lg box-border shadow-lg bg-white border border-gray-200 p-3 overflow-auto scrollbar-thin scrollbar-track-rounded-lg;
		.house-view {
			@apply lg:h-44 lg:block hidden mb-2;
		}
		h1 {
			@apply text-gray-700 font-bold text-2xl lg:text-3xl mr-3 lg:mr-0 whitespace-nowrap;
		}
		.info-line {
			@apply lg:w-full w-auto flex flex-row lg:mt-2 items-center;
			p {
				@apply text-gray-500 font-semibold mr-2 text-base lg:text-xl whitespace-nowrap;
			}
			span {
				@apply text-congo-brown-500 font-medium text-base lg:text-xl whitespace-nowrap;
			}
		}
	}
	.house-forum-zone {
		@apply w-full h-[calc(100%-9rem)] lg:h-[calc(100%-24rem)] overflow-auto scrollbar-thin scrollbar-track-rounded-lg mt-5 lg:mt-0 flex flex-col;
		.add-forum {
			@apply lg:w-full w-12 h-10 flex flex-row justify-center p-2 rounded-lg box-border shadow-lg bg-white border border-gray-200 cursor-pointer hover:bg-blue-300 hover:text-white duration-200;
		}
		.forum-info {
			@apply lg:w-full h-24 pl-4 pr-4 pt-2 pb-2 flex flex-col rounded-lg box-border shadow-lg bg-white border border-gray-200 lg:mt-4 mb-4 lg:mb-0 mt-3;
			.title {
				@apply flex flex-row justify-between mt-2;
				p {
					@apply lg:text-xl font-bold text-ellipsis whitespace-nowrap overflow-hidden w-1/3;
				}
				p.title-font {
					@apply cursor-pointer hover:text-blue-500 duration-200;
				}
				p.close {
					@apply cursor-pointer text-green-400 hover:text-green-800 duration-200 font-normal text-base flex flex-row justify-end;
				}
				p.sub {
					@apply text-gray-400 text-sm font-normal italic;
				}
			}
		}
	}
}
.show-info {
	@apply rounded-lg bg-slate-200 p-3;
}
</style>
