import { Request, Response } from "express";
import * as openai from "openai";
import { ChatCompletionRequestMessageRoleEnum } from "openai";

const configuration = new openai.Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openaiApi = new openai.OpenAIApi(configuration);

const messages: {
  role: ChatCompletionRequestMessageRoleEnum;
  content: string;
}[] = [
  {
    role: ChatCompletionRequestMessageRoleEnum.System,
    content: "write a summary",
  },
];

export const summaryGeneration = async (req: Request, res: Response) => {
  const ocrContent = req.body.ocrContent;
  messages.push({
    role: ChatCompletionRequestMessageRoleEnum.User,
    content: ocrContent,
  });
  try {
    const completion = await openaiApi.createChatCompletion({
      model: process.env.CHAT_GPT_MODEL ?? "gpt-3.5-turbo-0301",
      messages: messages,
      temperature: 0.6,
      max_tokens: Number(process.env.CHAT_GPT_MAX_TOKENS) ?? 1000,
    });
    let data = completion.data || "";
    res.status(200).send(data?.choices?.[0]?.message?.content || "");
  } catch (err) {
    console.log({ err });
    res.status(502).send("ERROR");
  }
};
