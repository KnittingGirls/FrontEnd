# 털실과 그레텔(20 뜨개걸즈) FRONTEND #

뜨개 도안이 필요한 뜨개인들을 위한 무료 AI 도안 생성 및 커뮤니티 어플리케이션(android)<br>
apk 다운로드 : https://drive.google.com/drive/folders/1HJ693vNUebx3s9e7kfsIXctsZxBzqi4e?hl=ko

---
## Tech Stack
* React-Native 0.79.3
* javascript
* JVM 17 (gradle)
* npx create-expo-app (React script-based, expo-based)

## 설치 및 apk 빌드 방법

1. 패키지 설치

```bash
npm install
```

2. 환경 변수 설정
`.env` 파일을 프로젝트 루트(`frontend`)에 생성하고, 아래와 같이 작성:

```bash
EXPO_PUBLIC_IPHOST={서버 IP}
EXPO_POST_BASE_URL=http://{서버 IP}:8080/posts
```
3. 아래 중 한 가지 설정하여 app-release.apk 생성
   
   (1) prebuild, 곧바로 app-release.apk 생성 (android studio native)
```bash
npm expo prebuild
npx expo run:android --variant release
```
   (2) app-debug.apk 기반으로 app-release.apk 생성
```bash
npm expo prebuild
npx expo run:android
cd android
./gradlew assembleRelease
```
apk 위치: android/app/build/outputs/apk/release/app-release.apk

4. 생성된 apk 스마트폰으로 전송, 설치 및 실행
---
## 로그인에 따른 페이지 구현
Drawer Navigator 구조
- 홈화면
- 로그인/로그아웃 (각각 로그아웃, 로그인 상태에서만 접근 가능)
- 도안생성 
- 커뮤니티 (로그인 상태에서만 조회 외 모든 기능 사용 가능)
- 내가 쓴 글 (로그인 상태에서만 접근 가능)
- 스크랩한 글 (로그인 상태에서만 접근 가능)

Stack Navigator 구조
- Drawer(사이드바)
- 도안생성 중 SelectType(니트 선택 페이지),UploadImg(이미지 업로드 페이지)
- 커뮤니티 중 EachPost(각 게시물 조회), NewPost(새 게시물 작성)
- 그 외 Drawer에서도 다루는 페이지들 
---
## 전체 UI 구조
![Image](https://github.com/user-attachments/assets/32c0b060-653b-4fba-8c5c-6eb490a6815a)


