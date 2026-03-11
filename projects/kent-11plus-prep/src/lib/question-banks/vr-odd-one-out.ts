import type { BankedQuestion } from "./types";

/**
 * 100 Odd One Out questions for Kent 11+ Verbal Reasoning
 *
 * Connection types rotated: category, property, linguistic,
 * grammar, meaning
 *
 * Distribution:
 *   Difficulty 1: 10 | 2: 15 | 3: 25 | 4: 30 | 5: 20
 */
export const BANK: BankedQuestion[] = [
  // ========== DIFFICULTY 1 (10 questions) ==========
  {
    stem: "Which word is the odd one out?",
    options: ["apple", "banana", "carrot", "orange", "grape"],
    correctIndex: 2,
    explanation:
      "Carrot is a vegetable. The other four are all fruits.",
    difficulty: 1,
    topic: "odd one out",
  },
  {
    stem: "Which word is the odd one out?",
    options: ["dog", "cat", "rabbit", "eagle", "hamster"],
    correctIndex: 3,
    explanation:
      "Eagle is a bird. The other four are all common household pets that are mammals.",
    difficulty: 1,
    topic: "odd one out",
  },
  {
    stem: "Which word is the odd one out?",
    options: ["red", "blue", "green", "circle", "yellow"],
    correctIndex: 3,
    explanation:
      "Circle is a shape. The other four are all colours.",
    difficulty: 1,
    topic: "odd one out",
  },
  {
    stem: "Which word is the odd one out?",
    options: ["chair", "table", "lamp", "sofa", "trousers"],
    correctIndex: 4,
    explanation:
      "Trousers are clothing. The other four are all items of furniture found in a home.",
    difficulty: 1,
    topic: "odd one out",
  },
  {
    stem: "Which word is the odd one out?",
    options: ["Monday", "Friday", "March", "Tuesday", "Sunday"],
    correctIndex: 2,
    explanation:
      "March is a month. The other four are all days of the week.",
    difficulty: 1,
    topic: "odd one out",
  },
  {
    stem: "Which word is the odd one out?",
    options: ["piano", "guitar", "drum", "painting", "flute"],
    correctIndex: 3,
    explanation:
      "A painting is a work of visual art. The other four are all musical instruments.",
    difficulty: 1,
    topic: "odd one out",
  },
  {
    stem: "Which word is the odd one out?",
    options: ["football", "tennis", "cricket", "reading", "rugby"],
    correctIndex: 3,
    explanation:
      "Reading is a quiet activity, not a sport. The other four are all sports.",
    difficulty: 1,
    topic: "odd one out",
  },
  {
    stem: "Which word is the odd one out?",
    options: ["car", "bus", "train", "bicycle", "house"],
    correctIndex: 4,
    explanation:
      "A house is a building. The other four are all forms of transport.",
    difficulty: 1,
    topic: "odd one out",
  },
  {
    stem: "Which word is the odd one out?",
    options: ["one", "three", "five", "seven", "six"],
    correctIndex: 4,
    explanation:
      "Six is an even number. The other four are all odd numbers.",
    difficulty: 1,
    topic: "odd one out",
  },
  {
    stem: "Which word is the odd one out?",
    options: ["hand", "foot", "knee", "hat", "elbow"],
    correctIndex: 3,
    explanation:
      "A hat is an item of clothing. The other four are all parts of the body.",
    difficulty: 1,
    topic: "odd one out",
  },

  // ========== DIFFICULTY 2 (15 questions) ==========
  {
    stem: "Which word is the odd one out?",
    options: ["oak", "elm", "ash", "daisy", "birch"],
    correctIndex: 3,
    explanation:
      "A daisy is a flower. The other four are all types of tree.",
    difficulty: 2,
    topic: "odd one out",
  },
  {
    stem: "Which word is the odd one out?",
    options: ["run", "sprint", "jog", "dash", "sit"],
    correctIndex: 4,
    explanation:
      "Sit means to be still. The other four all mean to move quickly on foot.",
    difficulty: 2,
    topic: "odd one out",
  },
  {
    stem: "Which word is the odd one out?",
    options: ["France", "Spain", "Italy", "London", "Germany"],
    correctIndex: 3,
    explanation:
      "London is a city. The other four are all countries in Europe.",
    difficulty: 2,
    topic: "odd one out",
  },
  {
    stem: "Which word is the odd one out?",
    options: ["whale", "dolphin", "seal", "otter", "penguin"],
    correctIndex: 4,
    explanation:
      "A penguin is a bird. The other four are all mammals that spend much of their time in water.",
    difficulty: 2,
    topic: "odd one out",
  },
  {
    stem: "Which word is the odd one out?",
    options: ["happy", "cheerful", "joyful", "merry", "angry"],
    correctIndex: 4,
    explanation:
      "Angry means feeling displeasure. The other four all describe feelings of happiness.",
    difficulty: 2,
    topic: "odd one out",
  },
  {
    stem: "Which word is the odd one out?",
    options: ["butter", "cheese", "yoghurt", "bread", "cream"],
    correctIndex: 3,
    explanation:
      "Bread is made from grain. The other four are all dairy products made from milk.",
    difficulty: 2,
    topic: "odd one out",
  },
  {
    stem: "Which word is the odd one out?",
    options: ["Mars", "Venus", "Saturn", "Moon", "Jupiter"],
    correctIndex: 3,
    explanation:
      "The Moon is a natural satellite. The other four are all planets in our solar system.",
    difficulty: 2,
    topic: "odd one out",
  },
  {
    stem: "Which word is the odd one out?",
    options: ["saw", "hammer", "drill", "pencil", "chisel"],
    correctIndex: 3,
    explanation:
      "A pencil is a writing tool. The other four are all woodworking or DIY tools.",
    difficulty: 2,
    topic: "odd one out",
  },
  {
    stem: "Which word is the odd one out?",
    options: ["cotton", "silk", "wool", "nylon", "linen"],
    correctIndex: 3,
    explanation:
      "Nylon is a synthetic (man-made) fabric. The other four are all natural fabrics.",
    difficulty: 2,
    topic: "odd one out",
  },
  {
    stem: "Which word is the odd one out?",
    options: ["triangle", "square", "pentagon", "sphere", "hexagon"],
    correctIndex: 3,
    explanation:
      "A sphere is a 3D shape. The other four are all 2D shapes (flat polygons).",
    difficulty: 2,
    topic: "odd one out",
  },
  {
    stem: "Which word is the odd one out?",
    options: ["violin", "cello", "harp", "trumpet", "guitar"],
    correctIndex: 3,
    explanation:
      "A trumpet is a brass instrument. The other four are all stringed instruments.",
    difficulty: 2,
    topic: "odd one out",
  },
  {
    stem: "Which word is the odd one out?",
    options: ["sparrow", "robin", "wren", "thrush", "bat"],
    correctIndex: 4,
    explanation:
      "A bat is a mammal that flies. The other four are all birds.",
    difficulty: 2,
    topic: "odd one out",
  },
  {
    stem: "Which word is the odd one out?",
    options: ["rose", "tulip", "daffodil", "lily", "fern"],
    correctIndex: 4,
    explanation:
      "A fern does not produce flowers. The other four are all flowering plants.",
    difficulty: 2,
    topic: "odd one out",
  },
  {
    stem: "Which word is the odd one out?",
    options: ["river", "stream", "lake", "brook", "canal"],
    correctIndex: 4,
    explanation:
      "A canal is man-made. The other four are all natural bodies or flows of water.",
    difficulty: 2,
    topic: "odd one out",
  },
  {
    stem: "Which word is the odd one out?",
    options: ["copper", "iron", "gold", "silver", "wood"],
    correctIndex: 4,
    explanation:
      "Wood comes from trees. The other four are all metals.",
    difficulty: 2,
    topic: "odd one out",
  },

  // ========== DIFFICULTY 3 (25 questions) ==========
  {
    stem: "Which word is the odd one out?",
    options: ["couplet", "verse", "stanza", "paragraph", "rhyme"],
    correctIndex: 3,
    explanation:
      "A paragraph is a unit of prose writing. The other four are all terms associated with poetry.",
    difficulty: 3,
    topic: "odd one out",
  },
  {
    stem: "Which word is the odd one out?",
    options: ["glass", "water", "ice", "air", "brick"],
    correctIndex: 4,
    explanation:
      "A brick is opaque (you cannot see through it). The other four are all transparent or translucent.",
    difficulty: 3,
    topic: "odd one out",
  },
  {
    stem: "Which word is the odd one out?",
    options: ["sheep", "deer", "cattle", "moose", "fox"],
    correctIndex: 4,
    explanation:
      "Fox has a regular plural (foxes). The other four all have irregular plurals that are the same as the singular (sheep, deer, cattle, moose).",
    difficulty: 3,
    topic: "odd one out",
  },
  {
    stem: "Which word is the odd one out?",
    options: ["whisper", "murmur", "mutter", "shout", "mumble"],
    correctIndex: 3,
    explanation:
      "Shout means to speak very loudly. The other four all mean to speak very quietly.",
    difficulty: 3,
    topic: "odd one out",
  },
  {
    stem: "Which word is the odd one out?",
    options: ["ballet", "waltz", "tango", "opera", "salsa"],
    correctIndex: 3,
    explanation:
      "Opera is a form of musical theatre involving singing. The other four are all forms of dance.",
    difficulty: 3,
    topic: "odd one out",
  },
  {
    stem: "Which word is the odd one out?",
    options: ["python", "cobra", "adder", "lizard", "viper"],
    correctIndex: 3,
    explanation:
      "A lizard has legs. The other four are all snakes, which have no legs.",
    difficulty: 3,
    topic: "odd one out",
  },
  {
    stem: "Which word is the odd one out?",
    options: ["broccoli", "spinach", "lettuce", "pea", "strawberry"],
    correctIndex: 4,
    explanation:
      "A strawberry is red. The other four are all green vegetables.",
    difficulty: 3,
    topic: "odd one out",
  },
  {
    stem: "Which word is the odd one out?",
    options: ["simile", "metaphor", "alliteration", "noun", "personification"],
    correctIndex: 3,
    explanation:
      "A noun is a part of speech (grammar term). The other four are all literary devices or figures of speech.",
    difficulty: 3,
    topic: "odd one out",
  },
  {
    stem: "Which word is the odd one out?",
    options: ["enormous", "gigantic", "immense", "colossal", "miniature"],
    correctIndex: 4,
    explanation:
      "Miniature means very small. The other four all mean extremely large.",
    difficulty: 3,
    topic: "odd one out",
  },
  {
    stem: "Which word is the odd one out?",
    options: ["mercury", "aluminium", "oxygen", "iron", "lead"],
    correctIndex: 2,
    explanation:
      "Oxygen is a non-metal gas. The other four are all metals.",
    difficulty: 3,
    topic: "odd one out",
  },
  {
    stem: "Which word is the odd one out?",
    options: ["canoe", "kayak", "yacht", "raft", "sledge"],
    correctIndex: 4,
    explanation:
      "A sledge travels on snow or ice. The other four are all watercraft.",
    difficulty: 3,
    topic: "odd one out",
  },
  {
    stem: "Which word is the odd one out?",
    options: ["London", "Paris", "Berlin", "Sydney", "Tokyo"],
    correctIndex: 3,
    explanation:
      "Sydney is not a capital city. London, Paris, Berlin and Tokyo are all capital cities of their countries.",
    difficulty: 3,
    topic: "odd one out",
  },
  {
    stem: "Which word is the odd one out?",
    options: ["afraid", "terrified", "petrified", "fearful", "furious"],
    correctIndex: 4,
    explanation:
      "Furious means extremely angry. The other four all describe feelings of fear.",
    difficulty: 3,
    topic: "odd one out",
  },
  {
    stem: "Which word is the odd one out?",
    options: ["addition", "subtraction", "multiplication", "equation", "division"],
    correctIndex: 3,
    explanation:
      "An equation is a mathematical statement. The other four are all arithmetic operations.",
    difficulty: 3,
    topic: "odd one out",
  },
  {
    stem: "Which word is the odd one out?",
    options: ["blizzard", "hurricane", "tornado", "earthquake", "cyclone"],
    correctIndex: 3,
    explanation:
      "An earthquake is a geological event. The other four are all types of severe weather.",
    difficulty: 3,
    topic: "odd one out",
  },
  {
    stem: "Which word is the odd one out?",
    options: ["prefix", "suffix", "adjective", "hyphen", "apostrophe"],
    correctIndex: 2,
    explanation:
      "An adjective is a type of word (a part of speech). The other four are all grammar terms for parts of words or punctuation marks.",
    difficulty: 3,
    topic: "odd one out",
  },
  {
    stem: "Which word is the odd one out?",
    options: ["inch", "metre", "kilogram", "mile", "centimetre"],
    correctIndex: 2,
    explanation:
      "A kilogram measures weight (mass). The other four all measure length or distance.",
    difficulty: 3,
    topic: "odd one out",
  },
  {
    stem: "Which word is the odd one out?",
    options: ["terrace", "bungalow", "cottage", "garage", "mansion"],
    correctIndex: 3,
    explanation:
      "A garage is a building for vehicles. The other four are all types of houses where people live.",
    difficulty: 3,
    topic: "odd one out",
  },
  {
    stem: "Which word is the odd one out?",
    options: ["telescope", "binoculars", "microscope", "periscope", "stethoscope"],
    correctIndex: 4,
    explanation:
      "A stethoscope is used for listening. The other four are all optical instruments used for seeing.",
    difficulty: 3,
    topic: "odd one out",
  },
  {
    stem: "Which word is the odd one out?",
    options: ["novel", "autobiography", "magazine", "fable", "myth"],
    correctIndex: 2,
    explanation:
      "A magazine is a periodical publication. The other four are all types of book or story.",
    difficulty: 3,
    topic: "odd one out",
  },
  {
    stem: "Which word is the odd one out?",
    options: ["cello", "violin", "viola", "piano", "double bass"],
    correctIndex: 3,
    explanation:
      "A piano has keys and strings struck by hammers. The other four are all bowed string instruments.",
    difficulty: 3,
    topic: "odd one out",
  },
  {
    stem: "Which word is the odd one out?",
    options: ["maple", "sycamore", "holly", "beech", "oak"],
    correctIndex: 2,
    explanation:
      "Holly is an evergreen tree that keeps its leaves in winter. The other four are all deciduous trees that lose their leaves.",
    difficulty: 3,
    topic: "odd one out",
  },
  {
    stem: "Which word is the odd one out?",
    options: ["wrist", "ankle", "elbow", "knee", "shoulder"],
    correctIndex: 4,
    explanation:
      "The shoulder connects a limb to the body. The other four are all joints found in the middle of a limb.",
    difficulty: 3,
    topic: "odd one out",
  },
  {
    stem: "Which word is the odd one out?",
    options: ["emerald", "ruby", "sapphire", "diamond", "granite"],
    correctIndex: 4,
    explanation:
      "Granite is a common rock. The other four are all precious gemstones.",
    difficulty: 3,
    topic: "odd one out",
  },
  {
    stem: "Which word is the odd one out?",
    options: ["evaporation", "condensation", "erosion", "precipitation", "collection"],
    correctIndex: 2,
    explanation:
      "Erosion is the wearing away of rock or soil. The other four are all stages of the water cycle.",
    difficulty: 3,
    topic: "odd one out",
  },

  // ========== DIFFICULTY 4 (30 questions) ==========
  {
    stem: "Which word is the odd one out?",
    options: ["sonnet", "limerick", "haiku", "ballad", "essay"],
    correctIndex: 4,
    explanation:
      "An essay is a piece of prose writing. The other four are all specific forms of poetry.",
    difficulty: 4,
    topic: "odd one out",
  },
  {
    stem: "Which word is the odd one out?",
    options: ["bee", "wasp", "ant", "spider", "beetle"],
    correctIndex: 3,
    explanation:
      "A spider is an arachnid with eight legs. The other four are all insects with six legs.",
    difficulty: 4,
    topic: "odd one out",
  },
  {
    stem: "Which word is the odd one out?",
    options: ["teeth", "feet", "geese", "moose", "mice"],
    correctIndex: 3,
    explanation:
      "Moose is the same in singular and plural. The other four are all irregular plurals formed by changing a vowel sound (tooth/teeth, foot/feet, goose/geese, mouse/mice).",
    difficulty: 4,
    topic: "odd one out",
  },
  {
    stem: "Which word is the odd one out?",
    options: ["quick", "rapid", "swift", "hasty", "sluggish"],
    correctIndex: 4,
    explanation:
      "Sluggish means slow. The other four all mean fast.",
    difficulty: 4,
    topic: "odd one out",
  },
  {
    stem: "Which word is the odd one out?",
    options: ["democracy", "monarchy", "anarchy", "geography", "aristocracy"],
    correctIndex: 3,
    explanation:
      "Geography is the study of places. The other four are all systems of government or rule (words ending in -cracy or -archy relating to governance).",
    difficulty: 4,
    topic: "odd one out",
  },
  {
    stem: "Which word is the odd one out?",
    options: ["dusk", "twilight", "dawn", "gloaming", "midnight"],
    correctIndex: 4,
    explanation:
      "Midnight is the middle of the night (complete darkness). The other four all describe the time when day transitions to night or vice versa, with partial light.",
    difficulty: 4,
    topic: "odd one out",
  },
  {
    stem: "Which word is the odd one out?",
    options: ["solo", "duet", "trio", "quartet", "verse"],
    correctIndex: 4,
    explanation:
      "A verse is a section of a song or poem. The other four all describe a specific number of performers (1, 2, 3, 4).",
    difficulty: 4,
    topic: "odd one out",
  },
  {
    stem: "Which word is the odd one out?",
    options: ["receipt", "knight", "doubt", "plumb", "front"],
    correctIndex: 4,
    explanation:
      "In 'front', all letters are pronounced. The other four all contain a silent letter: receipt (p), knight (k), doubt (b), plumb (b).",
    difficulty: 4,
    topic: "odd one out",
  },
  {
    stem: "Which word is the odd one out?",
    options: ["crocodile", "tortoise", "iguana", "newt", "chameleon"],
    correctIndex: 3,
    explanation:
      "A newt is an amphibian. The other four are all reptiles.",
    difficulty: 4,
    topic: "odd one out",
  },
  {
    stem: "Which word is the odd one out?",
    options: ["hexagon", "rectangle", "octagon", "square", "rhombus"],
    correctIndex: 0,
    explanation:
      "A hexagon has six sides. The other four all have exactly four sides (they are all quadrilaterals).",
    difficulty: 4,
    topic: "odd one out",
  },
  {
    stem: "Which word is the odd one out?",
    options: ["onomatopoeia", "alliteration", "metaphor", "verb", "hyperbole"],
    correctIndex: 3,
    explanation:
      "A verb is a word class (part of speech). The other four are all literary techniques or figures of speech.",
    difficulty: 4,
    topic: "odd one out",
  },
  {
    stem: "Which word is the odd one out?",
    options: ["abundant", "plentiful", "ample", "copious", "scarce"],
    correctIndex: 4,
    explanation:
      "Scarce means in short supply. The other four all mean existing in large quantities.",
    difficulty: 4,
    topic: "odd one out",
  },
  {
    stem: "Which word is the odd one out?",
    options: ["cello", "bassoon", "tuba", "double bass", "drum"],
    correctIndex: 4,
    explanation:
      "A drum is a percussion instrument. The other four all produce low-pitched notes and belong to the string, woodwind or brass families.",
    difficulty: 4,
    topic: "odd one out",
  },
  {
    stem: "Which word is the odd one out?",
    options: ["lava", "magma", "pumice", "obsidian", "limestone"],
    correctIndex: 4,
    explanation:
      "Limestone is a sedimentary rock. The other four are all volcanic in origin (igneous).",
    difficulty: 4,
    topic: "odd one out",
  },
  {
    stem: "Which word is the odd one out?",
    options: ["scissors", "trousers", "spectacles", "tongs", "umbrella"],
    correctIndex: 4,
    explanation:
      "An umbrella is always singular. The other four are all words that are typically used in the plural form (a pair of scissors, trousers, spectacles, tongs).",
    difficulty: 4,
    topic: "odd one out",
  },
  {
    stem: "Which word is the odd one out?",
    options: ["archipelago", "peninsula", "isthmus", "plateau", "island"],
    correctIndex: 3,
    explanation:
      "A plateau is a flat elevated area defined by height. The other four are all geographical terms defined by their relationship to water.",
    difficulty: 4,
    topic: "odd one out",
  },
  {
    stem: "Which word is the odd one out?",
    options: ["crimson", "scarlet", "vermilion", "burgundy", "cerulean"],
    correctIndex: 4,
    explanation:
      "Cerulean is a shade of blue. The other four are all shades of red.",
    difficulty: 4,
    topic: "odd one out",
  },
  {
    stem: "Which word is the odd one out?",
    options: ["otter", "beaver", "platypus", "swan", "hippopotamus"],
    correctIndex: 3,
    explanation:
      "A swan is a bird. The other four are all semi-aquatic mammals.",
    difficulty: 4,
    topic: "odd one out",
  },
  {
    stem: "Which word is the odd one out?",
    options: ["through", "thorough", "though", "thought", "tough"],
    correctIndex: 1,
    explanation:
      "Thorough has two syllables. The other four are all single-syllable words containing 'ough'.",
    difficulty: 4,
    topic: "odd one out",
  },
  {
    stem: "Which word is the odd one out?",
    options: ["compassion", "empathy", "sympathy", "kindness", "apathy"],
    correctIndex: 4,
    explanation:
      "Apathy means a lack of feeling or concern. The other four all describe caring about others' feelings.",
    difficulty: 4,
    topic: "odd one out",
  },
  {
    stem: "Which word is the odd one out?",
    options: ["canine", "incisor", "molar", "premolar", "tonsil"],
    correctIndex: 4,
    explanation:
      "A tonsil is soft tissue at the back of the throat. The other four are all types of teeth.",
    difficulty: 4,
    topic: "odd one out",
  },
  {
    stem: "Which word is the odd one out?",
    options: ["knight", "wreck", "hymn", "knack", "blank"],
    correctIndex: 4,
    explanation:
      "In 'blank', every letter is pronounced. The other four all contain a silent letter: knight (k), wreck (w), hymn (n), knack (k).",
    difficulty: 4,
    topic: "odd one out",
  },
  {
    stem: "Which word is the odd one out?",
    options: ["hibernate", "migrate", "estivate", "torpor", "nocturnal"],
    correctIndex: 4,
    explanation:
      "Nocturnal describes when an animal is active (at night). The other four all describe states of dormancy or seasonal movement to survive harsh conditions.",
    difficulty: 4,
    topic: "odd one out",
  },
  {
    stem: "Which word is the odd one out?",
    options: ["allegro", "adagio", "crescendo", "soprano", "forte"],
    correctIndex: 3,
    explanation:
      "Soprano describes a voice type. The other four are all musical terms for tempo or dynamics (speed or volume).",
    difficulty: 4,
    topic: "odd one out",
  },
  {
    stem: "Which word is the odd one out?",
    options: ["pharaoh", "emperor", "sultan", "ambassador", "monarch"],
    correctIndex: 3,
    explanation:
      "An ambassador is a diplomatic representative. The other four are all rulers or sovereigns.",
    difficulty: 4,
    topic: "odd one out",
  },
  {
    stem: "Which word is the odd one out?",
    options: ["oboe", "clarinet", "flute", "bassoon", "trumpet"],
    correctIndex: 4,
    explanation:
      "A trumpet is a brass instrument. The other four are all woodwind instruments.",
    difficulty: 4,
    topic: "odd one out",
  },
  {
    stem: "Which word is the odd one out?",
    options: ["aqueduct", "reservoir", "canal", "dam", "orchard"],
    correctIndex: 4,
    explanation:
      "An orchard is a place for growing fruit trees. The other four are all man-made structures related to water management.",
    difficulty: 4,
    topic: "odd one out",
  },
  {
    stem: "Which word is the odd one out?",
    options: ["cathedral", "mosque", "synagogue", "temple", "castle"],
    correctIndex: 4,
    explanation:
      "A castle is a fortified building for defence. The other four are all places of religious worship.",
    difficulty: 4,
    topic: "odd one out",
  },
  {
    stem: "Which word is the odd one out?",
    options: ["porcelain", "ceramic", "terracotta", "earthenware", "marble"],
    correctIndex: 4,
    explanation:
      "Marble is a natural stone. The other four are all types of fired clay pottery.",
    difficulty: 4,
    topic: "odd one out",
  },
  {
    stem: "Which word is the odd one out?",
    options: ["Saturn", "Jupiter", "Neptune", "Uranus", "Mars"],
    correctIndex: 4,
    explanation:
      "Mars is a rocky (terrestrial) planet. The other four are all gas giants or ice giants (the outer planets).",
    difficulty: 4,
    topic: "odd one out",
  },

  // ========== DIFFICULTY 5 (20 questions) ==========
  {
    stem: "Which word is the odd one out?",
    options: ["synonym", "antonym", "homophone", "homonym", "paradox"],
    correctIndex: 4,
    explanation:
      "A paradox is a statement that seems to contradict itself. The other four all describe words that share similarities in meaning, spelling or sound with other words.",
    difficulty: 5,
    topic: "odd one out",
  },
  {
    stem: "Which word is the odd one out?",
    options: ["sapphire", "turquoise", "aquamarine", "topaz", "lapis lazuli"],
    correctIndex: 3,
    explanation:
      "Topaz is typically golden or amber coloured. The other four are all blue gemstones.",
    difficulty: 5,
    topic: "odd one out",
  },
  {
    stem: "Which word is the odd one out?",
    options: ["photosynthesis", "respiration", "pollination", "germination", "evaporation"],
    correctIndex: 4,
    explanation:
      "Evaporation is a physical process involving water changing state. The other four are all biological processes in plants.",
    difficulty: 5,
    topic: "odd one out",
  },
  {
    stem: "Which word is the odd one out?",
    options: ["soliloquy", "monologue", "prologue", "dialogue", "epilogue"],
    correctIndex: 3,
    explanation:
      "A dialogue involves two or more speakers. The other four all involve a single speaker or a single passage (solo speech, introduction or conclusion).",
    difficulty: 5,
    topic: "odd one out",
  },
  {
    stem: "Which word is the odd one out?",
    options: ["benevolent", "compassionate", "altruistic", "magnanimous", "malevolent"],
    correctIndex: 4,
    explanation:
      "Malevolent means wishing harm to others. The other four all describe positive qualities of kindness and generosity.",
    difficulty: 5,
    topic: "odd one out",
  },
  {
    stem: "Which word is the odd one out?",
    options: ["meander", "delta", "tributary", "glacier", "estuary"],
    correctIndex: 3,
    explanation:
      "A glacier is a body of ice. The other four are all features specifically associated with rivers.",
    difficulty: 5,
    topic: "odd one out",
  },
  {
    stem: "Which word is the odd one out?",
    options: ["irony", "satire", "sarcasm", "simile", "parody"],
    correctIndex: 3,
    explanation:
      "A simile is a direct comparison using 'like' or 'as'. The other four all involve saying or presenting something in a way that conveys a different or mocking meaning.",
    difficulty: 5,
    topic: "odd one out",
  },
  {
    stem: "Which word is the odd one out?",
    options: ["clandestine", "covert", "furtive", "surreptitious", "overt"],
    correctIndex: 4,
    explanation:
      "Overt means done openly. The other four all mean done in secret.",
    difficulty: 5,
    topic: "odd one out",
  },
  {
    stem: "Which word is the odd one out?",
    options: ["iambic", "trochaic", "metric", "dactylic", "anapestic"],
    correctIndex: 2,
    explanation:
      "Metric relates to measurement systems. The other four are all types of poetic metre (rhythmic patterns in verse).",
    difficulty: 5,
    topic: "odd one out",
  },
  {
    stem: "Which word is the odd one out?",
    options: ["claustrophobia", "arachnophobia", "acrophobia", "euphoria", "agoraphobia"],
    correctIndex: 3,
    explanation:
      "Euphoria is a feeling of great happiness. The other four are all phobias (irrational fears).",
    difficulty: 5,
    topic: "odd one out",
  },
  {
    stem: "Which word is the odd one out?",
    options: ["sonata", "concerto", "symphony", "opera", "overture"],
    correctIndex: 3,
    explanation:
      "An opera includes singing and dramatic action on stage. The other four are all purely instrumental musical compositions.",
    difficulty: 5,
    topic: "odd one out",
  },
  {
    stem: "Which word is the odd one out?",
    options: ["herbivore", "omnivore", "carnivore", "insectivore", "predator"],
    correctIndex: 4,
    explanation:
      "Predator describes an animal's hunting behaviour. The other four all classify animals by what they eat (diet type ending in -vore).",
    difficulty: 5,
    topic: "odd one out",
  },
  {
    stem: "Which word is the odd one out?",
    options: ["igneous", "sedimentary", "metamorphic", "volcanic", "basalt"],
    correctIndex: 4,
    explanation:
      "Basalt is a specific type of rock. The other four are all adjectives that describe categories or origins of rocks.",
    difficulty: 5,
    topic: "odd one out",
  },
  {
    stem: "Which word is the odd one out?",
    options: ["archipelago", "peninsula", "isthmus", "continent", "atoll"],
    correctIndex: 3,
    explanation:
      "A continent is a massive landmass. The other four are all specific geographical formations defined by their relationship to surrounding water (group of islands, land jutting into sea, narrow land bridge, ring-shaped reef).",
    difficulty: 5,
    topic: "odd one out",
  },
  {
    stem: "Which word is the odd one out?",
    options: ["cacophony", "discord", "dissonance", "clamour", "harmony"],
    correctIndex: 4,
    explanation:
      "Harmony means a pleasing combination of sounds. The other four all describe harsh, unpleasant or clashing sounds.",
    difficulty: 5,
    topic: "odd one out",
  },
  {
    stem: "Which word is the odd one out?",
    options: ["longitude", "latitude", "altitude", "equator", "meridian"],
    correctIndex: 2,
    explanation:
      "Altitude measures height above sea level. The other four all relate to positions on the Earth's surface (horizontal positioning and reference lines).",
    difficulty: 5,
    topic: "odd one out",
  },
  {
    stem: "Which word is the odd one out?",
    options: ["piccolo", "flute", "recorder", "oboe", "fife"],
    correctIndex: 3,
    explanation:
      "An oboe uses a double reed to produce sound. The other four are all instruments where air is blown across or into a mouthpiece without a reed (they are all flute-family instruments).",
    difficulty: 5,
    topic: "odd one out",
  },
  {
    stem: "Which word is the odd one out?",
    options: ["azure", "cerulean", "cobalt", "indigo", "vermilion"],
    correctIndex: 4,
    explanation:
      "Vermilion is a shade of red. The other four are all shades of blue.",
    difficulty: 5,
    topic: "odd one out",
  },
  {
    stem: "Which word is the odd one out?",
    options: ["mitosis", "osmosis", "meiosis", "cytokinesis", "prophase"],
    correctIndex: 1,
    explanation:
      "Osmosis is the movement of water through a membrane. The other four are all stages or types of cell division.",
    difficulty: 5,
    topic: "odd one out",
  },
  {
    stem: "Which word is the odd one out?",
    options: ["allegory", "fable", "parable", "proverb", "memoir"],
    correctIndex: 4,
    explanation:
      "A memoir is a factual account of personal experiences. The other four all use storytelling or figurative language to convey a moral lesson.",
    difficulty: 5,
    topic: "odd one out",
  },
];
