# SCATTER! Design System

Figma MCP `get_design_context`에서 2026-10-19 추출.

- 파일: https://www.figma.com/design/8KrZvOhtdX0gRzu4GUutcj/
- COLLECT: `187:187`, SCATTER: `187:195`, ARCHIVE: `187:203`
- 기준 프레임: 1920 × 1080. 세 프레임의 실제 코드와 렌더 이미지를 확인했다.
- 스크린샷을 배경으로 사용하지 않는다. 레이아웃은 HTML, Grid, Flex로 구성한다.

## Typography

| 용도 | 폰트 | 굵기 | 크기 | 행간 |
| --- | --- | --- | --- | --- |
| 로고 | Alien Encounters Regular | 400 | 60px | 1.7 |
| COLLECT 제목 | Pretendard | 600 | 40px | 1.7 |
| 화면 제목 | Pretendard | 600 | 32px | 1.7 |
| 입력창 | Pretendard | 400 | 24px | 1.7 |
| 내비게이션·단어·설명 | Pretendard | 400 | 20px | 1.7 |
| 버튼 | Pretendard | 500/600 | 20px | 1.7 |
| 메모 제목 / 본문 | Pretendard | 600 / 400 | 16px / 12px | 1.7 |
| 아카이브 제목 / 날짜 | Pretendard | 600 / 400 | 15.772px / 11.041px | 1.7 |

자간은 추가값 없이 normal. 한국어와 영어 모두 Pretendard, 로고만 Alien Encounters의 실제 스트라이프 글리프 사용. 폰트 파일은 `assets/fonts/`에 포함한다.

## Color

| 토큰 | Figma 값 | 용도 |
| --- | --- | --- |
| white | #FFFFFF | 입력, 캔버스, 패널, 카드 |
| pink | #FF3FB5 | 테두리, 활성 탭, DROP HERE |
| primary | #FF1FA9 | COLLECT 버튼 |
| lime | #D9FF5C | 선택 단어, 활성 메모, 저장 버튼 |
| black | #000000 | 본문, 단어 테두리 |
| gray | #666666 | 메모 카드 테두리 |
| muted | #505050 | 메모 미리보기 |

배경: 수직 linear-gradient, 위 white 0% → 아래 lime 100%. NEW SCATTER 배경 white 62% alpha.

## Layout

Figma는 12열 그리드를 명시하지 않고 실제 좌표로 배치되어 있다. 웹에서는 비율을 유지하는 2열 Grid 및 4열 Grid로 변환한다. 기본 단위 `--unit: 100vw / 1920`, 1920px 이후는 1px로 제한한다.

| 요소 | 위치 (x,y) | 크기 (w,h) |
| --- | --- | --- |
| 로고 | 59,48 | 280,102 |
| 내비게이션 | 981,75 | 851,38 |
| COLLECT 제목 | 629,284 | 622,68 |
| 입력창 | 198,417 | 1524,471 |
| COLLECT 버튼 | 1407,920 | 315,63 |
| SCATTER 제목 | 59,178 | 본문 흐름 |
| 캔버스 | 58,304 | 1292,471 |
| 메모 패널 | 1368,227 | 458,548 |
| DROP HERE | 58,805 | 1768,204 |
| 아카이브 첫 카드 | 59,433 | 417.97,359.612 |

내비게이션 시작 간격 약 369px, 밑줄 113×4px. SCATTER 컬럼 간격 18px. 아카이브 카드 간격 약 36px (실제 세 번째 카드 간격에는 작은 차이가 있어 일정한 Grid 간격으로 정리).

## Components and states

- 입력창/캔버스: white, 2px pink, radius 30px.
- 기본 버튼: 높이 63px, radius 20px. outline은 white와 2px pink.
- 단어: 최소 138×56px, 1px black, radius 0, white. 선택하면 lime.
- 메모: 폭 384px, radius 14px, 약 0.684px gray 테두리. 활성 출처 카드 lime, 단어 선택과 별도 상태.
- 아카이브: 약 418×360px, 1.577px pink, radius 15.772px.
- NEW SCATTER: 2px dashed pink. 아이콘 40×40px.
- hover: 180ms 미세한 상향 이동, active: 아래 1px. 키보드 포커스는 black 3px.
- 드래그: viewport 좌표의 별도 ghost, 약한 확대와 그림자. DROP HERE 진입 시 lime 외곽 강조.
- 관성 감쇠 .88, 좌표 ease-out .15, 약한 충돌 분리. 연결은 사용자가 G, Shift+드롭, 원문 모달 버튼으로 선택.
- 원문 모달/선택 모달/빈 상태/줄별 분리 체크박스/키보드 도움말은 기능 요구에 따른 확장. Figma에 별도 상태 디자인이 없어 기존 토큰을 적용한다.

## Responsive and accessibility

700px 이하: 읽기 가능한 고정 글자 크기, 세로 레이아웃, 접이식 메모 패널, 2열 아카이브(400px 미만 1열). 390px에서 레이아웃과 드래그를 Safari 응답형 모드로 확인했다. 실제 휴대폰 터치는 별도 검증이 필요하다.

Pointer Events와 pointer capture, `touch-action:none`, 다중 포인터 중복 억제. 드래그 시 화면 가장자리 자동 스크롤. 키보드 Enter/Space로 선택, 방향키 이동/재정렬, Delete로 조합 단어 제거. `prefers-reduced-motion`에서 관성 및 transition 최소화.

## Assets

모든 Figma SVG 아이콘은 `assets/icons/`로 다운로드하여 사용한다. 원본 SVG width/height를 변경하지 않고 외부 wrapper에 비례 배율을 적용한다. 임시 Figma URL을 런타임에 참조하지 않는다. 글꼴 출처와 이용 범위는 `assets/fonts/NOTICE.md` 참고.

## 축적 기록 모드 확장 (2026-10-23)

01 COLLECT를 01 HOME으로 표시하며 기존 `#collect` 주소도 HOME으로 연결한다. 원래 제목·컬러·폰트·최대 콘텐츠 폭을 유지하고, 메모 입력 영역은 NEW MEMO로 펼치도록 하여 축적된 기록을 우선 노출한다. HOME 기록은 3열(모바일 1열) white/pink 카드다.

SCATTER는 기존 캔버스·SELECTED MEMOS·DROP HERE 배치를 유지하고 상단 FIND A CONNECTION으로 의미 조합을 만든다. 별도 아이디어 패널은 두지 않으며 생성 결과는 기존 DROP HERE와 ARCHIVE 흐름에 연결한다. 캔버스에는 선택한 메모 4개의 연결 가능한 핵심 토큰만 표시한다. ARCHIVE에는 기존 카드 형태를 유지하며 ALL/IDEAS/MEMOS 필터만 추가한다.
