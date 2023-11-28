const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const { OpenAI } = require("openai");

const openai = new OpenAI({
    apiKey: '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',
  });

// Set up server
const app = express();
app.use(bodyParser.json());
app.use(cors());

// Endpoint for GPT
app.post("/chat", async (req, res) => {
    const { prompt } = req.body;

    const completion = await openai.createCompletion({
        model: 'gpt-3.5-turbo',
        max_tokens: 250,
        temperature: 0,
        prompt: prompt,
    })

    res.send(completion.data.choices[0].text);
})

const port = 5000;
app.listen(port, ()=> {
    console.log(`Server listening on ${port}`);
})