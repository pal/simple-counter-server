const SSM = require('aws-sdk/clients/ssm')
const ssm = new SSM()

// https://gist.github.com/iperelivskiy/4110988
const hash = function (s) {
  /* Simple hash function. */
  let a = 1; let c = 0; let h; let o
  if (s) {
    a = 0
    /* jshint plusplus:false bitwise:false */
    for (h = s.length - 1; h >= 0; h--) {
      o = s.charCodeAt(h)
      a = (a << 6 & 268435455) + o + (o << 14)
      c = a & 266338304
      a = c !== 0 ? a ^ c >> 21 : a
    }
  }
  return String(a)
}

// Get value from SSM
// https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-parameter-store.html
export const get = async (name) => {
  const params = { Name: `/counter/${hash(name)}` }

  try {
    const data = await ssm.getParameter(params).promise()
    console.log(`get retrieved: ${JSON.stringify(data)}`)
    // console.log(`get retrieved: ${data.Parameter.Value}`)
    if (typeof data.Parameter.Value === 'undefined') {
      return 0
    }
    return parseInt(data.Parameter.Value)
  } catch (error) {
    console.warn('Error when getting SSM param, returning 0', error)
    console.debug(`params: ${JSON.stringify(params, null, 2)}`)
    return 0
  }
}

// Store value in SSM
export const put = async (name, value) => {
  const params = {
    Name: `/counter/${hash(name)}`,
    Value: `${value}`,
    AllowedPattern: '^\\d+$',
    DataType: 'text',
    Description: 'Counter value for Cognito example app',
    Overwrite: true,
    Tier: 'Standard',
    Type: 'String'
  }

  try {
    const data = await ssm.putParameter(params).promise()
    console.log(`put retrieved: ${JSON.stringify(data)}`)
    return parseInt(data.Parameter.Value)
  } catch (error) {
    console.warn('Error when getting SSM param, returning 0', error)
    console.debug(`params: ${JSON.stringify(params, null, 2)}`)
    return 0
  }
}
