import React, { useState } from 'react';
import { 
  Music, 
  Sparkles, 
  Play, 
  Pause, 
  Bookmark, 
  Volume2, 
  ArrowRight,
  Eye
} from 'lucide-react';
import { PerformingArtItem } from '../types';
import { PERFORMING_ARTS } from '../data/culturalData';

interface PerformingArtsViewProps {
  onSelectItem: (item: PerformingArtItem) => void;
  savedItemIds: string[];
  onToggleBookmark: (item: PerformingArtItem) => void;
}

export const PerformingArtsView: React.FC<PerformingArtsViewProps> = ({
  onSelectItem,
  savedItemIds,
  onToggleBookmark
}) => {
  const [activeTaal, setActiveTaal] = useState<'teentaal' | 'aditala' | 'chautaal'>('teentaal');
  const [isPlayingTaal, setIsPlayingTaal] = useState(false);
  const [currentBeat, setCurrentBeat] = useState(0);

  const taals = {
    teentaal: {
      name: 'Teentaal (16 Matras)',
      tradition: 'Hindustani Classical & Kathak',
      pattern: ['Dha', 'Dhin', 'Dhin', 'Dha', 'Dha', 'Dhin', 'Dhin', 'Dha', 'Dha', 'Tin', 'Tin', 'Ta', 'Ta', 'Dhin', 'Dhin', 'Dha'],
      claps: ['Sam (+)', 'Clap (2)', 'Khali (0)', 'Clap (3)']
    },
    aditala: {
      name: 'Adi Tala (8 Aksharas)',
      tradition: 'Carnatic Classical & Bharatanatyam',
      pattern: ['Laghu (1)', 'Finger (2)', 'Finger (3)', 'Finger (4)', 'Dhrutam (Clap)', 'Wave', 'Dhrutam (Clap)', 'Wave'],
      claps: ['Clap + 3 Finger counts', 'Clap + Wave', 'Clap + Wave']
    },
    chautaal: {
      name: 'Chautaal (12 Matras)',
      tradition: 'Dhrupad & Pakhawaj Lineage',
      pattern: ['Dha', 'Dha', 'Dhin', 'Ta', 'Kit', 'Dha', 'Dhin', 'Ta', 'Tit', 'Kat', 'Gadi', 'Gana'],
      claps: ['Sam (+)', 'Khali (0)', 'Clap (2)', 'Khali (0)', 'Clap (3)', 'Clap (4)']
    }
  };

  // Metronome for rhythm demonstration
  React.useEffect(() => {
    let timer: number | null = null;
    if (isPlayingTaal) {
      const totalBeats = taals[activeTaal].pattern.length;
      timer = window.setInterval(() => {
        setCurrentBeat((prev) => (prev + 1) % totalBeats);
      }, 650);
    } else {
      setCurrentBeat(0);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isPlayingTaal, activeTaal]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Header */}
      <div className="border-b border-[#C5A059]/40 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono text-[#8C7A6B]">
            <span className="text-[#6B1724] font-bold uppercase tracking-widest">
              Chapter 05 · Performing Arts
            </span>
            <span>·</span>
            <span className="font-serif italic text-[#C5A059] font-medium">नाट्य संगीत</span>
            <span>·</span>
            <span>Natya Shastra Continuum</span>
          </div>
          <h1 className="font-royal text-3xl sm:text-4xl font-bold text-[#6B1724]">
            Sacred Theatres, Mudras & Microtonal Sound
          </h1>
          <p className="font-editorial text-base sm:text-lg text-[#5C4D42] italic max-w-3xl">
            From the oldest surviving Sanskrit drama to the acrobatic martial cartwheels of Chhau and the meditative Dhrupad vocal drone.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-[#8C7A6B] bg-[#F3EBDD] px-3 py-1.5 rounded-xs border border-[#C5A059]/40 shrink-0">
          <Music className="w-4 h-4 text-[#6B1724]" />
          <span>Living Acoustic Traditions</span>
        </div>
      </div>

      {/* Interactive Rhythm Cycle (Taal) Laboratory */}
      <div className="bg-[#FAF6EE] border-2 border-[#C5A059] rounded-xs p-6 shadow-md space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#C5A059]/30 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#8C7A6B]">
              <span className="text-[#6B1724] font-bold uppercase tracking-wider">Acoustic Lab</span>
              <span>·</span>
              <span className="font-serif italic text-[#C5A059]">ताल शास्त्र</span>
            </div>
            <h2 className="font-royal text-xl font-bold text-[#6B1724] mt-0.5">
              Interactive Classical Taal Rhythm Cycle
            </h2>
          </div>

          <div className="flex items-center gap-2">
            {(['teentaal', 'aditala', 'chautaal'] as const).map((tKey) => (
              <button
                key={tKey}
                onClick={() => {
                  setActiveTaal(tKey);
                  setCurrentBeat(0);
                }}
                className={`px-3 py-1 text-xs rounded-xs font-mono uppercase transition-colors cursor-pointer border ${
                  activeTaal === tKey
                    ? 'bg-[#6B1724] text-[#FAF6EE] border-[#C5A059]'
                    : 'bg-[#F3EBDD] text-[#5C4D42] border-[#C5A059]/40'
                }`}
              >
                {tKey}
              </button>
            ))}

            <button
              onClick={() => setIsPlayingTaal(!isPlayingTaal)}
              className="p-1.5 px-3 bg-[#165B43] hover:bg-[#0F4C3A] text-[#FAF6EE] text-xs font-semibold rounded-xs border border-[#C5A059] flex items-center gap-1.5 cursor-pointer shadow-xs ml-2"
            >
              {isPlayingTaal ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isPlayingTaal ? 'Pause Taal' : 'Play Taal Beat'}</span>
            </button>
          </div>
        </div>

        {/* Beats Visualizer Track */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-[#735D4E]">
            <span className="font-semibold text-[#6B1724]">{taals[activeTaal].name}</span>
            <span className="font-editorial italic">{taals[activeTaal].tradition}</span>
          </div>

          <div className="grid grid-cols-4 sm:grid-cols-8 lg:grid-cols-16 gap-1.5 pt-2">
            {taals[activeTaal].pattern.map((bol, idx) => {
              const isCurrent = isPlayingTaal && currentBeat === idx;
              const isSam = idx === 0;

              return (
                <div
                  key={idx}
                  className={`p-2 text-center rounded-xs border transition-all duration-150 ${
                    isCurrent
                      ? 'bg-[#6B1724] text-[#FAF6EE] border-[#C5A059] scale-105 shadow-sm font-bold'
                      : isSam
                      ? 'bg-[#F3EBDD] border-[#C5A059] text-[#6B1724] font-semibold'
                      : 'bg-[#FAF6EE] border-[#C5A059]/30 text-[#4A3B32]'
                  }`}
                >
                  <span className="block text-[9px] font-mono text-[#8C7A6B]">
                    {idx + 1}
                  </span>
                  <span className="block text-xs font-royal truncate">
                    {bol}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Traditions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {PERFORMING_ARTS.map((art) => {
          const isSaved = savedItemIds.includes(art.id);

          return (
            <div
              key={art.id}
              className="bg-[#FAF6EE] border border-[#C5A059]/40 hover:border-[#C5A059] rounded-xs shadow-xs p-5 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-serif font-bold text-sm text-[#C5A059]">
                    {art.vernacularTitle}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[11px] text-[#8C7A6B] uppercase">
                      {art.region} India
                    </span>
                    <button
                      onClick={() => onToggleBookmark(art)}
                      className={`p-1 rounded-xs border transition-colors cursor-pointer ${
                        isSaved ? 'bg-[#6B1724] text-[#FAF6EE] border-[#C5A059]' : 'bg-[#F3EBDD] text-[#735D4E] border-[#C5A059]/30'
                      }`}
                      title={isSaved ? 'Saved' : 'Bookmark'}
                    >
                      <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-current text-[#C5A059]' : ''}`} />
                    </button>
                  </div>
                </div>

                <div>
                  <h3 className="font-royal text-xl font-bold text-[#6B1724]">
                    {art.title}
                  </h3>
                  <p className="font-editorial text-sm italic text-[#5C4D42]">
                    {art.subtitle}
                  </p>
                </div>

                <div className="p-3 bg-[#F3EBDD]/60 rounded-xs border border-[#C5A059]/30 space-y-1.5 text-xs text-[#382D26]">
                  <div>
                    <span className="font-semibold text-[#6B1724]">Musical Instruments: </span>
                    <span>{art.primaryInstruments.join(', ')}</span>
                  </div>
                  {art.rhythmCycle && (
                    <div>
                      <span className="font-semibold text-[#6B1724]">Rhythmic Matrix: </span>
                      <span>{art.rhythmCycle}</span>
                    </div>
                  )}
                  {art.mudraOrExpression && (
                    <div>
                      <span className="font-semibold text-[#6B1724]">Core Mudras / Expressions: </span>
                      <span className="font-editorial italic">{art.mudraOrExpression}</span>
                    </div>
                  )}
                </div>

                <p className="text-xs text-[#382D26] leading-relaxed">
                  {art.curatorialNotes}
                </p>
              </div>

              <div className="pt-3 border-t border-[#C5A059]/20 flex items-center justify-between text-xs">
                <span className="font-mono text-[11px] text-[#8C7A6B]">
                  Lineage: {art.eraOrEpoch}
                </span>

                <button
                  onClick={() => onSelectItem(art)}
                  className="font-royal font-semibold text-xs text-[#6B1724] hover:text-[#58111C] flex items-center gap-1 cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>Inspect Complete Folio</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
