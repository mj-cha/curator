/* 핸디핏 시각 랜딩 빌더 10개 섹션 초기 시드 & 배치 카테고리 데이터 (src/data/handyfitSectionsSeed.js · 15KB 이하) */
window.GOSU_HF_SEED = (function () {
  var LAYOUT_GROUPS = [
    { group: "고객의 고민에 맞는 모양", items: [
      { id: "말풍선", icon: "💬" }, { id: "체크 리스트", icon: "☑️" }, { id: "2열 (제목·본문)", icon: "◫" }, { id: "한 문장 강조", icon: "❝" }
    ]},
    { group: "소개하기", items: [
      { id: "기본 쌓기", icon: "☰" }, { id: "이미지 위 글", icon: "▣" }, { id: "사진 + 글", icon: "◧" }, { id: "비주얼 우측", icon: "◨" }
    ]},
    { group: "강조하기", items: [
      { id: "강조", icon: "⬛" }, { id: "밴드", icon: "▬" }, { id: "얇은 띠", icon: "─" }
    ]},
    { group: "여러 항목 늘어놓기", items: [
      { id: "배지 한 줄", icon: "⋯" }, { id: "카드 3열", icon: "▤" }, { id: "지그재그", icon: "⇄" }, { id: "세로 스택", icon: "▤" },
      { id: "번호 스텝", icon: "①②③" }, { id: "목록", icon: "≡" }, { id: "사진 슬라이드", icon: "🖼️" }
    ]},
    { group: "비교·가격", items: [
      { id: "숫자 강조 띠", icon: "123" }, { id: "신청 버튼 띠", icon: "🔘" }
    ]}
  ];

  var AI_DIRECTIONS = [
    { id: "scene", label: "고객 장면으로", sampleHead: "안경 벗으면 강사님 손도 안 보여 수영장 가기가 망설여졌죠", sampleDesc: "레인 끝에 서서 강사님 손짓을 놓칠까 봐 불안했던 첫 달의 실제 장면을 담았습니다.", layout: "한 문장 강조" },
    { id: "number", label: "숫자로 보여 주기", sampleHead: "초보 평균 탐색 145분 ➔ 7분 단축 · 첫 달 실패 지출 31,000원 방어", sampleDesc: "사지 마 3종 회피(25,000원) + 미개봉 중고·0원 대안(6,000원) 실측 데이터를 숫자로 비교합니다.", layout: "숫자 강조 띠" },
    { id: "list", label: "항목별로 정리", sampleHead: "내 눈에 맞는 첫 달 준비물, 3가지 기준으로 7분 만에 확정해요", sampleDesc: "① 클리어 vs 미러 실내 조도 비교 ② 좌우 도수 분리 조립법 ③ 다이소·소분 공병 별도 지출 0원 관리", layout: "번호 스텝" },
    { id: "punch", label: "더 짧고 세게", sampleHead: "매장에서 산 18만 원 풀세트, 세 가지만 빼면 5만 원에 끝납니다", sampleDesc: "첫 화면 판매 링크 0개. 현직 강사 5명이 먼저 뺀 과잉 장비부터 확인하세요.", layout: "강조" }
  ];

  function buildFlatlaySvg(mode) {
    if (mode === "skip") {
      return "data:image/svg+xml;utf8," + encodeURIComponent(
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 360"><rect width="640" height="360" fill="#B8B9BE"/>' +
        '<rect x="65" y="55" width="88" height="250" rx="34" fill="#17191C" stroke="#2D4A9C" stroke-width="8"/>' +
        '<rect x="170" y="60" width="88" height="245" rx="34" fill="#17191C" stroke="#2D4A9C" stroke-width="8"/>' +
        '<ellipse cx="355" cy="105" rx="54" ry="23" fill="#0E3B43" stroke="#222" stroke-width="5"/>' +
        '<ellipse cx="470" cy="120" rx="54" ry="23" fill="#1E4E8C" stroke="#222" stroke-width="5"/>' +
        '<rect x="295" y="205" width="160" height="86" rx="12" fill="#FBBF24"/>' +
        '<text x="375" y="243" text-anchor="middle" fill="#0F3568" font-family="Pretendard,sans-serif" font-size="22" font-weight="900">첫 달 사지 마!</text>' +
        '<text x="375" y="274" text-anchor="middle" fill="#0F3568" font-family="Pretendard,sans-serif" font-size="20" font-weight="900">-25,000원 방어</text></svg>'
      );
    }
    return "data:image/svg+xml;utf8," + encodeURIComponent(
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 400"><rect width="640" height="400" fill="#B6B5B3"/>' +
      '<rect x="52" y="95" width="180" height="215" rx="42" fill="#0066CC" stroke="#18191C" stroke-width="8"/>' +
      '<path d="M275,130 C295,105 355,105 375,130 L390,315 C365,355 285,355 260,315 Z" fill="#0A2E5C" stroke="#F59E0B" stroke-width="4"/>' +
      '<ellipse cx="505" cy="150" rx="62" ry="50" fill="#0066CC"/><ellipse cx="330" cy="95" rx="60" ry="19" fill="#E2E8F0" stroke="#94A3B8" stroke-width="4"/>' +
      '<rect x="115" y="55" width="145" height="36" rx="6" fill="#FCD34D"/><text x="187" y="79" text-anchor="middle" fill="#1E293B" font-family="Pretendard,sans-serif" font-size="15" font-weight="900">첫 달 사지 마</text>' +
      '<rect x="305" y="30" width="115" height="34" rx="6" fill="#38BDF8"/><text x="362" y="53" text-anchor="middle" fill="#0F172A" font-family="Pretendard,sans-serif" font-size="15" font-weight="900">고수 교차통과</text>' +
      '<rect x="495" y="230" width="115" height="34" rx="6" fill="#FCD34D"/><text x="552" y="253" text-anchor="middle" fill="#1E293B" font-family="Pretendard,sans-serif" font-size="15" font-weight="900">중고·0원 대안</text></svg>'
    );
  }

  function createSections(p) {
    return [
      { id: "sec-hero", name: "첫 화면", layout: "비주얼 우측", titlePos: "위", imgPos: "right", imgRatio: "기본", slideShape: "한 장씩", slideAuto: "3초", padY: 44, bg: "#0C3C78", fg: "#FFFFFF", headSize: "크게", headColor: "#FFFFFF", headBold: true, showDesc: true, inTopNav: false, enabled: true, badge: p.trustBadge || "김민정 현직 수영강사(생활스포츠지도사 2급·라이프가드) 외 4명 검수", headline: p.headline || "수영 첫 달 준비물, 세 가지만 빼도 2만 5천 원 아낍니다", desc: p.subcopy || "신규 등록 직후 가장 많이 후회하는 과잉 장비부터 먼저 뺐습니다. 첫 화면에는 구매 링크가 단 하나도 없습니다.", cta: p.cta || "내 준비물 체크리스트 1초 저장", imgType: "main", cards: [
        { t: "첫 화면 링크 0개", d: "3초 비광고 신뢰 88.9%" }, { t: "사지 마 3종 선제 제외", d: "과잉장비 25,000원 방어" }, { t: "중고·0원 대안 비교", d: "건당 총 31,000원 절감" }
      ]},
      { id: "sec-pain", name: "고객 고민", layout: "숫자 강조 띠", titlePos: "위", imgPos: "left", imgRatio: "기본", slideShape: "한 장씩", slideAuto: "끄기", padY: 38, bg: "#E0F2FE", fg: "#0F172A", headSize: "보통", headColor: "#0C3C78", headBold: true, showDesc: true, inTopNav: true, enabled: true, badge: "PROBLEM · 입문자가 가장 많이 겪는 시행착오", headline: "매장에서 산 수영 장비, 왜 첫 달에 후회할까요?", desc: p.sec1NoBuy || "초급반 첫 두 달 안 쓰는 오리발, 실내에서 어두운 진한 미러 수경, 김서림방지액 중복 구매까지.", cta: "", imgType: "skip", cards: [
        { t: "일체형 미러 도수 수경", d: "양안 시력이 다른데 같은 도수 일체형을 사면 어지럼증이 생겨요" },
        { t: "실내수영장 진한 미러", d: "실내 조도에서는 시야가 어두워 레인 바닥선과 강사님 손이 안 보여요" },
        { t: "초급반 첫 달 오리발", d: "자유형·배영 기초 두 달 동안은 오리발을 쓰지 않아 짐만 됩니다" }
      ]},
      { id: "sec-empathy", name: "공감", layout: "한 문장 강조", titlePos: "위", imgPos: "right", imgRatio: "와이드", slideShape: "한 장씩", slideAuto: "끄기", padY: 34, bg: "#FFFFFF", fg: "#141413", headSize: "크게", headColor: "#141413", headBold: true, showDesc: true, inTopNav: false, enabled: true, badge: "EMPATHY · 현직 고수 5인 실측", headline: "나만 못 따라가는 것 같아서 수영장 가기가 망설여졌죠", desc: "레인 끝에서 강사님 손짓을 놓치고 헤매던 그 시간, 장비 탓이 아니라 기준을 몰랐기 때문입니다.", cta: "", imgType: "none", cards: [] },
      { id: "sec-sol", name: "해결책", layout: "카드 3열", titlePos: "위", imgPos: "right", imgRatio: "기본", slideShape: "한 장씩", slideAuto: "끄기", padY: 38, bg: "#F1F5F9", fg: "#141413", headSize: "보통", headColor: "#0C3C78", headBold: true, showDesc: true, inTopNav: true, enabled: true, badge: "SOLUTION · 3단 의사결정 구조", headline: "내 상황에 맞는 기준 하나로 첫 달부터 달라집니다", desc: p.sec2Cross || "첫 화면에는 판매 링크를 두지 않고, 고수 5인의 찬반 근거와 총비용만 투명하게 대조합니다.", cta: "", imgType: "none", cards: [
        { t: "강사님 손이 또렷이 보여요", d: "실내 수영장 조도에 맞춘 투명 패킹·도수 분리 기준으로 시야가 밝아져요." },
        { t: "두통 없이 50분 완주해요", d: "물속 굴절 보정(-0.5단계)과 압박 없는 실리콘 패킹만 선별했어요." },
        { t: "건당 31,000원을 아껴요", d: "첫 달 사지 마 3종 회피(2.5만) + 다이소·소분 공병 대안(0.6만) 조합." }
      ]},
      { id: "sec-srv1", name: "서비스 소개", layout: "번호 스텝", titlePos: "위", imgPos: "left", imgRatio: "정사각", slideShape: "한 장씩", slideAuto: "3초", padY: 38, bg: "#FFFFFF", fg: "#141413", headSize: "보통", headColor: "#0C3C78", headBold: true, showDesc: true, inTopNav: true, enabled: true, badge: "PROCESS · 무가입 1탭 비교", headline: "내 상황에 맞는 조합, 7분 만에 확정해요", desc: "광고 순위가 아니라 실제로 써본 현직 강사와 3년 차 고수 5명의 기준만 정리했어요.", cta: "", imgType: "none", cards: [
        { t: "클리어 vs 미러 조도 비교", d: "실내 새벽반(비추천) vs 야외 바다수영(추천) 조건별 찬반을 1탭으로 봐요." },
        { t: "원단·조립 3대 기준 확인", d: "폴리에스터 100% 내염소성 원단과 좌우 분리 도수 조립법을 체크해요." },
        { t: "배송비 포함 총비용 비교", d: "쿠팡·네이버·미개봉 중고·0원 대안을 제휴 가중치 0%로 중립 비교해요." }
      ]},
      { id: "sec-trust", name: "신뢰·후기", layout: "숫자 강조 띠", titlePos: "위", imgPos: "right", imgRatio: "와이드", slideShape: "한 장씩", slideAuto: "끄기", padY: 36, bg: "#E0F2FE", fg: "#0F172A", headSize: "보통", headColor: "#0C3C78", headBold: true, showDesc: true, inTopNav: false, enabled: true, badge: "VERIFIED · 실측 검증 데이터", headline: "현직 강사와 고수 5인이 직접 정착한 조합이에요", desc: "물먹는오예 · 초록 · 이프랑 · 오퐁 · 워터양 실제 소개 장비 117개 품목 및 현직 강사 기준 교차 검수 완료", cta: "", imgType: "none", cards: [
        { t: "4.6 / 5.0점", d: "첫 화면 링크 0개 · 비광고 신뢰도 긍정 응답 88.9%" },
        { t: "5인 교차 검수", d: "생활스포츠지도사 2급 현직 강사 및 실사 가방 117품목" },
        { t: "31,000원 절감", d: "입문자 1인당 첫 달 평균 직접 현금 절감액" }
      ]},
      { id: "sec-target", name: "추천 대상", layout: "신청 버튼 띠", titlePos: "위", imgPos: "right", imgRatio: "기본", slideShape: "한 장씩", slideAuto: "끄기", padY: 34, bg: "#FFFFFF", fg: "#141413", headSize: "보통", headColor: "#141413", headBold: true, showDesc: true, inTopNav: false, enabled: true, badge: "FOR WHOM · 핵심 타깃", headline: "나도 과소비 없이 첫 달을 시작하고 싶다면", desc: p.target || "이번 달 새로 등록한 입문자 및 매달 같은 장비 질문에 답하는 강사·모임장에게 무료로 열려 있습니다.", cta: p.cta || "무료 부품표·체크리스트 받기", imgType: "none", cards: [] },
      { id: "sec-benefit", name: "혜택·가격", layout: "체크 리스트", titlePos: "위", imgPos: "right", imgRatio: "기본", slideShape: "한 장씩", slideAuto: "끄기", padY: 32, bg: "#FAF9F5", fg: "#141413", headSize: "보통", headColor: "#0F5132", headBold: true, showDesc: true, inTopNav: true, enabled: true, badge: "BENEFIT · 창립 멤버 혜택", headline: "첫 달 무료 · 내 가방 고유 단축링크 & 오프라인 QR 즉시 발급", desc: "✓ 가방 사진 1장 + 음성 메모 3문장으로 10분 제작 / ✓ 종목별 금지 장비 경고 카드 자동 삽입", cta: "", imgType: "none", cards: [
        { t: "무가입 체크리스트 1초 저장", d: "연락처 입력 강요 없이 첫 달 사지 마 3종과 알짜 리스트를 바로 저장합니다." },
        { t: "창립 고수 #001~#100 배지", d: "팔로워 수가 아니라 초보자가 아낀 누적 절감 기여액으로 레벨이 올라갑니다." }
      ]},
      { id: "sec-close", name: "신청", layout: "신청 버튼 띠", titlePos: "옆", imgPos: "right", imgRatio: "와이드", slideShape: "한 장씩", slideAuto: "끄기", padY: 28, bg: "#0C3C78", fg: "#FFFFFF", headSize: "보통", headColor: "#D4FF34", headBold: true, showDesc: true, inTopNav: false, enabled: true, badge: "APPLY NOW", headline: "지금 1초 만에 첫 달 체크리스트를 저장하세요", desc: "사전예약만 해두면 오픈 알림과 고수 5인 비교표를 무료로 보내드려요.", cta: p.cta || "무료 체크리스트 받기", imgType: "none", cards: [] },
      { id: "sec-faq", name: "맨 아래 정보", layout: "기본 쌓기", titlePos: "위", imgPos: "right", imgRatio: "기본", slideShape: "한 장씩", slideAuto: "끄기", padY: 28, bg: "#F8FAFC", fg: "#475569", headSize: "작게", headColor: "#1E293B", headBold: true, showDesc: true, inTopNav: false, enabled: true, badge: "FAQ & 공정위 고지", headline: "Q. 특정 브랜드 광고나 협찬이 섞여 있나요?", desc: "A. 첫 화면에는 구매 링크를 일절 두지 않으며, 3단 최하단 [광고] 제휴 링크 클릭 시 수수료를 제공받을 수 있으나 추천 순위와 가격 정렬에는 가중치 0% 원칙을 지킵니다.", cta: "", imgType: "none", cards: [] }
    ];
  }

  return { LAYOUT_GROUPS: LAYOUT_GROUPS, AI_DIRECTIONS: AI_DIRECTIONS, buildFlatlaySvg: buildFlatlaySvg, createSections: createSections };
})();