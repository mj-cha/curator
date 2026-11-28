/* 고수하우스(GOSU-HOUSE) 전사 5대 사업부 × 핸디핏·로보엠디 통합 데이터 (15KB 이하)
   - 사업부 코드(biz): all(전사 통합), gosutem(고수템), cea(CEA 교육), blog(블로그·쿠팡), mkt(마케팅·SNS), lab(대학원·신사업BD) */
window.GOSU_BIZ_UNITS = [
  { id: "all", name: "전체 (고수하우스 전사 ERP)", badge: "7본부 통합", desc: "고수템 · CEA 교육 · 블로그/쿠팡 · 마케팅/SNS · 박사논문/BD 전사 자산 통합 관제" },
  { id: "gosutem", name: "01. 고수템 (쇼핑 결정 플랫폼)", badge: "1R·2R 주력", desc: "첫 달 사지 마 2.5만+중고 0.6만=3.1만 절감 · 현직 강사 외 4명 교차 판정 · 3단 총비용 비교" },
  { id: "cea", name: "02. CEA 교육 (B2B 공급망 ESG)", badge: "12개 과정", desc: "현대차(HMC) 협력사 · EcoVadis 2026 필수 ESG 교육 12과정 · 온라인 강의실 & 즉시 수료증" },
  { id: "blog", name: "03. 블로그 · 쿠팡파트너스", badge: "다채널 수익", desc: "메디비티 피부결 2종 · 1잔 862원 황금배합 단백질 · RTX 5000 그래픽카드 다채널 최저가" },
  { id: "mkt", name: "04. 마케팅 · SNS 캠페인", badge: "릴스·스레드", desc: "인스타그램(@ll.likelocal) 9:16 릴스 · 4:5 카드뉴스 · 스레드 타래 · 핸디핏 A/B 광고 검증" },
  { id: "lab", name: "05. 대학원 연구소 · 신사업 BD", badge: "논문·PSST", desc: "연세대 박사논문 제1장 SLR(163편 TCCM) · 모두의 창업 1R 활동보고서 · 정부지원 PSST PPT" }
];

