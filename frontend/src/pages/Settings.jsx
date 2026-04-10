import React, { useState } from 'react';
import { User, Lock, Info, Save, Eye, EyeOff, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Settings() {
  const { user } = useAuth();
  const [passwordForm, setPasswordForm] = useState({ current: '', newPass: '', confirm: '' });
  const [showPass, setShowPass] = useState({ current: false, newPass: false, confirm: false });
  const [saved, setSaved] = useState(false);
  const [pwError, setPwError] = useState('');

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    setPwError('');
    if (passwordForm.newPass !== passwordForm.confirm) {
      setPwError('New password and confirmation do not match.');
      return;
    }
    if (passwordForm.newPass.length < 6) {
      setPwError('New password must be at least 6 characters.');
      return;
    }
    setSaved(true);
    setPasswordForm({ current: '', newPass: '', confirm: '' });
    setTimeout(() => setSaved(false), 3000);
  };

  const toggle = (field) => setShowPass((prev) => ({ ...prev, [field]: !prev[field] }));

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Admin Profile */}
      <div className="card">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center">
            <User size={16} className="text-indigo-600" />
          </div>
          <h2 className="font-semibold text-gray-800">Admin Profile</h2>
        </div>
        <div className="flex items-center gap-5 p-4 bg-gray-50 rounded-xl">
          <div className="w-16 h-16 rounded-2xl bg-indigo-600 flex items-center justify-center flex-shrink-0">
            <User size={28} className="text-white" />
          </div>
          <div>
            <p className="font-semibold text-gray-800 text-lg">{user?.name || 'System Administrator'}</p>
            <p className="text-gray-500 text-sm capitalize">{user?.role || 'Administrator'}</p>
            <p className="text-gray-400 text-xs mt-0.5">@{user?.username || 'admin'}</p>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div className="p-3 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-400 mb-0.5">Username</p>
            <p className="text-sm font-medium text-gray-700">{user?.username || 'admin'}</p>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-400 mb-0.5">Role</p>
            <p className="text-sm font-medium text-gray-700 capitalize">{user?.role || 'Administrator'}</p>
          </div>
        </div>
      </div>

      {/* Change Password */}
      <div className="card">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center">
            <Lock size={16} className="text-amber-600" />
          </div>
          <h2 className="font-semibold text-gray-800">Change Password</h2>
        </div>

        {saved && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm flex items-center gap-2">
            <CheckCircle size={16} />
            Password updated successfully!
          </div>
        )}
        {pwError && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">{pwError}</div>
        )}

        <form onSubmit={handlePasswordSubmit} className="space-y-4">
          {[
            { key: 'current', label: 'Current Password', placeholder: 'Enter current password' },
            { key: 'newPass', label: 'New Password', placeholder: 'Enter new password' },
            { key: 'confirm', label: 'Confirm New Password', placeholder: 'Confirm new password' },
          ].map(({ key, label, placeholder }) => (
            <div key={key}>
              <label className="form-label">{label}</label>
              <div className="relative">
                <input
                  type={showPass[key] ? 'text' : 'password'}
                  className="form-input pr-10"
                  placeholder={placeholder}
                  value={passwordForm[key]}
                  onChange={(e) => setPasswordForm({ ...passwordForm, [key]: e.target.value })}
                  required
                />
                <button type="button" onClick={() => toggle(key)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showPass[key] ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
          ))}
          <div className="flex justify-end pt-1">
            <button type="submit" className="btn-primary"><Save size={15} /> Update Password</button>
          </div>
        </form>
      </div>

      {/* System Info */}
      <div className="card">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
            <Info size={16} className="text-blue-600" />
          </div>
          <h2 className="font-semibold text-gray-800">System Information</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { label: 'Application Name', value: 'HealthCare Management System' },
            { label: 'Version', value: 'v1.0.0' },
            { label: 'Frontend', value: 'React 18 + Vite + Tailwind CSS' },
            { label: 'Backend', value: 'Node.js + Express.js' },
            { label: 'Database', value: 'MongoDB + Mongoose' },
            { label: 'Authentication', value: 'JWT (JSON Web Token)' },
            { label: 'Environment', value: 'Development' },
            { label: 'Last Updated', value: new Date().toLocaleDateString() },
          ].map(({ label, value }) => (
            <div key={label} className="flex items-start justify-between p-3 bg-gray-50 rounded-lg gap-2">
              <span className="text-xs text-gray-500 flex-shrink-0">{label}</span>
              <span className="text-xs font-medium text-gray-700 text-right">{value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
