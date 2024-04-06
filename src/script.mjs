import { getScreenshot } from "./screenshots.mjs";
// import { sendImageToModel } from "./openai_api.mjs";
import { getHTML } from "./scraper.mjs";
import dotenv from "dotenv";
import fs from "fs";
dotenv.config();

const url = "https://old.reddit.com";

// async function test() {
// 	await getScreenshot(url);
// 	const image = encodeImageToBase64("test.png");
// 	const res = await sendImageToModel(image);
// 	res.choices.forEach((item) => {
// 		console.log(item.message);
// 	});
// }
// test();

async function test2() {
	const html = await getHTML(url);
	// console.log(html);
}
test2();
