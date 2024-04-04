import { getScreenshot } from "./screenshots.mjs";
import { sendImageToModel } from "./openai_api.mjs";
import dotenv from "dotenv";
import fs from "fs";
dotenv.config();

const url = "https://www.netflix.com";

const encodeImageToBase64 = (filePath) => {
	const bitmap = fs.readFileSync(filePath);
	return Buffer.from(bitmap).toString("base64");
};

(async () => {
	await getScreenshot(url);
	const image = encodeImageToBase64("test.png");
	const res = await sendImageToModel(image);
	res.choices.forEach((item) => {
		console.log(item.message);
	});
})();
