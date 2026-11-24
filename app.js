import { DECKS } from './data.js';

const $ = (id) => document.getElementById(id);
const qa = (s) => document.querySelectorAll(s);
const ALERT_KEY = 'gosutem_price_alerts_v1';
const FB_KEY = 'gosutem_dom_feedback_v1';

let cur = 'protein';
let curCat = 'all';
let focusSlug = null;
let nutriMode = 'n1'; // 'n1' (1회) | 'n100' (100g)
let q = '';
let activeItem = null;
let fbMode = false;
let activeBlockId = null;

const src = (u) => (u.startsWith('http') ? u : 'img/' + u);
const getJson = (k, d) => { try { return JSON.parse(localStorage.getItem(k) || d); } catch { return JSON.parse(d); } };
const setJson = (k, v) => localStorage.setItem(k, JSON.stringify(v));

function findBySlug(slug) {
  for (const [deckKey, deck] of Object.entries(DECKS)) {
    const found = deck.items.find((it) => it.slug === slug);
    if (found) return { deckKey, item: found };
  }
  return null;
}

function makeSpark(pts) {
  if (!pts || pts.length < 2) return '';
  const min = Math.min(...pts), max = Math.max(...pts), span = max - min || 1;
  const c = pts.map((v, i) => `${((i / (pts.length - 1)) * 68).toFixed(1)},${(16 - ((v - min) / span) * 13).toFixed(1)}`).join(' ');
  return `<svg class="spark" viewBox="0 0 68 18"><polyline fill="none" stroke="#0F766E" stroke-width="1.8" points="${c}"/></svg>`;
}

function renderGauge(it) {
  return `<div><div class="g-bar"><div class="g-dot" style="left:${it.pos ?? 50}%"></div></div><div class="g-lbl"><span>저점</span><span>${it.sigText || '평균'}</span><span>고점</span></div></div>`;
}

function renderAccChart(d) {
  if (!d.unitChart || !d.unitChart.length) return '';
  const max = Math.max(...d.unitChart.map((x) => x.val));
  const bars = d.unitChart.map((x) => `<div class="brow"><strong>${x.name}</strong><div class="btrack"><div class="bfill" style="width:${Math.max(8, Math.round((x.val / max) * 100))}%"></div></div><span style="text-align:right;font-weight:700">${x.label}</span></div>`).join('');
  return `<div class="acc" id="acc-chart" data-block="unit-price-chart">
    <button class="acc-head" id="btn-acc-chart">단위당(1잔) 가격 그래프 요약<span>펼쳐보기 ▾</span></button>
    <div class="acc-body">${bars}</div>
  </div>`;
}

function renderNutriBox(d) {
  const withN = d.items.filter((it) => it.n1);
  if (!withN.length) return '';
  const rows = withN.map((it) => {
    const arr = nutriMode === 'n1' ? it.n1 : it.n100;
    return `<tr><td><strong>${it.name.slice(0, 11)}</strong></td><td>${arr[0]}</td><td>${arr[1]}</td><td><strong>${arr[2]}</strong></td><td><strong>${arr[3]}</strong></td><td>${arr[4]}</td></tr>`;
  }).join('');
  return `<div class="acc" id="acc-nutri" data-block="nutrition-table">
    <button class="acc-head" id="btn-acc-nutri">영양성분표 (${nutriMode === 'n1' ? '1회 기준' : '100g 환산'})<span>펼쳐보기 ▾</span></button>
    <div class="acc-body">
      <div style="display:flex;gap:5px;margin-bottom:4px">
        <button class="chip ${nutriMode === 'n1' ? 'on' : ''}" id="nm-1">1회 제공량</button>
        <button class="chip ${nutriMode === 'n100' ? 'on' : ''}" id="nm-100">100g 환산</button>
      </div>
      <div class="nutri-scroll"><table class="ntbl"><thead><tr><th>제품</th><th>기준</th><th>kcal</th><th>단백</th><th>섬유</th><th>당</th></tr></thead><tbody>${rows}</tbody></table></div>
    </div>
  </div>`;
}

