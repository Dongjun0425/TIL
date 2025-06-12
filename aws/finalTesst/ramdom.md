# 랜덤(난수) 값 문제 및 해결 방법
문제 1: S3 파일 업로드 및 DynamoDB 연동 (동적 점수 부여)
시나리오:
당신은 새로운 학생 정보를 관리하는 시스템을 구축하고 있습니다. 매일 S3 버킷에 새로운 학생 정보가 담긴 CSV 파일이 업로드됩니다. 
이 파일에는 학생 이름, 학번, 전공이 포함되어 있습니다. 당신의 임무는 이 CSV 파일을 읽어 DynamoDB 테이블에 
학생 정보를 저장하는 AWS Lambda 함수를 개발하는 것입니다.

S3 버킷 이름은 sgu-<aws계정>-s3라고 가정합니다.
CSV 파일명은 student_scores_<현재 날짜>.csv (예: student_scores_20250613.csv) 형식으로 업로드됩니다.
CSV 파일의 내용은 다음과 같은 형식을 가집니다 (파일 하나에 여러 줄의 데이터):
'''
이름,학번,전공
김철수,20230001,컴퓨터공학
이영희,20230002,전자공학
박지성,20230003,스포츠과학
'''
특정 조건 (랜덤 값 적용): 각 학생 데이터에 Score 속성을 추가해야 합니다. 이 Score 값은 0부터 100 사이의 숫자로 부여하되,
현재 Lambda 함수가 실행된 시간의 '초(second)' 값을 기준으로 결정되어야 합니다.
만약 현재 시간의 초가 0~19초이면 Score는 60점.
만약 현재 시간의 초가 20~39초이면 Score는 80점.
만약 현재 시간의 초가 40~59초이면 Score는 95점.

### 현재 Lambda 함수가 실행된 시간의 '초(second)' 값을 활용하여 Score를 동적으로 결정하고 DynamoDB에 추가하는 로직을 구현하세요.
import json
import boto3
import csv
from datetime import datetime

def lambda_handler(event, context):
    s3 = boto3.client('s3')
    dynamodb = boto3.resource('dynamodb')
    
    # 시험 공지에 따라 테이블 이름 지정 (예시: sgu-202500-3a)
    # 실제 시험에서는 본인의 AWS 계정 ID와 학년반을 사용해야 합니다.
    table_name = 'sgu-<aws계정>-<학년반>' 
    table = dynamodb.Table(table_name)

    # S3 이벤트에서 버킷과 키 정보 추출
    # 실제 S3 트리거 시 event 구조에 맞춰 변경해야 합니다.
    # 여기서는 임의의 값을 사용하여 테스트할 수 있도록 설정합니다.
    # 시험에서는 S3 트리거 이벤트(event 변수)에서 버킷과 키를 추출해야 합니다.
    bucket_name = 'sgu-<aws계정>-s3' # 본인 버킷 이름으로 변경
    object_key = 'student_scores_20250613.csv' # 실제 파일 경로로 변경 (날짜 포함)

    try:
        # 1. S3에서 CSV 파일 읽기
        response = s3.get_object(Bucket=bucket_name, Key=object_key)
        content = response['Body'].read().decode('utf-8')

        # 2. 현재 Lambda 함수 실행 시간 기록
        current_time = datetime.now()
        processed_time = current_time.isoformat()
        
        # 3. 현재 시간의 '초' 값을 기반으로 Score 결정
        # 0~19초: 60점, 20~39초: 80점, 40~59초: 95점
        second_value = current_time.second
        if 0 <= second_value <= 19:
            assigned_score = 60
        elif 20 <= second_value <= 39:
            assigned_score = 80
        else: # 40~59초
            assigned_score = 95

        # CSV 데이터를 한 줄씩 읽기
        csv_reader = csv.reader(content.splitlines())
        header = next(csv_reader) # 헤더 건너뛰기

        inserted_items = []
        for row in csv_reader:
            # CSV 컬럼 매핑
            name = row[0]
            user_id = row[1] # 학번을 user_id로 사용
            major = row[2]

            # DynamoDB에 삽입할 아이템 구성
            item = {
                'user_id': user_id,
                'timestamp': processed_time, # 정렬 키로 사용
                'name': name,
                'major': major,
                'Score': assigned_score, # 동적으로 결정된 점수 추가
                'ProcessedTime': processed_time # 처리 시간 추가
            }

            table.put_item(Item=item)
            inserted_items.append(item)
            print(f"Inserted item: {item}")

        return {
            'statusCode': 200,
            'body': json.dumps({
                'message': 'DynamoDB insert successful!',
                'inserted_count': len(inserted_items),
                'first_item_example': inserted_items[0] if inserted_items else {}
            }, ensure_ascii=False)
        }

    except Exception as e:
        print(f"Error: {e}")
        return {
            'statusCode': 500,
            'body': json.dumps({
                'error': str(e),
                'hint': 'S3 버킷 및 키, DynamoDB 테이블 이름 확인 또는 S3 이벤트 트리거 설정 확인'
            }, ensure_ascii=False)
        }
  ### 현재 시간의 '분' 값을 활용하여 5~10개의 로그 이벤트를 가져와 분석하는 로직을 포함하세요.
