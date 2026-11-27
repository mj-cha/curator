const STORAGE_KEY = 'gosutem.v3.state.v1';

let st = { cat:'전체', slide:0, cur:STORIES[0], tab:'story', grid2:false, likes:{}, acts:[], gear:{}, drawerMode:'detail' };

function loadState(){
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === 'object') {
      st.likes = parsed.likes || {};
      st.acts = Array.isArray(parsed.acts) ? parsed.acts : [];
      st.gear = parsed.gear || {};
    }
  } catch (e) {
    /* localStorage blocked fallback */
  }
  const cnt = document.getElementById('actCnt');
  if (cnt) cnt.textContent = st.acts.length;
}

function saveState(){
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      likes: st.likes,
      acts: st.acts,
      gear: st.gear,
      updatedAt: new Date().toISOString()
    }));
  } catch (e) {
    /* ignore storage block */
  }
}

function resetPilotSession(){
  st.likes = {}; st.acts = []; st.gear = {};
  try { localStorage.removeItem(STORAGE_KEY); } catch (e) {}
  document.getElementById('actCnt').textContent = '0';
  renderFeed();
  if (document.getElementById('overlay').classList.contains('open')) renderDrawer();
  toast('시연 기록을 초기화했어요');
}

function toast(m){
  const t=document.getElementById('toast'); t.textContent=m; t.classList.add('show');
  clearTimeout(t._id); t._id=setTimeout(()=>t.classList.remove('show'),1800);
}
function setMode(m){
  document.body.classList.toggle('mob', m==='mob');
  document.getElementById('mPc').classList.toggle('on', m==='pc');
  document.getElementById('mMob').classList.toggle('on', m==='mob');
}
function resetHome(){
  st.cat='전체'; document.getElementById('qInput').value='';
  renderCats(); renderFeed(); window.scrollTo({top:0,behavior:'smooth'});
}
function renderHero(){
  const s=HERO_SLIDES[st.slide];
  const img=document.getElementById('heroImg');
  img.style.opacity='.35';
  setTimeout(()=>{ img.src=s.img; img.style.opacity='1'; },140);
  document.getElementById('heroK').textContent=s.k;
  document.getElementById('heroT').textContent=s.t;
  document.getElementById('heroDots').innerHTML=HERO_SLIDES.map((_,i)=>`<button class="${i===st.slide?'on':''}" onclick="st.slide=${i};renderHero()" aria-label="슬라이드 ${i+1}"></button>`).join('');
}
setInterval(()=>{ st.slide=(st.slide+1)%HERO_SLIDES.length; renderHero(); }, 5200);

function renderCats(){
  document.getElementById('catList').innerHTML=Object.keys(ICONS).map(k=>`
    <button class="cat-btn ${st.cat===k?'on':''}" onclick="st.cat='${k}';renderCats();renderFeed()">
      <svg viewBox="0 0 24 24">${ICONS[k]}</svg>
      <span>${k}</span>
    </button>`).join('');
}
function toggleLike(id,e){
  e.stopPropagation(); st.likes[id]=!st.likes[id];
  saveState();
  renderFeed(); toast(st.likes[id]?'찜한 이야기에 저장했어요':'찜을 해제했어요');
}
function renderFeed(){
  const q=(document.getElementById('qInput')?.value||'').trim().toLowerCase();
  const list=STORIES.filter(s=>(st.cat==='전체'||s.cat===st.cat)&&(!q||s.title.toLowerCase().includes(q)||s.cat.includes(q)||s.intro.toLowerCase().includes(q)));
  document.getElementById('feedCount').textContent=`${list.length}개의 검증된 이야기`;
  const grid=document.getElementById('feedGrid');
  grid.innerHTML=list.map(s=>`
    <article class="card" onclick="openStory('${s.id}')">
      <div class="thumb">
        <img src="${s.photo}" alt="${s.title}" loading="lazy">
        <span class="pill-tag">${s.tag}</span>
        <button class="like-btn ${st.likes[s.id]?'on':''}" onclick="toggleLike('${s.id}',event)" aria-label="찜">
          <svg viewBox="0 0 24 24"><path d="M12 21s-7-4.4-9.3-8.4C.9 9.4 2.7 5.5 6.4 5.1c2-.2 3.8.9 4.6 2.4.8-1.5 2.6-2.6 4.6-2.4 3.7.4 5.5 4.3 3.7 7.5C19 16.6 12 21 12 21Z"/></svg>
        </button>
      </div>
      <div class="c-body">
        <div class="c-top"><span class="c-who">${s.who}</span><span class="c-help">도움됨 ${s.help}</span></div>
        <h3 class="c-title">${s.title}</h3>
        <p class="c-intro">${s.intro}</p>
      </div>
    </article>`).join('');
  requestAnimationFrame(()=>{
    grid.querySelectorAll('.card').forEach((el,i)=>setTimeout(()=>el.classList.add('vis'), i*55));
  });
}

