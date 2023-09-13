import React, { useState } from 'react';

const InputTextBox = () => {
  const [inputText, setInputText] = useState('');

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const postAudio = () => {
    console.log(`Sending Post Request for ${inputText}`)

    
    postAudio(inputText)
    .then(setInputText(""))
    .catch((err) => {
      console.log(err.response.data.msg)
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
      <button onClick={postAudio}>Post Audio</button>
    </div>
  );
}; 

export default InputTextBox;
 