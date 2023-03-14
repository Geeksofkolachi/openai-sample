const express = require('express');
const { Configuration, OpenAIApi } = require("openai");



const router = express.Router();
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

router.post('/', async (req, res) => {
    const query = req.body.query;
    const completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: query,
        temperature: 0.6,
        max_tokens: 1000
    });
    let data = completion.data.choices[0].text || ''

    console.log({ d: completion.data.choices })
    res.status(200).json({ result: data });
});

module.exports = router;
