import { webkit } from "playwright";

const getHTML = async (url) => {
	const browser = await webkit.launch({
		headless: process.env.PROD === "TRUE",
	});
	const page = await browser.newPage();
	await page.setViewportSize({ width: 1920, height: 1080 });
	await page.goto(url);
	const htmlContent = await page.content();
	await browser.close();
	return htmlContent;
};

export { getHTML };
