import houseForumModel from "@/server/models/house_forum.model";

export default defineEventHandler(async (event) => {
	const body = await readBody(event);

	const { place_id, title, author, content, time } = body;
	const house_forum = new houseForumModel({
		author,
		title,
		place_id,
		content,
		time,
	});

	await house_forum.save();

	return { status: 0, body };
});
