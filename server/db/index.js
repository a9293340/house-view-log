import mongoose from "mongoose";

export default async (_nitroApp) => {
	const config = useRuntimeConfig();
	try {
		mongoose.set("strictQuery", true); // 嚴格模式
		await mongoose.connect(
			`mongodb+srv://${config.admin}:${config.password}@cluster0.rnvhhr4.mongodb.net/${config.db}?retryWrites=true&w=majority`
		);
		console.log("連接 MongoDB");
	} catch (e) {
		console.error("Error MongoDB =>", e);
	}
};
