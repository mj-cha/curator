const STORAGE_KEY = 'gosutem.v3.2.state';
const SEARCH_AVG = 148000;

let st = {
  mainView: 'decision',
  realm: 'r1',
  sit: 'indoor',
  issue: 'goggles',
  sec2Unlocked: false,
  openReasons: {},
  vote: null,
  budget: 79500,
  preset: 'core',
  picks: { 'ch-goggles': 'new', 'ch-cap': 'new', 'ch-suit': 'new', 'ch-towel': 'new' },
  rulesOpen: false,
  checkedRules: {},
  savedBags: []
};

function won(n){ return '₩' + Number(n||0).toLocaleString('ko-KR'); }

function loadState(){
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if(raw){
      const p = JSON.parse(raw);
      if(p && typeof p === 'object'){
        st.sec2Unlocked = !!p.sec2Unlocked;
        st.vote = p.vote || null;
        st.picks = p.picks || st.picks;
        st.savedBags = Array.isArray(p.savedBags) ? p.savedBags : [];
        st.checkedRules = p.checkedRules || {};
      }
    }
  } catch(e){}
  updateCounts();
}

function saveState(){
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      sec2Unlocked: st.sec2Unlocked,
      vote: st.vote,
      picks: st.picks,
      savedBags: st.savedBags,
      checkedRules: st.checkedRules,
      updatedAt: new Date().toISOString()
    }));
  } catch(e){}
  updateCounts();
}

function updateCounts(){
  const n = st.savedBags.length;
  const c1 = document.getElementById('savedCnt');
  const c2 = document.getElementById('stickyCnt');
  if(c1) c1.textContent = n;
  if(c2) c2.textContent = n;
}

function resetPilotSession(){
  st.sec2Unlocked = false;
  st.vote = null;
  st.openReasons = {};
  st.checkedRules = {};
  st.savedBags = [];
  st.picks = { 'ch-goggles': 'new', 'ch-cap': 'new', 'ch-suit': 'new', 'ch-towel': 'new' };
  st.budget = 79500;
  st.preset = 'core';
  try { localStorage.removeItem(STORAGE_KEY); } catch(e){}
  renderAll();
  closeDrawer();
  toast('시연 기록을 초기화했습니다 (다음 참가자 시연 준비 완료)');
}

function toast(m){
  const t = document.getElementById('toast');
  if(!t) return;
  t.textContent = m;
  t.classList.add('show');
  clearTimeout(t._id);
  t._id = setTimeout(()=>t.classList.remove('show'), 2100);
}

function setMode(m){
  document.body.classList.toggle('mob', m==='mob');
  document.getElementById('mPc').classList.toggle('on', m==='pc');
  document.getElementById('mMob').classList.toggle('on', m==='mob');
}

function setMainView(v){
  st.mainView = v;
  document.getElementById('vtDec').classList.toggle('on', v==='decision');
  document.getElementById('vtCmp').classList.toggle('on', v==='compare');
  document.getElementById('vtReg').classList.toggle('on', v==='register');
  document.getElementById('viewDecision').style.display = v==='decision' ? 'block' : 'none';
  document.getElementById('viewCompare').style.display = v==='compare' ? 'block' : 'none';
  document.getElementById('viewRegister').style.display = v==='register' ? 'block' : 'none';
  if(v==='compare') renderCompareView();
  if(v==='register') renderRegisterView();
  window.scrollTo({top:0, behavior:'smooth'});
}

function renderRealms(){
  document.getElementById('realmList').innerHTML = REALMS.map(r=>`
    <button class="realm-btn ${st.realm===r.id?'on':''}" onclick="selectRealm('${r.id}')">
      ${r.label}
    </button>`).join('');
}

function selectRealm(id){
  st.realm = id;
  renderRealms();
  renderSeedBags();
  if(st.mainView !== 'decision') setMainView('decision');
  toast('선택한 삶의 영역 시드 가방 기준으로 정렬했습니다');
}

function renderHero(){
  const cur = SITUATIONS.find(x=>x.id===st.sit) || SITUATIONS[0];
  document.getElementById('sitChips').innerHTML = SITUATIONS.map(s=>`
    <button class="sit-chip ${st.sit===s.id?'on':''}" onclick="st.sit='${s.id}';renderHero()">
      ${s.label}
    </button>`).join('');
  document.getElementById('heroTitle').innerHTML = cur.title.replace('\n','<br>');
  document.getElementById('heroDesc').textContent = cur.desc;
}

