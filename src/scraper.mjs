import { webkit } from "playwright";
import { readFileSync, writeFileSync } from "fs";

const getHTML = async (url) => {
	const browser = await webkit.launch({
		headless: process.env.PROD === "TRUE",
	});
	const page = await browser.newPage();
	await page.setViewportSize({ width: 1800, height: 1000 });
	await page.goto(url);
	// await page.waitForTimeout(2000);
	// await page.locator("#txtUserID").fill("hello ngr");
	// let hi2 = await page.locator("#txtUserID").inputValue();

	// console.log(hi2, "yoo");
	// await fillIn(page, "#txtUserID", "sdfsdfsd");
	// await fillIn(page, "#txtPassword", "dsDF32?df");
	// await fillIn(page, "#txtPasswordConfirm", "dsDF32?df");
	// await fillIn(page, "#txtFirstName", "john");
	// await fillIn(page, "#txtLastName", "doe");
	// await fillIn(page, "#txtSSN", "1234");
	// await fillIn(page, "#txtPrimaryEmail", "dsfsd@gmail.com");
	// await fillIn(page, "#txtPrimaryEmailConfirm", "dsfsd@gmail.com");
	// await fillIn(page, "#txtPhoneNum", "1234567890");
	const src = readFileSync("src/domUtils.js", "utf8");
	await page.addScriptTag({ content: src });
	let tree = await page.evaluate(() => buildTreeFromBody());
	writeFileSync("./output.txt", JSON.stringify(tree));
	const htmlContent = await page.content();
	// await browser.close();
	return htmlContent;
};
() => {
	Hello();
};
async function fillIn(page, selector, value) {
	await page.locator(selector).fill(value);
}

export { getHTML };
