# Apps Script — Google Slides Builder

이 폴더의 `Code.gs` 는 Google Apps Script 로 사용자의 빈 Google Slides 에 OT 자료 60장을 자동 생성합니다.

## 실행 방법 (3분)

1. **Apps Script 프로젝트 생성**
   - https://script.google.com 접속 → "새 프로젝트"
   - 프로젝트명: `AITY OT Builder` (자유)

2. **코드 붙여넣기**
   - 좌측 파일 탭에서 `Code.gs` 선택 → 기본 내용 모두 삭제
   - 본 폴더의 [`Code.gs`](./Code.gs) 전체 내용을 복사해서 붙여넣기

3. **실행**
   - 상단 함수 선택 메뉴에서 `buildOT` 선택
   - **▶ 실행** 버튼 클릭
   - 권한 승인 (최초 1회) — Google 계정 선택 → "고급" → "안전하지 않은 페이지로 이동" → "허용"
   - 1~2분 대기

4. **결과 확인**
   - https://docs.google.com/presentation/d/1TYj3iCbmDziNRjnWWEWn2QiuVSWCtUWwxuSzGKAxsqw/edit

## 주의

- **대상 Slides의 기존 슬라이드는 모두 삭제**됩니다.
- 다른 Slides 에 채우려면 `Code.gs` 상단 `PRESENTATION_ID` 값만 바꾸면 됩니다.
- 이미지는 GitHub Pages(`https://jkwon-startup.github.io/aity-ceo-ot/...`) 에서 가져옵니다. Pages 가 살아있어야 이미지가 보입니다.

## 문제 해결

- **이미지가 안 보임** — Apps Script 로그 (보기 → 실행 로그) 에서 에러 메시지 확인. GitHub Pages URL 직접 브라우저에서 열어 200 응답 확인.
- **권한 오류** — 스크립트가 Slides + 외부 URL 접근을 모두 요구합니다. 둘 다 승인해야 함.
- **6분 타임아웃** — 60장 + 이미지 다운로드라 약 1.5~2분 정도 소요. 문제 없음.

## 슬라이드 수정 후 재실행

`Code.gs` 의 슬라이드 데이터(SESSIONS, AI_MATRIX 등)를 수정하면 다음 실행 시 모두 다시 생성됩니다.
