import axios from 'axios';

const api = axios.create({
  baseURL: 'http://desafioonline.webmotors.com.br/api/OnlineChallenge',
});

export default api;
