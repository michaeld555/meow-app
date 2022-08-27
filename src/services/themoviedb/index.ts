import axios from 'axios';
import dataFake from './data-fake.json';

const HBO_MAX_CODE = 384;

const theMovieDbApi = axios.create({
  baseURL: 'https://api.themoviedb.org/3',//https://meowfansub.me/api/
  params: {
    api_key: '3d00a3ffb80935fdbc925d6673f90e10',
    with_watch_providers: HBO_MAX_CODE,
    watch_region: 'BR',
  }
});

//const token = '44|0x21WPgIUyHWYhFnOLzSjCR78Qp9FCr7Hhjr1o7n';
//
//const meowApi = axios.create({
//  baseURL: 'https://meowfansub.me/api/',
//  headers: { Authorization: `Bearer ${token}` },
//  params: {}
//});

//meowApi.get( 
//  'https://meowfansub.me/api/title/10',
//).then(function (response) {
//console.log(response.data.data[0])
//}).catch(console.log);

const patternId = /[\d+]*[\?]/

theMovieDbApi.interceptors.response.use((response) => {
  return response;//TODO: API AQUI
}, (error) => {
  console.log(error)
});

export { theMovieDbApi };
