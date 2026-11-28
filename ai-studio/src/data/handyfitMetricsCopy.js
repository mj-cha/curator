/* 핸디핏(HandyFit) UTM 5종 · 설문 문항 이탈(B-02) · 섹션 도달률(B-03) · 로보엠디 카피 페르소나 데이터 (15KB 이하 분리) */
window.GOSU_HANDYFIT_DATA = {
  landingPresets10: window.GOSU_HANDYFIT_LANDINGS || [],

  utmLinks: [
    { id: "UTM-01", channel: "인스타그램 릴스/스토리", handyChannel: "인스타그램", campaign: "2611_swim_reels_01", shortUrl: "https://www.handyfit.kr/l/29c83874", gosutemUtm: "https://gosutem.com/?utm_source=instagram&utm_medium=reels&utm_campaign=2611_swim_reels_01#swim", visits: 142, clicks: 48, applies: 19, convPct: 13.4 },
    { id: "UTM-02", channel: "스레드 / 메타 피드", handyChannel: "Meta 광고", campaign: "2611_swim_threads_01", shortUrl: "https://www.handyfit.kr/l/912202df", gosutemUtm: "https://gosutem.com/?utm_source=threads&utm_medium=social&utm_campaign=2611_swim_threads_01#swim", visits: 98, clicks: 34, applies: 14, convPct: 14.3 },
    { id: "UTM-03", channel: "네이버 블로그 / 수영 카페", handyChannel: "네이버 광고", campaign: "2611_swim_blog_01", shortUrl: "https://www.handyfit.kr/l/23486f09", gosutemUtm: "https://gosutem.com/?utm_source=naver&utm_medium=blog&utm_campaign=2611_swim_blog_01#swim", visits: 115, clicks: 41, applies: 16, convPct: 13.9 },
    { id: "UTM-04", channel: "카카오톡 / 동호회 단톡방", handyChannel: "카카오 광고", campaign: "2611_swim_kakao_01", shortUrl: "https://www.handyfit.kr/l/b340d967", gosutemUtm: "https://gosutem.com/?utm_source=kakao&utm_medium=openchat&utm_campaign=2611_swim_kakao_01#swim", visits: 84, clicks: 31, applies: 15, convPct: 17.9 },
    { id: "UTM-05", channel: "오프라인 수영장 / 발표자료 QR", handyChannel: "기타/직접 공유", campaign: "2611_swim_qr_pool", shortUrl: "https://www.handyfit.kr/l/8a88af7a", gosutemUtm: "https://gosutem.com/?utm_source=qr&utm_medium=offline&utm_campaign=2611_swim_qr_pool#swim", visits: 46, clicks: 19, applies: 8, convPct: 17.4 }
  ],

  surveyDropoff: {
    formUrl: "https://www.handyfit.kr/f/c4771c9958e24cc4",
    openedCount: 173,
    submittedCount: 72,
    responseRatePct: 41.6,
    questions: [
      { qNo: "Q1 (객관식)", title: "수영을 시작할 때 준비물 고르면서 가장 막막했던 점은 무엇인가요?", topAnswer: "초보에게 꼭 필요한 것과 안 사도 되는 것을 모르겠음 (46%)", dropCount: 11, dropPct: 6.4, warn: false },
      { qNo: "Q2 (객관식)", title: "고수템의 기능 중 가장 써보고 싶은 것은 무엇인가요?", topAnswer: "초보가 돈 버리지 않게 막아주는 '사지 마' 라벨 & 고수 3~5명 교차 판정 (68%)", dropCount: 14, dropPct: 8.1, warn: false },
      { qNo: "Q3 (척도 1~5점)", title: "추천자가 제휴 수익을 일부 받더라도 '사지 마'와 중고/0원 대안을 투명 공개하면 신뢰할 수 있나요?", topAnswer: "평균 4.6점 / 5.0점 (4~5점 긍정 응답 88.9%)", dropCount: 18, dropPct: 10.4, warn: false },
      { qNo: "Q4 (연락처/단답)", title: "수영 시작 장바구니 오픈 알림 연락처 또는 이메일 (선택: 고수 참여 관심 분야)", topAnswer: "사전예약 신청 완료 72건 (이 중 고수 참여 의향 19건)", dropCount: 58, dropPct: 33.5, warn: true, fixTip: "개선 조치: 이메일/연락처 입력 전 '무가입 체크리스트 1초 저장'을 먼저 제공하고, 알림 신청은 원클릭 선택형으로 낮춰 이탈률 절반 감축" }
    ]
  },

  sectionFunnel: [
    { sec: "1단 · 히어로 & 첫 달 사지 마 3가지 (링크 0개 + 강사 검수 배지)", reachPct: 100, visitors: 485, dropDelta: 0, isMaxDrop: false },
    { sec: "2단 · 고수 5명 찬반 교차 판정 ('갓픽' vs '의견 갈림' 무가입 1탭)", reachPct: 84, visitors: 407, dropDelta: 16, isMaxDrop: false },
    { sec: "3단 · 신품·중고·0원 대안 총비용 비교 (138,400원 → 69,000원)", reachPct: 62, visitors: 301, dropDelta: 22, isMaxDrop: true, alertText: "↓ 여기서 22%p가 빠져나가요 — 가장 큰 이탈 구간 (조치: 2단→3단 사이에 '표준 모델명 1초 복사' 퀵버튼 배치)" },
    { sec: "4단 · 내 준비물 체크리스트 1초 저장 / 사전예약 폼 열람", reachPct: 36, visitors: 173, dropDelta: 26, isMaxDrop: false },
    { sec: "5단 · 사전예약 및 고수 참여 신청 최종 완료", reachPct: 14.8, visitors: 72, dropDelta: 21.2, isMaxDrop: false }
  ],

  copyPersonas: [
    {
      id: "PER-01",
      name: "01. 현직 강사·3년 차 동네 고수 (고수템 표준 단문체)",
      sampleBody: "수영 첫 달 준비물, 세 가지만 빼도 2만 5천 원을 아낍니다.\n초급반 첫 두 달은 오리발과 패들을 쓰지 않습니다. 실내 수영장에서는 진한 미러 수경보다 바닥선이 또렷하게 보이는 투명 실리콘 패킹 수경이 훨씬 안전합니다.\n김민정 현직 수영강사(생활스포츠지도사 2급) 외 숙련자 4명이 교차 검수한 첫 달 준비물 기준표로, 신품·미개봉 중고·0원 대안까지 건당 평균 3만 1천 원을 아껴 보세요."
    },
    {
      id: "PER-02",
      name: "02. 성분·기전 논증 컨설턴트 (뷰티·황금배합 단백질)",
      sampleBody: "편의점 단백질 음료에 한 잔 3,070원씩 쓰지 마세요.\n의사(식이섬유 5g 이상)·약사(유당 배제)·트레이너(단백질 순도)·실물 영양성분표 4가지를 교차 검증해 보니, 나우푸드 무맛 완두단백에 난소화성 식이섬유와 곡물맛 쉐이크 반 스푼을 섞는 황금배합이 1잔 862원으로 경제적입니다.\n당류는 0~1g으로 낮추고 단백질 24g과 식이섬유 5.1g을 동시에 챙겨 월 7만 9천 원(75%)을 절약할 수 있습니다."
    },
    {
      id: "PER-03",
      name: "03. 테크·예산 최적화 덕후 (RTX 그래픽카드·새내기 노트북)",
      sampleBody: "게임방송과 대학 과제용 PC를 맞출 때 비싼 상위 그래픽카드부터 담지 마세요.\n테크 유튜버 5인의 벤치마크를 교차 비교하면 8GB 모델은 먼저 빼고, FHD·QHD 환경에 맞춰 5060Ti 16GB 또는 5070 12GB 두 가지 중 하나로 좁히는 것이 합리적입니다.\n배송비를 포함한 신품 최저가와 미개봉 중고 시세를 한 화면에서 똑소리 나게 가격 비교해 보세요."
    },
    {
      id: "PER-04",
      name: "04. 동호회 모임장·창립 고수 섭외 (H2 공급 확보용)",
      sampleBody: "매달 신입 회원이 들어올 때마다 단톡방에 '수경은 클리어로 사시고 오리발은 아직 사지 마세요'라고 똑같이 타이핑하느라 지치지 않으셨나요?\n평소 쓰는 가방 사진 1장과 음성 3문항이면 10분 만에 내 고유 가방 링크가 만들어집니다.\n팔로워 수가 아니라 내 가방 덕분에 초보자가 아낀 금액으로 올라가는 창립 고수 배지(#001~#100)의 주인공이 되어 주세요."
    }
  ],

  pinnedFooters: [
    {
      id: "PIN-01",
      label: "[고수템 표준] 첫 화면 링크 0개 · 무가입 비교표 안내 (UTM 자동 결합)",
      text: "👉 첫 달 사지 마 리스트 & 고수 5명 교차 비교표(로그인 없음): https://www.handyfit.kr/l/29c83874\n※ 고수템은 협찬 0건, 제휴 수수료 추천 순위 가중치 0%, 광고 구역 완전 분리 원칙을 지킵니다."
    },
    {
      id: "PIN-02",
      label: "[쿠팡파트너스·블로그] 공정위 제휴 고지문 + 똑소리 나는 가격 비교 링크",
      text: "👉 똑소리 나게 가격 비교하기 (다채널 최저가 보드): https://mj-cha.github.io/curator/\n※ 협찬 0원·내돈내산 리뷰이며, 쿠팡 파트너스 활동의 일환으로 구매 시 일정액의 수수료를 제공받을 수 있으나 추천 순위와 가격 정렬에는 일절 영향을 주지 않습니다."
    },
    {
      id: "PIN-03",
      label: "[창립 고수 섭외] 10분 가방 등록 & 모바일 인터뷰 링크",
      text: "👉 10분 만에 내 고수 가방 등록하고 창립 고수(#001~#100) 배지 받기: https://mj-cha.github.io/curator/interview/"
    }
  ]
};
