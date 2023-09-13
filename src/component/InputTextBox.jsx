import React, { useState } from 'react';
import { postAudio } from "../utils/api"

const InputTextBox = () => {
  const [inputText, setInputText] = useState('');

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handlePostAudio = () => {
    console.log(`Sending Post Request for ${inputText}`)
    postAudio(inputText)
    .then(setInputText(""))
    .catch((err) => {
      console.log(err.response.data)
    })
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Enter text here"
        value={inputText}
        onChange={handleInputChange}
      />
      <button onClick={handlePostAudio}>Post Audio</button>
    </div>
  );
}; 

export default InputTextBox;
