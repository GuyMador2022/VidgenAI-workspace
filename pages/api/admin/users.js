// Mock API endpoint for user management
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
    projects: [
      { id: 1, name: 'קמפיין נדל״ן מרכז', type: 'video', status: 'completed', createdAt: '2025-06-20', cost: 25 },
      { id: 2, name: 'סרטון שיווק למשרד', type: 'video', status: 'active', createdAt: '2025-06-25', cost: 18 },
      { id: 3, name: 'תמונות לפייסבוק', type: 'image', status: 'completed', createdAt: '2025-06-15', cost: 12 }
    ],
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
    projects: [
      { id: 4, name: 'סרטוני הדרכה לעובדים', type: 'video', status: 'active', createdAt: '2025-06-01', cost: 89 },
      { id: 5, name: 'קמפיין פרסום דיגיטלי', type: 'image', status: 'completed', createdAt: '2025-05-15', cost: 45 },
      { id: 6, name: 'תוכן לרשתות חברתיות', type: 'video', status: 'completed', createdAt: '2025-05-10', cost: 67 },
      { id: 7, name: 'אנימציות למצגות', type: 'video', status: 'active', createdAt: '2025-06-20', cost: 34 }
    ],
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
    projects: [
      { id: 8, name: 'סרטון מוצר חדש', type: 'video', status: 'completed', createdAt: '2025-06-10', cost: 22 },
      { id: 9, name: 'תמונות לאתר', type: 'image', status: 'active', createdAt: '2025-06-18', cost: 15 }
    ],
    apiUsage: {
      openai: 45,
      elevenlabs: 25,
      runway: 15,
      dalle: 60
    }
  }
];

export default function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'GET':
      // Get all users or filter by query params
      const { filter, search } = req.query;
      let filteredUsers = [...mockUsers];

      if (filter && filter !== 'all') {
        if (filter === 'premium') {
          filteredUsers = filteredUsers.filter(user => user.plan === 'premium' || user.plan === 'enterprise');
        } else {
          filteredUsers = filteredUsers.filter(user => user.status === filter);
        }
      }

      if (search) {
        filteredUsers = filteredUsers.filter(user => 
          user.name.toLowerCase().includes(search.toLowerCase()) ||
          user.email.toLowerCase().includes(search.toLowerCase())
        );
      }

      // Calculate stats
      const stats = {
        totalUsers: mockUsers.length,
        activeUsers: mockUsers.filter(u => u.status === 'active').length,
        premiumUsers: mockUsers.filter(u => u.plan === 'premium' || u.plan === 'enterprise').length,
        totalRevenue: mockUsers.reduce((sum, user) => sum + user.totalSpent, 0),
        avgUsageTime: mockUsers.reduce((sum, user) => sum + user.usageTime, 0) / mockUsers.length
      };

      res.status(200).json({ users: filteredUsers, stats });
      break;

    case 'POST':
      // Create new user
      const newUser = {
        id: mockUsers.length + 1,
        ...req.body,
        registeredAt: new Date().toISOString().split('T')[0],
        lastLogin: new Date().toISOString().split('T')[0],
        projects: [],
        apiUsage: { openai: 0, elevenlabs: 0, runway: 0, dalle: 0 }
      };

      mockUsers.push(newUser);
      res.status(201).json({ success: true, user: newUser });
      break;

    case 'PUT':
      // Update user
      const { id } = req.query;
      const userIndex = mockUsers.findIndex(user => user.id === parseInt(id));
      
      if (userIndex === -1) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }

      mockUsers[userIndex] = { ...mockUsers[userIndex], ...req.body };
      res.status(200).json({ success: true, user: mockUsers[userIndex] });
      break;

    case 'DELETE':
      // Delete user
      const { id: deleteId } = req.query;
      const deleteIndex = mockUsers.findIndex(user => user.id === parseInt(deleteId));
      
      if (deleteIndex === -1) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }

      const deletedUser = mockUsers.splice(deleteIndex, 1)[0];
      res.status(200).json({ success: true, user: deletedUser });
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
