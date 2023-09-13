import React, { useState } from "react";
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';

const AudioCard = ({ audio }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = React.createRef();

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
    <div className="audioCard">
    <Card>
      <CardContent>
        <p>{audio}</p>
        <Button
          component="label"
          variant="contained"
          startIcon={<PlayCircleIcon />}
          onClick={() => handleOnClick()}
        >
          {isPlaying ? 'Pause' : 'Play'}
        </Button>
        <audio ref={audioRef}>
          <source src={`${audioUrl}${audio}`} type="audio/mp3" />
        </audio>
      </CardContent>
    </Card>
  </div>
  )
}

export default AudioCard