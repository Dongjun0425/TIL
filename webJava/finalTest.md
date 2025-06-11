25문제
객관식 + 주관식

ppt 7 

20 모델 어트리뷰트 자체설명 사용 방법
-  HTTP 요청 파라미터를 자바 객체에 자동으로 바인딩해주고, 동시에 해당 객체를 뷰 모델로 전달하는 Spring MVC의 어노테이션
-  public String submitForm(@ModelAttribute Member member, Model model) { ... } member의 정보가 넘어감
  
24 리다이렉(다른서버)가 뭐고 포워드가 뭔지  제어권 개념
- 리다이렉트느 제어권을 클라이언트에게 넘김. 새 요청 유도, 싱대적으로 느림, 주소창의 URL이 바뀜
- 포워드는 서버 내부에서 동작하므로 제어권이 다음 리소스로 넘어감. 상대적으로 빠름, 주소창의 URL이 유지됨

34 인잇바인더 뭐하는건지 어떻게 구현하는지(웹데이텁바인더)
- 컨트롤러가 실행되기 전에 webDataBinder를 초기화 할때 사용 (ex. 생년월일, 금액 등 포멧시 유용함)
- @InitBinder
 public void 메소드_이름(WebDataBinder binder, ...) {
 ...
 }
35에 있는 메소드
- setAllowFields() vs setDisallowedFields()
- 허용할 필드 목록 지정    차단할 필드 목록 지정
- 특정 필드만 허용해서 보안강화  민감한 데이터 차단
-  public void initBinder(WebDataBinder binder) {
 binder.setAllowedFields("id","passwd","city","sex");
 }

ppt 8
4 스프링 시큐리티가 뭔지랑 특징
-  인증(Authentication)과 권한 부여(Authorization) 기능을 제공하여 보안성을 강화하는 역할
-  사용자인증(authentication)과 권한부여(authorization, 접근제어: Access Control) 등을 효율적으로구현가능
7 각각 태그 파악 뭔지 정확하게
<http> 시큐리티의시작과끝을나타내는데사용
<intercept-url> 시큐리티가감시해야할URL과그URL에접근가능한권한을정의
<form-login> 폼-로그인관련설정
<logout> 로그아웃관련설정
<authentication-manager> 사용자권한서비스의시작과끝을나타내는데사용
<authentication-provider> 사용자정보를인증요청하는데사용
<user-service> 사용자정보를가져오는데사용
<user> 사용자정보를나타내는데사용

10 인터셉트 유알엘 어떤권한 있는 사용자만 parrten이랑 access 보고 어떤 사용자가 접근되고 안되고 유추 가능해야됨
- <intercept-url pattern="/admin/**" access="hasRole('ADMIN')" /> 요기서 ADMIN이라는 사용자만 /admin에 접근 가능

25 폼 로그인 태그에서 ex. 어떤 파라미터가 id pw인지// 유추 가능해야됨
login-page로그인페이지의경로
login-processing-url로그인요청 처리 경로
<form> 태그의action 속성값으로 사용됨
default-target-url로그인에성공하면이동할기본 경로
always-use-default-target로그인성공후이동할경로를항상default-target-url설정경로를 사용할지여부
authentication-failure-url로그인에실패하면이동할경로 기본값은/login?error
 username-parameter로그인하는사용자의ID 파라미터의 이름
password-parameter로그인하는사용자의비밀번호파라미터의 이름
  
26 로그아웃 태그도 각 속성이 어떤 역할하는지 파악
delete-cookies로그아웃에성공할때삭제할쿠키이름을지정 여러개일때콤마로구분
invalidate-session로그아웃시세션을제거할지여부 기본값은true
 logout-success-url로그아웃에성공할때이동할경로를지정 기본값은/login?logout
 logout-url로그아웃요청처리경로를지정 success-handler-ref로그아웃성공후처리를제어하기위해LogoutSuccessHandler를 지정

ppt9
4 파일업로드에서 헤더정보 바운더리*  각각 ---들이 시작, 구분, 종료-- 인거 파악
5 파일업로드에서 버전별로 파악 3.0이상부터는 api지원 서블릿5점대 이하는 기본 파일업로드 기능지원 6점대부터는 지원하지않은 이런 정보들 파악
6 멀티파트 컨피그 설정들이 각각 뭔지 파악
15 파일 업로드 경로******** 정확히 파악!!!!!

ppt10
5 예외처리 종류파악, 각각 어디 지점*에 적용 중첩해서 적용했을때 우선순위파악
12,16,26 등  각각 어노테이션 역할 

ppt11
4 log4j뭔지 특징파악 1버전 보안취약 그래서 2버전사용 
5 각각 요소들 하는 역할 4개
7 설정시 2가 자동활성화 로거의 name은 패키지명 또는 클래스 레벨은 작성한것 이상 예를들어, 이 상태면 기록이 되는지 안되는지
9 레벨파악!
15 인터셉터가 뭔지 사용할때 어떤 구현체, 어떻게 사용하는지 등록방법
18 핸들러 인터셉터 3개 각각 어떤 단계, 어떤 동작 //프리핸들은 시작시 등
20 어소시어시 프로세싱 동기화 vs 비동기적* 어떤 차이점 각각 동작방식 파악 
23 쓰레드로컬 이 변수는 스레드됨. 특징들 파악

ppt12
8 메시지 리소스 리소스번들 파악 + 파일이름 어떻게 저장 //파일이름_ko.properties등
9 기본은 iso-8859-1인데 옵션변경해서 utf-8로 변경, 파일위치
12 뷰 페이지 메시지출력 속성들 각각 어떤 역할인지 파악
13 인자 사용방법 파악
24 로케일리졸버+로케일체인지가 뭐하는건지파악 구현체 4개 각각 어떤 방식으로 동작하는지 파악



+실습한 예제 소스로 출제
