import mongoose from "mongoose";

export default async (_nitroApp) => {
	try {
		mongoose.set("strictQuery", true); // 嚴格模式
		await mongoose.connect(
			`mongodb+srv://a9293340:574597@cluster0.rnvhhr4.mongodb.net/house?retryWrites=true&w=majority`
		);
		console.log("連接 MongoDB");
	} catch (e) {
		console.error("Error MongoDB =>", e);
	}
};
