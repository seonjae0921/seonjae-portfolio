# 이선재 포트폴리오

- 사이트: https://seonjae0921.github.io/seonjae-portfolio/
- 저장소: https://github.com/seonjae0921/seonjae-portfolio
- 노션 커리어 허브 (기준 데이터): https://app.notion.com/p/404200625456816e9275ef39ca8a78cd?source=copy_link

한 페이지 포트폴리오입니다. 노션의 모든 내용을 옮기지 않고, **핵심 수치 4개**와 **직접 열어볼 수 있는 결과물이 있는 작업**만 싣습니다. 전체 경력과 근거 자료는 노션 커리어 허브로 연결합니다.

```
index.html        사이트 페이지 (자동 생성)
assets/style.css  스타일 (색상 · 글꼴은 맨 위 :root 토큰)
assets/main.js    메뉴 위치 표시 · 등장 모션
tools/content.js  ★ 모든 글 내용
tools/build.js    content.js → index.html 생성
profile.jpg       프로필 사진
resume.pdf        이력서 · 자기소개서 (주소 · 나이 제거본)
```

## 내용 수정하기

1. `tools/content.js`를 고칩니다 — `intro`(첫 화면), `highlights`(핵심 수치), `works`(작업물), `about`, `contact`.
2. `node tools/build.js` 로 `index.html`을 다시 만듭니다. (Node.js 18 이상)
