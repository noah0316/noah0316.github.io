---
title: 'about'
date: 2019-1-27 16:21:13
lang: 'en'
---

# 홍승현(Noah)

<div align="right"><sub><i>Last updated: 2023.07.10</i></sub></div>


**저는 `______` 하는 엔지니어입니다.**

1. 끊임없이 학습하고 개선하는
2. 사용자 경험을 고민하는
3. 지식의 선순환과 경험공유를 좋아하는

|             |                                                       |
|:-----------:|-------------------------------------------------------|
| **GitHub**  | <https://github.com/noah0316>                         |
|  **Blog**   | <https://noah-ios.dev>, <https://noah0316.github.io/> |
| **Contact** | <dev.noah0316@gmail.com>                              |

# Expereiences
## URL 아카이빙 서비스 Havit
<br/>

[서비스 소개](https://www.havit.app/)

<a href="https://apps.apple.com/kr/app/havit-%EC%BD%98%ED%85%90%EC%B8%A0-%EC%95%84%EC%B9%B4%EC%9D%B4%EB%B9%99-%EC%95%B1-%ED%95%B4%EB%B9%97/id1607518014" target="_blank">
<img src="https://user-images.githubusercontent.com/69136340/165884844-de14d6f9-5e3a-4796-b880-f79d88186b27.png" width="100px"  alt="download link"/>
</a>

|              |                                                                      |
|-------------:|----------------------------------------------------------------------|
|   **period** | 22.01 ~ current                                                      |
| **position** | 네트워크 중복 요청 문제 해결 / 컨텐츠 미리보기 기능 개발 / 협업을 위한 자동화 시스템 구축                |
|     **tech** | Swift Concurrency, Link Presentation, Git Hooks, Shell script        |

#### 네트워크 중복 요청 문제 해결
- **문제**: 사용자가 컨텐츠 저장 시 불특정 컨텐츠가 중복으로 저장되는 문제 발생
- **원인**: 콘텐츠 저장 네트워크 요청시 중복 터치 요청에 대해 [throttle operator](https://developer.apple.com/documentation/combine/fail/throttle(for:scheduler:latest:))를 이용해 작성된 로직
- **측정**: XCTest Framework를 이용하여 네트워크 작업 동시 요청에 대한 테스트 코드 작성 후 테스트 케이스 실패 확인 
- **해결**:
  1) Swift Concurrency의 비동기 작업의 단위인 Task를 감싸고 있는 객체에 열거형을 이용해 loading, done 상태 부여
  2) Task를 감싸고 있는 객체를 인 메모리 캐시에 저장하고, 캐시에 객체가 있다면 중복된 네트워크 요청을 방지하고, 작업이 끝나면 캐시를 비우도록 구현
  3) actor type을 이용해 여러 스레드에서 동시에 접근하지 못하도록 구현
- **평가**: 네트워크 작업 동시 요청에 대한 테스트 통과 및 서버 모니터링 결과 컨텐츠 중복 저장 현상 해결  
 

#### 저장할 컨텐츠 미리보기 지연 현상 개선
- **문제**: Web의 metadata를 가져오기 위해 서버에 크롤링을 요청한 정보에 대해 응답시간 지연 문제 발생
- **원인**: 서버 부하 시 서버의 크롤링 라이브러리 성능 문제
- **해결**:
  1) Apple에서 제공하는 LinkPresentation 프레임워크를 WWDC 발표를 먼저 학습한 후에 적용해 Web의 metadata 접근하여 기능구현
  2) 서버 상태에 의존하지 않고, 컨텐츠 미리보기에 들어가는 미디어를 기기 자체에서 로드하도록 구현
  3) 동일한 URL에 대해 이전에 캐시한 데이터를 활용하면 효율적으로 사용할 수 있을 것이라 판단하여 캐싱 메커니즘 구현하여 사용성 향상
- **평가**: 컨텐츠 미리보기에 들어가는 미디어를 기기 자체에서 로드하여 매 실행 시 평균 0.8초 절약  
(50회 테스트 평균, 캐싱 되지 않은 컨텐츠 기준)

#### 협업을 위한 자동화 시스템 구축
**[GitHooks 적용]**
- **문제**: SwiftLint BuildPhase에 적용 후 실수로 Build를 돌리지 않고, commit을 하는 경우 컨벤션이 검증되지 않은 코드가 merge 될 수 있는 위험 발생
- **원인**: commit 직전에 SwiftLint 검사를 실행하지 않는 환경
- **연구**: [우아한 형제들 기술 블로그](https://techblog.woowahan.com/2641/)에 소개된 GitHooks 적용 후기 글을 보게되어 프로젝트에 도입 시도
  - 아티클에 소개된 파일 내부경로 설정과 환경문제로 실행이 안되는 문제 발생 
  - 쉘 스크립트를 사용해 본 경험이 없어 코드 분석과 작성에 어려움 존재
- **해결**: 쉘 스크립트를 빠르게 처음부터 학습하여 GitHooks 코드 새로 작성
- 개인 기술 블로그 정리 [링크](https://noah0316.github.io/Tools/2021-10-15-swiftlint-%ED%9E%99%ED%95%98%EA%B2%8C-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0(with-git-hook)/)

**[Notion GitHub Issue 동기화]**
- **문제**: GitHub에 익숙하지 않은 팀원들(디자인, 기획)이 개발 진행상황을 확인하기 어려운 문제 발생
- **원인**: 자주 사용하지 않는 도구, 사이트를 확인해야 하는 환경
- **해결**: 
  1) 개발 작업을 GitHub에 Issue로 등록하면 협업 시 자주사용하는 도구인 Notion에 동기화 되도록 구현
  2) Node-JS application을 도커라이징하여 Notion 데이터베이스와 GitHub Issue 연동을 Github Actions에서 개발자가 쉽게 구성할 수 있도록 구현

## Issue Tracker W/ CodeSquad 
- 작성중

# Communities
#### Swift Community
- [Let'Swift 2022](https://letswift.kr/2022/) 공식 앱 개발
- [KWDC](https://kwdc.dev/) 행사 기획
- Let'Swift 2023 행사 기획

#### Society
- (21.09 ~ 22.01) IT 창업 동아리 SOPT iOS(Swift) 파트 수료
- (22.03 ~ 22.06) IT 창업 동아리 SOPT iOS(Swift) 파트 수료
- (21.01 ~ 21.09) 대학생 프로그래밍 교육 동아리 멋쟁이사자처럼 명지대 대표

#### Open Source
- [Notion GitHub Issue Sync](https://github.com/noah0316/notion-github-issue-sync): GitHub Actions를 사용해 GitHub issue와 Notion 데이터베이스를 동기화하는 Docker Application

# Education

### 명지대학교 컴퓨터공학과 졸업예정

### [CodeSquad](https://www.codesquad.kr/)
**(23.01 ~ 23.06) 코드스쿼드 마스터즈 모바일 iOS 코스 수료**

<div align="center">
  귀한 시간 내주셔서 감사합니다.
</div>
