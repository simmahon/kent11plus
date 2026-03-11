/* ------------------------------------------------------------------ */
/*  Curated Passage Bank for Kent 11+ Comprehension Practice          */
/*  A mix of fiction, non-fiction, poetry, historical, and scientific  */
/*  passages at age-appropriate difficulty for 10-11 year olds.       */
/* ------------------------------------------------------------------ */

export interface Passage {
  id: string;
  title: string;
  content: string;
  genre: "fiction" | "non-fiction" | "poetry" | "historical" | "scientific";
  difficulty: 1 | 2 | 3 | 4 | 5;
  wordCount: number;
  source?: string;
}

export const PASSAGES: Passage[] = [
  /* ---- EASY (difficulty 1-2) ---- */
  {
    id: "fiction-001",
    title: "The Lighthouse Keeper's Cat",
    content:
      "The old lighthouse stood like a pale finger pointing at the sky. Every evening, as the sun slipped below the horizon, Martha climbed the spiral staircase to light the great lamp. Her ginger cat, Barnaby, followed three steps behind, his tail swishing against the cold stone walls. Together they watched the beam sweep across the dark water, guiding fishing boats safely home. Barnaby would press his warm body against the glass and purr, as though he believed it was his rumbling that kept the ships from harm. Martha never corrected him. In truth, she found the sound as comforting as any light. On stormy nights, when the wind howled and the waves crashed against the rocks below, it was Barnaby's steady purr that kept her own fears at bay.",
    genre: "fiction",
    difficulty: 2,
    wordCount: 128,
    source: "Original",
  },
  {
    id: "nonfiction-001",
    title: "The Secret Life of Honeybees",
    content:
      "A single honeybee will produce only about one twelfth of a teaspoon of honey in its entire lifetime. To make just one pound of honey, a colony must visit roughly two million flowers and fly a combined distance equal to twice around the Earth. Inside the hive, bees communicate through an extraordinary waggle dance. A forager bee returning from a rich food source performs a figure-of-eight movement, vibrating her body rapidly. The angle of the dance tells other bees the direction of the flowers relative to the sun, while the duration of the waggle indicates the distance. Scientists have discovered that bees can even account for the sun's movement across the sky, adjusting their dance throughout the day. This remarkable navigation system allows a colony to exploit food sources up to five miles away with astonishing precision.",
    genre: "scientific",
    difficulty: 2,
    wordCount: 144,
    source: "Original",
  },
  {
    id: "poetry-001",
    title: "Sea Fever",
    content:
      "I must go down to the seas again, to the lonely sea and the sky,\nAnd all I ask is a tall ship and a star to steer her by;\nAnd the wheel's kick and the wind's song and the white sail's shaking,\nAnd a grey mist on the sea's face, and a grey dawn breaking.\n\nI must go down to the seas again, for the call of the running tide\nIs a wild call and a clear call that may not be denied;\nAnd all I ask is a windy day with the white clouds flying,\nAnd the flung spray and the blown spume, and the sea-gulls crying.",
    genre: "poetry",
    difficulty: 2,
    wordCount: 110,
    source: "John Masefield (public domain)",
  },

  /* ---- MEDIUM (difficulty 3) ---- */
  {
    id: "fiction-002",
    title: "The Map in the Attic",
    content:
      "Elara had not intended to explore the attic. She had been looking for her grandmother's sewing box when the loose floorboard shifted beneath her foot, revealing a roll of yellowed paper tied with a faded ribbon. The map -- for that was unmistakably what it was -- showed the village as it had been a hundred years ago. Roads that no longer existed wound between buildings she had never seen. But it was the marking in the corner that made her breath catch: a small red cross drawn over the exact spot where her grandmother's house now stood, and beside it, in careful copperplate handwriting, the words \"Not to be opened until the river changes course.\" Elara glanced out of the dusty window towards the stream at the bottom of the garden. Last winter's floods had shifted its path by several metres. Her hands trembled as she turned the map over.",
    genre: "fiction",
    difficulty: 3,
    wordCount: 157,
    source: "Original",
  },
  {
    id: "historical-001",
    title: "The Children of the Blitz",
    content:
      "In September 1940, the skies over London turned orange as the Blitz began. For fifty-seven consecutive nights, German bombers rained explosives upon the city. Families huddled in Anderson shelters -- corrugated steel structures buried in back gardens -- or descended into the Underground stations, where thousands slept on platforms meant for commuters. Children adapted with remarkable resilience. They collected shrapnel as other children might collect conkers, comparing fragments at school the next morning. Many were evacuated to the countryside, arriving at rural stations with name tags tied to their coats and gas masks slung over their shoulders. For some, it was an adventure; for others, the separation from their parents was more frightening than any bomb. One evacuee, nine-year-old Thomas Barrett, later wrote: \"The silence of the countryside was the loudest thing I had ever heard.\"",
    genre: "historical",
    difficulty: 3,
    wordCount: 152,
    source: "Original, based on historical accounts",
  },
  {
    id: "scientific-001",
    title: "The Strange World of Deep-Sea Creatures",
    content:
      "Below one thousand metres, the ocean becomes a world of perpetual darkness. No sunlight penetrates this far, yet life thrives in astonishing abundance. Many deep-sea creatures have evolved bioluminescence -- the ability to produce their own light through chemical reactions within their bodies. The anglerfish dangles a glowing lure above its enormous mouth, attracting curious prey into its needle-like teeth. The vampire squid, despite its fearsome name, is a gentle scavenger that drifts through the deep, its body studded with light-producing organs called photophores. Perhaps most remarkable is the deep-sea dragonfish, which can produce red light invisible to most other deep-sea animals, effectively giving it a secret searchlight. Scientists estimate that we have explored less than five per cent of the deep ocean, suggesting that countless species remain undiscovered in these crushing, lightless depths.",
    genre: "scientific",
    difficulty: 3,
    wordCount: 149,
    source: "Original",
  },
  {
    id: "nonfiction-002",
    title: "The Language of Trees",
    content:
      "Beneath the forest floor lies an extraordinary network that scientists have nicknamed the \"Wood Wide Web.\" Tree roots are connected by a vast web of fungal threads called mycorrhizae, which allow trees to share nutrients and even send chemical warning signals to one another. When a tree is attacked by insects, it can release chemicals into this underground network, prompting neighbouring trees to produce defensive compounds before the insects reach them. Research by Professor Suzanne Simard has revealed that older trees, known as \"mother trees,\" actively nourish younger seedlings through these fungal connections, sending them carbon and other nutrients. Remarkably, mother trees appear to recognise their own offspring, sending them more resources than unrelated seedlings. This challenges the old view of forests as collections of competing individuals and suggests instead a cooperative community where trees look after one another.",
    genre: "non-fiction",
    difficulty: 3,
    wordCount: 150,
    source: "Original, inspired by Suzanne Simard's research",
  },
  {
    id: "fiction-003",
    title: "The Clockmaker's Apprentice",
    content:
      "Jem pressed his eye to the magnifying glass and held his breath. The tiny gear, no larger than a ladybird, had to slot precisely between two others without disturbing the delicate spring that powered the mechanism. Master Aldric watched from across the workshop, his expression unreadable. \"Steady hands and a patient heart,\" he had told Jem on his first day. \"A clock does not care how clever you are. It cares only whether you can be still.\" Jem's fingers trembled. He thought of his mother, who had pawned her wedding ring to pay for this apprenticeship, and of the letter he would write to her tonight. The gear slid into place with a satisfying click. The mechanism whirred to life. Master Aldric said nothing, but Jem caught the faintest twitch at the corner of his mouth -- and from the old clockmaker, that was as good as a standing ovation.",
    genre: "fiction",
    difficulty: 3,
    wordCount: 156,
    source: "Original",
  },

  /* ---- HARD (difficulty 4-5) ---- */
  {
    id: "fiction-004",
    title: "The Glass Garden",
    content:
      "Professor Hargreaves had always maintained that beauty and science were not merely compatible but inseparable. Her greenhouse at the university proved the point magnificently. Beneath its Victorian ironwork and crystal panes, she had cultivated a collection of carnivorous plants that visitors found simultaneously enchanting and unsettling. The Venus flytraps sat in neat rows like miniature green jaws, while sundews glistened with droplets that resembled morning dew but were, in fact, a lethal adhesive. \"People assume these plants are aggressive,\" the professor explained to her students, adjusting her spectacles. \"In reality, they evolved in nutrient-poor soil. They became carnivorous not out of malice, but necessity -- a lesson one might usefully apply to judging human behaviour.\" She paused beside a pitcher plant whose elegant trumpet concealed a pool of digestive enzymes. \"Nature is rarely what it appears to be at first glance. The same, I find, is true of people.\"",
    genre: "fiction",
    difficulty: 4,
    wordCount: 158,
    source: "Original",
  },
  {
    id: "historical-002",
    title: "The Voyages of Ibn Battuta",
    content:
      "In 1325, a twenty-one-year-old scholar named Ibn Battuta set out from Tangier on a pilgrimage to Mecca. He would not return home for twenty-four years. During that extraordinary quarter-century, he travelled approximately seventy-five thousand miles -- three times further than Marco Polo -- visiting forty-four modern countries across Africa, Asia, and Europe. Unlike many medieval travellers, Ibn Battuta was keenly interested in the daily lives of ordinary people. He documented marriage customs, food, architecture, and systems of justice with a sharp and often humorous eye. In the Maldives, he served as a judge; in Delhi, he was appointed ambassador to China. His journey was not without peril: he survived shipwrecks, bandit attacks, and the Black Death. When he finally dictated his memoirs, many scholars dismissed his accounts as exaggeration. Modern archaeology, however, has confirmed the accuracy of details that once seemed too extraordinary to be believed.",
    genre: "historical",
    difficulty: 4,
    wordCount: 159,
    source: "Original, based on historical record",
  },
  {
    id: "poetry-002",
    title: "Ozymandias",
    content:
      "I met a traveller from an antique land,\nWho said -- \"Two vast and trunkless legs of stone\nStand in the desert. . . . Near them, on the sand,\nHalf sunk a shattered visage lies, whose frown,\nAnd wrinkled lip, and sneer of cold command,\nTell that its sculptor well those passions read\nWhich yet survive, stamped on these lifeless things,\nThe hand that mocked them, and the heart that fed;\nAnd on the pedestal, these words appear:\nMy name is Ozymandias, King of Kings;\nLook on my Works, ye Mighty, and despair!\nNothing beside remains. Round the decay\nOf that colossal Wreck, boundless and bare\nThe lone and level sands stretch far away.\"",
    genre: "poetry",
    difficulty: 5,
    wordCount: 114,
    source: "Percy Bysshe Shelley (public domain)",
  },
  {
    id: "scientific-002",
    title: "The Mathematics of Snowflakes",
    content:
      "No two snowflakes are alike -- or so the saying goes. The truth, as is often the case in science, is both more complicated and more fascinating. A snowflake begins as a microscopic speck of dust around which water vapour crystallises in the upper atmosphere. Because water molecules naturally bond at angles of precisely one hundred and twenty degrees, every ice crystal develops six-fold symmetry -- the characteristic hexagonal pattern we associate with snowflakes. As the crystal tumbles through clouds of varying temperature and humidity, each of its six arms encounters identical conditions simultaneously, ensuring they grow in near-perfect symmetry with one another. However, the precise path each snowflake takes through the atmosphere is unique, meaning the specific pattern of branching is unrepeatable. Mathematician Ian Stewart has calculated that the number of possible snowflake designs exceeds the number of atoms in the observable universe, making the old saying, for all practical purposes, entirely correct.",
    genre: "scientific",
    difficulty: 4,
    wordCount: 162,
    source: "Original, inspired by Kenneth Libbrecht's research",
  },
  {
    id: "nonfiction-003",
    title: "The Rosetta Stone",
    content:
      "For centuries, the hieroglyphs carved into Egypt's ancient monuments remained an impenetrable mystery. Scholars could see that the symbols told stories, but without a key to their meaning, the voices of the pharaohs were silenced. That key arrived unexpectedly in 1799, when French soldiers rebuilding a fort near the town of Rashid uncovered a slab of dark granite bearing three versions of the same decree. The top section was written in hieroglyphs, the middle in a cursive Egyptian script called demotic, and the bottom in Ancient Greek -- a language scholars could already read. It took a further twenty-three years before Jean-Francois Champollion, a brilliant French linguist who had taught himself Coptic as a teenager, finally cracked the code in 1822. His breakthrough rested on a deceptively simple insight: hieroglyphs were not purely symbolic but contained phonetic elements representing sounds. In one stroke, he gave voice to three thousand years of Egyptian civilisation.",
    genre: "historical",
    difficulty: 5,
    wordCount: 165,
    source: "Original, based on historical record",
  },
];

/* ------------------------------------------------------------------ */
/*  Passage selection helper                                           */
/* ------------------------------------------------------------------ */

/**
 * Returns a random passage whose difficulty is within +/-1 of the
 * requested level. Falls back to the nearest available passage if
 * no match exists within that range.
 */
export function getPassageForDifficulty(difficulty: number): Passage {
  // Clamp requested difficulty to valid range
  const target = Math.max(1, Math.min(5, Math.round(difficulty)));

  // First try: passages within +/-1 of target
  const candidates = PASSAGES.filter(
    (p) => Math.abs(p.difficulty - target) <= 1,
  );

  if (candidates.length > 0) {
    return candidates[Math.floor(Math.random() * candidates.length)];
  }

  // Fallback: pick the passage with the closest difficulty
  const sorted = [...PASSAGES].sort(
    (a, b) => Math.abs(a.difficulty - target) - Math.abs(b.difficulty - target),
  );
  return sorted[0];
}
