import fs from 'fs';
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: "", 
    baseURL:"https://api.chatanywhere.tech",
});

async function extractCalendarParameters(icsContent: string): Promise<string> {
    const prompt = `请从下面的ICS文件内容中提取日历参数，如事件名称、开始时间、结束时间、地点等，并以JSON格式返回：
    
${icsContent}`;

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: 'user', content: prompt }],
            temperature: 0,
        });
        return response.choices[0]?.message?.content || '未收到有效响应';
    } catch (error) {
        console.error('LLM请求出错：', error);
        throw error;
    }
}

async function main() {
    try {
        const icsFilePath = './test.ics'; 
        const icsContent = fs.readFileSync(icsFilePath, 'utf-8');

        const extractedParameters = await extractCalendarParameters(icsContent);
        console.log('提取的日历参数：', extractedParameters);
    } catch (error) {
        console.error('程序出错：', error);
    }
}

main();