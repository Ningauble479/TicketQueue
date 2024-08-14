// CodebaseAnalyzer.js
import React, { useState } from 'react';

const CodebaseAnalyzer = () => {
    const [rootFolder, setRootFolder] = useState('');

    const handleFileChange = (event) => {
        setRootFolder(event.target.value);
    };

    const handleAnalysis = async () => {
        const response = await fetch('/analyze-codebase', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ rootFolder })
        });
        const data = await response.json();
        console.log(data);
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleAnalysis}>Analyze Codebase</button>
        </div>
    );
};

export default CodebaseAnalyzer;