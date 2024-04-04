import OpenAI from "openai";

const openai = new OpenAI();

async function sendImageToModel(base64_image) {
	return await openai.chat.completions.create({
		model: "gpt-4-vision-preview",
		messages: [
			{
				role: "user",
				content: [
					{ type: "text", text: "What website is this?" },
					{
						type: "image_url",
						image_url: {
							url: `data:image/png;base64,${base64_image}`,
						},
					},
				],
			},
		],
	});
}

export { sendImageToModel };
