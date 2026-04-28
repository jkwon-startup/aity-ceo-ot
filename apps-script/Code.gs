/**
 * AI Native CEO 강사 OT — Google Slides Builder (Apps Script)
 *
 * 실행 방법:
 *   1. https://script.google.com 에서 새 프로젝트 생성
 *   2. 본 파일 내용을 Code.gs 에 붙여넣기
 *   3. 메뉴 → 실행 → buildOT  (최초 1회 권한 승인)
 *   4. 약 1~2분 후 사용자 Slides 에 60장 슬라이드가 채워짐
 *
 * 대상 Slides 가 비어있어야 합니다. 기존 슬라이드는 모두 삭제됩니다.
 */

const PRESENTATION_ID = '1TYj3iCbmDziNRjnWWEWn2QiuVSWCtUWwxuSzGKAxsqw';
const IMG_BASE = 'https://jkwon-startup.github.io/aity-ceo-ot/assets/images/manual/';

// AITY Lavender brand
const COLORS = {
  primary: '#7A5FFF',
  primaryDark: '#5C44D9',
  primarySoft: '#EFE9FF',
  text: '#1A1A1A',
  muted: '#5A5A66',
  white: '#FFFFFF',
  redBg: '#FFEBE5',
  red: '#C0392B',
  greenBg: '#E2F1E8',
  green: '#1F3D2C',
};

// ───────────────────────── ENTRY POINT ─────────────────────────
function buildOT() {
  const pres = SlidesApp.openById(PRESENTATION_ID);
  pres.setPageSize(SlidesApp.PageSize.WIDESCREEN_16_9);

  // Clear existing slides
  const existing = pres.getSlides();
  for (let i = existing.length - 1; i >= 0; i--) {
    if (i === 0) {
      // Reuse first slide; clear its content
      const sl = existing[0];
      sl.getPageElements().forEach(e => e.remove());
      continue;
    }
    existing[i].remove();
  }

  let idx = 0;

  // 1. Welcome
  buildWelcome(pres.getSlides()[0]);
  idx++;

  // 2. OT 목적
  buildOTPurpose(pres.appendSlide(SlidesApp.PredefinedLayout.BLANK)); idx++;

  // 3. PART 1
  buildPartTitle(pres.appendSlide(SlidesApp.PredefinedLayout.BLANK), 1, '프로젝트 개요', '왜 이 강의가, 누구를 위해, 어떻게 운영되는가'); idx++;

  // 4. 운영 주체
  buildOperators(pres.appendSlide(SlidesApp.PredefinedLayout.BLANK)); idx++;

  // 5. 핵심 컨셉
  buildConcept(pres.appendSlide(SlidesApp.PredefinedLayout.BLANK)); idx++;

  // 6. 운영 구조
  buildStructure(pres.appendSlide(SlidesApp.PredefinedLayout.BLANK)); idx++;

  // 7. 수강 대상
  buildAudience(pres.appendSlide(SlidesApp.PredefinedLayout.BLANK)); idx++;

  // 8. AI 역할 매트릭스
  buildAiMatrix(pres.appendSlide(SlidesApp.PredefinedLayout.BLANK)); idx++;

  // 9. PART 2
  buildPartTitle(pres.appendSlide(SlidesApp.PredefinedLayout.BLANK), 2, '강사진 8인 · 회차 매핑', '누가 어디서 무엇을 가르치는가'); idx++;

  // 10. 8인 강사진
  buildInstructors(pres.appendSlide(SlidesApp.PredefinedLayout.BLANK)); idx++;

  // 11. 핸드오프 원칙
  buildHandoff(pres.appendSlide(SlidesApp.PredefinedLayout.BLANK)); idx++;

  // 12. PART 3
  buildPartTitle(pres.appendSlide(SlidesApp.PredefinedLayout.BLANK), 3, '교육 목표 · 산출물', '수강생이 8주 후 무엇을 가지고 나가는가'); idx++;

  // 13. 9가지 교육 목표
  buildGoals(pres.appendSlide(SlidesApp.PredefinedLayout.BLANK)); idx++;

  // 14. 최종 산출물
  buildDeliverables(pres.appendSlide(SlidesApp.PredefinedLayout.BLANK)); idx++;

  // 15. PART 4
  buildPartTitle(pres.appendSlide(SlidesApp.PredefinedLayout.BLANK), 4, 'AITY 플랫폼 — Big Picture', 'aity.co.kr — 모듈 → 커리큘럼 → 클래스'); idx++;

  // 16. AITY 구조
  buildAityStructure(pres.appendSlide(SlidesApp.PredefinedLayout.BLANK)); idx++;

  // 17. 4가지 핵심 기능
  buildAityFeatures(pres.appendSlide(SlidesApp.PredefinedLayout.BLANK)); idx++;

  // 18. PART 5
  buildPartTitle(pres.appendSlide(SlidesApp.PredefinedLayout.BLANK), 5, 'AITY 사용법 ① 대시보드 입장', 'aity.co.kr → 강사 토글 → 대시보드'); idx++;

  // 19-23. 입장 5단계
  buildShot(pres.appendSlide(SlidesApp.PredefinedLayout.BLANK), 'STEP 1 — 강사 토글 확인 (우측 상단)', 'mentor-03.png'); idx++;
  buildShot(pres.appendSlide(SlidesApp.PredefinedLayout.BLANK), 'STEP 2 — 멘토 대시보드 진입', 'mentor-05.png'); idx++;
  buildShot(pres.appendSlide(SlidesApp.PredefinedLayout.BLANK), 'STEP 3 — 좌측 메뉴 → 수업 관리', 'mentor-08.png'); idx++;
  buildShot(pres.appendSlide(SlidesApp.PredefinedLayout.BLANK), 'STEP 4 — 오늘의 클래스 → 상세보기', 'mentor-09.png'); idx++;
  buildShot(pres.appendSlide(SlidesApp.PredefinedLayout.BLANK), 'STEP 5 — Google Meet 입장 클릭', 'mentor-11.png'); idx++;

  // 24. PART 6
  buildPartTitle(pres.appendSlide(SlidesApp.PredefinedLayout.BLANK), 6, 'AITY 사용법 ② 수업 운영 & 녹화', '자동 녹화 → 수업 진행 → 종료 절차'); idx++;

  // 25-27. 자동/수동 녹화
  buildShot(pres.appendSlide(SlidesApp.PredefinedLayout.BLANK), '입장 직후 — 자동 녹화 활성화 확인', 'mentor-13.png',
    "오른쪽 상단 빨간 점 + '녹화 중' 표시 / Gemini 회의록 작성 알림"); idx++;
  buildShot(pres.appendSlide(SlidesApp.PredefinedLayout.BLANK), '녹화 중 표시 확인', 'mentor-14.png'); idx++;
  buildShot(pres.appendSlide(SlidesApp.PredefinedLayout.BLANK), '자동 녹화가 안 되는 경우 — 수동 녹화', 'mentor-15.png',
    "더보기(⋮) → 녹화 시작 → '실시간 스트리밍 알리기' 동의"); idx++;

  // 28. ⚠️ 종료 절차
  buildShutdownProcedure(pres.appendSlide(SlidesApp.PredefinedLayout.BLANK)); idx++;

  // 29-31. 종료 단계
  buildShot(pres.appendSlide(SlidesApp.PredefinedLayout.BLANK), '종료 단계 1 — 녹화 먼저 중지', 'mentor-20.png'); idx++;
  buildShot(pres.appendSlide(SlidesApp.PredefinedLayout.BLANK), '종료 단계 2 — 중지 버튼 클릭', 'mentor-23.png'); idx++;
  buildShot(pres.appendSlide(SlidesApp.PredefinedLayout.BLANK), '종료 단계 3 — 모든 참여자 내보내고 통화 종료', 'mentor-25.png',
    "녹화본은 익일 오후 수강생 화면 '녹화본' 탭에 자동 게시됩니다."); idx++;

  // 32. PART 7
  buildPartTitle(pres.appendSlide(SlidesApp.PredefinedLayout.BLANK), 7, 'AITY 사용법 ③ 수강생 화면 이해', '강사가 알아야 할 학생의 경험'); idx++;

  // 33-35. 수강생 화면
  buildShot(pres.appendSlide(SlidesApp.PredefinedLayout.BLANK), '커리큘럼 탭 — 강사가 올린 자료가 그대로 노출', 'student-curriculum.png',
    '수업 시작 1일 전까지 자료 업로드 권장'); idx++;
  buildShot(pres.appendSlide(SlidesApp.PredefinedLayout.BLANK), '회차별 모듈 구조 — 수강생 시각', 'student-module.png',
    '0교시 OT / 1교시 본강의 / 강의 전·후 읽기자료 / 실습 제출'); idx++;
  buildShot(pres.appendSlide(SlidesApp.PredefinedLayout.BLANK), '수강생의 출석률 = 수료 기준', 'student-progress.png',
    '수료 기준: 출석률 70% 이상'); idx++;

  // 36. PART 8
  buildPartTitle(pres.appendSlide(SlidesApp.PredefinedLayout.BLANK), 8, '16회차 디테일', '회차별 강사 / 일자 / 산출물 / 핸드오프'); idx++;

  // 37-52. 16회차 카드
  SESSIONS.forEach(sess => {
    buildSessionCard(pres.appendSlide(SlidesApp.PredefinedLayout.BLANK), sess);
    idx++;
  });

  // 53. PART 9
  buildPartTitle(pres.appendSlide(SlidesApp.PredefinedLayout.BLANK), 9, '운영 가이드', '사전 준비 → 수업 중 → 수업 후'); idx++;

  // 54. 사전 준비
  buildBefore(pres.appendSlide(SlidesApp.PredefinedLayout.BLANK)); idx++;

  // 55. 수업 중
  buildDuring(pres.appendSlide(SlidesApp.PredefinedLayout.BLANK)); idx++;

  // 56. 수업 후
  buildAfter(pres.appendSlide(SlidesApp.PredefinedLayout.BLANK)); idx++;

  // 57. ⚠️ Meet 계정 확인
  buildShot(pres.appendSlide(SlidesApp.PredefinedLayout.BLANK),
    '⚠️ 입장 시 본인 계정 확인 — 강사·수강생 모두',
    'meet-account-switch.png',
    '강사·수강생 모두 AITY 가입 이메일(=신청 시 구글 계정)로 Meet 입장 필요. 다른 계정 사용 시 출석 누락 + 호스트에게 승인 요청 알림 발생.'); idx++;

  // 58. 비상 상황 표
  buildEmergency(pres.appendSlide(SlidesApp.PredefinedLayout.BLANK)); idx++;

  // 59. FAQ
  buildFAQ(pres.appendSlide(SlidesApp.PredefinedLayout.BLANK)); idx++;

  // 60. CLOSING
  buildClosing(pres.appendSlide(SlidesApp.PredefinedLayout.BLANK)); idx++;

  // Page numbers
  const allSlides = pres.getSlides();
  const total = allSlides.length;
  allSlides.forEach((sl, i) => addPageNumber(sl, i + 1, total));

  Logger.log(`Built ${total} slides into ${PRESENTATION_ID}`);
}

