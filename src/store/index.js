// Vuex에서 createStore 함수를 가져옵니다.
import { createStore } from "vuex";

// auth 모듈을 가져옵니다.
import { auth } from "./auth.module";

// createStore 함수를 사용하여 Vuex 스토어를 생성합니다.
const store = createStore({
  // modules 속성을 사용하여 모듈을 등록합니다.
  modules: {
    auth, // auth 모듈을 등록합니다.
  },
});

// 생성한 스토어를 내보냅니다.
export default store;
