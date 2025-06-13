25문제
객관식 + 주관식

# ppt 7 

## 20 모델 어트리뷰트 자체설명 사용 방법
-  HTTP 요청 파라미터를 자바 객체에 자동으로 바인딩해주고, 동시에 해당 객체를 뷰 모델로 전달하는 Spring MVC의 어노테이션
-  public String submitForm(@ModelAttribute Member member, Model model) { ... } member의 정보가 넘어감
  
## 24 리다이렉(다른서버)가 뭐고 포워드가 뭔지  제어권 개념
- 리다이렉트느 제어권을 클라이언트에게 넘김. 새 요청 유도, 싱대적으로 느림, 주소창의 URL이 바뀜
- 포워드는 서버 내부에서 동작하므로 제어권이 다음 리소스로 넘어감. 상대적으로 빠름, 주소창의 URL이 유지됨

## 34 인잇바인더 뭐하는건지 어떻게 구현하는지(웹데이텁바인더)
- 컨트롤러가 실행되기 전에 webDataBinder를 초기화 할때 사용 (ex. 생년월일, 금액 등 포멧시 유용함)
- @InitBinder
 public void 메소드_이름(WebDataBinder binder, ...) {
 ...

 }
## 35에 있는 메소드
- setAllowFields() vs setDisallowedFields()
- 허용할 필드 목록 지정    차단할 필드 목록 지정
- 특정 필드만 허용해서 보안강화  민감한 데이터 차단
-  public void initBinder(WebDataBinder binder) {
 binder.setAllowedFields("id","passwd","city","sex");
 }

# ppt 8
## 4 스프링 시큐리티가 뭔지랑 특징
-  인증(Authentication)과 권한 부여(Authorization) 기능을 제공하여 보안성을 강화하는 역할
-  사용자인증(authentication)과 권한부여(authorization, 접근제어: Access Control) 등을 효율적으로구현가능
  
## 7 각각 태그 파악 뭔지 정확하게
```xml
<http> 시큐리티의시작과끝을나타내는데사용
<intercept-url> 시큐리티가감시해야할URL과그URL에접근가능한권한을정의
<form-login> 폼-로그인관련설정
<logout> 로그아웃관련설정
<authentication-manager> 사용자권한서비스의시작과끝을나타내는데사용
<authentication-provider> 사용자정보를인증요청하는데사용
<user-service> 사용자정보를가져오는데사용
<user> 사용자정보를나타내는데사용
```

## 10 인터셉트 유알엘 어떤권한 있는 사용자만 parrten이랑 access 보고 어떤 사용자가 접근되고 안되고 유추 가능해야됨
- <intercept-url pattern="/admin/**" access="hasRole('ADMIN')" /> 요기서 ADMIN이라는 사용자만 /admin에 접근 가능

## 25 폼 로그인 태그에서 ex. 어떤 파라미터가 id pw인지// 유추 가능해야됨
login-page로그인페이지의경로
login-processing-url로그인요청 처리 경로
<form> 태그의action 속성값으로 사용됨
default-target-url로그인에성공하면이동할기본 경로
always-use-default-target로그인성공후이동할경로를항상default-target-url설정경로를 사용할지여부
authentication-failure-url로그인에실패하면이동할경로 기본값은/login?error
 username-parameter로그인하는사용자의ID 파라미터의 이름
password-parameter로그인하는사용자의비밀번호파라미터의 이름
  
## 26 로그아웃 태그도 각 속성이 어떤 역할하는지 파악
delete-cookies로그아웃에성공할때삭제할쿠키이름을지정 여러개일때콤마로구분
invalidate-session로그아웃시세션을제거할지여부 기본값은true
 logout-success-url로그아웃에성공할때이동할경로를지정 기본값은/login?logout
 logout-url로그아웃요청처리경로를지정 success-handler-ref로그아웃성공후처리를제어하기위해LogoutSuccessHandler를 지정

# ppt9
## 4 파일업로드에서 헤더정보 바운더리*  각각 ---들이 시작, 구분, 종료-- 인거 파악
-  '-----뭐시기' 로 시작, 각 블록 구분 으로 사용 끝 표시는 '-----뭐시기--'처럼 --를 붙여줌
  
