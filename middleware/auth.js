export default defineNuxtRouteMiddleware(async () => {
	const cookie = useCookie("house-view");
	if (!cookie.value) return navigateTo("/", { redirectCode: 301 });
	const check = await $fetch("/api/admin", {
		method: "POST",
		headers: {
			Authorization: cookie.value.token,
		},
	});
	if (check.status) {
		console.log("OUT");
		return navigateTo("/", { redirectCode: 301 });
	}
});
