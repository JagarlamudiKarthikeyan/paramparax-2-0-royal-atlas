export type ChapterId = 
  | 'home'
  | 'gallery'
  | 'shop'
  | 'destinations'
  | 'performing_arts'
  | 'festivals'
  | 'languages'
  | 'folklore'
  | 'wildlife'
  | 'archaeology'
  | 'ayurveda'
  | 'artisans'
  | 'reflections';

export type IndianRegion = 
  | 'North' 
  | 'South' 
  | 'East' 
  | 'West' 
  | 'Northeast' 
  | 'Central' 
  | 'Trans-Himalayas';

export interface ChapterMeta {
  id: ChapterId;
  index: number;
  title: string;
  sanskritSubtitle: string;
  englishKicker: string;
  description: string;
  iconName: string;
}

export interface HeritageItem {
  id: string;
  chapter: ChapterId;
  title: string;
  vernacularTitle?: string;
  subtitle: string;
  region: IndianRegion;
  location: string;
  state: string;
  coordinates?: string;
  eraOrEpoch: string;
  significance: string;
  curatorialNotes: string;
  preservationStatus?: string;
  imageUrl: string;
  imageAlt: string;
  imageCredit?: string;
  imageCreditUrl?: string;
  sources?: { label: string; url: string }[];
  tags: string[];
  accessionNumber: string;
  featured?: boolean;
}

export interface ArtisanProduct {
  id: string;
  title: string;
  craftTechnique: string;
  artisanName: string;
  artisanLineage: string;
  giTagLocation: string;
  state: string;
  region: IndianRegion;
  priceInr: number;
  priceUsd: number;
  timeToCraft: string;
  materials: string[];
  description: string;
  provenanceCertificate: string;
  imageUrl: string;
  stockStatus: 'In Stock' | 'Crafted to Order' | 'Limited Atelier Batch';
  category: 'textiles' | 'metalware' | 'pottery' | 'paintings' | 'wellness' | 'woodcraft';
}

export interface CartItem {
  product: ArtisanProduct;
  quantity: number;
  selectedVariant?: string;
}

export interface PerformingArtItem extends HeritageItem {
  traditionType: 'Classical Dance' | 'Folk Dance' | 'Ancient Theatre' | 'Mystic Vocal' | 'Classical Music';
  primaryInstruments: string[];
  rhythmCycle?: string;
  keyFeature: string;
  mudraOrExpression?: string;
}

export interface LanguageItem {
  id: string;
  name: string;
  vernacularScript: string;
  scriptName: string;
  family: 'Indo-Aryan' | 'Dravidian' | 'Austroasiatic' | 'Tibeto-Burman';
  era: string;
  speakersCount: string;
  regions: string;
  ancientSpecimen: string;
  transliteration: string;
  englishMeaning: string;
  historicalNote: string;
  pronunciationGuide: string;
}

export interface FolkloreItem {
  id: string;
  title: string;
  subtitle?: string;
  vernacularTitle: string;
  region: IndianRegion;
  tradition: string; // e.g., "Katha Vachana", "Patanjali Lore", "Panchatantra"
  theme: string;
  narrativeSummary: string;
  moralOrMetaphor: string;
  archivalQuote: string;
  era: string;
}

export interface WellnessHerb {
  id: string;
  sanskritName: string;
  botanicalName: string;
  englishName: string;
  doshaAffinity: 'Vata' | 'Pitta' | 'Kapha' | 'Tridoshic (All Three)';
  rasaTaste: string;
  therapeuticBenefits: string[];
  classicalTextQuote: string;
  usageRitual: string;
}

export interface ReflectionRecord {
  id: string;
  authorName: string;
  authorRole: string;
  originCity: string;
  region: IndianRegion;
  journeyTitle: string;
  reflectionText: string;
  associatedHeritage: string;
  category: 'destinations' | 'performing_arts' | 'crafts' | 'folklore' | 'wellness' | 'festivals';
  date: string;
  status: 'approved' | 'pending_review' | 'flagged';
  moderationScore: number;
  likes: number;
}
