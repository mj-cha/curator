/* 핸디핏 랜딩 빌더 우측 인스펙터 · 배치 비주얼 팝오버 · 정물 피커 (src/components/landingInspector.js · 15KB 이하) */
window.GOSU_LANDING_INSPECTOR = (function () {
  var S = window.GOSU_HF_SEED || {};

  function buildCatalogSvg(mode) {
    if (mode === "skip" || mode === "main") return S.buildFlatlaySvg(mode);
    var map = {
      bag_ohye: { bg: "#0F2942", tag: "유튜버 물먹는오예 실사 가방", h: "초보 강습 5종 알짜 플랫레이", sub: "투명 패킹 수경 · 실리콘 수모 · 탄탄이 5부 · 습식 타월 · 메쉬파우치" },
      bag_chorok: { bg: "#1E293B", tag: "유튜버 초록 새벽반 가방", h: "출근 전 50분 컷 초경량 메쉬백", sub: "바닥 배수 메쉬백 · 케이스 습식타월 · 원터치 약산성 올인원 워시" },
      budget: { bg: "#141413", tag: "특허 A 배낭 DP 예산 최적화", h: "매장 풀세트 18.4만 ➔ 고수 조합 5.4만", sub: "1단 과잉장비 회피 -25,000원 + 미개봉 중고·0원 대안 -6,000원 = 3.1만 절감" },
      cea: { bg: "#0F5132", tag: "CEA B2B 공급망 ESG 교육원", h: "현대차 협력사 · EcoVadis 필수 12과정", sub: "인권·노동 / 안전보건 / 탄소중립 / 윤리경영 · 온라인 수강 즉시 수료증 발급" },
      protein: { bg: "#1F2937", tag: "의사·약사·트레이너·성분표 4중 검증", h: "1잔 862원 황금배합 단백질 (월 7.9만 절약)", sub: "당류 0g · 단백질 24g · 식이섬유 5.1g · 나우푸드 완두단백 + 식이섬유" },
      rtx: { bg: "#0F172A", tag: "테크 유튜버 5인 벤치마크 교차", h: "RTX 5060Ti 16GB vs 5070 총비용 보드", sub: "8GB 모델 선제 제외 · 쿠팡·네이버·미개봉 중고 배송비 포함 중립 비교" }
    }[mode] || { bg: "#0C3C78", tag: "인물 0% 실물 정물 Flat-lay", h: "고수 5명 교차 검증 정물 카드", sub: "첫 화면 판매 링크 0개 · 배송비 포함 총비용 비교" };
    return "data:image/svg+xml;utf8," + encodeURIComponent(
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 360"><rect width="640" height="360" fill="' + map.bg + '"/>' +
      '<rect x="28" y="24" width="584" height="312" rx="14" fill="rgba(255,255,255,0.06)" stroke="#D4FF34" stroke-width="2.5"/>' +
      '<rect x="52" y="48" width="270" height="34" rx="6" fill="#D4FF34"/><text x="66" y="71" fill="#11110F" font-family="Pretendard,sans-serif" font-size="15" font-weight="900">' + map.tag + '</text>' +
      '<text x="52" y="138" fill="#FFFFFF" font-family="Pretendard,sans-serif" font-size="25" font-weight="900">' + map.h + '</text>' +
      '<text x="52" y="182" fill="#CBD5E1" font-family="Pretendard,sans-serif" font-size="15" font-weight="700">' + map.sub + '</text>' +
      '<rect x="52" y="236" width="536" height="58" rx="10" fill="rgba(17,17,15,0.72)"/>' +
      '<text x="72" y="272" fill="#D4FF34" font-family="Pretendard,sans-serif" font-size="16" font-weight="800">✓ 인물 모델 0% · 로보엠디 정물 캔버스 &amp; 고수템 실사 자산 직결</text></svg>'
    );
  }

  function renderImagePickerDrawer(ed, activeSec) {
    if (!ed.showImgPicker) return "";
    var GS = window.GOSU_GUIDE_SEED || {}, cat = GS.imagePickerCatalog || [];
    return '<div class="panel-card" style="margin-bottom:12px;border:2px solid #0C3C78;background:#F8FAFC">' +
      '<div class="panel-head" style="margin-bottom:8px"><div><h2>🖼 공통 정물 이미지 피커 (인물 0% 실물 Flat-lay · 로보엠디 캔버스 단일 엔진)</h2>' +
      '<small>선택 섹션: <b>' + activeSec.name + '</b> — 클릭 즉시 검증된 실사 정물·비교표로 교체됩니다.</small></div>' +
      '<button type="button" class="btn-sm" data-hf-act="toggle-img-picker">닫기 ✕</button></div>' +
      '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:8px">' +
      cat.map(function (item) {
        return '<button type="button" class="tpl-card ' + (activeSec.imgType === item.mode ? "active" : "") + '" data-hf-act="pick-flatlay-img" data-val="' + item.mode + '">' +
          '<div class="tpl-card-top"><span class="badge-accent">' + item.badge + '</span><span class="badge-sub">' + item.id + '</span></div>' +
          '<strong style="font-size:12px">' + item.title + '</strong></button>';
      }).join("") + '</div></div>';
  }

  function renderInspector(activeSec, ed) {
    var isSlide = activeSec.layout === "사진 슬라이드";
    var curDir = ed.aiRewriteDir || "scene";
    var groups = S.LAYOUT_GROUPS || [];
    var dirs = S.AI_DIRECTIONS || [];

    var layoutPopoverHtml = ed.showLayoutPopover ? (
      '<div class="hf-layout-popover">' +
      groups.map(function (grp) {
        return '<div class="hf-lp-group"><div class="hf-lp-gtitle">' + grp.group + '</div><div class="hf-lp-grid">' +
          grp.items.map(function (it) {
            var act = activeSec.layout === it.id;
            return '<button type="button" class="hf-lp-item ' + (act ? "active" : "") + '" data-hf-act="pick-layout" data-val="' + it.id + '">' +
              '<span class="hf-lp-wire">' + it.icon + '</span><span>' + it.id + '</span></button>';
          }).join("") + '</div></div>';
      }).join("") + '</div>'
    ) : "";

    var dynamicControlsHtml = isSlide ? (
      '<div class="hf-insp-row"><span>모양</span><div class="cs-seg">' +
      ["한 장씩", "옆 사진 보이기", "계속 흐르기"].map(function (sh) {
        return '<button type="button" class="' + ((activeSec.slideShape || "한 장씩") === sh ? "active" : "") + '" data-hf-act="slide-shape" data-val="' + sh + '">' + sh + '</button>';
      }).join("") + '</div></div>' +
      '<div class="hf-insp-row"><span>자동으로 넘기기</span><div class="cs-seg">' +
      ["끄기", "3초", "5초", "7초"].map(function (au) {
        return '<button type="button" class="' + ((activeSec.slideAuto || "3초") === au ? "active" : "") + '" data-hf-act="slide-auto" data-val="' + au + '">' + au + '</button>';
      }).join("") + '</div></div>'
    ) : (
      '<div class="hf-insp-row"><span>제목 위치</span><div class="cs-seg">' +
      ["위", "옆"].map(function (tp) {
        return '<button type="button" class="' + ((activeSec.titlePos || "위") === tp ? "active" : "") + '" data-hf-act="title-pos" data-val="' + tp + '">' + tp + '</button>';
      }).join("") + '</div></div>' +
      '<div class="hf-insp-row"><span>사진 위치</span><div class="cs-seg">' +
      '<button type="button" class="' + (activeSec.imgPos === "left" ? "active" : "") + '" data-hf-act="img-pos" data-val="left">왼쪽</button>' +
      '<button type="button" class="' + (activeSec.imgPos === "right" ? "active" : "") + '" data-hf-act="img-pos" data-val="right">오른쪽</button>' +
      '<button type="button" class="' + (activeSec.imgType === "none" ? "active" : "") + '" data-hf-act="img-toggle">' + (activeSec.imgType === "none" ? "사진 켜기" : "사진 끄기") + '</button></div></div>'
    );

    var aiDrawerHtml = ed.showAiRewriteDrawer ? (
      '<div class="hf-ai-drawer">' +
      '<div style="font-size:12px;font-weight:700;color:#475569;margin-bottom:8px">어떤 방향으로 다시 쓸까요?</div>' +
      '<div style="display:grid;gap:6px;margin-bottom:8px">' +
      dirs.map(function (d) {
        var act = curDir === d.id;
        return '<button type="button" class="hf-ai-dir-btn ' + (act ? "active" : "") + '" data-hf-act="pick-ai-dir" data-val="' + d.id + '">' +
          '<span>' + d.label + '</span><span>' + (act ? "✓" : "") + '</span></button>';
      }).join("") +
      '<input type="text" id="hf-ai-custom-dir" placeholder="또는 직접 적기 — 예: 가격 부담을 줄이는 쪽으로" value="' + (ed.aiCustomPrompt || "").replace(/"/g, "&quot;") + '" style="font-size:12px;padding:8px 10px;border-radius:8px;border:1px solid #E2E8F0" /></div>' +
      '<button type="button" class="hf-ai-run-btn" data-hf-act="run-ai-rewrite">다시 쓰기</button>' +
      '<div style="text-align:center;font-size:11px;color:#64748B;margin-top:6px">문구와 배치만 바뀌어요 · 사진·여백·배경은 그대로</div></div>'
    ) : "";

    return '<aside class="hf-inspector"><div class="hf-insp-card">' +
      '<div class="hf-insp-title">&lt; 페이지 설정 &nbsp;/&nbsp; <b>' + activeSec.name + '</b></div>' +
      '<div class="hf-insp-row"><span>배치</span>' +
      '<button type="button" class="hf-layout-trigger ' + (ed.showLayoutPopover ? "open" : "") + '" data-hf-act="toggle-layout-popover">' +
      '<span>▤ ' + activeSec.layout + '</span><span>' + (ed.showLayoutPopover ? "▲" : "▼") + '</span></button></div>' +
      layoutPopoverHtml +
      dynamicControlsHtml +
      '<div class="hf-insp-row"><span>사진 비율</span><div class="cs-seg">' +
      ["와이드", "기본", "정사각", "세로"].map(function (rt) { return '<button type="button" class="' + (activeSec.imgRatio === rt ? "active" : "") + '" data-hf-act="img-ratio" data-val="' + rt + '">' + rt + '</button>'; }).join("") + '</div></div>' +
      '<div class="hf-insp-row"><span>위아래 여백</span><div class="cs-seg">' +
      [{ l: "좁게", v: 22 }, { l: "보통", v: 38 }, { l: "넓게", v: 62 }].map(function (pd) { return '<button type="button" class="' + (Math.abs(activeSec.padY - pd.v) < 8 ? "active" : "") + '" data-hf-act="pad-y" data-val="' + pd.v + '">' + pd.l + '</button>'; }).join("") + '</div></div>' +
      '<div style="display:flex;align-items:center;gap:8px;padding:2px 0 4px"><input type="range" id="hf-pady-range" min="16" max="84" value="' + activeSec.padY + '" style="flex:1;accent-color:#2563EB;cursor:pointer" /><button type="button" class="btn-sm" data-hf-act="pad-y" data-val="38">기본</button></div>' +
      '<div class="hf-insp-row"><span>배경 · 자동</span><div style="display:flex;align-items:center;gap:6px">' +
      [{ bg: "#FFFFFF", fg: "#141413", l: "자동 화이트(빗금)" }, { bg: "#E0F2FE", fg: "#0F172A", l: "라이트 스카이" }, { bg: "#0284C7", fg: "#FFFFFF", l: "오션 블루" }, { bg: "#0C3C78", fg: "#FFFFFF", l: "딥 네이비" }, { bg: "#141413", fg: "#D4FF34", l: "다크 라임" }].map(function (c, idx) {
        var hatch = idx === 0 ? "background:repeating-linear-gradient(45deg,#FFF,#FFF 4px,#E2E8F0 4px,#E2E8F0 8px)" : "background:" + c.bg;
        return '<button type="button" class="hf-bg-swatch ' + (activeSec.bg === c.bg ? "active" : "") + '" style="' + hatch + '" title="' + c.l + '" data-hf-act="sec-bg" data-bg="' + c.bg + '" data-fg="' + c.fg + '"></button>';
      }).join("") +
      '<label class="hf-color-wheel" title="배경 색상 자유 선택"><input type="color" id="hf-custom-bg-color" value="' + (activeSec.bg.charAt(0) === "#" ? activeSec.bg : "#0C3C78") + '" /></label></div></div>' +
      '<div class="hf-insp-row"><span>상단 메뉴</span><div class="cs-seg">' +
      '<button type="button" class="' + (!activeSec.inTopNav ? "active" : "") + '" data-hf-act="top-nav-toggle" data-val="off">제거</button>' +
      '<button type="button" class="' + (activeSec.inTopNav ? "active" : "") + '" data-hf-act="top-nav-toggle" data-val="on">추가</button></div></div>' +
      '<div class="hf-ai-box"><button type="button" class="hf-ai-rewrite-btn" data-hf-act="toggle-ai-drawer"><span>✨ AI로 다시 쓰기</span><span style="color:#64748B;font-weight:700">무료 ' + (ed.aiQuota !== undefined ? ed.aiQuota : 10) + '회 ' + (ed.showAiRewriteDrawer ? "⌃" : "⌄") + '</span></button>' +
      aiDrawerHtml + '</div></div>' +
      (ed.aiDoneBadge ? '<div class="hf-ai-done-toast"><span>✓ AI 작업이 끝났어요</span><button type="button" data-hf-act="close-ai-toast">⌃</button></div>' : '') +
      '</aside>';
  }

  S.renderInspector = renderInspector;
  return { buildCatalogSvg: buildCatalogSvg, renderImagePickerDrawer: renderImagePickerDrawer, renderInspector: renderInspector };
})();