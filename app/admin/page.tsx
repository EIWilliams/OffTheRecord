'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const Icon = ({ name, size = 18, className = "" }: { name: string; size?: number; className?: string }) => {
  useEffect(() => {
    if ((window as any).lucide) {
      (window as any).lucide.createIcons();
    }
  }, [name]);
  return <i data-lucide={name} className={`inline-block ${className}`} style={{ width: size, height: size }}></i>;
};

export default function AdminPanel() {
  const [entities, setEntities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [savedMessage, setSavedMessage] = useState('');

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/lucide@latest';
    script.async = true;
    script.onload = () => {
      if ((window as any).lucide) (window as any).lucide.createIcons();
    };
    document.body.appendChild(script);

    fetchFirms();
  }, []);

  const fetchFirms = async () => {
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

  const handleFieldChange = (id: any, field: string, value: any) => {
    setEntities(prev => prev.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const handleSaveCard = async (entity: any) => {
    const { error } = await supabase
      .from('firms')
      .update({
        name: entity.name,
        type: entity.type,
        category: entity.category,
        hq_city: entity.hq_city,
        practice_areas: entity.practice_areas,
        intake_count: Number(entity.intake_count),
        nq_salary: Number(entity.nq_salary),
        website_url: entity.website_url
      })
      .eq('id', entity.id);

    if (error) {
      alert('Error saving: ' + error.message);
    } else {
      setSavedMessage(`Successfully saved changes for: ${entity.name}`);
      setTimeout(() => setSavedMessage(''), 3000);
    }
  };

  const handleDeleteCard = async (id: any) => {
    const { error } = await supabase.from('firms').delete().eq('id', id);
    if (!error) {
      setEntities(prev => prev.filter(item => item.id !== id));
    } else {
      alert('Error deleting: ' + error.message);
    }
  };

  const handleAddEntity = async () => {
    const newFirm = {
      name: 'New Firm or Chambers',
      type: 'law_firm',
      category: 'Commercial',
      hq_city: 'London',
      practice_areas: 'Corporate, Commercial',
      intake_count: 10,
      nq_salary: 75000,
      website_url: 'https://'
    };

    const { data, error } = await supabase.from('firms').insert([newFirm]).select();
    if (!error && data) {
      setEntities([data[0], ...entities]);
    } else {
      alert('Error adding: ' + error.message);
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Directory Management</h1>
          <p className="text-slate-500 text-sm mt-1">Changes save directly to the live database for all users.</p>
        </div>
        <button
          onClick={fetchFirms}
          className="bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold text-sm px-4 py-2.5 rounded-xl transition flex items-center gap-2 cursor-pointer"
        >
          <Icon name="refresh-cw" size={16} /> Refresh Data
        </button>
      </div>

      {savedMessage && (
        <div className="mb-6 bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-2xl text-sm font-medium flex items-center gap-2">
          <Icon name="check-circle" size={16} /> {savedMessage}
        </div>
      )}

      {loading ? (
        <div className="text-center py-12 text-slate-500">Loading database records...</div>
      ) : (
        <div className="space-y-4 mb-6">
          {entities.map((entity) => (
            <div key={entity.id} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm transition hover:shadow-md">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 mb-4 border-b border-slate-100">
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <span className={`text-xs px-3 py-1 rounded-full font-semibold ${
                    entity.type === 'law_firm' ? 'bg-[#89021A]/10 text-[#89021A] border border-[#89021A]/20' : 'bg-purple-50 text-purple-700 border border-purple-200'
                  }`}>
                    {entity.type === 'law_firm' ? 'Law Firm' : 'Chambers'}
                  </span>
                  <input
                    type="text"
                    value={entity.name}
                    onChange={(e) => handleFieldChange(entity.id, 'name', e.target.value)}
                    className="font-bold text-lg text-slate-900 bg-transparent border-b border-transparent hover:border-slate-300 focus:border-[#89021A] focus:outline-none px-1 w-full"
                  />
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleSaveCard(entity)}
                    className="bg-slate-900 hover:bg-[#89021A] text-white text-xs font-semibold px-4 py-2 rounded-xl transition flex items-center gap-1.5 cursor-pointer"
                  >
                    <Icon name="save" size={14} /> Save
                  </button>
                  <button
                    onClick={() => handleDeleteCard(entity.id)}
                    className="bg-red-50 hover:bg-red-100 text-red-600 p-2 rounded-xl transition cursor-pointer"
                    title="Delete entry"
                  >
                    <Icon name="trash-2" size={16} />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Type</label>
                  <select
                    value={entity.type}
                    onChange={(e) => handleFieldChange(entity.id, 'type', e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm rounded-xl px-3 py-2.5 focus:outline-none font-medium"
                  >
                    <option value="law_firm">Law Firm</option>
                    <option value="chambers">Chambers</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Category</label>
                  <input
                    type="text"
                    value={entity.category || ''}
                    onChange={(e) => handleFieldChange(entity.id, 'category', e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm rounded-xl px-3 py-2.5 focus:outline-none font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">HQ City</label>
                  <input
                    type="text"
                    value={entity.hq_city || ''}
                    onChange={(e) => handleFieldChange(entity.id, 'hq_city', e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm rounded-xl px-3 py-2.5 focus:outline-none font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">NQ Salary (£)</label>
                  <input
                    type="number"
                    value={entity.nq_salary || 0}
                    onChange={(e) => handleFieldChange(entity.id, 'nq_salary', e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm rounded-xl px-3 py-2.5 focus:outline-none font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Practice Areas (comma separated)</label>
                  <input
                    type="text"
                    value={entity.practice_areas || ''}
                    onChange={(e) => handleFieldChange(entity.id, 'practice_areas', e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm rounded-xl px-3 py-2.5 focus:outline-none font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Website URL</label>
                  <input
                    type="text"
                    value={entity.website_url || ''}
                    onChange={(e) => handleFieldChange(entity.id, 'website_url', e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm rounded-xl px-3 py-2.5 focus:outline-none font-medium"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <button
        onClick={handleAddEntity}
        className="w-full py-4 border-2 border-dashed border-slate-300 hover:border-[#89021A] text-slate-600 hover:text-[#89021A] font-semibold rounded-2xl transition flex items-center justify-center gap-2 bg-white cursor-pointer"
      >
        <Icon name="plus" size={18} /> + Add Firm or Chambers
      </button>
    </div>
  );
}