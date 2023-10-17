import { defineStore } from "pinia";

export const useAppStore = defineStore("AppStore", () => {
	const errorLog = ref({
		title: "",
		type: "error",
		description: "",
		isShow: false,
	});

	const setErrorLog = (format) => {
		errorLog.value.title = format.title;
		errorLog.value.type = format.type;
		errorLog.value.description = format.description;
		errorLog.value.isShow = true;

		setTimeout(() => {
			errorLog.value.isShow = false;
		}, 1000);
	};

	const admin = ref({});

	const setAdmin = (ad) => (admin.value = ad);

	return {
		errorLog,
		admin,
		setErrorLog,
		setAdmin,
	};
});