// ───────────────────────── HELPERS ─────────────────────────
function setBg(slide, hex) {
  slide.getBackground().setSolidFill(hex);
}

function txt(slide, x, y, w, h, str, opts) {
  opts = opts || {};
  const tb = slide.insertTextBox(str || '', x, y, w, h);
  const tf = tb.getText();
  tf.getTextStyle()
    .setFontFamily(opts.font || 'Pretendard')
    .setFontSize(opts.size || 14)
    .setBold(!!opts.bold)
    .setForegroundColor(opts.color || COLORS.text);
  if (opts.align) {
    tf.getParagraphStyle().setParagraphAlignment(opts.align);
  }
  return tb;
}

function rect(slide, x, y, w, h, fill, opts) {
  opts = opts || {};
  const r = slide.insertShape(SlidesApp.ShapeType.ROUND_RECTANGLE, x, y, w, h);
  r.getFill().setSolidFill(fill);
  r.getBorder().setTransparent();
  return r;
}

function rectWithText(slide, x, y, w, h, fill, str, opts) {
  opts = opts || {};
  const r = slide.insertShape(SlidesApp.ShapeType.ROUND_RECTANGLE, x, y, w, h);
  r.getFill().setSolidFill(fill);
  r.getBorder().setTransparent();
  const tx = r.getText();
  tx.setText(str);
  tx.getTextStyle()
    .setFontFamily('Pretendard')
    .setFontSize(opts.size || 12)
    .setBold(!!opts.bold)
    .setForegroundColor(opts.color || COLORS.text);
  tx.getParagraphStyle().setParagraphAlignment(opts.align || SlidesApp.ParagraphAlignment.CENTER);
  return r;
}

