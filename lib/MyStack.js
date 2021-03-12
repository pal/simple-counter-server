import * as cdk from '@aws-cdk/core'
// import * as iam from '@aws-cdk/iam'
import * as sst from '@serverless-stack/resources'
import { HttpUserPoolAuthorizer } from '@aws-cdk/aws-apigatewayv2-authorizers'
import { ApiAuthorizationType } from '@serverless-stack/resources'

export default class MyStack extends sst.Stack {
  constructor (scope, id, props) {
    super(scope, id, props)

    // Create Cognito resources
    this.auth = new sst.Auth(this, 'Auth', {
      cognito: {
        signInAliases: { email: true }
      }
    })

    // Create the HTTP API
    this.api = new sst.Api(this, 'Api', {
      defaultAuthorizationType: ApiAuthorizationType.AWS_IAM,
      defaultAuthorizer: new HttpUserPoolAuthorizer({
        userPool: this.auth.cognitoUserPool,
        userPoolClient: this.auth.cognitoUserPoolClient
      }),
      defaultAuthorizationScopes: ['user.email'],
      routes: {
        'GET /counter': 'src/lambda.read',
        'PUT /counter': 'src/lambda.increment'
      }
    })

    // Allow authenticated users to invoke the API
    this.auth.attachPermissionsForAuthUsers([this.api])
    this.api.attachPermissions(sst.PermissionType.ALL)

    // this.api.attachPermissions('ssm')

    // Show API endpoint in output

    const filetemplate = `


In order to run the example app from https://github.com/furaiev/amazon-cognito-identity-dart-2/tree/master/example
you need a file in lib called 'secrets.dart'. Copy and paste the contents below to create a proper file.

Have fun!


// Store this file as lib/secrets.dart
import 'package:amazon_cognito_identity_dart_2/cognito.dart';

const cognitoUserPoolId = '${this.auth.cognitoUserPool.userPoolId}';
const cognitoClientId = '${this.auth.cognitoUserPoolClient.userPoolClientId}';
const cognitoIdentityPoolId = '${this.auth.cognitoCfnIdentityPool.ref}';
const awsRegion = '${scope.region}';
const apiEndpoint = '${this.api.httpApi.apiEndpoint}';

final userPool = CognitoUserPool(cognitoUserPoolId, cognitoClientId);


`

    this.output = new cdk.CfnOutput(this, 'InstructionsForUse', {
      value: filetemplate
    })
  }
}
