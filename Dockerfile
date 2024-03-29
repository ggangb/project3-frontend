# 빌드 스테이지
# Node.js 이미지를 사용합니다.
FROM node:14 AS build-stage

# 작업 디렉토리 설정
WORKDIR /app

# package.json과 package-lock.json을 복사합니다.
COPY package*.json ./

# 프로젝트 의존성 설치
RUN npm install


# 앱 소스를 컨테이너로 복사
COPY . .

# /app 디렉토리에 있는 모든 파일을 확인하는 방법
RUN ls /app

# 앱 빌드
RUN npm run build

# 실행 스테이지
# Nginx 이미지를 사용합니다.
FROM nginx:stable AS production-stage

# Nginx 설정 파일을 컨테이너에 복사합니다.
COPY default.conf /etc/nginx/conf.d/default.conf

# 빌드 스테이지에서 빌드된 파일을 Nginx에 복사합니다.
COPY --from=build-stage /app/dist /usr/share/nginx/html

# 80 포트를 외부에 노출합니다.
EXPOSE 80

# Nginx를 시작합니다.
CMD ["nginx", "-g", "daemon off;"]
