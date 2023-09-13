import { useEffect, useState } from 'react';
import { getAudio } from "../utils/api"
import Button from '@mui/material/Button';
import RefreshIcon from '@mui/icons-material/Refresh';
import AudioCard from './AudioCard';
import styled from "styled-components";

const AudioList = () => {

  const [audioList, setAudioList] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)

  useEffect(() => {
    getAudio()
    .then((res) => {
        const audio = JSON.parse(res.body).keys
        setAudioList(audio);
        setIsLoading(false)
        setIsRefreshing(false)
    })
  }, [isRefreshing]) 

  const handleOnClick = () => {
    setIsRefreshing(true)
    setAudioList()
  }

  if(isLoading) return(<AudioListContainer>
              <p>Loading Audio List...</p>
                <Button
                component="label"
                variant="contained"
                startIcon = {<RefreshIcon/>}
                onClick={() => handleOnClick()} 
              >
              </Button>
            </AudioListContainer>
          )

  if(!audioList) return (<AudioListContainer>
            <p>No Audio Found</p>
            <Button
            component="label"
            variant="contained"
            startIcon = {<RefreshIcon/>}
            onClick={() => handleOnClick()} 
          >
          </Button>
          </AudioListContainer>
  )

return(
  <AudioListContainer>
      <TableHeader>
        <HeaderText>Audio</HeaderText>
        <Button
            component="label"
            variant="contained"
            startIcon = {<RefreshIcon/>}
            onClick={() => handleOnClick()} 
          >
          </Button>
        </TableHeader>
      <ul>
          {audioList.map((audio) => {
              return( <AudioCard key = {audio} audio = {audio} />
              )
          })}
      </ul>


  </AudioListContainer> 
)
}

export default AudioList

const AudioListContainer = styled.div `
display: flex;
flex-direction: column;
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

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  align-items: left;
  justify-content: space-between;
  width: 99%;
  margin-bottom: 10px; 
  padding: 10px;
  background-color: #f5f5f5;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`;

const HeaderText = styled.div`
  flex: 1; /* Makes the text take up all available space in the header */
`;

