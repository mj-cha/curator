/* 고수하우스 전사 컨텐츠 스튜디오 — PPT·발표자료 템플릿 카탈로그 (Baze 5종 + 로컬PPT 엔진 3종 = 8종, 15KB 이하)
   - 실제 슬라이드 PNG(thumbs/baze/baze_ppt_01~05.png, okr_slide_01~08.png) 1:1 매핑 */
window.GOSU_CS_PPT = [
  {
    id: "baze-ppt-001",
    biz: "gosutem",
    source: "baze",
    type: "ppt_template",
    title: "전략 컨설팅 피치덱",
    ratio: "16:9",
    thumb: "thumbs/baze/baze_ppt_01.png",
    slideCount: 12,
    tags: ["사업계획서", "IR피치덱", "표·차트", "전사공용"],
    note: "두괄식 결론 + 3단 KPI + 경쟁사 비교표",
    slides: [
      { index: 1, kind: "cover", label: "표지 · 핵심 슬로건", thumb: "thumbs/baze/baze_ppt_01.png" },
      { index: 2, kind: "agenda", label: "목차 및 3줄 요약", thumb: "thumbs/baze/okr_slide_02.png" },
      { index: 3, kind: "kpi", label: "시장 규모(TAM-SAM-SOM) 도식", thumb: "thumbs/baze/okr_slide_03.png" },
      { index: 4, kind: "content", label: "핵심 문제 정의 3축", thumb: "thumbs/baze/okr_slide_04.png" },
      { index: 5, kind: "process", label: "해결 아키텍처 흐름도", thumb: "thumbs/baze/okr_slide_05.png" },
      { index: 6, kind: "table", label: "경쟁사 비교 매트릭스 표", thumb: "thumbs/baze/okr_slide_07.png" },
      { index: 7, kind: "kpi", label: "3개년 매출 추정 및 BEP", thumb: "thumbs/baze/okr_slide_06.png" },
      { index: 8, kind: "closing", label: "결론 및 실행 로드맵", thumb: "thumbs/baze/okr_slide_08.png" }
    ]
  },
  {
    id: "baze-ppt-002",
    biz: "gosutem",
    source: "baze",
    type: "ppt_template",
    title: "정부지원 PSST 발표덱",
    ratio: "16:9",
    thumb: "thumbs/baze/baze_ppt_02.png",
    slideCount: 15,
    tags: ["사업계획서", "제안서", "정부지원", "전사공용"],
    note: "문제(P)-해결(S)-성장(S)-팀(T) 심사표 1:1 매핑",
    slides: [
      { index: 1, kind: "cover", label: "PSST 사업계획 발표 표지", thumb: "thumbs/baze/baze_ppt_02.png" },
      { index: 2, kind: "content", label: "Problem · 고객 인터뷰 실측 데이터", thumb: "thumbs/baze/okr_slide_04.png" },
      { index: 3, kind: "process", label: "Solution · MVP 화면 및 작동 원리", thumb: "thumbs/baze/okr_slide_03.png" },
      { index: 4, kind: "table", label: "Scale-up · 수익모델 및 단가 비교표", thumb: "thumbs/baze/okr_slide_07.png" },
      { index: 5, kind: "kpi", label: "Team · 대표 역량 및 현직 자문단", thumb: "thumbs/baze/okr_slide_06.png" }
    ]
  },
  {
    id: "baze-ppt-003",
    biz: "blog",
    source: "baze",
    type: "ppt_template",
    title: "명진단 3분 스펙 비교덱",
    ratio: "16:9",
    thumb: "thumbs/baze/baze_ppt_03.png",
    slideCount: 10,
    tags: ["제품비교", "성분해설", "유튜브", "전사공용"],
    note: "좌 상품 실사 / 우 스펙·단가 비교표 2단",
    slides: [
      { index: 1, kind: "cover", label: "3초 결론 (추천3 · 비추1)", thumb: "thumbs/baze/baze_ppt_03.png" },
      { index: 2, kind: "table", label: "전성분 · 1회 실단가 비교표", thumb: "thumbs/baze/okr_slide_07.png" },
      { index: 3, kind: "kpi", label: "고수 5인 교차 의견", thumb: "thumbs/baze/okr_slide_05.png" },
      { index: 4, kind: "closing", label: "주의사항 · 똑소리 나는 구매 기준", thumb: "thumbs/baze/okr_slide_08.png" }
    ]
  },
  {
    id: "baze-ppt-004",
    biz: "lab",
    source: "baze",
    type: "ppt_template",
    title: "학술 논문·SLR 세미나덱",
    ratio: "16:9",
    thumb: "thumbs/baze/baze_ppt_04.png",
    slideCount: 18,
    tags: ["박사논문", "SLR", "학술발표", "전사공용"],
    note: "PRISMA 2020 흐름도 + TCCM 매트릭스",
    slides: [
      { index: 1, kind: "cover", label: "연구 제목 · RQ", thumb: "thumbs/baze/baze_ppt_04.png" },
      { index: 2, kind: "process", label: "PRISMA 2020 선별도", thumb: "thumbs/baze/okr_slide_02.png" },
      { index: 3, kind: "table", label: "TCCM 요약 매트릭스 (163편)", thumb: "thumbs/baze/okr_slide_07.png" },
      { index: 4, kind: "closing", label: "학술 기여 · 연구 모형", thumb: "thumbs/baze/okr_slide_08.png" }
    ]
  },
  {
    id: "baze-ppt-005",
    biz: "cea",
    source: "baze",
    type: "ppt_template",
    title: "B2B 기업교육·ESG 제안덱",
    ratio: "16:9",
    thumb: "thumbs/baze/baze_ppt_05.png",
    slideCount: 14,
    tags: ["제안서", "기업교육", "ESG", "전사공용"],
    note: "공급망 ESG 필수 교육 12과정 커리큘럼·로드맵",
    slides: [
      { index: 1, kind: "cover", label: "제안 표지 · 핵심 과제", thumb: "thumbs/baze/baze_ppt_05.png" },
      { index: 2, kind: "table", label: "12개 교육 과정 표", thumb: "thumbs/baze/okr_slide_07.png" },
      { index: 3, kind: "process", label: "수료 · 평가 프로세스", thumb: "thumbs/baze/okr_slide_03.png" }
    ]
  },
  {
    id: "local-ppt-001",
    biz: "gosutem",
    source: "local_pptx",
    type: "ppt_template",
    title: "비즈니스 마스터 57장덱",
    ratio: "16:9",
    thumb: "thumbs/baze/okr_slide_02.png",
    slideCount: 57,
    tags: ["사업계획서", "로컬엔진", "57장풀세트", "전사공용"],
    note: "표지·목차·KPI·표·다이어그램 57종 자동 조립",
    slides: [
      { index: 1, kind: "cover", label: "비즈니스 표준 표지", thumb: "thumbs/baze/okr_slide_01.png" },
      { index: 2, kind: "agenda", label: "6단 목차 레이아웃", thumb: "thumbs/baze/okr_slide_02.png" },
      { index: 6, kind: "table", label: "3x2 비교 테이블", thumb: "thumbs/baze/okr_slide_07.png" },
      { index: 8, kind: "kpi", label: "핵심 성과 지표(KPI)", thumb: "thumbs/baze/okr_slide_06.png" }
    ]
  },
  {
    id: "local-ppt-002",
    biz: "mkt",
    source: "local_pptx",
    type: "ppt_template",
    title: "Business OKR 8장덱",
    ratio: "16:9",
    thumb: "thumbs/baze/okr_slide_01.png",
    slideCount: 8,
    tags: ["OKR", "로컬엔진", "실물슬라이드", "전사공용"],
    note: "실제 슬라이드 8종 PNG 1:1 렌더링 연동",
    slides: [
      { index: 1, kind: "cover", label: "01 · OKR 표지", thumb: "thumbs/baze/okr_slide_01.png" },
      { index: 2, kind: "diagram", label: "02 · 피라미드 구조", thumb: "thumbs/baze/okr_slide_02.png" },
      { index: 3, kind: "process", label: "03 · 4단계 원형 흐름", thumb: "thumbs/baze/okr_slide_03.png" },
      { index: 4, kind: "content", label: "04 · 전사 목표", thumb: "thumbs/baze/okr_slide_04.png" },
      { index: 5, kind: "content", label: "05 · 팀 핵심 지표", thumb: "thumbs/baze/okr_slide_05.png" },
      { index: 6, kind: "content", label: "06 · 주간 리뷰", thumb: "thumbs/baze/okr_slide_06.png" },
      { index: 7, kind: "table", label: "07 · 대기·진행·완료 표", thumb: "thumbs/baze/okr_slide_07.png" },
      { index: 8, kind: "closing", label: "08 · 마무리", thumb: "thumbs/baze/okr_slide_08.png" }
    ]
  },
  {
    id: "local-ppt-003",
    biz: "cea",
    source: "local_pptx",
    type: "ppt_template",
    title: "표준 사업계획·제안서덱",
    ratio: "16:9",
    thumb: "thumbs/baze/okr_slide_03.png",
    slideCount: 24,
    tags: ["사업계획서", "제안서", "로컬엔진", "전사공용"],
    note: "마크다운·엑셀 입력 시 즉시 .pptx 조립",
    slides: [
      { index: 1, kind: "cover", label: "사업계획서 표지", thumb: "thumbs/baze/okr_slide_01.png" },
      { index: 2, kind: "diagram", label: "핵심 가치 다이어그램", thumb: "thumbs/baze/okr_slide_02.png" },
      { index: 3, kind: "table", label: "예산·재무 추정 표", thumb: "thumbs/baze/okr_slide_07.png" }
    ]
  }
];
