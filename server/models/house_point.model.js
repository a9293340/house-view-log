import mongoose from "mongoose";

const schema = new mongoose.Schema({
	lat: {
		type: Number,
	},
	lng: {
		type: Number,
	},
	vicinity: {
		type: String,
	},
	name: {
		type: String,
	},
	place_id: {
		type: String,
	},
	photos: {
		type: Array,
	},
});

const house_point = mongoose.model("house_point", schema, "house_point");

export default house_point;
