import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';

export default function Signup() {
  const [isLogin, setIsLogin] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    acceptTerms: false
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [mounted, setMounted] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('trial');
  const router = useRouter();

  // Plan configurations
  const planConfigs = {
    trial: {
      name: 'ניסיון חינמי',
      credits: 200,
      price: 0,
      description: 'נסה את כל הפיצ\'רים במשך 14 ימים',
      features: ['200 קרדיטים', 'כל הפיצ\'רים', 'תמיכה מלאה', 'ללא התחייבות'],
      color: 'blue',
      duration: '14 ימים חינם'
    },
    basic: {
      name: 'בסיסי',
      credits: 500,
      price: 99,
      description: 'מושלם למתחילים ועסקים קטנים',
      features: ['500 קרדיטים בחודש', 'יצירת טקסט ותמונות', 'תמיכה באימייל'],
      color: 'green',
      duration: 'חודשי'
    },
    professional: {
      name: 'מקצועי',
      credits: 2000,
      price: 199,
      description: 'לעסקים וקמפיינים מתקדמים',
      features: ['2000 קרדיטים בחודש', 'יצירת וידאו', 'תמיכה VIP', 'אנליטיקס מתקדמת'],
      color: 'purple',
      duration: 'חודשי'
    }
  };

  useEffect(() => {
    setMounted(true);
    
    // Check URL parameters for plan selection
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const planParam = urlParams.get('plan');
      const email = urlParams.get('email');
      const mode = urlParams.get('mode');
      
      // Set mode (login/register)
      if (mode === 'login') {
        setIsLogin(true);
      }
      
      // Set plan based on URL parameter
      if (planParam && planConfigs[planParam]) {
        setSelectedPlan(planParam);
      }
      
      // Pre-fill email if provided
      if (email) {
        setFormData(prev => ({
          ...prev,
          email: decodeURIComponent(email)
        }));
      }
    }
  }, [planConfigs]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name) {
      newErrors.name = 'שם נדרש';
    }
    
    if (!formData.email) {
      newErrors.email = 'אימייל נדרש';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'פורמט אימייל לא תקין';
    }
    
    if (!formData.password) {
      newErrors.password = 'סיסמה נדרשת';
    } else if (formData.password.length < 6) {
      newErrors.password = 'סיסמה חייבת להכיל לפחות 6 תווים';
    }
    
    if (!isLogin && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'סיסמאות לא תואמות';
    }

    if (!isLogin && !formData.acceptTerms) {
      newErrors.acceptTerms = 'חובה לאשר את תנאי השימוש';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    // Skip phone verification - proceed directly to registration
    await submitRegistration();
  };

  const submitRegistration = async () => {
    setLoading(true);
    setErrors({});
    
    try {
      // Mock API call - replace with actual registration
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          phone: formData.phone,
          plan: selectedPlan,
          phoneVerified: false
        }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setSuccessMessage('חשבון נוצר בהצלחה! מעביר אותך לדשבורד...');
        
        // Redirect based on plan
        setTimeout(() => {
          if (selectedPlan === 'trial') {
            router.push('/userdashboard?welcome=true&plan=' + selectedPlan);
          } else {
            router.push('/checkout?plan=' + selectedPlan);
          }
        }, 2000);
      } else {
        setErrors({ submit: data.message || 'אירעה שגיאה במהלך ההרשמה' });
      }
    } catch (error) {
      setErrors({ submit: 'אירעה שגיאה בחיבור לשרת' });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = () => {
    // Implement Google OAuth
    console.log('Google Auth with plan:', selectedPlan);
  };

  const currentPlan = planConfigs[selectedPlan];

  if (!mounted) {
    return null;
  }

  return (
    <>
      <Head>
        <title>הרשמה - VidGenAI</title>
        <meta name="description" content="הצטרף ל-VidGenAI והתחל ליצור קמפיינים מדהימים עם בינה מלאכותית" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center py-12 px-4">
        <div className="max-w-6xl w-full">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            
            {/* Plan Selection & Info */}
            <div className="order-2 lg:order-1">
              <div className="text-center lg:text-right mb-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">בחר את התוכנית שלך</h1>
                <p className="text-gray-600">התחל עם התוכנית המתאימה לך ושדרג בכל עת</p>
              </div>

              {/* Plan Cards */}
              <div className="grid gap-4 mb-6">
                {Object.entries(planConfigs).map(([planKey, plan]) => (
                  <div 
                    key={planKey}
                    onClick={() => setSelectedPlan(planKey)}
                    className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${
                      selectedPlan === planKey 
                        ? `border-${plan.color}-500 bg-${plan.color}-50 shadow-lg` 
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <h3 className="text-lg font-semibold text-gray-800">{plan.name}</h3>
                          {plan.price === 0 && (
                            <span className="mr-2 bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                              חינמי
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{plan.description}</p>
                        <div className="text-sm text-gray-500">
                          <div className="font-medium">{plan.credits} קרדיטים • {plan.duration}</div>
                        </div>
                      </div>
                      <div className="text-left">
                        {plan.price > 0 ? (
                          <div className="text-xl font-bold text-gray-800">₪{plan.price}</div>
                        ) : (
                          <div className="text-xl font-bold text-green-600">חינם</div>
                        )}
                      </div>
                    </div>

                    {/* Features */}
                    <div className="mt-3 grid grid-cols-1 gap-1">
                      {plan.features.slice(0, 2).map((feature, index) => (
                        <div key={index} className="flex items-center text-xs text-gray-600">
                          <span className="text-green-500 mr-1">✓</span>
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Selected Plan Summary */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="font-semibold text-gray-800 mb-3">התוכנית שנבחרה: {currentPlan.name}</h3>
                <div className="space-y-2">
                  {currentPlan.features.map((feature, index) => (
                    <div key={index} className="flex items-center text-sm text-gray-600">
                      <span className="text-green-500 mr-2">✓</span>
                      {feature}
                    </div>
                  ))}
                </div>
                {selectedPlan === 'trial' && (
                  <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-blue-800">
                      🎉 <strong>ניסיון חינמי מלא!</strong> תוכל לבטל בכל עת ללא עלות
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Registration Form */}
            <div className="order-1 lg:order-2">
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <div className="text-center mb-8">
                  <Link href="/" className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    VidGenAI
                  </Link>
                  <h2 className="text-2xl font-bold text-gray-800 mt-4 mb-2">צור חשבון חדש</h2>
                  <p className="text-gray-600">הצטרף אלינו והתחל ליצור תוכן מדהים</p>
                </div>

                {successMessage && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800 text-center">
                    {successMessage}
                  </div>
                )}

                {errors.submit && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800 text-center">
                    {errors.submit}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      שם מלא
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.name ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="הכנס את שמך המלא"
                    />
                    {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      כתובת אימייל
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.email ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="your@email.com"
                      dir="ltr"
                    />
                    {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                  </div>

                  {/* Phone (Optional) */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      מספר טלפון (אופציונלי)
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="050-1234567"
                      dir="ltr"
                    />
                  </div>

                  {/* Password */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      סיסמה
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          errors.password ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="לפחות 6 תווים"
                        dir="ltr"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? '🙈' : '👁️'}
                      </button>
                    </div>
                    {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      אימות סיסמה
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="הזן שוב את הסיסמה"
                        dir="ltr"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showConfirmPassword ? '🙈' : '👁️'}
                      </button>
                    </div>
                    {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
                  </div>

                  {/* Terms Acceptance */}
                  <div>
                    <label className="flex items-start">
                      <input
                        type="checkbox"
                        name="acceptTerms"
                        checked={formData.acceptTerms}
                        onChange={handleInputChange}
                        className="mt-1 mr-3"
                      />
                      <span className="text-sm text-gray-600">
                        אני מסכים ל
                        <Link href="/terms" className="text-blue-600 hover:underline mx-1">
                          תנאי השימוש
                        </Link>
                        ול
                        <Link href="/privacy" className="text-blue-600 hover:underline mx-1">
                          מדיניות הפרטיות
                        </Link>
                      </span>
                    </label>
                    {errors.acceptTerms && <p className="mt-1 text-sm text-red-600">{errors.acceptTerms}</p>}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-700 hover:to-purple-700 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        יוצר חשבון...
                      </div>
                    ) : (
                      selectedPlan === 'trial' 
                        ? `נסה בחינם עכשיו 🚀`
                        : `המשך לתשלום - ₪${currentPlan.price}`
                    )}
                  </button>

                  {/* Google OAuth */}
                  <div className="text-center">
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300" />
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-gray-500">או</span>
                      </div>
                    </div>
                    
                    <button
                      type="button"
                      onClick={handleGoogleAuth}
                      className="mt-4 w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition duration-200"
                    >
                      <svg className="w-5 h-5 ml-2" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                      הרשמה עם Google
                    </button>
                  </div>
                </form>

                <div className="mt-6 text-center">
                  <p className="text-gray-600">
                    כבר יש לך חשבון?{' '}
                    <Link href="/signup?mode=login" className="text-blue-600 hover:underline font-medium">
                      התחבר כאן
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
