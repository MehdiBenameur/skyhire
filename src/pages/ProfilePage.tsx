// pages/ProfilePage.tsx
import React, { useState, useEffect } from 'react';
import { FiUser, FiMail, FiMapPin, FiPhone, FiEdit2, FiSave, FiAward, FiGlobe } from 'react-icons/fi';
import { authService } from '../services/authService';
import { userService } from '../services/userService';
import { useToast } from '../context/ToastContext';

const ProfilePage: React.FC = () => {
  const { showSuccess, showError } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [avatar, setAvatar] = useState<string | undefined>(authService.getCurrentUser()?.avatar);
  const [profile, setProfile] = useState({
    name: 'Loading...',
    email: '',
    position: 'Flight Attendant Candidate',
    location: '',
    phone: '',
    bio: '',
    skills: [] as string[],
    languages: [] as string[],
    experience: ''
  });

  const [newSkill, setNewSkill] = useState('');
  const [newLanguage, setNewLanguage] = useState('');

  const handleSave = async () => {
    setIsEditing(false);
    try {
      const current = authService.getCurrentUser();
      if (current && profile.name && profile.name !== current.name) {
        await authService.updateProfile({ name: profile.name });
      }
      await userService.updateProfile({
        headline: profile.position,
        bio: profile.bio,
        location: profile.location,
        phone: profile.phone,
        languages: profile.languages.map((l: any) => (
          typeof l === 'string' 
            ? { language: l, proficiency: 'fluent' } 
            : l
        )),
        // Remplacer la liste des compétences côté backend
        skills: profile.skills.map((s: any) => ({ name: typeof s === 'string' ? s : s?.name }))
      } as any);
      showSuccess('Profile updated successfully!');
    } catch (e: any) {
      showError(e?.message || 'Failed to update profile');
    }
  };


  const addSkill = () => {
    if (newSkill.trim() && !profile.skills.includes(newSkill)) {
      setProfile(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setProfile(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  useEffect(() => {
    const load = async () => {
      try {
        const current = authService.getCurrentUser();
        const p = await userService.getProfile();
        setProfile(prev => ({
          ...prev,
          name: current?.name || p.name || prev.name,
          email: current?.email || p.email || prev.email,
          position: p.headline || prev.position,
          location: p.location || '',
          phone: p.phone || '',
          bio: p.bio || '',
          skills: Array.isArray(p.skills) ? (p.skills as any[]).map((s: any) => s?.name || s) : [],
          languages: Array.isArray(p.languages) ? (p.languages as any[]).map((l: any) => l?.language || l) : []
        }));
      } catch (_) {
        // ignore for now
      }
    };
    load();
  }, []);

  const addLanguage = () => {
    if (newLanguage.trim() && !profile.languages.includes(newLanguage)) {
      setProfile(prev => ({
        ...prev,
        languages: [...prev.languages, newLanguage.trim()]
      }));
      setNewLanguage('');
    }
  };

  const removeLanguage = (languageToRemove: string) => {
    setProfile(prev => ({
      ...prev,
      languages: prev.languages.filter(language => language !== languageToRemove)
    }));
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-10 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-emirates font-bold text-black mb-3">
          My Profile
        </h1>
        <p className="text-gray-600 font-montessart text-lg">
          Manage your professional information and career details
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Content */}
        <div className="flex-1 space-y-6">
          {/* Profile Card */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-800 font-emirates">
                Personal Information
              </h2>
              <button
                onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                className="flex items-center gap-2 bg-[#423772] text-white px-4 py-2 rounded-lg font-montessart font-semibold hover:bg-[#312456] transition-colors"
              >
                {isEditing ? <FiSave className="text-lg" /> : <FiEdit2 className="text-lg" />}
                {isEditing ? 'Save Changes' : 'Edit Profile'}
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Avatar Section */}
              <div className="flex flex-col items-center lg:items-start space-y-4">
                {avatar ? (
                  <img src={avatar} alt="Avatar" className="w-32 h-32 rounded-2xl object-cover shadow-lg" />
                ) : (
                  <div className="w-32 h-32 bg-gradient-to-br from-[#423772] to-[#6D5BA6] rounded-2xl flex items-center justify-center text-white font-bold text-4xl font-emirates shadow-lg">
                    {profile.name.split(' ').map(n => n[0]).join('')}
                  </div>
                )}
                {/* Change Photo removed as requested */}
              </div>

              {/* Form Fields */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 font-montessart mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                    disabled={!isEditing}
                    className="w-full border border-gray-300 rounded-xl p-3 font-montessart disabled:bg-gray-100 disabled:text-gray-600 focus:ring-2 focus:ring-[#423772] focus:border-[#423772] outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 font-montessart mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                      disabled={!isEditing}
                      className="w-full border border-gray-300 rounded-xl pl-10 pr-3 py-3 font-montessart disabled:bg-gray-100 disabled:text-gray-600 focus:ring-2 focus:ring-[#423772] focus:border-[#423772] outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 font-montessart mb-2">
                    Current Position
                  </label>
                  <input
                    type="text"
                    value={profile.position}
                    onChange={(e) => setProfile(prev => ({ ...prev, position: e.target.value }))}
                    disabled={!isEditing}
                    className="w-full border border-gray-300 rounded-xl p-3 font-montessart disabled:bg-gray-100 disabled:text-gray-600 focus:ring-2 focus:ring-[#423772] focus:border-[#423772] outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Additional Fields */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 font-montessart mb-2">
                  <FiMapPin className="inline mr-2" />
                  Location
                </label>
                <input
                  type="text"
                  value={profile.location}
                  onChange={(e) => setProfile(prev => ({ ...prev, location: e.target.value }))}
                  disabled={!isEditing}
                  className="w-full border border-gray-300 rounded-xl p-3 font-montessart disabled:bg-gray-100 disabled:text-gray-600 focus:ring-2 focus:ring-[#423772] focus:border-[#423772] outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 font-montessart mb-2">
                  <FiPhone className="inline mr-2" />
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={profile.phone}
                  onChange={(e) => setProfile(prev => ({ ...prev, phone: e.target.value }))}
                  disabled={!isEditing}
                  className="w-full border border-gray-300 rounded-xl p-3 font-montessart disabled:bg-gray-100 disabled:text-gray-600 focus:ring-2 focus:ring-[#423772] focus:border-[#423772] outline-none transition-all"
                />
              </div>
            </div>

            {/* Bio */}
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 font-montessart mb-2">
                Professional Bio
              </label>
              <textarea
                value={profile.bio}
                onChange={(e) => setProfile(prev => ({ ...prev, bio: e.target.value }))}
                disabled={!isEditing}
                rows={4}
                className="w-full border border-gray-300 rounded-xl p-3 font-montessart disabled:bg-gray-100 disabled:text-gray-600 focus:ring-2 focus:ring-[#423772] focus:border-[#423772] outline-none transition-all resize-none"
              />
            </div>
          </div>

          {/* Skills Card */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-[#423772] rounded-xl flex items-center justify-center">
                <FiAward className="text-2xl text-white" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-800 font-emirates">
                Skills & Expertise
              </h2>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {profile.skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-gradient-to-r from-[#423772]/10 to-[#6D5BA6]/10 text-[#423772] px-3 py-2 rounded-lg font-montessart font-medium border border-[#423772]/20 flex items-center gap-2"
                >
                  {skill}
                  {isEditing && (
                    <button
                      onClick={() => removeSkill(skill)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                    >
                      ×
                    </button>
                  )}
                </span>
              ))}
            </div>

            {isEditing && (
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="Add a new skill..."
                  className="flex-1 border border-gray-300 rounded-xl p-3 font-montessart focus:ring-2 focus:ring-[#423772] focus:border-[#423772] outline-none transition-all"
                  onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                />
                <button
                  onClick={addSkill}
                  className="bg-[#423772] text-white px-4 py-3 rounded-xl font-montessart font-semibold hover:bg-[#312456] transition-colors"
                >
                  Add
                </button>
              </div>
            )}
          </div>

          {/* Languages Card */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                <FiGlobe className="text-2xl text-white" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-800 font-emirates">
                Languages
              </h2>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {profile.languages.map((language, index) => (
                <span
                  key={index}
                  className="bg-gradient-to-r from-green-500/10 to-green-600/10 text-green-800 px-3 py-2 rounded-lg font-montessart font-medium border border-green-500/20 flex items-center gap-2"
                >
                  {language}
                  {isEditing && (
                    <button
                      onClick={() => removeLanguage(language)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                    >
                      ×
                    </button>
                  )}
                </span>
              ))}
            </div>

            {isEditing && (
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newLanguage}
                  onChange={(e) => setNewLanguage(e.target.value)}
                  placeholder="Add a new language..."
                  className="flex-1 border border-gray-300 rounded-xl p-3 font-montessart focus:ring-2 focus:ring-[#423772] focus:border-[#423772] outline-none transition-all"
                  onKeyPress={(e) => e.key === 'Enter' && addLanguage()}
                />
                <button
                  onClick={addLanguage}
                  className="bg-green-500 text-white px-4 py-3 rounded-xl font-montessart font-semibold hover:bg-green-600 transition-colors"
                >
                  Add
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:w-80 space-y-6">
          {/* Profile Completion */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-800 font-montessart mb-4">Profile Completion</h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm font-montessart mb-1">
                  <span>Basic Information</span>
                  <span className="text-green-600 font-semibold">100%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full w-full"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm font-montessart mb-1">
                  <span>Skills & Languages</span>
                  <span className="text-[#423772] font-semibold">85%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-[#423772] h-2 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm font-montessart mb-1">
                  <span>Experience Details</span>
                  <span className="text-yellow-600 font-semibold">60%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-gradient-to-br from-[#423772] to-[#6D5BA6] rounded-2xl p-6 text-white">
            <h3 className="font-semibold font-montessart mb-4">Profile Stats</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-montessart">Profile Views</span>
                <span className="font-emirates font-bold">128</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-montessart">Connections</span>
                <span className="font-emirates font-bold">48</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-montessart">Last Updated</span>
                <span className="font-emirates font-bold">Today</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;