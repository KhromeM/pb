import OpenAI from "openai";

const openai = new OpenAI();

async function sendImageToModel(content) {
	content = format(content);
	return await openai.chat.completions.create({
		model: "gpt-4-vision-preview",
		messages: [
			{
				role: "system",
				content: content,
			},
		],
	});
}

const content = [
	{ type: "text", text: "What website is this?" },
	{
		type: "image_url",
		image_url: {
			url: `data:image/png;base64,${base64_image}`,
		},
	},
];

const format = (content) => {
	const ans = [];
	for (const obj of content) {
		if (obj.type === "text") {
			ans.push({
				type: "text",
				text: obj.text,
			});
		} else if (obj.type === "image") {
			ans.push({
				type: "image_url",
				url: `data:image/png;base64,${encodeImageToBase64(obj.imagePath)}`,
			});
		}
	}
	return ans;
};

function encodeImageToBase64(filePath) {
	const bitmap = fs.readFileSync(filePath);
	return Buffer.from(bitmap).toString("base64");
}

export { sendImageToModel };
