#알고리즘의 이해 과제
number = int(input())  

array = []
for i in range(number):
    num = int(input())  #입력
    array.append(num)  #리스트에 추가하기기
stack = []  #스택 정의
result = []  #+, - 를 저장할공간 할당당
current = 1  #1로 설정정

for num in array:  
    #현재 숫자가 목표 숫자보다 작거나 같으면 push하기
    while current <= num:
        stack.append(current)  #스택에 추가하기
        result.append("+")  #+ 저장
        print("+")  
        current += 1

    #위 숫자가 수열 값과 같으면 pop 시키기
    if stack[-1] == num:
        stack.pop()  #스택에서 제거하기
        result.append("-")  #- 저장
        print("-")  
    else:
        print("NO")  
        exit()  #종료시키기
