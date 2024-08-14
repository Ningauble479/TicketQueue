const axios = require('axios');

const analyzeCode = async (code) => {
  const openaiApiKey = process.env.OPENAI_API_KEY; // Retrieve the OpenAI API key from environment variables
  const openaiEndpoint = 'https://api.openai.com/v1/engines/gpt-4o-mini/completions'; // Update with the OpenAI endpoint
  const prompt = `Analyze the provided code: ${code}`; // Construct a prompt for code analysis

  try {
    const response = await axios.post(openaiEndpoint, {
      prompt: prompt,
      api_key: openaiApiKey,
      // Add any other parameters required by the OpenAI API
    });
    return response.data;
  } catch (error) {
    console.error('Error analyzing code with OpenAI:', error);
    throw error;
  }
};

module.exports = { analyzeCode };