import boto3
import json
import emoji
from datetime import datetime

def lambda_handler(event, context):
    logs = boto3.client('logs')
    # 로그를 읽어올 대상 Lambda 함수의 로그 그룹 이름
    log_group = '/aws/lambda/sgu-<aws계정>-some-other-lambda' 
    
    try:
        # 1. 현재 시간의 '분' 값을 기반으로 가져올 로그 개수 동적 결정
        # (현재 분 % 6)은 0~5 사이의 값을 반환하므로, +5를 하면 5~10 사이의 값이 됩니다.
        current_minute = datetime.now().minute
        num_logs_to_fetch = (current_minute % 6) + 5 
        print(f"Fetching {num_logs_to_fetch} log events based on current minute: {current_minute}")

        # 2. 최근 로그 스트림 가져오기
        streams = logs.describe_log_streams(
            logGroupName=log_group,
            orderBy='LastEventTime',
            descending=True,
            limit=1
        )['logStreams']

        if not streams:
            return {
                'statusCode': 404,
                'body': 'No log streams found for the specified log group.'
            }

        stream_name = streams[0]['logStreamName']
        print(f"Using log stream: {stream_name}")

        # 3. 로그 이벤트 가져오기 (동적으로 결정된 개수만큼)
        events_response = logs.get_log_events(
            logGroupName=log_group,
            logStreamName=stream_name,
            limit=num_logs_to_fetch, # 동적으로 결정된 개수 적용
            startFromHead=False # 가장 최근 로그부터 가져오기 위해 False (혹은 특정 endTime 설정)
        )
        events = events_response['events']

        processed_messages = []
        for e in events:
            message = e['message'].strip()
            
            # 4. 키워드에 따라 이모지 추가
            if "ERROR" in message.upper():
                processed_message = f"{message} ❌"
            elif "WARNING" in message.upper():
                processed_message = f"{message} ⚠️"
            elif "INFO" in message.upper():
                processed_message = f"{message} ✅"
            else:
                processed_message = f"{message} 💬"
            
            processed_messages.append(processed_message)
            print(processed_message) # Lambda 로그에 출력

        return {
            'statusCode': 200,
            'body': json.dumps({
                'message': f'Processed {len(processed_messages)} CloudWatch log events.',
                'processed_logs': processed_messages
            }, ensure_ascii=False)
        }

    except logs.exceptions.ResourceNotFoundException:
        return {
            'statusCode': 404,
            'body': json.dumps({
                'error': f"Log group '{log_group}' not found. Please check the log group name."
            }, ensure_ascii=False)
        }
    except Exception as e:
        print(f"Error processing logs: {e}")
        return {
            'statusCode': 500,
            'body': json.dumps({'error': str(e)}, ensure_ascii=False)
        }
        
