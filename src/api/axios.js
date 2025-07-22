import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://your-api-url.com', // Replace with your API URL
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  }
});

export default instance;