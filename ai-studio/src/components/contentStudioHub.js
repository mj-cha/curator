/* 컨텐츠 스튜디오 94종(PPT 8 + 미리캔버스 47 + 로보엠디 39) 전사 템플릿 허브 컴포넌트 (src/components/contentStudioHub.js · 15KB 이하)
   - 카드 뷰 ↔ 엑셀 표 뷰(인라인 편집) 전환 + 폴더 트리 + 우측 속지 미리보기 서랍(Drawer) + AI 스튜디오 직결 */
window.GOSU_CS_HUB = (function () {
  var STORAGE_KEY = "gosu-house-cs-catalog-v2";

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

  /* 깨짐 없는 인라인 SVG 슬라이드/템플릿 썸네일 생성기 (GitHub Pages 100% 호환) */
  function buildThumbSvg(item, slideLabel) {
    var pal = {
      baze: { bg: "#0F2942", bar: "#D4FF34", badge: "BAZE PPT", fg: "#FFFFFF" },
      local_pptx: { bg: "#143628", bar: "#5CE1E6", badge: "로컬 PPTX", fg: "#FFFFFF" },
      miricanvas: { bg: "#2B2927", bar: "#F59E0B", badge: "미리캔버스♥", fg: "#F2F1EC" },
      robomd: { bg: "#1B222D", bar: "#00B8A9", badge: "로보엠디", fg: "#F2F1EC" }
    }[item.source] || { bg: "#1E1F22", bar: "#D4FF34", badge: "TEMPLATE", fg: "#FFFFFF" };

    var title = String(slideLabel || item.title || "").replace(/[<>&"']/g, "").slice(0, 22);
    var sub = (item.id + " · " + (item.ratio || "16:9") + " · " + (item.slideCount || 1) + "장").replace(/[<>&"']/g, "");
    var svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 180" width="100%" height="100%">' +
      '<rect width="320" height="180" fill="' + pal.bg + '"/>' +
      '<rect x="14" y="14" width="100" height="24" rx="4" fill="' + pal.bar + '"/>' +
      '<text x="22" y="30" fill="#11110F" font-family="Pretendard,sans-serif" font-size="11" font-weight="800">' + pal.badge + '</text>' +
      '<text x="298" y="29" text-anchor="end" fill="#A8B3C5" font-family="Pretendard,sans-serif" font-size="11" font-weight="700">' + sub + '</text>' +
      '<rect x="14" y="50" width="292" height="2" fill="rgba(255,255,255,0.12)"/>' +
      '<text x="16" y="92" fill="' + pal.fg + '" font-family="Pretendard,sans-serif" font-size="16" font-weight="800">' + title + '</text>' +
      '<rect x="16" y="114" width="136" height="44" rx="5" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.18)"/>' +
      '<rect x="162" y="114" width="142" height="44" rx="5" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.18)"/>' +
      '<text x="26" y="140" fill="' + pal.bar + '" font-family="Pretendard,sans-serif" font-size="11" font-weight="700">핵심 구조 · 인물 0%</text>' +
      '<text x="172" y="140" fill="#CBD5E1" font-family="Pretendard,sans-serif" font-size="11" font-weight="700">표 · 수치 · 비교 보드</text>' +
      '</svg>';
    return "data:image/svg+xml;utf8," + encodeURIComponent(svg);
  }

  function renderHub(state, callbacks) {
    var items = state.csItems || [];
    var bizFilter = state.bizUnit || "all";
    var folder = state.csFolder || "all";
    var viewMode = state.csViewMode || "card";
    var query = (state.csQuery || "").trim().toLowerCase();
    var tag = state.csTag || "";

    /* 사업부 필터 적용 */
    var bizScoped = items.filter(function (it) {
      return bizFilter === "all" || it.biz === bizFilter || (it.tags && it.tags.indexOf("전사공용") !== -1);
    });

    var counts = {
      all: bizScoped.length,
      ppt_all: bizScoped.filter(function (x) { return x.type === "ppt_template"; }).length,
      baze: bizScoped.filter(function (x) { return x.source === "baze"; }).length,
      local_pptx: bizScoped.filter(function (x) { return x.source === "local_pptx"; }).length,
      miricanvas: bizScoped.filter(function (x) { return x.source === "miricanvas"; }).length,
      robomd: bizScoped.filter(function (x) { return x.source === "robomd"; }).length
    };

    var folders = [
      { key: "all", label: "전체보기(" + counts.all + ")" },
      { key: "ppt_all", label: "PPT 발표덱(" + counts.ppt_all + ")" },
      { key: "baze", label: "Baze(" + counts.baze + ")" },
      { key: "local_pptx", label: "로컬PPT(" + counts.local_pptx + ")" },
      { key: "miricanvas", label: "미리캔버스♥(" + counts.miricanvas + ")" },
      { key: "robomd", label: "로보엠디(" + counts.robomd + ")" }
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

    var folderBarEl = document.getElementById("cs-folder-bar");
    if (folderBarEl) {
      folderBarEl.innerHTML = folders.map(function (f) {
        var act = f.key === folder ? " active" : "";
        return '<button type="button" class="chip-btn' + act + '" data-cs-folder="' + f.key + '">' + f.label + '</button>';
      }).join("");
    }

    var listWrap = document.getElementById("cs-list-container");
    if (listWrap) {
      if (!filtered.length) {
        listWrap.innerHTML = '<div style="padding:28px;color:#4A4B4F">선택한 사업부·폴더 조건에 맞는 템플릿이 없습니다.</div>';
      } else if (viewMode === "table") {
        listWrap.innerHTML = '<div class="table-wrap"><table><thead><tr><th>미리보기</th><th>ID · 제목 (인라인 수정)</th><th>사업부 · 출처</th><th>태그 (쉼표 구분)</th><th>메모</th><th>작업</th></tr></thead><tbody>' +
          filtered.map(function (it) {
            var isSel = sel && it.id === sel.id;
            return '<tr class="' + (isSel ? "active-row" : "") + '" data-cs-pick="' + it.id + '">' +
              '<td style="width:110px"><img src="' + buildThumbSvg(it) + '" alt="' + it.title + '" style="width:100px;border-radius:4px;display:block"/></td>' +
              '<td><input type="text" value="' + (it.title || "").replace(/"/g, "&quot;") + '" data-cs-edit-title="' + it.id + '" style="width:100%;font-weight:800"/><br><small>' + it.id + ' · ' + (it.slideCount || 1) + '장 · ' + (it.ratio || "4:5") + '</small></td>' +
              '<td><span class="badge-accent">' + (it.biz || "mkt").toUpperCase() + '</span><br><small>' + it.source + '</small></td>' +
              '<td><input type="text" value="' + (it.tags || []).join(", ") + '" data-cs-edit-tags="' + it.id + '" style="width:140px"/></td>' +
              '<td><input type="text" value="' + (it.note || "").replace(/"/g, "&quot;") + '" data-cs-edit-note="' + it.id + '" style="width:100%"/></td>' +
              '<td style="white-space:nowrap"><button type="button" class="btn-sm" data-cs-pick="' + it.id + '">속지보기</button> ' +
              '<button type="button" class="btn-sm" data-cs-send-studio="' + it.id + '">스튜디오 연동</button> ' +
              '<button type="button" class="btn-sm" data-cs-del="' + it.id + '">삭제</button></td></tr>';
          }).join("") + '</tbody></table></div>';
      } else {
        listWrap.innerHTML = '<div class="cs-card-grid">' +
          filtered.map(function (it) {
            var isSel = sel && it.id === sel.id;
            return '<article class="cs-card' + (isSel ? " active" : "") + '" data-cs-pick="' + it.id + '">' +
              '<img src="' + buildThumbSvg(it) + '" alt="' + it.title + '" class="cs-thumb"/>' +
              '<div class="cs-card-body">' +
              '<div class="tpl-card-top"><span class="badge-accent">' + (it.biz || "mkt").toUpperCase() + ' · ' + it.source + '</span><span class="badge-sub">' + (it.ratio || "4:5") + ' · ' + (it.slideCount || 1) + '장</span></div>' +
              '<strong>' + it.title + '</strong>' +
              '<small>' + (it.note || "") + '</small>' +
              '<div class="btn-row" style="margin-top:6px">' +
              '<button type="button" class="btn-sm" data-cs-pick="' + it.id + '">속지(' + (it.slideCount || 1) + ')</button>' +
              '<button type="button" class="btn-sm" style="background:#0F4C81;color:#FFF" data-cs-send-studio="' + it.id + '">이 템플릿으로 제작 ↗</button>' +
              '<button type="button" class="btn-sm" data-cs-del="' + it.id + '">삭제</button>' +
              '</div></div></article>';
          }).join("") + '</div>';
      }
    }

    /* 우측 속지 미리보기 서랍 (Slide Drawer) */
    var drawerEl = document.getElementById("cs-slide-drawer");
    if (drawerEl) {
      if (!sel) {
        drawerEl.innerHTML = '<p style="color:#4A4B4F">좌측에서 템플릿을 선택하면 속지 구성과 브리프 생성기가 열립니다.</p>';
      } else {
        var slides = sel.slides && sel.slides.length ? sel.slides : [
          { index: 1, label: "01 · 메인 표지 / 첫 화면 후크" },
          { index: 2, label: "02 · 핵심 문제 정의 & 수치 근거" },
          { index: 3, label: "03 · 교차 검증 비교표 & 해결책" },
          { index: 4, label: "04 · 행동 유도(CTA) & 요약" }
        ];
        drawerEl.innerHTML =
          '<div class="tpl-card-top"><span class="badge-accent">' + sel.id + ' · ' + (sel.biz || "mkt").toUpperCase() + '</span><span class="badge-sub">' + sel.source + ' · ' + (sel.ratio || "16:9") + '</span></div>' +
          '<h3 style="margin:8px 0 4px;font-size:16px">' + sel.title + '</h3>' +
          '<p style="font-size:12.5px;color:#4A4B4F;margin-bottom:10px">' + (sel.note || "") + '</p>' +
          '<div class="btn-row" style="margin-bottom:12px">' +
          '<button type="button" class="btn-pri" data-cs-send-studio="' + sel.id + '">AI 스튜디오 캔버스로 불러오기 ↗</button>' +
          '<button type="button" class="btn-sec" data-cs-copy-brief="' + sel.id + '">PPT·콘텐츠 기획 브리프 복사</button>' +
          '</div>' +
          '<h4 style="font-size:12.5px;margin-bottom:8px;color:#0F4C81">속지(슬라이드) 구조 미리보기 (' + slides.length + '장)</h4>' +
          '<div style="display:grid;grid-template-columns:1fr;gap:8px;max-height:380px;overflow-y:auto">' +
          slides.map(function (s) {
            return '<div style="border:1px solid #D8D6CE;border-radius:6px;padding:8px;background:#FAF9F5">' +
              '<img src="' + buildThumbSvg(sel, s.label) + '" alt="' + s.label + '" style="width:100%;border-radius:4px;margin-bottom:4px"/>' +
              '<strong style="font-size:12px">' + s.label + '</strong></div>';
          }).join("") + '</div>';
      }
    }
  }

  return {
    loadCatalog: loadCatalog,
    saveCatalog: saveCatalog,
    renderHub: renderHub
  };
})();
