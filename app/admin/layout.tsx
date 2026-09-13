'use client';

import React, { useEffect } from 'react';

const Icon = ({ name, size = 18, className = "" }: { name: string; size?: number; className?: string }) => {
  useEffect(() => {
    if ((window as any).lucide) {
      (window as any).lucide.createIcons();
    }
  }, [name]);
  return <i data-lucide={name} className={`inline-block ${className}`} style={{ width: size, height: size }}></i>;
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
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
    <div className="flex h-screen w-screen bg-slate-950 text-slate-100 overflow-hidden font-sans antialiased">
      {/* Left Sidebar - Locked and always visible */}
      <aside className="w-64 flex-shrink-0 border-r border-slate-800 flex flex-col justify-between p-6 bg-slate-900">
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-[#89021A] text-white p-2.5 rounded-xl flex items-center justify-center">
              <Icon name="scale" size={20} />
            </div>
            <div>
              <span className="font-bold text-sm tracking-wide block text-white">ADMIN PANEL</span>
              <span className="text-xs text-slate-400">OffTheRecord</span>
            </div>
          </div>

          <div className="space-y-1">
            <a href="/admin" className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-[#89021A] text-white font-medium text-sm">
              <Icon name="briefcase" size={16} /> Directory Control
            </a>
            <a href="/" className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white transition text-sm">
              <Icon name="external-link" size={16} /> View Live Website
            </a>
          </div>
        </div>

        <div className="text-xs text-emerald-400 bg-emerald-950/40 p-3 rounded-xl border border-emerald-900/50 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          Shared Database Connected
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden bg-slate-50 text-slate-900">
        {/* Top Header Bar with horizontal line */}
        <header className="h-16 border-b border-slate-200 flex items-center px-8 bg-white flex-shrink-0">
          <div className="text-xs tracking-wider text-slate-400 font-mono">
            OFFTHERECORD <span className="text-slate-300 mx-2">&gt;</span> <span className="text-[#89021A] font-semibold">ADMIN DASHBOARD</span>
          </div>
        </header>

        {/* Scrollable Page View */}
        <main className="flex-1 overflow-y-auto p-6 sm:p-10">
          {children}
        </main>
      </div>
    </div>
  );
}