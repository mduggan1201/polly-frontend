import './App.css';
import InputTextBox from './component/InputTextBox';
import Header from './component/Header'
import AudioList from './component/AudioTable';

function App() {
  return (
    <div className="App">
      <Header className="Header" />
      <InputTextBox className="InputTextBox" />
      <AudioList className="AudioList" />
    </div>
  );
}

export default App;
