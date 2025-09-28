require('dotenv').config({ path: '.env' });
const axios = require('axios')

const PROTOCOL1 = process.env.PROTOCOL1
const BASE_URL1 = process.env.BASE_URL1
const APP_KEY = process.env.APP_KEY

const PROTOCOL2 = process.env.PROTOCOL2
const BASE_URL2 = process.env.BASE_URL2

const q = process.env.q
const BASE_URL3 = process.env.BASE_URL3
const PROTOCOL3 = process.env.PROTOCOL3
const API_NEWS_KEY = process.env.API_NEWS_KEY
// params endpoint 1

const URL = `${PROTOCOL1}://${BASE_URL1}?q=${q}&appid=${APP_KEY}`

const promiseResultante = axios.get(URL);

// promise primeiro endpoint - lat e long
function LatLong() {
  return new Promise((req, res) => {
    const response = promiseResultante;
    response.then((response) => {
      const lat = response.data[0].lat;
      const lon = response.data[0].lon;
      req({ lat, lon });
    })
      .catch((err) => {
        res(err)
      })
  });
}

LatLong().then((response) => {
  const lat = response.lat;
  const lon = response.lon;
  // params endpoint 2
  const URL2 = `${PROTOCOL2}://${BASE_URL2}?lat=${lat}&lon=${lon}&appid=${APP_KEY}`

  const promiseResultante2 = axios.get(URL2);
  // promise segundo endpoint - condicoes
  function conditions() {
    return new Promise((req, res) => {
      const response = promiseResultante2;
      response.then((response) => {
        req([response.data.main.feels_like, response.data.weather[0].description]);
      })
        .catch((err) => {
          res(console.log(err));
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
  // promise terceiro endpointBASE_URL3
  getConditions().then(() => {
    const NEW_URL = `${PROTOCOL3}://${BASE_URL3}?q=${q}&apiKey=${API_NEWS_KEY}`;
    const promiseResultante3 = axios.get(NEW_URL);

    function News() {
      return new Promise((req, res) => {
        const reponse = promiseResultante3;
        reponse.then((response) => {
          req(response);
        })
        .catch((err) => {
          res(err);
        });
      });
    }

    News().then((response) => {
      console.log(response);
    })

  });
})
  .catch((err) => {
    console.log(err)
  });