function badge(slide, cx, y, str, w) {
  w = w || 140;
  const x = cx - w / 2;
  return rectWithText(slide, x, y, w, 26, COLORS.primary, str, {
    color: COLORS.white, bold: true, size: 11
  });
}

function addPageNumber(slide, n, total) {
  if (n === 1) return; // skip on title slide
  txt(slide, 850, 530, 90, 18, n + ' / ' + total, {
    size: 8, color: COLORS.muted, align: SlidesApp.ParagraphAlignment.END
  });
}

// Title style: width 960, height 540 (16:9 widescreen, default Slides API points: 720x405 actually)
// Actually Slides default 16:9 is 960x540 EMU points
const W = 960, H = 540;

// ───────────────────────── SLIDE BUILDERS ─────────────────────────
function buildWelcome(slide) {
  setBg(slide, COLORS.primarySoft);
  badge(slide, W / 2, 180, '강사 8인 OT — 2026.04', 200);
  txt(slide, 60, 215, W - 120, 80, 'AI Native CEO 강사 운영 OT', {
    size: 38, bold: true, align: SlidesApp.ParagraphAlignment.CENTER
  });
  txt(slide, 80, 320, W - 160, 80,
    '서울시 · 서울AI허브(서울대학교 산업AI센터) × AITY\nAI 기반 1인 기업가 실전 운영·구현 역량 확보 프로그램 · 48H · 16회차 · 8주', {
    size: 13, color: COLORS.muted, align: SlidesApp.ParagraphAlignment.CENTER
  });
}

function buildOTPurpose(slide) {
  txt(slide, 50, 30, W - 100, 40, '오늘 OT의 목적', { size: 24, bold: true });
  const items = [
    ['"누가 무엇을 어떻게"', '8인 강사진의 역할·일정·핸드오프 정렬'],
    ['AITY 플랫폼', '모듈/커리큘럼/클래스 흐름 + 수업 운영 방법'],
    ['운영 원칙', '녹화·출석·게시판·비상 대응 합의'],
    ['핸드오프', '인접 회차 강사 간 산출물·컨텍스트 인계 룰 합의'],
  ];
  let y = 100;
  items.forEach(([k, v]) => {
    txt(slide, 60, y, 180, 30, '• ' + k, { size: 14, bold: true, color: COLORS.primaryDark });
    txt(slide, 250, y, W - 310, 30, v, { size: 13, color: COLORS.text });
    y += 50;
  });
  rect(slide, 50, 360, W - 100, 70, COLORS.primarySoft);
  txt(slide, 70, 372, W - 140, 50,
    '이 사이트는 OT 이후에도 두고두고 보는 레퍼런스입니다.\n우측 상단의 매뉴얼 / 회차 / FAQ 페이지가 OT 이후 강사 분들의 운영 안내서가 됩니다.',
    { size: 11, color: COLORS.primaryDark });
}

function buildPartTitle(slide, num, title, sub) {
  badge(slide, W / 2, 180, 'PART ' + num, 110);
  txt(slide, 60, 215, W - 120, 80, title, {
    size: 32, bold: true, align: SlidesApp.ParagraphAlignment.CENTER
  });
  if (sub) {
    txt(slide, 60, 310, W - 120, 30, sub, {
      size: 12, color: COLORS.muted, align: SlidesApp.ParagraphAlignment.CENTER
    });
  }
}

function buildOperators(slide) {
  txt(slide, 50, 30, W - 100, 40, '운영 주체', { size: 24, bold: true });
  txt(slide, 50, 75, W - 100, 25, '서울시의 "서울AI허브"에서 진행하는 스타트업 육성 프로그램입니다.', {
    size: 12, color: COLORS.muted
  });
  const cards = [
    ['서울시', '주관 · 스타트업 육성 사업'],
    ['서울AI허브\n(서울대학교 산업AI센터)', '위탁 운영 · 강의 기획·관리·모객'],
    ['AITY', '온라인 LMS 플랫폼 (aity.co.kr)\n강의 운영·녹화·출석'],
  ];
  const cw = (W - 100 - 40) / 3;
  cards.forEach(([t, b], i) => {
    const x = 50 + i * (cw + 20);
    rect(slide, x, 130, cw, 160, COLORS.primarySoft);
    txt(slide, x + 15, 150, cw - 30, 60, t, { size: 14, bold: true, color: COLORS.primaryDark });
    txt(slide, x + 15, 220, cw - 30, 60, b, { size: 11, color: COLORS.text });
  });
  txt(slide, 50, 320, W - 100, 25,
    '※ 강사진은 서울AI허브가 위촉, 강의 운영은 AITY 플랫폼에서 진행됩니다.',
    { size: 10, color: COLORS.muted });
}

function buildConcept(slide) {
  txt(slide, 50, 30, W - 100, 40, '강의의 핵심 컨셉', { size: 24, bold: true });
  txt(slide, 50, 80, W - 100, 50,
    '"AI를 잘 쓰는 사람"이 아니라 "AI를 인력처럼 배치해 사업을 운영하는 사람"으로의 전환',
    { size: 16, bold: true, color: COLORS.primaryDark });
  rect(slide, 70, 175, 380, 200, COLORS.primarySoft);
  txt(slide, 90, 195, 340, 30, 'BEFORE', { size: 14, bold: true, color: COLORS.primaryDark });
  txt(slide, 90, 235, 340, 130,
    '"ChatGPT로 카피 좀 뽑아 봐야지"\n— 단발성 도구 사용', { size: 12 });

  rect(slide, 510, 175, 380, 200, COLORS.primary);
  txt(slide, 530, 195, 340, 30, 'AFTER', { size: 14, bold: true, color: COLORS.white });
  txt(slide, 530, 235, 340, 130,
    '"리드 1차 분류는 마케터 AI, 회계 정리는 회계보조 AI에 맡긴다"\n— 인력 배치 사고',
    { size: 12, color: COLORS.white });
}

