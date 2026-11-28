/* 핸디핏(HandyFit) 랜딩페이지 인라인 시각 편집기 (src/components/handyfitEditor.js · 15KB 이하)
   - 글자 클릭 직접 타이핑(contenteditable) + 플로팅 글자 서식 바(B · 가 색상 5종 · 작게/보통/크게/아주 크게 · 설명 삭제)
   - 우측 < 페이지 설정(배치 · 사진 위치/비율 · 여백 · 배경색 · ✨ AI로 다시 쓰기) + 페이지 순서(11개 섹션 끌어서 순서 바꾸기) */
window.GOSU_HANDYFIT_EDITOR = (function () {
  var LS_KEY = "gosu-handyfit-editor-v1";

  function ensureEditorState(state, H) {
    var S = window.GOSU_HF_SEED;
    if (!state.hfEd) {
      var saved = null;
      try { saved = JSON.parse(localStorage.getItem(LS_KEY) || "null"); } catch (e) { /* 무시 */ }
      var preset = H.landingPresets10.find(function (l) { return l.id === state.selectedLandingId; }) || H.landingPresets10[0];
      state.hfEd = (saved && saved.presetId === preset.id) ? saved : {
        presetId: preset.id, title: "고수템 (GOSUTEM) · " + preset.name, step: 2, viewport: "tablet",
        activeSecId: "sec-hero", showFloatingBar: true, sections: S.createSections(preset)
      };
    }
    return state.hfEd;
  }

  function saveEditorState(ed) {
    try { localStorage.setItem(LS_KEY, JSON.stringify(ed)); } catch (e) { /* 무시 */ }
  }

  function render(state, H, copyText, toast) {
    var mount = document.getElementById("hf-editor-mount");
    if (!mount) return;
    var S = window.GOSU_HF_SEED;
    var ed = ensureEditorState(state, H);
    var activeSec = ed.sections.find(function (s) { return s.id === ed.activeSecId; }) || ed.sections[0];
    ed.activeSecId = activeSec.id;

    var vpWidth = ed.viewport === "desktop" ? "100%" : ed.viewport === "tablet" ? "640px" : "390px";
    var sizeMap = { "작게": "20px", "보통": "25px", "크게": "31px", "아주 크게": "37px" };
    var ratioMap = { "와이드": "16 / 9", "기본": "4 / 3", "정사각": "1 / 1", "세로": "3 / 4" };

    var sectionsHtml = ed.sections.map(function (s) {
      var isAct = s.id === ed.activeSecId;
      var hSize = sizeMap[s.headSize] || "26px";
      var rCss = ratioMap[s.imgRatio] || "4 / 3";
      var hasImg = s.imgType && s.imgType !== "none";

      var floatingToolbar = isAct && ed.showFloatingBar ? (
        '<div class="hf-float-bar" onclick="event.stopPropagation()">' +
        '<button type="button" class="hf-fb-btn ' + (s.headBold ? "active" : "") + '" data-hf-act="toggle-bold"><b>B</b></button>' +
        '<span class="hf-fb-sep"></span>' +
        [{ c: "#0C3C78", bg: "#0C3C78", fg: "#FFF" }, { c: "#1E5BB8", bg: "#1E5BB8", fg: "#FFF" }, { c: "#F59E0B", bg: "#F59E0B", fg: "#111" }, { c: "#141413", bg: "#141413", fg: "#FFF" }, { c: "#FFFFFF", bg: "#475569", fg: "#FFF" }].map(function (sw) {
          return '<button type="button" class="hf-color-dot ' + (s.headColor === sw.c ? "active" : "") + '" style="background:' + sw.bg + ';color:' + sw.fg + '" data-hf-act="head-color" data-val="' + sw.c + '">가</button>';
        }).join("") +
        '<span class="hf-fb-sep"></span>' +
        ["작게", "보통", "크게", "아주 크게"].map(function (sz) {
          return '<button type="button" class="hf-sz-btn ' + (s.headSize === sz ? "active" : "") + '" data-hf-act="head-size" data-val="' + sz + '">' + sz + '</button>';
        }).join("") +
        '<span class="hf-fb-sep"></span>' +
        '<button type="button" class="hf-sz-btn" data-hf-act="toggle-desc">' + (s.showDesc ? "설명 삭제" : "설명 복원") + '</button>' +
        '<button type="button" class="hf-sz-btn active" data-hf-act="hide-float">✓</button></div>'
      ) : "";

      var textBlock =
        '<div class="hf-sec-text">' +
        '<div class="hf-sec-badge" contenteditable="true" data-hf-edit="badge" data-sec-id="' + s.id + '">' + s.badge + '</div>' +
        '<h2 class="hf-sec-h2" contenteditable="true" data-hf-edit="headline" data-sec-id="' + s.id + '" style="font-size:' + hSize + ';color:' + s.headColor + ';font-weight:' + (s.headBold ? "900" : "500") + '">' + s.headline + '</h2>' +
        floatingToolbar +
        (s.showDesc ? '<p class="hf-sec-desc" contenteditable="true" data-hf-edit="desc" data-sec-id="' + s.id + '">' + s.desc + '</p>' : '') +
        (s.cta ? '<div style="margin-top:14px"><span class="hf-sec-cta" contenteditable="true" data-hf-edit="cta" data-sec-id="' + s.id + '" style="background:' + (s.bg === "#0C3C78" || s.bg === "#141413" ? "#FFFFFF" : "#0C3C78") + ';color:' + (s.bg === "#0C3C78" || s.bg === "#141413" ? "#0C3C78" : "#FFFFFF") + '">' + s.cta + '</span></div>' : '') +
        '</div>';

      var imgBlock = hasImg ? ('<div class="hf-sec-img-wrap" style="aspect-ratio:' + rCss + '"><img src="' + S.buildFlatlaySvg(s.imgType) + '" alt="' + s.name + '" /></div>') : "";
      var isSplit = hasImg && (s.layout === "비주얼 우측" || s.layout === "비주얼 좌측") && ed.viewport === "desktop";
      var bodyInner = isSplit ? '<div class="hf-sec-split">' + (s.imgPos === "left" ? imgBlock + textBlock : textBlock + imgBlock) + '</div>' : textBlock + imgBlock;

      return '<section class="hf-canvas-sec ' + (isAct ? "active" : "") + '" data-hf-pick-sec="' + s.id + '" style="background:' + s.bg + ';color:' + s.fg + ';padding:' + s.padY + 'px 28px">' +
        '<div class="hf-sec-tag-Indicator">' + s.name + ' · ' + s.layout + ' (글자 클릭 시 직접 수정)</div>' + bodyInner + '</section>';
    }).join("");

    mount.innerHTML =
      '<div class="hf-top-header">' +
      '<div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap">' +
      '<input type="text" id="hf-page-title-in" class="hf-title-input" value="' + ed.title.replace(/"/g, "&quot;") + '" />' +
      '<select id="hf-preset-sel" class="hf-preset-select">' +
      H.landingPresets10.map(function (p) { return '<option value="' + p.id + '" ' + (p.id === ed.presetId ? "selected" : "") + '>프리셋 전환: [' + p.id + '] ' + p.name + '</option>'; }).join("") +
      '</select></div>' +
      '<div class="hf-stepper">' +
      [{ n: 1, l: "아이디어 정리" }, { n: 2, l: "페이지 만들기" }, { n: 3, l: "폼 연결" }, { n: 4, l: "게시" }].map(function (st) {
        var done = st.n <= 3, cur = st.n === ed.step;
        return '<button type="button" class="hf-step-item ' + (cur ? "current" : "") + '" data-hf-act="set-step" data-val="' + st.n + '"><span class="hf-step-dot ' + (done ? "done" : "") + '">' + (done && st.n < 4 ? "✓" : st.n) + '</span><span>' + st.l + '</span></button>';
      }).join('<span class="hf-step-line"></span>') + '</div></div>' +

      '<div class="hf-sub-toolbar">' +
      '<div style="display:flex;align-items:center;gap:10px"><button type="button" class="btn-sm" data-hf-act="reset-preset">↺ 기본값 복원</button><span style="font-size:12px;color:#15803D;font-weight:800">● 자동 저장됨 (글자를 클릭해 직접 수정하세요)</span></div>' +
      '<div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">' +
      '<div class="cs-seg">' +
      '<button type="button" class="' + (ed.viewport === "desktop" ? "active" : "") + '" data-hf-act="viewport" data-val="desktop">🖥 데스크톱</button>' +
      '<button type="button" class="' + (ed.viewport === "tablet" ? "active" : "") + '" data-hf-act="viewport" data-val="tablet">📱 태블릿</button>' +
      '<button type="button" class="' + (ed.viewport === "mobile" ? "active" : "") + '" data-hf-act="viewport" data-val="mobile">📱 모바일</button></div>' +
      '<button type="button" class="btn-sm" data-hf-act="copy-all-text">전체 문구 복사</button>' +
      '<button type="button" class="btn-sm cs-btn-green" data-hf-act="export-html">단독 랜딩 HTML 저장 ↗</button></div></div>' +

      '<div class="hf-editor-grid">' +
      '<div class="hf-canvas-viewport"><div class="hf-device-frame" style="max-width:' + vpWidth + '">' +
      '<header class="hf-page-sticky-nav"><strong contenteditable="true">' + ed.title + '</strong><span class="hf-nav-cta">' + (ed.sections[0] ? ed.sections[0].cta : "무료 등록") + '</span></header>' +
      sectionsHtml + '</div></div>' +
      S.renderInspector(activeSec, ed) + '</div>';

    bindInlineEvents(mount, state, H, copyText, toast);
  }

  function bindInlineEvents(mount, state, H, copyText, toast) {
    var S = window.GOSU_HF_SEED;
    var ed = state.hfEd;
    var activeSec = ed.sections.find(function (s) { return s.id === ed.activeSecId; }) || ed.sections[0];

    var editables = mount.querySelectorAll("[data-hf-edit]");
    for (var i = 0; i < editables.length; i++) {
      editables[i].oninput = function (e) {
        var targetSec = ed.sections.find(function (s) { return s.id === e.target.getAttribute("data-sec-id"); });
        var field = e.target.getAttribute("data-hf-edit");
        if (targetSec && field) { targetSec[field] = e.target.innerText.trim(); saveEditorState(ed); }
      };
    }

    var titleIn = document.getElementById("hf-page-title-in");
    if (titleIn) titleIn.oninput = function (e) { ed.title = e.target.value; saveEditorState(ed); };

    var presetSel = document.getElementById("hf-preset-sel");
    if (presetSel) {
      presetSel.onchange = function (e) {
        state.selectedLandingId = e.target.value;
        var p = H.landingPresets10.find(function (l) { return l.id === state.selectedLandingId; }) || H.landingPresets10[0];
        state.hfEd = { presetId: p.id, title: "고수템 (GOSUTEM) · " + p.name, step: 2, viewport: ed.viewport, activeSecId: "sec-hero", showFloatingBar: true, sections: S.createSections(p) };
        saveEditorState(state.hfEd); render(state, H, copyText, toast); toast("'" + p.name + "' 프리셋을 불러왔어요.");
      };
    }

    var layoutSel = document.getElementById("hf-layout-sel");
    if (layoutSel) {
      layoutSel.onchange = function (e) {
        activeSec.layout = e.target.value;
        if (e.target.value === "비주얼 좌측") activeSec.imgPos = "left";
        if (e.target.value === "비주얼 우측") activeSec.imgPos = "right";
        saveEditorState(ed); render(state, H, copyText, toast);
      };
    }

    var dragSrcIdx = null;
    var orderItems = mount.querySelectorAll("[data-hf-drag-idx]");
    for (var j = 0; j < orderItems.length; j++) {
      orderItems[j].ondragstart = function (e) { dragSrcIdx = Number(e.currentTarget.getAttribute("data-hf-drag-idx")); };
      orderItems[j].ondragover = function (e) { e.preventDefault(); };
      orderItems[j].ondrop = function (e) {
        e.preventDefault();
        var dropIdx = Number(e.currentTarget.getAttribute("data-hf-drag-idx"));
        if (dragSrcIdx !== null && dragSrcIdx !== dropIdx) {
          var moved = ed.sections.splice(dragSrcIdx, 1)[0];
          ed.sections.splice(dropIdx, 0, moved);
          saveEditorState(ed); render(state, H, copyText, toast); toast("섹션 순서를 변경했어요.");
        }
      };
    }
  }

  function handleClick(t, state, H, copyText, toast) {
    var S = window.GOSU_HF_SEED;
    var ed = ensureEditorState(state, H);
    var activeSec = ed.sections.find(function (s) { return s.id === ed.activeSecId; }) || ed.sections[0];

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
    else if (act === "set-step") { ed.step = Number(val); toast(val + "단계 화면으로 전환했어요."); }
    else if (act === "toggle-bold") activeSec.headBold = !activeSec.headBold;
    else if (act === "head-color") activeSec.headColor = val;
    else if (act === "head-size") activeSec.headSize = val;
    else if (act === "toggle-desc") activeSec.showDesc = !activeSec.showDesc;
    else if (act === "hide-float") ed.showFloatingBar = false;
    else if (act === "img-pos") { activeSec.imgPos = val; if (activeSec.imgType === "none") activeSec.imgType = "main"; }
    else if (act === "img-toggle") activeSec.imgType = activeSec.imgType === "none" ? "main" : "none";
    else if (act === "img-ratio") activeSec.imgRatio = val;
    else if (act === "pad-y") activeSec.padY = Number(val);
    else if (act === "sec-bg") { activeSec.bg = actBtn.getAttribute("data-bg"); activeSec.fg = actBtn.getAttribute("data-fg"); activeSec.headColor = activeSec.fg; }
    else if (act === "move-sec") {
      var idx = Number(actBtn.getAttribute("data-idx")), to = idx + Number(actBtn.getAttribute("data-dir"));
      if (to >= 0 && to < ed.sections.length) { var item = ed.sections.splice(idx, 1)[0]; ed.sections.splice(to, 0, item); }
    } else if (act === "ai-rewrite") {
      var alts = [
        "첫 달 사지 말아야 할 장비 3종부터 1분 만에 걸러드립니다.",
        "매달 반복되는 장비 질문, 현직 강사 5인의 실사 가방 링크 하나로 끝내세요.",
        "광고·협찬 링크 0개. 배송비 포함 실제 결제 총비용만 투명하게 비교합니다."
      ];
      activeSec.headline = alts[Math.floor(Math.random() * alts.length)];
      toast("AI가 금지어 0건·유시민 단문 규칙으로 문구를 다시 썼어요.");
    } else if (act === "reset-preset") {
      var p = H.landingPresets10.find(function (l) { return l.id === ed.presetId; }) || H.landingPresets10[0];
      ed.sections = S.createSections(p); toast("현재 프리셋 초기 문구로 복원했어요.");
    } else if (act === "copy-all-text") {
      var txt = ed.sections.map(function (s, i) { return (i + 1) + ". [" + s.name + " · " + s.layout + "] " + s.headline + "\n   " + s.desc; }).join("\n\n");
      copyText(txt, ed.title + " 전체 랜딩 원고"); return true;
    } else if (act === "export-html") {
      var frame = document.querySelector(".hf-device-frame");
      if (frame) {
        var htmlDoc = "<!doctype html><html lang='ko'><head><meta charset='utf-8'><meta name='viewport' content='width=device-width,initial-scale=1'><title>" + ed.title + "</title><style>body{margin:0;font-family:Pretendard,sans-serif;background:#F4F6FA}.wrap{max-width:720px;margin:0 auto;background:#FFF;box-shadow:0 4px 20px rgba(0,0,0,.08)}section{padding:36px 28px}img{max-width:100%;border-radius:10px;display:block;margin-top:14px}.hf-float-bar,.hf-sec-tag-Indicator{display:none}</style></head><body><div class='wrap'>" + frame.innerHTML.replace(/contenteditable="true"/g, "") + "</div></body></html>";
        var a = document.createElement("a");
        a.href = URL.createObjectURL(new Blob([htmlDoc], { type: "text/html;charset=utf-8" }));
        a.download = "gosu-landing-" + ed.presetId + ".html"; a.click();
        toast("수정된 랜딩페이지를 단독 HTML 파일로 내려받았어요.");
      }
      return true;
    }

    saveEditorState(ed); render(state, H, copyText, toast); return true;
  }

  return { render: render, handleClick: handleClick };
})();
