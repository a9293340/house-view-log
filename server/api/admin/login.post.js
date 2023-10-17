import adminModel from "@/server/models/admin.model";

export default defineEventHandler(async (event) => {
	const body = await readBody(event);
	const { account, password } = body;
	const admin = await adminModel.find({ account, password });
	return {
		status: admin.length ? 0 : 1,
		token: "115d-xdf-ergve-xcvrf56-vrwef5",
		admin: admin[0],
	};
});
