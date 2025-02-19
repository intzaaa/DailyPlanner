import fs from "fs";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: "",
  baseURL: "https://api.chatanywhere.tech",
});

async function extractCalendarParameters(icsContent: string): Promise<string> {
  const prompt =
    `Please extract calendar parameters from the following ICS file content, such as event name, start time, end time, location, etc., and return in JSON format:
    
${icsContent}`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0,
    });
    return response.choices[0]?.message?.content ||
      "No valid response received";
  } catch (error) {
    console.error("LLM request error:", error);
    throw error;
  }
}

async function main() {
  try {
    const icsFilePath = "./test.ics";
    const icsContent = fs.readFileSync(icsFilePath, "utf-8");

    const extractedParameters = await extractCalendarParameters(icsContent);
    console.log("Extracted calendar parameters:", extractedParameters);
  } catch (error) {
    console.error("Program error:", error);
  }
}

main();
