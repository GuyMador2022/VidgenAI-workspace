// Next.js API route for handling lead form submissions
// File: pages/api/leads/submit.js

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const formData = req.body
    
    // Validate required fields
    const requiredFields = ['businessName', 'businessField', 'contactName', 'contactInfo', 'allowContact']
    const missingFields = requiredFields.filter(field => !formData[field])
    
    if (missingFields.length > 0) {
      return res.status(400).json({ 
        message: 'Missing required fields', 
        fields: missingFields 
      })
    }

    // Here you would typically:
    // 1. Save to database
    // 2. Send to CRM (like HubSpot, Salesforce)
    // 3. Send email notification
    // 4. Add to mailing list
    
    // Example: Save to database (pseudo-code)
    /*
    const lead = await db.leads.create({
      businessName: formData.businessName,
      businessField: formData.businessField,
      contactName: formData.contactName,
      contactInfo: formData.contactInfo,
      channels: formData.channels,
      contentCreator: formData.contentCreator,
      monthlyBudget: formData.monthlyBudget,
      interested: formData.interested,
      importantFeatures: formData.importantFeatures,
      allowContact: formData.allowContact,
      submittedAt: new Date()
    })
    */

    // Example: Send to email service
    /*
    await sendEmailNotification({
      to: 'leads@vidgenai.com',
      subject: `New Lead: ${formData.businessName}`,
      html: generateLeadEmailHTML(formData)
    })
    */

    // Example: Add to mailing list
    /*
    if (formData.allowContact) {
      await addToMailingList({
        email: formData.contactInfo,
        name: formData.contactName,
        businessName: formData.businessName,
        tags: ['early-access', 'survey-participant']
      })
    }
    */

    console.log('New lead submitted:', {
      businessName: formData.businessName,
      businessField: formData.businessField,
      contactName: formData.contactName,
      interested: formData.interested,
      timestamp: new Date().toISOString()
    })

    res.status(200).json({ 
      success: true, 
      message: 'Lead submitted successfully' 
    })

  } catch (error) {
    console.error('Error processing lead submission:', error)
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    })
  }
}

// Helper function to generate email HTML (example)
function generateLeadEmailHTML(formData) {
  return `
    <h2>New Lead Submission - VidGenAI Campaign</h2>
    <h3>Business Information</h3>
    <p><strong>Business Name:</strong> ${formData.businessName}</p>
    <p><strong>Business Field:</strong> ${formData.businessField}</p>
    <p><strong>Contact Name:</strong> ${formData.contactName}</p>
    <p><strong>Contact Info:</strong> ${formData.contactInfo}</p>
    
    <h3>Current Marketing</h3>
    <p><strong>Channels:</strong> ${formData.channels.join(', ') || 'None selected'}</p>
    <p><strong>Content Creator:</strong> ${formData.contentCreator}</p>
    <p><strong>Monthly Budget:</strong> ${formData.monthlyBudget}</p>
    
    <h3>Interest & Preferences</h3>
    <p><strong>Interest Level:</strong> ${formData.interested}</p>
    <p><strong>Important Features:</strong> ${formData.importantFeatures.join(', ') || 'None selected'}</p>
    
    <p><strong>Allow Contact:</strong> ${formData.allowContact ? 'Yes' : 'No'}</p>
    <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
  `
}
