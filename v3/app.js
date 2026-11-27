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

/* 특허 A (10-2026-0235511): 예산 제약 하 라벨 가중 채널 하향 최적화 */
function onBudgetSlide(val){
  const b = Number(val);
  st.budget = b;
  st.preset = 'custom';
  if(b >= 78000){
    st.picks = { 'ch-goggles':'new', 'ch-cap':'new', 'ch-suit':'new', 'ch-towel':'new' };
  } else if(b >= 68000){
    st.picks = { 'ch-goggles':'new', 'ch-cap':'used', 'ch-suit':'new', 'ch-towel':'zero' };
  } else if(b >= 56000){
    st.picks = { 'ch-goggles':'used', 'ch-cap':'used', 'ch-suit':'new', 'ch-towel':'zero' };
  } else {
    st.picks = { 'ch-goggles':'used', 'ch-cap':'used', 'ch-suit':'sim', 'ch-towel':'zero' };
  }
  saveState();
  renderBudgetSection();
}

function applyPreset(mode, budgetVal){
  st.preset = mode;
  st.budget = budgetVal;
  const sl = document.getElementById('budgetSlider');
  if(sl) sl.value = budgetVal;
  if(mode==='core') st.picks = { 'ch-goggles':'new', 'ch-cap':'new', 'ch-suit':'new', 'ch-towel':'new' };
  if(mode==='used') st.picks = { 'ch-goggles':'used', 'ch-cap':'used', 'ch-suit':'new', 'ch-towel':'zero' };
  if(mode==='min')  st.picks = { 'ch-goggles':'used', 'ch-cap':'used', 'ch-suit':'sim', 'ch-towel':'zero' };
  saveState();
  renderBudgetSection();
}

function pickOption(itemId, optId){
  st.picks[itemId] = optId;
  st.preset = 'custom';
  saveState();
  renderBudgetSection();
}

function calcTotal(){
  return CORE_CHOICES.reduce((sum, it)=>{
    const o = it.options.find(x=>x.id===st.picks[it.id]) || it.options[0];
    return sum + (o ? o.price : 0);
  }, 0);
}

function renderBudgetSection(){
  const total = calcTotal();
  const saved = Math.max(0, SEARCH_AVG - total);
  document.getElementById('budgetSliderLabel').textContent = `목표 예산 ${won(st.budget)} → 최적 조합 ${won(total)}`;
  document.getElementById('curTotalTxt').textContent = won(total);
  document.getElementById('curSavedTxt').textContent = `${won(saved)} 절약`;
  document.getElementById('stickyTotal').textContent = won(total);
  document.getElementById('stickySave').textContent = `일반 풀세트(₩148,000) 대비 ${won(saved)} 절약 (첫 달 사지 마 3종 제외 완료)`;

  document.getElementById('prCore').classList.toggle('on', st.preset==='core');
  document.getElementById('prUsed').classList.toggle('on', st.preset==='used');
  document.getElementById('prMin').classList.toggle('on', st.preset==='min');

  document.getElementById('choiceGrid').innerHTML = CORE_CHOICES.map(it=>{
    const cur = st.picks[it.id] || it.options[0].id;
    return `<article class="choice-card" id="card-${it.id}">
      <div class="ch-head">
        <img class="ch-thumb" src="${it.img}" alt="${it.name}">
        <div>
          <span class="step-badge step-blue">${it.label}</span>
          <h3 style="margin:4px 0 2px;font-size:15.5px;font-weight:900">${it.name}</h3>
          <div style="font-size:12px;color:var(--sub)">${it.summary}</div>
        </div>
      </div>
      <div class="ch-opts">
        ${it.options.map(o=>`
          <button class="opt-btn ${cur===o.id?'on':''}" onclick="pickOption('${it.id}','${o.id}')">
            <span class="opt-k">${o.kind}</span>
            <strong class="opt-p">${o.price ? won(o.price) : '0원'}</strong>
            <span class="opt-d">${o.desc}</span>
          </button>`).join('')}
      </div>
      <div style="font-size:11.5px;color:var(--ok);font-weight:700;margin-bottom:8px">0원·절약 참고: ${it.zeroAlt}</div>
      <div class="out-links">
        <span style="font-weight:800;color:var(--ink)">실시간 시세 직통(가중치 0):</span>
        ${it.links.map(l=>`<a class="out-a" href="${l[1]}" target="_blank" rel="noopener">${l[0]} ↗</a>`).join('')}
      </div>
    </article>`;
  }).join('');

  renderRules();
}

function toggleRules(){
  st.rulesOpen = !st.rulesOpen;
  renderRules();
}

