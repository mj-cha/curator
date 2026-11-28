/* 로보엠디 × 핸디핏 통합 AI 솔루션 인앱 스튜디오 메인 컨트롤러 (src/screens/studioApp.js · 15KB 이하 분리) */
(function () {
  var R = window.GOSU_ROBOMD_DATA;
  var H = window.GOSU_HANDYFIT_DATA;
  var E = window.GOSU_STUDIO_ENGINE;
  var C = window.GOSU_CANVAS_RENDERER;
  var V = window.GOSU_STUDIO_VIEWS;

  var state = {
    menu: "studio",
    studioTab: "image",
    imgFilter: "all",
    selectedImgId: "IMG-01",
    imgAngle: "탑뷰(Flat-lay)",
    imgRatio: "4:5",
    imgStyle: "실사 정물 Flat-lay",
    imgRefCount: 1,
    imgWebSearch: true,
    selectedVidId: "VID-01",
    vidCutIdx: 0,
    vidDuration: 15,
    vidSafeZone: true,
    selectedTplId: "TPL-01",
    tplTheme: "dark-lime",
    selectedLandingId: "LND-01",
    selectedPersonaId: "PER-01",
    selectedPinId: "PIN-01",
    customCopyText: "",
    selectedQrUtmId: "UTM-01"
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
      navigator.clipboard.writeText(txt).then(function () { toast((label || "내용") + "을 복사했어요."); });
    } else {
      var ta = document.createElement("textarea");
      ta.value = txt;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      toast((label || "내용") + "을 복사했어요.");
    }
  }

  function downloadCanvas(canvasId, filename) {
    var cv = $(canvasId);
    if (!cv) return;
    var a = document.createElement("a");
    a.href = cv.toDataURL("image/png");
    a.download = filename;
    a.click();
    toast(filename + " 고해상도 PNG 파일을 내려받았어요.");
  }

  function renderStudioPanel() {
    var tabBtns = document.querySelectorAll("[data-studio-tab]");
    for (var i = 0; i < tabBtns.length; i++) {
      var tb = tabBtns[i];
      tb.classList.toggle("active", tb.getAttribute("data-studio-tab") === state.studioTab);
    }
    var subPanels = document.querySelectorAll("[data-studio-view]");
    for (var j = 0; j < subPanels.length; j++) {
      var sp = subPanels[j];
      sp.hidden = sp.getAttribute("data-studio-view") !== state.studioTab;
    }
    if (state.studioTab === "image") V.renderImageStudio(state, R, E, C);
    else if (state.studioTab === "video") V.renderVideoStudio(state, R, C);
    else if (state.studioTab === "design") V.renderDesignStudio(state, R, C);
  }

  function renderActivePanel() {
    if (state.menu === "studio") renderStudioPanel();
    else if (state.menu === "landing") V.renderLandingPanel(state, H, copyText);
    else if (state.menu === "copy") V.renderCopyPanel(state, H, E);
    else if (state.menu === "utm") V.renderUtmPanel(state, H, E);
    else if (state.menu === "report") V.renderReportPanel(H, E);
  }

  function setMenu(m, subTab) {
    state.menu = m;
    if (subTab) state.studioTab = subTab;
    var navBtns = document.querySelectorAll("[data-menu-btn]");
    for (var i = 0; i < navBtns.length; i++) {
      var b = navBtns[i];
      b.classList.toggle("active", b.getAttribute("data-menu-btn") === m);
    }
    var panels = document.querySelectorAll("[data-menu-panel]");
    for (var j = 0; j < panels.length; j++) {
      var p = panels[j];
      p.hidden = p.getAttribute("data-menu-panel") !== m;
    }
    renderActivePanel();
  }

  function bindEvents() {
    document.addEventListener("click", function (e) {
      var t = e.target;
      var menuBtn = t.closest("[data-menu-btn]");
      if (menuBtn) { setMenu(menuBtn.getAttribute("data-menu-btn"), menuBtn.getAttribute("data-sub-tab")); return; }

      var stTab = t.closest("[data-studio-tab]");
      if (stTab) { setMenu("studio", stTab.getAttribute("data-studio-tab")); return; }

      var imgFilterBtn = t.closest("[data-img-filter]");
      if (imgFilterBtn) {
        state.imgFilter = imgFilterBtn.getAttribute("data-img-filter");
        var fBtns = document.querySelectorAll("[data-img-filter]");
        for (var i = 0; i < fBtns.length; i++) fBtns[i].classList.toggle("active", fBtns[i] === imgFilterBtn);
        V.renderImageStudio(state, R, E, C);
        return;
      }

      var pickImg = t.closest("[data-pick-img]");
      if (pickImg) {
        state.selectedImgId = pickImg.getAttribute("data-pick-img");
        var chainIn = $("img-chain-input");
        if (chainIn) chainIn.value = "";
        V.renderImageStudio(state, R, E, C);
        return;
      }

      var pickVid = t.closest("[data-pick-vid]");
      if (pickVid) {
        state.selectedVidId = pickVid.getAttribute("data-pick-vid");
        state.vidCutIdx = 0;
        V.renderVideoStudio(state, R, C);
        return;
      }

      var pickCut = t.closest("[data-pick-cut]");
      if (pickCut) {
        state.vidCutIdx = Number(pickCut.getAttribute("data-pick-cut")) || 0;
        V.renderVideoStudio(state, R, C);
        return;
      }

      var pickDesign = t.closest("[data-pick-design]");
      if (pickDesign) {
        state.selectedTplId = pickDesign.getAttribute("data-pick-design");
        V.renderDesignStudio(state, R, C);
        return;
      }

      var pickLanding = t.closest("[data-pick-landing]");
      if (pickLanding) {
        state.selectedLandingId = pickLanding.getAttribute("data-pick-landing");
        V.renderLandingPanel(state, H, copyText);
        return;
      }

      var copyUtm = t.closest("[data-copy-utm]");
      if (copyUtm) { copyText(copyUtm.getAttribute("data-copy-utm"), "UTM 단축링크"); return; }

      var qrUtm = t.closest("[data-qr-utm]");
      if (qrUtm) { state.selectedQrUtmId = qrUtm.getAttribute("data-qr-utm"); V.renderUtmPanel(state, H, E); return; }
    });

    var bindChange = function (id, fn) { var el = $(id); if (el) el.addEventListener("input", fn); };
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
    onBtn("btn-dl-image", function () { downloadCanvas("cv-image-studio", "gosutem-ai-image-" + state.selectedImgId + "_v1.png"); });
    onBtn("btn-copy-img-prompt", function () { copyText($("img-prompt-output").value, "AI 이미지 프롬프트"); });
    onBtn("btn-dl-video-frame", function () { downloadCanvas("cv-video-studio", "gosutem-reels-" + state.selectedVidId + "-cut" + (state.vidCutIdx + 1) + "_v1.png"); });
    onBtn("btn-dl-design", function () { downloadCanvas("cv-design-studio", "gosutem-template-" + state.selectedTplId + "_v1.png"); });
    onBtn("btn-copy-clean-text", function () { copyText($("copy-result-box").value, "검수 통과 원고"); });
    onBtn("btn-add-utm", function () {
      var ch = $("utm-new-ch").value;
      var camp = $("utm-new-camp").value || "2611_swim_ab_02";
      var entry = E.createUtmEntry(ch, ch, "social", camp, "swim");
      H.utmLinks.unshift(entry);
      state.selectedQrUtmId = entry.id;
      V.renderUtmPanel(state, H, E);
      toast("새 UTM 단축링크와 QR 코드를 발급했어요.");
    });
    onBtn("btn-copy-bp-report", function () { copyText($("report-bp-summary").value, "사업계획서용 AI 시장검증 요약"); });
  }

  window.addEventListener("DOMContentLoaded", function () {
    bindEvents();
    setMenu("studio", "image");
  });
})();
