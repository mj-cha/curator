/* 고수하우스(회사) 전사 ERP 표준 폴더 트리 확장 시드 2 — 핸디핏 사진 아카이빙·CEA·정기발행·연세대·다운로드 (src/data/erpFolderTreeExtra.js · 15KB 이하) */
(function () {
  var seed = window.GOSU_FOLDER_TREE_SEED;
  if (!seed || !seed.TREE_NODES) return;

  var gosuNode = seed.TREE_NODES.find(function (n) { return n.id === "root-gosutem"; });
  if (gosuNode && gosuNode.children) {
    gosuNode.children.push(
      {
        id: "gosu-06-handyfit", biz: "gosutem", icon: "📸", title: "06. 마케팅_채널_콘텐츠 (★ 핸디핏 사진 아카이빙)",
        gPath: "G:\\내 드라이브\\@ GOSUTEM\\06. 마케팅_채널_콘텐츠\\01_핸디핏_랜딩_사진아카이빙", badge: "사진아카이빙", isPhotoArchive: true,
        photoGallery: [
          { id: "PA-01", file: "hf-hero-skip3.png", stdName: "01_핸디핏_히어로_수영첫달사지마세요3가지_v2.0(2026.11.28).png", slug: "gosutem-swim-skip3", tag: "랜딩 1호 히어로", desc: "첫 달 회피 3종 X표시 + 강습 직결 3종 (직접 현금 3만 1천 원 절감)", landingTitle: "수영 첫 달 사지 마세요 3가지 (skip3)" },
          { id: "PA-02", file: "hf-hero-ab01.png", stdName: "02_핸디핏_히어로_수경안티포그4개월검증_v2.0(2026.11.28).png", slug: "gosutem-swim-ab01", tag: "랜딩 2호 히어로", desc: "수경 김서림 방치 vs 안티포그+전용 케이스 4개월 유지 대조 정물", landingTitle: "수경 김서림·습진 회피 가이드 (ab01)" },
          { id: "PA-03", file: "hf-hero-budget5.png", stdName: "03_핸디핏_히어로_5만4천원첫달완성가방_v2.0(2026.11.28).png", slug: "gosutem-swim-budget5", tag: "랜딩 3호 히어로", desc: "54,550원 입문 영수증 vs 15만 원 풀세트 중복 지출 영수증 대조", landingTitle: "5만 4천 원 수영 입문 가방 종결 (budget5)" },
          { id: "PA-04", file: "hf-hero-expert10.png", stdName: "04_핸디핏_히어로_탭10개5분종결체크표_v2.0(2026.11.28).png", slug: "gosutem-swim-expert10", tag: "랜딩 4호 히어로", desc: "김민정 현직 수영강사 외 4명 검수 · 쇼핑 탭 10개 5분 종결 정물", landingTitle: "쇼핑 탭 10개 5분 종결 큐레이션 (expert10)" },
          { id: "PA-05", file: "hf-sec-nobuy3.png", stdName: "05_핸디핏_섹션_1단회피절감2만5천원_v2.0(2026.11.28).png", slug: "gosutem-swim-skip3", tag: "1단 회피 섹션", desc: "초보 첫 달 불필요 장비 3종(오리발·패들·스노클) 구매 보류 판정 컷", landingTitle: "1단: 사지 마세요 (25,000원 절감)" },
          { id: "PA-06", file: "hf-sec-goggles4.png", stdName: "06_핸디핏_섹션_2단대안절감6천원_v2.0(2026.11.28).png", slug: "gosutem-swim-ab01", tag: "2단 대안 섹션", desc: "집에 있는 세면도구·중고/다이소 대안 활용 (6,000원 추가 절감)", landingTitle: "2단: 안 사도 되는 대안 (6,000원 절감)" },
          { id: "PA-07", file: "hf-sec-budget54k.png", stdName: "07_핸디핏_섹션_3단최소구매54550원_v2.0(2026.11.28).png", slug: "gosutem-swim-budget5", tag: "3단 종결 섹션", desc: "센티 실내수영복 + 스완스 패킹수경 + 실리콘수모 + 나헤 메쉬가방 4종", landingTitle: "3단: 꼭 살 4가지만 최저가 종결" },
          { id: "PA-08", file: "hf-sec-pin10m.png", stdName: "08_핸디핏_섹션_3개월차핀데이나라시확장_v2.0(2026.11.28).png", slug: "gosutem-swim-expert10", tag: "시기별 로드맵", desc: "1개월 차 입문 통과 후 3개월 차 핀데이(오리발) 단계별 업그레이드 컷", landingTitle: "시기별 장비 업그레이드 로드맵" }
        ],
        files: [
          { name: "01_핸디핏_실물플랫레이_생성사진_8종/hf-hero-skip3~hf-sec-pin10m.png", ver: "v2.0(2026.11.28)", kind: "image", size: "1.76MB(8장)", status: "active", summary: "핸디핏 랜딩 4종 히어로·섹션용 인물 0% 정물 플랫레이 사진 아카이빙" },
          { name: "02_핸디핏_랜딩페이지_원본_및_시안/고수템_수영입문_핸디핏_라이브랜딩_v2.0(2026.11.28).html", ver: "v2.0(2026.11.28)", kind: "html", size: "56.1KB", status: "active", summary: "핸디핏 수영 입문 랜딩페이지 단독 HTML 원본 및 3안 비교 시안" },
          { name: "02_핸디핏_랜딩페이지_원본_및_시안/02_고수템_핸디핏_랜딩4종_및_릴스광고4세트_실행결과_완본_v2.0(2026.11.28).md", ver: "v2.0(2026.11.28)", kind: "doc", size: "24.2KB", status: "active", summary: "핸디핏 공개 랜딩 4종(HTTP 200) + UTM 8종 + 릴스 4세트 완본" },
          { name: "03_핸디핏_생성결과_아카이브_140장/01_랜딩편집기_AI생성결과~133장.png", ver: "v2.0(2026.11.28)", kind: "image", size: "140장", status: "active", summary: "핸디핏 생성 이미지·랜딩·폼·UTM·대본 전 과정 실측 캡처 아카이브" },
          { name: "02_네이버블로그_SNS_콘텐츠/01~23_네이버블로그_채널캡처_v1.0(2026.11.27).jpg", ver: "v1.0(2026.11.27)", kind: "image", size: "18.4MB", status: "active", summary: "네이버 블로그 채널 캡처 23장 표준 네이밍 정비본" }
        ]
      },
      {
        id: "gosu-07-dev", biz: "gosutem", icon: "💻", title: "07. 웹앱_개발_스튜디오", gPath: "G:\\내 드라이브\\@ GOSUTEM\\07. 웹앱_개발_스튜디오", badge: "G드라이브일원화",
        files: [
          { name: "ai-solution-studio/ (고수하우스 전사 AI 솔루션 ERP v2.5)", ver: "v2.5(2026.11.28)", kind: "code", size: "34파일", status: "active", summary: "컨텐츠 스튜디오 × 로보엠디 × 핸디핏 × 전사 폴더 트리 통합 ERP 원본" },
          { name: "gosutem/ & curator/ & content-studio/", ver: "v2.0(2026.11.28)", kind: "code", size: "1,091파일", status: "active", summary: "Documents\\gosutem, curator, C:\\AI_Studio에서 G드라이브로 완전 일원화" }
        ]
      },
      {
        id: "gosu-99-bench", biz: "gosutem", icon: "🔍", title: "99. 벤치마킹_아카이브", gPath: "G:\\내 드라이브\\@ GOSUTEM\\99. 벤치마킹_아카이브", badge: "삼중폴더합병",
        files: [
          { name: "01_구독툴_AI솔루션/ (01_로보엠디 · 02_매니패스트 · 03_핸디핏_기능분석)", ver: "v1.0(2026.11.28)", kind: "folder", size: "120파일", status: "active", summary: "로보엠디·매니패스트·핸디핏 전 메뉴 캡처 및 전직원 내재화 회의록" },
          { name: "02_경쟁사_앱웹_서비스/ (01_인지엄 · 02_언니의파우치 · 03_뷰리티 · 04_와츠인마이)", ver: "v1.0(2026.10.16)", kind: "image", size: "60파일", status: "active", summary: "경쟁사 앱 캡처 표준 파일명 정비 및 958MB 뷰리티 중복 영상 격리 완료" },
          { name: "03_유튜브_커뮤니티_레퍼런스/ & 04_UIUX_웹디자인_레퍼런스/", ver: "v2.0(2026.11.28)", kind: "html", size: "78파일", status: "active", summary: "유튜브 60편30만 고수 테이블 및 Design-References 통합본" }
        ]
      }
    );
  }

  var EXTRA_NODES = [
    {
      id: "root-cea", biz: "cea", icon: "🏛️", title: "02. 씨이에이 사업부 (2026. CEA 교육·ESG)", gPath: "G:\\내 드라이브\\03. 업무\\2026. CEA",
      desc: "고수하우스 내부 사업부 '씨이에이(CEA)'의 ESG·AI 기업교육 제안서, 계약, 홈페이지(cea-site) 통합 폴더",
      children: [
        {
          id: "cea-01-main", biz: "cea", icon: "📋", title: "01. CEA_기획_계약_채용", gPath: "G:\\내 드라이브\\03. 업무\\2026. CEA", badge: "ESG교육",
          files: [
            { name: "업무위탁용역계약서_씨이에이-차명진_v1.4(2026.11.19).gdoc", ver: "v1.4(2026.11.19)", kind: "doc", size: "문서", status: "active", summary: "CEA 업무위탁용역계약서 및 운영 문서" },
            { name: "03_씨이에이_CEA_채용_업무/채용공고_브랜드뉴컴퍼니_웹앱_v1.0(2026.10.20).md", ver: "v1.0(2026.10.20)", kind: "doc", size: "4.8KB", status: "active", summary: "Downloads에서 이관·정리된 채용공고 및 지원자 포트폴리오" }
          ]
        },
        {
          id: "cea-02-site", biz: "cea", icon: "🌐", title: "02. cea-site (홈페이지 웹앱)", gPath: "G:\\내 드라이브\\03. 업무\\2026. CEA\\cea-site", badge: "G드라이브일원화",
          files: [
            { name: "cea-site/ (Documents\\1. CEA\\cea-site 통합본)", ver: "v1.0(2026.11.17)", kind: "code", size: "104파일", status: "active", summary: "CEA 교육 홈페이지 소스코드 G드라이브 일원화본" }
          ]
        }
      ]
    },
    {
      id: "root-blog", biz: "blog", icon: "✍️", title: "03. 콘텐츠 정기 발행 (2026 쿠팡파트너스·블로그·SNS)", gPath: "G:\\내 드라이브\\03. 업무\\2026 쿠팡파트너스",
      desc: "고수하우스 내부 콘텐츠 정기 발행 업무(네이버 블로그·쿠팡파트너스 AF6880399·인스타·릴스) 카테고리별 원고 및 사진 아카이빙",
      children: [
        {
          id: "blog-00-std", biz: "blog", icon: "📌", title: "00. 표준템플릿_수익링크DB_확장프로그램", gPath: "G:\\내 드라이브\\03. 업무\\2026 쿠팡파트너스", badge: "AF6880399",
          files: [
            { name: "고수템_제품별_고유수익링크_마스터DB_v1.0(2026.11.24).xlsx", ver: "v1.0(2026.11.24)", kind: "sheet", size: "24KB", status: "active", summary: "쿠팡파트너스 제품별 고유 수익링크 마스터 DB" },
            { name: "00_네이버블로그_내템플릿_표준_v1.0(2026.11.28).md", ver: "v1.0(2026.11.28)", kind: "doc", size: "15KB", status: "active", summary: "네이버 블로그 3줄 요약·비교표·대가성 문구 표준 템플릿 (.md/.html)" },
            { name: "00_쿠팡_상품수집_확장프로그램_소스/", ver: "v1.0(2026.11.24)", kind: "code", size: "8파일", status: "active", summary: "C:\\AI_Studio\\coupang-extractor 크롬 확장프로그램 G드라이브 통합본" }
          ]
        },
        {
          id: "blog-01-cats", biz: "blog", icon: "📦", title: "01~05. 정기 발행 카테고리 (피부·RTX·노령견·프로티원·1인창업)", gPath: "G:\\내 드라이브\\03. 업무\\2026 쿠팡파트너스", badge: "5대카테고리",
          files: [
            { name: "메디비티/ & RTX_그래픽카드/ & 반려동물_노령견/ & 프로티원/ & 1인창업/", ver: "v1.6(2026.11.28)", kind: "folder", size: "완본", status: "active", summary: "카테고리별 블로그 원고·비교표·1:1 정사각 누끼 사진 통합" }
          ]
        }
      ]
    },
    {
      id: "root-lab", biz: "lab", icon: "🎓", title: "04. 대학원·연구·다운로드 사진아카이브 (02. Study_Yonsei & 01. 개인)", gPath: "G:\\내 드라이브\\02. Study_Yonsei\\1. target",
      desc: "연세대 박사논문(제1~3장·기말과제) 본진(안건 3-A 이관 완료) 및 다운로드 폴더 사진·문서 표준 네이밍 통합 아카이브",
      children: [
        {
          id: "lab-01-yonsei", biz: "lab", icon: "📚", title: "01. 연세대_박사논문_및_초기연구이관본", gPath: "G:\\내 드라이브\\02. Study_Yonsei\\1. target", badge: "본진일원화",
          files: [
            { name: "4. 종합시험_및_투고준비_20261123/04_제2장_KCI투고용_논문초고_v5.0(2026.11.28).docx", ver: "v5.0(2026.11.28)", kind: "doc", size: "완본", status: "active", summary: "제2장 KCI 투고용 v5(카피킬러 2%)·제3장 v3·Short Paper v1(카피킬러 1%)" },
            { name: "_archive_202610_초기연구/ (00. AI 컨텍스트\\연구_환경금융 이관본)", ver: "v1.0(2026.10.24)", kind: "archive", size: "120파일", status: "archive", summary: "안건 3-A 승인에 따라 00. AI 컨텍스트에서 연세대 본진으로 합류된 10월 연구자료" }
          ]
        },
        {
          id: "lab-02-downloads", biz: "all", icon: "🖼️", title: "02. 다운로드_사진_문서_통합아카이브 (C:\\Downloads 직결)", gPath: "G:\\내 드라이브\\01. 개인\\00. 다운로드_사진_문서_통합아카이브", badge: "사진정리완료",
          files: [
            { name: "01_고수템_사업계획서_벤치마킹_캡처/ ~ 08_설치프로그램_폰트/", ver: "v1.0(2026.11.28)", kind: "image", size: "415파일", status: "active", summary: "Screenshot_... 원본명을 한글 분류_주제_시각_v1.0(2026.xx.xx)으로 전수 변경 및 G드라이브 직결" },
            { name: "_archive/_중복정리후보/ (중복 (1).jpg 및 사진정리 중복본 격리)", ver: "중복격리", kind: "archive", size: "95파일", status: "archive", summary: "Downloads 루트와 사진정리 폴더에 중복 저장된 동일 사진 자동 감별 격리본" }
          ]
        }
      ]
    }
  ];

  EXTRA_NODES.forEach(function (n) { seed.TREE_NODES.push(n); });
})();
