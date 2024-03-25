import axios from 'axios';
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;
// axios.defaults.headers.put['Content-Type'] = 'multipart/form-data';

export const client = axios.create({
  baseURL: "http://localhost:8000"
});