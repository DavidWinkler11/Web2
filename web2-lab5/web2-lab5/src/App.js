import React, { useState } from 'react';
import { ReactMic } from 'react-mic';
import './App.css'; 

const App = () => {
  const [isRecording, setIsRecording] = useState(false);

  const startRecording = () => {
    setIsRecording(true);
  };

  const stopRecording = () => {
    setIsRecording(false);
  };

  return (
    <div className="app-container">
      <h1>Microphone API</h1>
      <div className="sound-wave-container">
        <ReactMic
          record={isRecording}
          className="sound-wave"
          strokeColor="#000000"
          backgroundColor="#FFFF00"
        />
      </div>
      <div className="button-container">
        <button onClick={startRecording} disabled={isRecording}>
          Start
        </button>
        <button onClick={stopRecording} disabled={!isRecording}>
          Stop
        </button>
      </div>
    </div>
  );
};

export default App;