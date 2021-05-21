import axios from 'axios'
const uri = process.env.SMS_SERVICE_URL
const apiKey = process.env.SMS_SERVICE_KEY
const path = `${uri}`

const a = encodeURI(`${path}Message/SendSmsMessage?apiKey=${apiKey}`)

export function sendSMS(phone: string, message: string): void {
  console.log(`send <${message}> with mobizon on ${phone}`)

  console.log('uri: ', uri)
  console.log('apiKey: ', apiKey)
  console.log('uri: ', uri)

  // return axios({
  //   method: 'post',
  //   url: a,
  //   data: {
  //     recipient: phone,
  //     text: message,
  //   },
  //   headers: {
  //     'content-type': 'application/x-www-form-urlencoded',
  //     'cache-control': 'no-cache',
  //   },
  // })
}
