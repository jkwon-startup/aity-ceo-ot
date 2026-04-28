# Changelog

본 사이트의 의미 있는 변경 사항을 기록한다. 날짜는 한국 시간(KST) 기준.

## 2026-04-28 — 초기 배포

### Added
- Reveal.js 슬라이드 60장 (Welcome → Closing) · 16:9 widescreen
- 매뉴얼 4페이지 (`manual/index`, `manual/aity-mentor`, `manual/curriculum`, `manual/faq`)
- `content/curriculum.json` — 16회차 메타 + 9가지 AI 역할 매트릭스
- `content/instructors.json` — 강사 8인 메타
- AITY 매뉴얼 캡처 12장 (멘토) + 6장 (수강생) → `assets/images/manual/`
- 강사 8인 프로필 (이현구는 PDF 크롭 fallback) → `assets/images/instructors/`
- AITY 라벤더 브랜드 (`#7A5FFF`) + Pretendard 폰트
- 다크/라이트 토글, 모바일 반응형, in-page 검색
- GitHub Pages 자동 배포 → https://jkwon-startup.github.io/aity-ceo-ot/
- `apps-script/Code.gs` — 사용자 빈 Google Slides 에 OT 자료 자동 생성

### Changed (사용자 피드백 반영)
- 운영 주체 표기: "서울특별시교육청" → "서울시" (서울AI허브 스타트업 육성 프로그램)
- 11페이지(강사진 표) — 진대연 행: "Founder AI OS · 90일 실행 로드맵 · 발표 코칭" → "Founder AI OS"
- 12페이지(핸드오프 원칙) — "이 사이트의 매뉴얼" → "공유된 노션 사이트의 매뉴얼"
- 57페이지(Meet 계정 확인) — "강사·수강생 모두 AITY 가입 이메일로 입장" 경고 추가

### Removed
- "오늘 흐름 (60분)" 슬라이드 (3페이지)
- "운영진 연락처" 슬라이드 + `manual/faq.html` 의 연락처 섹션

### Fixed
- Apps Script: `SlidesApp.PageSize.WIDESCREEN_16_9` enum 미존재 → `setPageSize` 호출 제거
- Apps Script: builder 좌표(960×540 logical) ↔ 실제 페이지(720×405 PT) 불일치 → helper 에 `* SCALE` (0.75) 자동 변환

### Security / Privacy
- `.gitignore`: 강사 프로필 원본 폴더 (CV PDF · 고해상도 사진) 공개 repo 에서 제외
- `.gitignore`: AITY 매뉴얼 PDF 원본 제외 (캡처 이미지만 사용)

## 알려진 한계 (TODO)

- `assets/images/manual/meet-account-switch.png` — 임시 placeholder 이미지. 실제 Google Meet 계정 확인 화면 캡처로 교체 필요.
- `assets/images/instructors/lee-hyungoo.jpg` — 강사 프로필 PDF 첫 페이지에서 크롭한 fallback. 정식 프로필 사진 받으면 교체 권장.
- 운영진 핫라인·강사 단톡방 정보는 OT 직후 별도 채널 공지 (사이트에 기재하지 않음).