function buildStructure(slide) {
  txt(slide, 50, 30, W - 100, 40, '운영 구조 한눈에', { size: 24, bold: true });
  const rows = [
    ['기간', '2026-06-09(화) ~ 2026-07-31(금) · 총 8주'],
    ['회차', '16회차 · 총 48시간 (주 2회 운영)'],
    ['온라인', '화요일 19:00~21:00 (2H) — 개념 강의 · 사례 분석 · 사전준비'],
    ['오프라인', '금요일 19:00~23:00 (4H) — 실습 · 워크숍 · 발표 · 산출물 완성'],
    ['참가자', '1인 기업가 · 스타트업 CEO · 프리랜서 · 퇴직 예정 교수·연구자'],
    ['전제조건', 'Claude 유료 구독 · 노트북 실습 가능 · 생성형 AI 사용 경험'],
  ];
  let y = 95;
  rows.forEach(([k, v]) => {
    rectWithText(slide, 50, y, 130, 36, COLORS.primarySoft, k, {
      size: 12, bold: true, color: COLORS.primaryDark
    });
    txt(slide, 195, y + 8, W - 245, 26, v, { size: 11 });
    y += 48;
  });
}

function buildAudience(slide) {
  txt(slide, 50, 30, W - 100, 40, '수강 대상 — 누구를 가르치는가', { size: 24, bold: true });
  txt(slide, 50, 90, 200, 25, '[필수 조건]', { size: 13, bold: true, color: COLORS.primaryDark });
  txt(slide, 60, 120, W - 120, 60,
    '• 생성형 AI를 업무·프로젝트에 활용해 본 경험\n• Claude 유료 구독 · 노트북 기반 실습 가능',
    { size: 12 });
  txt(slide, 50, 200, 200, 25, '[특히 추천 — 둘 이상 해당]', {
    size: 13, bold: true, color: COLORS.primaryDark
  });
  txt(slide, 60, 230, W - 120, 200,
    '• 1인 기업가 / 1인 연구소 / 프리랜서 / 퇴직 예정 교수·연구자\n' +
    '• 스타트업 CEO 또는 임원\n' +
    '• "AI Workflow를 이해하고 조직을 효율화하고 싶은 CEO"\n' +
    '• "AI 도구는 써봤지만 사업 운영 체계로 연결되지 않은 사람"',
    { size: 12 });
}

function buildAiMatrix(slide) {
  txt(slide, 50, 30, W - 100, 40, '9가지 AI 역할 매트릭스', { size: 24, bold: true });
  const matrix = AI_MATRIX;
  let y = 90;
  matrix.forEach(m => {
    rectWithText(slide, 50, y, 220, 32, COLORS.primarySoft, m.role, {
      size: 11, bold: true, color: COLORS.primaryDark
    });
    txt(slide, 285, y + 7, W - 335, 24, m.what, { size: 10 });
    y += 40;
  });
}

function buildInstructors(slide) {
  txt(slide, 50, 30, W - 100, 40, '8인 강사진', { size: 24, bold: true });
  const map = [
    ['이현구', 'AI-First 사업 구조 · 시장조사·오퍼·브랜드', '1·2회차 (1주)'],
    ['이상수', '법·행정·운영 체크리스트 · 회계·세무 보조', '3·4회차 (2주)'],
    ['권정선', '마케팅 · 랜딩 · 콘텐츠 · 검증', '5·6회차 (3주)'],
    ['김민규', '개발 기초 · Claude Code · Git/GitHub · API', '7·8회차 (4주)'],
    ['곽은철', 'Claude Code · MCP · Skills · SOP', '9·10회차 (5주)'],
    ['김주영', 'MVP 범위 · 작업 지시문 · 바이브 코딩', '11·12회차 (6주)'],
    ['박준', '에이전트 · 병렬 운영 · MCP 연동', '13·14회차 (7주)'],
    ['진대연', 'Founder AI OS', '15·16회차 (8주, 마지막)'],
  ];
  let y = 90;
  map.forEach(([n, role, sess]) => {
    rect(slide, 50, y, W - 100, 38, COLORS.primarySoft);
    txt(slide, 65, y + 9, 95, 24, n, { size: 13, bold: true, color: COLORS.primaryDark });
    txt(slide, 175, y + 11, 510, 24, role, { size: 11 });
    txt(slide, 700, y + 11, 200, 24, sess, {
      size: 10, color: COLORS.muted, align: SlidesApp.ParagraphAlignment.END
    });
    y += 48;
  });
}

function buildHandoff(slide) {
  txt(slide, 50, 30, W - 100, 40, '강사 간 핸드오프 원칙', { size: 24, bold: true });
  rect(slide, 50, 100, 420, 180, COLORS.primarySoft);
  txt(slide, 70, 120, 380, 30, '① 같은 강사 내 (온→오프)', {
    size: 14, bold: true, color: COLORS.primaryDark
  });
  txt(slide, 70, 165, 380, 110,
    '온라인 회차에서 만든 1차본·과제를 오프라인 회차에서 완성. 강사가 직접 연결.',
    { size: 12 });

  rect(slide, 490, 100, 420, 180, COLORS.primarySoft);
  txt(slide, 510, 120, 380, 30, '② 다른 강사 간 (이전→다음)', {
    size: 14, bold: true, color: COLORS.primaryDark
  });
  txt(slide, 510, 165, 380, 110,
    '마지막 회차의 산출물·핸드오프 메모를 다음 강사에게 게시판/슬랙으로 전달. 다음 강사는 첫 5분 안에 "지난 회차 요약"으로 시작.',
    { size: 12 });

  rect(slide, 50, 320, W - 100, 70, COLORS.primarySoft);
  txt(slide, 70, 340, W - 140, 35,
    '🔑 모든 회차의 핸드오프 메모는 공유된 노션 사이트의 매뉴얼 → 회차별 페이지에 사전 작성되어 있습니다.',
    { size: 12, bold: true, color: COLORS.primaryDark });
}

function buildGoals(slide) {
  txt(slide, 50, 30, W - 100, 40, '9가지 핵심 교육 목표', { size: 24, bold: true });
  const goals = [
    'AI를 활용한 1인 기업 운영 구조 설계',
    '대표 직접 / AI 위임 / 전문가 외주 3구분 기준 확보',
    '비즈니스 핵심 기능을 AI와 역할 분담하는 구조 내재화',
    '법무·세무·행정·운영을 AI 기반 실무 보조 체계로 정리',
    'API·데이터·스크립트 이해 — 기초 개발 문해력',
    'Claude Code 기반 반복 가능한 작업 스킬 설계',
    'AI와 협업하는 미니 MVP 구현 · 바이브 코딩',
    'MCP 활용 — 자료·도구·문서를 연결하는 업무 실행형 AI 환경',
    '역할별 에이전트의 병렬 운영 모델 구축',
  ];
  txt(slide, 50, 90, W - 100, 360, goals.map((g, i) => (i + 1) + '. ' + g).join('\n'),
    { size: 13 });
}

