/* 컨텐츠 스튜디오 전사 템플릿 허브 (src/components/contentStudioHub.js · 15KB 이하)
   - 4:3 컴팩트 카드 + 카드 크기 슬라이더 + 마우스 드래그 분할선(⋮) + 세부 장표 확대 뷰어 */
window.GOSU_CS_HUB = (function () {
  var STORAGE_KEY = "gosu-house-cs-catalog-v3";
  var SIDEBAR_ICON = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 3v18"/></svg>';
  var SHORT_TAGS = ["사업계획서", "제안서", "IR피치덱", "제품비교", "박사논문", "OKR"];

  function loadCatalog() {
    var seed = [].concat(window.GOSU_CS_PPT || [], window.GOSU_CS_MIRI || [], window.GOSU_CS_ROBO || []);
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

    var items = state.csItems || [];
    var bizFilter = state.bizUnit || "all";
    var folder = state.csFolder || "ppt_all";
    var viewMode = state.csViewMode || "card";
    var query = (state.csQuery || "").trim().toLowerCase();
    var tag = state.csTag || "";
    var isLeftOpen = state.csTreeOpen !== false;
    var leftPct = state.csLeftWidthPct || 45;
    var cardMinPx = state.csCardMinPx || 175;

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
      if (query) {
        var hay = (it.id + " " + it.title + " " + (it.note || "") + " " + (it.tags || []).join(" ")).toLowerCase();
        if (hay.indexOf(query) === -1) return false;
      }
      return true;
    });

    var sel = filtered.find(function (x) { return x.id === state.csSelectedId; }) || filtered[0] || null;
    if (sel) state.csSelectedId = sel.id;
    var activeFolderLabel = (folders.find(function (f) { return f.key === folder; }) || folders[0]).label;

    var listHtml = "";
    if (!filtered.length) {
      listHtml = '<div style="padding:28px;color:#5A5751">조건에 맞는 템플릿이 없습니다.</div>';
    } else if (viewMode === "table") {
      listHtml = '<div class="table-wrap"><table><thead><tr><th>썸네일(4:3)</th><th>제목 (클릭 수정)</th><th>태그</th><th>메모</th><th>작업</th></tr></thead><tbody>' +
        filtered.map(function (it) {
          var isSel = sel && it.id === sel.id;
          var cnt = it.slideCount || (it.slides ? it.slides.length : 8);
          return '<tr class="' + (isSel ? "active-row" : "") + '" data-cs-pick="' + it.id + '" style="cursor:pointer">' +
            '<td style="width:74px"><div class="cs-mini-thumb"><img src="' + D.getThumbUrl(it) + '" alt="' + it.title + '"/></div></td>' +
            '<td><input class="cs-inline-in" style="font-weight:800" data-cs-edit-title="' + it.id + '" value="' + (it.title || "").replace(/"/g, "&quot;") + '"/><div style="font-size:11px;color:#8A867E">' + it.id + ' · ' + cnt + '장</div></td>' +
            '<td style="width:140px"><input class="cs-inline-in" data-cs-edit-tags="' + it.id + '" value="' + (it.tags || []).join(", ") + '"/></td>' +
            '<td><input class="cs-inline-in" data-cs-edit-note="' + it.id + '" value="' + (it.note || "").replace(/"/g, "&quot;") + '"/></td>' +
            '<td style="width:165px;white-space:nowrap">' +
            '<button class="btn-sm" data-cs-pick="' + it.id + '">장표(' + cnt + ')</button> ' +
            '<button class="btn-sm cs-btn-green" data-cs-send-studio="' + it.id + '">만들기</button> ' +
            '<button class="btn-sm cs-btn-del" data-cs-del="' + it.id + '">삭제</button></td></tr>';
        }).join("") + '</tbody></table></div>';
    } else {
      listHtml = '<div id="cs-card-grid-el" class="cs-43-grid" style="grid-template-columns:repeat(auto-fill,minmax(' + cardMinPx + 'px,1fr))">' +
        filtered.map(function (it) {
          var isSel = sel && it.id === sel.id;
          var cnt = it.slideCount || (it.slides ? it.slides.length : 8);
          var badge = it.source === "baze" ? "Baze" : it.source === "local_pptx" ? "로컬PPT" : it.source === "miricanvas" ? "미리캔버스" : "로보엠디";
          return '<article class="cs-43-card' + (isSel ? " selected" : "") + '">' +
            '<div class="cs-43-thumb" data-cs-pick="' + it.id + '">' +
            '<img src="' + D.getThumbUrl(it) + '" alt="' + it.title + '"/>' +
            '<span class="cs-thumb-badge">' + badge + '</span>' +
            '<span class="cs-thumb-count">' + cnt + '장</span></div>' +
            '<div class="cs-43-info">' +
            '<h3 data-cs-pick="' + it.id + '">' + it.title + '</h3>' +
            '<p class="cs-43-note">' + (it.note || "") + '</p>' +
            '<div class="cs-43-foot">' +
            '<button class="btn-sm" data-cs-pick="' + it.id + '">장표(' + cnt + ')</button>' +
            '<div style="display:flex;gap:4px">' +
            '<button class="btn-sm cs-btn-del" data-cs-del="' + it.id + '">삭제</button>' +
            '<button class="btn-sm cs-btn-green" data-cs-send-studio="' + it.id + '">만들기</button>' +
            '</div></div></div></article>';
        }).join("") + '</div>';
    }

    var rightPct = 100 - leftPct;
    host.innerHTML =
      '<div class="cs-d2-layout ' + (isLeftOpen ? "tree-open" : "tree-closed") + '">' +
      (isLeftOpen ? '<nav class="cs-d2-tree">' + folders.map(function (f) {
        return '<button class="cs-tree-item' + (folder === f.key ? " active" : "") + '" data-cs-folder="' + f.key + '"><span>' + f.label + '</span></button>';
      }).join("") + '</nav>' : '') +
      '<div class="cs-d2-main">' +
      '<div class="cs-d2-bar">' +
      '<div style="display:flex;align-items:center;gap:5px;flex-wrap:wrap">' +
      '<button class="cs-icon-btn" data-cs-toggle-tree="1" title="폴더 트리 접기/열기">' + SIDEBAR_ICON + '</button>' +
      (!isLeftOpen ? '<span class="cs-dark-chip">' + activeFolderLabel + '</span>' : '') +
      SHORT_TAGS.map(function (t) {
        return '<button class="cs-tag-pill' + (tag === t ? " active" : "") + '" data-cs-tag="' + t + '">#' + t + '</button>';
      }).join("") + '</div>' +
      '<div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">' +
      '<label style="display:inline-flex;align-items:center;gap:4px;font-size:11px;font-weight:700;color:#5A5751"><span>카드크기</span><input type="range" id="cs-card-size-in" min="140" max="260" step="15" value="' + cardMinPx + '" style="width:68px;cursor:pointer"/></label>' +
      '<div class="cs-seg"><button class="' + (leftPct === 57 ? "active" : "") + '" data-cs-split="57">4:3폭</button><button class="' + (leftPct === 45 ? "active" : "") + '" data-cs-split="45">장표넓게</button><button class="' + (leftPct === 35 ? "active" : "") + '" data-cs-split="35">장표최대</button></div>' +
      '<div class="cs-seg"><button class="' + (viewMode === "card" ? "active" : "") + '" data-cs-view="card">카드 뷰</button><button class="' + (viewMode === "table" ? "active" : "") + '" data-cs-view="table">표 뷰</button></div>' +
      '</div></div>' +
      '<div class="cs-resizable-split" id="cs-split-container" style="grid-template-columns:' + (sel ? leftPct + "fr 8px " + rightPct + "fr" : "1fr") + '">' +
      '<div style="min-width:0;overflow-y:auto;max-height:760px">' + listHtml + '</div>' +
      (sel ? '<div class="cs-resizer-bar" id="cs-gallery-resizer" title="마우스로 좌우 드래그하여 목록과 세부 장표 서랍 폭을 조절하세요"><span>⋮</span></div>' + D.renderDrawer(sel, state) : '') +
      '</div></div></div>';

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

  return {
    loadCatalog: loadCatalog,
    saveCatalog: saveCatalog,
    renderHub: renderHub
  };
})();
