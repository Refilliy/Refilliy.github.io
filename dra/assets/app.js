/* Buildless, dependency-free interactions. Canon lives in content.js. */
(() => {
  'use strict';
  const data = window.ACADEMIA;
  if (!data) return;
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const escape = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const colors = {balaur:'#ce8a79',ophion:'#86adc9',ceto:'#8eb59b',faculty:'#bfab84',street:'#a9b49b',imperial:'#d8be80',dragon:'#afa4d2'};
  const groupName = character => data.groupLabels[character.group] || character.group;
  const characterTheme = character => {
    if (character.house) return character.house;
    if (character.groups.includes('imperial')) return 'imperial';
    const shop = data.shops.find(item => item.name === character.shop);
    return shop ? (shop.house || shop.id) : character.group;
  };

  const menu = $('.menu-toggle');
  const nav = $('#main-nav');
  function closeMenu(restoreFocus = false) {
    nav.classList.remove('is-open');
    menu.setAttribute('aria-expanded', 'false');
    $('.sr-only', menu).textContent = '메뉴 열기';
    $('.menu-icon', menu).textContent = '☰';
    if (restoreFocus) menu.focus();
  }
  menu.addEventListener('click', () => {
    const open = menu.getAttribute('aria-expanded') !== 'true';
    nav.classList.toggle('is-open', open);
    menu.setAttribute('aria-expanded', String(open));
    $('.sr-only', menu).textContent = open ? '메뉴 닫기' : '메뉴 열기';
    $('.menu-icon', menu).textContent = open ? '×' : '☰';
  });
  $$('a', nav).forEach(link => link.addEventListener('click', () => closeMenu()));
  document.addEventListener('keydown', event => {if (event.key === 'Escape' && nav.classList.contains('is-open')) closeMenu(true);});
  document.addEventListener('click', event => {if (!event.target.closest('.site-header')) closeMenu();});
  matchMedia('(min-width: 761px)').addEventListener('change', () => closeMenu());

  // Keyboard-accessible tabs use a single tab stop and arrow/Home/End navigation.
  function setupTabs(container, onSelect) {
    const tabs = $$('[role="tab"]', container);
    function select(tab) {
      tabs.forEach(item => {item.setAttribute('aria-selected', String(item === tab)); item.tabIndex = item === tab ? 0 : -1;});
      onSelect(tab);
    }
    tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => select(tab));
      tab.addEventListener('keydown', event => {
        let next;
        if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
        if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
        if (event.key === 'Home') next = 0;
        if (event.key === 'End') next = tabs.length - 1;
        if (next !== undefined) {event.preventDefault(); select(tabs[next]); tabs[next].focus();}
      });
    });
    select(tabs.find(tab => tab.getAttribute('aria-selected') === 'true') || tabs[0]);
  }
  setupTabs($('.world-tabs'), tab => $$('.world-panel').forEach(panel => {panel.hidden = panel.id !== tab.getAttribute('aria-controls');}));
  $('#magic-types').innerHTML = data.magicTypes.map(magic => `<span>${escape(magic)}</span>`).join('');
  $('#dragon-types').innerHTML = [...new Set(data.dragonTypes.map(type => type.category))].map(category => `<h4 class="dragon-category">${escape(category)}</h4><p class="dragon-names">${data.dragonTypes.filter(type => type.category === category).map(type => escape(type.name)).join(' · ')}</p>`).join('');
  $('#shop-list').innerHTML = data.shops.map(shop => `<article><img class="shop-symbol" src="${escape(shop.symbol)}" alt="" width="1080" height="1080" loading="lazy" decoding="async"><div><h4>${escape(shop.name)}</h4><small>${escape(shop.owner)}</small><p>${escape(shop.description)}</p></div></article>`).join('');
  $('#timeline').innerHTML = data.timeline.map(item => `<li><time>${escape(item.date)}</time><h4>${escape(item.title)}</h4><p>${escape(item.description)}</p></li>`).join('');

  function renderHouse(id) {
    const house = data.houses.find(item => item.id === id);
    const panel = $('#house-panel');
    panel.dataset.house = id;
    panel.setAttribute('aria-labelledby', `house-tab-${id}`);
    panel.style.setProperty('--house-color', colors[id]);
    panel.innerHTML = `<div class="house-crest" aria-hidden="true"><img src="${escape(house.symbol)}" alt="" width="1080" height="1080" decoding="async"></div><div class="house-content"><span class="small-label">${escape(house.value)}</span><h3>${escape(house.name)}</h3><blockquote>“${escape(house.motto)}”</blockquote><details open class="house-more"><summary>기숙사 소개</summary><p>${escape(house.description)}</p></details><dl class="house-facts"><div><dt>아티팩트</dt><dd>${escape(house.artifact)}</dd></div><div><dt>드래곤샵</dt><dd>${escape(house.shop)}</dd></div><div><dt>담당 교수</dt><dd>${escape(house.professor)}</dd></div><div><dt>헤더</dt><dd>${escape(house.header)}</dd></div></dl><a class="text-link" href="#characters" data-house-filter="${id}">기숙사 인물 보기 <span aria-hidden="true">↗</span></a></div>`;
    $('[data-house-filter]', panel).addEventListener('click', () => {setFilter(id); $('#character-search').value = ''; renderCharacters();});
  }
  setupTabs($('.house-tabs'), tab => renderHouse(tab.dataset.house));

  let filter = 'all';
  let expanded = false;
  const search = $('#character-search');
  function setFilter(next) {
    filter = next; expanded = false;
    $$('[data-filter]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.filter === filter)));
  }
  function renderCharacters() {
    const query = search.value.trim().toLocaleLowerCase('ko');
    const records = data.characters.filter(character => {
      const visible = filter === 'all' || character.groups.includes(filter) || character.house === filter;
      const searchable = [character.name, character.role, character.magic, character.partner, character.specialty, character.mbti, groupName(character)].join(' ').toLocaleLowerCase('ko');
      return visible && searchable.includes(query);
    });
    const shown = expanded || filter !== 'all' || query ? records : records.slice(0, 6);
    $('#character-total').textContent = data.characters.length;
    $('#result-count').textContent = `${filter === 'all' ? '전체' : data.groupLabels[filter]} · ${records.length}명${shown.length < records.length ? ` 중 ${shown.length}명 표시` : ''}${query ? ` · “${search.value.trim()}” 검색 결과` : ''}`;
    $('#character-grid').innerHTML = shown.length ? shown.map(character => `<button class="record-card" data-character="${character.id}" data-theme="${escape(characterTheme(character))}" aria-label="${escape(character.name)} 프로필 보기"><img class="record-portrait" src="${escape(character.portrait || `assets/characters/${character.id}.webp`)}" width="1536" height="640" alt="${escape(character.name)} 초상" loading="lazy" decoding="async"><span class="record-info"><span class="record-copy"><strong>${escape(character.name)}</strong><small>${escape(character.role)}</small></span><span class="record-arrow" aria-hidden="true">↗</span></span></button>`).join('') : '<p class="empty-results">일치하는 인물이 없습니다.<br>검색어나 소속을 바꿔 보세요.</p>';
    $('#show-more').hidden = shown.length >= records.length;
    $$('[data-character]').forEach(button => button.addEventListener('click', () => openCharacter(button.dataset.character)));
  }
  $$('[data-filter]').forEach(button => button.addEventListener('click', () => {setFilter(button.dataset.filter); renderCharacters();}));
  search.addEventListener('input', () => {expanded = false; renderCharacters();});
  $('#show-more').addEventListener('click', () => {
    const firstNewId = data.characters[6]?.id;
    expanded = true; renderCharacters();
    if (firstNewId) $(`[data-character="${firstNewId}"]`)?.focus({preventScroll:true});
  });
  renderCharacters();

  const dialog = $('#character-dialog');
  let previousFocus;
  function openCharacter(id) {
    const character = data.characters.find(item => item.id === id);
    if (!character) return;
    previousFocus = document.activeElement;
    const primaryFacts = [
      ['나이', `${character.age}세`],['공개 신분',character.status],
      ['마법',character.magic],['파트너 드래곤',character.partner],['전문·담당 분야',character.specialty]
    ].filter(([,value]) => value);
    const extendedFacts = [
      ['학년',character.year],['소속 기숙사',data.houses.find(house => house.id === character.house)?.name],['전직',character.previousRole],['종족',character.species],
      ['운영 상점',character.shop],['칭호',character.title],['황위 계승',character.succession],['얼굴 공개',character.facePublic],['성장 단계',character.stage],
      ['수인화',character.transformation],['특수 능력',character.specialAbility],['성향',character.alignment],['애착 유형',character.attachment],['캐릭터 속성',character.trope],['성격 유형',character.personality]
    ].filter(([,value]) => value);
    const renderFacts = facts => `<dl class="profile-facts">${facts.map(([label,value]) => `<div${label === '파트너 드래곤' || label === '성격 유형' || label === '수인화' ? ' class="wide"' : ''}><dt>${escape(label)}</dt><dd>${escape(value)}</dd></div>`).join('')}</dl>`;
    $('#dialog-content').innerHTML = `<img class="dialog-portrait" src="${escape(character.portrait || `assets/characters/${character.id}.webp`)}" width="1536" height="640" alt="${escape(character.name)} 초상" decoding="async"><p class="eyebrow">${escape(groupName(character))}</p><h2 id="dialog-name" class="dialog-name">${escape(character.name)}</h2><p class="dialog-role">${escape(character.role)}</p><p class="dialog-description">${escape(character.description)}</p>${renderFacts(primaryFacts)}${extendedFacts.length || character.relationship ? `<details class="profile-deeper"><summary>상세 설정 보기</summary>${extendedFacts.length ? renderFacts(extendedFacts) : ''}${character.relationship ? `<p class="profile-extra"><strong>관계 기록</strong>${escape(character.relationship)}</p>` : ''}</details>` : ''}${character.secrets ? `<details class="profile-secret"><summary>비공개 기록 · 스포일러</summary><p class="spoiler-label">일부 인물만 알고 있는 설정입니다.</p><p><strong>${escape(character.secrets.status)}</strong> · ${escape(character.secrets.succession)}</p><p>${escape(character.secrets.description)}</p><p>${escape(character.secrets.relationship)}</p><p>황녀로서 얼굴 공개: ${escape(character.secrets.facePublic)}</p></details>` : ''}<a class="text-link dialog-action" href="#begin">이야기 시작 <span aria-hidden="true">↗</span></a>`;
    $('.dialog-action').addEventListener('click', () => {dialog.close(); requestAnimationFrame(() => $('#begin .button').focus({preventScroll:true}));});
    dialog.showModal();
    document.body.style.overflow = 'hidden';
    $('.dialog-close').focus();
  }
  $$('[data-character-name]').forEach(button => button.addEventListener('click', () => openCharacter(data.characters.find(character => character.name === button.dataset.characterName)?.id)));
  $('.dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    const rect = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) dialog.close();
  });
  dialog.addEventListener('close', () => {document.body.style.overflow = ''; previousFocus?.focus({preventScroll:true});});

  let campusModel = null;
  const courseNotes = ['교감 · 마법 · 전투 · 아티팩트','발라우르 · 오피온 · 케토','드래곤 비행 실습','치료학 · 드래곤 치료','식물과 약초 관리','저학년 사육·관리 교육','고학년 파트너 드래곤 먹이 확보'];
  function renderFacility(id) {
    const index = data.facilities.findIndex(facility => facility.id === id);
    if (index < 0) return;
    const facility = data.facilities[index];
    $$('[data-facility]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.facility === id)));
    $('#facility-detail').innerHTML = `<span class="facility-number">${String(index + 1).padStart(2,'0')}</span><h3 class="facility-name">${escape(facility.name)}</h3><p class="facility-description">${escape(facility.description)}</p><p class="facility-course">${escape(courseNotes[index])}</p>`;
    campusModel?.select(id);
  }
  $('#facility-tabs').innerHTML = data.facilities.map((facility,index) => `<button type="button" data-facility="${facility.id}" aria-pressed="false" aria-controls="facility-detail"><span aria-hidden="true">${String(index + 1).padStart(2,'0')}</span>${escape(facility.name)}</button>`).join('');
  $('#map-points').innerHTML = data.facilities.map((facility,index) => `<button type="button" class="map-point" data-facility="${facility.id}" aria-pressed="false" aria-controls="facility-detail" aria-label="${escape(facility.name)} 살펴보기" hidden><span class="map-pin" aria-hidden="true">${index + 1}</span><span class="map-point-label" aria-hidden="true">${escape(facility.name)}</span></button>`).join('');
  $$('[data-facility]').forEach(button => button.addEventListener('click', () => renderFacility(button.dataset.facility)));
  const mapPins = new Map($$('.map-point').map(button => [button.dataset.facility,button]));
  const campusCanvas = $('#campus-canvas');
  try {
    campusModel = window.CampusMap3D?.mount(campusCanvas, {
      onSelect: renderFacility,
      onProjection: anchors => {
        const edgeX = 24 / Math.max(campusCanvas.clientWidth,1) * 100;
        const edgeTop = 58 / Math.max(campusCanvas.clientHeight,1) * 100;
        const edgeBottom = 80 / Math.max(campusCanvas.clientHeight,1) * 100;
        anchors.forEach(({id,x,y,visible}) => {
          const pin = mapPins.get(id);
          if (!pin) return;
          const inBounds = visible !== false && Number.isFinite(x) && Number.isFinite(y) && x > edgeX && x < 100-edgeX && y > edgeTop && y < 100-edgeBottom;
          pin.hidden = !inBounds;
          if (inBounds) {pin.style.left = `${x}%`; pin.style.top = `${y}%`;}
        });
      }
    }) || null;
  } catch (error) {
    console.warn('Campus map is using its static view.',error);
  }
  if (campusModel) {
    $('.campus-map').classList.add('is-ready');
    $('.map-controls').hidden = false;
    const mapActions = {left:()=>campusModel.rotateBy(-18),right:()=>campusModel.rotateBy(18),out:()=>campusModel.zoomBy(1/1.18),in:()=>campusModel.zoomBy(1.18),reset:()=>campusModel.reset()};
    $$('[data-map-action]').forEach(button => button.addEventListener('click',()=>mapActions[button.dataset.mapAction]?.()));
    campusCanvas.addEventListener('keydown',event=>{
      const action = {ArrowLeft:'left',ArrowRight:'right','+':'in','=':'in','-':'out',Home:'reset'}[event.key];
      if (action) {event.preventDefault(); mapActions[action]();}
    });
  } else {
    campusCanvas.tabIndex = -1;
    $('#campus-help').textContent = '아래 목록에서 시설 안내를 확인하세요.';
  }
  renderFacility(data.facilities[0].id);

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) $$('a',nav).forEach(link => {
          const active = link.getAttribute('href') === `#${entry.target.id}`;
          link.classList.toggle('active',active);
          if (active) link.setAttribute('aria-current','location'); else link.removeAttribute('aria-current');
        });
      });
    },{rootMargin:'-15% 0px -65% 0px',threshold:0});
    $$('main>section[id]').forEach(section => observer.observe(section));
  }
})();
