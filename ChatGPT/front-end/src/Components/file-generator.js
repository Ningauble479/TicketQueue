import React, { useState } from 'react';
import axios from 'axios';

const FileGenerator = () => {
  const [fileDataArray, setFileDataArray] = useState([{ fileName: '', directory: '', prompt: '' }]);
  const [status, setStatus] = useState('');

  const handleChange = (index, key, value) => {
    const updatedFiles = [...fileDataArray];
    updatedFiles[index][key] = value;
    setFileDataArray(updatedFiles);
  };

  const addFile = () => {
    setFileDataArray([...fileDataArray, { fileName: '', directory: '', prompt: '' }]);
  };

  const handleGenerateFiles = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/generate-files', { fileDataArray });
      setStatus(response.data);
    } catch (error) {
      console.error('Error generating files:', error);
      setStatus('An error occurred.');
    }
  };

  return (
    <div>
      {fileDataArray.map((file, index) => (
        <div key={index}>
          <input
            placeholder="File Name"
            value={file.fileName}
            onChange={(e) => handleChange(index, 'fileName', e.target.value)}
          />
          <input
            placeholder="Directory Path"
            value={file.directory}
            onChange={(e) => handleChange(index, 'directory', e.target.value)}
          />
          <textarea
            placeholder="Prompt"
            value={file.prompt}
            onChange={(e) => handleChange(index, 'prompt', e.target.value)}
          />
        </div>
      ))}
      <button onClick={addFile}>Add File</button>
      <button onClick={handleGenerateFiles}>Generate Files</button>
      <p>Status: {status}</p>
    </div>
  );
};

export default FileGenerator;
