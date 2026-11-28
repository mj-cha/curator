/* 고수하우스 전사 AI 솔루션 ERP 스튜디오 컨트롤러 (src/screens/studioApp.js · 15KB 이하) */
(function () {
  var R = window.GOSU_ROBOMD_DATA;
  var H = window.GOSU_HANDYFIT_DATA;
  var E = window.GOSU_STUDIO_ENGINE;
  var C = window.GOSU_CANVAS_RENDERER;
  var V = window.GOSU_STUDIO_VIEWS;
  var CS = window.GOSU_CS_HUB;

  var state = {
    bizUnit: "all", menu: "cshub", studioTab: "image",
    csItems: CS ? CS.loadCatalog() : [], csFolder: "ppt_all", csViewMode: "card", csTag: "", csQuery: "",
    csSelectedId: "baze-ppt-001", csTreeOpen: true, csLeftWidthPct: 45, csCardMinPx: 175, csSlideRatio: "4:3", csDrawerCols: 2, csSlideIdx: 0,
    imgFilter: "all", selectedImgId: "IMG-01", imgAngle: "탑뷰(Flat-lay)", imgRatio: "4:5", imgStyle: "실사 정물 Flat-lay", imgRefCount: 1, imgWebSearch: true,
    selectedVidId: "VID-01", vidCutIdx: 0, vidDuration: 15, vidSafeZone: true,
    selectedTplId: "TPL-01", tplTheme: "dark-lime", selectedLandingId: "LND-01", selectedPersonaId: "PER-01", selectedPinId: "PIN-01", customCopyText: "", selectedQrUtmId: "UTM-01"
  };

  function $(id) { return document.getElementById(id); }

  function toast(msg) {
    var el = $("st-toast");
    if (!el) return;
    el.textContent = msg;
    el.classList.add("show");
    clearTimeout(toast._t);
    toast._t = setTimeout(function () { el.classList.remove("show"); }, 2600);
  }

  function copyText(txt, label) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(txt).then(function () { toast((label || "내용") + " 복사 완료"); });
    } else {
      var ta = document.createElement("textarea");
      ta.value = txt; document.body.appendChild(ta); ta.select(); document.execCommand("copy"); document.body.removeChild(ta);
      toast((label || "내용") + " 복사 완료");
    }
  }

  function downloadCanvas(canvasId, filename) {
    var cv = $(canvasId);
    if (!cv) return;
    var a = document.createElement("a");
    a.href = cv.toDataURL("image/png"); a.download = filename; a.click();
    toast(filename + " PNG 저장 완료");
  }

  function renderBizSwitcher() {
    var chips = document.querySelectorAll("[data-biz-unit]");
    for (var i = 0; i < chips.length; i++) chips[i].classList.toggle("active", chips[i].getAttribute("data-biz-unit") === state.bizUnit);
    var units = window.GOSU_BIZ_UNITS || [];
    var cur = units.find(function (u) { return u.id === state.bizUnit; }) || units[0];
    if ($("erp-biz-desc") && cur) $("erp-biz-desc").textContent = "현재 워크스페이스: " + cur.name + " — " + cur.desc;
  }

  function renderStudioPanel() {
    var tabBtns = document.querySelectorAll("[data-studio-tab]");
    for (var i = 0; i < tabBtns.length; i++) tabBtns[i].classList.toggle("active", tabBtns[i].getAttribute("data-studio-tab") === state.studioTab);
    var subPanels = document.querySelectorAll("[data-studio-view]");
    for (var j = 0; j < subPanels.length; j++) subPanels[j].hidden = subPanels[j].getAttribute("data-studio-view") !== state.studioTab;
    if (state.studioTab === "image") V.renderImageStudio(state, R, E, C);
    else if (state.studioTab === "video") V.renderVideoStudio(state, R, C);
    else if (state.studioTab === "design") V.renderDesignStudio(state, R, C);
  }

  function renderActivePanel() {
    renderBizSwitcher();
    if (state.menu === "home" || state.menu === "report") V.renderReportPanel(H, E);
    else if (state.menu === "cshub" && CS) CS.renderHub(state);
    else if (state.menu === "studio") renderStudioPanel();
    else if (state.menu === "landing") V.renderLandingPanel(state, H, copyText, toast);
    else if (state.menu === "copy") V.renderCopyPanel(state, H, E);
    else if (state.menu === "utm") V.renderUtmPanel(state, H, E);
  }

  function setMenu(m, subTab) {
    state.menu = m;
    if (subTab) state.studioTab = subTab;
    var navBtns = document.querySelectorAll("[data-menu-btn]");
    for (var i = 0; i < navBtns.length; i++) navBtns[i].classList.toggle("active", navBtns[i].getAttribute("data-menu-btn") === m);
    var panels = document.querySelectorAll("[data-menu-panel]");
    for (var j = 0; j < panels.length; j++) panels[j].hidden = panels[j].getAttribute("data-menu-panel") !== m;
    renderActivePanel();
  }

  function bindEvents() {
    document.addEventListener("click", function (e) {
      var t = e.target;
      var bizBtn = t.closest("[data-biz-unit]");
      if (bizBtn) {
        state.bizUnit = bizBtn.getAttribute("data-biz-unit");
        if (state.bizUnit === "cea") { state.selectedPersonaId = "PER-02"; state.selectedPinId = "PIN-02"; state.selectedTplId = "TPL-08"; }
        else if (state.bizUnit === "blog") { state.selectedPersonaId = "PER-03"; state.selectedPinId = "PIN-03"; state.selectedTplId = "TPL-06"; }
        else if (state.bizUnit === "gosutem") { state.selectedPersonaId = "PER-01"; state.selectedPinId = "PIN-01"; state.selectedTplId = "TPL-01"; }
        renderActivePanel(); toast("사업부 워크스페이스를 전환했어요."); return;
      }

      var menuBtn = t.closest("[data-menu-btn]");
      if (menuBtn) { setMenu(menuBtn.getAttribute("data-menu-btn"), menuBtn.getAttribute("data-sub-tab")); return; }
      var stTab = t.closest("[data-studio-tab]");
      if (stTab) { setMenu("studio", stTab.getAttribute("data-studio-tab")); return; }

      /* 컨텐츠 스튜디오 액션 */
      var csFolderBtn = t.closest("[data-cs-folder]");
      if (csFolderBtn) { state.csFolder = csFolderBtn.getAttribute("data-cs-folder"); state.csSlideIdx = 0; CS.renderHub(state); return; }
      if (t.closest("[data-cs-toggle-tree]")) { state.csTreeOpen = !state.csTreeOpen; CS.renderHub(state); return; }
      var csTagBtn = t.closest("[data-cs-tag]");
      if (csTagBtn) { var nt = csTagBtn.getAttribute("data-cs-tag"); state.csTag = state.csTag === nt ? "" : nt; CS.renderHub(state); return; }
      var csSplitBtn = t.closest("[data-cs-split]");
      if (csSplitBtn) { state.csLeftWidthPct = Number(csSplitBtn.getAttribute("data-cs-split")); CS.renderHub(state); return; }
      var csRatioBtn = t.closest("[data-cs-ratio]");
      if (csRatioBtn) { state.csSlideRatio = csRatioBtn.getAttribute("data-cs-ratio"); CS.renderHub(state); return; }
      var csColsBtn = t.closest("[data-cs-cols]");
      if (csColsBtn) { state.csDrawerCols = Number(csColsBtn.getAttribute("data-cs-cols")); CS.renderHub(state); return; }
      var csSlideCard = t.closest("[data-cs-slide-idx]");
      if (csSlideCard) { state.csSlideIdx = Number(csSlideCard.getAttribute("data-cs-slide-idx")); CS.renderHub(state); return; }
      var csSlideNav = t.closest("[data-cs-slide-nav]");
      if (csSlideNav) {
        var dir = Number(csSlideNav.getAttribute("data-cs-slide-nav"));
        var curIt = state.csItems.find(function (x) { return x.id === state.csSelectedId; });
        var len = (curIt && curIt.slides && curIt.slides.length) ? curIt.slides.length : 6;
        state.csSlideIdx = (state.csSlideIdx + dir + len) % len; CS.renderHub(state); return;
      }
      var csViewBtn = t.closest("[data-cs-view]");
      if (csViewBtn) { state.csViewMode = csViewBtn.getAttribute("data-cs-view"); CS.renderHub(state); return; }

      var csSend = t.closest("[data-cs-send-studio]");
      if (csSend) {
        var item = state.csItems.find(function (x) { return x.id === csSend.getAttribute("data-cs-send-studio"); });
        if (item) {
          setMenu("studio", "design");
          if ($("design-headline-in")) $("design-headline-in").value = item.title;
          if ($("design-subhead-in")) $("design-subhead-in").value = "[" + item.source.toUpperCase() + " · " + item.id + "] " + (item.note || "");
          V.renderDesignStudio(state, R, C); toast("'" + item.title + "' 템플릿을 AI 디자인 캔버스로 불러왔어요.");
        }
        return;
      }

      var csBrief = t.closest("[data-cs-copy-brief]");
      if (csBrief) {
        var bItem = state.csItems.find(function (x) { return x.id === csBrief.getAttribute("data-cs-copy-brief"); });
        if (bItem) {
          var topic = ($("cs-brief-topic") && $("cs-brief-topic").value) || "고수템 2R 발표안";
          copyText("[제작 브리프] " + topic + " | " + bItem.title + " (" + bItem.id + ") | " + (bItem.note || ""), "브리프");
        }
        return;
      }

      var csDel = t.closest("[data-cs-del]");
      if (csDel) {
        var delId = csDel.getAttribute("data-cs-del");
        state.csItems = state.csItems.filter(function (x) { return x.id !== delId; });
        CS.saveCatalog(state.csItems); CS.renderHub(state); toast(delId + " 삭제 완료"); return;
      }

      var csPick = t.closest("[data-cs-pick]");
      if (csPick && !t.closest("input")) { state.csSelectedId = csPick.getAttribute("data-cs-pick"); state.csSlideIdx = 0; CS.renderHub(state); return; }

      var imgFilterBtn = t.closest("[data-img-filter]");
      if (imgFilterBtn) {
        state.imgFilter = imgFilterBtn.getAttribute("data-img-filter");
        var fBtns = document.querySelectorAll("[data-img-filter]");
        for (var i = 0; i < fBtns.length; i++) fBtns[i].classList.toggle("active", fBtns[i] === imgFilterBtn);
        V.renderImageStudio(state, R, E, C); return;
      }
      var pickImg = t.closest("[data-pick-img]");
      if (pickImg) { state.selectedImgId = pickImg.getAttribute("data-pick-img"); if ($("img-chain-input")) $("img-chain-input").value = ""; V.renderImageStudio(state, R, E, C); return; }
      var pickVid = t.closest("[data-pick-vid]");
      if (pickVid) { state.selectedVidId = pickVid.getAttribute("data-pick-vid"); state.vidCutIdx = 0; V.renderVideoStudio(state, R, C); return; }
      var pickCut = t.closest("[data-pick-cut]");
      if (pickCut) { state.vidCutIdx = Number(pickCut.getAttribute("data-pick-cut")) || 0; V.renderVideoStudio(state, R, C); return; }
      var pickDesign = t.closest("[data-pick-design]");
      if (pickDesign) { state.selectedTplId = pickDesign.getAttribute("data-pick-design"); V.renderDesignStudio(state, R, C); return; }
      if (window.GOSU_HANDYFIT_EDITOR && window.GOSU_HANDYFIT_EDITOR.handleClick(t, state, H, copyText, toast)) return;
      var pickLanding = t.closest("[data-pick-landing]");
      if (pickLanding) { state.selectedLandingId = pickLanding.getAttribute("data-pick-landing"); V.renderLandingPanel(state, H, copyText, toast); return; }
      var copyUtm = t.closest("[data-copy-utm]");
      if (copyUtm) { copyText(copyUtm.getAttribute("data-copy-utm"), "UTM 단축링크"); return; }
      var qrUtm = t.closest("[data-qr-utm]");
      if (qrUtm) { state.selectedQrUtmId = qrUtm.getAttribute("data-qr-utm"); V.renderUtmPanel(state, H, E); return; }
    });

    document.addEventListener("change", function (e) {
      var t = e.target;
      var targetId = t.getAttribute("data-cs-edit-title") || t.getAttribute("data-cs-edit-tags") || t.getAttribute("data-cs-edit-note");
      if (targetId) {
        var found = state.csItems.find(function (x) { return x.id === targetId; });
        if (found) {
          if (t.getAttribute("data-cs-edit-title")) found.title = t.value.trim();
          if (t.getAttribute("data-cs-edit-tags")) found.tags = t.value.split(",").map(function (s) { return s.trim(); }).filter(Boolean);
          if (t.getAttribute("data-cs-edit-note")) found.note = t.value.trim();
          CS.saveCatalog(state.csItems); toast(targetId + " 항목을 저장했어요.");
        }
      }
    });

    var bindChange = function (id, fn) { var el = $(id); if (el) el.addEventListener("input", fn); };
    bindChange("cs-search-in", function (e) { state.csQuery = e.target.value; CS.renderHub(state); });
    bindChange("img-angle-sel", function (e) { state.imgAngle = e.target.value; V.renderImageStudio(state, R, E, C); });
    bindChange("img-ratio-sel", function (e) { state.imgRatio = e.target.value; V.renderImageStudio(state, R, E, C); });
    bindChange("img-style-sel", function (e) { state.imgStyle = e.target.value; V.renderImageStudio(state, R, E, C); });
    bindChange("img-chain-input", function () { V.renderImageStudio(state, R, E, C); });
    bindChange("vid-dur-sel", function (e) { state.vidDuration = Number(e.target.value); V.renderVideoStudio(state, R, C); });
    bindChange("vid-safe-chk", function (e) { state.vidSafeZone = e.target.checked; V.renderVideoStudio(state, R, C); });
    bindChange("design-theme-sel", function (e) { state.tplTheme = e.target.value; V.renderDesignStudio(state, R, C); });
    bindChange("design-headline-in", function () { V.renderDesignStudio(state, R, C); });
    bindChange("design-subhead-in", function () { V.renderDesignStudio(state, R, C); });
    bindChange("copy-persona-sel", function (e) { state.selectedPersonaId = e.target.value; V.renderCopyPanel(state, H, E); });
    bindChange("copy-pin-sel", function (e) { state.selectedPinId = e.target.value; V.renderCopyPanel(state, H, E); });
    bindChange("copy-custom-in", function (e) { state.customCopyText = e.target.value; V.renderCopyPanel(state, H, E); });

    var onBtn = function (id, fn) { var el = $(id); if (el) el.onclick = fn; };
    onBtn("btn-cs-add", function () {
      var titleEl = $("cs-new-title"), srcEl = $("cs-new-src");
      var title = (titleEl && titleEl.value.trim()) || "새 전사 템플릿", src = (srcEl && srcEl.value) || "baze";
      var isPpt = src === "baze" || src === "local_pptx";
      var newItem = { id: src.slice(0, 3) + "-" + Date.now().toString(36).slice(-4), biz: state.bizUnit === "all" ? "gosutem" : state.bizUnit, source: src, type: isPpt ? "ppt_template" : "sns_template", title: title, ratio: isPpt ? "16:9" : "4:5", slideCount: isPpt ? 12 : 5, tags: ["사업계획서", "전사공용"], note: "ERP 스튜디오 직접 등록" };
      state.csItems.unshift(newItem); state.csSelectedId = newItem.id;
      if (titleEl) titleEl.value = "";
      CS.saveCatalog(state.csItems); CS.renderHub(state); toast("'" + title + "' 추가 완료");
    });
    onBtn("btn-dl-image", function () { downloadCanvas("cv-image-studio", "gosu-erp-image-" + state.selectedImgId + "_v1.png"); });
    onBtn("btn-copy-img-prompt", function () { copyText($("img-prompt-output").value, "프롬프트"); });
    onBtn("btn-dl-video-frame", function () { downloadCanvas("cv-video-studio", "gosu-erp-reels-" + state.selectedVidId + "-cut" + (state.vidCutIdx + 1) + "_v1.png"); });
    onBtn("btn-dl-design", function () { downloadCanvas("cv-design-studio", "gosu-erp-template-" + state.selectedTplId + "_v1.png"); });
    onBtn("btn-copy-clean-text", function () { copyText($("copy-result-box").value, "원고"); });
    onBtn("btn-add-utm", function () {
      var ch = $("utm-new-ch").value, camp = $("utm-new-camp").value || "2611_erp";
      var entry = E.createUtmEntry(ch, ch, "social", camp, "swim");
      entry.biz = state.bizUnit === "all" ? "gosutem" : state.bizUnit;
      H.utmLinks.unshift(entry); state.selectedQrUtmId = entry.id;
      V.renderUtmPanel(state, H, E); toast("UTM & QR 발급 완료");
    });
    onBtn("btn-copy-bp-report", function () { copyText($("report-bp-summary").value, "AI 시장검증 요약"); });
  }

  window.addEventListener("DOMContentLoaded", function () { bindEvents(); setMenu("cshub"); });
})();
