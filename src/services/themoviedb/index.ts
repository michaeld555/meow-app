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

const patternId = /[\d+]*[\?]/

theMovieDbApi.interceptors.response.use((response) => {
  return response;//TODO: API AQUI
}, (error) => {
  console.log(error)
});

export { theMovieDbApi };
