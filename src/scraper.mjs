import { webkit } from "playwright";
import { readFileSync, writeFileSync } from "fs";

const getBrowserAndPage = async (url) => {
	const browser = await webkit.launch({
		headless: process.env.PROD === "TRUE",
	});
	const page = await browser.newPage();
	await page.goto(url);
	return { page, browser };
};

const getPageHTML = async (page) => {
	await page.waitForTimeout(300);
	const htmlContent = await page.content();
	return htmlContent;
};

async function fillIn(page, selector, value) {
	await page.locator(selector).fill(value);
}

async function click(page, selector) {
	await page.locator(selector).click();
}

export { getPageHTML, getBrowserAndPage, fillIn, click };

// await page.setViewportSize({ width: 1800, height: 1000 });
// const src = readFileSync("src/domUtils.js", "utf8");
// await page.addScriptTag({ content: src });
// let tree = await page.evaluate(() => buildTreeFromBody());
// writeFileSync("./output.txt", JSON.stringify(tree));
