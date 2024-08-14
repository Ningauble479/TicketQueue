const express = require('express');
const fs = require('fs');
const path = require('path');
const OpenAI = require('openai');

const app = express();
const port = 3000;

// Set up OpenAI API configuration
const openAI = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Set your API key
});

app.use(express.urlencoded({ extended: true }));

// Serve the HTML form
app.get('/', (req, res) => {
  res.send(`
    <form action="/create-file" method="POST">
      <label for="filename">Filename:</label><br>
      <input type="text" id="filename" name="filename" required><br><br>
      
      <label for="directory">Directory Path (relative to project root):</label><br>
      <input type="text" id="directory" name="directory" value="./" required><br><br>
      
      <label for="prompt">Prompt:</label><br>
      <textarea id="prompt" name="prompt" rows="4" cols="50" required></textarea><br><br>
      
      <input type="submit" value="Create File">
    </form>
  `);
});

// Handle form submission
app.post('/create-file', async (req, res) => {
  const { filename, directory, prompt } = req.body;

  // Resolve the full path to ensure it's within the project directory
  const filePath = path.resolve(__dirname, directory, filename);

  try {
    // Create the directory if it doesn't exist
    fs.mkdirSync(path.dirname(filePath), { recursive: true });

    // Call OpenAI's API to generate content
    const response = await openAI.createCompletion({
      model: 'text-davinci-003',
      prompt: prompt,
      max_tokens: 150, // Adjust this as needed
    });

    // Extract the generated text
    const generatedText = response.data.choices[0].text.trim();

    // Write the generated text to the file
    fs.writeFileSync(filePath, generatedText);
    res.send(`File '${filename}' created and saved in '${directory}'.<br><a href="/">Create another file</a>`);
  } catch (error) {
    console.error('Error generating content:', error);
    res.send('An error occurred. Please try again.');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
