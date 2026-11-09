/* 드라고니움 아카데미아 — 제공된 원안에 근거한 공개 설정집.
 * secrets는 화면에서 기본 비공개이며, 별도의 스포일러 동의 후 표시합니다.
 * 정적 사이트이므로 secrets는 보안용 비밀 저장소가 아닙니다.
 */
window.ACADEMIA = (() => {
  const characters = [
    {
      id: 'elioni', name: '엘리오니', group: 'balaur', groups: ['balaur'], house: 'balaur',
      age: 21, year: '2학년', role: '발라우르 헤더', status: '귀족',
      magic: '불꽃 마법', partner: '하이 레드 드래곤 성체',
      personality: 'ISTJ / 1w9 / 146 / sx/sp', alignment: '질서 선', attachment: '혼란형', trope: '쿨데레',
      description: '발라우르의 수석부장 학생. 하이 레드 드래곤과 함께 불꽃 마법을 사용한다.',
      relationship: '같은 발라우르 소속 엘리시아의 여동생.'
    },
    {
      id: 'elisia', name: '엘리시아', group: 'balaur', groups: ['balaur'], house: 'balaur',
      age: 22, year: '3학년', role: '발라우르 3학년', status: '귀족',
      magic: '불꽃 마법', partner: '레드 드래곤 성체',
      personality: 'ISTJ / 1w9 / 153 / so/sp', alignment: '질서 선', attachment: '회피형',
      description: '레드 드래곤을 파트너로 둔 발라우르의 3학년. 동생 엘리오니와 같은 기숙사에 속한다.',
      relationship: '엘리오니의 언니.'
    },
    {
      id: 'rieta', name: '리에타', group: 'balaur', groups: ['balaur'], house: 'balaur',
      age: 21, year: '2학년', role: '발라우르 2학년', status: '평민',
      magic: '산성 용융 마법', partner: '하이 블랙 드래곤 성체 (산성)',
      personality: 'ENTJ / 1w9 / 135 / so/sx', alignment: '질서 악', attachment: '안정형',
      description: '산성 계열의 하이 블랙 드래곤과 함께하는 평민 출신 학생. 산성 용융 마법을 사용한다.'
    },
    {
      id: 'esmi', name: '에스미', group: 'balaur', groups: ['balaur'], house: 'balaur',
      age: 20, year: '1학년', role: '발라우르 1학년', status: '귀족',
      magic: '불꽃 마법', partner: '하이 레드 드래곤 유체',
      personality: 'ESTJ / 6w7 / 628 / sp/so', alignment: '혼돈 선', attachment: '회피형', trope: '욕데레',
      description: '하이 레드 드래곤 유체와 함께 입학한 발라우르의 신입생. 불꽃 마법을 사용한다.',
      secrets: {
        status: '제4황녀', groups: ['imperial'], succession: '황위 계승 순서 4순위', facePublic: '비공개',
        description: '에스미는 제4황녀와 동일 인물이다. 본인의 선택으로 황녀 신분을 숨기고 재학 중이며, 일반 학생들은 평범한 귀족 자제로 알고 있다. 교수진은 실제 신분을 알지만 학생들 앞에서는 모르는 척한다. 황실 역시 이 선택에 간섭하지 않는다.',
        relationship: '에레시안의 사녀. 디아드리아, 레브린, 시스미의 여동생.'
      }
    },
    {
      id: 'rapinne', name: '라핀느', group: 'ophion', groups: ['ophion'], house: 'ophion',
      age: 22, year: '3학년', role: '오피온 헤더', status: '귀족',
      magic: '얼음 마법', partner: '화이트 드래곤 성체',
      personality: 'ISTJ / 9w1 / 954 / sp/so', alignment: '중립 선', attachment: '회피형', trope: '쿨데레',
      description: '오피온의 수석부장 학생. 화이트 드래곤과 교감하며 얼음 마법을 다룬다.'
    },
    {
      id: 'marishel', name: '마리셸', group: 'ophion', groups: ['ophion'], house: 'ophion',
      age: 21, year: '2학년', role: '오피온 2학년', status: '귀족',
      magic: '날씨 마법', partner: '하이 블랙 드래곤 성체 (폭풍)',
      personality: 'ISFJ / 1w9 / 125 / so/sx', alignment: '혼돈 중립', attachment: '혼란형', trope: '다루데레',
      description: '폭풍 계열의 하이 블랙 드래곤을 파트너로 둔 오피온 학생. 날씨 마법을 사용한다.'
    },
    {
      id: 'silen', name: '실렌', group: 'ophion', groups: ['ophion'], house: 'ophion',
      age: 21, year: '2학년', role: '오피온 2학년', status: '평민',
      magic: '물 마법', partner: '블루 드래곤 성체',
      personality: 'ESFJ / 2w3 / 278 / so/sx', alignment: '중립 선', attachment: '안정형',
      description: '블루 드래곤과 함께 물 마법을 다루는 오피온의 2학년. 평민 출신이다.'
    },
    {
      id: 'colette', name: '콜레트', group: 'ophion', groups: ['ophion'], house: 'ophion',
      age: 20, year: '1학년', role: '오피온 1학년', status: '귀족',
      magic: '빛 마법', partner: '프리즘 드래곤 성체',
      personality: 'ESTJ / 3w2 / 368 / sx/so', alignment: '중립 선', attachment: '불안형', trope: '욕데레',
      description: '프리즘 드래곤을 파트너로 둔 오피온 신입생. 빛 마법을 사용한다.'
    },
    {
      id: 'selveni', name: '셀베니', group: 'ceto', groups: ['ceto'], house: 'ceto',
      age: 21, year: '2학년', role: '케토 헤더', status: '귀족',
      magic: '풀 마법', partner: '그린 드래곤 성체',
      personality: 'ISFJ / 9w1 / 926 / sx/so', alignment: '중립 선', attachment: '안정형', trope: '메가데레',
      description: '케토의 수석부장 학생. 그린 드래곤을 파트너로 두고 풀 마법을 사용한다.'
    },
    {
      id: 'silora', name: '실로라', group: 'ceto', groups: ['ceto'], house: 'ceto',
      age: 22, year: '3학년', role: '케토 3학년', status: '평민',
      magic: '풀 마법', partner: '그린 드래곤 성체',
      personality: 'ISTJ / 3w4 / 316 / so/sx', alignment: '중립 선', attachment: '안정형',
      description: '그린 드래곤과 함께하는 케토의 3학년. 평민 출신으로 풀 마법을 다룬다.'
    },
    {
      id: 'miloer', name: '밀로어', group: 'ceto', groups: ['ceto'], house: 'ceto',
      age: 20, year: '1학년', role: '케토 1학년', status: '평민',
      magic: '자연 마법', partner: '하이 그린 드래곤 성체',
      personality: 'ISFJ / 2w1 / 269 / sx/so', alignment: '중립 선', attachment: '안정형',
      description: '하이 그린 드래곤을 파트너로 둔 케토 신입생. 자연 마법을 사용한다.'
    },
    {
      id: 'hati', name: '하티', group: 'ceto', groups: ['ceto'], house: 'ceto',
      age: 20, year: '1학년', role: '케토 1학년', status: '평민',
      magic: '풀 마법', partner: '그린 드래곤 성체 (가시나무)',
      personality: 'ISFP / 9w1 / 946 / sp/sx', alignment: '중립 선', attachment: '혼란형', trope: '츤데레',
      description: '가시나무 계열의 그린 드래곤과 함께하는 케토의 신입생. 풀 마법을 다룬다.'
    },
    {
      id: 'asteria', name: '아스테리아', group: 'faculty', groups: ['faculty'], age: 40,
      role: '학장', status: '귀족', specialty: '실전 마법학', previousRole: '황실 대신',
      personality: 'INFJ / 1w9 / 125 / so/sx', alignment: '중립 선', attachment: '회피형',
      description: '황실 대신을 지낸 아카데미아의 학장. 전문 분야는 실전 마법학이다.'
    },
    {
      id: 'violeta', name: '비올레타', group: 'faculty', groups: ['faculty'], age: 35,
      role: '교감', status: '귀족', specialty: '이론 마법학',
      personality: 'ISTP / 5w6 / 529 / so/sp', alignment: '중립 선', attachment: '회피형',
      description: '아카데미아의 교감. 이론 마법학을 전문으로 한다.'
    },
    {
      id: 'armaden', name: '아르마덴', group: 'faculty', groups: ['faculty'], house: 'balaur', age: 27,
      role: '발라우르 담당 교수', status: '귀족', specialty: '비행학',
      personality: 'ENFJ / 9w8 / 927 / so/sx', alignment: '질서 선', attachment: '안정형', trope: '보케',
      description: '비행학을 가르치는 발라우르 담당 교수. 드래곤과 함께 날아오르는 수업을 맡는다.'
    },
    {
      id: 'rozeni', name: '로제니', group: 'faculty', groups: ['faculty'], house: 'ophion', age: 30,
      role: '오피온 담당 교수', status: '귀족', specialty: '실전 마법학',
      personality: 'INTJ / 4w5 / 458 / sx/sp', alignment: '질서 중립', attachment: '혼란형', trope: '츳코미',
      description: '오피온 담당 교수. 실전 마법학 수업을 맡는다.'
    },
    {
      id: 'aiderin', name: '아이데린', group: 'faculty', groups: ['faculty'], house: 'ceto', age: 33,
      role: '케토 담당 교수', status: '귀족', specialty: '치료학',
      personality: 'INFJ / 1w2 / 146 / so/sx', alignment: '질서 선', attachment: '회피형', trope: '도짓코',
      description: '치료학을 가르치는 케토 담당 교수.'
    },
    {
      id: 'mirea', name: '미레아', group: 'faculty', groups: ['faculty'], age: 25,
      role: '아티팩트학 교수', status: '귀족', specialty: '아티팩트학',
      personality: 'ENTP / 5w6 / 528 / so/sp', alignment: '중립 선', attachment: '회피형',
      description: '인간과 드래곤의 소통을 매개하는 아티팩트를 가르치는 교수.'
    },
    {
      id: 'ermel', name: '에르멜', group: 'faculty', groups: ['faculty'], age: 128,
      role: '테이밍학 교수', status: '땅의 요정족', species: '땅의 요정족', specialty: '테이밍학',
      personality: 'ISTJ / 1w9 / 136 / sp/so', alignment: '질서 선', attachment: '안정형',
      description: '128세의 땅의 요정족 교수. 아카데미아에서 테이밍학을 가르친다.',
      relationship: '땅의 요정 세 자매의 첫째. 그리멜과 노르멜의 언니.'
    },
    {
      id: 'revryn', name: '레브린', group: 'faculty', groups: ['faculty', 'imperial'], age: 26,
      role: '제국사학 교수 · 제2황녀', status: '제2황녀', specialty: '제국사학', succession: '황위 계승 순서 2순위', facePublic: '공개',
      personality: 'ESTJ / 3w4 / 387 / so/sx', alignment: '질서 악', attachment: '안정형',
      description: '본인의 선택으로 아카데미아에서 제국사학을 가르치는 제2황녀. 황족의 지위가 학교 운영의 특권을 뜻하지는 않는다.',
      relationship: '에레시안의 차녀. 디아드리아의 여동생이며 시스미와 제4황녀의 언니.'
    },
    {
      id: 'raska', name: '라스카', group: 'street', groups: ['street'], age: 110,
      role: '이그니스 상점주인', status: '땅의 요정족', species: '땅의 요정족', shop: '이그니스',
      personality: 'ENFP / 7w8 / 783 / sx/so', alignment: '혼돈 선', attachment: '안정형',
      description: '이그니스를 운영하는 자유분방한 땅의 요정족. 이그니스는 호전적 성향과 불꽃, 위계를 중시한다.'
    },
    {
      id: 'bellua', name: '벨루아', group: 'street', groups: ['street'], age: 109,
      role: '아카이브 상점주인', status: '땅의 요정족', species: '땅의 요정족', shop: '아카이브',
      personality: 'INTJ / 5w4 / 549 / sp/sx', alignment: '중립 선', attachment: '혼란형',
      description: '아카이브를 운영하는 냉정한 성향의 땅의 요정족. 지적이고 이성적인 상점의 분위기와 닮아 있다.'
    },
    {
      id: 'normel', name: '노르멜', group: 'street', groups: ['street'], age: 107,
      role: '생츄어리 상점주인', status: '땅의 요정족', species: '땅의 요정족', shop: '생츄어리',
      personality: 'ISFJ / 6w7 / 629 / so/sx', alignment: '중립 선', attachment: '불안형',
      description: '차분하고 단단하며 따뜻한 성향의 드래곤샵 생츄어리를 운영한다.',
      relationship: '땅의 요정 세 자매의 막내. 에르멜과 그리멜의 여동생.'
    },
    {
      id: 'grimel', name: '그리멜', group: 'street', groups: ['street'], age: 108,
      role: '에이온 상점주인', status: '땅의 요정족', species: '땅의 요정족', shop: '에이온',
      personality: 'INTP / 9w1 / 954 / sp/so', alignment: '중립 선', attachment: '불안형',
      description: '하이 드래곤, 엘더 드래곤, 미스테리 드래곤을 취급하는 에이온의 상점주인.',
      relationship: '땅의 요정 세 자매의 둘째. 에르멜의 여동생이며 노르멜의 언니.'
    },
    {
      id: 'eresian', name: '에레시안', group: 'imperial', groups: ['imperial'], age: 58,
      role: '현 여제 · 드라키아 3세', status: '여제', title: '드라키아 3세',
      personality: 'INTJ / 6w5 / 613 / so/sp', alignment: '질서 중립', attachment: '회피형',
      description: '드라그 통일제국을 다스리는 제3대 여제. 초대 여제 드라키아 1세의 손녀다.',
      relationship: '디아드리아, 레브린, 시스미, 제4황녀의 어머니. 초대 여제 드라키아 1세의 손녀.'
    },
    {
      id: 'diadria', name: '디아드리아', group: 'imperial', groups: ['imperial'], age: 30,
      role: '제1황녀', status: '제1황녀', succession: '황위 계승 순서 1순위', facePublic: '공개',
      personality: 'ENTJ / 8w9 / 835 / sx/sp', alignment: '질서 악', attachment: '혼란형',
      description: '첫 번째 황위 계승 후보인 제1황녀. 드라키시아에게 가장 먼저 선택받을 기회를 얻는다.',
      relationship: '에레시안의 장녀. 레브린, 시스미, 제4황녀의 언니.'
    },
    {
      id: 'sismi', name: '시스미', group: 'imperial', groups: ['imperial'], age: 24,
      role: '제3황녀', status: '제3황녀', succession: '황위 계승 순서 3순위', facePublic: '비공개',
      personality: 'INFJ / 1w9 / 125 / so/sx', alignment: '질서 선', attachment: '안정형',
      description: '제국 각지를 여행하며 드래곤을 탐색하는 제3황녀. 얼굴은 대중에게 공개되지 않았다.',
      relationship: '에레시안의 삼녀. 디아드리아와 레브린의 여동생이며 제4황녀의 언니.'
    },
    {
      id: 'eledra', name: '엘레드라', group: 'dragon', groups: ['dragon'], age: 120,
      role: '엘더 드래곤', status: '엘더 드래곤', species: '엘더 드래곤', stage: '유체', transformation: '수인화 가능 · 수인화 시 청년 연령대',
      magic: '구체적인 마법 능력 미공개', specialAbility: '미공개',
      personality: 'ENFP / 7w8 / 728 / sx/so', alignment: '혼돈 선', attachment: '불안형', trope: '도짓코',
      description: '120세이지만 아직 유체에 해당하는 엘더 드래곤. 인간에 가까운 청년의 형태로 수인화할 수 있다. 구체적인 능력과 과거는 공개되지 않았다.'
    }
  ].map(character => ({
    house: '', year: '', magic: '', partner: '', specialty: '', trope: '', relationship: '', secrets: null,
    portrait: `assets/characters/${character.id}.webp`,
    ...character, mbti: character.personality.split(' / ')[0]
  }));

  const houses = [
    { id: 'balaur', name: '발라우르', english: 'BALAUR', color: '적색', value: '도전과 증명', motto: '도전하고, 행동으로 증명하라.', artifact: '반지', shop: '이그니스', professor: '아르마덴', header: '엘리오니', description: '도전과 실천, 의지와 행동을 중시한다. 행동을 통해 스스로를 증명하는 이들의 기숙사.' },
    { id: 'ophion', name: '오피온', english: 'OPHION', color: '청색', value: '성찰과 지성', motto: '네가 알고 있는 것이 전부인가 돌아보아야 한다.', artifact: '완드', shop: '아카이브', professor: '로제니', header: '라핀느', description: '지식과 탐구, 이성적인 사고를 중시한다. 자신의 지식을 의심하고 끊임없이 성찰하는 이들의 기숙사.' },
    { id: 'ceto', name: '케토', english: 'CETO', color: '녹색', value: '공존과 조화', motto: '함께 할 수 있을까요?', artifact: '수정구', shop: '생츄어리', professor: '아이데린', header: '셀베니', description: '생명과 자연, 인간과 드래곤 사이의 조화를 중시한다. 서로를 이해하고 함께 살아가는 이들의 기숙사.' }
  ];

  houses.forEach(house => { house.symbol = `assets/symbols/${house.id}.webp`; });

  const facilities = [
    { id: 'main', name: '본관', description: '사각형 중정을 둘러싼 ㅁ자 구조의 중심 교육시설.' },
    { id: 'dormitory', name: '기숙사', description: '학생들의 공동생활을 위한 별동 시설. 발라우르, 오피온, 케토의 세 기숙사로 구분된다.' },
    { id: 'flight', name: '비행훈련장', description: '파트너 드래곤과 함께 비행을 익히는 실습 및 훈련시설.' },
    { id: 'healing', name: '치료동', description: '치료학과 드래곤 치료에 관련된 시설.' },
    { id: 'greenhouse', name: '온실', description: '식물과 약초를 관리하는 시설.' },
    { id: 'farm', name: '사육농장', description: '주로 저학년 학생들이 드래곤의 사육과 관리를 배우는 시설.' },
    { id: 'forest', name: '용의 숲', description: '성채 뒤편의 국가 관리 숲. 고학년 학생들은 직접 사냥해 파트너 드래곤의 먹이를 확보한다.' }
  ];

  const dragonTypes = [
    { id: 'red', name: '레드 드래곤', category: '일반 분류', description: '엘리시아의 파트너는 레드 드래곤 성체다. 엘리오니와 에스미는 하이 레드 드래곤과 함께한다.' },
    { id: 'black', name: '블랙 드래곤', category: '일반 분류', description: '리에타의 하이 블랙 드래곤은 산성, 마리셸의 하이 블랙 드래곤은 폭풍 계열이다.' },
    { id: 'white', name: '화이트 드래곤', category: '일반 분류', description: '얼음 마법을 사용하는 라핀느의 파트너는 화이트 드래곤 성체다.' },
    { id: 'blue', name: '블루 드래곤', category: '일반 분류', description: '물 마법을 사용하는 실렌의 파트너는 블루 드래곤 성체다.' },
    { id: 'green', name: '그린 드래곤', category: '일반 분류', description: '셀베니, 실로라, 하티의 파트너. 밀로어의 파트너는 하이 그린 드래곤이다.' },
    { id: 'prism', name: '프리즘 드래곤', category: '일반 분류', description: '빛 마법을 사용하는 콜레트의 파트너는 프리즘 드래곤 성체다.' },
    { id: 'high', name: '하이 드래곤', category: '특수 분류', description: '레드, 블랙, 그린 계열에서 등장한다. 분류의 정확한 위계와 성장 기준은 아직 명시되지 않았다.' },
    { id: 'elder', name: '엘더 드래곤', category: '특수 분류', description: '수인화가 가능한 고등 개체. 엘레드라는 120세의 유체이며 청년의 모습으로 수인화할 수 있다.' },
    { id: 'mystery', name: '미스테리 드래곤', category: '특수 분류', description: '에이온에서 취급하는 특수 분류. 구체적인 능력과 분류 기준은 공개되지 않았다.' }
  ];

  const timeline = [
    { date: '제국 통일 이전', title: '오랜 전쟁', description: '인간과 드래곤 사이의 장기 전쟁이 이어진다.' },
    { date: '전쟁 종식', title: '함께 이룬 평화', description: '드라키아 1세와 파트너 드래곤이 전쟁을 끝내고 평화를 이끈다.' },
    { date: '제국 성립', title: '드라그 통일제국 건국', description: '전쟁이 종식된 이후 통일국가가 성립한다.' },
    { date: '제1드라키아력', title: '초대 여제의 시대', description: '초대 여제 드라키아 1세가 통치한다.' },
    { date: '약 200년 전', title: '아카데미아 설립', description: '드라고니움 아카데미아가 설립된다.' },
    { date: '제2드라키아력', title: '제2대 여제의 시대', description: '제2대 여제의 통치 시대가 이어진다.' },
    { date: '제3드라키아력', title: '드라키아 3세의 시대', description: '에레시안이 제3대 여제 드라키아 3세로 통치한다.' },
    { date: '제3드라키아력 25년', title: '200년 만에 열린 문', description: '아카데미아 개원 200주년. 금남 정책이 폐지되고 처음으로 남녀공학 체제로 전환된다.' },
    { date: '제3드라키아력 25년 3월', title: '이야기의 시작', description: '최초이자 최강의 드라고니어가 되기까지의 이야기가 시작된다.' }
  ];

  const shops = [
    { id: 'ignis', name: '이그니스', owner: '라스카', house: 'balaur', description: '호전적 성향, 불꽃, 위계를 중시하는 드래곤샵. 발라우르와 연계된다.' },
    { id: 'archive', name: '아카이브', owner: '벨루아', house: 'ophion', description: '지적이고 이성적이며 냉정한 성향의 드래곤샵. 오피온과 연계된다.' },
    { id: 'sanctuary', name: '생츄어리', owner: '노르멜', house: 'ceto', description: '차분하고 단단하며 따뜻한 성향의 드래곤샵. 케토와 연계된다.' },
    { id: 'aeon', name: '에이온', owner: '그리멜', house: '', description: '하이 드래곤, 엘더 드래곤, 미스테리 드래곤을 취급하는 드래곤샵.' }
  ];

  shops.forEach(shop => { shop.symbol = `assets/symbols/${shop.id}.webp`; });

  return {
    characters, houses, facilities, dragonTypes, timeline, shops,
    magicTypes: ['불꽃 마법', '산성 용융 마법', '얼음 마법', '날씨 마법', '물 마법', '빛 마법', '풀 마법', '자연 마법'],
    groupLabels: { balaur: '발라우르', ophion: '오피온', ceto: '케토', faculty: '교수진', street: '팬드래건 스트리트', imperial: '드라키아 황가', dragon: '엘더 드래곤' },
    world: {
      empire: '드라그 통일제국', date: '제3드라키아력 25년 3월',
      premise: '이는 최초이자 최강의 드라고니어가 되기까지의 이야기이다.',
      question: '선택받았다는 사실이 그 사람의 가치를 증명하는가?',
      theme: '혈통과 지위가 아니라 관계와 행동으로 자신을 증명한다.',
      dragonPartner: '드래곤은 고유한 기질과 특성을 지니며, 인간과 교감하고 마법을 공유한다. 파트너의 기질은 기숙사 배정에도 영향을 준다.',
      artifact: '속성을 지닌 보석으로 만드는 소통과 마법 공유의 매개 도구. 대표 형태는 반지, 완드, 수정구다.',
      allocation: '학생의 기질, 파트너 드래곤의 기질, 학생의 희망과 교수진의 심사를 함께 반영한다.',
      street: '드래곤 알을 공식 분양하는 국가 직영 특구. 사람이 알을 고르는 것이 아니라, 알이 먼저 반응해 파트너를 선택한다. 불법 분양과 불법 사육을 차단하기 위해 운영된다.',
      earthFairies: '땅의 요정족은 부화 전 드래곤 알의 미세한 기분과 감정을 감지한다. 어울리는 사람을 찾아내며 적합한 방문자를 상점으로 안내하기도 한다.',
      primordial: '드라키시아는 초대 여제의 파트너였던 태초의 드래곤이다. 황실의 힘과 황위 계승 정당성의 근원이며, 현재 황궁 내부에 새로운 알의 형태로 남아 있다.',
      succession: '황녀들은 출생 순서대로 드라키시아에게 선택받을 기회를 얻는다. 앞선 후보가 선택받지 못하면 다음 후보에게 기회가 넘어가며, 선택받은 인물이 황위 계승 자격을 획득한다.',
      calendar: '드라키아력은 전쟁을 끝낸 초대 여제와 파트너 드래곤을 기념하는 공식 연호다. 새로운 여제가 즉위할 때마다 연호의 대수가 증가한다.',
      bloodline: '황실은 초대 여제의 직계 혈통이다. 드라키시아의 힘을 계승해 일반 인간보다 긴 수명을 지니며, 200년이 넘었어도 현 여제는 초대 여제의 손녀에 해당한다.',
      academy: '드래곤 테이밍과 마법 교육에서 세계 최고 권위를 지닌 교육기관. 교감, 마법, 비행, 전투, 치료, 아티팩트를 교육한다.',
      academyReform: '개원 후 200년 동안 남학생의 입학과 남성 교수의 재직을 금지했으나, 제3드라키아력 25년에 금남 정책을 폐지하고 남녀공학으로 전환했다.',
      academyEmpire: '아카데미아와 황실은 상호 존중 관계다. 황족이라는 이유로 학교 운영에 직접적인 특권을 행사하지 않는다.'
    }
  };
})();
