# 🚀 AI Villain 배포 가이드

이 문서는 AI Villain 웹사이트를 개발하고 배포하는 과정을 설명합니다.

---

## 📋 프로젝트 구조

```
momentum96.github.io/
├── public/
│   └── index.html              # HTML 진입점
├── src/
│   ├── App.js                  # React 메인 컴포넌트
│   ├── App.css                 # 스타일 (그래디언트, 애니메이션)
│   └── index.js                # React 렌더 진입점
├── package.json                # 의존성 & 배포 설정
├── .gitignore                  # Git 무시 규칙
├── build/                      # 빌드 결과 (배포용)
└── node_modules/               # 설치된 패키지들
```

---

## 🛠️ 로컬 개발 환경 설정 (처음 한 번만)

### 1️⃣ 의존성 설치
```bash
npm install
```

### 2️⃣ 로컬 개발 서버 시작
```bash
npm start
```
- 브라우저에서 `http://localhost:3000` 자동 오픈
- 파일 수정 시 자동 새로고침

### 3️⃣ 종료
```bash
# Ctrl + C (또는 Cmd + C)
```

---

## ✏️ 코드 수정 및 배포 워크플로우

### 1️⃣ 코드 수정하기

#### App.js 수정 (컴포넌트, 텍스트, 기능)
```bash
# 원하는 에디터에서 src/App.js 수정
# 예: 텍스트 변경, 섹션 추가, Three.js 애니메이션 수정 등
```

#### App.css 수정 (스타일, 색상, 애니메이션)
```bash
# 원하는 에디터에서 src/App.css 수정
# 예: 색상 변경, 폰트 크기, 그래디언트, 반응형 설정 등
```

#### public/index.html 수정 (메타 태그, 타이틀)
```bash
# 원하는 에디터에서 public/index.html 수정
# 예: og:title, description, 폰트 링크 등
```

### 2️⃣ 로컬에서 테스트
```bash
npm start
```
- 브라우저에서 변경사항 확인
- Three.js 애니메이션 제대로 작동하는지 확인
- 반응형 디자인 확인 (F12 개발자 도구)

### 3️⃣ Git에 커밋
```bash
git add .
git commit -m "설명"
git push origin main
```

#### 커밋 메시지 예시
- `feat: 새로운 섹션 추가`
- `fix: Three.js 애니메이션 버그 수정`
- `style: 색상 변경 (핑크 → 파랑)`
- `docs: README 업데이트`

### 4️⃣ GitHub Pages에 배포
```bash
npm run deploy
```

#### 배포 내부 과정
1. `npm run build` 자동 실행 → 최적화된 파일 생성 (`build/` 폴더)
2. `gh-pages` 패키지가 `build/` 폴더를 `gh-pages` 브랜치에 푸시
3. GitHub Pages가 자동으로 배포 시작

### 5️⃣ 라이브 사이트 확인
```
https://momentum96.github.io
```

⏳ **주의**: 캐시 때문에 1-2분 기다린 후 **Ctrl+Shift+R** (전체 새로고침)로 확인하세요.

---

## 🔄 완전한 배포 프로세스 (한 번에 정리)

```bash
# 1. 코드 수정 (에디터에서)

# 2. 커밋
git add .
git commit -m "feat: 설명"
git push origin main

# 3. 배포
npm run deploy

# 4. 확인 (1-2분 대기 후)
# https://momentum96.github.io
```

---

## 🐛 문제 해결

### ❌ 404 에러가 나오는 경우

**원인**: GitHub Pages 배포 소스 설정이 안 되어 있음

**해결 방법**:
1. GitHub 리포지토리로 이동: `https://github.com/Momentum96/momentum96.github.io`
2. **Settings** 클릭
3. 좌측 메뉴에서 **Pages** 클릭
4. **Build and deployment** 섹션에서:
   - **Source**: `Deploy from a branch` 선택
   - **Branch**: `gh-pages` / `(root)` 선택
5. **Save** 클릭
6. 1-5분 대기 후 `https://momentum96.github.io` 방문

---

### ❌ 변경사항이 반영되지 않는 경우

**원인**: 브라우저 캐시

