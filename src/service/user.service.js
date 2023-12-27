import api from './api';

class UserService {

    checkUserId(username) {
        return api.get(`/auth/chceckuser/${username}`);
    }
    checkUserEmail(email) {
        return api.get(`/auth/checkemail/${email}`);
    }
    findAccount(email) {
        return api.get(`/auth/findaccount/${email}`);
    }
    verifyToken(token) {
        return api.get("/auth/verifytoken", { params: { token } });
    }
    changePw(changeData) {
        return api.post("/changepw",{ params: { changeData } } )
    }

}

export default new UserService();