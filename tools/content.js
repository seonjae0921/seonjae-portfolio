/* ==========================================================
   이선재 포트폴리오 — 모든 글 내용은 이 파일에 있습니다.
   원칙: 노션 커리어 허브(기준 데이터) 중 핵심 수치와 '볼 수 있는 자료'가 있는 작업만 싣습니다.
   수정 후 `node tools/build.js` 를 실행하면 index.html 이 다시 만들어집니다.
   ========================================================== */

module.exports = {
  site: {
    name: '이선재',
    nameEn: 'SEONJAE',
    role: '콘텐츠 마케터',
    email: 'seonjae_0921@naver.com',
    baseUrl: 'https://seonjae0921.github.io/seonjae-portfolio/',
    notion: 'https://app.notion.com/p/404200625456816e9275ef39ca8a78cd?source=copy_link',
    resume: 'resume.pdf',
    photo: 'profile.jpg',
    description: '이선재 · 콘텐츠 마케터 — 블로그 방문자 33배, 검색광고 CPC −63%, B2G 1억 원 계약의 발판, SVI 우수 77.8점.',
  },

  intro: {
    eyebrow: 'Content Marketer · 이선재',
    headline: [['텍스트의 가치를', false], ['시장의 가치로', true], ['전환하는 마케터입니다.', false]],
    lead: '기자로 5년간 읽히는 글을 익혔고, 4년간 그 글을 검색 유입과 B2G 계약으로 바꿔 왔습니다.',
  },

  /* 핵심 성과 — 숫자 · 무엇의 변화인지 · 내 역할 */
  highlights: [
    { value: '33배', label: '블로그 월 방문자', detail: '60 → 2,000명', scope: '주도' },
    { value: '−63%', label: '검색광고 클릭당 비용', detail: '2,044 → 752원 · 홈페이지 방문자 5.7배', scope: '단독 운영' },
    { value: '1억 원', label: 'B2G 계약의 발판', detail: '구매상담회 참가기업 선정 → 영업팀 계약 4건', scope: '기여' },
    { value: '77.8점', label: '사회적기업 SVI \'우수\'', detail: '14개 지표 증빙 체계 · 6개 지표 만점', scope: '주도' },
  ],

  /* 작업물 — 직접 열어볼 수 있는 자료가 있는 것만 */
  works: [
    {
      kpi: '33배', kpiSub: '블로그 월 방문자',
      tag: '실무', period: '2020.10 – 2024.12',
      title: 'B2G 채널 콘텐츠',
      summary: '공공기관 구매 담당자가 검색하는 순간에 보이도록, 채널마다 역할을 나눴습니다.',
      points: [
        '네이버 블로그는 사례 · FAQ, 티스토리는 상품 검색, 브런치는 전문성 연재, 전자책 4권',
        '해킹으로 끊긴 블로그를 새로 열어 17개월간 285편 단독 운영 · 누적 방문 20,650회',
        '검색광고와 연계해 클릭당 비용 −63%, 홈페이지 월 방문자 5.7배',
      ],
      links: [['브런치 연재 보기', 'https://brunch.co.kr/@dreamers']],
    },
    {
      kpi: '4편', kpiSub: 'AI 홍보영상 · 숏폼',
      tag: '외주 · 개인', period: '2026',
      title: 'AI 브랜드 홍보영상',
      summary: '브랜드마다 차별화 과제를 먼저 정하고, 카피 · 콘티 · 연출 · 편집까지 혼자 만들었습니다.',
      points: [
        '바스타임: 대기업 납품 실적을 소셜 프루프로, 욕실 가구를 \'공간의 주인공\'으로',
        '이리온 팜앤카페: 봄 모종부터 겨울 만두까지 이어지는 사계절 옴니버스',
        '북트레일러: 《64》 30초 미스터리 · 《나미야 잡화점의 기적》 1분 감성',
      ],
      links: [
        ['바스타임', 'https://www.instagram.com/reel/DerqX0Uh4Zl/'],
        ['이리온', 'https://www.instagram.com/reel/Derr4EMBndr/'],
        ['북트레일러', 'https://www.instagram.com/reel/Dc0w0G-yfiC/'],
      ],
    },
    {
      kpi: 'ISBN 3건', kpiSub: '독립출판 2종',
      tag: '개인', period: '2026.04 – 2026.10',
      title: '독립출판 (필명 욜)',
      summary: '독자가 책을 읽는 상황부터 정하고, 기획 · 집필 · 편집 · 유통까지 혼자 했습니다.',
      points: [
        '《당신을 비추는 밤》 번아웃에 지친 어른을 위한 5분 그림 동화 (이북)',
        '《어쩌다 시작된 울릉도 한 달》 직장인을 위한 포토 에세이 (종이책 · 이북)',
        'YES24 · 알라딘 · 밀리의서재 등 입점',
      ],
      links: [
        ['《당신을 비추는 밤》', 'https://bookk.co.kr/bookStore/69e2e813e9cb19a22b397609'],
        ['《울릉도 한 달》', 'https://bookk.co.kr/bookStore/6aca17d9d5de0ed03e01ce95'],
      ],
    },
  ],

  about: {
    career: [
      ['2020.10 – 2024.12', '(주)꿈꾸는사람들', '관리팀 대리 · 콘텐츠 마케팅 / 사업기획'],
      ['2020.10 – 현재', '(주)포천신문', '프리랜서 편집자 · 본업과 병행'],
      ['2015.03 – 2020.05', '(주)포천신문', '취재 · 편집기자 · 신문 누적 197호 편집'],
    ],
    education: [
      ['2026', 'AI활용 디지털마케팅 전문가 양성과정 240시간 수료'],
      ['2015', '순천향대학교 미디어콘텐츠 졸업'],
    ],
    certificates: '웹디자인기능사 · GTQ 포토샵 1급 · ITQ A등급 · 사진기능사',
    skills: ['네이버 검색광고', 'Google Analytics', 'Photoshop', 'Premiere Pro', 'CapCut', 'Canva', 'ChatGPT · Gemini', 'AI 영상 툴'],
  },

  contact: {
    lead: '채용 제안, 자료 요청, 커피챗 모두 환영합니다.',
    mailSubject: '[포트폴리오] 이선재님께 연락드립니다',
    notionNote: '전체 경력과 근거 자료',
  },
};
