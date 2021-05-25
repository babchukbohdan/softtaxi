import axios from 'axios'
const uri = process.env.SMS_SERVICE_URL
const apiKey = process.env.SMS_SERVICE_KEY
const path = `${uri}`

const a = encodeURI(`${path}Message/SendSmsMessage?apiKey=${apiKey}`)

export interface MobizonResponse {
  code?: number
  data?: { campaignId: string; messageId: string; status: number }
  message: string
}

export async function sendSMS(
  phone: string,
  message: string
): Promise<MobizonResponse> {
  const response = await axios({
    method: 'post',
    url: a,
    data: {
      recipient: phone,
      text: message,
    },
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'cache-control': 'no-cache',
    },
  })

  if (response.status === 200) {
    return response.data
  } else {
    return { message: 'Failed to send notification message.' }
  }
}
