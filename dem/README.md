# 마왕님 힘내세요

스마트폰 단체 메시지로 시작하는 반응형 다크 판타지 코미디 세계관 사이트입니다. 캐릭터 이미지 9장, 등장인물 10명 소개, 8대 종족, 마족연합체, 원작의 멸망 경로가 포함되어 있습니다.

## GitHub 업로드 및 사이트 공개

1. ZIP을 압축 해제합니다. ZIP 파일 자체가 아니라 **압축을 푼 내용물**을 업로드합니다.
2. GitHub에서 새 저장소를 만든 뒤 `Add file → Upload files`로 파일을 올립니다. `index.html`이 저장소 최상위에 있어야 합니다. 기본 브랜치는 `main`을 사용하세요.
3. `.github/workflows/pages.yml`을 포함해 모든 파일을 커밋합니다. 숨김 폴더가 업로드되지 않았다면 GitHub의 `Add file → Create new file`에서 `.github/workflows/pages.yml` 경로로 새 파일을 만들고 제공된 파일 내용을 붙여 넣습니다.
4. 저장소의 `Settings → Pages → Build and deployment → Source`를 **GitHub Actions**로 설정합니다.
5. `Actions → Deploy website to GitHub Pages → Run workflow`를 눌러 첫 배포를 실행합니다. 이후에는 `main`에 변경 사항을 올릴 때 자동 배포됩니다.
6. 배포가 완료되면 `Settings → Pages` 또는 완료된 작업의 `github-pages` 링크에서 사이트 주소를 확인합니다.

GitHub Pages 설정을 완료하기 전에 첫 자동 작업이 실패했다면, 4번 설정 후 작업을 다시 실행하면 됩니다.

### 브라우저 업로드만 사용하는 간단한 방법

자동 배포 파일을 올리기 어렵다면 `Settings → Pages → Source`에서 **Deploy from a branch**, 브랜치 **main**, 폴더 **/ (root)**를 선택해도 됩니다. 이 경우 `.github/workflows/pages.yml`은 올리지 마세요. 두 배포 방법 중 하나만 선택합니다.

## 파일 구조

```text
index.html                 시작 화면과 세계관 콘텐츠
app.js                     인물 데이터와 인터랙션
style.css                  반응형 디자인
assets/                    캐릭터 9장과 장식 프레임
.github/workflows/pages.yml GitHub Pages 자동 배포
.nojekyll                  정적 파일 그대로 제공
CONTENT.md                 콘텐츠 및 이미지 출처
```

설치나 빌드가 필요 없습니다. 로컬에서는 `index.html`을 브라우저로 열면 됩니다. 이미지와 스크립트 경로는 상대 경로이므로 저장소 이름이 붙는 GitHub Pages 주소에서도 동작합니다. Google Fonts 연결이 없으면 기기 기본 글꼴을 사용합니다.

작품 설정·이미지 설명과 출처는 [CONTENT.md](CONTENT.md)를 참고하세요. `.openai` 설정과 이전 저장소의 Git 정보는 이 패키지에 포함하지 않았습니다.

공식 안내: [GitHub Pages 게시 설정](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site), [사용자 정의 워크플로](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).
