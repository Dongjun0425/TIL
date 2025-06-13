-다이나모 디비(전체 데이터)

import json
import boto3
from datetime import datetime

def lambda_handler(event, context):
    # 클라이언트 및 리소스 생성
    s3 = boto3.client('s3')
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table('sgu-202562-user-likes-time')

    # 버킷과 키 지정
    bucket_name = 'sgu-202562-s3'
    object_key = 'dynamo_data/user_likes_data.json'

    try:
        # S3에서 JSON 파일 읽기
        response = s3.get_object(Bucket=bucket_name, Key=object_key)
        content = response['Body'].read().decode('utf-8')
        data = json.loads(content)

        # 타임스탬프 추가
        timestamp = datetime.now().isoformat()
        data['timestamp'] = timestamp

        # DynamoDB 삽입
        table.put_item(Item=data)

        return {
            'statusCode': 200,
            'body': json.dumps({
                'message': 'DynamoDB insert successful!',
                'item': data
            }, ensure_ascii=False)
        }

    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps({
                'error': str(e)
            }, ensure_ascii=False)
        }

- 다이나모 디비 2(필요한 필드만)
import json
import boto3
from datetime import datetime

def lambda_handler(event, context):
    s3 = boto3.client('s3')
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table('sgu-202562-user-likes-time')

    bucket_name = 'sgu-202562-s3'
    object_key = 'dynamo_data/user_likes_data_2.json'

    try:
        # 1. S3에서 파일 가져오기
        response = s3.get_object(Bucket=bucket_name, Key=object_key)
        content = response['Body'].read().decode('utf-8')
        raw_data = json.loads(content)

        # 2. 필요한 필드만 추출
        user_id = raw_data.get('user_id')
        product = raw_data.get('product')

        if not user_id or not product:
            return {
                'statusCode': 400,
                'body': '필수 데이터 누락: user_id 또는 product가 없습니다.'
            }

        # 3. DynamoDB에 저장할 항목 구성
        item = {
            'user_id': user_id,
            'timestamp': datetime.now().isoformat(),
            'product': product
        }

        # 4. insert
        table.put_item(Item=item)

        return {
            'statusCode': 200,
            'body': json.dumps({
                'message': '선택 필드만 Insert 완료',
                'item': item
            }, ensure_ascii=False)
        }

    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps({'error': str(e)}, ensure_ascii=False)
        }

- 다이나모디비 3(배열)
import json
import boto3
from datetime import datetime

def lambda_handler(event, context):
    s3 = boto3.client('s3')
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table('sgu-202562-user-likes-time')

    bucket_name = 'sgu-202562-s3'
    object_key = 'dynamo_data/user_likes_data.json'

    try:
        # 1. S3에서 파일 읽기
        response = s3.get_object(Bucket=bucket_name, Key=object_key)
        content = response['Body'].read().decode('utf-8')
        data_list = json.loads(content)  # JSON 배열로 파싱

        # 2. 각 항목 반복 처리
        for record in data_list:
            user_id = record.get('user_id')
            product = record.get('product')

            if not user_id or not product:
                print(f"user_id 또는 product 누락: {record}")
                continue

            item = {
                'user_id': user_id,
                'timestamp': datetime.now().isoformat(),
                'product': product
            }

            table.put_item(Item=item)
            print(f"Inserted: {item}")

        return {
            'statusCode': 200,
            'body': json.dumps('전체 레코드 Insert 완료', ensure_ascii=False)
        }

    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps({'error': str(e)}, ensure_ascii=False)
        }

- 파일 업로드

import json
import boto3
from datetime import datetime


def lambda_handler(event,context) :
    s3 = boto3.client('s3')
    bucket_name = 'sgu-202562-s3'
    prefix = 'uploaded/'

    now = datetime.now().strftime('%Y-%m-%d_%H-%M-%S')
    filename = f'{prefix}hello_{now}.txt'
    content = f'Hello Dongjun! This file was created at {now}'

    #s3에 파일 업로드
    s3.put_object(
        Bucket = bucket_name,
        Key = filename,
        Body=content.encode('utf-8')
    )

    return{
        "statusCode" : 200,
        "statusDescription" : "200 OK",
        "isBase64Encoded" : False,
        "headers" : {
            "Content-Type":"application/json"
        },
        "body" : '{"message":"업로드 완료"}'
    }

-이모지 모듈

import emoji

def lambda_handler(event, context):
    text = "AWS Lambda is awesome! :rocket:"
    result = emoji.emojize(text, language='alias')
    print(result)
    return {
        'statusCode': 200,
        'body' : result
        }

- request 모듈

import requests
import json
def lambda_handler(event, context):
    url = "https://httpbin.org/post"
    payload = {"name": "test"}
    response = requests.post(url, json=payload)
    data = response.json()
    print("API 응답:", data)
    return {
        'statusCode': 200,
        'body': str(data)
}


- 클라우드 와치 읽기
import boto3
import json
from datetime import datetime

def lambda_handler(event, context):
    logs = boto3.client('logs')
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table('sgu-202500-user-likes-time')
    log_group = '/aws/lambda/sgu-202500-lambda-s3'

    try:
        # 1. 최근 로그 스트림 가져오기
        streams = logs.describe_log_streams(
            logGroupName=log_group,
            orderBy='LastEventTime',
            descending=True,
            limit=1
        )['logStreams']

        if not streams:
            return {
                'statusCode': 404,
                'body': 'No log streams found'
            }

        stream_name = streams[0]['logStreamName']

        # 2. 로그 이벤트 가져오기
        events = logs.get_log_events(
            logGroupName=log_group,
            logStreamName=stream_name,
            limit=20,
            startFromHead=True
        )['events']

        # 3. 로그 이벤트를 하나씩 DynamoDB에 저장
        for e in events:
            # CloudWatch timestamp → ISO 형식 변환
            event_time = datetime.fromtimestamp(e['timestamp'] / 1000).isoformat()
            message = e['message'].strip()

            item = {
                'user_id': 'cloudwatch',
                'timestamp': event_time,
                'product': message
            }

            table.put_item(Item=item)
            print(f"Inserted: {item}")

        return {
            'statusCode': 200,
            'body': json.dumps('CloudWatch 로그 → DynamoDB 저장 완료', ensure_ascii=False)
        }

    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps({'error': str(e)}, ensure_ascii=False)
        }
