import React, { useState } from 'react';
import { 
  User, Mail, Lock, Bell, Shield, CreditCard, Globe, Moon, Sun, 
  Camera, Edit3, Save, X, Eye, EyeOff, Trash2, Download, 
  Smartphone, MapPin, Calendar, Phone, Building, AlertTriangle,
  CheckCircle, Settings, LogOut, ArrowRight, Sparkles
} from 'lucide-react';

const ProfileSettingsPage = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    marketing: false
  });
  
  const [profileData, setProfileData] = useState({
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    phone: '+1 (555) 123-4567',
    location: 'New York, NY',
    company: 'Tech Solutions Inc.',
    joinDate: 'January 2024',
    bio: 'Financial analyst passionate about smart money management and AI-driven insights.'
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleProfileUpdate = () => {
    setIsEditing(false);
    // Handle profile update logic here
    console.log('Profile updated:', profileData);
  };

  const handlePasswordChange = () => {
    // Handle password change logic here
    console.log('Password change requested');
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  const handleNotificationToggle = (type) => {
    setNotifications(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'preferences', label: 'Preferences', icon: Settings },
    { id: 'billing', label: 'Billing', icon: CreditCard }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="space-y-8">
            {/* Profile Header */}
            <div className="flex items-start gap-6">
              <div className="relative">
                <div className="w-24 h-24 rounded-2xl overflow-hidden" style={{background: 'linear-gradient(135deg, #F4C542 0%, #E6B73A 100%)'}}>
                  <div className="w-full h-full flex items-center justify-center">
                    <User className="w-12 h-12 text-white" />
                  </div>
                </div>
                <button className="absolute -bottom-2 -right-2 p-2 rounded-xl shadow-lg hover:scale-105 transition-transform" 
                        style={{background: 'rgba(244, 197, 66, 0.9)'}}>
                  <Camera className="w-4 h-4 text-white" />
                </button>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-2xl font-bold" style={{color: '#FAFAFA'}}>{profileData.name}</h2>
                  <button 
                    onClick={() => setIsEditing(!isEditing)}
                    className="p-2 rounded-xl hover:scale-105 transition-all"
                    style={{background: 'rgba(244, 197, 66, 0.2)'}}
                  >
                    {isEditing ? <X className="w-4 h-4" style={{color: '#F4C542'}} /> : <Edit3 className="w-4 h-4" style={{color: '#F4C542'}} />}
                  </button>
                </div>
                <p className="text-sm mb-3" style={{color: 'rgba(250, 250, 250, 0.7)'}}>{profileData.bio}</p>
                <div className="flex items-center gap-4 text-sm" style={{color: 'rgba(250, 250, 250, 0.6)'}}>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    Joined {profileData.joinDate}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {profileData.location}
                  </span>
                </div>
              </div>
            </div>

            {/* Profile Form */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2" style={{color: '#FAFAFA'}}>Full Name</label>
                <input
                  type="text"
                  value={profileData.name}
                  onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 rounded-2xl border transition-all duration-300"
                  style={{
                    background: 'rgba(250, 250, 250, 0.1)',
                    borderColor: 'rgba(244, 197, 66, 0.3)',
                    color: '#FAFAFA'
                  }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2" style={{color: '#FAFAFA'}}>Email Address</label>
                <input
                  type="email"
                  value={profileData.email}
                  onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 rounded-2xl border transition-all duration-300"
                  style={{
                    background: 'rgba(250, 250, 250, 0.1)',
                    borderColor: 'rgba(244, 197, 66, 0.3)',
                    color: '#FAFAFA'
                  }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2" style={{color: '#FAFAFA'}}>Phone Number</label>
                <input
                  type="tel"
                  value={profileData.phone}
                  onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 rounded-2xl border transition-all duration-300"
                  style={{
                    background: 'rgba(250, 250, 250, 0.1)',
                    borderColor: 'rgba(244, 197, 66, 0.3)',
                    color: '#FAFAFA'
                  }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2" style={{color: '#FAFAFA'}}>Location</label>
                <input
                  type="text"
                  value={profileData.location}
                  onChange={(e) => setProfileData({...profileData, location: e.target.value})}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 rounded-2xl border transition-all duration-300"
                  style={{
                    background: 'rgba(250, 250, 250, 0.1)',
                    borderColor: 'rgba(244, 197, 66, 0.3)',
                    color: '#FAFAFA'
                  }}
                />
              </div>
              <div className="lg:col-span-2">
                <label className="block text-sm font-medium mb-2" style={{color: '#FAFAFA'}}>Company</label>
                <input
                  type="text"
                  value={profileData.company}
                  onChange={(e) => setProfileData({...profileData, company: e.target.value})}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 rounded-2xl border transition-all duration-300"
                  style={{
                    background: 'rgba(250, 250, 250, 0.1)',
                    borderColor: 'rgba(244, 197, 66, 0.3)',
                    color: '#FAFAFA'
                  }}
                />
              </div>
              <div className="lg:col-span-2">
                <label className="block text-sm font-medium mb-2" style={{color: '#FAFAFA'}}>Bio</label>
                <textarea
                  value={profileData.bio}
                  onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                  disabled={!isEditing}
                  rows={3}
                  className="w-full px-4 py-3 rounded-2xl border transition-all duration-300 resize-none"
                  style={{
                    background: 'rgba(250, 250, 250, 0.1)',
                    borderColor: 'rgba(244, 197, 66, 0.3)',
                    color: '#FAFAFA'
                  }}
                />
              </div>
            </div>

            {isEditing && (
              <div className="flex gap-4">
                <button
                  onClick={handleProfileUpdate}
                  className="flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold text-white hover:scale-105 transition-all"
                  style={{background: 'linear-gradient(135deg, #F4C542 0%, #E6B73A 100%)'}}
                >
                  <Save className="w-4 h-4" />
                  Save Changes
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-6 py-3 rounded-2xl border hover:scale-105 transition-all"
                  style={{borderColor: 'rgba(244, 197, 66, 0.3)', color: 'rgba(250, 250, 250, 0.7)'}}
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        );

      case 'security':
        return (
          <div className="space-y-8">
            {/* Password Change */}
            <div className="p-6 rounded-3xl" style={{background: 'rgba(250, 250, 250, 0.05)', border: '1px solid rgba(244, 197, 66, 0.2)'}}>
              <h3 className="text-xl font-semibold mb-4" style={{color: '#FAFAFA'}}>Change Password</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{color: '#FAFAFA'}}>Current Password</label>
                  <div className="relative">
                    <input
                      type={showCurrentPassword ? 'text' : 'password'}
                      value={passwordData.currentPassword}
                      onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                      className="w-full px-4 py-3 pr-12 rounded-2xl border transition-all duration-300"
                      style={{
                        background: 'rgba(250, 250, 250, 0.1)',
                        borderColor: 'rgba(244, 197, 66, 0.3)',
                        color: '#FAFAFA'
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2"
                    >
                      {showCurrentPassword ? <EyeOff className="w-5 h-5" style={{color: 'rgba(250, 250, 250, 0.5)'}} /> : <Eye className="w-5 h-5" style={{color: 'rgba(250, 250, 250, 0.5)'}} />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2" style={{color: '#FAFAFA'}}>New Password</label>
                  <div className="relative">
                    <input
                      type={showNewPassword ? 'text' : 'password'}
                      value={passwordData.newPassword}
                      onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                      className="w-full px-4 py-3 pr-12 rounded-2xl border transition-all duration-300"
                      style={{
                        background: 'rgba(250, 250, 250, 0.1)',
                        borderColor: 'rgba(244, 197, 66, 0.3)',
                        color: '#FAFAFA'
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2"
                    >
                      {showNewPassword ? <EyeOff className="w-5 h-5" style={{color: 'rgba(250, 250, 250, 0.5)'}} /> : <Eye className="w-5 h-5" style={{color: 'rgba(250, 250, 250, 0.5)'}} />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2" style={{color: '#FAFAFA'}}>Confirm New Password</label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={passwordData.confirmPassword}
                      onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                      className="w-full px-4 py-3 pr-12 rounded-2xl border transition-all duration-300"
                      style={{
                        background: 'rgba(250, 250, 250, 0.1)',
                        borderColor: 'rgba(244, 197, 66, 0.3)',
                        color: '#FAFAFA'
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2"
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" style={{color: 'rgba(250, 250, 250, 0.5)'}} /> : <Eye className="w-5 h-5" style={{color: 'rgba(250, 250, 250, 0.5)'}} />}
                    </button>
                  </div>
                </div>
                <button
                  onClick={handlePasswordChange}
                  className="flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold text-white hover:scale-105 transition-all"
                  style={{background: 'linear-gradient(135deg, #F4C542 0%, #E6B73A 100%)'}}
                >
                  <Lock className="w-4 h-4" />
                  Update Password
                </button>
              </div>
            </div>

            {/* Two-Factor Authentication */}
            <div className="p-6 rounded-3xl" style={{background: 'rgba(250, 250, 250, 0.05)', border: '1px solid rgba(244, 197, 66, 0.2)'}}>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold" style={{color: '#FAFAFA'}}>Two-Factor Authentication</h3>
                  <p className="text-sm" style={{color: 'rgba(250, 250, 250, 0.7)'}}>Add an extra layer of security to your account</p>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" style={{color: '#059669'}} />
                  <span className="text-sm font-medium" style={{color: '#059669'}}>Enabled</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Smartphone className="w-5 h-5" style={{color: 'rgba(250, 250, 250, 0.7)'}} />
                <span className="text-sm" style={{color: 'rgba(250, 250, 250, 0.7)'}}>Authenticator app configured</span>
                <button className="ml-auto text-sm hover:underline" style={{color: '#F4C542'}}>
                  Reconfigure
                </button>
              </div>
            </div>

            {/* Active Sessions */}
            <div className="p-6 rounded-3xl" style={{background: 'rgba(250, 250, 250, 0.05)', border: '1px solid rgba(244, 197, 66, 0.2)'}}>
              <h3 className="text-xl font-semibold mb-4" style={{color: '#FAFAFA'}}>Active Sessions</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-2xl" style={{background: 'rgba(250, 250, 250, 0.05)'}}>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl" style={{background: 'rgba(244, 197, 66, 0.2)'}}>
                      <Globe className="w-4 h-4" style={{color: '#F4C542'}} />
                    </div>
                    <div>
                      <p className="font-medium" style={{color: '#FAFAFA'}}>Chrome on Windows</p>
                      <p className="text-xs" style={{color: 'rgba(250, 250, 250, 0.6)'}}>New York, NY • Current session</p>
                    </div>
                  </div>
                  <span className="text-xs px-2 py-1 rounded-lg" style={{background: 'rgba(5, 150, 105, 0.2)', color: '#059669'}}>
                    Active
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-2xl" style={{background: 'rgba(250, 250, 250, 0.05)'}}>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl" style={{background: 'rgba(244, 197, 66, 0.2)'}}>
                      <Smartphone className="w-4 h-4" style={{color: '#F4C542'}} />
                    </div>
                    <div>
                      <p className="font-medium" style={{color: '#FAFAFA'}}>Mobile App</p>
                      <p className="text-xs" style={{color: 'rgba(250, 250, 250, 0.6)'}}>Last active 2 hours ago</p>
                    </div>
                  </div>
                  <button className="text-xs px-3 py-1 rounded-lg hover:scale-105 transition-all" style={{background: 'rgba(220, 38, 127, 0.2)', color: '#DC2678'}}>
                    Revoke
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'notifications':
        return (
          <div className="space-y-6">
            {[
              {
                key: 'email',
                title: 'Email Notifications',
                description: 'Receive notifications via email about account activity and updates',
                icon: Mail
              },
              {
                key: 'push',
                title: 'Push Notifications',
                description: 'Get real-time notifications on your devices',
                icon: Bell
              },
              {
                key: 'sms',
                title: 'SMS Notifications',
                description: 'Receive important alerts via text message',
                icon: Phone
              },
              {
                key: 'marketing',
                title: 'Marketing Communications',
                description: 'Updates about new features, tips, and promotional offers',
                icon: Sparkles
              }
            ].map((item) => {
              const IconComponent = item.icon;
              return (
                <div key={item.key} className="flex items-center justify-between p-6 rounded-3xl" style={{background: 'rgba(250, 250, 250, 0.05)', border: '1px solid rgba(244, 197, 66, 0.2)'}}>
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-2xl" style={{background: 'rgba(244, 197, 66, 0.2)'}}>
                      <IconComponent className="w-5 h-5" style={{color: '#F4C542'}} />
                    </div>
                    <div>
                      <h3 className="font-semibold" style={{color: '#FAFAFA'}}>{item.title}</h3>
                      <p className="text-sm" style={{color: 'rgba(250, 250, 250, 0.7)'}}>{item.description}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleNotificationToggle(item.key)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      notifications[item.key] ? 'bg-yellow-400' : 'bg-gray-600'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        notifications[item.key] ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              );
            })}
          </div>
        );

      case 'preferences':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between p-6 rounded-3xl" style={{background: 'rgba(250, 250, 250, 0.05)', border: '1px solid rgba(244, 197, 66, 0.2)'}}>
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-2xl" style={{background: 'rgba(244, 197, 66, 0.2)'}}>
                  {isDarkMode ? <Moon className="w-5 h-5" style={{color: '#F4C542'}} /> : <Sun className="w-5 h-5" style={{color: '#F4C542'}} />}
                </div>
                <div>
                  <h3 className="font-semibold" style={{color: '#FAFAFA'}}>Dark Mode</h3>
                  <p className="text-sm" style={{color: 'rgba(250, 250, 250, 0.7)'}}>Switch between light and dark themes</p>
                </div>
              </div>
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  isDarkMode ? 'bg-yellow-400' : 'bg-gray-600'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    isDarkMode ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="p-6 rounded-3xl" style={{background: 'rgba(250, 250, 250, 0.05)', border: '1px solid rgba(244, 197, 66, 0.2)'}}>
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-2xl" style={{background: 'rgba(244, 197, 66, 0.2)'}}>
                  <Globe className="w-5 h-5" style={{color: '#F4C542'}} />
                </div>
                <div>
                  <h3 className="font-semibold" style={{color: '#FAFAFA'}}>Language & Region</h3>
                  <p className="text-sm" style={{color: 'rgba(250, 250, 250, 0.7)'}}>Set your preferred language and region</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{color: '#FAFAFA'}}>Language</label>
                  <select className="w-full px-4 py-3 rounded-2xl border transition-all duration-300"
                          style={{
                            background: 'rgba(250, 250, 250, 0.1)',
                            borderColor: 'rgba(244, 197, 66, 0.3)',
                            color: '#FAFAFA'
                          }}>
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                    <option value="de">German</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2" style={{color: '#FAFAFA'}}>Currency</label>
                  <select className="w-full px-4 py-3 rounded-2xl border transition-all duration-300"
                          style={{
                            background: 'rgba(250, 250, 250, 0.1)',
                            borderColor: 'rgba(244, 197, 66, 0.3)',
                            color: '#FAFAFA'
                          }}>
                    <option value="usd">USD ($)</option>
                    <option value="eur">EUR (€)</option>
                    <option value="gbp">GBP (£)</option>
                    <option value="jpy">JPY (¥)</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-3xl" style={{background: 'rgba(250, 250, 250, 0.05)', border: '1px solid rgba(244, 197, 66, 0.2)'}}>
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-2xl" style={{background: 'rgba(244, 197, 66, 0.2)'}}>
                  <Download className="w-5 h-5" style={{color: '#F4C542'}} />
                </div>
                <div>
                  <h3 className="font-semibold" style={{color: '#FAFAFA'}}>Data & Privacy</h3>
                  <p className="text-sm" style={{color: 'rgba(250, 250, 250, 0.7)'}}>Manage your data and privacy settings</p>
                </div>
              </div>
              <div className="space-y-3">
                <button className="w-full flex items-center justify-between p-3 rounded-2xl hover:scale-105 transition-all" style={{background: 'rgba(250, 250, 250, 0.05)'}}>
                  <span style={{color: '#FAFAFA'}}>Download your data</span>
                  <ArrowRight className="w-4 h-4" style={{color: 'rgba(250, 250, 250, 0.5)'}} />
                </button>
                <button className="w-full flex items-center justify-between p-3 rounded-2xl hover:scale-105 transition-all" style={{background: 'rgba(250, 250, 250, 0.05)'}}>
                  <span style={{color: '#FAFAFA'}}>Privacy settings</span>
                  <ArrowRight className="w-4 h-4" style={{color: 'rgba(250, 250, 250, 0.5)'}} />
                </button>
              </div>
            </div>
          </div>
        );

      case 'billing':
        return (
          <div className="space-y-8">
            {/* Current Plan */}
            <div className="p-6 rounded-3xl" style={{background: 'rgba(250, 250, 250, 0.05)', border: '1px solid rgba(244, 197, 66, 0.2)'}}>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold" style={{color: '#FAFAFA'}}>Current Plan</h3>
                  <p className="text-sm" style={{color: 'rgba(250, 250, 250, 0.7)'}}>Pro Plan - $19.99/month</p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold" style={{color: '#F4C542'}}>$19.99</span>
                  <p className="text-sm" style={{color: 'rgba(250, 250, 250, 0.7)'}}>per month</p>
                </div>
              </div>
              <div className="flex items-center gap-4 mb-4">
                <CheckCircle className="w-5 h-5" style={{color: '#059669'}} />
                <span className="text-sm" style={{color: 'rgba(250, 250, 250, 0.7)'}}>Next billing date: January 28, 2025</span>
              </div>
              <button className="px-6 py-3 rounded-2xl border hover:scale-105 transition-all" style={{borderColor: 'rgba(244, 197, 66, 0.3)', color: 'rgba(250, 250, 250, 0.7)'}}>
                Change Plan
              </button>
            </div>

            {/* Payment Method */}
            <div className="p-6 rounded-3xl" style={{background: 'rgba(250, 250, 250, 0.05)', border: '1px solid rgba(244, 197, 66, 0.2)'}}>
              <h3 className="text-xl font-semibold mb-4" style={{color: '#FAFAFA'}}>Payment Method</h3>
              <div className="flex items-center justify-between p-4 rounded-2xl mb-4" style={{background: 'rgba(250, 250, 250, 0.05)'}}>
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-2xl" style={{background: 'rgba(244, 197, 66, 0.2)'}}>
                    <CreditCard className="w-5 h-5" style={{color: '#F4C542'}} />
                  </div>
                  <div>
                    <p className="font-medium" style={{color: '#FAFAFA'}}>•••• •••• •••• 4242</p>
                    <p className="text-sm" style={{color: 'rgba(250, 250, 250, 0.7)'}}>Expires 12/26</p>
                  </div>
                </div>
                <button className="text-sm hover:underline" style={{color: '#F4C542'}}>
                  Update
                </button>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 rounded-2xl border hover:scale-105 transition-all" style={{borderColor: 'rgba(244, 197, 66, 0.3)', color: 'rgba(250, 250, 250, 0.7)'}}>
                <CreditCard className="w-4 h-4" />
                Add Payment Method
              </button>
            </div>

            {/* Billing History */}
            <div className="p-6 rounded-3xl" style={{background: 'rgba(250, 250, 250, 0.05)', border: '1px solid rgba(244, 197, 66, 0.2)'}}>
              <h3 className="text-xl font-semibold mb-4" style={{color: '#FAFAFA'}}>Billing History</h3>
              <div className="space-y-3">
                {[
                  { date: 'Dec 28, 2024', amount: '$19.99', status: 'Paid' },
                  { date: 'Nov 28, 2024', amount: '$19.99', status: 'Paid' },
                  { date: 'Oct 28, 2024', amount: '$19.99', status: 'Paid' }
                ].map((invoice, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-2xl" style={{background: 'rgba(250, 250, 250, 0.05)'}}>
                    <div>
                      <p className="font-medium" style={{color: '#FAFAFA'}}>{invoice.date}</p>
                      <p className="text-sm" style={{color: 'rgba(250, 250, 250, 0.7)'}}>Pro Plan</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium" style={{color: '#FAFAFA'}}>{invoice.amount}</p>
                      <span className="text-xs px-2 py-1 rounded-lg" style={{background: 'rgba(5, 150, 105, 0.2)', color: '#059669'}}>
                        {invoice.status}
                      </span>
                    </div>
                    <button className="text-sm hover:underline ml-4" style={{color: '#F4C542'}}>
                      Download
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-green-700 relative overflow-hidden" style={{background: 'linear-gradient(135deg, #22543D 0%, #2D5A41 50%, #1A4B35 100%)'}}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full blur-3xl animate-pulse" style={{background: 'radial-gradient(circle, rgba(244, 197, 66, 0.15) 0%, transparent 70%)'}}></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse delay-1000" style={{background: 'radial-gradient(circle, rgba(139, 28, 34, 0.12) 0%, transparent 70%)'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full blur-3xl animate-pulse delay-500" style={{background: 'radial-gradient(circle, rgba(5, 150, 105, 0.1) 0%, transparent 70%)'}}></div>
      </div>

      <div className="relative z-10 min-h-screen">
        {/* Header */}
        <div className="p-6 lg:p-8 border-b" style={{borderColor: 'rgba(244, 197, 66, 0.2)'}}>
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl shadow-lg" style={{background: 'linear-gradient(135deg, #F4C542 0%, #E6B73A 100%)'}}>
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold" style={{color: '#FAFAFA'}}>Account Settings</h1>
                <p className="text-sm" style={{color: 'rgba(250, 250, 250, 0.7)'}}>Manage your account and preferences</p>
              </div>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 rounded-2xl border hover:scale-105 transition-all" style={{borderColor: 'rgba(244, 197, 66, 0.3)', color: 'rgba(250, 250, 250, 0.7)'}}>
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </div>

        <div className="max-w-6xl mx-auto p-6 lg:p-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <div className="lg:w-1/4">
              <div className="backdrop-blur-2xl border rounded-3xl p-6 shadow-2xl" style={{background: 'rgba(250, 250, 250, 0.08)', borderColor: 'rgba(244, 197, 66, 0.2)'}}>
                <nav className="space-y-2">
                  {tabs.map((tab) => {
                    const IconComponent = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 ${
                          activeTab === tab.id 
                            ? 'scale-105 shadow-lg' 
                            : 'hover:scale-105'
                        }`}
                        style={{
                          background: activeTab === tab.id 
                            ? 'linear-gradient(135deg, #F4C542 0%, #E6B73A 100%)' 
                            : 'rgba(250, 250, 250, 0.05)',
                          color: activeTab === tab.id ? '#FFFFFF' : '#FAFAFA'
                        }}
                      >
                        <IconComponent className="w-5 h-5" />
                        <span className="font-medium">{tab.label}</span>
                      </button>
                    );
                  })}
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:w-3/4">
              <div className="backdrop-blur-2xl border rounded-3xl p-8 shadow-2xl" style={{background: 'rgba(250, 250, 250, 0.08)', borderColor: 'rgba(244, 197, 66, 0.2)'}}>
                {renderTabContent()}
              </div>
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="max-w-6xl mx-auto px-6 lg:px-8 pb-8">
          <div className="backdrop-blur-2xl border rounded-3xl p-8 shadow-2xl" style={{background: 'rgba(220, 38, 127, 0.1)', borderColor: 'rgba(220, 38, 127, 0.3)'}}>
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="w-6 h-6" style={{color: '#DC2678'}} />
              <h3 className="text-xl font-semibold" style={{color: '#FAFAFA'}}>Danger Zone</h3>
            </div>
            <p className="text-sm mb-6" style={{color: 'rgba(250, 250, 250, 0.7)'}}>
              Once you delete your account, there is no going back. Please be certain.
            </p>
            <button className="flex items-center gap-2 px-6 py-3 rounded-2xl border hover:scale-105 transition-all" style={{borderColor: 'rgba(220, 38, 127, 0.5)', color: '#DC2678'}}>
              <Trash2 className="w-4 h-4" />
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettingsPage;