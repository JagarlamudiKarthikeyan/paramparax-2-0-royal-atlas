import React, { useState } from 'react';
import { Sparkles, HeartHandshake, Sun, Moon, Check, ArrowRight } from 'lucide-react';
import { AYURVEDA_HERBS } from '../data/culturalData';

export const AyurvedaView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'botanicals' | 'quiz' | 'dinacharya'>('botanicals');
  
  // Tridosha Quiz State
  const [answers, setAnswers] = useState<Record<number, 'vata' | 'pitta' | 'kapha'>>({});
  const [quizResult, setQuizResult] = useState<'Vata' | 'Pitta' | 'Kapha' | null>(null);

  const quizQuestions = [
    {
      id: 1,
      question: 'Physical frame & natural bone structure:',
      options: [
        { type: 'vata', label: 'Slender, light bones, easily fluctuates weight' },
        { type: 'pitta', label: 'Medium athletic build, good muscle tone, stable weight' },
        { type: 'kapha', label: 'Solid, broad shoulders, dense bones, gains weight easily' }
      ]
    },
    {
      id: 2,
      question: 'Digestion pattern & appetite (Agni):',
      options: [
        { type: 'vata', label: 'Irregular (Vishamagni) — ravenous some days, forgets meals others' },
        { type: 'pitta', label: 'Intense (Tikshnagni) — irritable if meals are delayed, quick digestion' },
        { type: 'kapha', label: 'Slow & steady (Mandagni) — can comfortably skip meals without fatigue' }
      ]
    },
    {
      id: 3,
      question: 'Sleep pattern & dream qualities:',
      options: [
        { type: 'vata', label: 'Light, interrupted sleep; dreams of flight, movement, and wind' },
        { type: 'pitta', label: 'Moderate sound sleep; dreams of vivid colors, passion, and fire' },
        { type: 'kapha', label: 'Deep, heavy unbroken sleep; waking takes time; dreams of water' }
      ]
    },
    {
      id: 4,
      question: 'Response to temperature & weather:',
      options: [
        { type: 'vata', label: 'Dislikes cold drafts and dry winter winds; loves warmth' },
        { type: 'pitta', label: 'Easily overheated; dislikes sweltering summer sun; craves cool shade' },
        { type: 'kapha', label: 'Dislikes damp rainy chill; flourishes in dry warm sunshine' }
      ]
    }
  ];

  const handleSelectAnswer = (qId: number, type: 'vata' | 'pitta' | 'kapha') => {
    const updated = { ...answers, [qId]: type };
    setAnswers(updated);

    if (Object.keys(updated).length === quizQuestions.length) {
      const counts = { vata: 0, pitta: 0, kapha: 0 };
      Object.values(updated).forEach(t => counts[t]++);
      if (counts.vata >= counts.pitta && counts.vata >= counts.kapha) {
        setQuizResult('Vata');
      } else if (counts.pitta >= counts.vata && counts.pitta >= counts.kapha) {
        setQuizResult('Pitta');
      } else {
        setQuizResult('Kapha');
      }
    }
  };

  const dinacharyaSteps = [
    {
      time: 'Brahma Muhurta (04:30 – 06:00)',
      sanskrit: 'ब्रह्म मुहूर्त उत्थानम्',
      title: 'Awakening Before the Sun',
      description: 'Rising when atmospheric Vata is purest and sattvic clarity fills the sky. Opening the palms (Karadarshanam) and thanking the earth.'
    },
    {
      time: 'Danta Dhavana & Jihwa Nirlekhana',
      sanskrit: 'जिह्वा निर्लेखन',
      title: 'Copper Tongue Scraping & Neem Cleansing',
      description: 'Removing overnight metabolic toxins (Ama) from the tongue using a pure copper or silver scraper to stimulate gastrointestinal fire.'
    },
    {
      time: 'Gandusha & Kavala',
      sanskrit: 'गण्डूष तैल धारण',
      title: 'Warm Sesame Oil Swishing',
      description: 'Holding cured black sesame or coconut oil in the oral cavity for five minutes to strengthen teeth roots, jaw strength, and voice resonance.'
    },
    {
      time: 'Abhyanga (Pre-Bath Ritual)',
      sanskrit: 'अभ्यङ्ग तैल मर्दन',
      title: 'Warm Herbalized Oil Self-Massage',
      description: 'Applying rhythmic warm botanical oils from the crown of the head to the soles of the feet to lubricate the Dhatus and calm the nervous system.'
    },
    {
      time: 'Nishi Ksheera (Twilight Ritual)',
      sanskrit: 'निशि क्षीर पान',
      title: 'Spiced Golden Milk Before Rest',
      description: 'Warm grass-fed milk infused with crushed green cardamom, nutmeg, saffron filaments, and raw honey to induce deep dreamless restorative sleep.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="border-b border-[#C5A059]/40 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono text-[#8C7A6B]">
            <span className="text-[#6B1724] font-bold uppercase tracking-widest">
              Chapter 11 · Ayurveda & Sacred Wellness
            </span>
            <span>·</span>
            <span className="font-serif italic text-[#C5A059] font-medium">आयुर्वेद तत्व</span>
            <span>·</span>
            <span>Charaka & Sushruta Science</span>
          </div>
          <h1 className="font-royal text-3xl sm:text-4xl font-bold text-[#6B1724]">
            Tridosha Balance, Rasayana Herbs & Circadian Rituals
          </h1>
          <p className="font-editorial text-base sm:text-lg text-[#5C4D42] italic max-w-3xl">
            The ancient science of longevity where human physiology synchronizes intimately with solar cycles, lunar moisture, and wild botanical virtues.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-1 p-1 bg-[#F3EBDD] border border-[#C5A059]/40 rounded-xs">
          <button
            onClick={() => setActiveTab('botanicals')}
            className={`px-3 py-1.5 text-xs font-medium rounded-xs transition-colors cursor-pointer ${
              activeTab === 'botanicals' ? 'bg-[#6B1724] text-[#FAF6EE] shadow-xs' : 'text-[#5C4D42] hover:text-[#6B1724]'
            }`}
          >
            Sacred Herbarium
          </button>
          <button
            onClick={() => setActiveTab('quiz')}
            className={`px-3 py-1.5 text-xs font-medium rounded-xs transition-colors cursor-pointer ${
              activeTab === 'quiz' ? 'bg-[#6B1724] text-[#FAF6EE] shadow-xs' : 'text-[#5C4D42] hover:text-[#6B1724]'
            }`}
          >
            Tridosha Quiz
          </button>
          <button
            onClick={() => setActiveTab('dinacharya')}
            className={`px-3 py-1.5 text-xs font-medium rounded-xs transition-colors cursor-pointer ${
              activeTab === 'dinacharya' ? 'bg-[#6B1724] text-[#FAF6EE] shadow-xs' : 'text-[#5C4D42] hover:text-[#6B1724]'
            }`}
          >
            Dinacharya Daily Rituals
          </button>
        </div>
      </div>

      {/* Tab 1: Sacred Herbarium */}
      {activeTab === 'botanicals' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {AYURVEDA_HERBS.map((herb) => (
            <div
              key={herb.id}
              className="bg-[#FAF6EE] border border-[#C5A059]/40 hover:border-[#C5A059] rounded-xs shadow-xs p-6 space-y-4"
            >
              <div className="flex items-center justify-between border-b border-[#C5A059]/30 pb-3">
                <div>
                  <h3 className="font-royal text-xl font-bold text-[#6B1724]">
                    {herb.sanskritName}
                  </h3>
                  <span className="font-editorial text-xs italic text-[#735D4E]">
                    {herb.botanicalName} ({herb.englishName})
                  </span>
                </div>
                <span className="text-xs font-mono font-bold text-[#FAF6EE] bg-[#0F4C3A] px-2.5 py-1 rounded-xs border border-[#C5A059]/40">
                  {herb.doshaAffinity}
                </span>
              </div>

              <div className="p-3 bg-[#F3EBDD]/60 rounded-xs border border-[#C5A059]/30 space-y-1 text-xs">
                <span className="font-serif italic text-xs text-[#6B1724] block">
                  {herb.classicalTextQuote}
                </span>
                <span className="text-[11px] text-[#735D4E]">Rasa (Taste): {herb.rasaTaste}</span>
              </div>

              <div>
                <span className="text-xs font-bold text-[#6B1724] block mb-1">
                  Therapeutic & Rejuvenating Actions (Karma):
                </span>
                <ul className="text-xs text-[#382D26] space-y-1 pl-4 list-disc marker:text-[#C5A059]">
                  {herb.therapeuticBenefits.map((b, idx) => (
                    <li key={idx}>{b}</li>
                  ))}
                </ul>
              </div>

              <div className="pt-2 border-t border-[#C5A059]/20 text-xs">
                <span className="font-semibold text-[#6B1724]">Classical Usage Ritual: </span>
                <span className="text-[#4A3B32]">{herb.usageRitual}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 2: Tridosha Self-Discovery Quiz */}
      {activeTab === 'quiz' && (
        <div className="bg-[#FAF6EE] border-2 border-[#C5A059] rounded-xs p-6 sm:p-10 shadow-md max-w-3xl mx-auto space-y-8">
          <div className="text-center space-y-2 border-b border-[#C5A059]/30 pb-4">
            <span className="font-serif text-[#C5A059] font-bold text-sm">प्रकृति परीक्षा</span>
            <h2 className="font-royal text-2xl font-bold text-[#6B1724]">
              Tridosha Constitutional Self-Quiz
            </h2>
            <p className="text-xs text-[#5C4D42] font-editorial italic">
              Answer four fundamental bodily observations to determine your dominant Ayurvedic constitution (Prakriti).
            </p>
          </div>

          <div className="space-y-6">
            {quizQuestions.map((q) => (
              <div key={q.id} className="space-y-2">
                <span className="text-xs font-bold text-[#6B1724] block">
                  {q.id}. {q.question}
                </span>

                <div className="grid grid-cols-1 gap-2">
                  {q.options.map((opt) => {
                    const isSelected = answers[q.id] === opt.type;

                    return (
                      <button
                        key={opt.type}
                        onClick={() => handleSelectAnswer(q.id, opt.type as 'vata' | 'pitta' | 'kapha')}
                        className={`p-3 text-left rounded-xs text-xs border transition-all cursor-pointer flex items-center justify-between ${
                          isSelected
                            ? 'bg-[#6B1724] text-[#FAF6EE] border-[#C5A059] shadow-xs'
                            : 'bg-[#F3EBDD]/60 hover:bg-[#F3EBDD] text-[#382D26] border-[#C5A059]/30'
                        }`}
                      >
                        <span>{opt.label}</span>
                        {isSelected && <Check className="w-4 h-4 text-[#C5A059] shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {quizResult && (
            <div className="p-5 bg-[#F3EBDD] border border-[#C5A059] rounded-xs space-y-3 animate-in fade-in">
              <div className="text-center space-y-1">
                <span className="text-[10px] font-mono uppercase text-[#8C7A6B]">Your Primary Inherent Element</span>
                <h3 className="font-royal text-2xl font-bold text-[#6B1724]">
                  Dominant Constitution: {quizResult} Dosha
                </h3>
              </div>

              <div className="text-xs text-[#382D26] space-y-2 pt-2 border-t border-[#C5A059]/30">
                {quizResult === 'Vata' && (
                  <p>
                    <strong>Vata (Ether & Air):</strong> Governing movement, creativity, and vitality. Balance with warm unctuous foods, cooked root vegetables, sweet spices (cinnamon, nutmeg), and regular grounding routines with warm sesame oil massage.
                  </p>
                )}
                {quizResult === 'Pitta' && (
                  <p>
                    <strong>Pitta (Fire & Water):</strong> Governing digestion, intellect, and transformation. Balance with cooling sweet herbs (Brahmi, Shatavari, Amla), coconut water, fresh ghee, and avoiding excessively fiery pungent chilies.
                  </p>
                )}
                {quizResult === 'Kapha' && (
                  <p>
                    <strong>Kapha (Water & Earth):</strong> Governing physical stability, lubrication, and endurance. Balance with light, warm, astringent foods, dry heat, active morning walks at dawn, and stimulating black pepper and ginger.
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Dinacharya Daily Circadian Rhythms */}
      {activeTab === 'dinacharya' && (
        <div className="space-y-4 max-w-4xl mx-auto">
          {dinacharyaSteps.map((step, idx) => (
            <div
              key={idx}
              className="p-5 bg-[#FAF6EE] border border-[#C5A059]/40 rounded-xs shadow-xs flex flex-col sm:flex-row gap-4 items-start"
            >
              <div className="sm:w-1/3 space-y-1 shrink-0">
                <span className="font-mono text-[10px] text-[#8C7A6B] uppercase block">
                  Step {String(idx + 1).padStart(2, '0')}
                </span>
                <h4 className="font-royal text-sm font-bold text-[#6B1724]">
                  {step.title}
                </h4>
                <span className="font-serif italic text-xs text-[#C5A059] block">
                  {step.sanskrit}
                </span>
                <span className="text-[11px] text-[#735D4E] block">
                  {step.time}
                </span>
              </div>

              <div className="sm:w-2/3 text-xs text-[#382D26] leading-relaxed font-sans pt-1">
                {step.description}
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
