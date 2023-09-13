import axios from 'axios'

const audioAPI = axios.create({
    baseURL: "https://polly.awsdev.feeds.skybet.com/api"
})

export const getAudio = () => {
  return audioAPI.get('/polly').then((res) => {
      return res.data
  })
}

export const postAudio = (inputText) =>{
  return audioAPI.post('/polly', {"body": inputText}).then((res) => {
    return res.data
  })
}