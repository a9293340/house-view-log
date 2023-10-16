import mongoose from "mongoose";

const schema = new mongoose.Schema({
	title: {
		type: String,
	},
	author: {
		type: String,
	},
	place_id: {
		type: String,
	},
	content: {
		type: String,
	},
	time: {
		type: String,
	},
});

const house_forum = mongoose.model("house_forum", schema, "house_forum");

export default house_forum;
