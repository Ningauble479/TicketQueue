import logo from './logo.svg';
import './App.css';
import FileGenerator from './Components/file-generator';
import FolderSelector from './Components/folder-selector';

function App() {
  return (
    <div className="App">
      <FileGenerator/>
      <FolderSelector />
    </div>
  );
}

export default App;