function toggleRuleCheck(idx){
  st.checkedRules[idx] = !st.checkedRules[idx];
  saveState();
  renderRules();
}

function renderRules(){
  const done = Object.values(st.checkedRules).filter(Boolean).length;
  document.getElementById('ruleDoneCnt').textContent = done;
  document.getElementById('ruleToggleTxt').textContent = st.rulesOpen ? '접기 ▴' : '펼치기 ▾';
  const list = document.getElementById('rulesList');
  list.style.display = st.rulesOpen ? 'block' : 'none';
  list.innerHTML = FIRST_DAY_RULES.map((r,i)=>`
    <div class="rule-item" onclick="toggleRuleCheck(${i})">
      <strong style="color:${st.checkedRules[i]?'var(--ok)':'var(--muted)'}">${st.checkedRules[i]?'[✓ 완료]':'[ 미체크 ]'}</strong>
      <span>${r}</span>
    </div>`).join('');
}

function scrollToChoice(id){
  const el = document.getElementById('card-' + id) || document.getElementById('sec3Budget');
  if(el) el.scrollIntoView({behavior:'smooth'});
}

function openBagDrawer(bagId){
  const b = SEED_BAGS.find(x=>x.id===bagId) || SEED_BAGS[0];
  document.getElementById('drawerTitle').textContent = `${b.pill} · 6칸 고수 스토리`;
  document.getElementById('drawerBody').innerHTML = `
    <div style="display:flex;gap:14px;align-items:center;margin-bottom:16px">
      <img src="${b.img}" alt="${b.title}" style="width:88px;height:88px;border-radius:12px;object-fit:cover;border:1px solid var(--line)">
      <div>
        <div style="font-size:12px;font-weight:800;color:var(--ok)">${b.pill} · ${b.save}</div>
        <h2 style="margin:4px 0;font-size:18px;font-weight:900;line-height:1.3">${b.title}</h2>
        <div style="font-size:12px;color:var(--sub)">${b.who}</div>
      </div>
    </div>
    <div class="seed-avoid" style="margin-bottom:16px;font-size:12.5px">${b.avoid}</div>
    <h3 style="font-size:14px;font-weight:900;margin:0 0 10px">고수의 6칸 시행착오 스토리 (말한 내용만 기록 · 할루시네이션 삭제 검증)</h3>
    ${b.story.map(row=>`
      <div style="padding:10px 12px;background:var(--bg);border-radius:8px;margin-bottom:8px;font-size:12.5px">
        <strong style="display:block;color:var(--sub);font-size:11.5px;margin-bottom:2px">${row[0]}</strong>
        <div style="font-weight:600;line-height:1.5">${row[1]}</div>
      </div>`).join('')}
  `;
  document.getElementById('drawerFoot').innerHTML = `
    <button class="btn-dark" onclick="saveBagToChecklist('${b.id}')">이 고수 가방 기준을 내 체크리스트에 담기 (${b.save})</button>
  `;
  document.getElementById('overlay').classList.add('open');
}

function saveBagToChecklist(bagId){
  const b = SEED_BAGS.find(x=>x.id===bagId);
  if(!b) return;
  if(!st.savedBags.some(x=>x.id===bagId)){
    st.savedBags.push({ id:b.id, title:b.title, save:b.save, savedAt:new Date().toISOString() });
    saveState();
  }
  closeDrawer();
  toast('내 체크리스트에 고수 가방을 저장했습니다 (T13 파일럿 시각 기록 완료)');
}

function saveCurrentChecklist(){
  const total = calcTotal();
  const saved = Math.max(0, SEARCH_AVG - total);
  const id = 'custom-' + total;
  if(!st.savedBags.some(x=>x.id===id)){
    st.savedBags.push({
      id,
      title:`내 맞춤 수영 첫 장바구니 (총비용 ${won(total)})`,
      save:`${won(saved)} 절약`,
      savedAt:new Date().toISOString()
    });
    saveState();
  }
  toast(`내 첫 장바구니(${won(total)}, ${won(saved)} 절약)를 저장했습니다!`);
}

function openSavedDrawer(){
  document.getElementById('drawerTitle').textContent = `내 장바구니 · 체크리스트 (${st.savedBags.length}건)`;
  document.getElementById('drawerBody').innerHTML = st.savedBags.length
    ? st.savedBags.map(x=>`
      <div style="padding:14px;border:1px solid var(--line);border-radius:10px;margin-bottom:10px">
        <div style="font-size:11.5px;color:var(--ok);font-weight:800">${x.save} · 저장 시각 ${x.savedAt.slice(5,16).replace('T',' ')}</div>
        <div style="font-size:14.5px;font-weight:900;margin-top:4px">${x.title}</div>
      </div>`).join('')
    : '<div style="padding:48px 0;text-align:center;color:var(--sub)">아직 저장한 장바구니가 없습니다.<br>하단 [내 체크리스트 저장]이나 시드 가방을 눌러 담아보세요.</div>';
  document.getElementById('drawerFoot').innerHTML = `<button class="btn-dark" onclick="closeDrawer()">계속 비교하기</button>`;
  document.getElementById('overlay').classList.add('open');
}