function buildDeliverables(slide) {
  txt(slide, 50, 30, W - 100, 40, '최종 산출물 — Founder AI OS', { size: 24, bold: true });
  const blocks = [
    ['역할·운영 자산', 'AI 업무 분업도 + 분장표\n법·행정·운영 체크리스트\nSOP 3개 + 작업 지시 템플릿', COLORS.primarySoft, COLORS.primaryDark, COLORS.text],
    ['마케팅·브랜드 자산', '고객 문제 정의서 + 오퍼\n브랜드 메시지 + 브랜드맵\n랜딩 구조 + 검증 콘텐츠 패키지', COLORS.primarySoft, COLORS.primaryDark, COLORS.text],
    ['구현·자동화 자산', 'Claude Code 환경 + GitHub repo\nMCP 2개 + 재사용 스킬 3종\n작동하는 미니 MVP 1개', COLORS.primarySoft, COLORS.primaryDark, COLORS.text],
    ['통합 OS', '에이전트 구조도 + 역할 정의서\nFounder AI OS 1차본\n90일 실행 로드맵', COLORS.primary, COLORS.white, COLORS.white],
  ];
  blocks.forEach(([t, b, fill, tc, bc], i) => {
    const x = 50 + (i % 2) * 430;
    const y = 90 + Math.floor(i / 2) * 175;
    rect(slide, x, y, 410, 155, fill);
    txt(slide, x + 18, y + 16, 380, 26, t, { size: 13, bold: true, color: tc });
    txt(slide, x + 18, y + 50, 380, 100, b, { size: 11, color: bc });
  });
}

function buildAityStructure(slide) {
  txt(slide, 50, 30, W - 100, 40, 'AITY는 어떤 구조인가', { size: 24, bold: true });
  const flow = [
    ['📦 모듈', COLORS.primarySoft, COLORS.primaryDark],
    ['📚 커리큘럼', COLORS.greenBg, COLORS.green],
    ['🎓 클래스', COLORS.primary, COLORS.white],
    ['👥 수강생', COLORS.greenBg, COLORS.green],
  ];
  let x = 70;
  flow.forEach((it, i) => {
    rectWithText(slide, x, 105, 180, 60, it[1], it[0], {
      size: 14, bold: true, color: it[2]
    });
    if (i < flow.length - 1) {
      txt(slide, x + 185, 120, 25, 30, '→', {
        size: 18, color: COLORS.muted, align: SlidesApp.ParagraphAlignment.CENTER
      });
    }
    x += 210;
  });
  txt(slide, 50, 210, W - 100, 200,
    '• 모듈: 강사가 만든 학습 단위 (슬라이드·자료·실습 1세트)\n' +
    '• 커리큘럼: 모듈을 묶어 만든 회차 구성\n' +
    '• 클래스: 커리큘럼을 시간표·강사·수강생과 연결한 운영 단위\n\n' +
    '이번 강의에서는 운영팀이 사전에 커리큘럼·클래스를 만들어 두고, 강사는 모듈 콘텐츠 업로드 + 수업 진행에 집중합니다.',
    { size: 12 });
}

function buildAityFeatures(slide) {
  txt(slide, 50, 30, W - 100, 40, '강사가 사용하는 4가지 핵심 기능', { size: 24, bold: true });
  const f = [
    ['1. 멘토 대시보드', '오늘의 클래스 · 학생 진도 · 알림'],
    ['2. 수업 관리', '클래스 상세 · 커리큘럼 · 출석 · 녹화본'],
    ['3. Google Meet 입장', '한 번 클릭으로 자동 녹화 시작'],
    ['4. 게시판 / Q&A', '수강생과 비동기 소통 · 댓글'],
  ];
  f.forEach((it, i) => {
    const x = 50 + (i % 2) * 430;
    const y = 100 + Math.floor(i / 2) * 130;
    rect(slide, x, y, 410, 110, COLORS.primarySoft);
    txt(slide, x + 18, y + 16, 380, 30, it[0], { size: 14, bold: true, color: COLORS.primaryDark });
    txt(slide, x + 18, y + 55, 380, 50, it[1], { size: 12 });
  });
  rect(slide, 50, 380, W - 100, 50, COLORS.primarySoft);
  txt(slide, 70, 392, W - 140, 30,
    '💡 강사 사이트 화면 우측 상단 토글이 "강사"로 되어 있는지 항상 먼저 확인하세요.',
    { size: 12, color: COLORS.primaryDark });
}

function buildShot(slide, title, imgFile, caption) {
  txt(slide, 50, 25, W - 100, 30, title, { size: 18, bold: true, color: COLORS.primary });
  try {
    const url = IMG_BASE + imgFile;
    const img = slide.insertImage(url);
    // Resize image to fit. Default insertion is large.
    const maxW = 760;
    const maxH = 360;
    const iw = img.getWidth();
    const ih = img.getHeight();
    const scale = Math.min(maxW / iw, maxH / ih);
    const nw = iw * scale;
    const nh = ih * scale;
    img.setWidth(nw);
    img.setHeight(nh);
    img.setLeft((W - nw) / 2);
    img.setTop(70);
  } catch (e) {
    txt(slide, 50, 200, W - 100, 50, '[이미지 로드 실패: ' + imgFile + ']', {
      size: 12, color: COLORS.red
    });
  }
  if (caption) {
    txt(slide, 50, 460, W - 100, 60, caption, {
      size: 11, color: COLORS.muted, align: SlidesApp.ParagraphAlignment.CENTER
    });
  }
}

