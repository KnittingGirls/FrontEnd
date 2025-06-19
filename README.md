# 털실과 그레텔(20 뜨개걸즈) FRONTEND #

뜨개 도안이 필요한 뜨개인들을 위한 무료 AI 도안 생성 및 커뮤니티 어플리케이션(android)

---
## Tech Stack
* React-Native 0.79.3
* javascript
* JVM 17 (gradle)
* npx create-expo-app (React script-based, expo-based)

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
3. 아래 중 한 가지 설정하여 app-release.apk 생성
3-1. prebuild, 곧바로 app-release.apk 생성 (android studio native)
```bash
npm expo prebuild
npx expo run:android --variant release
```
3-3. app-debug.apk 기반으로 app-release.apk 생성
```bash
npm expo prebuild
npx expo run:android
cd android
./gradlew assembleRelease
```
apk 위치: android/app/build/outputs/apk/release/app-release.apk

4. 생성된 apk 스마트폰으로 전송, 설치 및 실행
---

## 배포 링크


