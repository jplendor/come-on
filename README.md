# Come-on 캘린더 (부제:모두의 캘린더)

기획의도
------
![image](https://user-images.githubusercontent.com/28006318/199532470-fe946ae9-df61-48ef-a8c4-978f7da93488.png)
![image](https://user-images.githubusercontent.com/28006318/199532643-27f4bbf7-a8fc-4f97-83f9-c0e5381c54df.png)
![image](https://user-images.githubusercontent.com/28006318/199532770-8b1ca7b6-7f96-4400-9fe3-baf378c3c6fa.png)
![image](https://user-images.githubusercontent.com/28006318/199532816-fc77f124-ba73-4c02-a2b6-88418e297b4d.png)
![image](https://user-images.githubusercontent.com/28006318/199532900-164de4be-fc03-4416-8c0c-9c13838c44b4.png)
![image](https://user-images.githubusercontent.com/28006318/199533125-05510604-a184-4616-8363-6e1cb9df1d73.png)
![image](https://user-images.githubusercontent.com/28006318/199533219-b1b10adb-9901-44b3-80a1-754233cace77.png)
![image](https://user-images.githubusercontent.com/28006318/199533314-08c12140-fc1a-4380-9a92-fafff76af3e1.png)
![image](https://user-images.githubusercontent.com/28006318/199533364-27a3e3f2-158b-4198-a27b-2b4a92ce74e7.png)
![image](https://user-images.githubusercontent.com/28006318/199533480-2413dffc-6e66-4865-b850-6d14cce8bbb1.png)
![image](https://user-images.githubusercontent.com/28006318/199533583-d1023c73-37a2-4f2b-b3c2-4de3fb95428e.png)
자세히 보기 클릭시 해당 코스로 이동함

![image](https://user-images.githubusercontent.com/28006318/199533720-1476f847-d3d2-428b-8700-a13d15dfc9df.png)
![image](https://user-images.githubusercontent.com/28006318/199533857-e09e30e0-ccf3-43c7-b2d6-30efb58f5197.png)
모임 선택 기간 설정 및 사진 등록
![image](https://user-images.githubusercontent.com/28006318/199534176-30029bc7-f62b-444e-a178-3c86bee5704b.png)
모임 날짜 선택 및 약속 장소 등록









~~~
😎 조금 더 쉽게 일정을 짤 수는 없을까?
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

각 팀원의 역할과 기여한 부분
------------

이름 | 역할
-----|---------------------------
강예정 | 코스 등록하기, 코스 수정하기, 지도 API를 이용한 장소찾기, 카카오톡 공유하기, Beautiful-DnD를 이용한 드래그앤 드롭
방정배 | 메인 Home, 좋아요한 코스, 작성중인 코스 보기 , 마이페이지, 로그인/로그아웃 시 토큰 인증 암호화
이정민 | 모임 등록하기, 실시간으로 모임 날짜를 정할 수 있는 캘린더 구현 , 모임 코드를 통한 모임 초대 
