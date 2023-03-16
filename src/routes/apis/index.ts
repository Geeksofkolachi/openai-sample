import express, { Request, Response } from "express";
import * as openai from "openai";
import { ChatCompletionRequestMessageRoleEnum } from "openai";

const router = express.Router();
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
    content: "write blog on these keywords",
  },
  {
    role: ChatCompletionRequestMessageRoleEnum.System,
    content: "article must contain atleast 4 headings",
  },

  // {
  //   role: ChatCompletionRequestMessageRoleEnum.System,
  //   content:
  //     "We are writing article to gain engagements for our software house",
  // },
  // {
  //   role: ChatCompletionRequestMessageRoleEnum.System,
  //   content: "Name of our software house is Geeks Of Kolachi",
  // },
  // {
  //   role: ChatCompletionRequestMessageRoleEnum.System,
  //   content:
  //     "Geeks Of Kolachi is a US based tech startup which helps startup to scale their application to the next level",
  // },
  // {
  //   role: ChatCompletionRequestMessageRoleEnum.System,
  //   content:
  //     "We offer Web/Mobile Application development, Custom Software solutions, Graphic designing",
  // },
  {
    role: ChatCompletionRequestMessageRoleEnum.System,
    content:
      "write the heading and wrap that with h1 tag and paragragh with p tag",
  },

  {
    role: ChatCompletionRequestMessageRoleEnum.System,
    content:
      "write the conclusion, Geeks of kolachi is a software companies helping startups to scale their application to the next level",
  },
];

router.post("/", async (req: Request, res: Response) => {
  const query = req.body.query;
  //   const completion = await openaiApi.createCompletion({
  //     model: "text-davinci-003",
  //     prompt: query,
  //     temperature: 0.6,
  //     max_tokens: 1000,
  //   });
  messages.push({
    role: ChatCompletionRequestMessageRoleEnum.User,
    content: query,
  });
  try {
    const completion = await openaiApi.createChatCompletion({
      model: "gpt-3.5-turbo-0301",
      messages: messages,
      temperature: 0.6,
      max_tokens: 1000,
    });
    let data = completion.data || "";
    res.status(200).send(data?.choices?.[0]?.message?.content || "");
  } catch (err) {
    console.log({ err });
    res.status(502).send("ERROR");
  }
});

export default router;
