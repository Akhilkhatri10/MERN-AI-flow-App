import express from 'express';
import axios from 'axios';
import Prompt from '../models/Prompt.js';

const router = express.Router();

// Ask AI
router.post('/ask-ai', async (req, res) => {
    try {
        const { prompt } = req.body;

        const response = await axios.post(
            'https://openrouter.ai/api/v1/chat/completions',
            {
                model: "meta-llama/llama-3-8b-instruct",
                messages: [{ role: "user", content: prompt }]
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        const aiText = response.data.choices[0].message.content;

        res.json({ response: aiText });

    } catch (err) {
        console.log("FULL ERROR:", err.response?.data || err.message);
        res.status(500).json({ error: "AI request failed" });
    }
});


// Save Data
router.post('/save', async (req, res) => {
    const { prompt, response } = req.body;

    const saved = await Prompt.create({ prompt, response });

    res.json(saved);
});

export default router;