"use client";

import { useState } from 'react';
import Link from 'next/link';
import { 
  Scale, 
  GraduationCap, 
  Search, 
  ChevronRight, 
  MapPin, 
  Briefcase 
} from 'lucide-react';

const FEATURED_ENTITIES = [
  {
    id: '1',
    name: 'Clifford Chance',
    type: 'law_firm',
    category: 'Magic Circle',
    hq_city: 'London',
    locationsCount: 1,
    practiceAreas: ['Corporate', 'Banking & Finance', 'Litigation'],
    intakeCount: 95,
    nqSalary: 150000,
    websiteUrl: 'https://careers.cliffordchance.com'
  },
  {
    id: '2',
    name: '4 New Square',
    type: 'chambers',
    category: 'Commercial Set',
    hq_city: 'London',
    locationsCount: 1,
    practiceAreas: ['Commercial Disputes', 'Professional Negligence', 'Arbitration'],
    intakeCount: 3,
    nqSalary: 200000,
    websiteUrl: 'https://www.4newsquare.com'
  },
  {
    id: '3',
    name: 'Eversheds Sutherland',
    type: 'law_firm',
    category: 'International',
    hq_city: 'London',
    locationsCount: 7,
    practiceAreas: ['Real Estate', 'Employment', 'Commercial', 'Tax'],
    intakeCount: 50,
    nqSalary: 75000,
    websiteUrl: 'https://www.eversheds-sutherland.com'
  }
];

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [entities, setEntities] = useState(FEATURED_ENTITIES);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const filtered = FEATURED_ENTITIES.filter(item => {
      const matchesTerm = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.practiceAreas.some(pa => pa.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesType = filterType === 'all' || item.type === filterType;
      return matchesTerm && matchesType;
    });
    setEntities(filtered);
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-[#89021A] text-white p-2 rounded-lg flex items-center justify-center">
              <Scale className="w-5 h-5" />
            </div>
            <span className="font-bold text-xl text-slate-900 tracking-tight">Off the Record</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <Link href="/firms" className="hover:text-[#89021A] transition">Law Firms</Link>
            <Link href="/chambers" className="hover:text-[#89021A] transition">Chambers</Link>
            <Link href="/alternative-careers" className="hover:text-[#89021A] transition">Alternative Careers</Link>
          </nav>

          <button className="bg-[#89021A] hover:bg-[#A6122D] text-white text-sm font-semibold px-4 py-2 rounded-lg transition">
            Explore Directory
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-slate-900 text-white pt-16 pb-20 px-4 sm:px-6 lg:px-8 text-center relative">
        <div className="max-w-4xl mx-auto">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-[#89021A]/20 text-red-200 border border-[#89021A]/40 mb-6">
            <GraduationCap className="w-3.5 h-3.5" /> Built Exclusively for UK Law Students
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-6 leading-tight">
            Find every Law Firm & Chambers in the UK.
          </h1>
          <p className="text-base sm:text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
            Compare NQ salaries, vacation scheme deadlines, practice areas, and entry requirements in one place.
          </p>

          {/* Interactive Search Box */}
          <form onSubmit={handleSearch} className="bg-white p-2 rounded-2xl shadow-2xl flex flex-col sm:flex-row gap-2 max-w-3xl mx-auto text-left">
            <div className="flex items-center flex-1 px-3 bg-slate-50 rounded-xl border border-slate-200">
              <Search className="w-4 h-4 text-slate-400 mr-2" />
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
                Filter <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Stats Section */}
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

      {/* Featured Employers Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Featured Employers</h2>
            <p className="text-slate-500 text-sm mt-1">Top commercial law firms and chambers recruiting now.</p>
          </div>
          <span className="text-xs text-slate-400 font-mono">Showing {entities.length} results</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {entities.map((entity) => (
            <div key={entity.id} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${
                    entity.type === 'law_firm' ? 'bg-[#89021A]/10 text-[#89021A] border border-[#89021A]/20' : 'bg-purple-50 text-purple-700 border border-purple-200'
                  }`}>
                    {entity.type === 'law_firm' ? 'Law Firm' : 'Chambers'}
                  </span>
                  <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
                    NQ £{entity.nqSalary.toLocaleString()}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900">{entity.name}</h3>
                <div className="flex items-center gap-4 text-xs text-slate-500 mt-2 mb-4">
                  <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {entity.hq_city}</span>
                  <span className="flex items-center gap-1"><Briefcase className="w-3 h-3" /> {entity.category}</span>
                </div>

                <div className="space-y-2 mb-6">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Practice Areas</p>
                  <div className="flex flex-wrap gap-1">
                    {entity.practiceAreas.map((area) => (
                      <span key={area} className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                        {area}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <div>
                  <span className="text-slate-400 block">Intake / year</span>
                  <span className="font-bold text-slate-700">{entity.intakeCount} positions</span>
                </div>
                <a 
                  href={entity.websiteUrl} 
                  target="_blank" 
                  rel="noreferrer"
                  className="bg-slate-900 hover:bg-[#89021A] text-white px-3 py-2 rounded-lg font-medium transition"
                >
                  View Profile
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
