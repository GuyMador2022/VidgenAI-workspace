// API endpoint for exporting user data
export default function handler(req, res) {
  const { method } = req;

  if (method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${method} Not Allowed`);
  }

  const { format = 'csv', filter = 'all' } = req.query;

  // Mock user data - in real app this would come from database
  const mockUsers = [
    {
      id: 1,
      name: 'דני כהן',
      email: 'danny.cohen@example.com',
      plan: 'premium',
      status: 'active',
      registeredAt: '2025-05-15',
      lastLogin: '2025-06-28',
      usageTime: 450,
      paymentTime: 90,
      monthlyPayment: 99,
      totalSpent: 890,
      projectsCount: 3,
      apiUsage: {
        openai: 150,
        elevenlabs: 80,
        runway: 45,
        dalle: 120
      }
    },
    {
      id: 2,
      name: 'שרה לוי',
      email: 'sarah.levi@example.com',
      plan: 'enterprise',
      status: 'active',
      registeredAt: '2025-04-20',
      lastLogin: '2025-06-27',
      usageTime: 780,
      paymentTime: 120,
      monthlyPayment: 199,
      totalSpent: 2380,
      projectsCount: 4,
      apiUsage: {
        openai: 320,
        elevenlabs: 180,
        runway: 120,
        dalle: 250
      }
    },
    {
      id: 3,
      name: 'מיכל שפירא',
      email: 'michal.shapira@example.com',
      plan: 'basic',
      status: 'suspended',
      registeredAt: '2025-06-01',
      lastLogin: '2025-06-20',
      usageTime: 120,
      paymentTime: 30,
      monthlyPayment: 29,
      totalSpent: 87,
      projectsCount: 2,
      apiUsage: {
        openai: 45,
        elevenlabs: 25,
        runway: 15,
        dalle: 60
      }
    }
  ];

  // Filter users based on query
  let filteredUsers = [...mockUsers];
  if (filter !== 'all') {
    if (filter === 'premium') {
      filteredUsers = filteredUsers.filter(user => user.plan === 'premium' || user.plan === 'enterprise');
    } else {
      filteredUsers = filteredUsers.filter(user => user.status === filter);
    }
  }

  try {
    if (format === 'csv') {
      // Generate CSV
      const csvHeaders = [
        'ID',
        'שם',
        'אימייל',
        'תוכנית',
        'סטטוס',
        'תאריך הרשמה',
        'כניסה אחרונה',
        'זמן שימוש (דקות)',
        'זמן תשלום (ימים)',
        'תשלום חודשי',
        'סה"כ הוצאה',
        'מספר פרויקטים',
        'שימוש OpenAI',
        'שימוש ElevenLabs',
        'שימוש Runway',
        'שימוש DALL-E'
      ];

      const csvRows = filteredUsers.map(user => [
        user.id,
        `"${user.name}"`,
        user.email,
        user.plan,
        user.status,
        user.registeredAt,
        user.lastLogin,
        user.usageTime,
        user.paymentTime,
        user.monthlyPayment,
        user.totalSpent,
        user.projectsCount,
        user.apiUsage.openai,
        user.apiUsage.elevenlabs,
        user.apiUsage.runway,
        user.apiUsage.dalle
      ]);

      const csvContent = [csvHeaders, ...csvRows]
        .map(row => row.join(','))
        .join('\n');

      res.setHeader('Content-Type', 'text/csv; charset=utf-8');
      res.setHeader('Content-Disposition', `attachment; filename="users_export_${new Date().toISOString().split('T')[0]}.csv"`);
      res.status(200).send('\ufeff' + csvContent); // BOM for Hebrew support

    } else if (format === 'json') {
      // Generate JSON
      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Content-Disposition', `attachment; filename="users_export_${new Date().toISOString().split('T')[0]}.json"`);
      res.status(200).json({
        exportDate: new Date().toISOString(),
        totalUsers: filteredUsers.length,
        filter: filter,
        users: filteredUsers
      });

    } else {
      res.status(400).json({ success: false, message: 'Unsupported format. Use csv or json.' });
    }

  } catch (error) {
    console.error('Export error:', error);
    res.status(500).json({ success: false, message: 'Export failed' });
  }
}