function buildShutdownProcedure(slide) {
  setBg(slide, COLORS.redBg);
  txt(slide, 50, 30, W - 100, 40, '⚠️ 수업 종료 절차 — 이게 가장 중요합니다', {
    size: 22, bold: true, color: COLORS.red
  });
  const steps = [
    "1. 녹화를 먼저 중지 (오른쪽 상단 '녹화 중' 클릭 → 중지)",
    "2. '녹화 중지됨' 표시 확인",
    '3. 아래 빨간 통화 끊기 버튼 클릭',
    "4. '모든 참여자를 내보내고 통화 종료' 선택 (그냥 나가기 ❌)",
  ];
  let y = 110;
  steps.forEach(s => {
    txt(slide, 70, y, W - 140, 35, s, { size: 15 });
    y += 50;
  });
  rect(slide, 50, 380, W - 100, 60, '#FFC0B0');
  txt(slide, 70, 395, W - 140, 35,
    "🚫 녹화가 활성화된 상태에서는 '모든 참여자 내보내기' 버튼이 비활성화됩니다.",
    { size: 12, bold: true, color: COLORS.red });
}

function buildSessionCard(slide, sess) {
  const isLast = sess.no === 16;
  const headFill = isLast ? COLORS.primary : COLORS.primarySoft;
  const headFg = isLast ? COLORS.white : COLORS.text;
  const fmt = sess.format === 'online' ? '💻 온라인 2H' : '📕 오프라인 4H';
  const instr = INSTRUCTORS[sess.instructor] || { name: '—' };

  rect(slide, 50, 50, W - 100, 170, headFill);
  txt(slide, 70, 65, W - 140, 24,
    sess.week + '주차 · ' + sess.no + '회차 · ' + sess.date + '(' + sess.weekday + ') · ' + fmt + ' · ' + instr.name,
    { size: 11, color: isLast ? COLORS.white : COLORS.muted });
  const titlePrefix = isLast ? '🎓 ' : '';
  txt(slide, 70, 95, W - 140, 60, titlePrefix + sess.title, {
    size: 18, bold: true, color: headFg
  });
  txt(slide, 70, 175, W - 140, 28, sess.aiRoles.join(' · '), {
    size: 11, color: isLast ? COLORS.white : COLORS.muted
  });

  let y = 250;
  txt(slide, 60, y, 90, 24, '📌 산출물', { size: 12, bold: true, color: COLORS.primaryDark });
  txt(slide, 165, y, W - 215, 50, sess.outputs.join('  ·  '), { size: 11 });
  y += 50;

  if (sess.homework && sess.homework.length) {
    txt(slide, 60, y, 90, 24, '📋 과제', { size: 12, bold: true, color: COLORS.primaryDark });
    txt(slide, 165, y, W - 215, 40, sess.homework.join('  ·  '), { size: 11 });
    y += 40;
  }

  if (sess.handoffNext) {
    txt(slide, 60, y, 90, 24, '🔁 핸드오프', { size: 12, bold: true, color: COLORS.primaryDark });
    txt(slide, 165, y, W - 215, 100, sess.handoffNext, { size: 10, color: COLORS.text });
  }
}

function buildBefore(slide) {
  txt(slide, 50, 30, W - 100, 40, '수업 30분 전 — 사전 준비 체크리스트', { size: 22, bold: true });
  const items = [
    "✅ aity.co.kr 로그인 + 우측 상단 토글이 '강사'인지 확인",
    "✅ 멘토 대시보드 → 수업 관리 → 오늘 클래스 '상세보기'",
    '✅ 모듈 자료(슬라이드/실습) 업로드 완료 확인',
    '✅ Google Meet 입장 → 자동 녹화 확인 → 사전 음성·화면 테스트',
    '✅ 게시판에 사전 안내 글 (선택) — 늦게 올 수강생을 위한 회차 요약',
  ];
  txt(slide, 60, 100, W - 120, 360, items.join('\n\n'), { size: 14 });
}

function buildDuring(slide) {
  txt(slide, 50, 30, W - 100, 40, '수업 중 — 운영 원칙 5가지', { size: 22, bold: true });
  const items = [
    '1. 시작·종료 시간 정확히 준수 (출석률이 곧 수료 기준)',
    '2. 녹화 상태 항상 확인 — 시작·중간·종료 3회 시각적 체크',
    '3. 채팅 + 입말 Q&A 병행 — 채팅 질문은 큰 소리로 다시 읽고 답변',
    '4. 실습 중간점검 30분 간격 — 막힌 수강생 1:1 음소거 해제 안내',
    "5. 마지막 5분 핸드오프 메모 — '다음 회차에서 무엇을 가져오는지' 발표",
  ];
  txt(slide, 60, 100, W - 120, 360, items.join('\n\n'), { size: 14 });
}

function buildAfter(slide) {
  txt(slide, 50, 30, W - 100, 40, '수업 종료 후 — 강사 액션', { size: 22, bold: true });
  const items = [
    '• 당일 24시간 내: 게시판 미답변 질문 코멘트',
    '• D+1 오후: 녹화본 자동 게시 확인 (수강생이 볼 수 있는 상태)',
    "• 다음 회차 강사에게 핸드오프 메모 전달: '지난 회차 산출물 + 미진한 부분'",
    "• 운영진 단톡방에 '회차 종료' 한 줄 보고",
  ];
  txt(slide, 60, 100, W - 120, 360, items.join('\n\n'), { size: 14 });
}

function buildEmergency(slide) {
  txt(slide, 50, 30, W - 100, 40, '비상 상황 5가지 + 즉시 대응', { size: 22, bold: true });
  const rows = [
    ['녹화 자동 시작 안 됨', "더보기(⋮) → 녹화 시작 → '스트리밍 알리기' 동의"],
    ['수강생 입장 시 승인 요청 알림', '수강생 신청 구글계정 ≠ Meet 입장 계정 → 운영진 호출'],
    ['화면 공유 안 됨', "브라우저 권한 → '이 사이트의 화면 녹화 허용' 후 새로고침"],
    ['오디오 끊김·울림', '마이크/스피커 매칭 → 헤드셋 사용 권장 (기본)'],
    ['강사 본인 입장 못 함', '운영진 핫라인 → 임시 운영자가 Meet 시작'],
  ];
  let y = 95;
  rows.forEach(([s, a]) => {
    rect(slide, 50, y, 320, 56, COLORS.primarySoft);
    txt(slide, 65, y + 14, 295, 28, s, {
      size: 12, bold: true, color: COLORS.primaryDark
    });
    txt(slide, 390, y + 18, 520, 32, a, { size: 11 });
    y += 65;
  });
}

