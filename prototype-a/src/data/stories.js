window.Gosutem = {};

window.Gosutem.stories = [
  {
    id: 'swim',
    category: '수영',
    title: '힘든 날을 버티게 해준 첫 취미',
    titleLines: ['힘든 날을 버티게', '해준 첫 취미'],
    intro: '회사 생활이 유난히 힘들던 시절, 수영은 MJ를 지탱해 준 첫 취미였습니다.',
    person: 'MJ의 수영 이야기',
    source: 'MJ가 들려준 경험을 편집했습니다.',
    photo: './assets/swim.jpg',
    photoUrl: 'https://unsplash.com/photos/an-indoor-swimming-pool-with-blue-water-xs9r8fPUats',
    credit: 'Mariusz Smenzyk',
    alt: '푸른 물 위로 레인이 놓인 실내 수영장',
    paragraphs: [
      '살면서 좋아했던 건 많았지만, 나를 위해 시간을 쓰는 일은 MJ에게 익숙하지 않았습니다. 수영은 그렇게 처음으로 제대로 시작한 취미였습니다.',
      '힘들었던 회사 생활을 떠올릴 때 MJ는 수영을 함께 기억합니다. 그 시절 자신을 지탱해준 일이었기 때문입니다.'
    ],
    invitation: '나도 물에 들어가 보고 싶다면',
    prompt: '가진 걸로 갈 수 있는 수영장이 있는지, 오늘 한 곳만 알아보세요.',
    caveat: '시설마다 예약, 이용료, 필수 장비가 다릅니다. 처음이라면 초급 강습이나 운영자가 안내하는 체험 조건을 확인하세요.',
    actions: [
      { id: 'class', time: '5분', title: '집이나 회사 근처 초급반 한 곳 찾기', description: '평소 이동하는 길에서 수영장 한 곳을 골라 초급반 시간표와 체험 가능 여부를 확인해요.' },
      { id: 'gear', time: '5분', title: '가진 장비로 갈 수 있는지 물어보기', description: '“초급 체험에 꼭 필요한 준비물이 있나요? 제가 가진 걸 써도 되는지, 대여 가능한지도 알고 싶어요.”' }
    ]
  },
  {
    id: 'garden',
    category: '텃밭',
    title: '엄마가 가꾸는 집 앞의 작은 텃밭',
    titleLines: ['엄마가 가꾸는', '집 앞의 작은 텃밭'],
    intro: '나를 위한 일이 뭘까 생각하던 MJ는 집 앞 텃밭을 가꾸는 엄마를 떠올렸습니다.',
    person: 'MJ가 전한 엄마의 이야기',
    source: 'MJ가 가족의 일상으로 소개한 이야기입니다.',
    photo: './assets/garden.jpg',
    photoUrl: 'https://unsplash.com/photos/vegetable-garden-with-raised-beds-and-a-stone-path-16vYs93kLXM',
    credit: 'Bruce Barrow',
    alt: '채소가 자라는 작은 밭 사이로 난 돌길',
    paragraphs: [
      '나를 위해 하는 일을 이야기하다가 MJ는 엄마가 집 앞에서 가꾸는 텃밭을 떠올렸습니다. 거창해 보이는 활동부터 생각할 필요는 없었습니다.',
      '누군가에겐 수영이지만, 누군가에겐 집 앞에 돌볼 것이 있다는 사실이 먼저 떠오릅니다. 집에서 할 수 있는 작은 일도 관심사의 시작이 됩니다.'
    ],
    invitation: '나도 무언가를 가꿔보고 싶다면',
    prompt: '새 화분을 고르기 전에, 오늘은 집에서 햇빛이 드는 자리나 돌볼 수 있는 식물을 찾아보세요.',
    caveat: '식물마다 빛과 물이 필요한 조건이 다릅니다. 심거나 물을 주기 전에 지금 키우는 식물의 상태를 먼저 살펴보세요.',
    actions: [
      { id: 'light', time: '5분', title: '햇빛이 드는 자리 한 곳 찾아보기', description: '창가나 베란다에 빛이 드는 시간대를 한 번 보고, 어디였는지 기록해요.' },
      { id: 'plant', time: '3분', title: '집에 있는 식물 하나 살펴보기', description: '잎과 흙 상태를 보고 사진 한 장을 남겨요. 며칠 뒤 달라졌는지 다시 봐요.' }
    ]
  }
];
