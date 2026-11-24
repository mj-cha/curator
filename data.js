// 고수템 미니 웹앱(경량앱) 표준 상품 데이터 (슬러그·가격시그널·일별추이 포함)
const H = "https://";
const LC = H + "link.coupang.com/a/";

const L = {
  LN: LC + "iRauFOwQ3w", MD: LC + "iOsz4gYREa", DG: LC + "iPGzouMw6m", DB: LC + "iPGBZa99gG",
  BW: LC + "iRY6LkblEy", MG: LC + "iRZiofS3ga",
  R1: LC + "iTuzCOXdMi", R2: LC + "iTuC1wJBO8", R3: LC + "iTuGYVf00q", R4: LC + "iTuK7dqTqC",
  TK: LC + "iVEgQx6Cg8", PT: LC + "iPZruX9hwO",
  OF: H + "www.medibt.com/51/?idx=118", OC: H + "www.medibt.com/51/?idx=123",
  BP: H + "barkiri.com/products/p97", HR: H + "smartstore.naver.com/redbalm/products/13645867054",
  PR_S: H + "www.coupang.com/np/search?q=%ED%93%A8%EB%A1%AF+%EC%84%B8%EC%82%AC%EB%AF%B8%ED%94%84%EB%A1%9C%ED%8B%B4",
  DF: H + "display.cjonstyle.com", NW_REF: H + "www.cowlr.kr/protein/78?price_period=6m"
};

