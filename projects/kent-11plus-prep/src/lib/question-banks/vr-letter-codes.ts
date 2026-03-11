import type { BankedQuestion } from "./types";

/* ------------------------------------------------------------------ */
/*  Letter Codes & Cyphers — 100 verified questions                   */
/*  Each question verified letter-by-letter before inclusion          */
/* ------------------------------------------------------------------ */

export const BANK: BankedQuestion[] = [
  /* =================================================================
     DIFFICULTY 1 — Simple +1 or -1 shift (10 questions, Q1-Q10)
     ================================================================= */

  // Q1: +1 shift. CAT→DBU, DOG→EPH
  {
    stem: "If CAT is coded as DBU, what is the code for DOG?",
    options: ["EPH", "CPF", "EOH", "EPG", "FQI"],
    correctIndex: 0,
    explanation: "Each letter moves forward by 1. D→E, O→P, G→H gives EPH.",
    difficulty: 1,
    topic: "letter codes and cyphers",
  },

  // Q2: +1 shift. BIG→CJH, RUN→SVO
  {
    stem: "If BIG is coded as CJH, what is the code for RUN?",
    options: ["SVO", "QTM", "SVN", "TWP", "SUO"],
    correctIndex: 0,
    explanation: "Each letter moves forward by 1. R→S, U→V, N→O gives SVO.",
    difficulty: 1,
    topic: "letter codes and cyphers",
  },

  // Q3: -1 shift. SUN→RTM, MAP→LZO
  {
    stem: "If SUN is coded as RTM, what is the code for MAP?",
    options: ["LZO", "NAQ", "LBO", "KYN", "MZP"],
    correctIndex: 0,
    explanation: "Each letter moves back by 1. M→L, A→Z, P→O gives LZO.",
    difficulty: 1,
    topic: "letter codes and cyphers",
  },

  // Q4: +1 shift. PEN→QFO, CUP→DVQ
  {
    stem: "If PEN is coded as QFO, what is the code for CUP?",
    options: ["DVQ", "BTO", "DWQ", "EVR", "DUP"],
    correctIndex: 0,
    explanation: "Each letter moves forward by 1. C→D, U→V, P→Q gives DVQ.",
    difficulty: 1,
    topic: "letter codes and cyphers",
  },

  // Q5: -1 shift. RED→QDC, BOX→ANW
  {
    stem: "If RED is coded as QDC, what is the code for BOX?",
    options: ["ANW", "CPY", "AMW", "ANX", "BOW"],
    correctIndex: 0,
    explanation: "Each letter moves back by 1. B→A, O→N, X→W gives ANW.",
    difficulty: 1,
    topic: "letter codes and cyphers",
  },

  // Q6: +1 shift. HAT→IBU, JAM→KBN
  {
    stem: "If HAT is coded as IBU, what is the code for JAM?",
    options: ["KBN", "IZL", "KCN", "LCO", "KBM"],
    correctIndex: 0,
    explanation: "Each letter moves forward by 1. J→K, A→B, M→N gives KBN.",
    difficulty: 1,
    topic: "letter codes and cyphers",
  },

  // Q7: -1 shift. FIG→EHF, TOP→SNO
  {
    stem: "If FIG is coded as EHF, what is the code for TOP?",
    options: ["SNO", "UPQ", "SMO", "SNN", "TNO"],
    correctIndex: 0,
    explanation: "Each letter moves back by 1. T→S, O→N, P→O gives SNO.",
    difficulty: 1,
    topic: "letter codes and cyphers",
  },

  // Q8: +1 shift. NET→OFU, WAX→XBY
  {
    stem: "If NET is coded as OFU, what is the code for WAX?",
    options: ["XBY", "VZW", "XCY", "YCZ", "XBX"],
    correctIndex: 0,
    explanation: "Each letter moves forward by 1. W→X, A→B, X→Y gives XBY.",
    difficulty: 1,
    topic: "letter codes and cyphers",
  },

  // Q9: -1 shift. BUS→ATR, PIG→OHF
  {
    stem: "If BUS is coded as ATR, what is the code for PIG?",
    options: ["OHF", "QJH", "OGF", "OHG", "NHE"],
    correctIndex: 0,
    explanation: "Each letter moves back by 1. P→O, I→H, G→F gives OHF.",
    difficulty: 1,
    topic: "letter codes and cyphers",
  },

  // Q10: +1 shift. TIN→UJO, FAN→GBO
  {
    stem: "If TIN is coded as UJO, what is the code for FAN?",
    options: ["GBO", "EZM", "GCO", "HCP", "GBN"],
    correctIndex: 0,
    explanation: "Each letter moves forward by 1. F→G, A→B, N→O gives GBO.",
    difficulty: 1,
    topic: "letter codes and cyphers",
  },

  /* =================================================================
     DIFFICULTY 2 — +2 or -2 shift (15 questions, Q11-Q25)
     ================================================================= */

  // Q11: +2 shift. CAR→ECT, BUS→DWU
  {
    stem: "If CAR is coded as ECT, what is the code for BUS?",
    options: ["DWU", "DXU", "CVT", "DWV", "EXV"],
    correctIndex: 0,
    explanation: "Each letter moves forward by 2. B→D, U→W, S→U gives DWU.",
    difficulty: 2,
    topic: "letter codes and cyphers",
  },

  // Q12: -2 shift. DOG→BME, HEN→FCL
  {
    stem: "If DOG is coded as BME, what is the code for HEN?",
    options: ["FCL", "JGP", "FDL", "GDM", "ECK"],
    correctIndex: 0,
    explanation: "Each letter moves back by 2. H→F, E→C, N→L gives FCL.",
    difficulty: 2,
    topic: "letter codes and cyphers",
  },

  // Q13: +2 shift. SIT→UKV, PAN→RCP
  {
    stem: "If SIT is coded as UKV, what is the code for PAN?",
    options: ["RCP", "NAL", "RDP", "SCQ", "RCO"],
    correctIndex: 0,
    explanation: "Each letter moves forward by 2. P→R, A→C, N→P gives RCP.",
    difficulty: 2,
    topic: "letter codes and cyphers",
  },

  // Q14: -2 shift. JUMP→HSKN, FISH→DGQF
  {
    stem: "If JUMP is coded as HSKN, what is the code for FISH?",
    options: ["DGQF", "HKUJ", "DHQF", "DGRF", "DGQG"],
    correctIndex: 0,
    explanation: "Each letter moves back by 2. F→D, I→G, S→Q, H→F gives DGQF.",
    difficulty: 2,
    topic: "letter codes and cyphers",
  },

  // Q15: +2 shift. FROG→HTQI, DUCK→FWEM
  {
    stem: "If FROG is coded as HTQI, what is the code for DUCK?",
    options: ["FWEM", "BSAI", "FXEM", "GWFN", "FWEN"],
    correctIndex: 0,
    explanation: "Each letter moves forward by 2. D→F, U→W, C→E, K→M gives FWEM.",
    difficulty: 2,
    topic: "letter codes and cyphers",
  },

  // Q16: +2 shift. LAMP→NCOR, DESK→FGUM
  {
    stem: "If LAMP is coded as NCOR, what is the code for DESK?",
    options: ["FGUM", "BCSQ", "FHUM", "FGVN", "GFUM"],
    correctIndex: 0,
    explanation: "Each letter moves forward by 2. D→F, E→G, S→U, K→M gives FGUM.",
    difficulty: 2,
    topic: "letter codes and cyphers",
  },

  // Q17: -2 shift. CAKE→AYIC, BELL→ZCJJ
  {
    stem: "If CAKE is coded as AYIC, what is the code for BELL?",
    options: ["ZCJJ", "DGJJ", "ZCKJ", "ZCJK", "YBJJ"],
    correctIndex: 0,
    explanation: "Each letter moves back by 2. B→Z, E→C, L→J, L→J gives ZCJJ.",
    difficulty: 2,
    topic: "letter codes and cyphers",
  },

  // Q18: +2 shift. MILK→OKNM, WINE→YKPG
  {
    stem: "If MILK is coded as OKNM, what is the code for WINE?",
    options: ["YKPG", "UGLD", "YLPG", "YKQG", "YKPH"],
    correctIndex: 0,
    explanation: "Each letter moves forward by 2. W→Y, I→K, N→P, E→G gives YKPG.",
    difficulty: 2,
    topic: "letter codes and cyphers",
  },

  // Q19: -2 shift. KITE→IGRC, BOAT→ZMYR
  {
    stem: "If KITE is coded as IGRC, what is the code for BOAT?",
    options: ["ZMYR", "DQCV", "ZNYR", "ZMYS", "ZMXR"],
    correctIndex: 0,
    explanation: "Each letter moves back by 2. B→Z, O→M, A→Y, T→R gives ZMYR.",
    difficulty: 2,
    topic: "letter codes and cyphers",
  },

  // Q20: +2 shift. ROPE→TQRG, HAND→JCPF
  {
    stem: "If ROPE is coded as TQRG, what is the code for HAND?",
    options: ["JCPF", "FYLD", "JDPF", "JCQF", "JCPG"],
    correctIndex: 0,
    explanation: "Each letter moves forward by 2. H→J, A→C, N→P, D→F gives JCPF.",
    difficulty: 2,
    topic: "letter codes and cyphers",
  },

  // Q21: +2 shift. WARM→YCTO, GOLD→IQNF
  {
    stem: "If WARM is coded as YCTO, what is the code for GOLD?",
    options: ["IQNF", "EMNB", "IRNF", "IQNG", "JPOG"],
    correctIndex: 0,
    explanation: "Each letter moves forward by 2. G→I, O→Q, L→N, D→F gives IQNF.",
    difficulty: 2,
    topic: "letter codes and cyphers",
  },

  // Q22: -2 shift. STAR→QRYP, MOON→KMML
  {
    stem: "If STAR is coded as QRYP, what is the code for MOON?",
    options: ["KMML", "OQQP", "KNML", "KMNL", "KMMK"],
    correctIndex: 0,
    explanation: "Each letter moves back by 2. M→K, O→M, O→M, N→L gives KMML.",
    difficulty: 2,
    topic: "letter codes and cyphers",
  },

  // Q23: +2 shift. FERN→HGTP, VINE→XKPG
  {
    stem: "If FERN is coded as HGTP, what is the code for VINE?",
    options: ["XKPG", "TGLC", "XLPG", "XKQG", "XKPH"],
    correctIndex: 0,
    explanation: "Each letter moves forward by 2. V→X, I→K, N→P, E→G gives XKPG.",
    difficulty: 2,
    topic: "letter codes and cyphers",
  },

  // Q24: -2 shift. PLAY→NJYW, SING→QGLE
  {
    stem: "If PLAY is coded as NJYW, what is the code for SING?",
    options: ["QGLE", "UKPI", "QHLE", "QGLF", "QGLD"],
    correctIndex: 0,
    explanation: "Each letter moves back by 2. S→Q, I→G, N→L, G→E gives QGLE.",
    difficulty: 2,
    topic: "letter codes and cyphers",
  },

  // Q25: +2 shift. MINT→OKPV, LOST→NQUV
  {
    stem: "If MINT is coded as OKPV, what is the code for LOST?",
    options: ["NQUV", "JMQR", "NRUV", "NQVV", "NQUW"],
    correctIndex: 0,
    explanation: "Each letter moves forward by 2. L→N, O→Q, S→U, T→V gives NQUV.",
    difficulty: 2,
    topic: "letter codes and cyphers",
  },

  /* =================================================================
     DIFFICULTY 3 — Reverse word or +3 shift (25 questions, Q26-Q50)
     ================================================================= */

  // Q26: +3 shift. BATH→EDWK, COLD→FROG
  {
    stem: "If BATH is coded as EDWK, what is the code for COLD?",
    options: ["FROG", "FQPG", "GROG", "FROH", "FROP"],
    correctIndex: 0,
    explanation: "Each letter moves forward by 3. C→F, O→R, L→O, D→G gives FROG.",
    difficulty: 3,
    topic: "letter codes and cyphers",
  },

  // Q27: +3 shift. FISH→ILVK, JUMP→MXPS
  {
    stem: "If FISH is coded as ILVK, what is the code for JUMP?",
    options: ["MXPS", "GRJM", "MYPS", "MXPT", "MXQS"],
    correctIndex: 0,
    explanation: "Each letter moves forward by 3. J→M, U→X, M→P, P→S gives MXPS.",
    difficulty: 3,
    topic: "letter codes and cyphers",
  },

  // Q28: Reverse. STOP→POTS, DRAW→WARD
  {
    stem: "If STOP is coded as POTS, what is the code for DRAW?",
    options: ["WARD", "WRAD", "DWAR", "RAWD", "WDAR"],
    correctIndex: 0,
    explanation: "The word is reversed. DRAW reversed is WARD.",
    difficulty: 3,
    topic: "letter codes and cyphers",
  },

  // Q29: Reverse. TRAP→PART, EVIL→LIVE
  {
    stem: "If TRAP is coded as PART, what is the code for EVIL?",
    options: ["LIVE", "VILE", "LEVI", "VEIL", "VELI"],
    correctIndex: 0,
    explanation: "The word is reversed. EVIL reversed is LIVE.",
    difficulty: 3,
    topic: "letter codes and cyphers",
  },

  // Q30: Reverse. STAR→RATS, MAPS→SPAM
  {
    stem: "If STAR is coded as RATS, what is the code for MAPS?",
    options: ["SPAM", "SAMP", "PAMS", "MASH", "PASM"],
    correctIndex: 0,
    explanation: "The word is reversed. MAPS reversed is SPAM.",
    difficulty: 3,
    topic: "letter codes and cyphers",
  },

  // Q31: +3 shift. RIDE→ULGH, LAKE→ODNH
  {
    stem: "If RIDE is coded as ULGH, what is the code for LAKE?",
    options: ["ODNH", "IXYB", "OENH", "ODMH", "ODNI"],
    correctIndex: 0,
    explanation: "Each letter moves forward by 3. L→O, A→D, K→N, E→H gives ODNH.",
    difficulty: 3,
    topic: "letter codes and cyphers",
  },

  // Q32: -3 shift. PINE→MFKB, TOAD→QLXA
  {
    stem: "If PINE is coded as MFKB, what is the code for TOAD?",
    options: ["QLXA", "WRDG", "QMXA", "QLXB", "QLYA"],
    correctIndex: 0,
    explanation: "Each letter moves back by 3. T→Q, O→L, A→X, D→A gives QLXA.",
    difficulty: 3,
    topic: "letter codes and cyphers",
  },

  // Q33: Reverse. LEMON→NOMEL, MELON→NOLEM
  {
    stem: "If LEMON is coded as NOMEL, what is the code for MELON?",
    options: ["NOLEM", "MONEL", "LONEM", "NMOEL", "NOLME"],
    correctIndex: 0,
    explanation: "The word is reversed. MELON reversed is NOLEM.",
    difficulty: 3,
    topic: "letter codes and cyphers",
  },

  // Q34: +3 shift. MINT→PLQW, GLOW→JORZ
  {
    stem: "If MINT is coded as PLQW, what is the code for GLOW?",
    options: ["JORZ", "DILT", "JPRZ", "JOSZ", "JORY"],
    correctIndex: 0,
    explanation: "Each letter moves forward by 3. G→J, L→O, O→R, W→Z gives JORZ.",
    difficulty: 3,
    topic: "letter codes and cyphers",
  },

  // Q35: -3 shift. KEPT→HBMQ, GOAL→DLXI
  {
    stem: "If KEPT is coded as HBMQ, what is the code for GOAL?",
    options: ["DLXI", "JRDL", "DMXI", "DLYI", "DLXJ"],
    correctIndex: 0,
    explanation: "Each letter moves back by 3. G→D, O→L, A→X, L→I gives DLXI.",
    difficulty: 3,
    topic: "letter codes and cyphers",
  },

  // Q36: Reverse. SNAP→PANS, WOLF→FLOW
  {
    stem: "If SNAP is coded as PANS, what is the code for WOLF?",
    options: ["FLOW", "FOWL", "FWOL", "LWOF", "FLWO"],
    correctIndex: 0,
    explanation: "The word is reversed. WOLF reversed is FLOW.",
    difficulty: 3,
    topic: "letter codes and cyphers",
  },

  // Q37: +3 shift. BELL→EHOO, DRUM→GUXP
  {
    stem: "If BELL is coded as EHOO, what is the code for DRUM?",
    options: ["GUXP", "AROJ", "GVXP", "GUYP", "GUXQ"],
    correctIndex: 0,
    explanation: "Each letter moves forward by 3. D→G, R→U, U→X, M→P gives GUXP.",
    difficulty: 3,
    topic: "letter codes and cyphers",
  },

  // Q38: Reverse. PLUG→GULP, TIPS→SPIT
  {
    stem: "If PLUG is coded as GULP, what is the code for TIPS?",
    options: ["SPIT", "TSIP", "SPTI", "PITS", "STIP"],
    correctIndex: 0,
    explanation: "The word is reversed. TIPS reversed is SPIT.",
    difficulty: 3,
    topic: "letter codes and cyphers",
  },

  // Q39: +3 shift. WIND→ZLQG, PINE→SLQH
  {
    stem: "If WIND is coded as ZLQG, what is the code for PINE?",
    options: ["SLQH", "MFKB", "SMQH", "SLRH", "SLQI"],
    correctIndex: 0,
    explanation: "Each letter moves forward by 3. P→S, I→L, N→Q, E→H gives SLQH.",
    difficulty: 3,
    topic: "letter codes and cyphers",
  },

  // Q40: -3 shift. DARK→AXOH, BELT→YBIQ
  {
    stem: "If DARK is coded as AXOH, what is the code for BELT?",
    options: ["YBIQ", "EHOW", "YCIQ", "YBJQ", "YBIR"],
    correctIndex: 0,
    explanation: "Each letter moves back by 3. B→Y, E→B, L→I, T→Q gives YBIQ.",
    difficulty: 3,
    topic: "letter codes and cyphers",
  },

  // Q41: Reverse. STEP→PETS, RATS→STAR
  {
    stem: "If STEP is coded as PETS, what is the code for RATS?",
    options: ["STAR", "TARS", "SRAT", "STIR", "RAST"],
    correctIndex: 0,
    explanation: "The word is reversed. RATS reversed is STAR.",
    difficulty: 3,
    topic: "letter codes and cyphers",
  },

  // Q42: +3 shift. SAFE→VDIH, LONG→ORQJ
  {
    stem: "If SAFE is coded as VDIH, what is the code for LONG?",
    options: ["ORQJ", "ILKD", "OSQJ", "ORRJ", "ORQK"],
    correctIndex: 0,
    explanation: "Each letter moves forward by 3. L→O, O→R, N→Q, G→J gives ORQJ.",
    difficulty: 3,
    topic: "letter codes and cyphers",
  },

  // Q43: Reverse. REED→DEER, POOL→LOOP
  {
    stem: "If REED is coded as DEER, what is the code for POOL?",
    options: ["LOOP", "POLO", "OLOP", "LPOO", "OPOL"],
    correctIndex: 0,
    explanation: "The word is reversed. POOL reversed is LOOP.",
    difficulty: 3,
    topic: "letter codes and cyphers",
  },

  // Q44: -3 shift. MIST→JFPQ, ROCK→OLZH
  {
    stem: "If MIST is coded as JFPQ, what is the code for ROCK?",
    options: ["OLZH", "URFN", "OMZH", "OLZG", "OLAH"],
    correctIndex: 0,
    explanation: "Each letter moves back by 3. R→O, O→L, C→Z, K→H gives OLZH.",
    difficulty: 3,
    topic: "letter codes and cyphers",
  },

  // Q45: +3 shift. HEAP→KHDS, LIME→OLPH
  {
    stem: "If HEAP is coded as KHDS, what is the code for LIME?",
    options: ["OLPH", "IFJB", "OLQH", "OLPI", "OMPH"],
    correctIndex: 0,
    explanation: "Each letter moves forward by 3. L→O, I→L, M→P, E→H gives OLPH.",
    difficulty: 3,
    topic: "letter codes and cyphers",
  },

  // Q46: Reverse. TRAM→MART, LOOP→POOL
  {
    stem: "If TRAM is coded as MART, what is the code for LOOP?",
    options: ["POOL", "POLO", "OLOP", "LPOO", "OPLO"],
    correctIndex: 0,
    explanation: "The word is reversed. LOOP reversed is POOL.",
    difficulty: 3,
    topic: "letter codes and cyphers",
  },

  // Q47: +3 shift. VEST→YHVW, SILK→VLON
  {
    stem: "If VEST is coded as YHVW, what is the code for SILK?",
    options: ["VLON", "PFIH", "VMON", "VLPN", "VLOO"],
    correctIndex: 0,
    explanation: "Each letter moves forward by 3. S→V, I→L, L→O, K→N gives VLON.",
    difficulty: 3,
    topic: "letter codes and cyphers",
  },

  // Q48: Reverse. PAWS→SWAP, MOOD→DOOM
  {
    stem: "If PAWS is coded as SWAP, what is the code for MOOD?",
    options: ["DOOM", "MODO", "ODOM", "OMDO", "MDOO"],
    correctIndex: 0,
    explanation: "The word is reversed. MOOD reversed is DOOM.",
    difficulty: 3,
    topic: "letter codes and cyphers",
  },

  // Q49: -3 shift. JOLT→GLIQ, MELT→JBIQ
  {
    stem: "If JOLT is coded as GLIQ, what is the code for MELT?",
    options: ["JBIQ", "PHOW", "JCIQ", "JBJQ", "JBIR"],
    correctIndex: 0,
    explanation: "Each letter moves back by 3. M→J, E→B, L→I, T→Q gives JBIQ.",
    difficulty: 3,
    topic: "letter codes and cyphers",
  },

  // Q50: +3 shift. BORN→ERUQ, TALK→WDON
  {
    stem: "If BORN is coded as ERUQ, what is the code for TALK?",
    options: ["WDON", "QXIH", "WEON", "WDPN", "WDOO"],
    correctIndex: 0,
    explanation: "Each letter moves forward by 3. T→W, A→D, L→O, K→N gives WDON.",
    difficulty: 3,
    topic: "letter codes and cyphers",
  },

  /* =================================================================
     DIFFICULTY 4 — Reverse+shift, alternating, or +4/+5 (30 questions, Q51-Q80)
     ================================================================= */

  // Q51: Reverse then +1. BOAT rev=TAOB, +1=UBPC. SAND rev=DNAS, +1=EOBT
  {
    stem: "If BOAT is coded as UBPC and FROG is coded as HPSG, what is the code for SAND?",
    options: ["EOBT", "EOBS", "DNAS", "DOBT", "EOBU"],
    correctIndex: 0,
    explanation: "Reverse the word (SAND→DNAS), then shift +1: D→E, N→O, A→B, S→T gives EOBT.",
    difficulty: 4,
    topic: "letter codes and cyphers",
  },

  // Q52: Alternating +1/+2. Pos1+1, Pos2+2, Pos3+1, Pos4+2.
  // BATH: B+1=C, A+2=C, T+1=U, H+2=J → CCUJ. HELP: H+1=I, E+2=G, L+1=M, P+2=R → IGMR.
  {
    stem: "If BATH is coded as CCUJ and MIND is coded as NKOF, what is the code for HELP?",
    options: ["IGMR", "IGMP", "IFMR", "IHLR", "IGNR"],
    correctIndex: 0,
    explanation: "Odd positions shift +1, even positions shift +2. H+1=I, E+2=G, L+1=M, P+2=R gives IGMR.",
    difficulty: 4,
    topic: "letter codes and cyphers",
  },

  // Q53: Reverse then +2. STOP rev=POTS, +2=RQVU. FISH rev=HSIF, +2=JUKH.
  {
    stem: "If STOP is coded as RQVU and LAMP is coded as ROCN, what is the code for FISH?",
    options: ["JUKH", "JVKH", "JUKI", "KUKH", "JULH"],
    correctIndex: 0,
    explanation: "Reverse the word (FISH→HSIF), then shift +2: H→J, S→U, I→K, F→H gives JUKH.",
    difficulty: 4,
    topic: "letter codes and cyphers",
  },

  // Q54: Alternating +1/+2. FROG: F+1=G, R+2=T, O+1=P, G+2=I → GTPI. WIND: W+1=X, I+2=K, N+1=O, D+2=F → XKOF.
  {
    stem: "If FROG is coded as GTPI and DESK is coded as EGTM, what is the code for WIND?",
    options: ["XKOF", "XJOF", "XKPF", "WKOF", "XKOG"],
    correctIndex: 0,
    explanation: "Odd positions shift +1, even positions shift +2. W+1=X, I+2=K, N+1=O, D+2=F gives XKOF.",
    difficulty: 4,
    topic: "letter codes and cyphers",
  },

  // Q55: Reverse then +1. TREE rev=EERT, +1=FFSU. GOLD rev=DLOG, +1=EMPH.
  {
    stem: "If TREE is coded as FFSU and PLAN is coded as OBMQ, what is the code for GOLD?",
    options: ["EMPH", "EMPI", "ENPH", "ELPG", "EMPG"],
    correctIndex: 0,
    explanation: "Reverse the word (GOLD→DLOG), then shift +1: D→E, L→M, O→P, G→H gives EMPH.",
    difficulty: 4,
    topic: "letter codes and cyphers",
  },

  // Q56: Alternating +2/+1. Pos1+2, Pos2+1, Pos3+2, Pos4+1.
  // KITE: K+2=M, I+1=J, T+2=V, E+1=F → MJVF. DUCK: D+2=F, U+1=V, C+2=E, K+1=L → FVEL.
  {
    stem: "If KITE is coded as MJVF and ROCK is coded as TPEL, what is the code for DUCK?",
    options: ["FVEL", "FUEL", "FVFL", "GVEL", "FVEM"],
    correctIndex: 0,
    explanation: "Odd positions shift +2, even positions shift +1. D+2=F, U+1=V, C+2=E, K+1=L gives FVEL.",
    difficulty: 4,
    topic: "letter codes and cyphers",
  },

  // Q57: Reverse then +2. CAKE rev=EKAC, +2=GMCE. BARN rev=NRAB, +2=PTCD.
  {
    stem: "If CAKE is coded as GMCE and POOL is coded as NQQR, what is the code for BARN?",
    options: ["PTCD", "PTCE", "PUCD", "PTDD", "OSCD"],
    correctIndex: 0,
    explanation: "Reverse the word (BARN→NRAB), then shift +2: N→P, R→T, A→C, B→D gives PTCD.",
    difficulty: 4,
    topic: "letter codes and cyphers",
  },

  // Q58: +4 shift. FISH: F+4=J, I+4=M, S+4=W, H+4=L → JMWL. LAMP: L+4=P, A+4=E, M+4=Q, P+4=T → PEQT.
  {
    stem: "If FISH is coded as JMWL and DUST is coded as HYWX, what is the code for LAMP?",
    options: ["PEQT", "PDQT", "PERT", "PEQU", "PEQS"],
    correctIndex: 0,
    explanation: "Each letter moves forward by 4. L→P, A→E, M→Q, P→T gives PEQT.",
    difficulty: 4,
    topic: "letter codes and cyphers",
  },

  // Q59: Reverse then +1. SILK rev=KLIS, +1=LMJT. DRUM rev=MURD, +1=NVSE.
  {
    stem: "If SILK is coded as LMJT and VEST is coded as UTFW, what is the code for DRUM?",
    options: ["NVSE", "NVSF", "NVTE", "MUSE", "NVSD"],
    correctIndex: 0,
    explanation: "Reverse the word (DRUM→MURD), then shift +1: M→N, U→V, R→S, D→E gives NVSE.",
    difficulty: 4,
    topic: "letter codes and cyphers",
  },

  // Q60: Reverse then +1. CAKE rev=EKAC, +1=FLBD. ROPE rev=EPOR, +1=FQPS.
  {
    stem: "If CAKE is coded as FLBD and MIST is coded as UTJN, what is the code for ROPE?",
    options: ["FQPS", "FQPR", "GQPS", "FPPS", "FQQS"],
    correctIndex: 0,
    explanation: "Reverse the word (ROPE→EPOR), then shift +1: E→F, P→Q, O→P, R→S gives FQPS.",
    difficulty: 4,
    topic: "letter codes and cyphers",
  },

  // Q61: Reverse then +2. MELT rev=TLEM, +2=VNGO. JUMP rev=PMUJ, +2=ROWL.
  {
    stem: "If MELT is coded as VNGO and HINT is coded as VPKJ, what is the code for JUMP?",
    options: ["ROWL", "ROWM", "RQWL", "SOWL", "ROVL"],
    correctIndex: 0,
    explanation: "Reverse the word (JUMP→PMUJ), then shift +2: P→R, M→O, U→W, J→L gives ROWL.",
    difficulty: 4,
    topic: "letter codes and cyphers",
  },

  // Q62: Alternating +1/+2. BEAR: B+1=C, E+2=G, A+1=B, R+2=T → CGBT. NEST: N+1=O, E+2=G, S+1=T, T+2=V → OGTV.
  {
    stem: "If BEAR is coded as CGBT and FOLD is coded as GQMF, what is the code for NEST?",
    options: ["OGTV", "OGTU", "PGTV", "OHTV", "OGSV"],
    correctIndex: 0,
    explanation: "Odd positions shift +1, even positions shift +2. N+1=O, E+2=G, S+1=T, T+2=V gives OGTV.",
    difficulty: 4,
    topic: "letter codes and cyphers",
  },

  // Q63: +4 shift. SEND: S+4=W, E+4=I, N+4=R, D+4=H → WIRH. PARK: P+4=T, A+4=E, R+4=V, K+4=O → TEVO.
  {
    stem: "If SEND is coded as WIRH, what is the code for PARK?",
    options: ["TEVO", "LWAN", "TFVO", "TEWO", "TEVP"],
    correctIndex: 0,
    explanation: "Each letter moves forward by 4. P→T, A→E, R→V, K→O gives TEVO.",
    difficulty: 4,
    topic: "letter codes and cyphers",
  },

  // Q64: Reverse then +2. KING rev=GNIK, +2=IPKM. WOLF rev=FLOW, +2=HNQY.
  {
    stem: "If KING is coded as IPKM and BAND is coded as FPCD, what is the code for WOLF?",
    options: ["HNQY", "HNQZ", "HORY", "HNRY", "GNQY"],
    correctIndex: 0,
    explanation: "Reverse the word (WOLF→FLOW), then shift +2: F→H, L→N, O→Q, W→Y gives HNQY.",
    difficulty: 4,
    topic: "letter codes and cyphers",
  },

  // Q65: Alternating +2/+1. CLIP: C+2=E, L+1=M, I+2=K, P+1=Q → EMKQ. STEW: S+2=U, T+1=U, E+2=G, W+1=X → UUGX.
  {
    stem: "If CLIP is coded as EMKQ and FARM is coded as HBTN, what is the code for STEW?",
    options: ["UUGX", "UUGY", "UVGX", "UUHX", "TUGX"],
    correctIndex: 0,
    explanation: "Odd positions shift +2, even positions shift +1. S+2=U, T+1=U, E+2=G, W+1=X gives UUGX.",
    difficulty: 4,
    topic: "letter codes and cyphers",
  },

  // Q66: -4 shift. ROPE: R-4=N, O-4=K, P-4=L, E-4=A → NKLA. JUMP: J-4=F, U-4=Q, M-4=I, P-4=L → FQIL.
  {
    stem: "If ROPE is coded as NKLA and VINE is coded as REJA, what is the code for JUMP?",
    options: ["FQIL", "FQJL", "FRIL", "FQIM", "EQIL"],
    correctIndex: 0,
    explanation: "Each letter moves back by 4. J→F, U→Q, M→I, P→L gives FQIL.",
    difficulty: 4,
    topic: "letter codes and cyphers",
  },

  // Q67: Reverse then +3. BIKE rev=EKIB, +3=HNLE. WAVE rev=EVAW, +3=HYDZ.
  {
    stem: "If BIKE is coded as HNLE and RIDE is coded as HGLU, what is the code for WAVE?",
    options: ["HYDZ", "HYDA", "HYCZ", "IYDZ", "HYEZ"],
    correctIndex: 0,
    explanation: "Reverse the word (WAVE→EVAW), then shift +3: E→H, V→Y, A→D, W→Z gives HYDZ.",
    difficulty: 4,
    topic: "letter codes and cyphers",
  },

  // Q68: +4 shift. GRIN: G+4=K, R+4=V, I+4=M, N+4=R → KVMR. HOPE: H+4=L, O+4=S, P+4=T, E+4=I → LSTI.
  {
    stem: "If GRIN is coded as KVMR, what is the code for HOPE?",
    options: ["LSTI", "DKLA", "LSTJ", "LTUI", "LSUI"],
    correctIndex: 0,
    explanation: "Each letter moves forward by 4. H→L, O→S, P→T, E→I gives LSTI.",
    difficulty: 4,
    topic: "letter codes and cyphers",
  },

  // Q69: Alternating +1/+2. ROPE: R+1=S, O+2=Q, P+1=Q, E+2=G → SQQG. MIST: M+1=N, I+2=K, S+1=T, T+2=V → NKTV.
  {
    stem: "If ROPE is coded as SQQG and TUNE is coded as UWOG, what is the code for MIST?",
    options: ["NKTV", "NKTU", "NLTV", "NKTW", "MKTV"],
    correctIndex: 0,
    explanation: "Odd positions shift +1, even positions shift +2. M+1=N, I+2=K, S+1=T, T+2=V gives NKTV.",
    difficulty: 4,
    topic: "letter codes and cyphers",
  },

  // Q70: Reverse then +1. STEM rev=METS, +1=NFUT. GRIT rev=TIRG, +1=UJSH.
  {
    stem: "If STEM is coded as NFUT and FORK is coded as LSPG, what is the code for GRIT?",
    options: ["UJSH", "UJSI", "UKSH", "UJTH", "TJSH"],
    correctIndex: 0,
    explanation: "Reverse the word (GRIT→TIRG), then shift +1: T→U, I→J, R→S, G→H gives UJSH.",
    difficulty: 4,
    topic: "letter codes and cyphers",
  },

  // Q71: +5 shift. MEAL: M+5=R, E+5=J, A+5=F, L+5=Q → RJFQ. CORN: C+5=H, O+5=T, R+5=W, N+5=S → HTWS.
  {
    stem: "If MEAL is coded as RJFQ, what is the code for CORN?",
    options: ["HTWS", "HTWR", "HUWS", "HTXS", "HTWT"],
    correctIndex: 0,
    explanation: "Each letter moves forward by 5. C→H, O→T, R→W, N→S gives HTWS.",
    difficulty: 4,
    topic: "letter codes and cyphers",
  },

  // Q72: Alternating +2/+1. DAWN: D+2=F, A+1=B, W+2=Y, N+1=O → FBYO. PILE: P+2=R, I+1=J, L+2=N, E+1=F → RJNF.
  {
    stem: "If DAWN is coded as FBYO and GUST is coded as IVUU, what is the code for PILE?",
    options: ["RJNF", "RJNG", "RKNF", "RJOF", "SJNF"],
    correctIndex: 0,
    explanation: "Odd positions shift +2, even positions shift +1. P+2=R, I+1=J, L+2=N, E+1=F gives RJNF.",
    difficulty: 4,
    topic: "letter codes and cyphers",
  },

  // Q73: Reverse then +2. NOTE rev=ETON, +2=GVQP. WORM rev=MROW, +2=OTQY.
  {
    stem: "If NOTE is coded as GVQP and HELP is coded as RNGJ, what is the code for WORM?",
    options: ["OTQY", "OTQZ", "OURZ", "OTRY", "OSQY"],
    correctIndex: 0,
    explanation: "Reverse the word (WORM→MROW), then shift +2: M→O, R→T, O→Q, W→Y gives OTQY.",
    difficulty: 4,
    topic: "letter codes and cyphers",
  },

  // Q74: -4 shift. PLAY: P-4=L, L-4=H, A-4=W, Y-4=U → LHWU. BEST: B-4=X, E-4=A, S-4=O, T-4=P → XAOP.
  {
    stem: "If PLAY is coded as LHWU, what is the code for BEST?",
    options: ["XAOP", "XAOQ", "XBOP", "YAOP", "XANP"],
    correctIndex: 0,
    explanation: "Each letter moves back by 4. B→X, E→A, S→O, T→P gives XAOP.",
    difficulty: 4,
    topic: "letter codes and cyphers",
  },

  // Q75: +5 shift. BIRD: B+5=G, I+5=N, R+5=W, D+5=I → GNWI. FERN: F+5=K, E+5=J, R+5=W, N+5=S → KJWS.
  {
    stem: "If BIRD is coded as GNWI, what is the code for FERN?",
    options: ["KJWS", "KJWT", "KKWS", "KJXS", "KJWR"],
    correctIndex: 0,
    explanation: "Each letter moves forward by 5. F→K, E→J, R→W, N→S gives KJWS.",
    difficulty: 4,
    topic: "letter codes and cyphers",
  },

  // Q76: Reverse then +1 on 5-letter. CRANE rev=ENARC, +1=FOBSD. STONE rev=ENOTS, +1=FOPUT.
  {
    stem: "If CRANE is coded as FOBSD and PLUMB is coded as CNVMQ, what is the code for STONE?",
    options: ["FOPUT", "FOPUS", "FOQUT", "GOPVT", "FOPUR"],
    correctIndex: 0,
    explanation: "Reverse (STONE→ENOTS), then shift +1: E→F, N→O, O→P, T→U, S→T gives FOPUT.",
    difficulty: 4,
    topic: "letter codes and cyphers",
  },

  // Q77: Alternating +1/+2 on 5-letter. GRAPE: G+1=H, R+2=T, A+1=B, P+2=R, E+1=F → HTBRF. BLEND: B+1=C, L+2=N, E+1=F, N+2=P, D+1=E → CNFPE.
  {
    stem: "If GRAPE is coded as HTBRF and SKIRT is coded as TMJTU, what is the code for BLEND?",
    options: ["CNFPE", "CNFPF", "COFPE", "CNFQE", "CNGPE"],
    correctIndex: 0,
    explanation: "Odd positions +1, even +2. B+1=C, L+2=N, E+1=F, N+2=P, D+1=E gives CNFPE.",
    difficulty: 4,
    topic: "letter codes and cyphers",
  },

  // Q78: +4 on 5-letter. SHELF: S+4=W, H+4=L, E+4=I, L+4=P, F+4=J → WLIPJ. CROWN: C+4=G, R+4=V, O+4=S, W+4=A, N+4=R → GVSAR.
  {
    stem: "If SHELF is coded as WLIPJ, what is the code for CROWN?",
    options: ["GVSAR", "GVSAS", "GVTAR", "GWSAR", "GVSBR"],
    correctIndex: 0,
    explanation: "Each letter moves forward by 4. C→G, R→V, O→S, W→A, N→R gives GVSAR.",
    difficulty: 4,
    topic: "letter codes and cyphers",
  },

  // Q79: Reverse then +2 on 5-letter. FLAME rev=EMALF, +2=GOCNH. GLOBE rev=EBOLG, +2=GDQNI.
  {
    stem: "If FLAME is coded as GOCNH and TRICK is coded as MEKTV, what is the code for GLOBE?",
    options: ["GDQNI", "GDQNJ", "GEQNI", "GDQOI", "GDPNI"],
    correctIndex: 0,
    explanation: "Reverse (GLOBE→EBOLG), then shift +2: E→G, B→D, O→Q, L→N, G→I gives GDQNI.",
    difficulty: 4,
    topic: "letter codes and cyphers",
  },

  // Q80: -5 shift. MANGO: M-5=H, A-5=V, N-5=I, G-5=B, O-5=J → HVIBJ. TROUT: T-5=O, R-5=M, O-5=J, U-5=P, T-5=O → OMJPO.
  {
    stem: "If MANGO is coded as HVIBJ, what is the code for TROUT?",
    options: ["OMJPO", "OMJPP", "ONJPO", "OMJQO", "OMJPN"],
    correctIndex: 0,
    explanation: "Each letter moves back by 5. T→O, R→M, O→J, U→P, T→O gives OMJPO.",
    difficulty: 4,
    topic: "letter codes and cyphers",
  },

  /* =================================================================
     DIFFICULTY 5 — Complex patterns (20 questions, Q81-Q100)
     ================================================================= */

  // Q81: Progressive shift +1,+2,+3,+4. BARK: B+1=C, A+2=C, R+3=U, K+4=O → CCUO. HELP: H+1=I, E+2=G, L+3=O, P+4=T → IGOT.
  {
    stem: "If BARK is coded as CCUO and FROG is coded as GTRK, what is the code for HELP?",
    options: ["IGOT", "IGOU", "IHOT", "IGPT", "IGNT"],
    correctIndex: 0,
    explanation: "Each letter shifts by its position: 1st +1, 2nd +2, 3rd +3, 4th +4. H+1=I, E+2=G, L+3=O, P+4=T gives IGOT.",
    difficulty: 5,
    topic: "letter codes and cyphers",
  },

  // Q82: Progressive shift +1,+2,+3,+4. MIND: M+1=N, I+2=K, N+3=Q, D+4=H → NKQH. SAIL: S+1=T, A+2=C, I+3=L, L+4=P → TCLP.
  {
    stem: "If MIND is coded as NKQH and DESK is coded as EGVO, what is the code for SAIL?",
    options: ["TCLP", "TCMQ", "TCLQ", "SDLP", "TCKP"],
    correctIndex: 0,
    explanation: "Each letter shifts by its position: S+1=T, A+2=C, I+3=L, L+4=P gives TCLP.",
    difficulty: 5,
    topic: "letter codes and cyphers",
  },

  // Q83: Reverse then progressive +1,+2,+3,+4. LANE rev=ENAL, prog: E+1=F, N+2=P, A+3=D, L+4=P → FPDP. SILK rev=KLIS, prog: K+1=L, L+2=N, I+3=L, S+4=W → LNLW.
  {
    stem: "If LANE is coded as FPDP and WAVE is coded as FXDA, what is the code for SILK?",
    options: ["LNLW", "LNLX", "LOLW", "LNMW", "LNLV"],
    correctIndex: 0,
    explanation: "Reverse (SILK→KLIS), then progressive shifts: K+1=L, L+2=N, I+3=L, S+4=W gives LNLW.",
    difficulty: 5,
    topic: "letter codes and cyphers",
  },

  // Q84: Progressive shift +2,+3,+4,+5. FROG: F+2=H, R+3=U, O+4=S, G+5=L → HUSL. WARM: W+2=Y, A+3=D, R+4=V, M+5=R → YDVR.
  {
    stem: "If FROG is coded as HUSL and BITE is coded as DLXJ, what is the code for WARM?",
    options: ["YDVR", "YDWR", "YEVR", "YDVS", "YDUR"],
    correctIndex: 0,
    explanation: "Progressive shifts +2,+3,+4,+5. W+2=Y, A+3=D, R+4=V, M+5=R gives YDVR.",
    difficulty: 5,
    topic: "letter codes and cyphers",
  },

  // Q85: Double operation: reverse, +1, reverse. GOLD rev=DLOG, +1=EMPH, rev=HPME. LAMP rev=PMAL, +1=QNBM, rev=MBNQ.
  {
    stem: "If GOLD is coded as HPME and FISH is coded as GJTI, what is the code for LAMP?",
    options: ["MBNQ", "MBNR", "MCNQ", "MBOQ", "MBMQ"],
    correctIndex: 0,
    explanation: "Reverse (LAMP→PMAL), shift +1 (QNBM), reverse again gives MBNQ.",
    difficulty: 5,
    topic: "letter codes and cyphers",
  },

  // Q86: Progressive +1,+2,+3,+4,+5 on 5-letter. STONE: S+1=T, T+2=V, O+3=R, N+4=R, E+5=J → TVRRJ. CRANE: C+1=D, R+2=T, A+3=D, N+4=R, E+5=J → DTDRJ.
  {
    stem: "If STONE is coded as TVRRJ and PLUMB is coded as QNXQG, what is the code for CRANE?",
    options: ["DTDRJ", "DTDSK", "DTDRK", "DUDRJ", "DTERJ"],
    correctIndex: 0,
    explanation: "Progressive shifts: C+1=D, R+2=T, A+3=D, N+4=R, E+5=J gives DTDRJ.",
    difficulty: 5,
    topic: "letter codes and cyphers",
  },

  // Q87: Alternating +3/-1. BIRD: B+3=E, I-1=H, R+3=U, D-1=C → EHUC. FAST: F+3=I, A-1=Z, S+3=V, T-1=S → IZVS.
  {
    stem: "If BIRD is coded as EHUC and LAKE is coded as OZND, what is the code for FAST?",
    options: ["IZVS", "IZWT", "IZVT", "JZVS", "IYUS"],
    correctIndex: 0,
    explanation: "Odd positions shift +3, even positions shift -1. F+3=I, A-1=Z, S+3=V, T-1=S gives IZVS.",
    difficulty: 5,
    topic: "letter codes and cyphers",
  },

  // Q88: Reverse then alternating +1/+2. DRUM rev=MURD: M+1=N, U+2=W, R+1=S, D+2=F → NWSF. PLAN rev=NALP: N+1=O, A+2=C, L+1=M, P+2=R → OCMR.
  {
    stem: "If DRUM is coded as NWSF and GRIT is coded as UKSI, what is the code for PLAN?",
    options: ["OCMR", "OCMS", "ODMR", "OCNR", "OCMQ"],
    correctIndex: 0,
    explanation: "Reverse (PLAN→NALP), then odd +1, even +2: N+1=O, A+2=C, L+1=M, P+2=R gives OCMR.",
    difficulty: 5,
    topic: "letter codes and cyphers",
  },

  // Q89: Progressive +2,+3,+4,+5,+6 on 5-letter. FLAME: F+2=H, L+3=O, A+4=E, M+5=R, E+6=K → HOERK. SWING: S+2=U, W+3=Z, I+4=M, N+5=S, G+6=M → UZMSM.
  {
    stem: "If FLAME is coded as HOERK and BRICK is coded as DUMHQ, what is the code for SWING?",
    options: ["UZMSM", "UZMSL", "UZMSN", "UZNSL", "UYMSM"],
    correctIndex: 0,
    explanation: "Progressive shifts +2,+3,+4,+5,+6. S+2=U, W+3=Z, I+4=M, N+5=S, G+6=M gives UZMSM.",
    difficulty: 5,
    topic: "letter codes and cyphers",
  },

  // Q90: Alternating +3/-1 on 5-letter. CREST: C+3=F, R-1=Q, E+3=H, S-1=R, T+3=W → FQHRW. GHOST: G+3=J, H-1=G, O+3=R, S-1=R, T+3=W → JGRRW.
  {
    stem: "If CREST is coded as FQHRW and PLANT is coded as SKDMW, what is the code for GHOST?",
    options: ["JGRRW", "JGRRX", "JGSRW", "JGRSW", "KGRRW"],
    correctIndex: 0,
    explanation: "Odd positions +3, even -1. G+3=J, H-1=G, O+3=R, S-1=R, T+3=W gives JGRRW.",
    difficulty: 5,
    topic: "letter codes and cyphers",
  },

  // Q91: Reverse then +3 on 5-letter. BLEND rev=DNELB, +3=GQHOE. DREAM rev=MAERD, +3=PDHUG.
  {
    stem: "If BLEND is coded as GQHOE and FRUIT is coded as WLXUI, what is the code for DREAM?",
    options: ["PDHUG", "PDHUH", "PEHUA", "PDHVG", "PDIUG"],
    correctIndex: 0,
    explanation: "Reverse (DREAM→MAERD), then shift +3: M→P, A→D, E→H, R→U, D→G gives PDHUG.",
    difficulty: 5,
    topic: "letter codes and cyphers",
  },

  // Q92: Progressive +1,+2,+3,+4. VINE: V+1=W, I+2=K, N+3=Q, E+4=I → WKQI. CORK: C+1=D, O+2=Q, R+3=U, K+4=O → DQUO.
  {
    stem: "If VINE is coded as WKQI and DUST is coded as EWVX, what is the code for CORK?",
    options: ["DQUO", "DQUP", "DRUO", "DQVO", "DQUN"],
    correctIndex: 0,
    explanation: "Progressive shifts: C+1=D, O+2=Q, R+3=U, K+4=O gives DQUO.",
    difficulty: 5,
    topic: "letter codes and cyphers",
  },

  // Q93: Alternating +2/-2. KING: K+2=M, I-2=G, N+2=P, G-2=E → MGPE. WOLF: W+2=Y, O-2=M, L+2=N, F-2=D → YMND.
  {
    stem: "If KING is coded as MGPE and SAND is coded as UYPB, what is the code for WOLF?",
    options: ["YMND", "YMNE", "YOND", "YMMD", "YMNC"],
    correctIndex: 0,
    explanation: "Odd positions +2, even -2. W+2=Y, O-2=M, L+2=N, F-2=D gives YMND.",
    difficulty: 5,
    topic: "letter codes and cyphers",
  },

  // Q94: +2 then reverse. BELL +2=DGNN, rev=NNGD. WAVE +2=YCXG, rev=GXCY.
  {
    stem: "If BELL is coded as NNGD and TORN is coded as PTQV, what is the code for WAVE?",
    options: ["GXCY", "GXCZ", "GXDY", "GXBY", "GYCY"],
    correctIndex: 0,
    explanation: "Shift +2 (WAVE→YCXG), then reverse to get GXCY.",
    difficulty: 5,
    topic: "letter codes and cyphers",
  },

  // Q95: Alternating +3/-1. JUMP: J+3=M, U-1=T, M+3=P, P-1=O → MTPO. VEIL: V+3=Y, E-1=D, I+3=L, L-1=K → YDLK.
  {
    stem: "If JUMP is coded as MTPO and COLD is coded as FNOC, what is the code for VEIL?",
    options: ["YDLK", "YDLL", "YEMK", "YDMK", "YDLJ"],
    correctIndex: 0,
    explanation: "Odd positions +3, even -1. V+3=Y, E-1=D, I+3=L, L-1=K gives YDLK.",
    difficulty: 5,
    topic: "letter codes and cyphers",
  },

  // Q96: Progressive +1,+2,+3,+4,+5 on 5-letter. BRUSH: B+1=C, R+2=T, U+3=X, S+4=W, H+5=M → CTXWM. STOVE: S+1=T, T+2=V, O+3=R, V+4=Z, E+5=J → TVRZJ.
  {
    stem: "If BRUSH is coded as CTXWM and GLINT is coded as HNLRY, what is the code for STOVE?",
    options: ["TVRZJ", "TVRZK", "TWRZJ", "TVSZJ", "TVRYJ"],
    correctIndex: 0,
    explanation: "Progressive shifts: S+1=T, T+2=V, O+3=R, V+4=Z, E+5=J gives TVRZJ.",
    difficulty: 5,
    topic: "letter codes and cyphers",
  },

  // Q97: Reverse then progressive +1,+2,+3,+4,+5 on 5-letter. GLOBE rev=EBOLG, prog: E+1=F, B+2=D, O+3=R, L+4=P, G+5=L → FDRPL. SHAVE rev=EVAHS, prog: E+1=F, V+2=X, A+3=D, H+4=L, S+5=X → FXDLX.
  {
    stem: "If GLOBE is coded as FDRPL and TRICK is coded as LELVY, what is the code for SHAVE?",
    options: ["FXDLX", "FXDLY", "FXDMX", "FYDLX", "FXELX"],
    correctIndex: 0,
    explanation: "Reverse (SHAVE→EVAHS), progressive shifts: E+1=F, V+2=X, A+3=D, H+4=L, S+5=X gives FXDLX.",
    difficulty: 5,
    topic: "letter codes and cyphers",
  },

  // Q98: Alternating +2/-2 on 5-letter. FLOCK: F+2=H, L-2=J, O+2=Q, C-2=A, K+2=M → HJQAM. PLANT: P+2=R, L-2=J, A+2=C, N-2=L, T+2=V → RJCLV.
  {
    stem: "If FLOCK is coded as HJQAM and SWEEP is coded as UUGCR, what is the code for PLANT?",
    options: ["RJCLV", "RJCLW", "RJDLV", "RKCLV", "RJCMV"],
    correctIndex: 0,
    explanation: "Odd positions +2, even -2. P+2=R, L-2=J, A+2=C, N-2=L, T+2=V gives RJCLV.",
    difficulty: 5,
    topic: "letter codes and cyphers",
  },

  // Q99: Progressive -1,-2,-3,-4. ROPE: R-1=Q, O-2=M, P-3=M, E-4=A → QMMA. TUSK: T-1=S, U-2=S, S-3=P, K-4=G → SSPG.
  {
    stem: "If ROPE is coded as QMMA and FISH is coded as EGPD, what is the code for TUSK?",
    options: ["SSPG", "SSPH", "STPG", "SSQG", "SSPF"],
    correctIndex: 0,
    explanation: "Progressive shifts backward: T-1=S, U-2=S, S-3=P, K-4=G gives SSPG.",
    difficulty: 5,
    topic: "letter codes and cyphers",
  },

  // Q100: Reverse then alternating +2/+3. MIST rev=TSIM: T+2=V, S+3=V, I+2=K, M+3=P → VVKP. SHED rev=DEHS: D+2=F, E+3=H, H+2=J, S+3=V → FHJV.
  {
    stem: "If MIST is coded as VVKP and GLOW is coded as YRNJ, what is the code for SHED?",
    options: ["FHJV", "FHJW", "FIKV", "GHKV", "FHKV"],
    correctIndex: 0,
    explanation: "Reverse (SHED→DEHS), then odd +2, even +3: D+2=F, E+3=H, H+2=J, S+3=V gives FHJV.",
    difficulty: 5,
    topic: "letter codes and cyphers",
  },
];
