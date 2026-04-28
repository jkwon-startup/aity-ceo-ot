# Development Guide

코드 수정 → 로컬 검증 → 재배포 흐름. **빌드 도구 없음**, 정적 파일을 GitHub Pages 가 그대로 서빙.

## 의존성

- Python 3 (`python3 -m http.server` 로 로컬 서버)
- `gh` CLI (GitHub Pages 빌드 상태 확인용, 선택)
- 브라우저 (Chrome 권장 — 인쇄용 PDF export 시)
- macOS: `pdftoppm`, `sips` (이미지 리사이즈 필요시)

## 데이터 모델

### `content/curriculum.json`
```json
{
  "program": { "title": "...", "totalHours": 48, ... },
  "sessions": [
    { "no": 1, "week": 1, "date": "2026-06-09", "weekday": "화",
      "format": "online", "hours": 2, "instructor": "lee-hyungoo",
      "title": "...", "aiRoles": [...], "outputs": [...],
      "homework": [...], "handoffNext": "..." },
    ...
  ],
  "aiRoleMatrix": [{"role": "...", "what": "..."}, ...]
}
```

### `content/instructors.json`
```json
{
  "instructors": [
    { "id": "kwon-jungsun", "name": "권정선", "role": "...",
      "sessions": [5, 6], "bio": "...", "color": "#7A5FFF" },
    ...
  ]
}
```

`instructor.id` 는 `assets/images/instructors/{id}.jpg` 와 매칭됩니다. 사진 없으면 이름 첫 두 글자 이니셜 아바타로 fallback.

## 컨텐츠 수정 시

### A. 매뉴얼 페이지의 회차/강사 카드 변경
**`content/curriculum.json` 또는 `instructors.json` 만 수정하면 끝.**
`assets/js/site.js` 가 fetch 해서 동적 렌더링.

### B. Reveal.js 슬라이드 본문 변경
`index.html` 의 `<section>` 직접 수정. 슬라이드 추가는 `<section>` 한 블록을 추가하면 됨.

### C. 매뉴얼 페이지 본문 변경
`manual/*.html` 직접 수정. 4개 파일 모두 동일한 nav/footer 구조 (현재는 단순 복붙). 변경 시 4개 파일 일괄 수정 필요.

### D. AITY 화면 캡처 추가/교체
1. 원본 PDF (`AITY 사용 메뉴얼/`) 에서 `pdftoppm` 으로 추출
   ```bash
   pdftoppm -png -r 150 "AITY 사용 메뉴얼/멘토 매뉴얼2.pdf" /tmp/mentor -f N -l N
   ```
2. `sips --resampleWidth 1280` 로 1280px 너비로 리사이즈
3. `assets/images/manual/` 에 저장 (파일명 컨벤션: `mentor-NN.png`, `student-NN.png`)
4. `index.html` 또는 `manual/aity-mentor.html` 에서 `<img src="...">` 참조

### E. 브랜드 컬러 변경
`assets/css/site.css` 최상단 `:root` 의 `--aity-primary` 등 토큰 수정.
Reveal.js 슬라이드 (`index.html`) 는 `<style>` 안에 인라인 토큰이 있음 — 같이 변경.

## 로컬 검증

```bash
cd "/Users/kwonjungsun/개인 개발/0428_CEO_OT"
python3 -m http.server 8000
```

체크 포인트:
- [ ] `http://localhost:8000` — 슬라이드 키보드 ←→/Space 동작
- [ ] `http://localhost:8000/?print-pdf` — Chrome 인쇄로 PDF 내보내기 가능
- [ ] `http://localhost:8000/manual/` — 매뉴얼 4페이지 모두 접근
- [ ] 모바일 뷰포트 (375px) 에서 깨짐 없음
- [ ] 다크모드 토글 동작

## 재배포

```bash
git add -A
git commit -m "<변경 요약>"
git push
```

GitHub Pages 가 자동으로 1~2분 안에 재빌드 합니다. 빌드 상태 확인:
```bash
gh api repos/jkwon-startup/aity-ceo-ot/pages --jq '.status'
```

`built` 이면 완료.

## Apps Script (Google Slides) 재실행

`apps-script/Code.gs` 의 `SESSIONS` 또는 builder 함수를 수정한 후:

1. https://script.google.com 접속 → 기존 프로젝트 또는 새 프로젝트
2. 코드 교체
3. `buildOT` 실행

**대상 Slides 의 기존 슬라이드는 모두 삭제되고 재생성**됩니다. 다른 Slides 에 채우려면 `Code.gs` 상단 `PRESENTATION_ID` 값만 교체.

## 좌표 시스템 주의 (Apps Script)

- builder 함수의 좌표는 **logical 960×540** 시스템
- 실제 Slides 16:9 widescreen 페이지는 **720×405 PT**
- helper 함수 (`txt`, `rect`, `rectWithText`) 안에서 `* SCALE` (0.75) 자동 변환
- `buildShot` 의 이미지 크기/위치도 SCALE 적용됨
- 새 builder 함수 추가 시 helper 를 통해서만 좌표 사용할 것

## 자주 만나는 문제

### `pdftoppm` 으로 PDF 추출 시 한글 깨짐
fontconfig 캐시 문제. 보통 system fonts 가 깔려 있으면 정상.

### Reveal.js 가 슬라이드를 한 줄로만 표시
브라우저가 `?print-pdf` 모드로 인식한 경우. URL 에서 query string 제거.

### 다크모드에서 이미지가 너무 어두움
이미지는 dark mode 대응 안 됨. 흰 배경의 frame 으로 감싸서 일관된 명도 유지 (`assets/css/site.css` `.frame`).

### Apps Script 6분 타임아웃
60장 빌드는 보통 90~110초. 슬라이드 수를 더 늘리면 타임아웃 가능. 그 경우 `buildOT` 를 두 함수로 쪼개기 (예: `buildOT_part1`, `buildOT_part2`).

## 주요 파일 핵심 역할 1줄 요약

- `index.html` — 60장 슬라이드 (정적 HTML)
- `manual/*.html` — 4개 매뉴얼 페이지 (정적 HTML)
- `assets/css/site.css` — AITY 라벤더 브랜드 토큰 (CSS variables)
- `assets/js/site.js` — JSON → 카드/매트릭스 동적 렌더링 + 다크모드 토글
- `content/curriculum.json` — 16회차 단일 진실 소스
- `content/instructors.json` — 강사 8인 단일 진실 소스
- `apps-script/Code.gs` — Google Slides 자동 생성 (810줄)
