# TEOPF — 게임 개발 팀 웹사이트 템플릿

게임 스튜디오 / 인디 개발 팀이 바로 쓸 수 있는 **정적 랜딩 페이지 템플릿**입니다.  
빌드 도구 없이 `index.html`을 열거나 GitHub Pages로 배포할 수 있습니다.

## 구성

```
teopf/
├── index.html      # 메인 페이지
├── css/styles.css  # 스타일
├── js/main.js      # 네비·스크롤·폼 데모
└── README.md
```

## 섹션

| 섹션 | 용도 |
|------|------|
| Hero | 팀 슬로건, CTA, 핵심 수치 |
| About | 팀 철학 / 강점 3카드 |
| Games | 프로젝트 쇼케이스 (상태 배지 포함) |
| Team | 멤버 소개 + 채용 CTA 카드 |
| News | 개발 로그 / 공지 |
| Contact | 문의 폼 (프론트 데모) |

## 로컬 미리보기

파일 탐색기에서 `index.html`을 열거나, 로컬 서버를 띄우세요.

```bash
# Python
python -m http.server 5500

# Node (npx)
npx serve .
```

브라우저에서 `http://localhost:5500` 접속.

## 커스터마이즈 가이드

1. **팀 이름** — `index.html`의 `TEOPF`, 타이틀, 로고 텍스트
2. **히어로 카피** — `.hero-title`, `.hero-desc`
3. **프로젝트** — `.game-card` 제목/설명/태그/상태
4. **팀원** — `.member-card` 이니셜·이름·역할
5. **연락처** — `.contact-meta` 이메일·Discord·위치
6. **색상** — `css/styles.css`의 `:root` 변수

### 프로젝트 썸네일 이미지 넣기

`.game-thumb`에 배경 이미지를 지정합니다.

```css
.thumb-a {
  background-image: url("../assets/neon-drift.jpg");
  background-size: cover;
}
```

### 문의 폼 실제 연동

`js/main.js`의 submit 핸들러를 [Formspree](https://formspree.io/), Netlify Forms, 자체 API 등으로 교체하세요.

## GitHub Pages 배포

1. 이 저장소를 GitHub에 push
2. **Settings → Pages → Source: Deploy from a branch**
3. Branch: `main` / folder: `/ (root)` 선택
4. 잠시 후 `https://<username>.github.io/teopf/` 접속

## 라이선스

템플릿 코드는 자유롭게 수정·재배포해도 됩니다.  
팀 로고·에셋·문구는 각 팀 소유로 교체해 사용하세요.
