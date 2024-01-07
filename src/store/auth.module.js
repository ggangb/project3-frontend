import AuthService from '../service/auth.service';

// 로컬 스토리지에서 'user' 항목을 가져와 파싱하여 초기 상태를 설정합니다.
const user = JSON.parse(localStorage.getItem('user'));
const initialState = user
  ? { status: { loggedIn: true }, user }
  : { status: { loggedIn: false }, user: null };

export const auth = {
  namespaced: true,
  state: initialState,
  actions: {
    // refreshtoken 액션은 commit을 통해 호출되며, 액세스 토큰을 인자로 받습니다.
    refreshtoken({ commit }, accessToken) {
      commit('refreshtoken', accessToken);
    },
    // login 액션은 commit과 user를 인자로 받으며, AuthService를 통해 사용자 로그인을 수행합니다.
    // 로그인에 성공하면 'loginSuccess' 뮤테이션을 호출하고 사용자 정보를 반환합니다.
    // 로그인에 실패하면 'loginFailure' 뮤테이션을 호출하고 에러를 반환합니다.
    login({ commit }, user) {
      return AuthService.login(user).then(
        user => {
          commit('loginSuccess', user);
          return Promise.resolve(user);
        },
        error => {
          commit('loginFailure');
          return Promise.reject(error);
        }
      );
    },
    // logout 액션은 commit을 통해 호출되며, AuthService를 통해 사용자 로그아웃을 수행합니다.
    // 'logout' 뮤테이션을 호출하여 로그아웃 상태로 변경합니다.
    logout({ commit }) {
      AuthService.logout();
      commit('logout');
    },
    // register 액션은 commit과 user를 인자로 받으며, AuthService를 통해 사용자 등록을 수행합니다.
    // 등록에 성공하면 'registerSuccess' 뮤테이션을 호출하고 응답 데이터를 반환합니다.
    // 등록에 실패하면 'registerFailure' 뮤테이션을 호출하고 에러를 반환합니다.
    register({ commit }, user) {
      return AuthService.register(user).then(
        response => {
          commit('registerSuccess');
          return Promise.resolve(response.data);
        },
        error => {
          commit('registerFailure');
          return Promise.reject(error);
        }
      );
    }
    
  },
  mutations: {
    // refreshtoken 뮤테이션은 state와 accessToken을 인자로 받으며, 액세스 토큰을 갱신합니다.
    refreshtoken(state, accessToken) {
      state.status.loggedIn = true;
      state.user = { ...state.user, accessToken: accessToken };
    },
    // loginSuccess 뮤테이션은 state와 user를 인자로 받으며, 로그인에 성공한 사용자 정보를 업데이트합니다.
    loginSuccess(state, user) {
      state.status.loggedIn = true;
      state.user = user;
    },
    // loginFailure 뮤테이션은 state를 인자로 받으며, 로그인에 실패하여 로그인 상태를 업데이트합니다.
    loginFailure(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    // logout 뮤테이션은 state를 인자로 받으며, 로그아웃하여 로그인 상태를 업데이트합니다.
    logout(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    // registerSuccess 뮤테이션은 state를 인자로 받으며, 등록에 성공하여 로그인 상태를 업데이트합니다.
    registerSuccess(state) {
      state.status.loggedIn = false;
    },
    // registerFailure 뮤테이션은 state를 인자로 받으며, 등록에 실패하여 로그인 상태를 업데이트합니다.
    registerFailure(state) {
      state.status.loggedIn = false;
    }
  }
};
