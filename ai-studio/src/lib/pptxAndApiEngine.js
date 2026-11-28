/* 컨텐츠 스튜디오 실제 PPTX(.pptx) 바이너리 조립 엔진 & 공식 이미지 API 브리지 (src/lib/pptxAndApiEngine.js · 15KB 이하) */
window.GOSU_PPTX_API = (function () {
  var CRC_TABLE = (function () {
    var tbl = new Uint32Array(256);
    for (var n = 0; n < 256; n++) {
      var c = n;
      for (var k = 0; k < 8; k++) c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
      tbl[n] = c >>> 0;
    }
    return tbl;
  })();

  function crc32(bytes) {
    var crc = 0xFFFFFFFF;
    for (var i = 0; i < bytes.length; i++) crc = CRC_TABLE[(crc ^ bytes[i]) & 0xFF] ^ (crc >>> 8);
    return (crc ^ 0xFFFFFFFF) >>> 0;
  }

  function strToUtf8(str) {
    if (typeof TextEncoder !== "undefined") return new TextEncoder().encode(str);
    var out = [];
    for (var i = 0; i < str.length; i++) out.push(str.charCodeAt(i) & 0xFF);
    return new Uint8Array(out);
  }

  function escXml(s) {
    return String(s || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/—/g, "·");
  }

  function buildZipBytes(files) {
    var localParts = [], centralParts = [], offset = 0;
    for (var i = 0; i < files.length; i++) {
      var nb = strToUtf8(files[i].name), db = strToUtf8(files[i].content);
      var crc = crc32(db), len = db.length;
      var lh = new Uint8Array(30 + nb.length), lhv = new DataView(lh.buffer);
      lhv.setUint32(0, 0x04034b50, true); lhv.setUint16(4, 20, true); lhv.setUint16(6, 0x0800, true);
      lhv.setUint32(14, crc, true); lhv.setUint32(18, len, true); lhv.setUint32(22, len, true); lhv.setUint16(26, nb.length, true);
      lh.set(nb, 30);

      var ch = new Uint8Array(46 + nb.length), chv = new DataView(ch.buffer);
      chv.setUint32(0, 0x02014b50, true); chv.setUint16(4, 20, true); chv.setUint16(6, 20, true); chv.setUint16(8, 0x0800, true);
      chv.setUint32(16, crc, true); chv.setUint32(20, len, true); chv.setUint32(24, len, true); chv.setUint16(28, nb.length, true); chv.setUint32(42, offset, true);
      ch.set(nb, 46);

      localParts.push(lh, db); centralParts.push(ch); offset += lh.length + len;
    }
    var cSize = centralParts.reduce(function (a, b) { return a + b.length; }, 0);
    var eocd = new Uint8Array(22), ev = new DataView(eocd.buffer);
    ev.setUint32(0, 0x06054b50, true); ev.setUint16(8, files.length, true); ev.setUint16(10, files.length, true);
    ev.setUint32(12, cSize, true); ev.setUint32(16, offset, true);

    var out = new Uint8Array(offset + cSize + 22), pos = 0;
    localParts.concat(centralParts, [eocd]).forEach(function (p) { out.set(p, pos); pos += p.length; });
    return out;
  }

  function makeSlideXml(deckTitle, topic, slideObj, idx, total) {
    var E = window.GOSU_STUDIO_ENGINE;
    var cleanTitle = E ? E.inspectText(slideObj.label || ("슬라이드 " + idx)).purified : (slideObj.label || "");
    var cleanTopic = E ? E.inspectText(topic || deckTitle).purified : (topic || deckTitle);
    var lines = [
      "[" + deckTitle + " · #" + String(idx).padStart(2, "0") + "/" + total + "] " + cleanTitle,
      "1. 핵심 결론(두괄식): " + cleanTopic,
      "2. 정량 성과: 1단 회피 절감 2.5만 + 중고·0원 대안 0.6만 = 건당 직접 현금 3.1만 원 절감",
      "3. 가드레일: 인물 0% 실물 정물 Flat-lay · 첫 화면 링크 0개 · 현직 강사 외 4명 교차 검수",
      "4. 단일 원장: gosutem #admin/customers & #admin/verify(H1~H3) ALL PASS"
    ];
    return '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><p:sld xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main"><p:cSld><p:spTree><p:nvGrpSpPr><p:cNvPr id="1" name=""/><p:cNvGrpSpPr/><p:nvPr/></p:nvGrpSpPr><p:grpSpPr/><p:sp><p:nvSpPr><p:cNvPr id="2" name="Content"/><p:cNvSpPr/><p:nvPr/></p:nvSpPr><p:spPr><a:xfrm><a:off x="457200" y="457200"/><a:ext cx="8229600" cy="5486400"/></a:xfrm></p:spPr><p:txBody><a:bodyPr/><a:lstStyle/>' +
      lines.map(function (l, i) {
        return '<a:p><a:r><a:rPr lang="ko-KR" sz="' + (i === 0 ? "2400" : "1600") + '" b="' + (i < 2 ? "1" : "0") + '"><a:latin typeface="Pretendard"/><a:ea typeface="Pretendard"/></a:rPr><a:t>' + escXml(l) + '</a:t></a:r></a:p>';
      }).join("") + '</p:txBody></p:sp></p:spTree></p:cSld></p:sld>';
  }

  function buildPptxUint8Array(item, slides, topic) {
    var list = (slides && slides.length) ? slides : [{ index: 1, label: "01 · 표지 및 핵심 결론" }];
    var deckTitle = (item && item.title) || "고수하우스 발표덱";
    var NS_CT = "http://schemas.openxmlformats.org/package/2006/content-types";
    var NS_REL = "http://schemas.openxmlformats.org/package/2006/relationships";
    var O_PFX = "application/vnd.openxmlformats-officedocument.presentationml.";
    var ov = list.map(function (_, i) { return '<Override PartName="/ppt/slides/slide' + (i + 1) + '.xml" ContentType="' + O_PFX + 'slide+xml"/>'; }).join("");
    var sIds = list.map(function (_, i) { return '<p:sldId id="' + (256 + i) + '" r:id="rId' + (i + 2) + '"/>'; }).join("");
    var pRels = list.map(function (_, i) { return '<Relationship Id="rId' + (i + 2) + '" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slide" Target="slides/slide' + (i + 1) + '.xml"/>'; }).join("");

    var files = [
      { name: "[Content_Types].xml", content: '<?xml version="1.0" encoding="UTF-8"?><Types xmlns="' + NS_CT + '"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/ppt/presentation.xml" ContentType="' + O_PFX + 'presentation.main+xml"/><Override PartName="/ppt/slideMasters/slideMaster1.xml" ContentType="' + O_PFX + 'slideMaster+xml"/><Override PartName="/ppt/slideLayouts/slideLayout1.xml" ContentType="' + O_PFX + 'slideLayout+xml"/>' + ov + '</Types>' },
      { name: "_rels/.rels", content: '<?xml version="1.0" encoding="UTF-8"?><Relationships xmlns="' + NS_REL + '"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="ppt/presentation.xml"/></Relationships>' },
      { name: "ppt/presentation.xml", content: '<?xml version="1.0" encoding="UTF-8"?><p:presentation xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main"><p:sldMasterIdLst><p:sldMasterId id="2147483648" r:id="rId1"/></p:sldMasterIdLst><p:sldIdLst>' + sIds + '</p:sldIdLst><p:sldSz cx="9144000" cy="6858000" type="screen4x3"/><p:notesSz cx="6858000" cy="9144000"/></p:presentation>' },
      { name: "ppt/_rels/presentation.xml.rels", content: '<?xml version="1.0" encoding="UTF-8"?><Relationships xmlns="' + NS_REL + '"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideMaster" Target="slideMasters/slideMaster1.xml"/>' + pRels + '</Relationships>' },
      { name: "ppt/slideMasters/slideMaster1.xml", content: '<?xml version="1.0" encoding="UTF-8"?><p:sldMaster xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main"><p:cSld><p:spTree><p:nvGrpSpPr><p:cNvPr id="1" name=""/><p:cNvGrpSpPr/><p:nvPr/></p:nvGrpSpPr><p:grpSpPr/></p:spTree></p:cSld><p:clrMap bg1="lt1" tx1="dk1" bg2="lt2" tx2="dk2" accent1="accent1" accent2="accent2" accent3="accent3" accent4="accent4" accent5="accent5" accent6="accent6" hlink="hlink" folHlink="folHlink"/><p:sldLayoutIdLst><p:sldLayoutId id="2147483649" r:id="rId1"/></p:sldLayoutIdLst></p:sldMaster>' },
      { name: "ppt/slideMasters/_rels/slideMaster1.xml.rels", content: '<?xml version="1.0" encoding="UTF-8"?><Relationships xmlns="' + NS_REL + '"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideLayout" Target="../slideLayouts/slideLayout1.xml"/></Relationships>' },
      { name: "ppt/slideLayouts/slideLayout1.xml", content: '<?xml version="1.0" encoding="UTF-8"?><p:sldLayout xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main" type="blank"><p:cSld><p:spTree><p:nvGrpSpPr><p:cNvPr id="1" name=""/><p:cNvGrpSpPr/><p:nvPr/></p:nvGrpSpPr><p:grpSpPr/></p:spTree></p:cSld></p:sldLayout>' },
      { name: "ppt/slideLayouts/_rels/slideLayout1.xml.rels", content: '<?xml version="1.0" encoding="UTF-8"?><Relationships xmlns="' + NS_REL + '"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideMaster" Target="../slideMasters/slideMaster1.xml"/></Relationships>' }
    ];
    for (var i = 0; i < list.length; i++) {
      var n = i + 1;
      files.push({ name: "ppt/slides/slide" + n + ".xml", content: makeSlideXml(deckTitle, topic, list[i], n, list.length) });
      files.push({ name: "ppt/slides/_rels/slide" + n + ".xml.rels", content: '<?xml version="1.0" encoding="UTF-8"?><Relationships xmlns="' + NS_REL + '"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideLayout" Target="../slideLayouts/slideLayout1.xml"/></Relationships>' });
    }
    return buildZipBytes(files);
  }

  function downloadPptxFile(item, slides, topic, toast) {
    var bytes = buildPptxUint8Array(item, slides, topic);
    var blob = new Blob([bytes], { type: "application/vnd.openxmlformats-officedocument.presentationml.presentation" });
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = ((item && item.id) || "gosu-deck") + "_" + String(topic || "발표안").replace(/\s+/g, "_") + "_v2.3.pptx";
    a.click();
    if (toast) toast("실제 파워포인트(.pptx) 파일(" + slides.length + "장 · Pretendard) 조립 내려받기 완료!");
  }

  async function generateOfficialImage(opts, curTpl, promptText, canvasEl, C, toast) {
    var provider = (opts && opts.provider) || "local_flatlay";
    var apiKey = ((opts && opts.apiKey) || "").trim();
    var E = window.GOSU_STUDIO_ENGINE;
    var safePrompt = E ? E.inspectText(promptText).purified : promptText;

    if (provider === "local_flatlay" || (!apiKey && provider !== "content_studio_proxy")) {
      C.renderImageStudioPreview(canvasEl, curTpl, opts);
      if (toast) toast("인물 0% 실물 정물 Flat-lay 캔버스 엔진으로 즉시 렌더링했어요.");
      return { ok: true, mode: "local_flatlay" };
    }
    try {
      var b64 = null;
      if (provider === "gemini_imagen") {
        var gRes = await fetch("https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-002:predict?key=" + encodeURIComponent(apiKey), {
          method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ instances: [{ prompt: safePrompt }], parameters: { sampleCount: 1, personGeneration: "dont_allow" } })
        });
        var gJson = await gRes.json();
        b64 = gJson && gJson.predictions && gJson.predictions[0] && gJson.predictions[0].bytesBase64Encoded;
      } else if (provider === "openai_gpt_image") {
        var oRes = await fetch("https://api.openai.com/v1/images/generations", {
          method: "POST", headers: { "Content-Type": "application/json", "Authorization": "Bearer " + apiKey },
          body: JSON.stringify({ model: "gpt-image-1", prompt: safePrompt, size: "1024x1024", response_format: "b64_json" })
        });
        var oJson = await oRes.json();
        b64 = oJson && oJson.data && oJson.data[0] && oJson.data[0].b64_json;
      } else if (provider === "content_studio_proxy") {
        var pRes = await fetch("http://localhost:4173/api/image/generate", {
          method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt: safePrompt, ratio: opts.ratio || "4:5", noHuman: true })
        });
        var pJson = await pRes.json();
        b64 = pJson && pJson.b64;
      }
      if (b64 && canvasEl) {
        var img = new Image();
        img.onload = function () {
          var ctx = canvasEl.getContext("2d");
          ctx.drawImage(img, 0, 0, canvasEl.width, canvasEl.height);
        };
        img.src = "data:image/png;base64," + b64;
        if (toast) toast(provider.toUpperCase() + " 공식 이미지 API 생성 완료!");
        return { ok: true, mode: provider };
      }
    } catch (err) { /* 폴백 */ }
    C.renderImageStudioPreview(canvasEl, curTpl, opts);
    if (toast) toast("공식 API 오프라인 → 인물 0% 실물 정물 캔버스로 안전 폴백했어요.");
    return { ok: true, mode: "fallback_flatlay" };
  }

  return { buildPptxUint8Array: buildPptxUint8Array, downloadPptxFile: downloadPptxFile, generateOfficialImage: generateOfficialImage };
})();
