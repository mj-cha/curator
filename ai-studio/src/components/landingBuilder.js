/* 핸디핏 4단계 시각 랜딩 빌더 · 3단 에디터 컨트롤러 (src/components/landingBuilder.js · 15KB 이하) */
window.GOSU_LANDING_BUILDER = window.GOSU_HANDYFIT_EDITOR = (function () {
  var LS_KEY = "gosu-handyfit-editor-v25";

  function ensureEditorState(state, H) {
    var S = window.GOSU_HF_SEED;
    if (!state.hfEd) {
      var saved = null;
      try { saved = JSON.parse(localStorage.getItem(LS_KEY) || "null"); } catch (e) { /* 무시 */ }
      var p = H.landingPresets10.find(function (l) { return l.id === state.selectedLandingId; }) || H.landingPresets10[0];
      state.hfEd = (saved && saved.presetId === p.id && saved.sections && saved.sections[0] && saved.sections[0].cards) ? saved : {
        presetId: p.id, title: "고수템 " + p.id.replace("LND-", "") + "_" + p.name.replace(/^방향\s*\d+\.\s*/, ""),
        step: 2, viewport: "desktop", activeSecId: "sec-pain", showFloatingBar: false, showImgPicker: false,
        showLayoutPopover: true, showAiRewriteDrawer: false, aiRewriteDir: "scene", aiCustomPrompt: "", aiQuota: 10, aiDoneBadge: true,
        sections: S.createSections(p)
      };
    }
    if (!state.hfHistory) state.hfHistory = { undo: [], redo: [] };
    return state.hfEd;
  }

  function pushHistory(state, ed) {
    if (!state.hfHistory) state.hfHistory = { undo: [], redo: [] };
    state.hfHistory.undo.push(JSON.stringify(ed.sections));
    if (state.hfHistory.undo.length > 20) state.hfHistory.undo.shift();
    state.hfHistory.redo = [];
  }

  function saveEditorState(ed) {
    try { localStorage.setItem(LS_KEY, JSON.stringify(ed)); } catch (e) { /* 무시 */ }
  }

  function render(state, H, copyText, toast) {
    var mount = document.getElementById("hf-editor-mount");
    if (!mount) return;
    var FB = window.GOSU_FORM_BUILDER, SH = window.GOSU_LANDING_SHAPES, ed = ensureEditorState(state, H);
    if (FB) FB.ensureData(state, H);
    var body = (ed.step === 1 && FB) ? FB.renderStep1Idea(state, H, ed) : (ed.step === 3 && FB) ? FB.renderStep3Form(state, H) : (ed.step === 4 && FB) ? FB.renderStep4Publish(state, H, ed) : SH.renderStep2VisualCanvas(state, H, ed);

    mount.innerHTML = (FB ? FB.renderSiteBar(state, H) : '') +
      '<div class="hf-top-header"><div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap">' +
      '<input type="text" id="hf-page-title-in" class="hf-title-input" value="' + ed.title.replace(/"/g, "&quot;") + '" />' +
      '<select id="hf-preset-sel" class="hf-preset-select">' + H.landingPresets10.map(function (p) { return '<option value="' + p.id + '" ' + (p.id === ed.presetId ? "selected" : "") + '>[' + p.id + '] ' + p.name + '</option>'; }).join("") + '</select></div>' +
      '<div class="hf-stepper">' + [{ n: 1, l: "아이디어 정리" }, { n: 2, l: "페이지 만들기" }, { n: 3, l: "폼 연결" }, { n: 4, l: "게시" }].map(function (st) {
        var done = st.n < ed.step, cur = st.n === ed.step;
        return '<button type="button" class="hf-step-item ' + (cur ? "current" : "") + '" data-hf-act="set-step" data-val="' + st.n + '"><span class="hf-step-dot ' + (done || cur ? "done" : "") + '">' + (done ? "✓" : st.n) + '</span><span>' + st.l + '</span></button>';
      }).join('<span class="hf-step-line"></span>') + '</div></div>' + body;

    bindInlineEvents(mount, state, H, copyText, toast);
  }

  function bindInlineEvents(mount, state, H, copyText, toast) {
    var S = window.GOSU_HF_SEED, ed = state.hfEd, activeSec = ed.sections.find(function (s) { return s.id === ed.activeSecId; }) || ed.sections[0];
    var editables = mount.querySelectorAll("[data-hf-edit]");
    for (var i = 0; i < editables.length; i++) {
      editables[i].onfocus = function () { ed.showFloatingBar = true; };
      editables[i].oninput = function (e) {
        var sec = ed.sections.find(function (s) { return s.id === e.target.getAttribute("data-sec-id"); });
        if (sec) { sec[e.target.getAttribute("data-hf-edit")] = e.target.innerText.trim(); saveEditorState(ed); }
      };
    }
    ["t", "d"].forEach(function (k) {
      var attr = "data-hf-card-" + k, els = mount.querySelectorAll("[" + attr + "]");
      for (var c = 0; c < els.length; c++) {
        els[c].oninput = function (e) {
          var sec = ed.sections.find(function (s) { return s.id === e.target.getAttribute("data-sec-id"); }), ci = Number(e.target.getAttribute(attr));
          if (sec && sec.cards && sec.cards[ci]) { sec.cards[ci][k] = e.target.innerText.trim(); saveEditorState(ed); }
        };
      }
    });
    var onEl = function (id, ev, fn) { var el = document.getElementById(id); if (el) el[ev] = fn; };
    onEl("hf-page-title-in", "oninput", function (e) { ed.title = e.target.value; saveEditorState(ed); });
    onEl("hf-preset-sel", "onchange", function (e) {
      pushHistory(state, ed); state.selectedLandingId = e.target.value;
      var p = H.landingPresets10.find(function (l) { return l.id === state.selectedLandingId; }) || H.landingPresets10[0];
      ed.presetId = p.id; ed.title = "고수템 " + p.id.replace("LND-", "") + "_" + p.name.replace(/^방향\s*\d+\.\s*/, "");
      ed.sections = S.createSections(p); ed.activeSecId = "sec-pain"; saveEditorState(ed); render(state, H, copyText, toast);
    });
    onEl("hf-pady-range", "oninput", function (e) { activeSec.padY = Number(e.target.value); saveEditorState(ed); render(state, H, copyText, toast); });
    onEl("hf-custom-bg-color", "oninput", function (e) { activeSec.bg = e.target.value; activeSec.fg = "#FFFFFF"; activeSec.headColor = "#FFFFFF"; saveEditorState(ed); render(state, H, copyText, toast); });
    onEl("hf-ai-custom-dir", "oninput", function (e) { ed.aiCustomPrompt = e.target.value; saveEditorState(ed); });
    onEl("fb-form-sel", "onchange", function (e) { state.hfActiveFormId = e.target.value; render(state, H, copyText, toast); });

    var dragSrcIdx = null, orderItems = mount.querySelectorAll("[data-hf-drag-idx]");
    for (var j = 0; j < orderItems.length; j++) {
      orderItems[j].ondragstart = function (e) { dragSrcIdx = Number(e.currentTarget.getAttribute("data-hf-drag-idx")); };
      orderItems[j].ondragover = function (e) { e.preventDefault(); };
      orderItems[j].ondrop = function (e) {
        e.preventDefault(); var dropIdx = Number(e.currentTarget.getAttribute("data-hf-drag-idx"));
        if (dragSrcIdx !== null && dragSrcIdx !== dropIdx) {
          pushHistory(state, ed); var moved = ed.sections.splice(dragSrcIdx, 1)[0]; ed.sections.splice(dropIdx, 0, moved);
          saveEditorState(ed); render(state, H, copyText, toast); toast("섹션 순서 변경 완료");
        }
      };
    }
  }

  function handleClick(t, state, H, copyText, toast) {
    var S = window.GOSU_HF_SEED, E = window.GOSU_STUDIO_ENGINE, SH = window.GOSU_LANDING_SHAPES, ed = ensureEditorState(state, H);
    var activeSec = ed.sections.find(function (s) { return s.id === ed.activeSecId; }) || ed.sections[0];
    if (window.GOSU_ERP_DB && window.GOSU_ERP_DB.handleAction(t, state, H, copyText, toast, function () { saveEditorState(ed); render(state, H, copyText, toast); })) return true;

    var pickSec = t.closest("[data-hf-pick-sec]");
    if (pickSec && !t.closest("[data-hf-act]")) {
      var nextId = pickSec.getAttribute("data-hf-pick-sec");
      if (ed.activeSecId !== nextId) { ed.activeSecId = nextId; ed.showFloatingBar = true; saveEditorState(ed); render(state, H, copyText, toast); }
      return true;
    }
    var actBtn = t.closest("[data-hf-act]");
    if (!actBtn) return false;
    var act = actBtn.getAttribute("data-hf-act"), val = actBtn.getAttribute("data-val");

    if (act === "viewport") ed.viewport = val;
    else if (act === "set-step") { ed.step = Number(val); toast(val + "단계 전환 완료"); }
    else if (act === "undo" && state.hfHistory && state.hfHistory.undo.length) {
      state.hfHistory.redo.push(JSON.stringify(ed.sections)); ed.sections = JSON.parse(state.hfHistory.undo.pop()); toast("↺ 되돌리기");
    } else if (act === "redo" && state.hfHistory && state.hfHistory.redo.length) {
      state.hfHistory.undo.push(JSON.stringify(ed.sections)); ed.sections = JSON.parse(state.hfHistory.redo.pop()); toast("↻ 다시실행");
    } else if (act === "toggle-layout-popover") ed.showLayoutPopover = !ed.showLayoutPopover;
    else if (act === "pick-layout") {
      pushHistory(state, ed); activeSec.layout = val;
      if (!activeSec.cards || !activeSec.cards.length) activeSec.cards = [{ t: "핵심 기준 01", d: "현직 강사 5인 교차 검증" }, { t: "핵심 기준 02", d: "실내 조도·소재 실측" }, { t: "절감 효과 03", d: "건당 31,000원 절약" }];
      if (val === "사진 슬라이드" && activeSec.imgType === "none") activeSec.imgType = "main";
      toast("배치 [" + val + "] 적용");
    } else if (act === "slide-shape") { pushHistory(state, ed); activeSec.slideShape = val; }
    else if (act === "slide-auto") { pushHistory(state, ed); activeSec.slideAuto = val; }
    else if (act === "title-pos") { pushHistory(state, ed); activeSec.titlePos = val; }
    else if (act === "top-nav-toggle") { pushHistory(state, ed); activeSec.inTopNav = (val === "on"); }
    else if (act === "toggle-ai-drawer") { ed.showAiRewriteDrawer = !ed.showAiRewriteDrawer; ed.showLayoutPopover = false; }
    else if (act === "pick-ai-dir") ed.aiRewriteDir = val;
    else if (act === "run-ai-rewrite") {
      pushHistory(state, ed);
      var dObj = (S.AI_DIRECTIONS || []).find(function (d) { return d.id === ed.aiRewriteDir; }) || S.AI_DIRECTIONS[0];
      activeSec.headline = E ? E.inspectText((ed.aiCustomPrompt || "").trim() || dObj.sampleHead).purified : dObj.sampleHead;
      activeSec.desc = E ? E.inspectText(dObj.sampleDesc).purified : dObj.sampleDesc;
      activeSec.layout = dObj.layout; ed.aiQuota = Math.max(0, (ed.aiQuota || 10) - 1);
      ed.aiDoneBadge = true; ed.showAiRewriteDrawer = false; toast("✓ AI 다시 쓰기 완료");
    } else if (act === "close-ai-toast") ed.aiDoneBadge = false;
    else if (act === "add-badge") { pushHistory(state, ed); activeSec.badge = activeSec.badge || "NEW · 핵심 포인트"; }
    else if (act === "add-cta") { pushHistory(state, ed); activeSec.cta = activeSec.cta ? "" : "무료 체크리스트 받기"; }
    else if (act === "add-card-col") {
      pushHistory(state, ed); if (!Array.isArray(activeSec.cards)) activeSec.cards = [];
      activeSec.cards.push({ t: "추가 항목 " + (activeSec.cards.length + 1), d: "클릭하여 수정" }); toast("+ 칸 추가 완료");
    } else if (act === "clone-sec") {
      pushHistory(state, ed); var cIdx = Number(actBtn.getAttribute("data-idx")), cp = JSON.parse(JSON.stringify(ed.sections[cIdx] || activeSec));
      cp.id = "sec-" + Date.now().toString(36); cp.name += " (복제)"; ed.sections.splice(cIdx + 1, 0, cp); ed.activeSecId = cp.id;
    } else if (act === "del-sec" && ed.sections.length > 1) {
      pushHistory(state, ed); ed.sections.splice(Number(actBtn.getAttribute("data-idx")), 1); ed.activeSecId = ed.sections[0].id;
    } else if (act === "add-new-section") {
      pushHistory(state, ed);
      var ns = { id: "sec-" + Date.now().toString(36), name: "새 섹션 " + (ed.sections.length + 1), layout: "카드 3열", titlePos: "위", imgPos: "right", imgRatio: "기본", slideShape: "한 장씩", slideAuto: "3초", padY: 36, bg: "#FFFFFF", fg: "#141413", headSize: "보통", headColor: "#0C3C78", headBold: true, showDesc: true, inTopNav: false, enabled: true, badge: "NEW", headline: "새로 추가된 섹션 제목", desc: "우측 설정에서 배치 모양을 바꿀 수 있습니다.", cta: "", imgType: "none", cards: [{ t: "항목 01", d: "설명" }, { t: "항목 02", d: "설명" }, { t: "항목 03", d: "설명" }] };
      ed.sections.push(ns); ed.activeSecId = ns.id;
    } else if (act === "toggle-img-picker") ed.showImgPicker = !ed.showImgPicker;
    else if (act === "pick-flatlay-img") { pushHistory(state, ed); activeSec.imgType = val; ed.showImgPicker = false; }
    else if (act === "toggle-sec-vis") { pushHistory(state, ed); var tg = ed.sections.find(function (s) { return s.id === val; }) || activeSec; tg.enabled = tg.enabled === false ? true : false; }
    else if (act === "toggle-bold") { pushHistory(state, ed); activeSec.headBold = !activeSec.headBold; }
    else if (act === "head-color") { pushHistory(state, ed); activeSec.headColor = val; }
    else if (act === "head-size") { pushHistory(state, ed); activeSec.headSize = val; }
    else if (act === "toggle-desc") { pushHistory(state, ed); activeSec.showDesc = !activeSec.showDesc; }
    else if (act === "hide-float") ed.showFloatingBar = false;
    else if (act === "img-pos") { pushHistory(state, ed); activeSec.imgPos = val; if (activeSec.imgType === "none") activeSec.imgType = "main"; }
    else if (act === "img-toggle") { pushHistory(state, ed); activeSec.imgType = activeSec.imgType === "none" ? "main" : "none"; }
    else if (act === "img-ratio") { pushHistory(state, ed); activeSec.imgRatio = val; }
    else if (act === "pad-y") { pushHistory(state, ed); activeSec.padY = Number(val); }
    else if (act === "sec-bg") { pushHistory(state, ed); activeSec.bg = actBtn.getAttribute("data-bg"); activeSec.fg = actBtn.getAttribute("data-fg"); activeSec.headColor = activeSec.fg; }
    else if (act === "move-sec") {
      pushHistory(state, ed); var idx = Number(actBtn.getAttribute("data-idx")), to = idx + Number(actBtn.getAttribute("data-dir"));
      if (to >= 0 && to < ed.sections.length) { var it = ed.sections.splice(idx, 1)[0]; ed.sections.splice(to, 0, it); }
    } else if (act === "export-html") { SH.exportStandaloneHtml(state, ed, toast); return true; }

    saveEditorState(ed); render(state, H, copyText, toast); return true;
  }

  return { render: render, handleClick: handleClick };
})();