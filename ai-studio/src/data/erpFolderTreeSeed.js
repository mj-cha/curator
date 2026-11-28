/* 고수하우스(회사) 전사 ERP 표준 폴더 트리 & 고수템 핸디핏 사진 아카이빙 시드 1 (src/data/erpFolderTreeSeed.js · 15KB 이하) */
window.GOSU_FOLDER_TREE_SEED = (function () {
  var NAMING_RULES = [
    { id: "NR-01", type: "일반 기획·보고·제출 문서", pattern: "[2자리순번_]프로젝트_핵심주제_v1.x(2026.xx.xx).확장자", example: "01_고수템_2R사업계획서_PSST_v2.4(2026.11.26).hwp" },
    { id: "NR-02", type: "AI 컨텍스트·공통 지침", pattern: "[프로젝트명]_context_v1.x(2026.xx.xx).md", example: "공통_AI지침_v1.13(2026.11.27).md" },
    { id: "NR-03", type: "핸디핏·벤치마킹 사진 아카이빙", pattern: "[2자리순번_]분류_화면기능명_v1.x(2026.xx.xx).png/jpg", example: "01_핸디핏_히어로_수영첫달사지마세요3가지_v2.0(2026.11.28).png" },
    { id: "NR-04", type: "아카이빙(_archive) 단일 규칙", pattern: "1폴더 최상단 = 최신본 1세트 · 구버전은 즉시 _archive/ 이동", example: "_archive/고수템_Full_마스터_사업계획서_v1.0(2026.11.23).md" }
  ];

  var TREE_NODES = [
    {
      id: "root-common", biz: "all", icon: "🏢", title: "00. 고수하우스 전사 공통 (00. AI 컨텍스트)",
      gPath: "G:\\내 드라이브\\00. AI 컨텍스트", desc: "회사(고수하우스) 전사 컨트롤타워 지침·AI 직원·00. 전사 벤치마킹 프롬프트 통합 루트",
      children: [
        {
          id: "ai-00-ctrl", biz: "all", icon: "🧭", title: "00. 공통_컨트롤타워", gPath: "G:\\내 드라이브\\00. AI 컨텍스트\\00. 공통", badge: "SSOT",
          files: [
            { name: "00_INDEX_최신목록.md", ver: "v1.13(2026.11.28)", kind: "doc", size: "13.2KB", status: "active", summary: "전사 AI 컨텍스트 마스터 인덱스 (루트 유일 파일)" },
            { name: "공통_AI지침_v1.13(2026.11.27).md", ver: "v1.13(2026.11.27)", kind: "doc", size: "49.7KB", status: "active", summary: "전 AI 계정·에이전트 최우선 운영 지침" },
            { name: "공통_AI도구DB_v1.8(2026.11.23).md", ver: "v1.8(2026.11.23)", kind: "doc", size: "32.5KB", status: "active", summary: "MCP 연결·도구함·루틴 마스터 DB" },
            { name: "공통_업무운영체계_v0.5(2026.11.12).md", ver: "v0.5(2026.11.12)", kind: "doc", size: "47.8KB", status: "active", summary: "MJ Hub 및 노션 11대 마스터 DB 설계서" },
            { name: "전사_G드라이브_폴더트리_네이밍_아카이빙_표준규칙_설계안_v1.0(2026.11.28).md", ver: "v1.0(2026.11.28)", kind: "doc", size: "14.8KB", status: "active", summary: "G드라이브 일원화·폴더 트리·v1.x(2026.xx.xx) 네이밍·_archive 표준" },
            { name: "MJ_COMPANY_DASHBOARD_v1.0(2026.11.28).html", ver: "v1.0(2026.11.28)", kind: "html", size: "84.6KB", status: "active", summary: "고수하우스 AI 직원 10명·스킬 53개 업무판 (Documents 이관 완료)" },
            { name: "_archive/공통_AI지침_v1.5~v1.12(2026.11.22).md", ver: "구버전 18종", kind: "archive", size: "420KB", status: "archive", summary: "이전 버전 지침·도구DB·운영체계 보관본" }
          ]
        },
        {
          id: "ai-00-bench", biz: "all", icon: "🏛️", title: "00. 전사_벤치마킹_프롬프트", gPath: "G:\\내 드라이브\\00. AI 컨텍스트\\00. 전사_벤치마킹_프롬프트", badge: "3,680건",
          files: [
            { name: "00_전사_벤치마킹_템플릿_시스템_통합아카이브_v1.0(2026.11.25).md", ver: "v1.0(2026.11.25)", kind: "doc", size: "7.9KB", status: "active", summary: "전사 벤치마킹 마스터 아카이브 가이드" },
            { name: "01_퍼블리_템플릿DB_v3.0(2026.11.23)/00_퍼블리_전체_3648건_통합마스터DB_v3.0(2026.11.23).xlsx", ver: "v3.0(2026.11.23)", kind: "sheet", size: "881KB", status: "active", summary: "퍼블리 3,648건 마스터 엑셀 DB 및 원본 템플릿 1,161종" },
            { name: "02_실전설계_프롬프트31종_v1.0(2026.11.24)/01~31_실전설계_프롬프트.pdf", ver: "v1.0(2026.11.24)", kind: "pdf", size: "48.2MB", status: "active", summary: "Claude Code·소셜로그인·결제·정산·보안 실전 설계 가이드 31종" },
            { name: "03_전사_PPT템플릿_원본/Template_사업계획서_제안서_OKR", ver: "v1.0(2026.10.27)", kind: "ppt", size: "38파일", status: "active", summary: "Documents\\pptx에서 G드라이브로 일원화된 PPT 템플릿 원본" }
          ]
        },
        {
          id: "ai-01-06-ctx", biz: "all", icon: "🗂️", title: "01~06. 사업부별 AI 컨텍스트", gPath: "G:\\내 드라이브\\00. AI 컨텍스트\\01. 고수템_모두의창업 ~ 06. 개인_재테크_라이프", badge: "정렬완료",
          files: [
            { name: "01. 고수템_모두의창업/모두의창업_context_v3.0(2026.10.22).md", ver: "v3.0(2026.10.22)", kind: "doc", size: "7.9KB", status: "active", summary: "고수템·모두의창업 AI 컨텍스트 및 12월 구독툴 검토" },
            { name: "02. 씨이에이_CEA_ESG/씨이에이_context_v1.0(2026.10.17).md", ver: "v1.0(2026.10.17)", kind: "doc", size: "9.5KB", status: "active", summary: "CEA 교육·ESG 컨설팅·온실가스 검증심사원 통합 컨텍스트" },
            { name: "03. 연세대_환경금융연구/연구_환경금융_context_v4.0(2026.10.24).md", ver: "v4.0(2026.10.24)", kind: "doc", size: "26.4KB", status: "active", summary: "환경금융 박사논문 컨텍스트 (10월 실물 파일은 연세대 본진 이관 완료)" },
            { name: "04. 내면소통_만렙탐구/김주환교수_논문특강_무손실아카이브_및_인계문서_v1.0(2026.10.17).md", ver: "v1.0(2026.10.17)", kind: "doc", size: "29.4KB", status: "active", summary: "내면소통·만렙탐구·Soul Development 통합 컨텍스트" },
            { name: "05. 쿠팡_신사업_아카데미/PM아카데미_설계_v1.0(2026.11.27).md", ver: "v1.0(2026.11.27)", kind: "doc", size: "5.9KB", status: "active", summary: "PM 아카데미 및 오즈코딩 1인 창업 컨텍스트" },
            { name: "06. 개인_재테크_라이프/주식투자_투자루틴_v1.0(2026.10.22).md", ver: "v1.0(2026.10.22)", kind: "doc", size: "4.8KB", status: "active", summary: "주식 투자 루틴 및 개인 라이프 컨텍스트" }
          ]
        }
      ]
    },
    {
      id: "root-gosutem", biz: "gosutem", icon: "🎒", title: "01. 고수템 사업부 (@ GOSUTEM 9대 표준 트리)",
      gPath: "G:\\내 드라이브\\@ GOSUTEM", desc: "고수하우스 핵심 사업부 '고수템'의 기획·리서치·지원사업·특허·재무·시드가방·핸디핏 사진 아카이빙·웹앱·벤치마킹 9대 표준 트리",
      children: [
        {
          id: "gosu-00-master", biz: "gosutem", icon: "📐", title: "00. 마스터_기획_ADR", gPath: "G:\\내 드라이브\\@ GOSUTEM\\00. 마스터_기획_ADR", badge: "v2.0 최신",
          files: [
            { name: "고수템_Full_마스터_사업계획서_v2.0(2026.11.27).md", ver: "v2.0(2026.11.27)", kind: "doc", size: "102KB", status: "active", summary: "고수템 전사 마스터 사업계획서 최신 정본 (.md & .docx)" },
            { name: "고수템_의사결정_히스토리_ADR_v2.0(2026.11.27).md", ver: "v2.0(2026.11.27)", kind: "doc", size: "62.7KB", status: "active", summary: "고수템 아키텍처·비즈니스 의사결정 기록(ADR) 정본" },
            { name: "고수템_IPO_BM_아키텍처_도식_v2.0(2026.11.27).html", ver: "v2.0(2026.11.27)", kind: "html", size: "45.6KB", status: "active", summary: "고수템 비즈니스 모델 인터랙티브 아키텍처 도식" },
            { name: "_archive/고수템_Full_마스터_사업계획서_v1.0(2026.11.23).md", ver: "구버전 14종", kind: "archive", size: "380KB", status: "archive", summary: "v1.0 마스터 계획서 및 초기 The파우치 기획서 보관본" }
          ]
        },
        {
          id: "gosu-01-research", biz: "gosutem", icon: "🔬", title: "01. 리서치_고객검증", gPath: "G:\\내 드라이브\\@ GOSUTEM\\01. 리서치_고객검증", badge: "인터뷰·원장",
          files: [
            { name: "01_시장검증_학술통계_리서치/고수템_시장검증_리서치_v1.0(2026.10.25).md", ver: "v1.0(2026.10.25)", kind: "doc", size: "116KB", status: "active", summary: "시장검증·학술통계·출처 원문 검증 리서치 11종 통합" },
            { name: "02_고객인터뷰_음성_전사본/이민경_261124_170104_v1.0(2026.11.24).m4a", ver: "v1.0(2026.11.24)", kind: "audio", size: "119MB", status: "active", summary: "고객·멘토 인터뷰 녹음 및 전사본 (중복 119MB 음성 제거 완료)" },
            { name: "03_페르소나_실측검증_원장/고수템_10인_페르소나_실측검증_원장_v1.0(2026.11.27).md", ver: "v1.0(2026.11.27)", kind: "doc", size: "31.3KB", status: "active", summary: "10인 페르소나 실측 검증 원장 (.md/.docx/.csv)" }
          ]
        },
        {
          id: "gosu-02-gov", biz: "gosutem", icon: "🏛️", title: "02. 지원사업_모두의창업", gPath: "G:\\내 드라이브\\@ GOSUTEM\\02. 지원사업_모두의창업", badge: "1R·2R·보육",
          files: [
            { name: "01_아이디어심사_917/제출서류_및_합격안내_v1.0(2026.09.17)", ver: "v1.0(2026.09.17)", kind: "folder", size: "26파일", status: "active", summary: "아이디어 심사 제출서류 및 1라운드 합격 안내" },
            { name: "02_1R_사업화계획서/고수템_사업계획서_v4.6(2026.11.24).docx", ver: "v4.6(2026.11.24)", kind: "doc", size: "2.8MB", status: "active", summary: "1R 최종 사업계획서 및 활동보고서 v2.0 (구 '삭제' 폴더 -> _archive)" },
            { name: "03_2R_사업계획서_MVP/차명진_2R_사업계획서_v2.4(2026.11.26).hwp", ver: "v2.4(2026.11.26)", kind: "doc", size: "574KB", status: "active", summary: "2R 공식 HWP 사업계획서 최신본 + PSST 4문항 + 외주 RFP 2종" },
            { name: "04_보육센터_멘토링_활동보고서/01_멘토링_02_활동보고서_03_StarCasting", ver: "v1.2(2026.11.24)", kind: "folder", size: "35파일", status: "active", summary: "연세대 창업보육센터 1·2회차 활동보고서 및 StarCasting IR" }
          ]
        },
        {
          id: "gosu-03-ip", biz: "gosutem", icon: "⚖️", title: "03. 브랜드_특허_법무", gPath: "G:\\내 드라이브\\@ GOSUTEM\\03. 브랜드_특허_법무", badge: "특허3건·상표",
          files: [
            { name: "01_네이밍_로고_상표출원/고수템_상표출원_준비_v1.3(2026.11.09).md", ver: "v1.3(2026.11.09)", kind: "doc", size: "11.2KB", status: "active", summary: "상표등록출원서 및 상표견본 (.gdoc 중복 16개 격리 완료)" },
            { name: "02_특허출원_3건_명세서_도면/특허명세서_A_B_C_v2.1(2026.11.23).docx", ver: "v2.1(2026.11.23)", kind: "doc", size: "4.5MB", status: "active", summary: "특허 3건 정규출원 명세서·도면 (spec_A_v21 등 임시 중복본 격리)" }
          ]
        },
        {
          id: "gosu-04-fin", biz: "gosutem", icon: "💳", title: "04. 재무_창업활동자금", gPath: "G:\\내 드라이브\\@ GOSUTEM\\04. 재무_창업활동자금", badge: "장부·영수증",
          files: [
            { name: "01_창업활동자금_장부_승인서/고수템_창업활동자금_장부_v1.1(2026.11.27).gsheet", ver: "v1.1(2026.11.27)", kind: "sheet", size: "시트", status: "active", summary: "창업활동자금 집행 장부 v1.1 및 사전승인요청서" },
            { name: "02_영수증_카드내역_증빙/비용_특허로_납부영수증_v1.0(2026.11.23).pdf", ver: "v1.0(2026.11.23)", kind: "pdf", size: "114KB", status: "active", summary: "바탕화면 이관 특허로 납부영수증 및 카드·영수증 증빙 22건" }
          ]
        },
        {
          id: "gosu-05-bag", biz: "gosutem", icon: "🏊", title: "05. 상품_시드가방_에셋", gPath: "G:\\내 드라이브\\@ GOSUTEM\\05. 상품_시드가방_에셋", badge: "실사 130장",
          files: [
            { name: "01_시드가방_마스터DB_스토리/고수템_1R_수영_시드가방5종_6칸스토리_실제유튜버기반_v2.0(2026.11.24).md", ver: "v2.0(2026.11.24)", kind: "doc", size: "9.4KB", status: "active", summary: "수영 시드가방 5종 6칸 스토리 및 Supabase 마스터 시트 3종" },
            { name: "02_실제유튜버_수영가방_실사패키지/00_실제유튜버_수영가방6종_합본및개별실사_매핑표_v1.0(2026.11.28).md", ver: "v1.0(2026.11.28)", kind: "doc", size: "6.6KB", status: "active", summary: "수영 유튜버 5인 합본 플랫레이 6종 & 개별 실사 117장" }
          ]
        }
      ]
    }
  ];

  return { NAMING_RULES: NAMING_RULES, TREE_NODES: TREE_NODES };
})();
