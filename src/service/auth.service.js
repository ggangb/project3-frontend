import axios from 'axios';
import TokenService from './token.service';

const API_URL = 'http://localhost:3000/api/';


class AuthService {

    login(user) {
        return axios
            .post(API_URL + 'signin', user)
            .then(res => {
                if(res.data) {
                    TokenService.setUser(res.data);
                }
                return res.data;
            });
            
    }

    logout() {
        const user = TokenService.getUser();
        return axios
            .post(API_URL + 'signout', user)
            .then((res) => {
                alert(res.data.message);
                TokenService.removeUser();
            })
    }

    register(user) {
        return axios
        .post(API_URL + 'signup', user);
    }
    
}

export default new AuthService();