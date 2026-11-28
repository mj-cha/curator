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

  function renderReportPanel(H, E, state) {
    var homeEl = $("home-erp-grid");
    if (homeEl && !homeEl.innerHTML) {
      homeEl.innerHTML =
        '<div class="step-box"><span>업무 ① · 랜딩·설문 캠페인</span><strong>홈페이지 선택 ➔ 화면 클릭 편집 ➔ 20문항 설문 ➔ 게시·QR</strong><p>고수템·CEA·신규 홈페이지의 랜딩페이지와 설문을 1~4단계 순서대로 만들고 배포합니다.</p></div>' +
        '<div class="step-box"><span>업무 ② · 블로그·릴스·사진 제작</span><strong>원고·4단 대본 정화 ➔ 실물 정물 사진 ➔ 9:16 릴스·배너</strong><p>금지어 18종 자동 교정 원고부터 인물 0% 실물 정물 사진과 촬영가이드 PDF까지 3단계로 제작합니다.</p></div>' +
        '<div class="step-box"><span>업무 ③ · PPT 발표자료 허브</span><strong>PPT 8종(.pptx 조립) · 미리캔버스 47종 · 로보엠디 47종</strong><p>세부 장표(#01~#08)를 미리 보고 발표 주제를 넣어 실제 파워포인트(.pptx) 파일을 즉시 내려받습니다.</p></div>' +
        '<div class="step-box"><span>업무 ④ · 고수템 #admin 실시간 직결</span><strong>고객 원장(#admin/customers) · 가설 판정표(#admin/verify)</strong><p>설문 응답과 방문 이벤트가 고수템 본체 관리자 화면 및 Supabase 실서버와 실시간 동기화됩니다.</p></div>';
    }
    if (window.GOSU_ERP_DB) window.GOSU_ERP_DB.renderErpDbPanel(state, H);
    var funnelHtml = H.sectionFunnel.map(function (f) {
      var cls = f.isMaxDrop ? "funnel-row max-drop" : "funnel-row";
      return '<div class="' + cls + '"><div class="funnel-label"><strong>' + f.sec + '</strong><span>' + f.reachPct + '% (' + f.visitors + '명 도달)</span></div>' +
        '<div class="funnel-track"><div class="funnel-fill" style="width:' + f.reachPct + '%"></div></div>' +
        (f.alertText ? '<div class="funnel-alert">' + f.alertText + '</div>' : '') + '</div>';
    }).join("");
    if ($("report-funnel-bars")) $("report-funnel-bars").innerHTML = funnelHtml;
    if ($("home-funnel-mount")) $("home-funnel-mount").innerHTML = funnelHtml;
    var summaryBox = $("report-bp-summary");
    if (summaryBox) summaryBox.value = E.buildValidationSummary(H.utmLinks, H.surveyDropoff, H.sectionFunnel);
  }

  function buildErpDbHtml(db, state, lCnt, fCnt, uCnt, sbCfg, sbOn) {
    return '<div class="panel-card"><div class="panel-head"><div><h2>🔗 고수템 본체(#admin) ↔ 업무 스튜디오 실시간 단일 DB 관제판</h2>' +
      '<small>고객원장(#admin/customers) · 가설판정표(#admin/verify) 연동 (' + db.syncedAt + ' · ' + (sbOn ? "Supabase 실서버 직결" : "이 기기 실시간 공유") + ')</small></div>' +
      '<div class="btn-row"><button class="btn-sm" data-db-act="toggle-sb-cfg">⚙️ Supabase 설정</button><button class="btn-sm" data-db-act="sim-track">⚡ 방문 기록 추가</button><button class="btn-sm cs-btn-green" data-db-act="export-csv">📥 고객원장 CSV</button><button class="btn-pri" data-db-act="export-json">📥 전체 DB JSON</button></div></div>' +
      (state && state.showSbConfig ? '<div class="form-grid"><label>Supabase URL<input type="text" id="db-sb-url" value="' + (sbCfg.url || "") + '" /></label><label>Anon Key<input type="password" id="db-sb-key" value="' + (sbCfg.anonKey || "") + '" /></label><div><button class="btn-pri" data-db-act="save-sb-cfg">저장</button></div></div>' : '') +
      '<div class="form-grid"><div class="step-box"><span>1. 랜딩</span><strong>' + lCnt + '종</strong></div><div class="step-box"><span>2. 설문 폼</span><strong>' + fCnt + '종</strong></div><div class="step-box"><span>3. 고객 응답</span><strong>' + db.customers.length + '건</strong></div><div class="step-box"><span>4. 배포 링크</span><strong>' + uCnt + '종</strong></div><div class="step-box"><span>5. 행동 기록</span><strong>' + db.events.length + '건</strong></div></div>' +
      '<div class="studio-workspace"><div><h3>📊 가설 검증 현황 (#admin/verify)</h3><div class="table-wrap"><table><thead><tr><th>가설</th><th>항목</th><th>목표</th><th>실측치</th><th>판정</th></tr></thead><tbody>' +
      db.hypotheses.map(function (h) { return '<tr><td><b>' + h.id + '</b></td><td>' + h.title + '</td><td>' + h.target + '</td><td><b>' + h.actual + '</b></td><td><span class="badge-accent">' + h.status + '</span></td></tr>'; }).join("") +
      '</tbody></table></div></div><div><h3>👥 고객 응답 원장 (#admin/customers)</h3><div class="table-wrap"><table><thead><tr><th>ID·구분</th><th>연락처</th><th>응답 요약</th><th class="num">절감액</th></tr></thead><tbody>' +
      db.customers.slice(0, 5).map(function (c) { return '<tr><td><b>' + c.id + '</b> (' + (c.kind || c.role) + ')</td><td>' + c.contact + '</td><td>' + c.summary + '</td><td class="num"><b>' + Number(c.savedAmount || 0).toLocaleString() + '원</b></td></tr>'; }).join("") +
      '</tbody></table></div></div></div></div>';
  }

  return {
    renderImageStudio: renderImageStudio,
    renderVideoStudio: renderVideoStudio,
    renderDesignStudio: renderDesignStudio,
    renderLandingPanel: renderLandingPanel,
    renderCopyPanel: renderCopyPanel,
    renderUtmPanel: renderUtmPanel,
    renderReportPanel: renderReportPanel,
    buildErpDbHtml: buildErpDbHtml
  };
})();
