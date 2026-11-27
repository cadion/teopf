# TEOPF 공식 홈페이지 (teopf.com)

TEOPF 스튜디오 홈페이지와 게임별 법무 페이지를 담은 정적 사이트입니다. 빌드 도구 없이 GitHub Pages(`main` 브랜치 `/`)에서 그대로 서비스합니다.

## 구성

| 경로 | 내용 |
|------|------|
| `index.html`, `style.css`, `script.js`, `mark.svg`, `assets/` | 홈페이지 (ChatGPT Sites `teopf-studio`에서 이전, 2026-11-27) |
| `app-ads.txt` | AdMob app-ads 선언. AdMob이 `https://teopf.com/app-ads.txt`를 크롤링하므로 내용을 정확히 유지 |
| `privacy/`, `terms/`, `support/`, `delete-account/` | 게임별 개인정보처리방침, 약관, 지원, 계정 삭제 페이지. 스토어에 등록된 URL이므로 경로를 바꾸지 않음 |
| `robots.txt`, `sitemap.xml` | 검색 크롤러용 |

## 로컬 미리보기

```bash
python3 -m http.server 5500
```

## 배포 메모

- 커스텀 도메인(`teopf.com`)은 Settings → Pages에서 지정합니다. 지정하면 `CNAME` 파일이 생깁니다.
- `https://cadion.github.io/teopf/…` 주소는 커스텀 도메인 지정 후 `https://teopf.com/…`로 자동 이동합니다.
