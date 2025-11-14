# AI Villain - GitHub Pages 배포 가이드

## 1. React 프로젝트 생성

```bash
npx create-react-app aivillain
cd aivillain
```

## 2. Three.js 설치

```bash
npm install three
```

## 3. 파일 구조

```
aivillain/
├── public/
│   └── index.html
├── src/
│   ├── App.js          (위에서 제공한 React 코드)
│   ├── App.css         (위에서 제공한 CSS 코드)
│   └── index.js
├── package.json
└── README.md
```

## 4. package.json 수정

`package.json` 파일에 다음을 추가하세요:

```json
{
  "name": "aivillain",
  "version": "0.1.0",
  "homepage": "https://username.github.io",
  "private": true,
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-scripts": "5.0.1",
    "three": "^0.128.0"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
  },
  "devDependencies": {
    "gh-pages": "^6.0.0"
  }
}
```

**주의**: `"homepage"` 값을 자신의 GitHub username으로 변경하세요!

## 5. gh-pages 설치

```bash
npm install --save-dev gh-pages
```

## 6. GitHub Repository 생성

1. GitHub에서 **username.github.io** 이름의 새 repository 생성
2. 로컬에서 Git 초기화:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/username/username.github.io.git
git push -u origin main
```

## 7. 배포

```bash
npm run deploy
```

이 명령어는:
- 프로젝트를 빌드하고
- `gh-pages` 브랜치를 생성하고
- 빌드된 파일들을 GitHub Pages에 자동 배포합니다

## 8. 확인

약 1-2분 후 다음 주소에서 확인:
```
https://username.github.io
```

## 9. 업데이트 방법

코드를 수정한 후:

```bash
git add .
git commit -m "Update website"
git push
npm run deploy
```

## 추가 팁

### public/index.html 수정

`<head>` 태그 안에 다음을 추가하면 좋습니다:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
```

### SEO를 위한 메타 태그

```html
<meta name="description" content="AI Villain - Creative AI Studio">
<meta property="og:title" content="AI Villain">
<meta property="og:description" content="Creative AI Studio">
<meta property="og:type" content="website">
```

### 커스텀 도메인 사용 (선택사항)

1. Repository 설정에서 Pages 섹션으로 이동
2. Custom domain에 도메인 입력
3. DNS 설정에서 CNAME 레코드 추가

## 문제 해결

### 404 에러 발생 시

`public/` 폴더에 `404.html` 파일 생성:

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <script>
        sessionStorage.redirect = location.href;
    </script>
    <meta http-equiv="refresh" content="0;URL='/'">
</head>
</html>
```

### 빌드 에러 발생 시

```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

## 로컬 개발 환경

```bash
npm start
```

브라우저에서 `http://localhost:3000` 에서 확인 가능합니다.

---

이제 멋진 포트폴리오 사이트가 완성되었습니다! 🚀