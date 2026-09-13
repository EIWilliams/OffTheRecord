'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';

const Icon = ({ name, size = 18, className = "" }: { name: string; size?: number; className?: string }) => {
  useEffect(() => {
    if ((window as any).lucide) {
      (window as any).lucide.createIcons();
    }
  }, [name]);
  return <i data-lucide={name} className={`inline-block ${className}`} style={{ width: size, height: size }}></i>;
};

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [entities, setEntities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/lucide@latest';
    script.async = true;
    script.onload = () => {
      if ((window as any).lucide) (window as any).lucide.createIcons();
    };
    document.body.appendChild(script);

    fetchLiveFirms();
  }, []);

  const fetchLiveFirms = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('firms').select('*').order('id', { ascending: false });
    if (!error && data) {
      setEntities(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    if ((window as any).lucide) {
      (window as any).lucide.createIcons();
    }
  }, [entities]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const filteredEntities = entities.filter((item: any) => {
    const practiceStr = item.practice_areas || '';
    const areas = practiceStr.split(',').map((s: string) => s.trim());

    const matchesTerm = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      areas.some((pa: string) => pa.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = filterType === 'all' || item.type === filterType;
    return matchesTerm && matchesType;
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans antialiased">
      <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-[#89021A] text-white p-2 rounded-lg flex items-center justify-center">
              <Icon name="scale" size={20} />
            </div>
            <span className="font-bold text-xl text-slate-900 tracking-tight">OffTheRecord</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="#" className="hover:text-[#89021A] transition">Hub</a>
            <a href="#" className="hover:text-[#89021A] transition">Chambers</a>
            <a href="#" className="hover:text-[#89021A] transition">Law Firms</a>
            <a href="#" className="hover:text-[#89021A] transition">Alternative Careers</a>
            <a href="#" className="hover:text-[#89021A] transition">Work Experience</a>
            <a href="#" className="hover:text-[#89021A] transition">Competitions</a>
            <a href="/deadlines" className="hover:text-[#89021A] transition">Deadlines</a>
          </nav>

          <a href="/admin" className="bg-[#89021A] hover:bg-[#A6122D] text-white text-sm font-semibold px-4 py-2 rounded-lg transition shadow-sm">
            Admin Panel
          </a>
        </div>
      </header>

      <section className="bg-slate-900 text-white pt-16 pb-20 px-4 sm:px-6 lg:px-8 text-center relative">
        <div className="max-w-4xl mx-auto">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-[#89021A]/20 text-red-200 border border-[#89021A]/40 mb-6">
            <Icon name="graduation-cap" size={14} /> Built Exclusively for UK Students, by Students
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-6 leading-tight">
            Find every Law Firm & Chambers in the UK.
          </h1>
          <p className="text-base sm:text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
            Compare NQ salaries, vacation scheme deadlines, practice areas, and entry requirements in one place.
          </p>

          <form onSubmit={handleSearch} className="bg-white p-2 rounded-2xl shadow-2xl flex flex-col sm:flex-row gap-2 max-w-3xl mx-auto text-left">
            <div className="flex items-center flex-1 px-3 bg-slate-50 rounded-xl border border-slate-200">
              <Icon name="search" size={18} className="text-slate-400 mr-2" />
              <input
                type="text"
                placeholder="Search name or area (e.g. Corporate, Arbitration)..."
                className="w-full bg-transparent py-3 text-slate-900 placeholder-slate-400 focus:outline-none text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex gap-2">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-xl px-3 py-3 focus:outline-none font-medium cursor-pointer"
              >
                <option value="all">All Types</option>
                <option value="law_firm">Law Firms</option>
                <option value="chambers">Chambers</option>
              </select>

              <button
                type="submit"
                className="bg-[#89021A] hover:bg-[#A6122D] text-white font-semibold px-6 py-3 rounded-xl transition flex items-center justify-center gap-1.5 shrink-0"
              >
                Filter <Icon name="chevron-right" size={16} />
              </button>
            </div>
          </form>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center">
          <div className="p-2 border-r border-slate-100 last:border-0">
            <p className="text-2xl sm:text-3xl font-extrabold text-[#89021A]">9,000+</p>
            <p className="text-xs text-slate-500 font-medium uppercase mt-1">Law Firms Listed</p>
          </div>
          <div className="p-2 border-r border-slate-100 last:border-0">
            <p className="text-2xl sm:text-3xl font-extrabold text-[#89021A]">350+</p>
            <p className="text-xs text-slate-500 font-medium uppercase mt-1">Barristers Chambers</p>
          </div>
          <div className="p-2 border-r border-slate-100 last:border-0">
            <p className="text-2xl sm:text-3xl font-extrabold text-[#89021A]">£180k</p>
            <p className="text-xs text-slate-500 font-medium uppercase mt-1">Highest US NQ Pay</p>
          </div>
          <div className="p-2">
            <p className="text-2xl sm:text-3xl font-extrabold text-[#89021A]">100%</p>
            <p className="text-xs text-slate-500 font-medium uppercase mt-1">Free for Students</p>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Legal Employers</h2>
            <p className="text-slate-500 text-sm mt-1">Top commercial law firms and chambers recruiting now.</p>
          </div>
          <span className="text-xs text-slate-400 font-mono">Showing {filteredEntities.length} results</span>
        </div>

        {loading ? (
          <div className="text-center py-12 text-slate-500">Loading live directory...</div>
        ) : filteredEntities.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-200">
            <p className="text-slate-500 font-medium">No firms found in the database yet.</p>
            <a href="/admin" className="text-[#89021A] font-semibold text-sm mt-2 inline-block hover:underline">Add your first firm in the Admin Panel &rarr;</a>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredEntities.map((entity: any) => {
              const practiceStr = entity.practice_areas || '';
              const areaList = practiceStr.split(',').map((s: string) => s.trim()).filter(Boolean);

              return (
                <div key={entity.id} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${
                        entity.type === 'law_firm' ? 'bg-[#89021A]/10 text-[#89021A] border border-[#89021A]/20' : 'bg-purple-50 text-purple-700 border border-purple-200'
                      }`}>
                        {entity.type === 'law_firm' ? 'Law Firm' : 'Chambers'}
                      </span>
                      <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
                        NQ £{Number(entity.nq_salary || 0).toLocaleString()}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-slate-900">{entity.name}</h3>
                    <div className="flex items-center gap-4 text-xs text-slate-500 mt-2 mb-4">
                      <span className="flex items-center gap-1"><Icon name="map-pin" size={12} /> {entity.hq_city || 'London'}</span>
                      <span className="flex items-center gap-1"><Icon name="briefcase" size={12} /> {entity.category || 'Commercial'}</span>
                    </div>

                    <div className="space-y-2 mb-6">
                      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Practice Areas</p>
                      <div className="flex flex-wrap gap-1">
                        {areaList.map((area: string, idx: number) => (
                          <span key={idx} className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                            {area}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                    <div>
                      <span className="text-slate-400 block">Intake / year</span>
                      <span className="font-bold text-slate-700">{entity.intake_count || 0} positions</span>
                    </div>
                    <a 
                      href={entity.website_url?.startsWith('http') ? entity.website_url : `https://${entity.website_url || '#'}`} 
                      target="_blank" 
                      rel="noreferrer"
                      className="bg-slate-900 hover:bg-[#89021A] text-white px-3 py-2 rounded-lg font-medium transition"
                    >
                      View Profile
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}