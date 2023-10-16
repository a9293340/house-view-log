import mongoose from "mongoose";

const schema = new mongoose.Schema({
	account: {
		type: String,
	},
	password: {
		type: String,
	},
});

const admin = mongoose.model("admin", schema, "admin");

export default admin;
