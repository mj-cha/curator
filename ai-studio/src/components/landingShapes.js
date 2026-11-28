/* 핸디핏 랜딩 빌더 섹션 모양별(숫자강조띠·카드3열·번호스텝·사진슬라이드·체크리스트) 캔버스 렌더러 (src/components/landingShapes.js · 15KB 이하) */
window.GOSU_LANDING_SHAPES = (function () {
  function renderSectionShapeBody(s, idx, hSize, rCss, hasImg, isAct, ed) {
    var INSP = window.GOSU_LANDING_INSPECTOR, cards = Array.isArray(s.cards) ? s.cards : [];
    var isCenter = s.layout === "숫자 강조 띠" || s.layout === "한 문장 강조" || s.layout === "신청 버튼 띠";

    var topBar = isAct ? (
      '<div class="hf-sec-action-bar" onclick="event.stopPropagation()">' +
      '<button type="button" data-hf-act="move-sec" data-idx="' + idx + '" data-dir="-1">↑</button>' +
      '<button type="button" data-hf-act="move-sec" data-idx="' + idx + '" data-dir="1">↓</button>' +
      '<button type="button" data-hf-act="add-badge">+ 머리글</button>' +
      '<button type="button" data-hf-act="toggle-desc">+ 작은 글</button>' +
      '<button type="button" data-hf-act="add-cta">+ 폼 버튼</button>' +
      '<button type="button" data-hf-act="add-card-col">+ 칸</button>' +
      '<button type="button" data-hf-act="clone-sec" data-idx="' + idx + '">복제</button>' +
      '<button type="button" data-hf-act="toggle-sec-vis" data-val="' + s.id + '">숨기기</button>' +
      '<button type="button" class="danger" data-hf-act="del-sec" data-idx="' + idx + '">삭제</button></div>'
    ) : "";

    var styleBar = isAct && ed.showFloatingBar ? (
      '<div class="hf-float-bar" onclick="event.stopPropagation()">' +
      '<button type="button" class="hf-fb-btn ' + (s.headBold ? "active" : "") + '" data-hf-act="toggle-bold"><b>B</b></button><span class="hf-fb-sep"></span>' +
      ["#0C3C78", "#0284C7", "#F59E0B", "#141413", "#FFFFFF"].map(function (c) {
        return '<button type="button" class="hf-color-dot" style="background:' + (c === "#FFFFFF" ? "#475569" : c) + ';color:#FFF" data-hf-act="head-color" data-val="' + c + '">가</button>';
      }).join("") + '<span class="hf-fb-sep"></span>' +
      ["작게", "보통", "크게", "아주 크게"].map(function (sz) {
        return '<button type="button" class="hf-sz-btn ' + (s.headSize === sz ? "active" : "") + '" data-hf-act="head-size" data-val="' + sz + '">' + sz + '</button>';
      }).join("") +
      '<button type="button" class="hf-sz-btn" data-hf-act="toggle-img-picker">🖼 정물함</button>' +
      '<button type="button" class="hf-sz-btn active" data-hf-act="hide-float">✓</button></div>'
    ) : "";

    var headBlock = '<div class="hf-sec-text" style="text-align:' + (isCenter ? "center" : "left") + '">' +
      (s.badge ? '<div class="hf-sec-badge" contenteditable="true" data-hf-edit="badge" data-sec-id="' + s.id + '">' + s.badge + '</div>' : '') +
      '<h2 class="hf-sec-h2" contenteditable="true" data-hf-edit="headline" data-sec-id="' + s.id + '" style="font-size:' + hSize + ';color:' + s.headColor + ';font-weight:' + (s.headBold ? "900" : "500") + '">' + s.headline + '</h2>' + styleBar +
      (s.showDesc && s.desc ? '<p class="hf-sec-desc" contenteditable="true" data-hf-edit="desc" data-sec-id="' + s.id + '">' + s.desc + '</p>' : '') +
      (s.cta ? '<div style="margin-top:12px"><span class="hf-sec-cta" contenteditable="true" data-hf-edit="cta" data-sec-id="' + s.id + '" style="background:#0284C7;color:#FFF;border-radius:999px">' + s.cta + '</span></div>' : '') + '</div>';

    var cardsHtml = "";
    if (s.layout === "숫자 강조 띠" && cards.length) {
      cardsHtml = '<div class="hf-shape-numband">' + cards.map(function (c, ci) {
        return '<div class="hf-nb-col"><strong contenteditable="true" data-hf-card-t="' + ci + '" data-sec-id="' + s.id + '">' + c.t + '</strong><p contenteditable="true" data-hf-card-d="' + ci + '" data-sec-id="' + s.id + '">' + c.d + '</p></div>';
      }).join("") + '</div>';
    } else if (s.layout === "번호 스텝" && cards.length) {
      cardsHtml = '<div class="hf-shape-steps">' + cards.map(function (c, ci) {
        return '<div class="hf-step-col"><div class="hf-step-num">0' + (ci + 1) + '</div><strong contenteditable="true" data-hf-card-t="' + ci + '" data-sec-id="' + s.id + '">' + c.t + '</strong><p contenteditable="true" data-hf-card-d="' + ci + '" data-sec-id="' + s.id + '">' + c.d + '</p></div>';
      }).join("") + '</div>';
    } else if (s.layout === "사진 슬라이드") {
      var list = s.slideShape === "한 장씩" ? [s.imgType && s.imgType !== "none" ? s.imgType : "main"] : ["main", "skip", "bag_ohye"];
      cardsHtml = '<div class="hf-slide-meta">🎞 슬라이드 · ' + (s.slideShape || "한 장씩") + ' · 자동넘김: ' + (s.slideAuto || "3초") + '</div>' +
        '<div style="display:grid;grid-template-columns:' + (s.slideShape === "한 장씩" ? "1fr" : "1.3fr 0.8fr 0.8fr") + ';gap:8px">' +
        list.map(function (m) { return '<div class="hf-sec-img-wrap" style="aspect-ratio:' + rCss + '" data-hf-act="toggle-img-picker"><img src="' + INSP.buildCatalogSvg(m) + '" alt="정물" /></div>'; }).join("") + '</div>';
    } else if (cards.length && /카드|체크|말풍선|2열|스택|배지|목록/.test(s.layout)) {
      var cols = /체크|스택|목록/.test(s.layout) ? "1fr" : /2열/.test(s.layout) ? "repeat(2,1fr)" : "repeat(auto-fit,minmax(170px,1fr))";
      cardsHtml = '<div class="hf-shape-cards" style="grid-template-columns:' + cols + '">' + cards.map(function (c, ci) {
        return '<div class="hf-card-box"><span class="hf-card-ic">' + (s.layout === "말풍선" ? "💬" : "✓") + '</span><strong contenteditable="true" data-hf-card-t="' + ci + '" data-sec-id="' + s.id + '">' + c.t + '</strong><p contenteditable="true" data-hf-card-d="' + ci + '" data-sec-id="' + s.id + '">' + c.d + '</p></div>';
      }).join("") + '</div>';
    }

    var imgBlock = (hasImg && s.layout !== "사진 슬라이드") ? ('<div class="hf-sec-img-wrap" style="aspect-ratio:' + rCss + '" data-hf-act="toggle-img-picker"><img src="' + INSP.buildCatalogSvg(s.imgType) + '" alt="' + s.name + '" /></div>') : "";
    var isSplit = (hasImg && /비주얼|사진 \+ 글|지그재그/.test(s.layout)) && ed.viewport === "desktop";
    return topBar + (isSplit ? ('<div class="hf-sec-split">' + (s.imgPos === "left" ? imgBlock + headBlock : headBlock + imgBlock) + '</div>' + cardsHtml)
      : s.titlePos === "옆" ? ('<div class="hf-sec-split">' + headBlock + '<div>' + cardsHtml + imgBlock + '</div></div>')
      : (headBlock + cardsHtml + imgBlock));
  }

  function renderStep2VisualCanvas(state, H, ed) {
    var INSP = window.GOSU_LANDING_INSPECTOR;
    var vis = ed.sections.filter(function (s) { return s.enabled !== false; });
    var activeSec = ed.sections.find(function (s) { return s.id === ed.activeSecId; }) || vis[0] || ed.sections[0];
    ed.activeSecId = activeSec.id;
    var vpWidth = ed.viewport === "desktop" ? "100%" : ed.viewport === "tablet" ? "640px" : "390px";
    var sizeMap = { "작게": "19px", "보통": "23px", "크게": "28px", "아주 크게": "34px" };
    var ratioMap = { "와이드": "16 / 9", "기본": "4 / 3", "정사각": "1 / 1", "세로": "3 / 4" };
    var navItems = ed.sections.filter(function (s) { return s.inTopNav && s.enabled !== false; });

    var leftCol = '<aside class="hf-left-order">' +
      '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px"><strong style="font-size:13px">페이지 순서</strong><span style="font-size:11px;color:#64748B">끌어서 순서 바꾸기</span></div>' +
      '<div class="hf-order-item muted"><div><b>상단 메뉴</b><br><small>켜짐 · 메뉴 ' + navItems.length + '개</small></div></div>' +
      '<div class="hf-order-list">' +
      ed.sections.map(function (s, idx) {
        var off = s.enabled === false;
        return '<div class="hf-order-item ' + (s.id === ed.activeSecId ? "active" : "") + '" style="' + (off ? "opacity:0.48" : "") + '" draggable="true" data-hf-drag-idx="' + idx + '" data-hf-pick-sec="' + s.id + '">' +
          '<div style="display:flex;align-items:center;gap:7px"><span class="hf-drag-handle">⋮⋮</span><div><b>' + s.name + (off ? " (숨김)" : "") + '</b><br><small>' + s.layout + '</small></div></div><span>⋯</span></div>';
      }).join("") + '</div><button type="button" class="hf-add-sec-btn" data-hf-act="add-new-section">+ 섹션 추가</button></aside>';

    var secsHtml = ed.sections.map(function (s, idx) {
      if (s.enabled === false) return "";
      var isAct = s.id === ed.activeSecId, hSize = sizeMap[s.headSize] || "24px", rCss = ratioMap[s.imgRatio] || "4 / 3", hasImg = s.imgType && s.imgType !== "none";
      return '<section class="hf-canvas-sec ' + (isAct ? "active" : "") + '" data-hf-pick-sec="' + s.id + '" style="background:' + s.bg + ';color:' + s.fg + ';padding:' + s.padY + 'px 28px">' +
        renderSectionShapeBody(s, idx, hSize, rCss, hasImg, isAct, ed) + '</section>';
    }).join("");

    var centerCol = '<div><div class="hf-sub-toolbar">' +
      '<div style="display:flex;align-items:center;gap:6px"><button type="button" class="cs-icon-btn" data-hf-act="undo">↺</button><button type="button" class="cs-icon-btn" data-hf-act="redo">↻</button><span class="hf-saved-pill">● 저장됨</span></div>' +
      '<div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap"><div class="cs-seg">' +
      [["desktop", "🖥 데스크톱"], ["tablet", "📱 태블릿"], ["mobile", "📱 모바일"]].map(function (v) {
        return '<button type="button" class="' + (ed.viewport === v[0] ? "active" : "") + '" data-hf-act="viewport" data-val="' + v[0] + '">' + v[1] + '</button>';
      }).join("") + '</div><button type="button" class="btn-sm" data-hf-act="export-html">미리보기 ↗</button>' +
      '<button type="button" class="btn-sm" style="background:#EEF2FF;color:#1D4ED8" data-hf-act="toggle-img-picker">🖼 정물 사진함</button></div></div>' +
      INSP.renderImagePickerDrawer(ed, activeSec) +
      '<div class="hf-canvas-viewport"><div class="hf-device-frame" style="max-width:' + vpWidth + '">' +
      '<header class="hf-page-sticky-nav"><strong contenteditable="true">' + ed.title + '</strong>' +
      '<div style="display:flex;align-items:center;gap:10px;font-size:11.5px;color:#475569">' +
      navItems.map(function (n) { return '<span>' + n.name + '</span>'; }).join("") +
      '<span class="hf-nav-cta">' + (ed.sections[0] ? ed.sections[0].cta : "무료 등록") + '</span></div></header>' +
      secsHtml + '</div></div></div>';

    return '<div class="hf-3col-grid">' + leftCol + centerCol + INSP.renderInspector(activeSec, ed) + '</div>' +
      '<div class="hf-bottom-bar"><button type="button" class="btn-sec" data-hf-act="set-step" data-val="1">← 아이디어 수정</button><button type="button" class="hf-next-pill-btn" data-hf-act="set-step" data-val="3">폼 연결 →</button></div>';
  }

  function exportStandaloneHtml(state, ed, toast) {
    var htmlSecs = ed.sections.filter(function (s) { return s.enabled !== false; }).map(function (s) {
      return "<section data-track-sec='" + s.id + "' style='background:" + s.bg + ";color:" + s.fg + ";padding:" + s.padY + "px 28px'><small>" + s.badge + "</small><h2>" + s.headline + "</h2>" + (s.showDesc ? "<p>" + s.desc + "</p>" : "") + "</section>";
    }).join("");
    var fullDoc = "<!doctype html><html lang='ko'><head><meta charset='utf-8'><meta name='viewport' content='width=device-width,initial-scale=1'><title>" + ed.title + "</title></head><body style='margin:0;font-family:Pretendard,sans-serif'><div style='max-width:720px;margin:0 auto'>" + htmlSecs + "</div></body></html>";
    if (typeof Blob !== "undefined" && typeof URL !== "undefined" && URL.createObjectURL) {
      var a = document.createElement("a");
      a.href = URL.createObjectURL(new Blob([fullDoc], { type: "text/html;charset=utf-8" }));
      a.download = "curator-p-" + (ed.slug || ed.presetId.toLowerCase()) + "-index.html"; a.click();
    }
    if (toast) toast("미리보기 HTML 저장 완료");
    return fullDoc;
  }

  return { renderSectionShapeBody: renderSectionShapeBody, renderStep2VisualCanvas: renderStep2VisualCanvas, exportStandaloneHtml: exportStandaloneHtml };
})();