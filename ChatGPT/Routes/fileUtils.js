const fs = require('fs');
const OpenAI = require('openai');

// Initialize the OpenAI API client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Set your API key
});

async function createAndFillFiles(fileDataArray) {
  try {
    for (const { directory, fileName, prompt } of fileDataArray) {
      const filePath = `${directory}/${fileName}.js`; // Construct the full file path with the ".js" extension

      // Modify the prompt to instruct the model to provide only code
      const jsPrompt = `Write only the plain JavaScript code for the following task. Do not include any markdown formatting, comments, or explanations:\n\n${prompt}`;

      // Use the OpenAI API's chat completions to generate JavaScript code
      const response = await openai.chat.completions.create({
        model: 'gpt-4o-mini', // or another model like 'gpt-4'
        messages: [{ role: 'user', content: jsPrompt }],
        max_tokens: 150,
      });

      const generatedText = response.choices[0].message.content.trim();
      fs.writeFileSync(filePath, generatedText);
      console.log(`File '${filePath}' created and filled with generated JavaScript code.`);
    }
  } catch (error) {
    console.error('Error generating content:', error);
    throw error;
  }
}

// Define an array containing directory, file name (without extension), and prompts for each file
const fileDataArray = [
  // Add more file data objects as needed
];

// Call the function with the array of file data
createAndFillFiles(fileDataArray);

module.exports = { createAndFillFiles };
