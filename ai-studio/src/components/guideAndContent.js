/* 핸디핏 5단계 가이드 & 4탭 기획·촬영표 (guideAndContent.js) */
window.GOSU_GUIDE_CONTENT = (function () {
  var BRANDS_KEY = "gosu-erp-common-brands-v1";
  function ensureGuideState(state) {
    var GS = window.GOSU_GUIDE_SEED || {};
    if (!state.gcMode) state.gcMode = "guide";
    if (!state.gcGuideGroupIdx) state.gcGuideGroupIdx = 0;
    if (!state.gcGuideItemIdx) state.gcGuideItemIdx = 0;
    if (!state.gcContentTab) state.gcContentTab = "brand";
    if (!state.gcBrands) {
      try { var s = JSON.parse(localStorage.getItem(BRANDS_KEY) || "null"); if (Array.isArray(s) && s.length) state.gcBrands = s; } catch (e) {}
      if (!state.gcBrands) state.gcBrands = JSON.parse(JSON.stringify(GS.brands || []));
    }
    if (!state.gcActiveBrandId) state.gcActiveBrandId = state.gcBrands[0].id;
    if (!state.gcScripts) state.gcScripts = JSON.parse(JSON.stringify(GS.scriptsByBrand || {}));
  }
  function saveBrands(b) { try { localStorage.setItem(BRANDS_KEY, JSON.stringify(b)); } catch (e) {} }
  function getActiveScript(state, brand) {
    var map = state.gcScripts || {};
    if (!map[brand.id]) {
      map[brand.id] = JSON.parse(JSON.stringify(map["BRD-GOSU"] || window.GOSU_GUIDE_SEED.scriptsByBrand["BRD-GOSU"]));
      map[brand.id].title = "기획 초안 · " + brand.name;
    }
    return map[brand.id];
  }

  function renderStartGuide(state) {
    var GS = window.GOSU_GUIDE_SEED || { guideSteps: [] }, groups = GS.guideSteps;
    var gIdx = Math.max(0, Math.min(groups.length - 1, state.gcGuideGroupIdx || 0)), curGrp = groups[gIdx];
    var iIdx = Math.max(0, Math.min(curGrp.items.length - 1, state.gcGuideItemIdx || 0)), curItem = curGrp.items[iIdx];
    var pct = Math.round(((iIdx + 1) / curGrp.items.length) * 100);

    var accHtml = groups.map(function (g, idx) {
      var open = idx === gIdx;
      return '<div class="step-box" style="padding:0">' +
        '<button type="button" class="nav-btn" style="color:#141413;background:' + (open ? "#EEF6FF" : "#FFF") + '" data-gc-act="pick-guide-grp" data-idx="' + idx + '">' +
        '<span><b>' + g.no + '. ' + g.title + '</b> (' + g.countLabel + ')</span><span>' + (open ? "⌄" : "›") + '</span></button>' +
        (open ? '<div style="padding:6px;display:grid;gap:2px;background:#F8FAFC">' +
          g.items.map(function (it, k) {
            return '<button type="button" class="btn-sm" style="text-align:left;background:' + (k === iIdx ? "#DBEAFE" : "transparent") + '" data-gc-act="pick-guide-item" data-idx="' + k + '">' + it.sub + '</button>';
          }).join("") + '</div>' : '') + '</div>';
    }).join("");

    return '<div class="studio-workspace"><div>' + accHtml + '</div>' +
      '<div class="panel-card" style="margin-bottom:0">' +
      '<div class="panel-head"><span class="badge-accent">' + curGrp.no + '단계 ' + curGrp.title + ' · ' + curItem.sub + '</span>' +
      '<button type="button" class="btn-pri" data-gc-act="jump-target" data-menu="' + curGrp.targetMenu + '" data-step="' + curGrp.targetStep + '">🚀 바로 열기 →</button></div>' +
      '<h2>' + curItem.head + '</h2>' +
      '<div class="step-box" style="background:#1E293B;color:#FFF;margin:10px 0">' +
      '<b style="color:#D4FF34">' + curItem.tip + '</b><p>' + curItem.desc + '</p></div>' +
      '<div style="display:flex;align-items:center;gap:10px">' +
      '<button type="button" class="btn-sec" data-gc-act="guide-prev">← 이전</button>' +
      '<div style="flex:1;height:8px;background:#E2E8F0;border-radius:4px"><div style="width:' + pct + '%;height:100%;background:#2563EB"></div></div>' +
      '<button type="button" class="btn-pri" data-gc-act="guide-next">다음 →</button></div></div></div>';
  }

  function renderContent4Tabs(state) {
    var curBrand = state.gcBrands.find(function (b) { return b.id === state.gcActiveBrandId; }) || state.gcBrands[0];
    state.gcActiveBrandId = curBrand.id;
    var sc = getActiveScript(state, curBrand), cTab = state.gcContentTab || "brand";

    var navHtml = '<div class="panel-head"><div class="chip-row">' +
      [{ id: "brand", l: "① 브랜드 등록 (" + state.gcBrands.length + "/10)" }, { id: "script", l: "② 기획 생성 (4단 대본)" }, { id: "shoot", l: "③ 촬영가이드 (PDF)" }, { id: "meta", l: "④ 메타광고 가이드북" }].map(function (t) {
        return '<button type="button" class="chip-btn ' + (cTab === t.id ? "active" : "") + '" data-gc-act="content-tab" data-val="' + t.id + '">' + t.l + '</button>';
      }).join("") + '</div><select id="gc-brand-sel">' + state.gcBrands.map(function (b) { return '<option value="' + b.id + '" ' + (b.id === curBrand.id ? "selected" : "") + '>' + b.name + '</option>'; }).join("") + '</select></div>';

    if (cTab === "brand") {
      return navHtml + '<div class="studio-workspace"><div style="display:grid;gap:8px">' +
        state.gcBrands.map(function (b) {
          return '<div class="step-box" style="border:2px solid ' + (b.id === curBrand.id ? "#2563EB" : "#E2E8F0") + '">' +
            '<div style="display:flex;justify-content:space-between"><strong>' + b.name + '</strong><span class="badge-accent">' + (b.biz || "gosutem").toUpperCase() + '</span></div>' +
            '<small>' + b.product + '<br><b>' + b.strength + '</b></small>' +
            '<div class="btn-row"><button type="button" class="btn-pri" data-gc-act="pick-brand-go-script" data-val="' + b.id + '">기획 생성 →</button>' +
            '<button type="button" class="btn-sec" data-gc-act="send-to-copywriter" data-val="' + b.id + '">✍️ 카피</button>' +
            '<button type="button" class="btn-sec" data-gc-act="send-to-video" data-val="' + b.id + '">🎬 9:16 릴스</button></div></div>';
        }).join("") + '</div>' +
        '<div class="panel-card" style="margin-bottom:0"><h2>+ 새 브랜드 등록 (공통 DB)</h2>' +
        '<label class="field-label">브랜드명<input type="text" id="gc-new-b-name" /></label>' +
        '<label class="field-label">업종<input type="text" id="gc-new-b-cat" value="IT/커머스 큐레이션" /></label>' +
        '<label class="field-label">제품·강점<textarea id="gc-new-b-prod" rows="2">첫 달 사지 마 3종 제외 + 고수 5명 교차 판정</textarea></label>' +
        '<div class="btn-row"><button type="button" class="btn-pri" data-gc-act="add-brand">+ 등록</button></div></div></div>';
    }

    if (cTab === "script") {
      return navHtml + '<div class="panel-card" style="margin-bottom:0"><div class="panel-head"><h2>' + sc.title + '</h2>' +
        '<div class="btn-row" style="margin-top:0"><button type="button" class="btn-sec" data-gc-act="copy-script">복사</button>' +
        '<button type="button" class="btn-sec cs-btn-green" data-gc-act="send-to-video" data-val="' + curBrand.id + '">🎬 로보엠디 9:16 전송 ↗</button>' +
        '<button type="button" class="btn-pri" data-gc-act="content-tab" data-val="shoot">③ 촬영가이드 →</button></div></div>' +
        '<div class="step-box" style="margin-bottom:8px">' + sc.fullScript + '</div>' +
        '<div style="display:flex;gap:8px;margin-bottom:8px"><input type="text" id="gc-prompt-edit-in" placeholder="말로 고치기 — 예: 1번 컷 자막 더 짧게" style="flex:1" /><button type="button" class="btn-pri" data-gc-act="apply-prompt-edit">✨ 고치기</button></div>' +
        '<div class="table-wrap"><table><thead><tr><th>컷</th><th>블록</th><th>유형</th><th>장면</th><th>자막</th><th>의도</th></tr></thead><tbody>' +
        sc.cuts.map(function (c) { return '<tr><td class="num"><b>' + c.no + '</b></td><td>' + c.block + '</td><td>' + c.type + '</td><td>' + c.scene + '</td><td><b>' + c.sub + '</b></td><td>' + c.intent + '</td></tr>'; }).join("") + '</tbody></table></div></div>';
    }

    if (cTab === "shoot") {
      return navHtml + '<div class="panel-card" style="margin-bottom:0"><div class="panel-head"><h2>🎬 컷별 촬영가이드 — ' + curBrand.name + '</h2>' +
        '<div class="btn-row" style="margin-top:0"><button type="button" class="btn-sec" data-gc-act="copy-shoot-guide">복사</button>' +
        '<button type="button" class="btn-pri cs-btn-green" data-gc-act="export-shoot-pdf">🖨️ 촬영가이드 PDF 인쇄/저장</button></div></div>' +
        '<div class="form-grid">' +
        sc.cuts.map(function (c) {
          return '<div class="step-box"><span>🎬 CUT ' + c.no + ' · ' + c.block + '</span><strong>"' + c.sub + '"</strong><small>📍 ' + c.loc + ' / 🎥 ' + c.scene + '</small></div>';
        }).join("") + '</div></div>';
    }

    return navHtml + '<div class="studio-workspace"><div class="panel-card" style="margin-bottom:0"><h2>📘 메타 광고 가이드북 & A/B 세트</h2>' +
      (sc.metaAds || []).map(function (ad, idx) {
        return '<div class="step-box" style="margin-top:8px"><div style="display:flex;justify-content:space-between"><strong>' + ad.set + '</strong><button type="button" class="btn-sm" data-gc-act="copy-meta-ad" data-idx="' + idx + '">복사</button></div>' +
          '<b>' + ad.headline + '</b><p>' + ad.primaryText + '</p><small>🔗 ' + curBrand.utmShort + ' · [' + ad.cta + ']</small></div>';
      }).join("") + '</div>' +
      '<div class="panel-card" style="margin-bottom:0"><h2>메타 광고 체크리스트</h2>' +
      '<div class="step-box" style="margin-top:8px"><span>STEP 1</span><strong>인물 0% 실물 장비 탑뷰 정물 + 사지 마 스탬프</strong></div>' +
      '<div class="step-box" style="margin-top:6px"><span>STEP 2</span><strong>단일 UTM(/l/...) 연결로 H1~H3 자동 집계 & B-02 이탈 보정</strong></div></div></div>';
  }

  function exportShootingGuidePdf(curBrand, sc, toast) {
    return window.GOSU_STUDIO_ENGINE.exportShootingGuidePdf(curBrand, sc, toast);
  }

  function render(state, H) {
    var mount = document.getElementById("hf-guide-content-mount");
    if (!mount) return;
    ensureGuideState(state);
    mount.innerHTML =
      '<div class="panel-head"><h2>🧭 핸디핏 5단계 시작 가이드 & 4탭 콘텐츠 기획·촬영가이드</h2><div class="cs-seg">' +
      '<button type="button" class="' + (state.gcMode === "guide" ? "active" : "") + '" data-gc-act="set-mode" data-val="guide">① 시작 가이드 (5단계)</button>' +
      '<button type="button" class="' + (state.gcMode === "content" ? "active" : "") + '" data-gc-act="set-mode" data-val="content">⑤ 콘텐츠 기획 4탭 · 촬영가이드 PDF</button></div></div>' +
      (state.gcMode === "guide" ? renderStartGuide(state) : renderContent4Tabs(state));
    var bSel = document.getElementById("gc-brand-sel");
    if (bSel) bSel.onchange = function (e) { state.gcActiveBrandId = e.target.value; render(state, H); };
  }

  function handleClick(t, state, R, H, E, setMenu, copyText, toast) {
    var btn = t.closest("[data-gc-act]");
    if (!btn) return false;
    ensureGuideState(state);
    var act = btn.getAttribute("data-gc-act"), val = btn.getAttribute("data-val"), GS = window.GOSU_GUIDE_SEED || { guideSteps: [] };
    var curBrand = state.gcBrands.find(function (b) { return b.id === state.gcActiveBrandId; }) || state.gcBrands[0], sc = getActiveScript(state, curBrand);

    if (act === "set-mode") state.gcMode = val;
    else if (act === "pick-guide-grp") { state.gcGuideGroupIdx = Number(btn.getAttribute("data-idx")); state.gcGuideItemIdx = 0; }
    else if (act === "pick-guide-item") state.gcGuideItemIdx = Number(btn.getAttribute("data-idx"));
    else if (act === "guide-prev") {
      if (state.gcGuideItemIdx > 0) state.gcGuideItemIdx--;
      else if (state.gcGuideGroupIdx > 0) { state.gcGuideGroupIdx--; state.gcGuideItemIdx = GS.guideSteps[state.gcGuideGroupIdx].items.length - 1; }
    } else if (act === "guide-next") {
      var grp = GS.guideSteps[state.gcGuideGroupIdx];
      if (state.gcGuideItemIdx < grp.items.length - 1) state.gcGuideItemIdx++;
      else if (state.gcGuideGroupIdx < GS.guideSteps.length - 1) { state.gcGuideGroupIdx++; state.gcGuideItemIdx = 0; }
    } else if (act === "jump-target") {
      var tm = btn.getAttribute("data-menu"), ts = Number(btn.getAttribute("data-step") || 1);
      if (tm === "guide") { state.gcMode = "content"; state.gcContentTab = "brand"; render(state, H); return true; }
      if (tm === "landing" && state.hfEd) state.hfEd.step = ts;
      if (setMenu) setMenu(tm);
      return true;
    } else if (act === "content-tab") state.gcContentTab = val;
    else if (act === "pick-brand-go-script") { state.gcActiveBrandId = val; state.gcContentTab = "script"; }
    else if (act === "add-brand") {
      var bName = ((document.getElementById("gc-new-b-name") || {}).value || "").trim() || "신규 브랜드";
      var nb = { id: "BRD-" + Date.now().toString(36).toUpperCase().slice(-4), biz: state.bizUnit === "all" ? "gosutem" : state.bizUnit, name: bName, category: (document.getElementById("gc-new-b-cat") || {}).value || "신사업", product: E.inspectText((document.getElementById("gc-new-b-prod") || {}).value || "").purified, target: "2030 입문자", strength: "건당 3.1만 절감", tone: "단문 논증체", forbidden: "무조건, 필수품", utmShort: "https://www.handyfit.kr/l/29c83874", videoTplId: "VID-01", personaId: "PER-01", pinId: "PIN-01" };
      state.gcBrands.unshift(nb); state.gcActiveBrandId = nb.id; saveBrands(state.gcBrands); toast("브랜드 등록 완료");
    } else if (act === "apply-prompt-edit") {
      var cleanTxt = E.inspectText(((document.getElementById("gc-prompt-edit-in") || {}).value || "").trim() || "1번 컷 자막 압축").purified;
      if (sc.cuts[0]) sc.cuts[0].sub = cleanTxt;
      sc.fullScript = E.inspectText("[" + cleanTxt + "] " + sc.fullScript).purified; toast("말로 고치기 완료");
    } else if (act === "send-to-video") {
      var bVid = state.gcBrands.find(function (b) { return b.id === val; }) || curBrand;
      state.selectedVidId = bVid.videoTplId || "VID-01"; state.vidCutIdx = 0;
      if (setMenu) setMenu("studio", "video");
      toast("로보엠디 9:16 릴스 캔버스 전송 완료!"); return true;
    } else if (act === "send-to-copywriter") {
      var bCp = state.gcBrands.find(function (b) { return b.id === val; }) || curBrand;
      state.selectedPersonaId = bCp.personaId || "PER-01"; state.selectedPinId = bCp.pinId || "PIN-01"; state.customCopyText = getActiveScript(state, bCp).fullScript;
      if (setMenu) setMenu("copy");
      toast("AI 카피라이터 전송 완료!"); return true;
    } else if (act === "copy-script") { copyText(sc.fullScript, "숏폼 대본"); return true; }
    else if (act === "copy-shoot-guide") { copyText(sc.cuts.map(function (c) { return "CUT " + c.no + " " + c.sub; }).join("\n"), "촬영가이드"); return true; }
    else if (act === "export-shoot-pdf") { exportShootingGuidePdf(curBrand, sc, toast); return true; }
    else if (act === "copy-meta-ad") {
      var ad = (sc.metaAds || [])[Number(btn.getAttribute("data-idx"))] || (sc.metaAds || [])[0];
      if (ad) copyText(ad.headline + "\n" + ad.primaryText + "\n👉 " + curBrand.utmShort, ad.set);
      return true;
    }
    render(state, H); return true;
  }

  return { ensureGuideState: ensureGuideState, render: render, handleClick: handleClick, exportShootingGuidePdf: exportShootingGuidePdf };
})();