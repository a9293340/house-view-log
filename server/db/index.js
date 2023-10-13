import mongoose from "mongoose";

export default async (_nitroApp) => {
	try {
		mongoose.set("strictQuery", true); // 嚴格模式
		await mongoose.connect(
			`mongodb+srv://${import.meta.env.VITE_ADMIN}:${
				import.meta.env.VITE_PASSWORD
			}@cluster0.rnvhhr4.mongodb.net/${
				import.meta.env.VITE_DB
			}?retryWrites=true&w=majority`
		);
		console.log("連接 MongoDB");
	} catch (e) {
		console.error("Error MongoDB =>", e);
	}
};
