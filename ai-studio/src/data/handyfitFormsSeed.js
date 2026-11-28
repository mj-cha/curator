/* 핸디핏 멀티 홈페이지 · 20문항 설문 폼 · 고수템 #admin 단일 고객원장 초기 시드 데이터 (src/data/handyfitFormsSeed.js · 15KB 이하) */
window.GOSU_FORMS_SEED = {
  sites: [
    { id: "site-gosutem", biz: "gosutem", name: "고수템", domain: "gosutem.com", color: "#0C3C78", tone: "과소비 방어 단문체 (인물 0%·3.1만 절감)" },
    { id: "site-cea", biz: "cea", name: "CEA 교육", domain: "cea.co.kr", color: "#0F5132", tone: "B2B 공급망 ESG 12과정 신뢰·규제 논증체" },
    { id: "site-curator", biz: "blog", name: "명진단·큐레이터", domain: "mj-cha.github.io/curator", color: "#141413", tone: "성분·단가·총비용 중립 비교 컨설턴트체" }
  ],
  forms: [
    {
      id: "FRM-GOSU-01", siteId: "site-gosutem", biz: "gosutem", title: "[고수템] 수영 입문 과소비 방어 체크리스트 & 사전신청 폼",
      privacyConsent: true, quickSaveBlock: true, ctaText: "무가입 체크리스트 1초 저장 & 알림 신청 완료",
      openedCount: 173, submittedCount: 72,
      questions: [
        { id: "Q1", type: "객관식", req: true, title: "[문제 검증] 첫 달 준비물을 고를 때 가장 막막했던 점은 무엇인가요?", options: "꼭 필요한 것과 빼도 되는 것 구분 (46%), 광고·협찬 후기 걸러내기 (32%), 총비용 비교 (22%)", topAnswer: "꼭 필요한 것과 빼도 되는 것 구분 (46%)", dropCount: 11, dropPct: 6.4 },
        { id: "Q2", type: "객관식", req: true, title: "[해결책 검증] 가장 먼저 써보고 싶은 핵심 기능은 무엇인가요?", options: "'첫 달 사지 마 3종' 라벨, 현직 강사·고수 5명 교차 판정, 미개봉 중고·0원 대안 비교", topAnswer: "'첫 달 사지 마' 라벨 & 고수 5명 교차 판정 (68%)", dropCount: 14, dropPct: 8.1 },
        { id: "Q3", type: "척도(1~5점)", req: true, title: "[신뢰도 검증] 첫 화면 판매 링크 0개 원칙과 '사지 마' 선노출이 신뢰에 도움이 되나요?", options: "1점(매우 아님) ~ 5점(매우 신뢰함)", topAnswer: "평균 4.6 / 5.0점 (긍정 응답 88.9%)", dropCount: 18, dropPct: 10.4 },
        { id: "Q4", type: "연락처(이탈방어)", req: false, title: "[전환 검증] 오픈 알림·체크리스트 링크 수신 연락처 (선택: 창립 고수 #001~#100 참여)", options: "휴대폰 번호 또는 이메일 (무가입 1초 저장 선제 제공)", topAnswer: "사전신청 72건 (창립 고수 신청 19건)", dropCount: 58, dropPct: 33.5 },
        { id: "Q5", type: "음성메모/단답", req: false, title: "[고수 섭외] 본인 가방 속 '이건 첫 달 사지 마세요' 1가지를 한 줄이나 음성으로 남겨 주세요.", options: "자유 단답 또는 음성 메모 링크", topAnswer: "초급반 오리발·진한 미러 수경 회피 의견 다수", dropCount: 5, dropPct: 2.9 }
      ]
    },
    {
      id: "FRM-CEA-01", siteId: "site-cea", biz: "cea", title: "[CEA 교육] 현대차 협력사·EcoVadis 필수 ESG 12과정 수강·견적 문의 폼",
      privacyConsent: true, quickSaveBlock: true, ctaText: "12개 과정 커리큘럼 PDF 즉시 다운로드 & 수강 문의",
      openedCount: 64, submittedCount: 28,
      questions: [
        { id: "Q1", type: "객관식", req: true, title: "대응 중인 공급망 ESG 평가 기준을 선택해 주세요.", options: "현대차(HMC) 협력사 평가, EcoVadis 2026 실사, 기타 글로벌 공급망 실사", topAnswer: "현대차 협력사 + EcoVadis 동시 대응 (71%)", dropCount: 3, dropPct: 4.7 },
        { id: "Q2", type: "객관식", req: true, title: "희망하는 필수 교육 영역을 선택해 주세요.", options: "인권·노동, 안전보건, 탄소중립·환경, 윤리경영·반부패 (12과정 패키지)", topAnswer: "4대 영역 12과정 전사 패키지 (64%)", dropCount: 4, dropPct: 6.3 },
        { id: "Q3", type: "연락처(이탈방어)", req: true, title: "기업명 · 담당자 이메일 및 연락처 (공식 수료증 샘플 즉시 발송)", options: "기업명 / 이메일 / 연락처", topAnswer: "B2B 수강 문의 28개사 접수", dropCount: 9, dropPct: 14.1 }
      ]
    }
  ],
  customers: [
    { id: "CUS-072", formId: "FRM-GOSU-01", biz: "gosutem", role: "입문자 사전신청", contact: "010-9482-****", summary: "첫 달 사지 마 3종 + 고수 5인 교차판정 요청", utm_source: "instagram", utm_campaign: "2611_swim_reels_01", savedAmount: 31000, createdAt: "2026-11-28 14:20" },
    { id: "CUS-071", formId: "FRM-GOSU-01", biz: "gosutem", role: "창립 고수 신청(#019)", contact: "swim_coach_mj@****", summary: "생활스포츠지도사 2급 · 초급반 오리발 회피 가방 등록", utm_source: "kakao", utm_campaign: "2611_swim_kakao_01", savedAmount: 31000, createdAt: "2026-11-28 13:55" },
    { id: "CUS-070", formId: "FRM-CEA-01", biz: "cea", role: "CEA 기업교육 문의", contact: "esg_team@hmc-partner.co.kr", summary: "현대차 협력사 + EcoVadis 2026 필수 ESG 12과정(임직원 180명)", utm_source: "b2b_deck", utm_campaign: "2611_cea_esg12_qr", savedAmount: 0, createdAt: "2026-11-28 13:10" },
    { id: "CUS-069", formId: "FRM-GOSU-01", biz: "gosutem", role: "입문자 사전신청", contact: "010-3319-****", summary: "미개봉 중고 수경·0원 대안 체크리스트 저장", utm_source: "threads", utm_campaign: "2611_swim_threads_01", savedAmount: 31000, createdAt: "2026-11-28 12:40" },
    { id: "CUS-068", formId: "FRM-GOSU-01", biz: "blog", role: "다채널 최저가 알림", contact: "010-7721-****", summary: "나우푸드 완두단백 1잔 862원 황금배합 비교표 저장", utm_source: "naver", utm_campaign: "2611_curator_blog_01", savedAmount: 79000, createdAt: "2026-11-28 11:18" }
  ],
  events: [
    { id: "EVT-503", type: "page_view", slug: "gosutem-swim-lnd-01", fId: "F-101", hId: "H1", ts: "2026-11-28 14:30" },
    { id: "EVT-502", type: "section_reach", slug: "gosutem-swim-lnd-01", fId: "F-102", hId: "H2", ts: "2026-11-28 14:29" },
    { id: "EVT-501", type: "h3_pick", slug: "gosutem-swim-lnd-01", fId: "F-103", hId: "H3", ts: "2026-11-28 14:28" },
    { id: "EVT-500", type: "form_submit", slug: "gosutem-swim-lnd-01", fId: "F-104", hId: "H3", ts: "2026-11-28 14:25" }
  ],
  hypotheses: [
    { id: "H1", fId: "F-101", title: "1단 판매 링크 0개 & '첫 달 사지 마 3종' 선노출 신뢰도", target: "긍정(4~5점) ≥ 80.0%", actual: "88.9% (4.6/5.0점)", status: "PASS" },
    { id: "H2", fId: "F-102", title: "2단 무가입 1탭 현직 강사·고수 5인 교차 판정 열람률", target: "열람률 ≥ 25.0%", actual: "35.8% (180/503세션)", status: "PASS" },
    { id: "H3", fId: "F-103", title: "3단 다채널 총비용 비교 & 사전신청·체크리스트 전환율", target: "전환율 ≥ 5.0%", actual: "14.9% (75/503세션)", status: "PASS" }
  ]
};