function closeDrawer(){ document.getElementById('overlay').classList.remove('open'); }

function renderCompareView(){
  document.getElementById('allProductsWrap').innerHTML = `
    <div class="panel-card">
      <div class="panel-head">
        <strong>표준 품목별 신품 · 미개봉 중고 · 0원 대안 & 단위가격 통합 비교표</strong>
        <span class="meta-tag">정렬 가중치 0% · 확인일 2026-11-25</span>
      </div>
      ${CORE_CHOICES.map(c=>`
        <div class="fact-row">
          <strong>${c.name}</strong>
          <div>
            <span class="fact-pick">신품 총비용: ${won(c.options[0].price)} / 중고·대안: ${c.options[1].price ? won(c.options[1].price) : '0원'}</span>
            <span style="font-size:12px;color:var(--sub)">${c.summary} · ${c.zeroAlt}</span>
          </div>
        </div>`).join('')}
      <div class="fact-row">
        <strong>황금배합 단백질·식이섬유 (1회 40g)</strong>
        <div>
          <span class="fact-pick">고수템 4중 검증 황금배합: 1잔 ₩862 (월 ₩25,900 · 당류 0g · 식이섬유 5.1g · 단백질 24g)</span>
          <span class="fact-trap">시판 전용 쉐이크 1잔 ₩3,070 대비 72% 절감 · 편의점 음료(월 ₩105,000) 대비 월 ₩79,000 절약</span>
        </div>
      </div>
    </div>`;
}

function renderRegisterView(){
  document.getElementById('registerWrap').innerHTML = `
    <div class="grid2">
      <div class="panel-card">
        <span class="step-badge step-dark">1단계 · 가방 전체 사진 1장 & 음성 3문항</span>
        <h3 style="margin:10px 0 8px">신입 회원의 "준비물 뭐 사요?" 반복 질문, 10분 만에 내 링크로 만드세요</h3>
        <p style="font-size:13px;color:var(--sub);line-height:1.55">1. 가방 전체 사진 1장을 올리면 번호 핀(①~⑥)이 자동 생성됩니다.<br>2. 음성(또는 이유 선택 칩)으로 ① 후회한 물건 ② 꼭 살 물건 ③ 중고로 충분한 물건 3가지만 답하세요.<br>3. 특허 출원(10-2026-0235514) 삭제형 검증기가 고수가 말하지 않은 과장 숫자나 효능 문구를 자동 삭제해 명예를 지킵니다.</p>
        <button class="btn-dark-lg" style="margin-top:12px" onclick="toast('1R 컨시어지 & 모바일 인터뷰 폼(curator/interview)과 연동됩니다')">내 고수 가방 10분 등록 시작하기</button>
      </div>
      <div class="panel-card">
        <span class="step-badge step-blue">2단계 · 특허 출원(10-2026-0235515) 결과 기반 고수 레벨</span>
        <h3 style="margin:10px 0 8px">창립 고수 #012 결과 리포트 (예시)</h3>
        <div style="padding:14px;background:var(--ok-bg);border-radius:10px;margin-bottom:10px">
          <strong style="font-size:15px;color:var(--ok)">“당신의 가방 덕분에 입문자 42명이 총 ₩1,302,000을 아꼈습니다”</strong>
          <div style="font-size:12px;color:var(--sub);margin-top:4px">팔로워 수 반영 0점 · 오직 제3자 절감 결과와 30일 후 만족도로만 레벨 산정</div>
        </div>
        <div style="font-size:12.5px;line-height:1.6;color:var(--sub)">
          · <strong>사람 줄 증거 배지</strong>: 3단계 자격 확인(생활스포츠지도사 2급 · 라이프가드)<br>
          · <strong>물건 줄 증거 배지</strong>: 내돈내산 영수증 확인 · 실물 보유 확인<br>
          · <strong>감사 알림</strong>: "덕분에 오리발 안 샀어요" 감사 알림 19건 (2주 잔존율 +2%p)
        </div>
      </div>
    </div>`;
}

function renderAll(){
  renderRealms();
  renderHero();
  renderNoBuy();
  renderCrossSection();
  renderBudgetSection();
}

loadState();
renderAll();
