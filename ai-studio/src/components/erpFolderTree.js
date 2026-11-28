/* 고수하우스(회사) 전사 ERP 좌측 네비게이션 표준 폴더 트리 & 핸디핏 사진 아카이빙 뷰어 (src/components/erpFolderTree.js · 15KB 이하) */
window.GOSU_FOLDER_TREE = (function () {
  function $(id) { return document.getElementById(id); }

  function ensureTreeState(state) {
    var seed = window.GOSU_FOLDER_TREE_SEED;
    if (!seed) return;
    if (!state.ftExpanded) {
      state.ftExpanded = { "root-common": true, "root-gosutem": true, "root-cea": true, "root-blog": true, "root-lab": true };
    }
    if (!state.ftSelectedId) state.ftSelectedId = "gosu-06-handyfit";
    if (typeof state.ftShowArchive !== "boolean") state.ftShowArchive = false;
    if (!state.ftSearchQuery) state.ftSearchQuery = "";
    if (!state.ftCustomArchived) {
      try {
        var raw = localStorage.getItem("gosu_erp_photo_archive_v25");
        state.ftCustomArchived = raw ? JSON.parse(raw) : [];
      } catch (e) {
        state.ftCustomArchived = [];
      }
    }
  }

  function saveCustomArchive(list) {
    try {
      localStorage.setItem("gosu_erp_photo_archive_v25", JSON.stringify(list));
    } catch (e) {}
  }

  function findFolderById(id) {
    var seed = window.GOSU_FOLDER_TREE_SEED;
    if (!seed) return null;
    for (var i = 0; i < seed.TREE_NODES.length; i++) {
      var group = seed.TREE_NODES[i];
      if (group.id === id) return group;
      var ch = group.children || [];
      for (var j = 0; j < ch.length; j++) {
        if (ch[j].id === id) return ch[j];
      }
    }
    return seed.TREE_NODES[1].children[6];
  }

  function archiveCurrentHandyfitToGosu(state, H, toast) {
    ensureTreeState(state);
    var preset = (H && H.landingPresets10 && H.landingPresets10.find(function (p) { return p.id === state.selectedLandingId; })) || (H && H.landingPresets10[0]);
    var now = new Date();
    var yyyy = now.getFullYear();
    var mm = String(now.getMonth() + 1).padStart(2, "0");
    var dd = String(now.getDate()).padStart(2, "0");
    var dateDot = yyyy + "." + mm + "." + dd;
    var idxNum = String(9 + state.ftCustomArchived.length).padStart(2, "0");
    var slug = (preset && preset.slug) || "gosutem-swim-skip3";
    var title = (preset && preset.title) || "수영 첫 달 사지 마세요 3가지";
    var item = {
      id: "PA-LIVE-" + idxNum,
      file: "hf-hero-" + slug.replace("gosutem-swim-", "") + ".png",
      stdName: idxNum + "_핸디핏_아카이빙_" + slug.replace(/-/g, "_") + "_v2.1(" + dateDot + ").png",
      landingFile: idxNum + "_고수템_핸디핏_랜딩_" + slug.replace(/-/g, "_") + "_v2.1(" + dateDot + ").html",
      slug: slug,
      tag: "실시간 아카이빙",
      desc: "ERP 핸디핏 빌더에서 고수템 06. 마케팅_채널_콘텐츠 > 01_핸디핏_랜딩_사진아카이빙 폴더로 직결 저장됨",
      landingTitle: title,
      ver: "v2.1(" + dateDot + ")"
    };
    state.ftCustomArchived.unshift(item);
    saveCustomArchive(state.ftCustomArchived);
    if (toast) toast("고수템 '06. 마케팅_채널_콘텐츠 > 01_핸디핏_랜딩_사진아카이빙'에 사진·랜딩 아카이빙 완료!");
    return item;
  }

  function renderPhotoCardSvg(p) {
    return '<div style="background:#141815;border:1px solid #2b332c;border-radius:8px;padding:10px;display:flex;flex-direction:column;gap:6px">' +
      '<div style="display:flex;justify-content:space-between;align-items:center">' +
        '<span class="badge-accent">' + p.tag + '</span>' +
        '<code style="font-size:10.5px;color:#9ef01a">' + p.file + '</code>' +
      '</div>' +
      '<div style="background:#1b221d;border:1px dashed #39463b;border-radius:6px;padding:10px;text-align:center">' +
        '<div style="font-size:11px;color:#a8b5aa;margin-bottom:4px">📦 인물 0% 스튜디오 정물 Flat-lay · Noto Sans KR</div>' +
        '<strong style="font-size:12.5px;color:#f3f6f4;display:block">' + p.landingTitle + '</strong>' +
        '<small style="font-size:11px;color:#86efac;display:block;margin-top:3px">' + p.desc + '</small>' +
      '</div>' +
      '<div style="font-size:11px;color:#cbd5e1;word-break:break-all"><b>표준 파일명:</b> <code>' + p.stdName + '</code></div>' +
      '<div style="display:flex;gap:6px;margin-top:2px">' +
        '<button type="button" class="btn-sm" data-ft-open-landing="' + p.slug + '">랜딩 빌더에서 열기</button>' +
        '<button type="button" class="btn-sm" data-ft-copy-path="G:\\내 드라이브\\@ GOSUTEM\\06. 마케팅_채널_콘텐츠\\01_핸디핏_랜딩_사진아카이빙\\01_핸디핏_실물플랫레이_생성사진_8종\\' + p.file + '">경로 복사</button>' +
      '</div>' +
    '</div>';
  }

  function render(state, H) {
    ensureTreeState(state);
    var mount = $("erp-folder-tree-mount");
    if (!mount) return;
    var seed = window.GOSU_FOLDER_TREE_SEED;
    if (!seed) return;

    var curFolder = findFolderById(state.ftSelectedId) || seed.TREE_NODES[1].children[6];
    var q = (state.ftSearchQuery || "").trim().toLowerCase();

    var leftTreeHtml = seed.TREE_NODES.map(function (group) {
      if (state.bizUnit && state.bizUnit !== "all" && group.biz !== "all" && group.biz !== state.bizUnit) {
        return "";
      }
      var isOpen = state.ftExpanded[group.id] !== false;
      var chHtml = !isOpen ? "" : (group.children || []).map(function (ch) {
        var active = ch.id === curFolder.id ? " active" : "";
        var highlight = ch.isPhotoArchive ? ' style="border-left:3px solid #9ef01a;background:rgba(158,240,26,0.08)"' : "";
        return '<button type="button" class="nav-btn' + active + '" data-ft-select="' + ch.id + '"' + highlight + '>' +
          '<span style="text-align:left;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">' + ch.icon + ' ' + ch.title + '</span>' +
          '<span class="nav-pill">' + (ch.badge || "") + '</span></button>';
      }).join("");

      return '<div style="margin-bottom:10px">' +
        '<button type="button" class="btn-sec" data-ft-toggle-group="' + group.id + '" style="width:100%;text-align:left;display:flex;justify-content:space-between;align-items:center;padding:7px 10px;font-weight:700;font-size:12px">' +
          '<span>' + group.icon + ' ' + group.title + '</span><span>' + (isOpen ? "▾" : "▸") + '</span>' +
        '</button>' +
        '<div class="nav-list" style="margin-top:4px;padding-left:6px">' + chHtml + '</div>' +
      '</div>';
    }).join("");

    var files = (curFolder.files || []).slice();
    if (curFolder.isPhotoArchive && state.ftCustomArchived.length) {
      state.ftCustomArchived.forEach(function (ca) {
        files.unshift({
          name: "01_핸디핏_실물플랫레이_생성사진_8종/" + ca.stdName + " + " + ca.landingFile,
          ver: ca.ver,
          kind: "image",
          size: "실시간동기화",
          status: "active",
          summary: ca.desc
        });
      });
    }

    var filteredFiles = files.filter(function (f) {
      if (!state.ftShowArchive && f.status === "archive") return false;
      if (q && f.name.toLowerCase().indexOf(q) === -1 && f.summary.toLowerCase().indexOf(q) === -1) return false;
      return true;
    });

    var photoGalleryHtml = "";
    if (curFolder.isPhotoArchive) {
      var allPhotos = (state.ftCustomArchived || []).concat(curFolder.photoGallery || []);
      photoGalleryHtml =
        '<div class="panel-card" style="margin-bottom:12px;border:1px solid #3a4b3c">' +
          '<div class="panel-head">' +
            '<div>' +
              '<h3>📸 고수템 핸디핏 생성 이미지 & 랜딩페이지 내부 사진 아카이빙 (' + allPhotos.length + '종)</h3>' +
              '<small style="color:#a8b5aa">외부 폴더 이동 없이 ERP 내부에서 핸디핏 생성 플랫레이 이미지와 랜딩페이지를 즉시 열람·연결합니다.</small>' +
            '</div>' +
            '<div style="display:flex;gap:6px">' +
              '<button type="button" class="btn-pri" id="btn-ft-archive-now">+ 현재 핸디핏 이미지·랜딩 즉시 아카이빙</button>' +
              '<button type="button" class="btn-sec" data-menu-btn="landing">랜딩 빌더로 이동</button>' +
            '</div>' +
          '</div>' +
          '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(255px,1fr));gap:10px;margin-top:10px">' +
            allPhotos.map(renderPhotoCardSvg).join("") +
          '</div>' +
        '</div>';
    }

    var rulesHtml = seed.NAMING_RULES.map(function (r) {
      return '<div style="background:#151916;border:1px solid #283029;border-radius:6px;padding:8px 10px">' +
        '<div style="font-size:11px;color:#9ef01a;font-weight:700">' + r.type + '</div>' +
        '<div style="font-size:11.5px;color:#e2e8f0;margin-top:2px">공식: <code>' + r.pattern + '</code></div>' +
        '<div style="font-size:11px;color:#94a3b8;margin-top:2px">예시: ' + r.example + '</div>' +
      '</div>';
    }).join("");

    mount.innerHTML =
      '<div class="panel-card" style="margin-bottom:12px;padding:12px 14px">' +
        '<div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px">' +
          '<div>' +
            '<span class="badge-accent">🏢 회사: 고수하우스 (GOSU HOUSE)</span> ' +
            '<span class="badge-sub">내부 업무: ① 고수템 · ② 씨이에이(CEA) · ③ 콘텐츠 정기 발행 · ④ 대학원/연구</span>' +
            '<h2 style="margin:4px 0 2px 0;font-size:16px">전사 G드라이브 표준 폴더 트리 & 핸디핏 사진 아카이빙 내부 탐색기</h2>' +
            '<small style="color:#a8b5aa">모든 파일은 100% G드라이브(<code>G:\\내 드라이브</code>)에 단일 저장되며, <code>v1.x(2026.xx.xx)</code> 네이밍과 <code>_archive</code> 규칙으로 실시간 동기화됩니다.</small>' +
          '</div>' +
          '<div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">' +
            '<input type="text" id="ft-search-in" value="' + (state.ftSearchQuery || "") + '" placeholder="폴더 내 파일·주제 검색…" style="width:180px" />' +
            '<label style="font-size:12px;display:flex;align-items:center;gap:4px;cursor:pointer">' +
              '<input type="checkbox" id="ft-toggle-archive"' + (state.ftShowArchive ? " checked" : "") + ' /> _archive(구버전·중복격리) 포함' +
            '</label>' +
          '</div>' +
        '</div>' +
        '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:8px;margin-top:10px">' + rulesHtml + '</div>' +
      '</div>' +
      '<div style="display:grid;grid-template-columns:290px 1fr;gap:14px;align-items:start">' +
        '<aside class="panel-card" style="padding:12px;max-height:780px;overflow-y:auto">' +
          '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">' +
            '<strong style="font-size:13px">📁 좌측 표준 폴더 네비게이션</strong>' +
            '<span class="badge-sub">G드라이브 직결</span>' +
          '</div>' +
          leftTreeHtml +
        '</aside>' +
        '<div>' +
          '<div class="panel-card" style="margin-bottom:12px">' +
            '<div class="panel-head">' +
              '<div>' +
                '<h2>' + curFolder.icon + ' ' + curFolder.title + '</h2>' +
                '<div style="font-size:11.5px;color:#9ef01a;margin-top:2px">📍 G드라이브 경로: <code>' + curFolder.gPath + '</code></div>' +
              '</div>' +
              '<div style="display:flex;gap:6px">' +
                '<button type="button" class="btn-sec" data-ft-copy-path="' + curFolder.gPath + '">폴더 경로 복사</button>' +
                '<button type="button" class="btn-pri" id="btn-ft-archive-quick">+ 현재 작업 아카이빙</button>' +
              '</div>' +
            '</div>' +
            '<div class="table-wrap" style="margin-top:8px">' +
              '<table>' +
                '<thead><tr><th>파일 / 하위 폴더명 (표준 네이밍)</th><th>버전·일자</th><th>크기/수량</th><th>상태</th><th>설명 및 작업</th></tr></thead>' +
                '<tbody>' +
                  filteredFiles.map(function (f) {
                    var badgeCls = f.status === "archive" ? "badge-sub" : "badge-accent";
                    var badgeTxt = f.status === "archive" ? "_archive 보관" : "최신 Active";
                    return '<tr>' +
                      '<td><strong>' + f.name + '</strong></td>' +
                      '<td><code>' + f.ver + '</code></td>' +
                      '<td>' + f.size + '</td>' +
                      '<td><span class="' + badgeCls + '">' + badgeTxt + '</span></td>' +
                      '<td>' + f.summary + ' <button type="button" class="btn-sm" data-ft-copy-path="' + curFolder.gPath + '\\' + f.name + '">경로 복사</button></td>' +
                    '</tr>';
                  }).join("") +
                '</tbody>' +
              '</table>' +
            '</div>' +
          '</div>' +
          photoGalleryHtml +
        '</div>' +
      '</div>';
  }

  function handleClick(target, state, H, setMenu, copyText, toast) {
    ensureTreeState(state);
    var selBtn = target.closest("[data-ft-select]");
    if (selBtn) {
      state.ftSelectedId = selBtn.getAttribute("data-ft-select");
      render(state, H);
      return true;
    }
    var grpBtn = target.closest("[data-ft-toggle-group]");
    if (grpBtn) {
      var gid = grpBtn.getAttribute("data-ft-toggle-group");
      state.ftExpanded[gid] = state.ftExpanded[gid] === false;
      render(state, H);
      return true;
    }
    var copyBtn = target.closest("[data-ft-copy-path]");
    if (copyBtn) {
      copyText(copyBtn.getAttribute("data-ft-copy-path"), "G드라이브 표준 경로");
      return true;
    }
    var openLnd = target.closest("[data-ft-open-landing]");
    if (openLnd) {
      var slug = openLnd.getAttribute("data-ft-open-landing");
      var found = H && H.landingPresets10 && H.landingPresets10.find(function (p) { return p.slug === slug; });
      if (found) state.selectedLandingId = found.id;
      setMenu("landing");
      toast(slug + " 랜딩을 편집기로 불러왔어요.");
      return true;
    }
    if (target.id === "btn-ft-archive-now" || target.id === "btn-ft-archive-quick") {
      archiveCurrentHandyfitToGosu(state, H, toast);
      state.ftSelectedId = "gosu-06-handyfit";
      render(state, H);
      return true;
    }
    return false;
  }

  return {
    ensureTreeState: ensureTreeState,
    findFolderById: findFolderById,
    archiveCurrentHandyfitToGosu: archiveCurrentHandyfitToGosu,
    render: render,
    handleClick: handleClick
  };
})();