function renderFocus(slug) {
  const box = $('detail-box');
  if (!slug) { box.innerHTML = ''; return; }
  const hit = findBySlug(slug);
  if (!hit) { box.innerHTML = ''; return; }
  const it = hit.item;
  const al = getJson(ALERT_KEY, '{}')[it.slug];
  const shareUrl = `${location.origin}${location.pathname}#p=${it.slug}`;
  box.innerHTML = `<div class="detail-card" data-block="detail-${it.slug}">
    <div class="top-row"><span class="tag core">단독 제품 상세 · 블로그용 URL</span><button class="pbtn" id="close-det">닫기</button></div>
    <div class="prow-top">
      <img class="pthumb" style="width:64px;height:64px" src="${src(it.img)}" alt="${it.name}">
      <div class="pinfo"><h3 style="white-space:normal">${it.name}</h3><p style="white-space:normal">${it.desc}</p><b style="font-size:15px">${it.price}</b> <em style="font-style:normal;color:#0F5132;font-size:11px;font-weight:700">${it.badge}</em></div>
    </div>
    <div class="prow-mid">${renderGauge(it)}${makeSpark(it.trend)}<div class="pprice"><b>${it.price}</b><em>${it.sigText}</em></div></div>
    <div class="prow-act">
      <button class="cbtn ${al ? 'set' : ''}" id="det-al">${al ? `알림 ${Number(al.target).toLocaleString()}원` : '현재가 이하 알림'}</button>
      ${al ? '<button class="cbtn off" id="det-off">해제</button>' : ''}
      <button class="cbtn" id="det-copy">블로그URL</button>
      <a class="cbtn buy" href="${it.url}" target="_blank" rel="noopener">구매</a>
    </div>
  </div>`;
  $('close-det').onclick = () => { focusSlug = null; history.replaceState(null, '', '#' + cur); render(); };
  $('det-al').onclick = () => openAlertModal(it);
  if ($('det-off')) $('det-off').onclick = () => removeAlert(it.slug);
  $('det-copy').onclick = (e) => {
    if (navigator.clipboard) navigator.clipboard.writeText(shareUrl);
    e.currentTarget.textContent = '복사됨!';
    setTimeout(() => (e.currentTarget.textContent = '블로그URL'), 1200);
  };
}

function removeAlert(slug) {
  const all = getJson(ALERT_KEY, '{}');
  delete all[slug];
  setJson(ALERT_KEY, all);
  render();
}

