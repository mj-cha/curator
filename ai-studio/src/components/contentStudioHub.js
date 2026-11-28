/* 컨텐츠 스튜디오 전사 템플릿 허브 (src/components/contentStudioHub.js · 15KB 이하) */
window.GOSU_CS_HUB = (function () {
  var STORAGE_KEY = "gosu-house-cs-catalog-v4";
  var SIDEBAR_ICON = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 3v18"/></svg>';
  var SHORT_TAGS = ["사업계획서", "제안서", "IR피치덱", "제품비교", "박사논문", "OKR"];

  function loadCatalog() {
    var raw = [].concat(window.GOSU_CS_PPT || [], window.GOSU_CS_MIRI || [], window.GOSU_CS_ROBO || []);
    var seen = {}, seed = [];
    for (var i = 0; i < raw.length; i++) {
      if (raw[i] && !seen[raw[i].id]) { seen[raw[i].id] = 1; seed.push(raw[i]); }
    }
    try {
      var saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
      if (Array.isArray(saved) && saved.length >= 50) return saved;
    } catch (e) { /* 무시 */ }
    return seed;
  }

  function saveCatalog(items) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(items)); } catch (e) { /* 무시 */ }
  }

  function renderHub(state) {
    var host = document.getElementById("cs-hub-mount");
    if (!host) return;
    var D = window.GOSU_CS_DRAWER;
    var items = state.csItems || [], bizFilter = state.bizUnit || "all", folder = state.csFolder || "ppt_all";
    var viewMode = state.csViewMode || "card", query = (state.csQuery || "").trim().toLowerCase(), tag = state.csTag || "";
    var isLeftOpen = state.csTreeOpen !== false, leftPct = state.csLeftWidthPct || 45, cardMinPx = state.csCardMinPx || 175;

    var bizScoped = items.filter(function (it) {
      return bizFilter === "all" || it.biz === bizFilter || (it.tags && it.tags.indexOf("전사공용") !== -1);
    });

    var counts = {
      ppt_all: bizScoped.filter(function (x) { return x.type === "ppt_template"; }).length,
      baze: bizScoped.filter(function (x) { return x.source === "baze"; }).length,
      local_pptx: bizScoped.filter(function (x) { return x.source === "local_pptx"; }).length,
      miricanvas: bizScoped.filter(function (x) { return x.source === "miricanvas"; }).length,
      robomd: bizScoped.filter(function (x) { return x.source === "robomd"; }).length,
      all: bizScoped.length
    };

    var folders = [
      { key: "ppt_all", label: "PPT(" + counts.ppt_all + ")" },
      { key: "baze", label: "Baze(" + counts.baze + ")" },
      { key: "local_pptx", label: "로컬PPT(" + counts.local_pptx + ")" },
      { key: "miricanvas", label: "미리캔버스(" + counts.miricanvas + ")" },
      { key: "robomd", label: "로보엠디(" + counts.robomd + ")" },
      { key: "all", label: "전체보기(" + counts.all + ")" }
    ];

    var filtered = bizScoped.filter(function (it) {
      if (folder === "ppt_all" && it.type !== "ppt_template") return false;
      if (folder === "baze" && it.source !== "baze") return false;
      if (folder === "local_pptx" && it.source !== "local_pptx") return false;
      if (folder === "miricanvas" && it.source !== "miricanvas") return false;
      if (folder === "robomd" && it.source !== "robomd") return false;
      if (tag && (it.tags || []).indexOf(tag) === -1) return false;
      if (query && (it.id + " " + it.title + " " + (it.note || "") + " " + (it.tags || []).join(" ")).toLowerCase().indexOf(query) === -1) return false;
      return true;
    });

    var sel = filtered.find(function (x) { return x.id === state.csSelectedId; }) || filtered[0] || null;
    if (sel) state.csSelectedId = sel.id;
    var activeFolderLabel = (folders.find(function (f) { return f.key === folder; }) || folders[0]).label;

    var listHtml = "";
    if (!filtered.length) {
      listHtml = '<div style="padding:28px;color:#5A5751">조건에 맞는 템플릿이 없습니다.</div>';
    } else if (viewMode === "table") {
      listHtml = '<div class="table-wrap"><table><thead><tr><th>썸네일</th><th>제목 (클릭 수정)</th><th>태그</th><th>메모</th><th>작업</th></tr></thead><tbody>' +
        filtered.map(function (it) {
          var isSel = sel && it.id === sel.id, cnt = it.slideCount || (it.slides ? it.slides.length : 8);
          return '<tr class="' + (isSel ? "active-row" : "") + '" data-cs-pick="' + it.id + '" style="cursor:pointer">' +
            '<td style="width:74px"><div class="cs-mini-thumb"><img src="' + D.getThumbUrl(it) + '" alt="' + it.title + '"/></div></td>' +
            '<td><input class="cs-inline-in" style="font-weight:800" data-cs-edit-title="' + it.id + '" value="' + (it.title || "").replace(/"/g, "&quot;") + '"/><div style="font-size:11px;color:#8A867E">' + it.id + ' · ' + cnt + '장</div></td>' +
            '<td style="width:140px"><input class="cs-inline-in" data-cs-edit-tags="' + it.id + '" value="' + (it.tags || []).join(", ") + '"/></td>' +
            '<td><input class="cs-inline-in" data-cs-edit-note="' + it.id + '" value="' + (it.note || "").replace(/"/g, "&quot;") + '"/></td>' +
            '<td style="width:165px;white-space:nowrap"><button class="btn-sm" data-cs-pick="' + it.id + '">장표(' + cnt + ')</button> <button class="btn-sm cs-btn-green" data-cs-send-studio="' + it.id + '">만들기</button> <button class="btn-sm cs-btn-del" data-cs-del="' + it.id + '">삭제</button></td></tr>';
        }).join("") + '</tbody></table></div>';
    } else {
      listHtml = '<div id="cs-card-grid-el" class="cs-43-grid" style="grid-template-columns:repeat(auto-fill,minmax(' + cardMinPx + 'px,1fr))">' +
        filtered.map(function (it) {
          var isSel = sel && it.id === sel.id, cnt = it.slideCount || (it.slides ? it.slides.length : 8);
          var badge = it.source === "baze" ? "Baze" : it.source === "local_pptx" ? "로컬PPT" : it.source === "miricanvas" ? "미리캔버스" : "로보엠디";
          return '<article class="cs-43-card' + (isSel ? " selected" : "") + '"><div class="cs-43-thumb" data-cs-pick="' + it.id + '"><img src="' + D.getThumbUrl(it) + '" alt="' + it.title + '"/><span class="cs-thumb-badge">' + badge + '</span><span class="cs-thumb-count">' + cnt + '장</span></div>' +
            '<div class="cs-43-info"><h3 data-cs-pick="' + it.id + '">' + it.title + '</h3><p class="cs-43-note">' + (it.note || "") + '</p><div class="cs-43-foot"><button class="btn-sm" data-cs-pick="' + it.id + '">장표(' + cnt + ')</button><div style="display:flex;gap:4px"><button class="btn-sm cs-btn-del" data-cs-del="' + it.id + '">삭제</button><button class="btn-sm cs-btn-green" data-cs-send-studio="' + it.id + '">만들기</button></div></div></div></article>';
        }).join("") + '</div>';
    }

    var rightPct = 100 - leftPct;
    host.innerHTML =
      '<div class="cs-d2-layout ' + (isLeftOpen ? "tree-open" : "tree-closed") + '">' +
      (isLeftOpen ? '<nav class="cs-d2-tree">' + folders.map(function (f) { return '<button class="cs-tree-item' + (folder === f.key ? " active" : "") + '" data-cs-folder="' + f.key + '"><span>' + f.label + '</span></button>'; }).join("") + '</nav>' : '') +
      '<div class="cs-d2-main"><div class="cs-d2-bar"><div style="display:flex;align-items:center;gap:5px;flex-wrap:wrap">' +
      '<button class="cs-icon-btn" data-cs-toggle-tree="1" title="폴더 트리 접기/열기">' + SIDEBAR_ICON + '</button>' +
      (!isLeftOpen ? '<span class="cs-dark-chip">' + activeFolderLabel + '</span>' : '') +
      SHORT_TAGS.map(function (t) { return '<button class="cs-tag-pill' + (tag === t ? " active" : "") + '" data-cs-tag="' + t + '">#' + t + '</button>'; }).join("") + '</div>' +
      '<div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">' +
      '<label style="display:inline-flex;align-items:center;gap:4px;font-size:11px;font-weight:700;color:#5A5751"><span>카드크기</span><input type="range" id="cs-card-size-in" min="140" max="260" step="15" value="' + cardMinPx + '" style="width:68px;cursor:pointer"/></label>' +
      '<div class="cs-seg"><button class="' + (leftPct === 57 ? "active" : "") + '" data-cs-split="57">4:3폭</button><button class="' + (leftPct === 45 ? "active" : "") + '" data-cs-split="45">장표넓게</button><button class="' + (leftPct === 35 ? "active" : "") + '" data-cs-split="35">장표최대</button></div>' +
      '<div class="cs-seg"><button class="' + (viewMode === "card" ? "active" : "") + '" data-cs-view="card">카드 뷰</button><button class="' + (viewMode === "table" ? "active" : "") + '" data-cs-view="table">표 뷰</button></div></div></div>' +
      '<div class="cs-resizable-split" id="cs-split-container" style="grid-template-columns:' + (sel ? leftPct + "fr 8px " + rightPct + "fr" : "1fr") + '">' +
      '<div style="min-width:0;overflow-y:auto;max-height:760px">' + listHtml + '</div>' +
      (sel ? '<div class="cs-resizer-bar" id="cs-gallery-resizer" title="마우스로 드래그하여 폭 조절"><span>⋮</span></div>' + D.renderDrawer(sel, state) : '') + '</div></div></div>';

    D.bindResizer(state);
    var slider = document.getElementById("cs-card-size-in");
    if (slider) {
      slider.oninput = function (e) {
        state.csCardMinPx = Number(e.target.value);
        var grid = document.getElementById("cs-card-grid-el");
        if (grid) grid.style.gridTemplateColumns = "repeat(auto-fill,minmax(" + state.csCardMinPx + "px,1fr))";
      };
    }
  }

  function handleClick(t, state, R, C, V, setMenu, copyText, toast) {
    var csFolderBtn = t.closest("[data-cs-folder]");
    if (csFolderBtn) { state.csFolder = csFolderBtn.getAttribute("data-cs-folder"); state.csSlideIdx = 0; renderHub(state); return true; }
    if (t.closest("[data-cs-toggle-tree]")) { state.csTreeOpen = !state.csTreeOpen; renderHub(state); return true; }
    var csTagBtn = t.closest("[data-cs-tag]");
    if (csTagBtn) { var nt = csTagBtn.getAttribute("data-cs-tag"); state.csTag = state.csTag === nt ? "" : nt; renderHub(state); return true; }
    var csSplitBtn = t.closest("[data-cs-split]");
    if (csSplitBtn) { state.csLeftWidthPct = Number(csSplitBtn.getAttribute("data-cs-split")); renderHub(state); return true; }
    var csRatioBtn = t.closest("[data-cs-ratio]");
    if (csRatioBtn) { state.csSlideRatio = csRatioBtn.getAttribute("data-cs-ratio"); renderHub(state); return true; }
    var csColsBtn = t.closest("[data-cs-cols]");
    if (csColsBtn) { state.csDrawerCols = Number(csColsBtn.getAttribute("data-cs-cols")); renderHub(state); return true; }
    var csSlideCard = t.closest("[data-cs-slide-idx]");
    if (csSlideCard) { state.csSlideIdx = Number(csSlideCard.getAttribute("data-cs-slide-idx")); renderHub(state); return true; }
    var csSlideNav = t.closest("[data-cs-slide-nav]");
    if (csSlideNav) {
      var dir = Number(csSlideNav.getAttribute("data-cs-slide-nav"));
      var curIt = state.csItems.find(function (x) { return x.id === state.csSelectedId; });
      var len = (curIt && curIt.slides && curIt.slides.length) ? curIt.slides.length : 6;
      state.csSlideIdx = (state.csSlideIdx + dir + len) % len; renderHub(state); return true;
    }
    var csViewBtn = t.closest("[data-cs-view]");
    if (csViewBtn) { state.csViewMode = csViewBtn.getAttribute("data-cs-view"); renderHub(state); return true; }
    var csPptx = t.closest("[data-cs-dl-pptx]");
    if (csPptx && window.GOSU_PPTX_API) {
      var pItem = state.csItems.find(function (x) { return x.id === csPptx.getAttribute("data-cs-dl-pptx"); });
      if (pItem) {
        var pTopic = (document.getElementById("cs-brief-topic") || {}).value || "고수템 2R 발표안";
        window.GOSU_PPTX_API.downloadPptxFile(pItem, window.GOSU_CS_DRAWER ? window.GOSU_CS_DRAWER.getSlides(pItem) : [], pTopic, toast);
      }
      return true;
    }
    var csSend = t.closest("[data-cs-send-studio]");
    if (csSend) {
      var item = state.csItems.find(function (x) { return x.id === csSend.getAttribute("data-cs-send-studio"); });
      if (item) {
        setMenu("studio", "design");
        var hEl = document.getElementById("design-headline-in"), sEl = document.getElementById("design-subhead-in");
        if (hEl) hEl.value = item.title;
        if (sEl) sEl.value = "[" + item.source.toUpperCase() + " · " + item.id + "] " + (item.note || "");
        V.renderDesignStudio(state, R, C); toast("'" + item.title + "' 템플릿을 AI 디자인 캔버스로 불러왔어요.");
      }
      return true;
    }
    var csBrief = t.closest("[data-cs-copy-brief]");
    if (csBrief) {
      var bItem = state.csItems.find(function (x) { return x.id === csBrief.getAttribute("data-cs-copy-brief"); });
      if (bItem) copyText("[제작 브리프] " + ((document.getElementById("cs-brief-topic") || {}).value || "고수템 2R 발표안") + " | " + bItem.title + " (" + bItem.id + ")", "브리프");
      return true;
    }
    var csDel = t.closest("[data-cs-del]");
    if (csDel) {
      var delId = csDel.getAttribute("data-cs-del");
      state.csItems = state.csItems.filter(function (x) { return x.id !== delId; });
      saveCatalog(state.csItems); renderHub(state); toast(delId + " 삭제 완료"); return true;
    }
    var csPick = t.closest("[data-cs-pick]");
    if (csPick && !t.closest("input")) { state.csSelectedId = csPick.getAttribute("data-cs-pick"); state.csSlideIdx = 0; renderHub(state); return true; }
    return false;
  }

  return { loadCatalog: loadCatalog, saveCatalog: saveCatalog, renderHub: renderHub, handleClick: handleClick };
})();
