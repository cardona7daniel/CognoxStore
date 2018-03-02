import axios from 'axios';

export function instanceCognoxStore() {
  return axios.create({
    baseURL: process.env.REACT_APP_PATH_API,
    timeout:30000,
  });
}