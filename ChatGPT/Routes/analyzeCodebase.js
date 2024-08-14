const fs = require('fs');
const { analyzeCode } = require('./analyzeCode'); // Import a function for code analysis using OpenAI

const rootFolder = '/path/to/codebase'; // Update with the root folder of your codebase
let codebaseString = '';

// Read files from the root of the codebase
function readCodebase(rootFolder) {
  const files = fs.readdirSync(rootFolder);
  files.forEach((file) => {
    const filePath = `${rootFolder}/${file}`;
    const stats = fs.statSync(filePath);
    if (stats.isDirectory()) {
      readCodebase(filePath); // Recursively read subdirectories
    } else if (stats.isFile() && file.endsWith('.js')) {
      const fileContent = fs.readFileSync(filePath, 'utf8');
      codebaseString += `\n// File: ${file}\n\n${fileContent}\n\n`;
    }
  });
}

// Analyze the concatenated codebase string
function analyzeCodebase() {
  readCodebase(rootFolder); // Read codebase files into codebaseString

  // Call the analyzeCode function with the concatenated codebase string
  analyzeCode(codebaseString)
    .then((analysisResult) => {
      console.log('Codebase Analysis Result:', analysisResult);
    })
    .catch((error) => {
      console.error('Error analyzing codebase:', error);
    });
}

module.exports = { analyzeCodebase }