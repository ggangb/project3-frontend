import axios from 'axios';
import TokenService from './token.service';



class AuthService {
  // 사용자 로그인
    login(user) {
        return axios
            .post(process.env.VUE_APP_BASE_URL + '/api/auth/signin', user)  // 로그인 엔드포인트에 POST 요청을 보냄
            .then(res => {
                if(res.data) {
                    TokenService.setUser(res.data); // 토큰 서비스를 사용하여 사용자 정보를 저장
                }
                return res.data; // 응답 데이터 반환
            });
            
    }
  // 사용자 로그아웃
    logout() {
        const user = TokenService.getUser(); // 토큰 서비스를 사용하여 현재 사용자 정보를 가져옴
        return axios
            .post(process.env.VUE_APP_BASE_URL + '/api/auth/signout', user) // 로그아웃 엔드포인트에 POST 요청을 보냄
            .then((res) => {
                alert(res.data.message); // 응답 데이터의 메시지를 알림으로 표시
                TokenService.removeUser(); // 토큰 서비스를 사용하여 사용자 정보를 제거
            })
    }
  // 사용자 등록
    register(user) {
        return axios
        .post(process.env.VUE_APP_BASE_URL + '/api/auth/signup', user); // 등록 엔드포인트에 POST 요청을 보냄
    }
    
}

export default new AuthService();