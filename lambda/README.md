# AWS CLI Lambda & AWS API Gateway

### Create Lambda Deployment Package

```bash
zip function.zip index.js
```
### Create a Lambda function 

```bash
aws lambda create-function --function-name LambdaFunctionOverHttps \
--zip-file fileb://function.zip --handler index.handler --runtime nodejs12.x \
--role arn:aws:iam::642815508926:role/service-role/helloBlueGoose
```

### Test lambda with test data

create `input.txt`

```bash
aws lambda invoke --function-name LambdaFunctionOverHttps \
--payload fileb://input.json outputfile.txt
```

### Create the API

```bash
aws apigateway create-rest-api --name DynamoDBOperations
```

which returns

```json
{
    "id": "rrbnoosyh3",
    "name": "DynamoDBOperations",
    "createdDate": "2020-05-19T11:37:46-07:00",
    "apiKeySource": "HEADER",
    "endpointConfiguration": {
        "types": [
            "EDGE"
        ]
    }
}
```
set API ID

```bash
API=rrbnoosyh3
```

run get-resources

```bash
aws apigateway get-resources --rest-api-id $API
```

which returns
```json
{
    "items": [
        {
            "id": "xplr4sggt9",
            "path": "/"
        }
    ]
}
```

### Create resource in the API

```bash
aws apigateway create-resource --rest-api-id $API  --path-part DynamoDBManager \
--parent-id xplr4sggt9
```

which returns

```json
{
    "id": "zn93kl",
    "parentId": "xplr4sggt9",
    "pathPart": "DynamoDBManager",
    "path": "/DynamoDBManager"
}
```

### Create POST method on the resource

```bash
RESOURCE=zn93kl
```

```bash
aws apigateway put-method --rest-api-id $API --resource-id $RESOURCE \
--http-method POST --authorization-type NONE
```

which returns

```json
{
    "httpMethod": "POST",
    "authorizationType": "NONE",
    "apiKeyRequired": false
}
```
### Set Lambda function as destination for the POST method

```bash
$ REGION=us-east-2
$ ACCOUNT=642815508926
$ aws apigateway put-integration --rest-api-id $API --resource-id $RESOURCE \
--http-method POST --type AWS --integration-http-method POST \
--uri arn:aws:apigateway:$REGION:lambda:path/2015-03-31/functions/arn:aws:lambda:$REGION:$ACCOUNT:function:LambdaFunctionOverHttps/invocations
```

which returns
```json
{
    "type": "AWS",
    "httpMethod": "POST",
    "uri": "arn:aws:apigateway:us-east-2:lambda:path/2015-03-31/functions/arn:aws:lambda:us-east-2:642815508926:function:LambdaFunctionOverHttps/invocations",
    "passthroughBehavior": "WHEN_NO_MATCH",
    "timeoutInMillis": 29000,
    "cacheNamespace": "zn93kl",
    "cacheKeyParameters": []
}
```

set the POST method response to JSON

```bash
aws apigateway put-method-response --rest-api-id $API \
--resource-id $RESOURCE --http-method POST \
--status-code 200 --response-models application/json=Empty
```

which returns

```json
{
    "statusCode": "200",
    "responseModels": {
        "application/json": "Empty"
    }
}
```

set the POST method integration response to JSON

```bash
aws apigateway put-integration-response --rest-api-id $API \
--resource-id $RESOURCE --http-method POST \
--status-code 200 --response-templates application/json=""
```

which returns 
```json
{
    "statusCode": "200",
    "responseTemplates": {
        "application/json": null
    }
}
```

### Deploy the API

```bash
aws apigateway create-deployment --rest-api-id $API --stage-name prod
```
 which returns
```json
{
    "id": "n7fuxx",
    "createdDate": "2020-05-19T11:49:32-07:00"
}
```

### Grant invoke permission to the API
```bash
aws lambda add-permission --function-name LambdaFunctionOverHttps \
--statement-id apigateway-test-2 --action lambda:InvokeFunction \
--principal apigateway.amazonaws.com \
--source-arn "arn:aws:execute-api:$REGION:$ACCOUNT:$API/*/POST/DynamoDBManager"
```

which returns

```json
{
    "Statement": "{\"Sid\":\"apigateway-test-2\",\"Effect\":\"Allow\",\"Principal\":{\"Service\":\"apigateway.amazonaws.com\"},\"Action\":\"lambda:InvokeFunction\",\"Resource\":\"arn:aws:lambda:us-east-2:642815508926:function:LambdaFunctionOverHttps\",\"Condition\":{\"ArnLike\":{\"AWS:SourceArn\":\"arn:aws:execute-api:us-east-2:642815508926:rrbnoosyh3/*/POST/DynamoDBManager\"}}}"
}
```
### Grant invoke permission to the Lambda function
```bash
aws lambda add-permission --function-name LambdaFunctionOverHttps \
--statement-id apigateway-prod-2 --action lambda:InvokeFunction \
--principal apigateway.amazonaws.com \
--source-arn "arn:aws:execute-api:$REGION:$ACCOUNT:$API/prod/POST/DynamoDBManager"
```
which returns
```json
{
    "Statement": "{\"Sid\":\"apigateway-prod-2\",\"Effect\":\"Allow\",\"Principal\":{\"Service\":\"apigateway.amazonaws.com\"},\"Action\":\"lambda:InvokeFunction\",\"Resource\":\"arn:aws:lambda:us-east-2:642815508926:function:LambdaFunctionOverHttps\",\"Condition\":{\"ArnLike\":{\"AWS:SourceArn\":\"arn:aws:execute-api:us-east-2:642815508926:rrbnoosyh3/prod/POST/DynamoDBManager\"}}}"
}
```
### Create DynamoDB table
In console with 
Table name: `lambda-apigateway`
Primary key: `id`

### Trigger function with HTTP request

Save request to create-item.json

```bash
aws apigateway test-invoke-method --rest-api-id $API \
--resource-id $RESOURCE --http-method POST --path-with-query-string "" \
--body file://create-item.json
```
or use curl
```bash
curl -X POST -d "{\"operation\":\"create\",\"tableName\":\"lambda-apigateway\",\"payload\":{\"Item\":{\"id\":\"1\",\"name\":\"Bob\"}}}" https://$API.execute-api.$REGION.amazonaws.com/prod/DynamoDBManager
```

test again with `echo.json `





