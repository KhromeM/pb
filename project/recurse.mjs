import dotenv from "dotenv";
dotenv.config();
import {
	getBodyHTML,
	getBrowserAndPage,
	fillIn,
	click,
} from "../src/scraper.mjs";
import { writeFileSync } from "fs";
import { askGPT } from "../src/openai_api.mjs";

let url =
	"https://eddservices.edd.ca.gov/acctservices/AccountManagement/AccountServlet?Command=NEW_SIGN_UP";
url = "https://codeforces.com/register";
url = "https://old.reddit.com";

const start = async () => {
	let step = 1;
	let memory =
		"This is a history of actions you have tried. Learn from the past. Memory: (if empty, then you havent tried anything yet)\n";
	const goal = "log in";
	const dataBank = {
		possible_usernames: [
			"isthi4l1",
			"dsf234W",
			"34sed2",
			"5234sfsed",
			"fsdfsWWWT",
		],
		password: ["234!!dfsdd123!", "ps2340123", "P@s345d321!"],
		first_name: "John",
		last_name: "Doe",
		pin: "1234",
		possible_emails: [
			"isWED12sreal1@gmail.com",
			"j325234de@gmail.com",
			"j234hd3de@gmail.com",
			"j234hde@gmail.com",
		],
		phone_number: "412-444-1234",
	};
	const { page, browser } = await getBrowserAndPage(url);
	while (!completed) {
		const html = await getBodyHTML(page);
		const response = await askGPT(goal, dataBank, html, memory);
		const message = response["choices"][0]["message"]["content"];
		console.log(response.usage);
		memory += "\nStep: " + step + "\nResponse: \n" + message;
		console.log("\nStep: " + step + "\nResponse: \n" + message);
		let todo = eval(message.slice(5, -3));
		await execute_steps(todo, page);
		step++;
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
		try {
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
		} catch (error) {
			// send error to gpt
			console.error(error);
		}

		// await sleep(3000);
	}
}

function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

start();