function render() {
  const d = DECKS[cur] || DECKS.protein;
  const alerts = getJson(ALERT_KEY, '{}');
  const alCnt = Object.keys(alerts).length;
  $('al-top').textContent = alCnt ? `알림 ${alCnt}` : '알림';
  $('al-top').classList.toggle('al-on', alCnt > 0);

  qa('[data-d]').forEach((x) => x.setAttribute('aria-selected', x.dataset.d === cur));
  $('p-title').textContent = d.title;
  $('p-sub').textContent = d.sub;

  $('chips-box').innerHTML = (d.cats || []).map((c) => `<button class="chip ${curCat === c.id ? 'on' : ''}" data-cat="${c.id}">${c.label}</button>`).join('');
  qa('[data-cat]').forEach((b) => (b.onclick = () => { curCat = b.dataset.cat; render(); }));

  renderFocus(focusSlug);
  $('chart-box').innerHTML = renderAccChart(d);
  $('nutri-box').innerHTML = renderNutriBox(d);

  if ($('btn-acc-chart')) $('btn-acc-chart').onclick = () => $('acc-chart').classList.toggle('open');
  if ($('btn-acc-nutri')) $('btn-acc-nutri').onclick = () => $('acc-nutri').classList.toggle('open');
  if ($('nm-1')) $('nm-1').onclick = () => { nutriMode = 'n1'; render(); $('acc-nutri').classList.add('open'); };
  if ($('nm-100')) $('nm-100').onclick = () => { nutriMode = 'n100'; render(); $('acc-nutri').classList.add('open'); };

  const list = d.items.filter((it) => (curCat === 'all' || it.cat === curCat) && (!q || (it.name + it.desc + it.tag).toLowerCase().includes(q.toLowerCase())));
  $('secs-box').innerHTML = `<div class="plist">${list.map((it) => {
    const al = alerts[it.slug];
    const sigCls = it.sig === 'low' ? 'sig-low' : (it.sig === 'high' ? 'sig-high' : 'sig-mid');
    return `<div class="prow" data-block="row-${it.slug}">
      <div class="prow-top">
        <a href="${it.url}" target="_blank" rel="noopener"><img class="pthumb" src="${src(it.img)}" alt="${it.name}"></a>
        <div class="pinfo">
          <div class="pmeta"><span class="sig ${sigCls}">${it.sigText}</span><span class="tag${it.core ? ' core' : ''}">${it.tag}</span></div>
          <h3>${it.name}</h3>
          <p>${it.desc}</p>
        </div>
      </div>
      <div class="prow-mid">
        ${renderGauge(it)}
        ${makeSpark(it.trend)}
        <div class="pprice"><b>${it.price}</b><em>${it.badge}</em></div>
      </div>
      <div class="prow-act">
        <button class="cbtn ${al ? 'set' : ''}" data-al="${it.slug}">${al ? `🔔 ${Number(al.target).toLocaleString()}원 이하` : '알림 설정'}</button>
        ${al ? `<button class="cbtn off" data-off="${it.slug}" style="flex:0 0 46px">해제</button>` : ''}
        <button class="cbtn" data-det="${it.slug}" style="flex:0 0 58px">상세URL</button>
        <a class="cbtn buy" href="${it.url}" target="_blank" rel="noopener" style="flex:0 0 50px">구매</a>
      </div>
    </div>`;
  }).join('')}</div>`;

  qa('[data-al]').forEach((b) => (b.onclick = () => { const h = findBySlug(b.dataset.al); if (h) openAlertModal(h.item); }));
  qa('[data-off]').forEach((b) => (b.onclick = () => removeAlert(b.dataset.off)));
  qa('[data-det]').forEach((b) => (b.onclick = () => { focusSlug = b.dataset.det; history.replaceState(null, '', '#p=' + focusSlug); render(); window.scrollTo({ top: 0, behavior: 'smooth' }); }));
  bindFeedbackClicks();
}

function openAlertModal(it) {
  activeItem = it;
  const ex = getJson(ALERT_KEY, '{}')[it.slug];
  const curP = it.numPrice || 10000;
  $('m-title').textContent = `${it.name}`;
  $('m-sub').textContent = `현재가(${curP.toLocaleString()}원) 이하로 떨어지면 알림을 받습니다.`;
  $('m-target').value = ex ? ex.target : curP; // 기본값: 현재가 바로 입력!
  $('m-del').style.display = ex ? 'inline-flex' : 'none';
  $('q-cur').onclick = () => ($('m-target').value = curP);
  $('q-5').onclick = () => ($('m-target').value = Math.round(curP * 0.95));
  $('q-10').onclick = () => ($('m-target').value = Math.round(curP * 0.9));
  $('al-modal').classList.add('open');
}

function openListModal() {
  const entries = Object.values(getJson(ALERT_KEY, '{}'));
  $('al-list-body').innerHTML = entries.length
    ? entries.map((a) => `<div class="al-item"><div><strong>${a.name}</strong><br><b>${Number(a.target).toLocaleString()}원 이하</b> 시 알림</div><button class="pbtn" data-rm="${a.slug}">해제</button></div>`).join('')
    : '<p style="font-size:12px;color:#666">설정된 알림이 없습니다.</p>';
  qa('[data-rm]').forEach((b) => (b.onclick = () => { removeAlert(b.dataset.rm); openListModal(); }));
  $('list-modal').classList.add('open');
}

