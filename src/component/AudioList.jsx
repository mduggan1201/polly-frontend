import { useEffect, useState } from 'react';
import { getAudio } from "../utils/api"
import Button from '@mui/material/Button';
import RefreshIcon from '@mui/icons-material/Refresh';
import AudioCard from './AudioCard';

const AudioList = () => {

  const [audioList, setAudioList] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)

  useEffect(() => {
    getAudio()
    .then((res) => {
        const audio = res.body.keys
        setAudioList(audio);
        setIsLoading(false)
        setIsRefreshing(false)
    })
  }, [isRefreshing])

  const handleOnClick = () => {
    setIsRefreshing(true)
  }

  if(isLoading) return(<div>
              <p>Loading Audio List...</p>
                <Button
                component="label"
                variant="contained"
                startIcon = {<RefreshIcon/>}
                onClick={() => handleOnClick()} 
              >
              </Button>
            </div>
          )

  if(audioList.length === 0 | !audioList) return (<div>
            <p>No Audio Found</p>
            <Button
            component="label"
            variant="contained"
            startIcon = {<RefreshIcon/>}
            onClick={() => handleOnClick()} 
          >
          </Button>
          </div>
  )

return(
  <div>
      <label>Audio</label>
      <ul>
          {audioList.map((audio) => {
              return( <AudioCard audio = {audio} />
              )
          })}
      </ul>
      <Button
            component="label"
            variant="contained"
            startIcon = {<RefreshIcon/>}
            onClick={() => handleOnClick()} 
          >
          </Button>

  </div> 
)
}

export default AudioList