# ⚡ 빠른 시작 가이드 (Quick Reference)

날마다 이 명령어들만 쓰면 돼!

---

## 🚀 배포 과정 (3단계)

```bash
# 1️⃣ 코드 수정 (에디터에서 src/App.js, src/App.css 수정)

# 2️⃣ Git 커밋 & 푸시
git add .
git commit -m "feat: 설명"
git push origin main

# 3️⃣ 배포!
npm run deploy
```

끝! 1-2분 후 `https://momentum96.github.io` 확인 ✨

---

## 🔧 개발 중일 때

```bash
# 로컬 개발 서버 시작 (자동 새로고침)
npm start

# Ctrl + C로 종료
```

---

## 🐛 문제 해결

### 1. 변경사항이 안 보여요
```bash
Ctrl + Shift + R  # 전체 새로고침 (캐시 무시)
```

### 2. 배포 중 에러 발생
```bash
npm install          # 의존성 재설치
npm run deploy       # 다시 배포
```

### 3. 404 에러
→ GitHub 리포지토리 Settings → Pages → gh-pages 브랜치 선택

---

## 📝 커밋 메시지 예시

```bash
# 새로운 기능
git commit -m "feat: 새로운 섹션 추가"

# 버그 수정
git commit -m "fix: Three.js 애니메이션 버그 수정"

# 스타일 변경
git commit -m "style: 색상 변경 (핑크 → 파랑)"

# 문서 업데이트
git commit -m "docs: README 업데이트"
```

---

## 🎨 자주 수정하는 부분

### 텍스트 변경
**파일**: `src/App.js`
```javascript
<h1>AI VILLAIN</h1>  // 여기 수정
<p>CREATIVE AI STUDIO</p>  // 여기 수정
```

### 색상 변경
**파일**: `src/App.css`
```css
#ff0080   /* 핑크 */
#7928ca   /* 보라 */
#0080ff   /* 파랑 */
```

### 메타 정보 (검색 결과)
**파일**: `public/index.html`
```html
<title>AI Villain - Creative AI Studio</title>  <!-- 탭 제목 -->
<meta name="description" content="...">  <!-- 검색 설명 -->
```

---

## 📊 전체 명령어

| 목적 | 명령어 |
|------|--------|
| 로컬 개발 | `npm start` |
| 빌드 | `npm run build` |
| 배포 | `npm run deploy` |
| 의존성 재설치 | `npm install` |
| 테스트 | `npm test` |

---

## 💡 한 줄 팁

- **항상 `git push` 먼저**: 로컬에만 있는 커밋이 있으면 배포 안 됨
- **1-2분 대기**: 배포 후 캐시 때문에 즉시 반영 안 될 수 있음
- **Ctrl+Shift+R**: 일반 새로고침(F5)이 아니라 전체 새로고침 필수!

---

더 자세한 정보는 **DEPLOYMENT_GUIDE.md** 참고! 📖
