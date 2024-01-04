import axios from "axios";


const instance = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL+"/api",
  withCredentials : 'true' , //클라이언트와 서버가 쿠키값을 공유
  headers: {
    "Content-Type": "application/json",

  },
});


export default instance;