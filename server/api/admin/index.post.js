export default defineEventHandler(async (event) => {
	const cookieHeaders = getHeader(event, "Authorization");
	return {
		status: cookieHeaders === "115d-xdf-ergve-xcvrf56-vrwef5" ? 0 : 1,
	};
});
