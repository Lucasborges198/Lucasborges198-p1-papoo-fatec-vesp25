const axios = require('axios')
// params endpoint 1
const PROTOCOL1 = 'http'
const BASE_URL1 = 'api.openweathermap.org/geo/1.0/direct'
const APP_KEY = '987c46d87ddf0a05f252a83a0358be9c'
const q = 'London'

let lat = '';
let lon = '';

const URL = `${PROTOCOL1}://${BASE_URL1}?q=${q}&appid=${APP_KEY}`

const promiseResultante = axios.get(URL);

// primeiro endpoint - lat e long
function LatLong() {
  return new Promise((resolve, reject) => {
    const response = promiseResultante;
    response.then((response) => {
      lat = response.data[0].lat;
      lon = response.data[0].lon;
      resolve({lat, lon});
    })
      .catch((err) => {
        reject(err)
      })
  });
}

LatLong().then((response) => {
  lat = response.lat;
  lon = response.lon;
})
  .catch((err) => {
    console.log(err)
  })
