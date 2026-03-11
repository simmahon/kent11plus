import type { BankedQuestion } from "./types";

/**
 * 100 Synonym & Antonym questions for Kent 11+ Verbal Reasoning
 *
 * Distribution:
 *   ~60 synonyms, ~40 antonyms
 *   Difficulty 1: 10 | 2: 15 | 3: 25 | 4: 30 | 5: 20
 */
export const BANK: BankedQuestion[] = [
  // ========== DIFFICULTY 1 (10 questions) ==========
  {
    stem: "Which word is closest in meaning to HAPPY?",
    options: ["sad", "joyful", "angry", "tired", "hungry"],
    correctIndex: 1,
    explanation:
      "Joyful means feeling great happiness, just like happy.",
    difficulty: 1,
    topic: "synonyms and antonyms",
  },
  {
    stem: "Which word is closest in meaning to BIG?",
    options: ["tiny", "loud", "large", "quick", "heavy"],
    correctIndex: 2,
    explanation:
      "Large means of great size, which is another way of saying big.",
    difficulty: 1,
    topic: "synonyms and antonyms",
  },
  {
    stem: "Which word is closest in meaning to FAST?",
    options: ["slow", "quick", "tall", "bright", "soft"],
    correctIndex: 1,
    explanation:
      "Quick means moving at high speed, just like fast.",
    difficulty: 1,
    topic: "synonyms and antonyms",
  },
  {
    stem: "Which word is most opposite in meaning to HOT?",
    options: ["warm", "boiling", "cold", "dry", "sunny"],
    correctIndex: 2,
    explanation:
      "Cold is the opposite of hot. Warm is similar to hot, not opposite.",
    difficulty: 1,
    topic: "synonyms and antonyms",
  },
  {
    stem: "Which word is closest in meaning to SMALL?",
    options: ["huge", "little", "wide", "round", "flat"],
    correctIndex: 1,
    explanation:
      "Little means small in size, so it is a synonym of small.",
    difficulty: 1,
    topic: "synonyms and antonyms",
  },
  {
    stem: "Which word is most opposite in meaning to DARK?",
    options: ["dim", "shady", "black", "bright", "grey"],
    correctIndex: 3,
    explanation:
      "Bright is the opposite of dark. Dim and shady are similar to dark.",
    difficulty: 1,
    topic: "synonyms and antonyms",
  },
  {
    stem: "Which word is closest in meaning to ANGRY?",
    options: ["pleased", "cross", "calm", "bored", "shy"],
    correctIndex: 1,
    explanation:
      "Cross means annoyed or angry, making it a synonym.",
    difficulty: 1,
    topic: "synonyms and antonyms",
  },
  {
    stem: "Which word is most opposite in meaning to LOUD?",
    options: ["noisy", "quiet", "deep", "sharp", "clear"],
    correctIndex: 1,
    explanation:
      "Quiet is the opposite of loud. Noisy means the same as loud.",
    difficulty: 1,
    topic: "synonyms and antonyms",
  },
  {
    stem: "Which word is closest in meaning to PRETTY?",
    options: ["ugly", "plain", "beautiful", "strange", "normal"],
    correctIndex: 2,
    explanation:
      "Beautiful means very attractive, which is similar to pretty.",
    difficulty: 1,
    topic: "synonyms and antonyms",
  },
  {
    stem: "Which word is most opposite in meaning to OLD?",
    options: ["ancient", "worn", "young", "wise", "grey"],
    correctIndex: 2,
    explanation:
      "Young is the opposite of old. Ancient means very old.",
    difficulty: 1,
    topic: "synonyms and antonyms",
  },

  // ========== DIFFICULTY 2 (15 questions) ==========
  {
    stem: "Which word is closest in meaning to BRAVE?",
    options: ["scared", "courageous", "careful", "clever", "strong"],
    correctIndex: 1,
    explanation:
      "Courageous means having bravery in the face of danger, just like brave.",
    difficulty: 2,
    topic: "synonyms and antonyms",
  },
  {
    stem: "Which word is closest in meaning to WEARY?",
    options: ["alert", "tired", "worried", "angry", "careful"],
    correctIndex: 1,
    explanation:
      "Tired and weary both mean feeling exhausted or lacking energy.",
    difficulty: 2,
    topic: "synonyms and antonyms",
  },
  {
    stem: "Which word is most opposite in meaning to GENEROUS?",
    options: ["kind", "wealthy", "selfish", "polite", "grateful"],
    correctIndex: 2,
    explanation:
      "Selfish means caring only about yourself, the opposite of generous.",
    difficulty: 2,
    topic: "synonyms and antonyms",
  },
  {
    stem: "Which word is closest in meaning to WEALTHY?",
    options: ["poor", "happy", "rich", "famous", "healthy"],
    correctIndex: 2,
    explanation:
      "Rich means having a lot of money or possessions, just like wealthy.",
    difficulty: 2,
    topic: "synonyms and antonyms",
  },
  {
    stem: "Which word is most opposite in meaning to POLITE?",
    options: ["friendly", "rude", "quiet", "strict", "shy"],
    correctIndex: 1,
    explanation:
      "Rude means lacking good manners, the opposite of polite.",
    difficulty: 2,
    topic: "synonyms and antonyms",
  },
  {
    stem: "Which word is closest in meaning to AFRAID?",
    options: ["brave", "scared", "excited", "surprised", "careful"],
    correctIndex: 1,
    explanation:
      "Scared means feeling fear, which is the same as afraid.",
    difficulty: 2,
    topic: "synonyms and antonyms",
  },
  {
    stem: "Which word is closest in meaning to FOOLISH?",
    options: ["clever", "wise", "silly", "funny", "lazy"],
    correctIndex: 2,
    explanation:
      "Silly means lacking good sense, similar to foolish.",
    difficulty: 2,
    topic: "synonyms and antonyms",
  },
  {
    stem: "Which word is most opposite in meaning to ANCIENT?",
    options: ["old", "historic", "modern", "dusty", "famous"],
    correctIndex: 2,
    explanation:
      "Modern means relating to the present time, the opposite of ancient.",
    difficulty: 2,
    topic: "synonyms and antonyms",
  },
  {
    stem: "Which word is closest in meaning to TREMBLE?",
    options: ["shake", "fall", "stumble", "climb", "slide"],
    correctIndex: 0,
    explanation:
      "Shake means to move with quick, short movements, just like tremble.",
    difficulty: 2,
    topic: "synonyms and antonyms",
  },
  {
    stem: "Which word is most opposite in meaning to SHALLOW?",
    options: ["wide", "narrow", "deep", "flat", "empty"],
    correctIndex: 2,
    explanation:
      "Deep is the opposite of shallow when talking about depth.",
    difficulty: 2,
    topic: "synonyms and antonyms",
  },
  {
    stem: "Which word is closest in meaning to MEND?",
    options: ["break", "repair", "build", "destroy", "bend"],
    correctIndex: 1,
    explanation:
      "Repair means to fix something that is broken, just like mend.",
    difficulty: 2,
    topic: "synonyms and antonyms",
  },
  {
    stem: "Which word is closest in meaning to GLOOMY?",
    options: ["cheerful", "dark", "miserable", "foggy", "quiet"],
    correctIndex: 2,
    explanation:
      "Miserable means very unhappy or depressing, similar to gloomy. Dark describes appearance, but gloomy mainly refers to a sad feeling.",
    difficulty: 2,
    topic: "synonyms and antonyms",
  },
  {
    stem: "Which word is most opposite in meaning to TIMID?",
    options: ["quiet", "bold", "gentle", "small", "weak"],
    correctIndex: 1,
    explanation:
      "Bold means confident and brave, the opposite of timid which means shy and nervous.",
    difficulty: 2,
    topic: "synonyms and antonyms",
  },
  {
    stem: "Which word is closest in meaning to ENORMOUS?",
    options: ["normal", "huge", "heavy", "wide", "thick"],
    correctIndex: 1,
    explanation:
      "Huge means extremely large, just like enormous.",
    difficulty: 2,
    topic: "synonyms and antonyms",
  },
  {
    stem: "Which word is most opposite in meaning to SMOOTH?",
    options: ["soft", "flat", "rough", "hard", "dry"],
    correctIndex: 2,
    explanation:
      "Rough means having an uneven surface, the opposite of smooth.",
    difficulty: 2,
    topic: "synonyms and antonyms",
  },

  // ========== DIFFICULTY 3 (25 questions) ==========
  {
    stem: "Which word is closest in meaning to ABUNDANT?",
    options: ["scarce", "plentiful", "sufficient", "expensive", "important"],
    correctIndex: 1,
    explanation:
      "Plentiful means existing in large quantities, just like abundant.",
    difficulty: 3,
    topic: "synonyms and antonyms",
  },
  {
    stem: "Which word is closest in meaning to CONCEAL?",
    options: ["reveal", "hide", "protect", "cover", "bury"],
    correctIndex: 1,
    explanation:
      "Hide means to put something out of sight, which is exactly what conceal means.",
    difficulty: 3,
    topic: "synonyms and antonyms",
  },
  {
    stem: "Which word is most opposite in meaning to TRANQUIL?",
    options: ["peaceful", "calm", "noisy", "gentle", "still"],
    correctIndex: 2,
    explanation:
      "Noisy means full of loud sounds, the opposite of tranquil which means calm and peaceful.",
    difficulty: 3,
    topic: "synonyms and antonyms",
  },
  {
    stem: "Which word is closest in meaning to CAUTIOUS?",
    options: ["reckless", "careful", "nervous", "slow", "quiet"],
    correctIndex: 1,
    explanation:
      "Careful means taking care to avoid danger, just like cautious.",
    difficulty: 3,
    topic: "synonyms and antonyms",
  },
  {
    stem: "Which word is most opposite in meaning to COURAGEOUS?",
    options: ["bold", "strong", "cowardly", "foolish", "reckless"],
    correctIndex: 2,
    explanation:
      "Cowardly means lacking bravery, the direct opposite of courageous.",
    difficulty: 3,
    topic: "synonyms and antonyms",
  },
  {
    stem: "Which word is closest in meaning to COMMENCE?",
    options: ["finish", "begin", "continue", "pause", "repeat"],
    correctIndex: 1,
    explanation:
      "Begin means to start something, which is exactly what commence means.",
    difficulty: 3,
    topic: "synonyms and antonyms",
  },
  {
    stem: "Which word is closest in meaning to FRAGILE?",
    options: ["strong", "delicate", "flexible", "thin", "light"],
    correctIndex: 1,
    explanation:
      "Delicate means easily broken or damaged, just like fragile.",
    difficulty: 3,
    topic: "synonyms and antonyms",
  },
  {
    stem: "Which word is most opposite in meaning to EXTERIOR?",
    options: ["outside", "surface", "interior", "boundary", "edge"],
    correctIndex: 2,
    explanation:
      "Interior means the inside of something, the opposite of exterior which means the outside.",
    difficulty: 3,
    topic: "synonyms and antonyms",
  },
  {
    stem: "Which word is closest in meaning to DIMINISH?",
    options: ["increase", "decrease", "maintain", "vanish", "change"],
    correctIndex: 1,
    explanation:
      "Decrease means to become smaller or less, just like diminish.",
    difficulty: 3,
    topic: "synonyms and antonyms",
  },
  {
    stem: "Which word is closest in meaning to PECULIAR?",
    options: ["normal", "strange", "special", "rare", "ugly"],
    correctIndex: 1,
    explanation:
      "Strange means unusual or surprising, which is what peculiar means.",
    difficulty: 3,
    topic: "synonyms and antonyms",
  },
  {
    stem: "Which word is most opposite in meaning to PERMANENT?",
    options: ["lasting", "temporary", "stable", "fixed", "solid"],
    correctIndex: 1,
    explanation:
      "Temporary means lasting for a limited time, the opposite of permanent which means lasting forever.",
    difficulty: 3,
    topic: "synonyms and antonyms",
  },
  {
    stem: "Which word is closest in meaning to TEDIOUS?",
    options: ["exciting", "boring", "difficult", "tiring", "long"],
    correctIndex: 1,
    explanation:
      "Boring means dull and uninteresting, just like tedious.",
    difficulty: 3,
    topic: "synonyms and antonyms",
  },
  {
    stem: "Which word is closest in meaning to ASCEND?",
    options: ["fall", "climb", "float", "jump", "fly"],
    correctIndex: 1,
    explanation:
      "Climb means to go upwards, just like ascend means to move up.",
    difficulty: 3,
    topic: "synonyms and antonyms",
  },
  {
    stem: "Which word is most opposite in meaning to VACANT?",
    options: ["empty", "bare", "occupied", "available", "hollow"],
    correctIndex: 2,
    explanation:
      "Occupied means in use or filled, the opposite of vacant which means empty.",
    difficulty: 3,
    topic: "synonyms and antonyms",
  },
  {
    stem: "Which word is closest in meaning to ANXIOUS?",
    options: ["calm", "worried", "excited", "impatient", "angry"],
    correctIndex: 1,
    explanation:
      "Worried means feeling uneasy or troubled, just like anxious.",
    difficulty: 3,
    topic: "synonyms and antonyms",
  },
  {
    stem: "Which word is closest in meaning to FREQUENTLY?",
    options: ["rarely", "often", "sometimes", "always", "occasionally"],
    correctIndex: 1,
    explanation:
      "Often means many times or regularly, which is what frequently means.",
    difficulty: 3,
    topic: "synonyms and antonyms",
  },
  {
    stem: "Which word is most opposite in meaning to EXPAND?",
    options: ["grow", "stretch", "shrink", "swell", "spread"],
    correctIndex: 2,
    explanation:
      "Shrink means to become smaller, the opposite of expand which means to grow larger.",
    difficulty: 3,
    topic: "synonyms and antonyms",
  },
  {
    stem: "Which word is closest in meaning to DWELL?",
    options: ["visit", "live", "stay", "wander", "rest"],
    correctIndex: 1,
    explanation:
      "Live means to have one's home in a place, just like dwell.",
    difficulty: 3,
    topic: "synonyms and antonyms",
  },
  {
    stem: "Which word is most opposite in meaning to TRIUMPH?",
    options: ["victory", "success", "defeat", "battle", "struggle"],
    correctIndex: 2,
    explanation:
      "Defeat means a loss or failure, the opposite of triumph which means a great victory.",
    difficulty: 3,
    topic: "synonyms and antonyms",
  },
  {
    stem: "Which word is closest in meaning to SLENDER?",
    options: ["fat", "thin", "tall", "short", "weak"],
    correctIndex: 1,
    explanation:
      "Thin means having little width, just like slender means gracefully slim.",
    difficulty: 3,
    topic: "synonyms and antonyms",
  },
  {
    stem: "Which word is closest in meaning to SUMMIT?",
    options: ["base", "slope", "peak", "valley", "cliff"],
    correctIndex: 2,
    explanation:
      "Peak means the highest point, just like summit means the top of a mountain.",
    difficulty: 3,
    topic: "synonyms and antonyms",
  },
  {
    stem: "Which word is most opposite in meaning to HUMBLE?",
    options: ["modest", "shy", "arrogant", "poor", "simple"],
    correctIndex: 2,
    explanation:
      "Arrogant means having an exaggerated sense of importance, the opposite of humble.",
    difficulty: 3,
    topic: "synonyms and antonyms",
  },
  {
    stem: "Which word is closest in meaning to FEEBLE?",
    options: ["strong", "weak", "old", "small", "sick"],
    correctIndex: 1,
    explanation:
      "Weak means lacking strength, which is exactly what feeble means.",
    difficulty: 3,
    topic: "synonyms and antonyms",
  },
  {
    stem: "Which word is closest in meaning to PROHIBIT?",
    options: ["allow", "forbid", "prevent", "suggest", "delay"],
    correctIndex: 1,
    explanation:
      "Forbid means to refuse to allow something, just like prohibit.",
    difficulty: 3,
    topic: "synonyms and antonyms",
  },
  {
    stem: "Which word is most opposite in meaning to DOMESTIC?",
    options: ["tame", "local", "foreign", "household", "familiar"],
    correctIndex: 2,
    explanation:
      "Foreign means from another country, the opposite of domestic which means relating to one's own country or home.",
    difficulty: 3,
    topic: "synonyms and antonyms",
  },

  // ========== DIFFICULTY 4 (30 questions) ==========
  {
    stem: "Which word is closest in meaning to BENEVOLENT?",
    options: ["cruel", "kind", "wise", "powerful", "wealthy"],
    correctIndex: 1,
    explanation:
      "Kind means caring and generous, which is what benevolent means.",
    difficulty: 4,
    topic: "synonyms and antonyms",
  },
  {
    stem: "Which word is most opposite in meaning to CLANDESTINE?",
    options: ["secret", "hidden", "open", "illegal", "forbidden"],
    correctIndex: 2,
    explanation:
      "Open means done in public view, the opposite of clandestine which means secret or hidden.",
    difficulty: 4,
    topic: "synonyms and antonyms",
  },
  {
    stem: "Which word is closest in meaning to SUPERFLUOUS?",
    options: ["necessary", "excessive", "superior", "helpful", "fancy"],
    correctIndex: 1,
    explanation:
      "Excessive means more than is needed, similar to superfluous which means unnecessary or extra.",
    difficulty: 4,
    topic: "synonyms and antonyms",
  },
  {
    stem: "Which word is closest in meaning to RESOLUTE?",
    options: ["uncertain", "determined", "relaxed", "stubborn", "rigid"],
    correctIndex: 1,
    explanation:
      "Determined means having a firm purpose, just like resolute.",
    difficulty: 4,
    topic: "synonyms and antonyms",
  },
  {
    stem: "Which word is most opposite in meaning to VERBOSE?",
    options: ["wordy", "lengthy", "concise", "detailed", "repetitive"],
    correctIndex: 2,
    explanation:
      "Concise means using few words, the opposite of verbose which means using more words than needed.",
    difficulty: 4,
    topic: "synonyms and antonyms",
  },
  {
    stem: "Which word is closest in meaning to METICULOUS?",
    options: ["careless", "thorough", "quick", "nervous", "strict"],
    correctIndex: 1,
    explanation:
      "Thorough means very careful and detailed, just like meticulous.",
    difficulty: 4,
    topic: "synonyms and antonyms",
  },
  {
    stem: "Which word is most opposite in meaning to AFFLUENT?",
    options: ["wealthy", "generous", "destitute", "successful", "extravagant"],
    correctIndex: 2,
    explanation:
      "Destitute means extremely poor, the opposite of affluent which means wealthy.",
    difficulty: 4,
    topic: "synonyms and antonyms",
  },
  {
    stem: "Which word is closest in meaning to ARDUOUS?",
    options: ["easy", "difficult", "boring", "dangerous", "rewarding"],
    correctIndex: 1,
    explanation:
      "Difficult means requiring great effort, just like arduous means extremely hard or strenuous.",
    difficulty: 4,
    topic: "synonyms and antonyms",
  },
  {
    stem: "Which word is closest in meaning to ELATED?",
    options: ["depressed", "thrilled", "surprised", "relieved", "nervous"],
    correctIndex: 1,
    explanation:
      "Thrilled means feeling great happiness, just like elated means ecstatically happy.",
    difficulty: 4,
    topic: "synonyms and antonyms",
  },
  {
    stem: "Which word is most opposite in meaning to TRANSPARENT?",
    options: ["clear", "visible", "opaque", "thin", "fragile"],
    correctIndex: 2,
    explanation:
      "Opaque means not able to be seen through, the opposite of transparent.",
    difficulty: 4,
    topic: "synonyms and antonyms",
  },
  {
    stem: "Which word is closest in meaning to LAMENT?",
    options: ["celebrate", "mourn", "complain", "regret", "worry"],
    correctIndex: 1,
    explanation:
      "Mourn means to feel deep sorrow, just like lament means to grieve or express sadness.",
    difficulty: 4,
    topic: "synonyms and antonyms",
  },
  {
    stem: "Which word is closest in meaning to SCEPTICAL?",
    options: ["doubtful", "fearful", "curious", "hopeful", "critical"],
    correctIndex: 0,
    explanation:
      "Doubtful means feeling uncertain, which is what sceptical means - not easily convinced.",
    difficulty: 4,
    topic: "synonyms and antonyms",
  },
  {
    stem: "Which word is most opposite in meaning to COMPULSORY?",
    options: ["required", "mandatory", "voluntary", "necessary", "important"],
    correctIndex: 2,
    explanation:
      "Voluntary means done by choice, the opposite of compulsory which means required by law or rule.",
    difficulty: 4,
    topic: "synonyms and antonyms",
  },
  {
    stem: "Which word is closest in meaning to FURTIVE?",
    options: ["bold", "sneaky", "quick", "angry", "fearful"],
    correctIndex: 1,
    explanation:
      "Sneaky means acting in a secret or sly way, just like furtive.",
    difficulty: 4,
    topic: "synonyms and antonyms",
  },
  {
    stem: "Which word is closest in meaning to AMIABLE?",
    options: ["hostile", "friendly", "capable", "reliable", "humble"],
    correctIndex: 1,
    explanation:
      "Friendly means kind and pleasant, just like amiable.",
    difficulty: 4,
    topic: "synonyms and antonyms",
  },
  {
    stem: "Which word is most opposite in meaning to FUTILE?",
    options: ["useless", "pointless", "productive", "wasteful", "weak"],
    correctIndex: 2,
    explanation:
      "Productive means achieving results, the opposite of futile which means having no useful purpose.",
    difficulty: 4,
    topic: "synonyms and antonyms",
  },
  {
    stem: "Which word is closest in meaning to OMINOUS?",
    options: ["cheerful", "threatening", "mysterious", "impressive", "gloomy"],
    correctIndex: 1,
    explanation:
      "Threatening means suggesting something bad is about to happen, just like ominous.",
    difficulty: 4,
    topic: "synonyms and antonyms",
  },
  {
    stem: "Which word is closest in meaning to IMPECCABLE?",
    options: ["flawed", "faultless", "impressive", "careful", "elegant"],
    correctIndex: 1,
    explanation:
      "Faultless means without any mistakes, just like impeccable means perfect.",
    difficulty: 4,
    topic: "synonyms and antonyms",
  },
  {
    stem: "Which word is most opposite in meaning to SERENE?",
    options: ["peaceful", "quiet", "agitated", "gentle", "sleepy"],
    correctIndex: 2,
    explanation:
      "Agitated means restless and disturbed, the opposite of serene which means calm and peaceful.",
    difficulty: 4,
    topic: "synonyms and antonyms",
  },
  {
    stem: "Which word is closest in meaning to INQUISITIVE?",
    options: ["rude", "curious", "suspicious", "intelligent", "observant"],
    correctIndex: 1,
    explanation:
      "Curious means eager to know or learn, just like inquisitive.",
    difficulty: 4,
    topic: "synonyms and antonyms",
  },
  {
    stem: "Which word is closest in meaning to ELOQUENT?",
    options: ["silent", "articulate", "loud", "persuasive", "educated"],
    correctIndex: 1,
    explanation:
      "Articulate means able to express ideas clearly and fluently, just like eloquent.",
    difficulty: 4,
    topic: "synonyms and antonyms",
  },
  {
    stem: "Which word is most opposite in meaning to NEGLIGENT?",
    options: ["careless", "lazy", "attentive", "clumsy", "forgetful"],
    correctIndex: 2,
    explanation:
      "Attentive means paying close attention, the opposite of negligent which means failing to take proper care.",
    difficulty: 4,
    topic: "synonyms and antonyms",
  },
  {
    stem: "Which word is closest in meaning to DILIGENT?",
    options: ["lazy", "hardworking", "clever", "patient", "obedient"],
    correctIndex: 1,
    explanation:
      "Hardworking means putting in consistent effort, just like diligent.",
    difficulty: 4,
    topic: "synonyms and antonyms",
  },
  {
    stem: "Which word is most opposite in meaning to VIVID?",
    options: ["bright", "colourful", "dull", "dark", "pale"],
    correctIndex: 2,
    explanation:
      "Dull means lacking brightness or interest, the opposite of vivid which means intensely bright or clear.",
    difficulty: 4,
    topic: "synonyms and antonyms",
  },
  {
    stem: "Which word is closest in meaning to OBSCURE?",
    options: ["famous", "unclear", "hidden", "dark", "forgotten"],
    correctIndex: 1,
    explanation:
      "Unclear means not easily understood, which is the primary meaning of obscure.",
    difficulty: 4,
    topic: "synonyms and antonyms",
  },
  {
    stem: "Which word is most opposite in meaning to MUNDANE?",
    options: ["ordinary", "dull", "extraordinary", "daily", "simple"],
    correctIndex: 2,
    explanation:
      "Extraordinary means very unusual or remarkable, the opposite of mundane which means boring and ordinary.",
    difficulty: 4,
    topic: "synonyms and antonyms",
  },
  {
    stem: "Which word is closest in meaning to PRISTINE?",
    options: ["dirty", "spotless", "new", "valuable", "delicate"],
    correctIndex: 1,
    explanation:
      "Spotless means completely clean, just like pristine means in its original, unspoilt condition.",
    difficulty: 4,
    topic: "synonyms and antonyms",
  },
  {
    stem: "Which word is closest in meaning to SOLEMN?",
    options: ["cheerful", "serious", "lonely", "quiet", "angry"],
    correctIndex: 1,
    explanation:
      "Serious means grave and thoughtful, just like solemn.",
    difficulty: 4,
    topic: "synonyms and antonyms",
  },
  {
    stem: "Which word is most opposite in meaning to DORMANT?",
    options: ["sleeping", "quiet", "active", "resting", "hidden"],
    correctIndex: 2,
    explanation:
      "Active means in a state of action, the opposite of dormant which means temporarily inactive.",
    difficulty: 4,
    topic: "synonyms and antonyms",
  },
  {
    stem: "Which word is closest in meaning to HOSTILE?",
    options: ["friendly", "aggressive", "suspicious", "dangerous", "fierce"],
    correctIndex: 1,
    explanation:
      "Aggressive means ready to attack or confront, just like hostile means unfriendly and antagonistic.",
    difficulty: 4,
    topic: "synonyms and antonyms",
  },

  // ========== DIFFICULTY 5 (20 questions) ==========
  {
    stem: "Which word is closest in meaning to SAGACIOUS?",
    options: ["foolish", "wise", "brave", "ancient", "stubborn"],
    correctIndex: 1,
    explanation:
      "Wise means having good judgement, just like sagacious means showing keen discernment.",
    difficulty: 5,
    topic: "synonyms and antonyms",
  },
  {
    stem: "Which word is most opposite in meaning to GREGARIOUS?",
    options: ["friendly", "sociable", "reclusive", "generous", "cheerful"],
    correctIndex: 2,
    explanation:
      "Reclusive means avoiding others, the opposite of gregarious which means fond of company.",
    difficulty: 5,
    topic: "synonyms and antonyms",
  },
  {
    stem: "Which word is closest in meaning to UBIQUITOUS?",
    options: ["rare", "unique", "widespread", "powerful", "invisible"],
    correctIndex: 2,
    explanation:
      "Widespread means found everywhere, just like ubiquitous means present or found everywhere.",
    difficulty: 5,
    topic: "synonyms and antonyms",
  },
  {
    stem: "Which word is closest in meaning to RETICENT?",
    options: ["talkative", "reserved", "reluctant", "shy", "silent"],
    correctIndex: 1,
    explanation:
      "Reserved means not revealing one's feelings easily, just like reticent means not sharing thoughts readily.",
    difficulty: 5,
    topic: "synonyms and antonyms",
  },
  {
    stem: "Which word is most opposite in meaning to EPHEMERAL?",
    options: ["brief", "fleeting", "enduring", "fragile", "beautiful"],
    correctIndex: 2,
    explanation:
      "Enduring means lasting for a long time, the opposite of ephemeral which means short-lived.",
    difficulty: 5,
    topic: "synonyms and antonyms",
  },
  {
    stem: "Which word is closest in meaning to MAGNANIMOUS?",
    options: ["selfish", "generous", "powerful", "wealthy", "famous"],
    correctIndex: 1,
    explanation:
      "Generous means willing to give freely, just like magnanimous means noble and giving, especially to rivals.",
    difficulty: 5,
    topic: "synonyms and antonyms",
  },
  {
    stem: "Which word is most opposite in meaning to OSTENTATIOUS?",
    options: ["showy", "elaborate", "understated", "expensive", "glamorous"],
    correctIndex: 2,
    explanation:
      "Understated means presented in a subtle way, the opposite of ostentatious which means designed to impress.",
    difficulty: 5,
    topic: "synonyms and antonyms",
  },
  {
    stem: "Which word is closest in meaning to INDOLENT?",
    options: ["active", "lazy", "patient", "independent", "calm"],
    correctIndex: 1,
    explanation:
      "Lazy means unwilling to work or use energy, just like indolent.",
    difficulty: 5,
    topic: "synonyms and antonyms",
  },
  {
    stem: "Which word is closest in meaning to TENACIOUS?",
    options: ["fragile", "persistent", "cautious", "aggressive", "patient"],
    correctIndex: 1,
    explanation:
      "Persistent means continuing firmly despite difficulty, just like tenacious means holding on tightly.",
    difficulty: 5,
    topic: "synonyms and antonyms",
  },
  {
    stem: "Which word is most opposite in meaning to ACQUIESCE?",
    options: ["agree", "accept", "resist", "ignore", "question"],
    correctIndex: 2,
    explanation:
      "Resist means to oppose or fight against, the opposite of acquiesce which means to accept without protest.",
    difficulty: 5,
    topic: "synonyms and antonyms",
  },
  {
    stem: "Which word is closest in meaning to PERNICIOUS?",
    options: ["helpful", "harmful", "persistent", "obvious", "annoying"],
    correctIndex: 1,
    explanation:
      "Harmful means causing damage, just like pernicious means having a subtly destructive effect.",
    difficulty: 5,
    topic: "synonyms and antonyms",
  },
  {
    stem: "Which word is most opposite in meaning to LOQUACIOUS?",
    options: ["chatty", "witty", "taciturn", "eloquent", "boring"],
    correctIndex: 2,
    explanation:
      "Taciturn means reserved and uncommunicative, the opposite of loquacious which means very talkative.",
    difficulty: 5,
    topic: "synonyms and antonyms",
  },
  {
    stem: "Which word is closest in meaning to PRUDENT?",
    options: ["reckless", "sensible", "proud", "strict", "honest"],
    correctIndex: 1,
    explanation:
      "Sensible means showing good judgement, just like prudent means acting with care for the future.",
    difficulty: 5,
    topic: "synonyms and antonyms",
  },
  {
    stem: "Which word is most opposite in meaning to AUSTERE?",
    options: ["strict", "plain", "luxurious", "serious", "harsh"],
    correctIndex: 2,
    explanation:
      "Luxurious means extremely comfortable and elegant, the opposite of austere which means severe and plain.",
    difficulty: 5,
    topic: "synonyms and antonyms",
  },
  {
    stem: "Which word is closest in meaning to VEHEMENT?",
    options: ["gentle", "passionate", "violent", "stubborn", "loud"],
    correctIndex: 1,
    explanation:
      "Passionate means showing strong feelings, just like vehement means displaying intense force of feeling.",
    difficulty: 5,
    topic: "synonyms and antonyms",
  },
  {
    stem: "Which word is closest in meaning to ALTRUISTIC?",
    options: ["selfish", "selfless", "ambitious", "humble", "trusting"],
    correctIndex: 1,
    explanation:
      "Selfless means concerned more with others than yourself, just like altruistic.",
    difficulty: 5,
    topic: "synonyms and antonyms",
  },
  {
    stem: "Which word is most opposite in meaning to APATHETIC?",
    options: ["bored", "indifferent", "enthusiastic", "depressed", "lazy"],
    correctIndex: 2,
    explanation:
      "Enthusiastic means showing great interest, the opposite of apathetic which means showing no interest or concern.",
    difficulty: 5,
    topic: "synonyms and antonyms",
  },
  {
    stem: "Which word is closest in meaning to VORACIOUS?",
    options: ["greedy", "insatiable", "violent", "fast", "enormous"],
    correctIndex: 1,
    explanation:
      "Insatiable means wanting more and never satisfied, just like voracious means having a huge appetite.",
    difficulty: 5,
    topic: "synonyms and antonyms",
  },
  {
    stem: "Which word is most opposite in meaning to PRETENTIOUS?",
    options: ["showy", "false", "genuine", "elegant", "confident"],
    correctIndex: 2,
    explanation:
      "Genuine means real and authentic, the opposite of pretentious which means trying to appear more important than one is.",
    difficulty: 5,
    topic: "synonyms and antonyms",
  },
  {
    stem: "Which word is closest in meaning to DEBILITATE?",
    options: ["strengthen", "weaken", "destroy", "confuse", "delay"],
    correctIndex: 1,
    explanation:
      "Weaken means to make less strong, just like debilitate means to make someone very weak.",
    difficulty: 5,
    topic: "synonyms and antonyms",
  },
];
