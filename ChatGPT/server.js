const path = require('path');
const express = require('express');
const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // Define the upload 
const routes = require('./Routes')
const appExpress = express();
const port = 3000;

// Add middleware to parse JSON bodies
appExpress.use(express.json());

ipcMain.handle('open-folder-dialog', async (event) => {
  const result = await dialog.showOpenDialog({
      properties: ['openDirectory']
  });
  return result;
});

// Serve React build files
appExpress.use(express.static(path.join(__dirname, 'front-end', 'build')));

appExpress.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'front-end', 'build', 'index.html'));
});

appExpress.use('/generator', routes); // Mount the routes defined in routes/index.js under /generator

// Example configuration for handling file uploads with Multer
appExpress.post('/file-upload', upload.single('file'), (req, res) => {
  // Handle file upload logic
  const file = req.file;
  if (!file) {
    return res.status(400).send('No file uploaded.');
  }
  
  res.status(200).send('File uploaded successfully.');
});

appExpress.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  mainWindow.loadURL('http://localhost:3000');
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
