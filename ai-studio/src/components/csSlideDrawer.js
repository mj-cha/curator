/* 컨텐츠 스튜디오 세부 장표 확대 뷰어 서랍 & 드래그 리사이저 부품 (src/components/csSlideDrawer.js · 15KB 이하) */
window.GOSU_CS_DRAWER = (function () {
  function getThumbUrl(item, slideObj) {
    if (slideObj && slideObj.thumb) return slideObj.thumb.replace(/^\/+/, "");
    if (item && item.thumb) return item.thumb.replace(/^\/+/, "");
    if (item && item.source === "baze") return "thumbs/baze/baze_ppt_01.png";
    if (item && item.source === "local_pptx") return "thumbs/baze/okr_slide_01.png";
    var badge = item.source === "miricanvas" ? "미리캔버스 ♥" : "로보엠디 AI";
    var accent = item.source === "miricanvas" ? "#0F5132" : "#0F4C81";
    var title = String((slideObj && slideObj.label) || item.title || "").replace(/[<>&"']/g, "").slice(0, 22);
    var sub = (item.id + " · " + (item.ratio || "4:5") + " · " + (item.slideCount || 1) + "장").replace(/[<>&"']/g, "");
    var svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300">' +
      '<rect width="400" height="300" fill="#F8F7F4"/><rect x="14" y="14" width="372" height="272" rx="8" fill="#FFF" stroke="#E3E0D8"/>' +
      '<rect x="26" y="26" width="110" height="24" rx="4" fill="' + accent + '"/>' +
      '<text x="36" y="42" fill="#FFF" font-family="Pretendard,sans-serif" font-size="11" font-weight="800">' + badge + '</text>' +
      '<text x="372" y="42" text-anchor="end" fill="#5A5751" font-family="Pretendard,sans-serif" font-size="11" font-weight="700">' + sub + '</text>' +
      '<text x="26" y="86" fill="#141413" font-family="Pretendard,sans-serif" font-size="17" font-weight="800">' + title + '</text>' +
      '<rect x="26" y="108" width="168" height="72" rx="6" fill="#F6F5F1" stroke="#E3E0D8"/><rect x="204" y="108" width="168" height="72" rx="6" fill="#F6F5F1" stroke="#E3E0D8"/>' +
      '<text x="38" y="138" fill="' + accent + '" font-family="Pretendard,sans-serif" font-size="12" font-weight="800">핵심 수치 · 두괄식</text>' +
      '<text x="38" y="160" fill="#5A5751" font-family="Pretendard,sans-serif" font-size="11">실물 정물 · 인물 0%</text>' +
      '<text x="216" y="138" fill="#141413" font-family="Pretendard,sans-serif" font-size="12" font-weight="800">비교 매트릭스 표</text>' +
      '<text x="216" y="160" fill="#5A5751" font-family="Pretendard,sans-serif" font-size="11">전사 ERP 표준 양식</text>' +
      '<rect x="26" y="192" width="346" height="72" rx="6" fill="#FAF9F6" stroke="#E3E0D8"/>' +
      '<text x="38" y="220" fill="#141413" font-family="Pretendard,sans-serif" font-size="11.5" font-weight="700">' + String(item.note || "전사 공통 검증 템플릿").replace(/[<>&"']/g, "").slice(0, 32) + '</text>' +
      '<text x="38" y="244" fill="#8A867E" font-family="Pretendard,sans-serif" font-size="11">고수하우스 컨텐츠 스튜디오 × AI 스튜디오 직결</text></svg>';
    return "data:image/svg+xml;utf8," + encodeURIComponent(svg);
  }

  function getSlides(item) {
    if (item && item.slides && item.slides.length) return item.slides;
    var baseThumb = item && item.thumb ? item.thumb : null;
    return [
      { index: 1, kind: "cover", label: "01 · 표지 및 핵심 슬로건", thumb: baseThumb || "thumbs/baze/okr_slide_01.png" },
      { index: 2, kind: "agenda", label: "02 · 목차 및 3줄 결론 요약", thumb: "thumbs/baze/okr_slide_02.png" },
      { index: 3, kind: "kpi", label: "03 · 핵심 문제 정의 및 KPI", thumb: "thumbs/baze/okr_slide_04.png" },
      { index: 4, kind: "process", label: "04 · 해결 아키텍처 흐름도", thumb: "thumbs/baze/okr_slide_05.png" },
      { index: 5, kind: "table", label: "05 · 경쟁사·스펙 비교 매트릭스 표", thumb: "thumbs/baze/okr_slide_07.png" },
      { index: 6, kind: "closing", label: "06 · 실행 로드맵 및 결론", thumb: "thumbs/baze/okr_slide_08.png" }
    ];
  }

  function renderDrawer(sel, state) {
    if (!sel) return "";
    var slides = getSlides(sel);
    var activeIdx = state.csSlideIdx || 0;
    if (activeIdx >= slides.length) activeIdx = 0;
    var curSlide = slides[activeIdx] || slides[0];
    var slideRatio = state.csSlideRatio || "4:3";
    var drawerCols = state.csDrawerCols || 2;
    var ratioCss = slideRatio === "4:3" ? "4 / 3" : "16 / 9";

    return '<aside class="cs-slide-drawer">' +
      '<div class="cs-drawer-head">' +
      '<div style="display:flex;align-items:center;gap:6px"><span class="cs-dark-chip">' + sel.source + ' · ' + (sel.slideCount || slides.length) + '장</span><h3 style="font-size:14.5px;font-weight:800">' + sel.title + '</h3></div>' +
      '<div style="display:flex;align-items:center;gap:4px">' +
      '<div class="cs-seg"><button class="' + (slideRatio === "4:3" ? "active" : "") + '" data-cs-ratio="4:3">4:3 비율</button><button class="' + (slideRatio === "16:9" ? "active" : "") + '" data-cs-ratio="16:9">16:9</button></div>' +
      '<div class="cs-seg"><button class="' + (drawerCols === 1 ? "active" : "") + '" data-cs-cols="1">1열 크게</button><button class="' + (drawerCols === 2 ? "active" : "") + '" data-cs-cols="2">2열</button></div>' +
      '</div></div>' +
      '<div class="cs-big-viewer">' +
      '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">' +
      '<span style="font-size:12px;font-weight:800;color:#0F5132">세부 장표 확대 (#' + String(curSlide.index).padStart(2, "0") + ' / ' + slides.length + ') · ' + curSlide.label + '</span>' +
      '<div style="display:flex;gap:4px"><button class="btn-sm" data-cs-slide-nav="-1">◀ 이전</button><button class="btn-sm" data-cs-slide-nav="1">다음 ▶</button></div></div>' +
      '<div class="cs-big-frame" style="aspect-ratio:' + ratioCss + '"><img src="' + getThumbUrl(sel, curSlide) + '" alt="' + curSlide.label + '"/></div></div>' +
      '<div style="border-top:1px solid #E3E0D8;padding-top:9px">' +
      '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:7px"><span style="font-size:12px;font-weight:800">전체 세부 장표 (' + slides.length + '장 · 클릭 시 상단 확대)</span><span style="font-size:11px;color:#5A5751">좌측 경계선(⋮) 드래그 폭 조절 ⇔</span></div>' +
      '<div class="cs-mini-grid" style="grid-template-columns:repeat(' + drawerCols + ',minmax(0,1fr))">' +
      slides.map(function (s, idx) {
        var isCur = idx === activeIdx;
        return '<div class="cs-mini-card' + (isCur ? " active" : "") + '" data-cs-slide-idx="' + idx + '">' +
          '<div class="cs-mini-frame" style="aspect-ratio:' + ratioCss + '"><img src="' + getThumbUrl(sel, s) + '" alt="' + s.label + '"/></div>' +
          '<div class="cs-mini-cap"><span>#' + String(s.index).padStart(2, "0") + ' ' + (s.kind || "SLIDE").toUpperCase() + '</span>' + (isCur ? '<b style="color:#0F5132">선택됨</b>' : '') + '</div>' +
          '<div class="cs-mini-title">' + s.label + '</div></div>';
      }).join("") + '</div></div>' +
      '<div class="cs-drawer-foot">' +
      '<input type="text" id="cs-brief-topic" value="고수템 2R 발표안" placeholder="발표 주제 입력" style="flex:1;min-width:130px"/>' +
      '<button class="btn-sm cs-btn-green" style="height:32px;padding:0 12px" data-cs-copy-brief="' + sel.id + '">이 템플릿으로 만들기</button>' +
      '<button class="btn-sm" style="height:32px;background:#0F4C81;color:#FFF" data-cs-send-studio="' + sel.id + '">AI 캔버스 연동 ↗</button>' +
      '</div></aside>';
  }

  function bindResizer(state) {
    var resizer = document.getElementById("cs-gallery-resizer");
    var splitEl = document.getElementById("cs-split-container");
    if (!resizer || !splitEl) return;
    resizer.onmousedown = function (e) {
      e.preventDefault();
      resizer.classList.add("dragging");
      var rect = splitEl.getBoundingClientRect();
      var onMove = function (ev) {
        var pct = Math.round(((ev.clientX - rect.left) / rect.width) * 100);
        if (pct < 25) pct = 25;
        if (pct > 75) pct = 75;
        state.csLeftWidthPct = pct;
        splitEl.style.gridTemplateColumns = pct + "fr 8px " + (100 - pct) + "fr";
      };
      var onUp = function () {
        resizer.classList.remove("dragging");
        window.removeEventListener("mousemove", onMove);
        window.removeEventListener("mouseup", onUp);
      };
      window.addEventListener("mousemove", onMove);
      window.addEventListener("mouseup", onUp);
    };
  }

  return {
    getThumbUrl: getThumbUrl,
    getSlides: getSlides,
    renderDrawer: renderDrawer,
    bindResizer: bindResizer
  };
})();
