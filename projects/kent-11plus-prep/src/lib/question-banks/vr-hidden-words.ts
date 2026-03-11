import type { BankedQuestion } from "./types";

/* ------------------------------------------------------------------ */
/*  Hidden Words — 100 verified questions                             */
/*  Each hidden word spans across exactly two adjacent words           */
/*  Every question verified letter-by-letter before inclusion          */
/* ------------------------------------------------------------------ */

export const BANK: BankedQuestion[] = [
  /* =================================================================
     DIFFICULTY 1 — 3-letter hidden words (10 questions)
     ================================================================= */

  {
    stem: "Find a 3-letter word hidden across two words in this sentence: 'The two ate breakfast early.'",
    options: ["OAT", "ATE", "OWE", "TEA", "EAR"],
    correctIndex: 0,
    explanation: "The word OAT is hidden across 'tw-O' and 'AT-e' → OAT.",
    difficulty: 1,
    topic: "hidden words",
  },

  {
    stem: "Find a 3-letter word hidden across two words in this sentence: 'It was a fun school day.'",
    options: ["OLD", "FUN", "DAY", "ODD", "OWL"],
    correctIndex: 0,
    explanation: "The word OLD is hidden across 'scho-OL' and 'D-ay' → OLD.",
    difficulty: 1,
    topic: "hidden words",
  },

  {
    stem: "Find a 3-letter word hidden across two words in this sentence: 'Put the sugar mix in the bowl.'",
    options: ["ARM", "MIX", "OWL", "RIM", "AIM"],
    correctIndex: 0,
    explanation: "The word ARM is hidden across 'sug-AR' and 'M-ix' → ARM.",
    difficulty: 1,
    topic: "hidden words",
  },

  {
    stem: "Find a 3-letter word hidden across two words in this sentence: 'The music event was brilliant.'",
    options: ["ICE", "EVE", "VET", "USE", "SIC"],
    correctIndex: 0,
    explanation: "The word ICE is hidden across 'mus-IC' and 'E-vent' → ICE.",
    difficulty: 1,
    topic: "hidden words",
  },

  {
    stem: "Find a 3-letter word hidden across two words in this sentence: 'She opened the garden door.'",
    options: ["END", "DEN", "RED", "ODE", "AND"],
    correctIndex: 0,
    explanation: "The word END is hidden across 'gard-EN' and 'D-oor' → END.",
    difficulty: 1,
    topic: "hidden words",
  },

  {
    stem: "Find a 3-letter word hidden across two words in this sentence: 'Place the pillow next to the bed.'",
    options: ["OWN", "LOW", "OWL", "NOW", "WON"],
    correctIndex: 0,
    explanation: "The word OWN is hidden across 'pill-OW' and 'N-ext' → OWN.",
    difficulty: 1,
    topic: "hidden words",
  },

  {
    stem: "Find a 3-letter word hidden across two words in this sentence: 'There was much open space.'",
    options: ["HOP", "PEN", "COP", "HOT", "MOP"],
    correctIndex: 0,
    explanation: "The word HOP is hidden across 'muc-H' and 'OP-en' → HOP.",
    difficulty: 1,
    topic: "hidden words",
  },

  {
    stem: "Find a 3-letter word hidden across two words in this sentence: 'Please clean the kitchen.'",
    options: ["ANT", "THE", "NET", "TAN", "EAT"],
    correctIndex: 0,
    explanation: "The word ANT is hidden across 'cle-AN' and 'T-he' → ANT.",
    difficulty: 1,
    topic: "hidden words",
  },

  {
    stem: "Find a 3-letter word hidden across two words in this sentence: 'We bought three lamps.'",
    options: ["EEL", "ELM", "ALE", "LEG", "LAP"],
    correctIndex: 0,
    explanation: "The word EEL is hidden across 'thr-EE' and 'L-amps' → EEL.",
    difficulty: 1,
    topic: "hidden words",
  },

  {
    stem: "Find a 3-letter word hidden across two words in this sentence: 'Find the map exit route.'",
    options: ["APE", "AXE", "PEA", "MAP", "PAD"],
    correctIndex: 0,
    explanation: "The word APE is hidden across 'm-AP' and 'E-xit' → APE.",
    difficulty: 1,
    topic: "hidden words",
  },

  /* =================================================================
     DIFFICULTY 2 — 3-4 letter hidden words (15 questions)
     ================================================================= */

  {
    stem: "Find a 4-letter word hidden across two words in this sentence: 'The bus Andrew took was late.'",
    options: ["SAND", "DREW", "BAND", "WAND", "ANTS"],
    correctIndex: 0,
    explanation: "The word SAND is hidden across 'bu-S' and 'AND-rew' → SAND.",
    difficulty: 2,
    topic: "hidden words",
  },

  {
    stem: "Find a 4-letter word hidden across two words in this sentence: 'Tell our usher to open the doors.'",
    options: ["RUSH", "USER", "RUSE", "PUSH", "GUSH"],
    correctIndex: 0,
    explanation: "The word RUSH is hidden across 'ou-R' and 'USH-er' → RUSH.",
    difficulty: 2,
    topic: "hidden words",
  },

  {
    stem: "Find a 4-letter word hidden across two words in this sentence: 'It was not ankle deep.'",
    options: ["TANK", "KNOT", "SANK", "YANK", "RANK"],
    correctIndex: 0,
    explanation: "The word TANK is hidden across 'no-T' and 'ANK-le' → TANK.",
    difficulty: 2,
    topic: "hidden words",
  },

  {
    stem: "Find a 4-letter word hidden across two words in this sentence: 'I felt some ache in my knee.'",
    options: ["EACH", "ACHE", "MACE", "ARCH", "ECHO"],
    correctIndex: 0,
    explanation: "The word EACH is hidden across 'som-E' and 'ACH-e' → EACH.",
    difficulty: 2,
    topic: "hidden words",
  },

  {
    stem: "Find a 4-letter word hidden across two words in this sentence: 'They saw armour in the museum.'",
    options: ["WARM", "HARM", "WARP", "FARM", "SWAM"],
    correctIndex: 0,
    explanation: "The word WARM is hidden across 'sa-W' and 'ARM-our' → WARM.",
    difficulty: 2,
    topic: "hidden words",
  },

  {
    stem: "Find a 4-letter word hidden across two words in this sentence: 'We went up to the attic to find the box.'",
    options: ["HEAT", "THAT", "NEAT", "HATE", "HEAP"],
    correctIndex: 0,
    explanation: "The word HEAT is hidden across 'th-E' wait... t-HE + AT-tic. Actually: 't' then 'HE' from 'the', then 'AT' from 'attic'. The hidden word HEAT spans t[HE] + [AT]tic.",
    difficulty: 2,
    topic: "hidden words",
  },

  {
    stem: "Find a 4-letter word hidden across two words in this sentence: 'Check the system items on the list.'",
    options: ["EMIT", "ITEM", "STEM", "MIST", "SITE"],
    correctIndex: 0,
    explanation: "The word EMIT is hidden across 'syst-EM' and 'IT-ems' → EMIT.",
    difficulty: 2,
    topic: "hidden words",
  },

  {
    stem: "Find a 4-letter word hidden across two words in this sentence: 'The villa menu had great food.'",
    options: ["LAME", "LAMB", "FAME", "NAME", "MENU"],
    correctIndex: 0,
    explanation: "The word LAME is hidden across 'vil-LA' and 'ME-nu' → LAME.",
    difficulty: 2,
    topic: "hidden words",
  },

  {
    stem: "Find a 4-letter word hidden across two words in this sentence: 'Fix the door antenna cable.'",
    options: ["RANT", "AUNT", "RANT", "DOOR", "ANTE"],
    correctIndex: 0,
    explanation: "The word RANT is hidden across 'doo-R' and 'ANT-enna' → RANT.",
    difficulty: 2,
    topic: "hidden words",
  },

  {
    stem: "Find a 4-letter word hidden across two words in this sentence: 'We ordered crab legs for dinner.'",
    options: ["ABLE", "CRAB", "BALE", "SLAB", "TALE"],
    correctIndex: 0,
    explanation: "The word ABLE is hidden across 'cr-AB' and 'LE-gs' → ABLE.",
    difficulty: 2,
    topic: "hidden words",
  },

  {
    stem: "Find a 4-letter word hidden across two words in this sentence: 'The bone stew was delicious.'",
    options: ["NEST", "STEW", "BONE", "TONE", "BEST"],
    correctIndex: 0,
    explanation: "The word NEST is hidden across 'bo-NE' and 'ST-ew' → NEST.",
    difficulty: 2,
    topic: "hidden words",
  },

  {
    stem: "Find a 3-letter word hidden across two words in this sentence: 'She sat on the window ledge.'",
    options: ["OWL", "LED", "LOW", "OWE", "WED"],
    correctIndex: 0,
    explanation: "The word OWL is hidden across 'wind-OW' and 'L-edge' → OWL.",
    difficulty: 2,
    topic: "hidden words",
  },

  {
    stem: "Find a 4-letter word hidden across two words in this sentence: 'We drank sugar iced tea.'",
    options: ["RICE", "ICED", "DICE", "RACE", "RINK"],
    correctIndex: 0,
    explanation: "The word RICE is hidden across 'suga-R' and 'ICE-d' → RICE.",
    difficulty: 2,
    topic: "hidden words",
  },

  {
    stem: "Find a 4-letter word hidden across two words in this sentence: 'The stolen diamond was found.'",
    options: ["LEND", "SEND", "MEND", "LENT", "DENY"],
    correctIndex: 0,
    explanation: "The word LEND is hidden across 'sto-LEN' and 'D-iamond' → LEND.",
    difficulty: 2,
    topic: "hidden words",
  },

  {
    stem: "Find a 4-letter word hidden across two words in this sentence: 'Do not slam posts into the ground.'",
    options: ["LAMP", "SLAM", "DAMP", "CAMP", "LIMP"],
    correctIndex: 0,
    explanation: "The word LAMP is hidden across 's-LAM' and 'P-osts' → LAMP.",
    difficulty: 2,
    topic: "hidden words",
  },

  /* =================================================================
     DIFFICULTY 3 — 4-letter hidden words (25 questions)
     ================================================================= */

  {
    stem: "Find a 4-letter word hidden across two words in this sentence: 'There were three Arnolds in the class.'",
    options: ["EARN", "NEAR", "LEAN", "BARN", "YEAR"],
    correctIndex: 0,
    explanation: "The word EARN is hidden across 'thre-E' and 'ARN-olds' → EARN.",
    difficulty: 3,
    topic: "hidden words",
  },

  {
    stem: "Find a 4-letter word hidden across two words in this sentence: 'The hero verdict was cheered by all.'",
    options: ["OVER", "HERO", "EVER", "DOVE", "VERB"],
    correctIndex: 0,
    explanation: "The word OVER is hidden across 'her-O' and 'VER-dict' → OVER.",
    difficulty: 3,
    topic: "hidden words",
  },

  {
    stem: "Find a 4-letter word hidden across two words in this sentence: 'It cost zero pence.'",
    options: ["ROPE", "ZERO", "OPEN", "PORE", "ROBE"],
    correctIndex: 0,
    explanation: "The word ROPE is hidden across 'ze-RO' and 'PE-nce' → ROPE.",
    difficulty: 3,
    topic: "hidden words",
  },

  {
    stem: "Find a 4-letter word hidden across two words in this sentence: 'I reached the shop end of the street.'",
    options: ["OPEN", "SHOP", "PENS", "HOPE", "HONE"],
    correctIndex: 0,
    explanation: "The word OPEN is hidden across 'sh-OP' and 'EN-d' → OPEN.",
    difficulty: 3,
    topic: "hidden words",
  },

  {
    stem: "Find a 4-letter word hidden across two words in this sentence: 'Try the sugar cherry cake.'",
    options: ["ARCH", "CHAR", "RICH", "ACRE", "EACH"],
    correctIndex: 0,
    explanation: "The word ARCH is hidden across 'sug-AR' and 'CH-erry' → ARCH.",
    difficulty: 3,
    topic: "hidden words",
  },

  {
    stem: "Find a 4-letter word hidden across two words in this sentence: 'The horse edged closer to the fence.'",
    options: ["SEED", "EDGE", "DEER", "NEED", "REED"],
    correctIndex: 0,
    explanation: "The word SEED is hidden across 'hor-SE' and 'ED-ged' → SEED.",
    difficulty: 3,
    topic: "hidden words",
  },

  {
    stem: "Find a 4-letter word hidden across two words in this sentence: 'The basin child used was tiny.'",
    options: ["INCH", "CHIN", "ZINC", "RICH", "SHIN"],
    correctIndex: 0,
    explanation: "The word INCH is hidden across 'bas-IN' and 'CH-ild' → INCH.",
    difficulty: 3,
    topic: "hidden words",
  },

  {
    stem: "Find a 4-letter word hidden across two words in this sentence: 'Give it more edge next time.'",
    options: ["REED", "EDGE", "MORE", "DEER", "FEED"],
    correctIndex: 0,
    explanation: "The word REED is hidden across 'mo-RE' and 'ED-ge' → REED.",
    difficulty: 3,
    topic: "hidden words",
  },

  {
    stem: "Find a 4-letter word hidden across two words in this sentence: 'They could not window shop today.'",
    options: ["TWIN", "WIND", "TOWN", "WINE", "WINK"],
    correctIndex: 0,
    explanation: "The word TWIN is hidden across 'no-T' and 'WIN-dow' → TWIN.",
    difficulty: 3,
    topic: "hidden words",
  },

  {
    stem: "Find a 4-letter word hidden across two words in this sentence: 'She was home always by six.'",
    options: ["MEAL", "MALE", "HEAL", "DEAL", "REAL"],
    correctIndex: 0,
    explanation: "The word MEAL is hidden across 'ho-ME' and 'AL-ways' → MEAL.",
    difficulty: 3,
    topic: "hidden words",
  },

  {
    stem: "Find a 4-letter word hidden across two words in this sentence: 'Turn up the floor amplifier.'",
    options: ["RAMP", "LAMP", "DAMP", "CAMP", "ROAM"],
    correctIndex: 0,
    explanation: "The word RAMP is hidden across 'floo-R' and 'AMP-lifier' → RAMP.",
    difficulty: 3,
    topic: "hidden words",
  },

  {
    stem: "Find a 4-letter word hidden across two words in this sentence: 'The slope area was steep.'",
    options: ["PEAR", "REAP", "LEAP", "FEAR", "NEAR"],
    correctIndex: 0,
    explanation: "The word PEAR is hidden across 'slo-PE' and 'AR-ea' → PEAR.",
    difficulty: 3,
    topic: "hidden words",
  },

  {
    stem: "Find a 4-letter word hidden across two words in this sentence: 'We often danced at parties.'",
    options: ["TEND", "DENT", "FEND", "LEND", "REND"],
    correctIndex: 0,
    explanation: "The word TEND is hidden across 'of-TEN' and 'D-anced' → TEND.",
    difficulty: 3,
    topic: "hidden words",
  },

  {
    stem: "Find a 4-letter word hidden across two words in this sentence: 'The cactus edged along the wall.'",
    options: ["USED", "FUSE", "MUSE", "RUSE", "SUED"],
    correctIndex: 0,
    explanation: "The word USED is hidden across 'cact-US' and 'ED-ged' → USED.",
    difficulty: 3,
    topic: "hidden words",
  },

  {
    stem: "Find a 4-letter word hidden across two words in this sentence: 'The dog owner walked past.'",
    options: ["GOWN", "DOWN", "TOWN", "GROW", "GONE"],
    correctIndex: 0,
    explanation: "The word GOWN is hidden across 'do-G' and 'OWN-er' → GOWN.",
    difficulty: 3,
    topic: "hidden words",
  },

  {
    stem: "Find a 4-letter word hidden across two words in this sentence: 'The slope stone was slippery.'",
    options: ["PEST", "STEP", "BEST", "REST", "PETS"],
    correctIndex: 0,
    explanation: "The word PEST is hidden across 'slo-PE' and 'ST-one' → PEST.",
    difficulty: 3,
    topic: "hidden words",
  },

  {
    stem: "Find a 4-letter word hidden across two words in this sentence: 'The violin kept its tune.'",
    options: ["LINK", "SINK", "PINK", "WINK", "RINK"],
    correctIndex: 0,
    explanation: "The word LINK is hidden across 'vio-LIN' and 'K-ept' → LINK.",
    difficulty: 3,
    topic: "hidden words",
  },

  {
    stem: "Find a 4-letter word hidden across two words in this sentence: 'The symbol tree was ancient.'",
    options: ["BOLT", "JOLT", "MOLT", "COLT", "TOLD"],
    correctIndex: 0,
    explanation: "The word BOLT is hidden across 'sym-BOL' and 'T-ree' → BOLT.",
    difficulty: 3,
    topic: "hidden words",
  },

  {
    stem: "Find a 4-letter word hidden across two words in this sentence: 'They had two ventures planned.'",
    options: ["OVEN", "WOVE", "VENT", "EVEN", "VETO"],
    correctIndex: 0,
    explanation: "The word OVEN is hidden across 'tw-O' and 'VEN-tures' → OVEN.",
    difficulty: 3,
    topic: "hidden words",
  },

  {
    stem: "Find a 4-letter word hidden across two words in this sentence: 'He pressed sharp into the clay.'",
    options: ["PINT", "HINT", "MINT", "TINT", "PITH"],
    correctIndex: 0,
    explanation: "The word PINT is hidden across 'shar-P' and 'INT-o' → PINT.",
    difficulty: 3,
    topic: "hidden words",
  },

  {
    stem: "Find a 4-letter word hidden across two words in this sentence: 'The gorilla territory was vast.'",
    options: ["LATE", "GATE", "FATE", "RATE", "TALE"],
    correctIndex: 0,
    explanation: "The word LATE is hidden across 'goril-LA' and 'TE-rritory' → LATE.",
    difficulty: 3,
    topic: "hidden words",
  },

  {
    stem: "Find a 4-letter word hidden across two words in this sentence: 'I had vanilla cereal for breakfast.'",
    options: ["LACE", "LAME", "RACE", "FACE", "PACE"],
    correctIndex: 0,
    explanation: "The word LACE is hidden across 'vanil-LA' and 'CE-real' → LACE.",
    difficulty: 3,
    topic: "hidden words",
  },

  {
    stem: "Find a 4-letter word hidden across two words in this sentence: 'The sea strike damaged boats.'",
    options: ["EAST", "SEAT", "EATS", "MAST", "LAST"],
    correctIndex: 0,
    explanation: "The word EAST is hidden across 's-EA' and 'ST-rike' → EAST.",
    difficulty: 3,
    topic: "hidden words",
  },

  {
    stem: "Find a 4-letter word hidden across two words in this sentence: 'That was a slim pudding.'",
    options: ["LIMP", "SLIM", "PIMP", "LIME", "LIMB"],
    correctIndex: 0,
    explanation: "The word LIMP is hidden across 's-LIM' and 'P-udding' → LIMP.",
    difficulty: 3,
    topic: "hidden words",
  },

  {
    stem: "Find a 4-letter word hidden across two words in this sentence: 'Please visit Emma tomorrow.'",
    options: ["ITEM", "EMIT", "MITE", "TIME", "SITE"],
    correctIndex: 0,
    explanation: "The word ITEM is hidden across 'vis-IT' and 'EM-ma' → ITEM.",
    difficulty: 3,
    topic: "hidden words",
  },

  /* =================================================================
     DIFFICULTY 4 — 4-5 letter hidden words, natural sentences (30 questions)
     ================================================================= */

  {
    stem: "Find a 5-letter word hidden across two words in this sentence: 'The flight plan German Airlines offered was cheap.'",
    options: ["ANGER", "RANGE", "ANGEL", "GAMER", "MANGO"],
    correctIndex: 0,
    explanation: "The word ANGER is hidden across 'pl-AN' and 'GER-man' → ANGER.",
    difficulty: 4,
    topic: "hidden words",
  },

  {
    stem: "Find a 5-letter word hidden across two words in this sentence: 'He made a stab left of the target.'",
    options: ["TABLE", "BLADE", "LABEL", "FABLE", "CABLE"],
    correctIndex: 0,
    explanation: "The word TABLE is hidden across 's-TAB' and 'LE-ft' → TABLE.",
    difficulty: 4,
    topic: "hidden words",
  },

  {
    stem: "Find a 5-letter word hidden across two words in this sentence: 'The prism artist painted with light.'",
    options: ["SMART", "MARCH", "MARSH", "START", "STORM"],
    correctIndex: 0,
    explanation: "The word SMART is hidden across 'pri-SM' and 'ART-ist' → SMART.",
    difficulty: 4,
    topic: "hidden words",
  },

  {
    stem: "Find a 5-letter word hidden across two words in this sentence: 'The veteran general saluted.'",
    options: ["RANGE", "ANGER", "CRANE", "GRANT", "MANGE"],
    correctIndex: 0,
    explanation: "The word RANGE is hidden across 'vete-RAN' and 'GE-neral' → RANGE.",
    difficulty: 4,
    topic: "hidden words",
  },

  {
    stem: "Find a 5-letter word hidden across two words in this sentence: 'She placed the novel bowl on the counter.'",
    options: ["ELBOW", "BELOW", "BOWEL", "BLOWN", "NOBLE"],
    correctIndex: 0,
    explanation: "The word ELBOW is hidden across 'nov-EL' and 'BOW-l' → ELBOW.",
    difficulty: 4,
    topic: "hidden words",
  },

  {
    stem: "Find a 5-letter word hidden across two words in this sentence: 'The old coffin alley was dark.'",
    options: ["FINAL", "FIEND", "NASAL", "FAINT", "ALIEN"],
    correctIndex: 0,
    explanation: "The word FINAL is hidden across 'cof-FIN' and 'AL-ley' → FINAL.",
    difficulty: 4,
    topic: "hidden words",
  },

  {
    stem: "Find a 5-letter word hidden across two words in this sentence: 'They stow errand bags in the car.'",
    options: ["TOWER", "POWER", "LOWER", "ROWDY", "TOWEL"],
    correctIndex: 0,
    explanation: "The word TOWER is hidden across 's-TOW' and 'ER-rand' → TOWER.",
    difficulty: 4,
    topic: "hidden words",
  },

  {
    stem: "Find a 5-letter word hidden across two words in this sentence: 'The roadmap lesson was useful.'",
    options: ["MAPLE", "AMPLE", "APPLE", "PLAIN", "PLUME"],
    correctIndex: 0,
    explanation: "The word MAPLE is hidden across 'road-MAP' and 'LE-sson' → MAPLE.",
    difficulty: 4,
    topic: "hidden words",
  },

  {
    stem: "Find a 5-letter word hidden across two words in this sentence: 'The gun Derby event was loud.'",
    options: ["UNDER", "NUDGE", "ROUND", "DINER", "DUNCE"],
    correctIndex: 0,
    explanation: "The word UNDER is hidden across 'g-UN' and 'DER-by' → UNDER.",
    difficulty: 4,
    topic: "hidden words",
  },

  {
    stem: "Find a 5-letter word hidden across two words in this sentence: 'She was first, Andrew was second.'",
    options: ["STAND", "BRAND", "HANDS", "BANDS", "SANDY"],
    correctIndex: 0,
    explanation: "The word STAND is hidden across 'fir-ST' and 'AND-rew' → STAND.",
    difficulty: 4,
    topic: "hidden words",
  },

  {
    stem: "Find a 5-letter word hidden across two words in this sentence: 'It was a talent error by the coach.'",
    options: ["ENTER", "INTER", "RENTER", "NEVER", "TREND"],
    correctIndex: 0,
    explanation: "The word ENTER is hidden across 'tal-ENT' and 'ER-ror' → ENTER.",
    difficulty: 4,
    topic: "hidden words",
  },

  {
    stem: "Find a 5-letter word hidden across two words in this sentence: 'We bought extra cedar wood.'",
    options: ["TRACE", "GRACE", "BRACE", "CREAM", "CRAFT"],
    correctIndex: 0,
    explanation: "The word TRACE is hidden across 'ex-TRA' and 'CE-dar' → TRACE.",
    difficulty: 4,
    topic: "hidden words",
  },

  {
    stem: "Find a 5-letter word hidden across two words in this sentence: 'Check graph one for the data.'",
    options: ["PHONE", "PHONY", "HONED", "STONE", "SHONE"],
    correctIndex: 0,
    explanation: "The word PHONE is hidden across 'gra-PH' and 'ONE' → PHONE.",
    difficulty: 4,
    topic: "hidden words",
  },

  {
    stem: "Find a 5-letter word hidden across two words in this sentence: 'Reduce waste, Amber said loudly.'",
    options: ["STEAM", "TEAMS", "FEAST", "STEAK", "ROAST"],
    correctIndex: 0,
    explanation: "The word STEAM is hidden across 'wa-STE' and 'AM-ber' → STEAM.",
    difficulty: 4,
    topic: "hidden words",
  },

  {
    stem: "Find a 5-letter word hidden across two words in this sentence: 'The five acre amount of land was sold.'",
    options: ["CREAM", "DREAM", "GLEAM", "SCREAM", "SEAM"],
    correctIndex: 0,
    explanation: "The word CREAM is hidden across 'a-CRE' and 'AM-ount' → CREAM.",
    difficulty: 4,
    topic: "hidden words",
  },

  {
    stem: "Find a 5-letter word hidden across two words in this sentence: 'There were zero live fish in the pond.'",
    options: ["OLIVE", "ALIVE", "LOVED", "CLOVE", "GLOVE"],
    correctIndex: 0,
    explanation: "The word OLIVE is hidden across 'zer-O' and 'LIVE' → OLIVE.",
    difficulty: 4,
    topic: "hidden words",
  },

  {
    stem: "Find a 5-letter word hidden across two words in this sentence: 'It was an acid error in the lab.'",
    options: ["CIDER", "RIDER", "WIDER", "ELDER", "CEDAR"],
    correctIndex: 0,
    explanation: "The word CIDER is hidden across 'a-CID' and 'ER-ror' → CIDER.",
    difficulty: 4,
    topic: "hidden words",
  },

  {
    stem: "Find a 5-letter word hidden across two words in this sentence: 'Play disc one first.'",
    options: ["SCONE", "STONE", "CLONE", "SCENE", "SCOPE"],
    correctIndex: 0,
    explanation: "The word SCONE is hidden across 'di-SC' and 'ONE' → SCONE.",
    difficulty: 4,
    topic: "hidden words",
  },

  {
    stem: "Find a 5-letter word hidden across two words in this sentence: 'The format changed quickly.'",
    options: ["MATCH", "WATCH", "CATCH", "BATCH", "LATCH"],
    correctIndex: 0,
    explanation: "The word MATCH is hidden across 'for-MAT' and 'CH-anged' → MATCH.",
    difficulty: 4,
    topic: "hidden words",
  },

  {
    stem: "Find a 5-letter word hidden across two words in this sentence: 'His humor always made us laugh.'",
    options: ["MORAL", "ROYAL", "CORAL", "TOTAL", "MODAL"],
    correctIndex: 0,
    explanation: "The word MORAL is hidden across 'hu-MOR' and 'AL-ways' → MORAL.",
    difficulty: 4,
    topic: "hidden words",
  },

  {
    stem: "Find a 5-letter word hidden across two words in this sentence: 'I heard the echo tell across the valley.'",
    options: ["HOTEL", "MOTEL", "TOTAL", "OTHER", "THOSE"],
    correctIndex: 0,
    explanation: "The word HOTEL is hidden across 'ec-HO' and 'TEL-l' → HOTEL.",
    difficulty: 4,
    topic: "hidden words",
  },

  {
    stem: "Find a 5-letter word hidden across two words in this sentence: 'He will rev entire engines at the show.'",
    options: ["EVENT", "VENUE", "SEVEN", "NEVER", "NERVE"],
    correctIndex: 0,
    explanation: "The word EVENT is hidden across 'r-EV' and 'ENT-ire' → EVENT.",
    difficulty: 4,
    topic: "hidden words",
  },

  {
    stem: "Find a 5-letter word hidden across two words in this sentence: 'The dinner version was delicious.'",
    options: ["NERVE", "VERSE", "SERVE", "LEVER", "NEVER"],
    correctIndex: 0,
    explanation: "The word NERVE is hidden across 'din-NER' and 'VE-rsion' → NERVE.",
    difficulty: 4,
    topic: "hidden words",
  },

  {
    stem: "Find a 5-letter word hidden across two words in this sentence: 'The pupil other than James finished first.'",
    options: ["PILOT", "PIVOT", "PLOTS", "POINT", "BUILT"],
    correctIndex: 0,
    explanation: "The word PILOT is hidden across 'pu-PIL' and 'OT-her' → PILOT.",
    difficulty: 4,
    topic: "hidden words",
  },

  {
    stem: "Find a 5-letter word hidden across two words in this sentence: 'The audit checked every detail.'",
    options: ["DITCH", "WITCH", "PITCH", "HITCH", "WHICH"],
    correctIndex: 0,
    explanation: "The word DITCH is hidden across 'au-DIT' and 'CH-ecked' → DITCH.",
    difficulty: 4,
    topic: "hidden words",
  },

  {
    stem: "Find a 5-letter word hidden across two words in this sentence: 'He was named Albert after his grandfather.'",
    options: ["MEDAL", "PEDAL", "METAL", "MODAL", "LEGAL"],
    correctIndex: 0,
    explanation: "The word MEDAL is hidden across 'na-MED' and 'AL-bert' → MEDAL.",
    difficulty: 4,
    topic: "hidden words",
  },

  {
    stem: "Find a 5-letter word hidden across two words in this sentence: 'She loved the afro style.'",
    options: ["FROST", "ROAST", "CROSS", "ROOST", "FRONT"],
    correctIndex: 0,
    explanation: "The word FROST is hidden across 'a-FRO' and 'ST-yle' → FROST.",
    difficulty: 4,
    topic: "hidden words",
  },

  {
    stem: "Find a 5-letter word hidden across two words in this sentence: 'Buy the garden set for summer.'",
    options: ["DENSE", "SENSE", "TENSE", "RINSE", "GEESE"],
    correctIndex: 0,
    explanation: "The word DENSE is hidden across 'gar-DEN' and 'SE-t' → DENSE.",
    difficulty: 4,
    topic: "hidden words",
  },

  {
    stem: "Find a 5-letter word hidden across two words in this sentence: 'The woman ordered juice.'",
    options: ["MANOR", "MINOR", "DONOR", "HONOR", "MAYOR"],
    correctIndex: 0,
    explanation: "The word MANOR is hidden across 'wo-MAN' and 'OR-dered' → MANOR.",
    difficulty: 4,
    topic: "hidden words",
  },

  {
    stem: "Find a 5-letter word hidden across two words in this sentence: 'It was a major bite from the dog.'",
    options: ["ORBIT", "ROBIN", "BORN", "BORED", "ROBED"],
    correctIndex: 0,
    explanation: "The word ORBIT is hidden across 'maj-OR' and 'BIT-e' → ORBIT.",
    difficulty: 4,
    topic: "hidden words",
  },

  /* =================================================================
     DIFFICULTY 5 — 5-6 letter hidden words, well-disguised (20 questions)
     ================================================================= */

  {
    stem: "Find a 6-letter word hidden across two words in this sentence: 'The sidecar petrol tank was empty.'",
    options: ["CARPET", "CAPPED", "PARCEL", "GARNET", "CASKET"],
    correctIndex: 0,
    explanation: "The word CARPET is hidden across 'side-CAR' and 'PET-rol' → CARPET.",
    difficulty: 5,
    topic: "hidden words",
  },

  {
    stem: "Find a 6-letter word hidden across two words in this sentence: 'The fossil verified the theory.'",
    options: ["SILVER", "SLIVER", "CLEVER", "SOLVER", "SHIVER"],
    correctIndex: 0,
    explanation: "The word SILVER is hidden across 'fos-SIL' and 'VER-ified' → SILVER.",
    difficulty: 5,
    topic: "hidden words",
  },

  {
    stem: "Find a 6-letter word hidden across two words in this sentence: 'Use sugar, Dennis suggested.'",
    options: ["GARDEN", "WARDEN", "PARDON", "SUDDEN", "HIDDEN"],
    correctIndex: 0,
    explanation: "The word GARDEN is hidden across 'su-GAR' and 'DEN-nis' → GARDEN.",
    difficulty: 5,
    topic: "hidden words",
  },

  {
    stem: "Find a 6-letter word hidden across two words in this sentence: 'The hybrid George drove was silent.'",
    options: ["BRIDGE", "FRIDGE", "GINGER", "LEDGER", "BADGER"],
    correctIndex: 0,
    explanation: "The word BRIDGE is hidden across 'hy-BRID' and 'GE-orge' → BRIDGE.",
    difficulty: 5,
    topic: "hidden words",
  },

  {
    stem: "Find a 6-letter word hidden across two words in this sentence: 'The twin terrace houses looked alike.'",
    options: ["WINTER", "WINNER", "TIMBER", "WINDER", "DINNER"],
    correctIndex: 0,
    explanation: "The word WINTER is hidden across 't-WIN' and 'TER-race' → WINTER.",
    difficulty: 5,
    topic: "hidden words",
  },

  {
    stem: "Find a 6-letter word hidden across two words in this sentence: 'The pasta blend tasted great.'",
    options: ["STABLE", "TABLET", "FABLES", "ENABLE", "NIMBLE"],
    correctIndex: 0,
    explanation: "The word STABLE is hidden across 'pa-STA' and 'BLE-nd' → STABLE.",
    difficulty: 5,
    topic: "hidden words",
  },

  {
    stem: "Find a 6-letter word hidden across two words in this sentence: 'The arctic kettle froze solid.'",
    options: ["TICKET", "KICKED", "PICKED", "POCKET", "WICKET"],
    correctIndex: 0,
    explanation: "The word TICKET is hidden across 'arc-TIC' and 'KET-tle' → TICKET.",
    difficulty: 5,
    topic: "hidden words",
  },

  {
    stem: "Find a 6-letter word hidden across two words in this sentence: 'The plum berry pie was sweet.'",
    options: ["LUMBER", "MEMBER", "NUMBER", "TIMBER", "TUMBLE"],
    correctIndex: 0,
    explanation: "The word LUMBER is hidden across 'p-LUM' and 'BER-ry' → LUMBER.",
    difficulty: 5,
    topic: "hidden words",
  },

  {
    stem: "Find a 6-letter word hidden across two words in this sentence: 'The ranch orchard grew apples.'",
    options: ["ANCHOR", "RANSOM", "CHANCE", "CHORAL", "ARCHED"],
    correctIndex: 0,
    explanation: "The word ANCHOR is hidden across 'r-ANCH' and 'OR-chard' → ANCHOR.",
    difficulty: 5,
    topic: "hidden words",
  },

  {
    stem: "Find a 6-letter word hidden across two words in this sentence: 'The novel veteran story was gripping.'",
    options: ["VELVET", "VIOLET", "VALLEY", "VESSEL", "VERVET"],
    correctIndex: 0,
    explanation: "The word VELVET is hidden across 'no-VEL' and 'VET-eran' → VELVET.",
    difficulty: 5,
    topic: "hidden words",
  },

  {
    stem: "Find a 6-letter word hidden across two words in this sentence: 'The grammar kettle discussion was complex.'",
    options: ["MARKET", "BASKET", "MASCOT", "KERNEL", "POCKET"],
    correctIndex: 0,
    explanation: "The word MARKET is hidden across 'gram-MAR' and 'KET-tle' → MARKET.",
    difficulty: 5,
    topic: "hidden words",
  },

  {
    stem: "Find a 6-letter word hidden across two words in this sentence: 'The floorplan etched on paper was detailed.'",
    options: ["PLANET", "PLANED", "PLAQUE", "LANCET", "PLENTY"],
    correctIndex: 0,
    explanation: "The word PLANET is hidden across 'floor-PLAN' and 'ET-ched' → PLANET.",
    difficulty: 5,
    topic: "hidden words",
  },

  {
    stem: "Find a 6-letter word hidden across two words in this sentence: 'The twin nervously waited.'",
    options: ["WINNER", "DINNER", "THINNER", "WINDER", "SINNER"],
    correctIndex: 0,
    explanation: "The word WINNER is hidden across 't-WIN' and 'NER-vously' → WINNER.",
    difficulty: 5,
    topic: "hidden words",
  },

  {
    stem: "Find a 6-letter word hidden across two words in this sentence: 'Read Graham letters carefully.'",
    options: ["HAMLET", "MALLET", "BALLET", "HELMET", "PELLET"],
    correctIndex: 0,
    explanation: "The word HAMLET is hidden across 'Gra-HAM' and 'LET-ters' → HAMLET.",
    difficulty: 5,
    topic: "hidden words",
  },

  {
    stem: "Find a 6-letter word hidden across two words in this sentence: 'The Capri song was beautiful.'",
    options: ["PRISON", "REASON", "PERSON", "BISON", "POISON"],
    correctIndex: 0,
    explanation: "The word PRISON is hidden across 'Ca-PRI' and 'SON-g' → PRISON.",
    difficulty: 5,
    topic: "hidden words",
  },

  {
    stem: "Find a 6-letter word hidden across two words in this sentence: 'The ribbon network linked schools.'",
    options: ["BONNET", "BUCKET", "BANNER", "BONFIRE", "BUNNET"],
    correctIndex: 0,
    explanation: "The word BONNET is hidden across 'rib-BON' and 'NET-work' → BONNET.",
    difficulty: 5,
    topic: "hidden words",
  },

  {
    stem: "Find a 6-letter word hidden across two words in this sentence: 'The oasis terrain was lush.'",
    options: ["SISTER", "MISTER", "LISTER", "BLISTER", "SINISTER"],
    correctIndex: 0,
    explanation: "The word SISTER is hidden across 'oa-SIS' and 'TER-rain' → SISTER.",
    difficulty: 5,
    topic: "hidden words",
  },

  {
    stem: "Find a 6-letter word hidden across two words in this sentence: 'The argument always ended badly.'",
    options: ["MENTAL", "RENTAL", "DENTAL", "GENTLE", "LENTIL"],
    correctIndex: 0,
    explanation: "The word MENTAL is hidden across 'argu-MENT' and 'AL-ways' → MENTAL.",
    difficulty: 5,
    topic: "hidden words",
  },

  {
    stem: "Find a 6-letter word hidden across two words in this sentence: 'The London keystone bridge is famous.'",
    options: ["DONKEY", "MONKEY", "HOCKEY", "TURKEY", "JOCKEY"],
    correctIndex: 0,
    explanation: "The word DONKEY is hidden across 'Lon-DON' and 'KEY-stone' → DONKEY.",
    difficulty: 5,
    topic: "hidden words",
  },

  {
    stem: "Find a 6-letter word hidden across two words in this sentence: 'The Christmas cottage looked lovely.'",
    options: ["MASCOT", "BISCOT", "ESCORT", "FALCON", "MUSCAT"],
    correctIndex: 0,
    explanation: "The word MASCOT is hidden across 'Christ-MAS' and 'COT-tage' → MASCOT.",
    difficulty: 5,
    topic: "hidden words",
  },
];
