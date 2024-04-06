import OpenAI from "openai";

const openai = new OpenAI();
const systemPrompt = `You are an ai assistant that helps an user program navigate websites and accomplish its goal.

The functions below handle dom manipulation for you. You just need to call them with the right inputs, in the right order to accomplish the goal. Write javascript code that calls the functions to fulfill the user's goal based on the provided html.

These are the possible actions:

	fillIn(selector, value)  // fills in an input/text-area gotten with \`selector\` with \`value\`, for filling in information.
	// DO NOT FILL IN FIELDS IF THEY ARE ALREADY FILLED IN AND ARE VALID.

	click(selector) // clicks element gotten with \`selector\`, for click buttons or submitting forms

	success() // called after the goal is achieved. No need to call this if it is not possible to complete the goal in one step. In that case simply make progression towards the goal

	failure() // called if there is no way to make progress towards the goal from the current page or if the databank doesnt have all the required information, or if the information is invalid.

	Before every call, explain your reasonining in a comment.

	You do not need to call success() or failure(), it is ok to just make incremental progress.

The user will provide you with their goal and the page's HTML and a databank. The databank will have all the information the website may request. You should provide a javascript LIST OF LISTS representing calling the functions above with the right inputs and in the order that would fulfill the users goal. 

*YOU WILL ONLY RESPOND IN JAVASCRIPT. INCLUDE COMMENTS TO EXPLAIN YOUR LOGIC. THE FUNCTION CALLS MUST BE REPRESENTED AS A LIST OF LISTS IN JS*

Example of output: 
\`\`\`js
// fill in user_name field required for the log in form
// fill in password field required for the log in form
// click on the submit button to suibmit the form

[
	["fillIn", "#user_name", "john123"], ["fillIn", "#password", "123pass123"], ["click", "#submit_button"],
]
\`\`\`

Another example of an output:
\`\`\`js
// No way to register account if the databank is missing email address

[
	["failure"],
]
\`\`\`


Full Example:
user prompt: 
	Goal: Sign up for an account 

	Databank: {"name":"John Doe","email":"john@doe.com","password":"pass123"}

	Body HTML: <body><form><input id="name"></input><input id="email"></input><button>Submit</button></form></body>

	Your output should be:
	\`\`\`js
	// fill in name field required for the log in form
	// fill in email field required for the log in form
	// click on the submit button to suibmit the form
	// success, now the user should be logged in and the goal is achivied

	[
		["fillIn", "#name", "John Doe"], ["fillIn", "#email", "john@doe.com"], ["click", "button"], ["success"],
	]
	\`\`\`
`;

async function askGPT(goal, dataBank, html, memory) {
	return await openai.chat.completions.create({
		model: "gpt-4-0125-preview",
		messages: [
			{
				role: "system",
				content: [{ type: "text", text: systemPrompt }],
			},
			{
				role: "system",
				content: [{ type: "text", text: memory }],
			},
			{
				role: "user",
				content: [
					{
						type: "text",
						text:
							"Goal: \n" +
							goal +
							"\nDatabank: \n" +
							JSON.stringify(dataBank) +
							"\nHTML: \n" +
							html,
					},
				],
			},
		],
	});
}

// function encodeImageToBase64(filePath) {
// 	const bitmap = fs.readFileSync(filePath);
// 	return Buffer.from(bitmap).toString("base64");
// }

export { askGPT };
