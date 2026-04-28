# AI Native CEO 강사 OT 사이트

서울시 · 서울AI허브(서울대학교 산업AI센터) × AITY 가 공동 운영하는
**"AI Native CEO 역량 구현 프로그램 — AI 기반 1인 기업가 실전 운영·구현 역량 확보 프로그램(48H)"**
의 강사 8인 OT 자료입니다.

> 🌐 **배포 URL**: https://jkwon-startup.github.io/aity-ceo-ot/

## 사이트 구성

```
/                            — Reveal.js OT 슬라이드 (~50장)
/manual/                     — 매뉴얼 허브
  /aity-mentor.html          — AITY 멘토 사용법 (PDF 캡처 + 캡션)
  /curriculum.html           — 16회차 상세 + 강사 핸드오프
  /faq.html                  — FAQ + 비상 대응
```

## 로컬 미리보기

```bash
cd "$(dirname "$0")"
python3 -m http.server 8000
# 브라우저: http://localhost:8000
```

- 슬라이드 키보드 네비: `←` `→` `Space` `ESC`(개요 모드)
- 인쇄용 PDF: `http://localhost:8000/?print-pdf` 후 Chrome 인쇄 → "대상: PDF로 저장"
- 다크모드: 우측 상단 🌙 버튼

## 주요 자료 출처

- **콘텐츠**: 서울AI허브 공식 강의 페이지 (Notion) — 강의 개요, 16회차 커리큘럼, 강사 매핑
- **AITY 화면 캡처**: `AITY 사용 메뉴얼/멘토 매뉴얼2.pdf` (28p), `수강생 매뉴얼.pdf` (34p)
- **강사 프로필**: `서울 AI허브_CEO_메인강사 및 보조강사 프로필/`

## 강사 8인 매핑

| 주차 | 회차 | 일자 | 강사 | 주제 |
|------|------|------|------|------|
| 1주 | 1·2 | 6/9·6/12 | 이현구 | AI-First 사업 구조 · 시장조사·오퍼·브랜드 |
| 2주 | 3·4 | 6/16·6/19 | 이상수 | 법·행정·운영 체크리스트 · 회계·세무 보조 |
| 3주 | 5·6 | 6/23·6/26 | 권정선 | 마케팅 · 랜딩 · 콘텐츠 · 검증 |
| 4주 | 7·8 | 6/30·7/3 | 김민규 | 개발 기초 · Claude Code · Git/GitHub · API |
| 5주 | 9·10 | 7/7·7/10 | 곽은철 | Claude Code · MCP · Skills · SOP |
| 6주 | 11·12 | 7/14·7/17 | 김주영 | MVP 범위 · 작업 지시문 · 바이브 코딩 |
| 7주 | 13·14 | 7/21·7/24 | 박준 | 에이전트 · 병렬 운영 · MCP 연동 |
| 8주 | 15·16 | 7/28·7/31 | 진대연 | Founder AI OS · 90일 실행 로드맵 |

## 기술 스택

- 정적 HTML/CSS/JS · 빌드 도구 없음
- [Reveal.js 5.x](https://revealjs.com/) (CDN)
- [Pretendard](https://pretendardfont.com/) (CDN)
- 데이터: `content/curriculum.json`, `content/instructors.json`

## 변경 이력

- 2026-04-28: 초기 OT 자료 작성 + GitHub Pages 배포 (Claude Opus 4.7 작성)