function buildFAQ(slide) {
  txt(slide, 50, 30, W - 100, 40, '자주 묻는 질문', { size: 22, bold: true });
  const faqs = [
    ['Q. 수업 시간 외 수강생 메시지에 응답 의무?',
     '→ 게시판 24시간 내 1회 코멘트 권장. 1:1 카톡/메일 응대는 강사 재량.'],
    ['Q. 강의 자료를 PPT로 가져가도 되나?',
     '→ 가능. AITY 모듈에는 Google 슬라이드 또는 PDF 링크 임베드 권장.'],
    ['Q. 수강생이 결석하면?',
     '→ 녹화본 익일 오후 게시. 출석률 70% 미만 시 수료 불가.'],
    ['Q. 강의 변경·연기?',
     '→ 운영진과 최소 D-3 사전 협의. 수강생 공지는 운영진 담당.'],
  ];
  let y = 95;
  faqs.forEach(([q, a]) => {
    txt(slide, 50, y, W - 100, 24, q, { size: 12, bold: true, color: COLORS.primaryDark });
    txt(slide, 60, y + 28, W - 120, 28, a, { size: 11 });
    y += 70;
  });
}

function buildClosing(slide) {
  setBg(slide, COLORS.primarySoft);
  badge(slide, W / 2, 130, 'CLOSING', 110);
  txt(slide, 50, 165, W - 100, 100, '함께 만들어가는\nAI Native CEO 프로그램', {
    size: 36, bold: true, align: SlidesApp.ParagraphAlignment.CENTER
  });
  txt(slide, 80, 320, W - 160, 60,
    "8명의 강사 · 16회차 · 48시간\n수강생이 'AI를 인력처럼 배치할 수 있는 사람'으로 졸업하도록 함께 설계해주세요.",
    { size: 13, color: COLORS.muted, align: SlidesApp.ParagraphAlignment.CENTER });
  txt(slide, 50, 470, W - 100, 30,
    '🌐 jkwon-startup.github.io/aity-ceo-ot · © 2026 서울시 · 서울AI허브 × AITY',
    { size: 9, color: COLORS.muted, align: SlidesApp.ParagraphAlignment.CENTER });
}

// ───────────────────────── DATA ─────────────────────────
const AI_MATRIX = [
  { role: '🔎 리서처 AI', what: '시장조사·경쟁사·고객문제·검증 가설' },
  { role: '📐 기획자 AI', what: '사업 구조화·오퍼·MVP 범위' },
  { role: '📣 마케터 AI', what: '메시지·랜딩 카피·CTA·채널 변형' },
  { role: '🗂 운영매니저 AI', what: 'SOP·체크리스트·승인 지점' },
  { role: '⚖️ 법무·행정 AI', what: '계약·개인정보·증빙 (최종 판단은 전문가)' },
  { role: '🧾 재무·회계 AI', what: '비용·증빙·기장 준비 (신고는 세무사)' },
  { role: '👨‍💻 주니어 개발자 AI', what: '코드 초안·API·데이터 가공' },
  { role: '🎯 프로덕트 매니저 AI', what: '요구사항·기능 분해·테스트' },
  { role: '🔁 에이전트 오퍼레이터', what: '실행·로그·병렬 분담·후속 작업' },
];

const INSTRUCTORS = {
  'lee-hyungoo': { name: '이현구' },
  'lee-sangsoo': { name: '이상수' },
  'kwon-jungsun': { name: '권정선' },
  'kim-mingyu': { name: '김민규' },
  'kwak-eunchul': { name: '곽은철' },
  'kim-juyoung': { name: '김주영' },
  'park-jun': { name: '박준' },
  'jin-daeyeon': { name: '진대연' },
};

