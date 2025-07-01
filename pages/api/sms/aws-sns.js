// AWS SNS SMS provider
import AWS from 'aws-sdk'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { to, message } = req.body

    // Configure AWS
    AWS.config.update({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION || 'us-east-1'
    })

    const sns = new AWS.SNS()

    // Send SMS via SNS
    const params = {
      Message: message,
      PhoneNumber: to,
      MessageAttributes: {
        'AWS.SNS.SMS.SMSType': {
          DataType: 'String',
          StringValue: 'Transactional'
        }
      }
    }

    const result = await sns.publish(params).promise()

    console.log('AWS SNS SMS sent:', result.MessageId)

    res.status(200).json({
      success: true,
      messageId: result.MessageId,
      provider: 'aws-sns'
    })

  } catch (error) {
    console.error('AWS SNS SMS error:', error)
    res.status(500).json({
      success: false,
      error: error.message
    })
  }
}