function openStory(id){
  st.cur=STORIES.find(s=>s.id===id)||STORIES[0];
  st.drawerMode='detail'; st.tab='story';
  document.getElementById('drawerTabs').style.display='inline-flex';
  document.getElementById('photoModeBtn').style.display='inline-block';
  renderDrawer();
  document.getElementById('overlay').classList.add('open');
}
function openMyActivity(){
  st.drawerMode='activity';
  document.getElementById('drawerTabs').style.display='none';
  document.getElementById('photoModeBtn').style.display='none';
  renderDrawer();
  document.getElementById('overlay').classList.add('open');
}
function closeDrawer(){ document.getElementById('overlay').classList.remove('open'); }
function switchDrawer(t){ st.tab=t; renderDrawer(); }
function togglePhotoGrid(){
  st.grid2=!st.grid2;
  document.getElementById('photoModeBtn').textContent=st.grid2?'1장 크게':'2×2 룩북';
  renderDrawer();
}
function toggleAct(id,title,cat){
  const i=st.acts.findIndex(x=>x.id===id);
  if(i>=0){ st.acts.splice(i,1); toast('내 활동에서 뺐어요'); }
  else { st.acts.push({id,title,cat,done:false,savedAt:new Date().toISOString()}); toast('내 활동에 담겼어요!'); }
  saveState();
  document.getElementById('actCnt').textContent=st.acts.length;
  renderDrawer();
}
function toggleDone(id){
  const it=st.acts.find(x=>x.id===id); if(!it) return;
  it.done=!it.done;
  it.completedAt=it.done?new Date().toISOString():null;
  saveState();
  renderDrawer(); toast(it.done?'첫 행동 완료!':'다시 해볼 것으로 옮겼어요');
}
function setGear(gid,val){ st.gear[gid]=val; saveState(); renderDrawer(); }

