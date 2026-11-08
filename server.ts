import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

export interface CommunityReflection {
  id: string;
  authorName: string;
  authorRole: string; // e.g. "Heritage Traveler", "Archaeology Fellow", "Living Craft Researcher"
  originCity: string;
  region: 'North' | 'South' | 'East' | 'West' | 'Northeast' | 'Central' | 'Trans-Himalayas';
  journeyTitle: string;
  reflectionText: string;
  associatedHeritage: string;
  category: 'destinations' | 'performing_arts' | 'crafts' | 'folklore' | 'wellness' | 'festivals';
  date: string;
  status: 'approved' | 'pending_review' | 'flagged';
  moderationScore: number; // 0-100, 100 is pristine
  likes: number;
}

// Initial Curated Community Reflections
let reflectionsDb: CommunityReflection[] = [
  {
    id: 'refl-1',
    authorName: 'Dr. Gayatri Ramachandran',
    authorRole: 'Epigraphy & Classical Dance Scholar',
    originCity: 'Thanjavur, Tamil Nadu',
    region: 'South',
    journeyTitle: 'The Echoing Monolith of Lepakshi at Sunrise',
    reflectionText: 'Standing beneath the Veerabhadra temple hanging pillar at dawn, one realizes how Indian architectural mechanics were inseparable from metaphysical contemplation. The monolithic Nandi, carved from a single granite hillock, gazes not at the temple gate but at the sanctum sanctorum with eternal devotion.',
    associatedHeritage: 'Lepakshi Hanging Pillar & Vijayanagara Frescoes',
    category: 'destinations',
    date: '2026-10-14',
    status: 'approved',
    moderationScore: 98,
    likes: 42
  },
  {
    id: 'refl-2',
    authorName: 'Kabir Bhowmick',
    authorRole: 'Documentary Ethnomusicologist',
    originCity: 'Shantiniketan, West Bengal',
    region: 'East',
    journeyTitle: 'Taal and River Mists with the Bauls of Kenduli',
    reflectionText: 'Listening to an ektara string resonate by the Ajay river during dusk is an experience no acoustic lab can replicate. The Baul singing tradition is a philosophy of the Moner Manush (the inner beloved) - unbounded by caste or dogma, passed directly heart-to-heart through melodic breath.',
    associatedHeritage: 'Baul Mystic Tradition of Bengal',
    category: 'performing_arts',
    date: '2026-09-28',
    status: 'approved',
    moderationScore: 99,
    likes: 38
  },
  {
    id: 'refl-3',
    authorName: 'Farooq Ahmad Mir',
    authorRole: 'Master Shawl Restorer',
    originCity: 'Srinagar, Kashmir',
    region: 'North',
    journeyTitle: 'Ten Thousand Stitches on Changthangi Pashmina',
    reflectionText: 'True Sozni embroidery cannot be rushed. When working with pure underfleece combed from Himalayan Capra hircus goats at 14,000 feet, the needle is finer than an eyelash. A single ceremonial Jamawar takes two seasons of winter sunlight through walnut jharokha lattice.',
    associatedHeritage: 'Kashmir Sozni & Pashmina Guilds',
    category: 'crafts',
    date: '2026-08-19',
    status: 'approved',
    moderationScore: 97,
    likes: 64
  },
  {
    id: 'refl-4',
    authorName: 'Meenakshi Sundaram',
    authorRole: 'Ayurvedic Botanist',
    originCity: 'Kottakkal, Kerala',
    region: 'South',
    journeyTitle: 'The Midnight Haritaki Harvest in the Nilgiri Slopes',
    reflectionText: 'According to the Charaka Samhita, rasayana botanicals must be gathered when lunar moisture balances terrestrial heat. Tasting fresh Amalaki harvested from sacred evergreen groves confirms that indigenous Indian wellness is an intimate synchrony between circadian rhythm and soil vitality.',
    associatedHeritage: 'Ashtavaidya Ayurvedic Lineages',
    category: 'wellness',
    date: '2026-10-02',
    status: 'approved',
    moderationScore: 96,
    likes: 29
  },
  {
    id: 'refl-5',
    authorName: 'Rigzin Norbu',
    authorRole: 'Ladakhi Thangka Preservationist',
    originCity: 'Leh, Ladakh',
    region: 'Trans-Himalayas',
    journeyTitle: 'The Masked Cham Dancers of Hemis Monastic Courtyard',
    reflectionText: 'The sound of the six-foot dungchen horns echoing against the barren Zanskar crags vibrates in the chest before it reaches the ears. The Cham ritual dances are sacred dynamic mandalas painted in living silk, dispelling mental obstacles for the coming winter cycle.',
    associatedHeritage: 'Hemis Sacred Cham Dances & Vajrayana Rituals',
    category: 'festivals',
    date: '2026-11-01',
    status: 'approved',
    moderationScore: 100,
    likes: 51
  }
];

// Health Check Endpoint
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    app: 'ParamparaX 2.0 Royal Atlas Engine',
    version: '2.0.0',
    timestamp: new Date().toISOString(),
    database: 'active',
    totalReflections: reflectionsDb.length
  });
});

