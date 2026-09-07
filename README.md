# XYZTECH Website — v23

GitHub Pages에서 별도 빌드 없이 실행되는 정적 홈페이지입니다.

## GitHub Pages 게시

1. ZIP 파일을 해제합니다.
2. 압축을 푼 폴더 안의 파일 전체를 GitHub 저장소 최상위에 업로드합니다.
3. GitHub 저장소의 **Settings → Pages**로 이동합니다.
4. **Deploy from a branch**, `main`, `/ (root)`를 선택하고 저장합니다.

`index.html`이 저장소의 최상위에 있어야 합니다.

## 수정할 위치

- 공통 디자인: `assets/styles.css`
- 공통 메뉴·하단 회사정보: `assets/main.js`
- 메인페이지: `index.html`
- 회사소개·조직도·확인서: `company.html`
- 사업분야: `services.html`
- 기술역량: `capabilities.html`
- 프로젝트: `projects.html`
- 문의: `contact.html`
- 공지사항: `notices.html`
- 디자인 검수 메모: `DESIGN_REVIEW.md`

문의 폼은 GitHub Pages에서도 작동하도록 `ceo@xyztech.co.kr` 메일 작성창을 여는 방식입니다. 서버 저장형 문의 접수는 추후 별도의 폼 서비스 또는 서버 연결이 필요합니다.

## v22 수정

설계·제작 수행 범위 반영, 회사소개/사업분야/문의 드롭다운 및 모바일 메뉴, 회사소개 고정 목차, 지그/자동화설비 중심 사업분야, 공지사항 빈 페이지를 적용했습니다.

프로젝트 이미지는 간략 형상 참고 자료이며 실물 촬영 사진이 아닙니다. 과거 프로젝트의 제작 여부는 단정하지 않습니다. 문의서는 기존 메일 작성 방식이며 공지사항은 notices.html에서 직접 편집합니다.

## v24 메뉴 변경

PC 상단 메뉴 하나를 열면 회사소개·사업분야·문의의 하위 항목이 세 열로 동시에 나타납니다. 흰색 86% 불투명도와 약한 배경 흐림을 적용했습니다. 마우스 이탈·외부 클릭·Escape로 닫고, 키보드 아래 방향키로 해당 열에 진입할 수 있습니다. 모바일 메뉴는 기존 터치 펼침 방식을 유지했습니다.
