/* 고수하우스 전사 AI 솔루션 ERP 스튜디오 뷰 렌더링 모듈 (src/screens/studioViews.js · 15KB 이하) */
window.GOSU_STUDIO_VIEWS = (function () {
  function $(id) { return document.getElementById(id); }

  function matchBiz(item, bizUnit) {
    if (!bizUnit || bizUnit === "all") return true;
    if (!item.biz) return true;
    return item.biz === bizUnit;
  }

  function renderImageStudio(state, R, E, C) {
    var list = R.imageTemplates.filter(function (t) {
      var okGroup = state.imgFilter === "all" || t.group === state.imgFilter;
      var okBiz = matchBiz(t, state.bizUnit);
      return okGroup && okBiz;
    });
    if (!list.length) list = R.imageTemplates;
    var cur = list.find(function (t) { return t.id === state.selectedImgId; }) || list[0];
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
    var list = R.designTemplates.filter(function (d) { return matchBiz(d, state.bizUnit); });
    if (!list.length) list = R.designTemplates;
    var cur = list.find(function (d) { return d.id === state.selectedTplId; }) || R.designTemplates.find(function (d) { return d.id === state.selectedTplId; }) || list[0];
    state.selectedTplId = cur.id;

    var listEl = $("design-tpl-list");
    if (listEl) {
      listEl.innerHTML = list.map(function (d) {
        var active = d.id === cur.id ? " active" : "";
        return '<button type="button" class="tpl-card' + active + '" data-pick-design="' + d.id + '">' +
          '<div class="tpl-card-top"><span class="badge-accent">' + d.id + ' · ' + (d.biz || "all").toUpperCase() + '</span><span class="badge-sub">' + d.width + '×' + d.height + '</span></div>' +
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

  function renderLandingPanel(state, H, copyText, toast) {
    if (window.GOSU_HANDYFIT_EDITOR) {
      window.GOSU_HANDYFIT_EDITOR.render(state, H, copyText, toast);
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
    var list = H.utmLinks.filter(function (u) { return matchBiz(u, state.bizUnit); });
    if (!list.length) list = H.utmLinks;
    var tbody = $("utm-table-body");
    if (tbody) {
      tbody.innerHTML = list.map(function (u) {
        return '<tr><td><b>' + u.channel + '</b><br><small>' + u.campaign + '</small></td>' +
          '<td><code>' + u.shortUrl + '</code><br><small class="muted-url">' + u.gosutemUtm + '</small></td>' +
          '<td class="num">' + u.visits + '</td><td class="num">' + u.applies + '</td><td class="num"><b>' + u.convPct + '%</b></td>' +
          '<td><button type="button" class="btn-sm" data-copy-utm="' + u.shortUrl + '">복사</button> ' +
          '<button type="button" class="btn-sm" data-qr-utm="' + u.id + '">QR</button></td></tr>';
      }).join("");
    }

    var qrTarget = list.find(function (u) { return u.id === state.selectedQrUtmId; }) || list[0];
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
    var homeEl = $("home-erp-grid");
    if (homeEl && !homeEl.innerHTML) {
      homeEl.innerHTML =
        '<div class="step-box"><span>엔진 1 · 컨텐츠 스튜디오 (102종 허브)</span><strong>PPT 덱 · 미리캔버스♥(47) · 로보엠디(39)</strong><p>고수템 IR·정부지원 PSST·CEA 교육 제안서·박사논문 SLR·블로그 카드뉴스를 카드/표 뷰로 통합.</p></div>' +
        '<div class="step-box"><span>엔진 2 · 로보엠디 제작 스튜디오 (3모드)</span><strong>AI 이미지(12) · 동영상(6) · 디자인(9) · 카피(5)</strong><p>실물 정물·성분표·CEA 커리큘럼·영수증 비교표와 금지어 자동 정화 탑재.</p></div>' +
        '<div class="step-box"><span>엔진 3 · 핸디핏 시장검증 (6대 메뉴)</span><strong>랜딩 10선 ➔ 설문 이탈(B-02) ➔ 섹션 도달률(B-03)</strong><p>사업부별 UTM 단축링크·QR 발급 및 문항/섹션 최대 이탈 병목 자동 진단.</p></div>' +
        '<div class="step-box"><span>엔진 4 · 매니패스트 기획 (2년 유효)</span><strong>PRD 13문항 ➔ 요구사항(R) ➔ 기능(F-ID)</strong><p>고수템·CEA 프로젝트를 F-ID로 추적하며 구매 크레딧 100,812는 2028년까지 유효.</p></div>';
    }
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
