import axios from "axios";

// axios 인스턴스 생성
const instance = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL + "/api",  // 요청의 기본 URL 설정
  withCredentials: true,  // 클라이언트와 서버가 쿠키 값을 공유하기 위해 설정
  headers: {
    "Content-Type": "application/json",  // 요청의 Content-Type 설정
  },
});

export default instance;  // axios 인스턴스를 모듈로 내보냄
