# 🌱  노약자 및 환자를 위한 식단추천 앱 서비스 NEWRI
## ▶︎ 시연 영상

[![Watch the video](https://drive.google.com/thumbnail?sz=600&id=1-OTeRPviP8sVvnye_Ddc2ldDzykzEyGp)](https://drive.google.com/file/d/1-OTeRPviP8sVvnye_Ddc2ldDzykzEyGp/view?usp=sharing)

## ⭐️  프로젝트 소개

- NewRi는 노약자및 환자를 위한 식단추천 앱 서비스입니다.
- 회원가입 시 입력한 신체 정보를 서버에 안전하게 저장하여, 개인화된 피드백과 식단 추천 로직에 활용합니다.
- 사용자는 매일 식단 사진을 촬영해 기록할 수 있으며, 기록된 데이터를 바탕으로 AI 피드백을 제공합니다.
- AI 추천 기능을 통해 사용자의 신체 상태에 최적화된 레시피를 제안받을 수 있습니다.
- 2024년 1학기에 진행한 세종대학교 지능기전학부 Capstone Design 프로젝트입니다.

## 👦  팀원 구성

| **Front** | **Back** | **BACK & AI** | **AI** |
| :------: |  :------: | :------: | :------: |
| [<img src="https://avatars.githubusercontent.com/u/65596779?v=4" height=150 width=150> <br/> @heewon1104](https://github.com/heewon1104) | [<img src="https://avatars.githubusercontent.com/u/125195487?v=4" height=150 width=150> <br/> @Sumi Jeong](https://github.com/sigmaith) | [<img src="https://avatars.githubusercontent.com/u/40567406?v=4" height=150 width=150> <br/> @WoongTaek Shin](https://github.com/WoongTech) | [<img src="https://avatars.githubusercontent.com/u/83905938?v=4" height=150 width=150> <br/> @yina427](https://github.com/yina427) |

## 역할

### 김희원

- 기획에 맞춰 Figma로 앱 UI 초기 디자인을 설계
- React Native를 활용하여 식단 추천 챕 서비스 구현
- Andriod, IOS 애뮬러이터를 이용한 디버깅 및 테스트
- Readme 작성

### 정수미

- Backend 구현
- JWT 구현

### 신웅택

- Backend, AI 설계

### 김이나

- AI 설계

## 개발 환경

- Frontend: React Native Expo, Styled Component, Context API
- Backend : Spring Boot, Spring Data JPA
- AI : pandas, PyTorch Model, Google Cloud Storage
- DB: Postgre SQL
- 버전관리: Notion, Github
- 디자인: Figma

## 채택한 개발 기술과 브랜치 전략

### 기술 스택

- React Native Expo
  - 공식 문서와 강의를 통해 프레임워크를 익히고 Android와 IOS 기기의 해상도를 고려하여 앱 서비스를 설계 및 구현 하였습니다.
- Styled Component
  - 컴포넌트마다 하나의 스타일을 선언하고 1:1로 매핑하여 유지보수를 용이하게 했습니다
- Context API
  - JWT 토큰 및 음식 정보처럼 Component depth 2이상인 데이터는 별도 파일로 분리하여 사용했습니다.   
- Spring Boot
  - RESTful API 서버 및 데이터베이스 연동을 구현했습니다.
- pandas, PyTorch Model
  - AI 모델 학습 및 추론 파이프라인을 구축했습니다.
- Google Cloud Storage
  - AI 학습용 데이터 저장 및 배포 용도로 활용했습니다.
- Figma
  - 기획 단계에서 나온 의견을 바탕으로 Figma를 활용해 앱 페이지들의 초기 디자인을 구성했습니다.
  
### 브랜치 전략

- Jira 이슈를 기반으로 Notion 템플릿을 구성하고, 3개월간의 Sprint 일정을 계획했습니다.
- 각 Sprint를 세부 티켓으로 나누고, 커밋과 PR 제목 앞에 티켓 번호를 붙여 작업 단위를 명확히 했습니다.
- 기능 구현 완료 후 팀원 코드 리뷰를 거친 뒤 메인 브랜치에 병합했습니다.

## 주요 로직 - AI 분석을 위한 음식 사진 제출   

<img width="967" alt="스크린샷 2025-06-18 오후 6 45 45" src="https://github.com/user-attachments/assets/5404e61c-cf29-40fc-bf1b-262e00d3a23a" />

1. 한식/양식을 선택하고 사진을 촐영 혹은 선택하여 백엔드 서버에 전달 
2. Frontend에서 받은 정보를 AI 서버에 전달
3. AI 서버에서는 양식일 경우 양식에 관한 AI 모델을, 한식일 경우 한식에 관한 AI 모델을 사용하여 음식 사진 분석
4. AI 서버에서 분석한 사진 정보를 Backend 서버에 전달
5. Backend에서는 분석한 사진 정보를 Frontend에 전달
6. Frontend에서 음식 분석 결과를 사용자에게 보여줌

## 주요 로직 - 분석한 결과 검토 및 저장 과정

<img width="993" alt="스크린샷 2025-06-18 오후 6 45 52" src="https://github.com/user-attachments/assets/488d3bed-8ff3-441a-834c-e22bbb0625ca" />

1. Frontend에서 음식 분석 결과과 맞는지 확인/수정 후 최종 저장시 Backend에 해당 정보를 전달함
2. Backend에서는 AI 서버에 비동기로 입력받은 음식 정보와 사용자의 신체 정보를 전달
3. Backend에서는 받은 데이터를 바탕으로 피드백 생성, 완료시 Backend에 피드백 결과 전달
4. Backend에서 Github에 client_id, client_secret, code를 body에 담아 전달
5. Backend에서는 전달받은 정보를 DB에 저장, Frontend에 전달
6. Frontend에서 받은 정보를 띄워줌

## 주요 로직 - 레시피 추천 로직

<img width="585" alt="스크린샷 2025-06-18 오후 6 45 30" src="https://github.com/user-attachments/assets/d32d9fe7-3aa8-4c13-b098-480c3f044e90" />

1. Backend에서 평소 식사 습관에 대한 피드백을 받기 위해 AI 서버에 요청
2. AI 서버에서 개인 식사 지침 및 피드백을 전달함
3. Backend에서 레시피를 추천받기 위해 받은 피드백과 개인 건강 지침을 다시 AI 서버에 보냄
4. AI 서버에서는 RAG 기술을 아용하여 DB에 있는 레시피중 맞는 조건의 레시피를 추천, Backend에 전달
5. Backend에서는 추천 레시피 데이터를 저장
6. Frontend에서 Backend에 레시피 추천 요청시 엎선 과정을 통해 나온 결과를 보여줌

## 프로젝트 기능

### 1-1. 로그인

- JWT를 이용하여 자체 로그인을 구현하였습니다.
<img width="526" alt="스크린샷 2025-06-22 오전 11 53 53" src="https://github.com/user-attachments/assets/9645ea51-cc45-4ea3-ad54-95269d84e9e3" />
  
### 1-2. 회원가입

- 신체 정보와 개인정보를 입력하여 회원가입을 할 수 있습니다.
<img width="636" alt="스크린샷 2025-06-22 오전 11 48 39" src="https://github.com/user-attachments/assets/f833e768-f882-4c46-89c8-74c2674e4657" />

### 2. 메인페이지

- 메인페이지에서 각 날짜별로 피드백 및 영양 섭취 정보를 확인 가능합니다
<img width="480" alt="스크린샷 2025-06-22 오전 11 39 06" src="https://github.com/user-attachments/assets/32076631-87dd-4417-8f56-923b9c99de64" />


### 3. 캘린더 

- 각 날짜별로 어떤 음식을 먹었었는지 확인 가능합니다
<img width="382" alt="스크린샷 2025-06-22 오전 11 39 45" src="https://github.com/user-attachments/assets/d84ab6b7-3e14-4049-b70c-e21ad299d28b" />

### 4-1. 음식 기록 - 항목 선택 및 촬영

- 식사 정보를 선택하고 촬영하거나 사진을 선택 가능합니다. 
<img width="562" alt="스크린샷 2025-06-22 오전 11 39 56" src="https://github.com/user-attachments/assets/713d0c55-225a-494f-a9fb-621238176234" />

### 4-2. 음식 기록 - 기록 수정 및 저장

- 사진을 분석하여 어떤 음식을 먹었는지 확인하고 수정 및 추가가 가능합니다.
<img width="393" alt="스크린샷 2025-06-22 오전 11 40 19" src="https://github.com/user-attachments/assets/48cab947-c970-49fe-8e19-bb46a4ebfcd6" />

### 5. 레시피 추천

- 내 신체 특성 및 식사 정보를 바탕으로 식사 레시피를 추천 받습니다.
<img width="714" alt="스크린샷 2025-06-22 오전 11 53 27" src="https://github.com/user-attachments/assets/185efe09-68bc-495c-8be0-810a6aafc82c" />

### 6. 내 정보

- 일주일 영양 점수와 피드백을 확인 가능합니다.
<img width="521" alt="스크린샷 2025-06-22 오전 11 53 42" src="https://github.com/user-attachments/assets/d44e1e9f-25a4-4998-857b-ba1b51dc68d1" />


## 프로젝트를 진행하며 배운점, 느낀점

### 김희원

- Git 브랜치 관리 전략을 도입하여 충돌을 최소화하고 코드 가독성을 높이는 방법을 익혔습니다.
- React Native라는 새로운 기술 스택을 학습하고 직접 구현하면서, 도전 정신과 열정만 있으면 어떤 기술도 습득할 수 있다는 자신감을 얻었습니다.
- iOS와 Android 기기의 다양한 해상도를 반영해 기능을 구현하고 UI/UX를 최적화함으로써 사용자 중심 설계 경험을 쌓았습니다.
- 팀 프로젝트에 몰입하며 참여하면서 협업의 중요성을 실감했습니다.

### 정수미

### 신웅택

### 김이나

## 🏆  성과
- 세종대학교 주관 <2024 제1회 연합 학술제> 장려상 수상 (2024.06.24)
- 세종대학교 주관 <2024 제17회 창의설계 경진대회> 우수상 수상 (2024.06.21)
