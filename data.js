// 고수템 미니 웹앱(경량앱) 표준 상품 데이터 (카울러형 카테고리·영양표·저점게이지·스파크라인 포함)
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
    title: "단백질 · 쉐이크 가격비교",
    sub: "실물 라벨 기준 · 저점/고점 게이지 · 현재가 이하 알림",
    cats: [
      { id: "all", label: "전체" },
      { id: "wpi", label: "WPI·유청" },
      { id: "plant", label: "식물성·비건" },
      { id: "grain", label: "선식·곡물" }
    ],
    unitChart: [
      { name: "태광 귀리2kg", val: 242, label: "202~282원" },
      { name: "골드스탠다드", val: 1155, label: "1,080~1,230원" },
      { name: "나우푸드 WPI", val: 1445, label: "1,300~1,590원" },
      { name: "프로티원 곡물", val: 1760, label: "1,680~1,840원" },
      { name: "닥터핏 당케어", val: 3180, label: "3,070~3,290원" },
      { name: "퓨롯 세사미", val: 4345, label: "4,120~4,570원" }
    ],
    items: [
      { slug: "taekwang-oats-2kg", cat: "grain", tag: "혼합 1위", core: 1, img: "taekwang-oats-2kg.jpg", name: "태광선식 서리태 귀리쉐이크 2kg", desc: "2큰술(40g)·172.5kcal·단백5.6g·섬유3.8g", badge: "1잔 202원~", price: "10,120원", numPrice: 10120, url: L.TK, sig: "low", sigText: "저점", pos: 15, trend: [14900,14120,13800,14120,11900,10120], n1: ["40g(2큰술)","172.5","5.6g","3.8g","<1g"], n100: ["100g","431","14g","9.5g","2g"] },
      { slug: "now-wpi-2kg", cat: "wpi", tag: "무첨가 WPI", core: 1, img: "skin-kits.jpg", name: "나우푸드 WPI 무맛 2.27kg", desc: "1스쿱(28g)·단백24g(86%)·섬유0g·감미료0%", badge: "1잔 1,300원~", price: "128,750원", numPrice: 128750, url: L.NW_REF, sig: "mid", sigText: "평균-1%", pos: 48, trend: [143900,135000,116050,130500,129900,128750], n1: ["28g(1스쿱)","110","24g","0g","0g"], n100: ["100g","393","85.7g","0g","0g"] },
      { slug: "protiwon-grain-490g", cat: "grain", tag: "입문 곡물", core: 1, img: "skin-kits.jpg", name: "프로티원 단백질 쉐이크 곡물맛 490g", desc: "2스푼(35g)·단백18g·섬유2g·당1g", badge: "1잔 1,680원~", price: "23,500원", numPrice: 23500, url: L.PT, sig: "mid", sigText: "평균가", pos: 42, trend: [29900,26500,25800,24900,23500,23500], n1: ["35g(2스푼)","117","18g","2g","1g"], n100: ["100g","334","51.4g","5.7g","2.9g"] },
      { slug: "purot-sesame-400g", cat: "plant", tag: "고섬유 비건", core: 1, img: "skin-kits.jpg", name: "퓨롯 세사미 프로틴 400g (쿠팡2통)", desc: "3스푼(57g)·단백18g·섬유13g·무첨가", badge: "1잔 4,120원~", price: "28,865원", numPrice: 28865, url: L.PR_S, sig: "low", sigText: "저점", pos: 18, trend: [46000,39000,32000,30850,28865,28865], n1: ["57g(3스푼)","211","18g","13g","9g(저GI)"], n100: ["100g","370","31.6g","22.8g","15.8g"] },
      { slug: "drfit-dangcare-14p", cat: "plant", tag: "당0g 식전", core: 1, img: "skin-kits.jpg", name: "닥터핏 당케어 14포", desc: "1포(30g)·단백20g·섬유5.4g·당0g", badge: "1잔 3,070원~", price: "43,000원", numPrice: 43000, url: L.DF, sig: "mid", sigText: "평균가", pos: 50, trend: [49000,46000,45000,44000,43000,43000], n1: ["30g(1포)","105","20g","5.4g","0g"], n100: ["100g","350","66.7g","18g","0g"] },
      { slug: "on-goldstandard-2kg", cat: "wpi", tag: "운동 정석", core: 0, img: "skin-kits.jpg", name: "옵티멈 골드스탠다드 2.27kg", desc: "1스쿱(31g)·단백24g·73회·단맛 강함", badge: "1잔 1,080원~", price: "79,000원", numPrice: 79000, url: L.NW_REF, sig: "mid", sigText: "평균가", pos: 45, trend: [92000,88000,85000,82000,79000,79000], n1: ["31g(1스쿱)","120","24g","0~1g","1g"], n100: ["100g","387","77.4g","1.6g","3.2g"] }
    ]
  },
  skin: {
    title: "피부짱 5종 · 발리 복구 루틴",
    sub: "2만 원대 홈케어 실제 사용 기록 + 지성 주의 병기",
    cats: [{ id: "all", label: "전체" }, { id: "core", label: "핵심 2종" }],
    items: [
      { slug: "medibt-ampoule", cat: "core", tag: "핵심 01", core: 1, img: "skin-kits.jpg", name: "메디비티 멜라노 모공 앰플 50ml", desc: "갈락토미세스 60% + 나이아신 10%", badge: "27%", price: "12,000원", numPrice: 12000, url: L.MD, sig: "low", sigText: "저점", pos: 20, trend: [16500,15500,14000,12000,12000,12000] },
      { slug: "bepanthen", cat: "core", tag: "핵심 02", core: 1, img: "bepanthen.jpg", name: "바이엘 비판텐 연고 (약국)", desc: "덱스판테놀 5% · 장벽 복구", badge: "약국", price: "10,000원", numPrice: 10000, url: L.BP, sig: "mid", sigText: "약국가", pos: 50, trend: [11000,10500,10000,10000,10000,10000] },
      { slug: "laneige-creamskin", cat: "all", tag: "STEP 01", core: 0, img: "laneige.jpg", name: "라네즈 크림스킨 세라펩타이드", desc: "건성 속당김 방어 · 지성 좁쌀 주의", badge: "쿠팡", price: "28,000원", numPrice: 28000, url: L.LN, sig: "mid", sigText: "평균가", pos: 50, trend: [33000,31000,29500,28000,28000,28000] },
      { slug: "medibt-set", cat: "all", tag: "2종 세트", core: 0, img: "medibt-set.jpg", name: "메디비티 앰플+크림 2종 세트", desc: "공식몰 2종 세트 무료배송", badge: "공식몰", price: "23,500원", numPrice: 23500, url: L.OF, sig: "low", sigText: "무배", pos: 25, trend: [29000,26000,24500,23500,23500,23500] }
    ]
  },
  pet: {
    title: "16살 노령견 · 사료·간식 3종",
    sub: "이빨 약한 노령견 반습식 주식 + 토핑·노즈워크 간식",
    cats: [{ id: "all", label: "전체" }],
    items: [
      { slug: "achimae-6kg", cat: "all", tag: "주식 원픽", core: 1, img: "achimae.jpg", name: "아침애 한우 수제사료 6.4kg", desc: "반습식 · 200g×32팩 개별 소포장", badge: "17%", price: "64,880원", numPrice: 64880, url: L.DG, sig: "low", sigText: "저점", pos: 22, trend: [78000,72000,68000,66000,64880,64880] },
      { slug: "bowwow-700g", cat: "all", tag: "토핑", core: 1, img: "bowwow.jpg", name: "바우와우 혼합 간식 700g", desc: "국내산 혼합맛 · 사료 토핑용", badge: "로켓", price: "11,500원", numPrice: 11500, url: L.BW, sig: "mid", sigText: "평균가", pos: 45, trend: [13000,12500,12000,11500,11500,11500] },
      { slug: "meongsumugang-1kg", cat: "all", tag: "1.1kg", core: 1, img: "meongsumugang.jpg", name: "목우촌 멍수무강 져키 1.1kg", desc: "국내산 소고기 · 노즈워크 대용량", badge: "26%", price: "14,680원", numPrice: 14680, url: L.MG, sig: "low", sigText: "저점", pos: 20, trend: [19800,17500,16000,15200,14680,14680] }
    ]
  },
  rtx: {
    title: "RTX 5060 Ti · 5070 실물 4선",
    sub: "NVIDIA 공식 스펙 + 실시간 시세 게이지",
    cats: [{ id: "all", label: "전체" }],
    items: [
      { slug: "rtx-5060ti-8g", cat: "all", tag: "FHD 원픽", core: 1, img: "rtx-5060ti-8g.jpg", name: "ASUS DUAL RTX 5060 Ti 8GB", desc: "4,608코어 · 128-bit · 180W", badge: "로켓", price: "792,430원", numPrice: 792430, url: L.R1, sig: "low", sigText: "저점", pos: 25, trend: [850000,830000,810000,799000,792430,792430] },
      { slug: "rtx-5060ti-16g", cat: "all", tag: "QHD·AI", core: 1, img: "rtx-5060ti-16g.jpg", name: "MSI RTX 5060 Ti 게이밍 16GB", desc: "4,608코어 · 16GB VRAM", badge: "25%", price: "1,349,000원", numPrice: 1349000, url: L.R2, sig: "mid", sigText: "평균가", pos: 50, trend: [1450000,1390000,1360000,1350000,1349000,1349000] },
      { slug: "rtx-5070-12g", cat: "all", tag: "성능+30%", core: 1, img: "rtx-5070-12g.jpg", name: "MSI RTX 5070 트리오 12GB", desc: "6,144코어 · 192-bit · 3팬", badge: "3%", price: "1,449,000원", numPrice: 1449000, url: L.R3, sig: "mid", sigText: "평균가", pos: 45, trend: [1520000,1490000,1470000,1455000,1449000,1449000] },
      { slug: "rtx-5070ti-16g", cat: "all", tag: "4K", core: 0, img: "rtx-5070ti-16g.jpg", name: "갤럭시 RTX 5070 Ti 16GB", desc: "8,960코어 · 256-bit · 듀얼 NVENC", badge: "4K", price: "2,203,000원", numPrice: 2203000, url: L.R4, sig: "high", sigText: "고점", pos: 80, trend: [2050000,2100000,2150000,2180000,2203000,2203000] }
    ]
  }
};