function bindFeedbackClicks() {
  qa('[data-block]').forEach((el) => {
    el.addEventListener('click', (e) => {
      if (!fbMode) return;
      e.preventDefault();
      e.stopPropagation();
      activeBlockId = el.getAttribute('data-block');
      $('fb-target').textContent = `선택된 영역: ${activeBlockId}`;
      $('fb-text').value = '';
      $('fb-modal').classList.add('open');
    }, true);
  });
}

function updateFbCount() {
  const arr = getJson(FB_KEY, '[]');
  $('fb-cnt').textContent = arr.length;
}

$('fb-toggle').onclick = () => {
  fbMode = !fbMode;
  document.body.classList.toggle('fb-mode', fbMode);
  $('fb-toggle').classList.toggle('fb-on', fbMode);
  $('fb-bar').classList.toggle('open', fbMode);
  updateFbCount();
};
$('fb-save').onclick = () => {
  const txt = $('fb-text').value.trim();
  if (!txt || !activeBlockId) return;
  const arr = getJson(FB_KEY, '[]');
  arr.push({ block: activeBlockId, note: txt, at: new Date().toISOString().slice(11, 16) });
  setJson(FB_KEY, arr);
  $('fb-modal').classList.remove('open');
  updateFbCount();
};
$('fb-cancel').onclick = () => $('fb-modal').classList.remove('open');
$('fb-copy').onclick = (e) => {
  const arr = getJson(FB_KEY, '[]');
  const out = arr.map((x, i) => `${i + 1}. [${x.block}] ${x.note}`).join('\n') || '등록된 피드백 없음';
  if (navigator.clipboard) navigator.clipboard.writeText(out);
  e.currentTarget.textContent = '복사됨!';
  setTimeout(() => (e.currentTarget.textContent = '피드백 복사'), 1200);
};

$('m-save').onclick = () => {
  if (!activeItem) return;
  const target = Number($('m-target').value);
  if (!target || target <= 0) return;
  const all = getJson(ALERT_KEY, '{}');
  all[activeItem.slug] = { slug: activeItem.slug, name: activeItem.name, target, savedAt: new Date().toISOString() };
  setJson(ALERT_KEY, all);
  $('al-modal').classList.remove('open');
  render();
};
$('m-del').onclick = () => { if (activeItem) removeAlert(activeItem.slug); $('al-modal').classList.remove('open'); };
$('m-cancel').onclick = () => $('al-modal').classList.remove('open');
$('al-top').onclick = openListModal;
$('l-close').onclick = () => $('list-modal').classList.remove('open');

qa('[data-d]').forEach((b) => (b.onclick = () => { cur = b.dataset.d; curCat = 'all'; focusSlug = null; history.replaceState(null, '', '#' + cur); render(); }));
window.addEventListener('hashchange', () => { parseHash(); render(); });
$('qi').oninput = (e) => { q = e.target.value.trim(); render(); };
$('sh').onclick = (e) => {
  const u = location.origin + location.pathname + (focusSlug ? '#p=' + focusSlug : '#' + cur);
  if (navigator.clipboard) navigator.clipboard.writeText(u);
  e.currentTarget.textContent = '복사됨';
  setTimeout(() => (e.currentTarget.textContent = '링크'), 1200);
};

function parseHash() {
  const h = location.hash.slice(1);
  if (h.startsWith('p=')) {
    const hit = findBySlug(h.slice(2));
    if (hit) { cur = hit.deckKey; focusSlug = h.slice(2); return; }
  }
  focusSlug = null;
  if (DECKS[h]) cur = h;
}

parseHash();
render();
