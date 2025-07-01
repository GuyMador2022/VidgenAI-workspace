import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

// Product Selector Component
function ProductSelector({ onProductSelect, selectedProduct }) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    features: ''
  })

  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = () => {
    // Simulate loading products from localStorage or API
    try {
      const savedProducts = localStorage.getItem('user-products')
      if (savedProducts) {
        setProducts(JSON.parse(savedProducts))
      } else {
        // Default demo products
        setProducts([
          {
            id: 1,
            name: "קורס בינה מלאכותית מתקדם",
            description: "קורס מקיף ללמידת AI ו-Machine Learning",
            price: "1499",
            features: "30 שיעורים, תעודת סיום, תמיכה אישית"
          },
          {
            id: 2,
            name: "תוכנת ניהול לקוחות",
            description: "פתרון CRM מותאם לעסקים קטנים",
            price: "299",
            features: "ניהול לידים, דוחות מתקדמים, אפליקציה ניידת"
          },
          {
            id: 3,
            name: "שירותי עיצוב גרפי",
            description: "עיצוב מקצועי לעסקים ולוגו וברנדינג",
            price: "899",
            features: "לוגו, כרטיס ביקור, ערכת ברנדינג מלאה"
          },
          {
            id: 4,
            name: "קורס שיווק דיגיטלי",
            description: "למידת שיווק ברשתות החברתיות",
            price: "799",
            features: "20 שיעורים, כלים מתקדמים, תעודת הסמכה"
          },
          {
            id: 5,
            name: "אפליקציה לניהול משימות",
            description: "אפליקציית פרודקטיביות לעסקים",
            price: "199",
            features: "ניהול צוותים, תזכורות, דוחות התקדמות"
          }
        ])
      }
    } catch (error) {
      console.error('Error loading products:', error)
      setProducts([])
    } finally {
      setLoading(false)
    }
  }

  const saveProducts = (updatedProducts) => {
    localStorage.setItem('user-products', JSON.stringify(updatedProducts))
    setProducts(updatedProducts)
  }

  const addProduct = () => {
    if (!newProduct.name.trim() || !newProduct.description.trim() || !newProduct.price.trim()) {
      alert('יש למלא את כל השדות החובה')
      return
    }

    const product = {
      id: Date.now(),
      ...newProduct,
      features: newProduct.features || 'לא צוינו תכונות'
    }

    const updatedProducts = [...products, product]
    saveProducts(updatedProducts)
    setNewProduct({ name: '', description: '', price: '', features: '' })
    setShowAddForm(false)
    onProductSelect(product) // Auto-select the new product
  }

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="text-gray-600 mt-4">טוען מוצרים...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {products.length === 0 ? (
        // No products - show add product form
        <div className="text-center">
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-8 mb-6">
            <div className="text-6xl mb-4">📦</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">עדיין לא הוספתם מוצרים</h3>
            <p className="text-gray-600 mb-4">כדי ליצור קמפיין, עליכם להגדיר לפחות מוצר אחד</p>
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-200 font-medium"
            >
              הוסף מוצר ראשון →
            </button>
          </div>
        </div>
      ) : (
        // Show products grid
        <div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {products.map(product => (
              <div
                key={product.id}
                onClick={() => onProductSelect(product)}
                className={`p-6 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                  selectedProduct?.id === product.id
                    ? 'border-green-500 bg-green-50 shadow-lg transform scale-105'
                    : 'border-gray-200 hover:border-blue-300 hover:shadow-md hover:transform hover:scale-102'
                }`}
              >
                {selectedProduct?.id === product.id && (
                  <div className="text-green-600 text-xl mb-2 text-center">✅ נבחר</div>
                )}
                <div className="text-center mb-3">
                  <div className="text-3xl mb-2">📦</div>
                  <h4 className="font-semibold text-gray-800 mb-2">{product.name}</h4>
                </div>
                <p className="text-gray-600 text-sm mb-3 text-center">{product.description}</p>
                <div className="text-center mb-3">
                  <p className="text-blue-600 font-bold text-lg">{product.price}₪</p>
                </div>
                <p className="text-gray-500 text-xs text-center bg-gray-50 p-2 rounded">{product.features}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-purple-100 hover:bg-purple-200 text-purple-700 px-6 py-3 rounded-lg transition duration-200 flex items-center gap-2 mx-auto font-medium"
            >
              <span>➕</span>
              הוסף מוצר חדש לסל
            </button>
          </div>
        </div>
      )}

      {/* Add Product Form */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-96 overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">הוספת מוצר חדש</h3>
                <button
                  onClick={() => setShowAddForm(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    שם המוצר *
                  </label>
                  <input
                    type="text"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="לדוגמה: קורס דיגיטל מרקטינג"
                    dir="rtl"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    תיאור המוצר *
                  </label>
                  <textarea
                    value={newProduct.description}
                    onChange={(e) => setNewProduct(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    rows="3"
                    placeholder="תיאור קצר של המוצר..."
                    dir="rtl"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    מחיר (₪) *
                  </label>
                  <input
                    type="number"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct(prev => ({ ...prev, price: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="299"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    תכונות עיקריות
                  </label>
                  <textarea
                    value={newProduct.features}
                    onChange={(e) => setNewProduct(prev => ({ ...prev, features: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    rows="2"
                    placeholder="רשימת תכונות המוצר..."
                    dir="rtl"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={addProduct}
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
                  >
                    הוסף מוצר
                  </button>
                  <button
                    onClick={() => setShowAddForm(false)}
                    className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition duration-200"
                  >
                    ביטול
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default function CreateCampaign() {
  const [currentStep, setCurrentStep] = useState(0) // Start from step 0 for product selection
  const [formData, setFormData] = useState({
    // Step 1: Campaign Info
    campaignName: '',
    campaignGoal: '',
    targetAudience: '',
    
    // Step 2: Content Details
    contentType: 'video',
    topic: '',
    tone: 'professional',
    duration: '60-90',
    
    // Step 3: Product/Service (if applicable)
    hasProduct: false,
    productData: null,
    
    // Step 4: Advanced Settings
    platforms: [],
    budget: '',
    timeline: '',
    postingTimes: '',
    keywords: '',
    
    // Step 5: Content Generation
    generatedContent: null
  })
  
  const [isGenerating, setIsGenerating] = useState(false)
  const [errors, setErrors] = useState({})
  const [audienceInsights, setAudienceInsights] = useState(null)
  const [loadingInsights, setLoadingInsights] = useState(false)
  const [saveStatus, setSaveStatus] = useState('') // New: Auto-save status
  const [suggestions, setSuggestions] = useState([]) // New: AI suggestions
  const [selectedInsights, setSelectedInsights] = useState({
    painPoints: [],
    typicalMessages: [],
    postingTimes: [],
    commonLanguage: []
  }) // New: Selected insights from audience analysis
  const router = useRouter()

  const totalSteps = 5 // Updated to exclude old product selection step
  const progressPercentage = currentStep === 0 ? 0 : ((currentStep / 4) * 100) // Don't count step 0 in progress

  // New: Auto-save functionality
  useEffect(() => {
    const saveTimer = setTimeout(() => {
      if (formData.campaignName || formData.topic || formData.targetAudience) {
        localStorage.setItem('campaign-draft', JSON.stringify({
          formData,
          selectedInsights,
          currentStep,
          timestamp: new Date().toISOString()
        }))
        setSaveStatus('נשמר אוטומטית')
        setTimeout(() => setSaveStatus(''), 2000)
      }
    }, 2000)

    return () => clearTimeout(saveTimer)
  }, [formData, selectedInsights, currentStep])

  // New: Load draft on mount
  useEffect(() => {
    const savedDraft = localStorage.getItem('campaign-draft')
    if (savedDraft && !router.query.productName) {
      try {
        const draft = JSON.parse(savedDraft)
        const draftAge = new Date() - new Date(draft.timestamp)
        
        // Only load if draft is less than 24 hours old
        if (draftAge < 24 * 60 * 60 * 1000) {
          const shouldLoad = confirm('נמצא טיוטא שמורה. האם תרצה להמשיך מהמקום שבו עצרת?')
          if (shouldLoad) {
            setFormData(draft.formData)
            setCurrentStep(draft.currentStep)
            if (draft.selectedInsights) {
              setSelectedInsights(draft.selectedInsights)
            }
          }
        }
      } catch (error) {
        console.error('Error loading draft:', error)
      }
    }
  }, [])

  useEffect(() => {
    // Check if we have product data from URL params
    if (router.query.productName) {
      const productData = {
        name: router.query.productName,
        description: router.query.productDescription,
        price: router.query.productPrice,
        features: router.query.productFeatures
      }
      
      setFormData(prev => {
        // Only auto-fill topic if it's currently empty, otherwise preserve existing content
        const shouldAutoFillTopic = !prev.topic.trim()
        // Only auto-fill campaign name if it's currently empty
        const shouldAutoFillName = !prev.campaignName.trim()
        
        return {
          ...prev,
          hasProduct: true,
          productData: productData,
          topic: shouldAutoFillTopic 
            ? `קידום ${productData.name} - ${productData.description}. מחיר: ${productData.price}₪`
            : prev.topic, // Keep existing content
          campaignName: shouldAutoFillName 
            ? `קמפיין ${productData.name}`
            : prev.campaignName // Keep existing name
        }
      })
      
      // If coming with product data, skip to step 2
      setCurrentStep(2)
    }
  }, [router.query])

  const steps = [
    { id: 0, title: 'בחירת מוצר', icon: '🛍️', description: 'בחירת מוצר מהסל (חובה)' },
    { id: 1, title: 'פרטי קמפיין', icon: '🎯', description: 'הגדרת מטרות וקהל יעד' },
    { id: 2, title: 'סוג תוכן', icon: '📝', description: 'בחירת סוג התוכן ונושא' },
    { id: 3, title: 'הגדרות מתקדמות', icon: '⚙️', description: 'פלטפורמות ותקציב' },
    { id: 4, title: 'יצירת תוכן', icon: '🎬', description: 'יצירה והשלמה' }
  ]

  const campaignGoals = [
    { id: 'awareness', name: 'הגברת מודעות למותג', icon: '👁️' },
    { id: 'leads', name: 'יצירת לידים', icon: '🎯' },
    { id: 'sales', name: 'הגדלת מכירות', icon: '💰' },
    { id: 'engagement', name: 'חיזוק מעורבות', icon: '❤️' },
    { id: 'traffic', name: 'הגדלת תנועה לאתר', icon: '📈' },
    { id: 'retention', name: 'שימור לקוחות', icon: '🔄' }
  ]

  const contentTypes = [
    { id: 'video', name: 'סרטון שיווקי', icon: '🎬', description: 'סרטון עם תסריט, תמונות וקול' },
    { id: 'image', name: 'תמונה שיווקית', icon: '🖼️', description: 'תמונה עם טקסט וגרפיקה' },
    { id: 'text', name: 'תוכן טקסטואלי', icon: '📄', description: 'פוסט או מאמר שיווקי' },
    { id: 'carousel', name: 'קרוסלה', icon: '🎠', description: 'סדרת תמונות/כרטיסים' }
  ]

  const toneOptions = [
    { id: 'professional', name: 'מקצועי', icon: '👔' },
    { id: 'friendly', name: 'ידידותי', icon: '😊' },
    { id: 'energetic', name: 'אנרגטי', icon: '⚡' },
    { id: 'luxury', name: 'יוקרתי', icon: '💎' },
    { id: 'casual', name: 'נינוח', icon: '😎' },
    { id: 'urgent', name: 'דחוף', icon: '🚨' }
  ]

  const platforms = [
    { id: 'facebook', name: 'Facebook', icon: '📘' },
    { id: 'instagram', name: 'Instagram', icon: '📸' },
    { id: 'linkedin', name: 'LinkedIn', icon: '💼' },
    { id: 'tiktok', name: 'TikTok', icon: '🎵' },
    { id: 'youtube', name: 'YouTube', icon: '📺' },
    { id: 'whatsapp', name: 'WhatsApp', icon: '📱' }
  ]

  const validateStep = (step) => {
    const newErrors = {}
    
    switch (step) {
      case 0:
        // Product selection is mandatory
        if (!formData.hasProduct || !formData.productData) {
          newErrors.product = 'יש לבחור מוצר מהסל או להוסיף מוצר חדש'
        }
        break
      case 1:
        if (!formData.campaignName.trim()) newErrors.campaignName = 'שם הקמפיין נדרש'
        if (!formData.campaignGoal) newErrors.campaignGoal = 'יש לבחור מטרה לקמפיין'
        if (!formData.targetAudience.trim()) newErrors.targetAudience = 'תיאור קהל היעד נדרש'
        break
      case 2:
        if (!formData.topic.trim()) newErrors.topic = 'נושא התוכן נדרש'
        break
      case 3:
        if (formData.platforms.length === 0) newErrors.platforms = 'יש לבחור לפחות פלטפורמה אחת'
        break
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const nextStep = () => {
    if (validateStep(currentStep)) {
      if (currentStep < 4) { // Updated max step
        setCurrentStep(currentStep + 1)
      }
    }
  }

  const prevStep = () => {
    if (currentStep > 0) { // Updated min step
      setCurrentStep(currentStep - 1)
    }
  }

  const updateFormData = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }))
    }
  }

  const togglePlatform = (platformId) => {
    const newPlatforms = formData.platforms.includes(platformId)
      ? formData.platforms.filter(p => p !== platformId)
      : [...formData.platforms, platformId]
    
    updateFormData('platforms', newPlatforms)
  }

  const fetchAudienceInsights = async (targetAudience) => {
    if (!targetAudience || !targetAudience.trim()) return
    
    setLoadingInsights(true)
    try {
      const response = await fetch('/api/audience-insights', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          targetAudience: targetAudience,
          campaignGoal: formData.campaignGoal,
          contentType: formData.contentType,
          platforms: formData.platforms
        })
      })
      
      const data = await response.json()
      if (data.success) {
        setAudienceInsights({
          ...data.insights,
          confidenceScore: data.confidenceScore,
          recommendations: data.recommendations,
          generatedAt: data.generatedAt
        })
      } else {
        console.error('Error fetching insights:', data.error)
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoadingInsights(false)
    }
  }

  // New: Fetch AI suggestions for form fields
  const fetchAISuggestions = async (field, currentValue = '') => {
    console.log(`🤖 Fetching AI suggestions for field: ${field}`)
    try {
      const response = await fetch('/api/ai-suggestions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          field: field,
          currentValue: currentValue,
          context: {
            campaignGoal: formData.campaignGoal,
            targetAudience: formData.targetAudience,
            productData: formData.productData,
            contentType: formData.contentType,
            selectedInsights: selectedInsights // Include selected insights
          }
        })
      })
      
      const data = await response.json()
      console.log('AI suggestions response:', data)
      if (data.success && data.suggestions) {
        console.log('Setting suggestions:', data.suggestions)
        console.log('Suggestions are array:', Array.isArray(data.suggestions))
        console.log('Suggestions length:', data.suggestions.length)
        setSuggestions(data.suggestions)
        console.log('State updated, current suggestions:', data.suggestions)
      } else {
        console.error('Error fetching AI suggestions:', data.error)
        setSuggestions([]) // Clear suggestions on error
      }
    } catch (error) {
      console.error('Error:', error)
      setSuggestions([]) // Clear suggestions on error
    }
  }

  // New: Apply suggestion to form field
  const applySuggestion = (field, suggestion) => {
    updateFormData(field, suggestion)
    setSuggestions([]) // Clear suggestions after applying
  }

  // New: Toggle selection of insights from audience analysis
  const toggleInsightSelection = (category, item) => {
    setSelectedInsights(prev => ({
      ...prev,
      [category]: prev[category].includes(item)
        ? prev[category].filter(selected => selected !== item)
        : [...prev[category], item]
    }))
  }

  // New: Apply selected insights to content topic
  const applySelectedInsightsToTopic = () => {
    let insightsText = ''
    
    if (selectedInsights.painPoints.length > 0) {
      insightsText += '\n\n--- נקודות כאב לטיפול ---\n'
      selectedInsights.painPoints.forEach(pain => {
        insightsText += `• ${pain}\n`
      })
    }
    
    if (selectedInsights.typicalMessages.length > 0) {
      insightsText += '\n--- הודעות שהקהל כותב ---\n'
      selectedInsights.typicalMessages.forEach(msg => {
        insightsText += `"${msg}"\n`
      })
    }
    
    if (selectedInsights.postingTimes.length > 0) {
      insightsText += '\n--- זמני פרסום מומלצים ---\n'
      selectedInsights.postingTimes.forEach(time => {
        insightsText += `⏰ ${time}\n`
      })
    }
    
    if (selectedInsights.commonLanguage.length > 0) {
      insightsText += '\n--- מילים מפתח לשימוש ---\n'
      insightsText += selectedInsights.commonLanguage.join(', ')
    }
    
    if (insightsText) {
      updateFormData('topic', formData.topic + insightsText)
      // Show confirmation
      alert('תובנות הקהל נוספו לתוכן בהצלחה! 🎯')
    }
  }

  // New: Generate topic suggestions based on selected insights
  const generateTopicFromInsights = () => {
    if (selectedInsights.painPoints.length === 0 && selectedInsights.typicalMessages.length === 0) {
      alert('יש לבחור לפחות נקודת כאב או הודעה טיפוסית')
      return
    }
    
    let generatedTopic = ''
    
    if (selectedInsights.painPoints.length > 0) {
      const mainPain = selectedInsights.painPoints[0]
      generatedTopic += `פתרון ל${mainPain} - `
    }
    
    if (selectedInsights.typicalMessages.length > 0) {
      const mainMessage = selectedInsights.typicalMessages[0]
      generatedTopic += `המדריך המלא לענות על השאלה: "${mainMessage}"`
    }
    
    if (formData.productData) {
      generatedTopic += `\n\nעם המוצר שלנו: ${formData.productData.name}`
    }
    
    updateFormData('topic', generatedTopic)
    setCurrentStep(2) // Move to content step
  }

  const generateContent = async (isDemo = false) => {
    if (!formData.topic.trim()) return
    
    setIsGenerating(true)
    try {
      const endpoint = isDemo ? '/api/generate-video-demo' : '/api/generate-video'
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          topic: formData.topic,
          productData: formData.productData,
          campaignData: {
            name: formData.campaignName,
            goal: formData.campaignGoal,
            audience: formData.targetAudience,
            tone: formData.tone,
            platforms: formData.platforms,
            contentType: formData.contentType
          }
        })
      })
      
      const data = await response.json()
      updateFormData('generatedContent', data)
      
      if (data.success || data.script) {
        // Results are shown in the same step
      }
    } catch (error) {
      console.error('Error:', error)
      updateFormData('generatedContent', { error: 'שגיאה ביצירת התוכן' })
    } finally {
      setIsGenerating(false)
    }
  }

  const generateVideo = generateContent // For backward compatibility

  // New: Auto-load AI suggestions when stepping into campaign name field
  useEffect(() => {
    if (currentStep === 2 && formData.targetAudience) {
      // Auto-load suggestions for campaign name when user has target audience
      fetchAISuggestions('campaignName', formData.campaignName)
    }
  }, [currentStep, formData.targetAudience])

  // New: Auto-load posting times and keywords suggestions in step 3
  useEffect(() => {
    if (currentStep === 3 && formData.targetAudience) { // Updated step number
      // Auto-load suggestions for posting times when reaching advanced settings
      fetchAISuggestions('postingTimes', formData.postingTimes)
    }
  }, [currentStep, formData.targetAudience])

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">בחירת מוצר לקמפיין</h2>
              <p className="text-gray-600">בחרו מוצר מהסל שלכם ליצירת קמפיין ממוקד</p>
            </div>

            {/* Error message if product not selected */}
            {errors.product && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <p className="text-red-800 text-center font-medium">{errors.product}</p>
              </div>
            )}

            {/* Products Grid */}
            <ProductSelector 
              onProductSelect={(product) => {
                updateFormData('productData', product)
                updateFormData('hasProduct', true)
              }}
              selectedProduct={formData.productData}
            />

            {/* Show selected product confirmation */}
            {formData.productData && (
              <div className="mt-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl shadow-lg p-6 border border-green-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                    ✅ המוצר שנבחר לקמפיין
                  </h3>
                  <button
                    onClick={() => {
                      updateFormData('productData', null)
                      updateFormData('hasProduct', false)
                    }}
                    className="text-gray-500 hover:text-gray-700 p-1"
                    title="בטל בחירה"
                  >
                    ✕
                  </button>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">{formData.productData.name}</h4>
                    <p className="text-gray-600 text-sm mb-2">{formData.productData.description}</p>
                    <p className="text-blue-600 font-bold">{formData.productData.price}₪</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">תכונות עיקריות:</p>
                    <p className="text-sm text-gray-800">{formData.productData.features}</p>
                  </div>
                </div>

                <div className="mt-4 text-center">
                  <p className="text-green-700 text-sm mb-3">
                    🎯 המוצר נבחר בהצלחה! כעת תוכלו להמשיך ליצירת הקמפיין
                  </p>
                </div>
              </div>
            )}

            {/* Instructions */}
            <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800 text-center">
                ⚠️ <strong>חובה לבחור מוצר</strong> - בחרו מוצר מהרשימה למעלה כדי להמשיך ליצירת הקמפיין
              </p>
            </div>
          </div>
        )

      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">בואו נתחיל - מה המטרה?</h2>
              <p className="text-gray-600">הגדירו את פרטי הקמפיין הבסיסיים</p>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  שם הקמפיין
                </label>
                <button
                  type="button"
                  onClick={() => fetchAISuggestions('campaignName', formData.campaignName)}
                  className="text-sm bg-gradient-to-r from-purple-500 to-blue-500 text-white px-3 py-1 rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all shadow-sm"
                  title="קבל הצעות AI עבור שם הקמפיין"
                >
                  🤖 קבל הצעות AI
                </button>
              </div>
              <input
                type="text"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.campaignName ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="לדוגמה: קמפיין השקת מוצר חדש"
                value={formData.campaignName}
                onChange={(e) => updateFormData('campaignName', e.target.value)}
                dir="rtl"
              />
              {errors.campaignName && <p className="text-red-500 text-sm mt-1">{errors.campaignName}</p>}
              
              {/* Debug info */}
              <div className="text-xs text-gray-500 mb-2">
                Debug: suggestions.length = {suggestions.length}, suggestions = {JSON.stringify(suggestions)}
              </div>
              
              {/* AI Suggestions for Campaign Name */}
              {suggestions.length > 0 ? (
                <div className="mt-2 p-3 bg-purple-50 border border-purple-200 rounded-lg">
                  <p className="text-sm font-medium text-purple-800 mb-2">💡 הצעות AI עבור שם הקמפיין: ({suggestions.length})</p>
                  <div className="flex flex-wrap gap-2">
                    {suggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => applySuggestion('campaignName', suggestion)}
                        className="text-xs bg-white text-purple-700 px-3 py-1 rounded-full border border-purple-300 hover:bg-purple-100 transition-colors"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => setSuggestions([])}
                    className="text-xs text-gray-500 mt-2 hover:text-gray-700"
                  >
                    ✕ סגור הצעות
                  </button>
                </div>
              ) : (
                <div className="text-xs text-gray-400 mt-1">אין הצעות כרגע</div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                מטרת הקמפיין
              </label>
              <div className="grid md:grid-cols-2 gap-3">
                {campaignGoals.map(goal => (
                  <button
                    key={goal.id}
                    onClick={() => updateFormData('campaignGoal', goal.id)}
                    className={`p-4 border-2 rounded-lg text-right transition-all duration-200 ${
                      formData.campaignGoal === goal.id 
                        ? 'border-blue-500 bg-blue-50 text-blue-700' 
                        : 'border-gray-200 hover:border-gray-300 text-gray-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-2xl">{goal.icon}</span>
                      <span className="font-medium">{goal.name}</span>
                    </div>
                  </button>
                ))}
              </div>
              {errors.campaignGoal && <p className="text-red-500 text-sm mt-1">{errors.campaignGoal}</p>}
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <label className="block text-sm font-medium text-gray-700">
                    קהל היעד
                  </label>
                  <button
                    type="button"
                    onClick={() => fetchAISuggestions('targetAudience', formData.targetAudience)}
                    className="text-sm bg-gradient-to-r from-purple-500 to-blue-500 text-white px-3 py-1 rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all shadow-sm"
                    title="קבל הצעות AI עבור קהל היעד"
                  >
                    🤖 קבל הצעות AI
                  </button>
                </div>
                {formData.targetAudience.trim() && (
                  <button
                    onClick={() => fetchAudienceInsights(formData.targetAudience)}
                    disabled={loadingInsights}
                    className="bg-purple-100 hover:bg-purple-200 text-purple-700 px-3 py-1 rounded-lg transition duration-200 text-sm flex items-center gap-1 disabled:opacity-50"
                  >
                    {loadingInsights ? (
                      <>
                        <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-purple-600"></div>
                        טוען...
                      </>
                    ) : (
                      <>
                        🔍 תובנות על הקהל
                      </>
                    )}
                  </button>
                )}
              </div>
              <textarea
                rows={3}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none ${errors.targetAudience ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="תארו את קהל היעד שלכם: גיל, תחומי עניין, צרכים..."
                value={formData.targetAudience}
                onChange={(e) => updateFormData('targetAudience', e.target.value)}
                dir="rtl"
              />
              {errors.targetAudience && <p className="text-red-500 text-sm mt-1">{errors.targetAudience}</p>}
              
              {/* AI Suggestions for Target Audience */}
              {suggestions.length > 0 && (
                <div className="mt-2 p-3 bg-purple-50 border border-purple-200 rounded-lg">
                  <p className="text-sm font-medium text-purple-800 mb-2">💡 הצעות AI עבור קהל היעד:</p>
                  <div className="space-y-2">
                    {suggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => applySuggestion('targetAudience', suggestion)}
                        className="block w-full text-right text-sm bg-white text-purple-700 px-3 py-2 rounded-lg border border-purple-300 hover:bg-purple-100 transition-colors"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => setSuggestions([])}
                    className="text-xs text-gray-500 mt-2 hover:text-gray-700"
                  >
                    ✕ סגור הצעות
                  </button>
                </div>
              )}
              
              {/* Enhanced Audience Insights Display */}
              {audienceInsights && (
                <div className="mt-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6 border border-purple-200">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                      🎯 תובנות על קהל היעד שלכם
                    </h4>
                    {audienceInsights.confidenceScore && (
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">אמינות:</span>
                        <div className="bg-white rounded-full px-3 py-1 border">
                          <span className={`font-medium ${
                            audienceInsights.confidenceScore >= 80 ? 'text-green-600' :
                            audienceInsights.confidenceScore >= 60 ? 'text-yellow-600' : 'text-red-600'
                          }`}>
                            {audienceInsights.confidenceScore}%
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Recommendations Section */}
                  {audienceInsights.recommendations && audienceInsights.recommendations.length > 0 && (
                    <div className="mb-6 bg-white rounded-lg p-4 border border-gray-200">
                      <h5 className="font-medium text-gray-700 mb-3 flex items-center gap-2">
                        � המלצות אסטרטגיות
                      </h5>
                      <div className="space-y-3">
                        {audienceInsights.recommendations.map((rec, index) => (
                          <div key={index} className={`p-3 rounded-lg border-l-4 ${
                            rec.priority === 'high' ? 'bg-red-50 border-red-400' :
                            rec.priority === 'medium' ? 'bg-yellow-50 border-yellow-400' :
                            'bg-blue-50 border-blue-400'
                          }`}>
                            <h6 className="font-medium text-gray-800 mb-1">{rec.title}</h6>
                            <p className="text-sm text-gray-600">{rec.message}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Grid Layout for Insights */}
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Typical Messages with Selection */}
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <h5 className="font-medium text-gray-700 flex items-center gap-2">
                          💬 הודעות טיפוסיות
                        </h5>
                        <span className="text-xs text-purple-600 bg-purple-100 px-2 py-1 rounded-full">
                          {selectedInsights.typicalMessages.length} נבחרו
                        </span>
                      </div>
                      <div className="space-y-2 max-h-40 overflow-y-auto">
                        {audienceInsights.typicalMessages.map((message, index) => (
                          <div 
                            key={index} 
                            onClick={() => toggleInsightSelection('typicalMessages', message)}
                            className={`p-3 rounded-lg text-sm border-2 cursor-pointer transition-all ${
                              selectedInsights.typicalMessages.includes(message)
                                ? 'bg-purple-50 border-purple-300 text-purple-800'
                                : 'bg-white border-gray-200 hover:border-purple-200'
                            }`}
                          >
                            <div className="flex items-start gap-2">
                              <input
                                type="checkbox"
                                checked={selectedInsights.typicalMessages.includes(message)}
                                onChange={() => {}} // Handled by div click
                                className="mt-1 rounded text-purple-600 focus:ring-purple-500"
                              />
                              <div>
                                <span className="text-blue-600">"</span>
                                {message}
                                <span className="text-blue-600">"</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Pain Points with Selection */}
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <h5 className="font-medium text-gray-700 flex items-center gap-2">
                          😟 נקודות כאב עיקריות
                        </h5>
                        <span className="text-xs text-red-600 bg-red-100 px-2 py-1 rounded-full">
                          {selectedInsights.painPoints.length} נבחרו
                        </span>
                      </div>
                      <div className="space-y-2 max-h-40 overflow-y-auto">
                        {audienceInsights.painPoints.map((pain, index) => (
                          <div 
                            key={index} 
                            onClick={() => toggleInsightSelection('painPoints', pain)}
                            className={`p-2 rounded-lg text-sm border-2 cursor-pointer transition-all ${
                              selectedInsights.painPoints.includes(pain)
                                ? 'bg-red-100 border-red-300 text-red-800'
                                : 'bg-red-50 border-red-200 hover:border-red-300 text-red-800'
                            }`}
                          >
                            <div className="flex items-start gap-2">
                              <input
                                type="checkbox"
                                checked={selectedInsights.painPoints.includes(pain)}
                                onChange={() => {}} // Handled by div click
                                className="mt-0.5 rounded text-red-600 focus:ring-red-500"
                              />
                              <span>• {pain}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Additional Insights with Selection */}
                  <div className="mt-6 grid md:grid-cols-3 gap-4">
                    {/* Common Language with Selection */}
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h5 className="font-medium text-gray-700 text-sm">🗣️ שפה נפוצה</h5>
                        <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                          {selectedInsights.commonLanguage.length}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {audienceInsights.commonLanguage.slice(0, 8).map((term, index) => (
                          <span 
                            key={index} 
                            onClick={() => toggleInsightSelection('commonLanguage', term)}
                            className={`px-2 py-1 rounded-full text-xs cursor-pointer transition-all border ${
                              selectedInsights.commonLanguage.includes(term)
                                ? 'bg-blue-200 text-blue-900 border-blue-400'
                                : 'bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-200'
                            }`}
                          >
                            {term}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    {/* Platforms */}
                    <div>
                      <h5 className="font-medium text-gray-700 mb-2 text-sm">📱 פלטפורמות</h5>
                      <div className="flex flex-wrap gap-1">
                        {audienceInsights.platforms.map((platform, index) => (
                          <span key={index} className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                            {platform}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Best Posting Times with Selection */}
                    {audienceInsights.bestPostingTimes && (
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <h5 className="font-medium text-gray-700 text-sm">⏰ זמני פרסום</h5>
                          <span className="text-xs text-orange-600 bg-orange-100 px-2 py-1 rounded-full">
                            {selectedInsights.postingTimes.length}
                          </span>
                        </div>
                        <div className="space-y-1">
                          {audienceInsights.bestPostingTimes.map((time, index) => (
                            <div
                              key={index}
                              onClick={() => toggleInsightSelection('postingTimes', time)}
                              className={`text-xs p-2 rounded cursor-pointer transition-all border ${
                                selectedInsights.postingTimes.includes(time)
                                  ? 'bg-orange-100 text-orange-800 border-orange-300'
                                  : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-orange-50'
                              }`}
                            >
                              {time}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Action Buttons for Selected Insights */}
                  {(selectedInsights.painPoints.length > 0 || 
                    selectedInsights.typicalMessages.length > 0 || 
                    selectedInsights.postingTimes.length > 0 || 
                    selectedInsights.commonLanguage.length > 0) && (
                    <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg">
                      <h5 className="font-medium text-gray-800 mb-3 flex items-center gap-2">
                        🎯 פעולות עם התובנות שנבחרו
                      </h5>
                      <div className="flex flex-wrap gap-3">
                        <button
                          onClick={applySelectedInsightsToTopic}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors text-sm flex items-center gap-2"
                        >
                          📝 הוסף לתוכן הקיים
                        </button>
                        <button
                          onClick={generateTopicFromInsights}
                          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors text-sm flex items-center gap-2"
                        >
                          🤖 צור תוכן מהתובנות
                        </button>
                        <button
                          onClick={() => setSelectedInsights({
                            painPoints: [],
                            typicalMessages: [],
                            postingTimes: [],
                            commonLanguage: []
                          })}
                          className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors text-sm flex items-center gap-2"
                        >
                          🗑️ נקה בחירה
                        </button>
                      </div>
                      <div className="mt-3 text-xs text-gray-600">
                        סה"כ נבחרו: {selectedInsights.painPoints.length + selectedInsights.typicalMessages.length + selectedInsights.postingTimes.length + selectedInsights.commonLanguage.length} פריטים
                      </div>
                    </div>
                  )}
                  
                  <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-yellow-800 text-sm">
                      💡 <strong>טיפ:</strong> לחצו על הפריטים כדי לבחור אותם, ואז השתמשו בכפתורים למעלה כדי לשלב אותם בתוכן!
                    </p>
                  </div>

                  {audienceInsights.generatedAt && (
                    <div className="mt-2 text-xs text-gray-500 text-left">
                      עודכן: {new Date(audienceInsights.generatedAt).toLocaleString('he-IL')}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">איך נספר את הסיפור?</h2>
              <p className="text-gray-600">בחרו את סוג התוכן והגדירו את המסר</p>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  נושא ותוכן המסר
                </label>
                <button
                  type="button"
                  onClick={() => fetchAISuggestions('topic', formData.topic)}
                  className="text-sm bg-gradient-to-r from-purple-500 to-blue-500 text-white px-3 py-1 rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all shadow-sm"
                  title="קבל הצעות AI עבור נושא התוכן"
                >
                  🤖 קבל הצעות AI
                </button>
              </div>
              
              {/* Show selected insights summary */}
              {(selectedInsights.painPoints.length > 0 || selectedInsights.typicalMessages.length > 0) && (
                <div className="mb-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-blue-800 text-sm font-medium">
                      🎯 תובנות נבחרות מהשלב הקודם
                    </p>
                    <button
                      onClick={applySelectedInsightsToTopic}
                      className="text-xs bg-blue-600 text-white px-3 py-1 rounded-full hover:bg-blue-700 transition-colors"
                    >
                      📝 הוסף לתוכן
                    </button>
                  </div>
                  <div className="text-xs text-blue-700">
                    {selectedInsights.painPoints.length > 0 && (
                      <span>נקודות כאב: {selectedInsights.painPoints.length} • </span>
                    )}
                    {selectedInsights.typicalMessages.length > 0 && (
                      <span>הודעות טיפוסיות: {selectedInsights.typicalMessages.length}</span>
                    )}
                  </div>
                </div>
              )}
              
              {formData.productData && (
                <div className="mb-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-800 text-sm flex items-center gap-2">
                    ✅ <strong>התוכן שלכם נשמר!</strong> בחירת המוצר לא מחקה את הטקסט הקיים.
                  </p>
                </div>
              )}
              
              <textarea
                rows={4}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none ${errors.topic ? 'border-red-500' : 'border-gray-300'}`}
                placeholder={formData.hasProduct 
                  ? "כתבו כאן את התוכן שלכם. תוכלו להוסיף פרטי מוצר דרך הכפתור למטה..."
                  : "תארו את המסר שאתם רוצים להעביר, היתרונות והקריאה לפעולה..."
                }
                value={formData.topic}
                onChange={(e) => updateFormData('topic', e.target.value)}
                dir="rtl"
              />
              {errors.topic && <p className="text-red-500 text-sm mt-1">{errors.topic}</p>}
              
              {/* AI Suggestions for Topic */}
              {suggestions.length > 0 && (
                <div className="mt-2 p-3 bg-purple-50 border border-purple-200 rounded-lg">
                  <p className="text-sm font-medium text-purple-800 mb-2">💡 הצעות AI עבור נושא התוכן:</p>
                  <div className="space-y-2">
                    {suggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => applySuggestion('topic', suggestion)}
                        className="block w-full text-right text-sm bg-white text-purple-700 px-3 py-2 rounded-lg border border-purple-300 hover:bg-purple-100 transition-colors"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => setSuggestions([])}
                    className="text-xs text-gray-500 mt-2 hover:text-gray-700"
                  >
                    ✕ סגור הצעות
                  </button>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                סוג התוכן
              </label>
              <div className="grid md:grid-cols-2 gap-4">
                {contentTypes.map(type => (
                  <button
                    key={type.id}
                    onClick={() => updateFormData('contentType', type.id)}
                    className={`p-4 border-2 rounded-lg text-right transition-all duration-200 ${
                      formData.contentType === type.id 
                        ? 'border-purple-500 bg-purple-50 text-purple-700' 
                        : 'border-gray-200 hover:border-gray-300 text-gray-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-2xl">{type.icon}</span>
                      <span className="font-medium">{type.name}</span>
                    </div>
                    <p className="text-xs text-gray-600">{type.description}</p>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                סגנון הטון
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {toneOptions.map(tone => (
                  <button
                    key={tone.id}
                    onClick={() => updateFormData('tone', tone.id)}
                    className={`p-3 border-2 rounded-lg text-center transition-all duration-200 ${
                      formData.tone === tone.id 
                        ? 'border-purple-500 bg-purple-50 text-purple-700' 
                        : 'border-gray-200 hover:border-gray-300 text-gray-700'
                    }`}
                  >
                    <div className="text-2xl mb-1">{tone.icon}</div>
                    <div className="text-sm font-medium">{tone.name}</div>
                  </button>
                ))}
              </div>
            </div>

            {formData.hasProduct && !formData.productData && (
              <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  📦 הוספת מוצר לקמפיין
                </h4>
                <p className="text-gray-600 mb-4">
                  תוכלו לקשר מוצר ספציפי לקמפיין כדי ליצור תוכן ממוקד יותר
                </p>
                <Link 
                  href="/products"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200 inline-block"
                >
                  בחר מוצר מהסל
                </Link>
              </div>
            )}

            {formData.productData && (
              <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl shadow-lg p-6 border border-green-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                    📦 המוצר שנבחר
                  </h3>
                  <button
                    onClick={() => updateFormData('productData', null)}
                    className="text-gray-500 hover:text-gray-700 p-1"
                  >
                    ✕
                  </button>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">{formData.productData.name}</h4>
                    <p className="text-gray-600 text-sm mb-2">{formData.productData.description}</p>
                    <p className="text-blue-600 font-bold">{formData.productData.price}₪</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">תכונות עיקריות:</p>
                    <p className="text-sm text-gray-800">{formData.productData.features}</p>
                  </div>
                </div>
                
                <div className="mt-4 p-3 bg-white rounded-lg border border-gray-200">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm text-gray-600">💡 רוצה לשלב את פרטי המוצר עם התוכן הקיים?</span>
                  </div>
                  <button
                    onClick={() => {
                      const productText = `\n\n--- פרטי המוצר ---\nמוצר: ${formData.productData.name}\nתיאור: ${formData.productData.description}\nמחיר: ${formData.productData.price}₪\nתכונות: ${formData.productData.features}`
                      updateFormData('topic', formData.topic + productText)
                    }}
                    className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-4 py-2 rounded-lg transition duration-200 text-sm"
                  >
                    🔗 הוסף פרטי מוצר לתוכן
                  </button>
                </div>
              </div>
            )}
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">הגדרות מתקדמות</h2>
              <p className="text-gray-600">בחרו פלטפורמות ותקציב</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                פלטפורמות יעד
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {platforms.map(platform => (
                  <button
                    key={platform.id}
                    onClick={() => togglePlatform(platform.id)}
                    className={`p-4 border-2 rounded-lg text-center transition-all duration-200 ${
                      formData.platforms.includes(platform.id) 
                        ? 'border-blue-500 bg-blue-50 text-blue-700' 
                        : 'border-gray-200 hover:border-gray-300 text-gray-700'
                    }`}
                  >
                    <div className="text-2xl mb-2">{platform.icon}</div>
                    <div className="text-sm font-medium">{platform.name}</div>
                  </button>
                ))}
              </div>
              {errors.platforms && <p className="text-red-500 text-sm mt-1">{errors.platforms}</p>}
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  תקציב (אופציונלי)
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="לדוגמה: 5000₪"
                  value={formData.budget}
                  onChange={(e) => updateFormData('budget', e.target.value)}
                  dir="rtl"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ציר זמן (אופציונלי)
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="לדוגמה: חודש"
                  value={formData.timeline}
                  onChange={(e) => updateFormData('timeline', e.target.value)}
                  dir="rtl"
                />
              </div>
            </div>

            {/* New: Posting Times and Keywords */}
            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    🕐 שעות פרסום מומלצות
                  </label>
                  <button
                    type="button"
                    onClick={() => fetchAISuggestions('postingTimes', formData.postingTimes)}
                    className="text-sm bg-gradient-to-r from-purple-500 to-blue-500 text-white px-3 py-1 rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all shadow-sm"
                    title="קבל המלצות AI עבור שעות פרסום"
                  >
                    🤖 קבל הצעות AI
                  </button>
                </div>
                <textarea
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="לדוגמה: ימים א-ה, 19:00-21:00"
                  rows="2"
                  value={formData.postingTimes}
                  onChange={(e) => updateFormData('postingTimes', e.target.value)}
                  dir="rtl"
                />
                
                {/* AI Suggestions for Posting Times */}
                {suggestions.length > 0 && (
                  <div className="mt-2 p-3 bg-purple-50 border border-purple-200 rounded-lg">
                    <p className="text-sm font-medium text-purple-800 mb-2">💡 הצעות AI עבור שעות פרסום:</p>
                    <div className="space-y-2">
                      {suggestions.map((suggestion, index) => (
                        <button
                          key={index}
                          onClick={() => applySuggestion('postingTimes', suggestion)}
                          className="block w-full text-left text-xs bg-white text-purple-700 px-3 py-2 rounded border border-purple-300 hover:bg-purple-100 transition-colors"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                    <button
                      onClick={() => setSuggestions([])}
                      className="text-xs text-gray-500 mt-2 hover:text-gray-700"
                    >
                      ✕ סגור הצעות
                    </button>
                  </div>
                )}
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    🏷️ מילות מפתח
                  </label>
                  <button
                    type="button"
                    onClick={() => fetchAISuggestions('keywords', formData.keywords)}
                    className="text-sm bg-gradient-to-r from-purple-500 to-blue-500 text-white px-3 py-1 rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all shadow-sm"
                    title="קבל הצעות AI עבור מילות מפתח"
                  >
                    🤖 קבל הצעות AI
                  </button>
                </div>
                <textarea
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="לדוגמה: איכות, שירות, מחיר"
                  rows="2"
                  value={formData.keywords}
                  onChange={(e) => updateFormData('keywords', e.target.value)}
                  dir="rtl"
                />
                
                {/* AI Suggestions for Keywords */}
                {suggestions.length > 0 && (
                  <div className="mt-2 p-3 bg-purple-50 border border-purple-200 rounded-lg">
                    <p className="text-sm font-medium text-purple-800 mb-2">💡 הצעות AI עבור מילות מפתח:</p>
                    <div className="flex flex-wrap gap-2">
                      {suggestions.map((suggestion, index) => (
                        <button
                          key={index}
                          onClick={() => applySuggestion('keywords', suggestion)}
                          className="text-xs bg-white text-purple-700 px-3 py-1 rounded-full border border-purple-300 hover:bg-purple-100 transition-colors"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                    <button
                      onClick={() => setSuggestions([])}
                      className="text-xs text-gray-500 mt-2 hover:text-gray-700"
                    >
                      ✕ סגור הצעות
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">🎬 יצירת התוכן</h2>
              <p className="text-gray-600">הכל מוכן! בואו ניצור את התוכן שלכם</p>
            </div>

            {/* Campaign Summary */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">📋 סיכום הקמפיין</h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <p><strong>שם:</strong> {formData.campaignName}</p>
                  <p><strong>מטרה:</strong> {campaignGoals.find(g => g.id === formData.campaignGoal)?.name}</p>
                  <p><strong>סוג תוכן:</strong> {contentTypes.find(t => t.id === formData.contentType)?.name}</p>
                </div>
                <div className="space-y-2">
                  <p><strong>טון:</strong> {toneOptions.find(t => t.id === formData.tone)?.name}</p>
                  <p><strong>פלטפורמות:</strong> {formData.platforms.join(', ')}</p>
                  {formData.productData && <p><strong>מוצר:</strong> {formData.productData.name}</p>}
                  {formData.postingTimes && <p><strong>שעות פרסום:</strong> {formData.postingTimes}</p>}
                  {formData.keywords && <p><strong>מילות מפתח:</strong> {formData.keywords}</p>}
                </div>
              </div>
            </div>

            {/* Content Generation Buttons */}
            {!formData.generatedContent && (
              <div className="flex gap-4">
                <button
                  onClick={() => generateContent(false)}
                  disabled={isGenerating}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-4 px-6 rounded-lg hover:from-blue-700 hover:to-purple-700 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isGenerating ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white ml-2"></div>
                      יוצר תוכן עם AI...
                    </div>
                  ) : (
                    '🤖 צור תוכן עם OpenAI'
                  )}
                </button>
                
                <button
                  onClick={() => generateContent(true)}
                  disabled={isGenerating}
                  className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold py-4 px-6 rounded-lg hover:from-green-700 hover:to-emerald-700 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isGenerating ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white ml-2"></div>
                      יוצר תוכן...
                    </div>
                  ) : (
                    '🔥 דמו - בדיקה מהירה'
                  )}
                </button>
              </div>
            )}

            {/* Generated Content Results */}
            {formData.generatedContent && (
              <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  🎉 התוכן נוצר בהצלחה!
                </h3>
                
                {formData.generatedContent.error ? (
                  <div className="text-red-600 p-4 bg-red-50 rounded-lg">
                    {formData.generatedContent.error}
                  </div>
                ) : (
                  <div className="space-y-6">
                    {formData.generatedContent.script && (
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                          📝 התסריט שנוצר
                        </h4>
                        <div className="bg-gray-50 p-4 rounded-lg border-r-4 border-blue-500">
                          <pre className="whitespace-pre-wrap text-sm text-gray-800 font-normal leading-relaxed">
                            {formData.generatedContent.script}
                          </pre>
                        </div>
                      </div>
                    )}
                    
                    {formData.generatedContent.imagePrompt && (
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                          🎨 תיאור התמונה
                        </h4>
                        <div className="bg-purple-50 p-4 rounded-lg border-r-4 border-purple-500">
                          <p className="text-sm text-gray-800">{formData.generatedContent.imagePrompt}</p>
                        </div>
                      </div>
                    )}
                    
                    {formData.generatedContent.imageUrl && (
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                          🖼️ התמונה שנוצרה
                        </h4>
                        <div className="text-center">
                          <img 
                            src={formData.generatedContent.imageUrl} 
                            alt="Generated Campaign Content" 
                            className="max-w-full max-h-96 mx-auto rounded-lg shadow-lg border border-gray-200"
                          />
                        </div>
                      </div>
                    )}
                    
                    <div className="flex gap-4 pt-4 border-t border-gray-200">
                      <button
                        onClick={() => generateContent(false)}
                        className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-200"
                      >
                        🔄 צור תוכן חדש
                      </button>
                      <Link
                        href="/"
                        className="flex-1 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition duration-200 text-center"
                      >
                        ✅ עבור לדשבורד
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <Head>
        <title>VidGenAI - יצירת תוכן לקמפיין שיווקי</title>
        <meta name="description" content="פלטפורמה ליצירת תוכן שיווקי באמצעות בינה מלאכותית" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-4 mb-4">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
              🎯 <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">יצירת תוכן לקמפיין</span>
            </h1>
            {/* Auto-save Status Indicator */}
            {saveStatus && (
              <div className="flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm animate-fade-in">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                {saveStatus}
              </div>
            )}
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            צרו תוכן שיווקי מרשים עם מדריך שלב-אחר-שלב
          </p>
        </div>

        {/* Progress Bar */}
        {currentStep > 0 && ( // Only show progress bar after product selection
          <div className="max-w-4xl mx-auto mb-8">
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              {/* Progress Percentage */}
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm font-medium text-gray-600">
                  שלב {currentStep} מתוך 5
                </span>
                <span className="text-lg font-bold text-blue-600">
                  {Math.round(progressPercentage)}%
                </span>
              </div>
              
              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-3 mb-6">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
              
              {/* Steps */}
              <div className="flex justify-between">
                {steps.filter(step => step.id > 0).map((step) => ( // Filter out step 0
                  <div key={step.id} className="flex flex-col items-center">
                    <div 
                      className={`w-12 h-12 rounded-full flex items-center justify-center text-lg border-2 transition-all duration-300 ${
                        currentStep >= step.id 
                          ? 'bg-blue-500 border-blue-500 text-white' 
                          : 'bg-gray-100 border-gray-300 text-gray-400'
                      }`}
                    >
                      {step.icon}
                    </div>
                    <div className="text-center mt-2">
                      <div className={`text-xs font-medium ${
                        currentStep >= step.id ? 'text-blue-600' : 'text-gray-400'
                      }`}>
                        {step.title}
                      </div>
                      <div className="text-xs text-gray-500 hidden md:block">
                        {step.description}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="max-w-4xl mx-auto mb-6">
          <div className="flex justify-between items-center">
            <div className="flex gap-3">
              <Link href="/" className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-4 py-2 rounded-lg transition duration-200 flex items-center gap-2 text-sm">
                <span>🏠</span>
                דף הבית
              </Link>
            </div>
            {formData.productData && (
              <div className="bg-green-100 text-green-700 px-4 py-2 rounded-lg flex items-center gap-2 text-sm">
                <span>✅</span>
                נבחר: {formData.productData.name}
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-200">
            {renderStep()}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between">
            <button
              onClick={prevStep}
              disabled={currentStep === 0}
              className="bg-gray-500 text-white px-8 py-3 rounded-lg hover:bg-gray-600 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ← הקודм
            </button>
            
            {currentStep < 4 ? (
              <button
                onClick={nextStep}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition duration-200"
              >
                הבא →
              </button>
            ) : (
              <button
                onClick={() => setCurrentStep(0)}
                className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition duration-200"
              >
                🔄 התחל מחדש
              </button>
            )}
          </div>
        </div>
      </main>

      <footer className="text-center py-8 text-gray-600">
        <p>© 2025 VidGenAI</p>
      </footer>
    </div>
  )
}

