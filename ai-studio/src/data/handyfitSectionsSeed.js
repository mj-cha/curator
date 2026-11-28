/* 핸디핏 랜딩페이지 시각 편집기 11개 섹션 기본 데이터 & 실물 정물 플랫레이 SVG (src/data/handyfitSectionsSeed.js · 15KB 이하) */
window.GOSU_HF_SEED = (function () {
  function buildFlatlaySvg(mode) {
    if (mode === "skip") {
      return "data:image/svg+xml;utf8," + encodeURIComponent(
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 380">' +
        '<rect width="640" height="380" fill="#B8B9BE"/>' +
        '<rect x="70" y="60" width="90" height="260" rx="36" fill="#17191C" stroke="#2D4A9C" stroke-width="8"/>' +
        '<rect x="175" y="65" width="90" height="255" rx="36" fill="#17191C" stroke="#2D4A9C" stroke-width="8"/>' +
        '<ellipse cx="360" cy="110" rx="55" ry="24" fill="#0E3B43" stroke="#222" stroke-width="5"/>' +
        '<ellipse cx="475" cy="125" rx="55" ry="24" fill="#1E4E8C" stroke="#222" stroke-width="5"/>' +
        '<rect x="470" y="190" width="120" height="140" rx="38" fill="#18191B" stroke="#F59E0B" stroke-width="5"/>' +
        '<rect x="300" y="220" width="150" height="86" rx="12" fill="#FBBF24"/>' +
        '<text x="375" y="258" text-anchor="end" fill="#0F3568" font-family="Pretendard,sans-serif" font-size="24" font-weight="900">첫 달</text>' +
        '<text x="435" y="292" text-anchor="end" fill="#0F3568" font-family="Pretendard,sans-serif" font-size="28" font-weight="900">사지 마!</text></svg>'
      );
    }
    return "data:image/svg+xml;utf8," + encodeURIComponent(
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 440">' +
      '<rect width="640" height="440" fill="#B6B5B3"/>' +
      '<rect x="52" y="110" width="185" height="225" rx="44" fill="#0066CC" stroke="#18191C" stroke-width="8"/>' +
      '<ellipse cx="145" cy="210" rx="55" ry="65" fill="#3B3D42"/>' +
      '<path d="M275,145 C295,120 355,120 375,145 L390,335 C365,375 285,375 260,335 Z" fill="#0A2E5C" stroke="#F59E0B" stroke-width="4"/>' +
      '<ellipse cx="505" cy="160" rx="64" ry="52" fill="#0066CC"/>' +
      '<ellipse cx="330" cy="110" rx="62" ry="20" fill="#E2E8F0" stroke="#94A3B8" stroke-width="4"/>' +
      '<rect x="442" y="225" width="48" height="125" rx="10" fill="rgba(255,255,255,0.45)" stroke="#475569" stroke-width="3"/>' +
      '<g transform="rotate(-14 190 95)"><rect x="115" y="72" width="145" height="38" rx="6" fill="#FCD34D"/><text x="187" y="97" text-anchor="middle" fill="#1E293B" font-family="Pretendard,sans-serif" font-size="16" font-weight="900">첫 달 사지 마</text></g>' +
      '<g transform="rotate(-4 360 55)"><rect x="305" y="36" width="115" height="36" rx="6" fill="#38BDF8"/><text x="362" y="60" text-anchor="middle" fill="#0F172A" font-family="Pretendard,sans-serif" font-size="16" font-weight="900">필수 알짜</text></g>' +
      '<g transform="rotate(2 560 255)"><rect x="505" y="236" width="110" height="36" rx="6" fill="#FCD34D"/><text x="560" y="260" text-anchor="middle" fill="#1E293B" font-family="Pretendard,sans-serif" font-size="16" font-weight="900">중고 충분</text></g></svg>'
    );
  }

  function createSections(p) {
    return [
      { id: "sec-hero", name: "첫 화면", layout: "비주얼 우측", imgPos: "right", imgRatio: "기본", padY: 44, bg: "#0C3C78", fg: "#FFFFFF", headSize: "크게", headColor: "#FFFFFF", headBold: true, showDesc: true, badge: p.trustBadge || "김민정 현직 수영강사(생활스포츠지도사 2급·라이프가드) 외 4명 검수", headline: p.headline || "매달 같은 장비 질문, 가방 링크 하나로 끝내세요", desc: p.subcopy || "수영강사·모임장을 위한 큐레이션 도구. 가방 사진 1장과 음성 3문장이면 10분 만에 내 기준 고유 링크가 나옵니다.", cta: p.cta || "창립 고수 무료 등록", imgType: "main" },
      { id: "sec-pain", name: "고객 고민", layout: "비주얼 좌측", imgPos: "left", imgRatio: "기본", padY: 38, bg: "#FFFFFF", fg: "#141413", headSize: "보통", headColor: "#0C3C78", headBold: true, showDesc: true, badge: "PROBLEM · 반복되는 탐색 피로", headline: "새 회원이 들어올 때마다 같은 답장을 다시 씁니다.", desc: p.sec1NoBuy || "수영복은 뭘로, 수경은 어떤 걸로, 오리발은 언제. 단톡방과 커뮤니티에 같은 준비물 설명을 매달 손으로 타이핑합니다. 첫 달 오리발·미러 수경·대용량 메시는 빼라는 안내까지.", cta: "안 사도 되는 장비 3종 보기", imgType: "skip" },
      { id: "sec-empathy", name: "공감", layout: "강조 박스", imgPos: "right", imgRatio: "와이드", padY: 32, bg: "#F4F6FA", fg: "#141413", headSize: "보통", headColor: "#141413", headBold: true, showDesc: true, badge: "EMPATHY · 현직 고수 5인 실측", headline: "초보자 평균 탐색 시간 145분, 실패 지출 건당 3.1만 원", desc: "광고성 협찬 후기와 바이럴 링크 사이에서 입문자는 첫 달에 필요 없는 장비부터 결제합니다.", cta: "", imgType: "none" },
      { id: "sec-sol", name: "해결책", layout: "카드 3열", imgPos: "right", imgRatio: "기본", padY: 36, bg: "#FFFFFF", fg: "#141413", headSize: "보통", headColor: "#0C3C78", headBold: true, showDesc: true, badge: "SOLUTION · 3단 의사결정 구조", headline: "① 첫 달 사지 마 ➔ ② 고수 5인 교차 판정 ➔ ③ 총비용 비교", desc: p.sec2Cross || "첫 화면에는 판매 링크를 단 하나도 두지 않습니다. 무가입 1탭으로 고수 5인의 찬반 근거를 먼저 확인합니다.", cta: "", imgType: "none" },
      { id: "sec-srv1", name: "서비스 소개", layout: "비주얼 좌측", imgPos: "left", imgRatio: "정사각", padY: 36, bg: "#FAF9F5", fg: "#141413", headSize: "보통", headColor: "#141413", headBold: true, showDesc: true, badge: "FEATURE 01 · 무가입 1탭 비교", headline: "가방 속 실물 장비 3~5개만 딱 골라 이유와 함께 보여줍니다", desc: "한국인 모델 화보 대신 실제 가방에 들어가는 실물 장비 탑뷰 사진과 한 줄 판정 라벨만 제공합니다.", cta: "", imgType: "main" },
      { id: "sec-srv2", name: "서비스 소개 2", layout: "비주얼 우측", imgPos: "right", imgRatio: "기본", padY: 36, bg: "#FFFFFF", fg: "#141413", headSize: "보통", headColor: "#0C3C78", headBold: true, showDesc: true, badge: "FEATURE 02 · 똑소리 나게 가격 비교하기", headline: "배송비·멤버십 포함 최종 결제 총비용을 중립 비교합니다", desc: p.sec3Price || "쿠팡 로켓와우 · 네이버 공식몰 · 오프라인 매장 3곳의 배송비 포함 실제 결제 금액을 한눈에 대조합니다.", cta: "", imgType: "none" },
      { id: "sec-trust", name: "신뢰·후기", layout: "숫자 강조 띠", imgPos: "right", imgRatio: "와이드", padY: 30, bg: "#0C3C78", fg: "#FFFFFF", headSize: "보통", headColor: "#D4FF34", headBold: true, showDesc: true, badge: "VERIFIED · 실측 검증 데이터", headline: "유튜버·현직 강사 5인 실사 가방 117개 품목 교차 검수 완료", desc: "물먹는오예 · 초록 · 이프랑 · 오퐁 · 워터양 실제 소개 장비 및 현직 강사 기준 일치율 94%", cta: "", imgType: "none" },
      { id: "sec-target", name: "추천 대상", layout: "신청 버튼 띠", imgPos: "right", imgRatio: "기본", padY: 32, bg: "#F4F6FA", fg: "#141413", headSize: "보통", headColor: "#141413", headBold: true, showDesc: true, badge: "FOR WHOM · 핵심 타깃", headline: p.target || "이번 달 새로 등록한 입문자 및 매달 같은 장비 질문에 답하는 강사·모임장", desc: "복잡한 회원가입 없이 링크 하나로 준비물 리스트와 실패 없는 구매 기준을 공유하세요.", cta: p.cta || "창립 고수 무료 등록", imgType: "none" },
      { id: "sec-benefit", name: "혜택·가격", layout: "체크 리스트", imgPos: "right", imgRatio: "기본", padY: 32, bg: "#FFFFFF", fg: "#141413", headSize: "보통", headColor: "#0F5132", headBold: true, showDesc: true, badge: "BENEFIT · 창립 멤버 혜택", headline: "첫 달 무료 · 내 가방 고유 단축링크 & 오프라인 QR 즉시 발급", desc: "✓ 가방 사진 1장 + 음성 메모 3문장으로 10분 제작 / ✓ 종목별 금지 장비 경고 카드 자동 삽입", cta: "", imgType: "none" },
      { id: "sec-close", name: "마감 안내", layout: "얇은 띠", imgPos: "right", imgRatio: "와이드", padY: 24, bg: "#141413", fg: "#D4FF34", headSize: "작게", headColor: "#D4FF34", headBold: true, showDesc: true, badge: "NOTICE", headline: "이번 달 창립 고수 컨시어지 무료 제작 잔여 12자리", desc: "신청 순서대로 전담 에이전트가 가방 누끼 플랫레이와 고유 링크를 무료로 세팅해 드립니다.", cta: p.cta || "무료 등록 신청하기", imgType: "none" },
      { id: "sec-faq", name: "자주 묻는 질문", layout: "체크 리스트", imgPos: "right", imgRatio: "기본", padY: 32, bg: "#FAF9F5", fg: "#141413", headSize: "보통", headColor: "#141413", headBold: true, showDesc: true, badge: "FAQ", headline: "Q. 특정 브랜드 광고나 협찬이 섞여 있나요?", desc: "A. 첫 화면에는 구매 링크를 일절 두지 않으며, 복수 고수의 교차 판정과 배송비 포함 총비용 비교만 제공합니다.", cta: "", imgType: "none" }
    ];
  }

  function renderInspector(activeSec, ed) {
    return '<aside class="hf-inspector"><div class="hf-insp-card">' +
      '<div class="hf-insp-title">&lt; 페이지 설정 &nbsp;/&nbsp; <b>' + activeSec.name + '</b></div>' +
      '<div class="hf-insp-row"><span>배치</span><select id="hf-layout-sel">' +
      ["비주얼 우측", "비주얼 좌측", "강조 박스", "카드 3열", "숫자 강조 띠", "신청 버튼 띠", "체크 리스트", "얇은 띠"].map(function (ly) { return '<option value="' + ly + '" ' + (activeSec.layout === ly ? "selected" : "") + '>' + ly + '</option>'; }).join("") + '</select></div>' +
      '<div class="hf-insp-row"><span>사진 위치</span><div class="cs-seg">' +
      '<button type="button" class="' + (activeSec.imgPos === "left" ? "active" : "") + '" data-hf-act="img-pos" data-val="left">왼쪽</button>' +
      '<button type="button" class="' + (activeSec.imgPos === "right" ? "active" : "") + '" data-hf-act="img-pos" data-val="right">오른쪽</button>' +
      '<button type="button" class="' + (activeSec.imgType === "none" ? "active" : "") + '" data-hf-act="img-toggle">' + (activeSec.imgType === "none" ? "사진 켜기" : "사진 끄기") + '</button></div></div>' +
      '<div class="hf-insp-row"><span>사진 비율</span><div class="cs-seg">' +
      ["와이드", "기본", "정사각", "세로"].map(function (rt) { return '<button type="button" class="' + (activeSec.imgRatio === rt ? "active" : "") + '" data-hf-act="img-ratio" data-val="' + rt + '">' + rt + '</button>'; }).join("") + '</div></div>' +
      '<div class="hf-insp-row"><span>위아래 여백</span><div class="cs-seg">' +
      [{ l: "좁게", v: 24 }, { l: "보통", v: 40 }, { l: "넓게", v: 64 }].map(function (pd) { return '<button type="button" class="' + (Math.abs(activeSec.padY - pd.v) < 8 ? "active" : "") + '" data-hf-act="pad-y" data-val="' + pd.v + '">' + pd.l + '</button>'; }).join("") + '</div></div>' +
      '<div class="hf-insp-row"><span>배경 · 자동</span><div style="display:flex;gap:6px">' +
      [{ bg: "#0C3C78", fg: "#FFFFFF", l: "네이비" }, { bg: "#FFFFFF", fg: "#141413", l: "화이트" }, { bg: "#FAF9F5", fg: "#141413", l: "웜페이퍼" }, { bg: "#141413", fg: "#D4FF34", l: "다크" }, { bg: "#0F5132", fg: "#FFFFFF", l: "그린" }].map(function (c) {
        return '<button type="button" class="hf-bg-swatch ' + (activeSec.bg === c.bg ? "active" : "") + '" style="background:' + c.bg + '" title="' + c.l + '" data-hf-act="sec-bg" data-bg="' + c.bg + '" data-fg="' + c.fg + '"></button>';
      }).join("") + '</div></div>' +
      '<button type="button" class="hf-ai-rewrite-btn" data-hf-act="ai-rewrite">✨ AI로 다시 쓰기 (금지어 0건 윤문) &nbsp;·&nbsp; 무료 10회 ⌄</button></div>' +
      '<div class="hf-insp-card" style="margin-top:12px">' +
      '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px"><strong style="font-size:13px">페이지 순서</strong><span style="font-size:11.5px;color:#64748B">끌어서 순서 바꾸기 (▲▼)</span></div>' +
      '<div class="hf-order-item muted"><div><b>상단 메뉴</b><br><small>켜짐 · 메뉴 0개</small></div></div>' +
      '<div class="hf-order-list">' +
      ed.sections.map(function (s, idx) {
        var isAct = s.id === ed.activeSecId;
        return '<div class="hf-order-item ' + (isAct ? "active" : "") + '" draggable="true" data-hf-drag-idx="' + idx + '" data-hf-pick-sec="' + s.id + '">' +
          '<div style="display:flex;align-items:center;gap:8px"><span class="hf-drag-handle">⋮⋮</span><div><b>' + s.name + '</b><br><small>' + s.layout + '</small></div></div>' +
          '<div style="display:flex;gap:3px" onclick="event.stopPropagation()">' +
          '<button type="button" class="btn-sm" style="padding:2px 6px" data-hf-act="move-sec" data-idx="' + idx + '" data-dir="-1">▲</button>' +
          '<button type="button" class="btn-sm" style="padding:2px 6px" data-hf-act="move-sec" data-idx="' + idx + '" data-dir="1">▼</button></div></div>';
      }).join("") + '</div></div></aside>';
  }

  return { buildFlatlaySvg: buildFlatlaySvg, createSections: createSections, renderInspector: renderInspector };
})();
