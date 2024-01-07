class TokenService {
  // 로컬 스토리지에서 리프레시 토큰을 가져오는 메서드
  getLocalRefreshToken() {
    const user = JSON.parse(localStorage.getItem("user"));
    return user?.refreshToken;
  }
  // 로컬 스토리지에서 액세스 토큰을 가져오는 메서드
  getLocalAccessToken() {
    const user = JSON.parse(localStorage.getItem("user"));
    return user?.accessToken;
  }
  // 로컬 스토리지의 액세스 토큰을 업데이트하는 메서드
  updateLocalAccessToken(token) {
    let user = JSON.parse(localStorage.getItem("user"));
    user.accessToken = token;
    localStorage.setItem("user", JSON.stringify(user));
  }
  // 로컬 스토리지에서 사용자 정보를 가져오는 메서드
  getUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
  // 로컬 스토리지에서 사용자 이름을 가져오는 메서드
  getUserName() {
    const user = JSON.parse(localStorage.getItem("user"));
    return user?.username;
  }
  // 로컬 스토리지에서 사용자 이메일을 가져오는 메서드
  getUserEmail() {
    const user = JSON.parse(localStorage.getItem("user"));
    return user?.email;
  }

  // 로컬 스토리지에 사용자 정보를 저장하는 메서드
  setUser(user) {
    localStorage.setItem("user", JSON.stringify(user));
  }
  // 로컬 스토리지에서 사용자 정보를 제거하는 메서드
  removeUser() {
    localStorage.removeItem("user");
  }
}

export default new TokenService();