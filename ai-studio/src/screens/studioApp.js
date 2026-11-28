/* 고수하우스 AI 업무 스튜디오 v3.0 컨트롤러 (src/screens/studioApp.js · 15KB 이하) */
(function () {
  var R = window.GOSU_ROBOMD_DATA, H = window.GOSU_HANDYFIT_DATA, E = window.GOSU_STUDIO_ENGINE;
  var C = window.GOSU_CANVAS_RENDERER, V = window.GOSU_STUDIO_VIEWS, CS = window.GOSU_CS_HUB;

  var FLOW_META = {
    landing: { t: "① 랜딩·설문 캠페인 (1→4단계 위저드)", d: "1단계(초안 선택) → 2단계(화면 클릭 수정) → 3단계(설문 폼 연결) → 4단계(게시 & 주소·QR 받기) 순서대로 진행하세요." },
    studio: { t: "② 블로그·릴스·사진 제작 (1→3단계 위저드)", d: "1단계(원고·대본 금지어 정화) → 2단계(실물 정물 사진) → 3단계(9:16 릴스·배너 저장) 순서대로 진행하세요." },
    cshub: { t: "③ PPT 발표자료 받기 (1→3단계 허브)", d: "1단계 왼쪽 템플릿 선택 → 2단계 오른쪽 세부 장표(#01~#08) 확인 → 3단계 주제 적고 [PPTX 파일 내려받기] 클릭." },
    home: { t: "④ 고객 응답·성과 보기 & 고수템 #admin 직결", d: "고객 원장, 가설 검증(H1~H3) 실측치, 랜딩 이탈 구간, 사업계획서 요약문을 한곳에서 확인합니다." },
    guide: { t: "처음 사용 가이드 & 4단 숏폼 촬영가이드 PDF", d: "단계별 사용법과 브랜드별 4단 숏폼 대본 및 촬영가이드 PDF를 출력합니다." },
    utm: { t: "배포 채널별 단축 주소(UTM) & 오프라인 QR 발급", d: "인스타·블로그·카카오 배포용 추적 링크와 오프라인 QR 코드를 발급합니다." },
    report: { t: "랜딩 구간별 이탈 분석 & 사업계획서용 요약문", d: "최대 이탈 구간을 확인하고 심사위원 제출용 요약문을 복사합니다." },
    folders: { t: "전사 G드라이브 표준 폴더 트리 & 핸디핏 사진함", d: "G드라이브 표준 폴더 경로를 복사하거나 핸디핏 실물 정물 사진 8종을 열람합니다." }
  };

  var state = {
    bizUnit: "all", menu: "landing", studioTab: "copy",
    csItems: CS ? CS.loadCatalog() : [], csFolder: "ppt_all", csViewMode: "card", csTag: "", csQuery: "",
    csSelectedId: "baze-ppt-001", csTreeOpen: true, csLeftWidthPct: 45, csCardMinPx: 175, csSlideRatio: "4:3", csDrawerCols: 2, csSlideIdx: 0,
    imgFilter: "all", selectedImgId: "IMG-01", imgAngle: "탑뷰(Flat-lay)", imgRatio: "4:5", imgStyle: "실사 정물 Flat-lay", imgRefCount: 1, imgWebSearch: true,
    selectedVidId: "VID-01", vidCutIdx: 0, vidDuration: 15, vidSafeZone: true,
    selectedTplId: "TPL-01", tplTheme: "dark-lime", selectedLandingId: "LND-04", selectedPersonaId: "PER-01", selectedPinId: "PIN-01", customCopyText: "", selectedQrUtmId: "UTM-01"
  };

  function $(id) { return document.getElementById(id); }
  function toast(msg) {
    var el = $("st-toast"); if (!el) return;
    el.textContent = msg; el.classList.add("show");
    clearTimeout(toast._t); toast._t = setTimeout(function () { el.classList.remove("show"); }, 2600);
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
    var cv = $(canvasId); if (!cv) return;
    var a = document.createElement("a"); a.href = cv.toDataURL("image/png"); a.download = filename; a.click();
    toast(filename + " PNG 저장 완료");
  }

  function renderBizSwitcher() {
    var chips = document.querySelectorAll("[data-biz-unit]");
    for (var i = 0; i < chips.length; i++) chips[i].classList.toggle("active", chips[i].getAttribute("data-biz-unit") === state.bizUnit);
    var meta = FLOW_META[state.menu] || FLOW_META.landing;
    if ($("erp-active-flow-title")) $("erp-active-flow-title").textContent = meta.t;
    if ($("erp-biz-desc")) $("erp-biz-desc").textContent = meta.d;
  }

  function renderStudioPanel() {
    var tabBtns = document.querySelectorAll("[data-studio-tab]");
    for (var i = 0; i < tabBtns.length; i++) {
      var isAct = tabBtns[i].getAttribute("data-studio-tab") === state.studioTab;
      tabBtns[i].classList.toggle("active", isAct); tabBtns[i].classList.toggle("current", isAct);
    }
    var subPanels = document.querySelectorAll("[data-studio-view]");
    for (var j = 0; j < subPanels.length; j++) subPanels[j].hidden = subPanels[j].getAttribute("data-studio-view") !== state.studioTab;
    if (state.studioTab === "copy") V.renderCopyPanel(state, H, E);
    else if (state.studioTab === "image") V.renderImageStudio(state, R, E, C);
    else if (state.studioTab === "video") V.renderVideoStudio(state, R, C);
    else if (state.studioTab === "design") V.renderDesignStudio(state, R, C);
  }

  function renderActivePanel() {
    renderBizSwitcher();
    if (state.menu === "home" || state.menu === "report") V.renderReportPanel(H, E, state);
    else if (state.menu === "guide" && window.GOSU_GUIDE_CONTENT) window.GOSU_GUIDE_CONTENT.render(state, H);
    else if (state.menu === "cshub" && CS) CS.renderHub(state);
    else if (state.menu === "studio") renderStudioPanel();
    else if (state.menu === "landing") V.renderLandingPanel(state, H, copyText, toast);
    else if (state.menu === "utm") V.renderUtmPanel(state, H, E);
    else if (state.menu === "folders" && window.GOSU_FOLDER_TREE) window.GOSU_FOLDER_TREE.render(state, H);
  }

  function setMenu(m, subTab) {
    if (m === "copy") { m = "studio"; subTab = "copy"; }
    state.menu = m; if (subTab) state.studioTab = subTab;
    var navBtns = document.querySelectorAll(".sidebar [data-menu-btn]");
    for (var i = 0; i < navBtns.length; i++) navBtns[i].classList.toggle("active", navBtns[i].getAttribute("data-menu-btn") === m);
    var panels = document.querySelectorAll("[data-menu-panel]");
    for (var j = 0; j < panels.length; j++) panels[j].hidden = panels[j].getAttribute("data-menu-panel") !== m;
    renderActivePanel();
  }

  function bindEvents() {
    document.addEventListener("click", function (e) {
      var t = e.target, bizBtn = t.closest("[data-biz-unit]");
      if (bizBtn) {
        state.bizUnit = bizBtn.getAttribute("data-biz-unit");
        if (state.bizUnit === "cea") { state.selectedPersonaId = "PER-02"; state.selectedPinId = "PIN-02"; state.selectedTplId = "TPL-08"; state.hfActiveSiteId = "site-cea"; state.gcActiveBrandId = "BRD-CEA"; }
        else if (state.bizUnit === "blog") { state.selectedPersonaId = "PER-03"; state.selectedPinId = "PIN-03"; state.selectedTplId = "TPL-06"; state.hfActiveSiteId = "site-curator"; state.gcActiveBrandId = "BRD-CURATOR"; }
        else if (state.bizUnit === "gosutem") { state.selectedPersonaId = "PER-01"; state.selectedPinId = "PIN-01"; state.selectedTplId = "TPL-01"; state.hfActiveSiteId = "site-gosutem"; state.gcActiveBrandId = "BRD-GOSU"; }
        renderActivePanel(); toast("사업부 필터 전환 완료"); return;
      }
      var menuBtn = t.closest("[data-menu-btn]");
      if (menuBtn) {
        if (menuBtn.getAttribute("data-guide-mode")) state.gcMode = menuBtn.getAttribute("data-guide-mode");
        setMenu(menuBtn.getAttribute("data-menu-btn"), menuBtn.getAttribute("data-sub-tab")); return;
      }
      var stTab = t.closest("[data-studio-tab]");
      if (stTab) { setMenu("studio", stTab.getAttribute("data-studio-tab")); return; }
      if (CS && CS.handleClick(t, state, R, C, V, setMenu, copyText, toast)) return;
      if (window.GOSU_GUIDE_CONTENT && window.GOSU_GUIDE_CONTENT.handleClick(t, state, R, H, E, setMenu, copyText, toast)) return;
      if (window.GOSU_LANDING_BUILDER && window.GOSU_LANDING_BUILDER.handleClick(t, state, H, copyText, toast)) return;
      if (window.GOSU_FOLDER_TREE && window.GOSU_FOLDER_TREE.handleClick(t, state, H, setMenu, copyText, toast)) return;
      if (window.GOSU_ERP_DB && window.GOSU_ERP_DB.handleAction(t, state, H, copyText, toast, renderActivePanel)) return;

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
      var pickLanding = t.closest("[data-pick-landing]");
      if (pickLanding) { state.selectedLandingId = pickLanding.getAttribute("data-pick-landing"); V.renderLandingPanel(state, H, copyText, toast); return; }
      var copyUtm = t.closest("[data-copy-utm]");
      if (copyUtm) { copyText(copyUtm.getAttribute("data-copy-utm"), "단축 주소"); return; }
      var qrUtm = t.closest("[data-qr-utm]");
      if (qrUtm) { state.selectedQrUtmId = qrUtm.getAttribute("data-qr-utm"); V.renderUtmPanel(state, H, E); return; }
    });

    document.addEventListener("change", function (e) {
      var t = e.target, targetId = t.getAttribute("data-cs-edit-title") || t.getAttribute("data-cs-edit-tags") || t.getAttribute("data-cs-edit-note");
      if (targetId) {
        var found = state.csItems.find(function (x) { return x.id === targetId; });
        if (found) {
          if (t.getAttribute("data-cs-edit-title")) found.title = t.value.trim();
          if (t.getAttribute("data-cs-edit-tags")) found.tags = t.value.split(",").map(function (s) { return s.trim(); }).filter(Boolean);
          if (t.getAttribute("data-cs-edit-note")) found.note = t.value.trim();
          CS.saveCatalog(state.csItems); toast(targetId + " 저장 완료");
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
      var titleEl = $("cs-new-title"), srcEl = $("cs-new-src"), title = (titleEl && titleEl.value.trim()) || "새 전사 템플릿", src = (srcEl && srcEl.value) || "baze", isPpt = src === "baze" || src === "local_pptx";
      var newItem = { id: src.slice(0, 3) + "-" + Date.now().toString(36).slice(-4), biz: state.bizUnit === "all" ? "gosutem" : state.bizUnit, source: src, type: isPpt ? "ppt_template" : "sns_template", title: title, ratio: isPpt ? "16:9" : "4:5", slideCount: isPpt ? 12 : 5, tags: ["사업계획서", "전사공용"], note: "직접 등록" };
      state.csItems.unshift(newItem); state.csSelectedId = newItem.id; if (titleEl) titleEl.value = "";
      CS.saveCatalog(state.csItems); CS.renderHub(state); toast("'" + title + "' 추가 완료");
    });
    onBtn("btn-gen-api-image", function () {
      var cur = R.imageTemplates.find(function (t) { return t.id === state.selectedImgId; }) || R.imageTemplates[0];
      if (window.GOSU_PPTX_API) window.GOSU_PPTX_API.generateOfficialImage({ provider: ($("img-api-provider") || {}).value || "local_flatlay", apiKey: ($("img-api-key") || {}).value || "", angle: state.imgAngle, ratio: state.imgRatio, style: state.imgStyle, chainText: ($("img-chain-input") || {}).value }, cur, ($("img-prompt-output") || {}).value || cur.prompt, $("cv-image-studio"), C, toast);
    });
    onBtn("btn-dl-image", function () { downloadCanvas("cv-image-studio", "gosu-studio-image-" + state.selectedImgId + "_v1.png"); });
    onBtn("btn-copy-img-prompt", function () { copyText($("img-prompt-output").value, "지시문"); });
    onBtn("btn-dl-video-frame", function () { downloadCanvas("cv-video-studio", "gosu-studio-reels-" + state.selectedVidId + "-cut" + (state.vidCutIdx + 1) + "_v1.png"); });
    onBtn("btn-dl-design", function () { downloadCanvas("cv-design-studio", "gosu-studio-banner-" + state.selectedTplId + "_v1.png"); });
    onBtn("btn-copy-clean-text", function () { copyText($("copy-result-box").value, "완성 원고"); });
    onBtn("btn-add-utm", function () {
      var ch = $("utm-new-ch").value, camp = $("utm-new-camp").value || "2611_studio", entry = E.createUtmEntry(ch, ch, "social", camp, "swim");
      entry.biz = state.bizUnit === "all" ? "gosutem" : state.bizUnit;
      H.utmLinks.unshift(entry); state.selectedQrUtmId = entry.id; V.renderUtmPanel(state, H, E); toast("단축 주소 & QR 발급 완료");
    });
    onBtn("btn-copy-bp-report", function () { copyText($("report-bp-summary").value, "시장검증 요약문"); });
  }

  window.addEventListener("DOMContentLoaded", function () { bindEvents(); setMenu("landing"); });
})();