function renderDrawer(){
  const body=document.getElementById('drawerBody'), foot=document.getElementById('drawerFoot');
  if(st.drawerMode==='activity'){
    body.innerHTML=`<div style="display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:6px">
        <h2 style="margin:0;font-size:22px;font-weight:800">내 활동 (${st.acts.length})</h2>
        ${st.acts.length?`<button class="reset-btn" onclick="resetPilotSession()">기록 비우기</button>`:''}
      </div>
      <p style="margin:0 0 20px;font-size:13.5px;color:var(--sub)">담아둔 5분 첫 행동을 누르면 완료 처리됩니다.</p>
      ${st.acts.length?st.acts.map(a=>`
        <div class="act-card my-item ${a.done?'done picked':''}" onclick="toggleDone('${a.id}')">
          <div>
            <div style="font-size:11.5px;font-weight:700;color:var(--sub)">${a.cat}${a.savedAt?` · 담은 시각 ${a.savedAt.slice(5,16).replace('T',' ')}`:''}</div>
            <div style="font-size:15px;font-weight:700;margin-top:2px">${a.title}</div>
          </div>
          <div class="chk">${a.done?'✓':''}</div>
        </div>`).join(''):'<div style="padding:48px 0;text-align:center;color:var(--sub)">아직 담긴 활동이 없습니다.<br>이야기를 열어 5분 첫 행동을 담아보세요.</div>'}`;
    foot.innerHTML=`<button class="btn-dark" onclick="closeDrawer()">계속 둘러보기</button>`;
    return;
  }
  const s=st.cur;
  document.getElementById('dtStory').classList.toggle('on', st.tab==='story');
  document.getElementById('dtGear').classList.toggle('on', st.tab==='gear');
  document.getElementById('photoModeBtn').style.display=st.tab==='story'?'inline-block':'none';

  if(st.tab==='story'){
    const imgHtml=st.grid2
      ? `<div class="d-grid2"><img src="${s.photo}" alt=""><img src="${s.photo}" style="filter:contrast(1.08)" alt=""><img src="${s.photo}" style="filter:saturate(.82)" alt=""><img src="${s.photo}" style="filter:brightness(.94)" alt=""></div>`
      : `<img class="d-photo" src="${s.photo}" alt="${s.title}">`;
    body.innerHTML=`<div class="d-split">
      <div>${imgHtml}</div>
      <div>
        <div style="font-size:12px;font-weight:700;color:var(--sub)">${s.cat} · ${s.who}</div>
        <h2 style="margin:6px 0 16px;font-size:24px;font-weight:800;line-height:1.3;letter-spacing:-.02em">${s.title}</h2>
        <div class="sum-box"><div class="k">왜 계속하게 됐나</div><div class="v">${s.why}</div></div>
        <div class="sum-box"><div class="k">처음 제일 막혔던 점</div><div class="v">${s.stuck}</div></div>
        <div class="sum-box"><div class="k">이런 분께 맞아요</div><div class="v">${s.fit}</div></div>
        <h3 style="margin:22px 0 10px;font-size:15px;font-weight:800">돈 안 들이고 오늘 해볼 첫 행동</h3>
        ${s.actions.map(a=>{
          const p=st.acts.some(x=>x.id===a.id);
          return `<button class="act-card ${p?'picked':''}" onclick="toggleAct('${a.id}','${a.t.replace(/'/g,"\\'")}','${s.cat}')">
            <div><div style="font-size:14.5px;font-weight:700;margin-bottom:2px">${a.t}</div><div style="font-size:12.5px;color:var(--sub)">${a.d}</div></div>
            <div class="chk">${p?'✓':''}</div>
          </button>`;
        }).join('')}
      </div>
    </div>`;
    foot.innerHTML=`<button class="btn-line" onclick="switchDrawer('gear')">준비물 탁탁탁 분류 →</button><button class="btn-dark" onclick="openMyActivity()">내 활동 보기 (${st.acts.length})</button>`;
  } else {
    const opts=[{k:'have',l:'이미 있음'},{k:'alt',l:'대체·대여'},{k:'no',l:'안 사도 됨'},{k:'buy',l:'사고 싶음'}];
    const buyN=s.gears.filter(g=>st.gear[g.id]==='buy').length;
    body.innerHTML=`<h2 style="margin:0 0 6px;font-size:22px;font-weight:800">${s.cat} 준비물, 살 것만 탁탁탁 골라보세요</h2>
      <p style="margin:0 0 18px;font-size:13.5px;color:var(--sub)">설명 없이 상태만 누르면 '사고 싶음'만 아래에 딱 모입니다.</p>
      ${s.gears.map(g=>`<div class="gear-card ${g.avoid?'warn':''}">
        <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;margin-bottom:4px">
          <strong style="font-size:15.5px">${g.name}</strong>
          ${g.avoid?'<span style="font-size:11px;font-weight:800;color:#C9352B;border:1px solid #C9352B;padding:2px 8px;border-radius:4px;background:#fff">사지 마</span>':''}
        </div>
        <div style="font-size:13px;color:var(--sub);line-height:1.45">${g.tip}</div>
        <div class="chip4">${opts.map(o=>`<button class="st-chip ${o.k==='buy'?'buy':''} ${st.gear[g.id]===o.k?'on':''}" onclick="setGear('${g.id}','${o.k}')">${o.l}</button>`).join('')}</div>
      </div>`).join('')}
      <div style="font-size:12px;color:var(--sub);padding:12px 14px;background:var(--bg);border-radius:10px">공정 안내: 추후 구매 링크 결제 시 추천자에게 수수료가 지급될 수 있으며, '사지 마' 라벨은 광고로 변경 불가합니다.</div>`;
    foot.innerHTML=`<button class="btn-line" onclick="switchDrawer('story')">← 이야기로</button><button class="btn-dark" onclick="toast('${buyN>0?`선택한 ${buyN}개만 최저가·중고 비교 화면으로 연결됩니다`:'필요한 물건만 사고 싶음을 눌러보세요'}')">${buyN>0?`사고 싶은 ${buyN}개만 비교하기`:'아직 살 물건 없음 (안 사도 OK)'}</button>`;
  }
}

loadState(); renderHero(); renderCats(); renderFeed();
