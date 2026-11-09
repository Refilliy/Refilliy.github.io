# 드라고니움 아카데미아

AI 인터랙티브 채팅의 세계관과 인물을 소개하는 HTML·CSS·JavaScript 정적 사이트입니다. 밀랍 봉인 초대장을 열고, 따뜻한 양피지 입학 안내서로 들어갑니다. 별도의 빌드 과정은 없습니다.

## 보기

`index.html`을 브라우저에서 열어 봉인을 누른 뒤 ‘초대를 받아들이고 입장하기’를 선택합니다. 초대장 개봉은 JavaScript 없이 작동합니다. 안내서의 검색·필터·탭·상세 프로필에는 JavaScript가 필요합니다.

로컬 웹 서버를 사용하려면 이 폴더에서 `python -m http.server 8000`을 실행하고 `http://localhost:8000`에 접속합니다. 현재 실행 환경에서는 내장 브라우저의 로컬 접근 제한 때문에 실제 화면 검증을 완료하지 못했습니다.

## GitHub Pages 배포

GitHub 저장소가 지정되지 않아 실제 업로드·공개 배포는 하지 않았습니다.

1. 이 폴더의 **내용물**을 저장소 `main` 브랜치 최상위에 올립니다. `index.html`, `academy.html`, 전체 `assets/`, `.nojekyll`을 포함합니다.
2. **Settings → Pages**에서 **Deploy from a branch → main → / (root)**를 선택합니다.
3. 배포가 완료되면 Pages 설정에 표시된 주소로 접속합니다.

Actions를 사용하려면 `.github/workflows/pages.yml`도 올리고 **Settings → Pages → Source: GitHub Actions**를 선택합니다. `main` 푸시 또는 수동 실행으로 사이트 파일을 배포합니다. 브랜치 방식만 사용할 때는 워크플로를 업로드하지 않아도 됩니다.

공식 안내: [배포 소스 설정](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site), [Pages Actions](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).

## 수정할 파일

| 내용 | 파일 |
| --- | --- |
| 입장 초대장과 안내서 문구 | `index.html`, `academy.html` |
| 안내서 전체 디자인·모바일 레이아웃 | `assets/guide.css` |
| 초대장 기본 스타일·봉투·필기체와 밝은 양피지 테마 | `assets/style.css`, `assets/invitation.css`, `assets/handwriting.css` |
| 인물·기숙사·시설·세계관 데이터 | `assets/content.js` |
| 검색·탭·프로필·시설 선택 동작 | `assets/app.js` |
| 입체 시설 모형·회전·확대 | `assets/campus3d.js` |
| 지도 안내판·시설 목록 디자인 | `assets/campus.css` |
| 인물별 1536×640 완성 이미지 | `assets/characters/*.webp` |
| 아카데미아·기숙사·상점·황가 심볼 | `assets/symbols/` |

인물은 전체 28명이며, 기본 화면에는 6개 카드를 먼저 보여 줍니다. 나머지는 ‘모든 인물 보기’, 검색 또는 소속 필터로 탐색합니다. 세계관·기숙사·학교 소개와 작품 장르는 기본으로 펼쳐 두며, 인물의 세부 프로필과 스포일러 기록은 접힌 상태로 둡니다. 760px 이하에서는 인물 카드가 한 열로 배치됩니다.

시설 안내도는 3D 좌표로 만든 건물과 지형을 Canvas에 투영한 모형입니다. 좌우 드래그 또는 회전 버튼으로 시점을 바꾸고, 확대·축소·초기화 버튼으로 조작합니다. 지도에 초점을 맞추면 좌우 화살표, `+`·`-`, `Home` 키도 사용할 수 있습니다. 시설 번호와 아래 목록은 같은 설명에 연결됩니다. 외부 3D 라이브러리를 불러오지 않으며, 모형을 실행하지 못하면 같은 배치의 정적 SVG를 표시합니다.

이미지 교체 방법과 인물별 파일명은 [IMAGE-GUIDE.md](IMAGE-GUIDE.md)에 있습니다. `content.js`의 개별 인물 `portrait`에 새 JPG·WebP·PNG·SVG 경로를 지정할 수 있습니다. 인물 이미지의 기준 크기는 **1536×640px, 12:5**입니다.

배포용 이미지는 WebP로 변환했습니다. 인물·성채·이전 콘셉트 이미지는 품질 90, 알파 품질 100으로 압축했고, 투명 심볼은 무손실 WebP를 사용합니다. 모든 이미지의 해상도와 비율을 유지합니다. GitHub에는 ZIP의 압축을 풀고 위에서 안내한 사이트 내용물을 업로드하세요.

## 채팅 링크와 글꼴

- [세이프 이야기](https://share.crack.wrtn.ai/7uuossr)
- [언세이프 이야기](https://share.crack.wrtn.ai/2gix8er)

두 링크는 새 탭에서 크랙으로 연결됩니다. 사이트 자체는 AI 대화 API를 호출하거나 대화를 저장하지 않습니다.

Google Fonts의 Noto Sans KR·Noto Serif KR·Cormorant Garamond와 필기체 Allura(영문)·Nanum Pen Script(한글)를 사용합니다. 필기체는 서명·짧은 메모에 적용하며, 본문과 메뉴는 읽기 쉬운 인쇄체를 유지합니다. 웹폰트는 인터넷 연결이 필요하고, 차단되면 시스템 대체 글꼴로 표시됩니다.

비공개 설정은 스포일러 UI로 구분하지만 정적 데이터 파일에는 포함됩니다. 화면 기획은 [DESIGN.md](DESIGN.md), 자산 기록은 [ASSETS.md](ASSETS.md), 확인 범위와 한계는 [VERIFICATION.md](VERIFICATION.md)를 참고하세요.