## 5 파일업로드에서 버전별로 파악 3.0이상부터는 api지원 서블릿5점대 이하는 기본 파일업로드 기능지원 6점대부터는 지원하지않은 이런 정보들 파악
-  서블릿 3.0 이전에는 서블릿 api에서 파일업로드 지원 x 그래서 외부 라이브러리 이용
-  서블릿 3.0 이상부터는 서블릿 api에서 파일업로드를 지원 그래서 Servlet API 에서 지원하는 Fileupliad를 이용해서 기능구현 가능
-  Springframework 6.0은 더이상 서드파티 Fileupload기능을 지원 x 그래서 Servlet API에서 지원하는 Fileupload를 사용
  
## 6 멀티파트 컨피그 설정들이 각각 뭔지 파악
```xml
<multipart-config>
 <location>C:\\webjavaapp\\{학번}\\upload</location> <!-- 업로드 된 파일을 저장할 경로-->
 <max-file-size>20971520</max-file-size> <!-- 업로드 되는 파일들의 최대 크기 20MB -->
 <max-request-size>41943040</max-request-size> <!-- multipart/form-data 요청의 최대 크기 40M -->
 <file-size-threshold>20971520</file-size-threshold> <!-- 업로드된 파일이 디스크에 기록되는 크기 임계
값 20MB -->
 </multipart-config>
```
 
## 15 파일 업로드 경로******** 정확히 파악!!!!!
- 업로드파일은웹애플리케이션의경로와무관한경로에저장한다 //예를들어 book-store 안에 image라는 폴더 만들지 말라는 소리
1) 파일업로드가웹애플리케이션서비스에영향을주지않도록함 // 파일이 많아지면 리소스가 많아지고 배포시 기존 파일 삭제위험 
2) 업로드파일에대한접근을제어함//내부에 만들면 url로 누구든 접근이 가능하기 때문에 외부에 만들고 인증된 사용자만 접근가능하게 하면 굿
3) 서버가분산되었을때업로드를처리하지않은다른서버에서도파일을접근할 수있도록지원 //서버가 여러대 생겨도 언제든 접근가능하게 생성가능

# ppt10
## 8 HTTP 상태코드
1xx > 임시 응답을 나타냄
2xx > 요청 성공
3xx > 다른 URL로 이동하거나 브라우저 캐시를 보여줌
4XX > 오류가 범했다고 판단할때 발생 (프로토콜 오류 또는 요청한 자원이 없을 때)
5xx > 서버에서 오류가 발생하여 요청을 처리할 수 없을때

## 5 예외처리 종류파악, 각각 어디 지점*에 적용 중첩해서 적용했을때 우선순위파악
## 12,16,26 등  각각 어노테이션 역할 
- 어노테이션 종류는 @ResponseStatus, @ExceptionHandler, @ControllerAdvice
- @ResponseStatus는 예외 클래스에 붙여서 해당 예외 발생시 HTTP 응답 코드 지정 // 우선순위 가장 낮음, 단순 예외 응답 시 유용, 적용 위치는 예외 클래스 // "예외를 던졌는데 아무도 안 받아주면 이거라도 던져줄게!"
- @ExceptionHandler는 특정 예외에 대한 처리 로직을 정의하는 메서드에 사용 // 우선순위 높음, 응답 커스터마이징 가능, 적용 위치는 컨트롤러 // "이 예외는 내가 처리할게!"
- @ControllerAdvice는 모든 컨트롤러에 공통 예외 처리 적용하는 클래스에 사용 // 우선순위 중간, 모든 컨트롤러에 적용, 클래스 단위 // "모든 컨트롤러에 대한 백업 플랜!"

# ppt11
## 4 log4j뭔지 특징파악 1버전 보안취약 그래서 2버전사용
-  Apache에서 개발한 라이브러리, 빠른 성능과 유연한 설정을 제공 log4j1는 보안 취약점 발견! log4j2 사용권고, 자원봉사팀에 의해 적극적으로 유지/관리되고 대규모 커뮤니티의 지원을 받음

