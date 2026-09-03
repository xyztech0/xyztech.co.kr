# XYZTECH Website

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
- 설계역량: `capabilities.html`
- 프로젝트: `projects.html`
- 문의: `contact.html`

문의 폼은 GitHub Pages에서도 작동하도록 `ceo@xyztech.co.kr` 메일 작성창을 여는 방식입니다. 서버 저장형 문의 접수는 추후 별도의 폼 서비스 또는 서버 연결이 필요합니다.