const SESSIONS = [
  { no: 1, week: 1, date: '2026-06-09', weekday: '화', format: 'online', instructor: 'lee-hyungoo',
    title: 'AI-First 사업 구조 설계',
    aiRoles: ['전략기획 매니저 AI', '운영설계 매니저 AI'],
    outputs: ['내 사업 AI 역할맵 1차본'],
    homework: ['대표 업무 / AI 업무 / 외부 전문가 업무 구분표 초안'],
    handoffNext: '2회차에서 시장조사·오퍼·브랜드 메시지로 확장. 1차 역할맵을 가져와 한 줄 오퍼·브랜드 초안 작업의 기준점으로 사용.' },
  { no: 2, week: 1, date: '2026-06-12', weekday: '금', format: 'offline', instructor: 'lee-hyungoo',
    title: 'AI 보안·윤리·한계 + 시장조사 + 오퍼 + 브랜드 메시지',
    aiRoles: ['시장조사 분석가 AI', '상품기획자 AI', '브랜드 전략가 AI'],
    outputs: ['1차 오퍼 문장', '브랜드 메시지 초안', '고객 문제 정의서', 'AI 업무 분업도'],
    homework: ['시장조사 요약 시트', '검증 가설 3개'],
    handoffNext: '3회차(이상수)에서 법·행정·운영 체크리스트로 전환. 분업도가 정리되어야 어디까지 AI에 맡길지 결정 가능.' },
  { no: 3, week: 2, date: '2026-06-16', weekday: '화', format: 'online', instructor: 'lee-sangsoo',
    title: '법·행정·운영 체크리스트',
    aiRoles: ['법무 비서 AI', '회계·세무 준비 보조 AI'],
    outputs: ['법·행정·운영 체크리스트 1차본'],
    homework: ['변호사/세무사 상담 전 질문리스트'],
    handoffNext: '4회차에서 같은 강사가 실습으로 이어감. 체크리스트 → SOP 초안.' },
  { no: 4, week: 2, date: '2026-06-19', weekday: '금', format: 'offline', instructor: 'lee-sangsoo',
    title: '법·행정·운영 체크리스트 실습',
    aiRoles: ['회계·세무 준비 보조 AI'],
    outputs: ['증빙·계좌·세무사 전달자료 체크리스트'],
    homework: ['자동화 가능 구간 맵 — AI 처리 vs 세무사 판단'],
    handoffNext: '5회차(권정선)에서 마케팅·브랜드 단으로 이동. 운영 기반 다져진 상태.' },
  { no: 5, week: 3, date: '2026-06-23', weekday: '화', format: 'online', instructor: 'kwon-jungsun',
    title: '마케팅 — 랜딩 기획 + 콘텐츠·검증',
    aiRoles: ['카피라이터 AI', '콘텐츠 마케터 AI', '퍼포먼스 마케팅 보조 AI'],
    outputs: ['브랜드 핵심 메시지', '콘텐츠 마케팅 전략 노트'],
    homework: ['랜딩 구조 프레임 초안'],
    handoffNext: '6회차에서 같은 강사 실습 — 메시지 → 카피·콘텐츠 발전.' },
  { no: 6, week: 3, date: '2026-06-26', weekday: '금', format: 'offline', instructor: 'kwon-jungsun',
    title: '마케팅 실습 — 랜딩 + 검증 콘텐츠 패키지',
    aiRoles: ['카피라이터 AI', '콘텐츠 마케터 AI', '퍼포먼스 마케팅 보조 AI'],
    outputs: ['브랜드맵 초안', '랜딩 페이지 구조안', '검증용 콘텐츠 패키지'],
    homework: ['브랜드 맵 완성'],
    handoffNext: '7회차(김민규)에서 자동화·구현으로 → 개발 기초.' },
  { no: 7, week: 4, date: '2026-06-30', weekday: '화', format: 'online', instructor: 'kim-mingyu',
    title: '개발 기초 (API · 데이터 · 스크립트)',
    aiRoles: ['주니어 개발자 AI', '데이터 정리 분석 AI'],
    outputs: ['데이터 분류표', '자동화 가능 후보 리스트'],
    homework: ['GitHub 가입'],
    handoffNext: '8회차에서 같은 강사 — Claude Code + Git/GitHub 실습.' },
  { no: 8, week: 4, date: '2026-07-03', weekday: '금', format: 'offline', instructor: 'kim-mingyu',
    title: 'Claude Code 설치 + Git/GitHub + 데이터/API 실습',
    aiRoles: ['주니어 개발 실행 AI', '자동화 구축 보조 AI'],
    outputs: ['Claude Code 환경', 'GitHub 저장소', '데이터 구조 맵', 'API 호출 흐름도'],
    homework: ['직접 작성한 스크립트 1개'],
    handoffNext: '9회차(곽은철) — Claude Code + MCP/Skills/SOP 심화.' },
  { no: 9, week: 5, date: '2026-07-07', weekday: '화', format: 'online', instructor: 'kwak-eunchul',
    title: 'Claude Code 활용법 + MCP/Skills/SOP 개념',
    aiRoles: ['AI 작업매니저', '운영 프로세스 매니저 AI'],
    outputs: ['Skill / SOP 설계 틀 초안'],
    homework: ['업무 자동화 후보 리스트'],
    handoffNext: '10회차에서 같은 강사 — MCP 연결 + 스킬 설계.' },
  { no: 10, week: 5, date: '2026-07-10', weekday: '금', format: 'offline', instructor: 'kwak-eunchul',
    title: 'MCP 연결 + 스킬 설계 + 반복업무 SOP',
    aiRoles: ['업무 표준화 매니저 AI', '자동화 설계자 AI'],
    outputs: ['MCP 1개 연결', '재사용 스킬 2종', 'AI 작업 표준 문서'],
    homework: ['SOP 1개', '작업 지시 템플릿'],
    handoffNext: '11회차(김주영) — MVP 범위·작업 지시문 설계.' },
  { no: 11, week: 6, date: '2026-07-14', weekday: '화', format: 'online', instructor: 'kim-juyoung',
    title: 'MVP 범위 설정 + 작업 지시문 설계',
    aiRoles: ['프로덕트 매니저 AI', '요구사항 명세 보조 AI'],
    outputs: ['MVP 기획서 1차본', '기능 우선순위표'],
    homework: ['작업 지시문 템플릿'],
    handoffNext: '12회차에서 같은 강사 — 바이브 코딩 MVP.' },
  { no: 12, week: 6, date: '2026-07-17', weekday: '금', format: 'offline', instructor: 'kim-juyoung',
    title: '바이브 코딩 MVP 제작 + 중간 피드백',
    aiRoles: ['주니어 개발자 AI', 'QA 테스터 AI'],
    outputs: ['작동 MVP 1개', '기능 개선 목록', 'GitHub 저장', 'QA 체크리스트'],
    homework: ['자동화 후보 포인트', 'MVP 완성'],
    handoffNext: '13회차(박준) — 에이전트 개념·병렬 운영.' },
  { no: 13, week: 7, date: '2026-07-21', weekday: '화', format: 'online', instructor: 'park-jun',
    title: '에이전트 개념 + 병렬 운영 구조',
    aiRoles: ['에이전트 설계자 AI', 'AI 운영 오퍼레이터'],
    outputs: ['에이전트 후보 역할표'],
    homework: ['승인권자 원칙 문서 초안'],
    handoffNext: '14회차에서 같은 강사 — 에이전트 설계·MCP 연동.' },
  { no: 14, week: 7, date: '2026-07-24', weekday: '금', format: 'offline', instructor: 'park-jun',
    title: '에이전트 설계 (3개 병렬연결) + MCP 연동',
    aiRoles: ['에이전트 운영자 AI', '실행관리 매니저 AI'],
    outputs: ['병렬 운영 체크리스트', '에이전트 구조도', '프로토타입 (3개 병렬)'],
    homework: ['병렬 운영 체크리스트'],
    handoffNext: 'Founder AI OS 통합 → 진대연 강사.' },
  { no: 15, week: 8, date: '2026-07-28', weekday: '화', format: 'online', instructor: 'jin-daeyeon',
    title: 'Founder AI OS 구조화',
    aiRoles: ['Founder AI OS 설계자', '의사결정 보조 AI'],
    outputs: ['Founder AI OS 설계도 초안'],
    homework: ['90일 실행 우선순위표'],
    handoffNext: '16회차에서 같은 강사가 마지막 회차에서 완성 + 발표 코칭.' },
  { no: 16, week: 8, date: '2026-07-31', weekday: '금', format: 'offline', instructor: 'jin-daeyeon',
    title: 'Founder AI OS 완성 + 실행계획 발표·코칭',
    aiRoles: ['AI 운영총괄 매니저', '실행 로드맵 코치 AI'],
    outputs: ['Founder AI OS 1차 완성본', '90일 실행 로드맵', '첫 1주 액션 리스트'],
    homework: [],
    handoffNext: '수료 — 수강생은 곧바로 실행 모드로 진입.' },
];
