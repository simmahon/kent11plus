import type { BankedQuestion } from "./types";

export const BANK: BankedQuestion[] = [
  /* ================================================================== */
  /*  DIFFICULTY 1  (10 questions)                                       */
  /* ================================================================== */

  // Q1 — Grammar (subject-verb agreement)
  {
    stem: "Which sentence uses correct grammar?",
    options: [
      "The dogs is barking loudly.",
      "The dogs are barking loudly.",
      "The dogs am barking loudly.",
      "The dogs be barking loudly.",
      "The dogs was barking loudly.",
    ],
    correctIndex: 1,
    explanation:
      "'Dogs' is plural, so it needs the plural verb 'are'. 'Is', 'am', 'be', and 'was' do not agree with a plural subject.",
    difficulty: 1,
    topic: "grammar and punctuation",
  },
  // Q2 — Punctuation (full stop)
  {
    stem: "Which sentence is punctuated correctly?",
    options: [
      "I like to play football",
      "I like to play football.",
      "I like. to play football",
      "I like to play. football",
      "I like to play football,",
    ],
    correctIndex: 1,
    explanation:
      "A sentence must end with a full stop, question mark, or exclamation mark. Only option B has the full stop at the end.",
    difficulty: 1,
    topic: "grammar and punctuation",
  },
  // Q3 — Word class
  {
    stem: "In the sentence 'The cat sat on the mat', what type of word is 'sat'?",
    options: ["noun", "verb", "adjective", "adverb", "preposition"],
    correctIndex: 1,
    explanation:
      "'Sat' is a verb because it describes the action the cat is doing.",
    difficulty: 1,
    topic: "grammar and punctuation",
  },
  // Q4 — Grammar (pronoun)
  {
    stem: "Which sentence uses correct grammar?",
    options: [
      "Me and Tom went to the park.",
      "Tom and me went to the park.",
      "Tom and I went to the park.",
      "I and Tom went to the park.",
      "Tom and myself went to the park.",
    ],
    correctIndex: 2,
    explanation:
      "When you are the subject of the sentence, use 'I' not 'me'. The polite form puts the other person first: 'Tom and I'.",
    difficulty: 1,
    topic: "grammar and punctuation",
  },
  // Q5 — Punctuation (question mark)
  {
    stem: "Which sentence is punctuated correctly?",
    options: [
      "Where are you going.",
      "Where are you going,",
      "Where are you going?",
      "Where are you going!",
      "Where, are you going",
    ],
    correctIndex: 2,
    explanation:
      "This is a question, so it needs a question mark at the end.",
    difficulty: 1,
    topic: "grammar and punctuation",
  },
  // Q6 — Word class
  {
    stem: "In the sentence 'She wore a beautiful dress', what type of word is 'beautiful'?",
    options: ["noun", "verb", "adjective", "adverb", "preposition"],
    correctIndex: 2,
    explanation:
      "'Beautiful' is an adjective because it describes the noun 'dress'.",
    difficulty: 1,
    topic: "grammar and punctuation",
  },
  // Q7 — Grammar (tense)
  {
    stem: "Which sentence uses correct grammar?",
    options: [
      "Yesterday I walk to school.",
      "Yesterday I walks to school.",
      "Yesterday I walking to school.",
      "Yesterday I walked to school.",
      "Yesterday I am walking to school.",
    ],
    correctIndex: 3,
    explanation:
      "'Yesterday' tells us this happened in the past, so the past tense 'walked' is correct.",
    difficulty: 1,
    topic: "grammar and punctuation",
  },
  // Q8 — Punctuation (capital letter)
  {
    stem: "Which sentence is punctuated correctly?",
    options: [
      "my name is Sarah.",
      "My name is sarah.",
      "My Name Is Sarah.",
      "My name is Sarah.",
      "my Name is Sarah.",
    ],
    correctIndex: 3,
    explanation:
      "Sentences start with a capital letter, and proper nouns (names like Sarah) also need capitals.",
    difficulty: 1,
    topic: "grammar and punctuation",
  },
  // Q9 — Word class
  {
    stem: "In the sentence 'The boy ran quickly', what type of word is 'quickly'?",
    options: ["noun", "verb", "adjective", "adverb", "preposition"],
    correctIndex: 3,
    explanation:
      "'Quickly' is an adverb because it describes how the boy ran -- it modifies the verb.",
    difficulty: 1,
    topic: "grammar and punctuation",
  },
  // Q10 — Grammar (subject-verb agreement)
  {
    stem: "Which sentence uses correct grammar?",
    options: [
      "She have a new bicycle.",
      "She having a new bicycle.",
      "She has a new bicycle.",
      "She haves a new bicycle.",
      "She are having a new bicycle.",
    ],
    correctIndex: 2,
    explanation:
      "With 'she' (third person singular), we use 'has' not 'have'.",
    difficulty: 1,
    topic: "grammar and punctuation",
  },

  /* ================================================================== */
  /*  DIFFICULTY 2  (15 questions)                                       */
  /* ================================================================== */

  // Q11 — Punctuation (apostrophe for possession)
  {
    stem: "Which sentence is punctuated correctly?",
    options: [
      "The girls bag was red.",
      "The girl's bag was red.",
      "The girls' bag was red.",
      "The girl,s bag was red.",
      "The girls's bag was red.",
    ],
    correctIndex: 1,
    explanation:
      "The bag belongs to one girl, so we use an apostrophe before the 's': girl's. If it were many girls, it would be girls'.",
    difficulty: 2,
    topic: "grammar and punctuation",
  },
  // Q12 — Grammar (pronoun case)
  {
    stem: "Which sentence uses correct grammar?",
    options: [
      "The teacher gave the books to I.",
      "The teacher gave the books to me.",
      "The teacher gave the books to myself.",
      "The teacher gave the books to mine.",
      "The teacher gave the books to me's.",
    ],
    correctIndex: 1,
    explanation:
      "After a preposition like 'to', we use the object pronoun 'me' not 'I' or 'myself'.",
    difficulty: 2,
    topic: "grammar and punctuation",
  },
  // Q13 — Word class
  {
    stem: "In the sentence 'He hid behind the wall', what type of word is 'behind'?",
    options: ["noun", "verb", "adjective", "adverb", "preposition"],
    correctIndex: 4,
    explanation:
      "'Behind' is a preposition because it shows the position of 'he' in relation to 'the wall'.",
    difficulty: 2,
    topic: "grammar and punctuation",
  },
  // Q14 — Punctuation (comma in a list)
  {
    stem: "Which sentence is punctuated correctly?",
    options: [
      "I bought apples bananas and oranges.",
      "I bought apples, bananas, and oranges.",
      "I bought, apples bananas and oranges.",
      "I bought apples bananas, and oranges.",
      "I bought apples, bananas and, oranges.",
    ],
    correctIndex: 1,
    explanation:
      "Items in a list are separated by commas. The comma before 'and' (Oxford comma) is acceptable in British English.",
    difficulty: 2,
    topic: "grammar and punctuation",
  },
  // Q15 — Grammar (comparative/superlative)
  {
    stem: "Which sentence uses correct grammar?",
    options: [
      "She is more taller than her brother.",
      "She is most tallest in the class.",
      "She is taller than her brother.",
      "She is tallest than her brother.",
      "She is more tall than her brother.",
    ],
    correctIndex: 2,
    explanation:
      "For short adjectives like 'tall', we add '-er' for comparisons: taller. We do not use 'more' with '-er'.",
    difficulty: 2,
    topic: "grammar and punctuation",
  },
  // Q16 — Punctuation (speech marks)
  {
    stem: "Which sentence is punctuated correctly?",
    options: [
      "Hello said Tom.",
      "\"Hello,\" said Tom.",
      "Hello, said \"Tom.\"",
      "\"Hello\" said, Tom.",
      "Hello, \"said\" Tom.",
    ],
    correctIndex: 1,
    explanation:
      "Speech marks go around the spoken words, and a comma separates the speech from the reporting clause.",
    difficulty: 2,
    topic: "grammar and punctuation",
  },
  // Q17 — Word class
  {
    stem: "In the sentence 'The happiness was overwhelming', what type of word is 'happiness'?",
    options: ["noun", "verb", "adjective", "adverb", "preposition"],
    correctIndex: 0,
    explanation:
      "'Happiness' is an abstract noun. It names a feeling or state, and here it is the subject of the sentence.",
    difficulty: 2,
    topic: "grammar and punctuation",
  },
  // Q18 — Grammar (double negative)
  {
    stem: "Which sentence uses correct grammar?",
    options: [
      "I don't want nothing.",
      "I don't want anything.",
      "I don't want none of it.",
      "I haven't got no homework.",
      "She can't find nobody.",
    ],
    correctIndex: 1,
    explanation:
      "In standard English, we avoid double negatives. 'Don't want anything' is correct; 'don't want nothing' is a double negative.",
    difficulty: 2,
    topic: "grammar and punctuation",
  },
  // Q19 — Punctuation (apostrophe for contraction)
  {
    stem: "Which sentence is punctuated correctly?",
    options: [
      "They cant come to the party.",
      "They can't come to the party.",
      "They ca'nt come to the party.",
      "They cann't come to the party.",
      "They can,t come to the party.",
    ],
    correctIndex: 1,
    explanation:
      "The apostrophe in 'can't' replaces the missing letters 'no' from 'cannot'.",
    difficulty: 2,
    topic: "grammar and punctuation",
  },
  // Q20 — Grammar (there/their/they're)
  {
    stem: "Which sentence uses correct grammar?",
    options: [
      "Their going to the cinema tonight.",
      "There going to the cinema tonight.",
      "They're going to the cinema tonight.",
      "Theyre going to the cinema tonight.",
      "Thier going to the cinema tonight.",
    ],
    correctIndex: 2,
    explanation:
      "'They're' is short for 'they are'. 'Their' shows possession, and 'there' refers to a place.",
    difficulty: 2,
    topic: "grammar and punctuation",
  },
  // Q21 — Word class
  {
    stem: "In the sentence 'We walked through the forest', what type of word is 'through'?",
    options: ["noun", "verb", "adjective", "adverb", "preposition"],
    correctIndex: 4,
    explanation:
      "'Through' is a preposition that shows the relationship between walking and the forest.",
    difficulty: 2,
    topic: "grammar and punctuation",
  },
  // Q22 — Punctuation (exclamation mark)
  {
    stem: "Which sentence is punctuated correctly?",
    options: [
      "What a wonderful surprise.",
      "What, a wonderful surprise!",
      "What a wonderful, surprise!",
      "What a wonderful surprise!",
      "What! a wonderful surprise",
    ],
    correctIndex: 3,
    explanation:
      "Exclamatory sentences that begin with 'What' or 'How' end with an exclamation mark.",
    difficulty: 2,
    topic: "grammar and punctuation",
  },
  // Q23 — Grammar (its/it's)
  {
    stem: "Which sentence uses correct grammar?",
    options: [
      "It's tail was wagging happily.",
      "Its' tail was wagging happily.",
      "Its tail was wagging happily.",
      "Its, tail was wagging happily.",
      "Itz tail was wagging happily.",
    ],
    correctIndex: 2,
    explanation:
      "'Its' without an apostrophe shows possession. 'It's' with an apostrophe means 'it is'.",
    difficulty: 2,
    topic: "grammar and punctuation",
  },
  // Q24 — Grammar (a/an)
  {
    stem: "Which sentence uses correct grammar?",
    options: [
      "She ate a apple for lunch.",
      "She ate an apple for lunch.",
      "She ate a oranges for lunch.",
      "She ate an banana for lunch.",
      "She ate a egg for lunch.",
    ],
    correctIndex: 1,
    explanation:
      "We use 'an' before words that start with a vowel sound. 'Apple' starts with an 'a' sound, so we say 'an apple'.",
    difficulty: 2,
    topic: "grammar and punctuation",
  },
  // Q25 — Word class
  {
    stem: "In the sentence 'The fierce lion roared', what type of word is 'fierce'?",
    options: ["noun", "verb", "adjective", "adverb", "preposition"],
    correctIndex: 2,
    explanation:
      "'Fierce' is an adjective because it describes what the lion is like.",
    difficulty: 2,
    topic: "grammar and punctuation",
  },

  /* ================================================================== */
  /*  DIFFICULTY 3  (25 questions)                                       */
  /* ================================================================== */

  // Q26 — Punctuation (comma after fronted adverbial)
  {
    stem: "Which sentence is punctuated correctly?",
    options: [
      "After the storm the sun came out.",
      "After the storm, the sun came out.",
      "After, the storm the sun came out.",
      "After the storm the sun, came out.",
      "After the, storm the sun came out.",
    ],
    correctIndex: 1,
    explanation:
      "A comma is needed after a fronted adverbial ('After the storm') to separate it from the main clause.",
    difficulty: 3,
    topic: "grammar and punctuation",
  },
  // Q27 — Grammar (who/whom)
  {
    stem: "Which sentence uses correct grammar?",
    options: [
      "Who did you give the letter to?",
      "Whom did you give the letter to?",
      "Who did you gave the letter to?",
      "Whom did you gave the letter to?",
      "Whom did you giving the letter to?",
    ],
    correctIndex: 1,
    explanation:
      "'Whom' is correct because it is the object of the preposition 'to'. A quick test: you gave the letter to him (not he), so use 'whom'.",
    difficulty: 3,
    topic: "grammar and punctuation",
  },
  // Q28 — Word class
  {
    stem: "In the sentence 'She sang the melody beautifully', what type of word is 'beautifully'?",
    options: ["noun", "verb", "adjective", "adverb", "preposition"],
    correctIndex: 3,
    explanation:
      "'Beautifully' is an adverb because it describes how she sang. Adverbs often end in '-ly'.",
    difficulty: 3,
    topic: "grammar and punctuation",
  },
  // Q29 — Punctuation (semicolon)
  {
    stem: "Which sentence is punctuated correctly?",
    options: [
      "I love reading, my sister prefers drawing.",
      "I love reading; my sister prefers drawing.",
      "I love reading. my sister prefers drawing.",
      "I love reading: my sister prefers drawing.",
      "I love; reading my sister prefers drawing.",
    ],
    correctIndex: 1,
    explanation:
      "A semicolon joins two closely related independent clauses. A comma alone creates a comma splice error.",
    difficulty: 3,
    topic: "grammar and punctuation",
  },
  // Q30 — Grammar (tense consistency)
  {
    stem: "Which sentence uses correct grammar?",
    options: [
      "She walked to school and sees her friend.",
      "She walked to school and saw her friend.",
      "She walks to school and saw her friend.",
      "She was walking to school and sees her friend.",
      "She walked to school and is seeing her friend.",
    ],
    correctIndex: 1,
    explanation:
      "Both verbs should be in the same tense. 'Walked' and 'saw' are both past tense, keeping the sentence consistent.",
    difficulty: 3,
    topic: "grammar and punctuation",
  },
  // Q31 — Word class
  {
    stem: "In the sentence 'Despite the rain, they played outside', what type of word is 'despite'?",
    options: ["noun", "verb", "adjective", "conjunction", "preposition"],
    correctIndex: 4,
    explanation:
      "'Despite' is a preposition meaning 'in spite of'. It introduces a noun phrase ('the rain').",
    difficulty: 3,
    topic: "grammar and punctuation",
  },
  // Q32 — Punctuation (colon to introduce a list)
  {
    stem: "Which sentence is punctuated correctly?",
    options: [
      "You will need: a pen, a ruler, and a rubber.",
      "You will need, a pen, a ruler, and a rubber.",
      "You will need; a pen, a ruler, and a rubber.",
      "You will need a pen: a ruler: and a rubber.",
      "You will: need a pen, a ruler, and a rubber.",
    ],
    correctIndex: 0,
    explanation:
      "A colon is used after a complete clause to introduce a list. The clause 'You will need' is complete, so a colon follows.",
    difficulty: 3,
    topic: "grammar and punctuation",
  },
  // Q33 — Grammar (fewer/less)
  {
    stem: "Which sentence uses correct grammar?",
    options: [
      "There are less people here today.",
      "There are fewer people here today.",
      "There is less people here today.",
      "There is fewer people here today.",
      "There are lesser people here today.",
    ],
    correctIndex: 1,
    explanation:
      "'Fewer' is used with countable nouns (people), while 'less' is used with uncountable nouns (water, time).",
    difficulty: 3,
    topic: "grammar and punctuation",
  },
  // Q34 — Punctuation (comma with subordinate clause)
  {
    stem: "Which sentence is punctuated correctly?",
    options: [
      "Although it was raining they went outside.",
      "Although, it was raining they went outside.",
      "Although it was raining, they went outside.",
      "Although it was, raining they went outside.",
      "Although it was raining they, went outside.",
    ],
    correctIndex: 2,
    explanation:
      "When a subordinate clause ('Although it was raining') comes before the main clause, a comma separates them.",
    difficulty: 3,
    topic: "grammar and punctuation",
  },
  // Q35 — Word class
  {
    stem: "In the sentence 'The decision was made collectively', what type of word is 'decision'?",
    options: ["noun", "verb", "adjective", "adverb", "preposition"],
    correctIndex: 0,
    explanation:
      "'Decision' is a noun -- it is a thing (an abstract noun). It is the subject of the sentence.",
    difficulty: 3,
    topic: "grammar and punctuation",
  },
  // Q36 — Grammar (passive voice recognition)
  {
    stem: "Which sentence is written in the passive voice?",
    options: [
      "The dog chased the cat.",
      "The cat was chased by the dog.",
      "The dog is chasing the cat.",
      "The cat ran from the dog.",
      "The dog likes chasing cats.",
    ],
    correctIndex: 1,
    explanation:
      "In the passive voice, the subject receives the action. 'The cat was chased' -- the cat is receiving the action of being chased.",
    difficulty: 3,
    topic: "grammar and punctuation",
  },
  // Q37 — Punctuation (possessive plural)
  {
    stem: "Which sentence is punctuated correctly?",
    options: [
      "The childrens' toys were scattered everywhere.",
      "The children's toys were scattered everywhere.",
      "The childrens toys were scattered everywhere.",
      "The children toys' were scattered everywhere.",
      "The childrens toys' were scattered everywhere.",
    ],
    correctIndex: 1,
    explanation:
      "'Children' is already plural, so we add apostrophe-s: children's. We only put the apostrophe after the 's' when the plural ends in 's' (e.g., dogs').",
    difficulty: 3,
    topic: "grammar and punctuation",
  },
  // Q38 — Grammar (lay/lie)
  {
    stem: "Which sentence uses correct grammar?",
    options: [
      "I'm going to lay down for a rest.",
      "I'm going to lie down for a rest.",
      "I'm going to laid down for a rest.",
      "I'm going to lied down for a rest.",
      "I'm going to laying down for a rest.",
    ],
    correctIndex: 1,
    explanation:
      "'Lie' means to recline (no object needed). 'Lay' means to put something down (needs an object). You lie down; you lay a book on the table.",
    difficulty: 3,
    topic: "grammar and punctuation",
  },
  // Q39 — Word class
  {
    stem: "In the sentence 'She bravely rescued the kitten', what type of word is 'bravely'?",
    options: ["noun", "verb", "adjective", "adverb", "preposition"],
    correctIndex: 3,
    explanation:
      "'Bravely' is an adverb describing how she rescued the kitten. It modifies the verb 'rescued'.",
    difficulty: 3,
    topic: "grammar and punctuation",
  },
  // Q40 — Punctuation (hyphen in compound adjective)
  {
    stem: "Which sentence is punctuated correctly?",
    options: [
      "She is a well known author.",
      "She is a well-known author.",
      "She is a well, known author.",
      "She is a well known-author.",
      "She is a well;known author.",
    ],
    correctIndex: 1,
    explanation:
      "When two words work together as one adjective before a noun, they are joined with a hyphen: well-known.",
    difficulty: 3,
    topic: "grammar and punctuation",
  },
  // Q41 — Grammar (affect/effect)
  {
    stem: "Which sentence uses correct grammar?",
    options: [
      "The rain had a big affect on the match.",
      "The rain had a big effect on the match.",
      "The rain will effect the match greatly.",
      "The rain did not affect on the match.",
      "The effect of rain affect the match.",
    ],
    correctIndex: 1,
    explanation:
      "'Effect' is usually a noun meaning the result of something. 'Affect' is usually a verb. Here we need the noun: 'a big effect'.",
    difficulty: 3,
    topic: "grammar and punctuation",
  },
  // Q42 — Punctuation (parenthetical comma)
  {
    stem: "Which sentence is punctuated correctly?",
    options: [
      "My brother who is twelve plays football.",
      "My brother, who is twelve, plays football.",
      "My brother who is twelve, plays football.",
      "My brother, who is twelve plays football.",
      "My, brother who is twelve plays football.",
    ],
    correctIndex: 1,
    explanation:
      "The clause 'who is twelve' is extra information (non-essential), so it needs commas on both sides.",
    difficulty: 3,
    topic: "grammar and punctuation",
  },
  // Q43 — Word class
  {
    stem: "In the sentence 'They explored the ancient ruins', what type of word is 'ancient'?",
    options: ["noun", "verb", "adjective", "adverb", "preposition"],
    correctIndex: 2,
    explanation:
      "'Ancient' is an adjective because it describes the noun 'ruins'.",
    difficulty: 3,
    topic: "grammar and punctuation",
  },
  // Q44 — Grammar (subject-verb with collective noun)
  {
    stem: "Which sentence uses correct grammar?",
    options: [
      "The team are playing their best.",
      "The team is playing their best.",
      "The team are playing its best.",
      "The team is playing its best.",
      "The team were playing their best.",
    ],
    correctIndex: 0,
    explanation:
      "In British English, collective nouns like 'team' can take a plural verb when referring to individual members. 'The team are playing their best' is correct.",
    difficulty: 3,
    topic: "grammar and punctuation",
  },
  // Q45 — Punctuation (colon before explanation)
  {
    stem: "Which sentence is punctuated correctly?",
    options: [
      "He had one goal, to win the race.",
      "He had one goal; to win the race.",
      "He had one goal: to win the race.",
      "He had one goal - to win the race.",
      "He had one goal. To win the race.",
    ],
    correctIndex: 2,
    explanation:
      "A colon is used after a complete statement to introduce an explanation or elaboration.",
    difficulty: 3,
    topic: "grammar and punctuation",
  },
  // Q46 — Grammar (conditional)
  {
    stem: "Which sentence uses correct grammar?",
    options: [
      "If I was a bird, I would fly south.",
      "If I were a bird, I would fly south.",
      "If I am a bird, I would fly south.",
      "If I be a bird, I would fly south.",
      "If I being a bird, I would fly south.",
    ],
    correctIndex: 1,
    explanation:
      "In a hypothetical (unreal) condition, we use the subjunctive 'were' instead of 'was': 'If I were a bird'.",
    difficulty: 3,
    topic: "grammar and punctuation",
  },
  // Q47 — Word class
  {
    stem: "In the sentence 'Courage is not the absence of fear', what type of word is 'courage'?",
    options: ["noun", "verb", "adjective", "adverb", "preposition"],
    correctIndex: 0,
    explanation:
      "'Courage' is an abstract noun -- it names a quality that you cannot touch or see.",
    difficulty: 3,
    topic: "grammar and punctuation",
  },
  // Q48 — Grammar (parallel structure)
  {
    stem: "Which sentence uses correct grammar?",
    options: [
      "She enjoys swimming, cycling, and to run.",
      "She enjoys swimming, cycling, and running.",
      "She enjoys to swim, cycling, and running.",
      "She enjoys swimming, to cycle, and running.",
      "She enjoys to swim, to cycle, and running.",
    ],
    correctIndex: 1,
    explanation:
      "Items in a list should be in the same grammatical form. All three activities should be gerunds (-ing form): swimming, cycling, running.",
    difficulty: 3,
    topic: "grammar and punctuation",
  },
  // Q49 — Punctuation (direct speech new line)
  {
    stem: "Which sentence is punctuated correctly?",
    options: [
      "\"I'm tired\" she said \"let's go home.\"",
      "\"I'm tired,\" she said. \"Let's go home.\"",
      "\"I'm tired\", she said, \"Let's go home\".",
      "\"I'm tired\" she said, \"let's go home\"",
      "I'm tired, she said, let's go home.",
    ],
    correctIndex: 1,
    explanation:
      "The comma after 'tired' goes inside the speech marks. 'She said' is followed by a full stop because 'Let's go home' is a new sentence of speech.",
    difficulty: 3,
    topic: "grammar and punctuation",
  },
  // Q50 — Word class
  {
    stem: "In the sentence 'We waited until dark', what type of word is 'until'?",
    options: ["noun", "verb", "adjective", "conjunction", "preposition"],
    correctIndex: 4,
    explanation:
      "Here 'until' is a preposition because it is followed by a noun ('dark'). It would be a conjunction if followed by a clause.",
    difficulty: 3,
    topic: "grammar and punctuation",
  },

  /* ================================================================== */
  /*  DIFFICULTY 4  (30 questions)                                       */
  /* ================================================================== */

  // Q51 — Punctuation (semicolon vs comma splice)
  {
    stem: "Which sentence is punctuated correctly?",
    options: [
      "The sky was dark, we decided to leave.",
      "The sky was dark; we decided to leave.",
      "The sky was dark we decided to leave.",
      "The sky was dark: we decided; to leave.",
      "The sky, was dark we decided to leave.",
    ],
    correctIndex: 1,
    explanation:
      "Two independent clauses cannot be joined by just a comma (comma splice). A semicolon correctly joins these two related clauses.",
    difficulty: 4,
    topic: "grammar and punctuation",
  },
  // Q52 — Grammar (dangling modifier)
  {
    stem: "Which sentence uses correct grammar?",
    options: [
      "Walking through the park, the flowers were beautiful.",
      "Walking through the park, I admired the beautiful flowers.",
      "Walking through the park, it was beautiful flowers.",
      "Walking through the park, beautiful were the flowers.",
      "Walking through the park, the beauty of flowers noticed.",
    ],
    correctIndex: 1,
    explanation:
      "A participial phrase like 'Walking through the park' must be followed by the person doing the walking. Only 'I admired...' makes the doer clear.",
    difficulty: 4,
    topic: "grammar and punctuation",
  },
  // Q53 — Word class
  {
    stem: "In the sentence 'However, the results were encouraging', what type of word is 'however'?",
    options: ["conjunction", "preposition", "adverb", "adjective", "pronoun"],
    correctIndex: 2,
    explanation:
      "'However' is a conjunctive adverb -- it modifies the whole sentence and shows contrast with a previous idea.",
    difficulty: 4,
    topic: "grammar and punctuation",
  },
  // Q54 — Punctuation (embedded clause with dashes)
  {
    stem: "Which sentence is punctuated correctly?",
    options: [
      "The painting - a masterpiece from the 1800s was sold at auction.",
      "The painting, a masterpiece from the 1800s - was sold at auction.",
      "The painting -- a masterpiece from the 1800s -- was sold at auction.",
      "The painting a masterpiece -- from the 1800s was sold at auction.",
      "The -- painting a masterpiece from the 1800s -- was sold at auction.",
    ],
    correctIndex: 2,
    explanation:
      "Dashes (or em-dashes) must come in pairs when used to set off a parenthetical phrase within a sentence.",
    difficulty: 4,
    topic: "grammar and punctuation",
  },
  // Q55 — Grammar (who/which)
  {
    stem: "Which sentence uses correct grammar?",
    options: [
      "The dog who was barking kept us awake.",
      "The dog which was barking kept us awake.",
      "The dog whom was barking kept us awake.",
      "The dog whose was barking kept us awake.",
      "The dog what was barking kept us awake.",
    ],
    correctIndex: 1,
    explanation:
      "'Which' is used for animals and things. 'Who' is reserved for people in formal grammar, though informally 'who' is sometimes used for pets.",
    difficulty: 4,
    topic: "grammar and punctuation",
  },
  // Q56 — Punctuation (apostrophe with irregular plural)
  {
    stem: "Which sentence is punctuated correctly?",
    options: [
      "The womens' changing room is upstairs.",
      "The women's changing room is upstairs.",
      "The womens changing room is upstairs.",
      "The women changing room's is upstairs.",
      "The womens's changing room is upstairs.",
    ],
    correctIndex: 1,
    explanation:
      "'Women' is already plural (like 'children'), so we add apostrophe-s: women's.",
    difficulty: 4,
    topic: "grammar and punctuation",
  },
  // Q57 — Grammar (subjunctive mood)
  {
    stem: "Which sentence uses correct grammar?",
    options: [
      "The teacher insisted that he studies harder.",
      "The teacher insisted that he study harder.",
      "The teacher insisted that he studied harder.",
      "The teacher insisted that he studying harder.",
      "The teacher insisted that he to study harder.",
    ],
    correctIndex: 1,
    explanation:
      "After verbs of demand or insistence, the subjunctive mood uses the base form of the verb: 'that he study' (not 'studies' or 'studied').",
    difficulty: 4,
    topic: "grammar and punctuation",
  },
  // Q58 — Word class
  {
    stem: "In the sentence 'Running is excellent exercise', what type of word is 'running'?",
    options: ["noun", "verb", "adjective", "adverb", "preposition"],
    correctIndex: 0,
    explanation:
      "Here 'running' is a gerund -- a verb form used as a noun. It is the subject of the sentence.",
    difficulty: 4,
    topic: "grammar and punctuation",
  },
  // Q59 — Punctuation (comma before conjunction in compound sentence)
  {
    stem: "Which sentence is punctuated correctly?",
    options: [
      "The sun was setting and the air grew cold.",
      "The sun was setting, and the air grew cold.",
      "The sun, was setting and the air grew cold.",
      "The sun was setting and, the air grew cold.",
      "The sun was, setting, and the air grew cold.",
    ],
    correctIndex: 1,
    explanation:
      "When two independent clauses are joined by a coordinating conjunction (and, but, so), a comma goes before the conjunction.",
    difficulty: 4,
    topic: "grammar and punctuation",
  },
  // Q60 — Grammar (further/farther)
  {
    stem: "Which sentence uses correct grammar?",
    options: [
      "We need to discuss this further.",
      "We need to discuss this farther.",
      "We need to discuss this more further.",
      "We need to discuss this more farther.",
      "We need to discuss this farthest.",
    ],
    correctIndex: 0,
    explanation:
      "'Further' is used for figurative or non-physical distance (like a discussion). 'Farther' is used for physical distance.",
    difficulty: 4,
    topic: "grammar and punctuation",
  },
  // Q61 — Punctuation (restrictive vs non-restrictive clause)
  {
    stem: "Which sentence is punctuated correctly?",
    options: [
      "Students, who cheat, will be punished.",
      "Students who cheat will be punished.",
      "Students who cheat, will be punished.",
      "Students, who cheat will be punished.",
      "Students who, cheat will be punished.",
    ],
    correctIndex: 1,
    explanation:
      "'Who cheat' is a restrictive (defining) clause -- it specifies which students. Restrictive clauses do not have commas. With commas, it would mean all students cheat.",
    difficulty: 4,
    topic: "grammar and punctuation",
  },
  // Q62 — Grammar (split infinitive awareness)
  {
    stem: "Which sentence uses the most formal grammar?",
    options: [
      "She decided to quickly finish her homework.",
      "She decided to finish quickly her homework.",
      "She decided quickly to finish her homework.",
      "She decided to finish her homework quickly.",
      "She quickly decided to finish her homework.",
    ],
    correctIndex: 3,
    explanation:
      "In formal writing, the adverb is best placed at the end rather than splitting the infinitive 'to finish'. 'To finish her homework quickly' avoids the split infinitive.",
    difficulty: 4,
    topic: "grammar and punctuation",
  },
  // Q63 — Word class
  {
    stem: "In the sentence 'The allegedly stolen painting was recovered', what type of word is 'allegedly'?",
    options: ["noun", "verb", "adjective", "adverb", "preposition"],
    correctIndex: 3,
    explanation:
      "'Allegedly' is an adverb modifying the adjective 'stolen'. It tells us to what degree the theft is claimed.",
    difficulty: 4,
    topic: "grammar and punctuation",
  },
  // Q64 — Punctuation (ellipsis)
  {
    stem: "Which sentence uses the ellipsis correctly?",
    options: [
      "She opened the door and... screamed.",
      "She opened the door and. screamed.",
      "She opened... the door and screamed.",
      "She...opened the door and screamed.",
      "She opened the door...and, screamed.",
    ],
    correctIndex: 0,
    explanation:
      "An ellipsis (...) shows a pause, hesitation, or trailing off. Placing it before 'screamed' creates dramatic suspense.",
    difficulty: 4,
    topic: "grammar and punctuation",
  },
  // Q65 — Grammar (whom in formal context)
  {
    stem: "Which sentence uses correct grammar?",
    options: [
      "The teacher who I spoke to was helpful.",
      "The teacher whom I spoke to was helpful.",
      "The teacher whom spoke to me was helpful.",
      "The teacher to who I spoke was helpful.",
      "The teacher who to I spoke was helpful.",
    ],
    correctIndex: 1,
    explanation:
      "'Whom' is correct because the teacher is the object of 'spoke to'. You spoke to her/him (object), so use 'whom'.",
    difficulty: 4,
    topic: "grammar and punctuation",
  },
  // Q66 — Punctuation (speech with question)
  {
    stem: "Which sentence is punctuated correctly?",
    options: [
      "\"Where are you going\"? asked Mum.",
      "\"Where are you going?\" asked Mum.",
      "\"Where are you going?\" Asked Mum.",
      "\"Where are you going,\" asked Mum?",
      "Where are you going? \"asked Mum.\"",
    ],
    correctIndex: 1,
    explanation:
      "The question mark goes inside the speech marks because the spoken words are a question. 'Asked' has a lowercase 'a' because it continues the sentence.",
    difficulty: 4,
    topic: "grammar and punctuation",
  },
  // Q67 — Grammar (misplaced modifier)
  {
    stem: "Which sentence places the modifier correctly?",
    options: [
      "She almost drove her car for two hundred miles.",
      "She drove her car for almost two hundred miles.",
      "Almost she drove her car for two hundred miles.",
      "She drove almost her car for two hundred miles.",
      "She drove her almost car for two hundred miles.",
    ],
    correctIndex: 1,
    explanation:
      "'Almost' should be placed next to what it modifies. She drove nearly 200 miles (not 'she almost drove' which would mean she nearly drove but didn't).",
    difficulty: 4,
    topic: "grammar and punctuation",
  },
  // Q68 — Word class
  {
    stem: "In the sentence 'She danced gracefully across the stage', what type of word is 'across'?",
    options: ["noun", "verb", "adjective", "adverb", "preposition"],
    correctIndex: 4,
    explanation:
      "'Across' is a preposition showing the relationship between the dancing and the stage -- it tells us where she danced.",
    difficulty: 4,
    topic: "grammar and punctuation",
  },
  // Q69 — Punctuation (comma after introductory phrase)
  {
    stem: "Which sentence is punctuated correctly?",
    options: [
      "To be honest I think we should go home.",
      "To be honest, I think we should go home.",
      "To be, honest I think we should go home.",
      "To, be honest I think we should go home.",
      "To be honest I think, we should go home.",
    ],
    correctIndex: 1,
    explanation:
      "An introductory phrase like 'To be honest' is separated from the main clause with a comma.",
    difficulty: 4,
    topic: "grammar and punctuation",
  },
  // Q70 — Grammar (shall/will)
  {
    stem: "In formal British English, which sentence is traditionally correct?",
    options: [
      "I will be there at eight o'clock.",
      "I shall be there at eight o'clock.",
      "I should be there at eight o'clock.",
      "I can be there at eight o'clock.",
      "I may be there at eight o'clock.",
    ],
    correctIndex: 1,
    explanation:
      "In traditional British English, 'shall' is used with 'I' and 'we' for simple future, while 'will' is used with other pronouns.",
    difficulty: 4,
    topic: "grammar and punctuation",
  },
  // Q71 — Punctuation (colon vs semicolon)
  {
    stem: "Which sentence is punctuated correctly?",
    options: [
      "She had two options; stay or leave.",
      "She had two options: stay or leave.",
      "She had two options, stay or leave.",
      "She had two options. Stay or leave.",
      "She had, two options: stay or leave.",
    ],
    correctIndex: 1,
    explanation:
      "A colon is used to introduce a list or explanation after a complete clause. The semicolon is for joining two independent clauses.",
    difficulty: 4,
    topic: "grammar and punctuation",
  },
  // Q72 — Grammar (neither...nor)
  {
    stem: "Which sentence uses correct grammar?",
    options: [
      "Neither the teacher or the students were happy.",
      "Neither the teacher nor the students were happy.",
      "Neither the teacher nor the students was happy.",
      "Neither the teacher or the students was happy.",
      "Neither the teacher and the students were happy.",
    ],
    correctIndex: 1,
    explanation:
      "'Neither' pairs with 'nor' (not 'or'). The verb agrees with the nearest subject: 'students' is plural, so 'were' is correct.",
    difficulty: 4,
    topic: "grammar and punctuation",
  },
  // Q73 — Word class
  {
    stem: "In the sentence 'The thoroughly exhausted runner collapsed', what type of word is 'thoroughly'?",
    options: ["noun", "verb", "adjective", "adverb", "preposition"],
    correctIndex: 3,
    explanation:
      "'Thoroughly' is an adverb modifying the adjective 'exhausted'. It describes the degree of exhaustion.",
    difficulty: 4,
    topic: "grammar and punctuation",
  },
  // Q74 — Punctuation (inverted commas for titles)
  {
    stem: "Which sentence is punctuated correctly?",
    options: [
      "We read the poem The Highwayman in class.",
      "We read the poem 'The Highwayman' in class.",
      "We read the poem, The Highwayman, in class.",
      "We read 'the poem The Highwayman' in class.",
      "We read the poem The 'Highwayman' in class.",
    ],
    correctIndex: 1,
    explanation:
      "Titles of poems, songs, and short works are enclosed in inverted commas (quotation marks).",
    difficulty: 4,
    topic: "grammar and punctuation",
  },
  // Q75 — Grammar (preposition at end of sentence)
  {
    stem: "Which sentence uses the most formal grammar?",
    options: [
      "Where did you come from?",
      "From where did you come?",
      "Where from did you come?",
      "Did you come from where?",
      "Where did from you come?",
    ],
    correctIndex: 1,
    explanation:
      "In very formal English, prepositions should not end a sentence. 'From where did you come?' places the preposition before 'where'.",
    difficulty: 4,
    topic: "grammar and punctuation",
  },
  // Q76 — Punctuation (possessive of name ending in s)
  {
    stem: "Which sentence is punctuated correctly when showing that the book belongs to James?",
    options: [
      "James book was on the table.",
      "Jame's book was on the table.",
      "James' book was on the table.",
      "James's book was on the table.",
      "Jame,s book was on the table.",
    ],
    correctIndex: 3,
    explanation:
      "For singular nouns ending in 's', we add apostrophe-s: James's. While 'James'' is sometimes accepted, 'James's' is the standard modern British English form.",
    difficulty: 4,
    topic: "grammar and punctuation",
  },
  // Q77 — Grammar (may/might)
  {
    stem: "Which sentence uses correct grammar for a past possibility that did not happen?",
    options: [
      "She may have missed the bus.",
      "She might have missed the bus.",
      "She can have missed the bus.",
      "She should have missed the bus.",
      "She will have missed the bus.",
    ],
    correctIndex: 1,
    explanation:
      "'Might have' is used for past possibilities, especially when the outcome is uncertain or did not happen. 'May have' suggests it is still a current possibility.",
    difficulty: 4,
    topic: "grammar and punctuation",
  },
  // Q78 — Word class
  {
    stem: "In the sentence 'Both teams played well', what type of word is 'both'?",
    options: ["determiner", "verb", "adjective", "adverb", "preposition"],
    correctIndex: 0,
    explanation:
      "'Both' is a determiner (also called a predeterminer) because it specifies which teams -- it comes before the noun phrase 'teams'.",
    difficulty: 4,
    topic: "grammar and punctuation",
  },
  // Q79 — Grammar (than/then)
  {
    stem: "Which sentence uses correct grammar?",
    options: [
      "She is older then her brother.",
      "She is older than her brother.",
      "She is more older than her brother.",
      "She is more old then her brother.",
      "She is oldest than her brother.",
    ],
    correctIndex: 1,
    explanation:
      "'Than' is used for comparisons. 'Then' refers to time. 'She is older than her brother' is the correct comparison.",
    difficulty: 4,
    topic: "grammar and punctuation",
  },
  // Q80 — Punctuation (bullet/list colon usage)
  {
    stem: "Which sentence is punctuated correctly?",
    options: [
      "The recipe needs: flour, eggs and sugar.",
      "The recipe needs, flour, eggs, and sugar.",
      "The recipe needs; flour, eggs, and sugar.",
      "The recipe needs flour, eggs, and sugar.",
      "The recipe, needs flour, eggs, and sugar.",
    ],
    correctIndex: 3,
    explanation:
      "A colon should not follow a verb directly. 'The recipe needs flour, eggs, and sugar' is correct without any colon.",
    difficulty: 4,
    topic: "grammar and punctuation",
  },

  /* ================================================================== */
  /*  DIFFICULTY 5  (20 questions)                                       */
  /* ================================================================== */

  // Q81 — Punctuation (complex sentence with multiple clauses)
  {
    stem: "Which sentence is punctuated correctly?",
    options: [
      "The teacher, who had been at the school for years retired last week.",
      "The teacher who had been at the school for years, retired last week.",
      "The teacher, who had been at the school for years, retired last week.",
      "The teacher who, had been at the school for years retired last week.",
      "The teacher who had been, at the school for years retired last week.",
    ],
    correctIndex: 2,
    explanation:
      "The non-restrictive clause 'who had been at the school for years' is extra information and must be enclosed by commas on both sides.",
    difficulty: 5,
    topic: "grammar and punctuation",
  },
  // Q82 — Grammar (subjunctive in formal writing)
  {
    stem: "Which sentence uses correct formal grammar?",
    options: [
      "It is essential that every student hands in their work.",
      "It is essential that every student hand in their work.",
      "It is essential that every student handing in their work.",
      "It is essential that every student to hand in their work.",
      "It is essential every student hands in their work.",
    ],
    correctIndex: 1,
    explanation:
      "The subjunctive mood is used after 'It is essential that...' -- the verb stays in the base form 'hand' regardless of the subject.",
    difficulty: 5,
    topic: "grammar and punctuation",
  },
  // Q83 — Word class
  {
    stem: "In the sentence 'Astonishingly, nobody was injured', what type of word is 'astonishingly'?",
    options: ["noun", "verb", "adjective", "adverb", "conjunction"],
    correctIndex: 3,
    explanation:
      "'Astonishingly' is a sentence adverb (also called a comment adverb). It modifies the entire clause, expressing the speaker's surprise.",
    difficulty: 5,
    topic: "grammar and punctuation",
  },
  // Q84 — Punctuation (semicolon with conjunctive adverb)
  {
    stem: "Which sentence is punctuated correctly?",
    options: [
      "The test was difficult, however, most students passed.",
      "The test was difficult however most students passed.",
      "The test was difficult; however, most students passed.",
      "The test was difficult however; most students passed.",
      "The test; was difficult, however most students passed.",
    ],
    correctIndex: 2,
    explanation:
      "When a conjunctive adverb ('however') joins two independent clauses, place a semicolon before it and a comma after it.",
    difficulty: 5,
    topic: "grammar and punctuation",
  },
  // Q85 — Grammar (correlative conjunctions)
  {
    stem: "Which sentence uses correct grammar?",
    options: [
      "Not only did she win the race, but she also broke the record.",
      "Not only she won the race, but she also broke the record.",
      "Not only did she win the race, and she also broke the record.",
      "Not only did she win the race, she also broke the record.",
      "Not only she did win the race, but also she broke the record.",
    ],
    correctIndex: 0,
    explanation:
      "'Not only...but also' is a correlative conjunction pair. After 'not only' at the start, the subject and auxiliary verb invert: 'did she win'.",
    difficulty: 5,
    topic: "grammar and punctuation",
  },
  // Q86 — Punctuation (speech within speech)
  {
    stem: "Which sentence is punctuated correctly?",
    options: [
      "She said, \"My teacher told me, 'Always try your best.'\"",
      "She said, \"My teacher told me, \"Always try your best.\"\"",
      "She said, 'My teacher told me, 'Always try your best.''",
      "She said \"My teacher told me 'Always try your best.'\"",
      "She said, \"My teacher told me, 'Always try your best'.\"",
    ],
    correctIndex: 0,
    explanation:
      "When there is speech within speech, use double inverted commas for the outer speech and single inverted commas for the inner speech.",
    difficulty: 5,
    topic: "grammar and punctuation",
  },
  // Q87 — Grammar (inversion for emphasis)
  {
    stem: "Which sentence uses correct grammar with inverted word order for emphasis?",
    options: [
      "Never I have seen such a beautiful sunset.",
      "Never have I seen such a beautiful sunset.",
      "Never I had seen such a beautiful sunset.",
      "Never seen I have such a beautiful sunset.",
      "Never having I seen such a beautiful sunset.",
    ],
    correctIndex: 1,
    explanation:
      "When a negative adverb ('never') begins a sentence for emphasis, the subject and auxiliary verb invert: 'have I' instead of 'I have'.",
    difficulty: 5,
    topic: "grammar and punctuation",
  },
  // Q88 — Word class
  {
    stem: "In the sentence 'Having finished the exam, the students celebrated', what type of word is 'having'?",
    options: ["auxiliary verb", "participle", "gerund", "noun", "preposition"],
    correctIndex: 1,
    explanation:
      "'Having' is a present participle used to form a participial phrase ('Having finished the exam') that acts as an adverbial modifier.",
    difficulty: 5,
    topic: "grammar and punctuation",
  },
  // Q89 — Punctuation (dash vs parentheses)
  {
    stem: "Which sentence correctly uses dashes for a parenthetical aside?",
    options: [
      "The exam -- which lasted three hours was extremely difficult.",
      "The exam -- which lasted three hours -- was extremely difficult.",
      "The exam which -- lasted three hours -- was extremely difficult.",
      "-- The exam which lasted three hours -- was extremely difficult.",
      "The exam which lasted -- three hours was -- extremely difficult.",
    ],
    correctIndex: 1,
    explanation:
      "Dashes used for parenthetical information must come in pairs, enclosing the aside: '-- which lasted three hours --'.",
    difficulty: 5,
    topic: "grammar and punctuation",
  },
  // Q90 — Grammar (cleft sentence)
  {
    stem: "Which sentence uses correct grammar in a cleft construction?",
    options: [
      "It was the goalkeeper which saved the match.",
      "It was the goalkeeper who saved the match.",
      "It was the goalkeeper whom saved the match.",
      "It was the goalkeeper whose saved the match.",
      "It was the goalkeeper what saved the match.",
    ],
    correctIndex: 1,
    explanation:
      "In a cleft sentence ('It was X who/that...'), use 'who' for people because the goalkeeper is the subject of 'saved'.",
    difficulty: 5,
    topic: "grammar and punctuation",
  },
  // Q91 — Punctuation (academic use of colon)
  {
    stem: "Which sentence is punctuated correctly?",
    options: [
      "The evidence suggests one conclusion, the experiment was flawed.",
      "The evidence suggests one conclusion: the experiment was flawed.",
      "The evidence suggests one conclusion; the experiment was flawed.",
      "The evidence suggests: one conclusion the experiment was flawed.",
      "The evidence: suggests one conclusion the experiment was flawed.",
    ],
    correctIndex: 1,
    explanation:
      "A colon follows a complete statement and introduces an explanation or conclusion. The first clause is complete, and the colon introduces the finding.",
    difficulty: 5,
    topic: "grammar and punctuation",
  },
  // Q92 — Grammar (past perfect vs simple past)
  {
    stem: "Which sentence uses correct grammar?",
    options: [
      "When we arrived, the film already started.",
      "When we arrived, the film has already started.",
      "When we arrived, the film had already started.",
      "When we arrived, the film already starts.",
      "When we arrived, the film have already started.",
    ],
    correctIndex: 2,
    explanation:
      "The past perfect ('had started') is used for an action completed before another past action ('arrived').",
    difficulty: 5,
    topic: "grammar and punctuation",
  },
  // Q93 — Word class
  {
    stem: "In the sentence 'The above information is confidential', what type of word is 'above'?",
    options: ["noun", "verb", "adjective", "adverb", "preposition"],
    correctIndex: 2,
    explanation:
      "Here 'above' is used as an adjective modifying the noun 'information'. It means 'the information mentioned earlier'.",
    difficulty: 5,
    topic: "grammar and punctuation",
  },
  // Q94 — Punctuation (complex list with semicolons)
  {
    stem: "Which sentence is punctuated correctly?",
    options: [
      "We visited Paris, France, Rome, Italy, and Berlin, Germany.",
      "We visited Paris, France; Rome, Italy; and Berlin, Germany.",
      "We visited Paris; France, Rome; Italy, and Berlin; Germany.",
      "We visited Paris France; Rome Italy; and Berlin Germany.",
      "We visited: Paris, France; Rome, Italy; Berlin, Germany.",
    ],
    correctIndex: 1,
    explanation:
      "When list items themselves contain commas, semicolons are used to separate the items to avoid confusion.",
    difficulty: 5,
    topic: "grammar and punctuation",
  },
  // Q95 — Grammar (reported speech backshift)
  {
    stem: "Which sentence correctly converts direct to reported speech? Direct: 'I am feeling ill.'",
    options: [
      "She said that she is feeling ill.",
      "She said that she was feeling ill.",
      "She said that she has been feeling ill.",
      "She said that she were feeling ill.",
      "She said that she feeling ill.",
    ],
    correctIndex: 1,
    explanation:
      "In reported speech, the tense shifts back. 'Am feeling' (present continuous) becomes 'was feeling' (past continuous).",
    difficulty: 5,
    topic: "grammar and punctuation",
  },
  // Q96 — Punctuation (possessive of compound noun)
  {
    stem: "Which phrase is punctuated correctly to show the office belongs to the editor-in-chief?",
    options: [
      "the editor's-in-chief office",
      "the editor-in-chief's office",
      "the editor-in-chiefs' office",
      "the editors-in-chief's office",
      "the editor-in-chief office's",
    ],
    correctIndex: 1,
    explanation:
      "For compound nouns, the possessive apostrophe-s goes at the end of the whole compound: editor-in-chief's.",
    difficulty: 5,
    topic: "grammar and punctuation",
  },
  // Q97 — Grammar (conditional type 3)
  {
    stem: "Which sentence uses correct grammar for a past hypothetical?",
    options: [
      "If I would have known, I would have helped.",
      "If I had known, I would have helped.",
      "If I knew, I would have helped.",
      "If I have known, I would had helped.",
      "If I had knew, I would have helped.",
    ],
    correctIndex: 1,
    explanation:
      "The third conditional uses 'If + past perfect, would have + past participle': 'If I had known, I would have helped.'",
    difficulty: 5,
    topic: "grammar and punctuation",
  },
  // Q98 — Word class
  {
    stem: "In the sentence 'That she won surprised everyone', what type of word is 'that'?",
    options: ["pronoun", "determiner", "conjunction", "adverb", "preposition"],
    correctIndex: 2,
    explanation:
      "Here 'that' is a subordinating conjunction introducing a noun clause ('that she won') which acts as the subject of the sentence.",
    difficulty: 5,
    topic: "grammar and punctuation",
  },
  // Q99 — Grammar (avoiding ambiguity)
  {
    stem: "Which sentence avoids ambiguity?",
    options: [
      "I saw the man with the telescope.",
      "Using the telescope, I saw the man.",
      "The man I saw had the telescope.",
      "I saw, with the telescope, the man.",
      "With the telescope I saw the man.",
    ],
    correctIndex: 1,
    explanation:
      "'I saw the man with the telescope' is ambiguous -- who has the telescope? 'Using the telescope, I saw the man' makes it clear that I am using the telescope.",
    difficulty: 5,
    topic: "grammar and punctuation",
  },
  // Q100 — Punctuation (semicolon for balanced clauses)
  {
    stem: "Which sentence is punctuated correctly?",
    options: [
      "Some people learn by reading, others learn by doing.",
      "Some people learn by reading; others learn by doing.",
      "Some people learn by reading: others learn by doing.",
      "Some people learn by reading others learn by doing.",
      "Some people learn; by reading others learn by doing.",
    ],
    correctIndex: 1,
    explanation:
      "A semicolon is perfect for joining two balanced, contrasting independent clauses without a conjunction.",
    difficulty: 5,
    topic: "grammar and punctuation",
  },
];
