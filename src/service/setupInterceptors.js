import axiosInstance from "./api";
import TokenService from "./token.service";

// setup 함수 정의
const setup = (store) => {
  // axios 요청 인터셉터 설정
  axiosInstance.interceptors.request.use(
    (config) => {
      const token = TokenService.getLocalAccessToken();
      if (token) {
         // 토큰이 존재할 경우 요청 헤더에 토큰을 추가합니다.
        config.headers["Authorization"] = 'Bearer ' + token; 

      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  // axios 응답 인터셉터 설정
  axiosInstance.interceptors.response.use(
    (res) => {
      return res;
    },
    async (err) => {
      const originalConfig = err.config;
       // 로그인 및 토큰 검증 API를 제외한 요청에 대해서만 처리합니다.
      if (originalConfig.url !== "/signin" && originalConfig.url !== "api/auth/veribytoken" && err.response) {
        // 액세스 토큰이 만료된 경우
        if (err.response.status === 401 && !originalConfig._retry) {
          originalConfig._retry = true;

          try {
            // 리프레시 토큰을 사용하여 새로운 액세스 토큰을 발급받습니다.
            const rs = await axiosInstance.post("/auth/refreshtoken", {
              refreshToken: TokenService.getLocalRefreshToken(),
            });
            const { accessToken } = rs.data;
            // 액세스 토큰을 업데이트하고 상태 관리를 위해 액션을 디스패치합니다.
            store.dispatch('auth/refreshtoken', accessToken);
            TokenService.updateLocalAccessToken(accessToken);
            // 원래 요청을 재시도합니다.
            return axiosInstance(originalConfig);
          } catch (_error) {
            return Promise.reject(_error);
          }
        }
      }

      return Promise.reject(err);
    }
  );
};

export default setup;