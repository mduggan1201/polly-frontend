import axios from 'axios'

const audioAPI = axios.create({
    baseURL: "https://polly.awsdev.feeds.skybet.com/api"
})

export const getAudio = () => {
  return audioAPI.get('/polly').then((res) => {
      return res.data
  })
}

export const postAudio = (inputText, speakFast) =>{
  return audioAPI.post('/polly', {"alertText": inputText, "speakFast": speakFast}).then((res) => {
    return res.data
  })
}