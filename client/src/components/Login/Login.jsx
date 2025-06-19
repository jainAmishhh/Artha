import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Sparkles, Shield, TrendingUp, DollarSign, Target, CheckCircle, Github, Chrome } from 'lucide-react';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsLoading(false);
    // Handle authentication logic here
    console.log('Form submitted:', formData);
  };

  const features = [
    {
      icon: TrendingUp,
      title: 'Smart Analytics',
      description: 'AI-powered insights into your spending patterns'
    },
    {
      icon: DollarSign,
      title: 'Budget Tracking',
      description: 'Set and monitor budgets with real-time alerts'
    },
    {
      icon: Target,
      title: 'Goal Planning',
      description: 'Create and track your financial objectives'
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Bank-level security for your financial data'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-green-700 relative overflow-hidden" style={{background: 'linear-gradient(135deg, #22543D 0%, #2D5A41 50%, #1A4B35 100%)'}}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full blur-3xl animate-pulse" style={{background: 'radial-gradient(circle, rgba(244, 197, 66, 0.15) 0%, transparent 70%)'}}></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse delay-1000" style={{background: 'radial-gradient(circle, rgba(139, 28, 34, 0.12) 0%, transparent 70%)'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full blur-3xl animate-pulse delay-500" style={{background: 'radial-gradient(circle, rgba(5, 150, 105, 0.1) 0%, transparent 70%)'}}></div>
      </div>

      <div className="relative z-10 min-h-screen flex">
        {/* Left Side - Features */}
        <div className="hidden lg:flex lg:w-1/2 flex-col justify-center p-12">
          <div className="max-w-md">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-2xl shadow-lg" style={{background: 'linear-gradient(135deg, #F4C542 0%, #E6B73A 100%)'}}>
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold" style={{color: '#FAFAFA'}}>FinanceAI</h1>
                <p className="text-sm" style={{color: 'rgba(250, 250, 250, 0.7)'}}>Smart Financial Management</p>
              </div>
            </div>

            <h2 className="text-4xl font-bold mb-6" style={{color: '#FAFAFA'}}>
              Take Control of Your
              <span className="block" style={{color: '#F4C542'}}>Financial Future</span>
            </h2>

            <p className="text-lg mb-8" style={{color: 'rgba(250, 250, 250, 0.8)'}}>
              Join thousands of users who have transformed their financial lives with our AI-powered insights and smart budgeting tools.
            </p>

            <div className="space-y-6">
              {features.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <div key={index} className="flex items-start gap-4 group">
                    <div className="p-3 rounded-2xl group-hover:scale-110 transition-transform duration-300" style={{background: 'rgba(244, 197, 66, 0.2)'}}>
                      <IconComponent className="w-6 h-6" style={{color: '#F4C542'}} />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1" style={{color: '#FAFAFA'}}>{feature.title}</h3>
                      <p className="text-sm" style={{color: 'rgba(250, 250, 250, 0.7)'}}>{feature.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-12 p-6 rounded-3xl" style={{background: 'rgba(250, 250, 250, 0.05)', border: '1px solid rgba(244, 197, 66, 0.2)'}}>
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle className="w-6 h-6" style={{color: '#059669'}} />
                <span className="font-semibold" style={{color: '#FAFAFA'}}>Trusted by 50,000+ users</span>
              </div>
              <p className="text-sm" style={{color: 'rgba(250, 250, 250, 0.7)'}}>
                "This app completely changed how I manage my finances. The AI insights are incredibly accurate!"
              </p>
              <div className="flex items-center gap-2 mt-3">
                <div className="w-8 h-8 rounded-full" style={{background: 'linear-gradient(135deg, #F4C542 0%, #E6B73A 100%)'}}></div>
                <div>
                  <p className="text-sm font-medium" style={{color: '#FAFAFA'}}>Sarah Johnson</p>
                  <p className="text-xs" style={{color: 'rgba(250, 250, 250, 0.5)'}}>Financial Analyst</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Auth Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12">
          <div className="w-full max-w-md">
            {/* Form Container */}
            <div className="backdrop-blur-2xl border rounded-3xl p-8 shadow-2xl" style={{background: 'rgba(250, 250, 250, 0.08)', borderColor: 'rgba(244, 197, 66, 0.2)'}}>
              {/* Header */}
              <div className="text-center mb-8">
                <div className="p-4 rounded-2xl mx-auto w-fit mb-4" style={{background: 'rgba(244, 197, 66, 0.2)'}}>
                  <Lock className="w-8 h-8" style={{color: '#F4C542'}} />
                </div>
                <h2 className="text-2xl font-bold mb-2" style={{color: '#FAFAFA'}}>
                  {isLogin ? 'Welcome Back!' : 'Create Account'}
                </h2>
                <p className="text-sm" style={{color: 'rgba(250, 250, 250, 0.7)'}}>
                  {isLogin 
                    ? 'Sign in to access your financial dashboard' 
                    : 'Join thousands of users managing their finances smarter'
                  }
                </p>
              </div>

              {/* Social Login */}
              <div className="space-y-3 mb-6">
                <button className="w-full flex items-center justify-center gap-3 p-3 rounded-2xl border hover:scale-105 transition-all duration-300" style={{background: 'rgba(250, 250, 250, 0.05)', borderColor: 'rgba(244, 197, 66, 0.3)', color: '#FAFAFA'}}>
                  <Chrome className="w-5 h-5" />
                  <span>Continue with Google</span>
                </button>
                <button className="w-full flex items-center justify-center gap-3 p-3 rounded-2xl border hover:scale-105 transition-all duration-300" style={{background: 'rgba(250, 250, 250, 0.05)', borderColor: 'rgba(244, 197, 66, 0.3)', color: '#FAFAFA'}}>
                  <Github className="w-5 h-5" />
                  <span>Continue with GitHub</span>
                </button>
              </div>

              {/* Divider */}
              <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t" style={{borderColor: 'rgba(244, 197, 66, 0.2)'}}></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4" style={{background: 'rgba(250, 250, 250, 0.08)', color: 'rgba(250, 250, 250, 0.7)'}}>
                    or continue with email
                  </span>
                </div>
              </div>

              {/* Form */}
              <div className="space-y-6">
                {!isLogin && (
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{color: '#FAFAFA'}}>
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{color: 'rgba(250, 250, 250, 0.5)'}} />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter your full name"
                        className="w-full pl-12 pr-4 py-3 rounded-2xl border focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300"
                        style={{
                          background: 'rgba(250, 250, 250, 0.1)',
                          borderColor: 'rgba(244, 197, 66, 0.3)',
                          color: '#FAFAFA'
                        }}
                        required
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium mb-2" style={{color: '#FAFAFA'}}>
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{color: 'rgba(250, 250, 250, 0.5)'}} />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email"
                      className="w-full pl-12 pr-4 py-3 rounded-2xl border focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300"
                      style={{
                        background: 'rgba(250, 250, 250, 0.1)',
                        borderColor: 'rgba(244, 197, 66, 0.3)',
                        color: '#FAFAFA'
                      }}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{color: '#FAFAFA'}}>
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{color: 'rgba(250, 250, 250, 0.5)'}} />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Enter your password"
                      className="w-full pl-12 pr-12 py-3 rounded-2xl border focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300"
                      style={{
                        background: 'rgba(250, 250, 250, 0.1)',
                        borderColor: 'rgba(244, 197, 66, 0.3)',
                        color: '#FAFAFA'
                      }}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" style={{color: 'rgba(250, 250, 250, 0.5)'}} />
                      ) : (
                        <Eye className="w-5 h-5" style={{color: 'rgba(250, 250, 250, 0.5)'}} />
                      )}
                    </button>
                  </div>
                </div>

                {!isLogin && (
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{color: '#FAFAFA'}}>
                      Confirm Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{color: 'rgba(250, 250, 250, 0.5)'}} />
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        placeholder="Confirm your password"
                        className="w-full pl-12 pr-12 py-3 rounded-2xl border focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300"
                        style={{
                          background: 'rgba(250, 250, 250, 0.1)',
                          borderColor: 'rgba(244, 197, 66, 0.3)',
                          color: '#FAFAFA'
                        }}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="w-5 h-5" style={{color: 'rgba(250, 250, 250, 0.5)'}} />
                        ) : (
                          <Eye className="w-5 h-5" style={{color: 'rgba(250, 250, 250, 0.5)'}} />
                        )}
                      </button>
                    </div>
                  </div>
                )}

                {isLogin && (
                  <div className="flex items-center justify-between">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-yellow-400 focus:ring-yellow-400"
                      />
                      <span className="ml-2 text-sm" style={{color: 'rgba(250, 250, 250, 0.7)'}}>
                        Remember me
                      </span>
                    </label>
                    <button
                      type="button"
                      className="text-sm hover:underline transition-all duration-300"
                      style={{color: '#F4C542'}}
                    >
                      Forgot password?
                    </button>
                  </div>
                )}

                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-2xl font-semibold text-white shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{background: 'linear-gradient(135deg, #F4C542 0%, #E6B73A 100%)'}}
                >
                  {isLoading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  ) : (
                    <>
                      <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>

              {/* Footer */}
              <div className="mt-6 text-center">
                <p className="text-sm" style={{color: 'rgba(250, 250, 250, 0.7)'}}>
                  {isLogin ? "Don't have an account? " : "Already have an account? "}
                  <button
                    onClick={() => setIsLogin(!isLogin)}
                    className="font-semibold hover:underline transition-all duration-300"
                    style={{color: '#F4C542'}}
                  >
                    {isLogin ? 'Sign up' : 'Sign in'}
                  </button>
                </p>
              </div>

              {!isLogin && (
                <div className="mt-4 text-center">
                  <p className="text-xs" style={{color: 'rgba(250, 250, 250, 0.5)'}}>
                    By creating an account, you agree to our{' '}
                    <a href="#" className="underline" style={{color: '#F4C542'}}>Terms of Service</a>{' '}
                    and{' '}
                    <a href="#" className="underline" style={{color: '#F4C542'}}>Privacy Policy</a>
                  </p>
                </div>
              )}
            </div>

            {/* Mobile Brand */}
            <div className="lg:hidden text-center mt-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="p-2 rounded-xl" style={{background: 'rgba(244, 197, 66, 0.2)'}}>
                  <Sparkles className="w-6 h-6" style={{color: '#F4C542'}} />
                </div>
                <h1 className="text-2xl font-bold" style={{color: '#FAFAFA'}}>FinanceAI</h1>
              </div>
              <p className="text-sm" style={{color: 'rgba(250, 250, 250, 0.7)'}}>
                Smart Financial Management
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;