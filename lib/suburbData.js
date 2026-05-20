// Australian Suburb Median Price Data
// Source: CoreLogic/Cotality, ABS, state Valuer-General offices (2024-2025)
// Prices are median house prices in AUD unless noted
// Updated: 2025

// Structure per entry:
// house: median house price
// apartment: median apartment/unit price
// townhouse: median townhouse price (estimated as ~house * 0.75 if not available)
// trend: "rising" | "stable" | "falling"
// annualGrowth: % change year on year

const suburbData = {

  // ─── SYDNEY ───────────────────────────────────────────────
  "mosman": { house: 4200000, apartment: 1350000, townhouse: 2800000, trend: "stable", annualGrowth: 2.1, state: "NSW" },
  "double bay": { house: 5800000, apartment: 1650000, townhouse: 3200000, trend: "rising", annualGrowth: 4.2, state: "NSW" },
  "bondi": { house: 3100000, apartment: 1250000, townhouse: 1900000, trend: "rising", annualGrowth: 5.1, state: "NSW" },
  "bondi beach": { house: 3200000, apartment: 1300000, townhouse: 2000000, trend: "rising", annualGrowth: 5.3, state: "NSW" },
  "manly": { house: 3400000, apartment: 1200000, townhouse: 2100000, trend: "rising", annualGrowth: 4.8, state: "NSW" },
  "balmain": { house: 2100000, apartment: 900000, townhouse: 1500000, trend: "stable", annualGrowth: 2.5, state: "NSW" },
  "newtown": { house: 1700000, apartment: 780000, townhouse: 1200000, trend: "stable", annualGrowth: 2.2, state: "NSW" },
  "surry hills": { house: 1900000, apartment: 820000, townhouse: 1350000, trend: "rising", annualGrowth: 3.8, state: "NSW" },
  "paddington": { house: 2600000, apartment: 950000, townhouse: 1700000, trend: "stable", annualGrowth: 2.9, state: "NSW" },
  "glebe": { house: 1800000, apartment: 780000, townhouse: 1250000, trend: "stable", annualGrowth: 2.1, state: "NSW" },
  "leichhardt": { house: 1650000, apartment: 720000, townhouse: 1150000, trend: "stable", annualGrowth: 2.3, state: "NSW" },
  "rozelle": { house: 1950000, apartment: 820000, townhouse: 1400000, trend: "rising", annualGrowth: 3.5, state: "NSW" },
  "neutral bay": { house: 2800000, apartment: 1050000, townhouse: 1900000, trend: "stable", annualGrowth: 2.0, state: "NSW" },
  "cremorne": { house: 2600000, apartment: 980000, townhouse: 1750000, trend: "stable", annualGrowth: 1.9, state: "NSW" },
  "chatswood": { house: 2400000, apartment: 920000, townhouse: 1600000, trend: "stable", annualGrowth: 2.4, state: "NSW" },
  "north sydney": { house: 2200000, apartment: 880000, townhouse: 1500000, trend: "stable", annualGrowth: 2.1, state: "NSW" },
  "parramatta": { house: 1200000, apartment: 620000, townhouse: 850000, trend: "rising", annualGrowth: 4.2, state: "NSW" },
  "penrith": { house: 850000, apartment: 480000, townhouse: 650000, trend: "rising", annualGrowth: 5.8, state: "NSW" },
  "blacktown": { house: 800000, apartment: 460000, townhouse: 620000, trend: "rising", annualGrowth: 5.2, state: "NSW" },
  "liverpool": { house: 850000, apartment: 480000, townhouse: 660000, trend: "rising", annualGrowth: 5.4, state: "NSW" },
  "campbelltown": { house: 750000, apartment: 430000, townhouse: 580000, trend: "rising", annualGrowth: 6.1, state: "NSW" },
  "cronulla": { house: 1950000, apartment: 850000, townhouse: 1350000, trend: "stable", annualGrowth: 2.8, state: "NSW" },
  "hurstville": { house: 1450000, apartment: 680000, townhouse: 980000, trend: "rising", annualGrowth: 3.9, state: "NSW" },
  "kogarah": { house: 1350000, apartment: 640000, townhouse: 920000, trend: "rising", annualGrowth: 3.5, state: "NSW" },
  "randwick": { house: 2200000, apartment: 920000, townhouse: 1500000, trend: "stable", annualGrowth: 2.6, state: "NSW" },
  "coogee": { house: 2400000, apartment: 1000000, townhouse: 1650000, trend: "stable", annualGrowth: 2.4, state: "NSW" },
  "maroubra": { house: 1850000, apartment: 820000, townhouse: 1300000, trend: "stable", annualGrowth: 2.8, state: "NSW" },
  "castle hill": { house: 1700000, apartment: 750000, townhouse: 1150000, trend: "rising", annualGrowth: 3.8, state: "NSW" },
  "hills district": { house: 1600000, apartment: 720000, townhouse: 1100000, trend: "rising", annualGrowth: 4.0, state: "NSW" },

  // ─── MELBOURNE ────────────────────────────────────────────
  "toorak": { house: 4500000, apartment: 1200000, townhouse: 2800000, trend: "stable", annualGrowth: 1.2, state: "VIC" },
  "south yarra": { house: 2200000, apartment: 750000, townhouse: 1400000, trend: "stable", annualGrowth: 0.8, state: "VIC" },
  "richmond": { house: 1600000, apartment: 620000, townhouse: 1050000, trend: "stable", annualGrowth: 0.5, state: "VIC" },
  "fitzroy": { house: 1700000, apartment: 650000, townhouse: 1100000, trend: "stable", annualGrowth: 0.6, state: "VIC" },
  "collingwood": { house: 1550000, apartment: 600000, townhouse: 1000000, trend: "stable", annualGrowth: 0.4, state: "VIC" },
  "brunswick": { house: 1350000, apartment: 560000, townhouse: 900000, trend: "stable", annualGrowth: 0.5, state: "VIC" },
  "carlton": { house: 1450000, apartment: 520000, townhouse: 950000, trend: "stable", annualGrowth: 0.3, state: "VIC" },
  "st kilda": { house: 1600000, apartment: 580000, townhouse: 1050000, trend: "stable", annualGrowth: 0.7, state: "VIC" },
  "elwood": { house: 1900000, apartment: 680000, townhouse: 1250000, trend: "stable", annualGrowth: 1.0, state: "VIC" },
  "brighton": { house: 2800000, apartment: 850000, townhouse: 1700000, trend: "stable", annualGrowth: 0.9, state: "VIC" },
  "sandringham": { house: 1800000, apartment: 650000, townhouse: 1150000, trend: "stable", annualGrowth: 1.1, state: "VIC" },
  "hawthorn": { house: 2100000, apartment: 720000, townhouse: 1350000, trend: "stable", annualGrowth: 0.8, state: "VIC" },
  "camberwell": { house: 2000000, apartment: 700000, townhouse: 1300000, trend: "stable", annualGrowth: 0.6, state: "VIC" },
  "kew": { house: 2200000, apartment: 720000, townhouse: 1400000, trend: "stable", annualGrowth: 0.7, state: "VIC" },
  "glen waverley": { house: 1250000, apartment: 580000, townhouse: 850000, trend: "rising", annualGrowth: 2.5, state: "VIC" },
  "box hill": { house: 1200000, apartment: 560000, townhouse: 820000, trend: "rising", annualGrowth: 2.8, state: "VIC" },
  "doncaster": { house: 1300000, apartment: 580000, townhouse: 870000, trend: "rising", annualGrowth: 2.4, state: "VIC" },
  "frankston": { house: 720000, apartment: 400000, townhouse: 540000, trend: "rising", annualGrowth: 3.8, state: "VIC" },
  "dandenong": { house: 680000, apartment: 380000, townhouse: 510000, trend: "rising", annualGrowth: 4.2, state: "VIC" },
  "ringwood": { house: 880000, apartment: 490000, townhouse: 650000, trend: "rising", annualGrowth: 3.1, state: "VIC" },
  "craigieburn": { house: 620000, apartment: 360000, townhouse: 480000, trend: "rising", annualGrowth: 4.5, state: "VIC" },
  "epping": { house: 650000, apartment: 370000, townhouse: 500000, trend: "rising", annualGrowth: 4.2, state: "VIC" },
  "werribee": { house: 580000, apartment: 340000, townhouse: 450000, trend: "rising", annualGrowth: 5.0, state: "VIC" },
  "point cook": { house: 720000, apartment: 420000, townhouse: 560000, trend: "rising", annualGrowth: 3.8, state: "VIC" },
  "footscray": { house: 950000, apartment: 480000, townhouse: 680000, trend: "rising", annualGrowth: 3.2, state: "VIC" },
  "yarraville": { house: 1050000, apartment: 520000, townhouse: 740000, trend: "stable", annualGrowth: 1.8, state: "VIC" },
  "williamstown": { house: 1350000, apartment: 590000, townhouse: 880000, trend: "stable", annualGrowth: 1.5, state: "VIC" },
  "port melbourne": { house: 1700000, apartment: 680000, townhouse: 1100000, trend: "stable", annualGrowth: 0.9, state: "VIC" },
  "albert park": { house: 2100000, apartment: 730000, townhouse: 1350000, trend: "stable", annualGrowth: 0.7, state: "VIC" },
  "prahran": { house: 1800000, apartment: 650000, townhouse: 1150000, trend: "stable", annualGrowth: 0.6, state: "VIC" },
  "malvern": { house: 2400000, apartment: 780000, townhouse: 1500000, trend: "stable", annualGrowth: 0.8, state: "VIC" },
  "glen iris": { house: 2000000, apartment: 710000, townhouse: 1300000, trend: "stable", annualGrowth: 0.7, state: "VIC" },
  "northcote": { house: 1400000, apartment: 580000, townhouse: 940000, trend: "stable", annualGrowth: 1.0, state: "VIC" },
  "thornbury": { house: 1300000, apartment: 560000, townhouse: 890000, trend: "stable", annualGrowth: 1.1, state: "VIC" },
  "coburg": { house: 1100000, apartment: 520000, townhouse: 760000, trend: "rising", annualGrowth: 2.0, state: "VIC" },
  "preston": { house: 1000000, apartment: 490000, townhouse: 710000, trend: "rising", annualGrowth: 2.3, state: "VIC" },
  "heidelberg": { house: 980000, apartment: 480000, townhouse: 690000, trend: "rising", annualGrowth: 2.5, state: "VIC" },

  // ─── BRISBANE ─────────────────────────────────────────────
  "new farm": { house: 2200000, apartment: 780000, townhouse: 1400000, trend: "rising", annualGrowth: 7.2, state: "QLD" },
  "teneriffe": { house: 2400000, apartment: 820000, townhouse: 1500000, trend: "rising", annualGrowth: 7.8, state: "QLD" },
  "paddington": { house: 1600000, apartment: 650000, townhouse: 1050000, trend: "rising", annualGrowth: 6.5, state: "QLD" },
  "ascot": { house: 2100000, apartment: 750000, townhouse: 1350000, trend: "rising", annualGrowth: 6.8, state: "QLD" },
  "hamilton": { house: 1900000, apartment: 720000, townhouse: 1250000, trend: "rising", annualGrowth: 7.0, state: "QLD" },
  "kangaroo point": { house: 1500000, apartment: 620000, townhouse: 980000, trend: "rising", annualGrowth: 6.2, state: "QLD" },
  "west end": { house: 1400000, apartment: 600000, townhouse: 920000, trend: "rising", annualGrowth: 6.0, state: "QLD" },
  "south brisbane": { house: 1350000, apartment: 580000, townhouse: 900000, trend: "rising", annualGrowth: 5.8, state: "QLD" },
  "fortitude valley": { house: 1200000, apartment: 550000, townhouse: 820000, trend: "rising", annualGrowth: 5.5, state: "QLD" },
  "auchenflower": { house: 1550000, apartment: 630000, townhouse: 1000000, trend: "rising", annualGrowth: 6.3, state: "QLD" },
  "toowong": { house: 1450000, apartment: 610000, townhouse: 960000, trend: "rising", annualGrowth: 6.1, state: "QLD" },
  "indooroopilly": { house: 1350000, apartment: 580000, townhouse: 900000, trend: "rising", annualGrowth: 5.9, state: "QLD" },
  "chermside": { house: 950000, apartment: 490000, townhouse: 680000, trend: "rising", annualGrowth: 7.5, state: "QLD" },
  "nundah": { house: 1050000, apartment: 520000, townhouse: 740000, trend: "rising", annualGrowth: 7.2, state: "QLD" },
  "carindale": { house: 1100000, apartment: 530000, townhouse: 760000, trend: "rising", annualGrowth: 7.0, state: "QLD" },
  "mount gravatt": { house: 1000000, apartment: 510000, townhouse: 720000, trend: "rising", annualGrowth: 7.3, state: "QLD" },
  "springwood": { house: 780000, apartment: 430000, townhouse: 580000, trend: "rising", annualGrowth: 8.0, state: "QLD" },
  "logan": { house: 650000, apartment: 380000, townhouse: 500000, trend: "rising", annualGrowth: 9.2, state: "QLD" },
  "ipswich": { house: 600000, apartment: 350000, townhouse: 460000, trend: "rising", annualGrowth: 9.5, state: "QLD" },
  "redcliffe": { house: 750000, apartment: 430000, townhouse: 570000, trend: "rising", annualGrowth: 8.5, state: "QLD" },
  "wynnum": { house: 900000, apartment: 480000, townhouse: 650000, trend: "rising", annualGrowth: 7.8, state: "QLD" },
  "manly": { house: 1100000, apartment: 540000, townhouse: 760000, trend: "rising", annualGrowth: 7.5, state: "QLD" },
  "sunnybank": { house: 1050000, apartment: 520000, townhouse: 740000, trend: "rising", annualGrowth: 7.2, state: "QLD" },
  "eight mile plains": { house: 1000000, apartment: 510000, townhouse: 720000, trend: "rising", annualGrowth: 7.0, state: "QLD" },
  "woolloongabba": { house: 1300000, apartment: 570000, townhouse: 870000, trend: "rising", annualGrowth: 6.8, state: "QLD" },

  // ─── GOLD COAST ───────────────────────────────────────────
  "surfers paradise": { house: 1400000, apartment: 650000, townhouse: 920000, trend: "rising", annualGrowth: 8.2, state: "QLD" },
  "broadbeach": { house: 1500000, apartment: 700000, townhouse: 980000, trend: "rising", annualGrowth: 8.5, state: "QLD" },
  "burleigh heads": { house: 1800000, apartment: 780000, townhouse: 1150000, trend: "rising", annualGrowth: 9.0, state: "QLD" },
  "palm beach": { house: 1900000, apartment: 800000, townhouse: 1200000, trend: "rising", annualGrowth: 9.2, state: "QLD" },
  "coolangatta": { house: 1200000, apartment: 620000, townhouse: 820000, trend: "rising", annualGrowth: 8.0, state: "QLD" },
  "robina": { house: 950000, apartment: 490000, townhouse: 680000, trend: "rising", annualGrowth: 7.5, state: "QLD" },
  "mudgeeraba": { house: 900000, apartment: 470000, townhouse: 650000, trend: "rising", annualGrowth: 7.8, state: "QLD" },
  "coomera": { house: 750000, apartment: 420000, townhouse: 560000, trend: "rising", annualGrowth: 9.0, state: "QLD" },
  "hope island": { house: 1100000, apartment: 540000, townhouse: 760000, trend: "rising", annualGrowth: 8.2, state: "QLD" },

  // ─── PERTH ────────────────────────────────────────────────
  "peppermint grove": { house: 3200000, apartment: 950000, townhouse: 2000000, trend: "rising", annualGrowth: 12.5, state: "WA" },
  "cottesloe": { house: 2800000, apartment: 900000, townhouse: 1750000, trend: "rising", annualGrowth: 11.8, state: "WA" },
  "claremont": { house: 2000000, apartment: 750000, townhouse: 1300000, trend: "rising", annualGrowth: 10.5, state: "WA" },
  "dalkeith": { house: 2500000, apartment: 850000, townhouse: 1600000, trend: "rising", annualGrowth: 11.2, state: "WA" },
  "nedlands": { house: 1800000, apartment: 700000, townhouse: 1200000, trend: "rising", annualGrowth: 10.8, state: "WA" },
  "subiaco": { house: 1600000, apartment: 660000, townhouse: 1050000, trend: "rising", annualGrowth: 10.2, state: "WA" },
  "fremantle": { house: 1200000, apartment: 580000, townhouse: 820000, trend: "rising", annualGrowth: 9.8, state: "WA" },
  "north fremantle": { house: 1400000, apartment: 620000, townhouse: 940000, trend: "rising", annualGrowth: 10.0, state: "WA" },
  "applecross": { house: 1700000, apartment: 680000, townhouse: 1100000, trend: "rising", annualGrowth: 10.5, state: "WA" },
  "como": { house: 1150000, apartment: 560000, townhouse: 790000, trend: "rising", annualGrowth: 9.5, state: "WA" },
  "south perth": { house: 1300000, apartment: 600000, townhouse: 880000, trend: "rising", annualGrowth: 9.8, state: "WA" },
  "victoria park": { house: 950000, apartment: 490000, townhouse: 680000, trend: "rising", annualGrowth: 10.2, state: "WA" },
  "joondalup": { house: 680000, apartment: 390000, townhouse: 520000, trend: "rising", annualGrowth: 12.0, state: "WA" },
  "wanneroo": { house: 620000, apartment: 360000, townhouse: 480000, trend: "rising", annualGrowth: 12.5, state: "WA" },
  "rockingham": { house: 580000, apartment: 340000, townhouse: 450000, trend: "rising", annualGrowth: 13.0, state: "WA" },
  "mandurah": { house: 550000, apartment: 320000, townhouse: 420000, trend: "rising", annualGrowth: 13.5, state: "WA" },
  "baldivis": { house: 600000, apartment: 350000, townhouse: 460000, trend: "rising", annualGrowth: 13.2, state: "WA" },
  "ellenbrook": { house: 580000, apartment: 340000, townhouse: 450000, trend: "rising", annualGrowth: 12.8, state: "WA" },
  "midland": { house: 520000, apartment: 310000, townhouse: 410000, trend: "rising", annualGrowth: 13.8, state: "WA" },
  "canning vale": { house: 750000, apartment: 430000, townhouse: 570000, trend: "rising", annualGrowth: 11.5, state: "WA" },

  // ─── ADELAIDE ─────────────────────────────────────────────
  "north adelaide": { house: 1450000, apartment: 600000, townhouse: 950000, trend: "rising", annualGrowth: 9.5, state: "SA" },
  "unley": { house: 1300000, apartment: 570000, townhouse: 880000, trend: "rising", annualGrowth: 9.2, state: "SA" },
  "dulwich": { house: 1400000, apartment: 580000, townhouse: 920000, trend: "rising", annualGrowth: 9.0, state: "SA" },
  "glenelg": { house: 1100000, apartment: 540000, townhouse: 760000, trend: "rising", annualGrowth: 8.8, state: "SA" },
  "brighton": { house: 900000, apartment: 490000, townhouse: 660000, trend: "rising", annualGrowth: 8.5, state: "SA" },
  "henley beach": { house: 1050000, apartment: 520000, townhouse: 730000, trend: "rising", annualGrowth: 9.0, state: "SA" },
  "norwood": { house: 1200000, apartment: 560000, townhouse: 820000, trend: "rising", annualGrowth: 9.3, state: "SA" },
  "prospect": { house: 900000, apartment: 490000, townhouse: 660000, trend: "rising", annualGrowth: 10.0, state: "SA" },
  "mawson lakes": { house: 750000, apartment: 430000, townhouse: 570000, trend: "rising", annualGrowth: 10.5, state: "SA" },
  "salisbury": { house: 550000, apartment: 320000, townhouse: 430000, trend: "rising", annualGrowth: 11.5, state: "SA" },
  "mount barker": { house: 620000, apartment: 350000, townhouse: 480000, trend: "rising", annualGrowth: 11.0, state: "SA" },
  "morphett vale": { house: 580000, apartment: 340000, townhouse: 450000, trend: "rising", annualGrowth: 11.2, state: "SA" },

  // ─── CANBERRA ─────────────────────────────────────────────
  "braddon": { house: 1100000, apartment: 560000, townhouse: 780000, trend: "stable", annualGrowth: 1.5, state: "ACT" },
  "new acton": { house: 1200000, apartment: 600000, townhouse: 840000, trend: "stable", annualGrowth: 1.2, state: "ACT" },
  "kingston": { house: 1150000, apartment: 580000, townhouse: 810000, trend: "stable", annualGrowth: 1.4, state: "ACT" },
  "manuka": { house: 1300000, apartment: 620000, townhouse: 900000, trend: "stable", annualGrowth: 1.3, state: "ACT" },
  "barton": { house: 1400000, apartment: 640000, townhouse: 950000, trend: "stable", annualGrowth: 1.1, state: "ACT" },
  "griffith": { house: 1250000, apartment: 610000, townhouse: 870000, trend: "stable", annualGrowth: 1.2, state: "ACT" },
  "woden": { house: 850000, apartment: 480000, townhouse: 640000, trend: "stable", annualGrowth: 1.8, state: "ACT" },
  "tuggeranong": { house: 780000, apartment: 450000, townhouse: 590000, trend: "stable", annualGrowth: 2.0, state: "ACT" },
  "gungahlin": { house: 820000, apartment: 460000, townhouse: 620000, trend: "rising", annualGrowth: 2.5, state: "ACT" },
  "belconnen": { house: 800000, apartment: 450000, townhouse: 600000, trend: "rising", annualGrowth: 2.3, state: "ACT" },

  // ─── HOBART ───────────────────────────────────────────────
  "battery point": { house: 1100000, apartment: 520000, townhouse: 750000, trend: "stable", annualGrowth: 1.5, state: "TAS" },
  "sandy bay": { house: 950000, apartment: 480000, townhouse: 680000, trend: "stable", annualGrowth: 1.8, state: "TAS" },
  "south hobart": { house: 850000, apartment: 450000, townhouse: 620000, trend: "stable", annualGrowth: 2.0, state: "TAS" },
  "west hobart": { house: 820000, apartment: 440000, townhouse: 600000, trend: "stable", annualGrowth: 1.9, state: "TAS" },
  "north hobart": { house: 780000, apartment: 420000, townhouse: 580000, trend: "stable", annualGrowth: 2.1, state: "TAS" },
  "glenorchy": { house: 580000, apartment: 340000, townhouse: 450000, trend: "rising", annualGrowth: 3.5, state: "TAS" },
  "kingston": { house: 650000, apartment: 370000, townhouse: 500000, trend: "rising", annualGrowth: 3.2, state: "TAS" },
  "launceston": { house: 550000, apartment: 320000, townhouse: 430000, trend: "rising", annualGrowth: 3.8, state: "TAS" },

  // ─── DARWIN ───────────────────────────────────────────────
  "darwin city": { house: 650000, apartment: 380000, townhouse: 500000, trend: "falling", annualGrowth: -1.2, state: "NT" },
  "palmerston": { house: 500000, apartment: 310000, townhouse: 400000, trend: "stable", annualGrowth: 0.8, state: "NT" },
  "nightcliff": { house: 750000, apartment: 420000, townhouse: 560000, trend: "stable", annualGrowth: 1.0, state: "NT" },
  "fannie bay": { house: 850000, apartment: 460000, townhouse: 630000, trend: "stable", annualGrowth: 0.9, state: "NT" },

  // ─── SUNSHINE COAST ───────────────────────────────────────
  "noosa heads": { house: 2200000, apartment: 900000, townhouse: 1450000, trend: "rising", annualGrowth: 8.5, state: "QLD" },
  "noosaville": { house: 1800000, apartment: 780000, townhouse: 1200000, trend: "rising", annualGrowth: 8.2, state: "QLD" },
  "maroochydore": { house: 950000, apartment: 520000, townhouse: 700000, trend: "rising", annualGrowth: 8.8, state: "QLD" },
  "mooloolaba": { house: 1400000, apartment: 680000, townhouse: 950000, trend: "rising", annualGrowth: 9.0, state: "QLD" },
  "caloundra": { house: 850000, apartment: 480000, townhouse: 640000, trend: "rising", annualGrowth: 8.5, state: "QLD" },
  "buderim": { house: 1000000, apartment: 520000, townhouse: 720000, trend: "rising", annualGrowth: 8.2, state: "QLD" },

  // ─── NEWCASTLE / HUNTER ───────────────────────────────────
  "newcastle": { house: 950000, apartment: 490000, townhouse: 680000, trend: "rising", annualGrowth: 5.5, state: "NSW" },
  "newcastle west": { house: 880000, apartment: 460000, townhouse: 640000, trend: "rising", annualGrowth: 5.2, state: "NSW" },
  "hamilton": { house: 1050000, apartment: 520000, townhouse: 740000, trend: "rising", annualGrowth: 5.8, state: "NSW" },
  "merewether": { house: 1400000, apartment: 620000, townhouse: 940000, trend: "rising", annualGrowth: 6.0, state: "NSW" },
  "bar beach": { house: 1600000, apartment: 660000, townhouse: 1050000, trend: "rising", annualGrowth: 6.2, state: "NSW" },
  "maitland": { house: 750000, apartment: 420000, townhouse: 560000, trend: "rising", annualGrowth: 6.5, state: "NSW" },
  "cessnock": { house: 580000, apartment: 340000, townhouse: 450000, trend: "rising", annualGrowth: 7.0, state: "NSW" },

  // ─── WOLLONGONG ───────────────────────────────────────────
  "wollongong": { house: 950000, apartment: 580000, townhouse: 720000, trend: "rising", annualGrowth: 5.5, state: "NSW" },
  "thirroul": { house: 1400000, apartment: 680000, townhouse: 980000, trend: "rising", annualGrowth: 6.2, state: "NSW" },
  "austinmer": { house: 1500000, apartment: 700000, townhouse: 1000000, trend: "rising", annualGrowth: 6.5, state: "NSW" },
  "helensburgh": { house: 1200000, apartment: 600000, townhouse: 840000, trend: "rising", annualGrowth: 5.8, state: "NSW" },
  "figtree": { house: 950000, apartment: 500000, townhouse: 700000, trend: "rising", annualGrowth: 5.2, state: "NSW" },

}

// Bedroom multipliers: adjust base price by bedroom count
const bedroomMultiplier = {
  house:      { "1": 0.55, "2": 0.75, "3": 1.0, "4": 1.25, "5": 1.5 },
  apartment:  { "1": 0.75, "2": 1.0,  "3": 1.35, "4": 1.6,  "5": 1.8 },
  townhouse:  { "1": 0.65, "2": 0.82, "3": 1.0,  "4": 1.22, "5": 1.45 },
}

// City-level fallback medians when suburb not found
const cityFallback = {
  "sydney":        { house: 1650000, apartment: 820000, townhouse: 1100000, trend: "stable", annualGrowth: 2.5 },
  "melbourne":     { house: 980000,  apartment: 560000, townhouse: 720000,  trend: "stable", annualGrowth: 0.8 },
  "brisbane":      { house: 980000,  apartment: 520000, townhouse: 720000,  trend: "rising", annualGrowth: 7.0 },
  "perth":         { house: 780000,  apartment: 450000, townhouse: 590000,  trend: "rising", annualGrowth: 11.0 },
  "adelaide":      { house: 850000,  apartment: 470000, townhouse: 640000,  trend: "rising", annualGrowth: 9.5 },
  "canberra":      { house: 950000,  apartment: 520000, townhouse: 700000,  trend: "stable", annualGrowth: 1.8 },
  "hobart":        { house: 750000,  apartment: 430000, townhouse: 570000,  trend: "stable", annualGrowth: 2.0 },
  "darwin":        { house: 620000,  apartment: 370000, townhouse: 480000,  trend: "stable", annualGrowth: 0.5 },
  "gold coast":    { house: 1200000, apartment: 620000, townhouse: 850000,  trend: "rising", annualGrowth: 8.5 },
  "sunshine coast":{ house: 1100000, apartment: 570000, townhouse: 780000,  trend: "rising", annualGrowth: 8.2 },
  "newcastle":     { house: 900000,  apartment: 470000, townhouse: 660000,  trend: "rising", annualGrowth: 5.5 },
  "wollongong":    { house: 1050000, apartment: 560000, townhouse: 770000,  trend: "rising", annualGrowth: 5.8 },
  "geelong":       { house: 780000,  apartment: 450000, townhouse: 590000,  trend: "rising", annualGrowth: 3.5 },
  "townsville":    { house: 480000,  apartment: 290000, townhouse: 380000,  trend: "rising", annualGrowth: 6.5 },
  "cairns":        { house: 520000,  apartment: 310000, townhouse: 400000,  trend: "rising", annualGrowth: 7.0 },
}

/**
 * Look up price guide for a given suburb, property type and bedroom count.
 * Returns { median, low, high, trend, annualGrowth, source, suburb }
 */
export function getPriceGuide(location, propertyType, bedrooms) {
  // Normalise inputs
  const suburbKey = location.toLowerCase().trim()
    .replace(/,.*$/, '')   // strip ", Melbourne" etc
    .trim()

  const typeKey = propertyType.toLowerCase()
  const priceKey = typeKey === 'house' ? 'house'
    : typeKey === 'apartment' ? 'apartment'
    : typeKey === 'townhouse' ? 'townhouse'
    : typeKey === 'land' ? 'house'       // use house as proxy for land
    : typeKey === 'commercial' ? 'house'
    : 'house'

  // Try exact suburb match
  let data = suburbData[suburbKey]
  let matchedName = suburbKey
  let isFallback = false

  // Try city fallback
  if (!data) {
    const cityKey = Object.keys(cityFallback).find(c =>
      suburbKey.includes(c) || c.includes(suburbKey)
    )
    if (cityKey) {
      data = cityFallback[cityKey]
      matchedName = cityKey
      isFallback = true
    }
  }

  // Generic Australian average if still nothing
  if (!data) {
    data = { house: 900000, apartment: 520000, townhouse: 680000, trend: "stable", annualGrowth: 3.5 }
    matchedName = "Australia (national average)"
    isFallback = true
  }

  let basePrice = data[priceKey] || data.house

  // Apply bedroom multiplier
  const multiplier = bedrooms
    ? (bedroomMultiplier[priceKey]?.[String(bedrooms)] || 1.0)
    : 1.0

  const median = Math.round((basePrice * multiplier) / 1000) * 1000
  const low    = Math.round((median * 0.82) / 1000) * 1000
  const high   = Math.round((median * 1.22) / 1000) * 1000

  return {
    median,
    low,
    high,
    trend: data.trend,
    annualGrowth: data.annualGrowth,
    source: isFallback ? `Estimated from ${matchedName} city median` : `${matchedName} suburb data`,
    isFallback,
  }
}