# Example Secure Counter Server

Example server for [amazon-cognito-identity-dart2](https://github.com/furaiev/amazon-cognito-identity-dart-2/tree/master/example).

Will deploy a simple server to AWS to use in testing the Cognito services. 

When deployed, you will have a basic Cognito setup with a user pool, and identity pool, a client and these two endpoints:

#### `GET https://XXXXX.execute-api.us-east-1.amazonaws.com/counter`
```
{ "counter": 1337 }
```

#### `PUT https://XXXXX.execute-api.us-east-1.amazonaws.com/counter`
```
{ "counter": 1338 }
```


## Starting your server
```
npm run deploy
```

In the output from this command, you will see the contents you need to insert into your own `secrets.dart` file, for example:

```
Stack dev-simple-counter-server-simple-counter-server
  Status: deployed
  Outputs:
    InstructionsForUse: In order to run the example app from https://github.com/furaiev/amazon-cognito-identity-dart-2/tree/master/example
you need a file in lib called 'secrets.dart'. Copy and paste the contents below to create a proper file.

Have fun!


// Store this file as lib/secrets.dart
import 'package:amazon_cognito_identity_dart_2/cognito.dart';

const cognitoUserPoolId = 'us-east-1_XXXXXXX';
const cognitoClientId = 'XXXXXXXXXXXXXXX';
const cognitoIdentityPoolId = 'us-east-1:XXXXX-XXXXX-XXXX-XXXX-XXXXXXXX';
const awsRegion = 'us-east-1';
const apiEndpoint = 'https://XXXXXXX.execute-api.us-east-1.amazonaws.com';

final userPool = CognitoUserPool(cognitoUserPoolId, cognitoClientId);
```

## Developing

This project was bootstrapped with [Create Serverless Stack](https://docs.serverless-stack.com/packages/create-serverless-stack).

## Commands

### `npm run start`

Starts the local Lambda development environment.

### `npm run deploy`

Deploy all your stacks to AWS. 

### `npm run remove`

Remove all your stacks and all of their resources from AWS. 

### `npm run test`

Runs your tests using Jest. Takes all the [Jest CLI options](https://jestjs.io/docs/en/cli).

