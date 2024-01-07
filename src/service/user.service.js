import api from './api';

class UserService {
    // 사용자 아이디를 확인하는 메서드입니다.
    checkUserId(username) {
        return api.get(`/auth/chceckuser/${username}`);
    }
    // 사용자 이메일을 확인하는 메서드입니다.
    checkUserEmail(email) {
        return api.get(`/auth/checkemail/${email}`);
    }
    // 계정을 찾는 메서드입니다.
    findAccount(email) {
        return api.get(`/auth/findaccount/${email}`);
    }
    // 토큰을 검증하는 메서드입니다.
    verifyToken(token) {
        return api.get("/auth/verifytoken", { params: { token } });
    }
    // 비밀번호를 변경하는 메서드입니다.
    changePw(changeData) {
        return api.post("/auth/changepw", changeData )
    }
    // 이메일을 변경하는 메서드입니다.
    changeEmail(changeEmail) {
        return api.post('/auth/changeemail', changeEmail);
    }

}

export default new UserService();