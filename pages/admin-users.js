import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function AdminUsers() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all') // all, active, inactive, premium
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedUser, setSelectedUser] = useState(null)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    loadUsers()
  }, [])

  const loadUsers = async () => {
    try {
      // Mock data - in real app this would come from API
      const mockUsers = [
        {
          id: 1,
          name: 'יוסי כהן',
          email: 'yossi@example.com',
          status: 'active',
          plan: 'premium',
          joinDate: '2025-01-15',
          videosCreated: 24,
          totalSpent: 1200,
          lastLogin: '2025-06-28'
        },
        {
          id: 2,
          name: 'שרה לוי',
          email: 'sara@example.com',
          status: 'active',
          plan: 'basic',
          joinDate: '2025-02-10',
          videosCreated: 8,
          totalSpent: 150,
          lastLogin: '2025-06-25'
        },
        {
          id: 3,
          name: 'דוד מלכה',
          email: 'david@example.com',
          status: 'inactive',
          plan: 'premium',
          joinDate: '2024-12-05',
          videosCreated: 45,
          totalSpent: 2500,
          lastLogin: '2025-05-15'
        },
        {
          id: 4,
          name: 'רות אברהם',
          email: 'ruth@example.com',
          status: 'active',
          plan: 'basic',
          joinDate: '2025-03-20',
          videosCreated: 12,
          totalSpent: 89,
          lastLogin: '2025-06-29'
        }
      ]

      setUsers(mockUsers)
    } catch (error) {
      console.error('Error loading users:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredUsers = users.filter(user => {
    const matchesFilter = filter === 'all' || user.status === filter || user.plan === filter
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         user.email.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const handleUserAction = (action, user) => {
    setSelectedUser(user)
    switch (action) {
      case 'view':
        setShowModal(true)
        break
      case 'edit':
        console.log('Edit user:', user.name)
        break
      case 'delete':
        if (confirm(`האם אתה בטוח שברצונך למחוק את המשתמש "${user.name}"?`)) {
          console.log('Delete user:', user.name)
        }
        break
      case 'suspend':
        console.log('Suspend user:', user.name)
        break
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'inactive': return 'bg-red-100 text-red-800'
      case 'suspended': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPlanColor = (plan) => {
    switch (plan) {
      case 'premium': return 'bg-purple-100 text-purple-800'
      case 'basic': return 'bg-blue-100 text-blue-800'
      case 'trial': return 'bg-orange-100 text-orange-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('he-IL', {
      style: 'currency',
      currency: 'ILS'
    }).format(amount)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">טוען נתוני משתמשים...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <Head>
        <title>ניהול משתמשים - VidGenAI Admin</title>
        <meta name="description" content="ניהול מתקדם של משתמשי המערכת" />
      </Head>

      {/* Admin Navigation */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4">
          <div className="flex gap-6 py-4">
            <Link 
              href="/admin-users" 
              className="text-blue-600 font-semibold border-b-2 border-blue-600 pb-2"
            >
              👥 ניהול משתמשים
            </Link>
            <Link 
              href="/admin-analytics" 
              className="text-gray-600 hover:text-blue-600 pb-2 transition-colors"
            >
              📊 אנליטיקה
            </Link>
            <Link 
              href="/admin" 
              className="text-gray-600 hover:text-blue-600 pb-2 transition-colors"
            >
              🔑 API Keys
            </Link>
            <Link 
              href="/admin-pricing" 
              className="text-gray-600 hover:text-blue-600 pb-2 transition-colors"
            >
              💎 עדכון תמחור
            </Link>
            <Link 
              href="/admin-campaigns" 
              className="text-gray-600 hover:text-blue-600 pb-2 transition-colors"
            >
              🎯 קמפיינים אדמין
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">ניהול משתמשים</h1>
          <p className="text-gray-600">ניהול מתקדם של כל משתמשי המערכת</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">👥</span>
              </div>
              <div className="mr-4">
                <p className="text-sm font-medium text-gray-600">סה״כ משתמשים</p>
                <p className="text-2xl font-bold text-gray-900">{users.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">✓</span>
              </div>
              <div className="mr-4">
                <p className="text-sm font-medium text-gray-600">משתמשים פעילים</p>
                <p className="text-2xl font-bold text-gray-900">{users.filter(u => u.status === 'active').length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">⭐</span>
              </div>
              <div className="mr-4">
                <p className="text-sm font-medium text-gray-600">משתמשי פרימיום</p>
                <p className="text-2xl font-bold text-gray-900">{users.filter(u => u.plan === 'premium').length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">💰</span>
              </div>
              <div className="mr-4">
                <p className="text-sm font-medium text-gray-600">סה״כ הכנסות</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(users.reduce((sum, u) => sum + u.totalSpent, 0))}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">סינון:</label>
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">כל המשתמשים</option>
                  <option value="active">פעילים</option>
                  <option value="inactive">לא פעילים</option>
                  <option value="premium">פרימיום</option>
                  <option value="basic">בסיסי</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">חיפוש:</label>
                <input
                  type="text"
                  placeholder="חפש לפי שם או אימייל..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="text-sm text-gray-600">
              מציג {filteredUsers.length} מתוך {users.length} משתמשים
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    משתמש
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    סטטוס
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    תוכנית
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    וידאו נוצרו
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    סה״כ הוצאות
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    התחברות אחרונה
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    פעולות
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                        <div className="text-xs text-gray-400">הצטרף: {user.joinDate}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(user.status)}`}>
                        {user.status === 'active' ? 'פעיל' : 'לא פעיל'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPlanColor(user.plan)}`}>
                        {user.plan === 'premium' ? 'פרימיום' : 'בסיסי'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {user.videosCreated}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatCurrency(user.totalSpent)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.lastLogin}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleUserAction('view', user)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          צפה
                        </button>
                        <button
                          onClick={() => handleUserAction('edit', user)}
                          className="text-green-600 hover:text-green-900"
                        >
                          ערוך
                        </button>
                        <button
                          onClick={() => handleUserAction('suspend', user)}
                          className="text-yellow-600 hover:text-yellow-900"
                        >
                          השהה
                        </button>
                        <button
                          onClick={() => handleUserAction('delete', user)}
                          className="text-red-600 hover:text-red-900"
                        >
                          מחק
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* User Details Modal */}
        {showModal && selectedUser && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
              <div className="mt-3">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-900">פרטי משתמש</h3>
                  <button
                    onClick={() => setShowModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">שם:</label>
                    <p className="text-sm text-gray-900">{selectedUser.name}</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">אימייל:</label>
                    <p className="text-sm text-gray-900">{selectedUser.email}</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">סטטוס:</label>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedUser.status)}`}>
                      {selectedUser.status === 'active' ? 'פעיל' : 'לא פעיל'}
                    </span>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">תוכנית:</label>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPlanColor(selectedUser.plan)}`}>
                      {selectedUser.plan === 'premium' ? 'פרימיום' : 'בסיסי'}
                    </span>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">וידאו נוצרו:</label>
                    <p className="text-sm text-gray-900">{selectedUser.videosCreated}</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">סה״כ הוצאות:</label>
                    <p className="text-sm text-gray-900">{formatCurrency(selectedUser.totalSpent)}</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">תאריך הצטרפות:</label>
                    <p className="text-sm text-gray-900">{selectedUser.joinDate}</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">התחברות אחרונה:</label>
                    <p className="text-sm text-gray-900">{selectedUser.lastLogin}</p>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-end">
                  <button
                    onClick={() => setShowModal(false)}
                    className="bg-gray-500 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition duration-200"
                  >
                    סגור
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
