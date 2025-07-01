// API endpoint for user actions like suspend, upgrade, reset API limits
export default function handler(req, res) {
  const { method } = req;
  const { action, userId } = req.query;

  if (method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${method} Not Allowed`);
  }

  // Mock user data - in real app this would come from database
  const mockUsers = [
    {
      id: 1,
      name: 'דני כהן',
      email: 'danny.cohen@example.com',
      plan: 'premium',
      status: 'active',
      apiUsage: { openai: 150, elevenlabs: 80, runway: 45, dalle: 120 }
    },
    // ... more users
  ];

  const userIndex = mockUsers.findIndex(user => user.id === parseInt(userId));
  
  if (userIndex === -1) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }

  try {
    switch (action) {
      case 'suspend':
        mockUsers[userIndex].status = mockUsers[userIndex].status === 'active' ? 'suspended' : 'active';
        res.status(200).json({ 
          success: true, 
          message: `User ${mockUsers[userIndex].status === 'active' ? 'activated' : 'suspended'} successfully`,
          user: mockUsers[userIndex]
        });
        break;

      case 'upgrade':
        const { newPlan } = req.body;
        if (!['basic', 'premium', 'enterprise'].includes(newPlan)) {
          return res.status(400).json({ success: false, message: 'Invalid plan' });
        }
        
        mockUsers[userIndex].plan = newPlan;
        res.status(200).json({ 
          success: true, 
          message: 'Plan updated successfully',
          user: mockUsers[userIndex]
        });
        break;

      case 'reset-api':
        mockUsers[userIndex].apiUsage = { openai: 0, elevenlabs: 0, runway: 0, dalle: 0 };
        res.status(200).json({ 
          success: true, 
          message: 'API limits reset successfully',
          user: mockUsers[userIndex]
        });
        break;

      case 'send-email':
        const { subject, message } = req.body;
        // In real app, this would send an actual email
        console.log(`Sending email to ${mockUsers[userIndex].email}:`, { subject, message });
        res.status(200).json({ 
          success: true, 
          message: 'Email sent successfully'
        });
        break;

      case 'bulk-email':
        const { recipients, emailSubject, emailMessage } = req.body;
        // In real app, this would send bulk emails
        console.log(`Sending bulk email to ${recipients.length} users:`, { emailSubject, emailMessage });
        res.status(200).json({ 
          success: true, 
          message: `Bulk email sent to ${recipients.length} users`
        });
        break;

      default:
        res.status(400).json({ success: false, message: 'Invalid action' });
    }
  } catch (error) {
    console.error('User action error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
}
