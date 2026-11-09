# 시각 자산 기록

## 현재 사용

| 자산 | 용도·제작 방식 |
| --- | --- |
| `assets/academy-hero.webp` | 입학 안내서 표지의 성채·드래곤 콘셉트 아트. 내장 `image_gen` 생성 후 WebP 변환 |
| `assets/characters/*.webp` | 사용자가 제공한 인물 28명의 완성 이미지. 모두 1536×640, 원본 폴더 제외, 품질 90 WebP |
| `assets/symbols/*.webp` | 사용자가 제공한 심볼 9종. 아카데미아·세 기숙사·네 드래곤샵·황가, 모두 투명 1080×1080 무손실 WebP |
| `assets/campus3d.js` | 건물·지형·길·식생을 3D 좌표로 모델링한 시설 안내도. Canvas 투영·조명·시점 조작을 코드로 구현 |
| `assets/campus-map.svg` | 같은 3D 모형의 기본 시점을 내보낸 정적 대체 지도 |

배포용 PNG를 모두 WebP로 변환했습니다. 인물·성채·이전 콘셉트 이미지는 품질 90과 알파 품질 100, 심볼은 무손실 압축을 사용합니다. 크롭하거나 크기를 바꾸지 않았습니다. 비올레타·로제니·에레시안은 `셒` 버전, 엘레드라는 성체 버전을 적용했습니다. 정확한 파일 대응과 교체 규격은 [IMAGE-GUIDE.md](IMAGE-GUIDE.md)에 있습니다. 성채의 지형과 시설 배치도는 원안의 확정 설정이 아닌 시각적 해석입니다.

`assets/house-leaders.webp`, `assets/characters/*.svg`, `assets/crest.svg`는 이전 콘셉트와 초상 자리로 보관되지만 **현재 페이지에서는 사용하지 않습니다**. 초대장 배경은 CSS 양피지 테마입니다.

초대장 첫 화면의 밀랍 봉인에는 CSS로 어두운 적갈색 혼합과 안쪽 음영을 적용해 문장을 눌러 찍은 느낌을 냈습니다.

## 글꼴

Google Fonts의 Noto Sans KR·Noto Serif KR·Cormorant Garamond와 Allura(영문 필기체)·Nanum Pen Script(한글 펜 글씨)를 연결합니다. 폰트 파일을 번들에 포함하지 않으며 인터넷 연결이 없으면 시스템 대체 글꼴을 사용합니다.

## 이미지 생성 프롬프트 기록

아래는 원본 생성 기록입니다. 기록 속 PNG 경로는 생성 당시의 원본을 가리키며, 현재 배포 파일은 위 표의 WebP입니다. 현재 화면에서의 사용 여부도 위 표를 따릅니다.

<details>
<summary>아카데미아 표지 — 내장 image_gen</summary>

```text
Mode: built-in image_gen
Asset: outputs/dragonium-academia/assets/academy-hero.png
Purpose: original illustrative concept, not a canonical geography claim.
Prompt:
Use case: stylized-concept. Asset type: panoramic background artwork for a Korean fantasy dragon academy website. Primary request: a spectacular cinematic fantasy academy scene, polished premium Korean fantasy game concept illustration. Scene: a huge elegant Gothic academy on a steep forested cliff, slender stone towers and warm lit windows, cascading waterfalls below, distant mountain ranges veiled in clouds. A single majestic dragon flying in the upper right, wings spread, as a credible living creature. Composition: wide landscape, 2304 x 1296 if possible. Academy and dragon in the center-right and right half. Left 45 percent is atmospheric dark petrol teal mountains and softly layered clouds, relatively quiet negative space suitable for large gold website text, not a blank block. Twilight light pale antique gold behind the distant castle, deep teal foreground, subtle mist, rich painterly detail, restrained warm highlights. Sweeping scale, enchanting and hopeful rather than horror, highly refined environmental illustration, convincing architecture and dragon anatomy. No people in foreground. No text, typography, logo, watermark, frame, UI, interface, or lettering. This is an original visual concept, not an illustration of an established franchise.
```

</details>

<details>
<summary>보관 중인 세 헤더 콘셉트 — 내장 image_gen</summary>

```text
Mode: built-in image_gen.imagegen; one generation; no postprocessing.
Final asset: outputs/dragonium-academia/assets/house-leaders.png
Purpose: three house leader concept portraits; physical appearances are artistic interpretation, not supplied canon.
Dimensions: 1881 x 836 pixels (generated image, equal thirds of 627 px).
Prompt:
Use case: stylized-concept.
Asset type: a single wide triptych artwork for a Korean fantasy academy website, divisible into three equal vertical portrait cards using CSS.
Primary request: three separate equally sized waist-up portraits of adult female dormitory leaders, seamlessly side by side. All three faces fully within their own third and eyes aligned horizontally. These are artistic concepts, not established physical canon.
Left third: Elioni, age 21, poised and stern, warm dark auburn hair, tailored dark red academy uniform with antique gold details, small flame motes, red-black textured background.
Middle third: Lapinne, age 22, calm and intelligent, long silver-blue hair, dark blue academic cape over uniform, delicate ice particles, dark ink-blue textured background.
Right third: Selbeni, age 21, warm gentle smile, medium brown hair, tailored dark green academy uniform with botanical details, soft leaves, dark forest-green textured background.
Style/medium: exceptional premium Korean fantasy game illustration, anime influenced painterly semi-realistic faces, elegant detailed costume design, mature adult facial proportions, rich brushwork, cinematic lighting. Friendly academy drama, not sexualized.
Composition: wide landscape 2304 by 1024 pixels, three equal-width vertical portraits occupying the whole width, waist-up composition, all eyes same level, ample headroom, no gaps, no frames, no inset panels. Dark edges for website typography overlay, beautiful facial lighting.
Color palette: restrained ink teal and antique gold, with red, icy blue, forest green accents.
Constraints: exactly three adult women, no extra characters, no text, no letters, no logos, no watermark, no border.
```

</details>
