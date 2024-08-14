import React, { useEffect, useState } from 'react';
import axios from 'axios';
const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;

const FolderSelector = () => {
    const [folderPath, setFolderPath] = useState('');

    const openFolderDialog = async () => {
        const result = await ipcRenderer.invoke('open-folder-dialog');
        setFolderPath(result.filePaths[0]);
    };

    useEffect(()=>{
        callDB()
    },[folderPath])

    const callDB = async () => {
        const response = await axios.post('http://localhost:3000/api/analyze-codebase', { folderPath });

        console.log(response)
    }

    return (
        <div>
            <button onClick={openFolderDialog}>Select Folder</button>
            <p>Selected Folder: {folderPath}</p>
        </div>
    );
};

export default FolderSelector;