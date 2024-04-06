import dotenv from "dotenv";
dotenv.config();
import {
	getPageHTML,
	getBrowserAndPage,
	fillIn,
	click,
} from "../src/scraper.mjs";
import { askGPT } from "../src/openai_api.mjs";

const url =
	"https://eddservices.edd.ca.gov/acctservices/AccountManagement/AccountServlet?Command=NEW_SIGN_UP";

const start = async () => {
	let step = 1;
	const goal = "Log in";
	const dataBank = {
		username: "isthisreal1",
		password: "Password123!",
		first_name: "John",
		last_name: "Doe",
		pin: "1234",
		email: "isthisreal1@gmail.com",
		phone_number: "412-444-1234",
	};
	const { page, browser } = await getBrowserAndPage(url);
	while (!completed) {
		const html = await getPageHTML(page);
		const response = await askGPT(goal, dataBank, html);
		const message = response["choices"][0]["message"]["content"];
		console.log(response.usage);
		// console.log(response.choices);
		console.log("\nStep: " + step + "\nResponse: \n" + message);
		await sleep(1000);
		let todo = eval(message.slice(5, -3));
		await execute_steps(todo, page);
		await sleep(1000);
	}
	browser.close();
};
let completed = false;
const failure = () => {
	completed = true;
	console.log("Failed to complete goal");
};
const success = () => {
	completed = true;
	console.log("Completed goal");
};
async function execute_steps(steps, page) {
	for (const step of steps) {
		if (step[0] === "fillIn") {
			await fillIn(page, step[1], step[2]);
		}
		if (step[0] === "click") {
			await click(page, step[1], step[2]);
		}
		if (step[0] === "success") {
			success();
		}
		if (step[0] === "failure") {
			failure();
		}
	}
}

function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

start();
