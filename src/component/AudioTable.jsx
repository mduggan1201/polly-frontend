import React, { useEffect, useState } from 'react';
import { getAudio } from "../utils/api"
import Button from '@mui/material/Button';
import RefreshIcon from '@mui/icons-material/Refresh';
import styled from "styled-components";
import { TableRow, TableCell, TableHead, TableBody, Paper, TableContainer, Table } from '@mui/material';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';

const AudioList = () => {

  const [audioList, setAudioList] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = React.createRef();

  useEffect(() => {
    getAudio()
    .then((res) => {
        const audio = JSON.parse(res.body).keys
        setAudioList(audio);
        setIsLoading(false)
        setIsRefreshing(false)
    })
  }, [isRefreshing]) 

  const handleRefreshClick = () => {
    setIsRefreshing(true)
    setAudioList()
  }

  if(isLoading) return(
                <Button
                component="label"
                variant="contained"
                startIcon = {<RefreshIcon/>}
                onClick={() => handleRefreshClick()}
                disabled={true}
              > Loading...
              </Button>
          )

  if(!audioList) return (<AudioListContainer>
            <p>No Audio Found</p>
            <Button
            component="label"
            variant="contained"
            startIcon = {<RefreshIcon/>}
            onClick={() => handleRefreshClick()} 
          > No Audio Found
          </Button>
          </AudioListContainer>
  )

  const audioURL = "https://aws-innovation-day-sound-files.s3.eu-west-1.amazonaws.com/"

  const handleOnClick = () => {
    const audioElement = audioRef.current;
  
    if(isPlaying) {
      audioElement.pause();
    } else {
      audioElement.play();
    }

    setIsPlaying(!isPlaying);
  }


return(
  <AudioListContainer>
      <TableHeader>
        <Button
            component="label"
            variant="contained"
            startIcon = {<RefreshIcon/>}
            onClick={() => handleRefreshClick()} 
          >
            Refresh Data
          </Button>
        </TableHeader>

  <TableContainer component ={Paper}>
    <Table sx={{minWidth: 600}} size = "small">
      <TableHead>
        <TableRow>
          <TableCell> File Name</TableCell>
          <TableCell align="right"> Play/Pause</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {audioList.map((audio) => (
              <TableRow
                key={audio}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {audio}
                </TableCell>
                <TableCell align="right">
                  <Button
                  component="label"
                  variant="contained"
                  startIcon={<PlayCircleIcon />}
                  onClick={() => handleOnClick()}
                  >
                  {isPlaying ? 'Pause' : 'Play'}
                  </Button>
                  <audio ref={audioRef}>
                    <source src={`${audioURL}${audio}`} type="audio/mp3" />
                  </audio>
                </TableCell>
              </TableRow>
            ))}
      </TableBody>
    </Table>
  </TableContainer>


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
max-width: 620px;
margin: 0 auto;
background: rgba( 255, 255, 255, 0.1 );
background-color: #f5f5f5;
border: 1px solid rgba( 255, 255, 255, 0.18 );
border-radius: 10px;
box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
backdrop-filter: blur( 20px );
-webkit-backdrop-filter: blur( 20px );
`
const TableHeader = styled.div`
display: flex;
justify-content: center;
width: 99%;
margin-bottom: 10px; 
text-align:centre;
padding-top: 10px;
background-color: #f5f5f;
border-radius: 5px;
`;
