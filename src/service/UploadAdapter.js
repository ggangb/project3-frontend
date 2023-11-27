
import TokenService from './token.service';

// ❌ 개인적으로 API 요청에 필요했던 것들
const token = TokenService.getLocalAccessToken();


// ✅ 여기부터가 API 요청 가이드 샘플을 가져온 것
export default class UploadAdapter {
  constructor(loader) {
    // The file loader instance to use during the upload.
    this.loader = loader;
  }

  // Starts the upload process.
  upload() {
    
    return new Promise((resolve, reject) => {
      this.loader.file.then((file) => {
        this._initRequest();
        this._initListeners(resolve, reject, file);
        this._sendRequest(file);
      });
    });
  }

  // Aborts the upload process.
  abort() {
    if (this.xhr) {
      this.xhr.abort();
    }
  }

  // Initializes the XMLHttpRequest object using the URL passed to the constructor.
  _initRequest() {
    const xhr = (this.xhr = new XMLHttpRequest());

    xhr.open("POST", "http://localhost:3000/api/imageupload", true);
    xhr.setRequestHeader("Authorization", `Bearer ${token}`);
    
    xhr.responseType = "json";
  }

  // Initializes XMLHttpRequest listeners.
  _initListeners(resolve, reject, file) {
    const xhr = this.xhr;
    const loader = this.loader;
    const genericErrorText = `Couldn't upload file: ${file.name}.`;

    xhr.addEventListener("error", () => reject(genericErrorText));
    xhr.addEventListener("abort", () => reject());
    xhr.addEventListener("load", () => {
      const response = xhr.response;
      console.log(xhr)
      if (!response || response.error) {
        return reject(response && response.error ? response.error.message : genericErrorText);
      }

      resolve({
        default: response.url,
      });
    });

    if (xhr.upload) {
      xhr.upload.addEventListener("progress", (evt) => {
        if (evt.lengthComputable) {
          loader.uploadTotal = evt.total;
          loader.uploaded = evt.loaded;
        }
      });
    }
  }

  // ✅ 필요한 파라미터와 API 요청
  _sendRequest(file) {
    // Prepare the form data.
    const data = new FormData();

	// 이미지 파일
    data.append("upload", file);
    // 파라미터
    data.append("use_orgin_name", "N");

    // Send the request.
    this.xhr.send(data);
  }
}
