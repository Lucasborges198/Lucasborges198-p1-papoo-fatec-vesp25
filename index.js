const axios = require('axios')
// params endpoint 1
const PROTOCOL1 = 'http'
const BASE_URL1 = 'api.openweathermap.org/geo/1.0/direct'
const APP_KEY = '987c46d87ddf0a05f252a83a0358be9c'
const q = 'London'

const URL = `${PROTOCOL1}://${BASE_URL1}?q=${q}&appid=${APP_KEY}`

const promiseResultante = axios.get(URL);

// primeiro endpoint - lat e long
function LatLong() {
  return new Promise((resolve, reject) => {
    const response = promiseResultante;
    response.then((response) => {
      const lat = response.data[0].lat;
      const lon = response.data[0].lon;
      resolve({ lat, lon });
    })
      .catch((err) => {
        reject(err)
      })
  });
}

LatLong().then((response) => {
  const lat = response.lat;
  const lon = response.lon;
  // params endpoint 2
  const PROTOCOL2 = 'https'
  const BASE_URL2 = 'api.openweathermap.org/data/2.5/weather'

  const URL2 = `${PROTOCOL2}://${BASE_URL2}?lat=${lat}&lon=${lon}&appid=${APP_KEY}`

  const promiseResultante2 = axios.get(URL2);
  // segundo endpoint - condicoes
  function conditions() {
    return new Promise((resolve, reject) => {
      const response = promiseResultante2;
      response.then((response) => {
        resolve([response.data.main.feels_like, response.data.weather[0].description]);
      })
        .catch((err) => {
          reject(console.log(err));
        })
    })
  };
  async function getConditions() {
    try {
      const response = await conditions();
      return response;
    } catch (err) {
      console.log(err);
    }
  };
  getConditions().then((response) => {
    const feels_like = response[0];
    const weather = response[1];
  });
})
  .catch((err) => {
    console.log(err)
  });

