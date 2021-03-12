import { get, put } from './ssm-client'

export const read = async (event) => {
  const counter = await get(event.requestContext.authorizer.iam.cognitoIdentity.identityId)
  return {
    statusCode: 200,
    body: JSON.stringify({ count: counter }),
    headers: { 'Content-Type': 'application/json' }
  }
}

export const increment = async (event) => {
  const counter = (await get(event.requestContext.authorizer.iam.cognitoIdentity.identityId)) + 1
  await put(event.requestContext.authorizer.iam.cognitoIdentity.identityId, counter)
  return {
    statusCode: 200,
    body: JSON.stringify({ count: counter }),
    headers: { 'Content-Type': 'application/json' }
  }
}