**해결 방법**:
- **Windows/Linux**: `Ctrl + Shift + R`
- **Mac**: `Cmd + Shift + R`

---

### ❌ 빌드 에러가 나오는 경우

**ESLint 경고 (무시 가능)**
```
Line XX: The href attribute is required for an anchor to be keyboard accessible
```

→ 경고지만 배포됩니다. 필요하면 나중에 수정 가능

**치명적 에러 (빌드 중단)**
```
Module not found: Can't resolve...
```

→ 임포트 경로 확인 또는 `npm install` 재실행

---

## 📊 배포 구조

```
Local (main branch)         GitHub (gh-pages branch)      Live Site
    ↓                              ↓                          ↓
src/App.js          ——→  build/static/js/main.xxx.js  ——→  https://momentum96.github.io
src/App.css         ——→  build/static/css/main.xxx.css ——→
public/index.html   ——→  index.html                    ——→
```

---

## 🔑 핵심 명령어 정리

| 명령어 | 설명 |
|--------|------|
| `npm start` | 로컬 개발 서버 시작 (자동 새로고침) |
| `npm run build` | 프로덕션 빌드 (최적화) |
| `npm run deploy` | GitHub Pages 배포 (자동 빌드 포함) |
| `npm test` | 테스트 실행 |

---

## 📝 Three.js 애니메이션 수정 시 주의사항

**src/App.js의 주요 부분:**

```javascript
// 1️⃣ 파티클 설정 (5000개)
const particlesCount = 5000;

// 2️⃣ 파티클 색상
const particlesMaterial = new THREE.PointsMaterial({
  size: 0.005,
  color: 0xff0080,  // 핑크색
});

// 3️⃣ 토러스 설정
const torusGeometry = new THREE.TorusGeometry(0.7, 0.2, 16, 100);
const torusMaterial = new THREE.MeshBasicMaterial({
  color: 0x7928ca,  // 보라색
  wireframe: true,
});

// 4️⃣ 회전 속도
torus.rotation.x += 0.01;  // X축 회전
torus.rotation.y += 0.005; // Y축 회전
```

수정 후 `npm start`에서 실시간 확인 가능합니다.

---

## 🎨 CSS 색상 커스터마이징

**현재 사용 중인 그래디언트:**

```css
/* 주요 색상 */
#ff0080   (핑크)
#7928ca   (보라)
#0080ff   (파랑)

/* 예시: .logo 그래디언트 변경 */
background: linear-gradient(135deg, #ff0080, #7928ca, #0080ff);
```

색상 코드: https://htmlcolorcodes.com

---

## ✅ 배포 전 체크리스트

배포하기 전에 다음을 확인하세요:

- [ ] 로컬에서 `npm start`로 모든 섹션 확인
- [ ] 텍스트 오타 없는지 확인
- [ ] 모바일에서도 제대로 보이는지 확인 (F12 → Responsive Mode)
- [ ] Three.js 애니메이션 제대로 작동하는지 확인
- [ ] 모든 링크가 올바른지 확인
- [ ] `git push origin main` 실행
- [ ] `npm run deploy` 실행
- [ ] 1-2분 대기 후 라이브 사이트 확인

---

## 🔗 유용한 링크

- **라이브 사이트**: https://momentum96.github.io
- **GitHub 리포지토리**: https://github.com/Momentum96/momentum96.github.io
- **GitHub Pages 설정**: https://github.com/Momentum96/momentum96.github.io/settings/pages
- **Three.js 문서**: https://threejs.org/docs/
- **React 문서**: https://react.dev/
- **HTML 색상 코드**: https://htmlcolorcodes.com

---

## 💡 팁

1. **빠른 배포**: 커밋 생략하고 싶으면 `npm run deploy`만 실행 (local main에는 커밋되지만 원격에는 푸시 안 됨)
2. **여러 기기에서 작업**: 항상 `git push`로 동기화
3. **실수 되돌리기**: `git reset --soft HEAD~1` (마지막 커밋 취소)
4. **이전 버전 보기**: `git log --oneline` (모든 커밋 히스토리)

---

**마지막 수정**: 2025-11-14

문제가 생기면 이 가이드를 참고하고, 추가 질문은 언제든지! 🚀
