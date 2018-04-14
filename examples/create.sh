FUNCTION_NAME=$1
RGEION=us-east-1
CLI_PROFILE=default
RUNTIME=nodejs6.10 
ROLE=arn:aws:iam::851751148026:role/lambda_basic_execution #this role must exist
NOW=$(date +%s)

aws --region $RGEION --profile $CLI_PROFILE lambda create-function \
--function-name $FUNCTION_NAME \
--runtime $RUNTIME \
--role $ROLE \
--handler "index.handler" \
--zip-file fileb://hello-world.zip \
--description "" \
--timeout 30 

aws --region $RGEION --profile $CLI_PROFILE lambda add-permission \
--function-name $FUNCTION_NAME \
--statement-id NOW \
--action "lambda:InvokeFunction" \
--principal "alexa-appkit.amazon.com"
 