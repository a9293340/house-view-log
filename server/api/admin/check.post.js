import adminModel from "@/server/models/admin.model";

export default defineEventHandler(async (event) => {
	const body = await readBody(event);
	const { account } = body;
	const house_forum = await adminModel.find({ account });
	return house_forum;
});