## 5 각각 요소들 하는 역할 4개
Logger > 로그를 생성하는 핵심 객체, 레벨은 ERROR, WARN, INFO, DEBUG, TRACE로 원하는 수준의 로그만 출력가능
Filter > 로그를 출력하기 전 특정 조건을 만족하는지 검사, 필요없는 로그를 걸러내거나 특정 조건의 로그만 출력 가능(보안로그)등
Appender > 로그를 저장하거나 출력하는 역할, 로그를 파일, 콘솔, db, 서버 등에 저장 가능
Layout > 로그의 출력 형식을 결정하는 역할, 날짜, 로그레벨, 클래스명 등 원하는 정보를 포함 가능

## 7 설정시 2가 자동활성화 로거의 name은 패키지명 또는 클래스, 레벨은 작성한것 이상 예를들어, 이 상태면 기록이 되는지 안되는지
-  log4j2.xml 파일이 존재하면 자동 활성화 됨, SpringBoot에서는 LOgback을 제외해야 적용
```xml
 <Logger name="com.springmvc" level="DEBUG"/>
 <Logger name="org.springframework.core" level="INFO"/>
 <Logger name="org.springframework.beans" level="INFO"/>
 <Logger name="org.springframework.context" level="INFO"/>
 <Logger name="org.springframework.web" level="DEBUG"/>
 <Logger name="org.springframework.security" level="DEBUG"/>
 <Logger name="org.springframework.jdbc" level="DEBUG"/>
```
 
## 9 레벨파악!
-  TRACE <DEBUG < INFO < WARN < ERROR 순 (낮은거 - 높은거)
TRACE : 처리흐름을추적할수있는메시지
DEBUG : 디버그용도로시스템흐름에대한자세한정보를표현
INFO : 시작, 종료같은런타임이벤트메시지
WARN : 바람직하지않거나예기치않은런타임상황의경고성메시지
ERROR :기타런타임오류또는예기치않은상태

## 15 인터셉터가 뭔지 사용할때 어떤 구현체, 어떻게 사용하는지 등록방법, 18 핸들러 인터셉터 3개 각각 어떤 단계, 어떤 동작 //프리핸들은 시작시 등
-  springMVC에서 요창과 응답 사이에서 특정 로직을 실행할 수 있도록 도와주는 기능(주로 로그인체크, 권한 검증, 로깅, 성능 모니터링)
-  preHandle(요청이 컨트롤러에 도달하기 전), postHandle(컨트롤러가 실행된 후 추가 작업), afterCompletion(응답이 완료된 후 정리 작업)
-  HandlerInterceptor 인터페이스 사용

## 20 어소시어시 프로세싱 동기화 vs 비동기적* 어떤 차이점 각각 동작방식 파악
-  동기화는 작업이 순차적으로 실행됨, 작업이 완료될 때까지 기다려야함, 응답 속도가 상대적으로 느림
-  작업이 동시에 실행될 수 있음, 처리가 끝날 때까지 기다리지 않고 다음작업 가능, 응답 속도가 빠르고 cpu자원을 효율적으로 사용 가능

## 23 쓰레드로컬 이 변수는 스레드됨. 특징들 파악
- 스래드는 프로그램 내에서 독립적으로 실행되는 작업 단위, 각 스래드는 CPU 자원을 공유하지만, 자체적인 실행 흐름을 가짐
- ThreadLocal은 각 스레드마다 독립적인 변수 값을 가짐, 스레드가 종료되면 해당 변수도 자동으로 제거, 즉 각 스레드가 자신만의 변수를 가질 수 있도록 도와줌, 멀티스레드 환경에서 데이터 충돌을 방지하고 안전한 데이터 관리 가능

