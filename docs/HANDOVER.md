# Handover — 운영진·후속 강사 인수인계

> OT 가 끝난 뒤 운영진/후속 강사가 사이트를 어떻게 활용·관리하는지를 정리한 문서.

## 사이트 활용 시나리오

### OT 당일
- 발표자(권정선)가 [메인 URL](https://jkwon-startup.github.io/aity-ceo-ot/) 에서 슬라이드 발표
- 강사 8명에게 미리 URL 공유 → 본인 회차 카드 확인
- Q&A 시간에 매뉴얼 페이지(`/manual/`) 보여주기

### OT 이후 (운영 중)
- 강사들이 자기 수업 30분 전에 [`/manual/aity-mentor.html`](https://jkwon-startup.github.io/aity-ceo-ot/manual/aity-mentor.html) 체크리스트 한 번 훑어봄
- 비상 상황 발생 시 [`/manual/faq.html`](https://jkwon-startup.github.io/aity-ceo-ot/manual/faq.html) 의 즉시 대응 표 참조
- 다음 회차 강사가 [`/manual/curriculum.html`](https://jkwon-startup.github.io/aity-ceo-ot/manual/curriculum.html) 에서 본인 회차 + 직전 회차 카드 확인

### 강의 종료 후
- 사이트는 archive 상태로 남김 (URL 유효 유지)
- 다음 기수 OT 시 본 사이트를 fork/copy → 콘텐츠만 교체

## 운영진이 해야 할 일

### 즉시 (OT 직전~OT 당일)
- [ ] 강사 8인에게 사이트 URL 공유 (단톡방/이메일)
- [ ] 강사 단톡방에 사이트 매뉴얼 링크 고정
- [ ] OT 슬라이드 마지막 페이지의 QR 코드 점검 (모바일에서 스캔되는지)

### 단기 (OT 후 1주)
- [ ] **임시 이미지 교체**:
  - `assets/images/manual/meet-account-switch.png` → 실제 Google Meet 계정 확인 화면 캡처
  - `assets/images/instructors/lee-hyungoo.jpg` → 정식 프로필 사진
- [ ] 강사 피드백 수집 후 매뉴얼 페이지 보강
- [ ] 운영진 핫라인 번호 / 강사 단톡방 정보를 별도 문서로 정리 (사이트엔 안 올림)

### 중기 (강의 진행 중, 회차마다)
- [ ] 회차 종료 후 강사가 게시한 핸드오프 메모를 `content/curriculum.json` 의 `handoffNext` 필드에 반영
- [ ] 새로운 FAQ 가 발생하면 `manual/faq.html` 추가
- [ ] 발견된 트러블슈팅을 `비상 상황 표` 에 추가

## 강사 변경 시

`content/instructors.json` 과 `content/curriculum.json` 의 강사 매핑 수정 후 push.

```bash
# 1. 강사 정보 수정
vi content/instructors.json
vi content/curriculum.json

# 2. 사진 교체 (파일명: {id}.jpg)
mv ~/Downloads/new-photo.jpg assets/images/instructors/lee-hyungoo.jpg

# 3. 슬라이드의 강사진 표도 수동 수정 필요 (index.html 라인 ~270)
vi index.html

# 4. 푸시
git add -A && git commit -m "Update instructor: 이현구 → 김XX" && git push
```

GitHub Pages 가 1~2분 안에 자동 재빌드 합니다.

## 회차 변경 시

회차 변경(주제/일자/강사)은 `content/curriculum.json` 의 해당 객체를 수정.
슬라이드의 16회차 카드(`index.html` PART 8 섹션)는 별도로 수동 수정 필요 — 현재는 데이터 바인딩되어 있지 않음.

## 강사 자료(슬라이드/실습) 업로드 위치

**이 사이트는 OT 자료 전용입니다.** 강사들의 본 강의 슬라이드/실습 자료는
**AITY 플랫폼 (https://aity.co.kr)** 의 각 회차 모듈 안에 업로드됩니다.

- 강사가 본인 모듈 화면에 Google 슬라이드/PDF 임베드
- 운영팀이 사전에 회차 골격(0교시 OT / 1교시 / 읽기자료 등)을 만들어 둠
- 강사는 각 섹션에 자료만 채워 넣으면 됨

## 외부 종속성 점검

이 사이트는 외부 CDN 에 의존합니다. 점검 주기 권장:
- [Reveal.js 5.x via jsDelivr](https://cdn.jsdelivr.net/npm/reveal.js@5/) — 글로벌 CDN
- [Pretendard via jsDelivr](https://cdn.jsdelivr.net/gh/orioncactus/pretendard/) — 한글 폰트
- GitHub Pages — `https://jkwon-startup.github.io/aity-ceo-ot/`

CDN 다운 시 슬라이드 스타일/폰트 깨짐 가능. 발생 시:
1. 다른 CDN 으로 교체 (cdnjs, unpkg)
2. 또는 라이브러리를 `assets/vendor/` 에 다운로드해서 self-host

## 사이트 이전 / 백업

GitHub repo `jkwon-startup/aity-ceo-ot` 을 그대로 fork 하면 됩니다.
- 새 repo 명: 예) `aity-ceo-ot-2nd-cohort`
- `Settings → Pages → Source: main` 활성화
- `index.html` 등에 박힌 절대 URL (`jkwon-startup.github.io/aity-ceo-ot`) 을 새 URL 로 일괄 치환

## 연락 / 문의

- 사이트 코드 관련 (Apps Script 포함): 레포 issues 또는 권정선 (사이트 작성자)
- 강의 운영: 서울AI허브
- AITY 플랫폼 자체: support@aity.co.kr
