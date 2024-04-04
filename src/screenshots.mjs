import { webkit } from "playwright";

const getScreenshot = async (url) => {
	const browser = await webkit.launch({
		headless: process.env.PROD === "TRUE",
	});
	const page = await browser.newPage();
	await page.setViewportSize({ width: 1920, height: 1080 });
	await page.goto(url);
	const screenshot = await page.screenshot({
		fullPage: true,
		path: "test.png",
	});
	await browser.close();
	return screenshot;
};

export { getScreenshot };
