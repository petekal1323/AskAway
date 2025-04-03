import axios from 'axios';
const API_URL = 'https://api.openai.com/v1/chat/completions';

export const generateQuestions = async (relationship, DepthScreen, apiKey, count = 10) => {
    if (!apiKey) {
        throw new Error('API key is required');

    }

    try {
        // Construct the prompt based on relationship type and depth
        let prompt = `Generate ${count} unique ${depth.toLowerCase()} conversation questions for ${relationship.toLowerCase()}. `;

        if (depth === 'Light Hearted & Fun') {
            prompt += 'The questions should be casual, fun, and easy to answer. Focus on creating positive, engaging conversations.';
        } else if (depth === 'Thought-Provoking & Personal') {
            prompt += 'The questions should promote deep thinking, meaningful conversation, and personal reflection.';
        }

        const response = await axios.post(
            API_URL,
            {
                model: 'gpt-3.5-turbo',
                messages: [
                    {
                        role: 'system',
                        content: 'You are a helpful assistant specializing in creating conversation starters and ice breakers.'
                    },
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                temperature: 0.7,
                max_tokens: 1000
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`
                }
            }
        );

        const generatedText = response.data.choices[0].message.content;
        const questionRegex = /\d+\.\s+(.+?)(?=\d+\.|$)/gs;
        const matches = [...generatedText.matchAll(questionRegex)];

        const questions = matches.map(match => match[1].trim());

        return questions.length > 0 ? questions : [generatedText];
    } catch (error) {
        console.error('Error generating questions:', error);
        throw error;
    }
};
