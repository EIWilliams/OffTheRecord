'use client';

import React, { useState, useEffect } from 'react';

const Icon = ({ name, size = 18, className = "" }: { name: string; size?: number; className?: string }) => {
  useEffect(() => {
    if ((window as any).lucide) {
      (window as any).lucide.createIcons();
    }
  }, [name]);
  return <i data-lucide={name} className={`inline-block ${className}`} style={{ width: size, height: size }}></i>;
};

const DEADLINES_DATA = [
  {
    id: '1',
    firm: 'Clifford Chance',
    type: 'Vacation Scheme (Summer)',
    deadline: '2026-01-15',
    category: 'Law Firm',
    status: 'Closed'
  },
  {
    id: '2',
    firm: 'Freshfields Bruckhaus Deringer',
    type: 'Training Contract (Autumn)',
    deadline: '2026-07-31',
    category: 'Law Firm',
    status: 'Upcoming'
  },
  {
    id: '3',
    firm: '4 New Square',
    type: 'Pupillage Gateway',
    deadline: '2026-02-06',
    category: 'Chambers',
    status: 'Closed'
  },
  {
    id: '4',
    firm: 'Slaughter and May',
    type: 'Vacation Scheme (Spring)',
    deadline: '2026-11-30',
    category: 'Law Firm',
    status: 'Upcoming'
  }
];

export default function DeadlinesPage() {
  const [deadlines] = useState(DEADLINES_DATA);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/lucide@latest';
    script.async = true;
    script.onload = () => {
      if ((window as any).lucide) (window as any).lucide.createIcons();
    };
    document.body.appendChild(script);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans antialiased">
      <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <a href="/" className="bg-[#89021A] text-white p-2 rounded-lg flex items-center justify-center">
              <Icon name="scale" size={20} />
            </a>
            <a href="/" className="font-bold text-xl text-slate-900 tracking-tight">LegalPath UK</a>
          </div>
          
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="/" className="hover:text-[#89021A] transition">Directory</a>
            <a href="/deadlines" className="text-[#89021A] font-semibold transition">Deadlines</a>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#89021A]/10 text-[#89021A] mb-3">
            <Icon name="calendar" size={14} /> Application Trackers
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Key Recruitment Deadlines</h1>
          <p className="text-slate-500 text-sm mt-1">Keep track of vacation schemes, training contracts, and pupillage windows.</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase text-slate-400 font-semibold tracking-wider">
                  <th className="py-4 px-6">Employer</th>
                  <th className="py-4 px-6">Type</th>
                  <th className="py-4 px-6">Deadline Date</th>
                  <th className="py-4 px-6">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {deadlines.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/60 transition">
                    <td className="py-4 px-6 font-semibold text-slate-900">{item.firm}</td>
                    <td className="py-4 px-6 text-slate-600">{item.type}</td>
                    <td className="py-4 px-6 font-mono text-slate-500 text-xs">{item.deadline}</td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                        item.status === 'Upcoming' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-slate-100 text-slate-500 border border-slate-200'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
