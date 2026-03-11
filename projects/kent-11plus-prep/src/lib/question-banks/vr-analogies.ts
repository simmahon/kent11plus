import type { BankedQuestion } from "./types";

/**
 * 100 Word Relationship & Analogy questions for Kent 11+ Verbal Reasoning
 *
 * Relationship types rotated: opposites, part-to-whole, degree,
 * category, function, material
 *
 * Distribution:
 *   Difficulty 1: 10 | 2: 15 | 3: 25 | 4: 30 | 5: 20
 */
export const BANK: BankedQuestion[] = [
  // ========== DIFFICULTY 1 (10 questions) ==========
  {
    stem: "Hot is to cold as big is to ?",
    options: ["large", "huge", "small", "warm", "tall"],
    correctIndex: 2,
    explanation:
      "Hot and cold are opposites. The opposite of big is small.",
    difficulty: 1,
    topic: "word relationships and analogies",
  },
  {
    stem: "Dog is to puppy as cat is to ?",
    options: ["kitten", "cub", "pup", "foal", "calf"],
    correctIndex: 0,
    explanation:
      "A puppy is a baby dog. A kitten is a baby cat.",
    difficulty: 1,
    topic: "word relationships and analogies",
  },
  {
    stem: "Pen is to write as scissors is to ?",
    options: ["paper", "sharp", "cut", "draw", "glue"],
    correctIndex: 2,
    explanation:
      "A pen is used to write. Scissors are used to cut.",
    difficulty: 1,
    topic: "word relationships and analogies",
  },
  {
    stem: "Wheel is to car as wing is to ?",
    options: ["bird", "sky", "feather", "fly", "nest"],
    correctIndex: 0,
    explanation:
      "A wheel is part of a car. A wing is part of a bird.",
    difficulty: 1,
    topic: "word relationships and analogies",
  },
  {
    stem: "Robin is to bird as salmon is to ?",
    options: ["water", "swim", "fish", "river", "food"],
    correctIndex: 2,
    explanation:
      "A robin is a type of bird. A salmon is a type of fish.",
    difficulty: 1,
    topic: "word relationships and analogies",
  },
  {
    stem: "Up is to down as left is to ?",
    options: ["side", "right", "wrong", "away", "straight"],
    correctIndex: 1,
    explanation:
      "Up and down are opposites. Left and right are opposites.",
    difficulty: 1,
    topic: "word relationships and analogies",
  },
  {
    stem: "Oven is to bake as fridge is to ?",
    options: ["cool", "food", "kitchen", "door", "ice"],
    correctIndex: 0,
    explanation:
      "An oven is used to bake. A fridge is used to cool things.",
    difficulty: 1,
    topic: "word relationships and analogies",
  },
  {
    stem: "Hand is to glove as foot is to ?",
    options: ["leg", "toe", "shoe", "walk", "ankle"],
    correctIndex: 2,
    explanation:
      "A glove covers a hand. A shoe covers a foot.",
    difficulty: 1,
    topic: "word relationships and analogies",
  },
  {
    stem: "Warm is to hot as cool is to ?",
    options: ["cold", "warm", "ice", "freezing", "mild"],
    correctIndex: 0,
    explanation:
      "Warm is a lesser degree of hot. Cool is a lesser degree of cold.",
    difficulty: 1,
    topic: "word relationships and analogies",
  },
  {
    stem: "Cow is to milk as hen is to ?",
    options: ["chick", "egg", "feather", "farm", "rooster"],
    correctIndex: 1,
    explanation:
      "A cow produces milk. A hen produces eggs.",
    difficulty: 1,
    topic: "word relationships and analogies",
  },

  // ========== DIFFICULTY 2 (15 questions) ==========
  {
    stem: "Bark is to tree as skin is to ?",
    options: ["bone", "body", "face", "soft", "hair"],
    correctIndex: 1,
    explanation:
      "Bark is the outer covering of a tree. Skin is the outer covering of a body.",
    difficulty: 2,
    topic: "word relationships and analogies",
  },
  {
    stem: "Painter is to brush as writer is to ?",
    options: ["book", "pen", "paper", "story", "ink"],
    correctIndex: 1,
    explanation:
      "A painter uses a brush as their tool. A writer uses a pen as their tool.",
    difficulty: 2,
    topic: "word relationships and analogies",
  },
  {
    stem: "Petal is to flower as page is to ?",
    options: ["read", "word", "book", "paper", "library"],
    correctIndex: 2,
    explanation:
      "A petal is part of a flower. A page is part of a book.",
    difficulty: 2,
    topic: "word relationships and analogies",
  },
  {
    stem: "Happy is to sad as brave is to ?",
    options: ["bold", "strong", "cowardly", "angry", "fierce"],
    correctIndex: 2,
    explanation:
      "Happy and sad are opposites. Brave and cowardly are opposites.",
    difficulty: 2,
    topic: "word relationships and analogies",
  },
  {
    stem: "Wool is to sheep as leather is to ?",
    options: ["shoe", "cow", "belt", "brown", "soft"],
    correctIndex: 1,
    explanation:
      "Wool comes from sheep. Leather comes from cows.",
    difficulty: 2,
    topic: "word relationships and analogies",
  },
  {
    stem: "Lion is to pride as wolf is to ?",
    options: ["den", "pack", "howl", "forest", "fur"],
    correctIndex: 1,
    explanation:
      "A group of lions is called a pride. A group of wolves is called a pack.",
    difficulty: 2,
    topic: "word relationships and analogies",
  },
  {
    stem: "Eye is to see as ear is to ?",
    options: ["sound", "hear", "nose", "loud", "head"],
    correctIndex: 1,
    explanation:
      "The eye is used to see. The ear is used to hear.",
    difficulty: 2,
    topic: "word relationships and analogies",
  },
  {
    stem: "Apple is to fruit as carrot is to ?",
    options: ["orange", "food", "vegetable", "garden", "root"],
    correctIndex: 2,
    explanation:
      "An apple is a type of fruit. A carrot is a type of vegetable.",
    difficulty: 2,
    topic: "word relationships and analogies",
  },
  {
    stem: "Chapter is to book as scene is to ?",
    options: ["actor", "stage", "play", "film", "curtain"],
    correctIndex: 2,
    explanation:
      "A chapter is a section of a book. A scene is a section of a play.",
    difficulty: 2,
    topic: "word relationships and analogies",
  },
  {
    stem: "Drizzle is to downpour as breeze is to ?",
    options: ["wind", "gale", "air", "cool", "cloud"],
    correctIndex: 1,
    explanation:
      "A drizzle is a mild version of a downpour. A breeze is a mild version of a gale.",
    difficulty: 2,
    topic: "word relationships and analogies",
  },
  {
    stem: "Hammer is to nail as screwdriver is to ?",
    options: ["screw", "bolt", "tool", "metal", "drill"],
    correctIndex: 0,
    explanation:
      "A hammer is used on a nail. A screwdriver is used on a screw.",
    difficulty: 2,
    topic: "word relationships and analogies",
  },
  {
    stem: "Boat is to water as plane is to ?",
    options: ["sky", "airport", "pilot", "wing", "cloud"],
    correctIndex: 0,
    explanation:
      "A boat travels on water. A plane travels through the sky.",
    difficulty: 2,
    topic: "word relationships and analogies",
  },
  {
    stem: "Key is to lock as password is to ?",
    options: ["computer", "secret", "account", "letter", "door"],
    correctIndex: 2,
    explanation:
      "A key opens a lock. A password opens an account.",
    difficulty: 2,
    topic: "word relationships and analogies",
  },
  {
    stem: "Tall is to short as wide is to ?",
    options: ["long", "narrow", "thin", "small", "flat"],
    correctIndex: 1,
    explanation:
      "Tall and short are opposites. Wide and narrow are opposites.",
    difficulty: 2,
    topic: "word relationships and analogies",
  },
  {
    stem: "Cub is to bear as joey is to ?",
    options: ["deer", "kangaroo", "rabbit", "monkey", "fox"],
    correctIndex: 1,
    explanation:
      "A cub is a baby bear. A joey is a baby kangaroo.",
    difficulty: 2,
    topic: "word relationships and analogies",
  },

  // ========== DIFFICULTY 3 (25 questions) ==========
  {
    stem: "Author is to novel as composer is to ?",
    options: ["music", "symphony", "instrument", "orchestra", "piano"],
    correctIndex: 1,
    explanation:
      "An author creates a novel. A composer creates a symphony.",
    difficulty: 3,
    topic: "word relationships and analogies",
  },
  {
    stem: "Caterpillar is to butterfly as tadpole is to ?",
    options: ["fish", "pond", "frog", "toad", "newt"],
    correctIndex: 2,
    explanation:
      "A caterpillar transforms into a butterfly. A tadpole transforms into a frog.",
    difficulty: 3,
    topic: "word relationships and analogies",
  },
  {
    stem: "Silk is to silkworm as honey is to ?",
    options: ["flower", "bee", "hive", "sweet", "jar"],
    correctIndex: 1,
    explanation:
      "Silk is produced by silkworms. Honey is produced by bees.",
    difficulty: 3,
    topic: "word relationships and analogies",
  },
  {
    stem: "Telescope is to stars as microscope is to ?",
    options: ["laboratory", "glass", "cells", "science", "lens"],
    correctIndex: 2,
    explanation:
      "A telescope is used to view stars. A microscope is used to view cells.",
    difficulty: 3,
    topic: "word relationships and analogies",
  },
  {
    stem: "Cautious is to reckless as generous is to ?",
    options: ["kind", "wealthy", "stingy", "polite", "careful"],
    correctIndex: 2,
    explanation:
      "Cautious and reckless are opposites. Generous and stingy are opposites.",
    difficulty: 3,
    topic: "word relationships and analogies",
  },
  {
    stem: "Captain is to ship as pilot is to ?",
    options: ["sky", "airport", "aircraft", "flight", "uniform"],
    correctIndex: 2,
    explanation:
      "A captain commands a ship. A pilot commands an aircraft.",
    difficulty: 3,
    topic: "word relationships and analogies",
  },
  {
    stem: "Yawn is to tired as shiver is to ?",
    options: ["scared", "cold", "sick", "wet", "nervous"],
    correctIndex: 1,
    explanation:
      "Yawning is a response to being tired. Shivering is a response to being cold.",
    difficulty: 3,
    topic: "word relationships and analogies",
  },
  {
    stem: "Atlas is to maps as dictionary is to ?",
    options: ["pages", "words", "library", "spelling", "books"],
    correctIndex: 1,
    explanation:
      "An atlas is a collection of maps. A dictionary is a collection of words and their meanings.",
    difficulty: 3,
    topic: "word relationships and analogies",
  },
  {
    stem: "Stanza is to poem as verse is to ?",
    options: ["song", "music", "choir", "rhyme", "lyrics"],
    correctIndex: 0,
    explanation:
      "A stanza is a section of a poem. A verse is a section of a song.",
    difficulty: 3,
    topic: "word relationships and analogies",
  },
  {
    stem: "Murmur is to shout as trickle is to ?",
    options: ["drip", "stream", "flood", "pour", "flow"],
    correctIndex: 2,
    explanation:
      "A murmur is a quiet sound while a shout is a loud sound. A trickle is a small flow while a flood is a huge flow. This is a relationship of degree.",
    difficulty: 3,
    topic: "word relationships and analogies",
  },
  {
    stem: "Archipelago is to islands as constellation is to ?",
    options: ["sky", "planets", "stars", "galaxy", "telescope"],
    correctIndex: 2,
    explanation:
      "An archipelago is a group of islands. A constellation is a group of stars.",
    difficulty: 3,
    topic: "word relationships and analogies",
  },
  {
    stem: "Kiln is to pottery as forge is to ?",
    options: ["fire", "metal", "hammer", "anvil", "heat"],
    correctIndex: 1,
    explanation:
      "A kiln is used to fire pottery. A forge is used to shape metal.",
    difficulty: 3,
    topic: "word relationships and analogies",
  },
  {
    stem: "Conductor is to orchestra as director is to ?",
    options: ["film", "office", "meeting", "company", "stage"],
    correctIndex: 0,
    explanation:
      "A conductor leads an orchestra. A director leads a film production.",
    difficulty: 3,
    topic: "word relationships and analogies",
  },
  {
    stem: "Skeleton is to body as frame is to ?",
    options: ["picture", "building", "wall", "door", "window"],
    correctIndex: 1,
    explanation:
      "A skeleton is the internal support of a body. A frame is the internal support of a building.",
    difficulty: 3,
    topic: "word relationships and analogies",
  },
  {
    stem: "Cotton is to plant as pearl is to ?",
    options: ["necklace", "jewel", "oyster", "sand", "sea"],
    correctIndex: 2,
    explanation:
      "Cotton comes from a plant. A pearl comes from an oyster.",
    difficulty: 3,
    topic: "word relationships and analogies",
  },
  {
    stem: "Angry is to furious as pleased is to ?",
    options: ["happy", "delighted", "satisfied", "cheerful", "content"],
    correctIndex: 1,
    explanation:
      "Furious is a stronger degree of angry. Delighted is a stronger degree of pleased.",
    difficulty: 3,
    topic: "word relationships and analogies",
  },
  {
    stem: "Map is to navigator as recipe is to ?",
    options: ["food", "kitchen", "chef", "oven", "ingredient"],
    correctIndex: 2,
    explanation:
      "A map guides a navigator. A recipe guides a chef.",
    difficulty: 3,
    topic: "word relationships and analogies",
  },
  {
    stem: "Fin is to fish as propeller is to ?",
    options: ["boat", "wind", "engine", "water", "speed"],
    correctIndex: 0,
    explanation:
      "A fin propels a fish through water. A propeller propels a boat through water.",
    difficulty: 3,
    topic: "word relationships and analogies",
  },
  {
    stem: "Pupil is to school as patient is to ?",
    options: ["doctor", "medicine", "hospital", "illness", "nurse"],
    correctIndex: 2,
    explanation:
      "A pupil attends a school. A patient attends a hospital.",
    difficulty: 3,
    topic: "word relationships and analogies",
  },
  {
    stem: "Feather is to bird as scale is to ?",
    options: ["weight", "fish", "music", "balance", "snake"],
    correctIndex: 1,
    explanation:
      "A feather covers a bird. A scale covers a fish.",
    difficulty: 3,
    topic: "word relationships and analogies",
  },
  {
    stem: "Talon is to eagle as claw is to ?",
    options: ["nail", "lion", "hand", "foot", "tooth"],
    correctIndex: 1,
    explanation:
      "A talon is the sharp nail of an eagle. A claw is the sharp nail of a lion.",
    difficulty: 3,
    topic: "word relationships and analogies",
  },
  {
    stem: "Clock is to time as thermometer is to ?",
    options: ["heat", "temperature", "weather", "mercury", "degree"],
    correctIndex: 1,
    explanation:
      "A clock measures time. A thermometer measures temperature.",
    difficulty: 3,
    topic: "word relationships and analogies",
  },
  {
    stem: "Canvas is to painter as clay is to ?",
    options: ["pottery", "sculptor", "earth", "wet", "kiln"],
    correctIndex: 1,
    explanation:
      "A painter works with canvas. A sculptor works with clay.",
    difficulty: 3,
    topic: "word relationships and analogies",
  },
  {
    stem: "Dormant is to active as stationary is to ?",
    options: ["still", "fixed", "moving", "parked", "quiet"],
    correctIndex: 2,
    explanation:
      "Dormant and active are opposites. Stationary and moving are opposites.",
    difficulty: 3,
    topic: "word relationships and analogies",
  },
  {
    stem: "Calf is to cow as lamb is to ?",
    options: ["farm", "wool", "sheep", "goat", "field"],
    correctIndex: 2,
    explanation:
      "A calf is the young of a cow. A lamb is the young of a sheep.",
    difficulty: 3,
    topic: "word relationships and analogies",
  },

  // ========== DIFFICULTY 4 (30 questions) ==========
  {
    stem: "Surgeon is to scalpel as carpenter is to ?",
    options: ["wood", "chisel", "nail", "bench", "plank"],
    correctIndex: 1,
    explanation:
      "A surgeon uses a scalpel as a precision cutting tool. A carpenter uses a chisel as a precision cutting tool.",
    difficulty: 4,
    topic: "word relationships and analogies",
  },
  {
    stem: "Opaque is to transparent as rigid is to ?",
    options: ["stiff", "hard", "flexible", "brittle", "solid"],
    correctIndex: 2,
    explanation:
      "Opaque and transparent are opposites. Rigid and flexible are opposites.",
    difficulty: 4,
    topic: "word relationships and analogies",
  },
  {
    stem: "Nocturnal is to owl as diurnal is to ?",
    options: ["bat", "eagle", "moth", "fox", "badger"],
    correctIndex: 1,
    explanation:
      "An owl is a nocturnal animal (active at night). An eagle is a diurnal animal (active during the day).",
    difficulty: 4,
    topic: "word relationships and analogies",
  },
  {
    stem: "Drought is to rain as famine is to ?",
    options: ["hunger", "crops", "food", "water", "poverty"],
    correctIndex: 2,
    explanation:
      "A drought is a shortage of rain. A famine is a shortage of food.",
    difficulty: 4,
    topic: "word relationships and analogies",
  },
  {
    stem: "Annoyance is to rage as concern is to ?",
    options: ["worry", "panic", "fear", "sadness", "stress"],
    correctIndex: 1,
    explanation:
      "Rage is an extreme form of annoyance. Panic is an extreme form of concern.",
    difficulty: 4,
    topic: "word relationships and analogies",
  },
  {
    stem: "Orchestra is to musician as troupe is to ?",
    options: ["singer", "dancer", "actor", "performer", "artist"],
    correctIndex: 2,
    explanation:
      "An orchestra is a group of musicians. A troupe is a group of actors or performers, but specifically actors form a troupe.",
    difficulty: 4,
    topic: "word relationships and analogies",
  },
  {
    stem: "Lava is to volcano as ash is to ?",
    options: ["tree", "fire", "smoke", "coal", "chimney"],
    correctIndex: 1,
    explanation:
      "Lava is produced by a volcano. Ash is produced by a fire.",
    difficulty: 4,
    topic: "word relationships and analogies",
  },
  {
    stem: "Herbivore is to plants as carnivore is to ?",
    options: ["animals", "meat", "hunting", "teeth", "jungle"],
    correctIndex: 1,
    explanation:
      "A herbivore eats plants. A carnivore eats meat.",
    difficulty: 4,
    topic: "word relationships and analogies",
  },
  {
    stem: "Cocoon is to moth as chrysalis is to ?",
    options: ["caterpillar", "butterfly", "silkworm", "beetle", "larva"],
    correctIndex: 1,
    explanation:
      "A cocoon is the protective casing for a moth during metamorphosis. A chrysalis is the protective casing for a butterfly.",
    difficulty: 4,
    topic: "word relationships and analogies",
  },
  {
    stem: "Peninsula is to land as bay is to ?",
    options: ["beach", "coast", "water", "harbour", "cliff"],
    correctIndex: 2,
    explanation:
      "A peninsula is land that juts into water. A bay is water that juts into land.",
    difficulty: 4,
    topic: "word relationships and analogies",
  },
  {
    stem: "Flock is to birds as shoal is to ?",
    options: ["fish", "whales", "boats", "rocks", "water"],
    correctIndex: 0,
    explanation:
      "A flock is a group of birds. A shoal is a group of fish.",
    difficulty: 4,
    topic: "word relationships and analogies",
  },
  {
    stem: "Chronometer is to time as barometer is to ?",
    options: ["temperature", "wind", "pressure", "weather", "altitude"],
    correctIndex: 2,
    explanation:
      "A chronometer precisely measures time. A barometer measures atmospheric pressure.",
    difficulty: 4,
    topic: "word relationships and analogies",
  },
  {
    stem: "Prologue is to epilogue as dawn is to ?",
    options: ["morning", "evening", "dusk", "night", "noon"],
    correctIndex: 2,
    explanation:
      "A prologue comes at the beginning and an epilogue at the end. Dawn comes at the beginning of the day and dusk at the end.",
    difficulty: 4,
    topic: "word relationships and analogies",
  },
  {
    stem: "Arid is to desert as fertile is to ?",
    options: ["field", "farmland", "garden", "forest", "meadow"],
    correctIndex: 1,
    explanation:
      "Arid describes a desert's dryness. Fertile describes farmland's ability to grow crops.",
    difficulty: 4,
    topic: "word relationships and analogies",
  },
  {
    stem: "Palette is to artist as keyboard is to ?",
    options: ["computer", "pianist", "screen", "music", "office"],
    correctIndex: 1,
    explanation:
      "A palette is the tool an artist uses for their craft. A keyboard is the tool a pianist uses for their craft.",
    difficulty: 4,
    topic: "word relationships and analogies",
  },
  {
    stem: "Stalactite is to ceiling as stalagmite is to ?",
    options: ["wall", "floor", "cave", "rock", "water"],
    correctIndex: 1,
    explanation:
      "A stalactite hangs from the ceiling of a cave. A stalagmite rises from the floor.",
    difficulty: 4,
    topic: "word relationships and analogies",
  },
  {
    stem: "Monarchy is to king as democracy is to ?",
    options: ["president", "people", "parliament", "vote", "freedom"],
    correctIndex: 1,
    explanation:
      "In a monarchy, power rests with the king. In a democracy, power rests with the people.",
    difficulty: 4,
    topic: "word relationships and analogies",
  },
  {
    stem: "Glossary is to terms as index is to ?",
    options: ["pages", "topics", "books", "chapters", "words"],
    correctIndex: 1,
    explanation:
      "A glossary is a list of terms with definitions. An index is a list of topics with page references.",
    difficulty: 4,
    topic: "word relationships and analogies",
  },
  {
    stem: "Timbre is to sound as hue is to ?",
    options: ["paint", "light", "colour", "shade", "tone"],
    correctIndex: 2,
    explanation:
      "Timbre is the distinctive quality of a sound. Hue is the distinctive quality of a colour.",
    difficulty: 4,
    topic: "word relationships and analogies",
  },
  {
    stem: "Hibernate is to bear as migrate is to ?",
    options: ["fish", "swallow", "rabbit", "deer", "frog"],
    correctIndex: 1,
    explanation:
      "Bears hibernate in winter. Swallows migrate in winter.",
    difficulty: 4,
    topic: "word relationships and analogies",
  },
  {
    stem: "Tributary is to river as branch is to ?",
    options: ["leaf", "root", "trunk", "tree", "twig"],
    correctIndex: 2,
    explanation:
      "A tributary feeds into a river. A branch extends from a trunk.",
    difficulty: 4,
    topic: "word relationships and analogies",
  },
  {
    stem: "Deciduous is to oak as evergreen is to ?",
    options: ["birch", "elm", "pine", "beech", "maple"],
    correctIndex: 2,
    explanation:
      "An oak is a deciduous tree (loses leaves). A pine is an evergreen tree (keeps leaves year-round).",
    difficulty: 4,
    topic: "word relationships and analogies",
  },
  {
    stem: "Manuscript is to author as blueprint is to ?",
    options: ["builder", "architect", "engineer", "designer", "planner"],
    correctIndex: 1,
    explanation:
      "A manuscript is created by an author. A blueprint is created by an architect.",
    difficulty: 4,
    topic: "word relationships and analogies",
  },
  {
    stem: "Pestle is to mortar as bow is to ?",
    options: ["arrow", "string", "target", "violin", "hunt"],
    correctIndex: 0,
    explanation:
      "A pestle is used together with a mortar as a pair. A bow is used together with an arrow as a pair.",
    difficulty: 4,
    topic: "word relationships and analogies",
  },
  {
    stem: "Stethoscope is to doctor as gavel is to ?",
    options: ["carpenter", "judge", "auctioneer", "builder", "teacher"],
    correctIndex: 1,
    explanation:
      "A stethoscope is a tool associated with a doctor. A gavel is a tool associated with a judge.",
    difficulty: 4,
    topic: "word relationships and analogies",
  },
  {
    stem: "Ore is to metal as wheat is to ?",
    options: ["bread", "flour", "field", "cereal", "grain"],
    correctIndex: 1,
    explanation:
      "Ore is processed to make metal. Wheat is processed to make flour.",
    difficulty: 4,
    topic: "word relationships and analogies",
  },
  {
    stem: "Cumulus is to cloud as sonnet is to ?",
    options: ["poem", "song", "rhyme", "verse", "stanza"],
    correctIndex: 0,
    explanation:
      "Cumulus is a type of cloud. A sonnet is a type of poem.",
    difficulty: 4,
    topic: "word relationships and analogies",
  },
  {
    stem: "Trowel is to gardener as ladle is to ?",
    options: ["waiter", "cook", "baker", "butler", "chef"],
    correctIndex: 1,
    explanation:
      "A trowel is a tool used by a gardener. A ladle is a tool used by a cook.",
    difficulty: 4,
    topic: "word relationships and analogies",
  },
  {
    stem: "Larva is to insect as embryo is to ?",
    options: ["egg", "baby", "mammal", "cell", "womb"],
    correctIndex: 2,
    explanation:
      "A larva is an early life stage of an insect. An embryo is an early life stage of a mammal.",
    difficulty: 4,
    topic: "word relationships and analogies",
  },
  {
    stem: "Oasis is to desert as island is to ?",
    options: ["beach", "sea", "land", "palm", "coast"],
    correctIndex: 1,
    explanation:
      "An oasis is an area of water surrounded by desert. An island is an area of land surrounded by sea.",
    difficulty: 4,
    topic: "word relationships and analogies",
  },

  // ========== DIFFICULTY 5 (20 questions) ==========
  {
    stem: "Seismograph is to earthquake as anemometer is to ?",
    options: ["rain", "temperature", "wind", "pressure", "humidity"],
    correctIndex: 2,
    explanation:
      "A seismograph measures earthquakes. An anemometer measures wind speed.",
    difficulty: 5,
    topic: "word relationships and analogies",
  },
  {
    stem: "Bibliophile is to books as audiophile is to ?",
    options: ["music", "sound", "radio", "speakers", "singing"],
    correctIndex: 1,
    explanation:
      "A bibliophile loves books. An audiophile loves high-quality sound.",
    difficulty: 5,
    topic: "word relationships and analogies",
  },
  {
    stem: "Parched is to thirsty as famished is to ?",
    options: ["tired", "ill", "hungry", "weak", "faint"],
    correctIndex: 2,
    explanation:
      "Parched is an extreme form of thirsty. Famished is an extreme form of hungry.",
    difficulty: 5,
    topic: "word relationships and analogies",
  },
  {
    stem: "Archipelago is to island as range is to ?",
    options: ["field", "mountain", "valley", "hill", "plateau"],
    correctIndex: 1,
    explanation:
      "An archipelago is a chain of islands. A range is a chain of mountains.",
    difficulty: 5,
    topic: "word relationships and analogies",
  },
  {
    stem: "Calligraphy is to writing as choreography is to ?",
    options: ["singing", "music", "dance", "acting", "painting"],
    correctIndex: 2,
    explanation:
      "Calligraphy is the art of beautiful writing. Choreography is the art of designing dance.",
    difficulty: 5,
    topic: "word relationships and analogies",
  },
  {
    stem: "Verdant is to green as azure is to ?",
    options: ["red", "white", "blue", "gold", "purple"],
    correctIndex: 2,
    explanation:
      "Verdant means lush and green. Azure means bright blue.",
    difficulty: 5,
    topic: "word relationships and analogies",
  },
  {
    stem: "Olfactory is to smell as auditory is to ?",
    options: ["taste", "touch", "hearing", "sight", "speech"],
    correctIndex: 2,
    explanation:
      "Olfactory relates to the sense of smell. Auditory relates to the sense of hearing.",
    difficulty: 5,
    topic: "word relationships and analogies",
  },
  {
    stem: "Eulogy is to praise as elegy is to ?",
    options: ["joy", "anger", "grief", "love", "hope"],
    correctIndex: 2,
    explanation:
      "A eulogy is a speech of praise. An elegy is a poem expressing grief or sorrow.",
    difficulty: 5,
    topic: "word relationships and analogies",
  },
  {
    stem: "Topography is to land as cartography is to ?",
    options: ["charts", "maps", "seas", "stars", "drawings"],
    correctIndex: 1,
    explanation:
      "Topography is the study of the shape of land. Cartography is the science of making maps.",
    difficulty: 5,
    topic: "word relationships and analogies",
  },
  {
    stem: "Frugal is to spending as taciturn is to ?",
    options: ["reading", "thinking", "speaking", "listening", "writing"],
    correctIndex: 2,
    explanation:
      "Frugal means restrained in spending. Taciturn means restrained in speaking.",
    difficulty: 5,
    topic: "word relationships and analogies",
  },
  {
    stem: "Predator is to prey as creditor is to ?",
    options: ["banker", "debtor", "customer", "merchant", "borrower"],
    correctIndex: 1,
    explanation:
      "A predator pursues prey. A creditor is owed by a debtor. They are paired opposites.",
    difficulty: 5,
    topic: "word relationships and analogies",
  },
  {
    stem: "Panacea is to illness as utopia is to ?",
    options: ["heaven", "society", "dream", "peace", "paradise"],
    correctIndex: 1,
    explanation:
      "A panacea is an imagined cure for all illness. A utopia is an imagined perfect society.",
    difficulty: 5,
    topic: "word relationships and analogies",
  },
  {
    stem: "Soliloquy is to one as dialogue is to ?",
    options: ["three", "two", "many", "group", "audience"],
    correctIndex: 1,
    explanation:
      "A soliloquy is speech by one person. A dialogue is speech between two people.",
    difficulty: 5,
    topic: "word relationships and analogies",
  },
  {
    stem: "Equine is to horse as bovine is to ?",
    options: ["sheep", "pig", "cow", "goat", "deer"],
    correctIndex: 2,
    explanation:
      "Equine means relating to horses. Bovine means relating to cows.",
    difficulty: 5,
    topic: "word relationships and analogies",
  },
  {
    stem: "Cytology is to cells as ornithology is to ?",
    options: ["plants", "insects", "birds", "rocks", "fish"],
    correctIndex: 2,
    explanation:
      "Cytology is the study of cells. Ornithology is the study of birds.",
    difficulty: 5,
    topic: "word relationships and analogies",
  },
  {
    stem: "Benign is to malignant as virtue is to ?",
    options: ["goodness", "sin", "vice", "evil", "moral"],
    correctIndex: 2,
    explanation:
      "Benign and malignant are opposites. Virtue and vice are opposites.",
    difficulty: 5,
    topic: "word relationships and analogies",
  },
  {
    stem: "Sextant is to navigator as theodolite is to ?",
    options: ["astronomer", "engineer", "surveyor", "cartographer", "geologist"],
    correctIndex: 2,
    explanation:
      "A sextant is a measuring instrument used by a navigator. A theodolite is a measuring instrument used by a surveyor.",
    difficulty: 5,
    topic: "word relationships and analogies",
  },
  {
    stem: "Tannin is to tea as caffeine is to ?",
    options: ["sugar", "coffee", "milk", "chocolate", "water"],
    correctIndex: 1,
    explanation:
      "Tannin is a key chemical compound found in tea. Caffeine is a key chemical compound found in coffee.",
    difficulty: 5,
    topic: "word relationships and analogies",
  },
  {
    stem: "Philanthropist is to charity as misanthrope is to ?",
    options: ["generosity", "kindness", "hostility", "sadness", "loneliness"],
    correctIndex: 2,
    explanation:
      "A philanthropist shows charity towards people. A misanthrope shows hostility towards people.",
    difficulty: 5,
    topic: "word relationships and analogies",
  },
  {
    stem: "Sonorous is to sound as luminous is to ?",
    options: ["colour", "light", "heat", "shine", "glow"],
    correctIndex: 1,
    explanation:
      "Sonorous means producing a rich, full sound. Luminous means giving off light.",
    difficulty: 5,
    topic: "word relationships and analogies",
  },
];
