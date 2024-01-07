
import TokenService from './token.service';

// TokenService를 import하여 토큰을 가져옵니다.
const token = TokenService.getLocalAccessToken();


// API 요청을 위해 필요한 파일 업로드 어댑터 클래스를 정의합니다.
export default class UploadAdapter {
  constructor(loader) {
    // 파일 로더 인스턴스를 사용하여 업로드를 진행합니다.
    this.loader = loader;
  }

  // 업로드 프로세스를 시작합니다.
  upload() {

    return new Promise((resolve, reject) => {
      this.loader.file.then((file) => {
        this._initRequest();
        this._initListeners(resolve, reject, file);
        this._sendRequest(file);
      });
    });
  }

  // 업로드 프로세스를 중단합니다.
  abort() {
    if (this.xhr) {
      this.xhr.abort();
    }
  }

  // XMLHttpRequest 객체를 초기화합니다.
  _initRequest() {
    const xhr = (this.xhr = new XMLHttpRequest());
    // POST 요청을 보낼 엔드포인트와 토큰을 설정합니다.
    xhr.open("POST", process.env.VUE_APP_BASE_URL + "/api/imageupload", true);
    xhr.setRequestHeader("Authorization", `Bearer ${token}`);

    xhr.responseType = "json";
  }

  // XMLHttpRequest 이벤트 리스너를 초기화합니다.
  _initListeners(resolve, reject, file) {
    const xhr = this.xhr;
    const loader = this.loader;
    const genericErrorText = `Couldn't upload file: ${file.name}.`;
    // 에러 이벤트 리스너를 설정합니다.
    xhr.addEventListener("error", () => reject(genericErrorText));
    xhr.addEventListener("abort", () => reject());
    xhr.addEventListener("load", () => {
      const response = xhr.response;
      console.log(xhr)
      // 응답이 없거나 에러가 있는 경우 에러를 reject합니다.
      if (!response || response.error) {
        return reject(response && response.error ? response.error.message : genericErrorText);
      }
      // 업로드 성공 시 이미지 URL을 resolve합니다.
      resolve({
        default: response.url
      });
    });

    if (xhr.upload) {
      // 프로그레스 이벤트 리스너를 설정하여 업로드 진행 상황을 감지합니다.
      xhr.upload.addEventListener("progress", (evt) => {
        if (evt.lengthComputable) {
          // 로더 인스턴스를 사용하여 업로드 진행 상황을 업데이트합니다.
          loader.uploadTotal = evt.total;
          loader.uploaded = evt.loaded;
        }
      });
    }
  }

  // 필요한 파라미터와 API 요청
  _sendRequest(file) {
    // 폼 데이터를 생성합니다.
    const data = new FormData();

    // 이미지 파일
    console.log(file);
    data.append("upload", file);
    // 파라미터
    data.append("use_orgin_name", "N");

    // 요청을 전송합니다.
    this.xhr.send(data);
  }
}
