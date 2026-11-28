/* 핸디핏 멀티 홈페이지 CMS & 20문항 설문 빌더·이탈 분석 (src/components/formBuilder.js · 15KB 이하) */
window.GOSU_FORM_BUILDER = (function () {
  var SITES_KEY = "gosu-erp-sites-v1", FORMS_KEY = "gosu-erp-forms-v1", CARDS_KEY = "gosu-erp-landing-cards-v1";
  function loadJson(k, fb) { try { var v = JSON.parse(localStorage.getItem(k) || "null"); if (Array.isArray(v) && v.length) return v; } catch (e) {} return JSON.parse(JSON.stringify(fb || [])); }
  function saveJson(k, val) { try { localStorage.setItem(k, JSON.stringify(val)); } catch (e) {} }

  function ensureData(state, H) {
    var SD = window.GOSU_FORMS_SEED || {};
    if (!state.hfSites) state.hfSites = loadJson(SITES_KEY, SD.sites);
    if (!state.hfActiveSiteId) state.hfActiveSiteId = state.hfSites[0].id;
    if (!state.hfForms) state.hfForms = loadJson(FORMS_KEY, SD.forms);
    if (!state.hfActiveFormId) state.hfActiveFormId = state.hfForms[0].id;
    if (!state.hfFormTab) state.hfFormTab = "edit";
    if (!state.hfCards) {
      var seedCards = (H.landingPresets10 || []).slice(0, 6).map(function (p, i) {
        return { id: "CRD-" + p.id, presetId: p.id, siteId: p.id === "LND-09" ? "site-cea" : p.id === "LND-08" ? "site-curator" : "site-gosutem", title: p.name, slug: "gosutem-swim-" + p.id.toLowerCase(), published: i < 4, formId: p.id === "LND-09" ? "FRM-CEA-01" : "FRM-GOSU-01", visits: 142 - i * 16, applies: 22 - i * 3 };
      });
      state.hfCards = loadJson(CARDS_KEY, seedCards);
    }
  }

  function calcFormDropoff(form) {
    var opened = Math.max(1, Number(form.openedCount || 173));
    return (form.questions || []).map(function (q) {
      var dc = Number(q.dropCount || 0), pct = Number(((dc / opened) * 100).toFixed(1));
      return { id: q.id, type: q.type, title: q.title, topAnswer: q.topAnswer, dropCount: dc, dropPct: pct, reachPct: Number((((opened - dc) / opened) * 100).toFixed(1)), warn: pct >= 20 };
    });
  }

  function renderSiteBar(state, H) {
    ensureData(state, H);
    var curSite = state.hfSites.find(function (s) { return s.id === state.hfActiveSiteId; }) || state.hfSites[0];
    return '<div class="panel-head" style="padding:8px 12px;background:#F8FAFC;border:1px solid #CBD5E1;border-radius:8px">' +
      '<div class="chip-row"><b>🌐 홈페이지:</b>' +
      state.hfSites.map(function (s) {
        return '<button type="button" class="btn-sm" style="' + (s.id === curSite.id ? "background:" + s.color + ";color:#FFF" : "background:#FFF") + '" data-fb-act="pick-site" data-val="' + s.id + '">' + s.name + ' (' + s.domain + ')</button>';
      }).join("") +
      '<button type="button" class="btn-sm" data-fb-act="toggle-new-site">+ 새 홈페이지</button></div><small>말투: <b>' + curSite.tone + '</b></small>' +
      (state.hfShowNewSite ? '<div class="form-grid" style="width:100%"><input type="text" id="fb-new-site-name" placeholder="사이트명" /><input type="text" id="fb-new-site-domain" placeholder="도메인" /><input type="text" id="fb-new-site-color" value="#0C3C78" /><input type="text" id="fb-new-site-tone" value="단문·금지어0건" /><button type="button" class="btn-pri" data-fb-act="create-site">등록</button></div>' : '') + '</div>';
  }

  function renderStep1Idea(state, H, ed) {
    ensureData(state, H);
    var curSite = state.hfSites.find(function (s) { return s.id === state.hfActiveSiteId; }) || state.hfSites[0];
    var siteCards = state.hfCards.filter(function (c) { return c.siteId === curSite.id; });
    if (!siteCards.length) siteCards = state.hfCards;

    return '<div class="studio-workspace"><div class="panel-card">' +
      '<div class="panel-head"><h2>1단계-A · ' + curSite.name + ' 페이지 골라서 고치기</h2></div>' +
      '<div class="hf-order-list">' +
      siteCards.map(function (c) {
        var conv = c.visits ? ((c.applies / c.visits) * 100).toFixed(1) : "0.0", url = "https://" + curSite.domain + "/p/" + c.slug;
        return '<div class="step-box" style="background:#FFF">' +
          '<div class="panel-head"><div><span class="badge-accent">' + (c.published ? "● 공개" : "○ 비공개") + '</span> <strong>' + c.title + '</strong></div>' +
          '<span class="badge-sub">' + c.visits + '방문 · ' + c.applies + '신청 (' + conv + '%)</span></div>' +
          '<small><code>' + url + '</code> · 설문: <b>' + c.formId + '</b></small><div class="btn-row">' +
          '<button type="button" class="btn-sm cs-btn-green" data-fb-act="open-card-editor" data-val="' + c.presetId + '">✏️ 고치기(2단계) →</button>' +
          '<button type="button" class="btn-sm" data-fb-act="toggle-card-pub" data-val="' + c.id + '">' + (c.published ? "비공개" : "공개") + '</button>' +
          '<button type="button" class="btn-sm" data-fb-act="clone-card" data-val="' + c.id + '">1초 복제</button>' +
          '<button type="button" class="btn-sm" data-fb-act="copy-url" data-val="' + url + '">복사</button></div></div>';
      }).join("") + '</div></div>' +
      '<div class="panel-card"><h2>1단계-B · 핵심 문구 4칸으로 새 초안 만들기</h2>' +
      '<label class="field-label">페이지 제목<input type="text" id="fb-idea-title" value="' + ed.title.replace(/"/g, "&quot;") + '" /></label>' +
      '<label class="field-label">첫 화면 고객 고민<textarea id="fb-idea-pain" rows="2">첫 달 사지 말아야 할 오리발·진한 미러수경·대용량 워시 3종 회피(2.5만 방어)</textarea></label>' +
      '<label class="field-label">해결 방법 및 절감 근거<textarea id="fb-idea-sol" rows="2">김민정 현직 수영강사 외 4명 교차 판정 · 신품+중고·0원 대안 3.1만 절감</textarea></label>' +
      '<label class="field-label">신청 버튼 문구<input type="text" id="fb-idea-cta" value="무가입 체크리스트 1초 저장" /></label>' +
      '<div class="btn-row"><button type="button" class="btn-pri" data-fb-act="generate-from-idea">✨ 초안 만들고 2단계로 이동 →</button></div></div></div>' +
      '<div class="hf-bottom-bar"><span>카드를 고르거나 초안을 적은 뒤 2단계로 이동하세요.</span><button type="button" class="hf-next-pill-btn" data-hf-act="set-step" data-val="2">다음: 2단계 화면 클릭해서 고치기 →</button></div>';
  }

  function renderStep3Form(state, H) {
    ensureData(state, H);
    var curForm = state.hfForms.find(function (f) { return f.id === state.hfActiveFormId; }) || state.hfForms[0];
    state.hfActiveFormId = curForm.id;
    var tab = state.hfFormTab || "edit", E = window.GOSU_STUDIO_ENGINE, DB = window.GOSU_ERP_DB;
    var responses = DB ? DB.getCustomers() : [], dropStats = calcFormDropoff(curForm), tabBody = "";

    if (tab === "edit") {
      tabBody = '<div class="panel-head"><div class="chip-row"><strong>질문: ' + curForm.questions.length + '/20</strong>' +
        '<button type="button" class="btn-sm" data-fb-act="toggle-privacy">개인정보 동의 ' + (curForm.privacyConsent !== false ? "ON" : "OFF") + '</button>' +
        '<button type="button" class="btn-sm" data-fb-act="toggle-quicksave">무가입 1초 저장 ' + (curForm.quickSaveBlock !== false ? "ON" : "OFF") + '</button></div>' +
        '<div class="chip-row"><select id="fb-new-q-type"><option value="객관식">객관식</option><option value="척도(1~5점)">척도(1~5점)</option><option value="단답형">단답형</option><option value="장문형">장문형</option><option value="연락처(이탈방어)">연락처(이탈방어)</option><option value="음성메모/파일">음성메모/파일</option></select>' +
        '<input type="text" id="fb-new-q-title" placeholder="새 질문 (최대 20문항)" /><button type="button" class="btn-pri" data-fb-act="add-question">+ 추가</button></div></div><div class="hf-order-list">' +
        dropStats.map(function (q, idx) {
          return '<div class="step-box"><div class="panel-head"><div><span class="badge-accent">' + q.id + ' · ' + q.type + '</span> <strong>' + q.title + '</strong></div>' +
            '<div><button type="button" class="btn-sm" data-fb-act="move-q" data-idx="' + idx + '" data-dir="-1">▲</button> <button type="button" class="btn-sm" data-fb-act="move-q" data-idx="' + idx + '" data-dir="1">▼</button> <button type="button" class="btn-sm cs-btn-del" data-fb-act="del-q" data-idx="' + idx + '">삭제</button></div></div>' +
            '<small>최다 답: ' + q.topAnswer + ' · 중도 포기: <b>' + q.dropPct + '% (' + q.dropCount + '명)</b>' + (q.warn ? ' ⚡ 병목 경고: 무가입 1초 저장 권장' : '') + '</small></div>';
        }).join("") + '</div><div class="panel-head" style="margin-top:10px">' +
        '<strong>🧪 설문 응답 시험 제출 (고수템 고객원장 실시간 연동)</strong><div><input type="text" id="fb-sim-contact" value="010-8821-3100" /> <button type="button" class="btn-pri" data-fb-act="simulate-submit">시험 응답 제출</button></div></div>';
    } else if (tab === "results") {
      tabBody = '<div class="studio-workspace"><div><h3>📊 문항별 응답 유지 vs 중도 포기 실시간 막대그래프</h3><div class="hf-order-list">' +
        dropStats.map(function (q) {
          return '<div class="step-box"><div class="panel-head"><strong>' + q.id + ' · ' + q.title.slice(0, 26) + '</strong><b>유지 ' + q.reachPct + '% / 포기 ' + q.dropPct + '%</b></div>' +
            '<div style="display:flex;height:10px;border-radius:5px;overflow:hidden;background:#E2E8F0"><div style="width:' + q.reachPct + '%;background:#0F4C81"></div><div style="width:' + q.dropPct + '%;background:#D9381E"></div></div>' +
            (q.warn ? '<small style="color:#B45309;font-weight:800">⚡ 병목 경고(20%+): 무가입 1초 저장 선제 적용</small>' : '') + '</div>';
        }).join("") + '</div></div><div><div class="panel-head"><h3>고객 응답 원장 (' + responses.length + '건)</h3><button type="button" class="btn-sm cs-btn-green" data-fb-act="export-csv">CSV 저장</button></div>' +
        '<div class="table-wrap"><table><thead><tr><th>구분</th><th>연락처</th><th>응답</th><th class="num">절감</th></tr></thead><tbody>' +
        responses.slice(0, 6).map(function (r) { return '<tr><td><b>' + (r.kind || r.role) + '</b></td><td>' + r.contact + '</td><td>' + r.summary + '</td><td class="num"><b>' + Number(r.savedAmount || 31000).toLocaleString() + '원</b></td></tr>'; }).join("") + '</tbody></table></div></div></div>';
    } else {
      var formUrl = "https://www.handyfit.kr/f/" + curForm.id.toLowerCase();
      tabBody = '<div class="studio-workspace"><div class="step-box"><strong>설문 단독 주소</strong><p><code>' + formUrl + '</code></p><div class="btn-row"><button type="button" class="btn-pri" data-fb-act="copy-url" data-val="' + formUrl + '">복사</button><button type="button" class="btn-sec" data-hf-act="set-step" data-val="4">4단계 게시 →</button></div></div><div class="qr-wrap">' + (E ? E.buildQrSvg(formUrl, 136) : '') + '<div><strong>설문 QR</strong><p>' + curForm.title + '</p></div></div></div>';
    }

    return '<div class="panel-card"><div class="panel-head"><div class="chip-row"><h2>3단계 · 설문 폼 고르기</h2><select id="fb-form-sel">' +
      state.hfForms.map(function (f) { return '<option value="' + f.id + '" ' + (f.id === curForm.id ? "selected" : "") + '>' + f.title + ' (' + f.questions.length + ')</option>'; }).join("") +
      '</select><button type="button" class="btn-sm" data-fb-act="new-form">+ 새 폼</button></div><div class="cs-seg">' +
      '<button type="button" class="' + (tab === "edit" ? "active" : "") + '" data-fb-act="form-tab" data-val="edit">질문 편집 (' + curForm.questions.length + '/20)</button>' +
      '<button type="button" class="' + (tab === "results" ? "active" : "") + '" data-fb-act="form-tab" data-val="results">중도 포기 그래프 (' + curForm.submittedCount + ')</button>' +
      '<button type="button" class="' + (tab === "settings" ? "active" : "") + '" data-fb-act="form-tab" data-val="settings">단독 주소·QR</button></div></div>' + tabBody + '</div>' +
      '<div class="hf-bottom-bar"><button type="button" class="btn-sec" data-hf-act="set-step" data-val="2">← 2단계 화면 편집으로</button><button type="button" class="hf-next-pill-btn" data-hf-act="set-step" data-val="4">다음: 4단계 게시 & 주소·QR 받기 →</button></div>';
  }

  function renderStep4Publish(state, H, ed) {
    ensureData(state, H);
    var curSite = state.hfSites.find(function (s) { return s.id === state.hfActiveSiteId; }) || state.hfSites[0];
    var curForm = state.hfForms.find(function (f) { return f.id === state.hfActiveFormId; }) || state.hfForms[0];
    var slug = ed.slug || ("gosutem-swim-" + ed.presetId.toLowerCase()), pubUrl = "https://" + curSite.domain + "/p/" + slug, E = window.GOSU_STUDIO_ENGINE;
    return '<div class="studio-workspace"><div class="panel-card"><div class="panel-head"><h2>4단계 · 홈페이지 게시 & 배포 주소·QR 받기</h2><span class="badge-accent">배포 준비 완료</span></div>' +
      '<label class="field-label">홈페이지<input type="text" value="' + curSite.name + ' (' + curSite.domain + ')" readonly /></label>' +
      '<label class="field-label">영문 뒷주소(/p/)<input type="text" id="fb-pub-slug" value="' + slug + '" /></label>' +
      '<label class="field-label">연결된 설문 폼<input type="text" value="' + curForm.title + '" readonly /></label>' +
      '<div class="btn-row"><button type="button" class="btn-pri" data-fb-act="publish-now">🚀 지금 게시 & 추적 링크 발급</button><button type="button" class="btn-sec" data-fb-act="copy-url" data-val="' + pubUrl + '">주소 복사</button><button type="button" class="btn-sec cs-btn-green" data-hf-act="export-html">HTML 저장 ↗</button></div></div>' +
      '<div class="panel-card"><div class="panel-head"><h2>공유용 QR 코드</h2></div><div class="qr-wrap">' + (E ? E.buildQrSvg(pubUrl, 140) : '') + '<div><strong>' + ed.title + '</strong><p>' + pubUrl + '</p></div></div></div></div>' +
      '<div class="hf-bottom-bar"><button type="button" class="btn-sec" data-hf-act="set-step" data-val="3">← 3단계 설문 폼으로</button><button type="button" class="hf-next-pill-btn" data-menu-btn="home">완료: ④ 고객 응답·성과 보기로 이동 →</button></div>';
  }

  return {
    ensureData: ensureData, calcFormDropoff: calcFormDropoff, renderSiteBar: renderSiteBar,
    renderStep1Idea: renderStep1Idea, renderStep3Form: renderStep3Form, renderStep4Publish: renderStep4Publish,
    saveSites: function (s) { saveJson(SITES_KEY, s); }, saveForms: function (f) { saveJson(FORMS_KEY, f); }, saveCards: function (c) { saveJson(CARDS_KEY, c); }
  };
})();