import { DECKS } from './data.js';

const $ = (id) => document.getElementById(id);
const qa = (s) => document.querySelectorAll(s);
const ALERT_KEY = 'gosutem_price_alerts_v1';

let cur = 'protein';
let focusSlug = null;
let q = '';
let activeAlertItem = null;

const src = (u) => (u.startsWith('http') ? u : 'img/' + u);
const getAlerts = () => { try { return JSON.parse(localStorage.getItem(ALERT_KEY) || '{}'); } catch { return {}; } };
const saveAlerts = (obj) => localStorage.setItem(ALERT_KEY, JSON.stringify(obj));

function findBySlug(slug) {
  for (const [deckKey, deck] of Object.entries(DECKS)) {
    for (const sec of deck.secs) {
      const found = sec[3].find((it) => it.slug === slug);
      if (found) return { deckKey, item: found };
    }
  }
  return null;
}

function makeSparkline(pts) {
  if (!pts || pts.length < 2) return '';
  const min = Math.min(...pts), max = Math.max(...pts), span = max - min || 1;
  const coords = pts.map((v, i) => {
    const x = (i / (pts.length - 1)) * 120;
    const y = 20 - ((v - min) / span) * 16;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(' ');
  return `<svg class="spark" viewBox="0 0 120 24" preserveAspectRatio="none"><polyline fill="none" stroke="#0F766E" stroke-width="2" points="${coords}"/></svg>`;
}

function renderGauge(it) {
  const pos = it.pos ?? 50;
  return `<div class="gauge-wrap"><div class="gauge-bar"><div class="gauge-dot" style="left:${pos}%"></div></div><div class="gauge-meta"><span>저점</span><span>${it.sigText || '평균가'}</span><span>고점</span></div></div>`;
}

function renderUnitChart(list) {
  if (!list || !list.length) return '';
  const max = Math.max(...list.map((x) => x.val));
  return `<section class="sec"><h2 class="sec-h">단위당 가격 비교 그래프<span>1잔 최저가 기준</span></h2><div class="chart-card">${list.map((x) => {
    const w = Math.max(8, Math.round((x.val / max) * 100));
    return `<div class="brow"><strong>${x.name}</strong><div class="btrack"><div class="bfill" style="width:${w}%"></div></div><span style="text-align:right;font-weight:700">${x.label}</span></div>`;
  }).join('')}</div></section>`;
}

function updateAlertBadge() {
  const count = Object.keys(getAlerts()).length;
  const btn = $('al-top');
  btn.textContent = count ? `알림 ${count}` : '알림';
  btn.classList.toggle('al-on', count > 0);
}

function renderFocusDetail(slug) {
  const box = $('detail-box');
  if (!slug) { box.innerHTML = ''; return; }
  const hit = findBySlug(slug);
  if (!hit) { box.innerHTML = ''; return; }
  const it = hit.item;
  const alerts = getAlerts();
  const al = alerts[it.slug];
  const shareUrl = `${location.origin}${location.pathname}#p=${it.slug}`;

  box.innerHTML = `<div class="detail-card">
    <div class="top-row"><span class="tag core">단독 제품 상세 · 블로그 공유용</span><button class="pbtn" id="close-det">닫기</button></div>
    <div style="display:flex;gap:12px;align-items:center">
      <img src="${src(it.img)}" alt="${it.name}" style="width:84px;height:84px;object-fit:contain;border:1px solid #ECEAE4;border-radius:10px;padding:4px;background:#FFF">
      <div style="flex:1;min-width:0">
        <h3 style="font-size:15px;font-weight:800;margin-bottom:4px">${it.name}</h3>
        <p style="font-size:12px;color:#5E5B55;margin-bottom:6px">${it.desc}</p>
        <div class="pp"><em>${it.badge}</em><b style="font-size:16px">${it.price}</b></div>
      </div>
    </div>
    ${renderGauge(it)}
    ${makeSparkline(it.trend)}
    <div class="card-act">
      <button class="cbtn ${al ? 'set' : ''}" id="det-al">${al ? `목표가 ${Number(al.target).toLocaleString()}원` : '목표가 알림 설정'}</button>
      <button class="cbtn" id="det-copy">블로그용 URL 복사</button>
      <a class="cbtn buy" href="${it.url}" target="_blank" rel="noopener">최저가 구매</a>
    </div>
  </div>`;

  $('close-det').onclick = () => { focusSlug = null; history.replaceState(null, '', '#' + cur); render(); };
  $('det-al').onclick = () => openAlertModal(it);
  $('det-copy').onclick = (e) => {
    if (navigator.clipboard) navigator.clipboard.writeText(shareUrl);
    e.currentTarget.textContent = 'URL 복사됨!';
    setTimeout(() => (e.currentTarget.textContent = '블로그용 URL 복사'), 1400);
  };
}

function render() {
  const d = DECKS[cur] || DECKS.protein;
  const b = d.banner;
  const alerts = getAlerts();
  qa('[data-d]').forEach((x) => x.setAttribute('aria-selected', x.dataset.d === cur));
  $('p-title').textContent = d.title;
  $('p-sub').textContent = d.sub;
  updateAlertBadge();
  renderFocusDetail(focusSlug);

  $('top-ban').innerHTML = `<a class="lcard" href="${b[3]}" target="_blank" rel="noopener"><img src="${src(b[0])}" alt="${b[1]}"><div><h4>${b[1]}</h4><p>${b[2]}</p></div></a>`;
  $('chart-box').innerHTML = renderUnitChart(d.unitChart);

  $('secs-box').innerHTML = d.secs.map((s) => {
    const items = s[3].filter((it) => !q || (it.name + it.desc + it.tag).toLowerCase().includes(q.toLowerCase()));
    if (!items.length) return '';
    const wide = s[1] === 1;
    return `<section class="sec"><h2 class="sec-h">${s[0]}<span>${s[2]}</span></h2><div class="pgrid${wide ? ' g1' : ''}">${items.map((it) => {
      const al = alerts[it.slug];
      const sigCls = it.sig === 'low' ? 'sig-low' : (it.sig === 'high' ? 'sig-high' : 'sig-mid');
      return `<div class="pc${wide ? ' wide' : ''}">
        <a class="pi" href="${it.url}" target="_blank" rel="noopener">
          <span class="sig-badge ${sigCls}">${it.sigText || '평균가'}</span>
          <img src="${src(it.img)}" alt="${it.name}">
        </a>
        <div class="pt">
          <span class="tag${it.core ? ' core' : ''}">${it.tag}</span>
          <h3>${it.name}</h3>
          <p>${it.desc}</p>
          ${renderGauge(it)}
          ${makeSparkline(it.trend)}
          <div class="pp"><em>${it.badge}</em><b>${it.price}</b></div>
          <div class="card-act">
            <button class="cbtn ${al ? 'set' : ''}" data-al="${it.slug}">${al ? `${Number(al.target).toLocaleString()}원` : '목표가 알림'}</button>
            <button class="cbtn" data-det="${it.slug}">상세URL</button>
          </div>
        </div>
      </div>`;
    }).join('')}</div></section>`;
  }).join('');

  qa('[data-al]').forEach((btn) => {
    btn.onclick = () => { const h = findBySlug(btn.dataset.al); if (h) openAlertModal(h.item); };
  });
  qa('[data-det]').forEach((btn) => {
    btn.onclick = () => {
      focusSlug = btn.dataset.det;
      history.replaceState(null, '', '#p=' + focusSlug);
      render();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
  });

  $('notes-box').innerHTML = `<div class="sec"><h2 class="sec-h">체감 · 사양 · 주의 노트<span>핵심 요약</span></h2><div class="notes">${d.notes.map((n) => `<div class="note"><b>${n[0]}</b>${n[1]}</div>`).join('')}</div></div>`;
}

function openAlertModal(it) {
  activeAlertItem = it;
  const ex = getAlerts()[it.slug];
  $('m-title').textContent = `목표가 알림 설정 : ${it.name}`;
  $('m-sub').textContent = `현재가 ${it.price} · 원하시는 가격 이하로 내려가면 알림 기준을 저장합니다.`;
  $('m-target').value = ex ? ex.target : Math.round((it.numPrice || 10000) * 0.9);
  $('m-contact').value = ex ? ex.contact : '';
  $('al-modal').classList.add('open');
}

function openListModal() {
  const alerts = getAlerts();
  const entries = Object.values(alerts);
  $('al-list-body').innerHTML = entries.length
    ? entries.map((a) => `<div class="al-item"><div><strong>${a.name}</strong><br>목표가 <b>${Number(a.target).toLocaleString()}원</b> · ${a.contact || '연락처 미입력'}</div><button class="pbtn" data-rm="${a.slug}">삭제</button></div>`).join('')
    : '<p style="font-size:12px;color:#666">설정된 목표가 알림이 없습니다. 제품 카드의 [목표가 알림] 버튼을 눌러 등록하세요.</p>';
  qa('[data-rm]').forEach((b) => {
    b.onclick = () => { const all = getAlerts(); delete all[b.dataset.rm]; saveAlerts(all); openListModal(); render(); };
  });
  $('list-modal').classList.add('open');
}

function parseHash() {
  const h = location.hash.slice(1);
  if (h.startsWith('p=')) {
    const slug = h.slice(2);
    const hit = findBySlug(slug);
    if (hit) { cur = hit.deckKey; focusSlug = slug; return; }
  }
  focusSlug = null;
  if (DECKS[h]) cur = h;
}

$('m-save').onclick = () => {
  if (!activeAlertItem) return;
  const target = Number($('m-target').value);
  if (!target || target <= 0) { alert('목표가를 숫자로 입력해 주세요.'); return; }
  const all = getAlerts();
  all[activeAlertItem.slug] = {
    slug: activeAlertItem.slug,
    name: activeAlertItem.name,
    currentPrice: activeAlertItem.numPrice,
    target,
    contact: $('m-contact').value.trim(),
    savedAt: new Date().toISOString()
  };
  saveAlerts(all);
  $('al-modal').classList.remove('open');
  render();
};
$('m-cancel').onclick = () => $('al-modal').classList.remove('open');
$('al-top').onclick = openListModal;
$('l-close').onclick = () => $('list-modal').classList.remove('open');

qa('[data-d]').forEach((b) => {
  b.onclick = () => { cur = b.dataset.d; focusSlug = null; history.replaceState(null, '', '#' + cur); render(); };
});
window.addEventListener('hashchange', () => { parseHash(); render(); });
$('qi').oninput = (e) => { q = e.target.value.trim(); render(); };
$('sh').onclick = (e) => {
  const b = e.currentTarget;
  const u = location.origin + location.pathname + (focusSlug ? '#p=' + focusSlug : '#' + cur);
  if (navigator.clipboard) navigator.clipboard.writeText(u);
  b.textContent = '복사 완료';
  setTimeout(() => (b.textContent = '링크 복사'), 1400);
};

parseHash();
render();
