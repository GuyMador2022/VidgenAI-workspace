import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [productForm, setProductForm] = useState({
    name: '',
    description: '',
    price: '',
    category: 'product',
    image: '',
    features: [],
    isActive: true
  });
  const [newFeature, setNewFeature] = useState('');
  const router = useRouter();

  // Categories for products/services
  const categories = [
    { id: 'all', name: 'הכל', icon: '📦' },
    { id: 'product', name: 'מוצרים', icon: '🛍️' },
    { id: 'service', name: 'שירותים', icon: '⚙️' },
    { id: 'digital', name: 'מוצרים דיגיטליים', icon: '💻' },
    { id: 'consultation', name: 'ייעוץ', icon: '🤝' },
    { id: 'course', name: 'קורסים', icon: '📚' },
    { id: 'subscription', name: 'מנויים', icon: '🔄' }
  ];

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    setLoading(true);
    try {
      // Mock data - in real app this would come from API
      const mockProducts = [
        {
          id: 1,
          name: 'קורס שיווק דיגיטלי',
          description: 'קורס מקיף ללימוד שיווק דיגיטלי מהבסיס ועד לרמה מתקדמת',
          price: 499,
          category: 'course',
          image: 'https://via.placeholder.com/300x200/3b82f6/ffffff?text=קורס+שיווק',
          features: ['8 מודולים', '24 שעות תוכן', 'תעודה מוכרת', 'תמיכה אישית'],
          isActive: true,
          createdAt: '2025-06-01'
        },
        {
          id: 2,
          name: 'שירותי ניהול רשתות חברתיות',
          description: 'ניהול מקצועי של דפי הפייסבוק, אינסטגרם ולינקדאין',
          price: 2500,
          category: 'service',
          image: 'https://via.placeholder.com/300x200/10b981/ffffff?text=ניהול+רשתות',
          features: ['פוסטים יומיים', 'עיצוב גרפי', 'מעקב אחר תוצאות', 'דוחות חודשיים'],
          isActive: true,
          createdAt: '2025-06-05'
        },
        {
          id: 3,
          name: 'תוכנת CRM מותאמת',
          description: 'מערכת לניהול לקוחות בהתאמה אישית לעסק שלך',
          price: 5000,
          category: 'digital',
          image: 'https://via.placeholder.com/300x200/8b5cf6/ffffff?text=CRM+System',
          features: ['התאמה אישית', 'אינטגרציה', 'הדרכות', 'תמיכה שנתית'],
          isActive: true,
          createdAt: '2025-06-10'
        },
        {
          id: 4,
          name: 'ייעוץ אסטרטגי עסקי',
          description: 'ייעוץ אישי לפיתוח אסטרטגיית עסק וגידול',
          price: 1200,
          category: 'consultation',
          image: 'https://via.placeholder.com/300x200/f59e0b/ffffff?text=ייעוץ+עסקי',
          features: ['פגישות זום', 'תכנית עבודה', 'מעקב חודשי', 'תמיכה בוואטסאפ'],
          isActive: true,
          createdAt: '2025-06-15'
        },
        {
          id: 5,
          name: 'מנוי פרימיום VidGenAI',
          description: 'מנוי מתקדם ליצירת סרטונים ללא הגבלה',
          price: 299,
          category: 'subscription',
          image: 'https://via.placeholder.com/300x200/ef4444/ffffff?text=VidGenAI+Pro',
          features: ['סרטונים בלתי מוגבלים', 'קולות AI מתקדמים', 'תמיכה מהירה', 'ללא לוגו'],
          isActive: true,
          createdAt: '2025-06-20'
        }
      ];

      setProducts(mockProducts);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAddFeature = () => {
    if (newFeature.trim()) {
      setProductForm(prev => ({
        ...prev,
        features: [...prev.features, newFeature.trim()]
      }));
      setNewFeature('');
    }
  };

  const handleRemoveFeature = (index) => {
    setProductForm(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const productData = {
        ...productForm,
        price: parseFloat(productForm.price),
        id: editingProduct ? editingProduct.id : Date.now(),
        createdAt: editingProduct ? editingProduct.createdAt : new Date().toISOString().split('T')[0]
      };

      if (editingProduct) {
        // Update existing product
        setProducts(prev => prev.map(p => p.id === editingProduct.id ? productData : p));
      } else {
        // Add new product
        setProducts(prev => [...prev, productData]);
      }

      resetForm();
      setShowAddModal(false);
      setEditingProduct(null);
    } catch (error) {
      console.error('Error saving product:', error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setProductForm({
      name: '',
      description: '',
      price: '',
      category: 'product',
      image: '',
      features: [],
      isActive: true
    });
    setNewFeature('');
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setProductForm({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      category: product.category,
      image: product.image,
      features: [...product.features],
      isActive: product.isActive
    });
    setShowAddModal(true);
  };

  const handleDelete = (product) => {
    if (confirm(`האם אתה בטוח שברצונך למחוק את "${product.name}"?`)) {
      setProducts(prev => prev.filter(p => p.id !== product.id));
    }
  };

  const handleCreateVideo = (product) => {
    // Navigate to campaign creation with product data
    router.push({
      pathname: '/create-campaign',
      query: {
        productName: product.name,
        productDescription: product.description,
        productPrice: product.price,
        productFeatures: product.features.join(', ')
      }
    });
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('he-IL', {
      style: 'currency',
      currency: 'ILS'
    }).format(price);
  };

  const getCategoryIcon = (categoryId) => {
    const category = categories.find(c => c.id === categoryId);
    return category ? category.icon : '📦';
  };

  const getCategoryName = (categoryId) => {
    const category = categories.find(c => c.id === categoryId);
    return category ? category.name : 'לא מוגדר';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>סל מוצרים ושירותים - VidGenAI</title>
        <meta name="description" content="נהל את סל המוצרים והשירותים שלך ויצור סרטוני שיווק מותאמים" />
        <style jsx>{`
          .line-clamp-2 {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
          .product-card {
            min-height: 420px;
          }
          .product-card .product-content {
            height: 100%;
            display: flex;
            flex-direction: column;
          }
          .product-card .product-actions {
            margin-top: auto;
          }
        `}</style>
      </Head>

      {/* Header */}
      <div className="bg-white shadow">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">סל מוצרים ושירותים</h1>
              <p className="text-gray-600">נהל את המוצרים והשירותים שלך ויצור עבורם סרטוני שיווק</p>
            </div>
            <div className="flex space-x-4 space-x-reverse">
              <button
                onClick={() => setShowAddModal(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition duration-200 flex items-center gap-2"
              >
                <span>➕</span>
                הוסף מוצר/שירות
              </button>
              <Link href="/admin" className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition duration-200 flex items-center gap-2">
                <span>⚙️</span>
                ניהול
              </Link>
              <Link href="/" className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition duration-200 flex items-center gap-2">
                <span>🏠</span>
                דשבורד
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border-r-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">סה״כ מוצרים</p>
                <p className="text-2xl font-bold text-gray-900">{products.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">📦</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-r-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">מוצרים פעילים</p>
                <p className="text-2xl font-bold text-gray-900">{products.filter(p => p.isActive).length}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">✅</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-r-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">שירותים</p>
                <p className="text-2xl font-bold text-gray-900">{products.filter(p => p.category === 'service').length}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">⚙️</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-r-4 border-orange-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">מחיר ממוצע</p>
                <p className="text-2xl font-bold text-gray-900">
                  {products.length > 0 ? formatPrice(products.reduce((sum, p) => sum + p.price, 0) / products.length) : '₪0'}
                </p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">💰</span>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-wrap gap-4 justify-between items-center">
            <div className="flex gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">חיפוש:</label>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="חפש מוצר או שירות..."
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">קטגוריה:</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.icon} {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-600">
                מציג {filteredProducts.length} מתוך {products.length} פריטים
              </div>
              
              <div className="flex rounded-lg border border-gray-300 overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-3 py-2 text-sm font-medium transition-colors ${
                    viewMode === 'grid' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  🔳 רשת
                </button>
                <button
                  onClick={() => setViewMode('table')}
                  className={`px-3 py-2 text-sm font-medium transition-colors ${
                    viewMode === 'table' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  📋 טבלה
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Products Display */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📦</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">אין מוצרים להצגה</h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || selectedCategory !== 'all' 
                ? 'לא נמצאו מוצרים בחיפוש הנוכחי' 
                : 'הוסף את המוצר או השירות הראשון שלך'}
            </p>
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition duration-200"
            >
              הוסף מוצר/שירות
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow product-card">
                {/* Category Icon Header */}
                <div className="relative bg-gradient-to-br from-blue-50 to-blue-100 h-32 flex items-center justify-center">
                  <span className="text-6xl opacity-80">
                    {getCategoryIcon(product.category)}
                  </span>
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 text-xs font-semibold rounded-full bg-blue-100/90 text-blue-800 backdrop-blur-sm">
                      {getCategoryName(product.category)}
                    </span>
                  </div>
                </div>
                
                <div className="p-6 product-content">
                  <div className="mb-4">
                    <h3 className="text-lg font-bold text-gray-900 mb-2 min-h-[2.5rem] line-clamp-2">{product.name}</h3>
                    <p className="text-gray-600 text-sm mb-3 min-h-[2.5rem] line-clamp-2">{product.description}</p>
                  </div>
                  
                  {/* Status - moved to below title */}
                  <div className="mb-4">
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      product.isActive 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {product.isActive ? 'פעיל' : 'לא פעיל'}
                    </span>
                  </div>
                  
                  <div className="mb-4 flex-grow">
                    <p className="text-xs text-gray-500 mb-2">תכונות עיקריות:</p>
                    <div className="flex flex-wrap gap-1">
                      {product.features.slice(0, 3).map((feature, index) => (
                        <span key={index} className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full">
                          {feature}
                        </span>
                      ))}
                      {product.features.length > 3 && (
                        <span className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full">
                          +{product.features.length - 3} עוד
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="product-actions">
                    <div className="flex items-center justify-between mb-4 pt-2 border-t border-gray-100">
                      <span className="text-2xl font-bold text-blue-600">{formatPrice(product.price)}</span>
                      <span className="text-sm text-gray-500">{product.createdAt}</span>
                    </div>
                    
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleCreateVideo(product)}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2.5 rounded-lg text-sm font-medium transition duration-200 flex items-center justify-center gap-2"
                      >
                        <span>🎬</span>
                        צור סרטון
                      </button>
                      <button
                        onClick={() => handleEdit(product)}
                        className="px-3 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm transition duration-200 flex items-center justify-center"
                        title="ערוך מוצר"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => handleDelete(product)}
                        className="px-3 py-2.5 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg text-sm transition duration-200 flex items-center justify-center"
                        title="מחק מוצר"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Table View */
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-right font-semibold text-gray-900">שם</th>
                    <th className="px-6 py-4 text-right font-semibold text-gray-900">קטגוריה</th>
                    <th className="px-6 py-4 text-right font-semibold text-gray-900">מחיר</th>
                    <th className="px-6 py-4 text-right font-semibold text-gray-900">תיאור</th>
                    <th className="px-6 py-4 text-right font-semibold text-gray-900">סטטוס</th>
                    <th className="px-6 py-4 text-right font-semibold text-gray-900">פעולות</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredProducts.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3 space-x-reverse">
                          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center flex-shrink-0">
                            <span className="text-2xl">
                              {getCategoryIcon(product.category)}
                            </span>
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="font-medium text-gray-900 truncate">{product.name}</p>
                            <p className="text-xs text-gray-500">{product.createdAt}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                          <span className="ml-2">{getCategoryIcon(product.category)}</span>
                          <span>{getCategoryName(product.category)}</span>
                        </span>
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-900">
                        {formatPrice(product.price)}
                      </td>
                      <td className="px-6 py-4 text-gray-600 max-w-xs truncate">
                        {product.description}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          product.isActive 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {product.isActive ? 'פעיל' : 'לא פעיל'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3 space-x-reverse">
                          <button
                            onClick={() => handleCreateVideo(product)}
                            className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 py-2 rounded-lg text-sm font-medium transition duration-200 flex items-center gap-1"
                            title="צור סרטון"
                          >
                            <span>🎬</span>
                            <span className="hidden sm:inline">צור סרטון</span>
                          </button>
                          <button
                            onClick={() => handleEdit(product)}
                            className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-lg text-sm transition duration-200"
                            title="ערוך מוצר"
                          >
                            ✏️
                          </button>
                          <button
                            onClick={() => handleDelete(product)}
                            className="bg-red-100 hover:bg-red-200 text-red-700 px-3 py-2 rounded-lg text-sm transition duration-200"
                            title="מחק מוצר"
                          >
                            🗑️
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Add/Edit Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-screen overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-gray-900">
                  {editingProduct ? 'ערוך מוצר/שירות' : 'הוסף מוצר/שירות חדש'}
                </h3>
                <button
                  onClick={() => {
                    setShowAddModal(false);
                    setEditingProduct(null);
                    resetForm();
                  }}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      שם המוצר/שירות *
                    </label>
                    <input
                      type="text"
                      required
                      value={productForm.name}
                      onChange={(e) => setProductForm(prev => ({...prev, name: e.target.value}))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="למשל: קורס שיווק דיגיטלי"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      מחיר (₪) *
                    </label>
                    <input
                      type="number"
                      required
                      min="0"
                      step="0.01"
                      value={productForm.price}
                      onChange={(e) => setProductForm(prev => ({...prev, price: e.target.value}))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="0.00"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    קטגוריה *
                  </label>
                  <select
                    required
                    value={productForm.category}
                    onChange={(e) => setProductForm(prev => ({...prev, category: e.target.value}))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {categories.filter(c => c.id !== 'all').map(category => (
                      <option key={category.id} value={category.id}>
                        {category.icon} {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    תיאור *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={productForm.description}
                    onChange={(e) => setProductForm(prev => ({...prev, description: e.target.value}))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="תאר את המוצר או השירות בפירוט..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    תמונה (URL)
                  </label>
                  <input
                    type="url"
                    value={productForm.image}
                    onChange={(e) => setProductForm(prev => ({...prev, image: e.target.value}))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    תכונות ויתרונות
                  </label>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={newFeature}
                      onChange={(e) => setNewFeature(e.target.value)}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="הוסף תכונה או יתרון..."
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddFeature())}
                    />
                    <button
                      type="button"
                      onClick={handleAddFeature}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      הוסף
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {productForm.features.map((feature, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full"
                      >
                        {feature}
                        <button
                          type="button"
                          onClick={() => handleRemoveFeature(index)}
                          className="mr-2 text-blue-600 hover:text-blue-800"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="isActive"
                    checked={productForm.isActive}
                    onChange={(e) => setProductForm(prev => ({...prev, isActive: e.target.checked}))}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="isActive" className="mr-3 block text-sm text-gray-700">
                    מוצר פעיל
                  </label>
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition duration-200 disabled:opacity-50"
                  >
                    {loading ? 'שומר...' : (editingProduct ? 'עדכן' : 'הוסף')}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddModal(false);
                      setEditingProduct(null);
                      resetForm();
                    }}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition duration-200"
                  >
                    ביטול
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