// GET /api/reflections - with filtering and moderation filter
app.get('/api/reflections', (req: Request, res: Response) => {
  const { region, category, status, search } = req.query;

  let results = [...reflectionsDb];

  // Default to approved unless explicitly requesting all/pending for review
  if (status && typeof status === 'string') {
    if (status !== 'all') {
      results = results.filter(r => r.status === status);
    }
  } else {
    results = results.filter(r => r.status === 'approved');
  }

  if (region && typeof region === 'string' && region !== 'all') {
    results = results.filter(r => r.region.toLowerCase() === region.toLowerCase());
  }

  if (category && typeof category === 'string' && category !== 'all') {
    results = results.filter(r => r.category.toLowerCase() === category.toLowerCase());
  }

  if (search && typeof search === 'string' && search.trim() !== '') {
    const q = search.toLowerCase();
    results = results.filter(r =>
      r.journeyTitle.toLowerCase().includes(q) ||
      r.reflectionText.toLowerCase().includes(q) ||
      r.authorName.toLowerCase().includes(q) ||
      r.associatedHeritage.toLowerCase().includes(q) ||
      r.originCity.toLowerCase().includes(q)
    );
  }

  // Sort by most recent
  results.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  res.json({
    success: true,
    count: results.length,
    data: results
  });
});

// POST /api/reflections - with validation and moderation filter
app.post('/api/reflections', (req: Request, res: Response) => {
  const { authorName, authorRole, originCity, region, journeyTitle, reflectionText, associatedHeritage, category } = req.body;

  // Validation
  const errors: string[] = [];
  if (!authorName || typeof authorName !== 'string' || authorName.trim().length < 2) {
    errors.push('Author name must be at least 2 characters.');
  }
  if (!originCity || typeof originCity !== 'string' || originCity.trim().length < 2) {
    errors.push('Origin city/hometown is required.');
  }
  if (!journeyTitle || typeof journeyTitle !== 'string' || journeyTitle.trim().length < 4) {
    errors.push('Reflection title must be at least 4 characters.');
  }
  if (!reflectionText || typeof reflectionText !== 'string' || reflectionText.trim().length < 20) {
    errors.push('Reflection text must be at least 20 characters.');
  }
  if (!region || !['North', 'South', 'East', 'West', 'Northeast', 'Central', 'Trans-Himalayas'].includes(region)) {
    errors.push('Please select a valid geographic region of India.');
  }
  if (!category || !['destinations', 'performing_arts', 'crafts', 'folklore', 'wellness', 'festivals'].includes(category)) {
    errors.push('Please select a valid heritage category.');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors
    });
  }

  // Basic moderation rule check
  const bannedPatterns = [/spam/i, /casino/i, /crypto giveaway/i, /buy now/i, /http:\/\//i];
  const containsSuspicious = bannedPatterns.some(pat => pat.test(reflectionText) || pat.test(journeyTitle));

  let moderationScore = 95;
  let status: 'approved' | 'pending_review' | 'flagged' = 'approved';

  if (containsSuspicious) {
    moderationScore = 40;
    status = 'flagged';
  } else if (reflectionText.length < 50) {
    moderationScore = 75;
    status = 'approved';
  } else {
    moderationScore = 98;
    status = 'approved';
  }

  const newReflection: CommunityReflection = {
    id: `refl-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    authorName: authorName.trim(),
    authorRole: (authorRole && typeof authorRole === 'string' && authorRole.trim()) || 'Heritage Enthusiast',
    originCity: originCity.trim(),
    region,
    journeyTitle: journeyTitle.trim(),
    reflectionText: reflectionText.trim(),
    associatedHeritage: (associatedHeritage && typeof associatedHeritage === 'string' && associatedHeritage.trim()) || 'Living Indian Tradition',
    category,
    date: new Date().toISOString().split('T')[0],
    status,
    moderationScore,
    likes: 1
  };

  reflectionsDb.unshift(newReflection);

  return res.status(201).json({
    success: true,
    message: status === 'approved' ? 'Reflection published into royal journal archive.' : 'Reflection submitted for editorial curatorial review.',
    data: newReflection
  });
});

// PATCH /api/reflections/:id/like - Like a reflection
app.patch('/api/reflections/:id/like', (req: Request, res: Response) => {
  const { id } = req.params;
  const item = reflectionsDb.find(r => r.id === id);
  if (!item) {
    return res.status(404).json({ success: false, message: 'Reflection not found' });
  }
  item.likes += 1;
  return res.json({ success: true, likes: item.likes });
});

// PATCH /api/reflections/:id/status - Moderate a reflection (curator tool)
app.patch('/api/reflections/:id/status', (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;
  if (!['approved', 'pending_review', 'flagged'].includes(status)) {
    return res.status(400).json({ success: false, message: 'Invalid status' });
  }
  const item = reflectionsDb.find(r => r.id === id);
  if (!item) {
    return res.status(404).json({ success: false, message: 'Reflection not found' });
  }
  item.status = status;
  return res.json({ success: true, data: item });
});

// GET /api/reflections/stats - Summary metrics for editorial board
app.get('/api/reflections/stats', (_req: Request, res: Response) => {
  const total = reflectionsDb.length;
  const approved = reflectionsDb.filter(r => r.status === 'approved').length;
  const pending = reflectionsDb.filter(r => r.status === 'pending_review').length;
  const regionsCount: Record<string, number> = {};
  reflectionsDb.forEach(r => {
    regionsCount[r.region] = (regionsCount[r.region] || 0) + 1;
  });

  return res.json({
    total,
    approved,
    pending,
    regions: regionsCount
  });
});

// Setup Vite or static serving
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`ParamparaX 2.0 Royal Server running on http://localhost:${PORT}`);
  });
}

startServer();