function renderNoBuy(){
  document.getElementById('voteUpBtn').classList.toggle('on', st.vote==='up');
  document.getElementById('voteDiffBtn').classList.toggle('on', st.vote==='diff');
  document.getElementById('voteUpCnt').textContent = 142 + (st.vote==='up' ? 1 : 0);

  document.getElementById('noBuyGrid').innerHTML = NO_BUY_ITEMS.map(it=>{
    const op = !!st.openReasons[it.id];
    return `<article class="nobuy-card">
      <div>
        <div class="nb-top">
          <img class="nb-thumb" src="${it.img}" alt="${it.name}">
          <div>
            <span class="nb-badge">${it.badge}</span>
            <h3 class="nb-title">${it.name}</h3>
            <div class="nb-save">첫 달 안 사서 ${won(it.saved)} 절약</div>
          </div>
        </div>
        <p class="nb-quote">“${it.quote}”</p>
        <div class="nb-alt">${it.alt}</div>
      </div>
      <div>
        <div class="nb-foot">
          <span>${it.src}</span>
          <button class="nb-btn" onclick="toggleReason('${it.id}')">고수 근거 ${it.reasons.length}명 ${op?'접기 ▴':'보기 ▾'}</button>
        </div>
        ${op ? `<ul class="nb-reasons">${it.reasons.map(r=>`<li>${r}</li>`).join('')}</ul>` : ''}
      </div>
    </article>`;
  }).join('');
}

function toggleReason(id){
  st.openReasons[id] = !st.openReasons[id];
  renderNoBuy();
}

function castVote(k){
  st.vote = st.vote===k ? null : k;
  saveState();
  renderNoBuy();
  toast(k==='up' ? '도움됨 1표를 기록했습니다 (고수에게 감사 알림 전달)' : '내 수영장 규정 차이를 기록했습니다');
}

function unlockSec2(){
  st.sec2Unlocked = true;
  saveState();
  renderCrossSection();
  toast('무가입 1탭으로 고수 5명 팩트 리포트 전체를 열었습니다');
}

function unlockAndScrollSec2(){
  st.sec2Unlocked = true;
  saveState();
  renderCrossSection();
  document.getElementById('sec2Cross').scrollIntoView({behavior:'smooth'});
}

function renderCrossSection(){
  const content = document.getElementById('blurContent');
  const veil = document.getElementById('blurVeil');
  content.classList.toggle('locked', !st.sec2Unlocked);
  veil.classList.toggle('hide', st.sec2Unlocked);

  document.getElementById('issueTabs').innerHTML = Object.keys(CROSS_ISSUES).map(k=>`
    <button class="iss-btn ${st.issue===k?'on':''}" onclick="st.issue='${k}';renderCrossSection()">
      ${CROSS_ISSUES[k].label}
    </button>`).join('');

  const cur = CROSS_ISSUES[st.issue];
  document.getElementById('crossPanel').innerHTML = `<div class="panel-card">
    <div class="panel-head">
      <strong>품목 쟁점 : ${cur.label} (고수 5명 교차 판정)</strong>
      <span class="meta-tag">의견 갈림 · 조건별 대조</span>
    </div>
    <div style="font-size:12.5px;color:var(--sub);font-weight:700">${cur.summary}</div>
    <div class="dist-bar"><div class="dist-pro" style="width:${cur.proPct}%"></div></div>
    ${cur.opinions.map(op=>`
      <div class="op-card ${op.kind}">
        <div class="op-top">
          <span>${op.who}</span>
          <span class="op-tag">${op.tag}</span>
        </div>
        <div>“${op.txt}”</div>
      </div>`).join('')}
  </div>`;

  document.getElementById('factTableWrap').innerHTML = FACT_ROWS.map(r=>`
    <div class="fact-row">
      <strong>${r.k}</strong>
      <div>
        <span class="fact-trap">✕ 초보 실패 함정: ${r.trap}</span>
        <span class="fact-pick">✓ 고수 공통 선택: ${r.pick}</span>
        <span style="color:var(--sub);font-size:11.5px">이유: ${r.why}</span>
      </div>
    </div>`).join('');

  renderSeedBags();
}

function renderSeedBags(){
  const list = [...SEED_BAGS].sort((a,b)=>(b.realm===st.realm?1:0)-(a.realm===st.realm?1:0));
  document.getElementById('seedBagGrid').innerHTML = list.map(b=>`
    <article class="seed-card" onclick="openBagDrawer('${b.id}')">
      <div>
        <div class="seed-img-wrap">
          <img src="${b.img}" alt="${b.title}">
          <span class="seed-pill">${b.pill}</span>
          <span class="seed-save-pill">${b.save}</span>
        </div>
        <div class="seed-body">
          <div class="seed-who">${b.who}</div>
          <h4 class="seed-title">${b.title}</h4>
          <p class="seed-hook">${b.hook}</p>
          <div class="seed-avoid">${b.avoid}</div>
        </div>
      </div>
    </article>`).join('');
}
