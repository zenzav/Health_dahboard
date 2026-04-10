import React from 'react';

const variants = {
  Active: 'bg-green-100 text-green-700 ring-green-600/20',
  Inactive: 'bg-red-100 text-red-700 ring-red-600/20',
  Available: 'bg-blue-100 text-blue-700 ring-blue-600/20',
  'In Use': 'bg-amber-100 text-amber-700 ring-amber-600/20',
  Maintenance: 'bg-gray-100 text-gray-600 ring-gray-500/20',
  Male: 'bg-sky-100 text-sky-700 ring-sky-600/20',
  Female: 'bg-pink-100 text-pink-700 ring-pink-600/20',
  Other: 'bg-purple-100 text-purple-700 ring-purple-600/20',
};

export default function StatusBadge({ status }) {
  const cls = variants[status] || 'bg-gray-100 text-gray-600 ring-gray-500/20';
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ring-1 ring-inset ${cls}`}
    >
      {status}
    </span>
  );
}
