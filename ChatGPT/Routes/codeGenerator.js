const { createAndFillFiles } = require('./fileUtils');

const generateCode = (req, res) => {
    console.log(req.body)
    const fileDataArray = req.body.fileDataArray; // Assuming fileDataArray is included in the request body
  
    if (!fileDataArray || !Array.isArray(fileDataArray)) {
      return res.status(400).send('Invalid file data array.');
    }
  
    try {
      createAndFillFiles(fileDataArray);
      res.status(200).send('Files created and filled with generated JavaScript code.');
    } catch (error) {
      console.error('Error generating files:', error);
      res.status(500).send('An error occurred.');
    }
  };

  module.exports = generateCode