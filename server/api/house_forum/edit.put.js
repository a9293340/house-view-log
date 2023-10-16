import houseForumModel from "@/server/models/house_forum.model";

export default defineEventHandler(async (event) => {
	const body = await readBody(event);

	const { title, author, content, time, _id } = body;
	const oldData = await houseForumModel.findOne({ _id });
	await houseForumModel.updateOne(oldData, {
		author,
		title,
		content,
		time,
	});

	await oldData.save();

	return { status: 0, body };
});
