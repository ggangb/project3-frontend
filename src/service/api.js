import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials : 'true' , //클라이언트와 서버가 쿠키값을 공유
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;