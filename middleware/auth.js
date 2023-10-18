export default defineNuxtRouteMiddleware(async (from, to) => {
	const cookie = useCookie("house-view");
	const { setAdmin } = useAppStore();
	try {
		const check = await $fetch("/api/admin", {
			method: "POST",
			headers: {
				Authorization: cookie.value.token,
			},
		});
		if (check.status) {
			console.log("OUT");
			setAdmin({});
			cookie.value = null;
		}
	} catch (error) {
		console.log("No Cookie");
		setAdmin({});
	}
});
