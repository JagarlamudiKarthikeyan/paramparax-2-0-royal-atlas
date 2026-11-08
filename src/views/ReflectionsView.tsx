import React, { useState, useEffect } from 'react';
import { 
  MessageSquareText, 
  Send, 
  Heart, 
  MapPin, 
  ShieldCheck, 
  Filter, 
  Search, 
  Sparkles,
  AlertCircle,
  CheckCircle2,
  Lock,
  Unlock
} from 'lucide-react';
import { ReflectionRecord, IndianRegion } from '../types';
import { REGIONS } from '../data/culturalData';

export const ReflectionsView: React.FC = () => {
  const [reflections, setReflections] = useState<ReflectionRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Curator / Moderation View Mode
  const [curatorMode, setCuratorMode] = useState(false);

  // Form Submission State
  const [authorName, setAuthorName] = useState('');
  const [authorRole, setAuthorRole] = useState('');
  const [originCity, setOriginCity] = useState('');
  const [region, setRegion] = useState<IndianRegion>('North');
  const [journeyTitle, setJourneyTitle] = useState('');
  const [reflectionText, setReflectionText] = useState('');
  const [associatedHeritage, setAssociatedHeritage] = useState('');
  const [category, setCategory] = useState<'destinations' | 'performing_arts' | 'crafts' | 'folklore' | 'wellness' | 'festivals'>('destinations');

  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<string[]>([]);

  // Fetch reflections from backend
  const fetchReflections = async () => {
    try {
      setLoading(true);
      const statusParam = curatorMode ? 'all' : 'approved';
      const res = await fetch(`/api/reflections?status=${statusParam}`);
      if (res.ok) {
        const json = await res.json();
        if (json.data) {
          setReflections(json.data);
        }
      }
    } catch (err) {
      console.error('Failed to load reflections from backend:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReflections();
  }, [curatorMode]);

  // Handle Like
  const handleLike = async (id: string) => {
    try {
      const res = await fetch(`/api/reflections/${id}/like`, { method: 'PATCH' });
      if (res.ok) {
        const data = await res.json();
        setReflections(prev => prev.map(r => r.id === id ? { ...r, likes: data.likes } : r));
      }
    } catch (err) {
      console.error('Error liking reflection:', err);
    }
  };

  // Handle Moderation Status Update
  const handleStatusChange = async (id: string, newStatus: 'approved' | 'pending_review' | 'flagged') => {
    try {
      const res = await fetch(`/api/reflections/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        setReflections(prev => prev.map(r => r.id === id ? { ...r, status: newStatus } : r));
      }
    } catch (err) {
      console.error('Error changing status:', err);
    }
  };

  // Submit Reflection
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormErrors([]);
    setFormSuccess(null);

    // Client-side quick checks
    const errs: string[] = [];
    if (!authorName.trim()) errs.push('Please enter your full name or scholar pen-name.');
    if (!originCity.trim()) errs.push('Please enter your home city or place of research.');
    if (!journeyTitle.trim()) errs.push('Please enter a descriptive journey or reflection title.');
    if (!reflectionText.trim() || reflectionText.trim().length < 20) {
      errs.push('Reflection text must be at least 20 characters.');
    }

    if (errs.length > 0) {
      setFormErrors(errs);
      return;
    }

    try {
      setFormSubmitting(true);
      const res = await fetch('/api/reflections', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          authorName,
          authorRole,
          originCity,
          region,
          journeyTitle,
          reflectionText,
          associatedHeritage,
          category
        })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setFormSuccess(data.message || 'Your reflection has been inscribed into the imperial journal.');
        // Reset form
        setAuthorName('');
        setAuthorRole('');
        setOriginCity('');
        setJourneyTitle('');
        setReflectionText('');
        setAssociatedHeritage('');
        fetchReflections();
      } else {
        setFormErrors(data.errors || [data.message || 'Submission failed']);
      }
    } catch (err) {
      setFormErrors(['Failed to communicate with the reflection backend server.']);
    } finally {
      setFormSubmitting(false);
    }
  };

  const filteredReflections = reflections.filter((r) => {
    const matchReg = selectedRegion === 'all' || r.region.toLowerCase() === selectedRegion.toLowerCase();
    const matchCat = selectedCategory === 'all' || r.category === selectedCategory;
    const matchSearch = !searchQuery || 
      r.journeyTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.reflectionText.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.authorName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchReg && matchCat && matchSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Header */}
      <div className="border-b border-[#C5A059]/40 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono text-[#8C7A6B]">
            <span className="text-[#6B1724] font-bold uppercase tracking-widest">
              Chapter 13 · Community Journal
            </span>
            <span>·</span>
            <span className="font-serif italic text-[#C5A059] font-medium">संस्मरण</span>
            <span>·</span>
            <span>Living Field Reflections</span>
          </div>
          <h1 className="font-royal text-3xl sm:text-4xl font-bold text-[#6B1724]">
            Traveler Inscriptions & Scholar Chronicles
          </h1>
          <p className="font-editorial text-base sm:text-lg text-[#5C4D42] italic max-w-3xl">
            A peer-moderated repository of cultural encounters, temple acoustics, artisan atelier visits, and field reflections from across the Indian subcontinent.
          </p>
        </div>

        {/* Curator Mode Switch */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCuratorMode(!curatorMode)}
            className={`px-3 py-1.5 rounded-xs text-xs font-mono border transition-colors flex items-center gap-1.5 cursor-pointer ${
              curatorMode
                ? 'bg-[#6B1724] text-[#FAF6EE] border-[#C5A059]'
                : 'bg-[#F3EBDD] text-[#5C4D42] border-[#C5A059]/40 hover:text-[#6B1724]'
            }`}
            title="Toggle Curator Review Desk"
          >
            {curatorMode ? <Unlock className="w-3.5 h-3.5 text-[#C5A059]" /> : <Lock className="w-3.5 h-3.5" />}
            <span>Curator Desk {curatorMode ? '(Active)' : ''}</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Left Side Reflections Feed, Right Side Submission Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column (7 cols): Filtered Reflections Feed */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Feed Filters */}
          <div className="bg-[#FAF6EE] p-3.5 border border-[#C5A059]/40 rounded-xs shadow-2xs flex flex-wrap gap-3 items-center justify-between">
            <div className="flex items-center gap-2">
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="text-xs bg-[#FAF6EE] border border-[#C5A059]/40 rounded-xs px-2 py-1 text-[#1C1814] focus:outline-hidden"
              >
                <option value="all">All Territories</option>
                <option value="North">North</option>
                <option value="South">South</option>
                <option value="East">East</option>
                <option value="West">West</option>
                <option value="Northeast">Northeast</option>
                <option value="Central">Central</option>
                <option value="Trans-Himalayas">Trans-Himalayas</option>
              </select>

              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="text-xs bg-[#FAF6EE] border border-[#C5A059]/40 rounded-xs px-2 py-1 text-[#1C1814] focus:outline-hidden"
              >
                <option value="all">All Heritage Themes</option>
                <option value="destinations">Destinations</option>
                <option value="performing_arts">Performing Arts</option>
                <option value="crafts">Living Crafts</option>
                <option value="folklore">Folklore & Epics</option>
                <option value="wellness">Ayurveda & Wellness</option>
                <option value="festivals">Festivals & Rites</option>
              </select>
            </div>

            <div className="flex-1 min-w-[150px]">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search inscriptions..."
                className="w-full text-xs bg-[#FAF6EE] border border-[#C5A059]/40 rounded-xs px-2.5 py-1 text-[#1C1814] placeholder-[#8C7A6B] focus:outline-hidden"
              />
            </div>
          </div>

          {/* Feed List */}
          {loading ? (
            <div className="py-12 text-center text-xs font-mono text-[#8C7A6B]">
              Consulting royal archives...
            </div>
          ) : filteredReflections.length === 0 ? (
            <div className="py-12 text-center bg-[#FAF6EE] border border-[#C5A059]/30 rounded-xs p-6 space-y-2">
              <p className="font-royal text-sm font-bold text-[#6B1724]">
                No Chronicles Found
              </p>
              <p className="text-xs text-[#735D4E]">
                Be the first to inscribe your cultural journey in this region or theme!
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredReflections.map((refl) => (
                <div
                  key={refl.id}
                  className={`p-5 bg-[#FAF6EE] border rounded-xs shadow-xs space-y-3 transition-all ${
                    refl.status === 'flagged'
                      ? 'border-red-400 bg-red-50/20'
                      : refl.status === 'pending_review'
                      ? 'border-amber-400 bg-amber-50/20'
                      : 'border-[#C5A059]/40 hover:border-[#C5A059]'
                  }`}
                >
                  {/* Top Meta */}
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] text-[#6B1724] uppercase font-bold">
                        {refl.region} India
                      </span>
                      <span className="text-[#A39281]">·</span>
                      <span className="font-mono text-[10px] text-[#8C7A6B]">
                        {refl.date}
                      </span>
                    </div>

                    {curatorMode && (
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded-xs uppercase ${
                        refl.status === 'approved' 
                          ? 'bg-emerald-100 text-emerald-800' 
                          : refl.status === 'pending_review'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {refl.status} (Score: {refl.moderationScore})
                      </span>
                    )}
                  </div>

                  {/* Title & Associated Heritage */}
                  <div>
                    <h3 className="font-royal text-base font-bold text-[#6B1724]">
                      {refl.journeyTitle}
                    </h3>
                    <p className="text-xs font-editorial italic text-[#5C4D42] mt-0.5">
                      Subject: {refl.associatedHeritage}
                    </p>
                  </div>

                  {/* Reflection Prose */}
                  <p className="text-xs sm:text-sm text-[#382D26] leading-relaxed font-sans">
                    {refl.reflectionText}
                  </p>

                  {/* Author Lockup & Actions */}
                  <div className="pt-2 border-t border-[#C5A059]/20 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-[#1C1814] block">
                        {refl.authorName}
                      </span>
                      <span className="text-[11px] text-[#735D4E]">
                        {refl.authorRole} · {refl.originCity}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleLike(refl.id)}
                        className="px-2.5 py-1 bg-[#F3EBDD] hover:bg-[#EAE0CD] text-[#6B1724] rounded-xs border border-[#C5A059]/40 flex items-center gap-1 cursor-pointer"
                        title="Attest to this reflection"
                      >
                        <Heart className="w-3.5 h-3.5 fill-[#6B1724]" />
                        <span className="font-mono text-[11px]">{refl.likes}</span>
                      </button>

                      {curatorMode && (
                        <div className="flex items-center gap-1">
                          {refl.status !== 'approved' && (
                            <button
                              onClick={() => handleStatusChange(refl.id, 'approved')}
                              className="px-2 py-0.5 bg-emerald-700 text-white text-[10px] rounded-xs cursor-pointer"
                            >
                              Approve
                            </button>
                          )}
                          {refl.status !== 'flagged' && (
                            <button
                              onClick={() => handleStatusChange(refl.id, 'flagged')}
                              className="px-2 py-0.5 bg-red-700 text-white text-[10px] rounded-xs cursor-pointer"
                            >
                              Flag
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                </div>
              ))}
            </div>
          )}

        </div>

        {/* Right Column (5 cols): Working Submission Form */}
        <div className="lg:col-span-5 bg-[#FAF6EE] border-2 border-[#C5A059] rounded-xs p-6 shadow-md space-y-4">
          <div className="border-b border-[#C5A059]/30 pb-3">
            <span className="font-serif text-[#C5A059] font-bold text-xs">शिलालेख समर्पण</span>
            <h2 className="font-royal text-xl font-bold text-[#6B1724]">
              Inscribe Your Reflection
            </h2>
            <p className="text-xs text-[#5C4D42] font-editorial italic mt-0.5">
              Submit your verified cultural encounters to the living ParamparaX archive.
            </p>
          </div>

          {formSuccess && (
            <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-800 rounded-xs text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
              <span>{formSuccess}</span>
            </div>
          )}

          {formErrors.length > 0 && (
            <div className="p-3 bg-red-50 border border-red-300 text-red-800 rounded-xs text-xs space-y-1">
              <div className="flex items-center gap-1.5 font-bold">
                <AlertCircle className="w-3.5 h-3.5 text-red-600" />
                <span>Please correct the following:</span>
              </div>
              <ul className="list-disc pl-4 space-y-0.5">
                {formErrors.map((err, i) => (
                  <li key={i}>{err}</li>
                ))}
              </ul>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3 text-xs">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="font-semibold text-[#6B1724] block mb-1">
                  Author / Scholar Name:
                </label>
                <input
                  type="text"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  placeholder="e.g. Anandita Sen"
                  className="w-full bg-[#FAF6EE] border border-[#C5A059]/50 rounded-xs p-2 text-[#1C1814] focus:outline-hidden focus:border-[#6B1724]"
                />
              </div>

              <div>
                <label className="font-semibold text-[#6B1724] block mb-1">
                  Role or Field of Study:
                </label>
                <input
                  type="text"
                  value={authorRole}
                  onChange={(e) => setAuthorRole(e.target.value)}
                  placeholder="e.g. Epigraphy Fellow"
                  className="w-full bg-[#FAF6EE] border border-[#C5A059]/50 rounded-xs p-2 text-[#1C1814] focus:outline-hidden focus:border-[#6B1724]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="font-semibold text-[#6B1724] block mb-1">
                  Hometown / City:
                </label>
                <input
                  type="text"
                  value={originCity}
                  onChange={(e) => setOriginCity(e.target.value)}
                  placeholder="e.g. Pune, Maharashtra"
                  className="w-full bg-[#FAF6EE] border border-[#C5A059]/50 rounded-xs p-2 text-[#1C1814] focus:outline-hidden focus:border-[#6B1724]"
                />
              </div>

              <div>
                <label className="font-semibold text-[#6B1724] block mb-1">
                  Subcontinent Region:
                </label>
                <select
                  value={region}
                  onChange={(e) => setRegion(e.target.value as IndianRegion)}
                  className="w-full bg-[#FAF6EE] border border-[#C5A059]/50 rounded-xs p-2 text-[#1C1814] focus:outline-hidden focus:border-[#6B1724]"
                >
                  <option value="North">North (Himalayas & Plains)</option>
                  <option value="South">South (Peninsular Dynasties)</option>
                  <option value="East">East (Bengal & Odia Kingdoms)</option>
                  <option value="West">West (Thar Desert & Deccan)</option>
                  <option value="Northeast">Northeast (Brahmaputra & Hills)</option>
                  <option value="Central">Central (Vindhya & Narmada)</option>
                  <option value="Trans-Himalayas">Trans-Himalayas (Ladakh & Spiti)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="font-semibold text-[#6B1724] block mb-1">
                Heritage Theme:
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full bg-[#FAF6EE] border border-[#C5A059]/50 rounded-xs p-2 text-[#1C1814] focus:outline-hidden focus:border-[#6B1724]"
              >
                <option value="destinations">Overlooked Destinations & Citadels</option>
                <option value="performing_arts">Performing Arts & Soundscapes</option>
                <option value="crafts">Living Crafts & Ateliers</option>
                <option value="folklore">Folklore & Oral Epics</option>
                <option value="wellness">Ayurveda & Sacred Botany</option>
                <option value="festivals">Festivals & Rites</option>
              </select>
            </div>

            <div>
              <label className="font-semibold text-[#6B1724] block mb-1">
                Journey / Inscription Title:
              </label>
              <input
                type="text"
                value={journeyTitle}
                onChange={(e) => setJourneyTitle(e.target.value)}
                placeholder="e.g. Dawn at the Betwa Chhatris of Orchha"
                className="w-full bg-[#FAF6EE] border border-[#C5A059]/50 rounded-xs p-2 text-[#1C1814] focus:outline-hidden focus:border-[#6B1724]"
              />
            </div>

            <div>
              <label className="font-semibold text-[#6B1724] block mb-1">
                Specific Heritage Site or Living Tradition:
              </label>
              <input
                type="text"
                value={associatedHeritage}
                onChange={(e) => setAssociatedHeritage(e.target.value)}
                placeholder="e.g. Bundela Cenotaphs & Chhatris"
                className="w-full bg-[#FAF6EE] border border-[#C5A059]/50 rounded-xs p-2 text-[#1C1814] focus:outline-hidden focus:border-[#6B1724]"
              />
            </div>

            <div>
              <label className="font-semibold text-[#6B1724] block mb-1">
                Field Reflection & Cultural Observations:
              </label>
              <textarea
                rows={4}
                value={reflectionText}
                onChange={(e) => setReflectionText(e.target.value)}
                placeholder="Describe your authentic encounter, philosophical realization, acoustic observation, or master craft documentation..."
                className="w-full bg-[#FAF6EE] border border-[#C5A059]/50 rounded-xs p-2 text-[#1C1814] focus:outline-hidden focus:border-[#6B1724]"
              />
            </div>

            <button
              type="submit"
              disabled={formSubmitting}
              className="w-full py-2.5 bg-[#6B1724] hover:bg-[#58111C] text-[#FAF6EE] font-royal font-semibold text-xs rounded-sm border border-[#C5A059] flex items-center justify-center gap-2 cursor-pointer shadow-xs transition-colors"
            >
              <Send className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>{formSubmitting ? 'Inscribing into Royal Archive...' : 'Inscribe into Imperial Journal'}</span>
            </button>
          </form>

        </div>

      </div>

    </div>
  );
};
