# 털실과 그레텔(20 뜨개걸즈) FRONTEND #

뜨개 도안이 필요한 뜨개인들을 위한 무료 AI 도안 생성 및 커뮤니티 어플리케이션(android)

---
## Tech Stack
* React-Native 0.79.3
* javascript
* JVM 17 (gradle)
* npx create-expo-app (React script-based)

## How to Test& get apk

1. 패키지 설치

```bash
npx expo install
```

2. 환경 변수 설정
`.env` 파일을 프로젝트 루트(`frontend`)에 생성하고,  
아래와 같이 작성해주세요:

```bash
EXPO_PUBLIC_IPHOST={서버 IP}
EXPO_POST_BASE_URL=http://{서버 IP}:8080/posts
```

3-1. 개발 서버 실행(expo go환경에서 테스트)
```bash
npm run start
```
3-2. 안드로이드 환경에서 테스트 실행(android studio native)
```bash
npm expo prebuild
npx expo run:android
```
4. (3-2 실행 후) android apk 생성
```bash
cd android
./gradlew assembleRelease
```
apk 위치: android/app/build/outputs/apk/release/app-release.apk
5. 생성된 apk 스마트폰으로 전송, 설치 및 실행

---

## 배포 링크


