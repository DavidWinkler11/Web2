import { useState } from 'react';
import DOMPurify from 'dompurify';
import './styles.css';


const XSSInjection = () => {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [isChecked, setIsChecked] = useState(false);


  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleOutputClick = () => {
    console.log(inputText);
    if (isChecked) {
      setOutputText(inputText);
    }
    else {
      const sanitizedInput = DOMPurify.sanitize(inputText);
      console.log(sanitizedInput);
      setOutputText(sanitizedInput);
    }
  };

  return (
    <div className="container">
      <h1>XSS Vulnerability Demo</h1>
      <div className="input-container">
        <label>
          Input Text:
          <input type="text" value={inputText} onChange={handleInputChange} />
        </label>
      </div>
      <button onClick={handleOutputClick}>Generate Output</button>
      <div className="checkbox-container">
        <label>
          <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
          Enable XSS injection
        </label>
      </div>
      <h2>Output:</h2>
      <div className="output-container" dangerouslySetInnerHTML={{ __html: outputText }} />
    </div>
  );
};

export default XSSInjection;