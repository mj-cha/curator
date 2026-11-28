/* 고수템 본체(#admin) ↔ 업무 스튜디오 단일 DB·Supabase 직결 브리지 (src/lib/erpDbBridge.js · 15KB 이하) */
window.GOSU_ERP_DB = (function () {
  var DB_KEY = "gosutem_unified_db_v1", PRE_KEY = "gosutem-admin-preorders", SB_KEY = "gosutem_supabase_config_v1";
  function $(id) { return document.getElementById(id); }
  function valOf(id, fb) { var el = $(id); return (el && el.value ? el.value.trim() : "") || fb || ""; }

  function syncAdmin(db) {
    try {
      var rows = (db.customers || []).map(function (c) {
        return { id: c.id, email: c.email || c.contact || "guest@gosutem.com", interest: c.interest || c.summary || "수영 첫 달 준비물", other: "", openBag: c.openBag !== "아니오", at: c.createdAt || db.syncedAt, utm: { utm_source: c.utm_source || "instagram", utm_campaign: c.utm_campaign || "2611_erp" } };
      });
      localStorage.setItem(PRE_KEY, JSON.stringify(rows)); localStorage.setItem("gosutem-preorders", JSON.stringify(rows));
      if (typeof BroadcastChannel !== "undefined") { var bc = new BroadcastChannel("gosutem_erp_sync_v1"); bc.postMessage({ type: "gosutem_erp_sync", count: rows.length }); bc.close(); }
    } catch (e) {}
  }

  function getSbCfg() {
    try { var r = JSON.parse(localStorage.getItem(SB_KEY) || "null"); if (r && r.url && r.anonKey) return r; } catch (e) {}
    return { url: "", anonKey: "" };
  }

  function pushSb(row) {
    var cfg = getSbCfg(); if (!cfg.url || !cfg.anonKey || typeof fetch === "undefined") return;
    fetch(cfg.url.replace(/\/+$/, "") + "/rest/v1/gosutem_preorders", {
      method: "POST", headers: { apikey: cfg.anonKey, Authorization: "Bearer " + cfg.anonKey, "Content-Type": "application/json", Prefer: "return=minimal" },
      body: JSON.stringify({ email: row.email || row.contact, interest: row.interest || row.summary, interest_other: row.biz || "gosutem", open_bag: row.openBag !== "아니오", privacy_agreed: true, utm: { utm_source: row.utm_source || "instagram", utm_campaign: row.utm_campaign || "2611_erp" } })
    }).catch(function () {});
  }

  function loadDb() {
    try { var raw = JSON.parse(localStorage.getItem(DB_KEY) || "null"); if (raw && Array.isArray(raw.customers)) return raw; } catch (e) {}
    var SD = window.GOSU_FORMS_SEED || {};
    var init = { version: "3.0", syncedAt: "2026-11-28 19:20", customers: JSON.parse(JSON.stringify(SD.customers || [])), events: JSON.parse(JSON.stringify(SD.events || [])), hypotheses: JSON.parse(JSON.stringify(SD.hypotheses || [])) };
    syncAdmin(init); return init;
  }

  function saveDb(db) {
    db.syncedAt = new Date().toISOString().slice(0, 16).replace("T", " ");
    try { localStorage.setItem(DB_KEY, JSON.stringify(db)); } catch (e) {}
    syncAdmin(db);
  }

  function getCustomers() { return loadDb().customers; }

  function addCustomerResponse(entry, H) {
    var db = loadDb(), cStr = entry.contact || "010-8821-3100", isMail = cStr.indexOf("@") !== -1;
    var row = {
      id: "CUS-" + String(db.customers.length + 69).padStart(3, "0"), formId: entry.formId || "FRM-GOSU-01", biz: entry.biz || "gosutem",
      kind: entry.kind || (entry.biz === "cea" ? "문의" : "사전신청"), name: entry.name || (isMail ? cStr.split("@")[0] : "입문자_" + (db.customers.length + 69)),
      email: isMail ? cStr : (entry.email || cStr), contact: cStr, interest: entry.interest || (entry.biz === "cea" ? "현대차·EcoVadis ESG 12과정" : "수영 첫 달 준비물"),
      openBag: entry.openBag || "예", role: entry.role || "비회원", summary: entry.summary || "무가입 체크리스트 1초 저장",
      utm_source: entry.utm_source || "instagram", utm_campaign: entry.utm_campaign || "2611_swim_reels_01",
      src: (entry.utm_source || "instagram") + "/" + (entry.utm_campaign || "2611_swim_reels_01"),
      savedAmount: entry.savedAmount !== undefined ? entry.savedAmount : 31000, createdAt: new Date().toISOString().slice(0, 16).replace("T", " ")
    };
    db.customers.unshift(row);
    db.events.unshift({ id: "EVT-" + (db.events.length + 501), type: "form_submit", slug: entry.slug || "gosutem-swim-lnd-01", fId: "F-104", hId: "H3", ts: row.createdAt });
    saveDb(db); pushSb(row);
    if (H && H.surveyDropoff) { H.surveyDropoff.submittedCount = (H.surveyDropoff.submittedCount || 72) + 1; H.surveyDropoff.openedCount = (H.surveyDropoff.openedCount || 173) + 1; }
    return row;
  }

  function trackEvent(type, slug, hId) {
    var db = loadDb(), ev = { id: "EVT-" + (db.events.length + 501), type: type || "page_view", slug: slug || "gosutem-swim-lnd-01", fId: "F-101", hId: hId || "H1", ts: new Date().toISOString().slice(0, 16).replace("T", " ") };
    db.events.unshift(ev); saveDb(db); return ev;
  }

  function dlBlob(content, mime, name, toast, msg) {
    if (typeof Blob !== "undefined" && typeof URL !== "undefined" && URL.createObjectURL) {
      var a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([content], { type: mime })); a.download = name; a.click();
    }
    if (toast) toast(msg);
  }

  function exportCustomersCsv(toast) {
    var list = getCustomers(), lines = ["id,kind,name,email,contact,interest,openBag,src,utm_source,utm_campaign,biz,role,savedAmount,createdAt,summary"];
    for (var i = 0; i < list.length; i++) {
      var r = list[i];
      lines.push([r.id, r.kind || r.role, r.name || r.role, r.email || "", r.contact, '"' + String(r.interest || r.summary || "").replace(/"/g, '""') + '"', r.openBag || "예", r.src || "instagram/2611_erp", r.utm_source || "instagram", r.utm_campaign || "2611_erp", r.biz || "gosutem", r.role || "비회원", r.savedAmount || 31000, r.createdAt, '"' + String(r.summary || "").replace(/"/g, '""') + '"'].join(","));
    }
    dlBlob("\uFEFF" + lines.join("\n"), "text/csv;charset=utf-8", "gosutem_admin_customers_v3.0.csv", toast, "#admin/customers CSV 저장 완료");
  }

  function exportUnifiedDbJson(state, H, toast) {
    var db = loadDb(), payload = {
      schema: "gosutem_unified_erp_db_v3.0", exportedAt: new Date().toISOString(),
      gosutem_landings: (state && state.hfCards) || (H && H.landingPresets10) || [], gosutem_forms: (state && state.hfForms) || [],
      gosutem_form_responses: db.customers, gosutem_utm_links: (H && H.utmLinks) || [], gosutem_events: db.events, gosutem_verify_hypotheses: db.hypotheses
    };
    dlBlob(JSON.stringify(payload, null, 2), "application/json;charset=utf-8", "gosutem_unified_db_v3.0.json", toast, "단일 DB JSON 저장 완료");
    return payload;
  }

  function renderErpDbPanel(state, H) {
    var mount = $("erp-db-bridge-mount"); if (!mount) return;
    var db = loadDb(), FB = window.GOSU_FORM_BUILDER, sbCfg = getSbCfg(), sbOn = !!(sbCfg.url && sbCfg.anonKey);
    if (FB && state) FB.ensureData(state, H);
    var lCnt = state && state.hfCards ? state.hfCards.length : 10, fCnt = state && state.hfForms ? state.hfForms.length : 2, uCnt = H && H.utmLinks ? H.utmLinks.length : 5;
    if (window.GOSU_STUDIO_VIEWS && window.GOSU_STUDIO_VIEWS.buildErpDbHtml) {
      mount.innerHTML = window.GOSU_STUDIO_VIEWS.buildErpDbHtml(db, state, lCnt, fCnt, uCnt, sbCfg, sbOn);
    }
  }

  function handleAction(t, state, H, copyText, toast, renderAll) {
    var dbBtn = t.closest("[data-db-act]");
    if (dbBtn) {
      var dAct = dbBtn.getAttribute("data-db-act");
      if (dAct === "export-csv") exportCustomersCsv(toast);
      else if (dAct === "export-json") exportUnifiedDbJson(state, H, toast);
      else if (dAct === "toggle-sb-cfg") { state.showSbConfig = !state.showSbConfig; renderAll(); }
      else if (dAct === "save-sb-cfg") {
        var u = valOf("db-sb-url"), k = valOf("db-sb-key");
        try { if (!u || !k) localStorage.removeItem(SB_KEY); else localStorage.setItem(SB_KEY, JSON.stringify({ url: u, anonKey: k })); } catch (e) {}
        state.showSbConfig = false; renderAll(); toast(u && k ? "Supabase 실서버 저장 완료" : "이 기기 공유 모드 전환");
      } else if (dAct === "sim-track") {
        trackEvent("h3_pick", "gosutem-swim-lnd-01", "H3");
        if (H && H.utmLinks && H.utmLinks[0]) { H.utmLinks[0].visits += 1; H.utmLinks[0].clicks += 1; }
        renderAll(); toast("방문·선택 기록 추가됨");
      }
      return true;
    }

    var fbBtn = t.closest("[data-fb-act]"); if (!fbBtn) return false;
    var FB = window.GOSU_FORM_BUILDER, E = window.GOSU_STUDIO_ENGINE; FB.ensureData(state, H);
    var act = fbBtn.getAttribute("data-fb-act"), val = fbBtn.getAttribute("data-val");
    var curForm = state.hfForms.find(function (f) { return f.id === state.hfActiveFormId; }) || state.hfForms[0];

    if (act === "pick-site") {
      state.hfActiveSiteId = val; var site = state.hfSites.find(function (s) { return s.id === val; });
      if (site && site.biz) state.bizUnit = site.biz; toast("홈페이지 전환 완료");
    } else if (act === "toggle-new-site") state.hfShowNewSite = !state.hfShowNewSite;
    else if (act === "create-site") {
      var name = valOf("fb-new-site-name", "신규 홈페이지"), domain = valOf("fb-new-site-domain", "new-site.kr");
      var ns = { id: "site-" + Date.now().toString(36), biz: state.bizUnit === "all" ? "gosutem" : state.bizUnit, name: name, domain: domain, color: valOf("fb-new-site-color", "#0C3C78"), tone: valOf("fb-new-site-tone", "단문·금지어0건") };
      state.hfSites.push(ns); state.hfActiveSiteId = ns.id; state.hfShowNewSite = false;
      state.hfCards.unshift({ id: "CRD-" + Date.now().toString(36), presetId: "LND-01", siteId: ns.id, title: "[" + name + "] 메인 랜딩", slug: domain.split(".")[0] + "-main", published: true, formId: curForm.id, visits: 10, applies: 2 });
      FB.saveSites(state.hfSites); FB.saveCards(state.hfCards); toast("홈페이지 등록 완료");
    } else if (act === "open-card-editor") { state.selectedLandingId = val; if (state.hfEd) state.hfEd.step = 2; toast("2단계 화면 편집기로 이동"); }
    else if (act === "toggle-card-pub") {
      var card = state.hfCards.find(function (c) { return c.id === val; });
      if (card) { card.published = !card.published; FB.saveCards(state.hfCards); toast("공개 상태 전환 완료"); }
    } else if (act === "clone-card") {
      var orig = state.hfCards.find(function (c) { return c.id === val; });
      if (orig) { var cp = JSON.parse(JSON.stringify(orig)); cp.id = "CRD-" + Date.now().toString(36); cp.title = orig.title + " (A/B)"; cp.slug = orig.slug + "-ab"; state.hfCards.unshift(cp); FB.saveCards(state.hfCards); toast("1초 복제 완료"); }
    } else if (act === "copy-url") { copyText(val, "주소"); return true; }
    else if (act === "generate-from-idea") {
      if (state.hfEd) {
        state.hfEd.title = E.inspectText(valOf("fb-idea-title", state.hfEd.title)).purified;
        if (state.hfEd.sections[0]) { state.hfEd.sections[0].headline = state.hfEd.title; state.hfEd.sections[0].cta = valOf("fb-idea-cta", "체크리스트 1초 저장"); }
        if (state.hfEd.sections[1]) state.hfEd.sections[1].desc = E.inspectText(valOf("fb-idea-pain")).purified;
        if (state.hfEd.sections[3]) state.hfEd.sections[3].desc = E.inspectText(valOf("fb-idea-sol")).purified;
        state.hfEd.step = 2;
      }
      toast("초안 반영 후 2단계 이동 완료");
    } else if (act === "form-tab") state.hfFormTab = val;
    else if (act === "toggle-privacy") { curForm.privacyConsent = curForm.privacyConsent === false; FB.saveForms(state.hfForms); }
    else if (act === "toggle-quicksave") { curForm.quickSaveBlock = curForm.quickSaveBlock === false; FB.saveForms(state.hfForms); }
    else if (act === "new-form") {
      var nf = JSON.parse(JSON.stringify(curForm)); nf.id = "FRM-" + Date.now().toString(36).toUpperCase().slice(-4); nf.title = "[" + state.bizUnit.toUpperCase() + "] 신규 폼 (" + nf.id + ")";
      state.hfForms.unshift(nf); state.hfActiveFormId = nf.id; FB.saveForms(state.hfForms); toast("새 폼 생성 완료");
    } else if (act === "add-question") {
      if (curForm.questions.length >= 20) { toast("최대 20문항까지 가능해요."); return true; }
      curForm.questions.push({ id: "Q" + (curForm.questions.length + 1), type: valOf("fb-new-q-type", "객관식"), req: true, title: E.inspectText(valOf("fb-new-q-title", "신규 검증 질문")).purified, options: "기본 옵션", topAnswer: "집계 중", dropCount: 0, dropPct: 0.0 });
      FB.saveForms(state.hfForms); toast("질문 추가 완료");
    } else if (act === "move-q") {
      var idx = Number(fbBtn.getAttribute("data-idx")), to = idx + Number(fbBtn.getAttribute("data-dir"));
      if (to >= 0 && to < curForm.questions.length) { var mq = curForm.questions.splice(idx, 1)[0]; curForm.questions.splice(to, 0, mq); curForm.questions.forEach(function (q, i) { q.id = "Q" + (i + 1); }); FB.saveForms(state.hfForms); }
    } else if (act === "del-q") {
      curForm.questions.splice(Number(fbBtn.getAttribute("data-idx")), 1); curForm.questions.forEach(function (q, i) { q.id = "Q" + (i + 1); }); FB.saveForms(state.hfForms); toast("질문 삭제 완료");
    } else if (act === "simulate-submit") {
      curForm.submittedCount = (curForm.submittedCount || 72) + 1; curForm.openedCount = (curForm.openedCount || 173) + 1; FB.saveForms(state.hfForms);
      addCustomerResponse({ formId: curForm.id, biz: curForm.biz || "gosutem", contact: valOf("fb-sim-contact", "010-8821-3100"), summary: curForm.title + " 응답 완료" }, H);
      state.hfFormTab = "results"; toast("#admin/customers 단일 원장 적재 완료!");
    } else if (act === "export-csv") { exportCustomersCsv(toast); return true; }
    else if (act === "publish-now") {
      var slugVal = valOf("fb-pub-slug", "gosutem-swim-v30"); if (state.hfEd) state.hfEd.slug = slugVal;
      var newUtm = E.createUtmEntry("[" + state.bizUnit.toUpperCase() + "] 게시", "handyfit_cms", "landing", slugVal, slugVal);
      newUtm.biz = state.bizUnit === "all" ? "gosutem" : state.bizUnit;
      H.utmLinks.unshift(newUtm); trackEvent("page_view", slugVal, "H1"); toast("🚀 /p/" + slugVal + " 게시 완료!");
    }
    renderAll(); return true;
  }

  return {
    loadDb: loadDb, getCustomers: getCustomers, addCustomerResponse: addCustomerResponse, trackEvent: trackEvent,
    exportCustomersCsv: exportCustomersCsv, exportUnifiedDbJson: exportUnifiedDbJson, renderErpDbPanel: renderErpDbPanel, handleAction: handleAction
  };
})();