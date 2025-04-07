import axios from 'axios';
import { API_KEY } from '@env';

const questionHistory = {
  friends: new Set(),
  lovers: new Set(),
  coworkers: new Set(),
  family: new Set(),
  default: new Set() // For any relationship type not listed
};

export const generateQuestionsWithAI = async (relationship, depth, count = 5) => {
  try {
    if (!API_KEY) {
      console.error('API Key is missing');
      throw new Error('OpenAI API key is not configured');
    }

    const relationshipKey = relationship.toLowerCase();
    const historyKey = questionHistory[relationshipKey] ? relationshipKey : 'default';
    const seen = Array.from(questionHistory[historyKey] || []);

    console.log(`Generating ${count} ${depth} questions for ${relationship}...`);
    console.log(`Avoiding ${seen.length} previously seen questions`);

    const timestamp = new Date().getTime();
    const randomSeed = Math.floor(Math.random() * 10000);

    const requestCount = Math.min(count * 3, 15);

    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are an assistant that generates unique, creative conversation starter questions. " +
                     "Every time you're asked, generate completely different questions than before. Be creative, " +
                     "thoughtful, and varied in your questions."
          },
          {
            role: "user",
            content: `Generate ${requestCount} unique and creative ${depth} questions for ${relationship}. Each question should
                      be distinct - avoid variations of the same question. Mix up formats, topics, and approaches.
                      Current timestamp: ${timestamp}
                      Random seed: ${randomSeed} Return them in a JSON format with a 'questions' array containing strings.`
          }
        ],
        temperature: 1.2,
        presence_penalty: 1.0,
        frequency_penalty: 1.0,
        response_format: { type: "json_object" }
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`
        }
      }
    );

    console.log("OpenAI response received");

    const content = response.data.choices[0].message.content;
    const parsedData = JSON.parse(content);
    const allQuestions = parsedData.questions || [];
    const newQuestions = allQuestions.filter(q => !questionHistory[historyKey].has(q));

    let selectedQuestions = newQuestions.slice(0, count);
    if (selectedQuestions.length < count) {
      const remainingNeeded = count - selectedQuestions.length;
      const remainingQuestions = allQuestions.filter(q => !newQuestions.includes(q)).slice(0, remainingNeeded);
      selectedQuestions = [...selectedQuestions, ...remainingQuestions];
    }

    selectedQuestions.forEach(q => {
      if (!questionHistory[historyKey]) {
        questionHistory[historyKey] = new Set();
      }
      questionHistory[historyKey].add(q);
    });

    if (questionHistory[historyKey].size > 50) {
      const historyArray = Array.from(questionHistory[historyKey]);
      questionHistory[historyKey] = new Set(historyArray.slice(historyArray.length - 50));
    }

    return selectedQuestions;
  } catch (error) {
    console.error('Error generating questions with AI:', error);
    throw error;
  }
};