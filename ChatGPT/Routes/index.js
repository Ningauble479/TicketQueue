// routes/index.js

const express = require('express');
const generateCode = require('./codeGenerator'); // Import the route handler for /generator
const { analyzeCode } = require('./analyzeCode.js');
const { analyzeCodebase } = require('./analyzeCodebase.js');

const router = express.Router();

// Define the generator route
router.use('/generate-code', generateCode);
router.use('/analyze-code', analyzeCode);
router.use('/analyze-codebase', analyzeCodebase);

module.exports = router;
