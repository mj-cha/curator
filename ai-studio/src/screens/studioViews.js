/* AI 솔루션 스튜디오 각 메뉴 뷰 렌더링 모듈 (src/screens/studioViews.js · 15KB 이하 분리) */
window.GOSU_STUDIO_VIEWS = (function () {
  function $(id) { return document.getElementById(id); }

  function renderImageStudio(state, R, E, C) {
    var list = R.imageTemplates.filter(function (t) {
      return state.imgFilter === "all" || t.group === state.imgFilter;
    });
    var cur = R.imageTemplates.find(function (t) { return t.id === state.selectedImgId; }) || list[0] || R.imageTemplates[0];
    state.selectedImgId = cur.id;

    var gridEl = $("img-tpl-grid");
    if (gridEl) {
      gridEl.innerHTML = list.map(function (t) {
        var active = t.id === cur.id ? " active" : "";
        return '<button type="button" class="tpl-card' + active + '" data-pick-img="' + t.id + '">' +
          '<div class="tpl-card-top"><span class="badge-accent">' + t.badge + '</span><span class="badge-sub">' + t.angle + ' · ' + t.ratio + '</span></div>' +
          '<strong>' + t.title + '</strong><small>' + t.origName + '</small></button>';
      }).join("");
    }

    var promptBox = $("img-prompt-output");
    var chainInput = $("img-chain-input");
    if (chainInput && !chainInput.value) chainInput.value = cur.chainStep;
    var synth = E.synthesizeImagePrompt(cur, {
      angle: state.imgAngle,
      ratio: state.imgRatio,
      style: state.imgStyle,
      refCount: state.imgRefCount,
      webSearch: state.imgWebSearch,
      chainText: chainInput ? chainInput.value : cur.chainStep
    });
    if (promptBox) promptBox.value = synth;

    C.renderImageStudioPreview($("cv-image-studio"), cur, {
      angle: state.imgAngle,
      ratio: state.imgRatio,
      style: state.imgStyle,
      chainText: chainInput ? chainInput.value : cur.chainStep
    });
  }

  function renderVideoStudio(state, R, C) {
    var cur = R.videoTemplates.find(function (v) { return v.id === state.selectedVidId; }) || R.videoTemplates[0];
    state.selectedVidId = cur.id;

    var listEl = $("vid-tpl-list");
    if (listEl) {
      listEl.innerHTML = R.videoTemplates.map(function (v) {
        var active = v.id === cur.id ? " active" : "";
        return '<button type="button" class="tpl-card' + active + '" data-pick-vid="' + v.id + '">' +
          '<div class="tpl-card-top"><span class="badge-accent">' + v.cameraStyle + '</span><span class="badge-sub">' + v.ratio + ' · ' + v.defaultSec + '초</span></div>' +
          '<strong>' + v.title + '</strong><small>3초 훅: ' + v.hook3s + '</small></button>';
      }).join("");
    }

    var cutsEl = $("vid-cuts-table");
    if (cutsEl) {
      cutsEl.innerHTML = cur.cuts.map(function (c, i) {
        var active = i === state.vidCutIdx ? " active-row" : "";
        return '<tr class="' + active + '" data-pick-cut="' + i + '">' +
          '<td><b>' + c.step + '</b><br><span class="badge-sub">' + c.type + '</span></td>' +
          '<td>' + c.scene + '</td><td><strong>' + c.sub.replace(/\n/g, " / ") + '</strong></td>' +
          '<td>' + c.intent + '</td><td><button type="button" class="btn-sm" data-pick-cut="' + i + '">캔버스 보기</button></td></tr>';
      }).join("");
    }

    C.renderVideoFrame($("cv-video-studio"), cur, state.vidCutIdx, {
      duration: state.vidDuration,
      showSafeZone: state.vidSafeZone
    });
  }

  function renderDesignStudio(state, R, C) {
    var cur = R.designTemplates.find(function (d) { return d.id === state.selectedTplId; }) || R.designTemplates[0];
    state.selectedTplId = cur.id;

    var listEl = $("design-tpl-list");
    if (listEl) {
      listEl.innerHTML = R.designTemplates.map(function (d) {
        var active = d.id === cur.id ? " active" : "";
        return '<button type="button" class="tpl-card' + active + '" data-pick-design="' + d.id + '">' +
          '<div class="tpl-card-top"><span class="badge-accent">' + d.id + ' · ' + d.ratio + '</span><span class="badge-sub">' + d.width + '×' + d.height + '</span></div>' +
          '<strong>' + d.name + '</strong><small>' + d.tag + '</small></button>';
      }).join("");
    }

    var headIn = $("design-headline-in");
    var subIn = $("design-subhead-in");
    if (headIn && headIn.getAttribute("data-bound-id") !== cur.id) {
      headIn.value = cur.headline;
      headIn.setAttribute("data-bound-id", cur.id);
      state.tplTheme = cur.theme;
      var themeSel = $("design-theme-sel");
      if (themeSel) themeSel.value = cur.theme;
    }
    if (subIn && subIn.getAttribute("data-bound-id") !== cur.id) {
      subIn.value = cur.subhead;
      subIn.setAttribute("data-bound-id", cur.id);
    }

    C.renderDesignCard($("cv-design-studio"), cur, {
      theme: state.tplTheme,
      headline: headIn ? headIn.value : cur.headline,
      subhead: subIn ? subIn.value : cur.subhead
    });
  }

  function renderLandingPanel(state, H, copyText) {
    var cur = H.landingPresets10.find(function (l) { return l.id === state.selectedLandingId; }) || H.landingPresets10[0];
    state.selectedLandingId = cur.id;

    var listEl = $("landing-preset-list");
    if (listEl) {
      listEl.innerHTML = H.landingPresets10.map(function (l) {
        var active = l.id === cur.id ? " active" : "";
        return '<button type="button" class="tpl-card' + active + '" data-pick-landing="' + l.id + '">' +
          '<div class="tpl-card-top"><span class="badge-accent">' + l.priority + '</span><span class="badge-sub">' + l.id + '</span></div>' +
          '<strong>' + l.name + '</strong><small>' + l.headline + '</small></button>';
      }).join("");
    }

    var detailEl = $("landing-preset-detail");
    if (detailEl) {
      var fullCopy = [
        "[핸디핏 랜딩 입력 패키지 — " + cur.name + "]",
        "• 타깃 고객: " + cur.target,
        "• 검증 가설: " + cur.hypothesis,
        "• 메인 헤드라인(3초 훅): " + cur.headline,
        "• 서브 카피: " + cur.subcopy,
        "• 1단 최상단 검수 배지: " + cur.trustBadge,
        "• 1단(첫 화면 판매 링크 0개 · 사지 마): " + cur.sec1NoBuy,
        "• 2단(무가입 1탭 고수 교차 판정): " + cur.sec2Cross,
        "• 3단(배송비 포함 총비용 중립 비교): " + cur.sec3Price,
        "• 사진·비주얼 지침(인물 0%): " + cur.photoPrompt,
        "• 핵심 행동 버튼(CTA): " + cur.cta
      ].join("\n");

      detailEl.innerHTML =
        '<div class="detail-head"><div><span class="badge-accent">' + cur.priority + '</span><h3>' + cur.name + '</h3><p>' + cur.target + ' · <b>' + cur.hypothesis + '</b></p></div>' +
        '<button type="button" class="btn-pri" id="btn-copy-landing-pack">핸디핏 입력문 전체 복사</button></div>' +
        '<div class="landing-3step-grid">' +
        '<div class="step-box"><span>첫 화면 헤드라인 (3초 메시지)</span><strong>“' + cur.headline + '”</strong><p>' + cur.subcopy + '</p><div class="trust-bar">✓ ' + cur.trustBadge + '</div></div>' +
        '<div class="step-box"><span>1단 · 안 사도 되는 것 (판매 링크 0개)</span><p>' + cur.sec1NoBuy + '</p></div>' +
        '<div class="step-box"><span>2단 · 무가입 1탭 고수 교차 판정</span><p>' + cur.sec2Cross + '</p></div>' +
        '<div class="step-box"><span>3단 · 총비용 중립 비교 & CTA</span><p>' + cur.sec3Price + '</p><div class="cta-preview">버튼: ' + cur.cta + '</div></div></div>' +
        '<textarea id="landing-copy-area" class="code-box" rows="7" readonly>' + fullCopy + '</textarea>';

      var copyBtn = $("btn-copy-landing-pack");
      if (copyBtn) copyBtn.onclick = function () { copyText(fullCopy, cur.name + " 핸디핏 입력문"); };
    }
  }

  function renderCopyPanel(state, H, E) {
    var per = H.copyPersonas.find(function (p) { return p.id === state.selectedPersonaId; }) || H.copyPersonas[0];
    var pin = H.pinnedFooters.find(function (f) { return f.id === state.selectedPinId; }) || H.pinnedFooters[0];

    var perSel = $("copy-persona-sel");
    if (perSel && !perSel.options.length) {
      perSel.innerHTML = H.copyPersonas.map(function (p) { return '<option value="' + p.id + '">' + p.name + '</option>'; }).join("");
    }
    var pinSel = $("copy-pin-sel");
    if (pinSel && !pinSel.options.length) {
      pinSel.innerHTML = H.pinnedFooters.map(function (f) { return '<option value="' + f.id + '">' + f.label + '</option>'; }).join("");
    }

    var res = E.composeCopy(per, pin, state.customCopyText);
    var outBox = $("copy-result-box");
    if (outBox) outBox.value = res.clean;

    var statusEl = $("copy-guard-status");
    if (statusEl) {
      statusEl.innerHTML = res.ok
        ? '<span class="guard-ok">✓ 금지어 0건 통과 (' + res.charCount + '자 · 유시민 단문 & 공정위/UTM 하단 고정 완료)</span>'
        : '<span class="guard-warn">⚡ 금지어 ' + res.hits.length + '건 감지 → 표준 대체어로 자동 교정 완료 (' +
          res.hits.map(function (h) { return '"' + h.bad + '"→"' + h.fix + '"'; }).join(", ") + ')</span>';
    }
  }

  function renderUtmPanel(state, H, E) {
    var tbody = $("utm-table-body");
    if (tbody) {
      tbody.innerHTML = H.utmLinks.map(function (u) {
        return '<tr><td><b>' + u.channel + '</b><br><small>' + u.campaign + '</small></td>' +
          '<td><code>' + u.shortUrl + '</code><br><small class="muted-url">' + u.gosutemUtm + '</small></td>' +
          '<td class="num">' + u.visits + '</td><td class="num">' + u.applies + '</td><td class="num"><b>' + u.convPct + '%</b></td>' +
          '<td><button type="button" class="btn-sm" data-copy-utm="' + u.shortUrl + '">복사</button> ' +
          '<button type="button" class="btn-sm" data-qr-utm="' + u.id + '">QR</button></td></tr>';
      }).join("");
    }

    var qrTarget = H.utmLinks.find(function (u) { return u.id === state.selectedQrUtmId; }) || H.utmLinks[0];
    var qrBox = $("utm-qr-box");
    if (qrBox && qrTarget) {
      qrBox.innerHTML = E.buildQrSvg(qrTarget.shortUrl, 168) +
        '<div class="qr-meta"><strong>' + qrTarget.channel + ' (' + qrTarget.campaign + ')</strong><p>' + qrTarget.shortUrl + '</p></div>';
    }

    var dropBody = $("survey-dropoff-body");
    if (dropBody) {
      dropBody.innerHTML = H.surveyDropoff.questions.map(function (q) {
        return '<tr class="' + (q.warn ? "warn-row" : "") + '"><td><b>' + q.qNo + '</b></td>' +
          '<td>' + q.title + '<br><small class="top-ans">최다 응답: ' + q.topAnswer + '</small>' +
          (q.fixTip ? '<div class="fix-alert">💡 ' + q.fixTip + '</div>' : '') + '</td>' +
          '<td class="num">' + q.dropCount + '명</td>' +
          '<td class="num"><span class="drop-bar" style="width:' + Math.min(100, q.dropPct * 2.2) + 'px"></span> <b>' + q.dropPct + '%</b></td></tr>';
      }).join("");
    }
  }

  function renderReportPanel(H, E) {
    var funnelEl = $("report-funnel-bars");
    if (funnelEl) {
      funnelEl.innerHTML = H.sectionFunnel.map(function (f) {
        var cls = f.isMaxDrop ? "funnel-row max-drop" : "funnel-row";
        return '<div class="' + cls + '"><div class="funnel-label"><strong>' + f.sec + '</strong><span>' + f.reachPct + '% (' + f.visitors + '명)</span></div>' +
          '<div class="funnel-track"><div class="funnel-fill" style="width:' + f.reachPct + '%"></div></div>' +
          (f.alertText ? '<div class="funnel-alert">' + f.alertText + '</div>' : '') + '</div>';
      }).join("");
    }
    var summaryBox = $("report-bp-summary");
    if (summaryBox) summaryBox.value = E.buildValidationSummary(H.utmLinks, H.surveyDropoff, H.sectionFunnel);
  }

  return {
    renderImageStudio: renderImageStudio,
    renderVideoStudio: renderVideoStudio,
    renderDesignStudio: renderDesignStudio,
    renderLandingPanel: renderLandingPanel,
    renderCopyPanel: renderCopyPanel,
    renderUtmPanel: renderUtmPanel,
    renderReportPanel: renderReportPanel
  };
})();
