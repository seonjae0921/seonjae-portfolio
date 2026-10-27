# 이선재 포트폴리오

- 사이트: https://seonjae0921.github.io/seonjae-portfolio/
- 저장소: https://github.com/seonjae0921/seonjae-portfolio
- 노션 커리어 허브 (기준 데이터): https://app.notion.com/p/404200625456816e9275ef39ca8a78cd?source=copy_link

메인 원페이지 + 프로젝트별 상세 페이지 9건. HTML / CSS / Vanilla JS만 사용하고, GitHub Pages에 그대로 올라갑니다.

```
index.html                  메인 (첫 화면 · 포트폴리오 · 소개 · 연락처)   ← 자동 생성
projects/<slug>/index.html  프로젝트 상세 9건                            ← 자동 생성
assets/style.css            공통 스타일 (색상 · 글꼴은 맨 위 :root 토큰)
assets/main.js              메뉴 위치 · 지표 카드 회전 · 분야 필터 · 등장 모션 · 이메일 복사
tools/content.js            ★ 모든 글 내용
tools/build.js              content.js → HTML 생성
profile.jpg                 프로필 사진
resume.pdf                  이력서 · 자기소개서 (주소 · 나이 제거본)
images/                     (선택) 프로젝트 썸네일
```

## 내용 수정하기

1. `tools/content.js`에서 글을 고칩니다. 수치는 노션 커리어 허브의 근거 문서와 맞춰 주세요.
2. `node tools/build.js` 를 실행하면 `index.html`과 `projects/` 아래 상세 페이지가 모두 다시 만들어집니다. (Node.js 18 이상)

HTML을 직접 고쳐도 되지만, 다음에 build.js를 실행하면 덮어씌워집니다.

| 키 | 내용 |
|---|---|
| `site` | 이름 · 이메일 · 배포 주소 · 노션 링크 · 이력서 · 사진 |
| `intro` | 첫 화면 문장, 키워드 3개, 회전하는 핵심 지표 3개(각각 연결 프로젝트 slug) |
| `fields` | 분야 필터 |
| `projects` | 프로젝트 9건 — 목록 카드 필드 + 상세 `sections` (text · list · lead · results · parts · links) |
| `approach` | 일하는 방식 4개 (근거 프로젝트로 연결) |
| `about` | 경력 · 교육/학력 · 스킬 · 자격증 |

## 이미지 넣기 (선택)

`images/<slug>.jpg` 파일을 넣고 다시 빌드하면 목록 카드와 상세 상단에 표시됩니다. 없으면 수치 카드가 대신 보입니다. 권장 1600×1000, 300KB 이하.

slug: `search-ads`, `content-channels`, `svi-evaluation`, `b2g-fair`, `grants`, `newspaper`, `jikding`, `ai-video`, `self-publishing`
