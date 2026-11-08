import React, { useState } from 'react';
import { BookOpen, Volume2, Sparkles, Scroll, Globe } from 'lucide-react';
import { LANGUAGES_DATA } from '../data/culturalData';

export const LanguagesView: React.FC = () => {
  const [activeLangId, setActiveLangId] = useState<string>('lang-sanskrit');
  const [isSpeaking, setIsSpeaking] = useState(false);

  const activeLang = LANGUAGES_DATA.find(l => l.id === activeLangId) || LANGUAGES_DATA[0];

  const handleSpeak = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.85;
      utterance.pitch = 1.0;
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="border-b border-[#C5A059]/40 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono text-[#8C7A6B]">
            <span className="text-[#6B1724] font-bold uppercase tracking-widest">
              Chapter 07 · Linguistic Atlas
            </span>
            <span>·</span>
            <span className="font-serif italic text-[#C5A059] font-medium">भाषा शास्त्र</span>
            <span>·</span>
            <span>Phonetic & Epigraphic Codex</span>
          </div>
          <h1 className="font-royal text-3xl sm:text-4xl font-bold text-[#6B1724]">
            Classical Tongues, Palm-Leaf Scripts & Inscriptions
          </h1>
          <p className="font-editorial text-base sm:text-lg text-[#5C4D42] italic max-w-3xl">
            Explore the grammatical algorithms of Panini's Sanskrit, ancient Sangam Tamil humanism, palm-leaf Odia curves, and indigenous Ol Chiki scripts.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-[#8C7A6B] bg-[#F3EBDD] px-3 py-1.5 rounded-xs border border-[#C5A059]/40 shrink-0">
          <BookOpen className="w-4 h-4 text-[#6B1724]" />
          <span>Classical Languages of Bharat</span>
        </div>
      </div>

      {/* Main Linguistic Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Language Selector List */}
        <div className="lg:col-span-4 space-y-2">
          <span className="text-xs font-mono uppercase text-[#8C7A6B] tracking-wider block mb-2">
            Select Classical Tongue
          </span>

          <div className="space-y-2">
            {LANGUAGES_DATA.map((lang) => {
              const isSelected = lang.id === activeLangId;

              return (
                <button
                  key={lang.id}
                  onClick={() => setActiveLangId(lang.id)}
                  className={`w-full p-3.5 text-left rounded-xs border transition-all duration-150 flex items-center justify-between cursor-pointer ${
                    isSelected
                      ? 'bg-[#6B1724] text-[#FAF6EE] border-[#C5A059] shadow-sm'
                      : 'bg-[#FAF6EE] hover:bg-[#F3EBDD] text-[#1C1814] border-[#C5A059]/30'
                  }`}
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-royal text-sm font-bold">
                        {lang.name}
                      </span>
                      <span className={`text-xs font-serif font-bold ${isSelected ? 'text-[#C5A059]' : 'text-[#6B1724]'}`}>
                        ({lang.vernacularScript})
                      </span>
                    </div>
                    <span className={`text-[11px] block ${isSelected ? 'text-[#D6CEBE]' : 'text-[#735D4E]'}`}>
                      {lang.family} Family · {lang.scriptName}
                    </span>
                  </div>

                  <span className={`font-mono text-xs ${isSelected ? 'text-[#C5A059]' : 'text-[#8C7A6B]'}`}>
                    →
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Detailed Epigraphic Folio Card */}
        <div className="lg:col-span-8 bg-[#FAF6EE] border-2 border-[#C5A059] rounded-xs p-6 sm:p-8 shadow-md space-y-6">
          
          {/* Top Inscription Specimen Box */}
          <div className="p-6 bg-[#F3EBDD] border border-[#C5A059]/50 rounded-xs text-center space-y-3 relative overflow-hidden">
            <div className="text-[10px] font-mono uppercase tracking-widest text-[#8C7A6B]">
              Primary Epigraphic Specimen
            </div>

            <div className="font-serif text-2xl sm:text-3xl text-[#6B1724] font-bold leading-relaxed tracking-wide">
              {activeLang.ancientSpecimen}
            </div>

            <div className="font-editorial italic text-base text-[#5C4D42]">
              "{activeLang.transliteration}"
            </div>

            <p className="text-xs sm:text-sm text-[#1C1814] font-medium max-w-lg mx-auto">
              Meaning: {activeLang.englishMeaning}
            </p>

            <div className="pt-2">
              <button
                onClick={() => handleSpeak(activeLang.transliteration)}
                className="px-3.5 py-1.5 bg-[#6B1724] hover:bg-[#58111C] text-[#FAF6EE] rounded-xs text-xs font-medium border border-[#C5A059] inline-flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Volume2 className={`w-3.5 h-3.5 text-[#C5A059] ${isSpeaking ? 'animate-bounce' : ''}`} />
                <span>{isSpeaking ? 'Reciting Specimen...' : 'Listen to Phonetic Cadence'}</span>
              </button>
            </div>
          </div>

          {/* Linguistic Attributes Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs border-y border-[#C5A059]/30 py-4">
            <div>
              <span className="text-[#8C7A6B] block">Language Family & Script:</span>
              <span className="font-medium text-[#1C1814]">{activeLang.family} · {activeLang.scriptName}</span>
            </div>
            <div>
              <span className="text-[#8C7A6B] block">Documented Era:</span>
              <span className="font-medium text-[#1C1814]">{activeLang.era}</span>
            </div>
            <div>
              <span className="text-[#8C7A6B] block">Geographical Continuum:</span>
              <span className="font-medium text-[#1C1814]">{activeLang.regions}</span>
            </div>
            <div>
              <span className="text-[#8C7A6B] block">Speakers & Scholars:</span>
              <span className="font-medium text-[#1C1814]">{activeLang.speakersCount}</span>
            </div>
          </div>

          {/* Historical & Epigraphic Analysis */}
          <div className="space-y-4">
            <div>
              <h3 className="font-royal text-sm font-bold text-[#6B1724] uppercase tracking-wider mb-1.5">
                Epigraphic Evolution & Scribing Substrate
              </h3>
              <p className="text-xs leading-relaxed text-[#382D26]">
                {activeLang.historicalNote}
              </p>
            </div>

            <div className="p-4 bg-[#F3EBDD]/60 rounded-xs border border-[#C5A059]/40 space-y-1">
              <h4 className="font-royal text-xs font-semibold text-[#6B1724] uppercase tracking-wide">
                Phonetic & Articulation Guide
              </h4>
              <p className="text-xs leading-relaxed text-[#5C4D42] font-editorial italic">
                {activeLang.pronunciationGuide}
              </p>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
