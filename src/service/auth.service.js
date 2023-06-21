import axios from 'axios';

const API_URL = 'http://localhost:3000/api/';


class AuthService {

    login(user) {
        return axios
            .post(API_URL + 'signin', user)
            .then(res => {
                console.log(res)
                if(res.data.token) {
                    localStorage.setItem('token', JSON.stringify(res.data.token))
                    localStorage.setItem('refreshToken', JSON.stringify(res.data.refreshToken))
                    localStorage.setItem('username', JSON.stringify(res.data.username))
                }
                return res.data;
            });
    }

    logout() {
        localStorage.removeItem('user');
    }

    register(user) {
        return axios.post(API_URL + 'signup', {
            username : user.username,
            email : user.email,
            passowrd : user.password
        });
    }
}

export default new AuthService();