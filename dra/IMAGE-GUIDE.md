# 이미지 연결 안내

지정한 폴더의 완성 이미지를 인물 28명과 심볼 9종에 연결했습니다. **원본 폴더는 제외**했으며, 배포 파일은 해상도와 구도를 유지한 WebP로 변환했습니다.

## 적용 기준

- 인물 이미지: 모두 **1536 × 640px (12:5)**. 품질 90, 알파 품질 100의 WebP이며 카드와 상세 창에서 동일한 전체 비율로 표시합니다.
- 심볼: 모두 **1080 × 1080px**, 투명도를 유지한 무손실 WebP. 아카데미아·기숙사·드래곤샵·황가에 각각 연결했습니다.
- 비올레타·로제니·에레시안은 파일명의 **셒 버전**을 적용했습니다.
- 엘레드라는 사용자 요청에 따라 **성체 버전 이미지**를 적용했습니다.
- 중복된 다른 버전은 배포 파일에 포함하지 않았습니다.

## 교체 방법

같은 WebP 형식이면 아래 경로의 파일을 교체하면 됩니다. JPG/PNG 등 다른 형식은 실제 형식에 맞는 확장자로 저장한 뒤, 해당 인물의 assets/content.js 객체에 아래처럼 경로를 지정하세요.

```js
portrait: 'assets/characters/elioni.webp',
```

개별 지정이 없으면 기본 경로는 `assets/characters/캐릭터ID.webp`입니다. 기존 SVG 초상 자리는 보관되어 있어 WebP 경로를 SVG로 바꾸면 다시 사용할 수 있습니다. 이미지 교체 후 GitHub Pages에 새 파일을 함께 업로드하세요.

## 인물별 연결

원본 위치는 제공한 명함이미지 폴더 기준입니다. 마지막 열의 PNG 파일명은 변환 전 제공 파일의 이름입니다.

| 인물 | 사이트 파일 | 선택한 완성 파일 |
| --- | --- | --- |
| 엘리오니 | `assets/characters/elioni.webp` | `01.학생/00.엘리오니完.png` |
| 엘리시아 | `assets/characters/elisia.webp` | `01.학생/00.엘리시아完.png` |
| 리에타 | `assets/characters/rieta.webp` | `01.학생/00.리에타完.png` |
| 에스미 | `assets/characters/esmi.webp` | `01.학생/00.에스미完.png` |
| 라핀느 | `assets/characters/rapinne.webp` | `01.학생/00.라핀느完.png` |
| 마리셸 | `assets/characters/marishel.webp` | `01.학생/00.마리셸完.png` |
| 실렌 | `assets/characters/silen.webp` | `01.학생/00.실렌完.png` |
| 콜레트 | `assets/characters/colette.webp` | `01.학생/00.콜레트完.png` |
| 셀베니 | `assets/characters/selveni.webp` | `01.학생/00.셀베니完.png` |
| 실로라 | `assets/characters/silora.webp` | `01.학생/00.실로라完.png` |
| 밀로어 | `assets/characters/miloer.webp` | `01.학생/00.밀로어完.png` |
| 하티 | `assets/characters/hati.webp` | `01.학생/00.하티完.png` |
| 아스테리아 | `assets/characters/asteria.webp` | `02.교수/00.prin아스테리아完.png` |
| 비올레타 | `assets/characters/violeta.webp` | `02.교수/00.vp비올레타_셒完.png` |
| 아르마덴 | `assets/characters/armaden.webp` | `02.교수/00.prof아르마덴完.png` |
| 로제니 | `assets/characters/rozeni.webp` | `02.교수/00.prof로제니_셒完.png` |
| 아이데린 | `assets/characters/aiderin.webp` | `02.교수/00.prof아이데린完.png` |
| 미레아 | `assets/characters/mirea.webp` | `02.교수/00.prof미레아完.png` |
| 에르멜 | `assets/characters/ermel.webp` | `02.교수/00.prof에르멜完.png` |
| 레브린 | `assets/characters/revryn.webp` | `02.교수/00.prof레브린完.png` |
| 라스카 | `assets/characters/raska.webp` | `03.샵마스터/00.마스터라스카完.png` |
| 벨루아 | `assets/characters/bellua.webp` | `03.샵마스터/00.마스터벨루아完.png` |
| 노르멜 | `assets/characters/normel.webp` | `03.샵마스터/00.마스터노르멜完.png` |
| 그리멜 | `assets/characters/grimel.webp` | `03.샵마스터/00.마스터그리멜完.png` |
| 에레시안 | `assets/characters/eresian.webp` | `04.황가/00.드라키아3세에레시안_셒完.png` |
| 디아드리아 | `assets/characters/diadria.webp` | `04.황가/00.princess디아드리아完.png` |
| 시스미 | `assets/characters/sismi.webp` | `04.황가/00.princess시스미完.png` |
| 엘레드라 | `assets/characters/eledra.webp` | `05.엘레드라/00.엘레드라성체完.png` |

## 심볼 연결

| 심볼 | 사이트 파일 | 제공 파일 |
| --- | --- | --- |
| 아카데미아 | `assets/symbols/academy.webp` | `아카데미아.png` |
| 발라우르 | `assets/symbols/balaur.webp` | `발라우르.png` |
| 오피온 | `assets/symbols/ophion.webp` | `오피온.png` |
| 케토 | `assets/symbols/ceto.webp` | `케토.png` |
| 이그니스 | `assets/symbols/ignis.webp` | `이그니스.png` |
| 아카이브 | `assets/symbols/archive.webp` | `아카이브.png` |
| 생츄어리 | `assets/symbols/sanctuary.webp` | `생츄어리.png` |
| 에이온 | `assets/symbols/aeon.webp` | `에이온.png` |
| 황가 | `assets/symbols/imperial.webp` | `황가.png` |

