import React, { useState } from 'react';
import { Scroll, Sparkles, BookOpen, Quote, ChevronRight } from 'lucide-react';
import { FOLKLORE_DATA } from '../data/culturalData';

export const FolkloreView: React.FC = () => {
  const [selectedStoryId, setSelectedStoryId] = useState<string>(FOLKLORE_DATA[0].id);
  const activeStory = FOLKLORE_DATA.find(s => s.id === selectedStoryId) || FOLKLORE_DATA[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="border-b border-[#C5A059]/40 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono text-[#8C7A6B]">
            <span className="text-[#6B1724] font-bold uppercase tracking-widest">
              Chapter 08 · Folklore & Oral Epics
            </span>
            <span>·</span>
            <span className="font-serif italic text-[#C5A059] font-medium">लोकगाथा</span>
            <span>·</span>
            <span>Oral Memory & Parables</span>
          </div>
          <h1 className="font-royal text-3xl sm:text-4xl font-bold text-[#6B1724]">
            Enigmatic Riddles, Animal Parables & Mangrove Deities
          </h1>
          <p className="font-editorial text-base sm:text-lg text-[#5C4D42] italic max-w-3xl">
            Timeless moral allegories and regional folk mythologies that shaped the conscience of Indian civilization across centuries.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-[#8C7A6B] bg-[#F3EBDD] px-3 py-1.5 rounded-xs border border-[#C5A059]/40 shrink-0">
          <Scroll className="w-4 h-4 text-[#6B1724]" />
          <span>{FOLKLORE_DATA.length} Ancient Narratives</span>
        </div>
      </div>

      {/* Main Folklore Reading Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Story Navigation Selector */}
        <div className="lg:col-span-4 space-y-2">
          <span className="text-xs font-mono uppercase text-[#8C7A6B] tracking-wider block mb-2">
            Select Folk Narrative
          </span>

          <div className="space-y-2.5">
            {FOLKLORE_DATA.map((story) => {
              const isSelected = story.id === selectedStoryId;

              return (
                <div
                  key={story.id}
                  onClick={() => setSelectedStoryId(story.id)}
                  className={`p-4 rounded-xs border transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'bg-[#6B1724] text-[#FAF6EE] border-[#C5A059] shadow-md'
                      : 'bg-[#FAF6EE] hover:bg-[#F3EBDD] text-[#1C1814] border-[#C5A059]/30'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className={`font-mono text-[10px] uppercase ${isSelected ? 'text-[#C5A059]' : 'text-[#8C7A6B]'}`}>
                      {story.region} India
                    </span>
                    <span className={`font-serif font-bold text-xs ${isSelected ? 'text-[#D6CEBE]' : 'text-[#6B1724]'}`}>
                      {story.vernacularTitle}
                    </span>
                  </div>

                  <h3 className="font-royal text-sm font-bold leading-snug">
                    {story.title}
                  </h3>

                  <p className={`text-xs mt-1 line-clamp-2 ${isSelected ? 'text-[#E8DEC8]' : 'text-[#5C4D42]'}`}>
                    Theme: {story.theme}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Side: Royal Story Scroll Canvas */}
        <div className="lg:col-span-8 bg-[#FAF6EE] border-2 border-[#C5A059] rounded-xs p-6 sm:p-10 shadow-md space-y-6">
          
          {/* Story Title & Tradition Banner */}
          <div className="space-y-2 border-b border-[#C5A059]/30 pb-4">
            <div className="flex flex-wrap items-center gap-2 text-xs text-[#735D4E]">
              <span className="font-serif font-bold text-base text-[#C5A059]">
                {activeStory.vernacularTitle}
              </span>
              <span aria-hidden="true">·</span>
              <span className="font-mono text-[#6B1724]">{activeStory.tradition}</span>
              <span aria-hidden="true">·</span>
              <span>{activeStory.era}</span>
            </div>

            <h2 className="font-royal text-2xl sm:text-3xl font-bold text-[#6B1724]">
              {activeStory.title}
            </h2>

            <div className="text-xs text-[#5C4D42] font-editorial italic text-base">
              Central Motif: {activeStory.theme}
            </div>
          </div>

          {/* Archival Quote Ribbon */}
          <div className="p-4 bg-[#F3EBDD] border-l-4 border-[#C5A059] rounded-xs space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-royal text-[#6B1724] uppercase tracking-wider">
              <Quote className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Ancient Voice / Manuscript Inscription</span>
            </div>
            <p className="font-editorial italic text-base sm:text-lg text-[#382D26]">
              {activeStory.archivalQuote}
            </p>
          </div>

          {/* Narrative Prose */}
          <div className="space-y-4">
            <h3 className="font-royal text-sm font-bold text-[#6B1724] uppercase tracking-wider">
              The Oral Parable
            </h3>
            <p className="text-sm leading-relaxed text-[#2C231D] font-sans">
              {activeStory.narrativeSummary}
            </p>
          </div>

          {/* Philosophical / Metaphorical Lesson */}
          <div className="p-4 bg-[#0F4C3A]/5 border border-[#0F4C3A]/30 rounded-xs space-y-1 text-xs">
            <span className="font-royal font-bold text-[#0F4C3A] block uppercase tracking-wider">
              Civilizational & Ecological Underpinning
            </span>
            <p className="text-[#1E3B2D] leading-relaxed">
              {activeStory.moralOrMetaphor}
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};
