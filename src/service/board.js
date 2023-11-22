import axios from "axios";
import tokenService from "./token.service";

const instance = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials : 'true' , //클라이언트와 서버가 쿠키값을 공유
    headers: {
      "Content-Type": "application/json",
      "Authorization" : tokenService.getLocalAccessToken(),
    },
  });
  
  export default instance;