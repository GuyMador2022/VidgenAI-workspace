// API for user signup
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { name, email, password, company, phone, plan } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' })
    }

    // Password validation
    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' })
    }

    // In a real implementation, you would:
    // 1. Check if email already exists
    // 2. Hash the password
    // 3. Save to database
    // 4. Send verification email
    // 5. Create user session/JWT

    // For demo purposes, we'll simulate this
    console.log('📝 Creating new user account:', {
      name,
      email: email.toLowerCase(),
      company: company || 'Personal',
      phone: phone || 'Not provided',
      plan: plan || 'free',
      createdAt: new Date().toISOString()
    })

    // Simulate user creation delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Generate fake user ID
    const userId = `user_${Date.now()}_${Math.random().toString(36).substring(7)}`

    // Determine user credits based on plan
    const planCredits = {
      free: 10,
      basic: 100,
      professional: 500,
      enterprise: 2000
    }

    const userData = {
      id: userId,
      name,
      email: email.toLowerCase(),
      company: company || null,
      phone: phone || null,
      plan: plan || 'free',
      credits: planCredits[plan] || 10,
      creditsUsed: 0,
      isActive: true,
      isPaid: plan !== 'free',
      subscriptionStatus: plan === 'free' ? 'free' : 'pending_payment',
      createdAt: new Date().toISOString(),
      lastLogin: null
    }

    // In a real app, save to database
    // await saveUserToDatabase(userData)

    console.log('✅ User account created successfully:', userData)

    return res.status(200).json({
      success: true,
      message: 'Account created successfully',
      userId: userId,
      user: {
        id: userData.id,
        name: userData.name,
        email: userData.email,
        plan: userData.plan,
        credits: userData.credits
      }
    })

  } catch (error) {
    console.error('Error creating user account:', error)
    return res.status(500).json({ 
      error: 'Failed to create account',
      details: error.message 
    })
  }
}
