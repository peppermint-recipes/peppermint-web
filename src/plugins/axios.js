import axios from 'axios';

const http = axios.create({
  baseURL: 'http://192.168.0.138:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default http;
