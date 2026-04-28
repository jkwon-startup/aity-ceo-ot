# AI Native CEO 강사 OT 사이트

서울시 · 서울AI허브(서울대학교 산업AI센터) × AITY 가 공동 운영하는
**"AI Native CEO 역량 구현 프로그램 — AI 기반 1인 기업가 실전 운영·구현 역량 확보 프로그램(48H)"**
의 강사 8인 OT 자료입니다.

> 🌐 **배포 URL**: https://jkwon-startup.github.io/aity-ceo-ot/

## 산출물

| 형태 | 위치 | 용도 |
|------|------|------|
| 웹 슬라이드 | [`/`](https://jkwon-startup.github.io/aity-ceo-ot/) | OT 당일 발표 (Reveal.js · 60장 · 16:9) |
| 매뉴얼 허브 | [`/manual/`](https://jkwon-startup.github.io/aity-ceo-ot/manual/) | OT 이후 강사 레퍼런스 |
| Google Slides | [Slides 링크](https://docs.google.com/presentation/d/1TYj3iCbmDziNRjnWWEWn2QiuVSWCtUWwxuSzGKAxsqw/edit) | Apps Script 로 자동 생성 (`apps-script/Code.gs`) |

## 사이트 구조

```
0428_CEO_OT/
├─ index.html                  # Reveal.js 슬라이드 (60장)
├─ manual/
│  ├─ index.html               # 매뉴얼 허브
│  ├─ aity-mentor.html         # AITY 멘토 사용법 (PDF 캡처 + 캡션)
│  ├─ curriculum.html          # 16회차 상세 + 강사 핸드오프
│  └─ faq.html                 # FAQ + 비상 대응
├─ assets/
│  ├─ css/site.css             # AITY 라벤더 브랜드 토큰
│  ├─ js/site.js               # 회차/강사/매트릭스 동적 렌더링
│  └─ images/
│     ├─ manual/               # AITY 매뉴얼 캡처 (12 + 6장)
│     ├─ instructors/          # 강사 8인 프로필
│     └─ qr-aity-ceo-ot.png    # 배포 URL QR
├─ content/
│  ├─ curriculum.json          # 16회차 + AI 역할 매트릭스 (단일 진실 소스)
│  └─ instructors.json         # 강사 8인 메타
├─ apps-script/
│  ├─ Code.gs                  # Google Slides 자동 생성 (Apps Script)
│  └─ README.md                # 실행 방법
├─ docs/
│  ├─ DEVELOPMENT.md           # 개발자 가이드 (수정·재배포)
│  └─ HANDOVER.md              # 운영진 인수인계 노트
├─ CHANGELOG.md                # 변경 이력
├─ README.md                   # 이 파일
└─ .gitignore
```

## 빠른 시작

### 1. 로컬 미리보기

```bash
cd "/Users/kwonjungsun/개인 개발/0428_CEO_OT"
python3 -m http.server 8000
# 브라우저: http://localhost:8000
```

- 슬라이드 키보드 네비: `←` `→` `Space` `ESC`(개요 모드)
- 인쇄용 PDF: `http://localhost:8000/?print-pdf` 후 Chrome 인쇄 → "대상: PDF로 저장"
- 다크모드: 우측 상단 🌙 버튼

### 2. Google Slides 채우기

[`apps-script/README.md`](./apps-script/README.md) 의 3단계 안내 참조.
요약: script.google.com → 새 프로젝트 → `Code.gs` 붙여넣기 → `buildOT` 실행.

### 3. 콘텐츠 수정 후 재배포

```bash
# 1. JSON 또는 HTML 수정
vi content/curriculum.json   # 회차/강사 정보
vi index.html                # 슬라이드 본문

# 2. 로컬 확인
python3 -m http.server 8000

# 3. 커밋 & push (GitHub Pages 자동 재빌드)
git add -A && git commit -m "..." && git push
```

자세한 가이드: [`docs/DEVELOPMENT.md`](./docs/DEVELOPMENT.md)

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
- Google Apps Script (Slides 자동 생성)
- 데이터: `content/curriculum.json`, `content/instructors.json`

## 라이선스 / 권한

- 본 자료는 서울AI허브 위탁 강의용 내부 자료입니다.
- AITY 매뉴얼 캡처는 AITY 가 제공한 공식 매뉴얼에서 발췌.
- 강사 프로필 사진은 강사 본인 제공 자료를 사용했습니다.
- 강사 프로필 원본 PDF / 고해상도 사진 / AITY 매뉴얼 PDF 원본은 `.gitignore` 로 공개 repo 에서 제외.