# ppt12
## 8 메시지 리소스 리소스번들 파악 + 파일이름 어떻게 저장 //파일이름_ko.properties등
-  어플리케이션에서 사용하는 텍스트(메시지)를 별도의 파일로 관리하는 방식, 문자열을 작성하지 않고 필요할때 불러오는 식으로 사용(ex. welcom.message=안녕하세요) .properties파일로 관리
- 메시지 리소스를 관리하는 java클래스, 다국어 지원을 위해 언어별 메시지 파일을 자동으로 선택
ResourceBundle bundle = ResourceBundle.getBundle("messages", Locale.KOREAN);
String message = bundle.getString("welcome.message");
System.out.println(message); // "안녕하세요!" 출력
- MessageSource 구현체
ResourceBundleMessageSource - 클래스패스, 즉시 반영되지 않음(재시작 필요), 고정된 메시지 관리
ReloadableResourceBundleMessageSource - 클래스패스 + 파일 시스템 지원, 즉시반영, 실시간 메시지 변경 가능
-  사용법
```xml
<beans:bean id="messageSource"
 class="org.springframework.context.support.MessageSource 구현체">
 <beans:property name="basename" value="메시지 리소스 파일의 기본 이름" />
 <beans:property name="defaultEncoding" value="인코딩 타입" />
 ...
 </beans:bean>
```

## 9 기본은 iso-8859-1인데 옵션변경해서 utf-8로 변경, 파일위치
-  utf-8로 변경하는 이유는 iso-8859-1은 보통 서유럽 언어(영어, 프라싱스어)만 표현 가능해서 변경해야됨. UTF-8은 전세계 언어 사용. // 파일위치는 src/main/resources에 위치해야됨. 파일이름은 파일이름_ko.properties(ex. messages_ko.properties)

## 12 뷰 페이지 메시지출력 속성들 각각 어떤 역할인지 파악
arguments메시지출력을위한인자들을전달
argumentSeparator인자를구분할구분자(기본값콤마(,))
code출력할메시지의키지정하지않으면text 속성에입력한값이출력됨
htmlEscape HTML에서지원하는문자열형식으로변환(기본값false)
javaScriptEscape JavaScript에서지원하는문자열형식으로변환(기본값false)
message주로스프링MVC에서유효성검사를거친오류메시지를간단하게보여줄때사용
scope결과를변수로내보낼때변수가적용되는범위(이속성은var가설정된경우에만유효함)
text주어진code에대한메시지를찾을수없을때출력할기본텍스트
var결과를page, request, session, application 범위에바인딩할때사용할변수명. 지정하지않으면메시지가직접JSP에출력됨.

## 13 인자 사용방법 파악
-  인자란 동적인 값을 메세지에 삽입하는 방법. 고정된 문자열이 아니라 실행중에 변하는 값을 메시지에 포함시킬 수 있는 방법
welcome.message=안녕하세요, {0}님! 당신의 나이는 {1}세입니다.
MessageSource messageSource = new ResourceBundleMessageSource();
String message = messageSource.getMessage("welcome.message", new Object[]{"동준", 25}, Locale.KOREAN);
System.out.println(message);
{0} -> 첫 번째 인자("동준")
{1} -> 두 번째 인자(25)

## 24 로케일리졸버+로케일체인지가 뭐하는건지파악 구현체 4개 각각 어떤 방식으로 동작하는지 파악
-  LocaleResolver는 사용자의 언어를 결정하는 역할. 웹 브라우저, 쿠키, 세션 등을 기반으로 적절한 언어를 선택해줌
-  LocaleChangeInterceptor는 사용자가 언어를 변경할 수 있도록 도와주는 인터셉트. URL파이미터(?lang=ko)를 통해서 Locale 변경 가능. ?lang=en과 가이 URL입력하면 자동으로 언어 변경

AcceptHeaderLocaleResolver 웹브라우저에설정된기본로케일정보를사용. HTTP 요청의accept-language 헤더에지정된기본로케일을사용.
CookieLocaleResolver 쿠키를이용한로케일정보를사용. 사용자지정로케일, 표준시간대정보를브라우저쿠키로유지.
SessionLocaleResolver 세션을이용한로케일정보를사용. 사용자세션에서locale 속성을사용하여지정된기본로케일또는요청의acceptheader 로케일로대체함.
FixedLocaleResolver특정로케일을지정. 항상고정된기본로케일을반환하고선택적으로시간대를반환.

+실습한 예제 소스로 출제
