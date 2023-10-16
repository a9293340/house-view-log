import adminModel from "@/server/models/admin.model";

export default defineEventHandler(async (event) => {
	const body = await readBody(event);

	const { account, password } = body;
	const admin = new adminModel({
		account,
		password,
	});

	await admin.save();

	return { status: 0, body };
});
