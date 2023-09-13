import React, { useState } from 'react';
import { postAudio } from "../utils/api";
import Button from '@mui/material/Button';
import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import styled from "styled-components";

const InputTextBox = () => {
  const [inputText, setInputText] = useState('');
  const [talkFast, setTalkFast] = useState(false)

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleCheckbox = () => {
    setTalkFast(!talkFast)
  }

  const handlePostAudio = () => {
    console.log(`Sending Post Request for ${inputText}`)
    postAudio(inputText, talkFast)
    .then(setInputText(""))
    .catch((err) => {
      console.log(err.response.data)
    })
  }

  return (
    <InputContainer>
      <input
        type="text"
        placeholder="Enter text here"
        value={inputText}
        onChange={handleInputChange}
      />
      <Button 
      onClick={handlePostAudio}
      variant="contained"
      >
        Post Audio
      </Button>
      <FormGroup>
      <FormControlLabel control = {<Checkbox onChange={handleCheckbox} />}  label="Speak Fast" />
      </FormGroup>
      
    
    </InputContainer>
  );
}; 

export default InputTextBox;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding: 10px;
  background-color: #f5f5f5;
  border: 1px solid #ccc;
  border-radius: 24px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`
