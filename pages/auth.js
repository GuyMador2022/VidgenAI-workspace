import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import PhoneVerification from '../components/PhoneVerification';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    rememberMe: false
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [mounted, setMounted] = useState(false);
  const [showPhoneVerification, setShowPhoneVerification] = useState(false);
  const [phoneVerified, setPhoneVerified] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    
    // Check URL parameters for mode and email
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const mode = urlParams.get('mode');
      const email = urlParams.get('email');
      
      // Set mode based on URL parameter
      if (mode === 'login') {
        setIsLogin(true);
      } else if (mode === 'register') {
        setIsLogin(false);
      }
      
      // Pre-fill email if provided
      if (email) {
        setFormData(prev => ({
          ...prev,
          email: decodeURIComponent(email)
        }));
      }
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear errors when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'כתובת אימייל נדרשת';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'כתובת אימייל לא תקינה';
    }
    
    if (!formData.password) {
      newErrors.password = 'סיסמה נדרשת';
    } else if (formData.password.length < 6) {
      newErrors.password = 'סיסמה חייבת להכיל לפחות 6 תווים';
    }
    
    if (!isLogin && !formData.confirmPassword) {
      newErrors.confirmPassword = 'אימות סיסמה נדרש';
    } else if (!isLogin && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'הסיסמאות אינן תואמות';
    }
    
    // Phone verification required for registration
    if (!isLogin && !phoneVerified) {
      newErrors.phone = 'נדרש אימות מספר טלפון';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // For registration, show phone verification first
    if (!isLogin && !phoneVerified) {
      setShowPhoneVerification(true);
      return;
    }
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    setErrors({});
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSuccessMessage(isLogin ? 'התחברת בהצלחה! מעביר אותך לדשבורד האישי...' : 'נרשמת בהצלחה! מעביר אותך לדשבורד האישי...');
      
      // Redirect to user dashboard after successful auth
      setTimeout(() => {
        router.push('/userdashboard');
      }, 1000);
    }, 1500);
  };

  const handlePhoneVerification = (verificationData) => {
    setPhoneVerified(true);
    setFormData(prev => ({
      ...prev,
      phone: verificationData.phone
    }));
    setShowPhoneVerification(false);
    setSuccessMessage('הטלפון אומת בהצלחה! כעת אתה יכול להירשם');
  };

  const handleGoogleAuth = () => {
    // Simulate Google auth
    console.log('Google authentication started');
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push('/userdashboard');
    }, 1000);
  };

  if (!mounted) return null;

  return (
    <>
      <Head>
        <title>{isLogin ? 'התחברות' : 'הרשמה'} - VidGenAI</title>
        <meta name="description" content="התחבר או הירשם ל-VidGenAI ליצירת סרטוני שיווק מתקדמים בעזרת AI" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link href="https://fonts.googleapis.com/css2?family=Heebo:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600/5 via-transparent to-indigo-600/5"></div>
        {/* Left Side - Form */}
        <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
          <div className="mx-auto w-full max-w-md lg:max-w-lg">
            {/* Logo and Header */}
            <div className="text-center mb-8">
              {/* Back to Landing Link */}
              <div className="flex justify-center mb-4">
                <a 
                  href="/landing-he"
                  className="text-sm text-gray-500 hover:text-blue-600 transition-colors flex items-center space-x-3 rtl:space-x-reverse"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
                  </svg>
                  <span>חזרה לדף הבית</span>
                </a>
              </div>
              
              <div className="flex justify-center mb-6">
                <div className="flex items-center space-x-4 rtl:space-x-reverse">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/25">
                    <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                  <span className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">VidGenAI</span>
                </div>
              </div>
              
              <h1 className="text-4xl font-bold text-gray-900 mb-3">
                {isLogin ? 'ברוכים השבים!' : 'הצטרפו אלינו'}
              </h1>
              
              <p className="text-gray-600 text-lg">
                {isLogin ? 'נעים לראות אתכם שוב ב-VidGenAI' : 'התחילו ליצור סרטוני שיווק מדהימים עם AI'}
              </p>
            </div>

            {/* Auth Form Card */}
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl shadow-gray-200/50 border border-white/20 p-8 lg:p-10">
              {/* Tab Switcher */}
              <div className="flex justify-center mb-8">
                <div className="flex bg-gray-100/80 rounded-2xl p-1.5 backdrop-blur-sm">
                  <button
                    type="button"
                    onClick={() => setIsLogin(false)}
                    className={`px-8 py-3 text-sm font-semibold rounded-xl transition-all duration-300 ${
                      !isLogin 
                        ? 'bg-white text-blue-600 shadow-md shadow-blue-100 transform scale-105' 
                        : 'text-gray-500 hover:text-gray-700 hover:bg-white/50'
                    }`}
                  >
                    הרשמה
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsLogin(true)}
                    className={`px-8 py-3 text-sm font-semibold rounded-xl transition-all duration-300 ${
                      isLogin 
                        ? 'bg-white text-blue-600 shadow-md shadow-blue-100 transform scale-105' 
                        : 'text-gray-500 hover:text-gray-700 hover:bg-white/50'
                    }`}
                  >
                    התחברות
                  </button>
                </div>
              </div>
              {/* Form */}
              {successMessage && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-2xl">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-green-400 ml-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <p className="text-sm text-green-800 font-medium">{successMessage}</p>
                  </div>
                </div>
              )}
              
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="space-y-5">
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-3">
                      כתובת אימייל
                    </label>
                    <div className="relative">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`appearance-none relative block w-full px-4 py-4 border placeholder-gray-400 text-gray-900 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50/50 hover:bg-white focus:bg-white pl-10 ${
                          errors.email ? 'border-red-300 focus:ring-red-500' : 'border-gray-200'
                        }`}
                        placeholder="example@email.com"
                      />
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className={`h-5 w-5 ${errors.email ? 'text-red-400' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                        </svg>
                      </div>
                    </div>
                    {errors.email && (
                      <p className="mt-2 text-sm text-red-600 flex items-center">
                        <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-3">
                      סיסמה
                    </label>
                    <div className="relative">
                      <input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        autoComplete={isLogin ? "current-password" : "new-password"}
                        required
                        value={formData.password}
                        onChange={handleInputChange}
                        className={`appearance-none relative block w-full px-4 py-4 border placeholder-gray-400 text-gray-900 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50/50 hover:bg-white focus:bg-white pl-10 pr-12 ${
                          errors.password ? 'border-red-300 focus:ring-red-500' : 'border-gray-200'
                        }`}
                        placeholder="••••••••"
                      />
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className={`h-5 w-5 ${errors.password ? 'text-red-400' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                      </div>
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-4 flex items-center"
                      >
                        {showPassword ? (
                          <svg className="h-5 w-5 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                          </svg>
                        ) : (
                          <svg className="h-5 w-5 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        )}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="mt-2 text-sm text-red-600 flex items-center">
                        <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {errors.password}
                      </p>
                    )}
                  </div>

                  {!isLogin && (
                    <div>
                      <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700 mb-3">
                        אימות סיסמה
                      </label>
                      <div className="relative">
                        <input
                          id="confirmPassword"
                          name="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          autoComplete="new-password"
                          required
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          className={`appearance-none relative block w-full px-4 py-4 border placeholder-gray-400 text-gray-900 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50/50 hover:bg-white focus:bg-white pl-10 pr-12 ${
                            errors.confirmPassword ? 'border-red-300 focus:ring-red-500' : 'border-gray-200'
                          }`}
                          placeholder="••••••••"
                        />
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <svg className={`h-5 w-5 ${errors.confirmPassword ? 'text-red-400' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                          </svg>
                        </div>
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute inset-y-0 right-0 pr-4 flex items-center"
                        >
                          {showConfirmPassword ? (
                            <svg className="h-5 w-5 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                            </svg>
                          ) : (
                            <svg className="h-5 w-5 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          )}
                        </button>
                      </div>
                      {errors.confirmPassword && (
                        <p className="mt-2 text-sm text-red-600 flex items-center">
                          <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                          {errors.confirmPassword}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Phone Verification for Registration */}
                  {!isLogin && (
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        אימות מספר טלפון
                      </label>
                      {phoneVerified ? (
                        <div className="p-4 bg-green-50 border border-green-200 rounded-xl">
                          <div className="flex items-center">
                            <svg className="w-5 h-5 text-green-500 ml-2" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span className="text-sm text-green-800 font-medium">
                              הטלפון {formData.phone} אומת בהצלחה
                            </span>
                          </div>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setShowPhoneVerification(true)}
                          className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-xl text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                        >
                          <svg className="w-5 h-5 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                          </svg>
                          אמת מספר טלפון
                        </button>
                      )}
                      {errors.phone && (
                        <p className="mt-2 text-sm text-red-600 flex items-center">
                          <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                          {errors.phone}
                        </p>
                      )}
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center">
                    <input
                      id="rememberMe"
                      name="rememberMe"
                      type="checkbox"
                      checked={formData.rememberMe}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="rememberMe" className="mr-3 block text-sm text-gray-700 font-medium">
                      זכור אותי
                    </label>
                  </div>

                  {isLogin && (
                    <div className="text-sm">
                      <a href="#" className="font-semibold text-blue-600 hover:text-blue-500 transition-colors">
                        שכחתם את הסיסמה?
                      </a>
                    </div>
                  )}
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="group relative w-full flex justify-center py-4 px-4 border border-transparent text-sm font-bold rounded-2xl text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg shadow-blue-500/25 overflow-hidden"
                  >
                    {loading && (
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-indigo-700">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
                      </div>
                    )}
                    <div className="relative z-10 flex items-center">
                      {loading ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          {isLogin ? 'מתחבר...' : 'נרשם...'}
                        </>
                      ) : (
                        <>
                          {isLogin ? 'התחברות' : 'הרשמה'}
                          <svg className="mr-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </>
                      )}
                    </div>
                  </button>
                </div>

                <div className="mt-8">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-200" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-4 bg-white text-gray-500 font-medium">או המשיכו עם</span>
                    </div>
                  </div>

                  <div className="mt-8">
                    <button
                      type="button"
                      onClick={handleGoogleAuth}
                      disabled={loading}
                      className="w-full inline-flex justify-center py-4 px-4 border border-gray-200 rounded-2xl shadow-sm bg-white text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-all duration-200 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-md"
                    >
                      <svg className="w-5 h-5 ml-3" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                      המשך עם Google
                    </button>
                  </div>
                </div>
              </form>

              <div className="mt-8 text-center">
                <p className="text-sm text-gray-600">
                  {isLogin ? (
                    <>
                      אין לכם עוד חשבון?{' '}
                      <button
                        onClick={() => setIsLogin(false)}
                        className="font-semibold text-blue-600 hover:text-blue-500 transition-colors"
                      >
                        הירשמו בחינם
                      </button>
                    </>
                  ) : (
                    <>
                      כבר יש לכם חשבון?{' '}
                      <button
                        onClick={() => setIsLogin(true)}
                        className="font-semibold text-blue-600 hover:text-blue-500 transition-colors"
                      >
                        התחברו כאן
                      </button>
                    </>
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Features */}
        <div className="hidden lg:block relative w-0 flex-1">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <defs>
                  <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                    <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5"/>
                  </pattern>
                </defs>
                <rect width="100" height="100" fill="url(#grid)" />
              </svg>
            </div>
            
            {/* Floating Elements */}
            <div className="absolute top-20 right-20 w-32 h-32 bg-blue-400/20 rounded-full blur-xl animate-pulse"></div>
            <div className="absolute bottom-32 left-16 w-24 h-24 bg-indigo-400/20 rounded-full blur-xl animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 right-1/3 w-16 h-16 bg-blue-300/20 rounded-full blur-xl animate-pulse delay-2000"></div>

            <div className="h-full flex flex-col justify-center px-16 xl:px-20 relative z-10">
              <div className="max-w-lg">
                <div className="mb-16">
                  <h3 className="text-5xl font-bold text-white mb-8 leading-tight">
                    למה לבחור ב-VidGenAI?
                  </h3>
                  <p className="text-blue-100 text-xl leading-relaxed">
                    הפלטפורמה המתקדמת ביותר ליצירת סרטוני שיווק מקצועיים בעזרת בינה מלאכותית
                  </p>
                </div>
                
                <div className="space-y-10">
                  <div className="flex items-center space-x-8 rtl:space-x-reverse group">
                    <div className="flex-shrink-0">
                      <div className="w-14 h-14 bg-gradient-to-r from-blue-400 to-blue-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 016 0v6a3 3 0 01-3 3z"/>
                        </svg>
                      </div>
                    </div>
                    <div className="flex-1 pr-2">
                      <h4 className="text-xl font-bold text-white mb-2">קולות AI בעברית</h4>
                      <p className="text-blue-100 leading-relaxed text-base">צלילים מקצועיים עם קולות דמויי אדם בעברית ועוד 30 שפות</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-8 rtl:space-x-reverse group">
                    <div className="flex-shrink-0">
                      <div className="w-14 h-14 bg-gradient-to-r from-indigo-400 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                        </svg>
                      </div>
                    </div>
                    <div className="flex-1 pr-2">
                      <h4 className="text-xl font-bold text-white mb-2">כתיבת תסריטים אוטומטית</h4>
                      <p className="text-blue-100 leading-relaxed text-base">AI יכתוב עבורכם את התסריט המושלם תוך שניות</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-8 rtl:space-x-reverse group">
                    <div className="flex-shrink-0">
                      <div className="w-14 h-14 bg-gradient-to-r from-purple-400 to-purple-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                        </svg>
                      </div>
                    </div>
                    <div className="flex-1 pr-2">
                      <h4 className="text-xl font-bold text-white mb-2">ויזואלים מרהיבים</h4>
                      <p className="text-blue-100 leading-relaxed text-base">תמונות ואנימציות שנוצרו בAI סצנה אחר סצנה</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-8 rtl:space-x-reverse group">
                    <div className="flex-shrink-0">
                      <div className="w-14 h-14 bg-gradient-to-r from-pink-400 to-pink-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                        </svg>
                      </div>
                    </div>
                    <div className="flex-1 pr-2">
                      <h4 className="text-xl font-bold text-white mb-2">יצירה מהירה ואוטומטית</h4>
                      <p className="text-blue-100 leading-relaxed text-base">מקליק אחד לסרטון מושלם תוך דקות ספורות</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-8 rtl:space-x-reverse group">
                    <div className="flex-shrink-0">
                      <div className="w-14 h-14 bg-gradient-to-r from-teal-400 to-teal-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                        </svg>
                      </div>
                    </div>
                    <div className="flex-1 pr-2">
                      <h4 className="text-xl font-bold text-white mb-2">ייצוא לכל הפלטפורמות</h4>
                      <p className="text-blue-100 leading-relaxed text-base">סרטונים מותאמים לפייסבוק, אינסטגרם, יוטיוב ועוד</p>
                    </div>
                  </div>
                </div>

                <div className="mt-16 p-8 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
                  <div className="flex items-center space-x-5 rtl:space-x-reverse mb-6">
                    <div className="flex -space-x-2 rtl:space-x-reverse">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full border-2 border-white"></div>
                      <div className="w-10 h-10 bg-gradient-to-r from-indigo-400 to-indigo-500 rounded-full border-2 border-white"></div>
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-purple-500 rounded-full border-2 border-white"></div>
                    </div>
                    <span className="text-white font-semibold text-lg pr-1">+5,000 משתמשים מרוצים</span>
                  </div>
                  <p className="text-blue-100 text-base leading-relaxed italic">
                    "VidGenAI חסך לנו שעות של עבודה וגרם לסרטונים שלנו להיראות מקצועיים יותר מאי פעם"
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Phone Verification Modal */}
      {showPhoneVerification && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full max-h-screen overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-gray-900">אימות מספר טלפון</h3>
                <button
                  onClick={() => setShowPhoneVerification(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <PhoneVerification
                onVerificationComplete={handlePhoneVerification}
                onPhoneChange={(phone) => setFormData(prev => ({...prev, phone}))}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