export const DECKS = {
  protein: {
    title: "단백질 쉐이크 · 곡물 8종 가격비교",
    sub: "실물 라벨 기준 · 1잔 단가 그래프 · 저점/고점 게이지 · 목표가 알림",
    banner: ["taekwang-oats-2kg.jpg", "아침 한 끼 1위: 태광선식 2kg + 나우푸드 WPI", "인공감미료 0% · 식이섬유 3.8g · 단백질 23.6g · 1잔 1,180~1,470원", L.TK],
    unitChart: [
      { name: "태광 귀리2kg", val: 242, label: "202~282원" },
      { name: "골드스탠다드", val: 1155, label: "1,080~1,230원" },
      { name: "나우푸드 WPI", val: 1445, label: "1,300~1,590원" },
      { name: "ISO100 2.3kg", val: 1710, label: "1,580~1,840원" },
      { name: "프로티원 곡물", val: 1760, label: "1,680~1,840원" },
      { name: "닥터핏 당케어", val: 3180, label: "3,070~3,290원" },
      { name: "퓨롯 세사미", val: 4345, label: "4,120~4,570원" }
    ],
    secs: [
      ["실구매가 기준 추천 6종 (1잔 가격순)", 2, "2026.11.24 실물 라벨", [
        { slug: "taekwang-oats-2kg", tag: "혼합 베이스 1위", core: 1, img: "taekwang-oats-2kg.jpg", name: "태광선식 국산서리태 귀리쉐이크 2kg", desc: "2큰술(40g) · 172.5kcal · 단백 5.6g(100g당 14g) · 섬유 3.8g", badge: "1잔 202원~", price: "10,120원", numPrice: 10120, url: L.TK, sig: "low", sigText: "저점(쿠폰)", pos: 15, trend: [14900, 14120, 13800, 14120, 11900, 10120] },
        { slug: "now-wpi-2kg", tag: "무첨가 순도 1위", core: 1, img: "skin-kits.jpg", name: "나우푸드 WPI 무맛 2.27kg", desc: "1스쿱(28g) · 단백 24g(86%) · 섬유 0g · 감미료 0%", badge: "1잔 1,300원~", price: "128,750원", numPrice: 128750, url: L.NW_REF, sig: "mid", sigText: "평균가(-1%)", pos: 48, trend: [143900, 135000, 116050, 130500, 129900, 128750] },
        { slug: "protiwon-grain-490g", tag: "입문 곡물 1픽", core: 1, img: "skin-kits.jpg", name: "프로티원 단백질 쉐이크 곡물맛 490g", desc: "2스푼(35g) · 단백 18g · 섬유 2g · 당 1g (14회)", badge: "1잔 1,680원~", price: "23,500원~", numPrice: 23500, url: L.PT, sig: "mid", sigText: "평균가", pos: 42, trend: [29900, 26500, 25800, 24900, 23500, 23500] },
        { slug: "purot-sesame-400g", tag: "식전 고섬유 1위", core: 1, img: "skin-kits.jpg", name: "퓨롯 세사미 프로틴 400g (쿠팡 2통)", desc: "3스푼(57g) · 단백 18g · 섬유 13g · 100% 비건 무첨가", badge: "1잔 4,120원~", price: "28,865원(통당)", numPrice: 28865, url: L.PR_S, sig: "low", sigText: "저점(2통)", pos: 18, trend: [46000, 39000, 32000, 30850, 28865, 28865] },
        { slug: "drfit-dangcare-14p", tag: "당 0g 혈당방어", core: 1, img: "skin-kits.jpg", name: "닥터핏 당케어 14포", desc: "1포(30g) · 단백 20g · 섬유 5.4g · 당 0g · 닥터딩요 협업", badge: "1잔 3,070원~", price: "43,000원~", numPrice: 43000, url: L.DF, sig: "mid", sigText: "평균가", pos: 50, trend: [49000, 46000, 45000, 44000, 43000, 43000] },
        { slug: "on-goldstandard-2kg", tag: "운동 정착 정석", core: 0, img: "skin-kits.jpg", name: "옵티멈 골드스탠다드 2.27kg", desc: "1스쿱(31g) · 단백 24g · 73회 · 미국식 초코 단맛 강함", badge: "1잔 1,080원~", price: "79,000원~", numPrice: 79000, url: L.NW_REF, sig: "mid", sigText: "평균가", pos: 45, trend: [92000, 88000, 85000, 82000, 79000, 79000] }
      ]]
    ],
    notes: [
      ["반반 하이브리드 판정", "아침 한 끼·무첨가는 <strong>태광선식 2큰술(40g) + 나우 0.75스쿱(21g)</strong>(단백 23.6g · 섬유 3.8g · 1잔 1,180~1,470원) 압승. <em>식전 혈당 방어는 퓨롯 1.5스푼+나우 0.5스쿱(섬유 6.5g) 또는 닥터핏</em>이 정답."],
      ["프로티원 반반 주의", "프로티원 1스푼 + 나우 0.5스쿱은 <em>식이섬유가 1g뿐</em>이라 천연 위고비 목적엔 부족합니다."]
    ]
  },
  skin: {
    title: "아현동 피부짱 · 발리 2달 살이 복구 5종",
    sub: "2만 원대 홈케어 실제 사용 기록 (내 체감 + 지성 피부 주의사항 병기)",
    banner: ["skin-kits.jpg", "2개만 남긴다면: 메디비티 앰플 + 약국 비판텐", "5종이 번거롭다면 핵심 2종(약 2.2만 원)으로 시작해도 충분합니다.", L.MD],
    secs: [
      ["발리 2달 살이 복구 5종 + 세트", 2, "핵심 2종 포함", [
        { slug: "laneige-creamskin", tag: "STEP 01", core: 0, img: "laneige.jpg", name: "라네즈 크림스킨 세라펩타이드 리파이너", desc: "건성 속당김 방어 · 지성·여름엔 좁쌀 주의", badge: "쿠팡", price: "실시간가 확인", numPrice: 28000, url: L.LN, sig: "mid", sigText: "평균가", pos: 50 },
        { slug: "medibt-ampoule", tag: "핵심 01", core: 1, img: "skin-kits.jpg", name: "메디비티 멜라노 하이드라 모공 앰플 50ml", desc: "갈락토미세스 60%(1번 성분) + 나이아신 10%", badge: "27%", price: "12,000원", numPrice: 12000, url: L.MD, sig: "low", sigText: "저점", pos: 20 },
        { slug: "medibt-cream", tag: "STEP 03", core: 0, img: "medibt-cream.jpg", name: "메디비티 멜라노 피테라 크림 50ml", desc: "앰플 위를 덮어 잡티·수분 잠그는 크림", badge: "공식몰", price: "12,000원", numPrice: 12000, url: L.OC, sig: "mid", sigText: "평균가", pos: 45 },
        { slug: "bepanthen", tag: "핵심 02", core: 1, img: "bepanthen.jpg", name: "바이엘 비판텐 연고 (약국 일반의약품)", desc: "덱스판테놀 5% · 장벽 복구 (약국 가격 비교)", badge: "바키리", price: "약 10,000원", numPrice: 10000, url: L.BP, sig: "mid", sigText: "약국가", pos: 50 },
        { slug: "hera-sunmate", tag: "STEP 05", core: 0, img: "hera.jpg", name: "헤라 선메이트 레포츠 프로 워터프루프", desc: "SPF50+ PA++++ 땀·물 강한 야외용", badge: "스토어", price: "실시간가 확인", numPrice: 32000, url: L.HR, sig: "mid", sigText: "평균가", pos: 50 },
        { slug: "medibt-set", tag: "2종 세트", core: 0, img: "medibt-set.jpg", name: "메디비티 앰플 + 크림 2종 세트", desc: "공식몰 2종 세트 구매 시 무료배송", badge: "공식몰", price: "23,500원", numPrice: 23500, url: L.OF, sig: "low", sigText: "무배", pos: 25 }
      ]]
    ],
    notes: [
      ["01 · 라네즈 크림스킨", "[내 체감] 건성 기준 속당김 방어. <em>[주의] 지성·여름 피부엔 유분감·좁쌀 주의 의견.</em>"],
      ["02 · 메디비티 앰플 50ml", "갈락토미세스 60% + 나이아신 10%. 쿠팡 로켓(12,000원). <em>예민 피부는 3일 패치테스트 권장.</em>"]
    ]
  },
  pet: {
    title: "16살 노령견 급여 기록 · 사료 · 간식 2종",
    sub: "이빨 약한 노령견이 물에 불리지 않고 먹는 반습식 주식과 토핑·노즈워크 간식",
    banner: ["achimae.jpg", "말랑한 반습식 + 200g×32팩 소포장 (총 6.4kg)", "마지막 봉지까지 마르지 않고 촉촉하게 급여할 수 있습니다.", L.DG],
    secs: [
      ["16살 노령견 추천 주식", 1, "반습식 6.4kg", [
        { slug: "achimae-6kg", tag: "노령견 원픽", core: 1, img: "achimae.jpg", name: "대용량 아침애 강아지 한우 수제사료 6.4kg", desc: "말랑한 반습식 + 200g 개별 소포장 32팩 · 국내산 한우", badge: "17%", price: "64,880원~", numPrice: 64880, url: L.DG, sig: "low", sigText: "저점", pos: 22 }
      ]],
      ["입맛 돋우는 노즈워크·토핑 간식 2종", 2, "소포장 · 대용량", [
        { slug: "bowwow-700g", tag: "토핑·훈련", core: 1, img: "bowwow.jpg", name: "바우와우 혼합 강아지 간식 350g × 2개", desc: "국내산 혼합맛(총 700g) · 사료 토핑용", badge: "로켓", price: "11,500원", numPrice: 11500, url: L.BW, sig: "mid", sigText: "평균가", pos: 45 },
        { slug: "meongsumugang-1kg", tag: "대용량 1.1kg", core: 1, img: "meongsumugang.jpg", name: "목우촌 펫9단 멍수무강 져키 1.1kg", desc: "국내산 소고기 · 노즈워크·훈련용 대용량", badge: "26%", price: "14,680원", numPrice: 14680, url: L.MG, sig: "low", sigText: "저점", pos: 20 }
      ]]
    ],
    notes: [
      ["급여 & 치아 관리", "<em>[주의]</em> 사료 교체 시 3~4일간 기존 사료와 섞어 급여하고, 반습식 특성상 식후 양치를 병행해 주세요."]
    ]
  },
  rtx: {
    title: "RTX 5060 Ti · 5070 체급별 실물 4선",
    sub: "NVIDIA 공식 스펙 + 국내 테크 유튜버 벤치마크 참고",
    banner: ["rtx-5070-12g.jpg", "FHD는 5060 Ti 8GB(79.2만), 10만 더 쓰면 5070(144.9만)", "5060 Ti 16GB(134.9만)에서 10만 원 보태면 5070 성능 +30% · 대역폭 +50%.", L.R3],
    secs: [
      ["체급별 추천 그래픽카드 4종", 2, "2026.11.23 실시간가", [
        { slug: "rtx-5060ti-8g", tag: "FHD 원픽", core: 1, img: "rtx-5060ti-8g.jpg", name: "ASUS DUAL RTX 5060 Ti OC 8GB", desc: "4,608코어 · 128-bit · 180W · 듀얼팬", badge: "로켓", price: "792,430원", numPrice: 792430, url: L.R1, sig: "low", sigText: "저점", pos: 25 },
        { slug: "rtx-5060ti-16g", tag: "QHD·AI 16GB", core: 1, img: "rtx-5060ti-16g.jpg", name: "MSI RTX 5060 Ti 게이밍 OC 16GB", desc: "4,608코어 · 16GB VRAM · 트윈프로져", badge: "25%", price: "1,349,000원", numPrice: 1349000, url: L.R2, sig: "mid", sigText: "평균가", pos: 50 },
        { slug: "rtx-5070-12g", tag: "깡성능 +30%", core: 1, img: "rtx-5070-12g.jpg", name: "MSI RTX 5070 게이밍 트리오 12GB", desc: "6,144코어 · 192-bit(672GB/s) · 3팬", badge: "3%", price: "1,449,000원", numPrice: 1449000, url: L.R3, sig: "mid", sigText: "평균가", pos: 45 },
        { slug: "rtx-5070ti-16g", tag: "4K 하이엔드", core: 0, img: "rtx-5070ti-16g.jpg", name: "갤럭시 RTX 5070 Ti BLACK OC 16GB", desc: "8,960코어 · 256-bit(896GB/s) · 듀얼 NVENC", badge: "4K", price: "2,203,000원", numPrice: 2203000, url: L.R4, sig: "high", sigText: "고점", pos: 80 }
      ]]
    ],
    notes: [
      ["사양 함정 · 134.9만(16GB) vs 144.9만(5070)", "10만 원 차이인데 5070은 <em>코어 +33%, 대역폭 +50%, 게임 성능 +30%</em>. AI 16GB 필수가 아니면 5070이 유리합니다."]
    ]
  }
};