window.GOSU_HANDYFIT_DATA = {
  landingPresets10: window.GOSU_HANDYFIT_LANDINGS || [],

  /* 전사 사업부별 UTM 단축링크 & 오프라인 QR 통합 관리 */
  utmLinks: [
    { id: "UTM-01", biz: "gosutem", channel: "[고수템] 인스타 릴스/스토리", handyChannel: "인스타그램", campaign: "2611_swim_reels_01", shortUrl: "https://www.handyfit.kr/l/29c83874", gosutemUtm: "https://gosutem.com/?utm_source=instagram&utm_medium=reels&utm_campaign=2611_swim_reels_01#swim", visits: 142, clicks: 48, applies: 19, convPct: 13.4 },
    { id: "UTM-02", biz: "mkt", channel: "[마케팅] 스레드 / 메타 피드 A/B", handyChannel: "Meta 광고", campaign: "2611_swim_threads_01", shortUrl: "https://www.handyfit.kr/l/912202df", gosutemUtm: "https://gosutem.com/?utm_source=threads&utm_medium=social&utm_campaign=2611_swim_threads_01#swim", visits: 98, clicks: 34, applies: 14, convPct: 14.3 },
    { id: "UTM-03", biz: "blog", channel: "[블로그·쿠팡] 네이버 블로그 최저가 보드", handyChannel: "네이버 광고", campaign: "2611_curator_blog_01", shortUrl: "https://www.handyfit.kr/l/23486f09", gosutemUtm: "https://mj-cha.github.io/curator/?utm_source=naver&utm_medium=blog&utm_campaign=2611_curator_blog_01", visits: 115, clicks: 41, applies: 16, convPct: 13.9 },
    { id: "UTM-04", biz: "gosutem", channel: "[고수템] 카카오톡 / 동호회 단톡방", handyChannel: "카카오 광고", campaign: "2611_swim_kakao_01", shortUrl: "https://www.handyfit.kr/l/b340d967", gosutemUtm: "https://gosutem.com/?utm_source=kakao&utm_medium=openchat&utm_campaign=2611_swim_kakao_01#swim", visits: 84, clicks: 31, applies: 15, convPct: 17.9 },
    { id: "UTM-05", biz: "cea", channel: "[CEA 교육] 현대차·EcoVadis 12과정 안내 QR", handyChannel: "B2B 제안서 QR", campaign: "2611_cea_esg12_qr", shortUrl: "https://www.handyfit.kr/l/8a88af7a", gosutemUtm: "https://cea.co.kr/?utm_source=b2b_deck&utm_medium=qr&utm_campaign=2611_cea_esg12_qr", visits: 64, clicks: 29, applies: 11, convPct: 17.2 }
  ],

  surveyDropoff: {
    formUrl: "https://www.handyfit.kr/f/c4771c9958e24cc4",
    openedCount: 173,
    submittedCount: 72,
    responseRatePct: 41.6,
    questions: [
      { qNo: "Q1 (객관식)", title: "[문제 검증] 시작할 때 준비물·과정을 고르면서 가장 막막했던 점은 무엇인가요?", topAnswer: "꼭 필요한 것과 빼도 되는 것을 구분하기 어려움 (46%)", dropCount: 11, dropPct: 6.4, warn: false },
      { qNo: "Q2 (객관식)", title: "[해결책 검증] 가장 먼저 써보고 싶은 핵심 기능은 무엇인가요?", topAnswer: "'사지 마' 과소비 방어 라벨 & 숙련자 3~5명 교차 판정 (68%)", dropCount: 14, dropPct: 8.1, warn: false },
      { qNo: "Q3 (척도 1~5점)", title: "[신뢰도 검증] 제휴 수익을 투명하게 고지하고 '사지 마'와 중고/0원 대안을 함께 보여주면 신뢰할 수 있나요?", topAnswer: "평균 4.6점 / 5.0점 (4~5점 긍정 응답 88.9%)", dropCount: 18, dropPct: 10.4, warn: false },
      { qNo: "Q4 (연락처/단답)", title: "[전환 검증] 오픈 알림·제안서 수신 연락처 또는 이메일 (선택: 고수 참여/기업 수강 문의)", topAnswer: "사전신청 완료 72건 (고수 참여·B2B 문의 19건)", dropCount: 58, dropPct: 33.5, warn: true, fixTip: "개선 조치: 연락처 입력 전 '무가입 체크리스트·커리큘럼 1초 저장'을 먼저 제공해 이탈률 절반 감축" }
    ]
  },

  sectionFunnel: [
    { sec: "1단 · 히어로 & 과소비/시행착오 방어 3가지 (첫 화면 판매 링크 0개 + 전문가 검수 배지)", reachPct: 100, visitors: 503, dropDelta: 0, isMaxDrop: false },
    { sec: "2단 · 전문가·고수 5명 찬반 교차 판정 (무가입 1탭 열람 · 조건별 비교)", reachPct: 84, visitors: 422, dropDelta: 16, isMaxDrop: false },
    { sec: "3단 · 다채널 총비용 중립 비교 & 커리큘럼 매핑 (표준 모델명 1초 복사)", reachPct: 62, visitors: 312, dropDelta: 22, isMaxDrop: true, alertText: "↓ 여기서 22%p가 빠져나가요 — 최대 이탈 구간 (조치: 2단→3단 사이에 '표준 모델명/과정표 1초 복사' 퀵버튼 배치)" },
    { sec: "4단 · 무가입 체크리스트 1초 저장 / 설문 폼 열람", reachPct: 36, visitors: 181, dropDelta: 26, isMaxDrop: false },
    { sec: "5단 · 사전신청 · B2B 교육 문의 최종 완료", reachPct: 16.5, visitors: 83, dropDelta: 19.5, isMaxDrop: false }
  ],

  /* 전사 사업부별 AI 카피라이터 말투 페르소나 5종 */
  copyPersonas: [
    {
      id: "PER-01",
      biz: "gosutem",
      name: "[고수템] 01. 현직 강사·3년 차 동네 고수 (과소비 방어 단문체)",
      sampleBody: "수영 첫 달 준비물, 세 가지만 빼도 2만 5천 원을 아낍니다.\n초급반 첫 두 달은 오리발과 패들을 쓰지 않습니다. 실내 수영장에서는 진한 미러 수경보다 바닥선이 또렷하게 보이는 투명 실리콘 패킹 수경이 훨씬 안전합니다.\n김민정 현직 수영강사(생활스포츠지도사 2급) 외 숙련자 4명이 교차 검수한 첫 달 준비물 기준표로, 신품·미개봉 중고·0원 대안까지 건당 평균 3만 1천 원을 아껴 보세요."
    },
    {
      id: "PER-02",
      biz: "cea",
      name: "[CEA 교육] 02. B2B 공급망 ESG·기업교육 전문위원 (신뢰·규제 논증체)",
      sampleBody: "2026년 현대자동차 협력사 평가와 EcoVadis 공급망 실사에서 가장 먼저 확인하는 항목은 임직원 ESG 교육 이수 증빙입니다.\n인권·노동, 안전보건, 탄소중립, 윤리경영·반부패 4대 영역 12개 핵심 과정을 온라인 강의실에서 직무별로 즉시 수강하고, 평가 제출용 공식 수료증을 바로 발급받으실 수 있습니다.\n복잡한 집체교육 없이 협력사 평가 기준에 맞춘 실무형 커리큘럼을 지금 확인해 보세요."
    },
    {
      id: "PER-03",
      biz: "blog",
      name: "[블로그·쿠팡] 03. 성분·기전·단가 논증 컨설턴트 (뷰티·황금배합 단백질)",
      sampleBody: "편의점 단백질 음료에 한 잔 3,070원씩 쓰지 마세요.\n의사(식이섬유 5g 이상)·약사(유당 배제)·트레이너(단백질 순도)·실물 영양성분표 4가지를 교차 검증해 보니, 나우푸드 무맛 완두단백에 난소화성 식이섬유와 곡물맛 쉐이크 반 스푼을 섞는 황금배합이 1잔 862원으로 경제적입니다.\n당류는 0~1g으로 낮추고 단백질 24g과 식이섬유 5.1g을 동시에 챙겨 월 7만 9천 원(75%)을 절약할 수 있습니다."
    },
    {
      id: "PER-04",
      biz: "blog",
      name: "[블로그·테크] 04. 테크·예산 최적화 덕후 (RTX 그래픽카드·새내기 노트북)",
      sampleBody: "게임방송과 대학 과제용 PC를 맞출 때 비싼 상위 그래픽카드부터 담지 마세요.\n테크 유튜버 5인의 벤치마크를 교차 비교하면 8GB 모델은 먼저 빼고, FHD·QHD 환경에 맞춰 5060Ti 16GB 또는 5070 12GB 두 가지 중 하나로 좁히는 것이 합리적입니다.\n배송비를 포함한 신품 최저가와 미개봉 중고 시세를 한 화면에서 똑소리 나게 가격 비교해 보세요."
    },
    {
      id: "PER-05",
      biz: "mkt",
      name: "[마케팅·섭외] 05. 동호회 모임장·창립 고수 섭외 & 스레드 훅 에디터",
      sampleBody: "매달 신입 회원이 들어올 때마다 단톡방에 '수경은 클리어로 사시고 오리발은 아직 사지 마세요'라고 똑같이 타이핑하느라 지치지 않으셨나요?\n평소 쓰는 가방 사진 1장과 음성 3문항이면 10분 만에 내 고유 가방 링크가 만들어집니다.\n팔로워 수가 아니라 내 가방 덕분에 초보자가 아낀 금액으로 올라가는 창립 고수 배지(#001~#100)의 주인공이 되어 주세요."
    }
  ],

  pinnedFooters: [
    {
      id: "PIN-01",
      biz: "gosutem",
      label: "[고수템 표준] 첫 화면 링크 0개 · 무가입 비교표 안내 (UTM 자동 결합)",
      text: "👉 첫 달 사지 마 리스트 & 고수 5명 교차 비교표(로그인 없음): https://www.handyfit.kr/l/29c83874\n※ 고수템은 협찬 0건, 제휴 수수료 추천 순위 가중치 0%, 광고 구역 완전 분리 원칙을 지킵니다."
    },
    {
      id: "PIN-02",
      biz: "cea",
      label: "[CEA 교육 표준] 현대차·EcoVadis 2026 필수 ESG 12과정 & 수료증 안내",
      text: "👉 2026 현대차 협력사·EcoVadis 대응 필수 ESG 12개 교육과정 커리큘럼 및 수강 안내: https://www.handyfit.kr/l/8a88af7a\n※ CEA 교육 홈페이지에서 온라인 수강 즉시 평가 증빙용 공식 수료증(PDF)이 발급됩니다."
    },
    {
      id: "PIN-03",
      biz: "blog",
      label: "[블로그·쿠팡파트너스] 공정위 제휴 고지문 + 똑소리 나는 가격 비교 보드",
      text: "👉 똑소리 나게 가격 비교하기 (다채널 최저가 보드): https://mj-cha.github.io/curator/\n※ 협찬 0원·내돈내산 리뷰이며, 쿠팡 파트너스 활동의 일환으로 구매 시 일정액의 수수료를 제공받을 수 있으나 추천 순위와 가격 정렬에는 일절 영향을 주지 않습니다."
    },
    {
      id: "PIN-04",
      biz: "mkt",
      label: "[창립 고수 섭외] 10분 가방 등록 & 모바일 인터뷰 링크",
      text: "👉 10분 만에 내 고수 가방 등록하고 창립 고수(#001~#100) 배지 받기: https://mj-cha.github.io/curator/interview/"
    }
  ]
};
