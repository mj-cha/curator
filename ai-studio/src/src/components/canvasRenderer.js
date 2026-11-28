/* 로보엠디 × 핸디핏 통합 고해상도 캔버스 렌더러 (src/components/canvasRenderer.js)
   - 모드 1: AI 이미지 만들기 (인물 0% 탑뷰 정물 Flat-lay + 사지 마 스탬프 + 강사 검수 배지 시뮬레이션)
   - 모드 2: AI 동영상 만들기 (9:16 세이프존 상130·하260·좌76·우96 + 상단 진행바 + 핸디핏 4단 자막)
   - 모드 3: 템플릿 디자인 만들기 (1080×1350 / 1600×900 에디토리얼 카드 PNG 즉시 생성) */
window.GOSU_CANVAS_RENDERER = (function () {
  var FONT = '"Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, "Apple SD Gothic Neo", sans-serif';

  function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }

  function wrapLines(ctx, text, maxW, maxLines) {
    var rawLines = String(text || "").split("\n");
    var out = [];
    for (var r = 0; r < rawLines.length; r++) {
      var line = "";
      var str = rawLines[r];
      for (var i = 0; i < str.length; i++) {
        var ch = str[i];
        if (ctx.measureText(line + ch).width > maxW && line) {
          out.push(line);
          line = ch.trimStart();
          if (maxLines && out.length >= maxLines) return out;
        } else {
          line += ch;
        }
      }
      if (line) out.push(line);
      if (maxLines && out.length >= maxLines) return out;
    }
    return out;
  }

  /* A. 템플릿 디자인 만들기 (8종 고해상도 렌더링) */
  function renderDesignCard(cv, tpl, overrides) {
    if (!cv || !tpl) return;
    var ov = overrides || {};
    var W = ov.width || tpl.width || 1080;
    var H = ov.height || tpl.height || 1350;
    cv.width = W;
    cv.height = H;
    var ctx = cv.getContext("2d");

    var themeKey = ov.theme || tpl.theme || "paper-ink";
    var pal = {
      "dark-lime": { bg: "#11110F", card: "#1C1C19", ink: "#F2F1EC", sub: "#A8AAA1", accent: "#D4FF34", accentFg: "#11110F", line: "#2C2C27", footBg: "#D4FF34", footFg: "#11110F" },
      "paper-ink": { bg: "#F2F1EC", card: "#FFFFFF", ink: "#141413", sub: "#4A4B4F", accent: "#141413", accentFg: "#F2F1EC", line: "#D8D6CE", footBg: "#141413", footFg: "#F2F1EC" },
      "ocean-gold": { bg: "#F4F7FA", card: "#FFFFFF", ink: "#0F2942", sub: "#475569", accent: "#0F4C81", accentFg: "#FFFFFF", line: "#CBD5E1", footBg: "#0F4C81", footFg: "#FFFFFF" }
    }[themeKey] || { bg: "#F2F1EC", card: "#FFFFFF", ink: "#141413", sub: "#4A4B4F", accent: "#0F4C81", accentFg: "#FFFFFF", line: "#D8D6CE", footBg: "#141413", footFg: "#F2F1EC" };

    ctx.fillStyle = pal.bg;
    ctx.fillRect(0, 0, W, H);

    var pad = Math.round(W * 0.065);
    var y = Math.round(H * 0.065);

    /* 상단 태그 칩 */
    var tagText = ov.tag || tpl.tag || "GOSUTEM × HANDYFIT";
    ctx.font = "800 " + Math.round(W * 0.024) + "px " + FONT;
    var tagW = ctx.measureText(tagText).width + 36;
    ctx.fillStyle = pal.accent;
    roundRect(ctx, pad, y, tagW, 46, 6);
    ctx.fill();
    ctx.fillStyle = pal.accentFg;
    ctx.fillText(tagText, pad + 18, y + 32);

    /* 우측 상단 인물 0%·정물 검증 배지 */
    var rightBadge = "인물 모델 0% · 정물/팩트 기준";
    ctx.font = "700 " + Math.round(W * 0.019) + "px " + FONT;
    var rbW = ctx.measureText(rightBadge).width + 28;
    ctx.strokeStyle = pal.line;
    ctx.lineWidth = 2;
    roundRect(ctx, W - pad - rbW, y + 2, rbW, 42, 6);
    ctx.stroke();
    ctx.fillStyle = pal.sub;
    ctx.fillText(rightBadge, W - pad - rbW + 14, y + 30);

    y += 88;

    /* 메인 헤드라인 */
    var headline = ov.headline || tpl.headline || "";
    var headSize = W > 1300 ? 48 : 54;
    ctx.fillStyle = pal.ink;
    ctx.font = "900 " + headSize + "px " + FONT;
    var headLines = wrapLines(ctx, headline, W - pad * 2, 3);
    for (var i = 0; i < headLines.length; i++) {
      ctx.fillText(headLines[i], pad, y);
      y += Math.round(headSize * 1.28);
    }

    /* 서브 카피 */
    var subhead = ov.subhead || tpl.subhead || "";
    ctx.fillStyle = pal.sub;
    ctx.font = "600 " + Math.round(W * 0.025) + "px " + FONT;
    var subLines = wrapLines(ctx, subhead, W - pad * 2, 2);
    for (var s = 0; s < subLines.length; s++) {
      ctx.fillText(subLines[s], pad, y);
      y += 38;
    }

    y += 14;
    ctx.fillStyle = pal.line;
    ctx.fillRect(pad, y, W - pad * 2, 2);
    y += 26;

    /* 항목 카드 리스트 */
    var rows = tpl.rows || [];
    var footH = Math.round(H * 0.125);
    var availH = H - footH - y - 24;
    var rowGap = 16;
    var rowH = Math.min(165, Math.floor((availH - rowGap * (rows.length - 1)) / Math.max(1, rows.length)));

    for (var r = 0; r < rows.length; r++) {
      var item = rows[r];
      var ry = y + r * (rowH + rowGap);
      ctx.fillStyle = pal.card;
      roundRect(ctx, pad, ry, W - pad * 2, rowH, 10);
      ctx.fill();
      ctx.strokeStyle = pal.line;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      /* 라벨 배지 */
      ctx.font = "800 24px " + FONT;
      var lw = ctx.measureText(item.label).width + 28;
      ctx.fillStyle = item.color || pal.accent;
      roundRect(ctx, pad + 22, ry + 22, lw, 38, 6);
      ctx.fill();
      var isBright = item.color === "#D4FF34" || item.color === "#5CE1E6";
      ctx.fillStyle = isBright ? "#11110F" : "#FFFFFF";
      ctx.fillText(item.label, pad + 36, ry + 49);

      /* 품목 제목 */
      ctx.fillStyle = pal.ink;
      ctx.font = "800 32px " + FONT;
      var titleMaxW = W - pad * 2 - lw - 70;
      var itemTitle = wrapLines(ctx, item.item, titleMaxW, 1)[0] || "";
      ctx.fillText(itemTitle, pad + 36 + lw, ry + 51);

      /* 한 줄 설명 */
      ctx.fillStyle = pal.sub;
      ctx.font = "500 25px " + FONT;
      var noteLines = wrapLines(ctx, item.note, W - pad * 2 - 48, 2);
      for (var nl = 0; nl < noteLines.length; nl++) {
        ctx.fillText(noteLines[nl], pad + 24, ry + 95 + nl * 32);
      }
    }

    /* 하단 고정 CTA 바 */
    ctx.fillStyle = pal.footBg;
    ctx.fillRect(0, H - footH, W, footH);
    ctx.fillStyle = pal.footFg;
    ctx.font = "900 " + Math.round(W * 0.033) + "px " + FONT;
    ctx.fillText(ov.footerCta || tpl.footerCta || "고수 가방 무료로 열어 보기 →", pad, H - Math.round(footH * 0.52));
    ctx.font = "600 " + Math.round(W * 0.021) + "px " + FONT;
    ctx.fillText(ov.footerSub || tpl.footerSub || "gosutem.com · 협찬 0건 · 제휴 가중치 0%", pad, H - Math.round(footH * 0.2));
  }

  /* B. AI 이미지 만들기 — 탑뷰 정물(Flat-lay) & 사지 마 스탬프 시뮬레이션 */
  function renderImageStudioPreview(cv, imgTpl, opts) {
    if (!cv || !imgTpl) return;
    var o = opts || {};
    var ratio = o.ratio || imgTpl.ratio || "4:5";
    var dimMap = { "1:1": [1080, 1080], "4:5": [1080, 1350], "3:4": [1080, 1440], "9:16": [1080, 1920], "16:9": [1600, 900] };
    var dims = dimMap[ratio] || [1080, 1350];
    var W = dims[0], H = dims[1];
    cv.width = W;
    cv.height = H;
    var ctx = cv.getContext("2d");

    /* 매트한 무채색 차콜/웜그레이 탑뷰 배경 */
    ctx.fillStyle = "#1E1F22";
    ctx.fillRect(0, 0, W, H);

    /* 매트 그리드 질감 */
    ctx.strokeStyle = "rgba(255,255,255,0.04)";
    ctx.lineWidth = 1;
    for (var gx = 0; gx < W; gx += 60) { ctx.beginPath(); ctx.moveTo(gx, 0); ctx.lineTo(gx, H); ctx.stroke(); }
    for (var gy = 0; gy < H; gy += 60) { ctx.beginPath(); ctx.moveTo(0, gy); ctx.lineTo(W, gy); ctx.stroke(); }

    var pad = 64;
    /* 상단 검수 배지 (반대 페르소나 P10 방어) */
    ctx.fillStyle = "#0F4C81";
    roundRect(ctx, pad, 52, W - pad * 2, 58, 8);
    ctx.fill();
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "800 25px " + FONT;
    ctx.fillText("✓ 현장 팩트 검수: 김민정 현직 수영강사(생활스포츠지도사 2급) 외 4명 교차 확인", pad + 22, 90);

    /* 헤더 타이틀 */
    ctx.fillStyle = "#D4FF34";
    ctx.font = "800 26px " + FONT;
    ctx.fillText("[" + (o.angle || imgTpl.angle) + " · " + (o.style || imgTpl.style) + " · 인물 0% 정물]", pad, 156);

    ctx.fillStyle = "#F2F1EC";
    ctx.font = "900 46px " + FONT;
    var tLines = wrapLines(ctx, imgTpl.title, W - pad * 2, 2);
    var ty = 212;
    for (var t = 0; t < tLines.length; t++) {
      ctx.fillText(tLines[t], pad, ty);
      ty += 56;
    }

    /* 중앙 정물 플랫레이 6칸 또는 4칸 그리드 */
    var items = imgTpl.items || [];
    var cols = W > 1300 ? 3 : 2;
    var rows = Math.ceil(items.length / cols);
    var gridTop = ty + 16;
    var gridH = H - gridTop - 250;
    var cellW = Math.floor((W - pad * 2 - (cols - 1) * 24) / cols);
    var cellH = Math.min(240, Math.floor((gridH - (rows - 1) * 22) / Math.max(1, rows)));

    for (var idx = 0; idx < items.length; idx++) {
      var label = items[idx];
      var isNoBuy = /제외|사지 마|비추/.test(label);
      var c = idx % cols;
      var r = Math.floor(idx / cols);
      var cx = pad + c * (cellW + 24);
      var cy = gridTop + r * (cellH + 22);

      ctx.fillStyle = isNoBuy ? "#281C1C" : "#282A2E";
      roundRect(ctx, cx, cy, cellW, cellH, 12);
      ctx.fill();
      ctx.strokeStyle = isNoBuy ? "#FF5A4F" : "#D4FF34";
      ctx.lineWidth = 2.5;
      ctx.stroke();

      /* 정물 실루엣 아이콘 박스 */
      ctx.fillStyle = isNoBuy ? "rgba(255,90,79,0.16)" : "rgba(212,255,52,0.14)";
      roundRect(ctx, cx + 20, cy + 20, cellW - 40, 52, 6);
      ctx.fill();
      ctx.fillStyle = isNoBuy ? "#FF7A70" : "#D4FF34";
      ctx.font = "800 22px " + FONT;
      ctx.fillText(isNoBuy ? "✕ 첫 달 사지 마 · 0원 대안" : "● 고수 교차 통과 · 실물 정물", cx + 34, cy + 54);

      /* 품목명 */
      ctx.fillStyle = "#F2F1EC";
      ctx.font = "800 28px " + FONT;
      var pLines = wrapLines(ctx, "0" + (idx + 1) + ". " + label, cellW - 40, 2);
      for (var pl = 0; pl < pLines.length; pl++) {
        ctx.fillText(pLines[pl], cx + 22, cy + 115 + pl * 36);
      }
    }

    /* 다단계 명령 체이닝 박스 (+다음 명령단계 추가) */
    var chainY = H - 210;
    ctx.fillStyle = "#11110F";
    roundRect(ctx, pad, chainY, W - pad * 2, 74, 8);
    ctx.fill();
    ctx.strokeStyle = "#5CE1E6";
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.fillStyle = "#5CE1E6";
    ctx.font = "700 22px " + FONT;
    var chainStr = "+ 다음 명령단계 반영: " + ((o.chainText && o.chainText.trim()) || imgTpl.chainStep);
    ctx.fillText(wrapLines(ctx, chainStr, W - pad * 2 - 36, 1)[0], pad + 18, chainY + 45);

    /* 하단 절감액 배너 */
    ctx.fillStyle = "#D4FF34";
    ctx.fillRect(0, H - 112, W, 112);
    ctx.fillStyle = "#11110F";
    ctx.font = "900 34px " + FONT;
    ctx.fillText("1단 회피 -" + (imgTpl.avoidedWon || 25000).toLocaleString() + "원 · 총 직접 절감 -" + (imgTpl.totalSavedWon || 31000).toLocaleString() + "원 (첫 화면 링크 0개)", pad, H - 44);
  }

  /* C. AI 동영상 만들기 — 9:16 릴스/쇼츠 세이프존 & 4단 컷 미리보기 */
  function renderVideoFrame(cv, vidTpl, cutIdx, opts) {
    if (!cv || !vidTpl) return;
    var o = opts || {};
    var W = 1080, H = 1920;
    cv.width = W;
    cv.height = H;
    var ctx = cv.getContext("2d");
    var cuts = vidTpl.cuts || [];
    var idx = Math.max(0, Math.min(cuts.length - 1, cutIdx || 0));
    var cut = cuts[idx] || { step: "1. 후킹", type: "숫자형", scene: "", sub: vidTpl.hook3s, intent: "" };

    /* 다크 스튜디오 배경 */
    var grad = ctx.createLinearGradient(0, 0, 0, H);
    grad.addColorStop(0, "#141820");
    grad.addColorStop(0.5, "#1B222D");
    grad.addColorStop(1, "#0F1217");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);

    /* 상단 인스타 스토리식 진행 바 */
    var barY = 44;
    var segGap = 12;
    var segW = Math.floor((W - 152 - segGap * (cuts.length - 1)) / Math.max(1, cuts.length));
    for (var s = 0; s < cuts.length; s++) {
      ctx.fillStyle = s <= idx ? "#D4FF34" : "rgba(255,255,255,0.22)";
      roundRect(ctx, 76 + s * (segW + segGap), barY, segW, 10, 5);
      ctx.fill();
    }

    /* 세이프존 내 상단 메타 배지 (상단 130px 아래) */
    ctx.fillStyle = "rgba(15, 76, 129, 0.92)";
    roundRect(ctx, 76, 148, W - 172, 62, 10);
    ctx.fill();
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "800 26px " + FONT;
    ctx.fillText(vidTpl.badge + " · " + (o.duration || vidTpl.defaultSec) + "초 쇼츠", 102, 188);

    /* 현재 컷 단계 & 카메라 무빙 표시 */
    ctx.fillStyle = "#5CE1E6";
    ctx.font = "800 30px " + FONT;
    ctx.fillText("[" + cut.step + " · " + cut.type + "] " + vidTpl.cameraStyle, 76, 280);

    /* 중앙 정물 장면 연출 프레임 */
    ctx.fillStyle = "#232A36";
    roundRect(ctx, 76, 330, W - 172, 620, 16);
    ctx.fill();
    ctx.strokeStyle = "#3B475C";
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = "#A8B3C5";
    ctx.font = "700 28px " + FONT;
    ctx.fillText("🎬 촬영·렌더링 장면 연출 (인물 모델 0% · 정물/UI 시연)", 112, 398);

    ctx.fillStyle = "#F2F1EC";
    ctx.font = "800 38px " + FONT;
    var sceneLines = wrapLines(ctx, cut.scene, W - 244, 4);
    for (var sl = 0; sl < sceneLines.length; sl++) {
      ctx.fillText(sceneLines[sl], 112, 476 + sl * 56);
    }

    ctx.fillStyle = "#D4FF34";
    ctx.font = "700 28px " + FONT;
    ctx.fillText("🎯 기획 의도: " + cut.intent, 112, 890);

    /* 초대형 자막 영역 (72pt 급 고대비 박스) */
    ctx.fillStyle = "#11110F";
    roundRect(ctx, 76, 1020, W - 172, 460, 18);
    ctx.fill();
    ctx.strokeStyle = "#D4FF34";
    ctx.lineWidth = 4;
    ctx.stroke();

    ctx.fillStyle = "#D4FF34";
    ctx.font = "800 28px " + FONT;
    ctx.fillText("자막 미리보기 (컷당 핵심 메시지 1개 · 초대형 타이포)", 114, 1084);

    ctx.fillStyle = "#FFFFFF";
    ctx.font = "900 56px " + FONT;
    var subLines = wrapLines(ctx, cut.sub, W - 248, 4);
    for (var k = 0; k < subLines.length; k++) {
      ctx.fillText(subLines[k], 114, 1176 + k * 76);
    }

    /* 9:16 세이프존 가이드라인 오버레이 (상 130 · 하 260 · 좌 76 · 우 96) */
    if (o.showSafeZone !== false) {
      ctx.save();
      ctx.strokeStyle = "rgba(255, 90, 79, 0.75)";
      ctx.lineWidth = 3;
      ctx.setLineDash([12, 8]);
      ctx.strokeRect(76, 130, W - 76 - 96, H - 130 - 260);
      ctx.fillStyle = "rgba(255, 90, 79, 0.14)";
      ctx.fillRect(0, H - 260, W, 260);
      ctx.fillStyle = "#FF8A80";
      ctx.font = "700 24px " + FONT;
      ctx.fillText("⚠ 하단 260px · 우측 96px 세이프존 (인스타 캡션·음원·좋아요 아이콘 회피 구역)", 76, H - 210);
      ctx.restore();
    }
  }

  return {
    renderDesignCard: renderDesignCard,
    renderImageStudioPreview: renderImageStudioPreview,
    renderVideoFrame: renderVideoFrame
  };
})();
