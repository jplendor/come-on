
# Come-on 캘린더 (부제:모두의 캘린더)

기획의도
------
<center><img src="https://user-images.githubusercontent.com/28006318/199532470-fe946ae9-df61-48ef-a8c4-978f7da93488.png" width="400" height="500"></center>

<br>
<br>


배포사이트
<현재 시범중이라 더미데이터가 있습니다.>

~~https://comeoncalender.netlify.app/~~


~~~
😎 조금 더 쉽게 일정을 짤 수는 없을까???
~~~
- 현재 우리는 일정을 짤 때, 주로 메신저를 이용합니다. 메신저 단톡방에서 언제 시간이 되는지 한명 한명 물어봐야 하고, <br>
어디서 만나는지 알려면 대화창을 위로 올려서 확인해야 합니다. 저희는 이런 불편함을 해소하기 위해 한눈에 일정을 정할 수 있고, <br>
만남 장소를 확인할 수 있는 Come-on 캘린더를 기획했습니다.<br>
<br>

~~~
😊 코스 공유하기 기능을 통해 다른사람이 짠 코스를 볼 수 있습니다.
~~~

- 연인과 데이트 할 때, 친구들이랑 놀 때, 아 이번엔 어디서 놀지? 데이트 코스는 어떻게 짜야하지? 고민할 필요 없습니다.<br>
이런 코스를 짤 때의 머리아픔을 줄이기 위해 다른사람이 공유한 코스를 볼 수 있습니다.<br>
<br>

~~~
📱 아이템 특성에 맞게 모바일에 최적화된 View
~~~

- 아이템 특성 상 모바일 고객이 많을 거라고 생각합니다. 아이템에 맞게 모바일 친화적인 View를 선택했고<br>
geolocation으로 사용자의 위치를 기반해서 모임 장소를 검색할 수 있게 설정했습니다.<br>
<br>

~~~
🙆‍♀️ 카카오 소셜로그인과 카카오로 공유하기 기능을 통해 웹페이지에 대한 접근성 강화
~~~

- 저희가 앱이아닌 웹 프로젝트를 기획하면서 가장 고민했던 부분은 사용자들이 어떻게 접근하게 만들것인가 였습니다.<br>
카카오톡 공유하기 기능을 통해 만들어진 일정을 간단하게 Feed형식으로 공유할 수 있게 만들었습니다.<br>


프론트 팀의 공통 목표
----
- TypeScript와 Eslint-airbnb 를 적용하여 협업에 대한 기본기 다지기<br>
- 평일 오전 10시 스크럼 및 Jira를 위한 1주 단위의 스프린트를 통해 일정 관리, 백엔드, 프론트 구분없이 모든 이슈 함께 논의하기<br>
<br>

라이브러리 및 기술 스택
---------
![image](https://user-images.githubusercontent.com/28006318/199502838-889005a8-c56a-4347-b79b-33aa6e5a2055.png)

- React.js (TypeScript)
- React-Router-Dom
- Redux Toolkit
- Redux Toolkit Query
- Figma
- MUI
- FxTS
- Rooks
- uuid
- crypto-js
- react-cookie
- React-Beautiful-DnD
- 카카오 지도API
- 카카오 공유하기 API
- 카카오 소셜로그인 API

주요 기능
-------------------
- 코스 등록하기
- 코스 수정하기
- 로그인 / 로그아웃
- 카카오톡으로 공유하기
- 모임 등록하기
- 모임 수정하기
<br>

![comeon_1](https://user-images.githubusercontent.com/28006318/219537682-536ae7bb-2297-4ab7-bb81-3b465fbcec2e.png)
![comeon_2](https://user-images.githubusercontent.com/28006318/219540004-a030299f-e077-4d41-aab4-a41b42bae701.png)
![comeon_3](https://user-images.githubusercontent.com/28006318/219542405-925bc291-17f8-4b3a-b407-4d53b3889b45.png)
![comeon_4](https://user-images.githubusercontent.com/28006318/219555155-cbe5e6ed-1a34-4048-8c15-e32612ff056f.png)


각 팀원의 역할과 기여한 부분
------------

이름 | 역할
-----|---------------------------
강예정 | 코스 등록하기, 코스 수정하기, 지도 API를 이용한 장소찾기, 카카오톡 공유하기, Beautiful-DnD를 이용한 드래그앤 드롭
방정배 | 메인 Home, 좋아요한 코스, 작성중인 코스 보기 , 마이페이지, 로그인/로그아웃 시 토큰 인증 암호화
이정민 | 모임 등록하기, 실시간으로 모임 날짜를 정할 수 있는 캘린더 구현 , 모임 코드를 통한 모임 초대 
