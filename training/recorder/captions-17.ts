/**
 * Module 17 captions and worked-example cards, English and Tamil.
 *
 * Cards follow training/KPI-CATALOGUE.md Module 3 (Arun = Test Sales Engineer, Priya = Test Sales
 * Head; boards A–D from kpi-seed.json). Where the demo differs from the catalogue (C's normal price
 * was typed, no Filled deliveries, no account has reached Regular), the captions say so.
 */
import type { Example } from './13-kpi-helpers'

interface Captions {
  kicker: string
  title: string
  sub: string
  open: string
  exCharged: Example
  charged: string
  drill: string
  rowA: string
  rowC: string
  rowD: string
  unpriced: string
  exFilled: Example
  filled: string
  exPrem: Example
  premTab: string
  premRows: string
  byHand: string
  segment: string
  premDont: string
  exWon: Example
  won: string
  exConv: Example
  conv: string
  bars: string
  exVel: Example
  vel: string
  remember: string
  rules: string[]
}

const en: Captions = {
  kicker: 'Thulir training · Module 17 · Sales Head · Sales Engineer',
  title: 'What your accounts are worth',
  sub: 'Charged, filled, unpriced, premium and discount, won, conversion, velocity. About 2½ minutes.',
  open: 'Overview › Sales. By engineer: what each person’s accounts produced.<small>Demo figures on screen. Your figures will differ.</small>',
  exCharged: {
    kicker: 'Worked example · Charged',
    title: 'Arun’s September',
    rows: [
      ['Board A: quoted ₹12,000 (normal ₹10,000)', '₹12,000', 'premium included'],
      ['Board C: sold at ₹8,000 (normal ₹10,000)', '₹8,000', 'discount netted'],
      ['Board D: written off, never priced', '—', 'counted: “1 unpriced”'],
      ['= Arun’s Charged', '₹20,000', ''],
      ['Board B came from Priya’s delivery', '₹6,000', 'on Priya’s row'],
    ],
    read: 'The value of closed work from deliveries you brought in. Not invoiced, not collected.',
  },
  charged: 'Charged: the price on closed jobs from deliveries you brought in.<small>Nothing is read back from Zoho.</small>',
  drill: 'Open it to see the jobs behind the figure.',
  rowA: 'Board A: ₹12,000, the premium included.',
  rowC: 'Board C: ₹8,000, the discount already taken off.',
  rowD: 'Board D: “not priced”. Counted, never summed.',
  unpriced: 'Closed jobs with no price show as “unpriced” beside the total.',
  exFilled: {
    kicker: 'Worked example · Filled',
    title: 'Credit the system had to assume',
    rows: [
      ['Arun’s Charged', '₹20,000', ''],
      ['C’s delivery pre-dates attribution', '₹8,000', 'filled with the owner, Arun'],
      ['= Filled', '₹8,000', ''],
      ['Credit recorded at the counter', '₹12,000', ''],
    ],
    read: 'The lower the filled share, the more you can trust Charged. It should fade to zero.',
  },
  filled: 'Filled is “—” here: every demo delivery names who brought it in.',
  exPrem: {
    kicker: 'Worked example · Premium and discount by customer',
    title: 'Who pays for urgency, who pays below normal',
    rows: [
      ['AYYAN (board A): 1 job', '+ ₹2,000', 'premium · Set by hand ₹2,000 (typed)'],
      ['C’s customer: 1 job', '− ₹2,000', 'discount · Set by hand — (rate card)'],
      ['= Reported apart', 'never ₹0', 'the two columns do not net'],
    ],
    read: 'Always discounted = a pricing conversation. A premium on a typed price proves little until rate cards exist.',
  },
  premTab: 'Profitability › Premium, by Customer.',
  premRows: 'Premium and Discount, per customer.<small>Here C’s normal price was typed too, so it also shows under Set by hand.</small>',
  byHand: 'Set by hand: how much rests on a typed normal price, and who typed it.<small>The Sales Head reads these. Quotation raisers set prices.</small>',
  segment: 'The same view by Segment.',
  premDont: 'Don’t net premium and discount into “₹0 overall”.',
  exWon: {
    kicker: 'Worked example · Won',
    title: 'Credit to the owner at conversion',
    rows: [
      ['March: Priya opens a hospital account', 'Mar', 'the cohort month'],
      ['June: it becomes Regular, Priya owns it', 'Jun', ''],
      ['August: handed to Arun', 'Aug', ''],
      ['= Won, March', 'Priya 1', 'June shows nothing. Arun never gets it'],
    ],
    read: 'A recent month looks weak: its accounts have not had time to convert. Compare months a quarter old.',
  },
  won: 'Won: no demo account has become Regular yet, so 0.',
  exConv: {
    kicker: 'Worked example · Team conversion',
    title: 'Q1’s accounts, followed',
    rows: [
      ['Accounts opened in Q1', '40', 'Potential bar'],
      ['… reached Trial', '21', 'Trial bar'],
      ['… reached Regular', '6', 'Regular bar'],
      ['= Team conversion  6 ÷ 40', '15.0%', ''],
    ],
    read: 'The same quarter’s figure keeps rising as the cohort matures. It is not a live monthly rate.',
  },
  conv: 'Team conversion: for the team only, never per engineer.',
  bars: 'The bars follow the same cohort: Potential, Trial, Regular.',
  exVel: {
    kicker: 'Worked example · Funnel velocity',
    title: 'Trial → Regular, five accounts',
    rows: [
      ['Days each took', '10, 20, 34, 40, 90', ''],
      ['= Median', '34 d', 'what the screen shows'],
      ['Mean, for comparison', '38.8 d', 'pulled up by the 90-day account'],
    ],
    read: 'Only accounts that took the step count. Long Trial → Regular times: trial customers are drifting.',
  },
  vel: 'The medians. “none yet” means nobody has taken that step.',
  remember: 'Remember',
  rules: [
    '<b>Charged</b> = system price on closed jobs you brought in. Not money collected',
    '<b>Unpriced</b> jobs are counted, not summed. <b>Filled</b> should fade to zero',
    '<b>Premium</b> and <b>discount</b> are reported apart, never netted',
    '<b>Won</b> and <b>conversion</b> follow the month an account was opened',
  ],
}

const ta: Captions = {
  kicker: 'துளிர் ட்ரெயினிங் · மாட்யூல் 17 · சேல்ஸ் ஹெட் · சேல்ஸ் இன்ஜினியர்',
  title: 'உங்க அக்கவுண்ட்டுகளோட மதிப்பு',
  sub: 'சார்ஜ்டு, ஃபில்டு, அன்ப்ரைஸ்டு, ப்ரீமியம், டிஸ்கவுண்ட், வொன், கன்வர்ஷன், வேகம். சுமார் 2½ நிமிடம்.',
  open: 'Overview › Sales. “By engineer”: ஒவ்வொருத்தர் அக்கவுண்ட்டும் என்ன கொடுத்தது.<small>ஸ்க்ரீன்ல இருக்கறது டெமோ நம்பர். உங்க நம்பர் வேற மாதிரி இருக்கும்.</small>',
  exCharged: {
    kicker: 'உதாரணம் · Charged',
    title: 'அருணோட செப்டம்பர்',
    rows: [
      ['போர்டு A: கொட்டேஷன் ₹12,000 (நார்மல் ₹10,000)', '₹12,000', 'ப்ரீமியம் சேர்த்து'],
      ['போர்டு C: ₹8,000-க்கு (நார்மல் ₹10,000)', '₹8,000', 'டிஸ்கவுண்ட் கழிச்சு'],
      ['போர்டு D: ரைட்-ஆஃப், விலையே போடல', '—', 'எண்ணும்: “1 unpriced”'],
      ['= அருணோட Charged', '₹20,000', ''],
      ['போர்டு B ப்ரியாவோட டெலிவரி', '₹6,000', 'ப்ரியா ரோவுல'],
    ],
    read: 'நீங்க கொண்டு வந்த டெலிவரில க்ளோஸ் ஆன வேலையோட மதிப்பு. இன்வாய்ஸ் இல்ல, வசூலும் இல்ல.',
  },
  charged: 'Charged: நீங்க கொண்டு வந்த டெலிவரில க்ளோஸ் ஆன ஜாப்போட விலை.<small>Zoho-ல இருந்து எதுவும் வராது.</small>',
  drill: 'க்ளிக் பண்ணா அதுக்கு பின்னாடி இருக்கற ஜாப்ஸ் தெரியும்.',
  rowA: 'போர்டு A: ₹12,000, ப்ரீமியம் சேர்த்து.',
  rowC: 'போர்டு C: ₹8,000, டிஸ்கவுண்ட் ஏற்கனவே கழிச்சாச்சு.',
  rowD: 'போர்டு D: “not priced”. எண்ணும், கூட்டாது.',
  unpriced: 'விலை இல்லாத க்ளோஸ் ஜாப் டோட்டல் பக்கத்துல “unpriced”-ஆ வரும்.',
  exFilled: {
    kicker: 'உதாரணம் · Filled',
    title: 'சிஸ்டம் ஊகிச்சு போட்ட கிரெடிட்',
    rows: [
      ['அருணோட Charged', '₹20,000', ''],
      ['C-யோட டெலிவரி அட்ரிப்யூஷனுக்கு முன்னாடி', '₹8,000', 'ஓனர் அருண் பேர்ல ஃபில் ஆச்சு'],
      ['= Filled', '₹8,000', ''],
      ['கவுண்டர்லயே பதிவான கிரெடிட்', '₹12,000', ''],
    ],
    read: 'ஃபில்டு எவ்வளவு கம்மியோ, Charged அவ்வளவு நம்பலாம். போகப்போக 0 ஆகணும்.',
  },
  filled: 'இங்க Filled “—”: டெமோவுல எல்லா டெலிவரிலயும் யார் கொண்டு வந்தாங்கன்னு இருக்கு.',
  exPrem: {
    kicker: 'உதாரணம் · கஸ்டமர் வாரியா ப்ரீமியம், டிஸ்கவுண்ட்',
    title: 'யார் அவசரத்துக்கு பணம் தர்றாங்க, யார் நார்மலுக்கு கீழ',
    rows: [
      ['AYYAN (போர்டு A): 1 ஜாப்', '+ ₹2,000', 'ப்ரீமியம் · Set by hand ₹2,000 (டைப் பண்ணது)'],
      ['C-யோட கஸ்டமர்: 1 ஜாப்', '− ₹2,000', 'டிஸ்கவுண்ட் · Set by hand — (ரேட் கார்டு)'],
      ['= தனித்தனியா', '₹0 இல்ல', 'ரெண்டு காலமும் கழிக்காது'],
    ],
    read: 'எப்பவும் டிஸ்கவுண்ட்னா ப்ரைஸிங் பேசணும். டைப் பண்ண விலையில ப்ரீமியம், ரேட் கார்டு வர்ற வரை பெரிசா நிரூபிக்காது.',
  },
  premTab: 'Profitability › “Premium”, “Customer” வாரியா.',
  premRows: 'கஸ்டமர் வாரியா Premium, Discount.<small>இங்க C-யோட நார்மல் விலையும் டைப் பண்ணது, அதனால அதுவும் Set by hand-ல வருது.</small>',
  byHand: 'Set by hand: டைப் பண்ண நார்மல் விலை மேல எவ்வளவு நிக்குது, யார் டைப் பண்ணாங்க.<small>சேல்ஸ் ஹெட் படிப்பாங்க. விலை போடறது கொட்டேஷன் போடறவங்க.</small>',
  segment: 'இதையே “Segment” வாரியாவும் பார்க்கலாம்.',
  premDont: 'ப்ரீமியம், டிஸ்கவுண்டை கழிச்சு “மொத்தம் ₹0”ன்னு சொல்லாதீங்க.',
  exWon: {
    kicker: 'உதாரணம் · Won',
    title: 'கன்வர்ட் ஆனப்போ ஓனருக்கு கிரெடிட்',
    rows: [
      ['மார்ச்: ப்ரியா ஒரு ஹாஸ்பிடல் அக்கவுண்ட் திறக்கறாங்க', 'Mar', 'கோஹார்ட் மாசம்'],
      ['ஜூன்: Regular ஆகுது, ஓனர் ப்ரியா', 'Jun', ''],
      ['ஆகஸ்ட்: அருணுக்கு மாத்தறாங்க', 'Aug', ''],
      ['= Won, மார்ச்', 'ப்ரியா 1', 'ஜூன்ல எதுவும் இல்ல. அருணுக்கு வராது'],
    ],
    read: 'புது மாசம் வீக்கா தெரியும்: அதோட அக்கவுண்ட் கன்வர்ட் ஆக டைம் ஆகல. 3 மாசம் பழைய மாசங்களை கம்பேர் பண்ணுங்க.',
  },
  won: 'Won: டெமோவுல எந்த அக்கவுண்ட்டும் இன்னும் Regular ஆகல, அதனால 0.',
  exConv: {
    kicker: 'உதாரணம் · Team conversion',
    title: 'Q1 அக்கவுண்ட்டுகளை ஃபாலோ பண்றது',
    rows: [
      ['Q1-ல திறந்த அக்கவுண்ட்', '40', 'Potential பார்'],
      ['… Trial ஆனது', '21', 'Trial பார்'],
      ['… Regular ஆனது', '6', 'Regular பார்'],
      ['= டீம் கன்வர்ஷன்  6 ÷ 40', '15.0%', ''],
    ],
    read: 'கோஹார்ட் வளர வளர அதே க்வார்ட்டர் நம்பர் ஏறிக்கிட்டே இருக்கும். இது லைவ் மாச ரேட் இல்ல.',
  },
  conv: 'Team conversion: டீமுக்கு மட்டும், இன்ஜினியர் வாரியா இல்ல.',
  bars: 'பார்கள் அதே கோஹார்ட்டை ஃபாலோ பண்ணுது: Potential, Trial, Regular.',
  exVel: {
    kicker: 'உதாரணம் · Funnel velocity',
    title: 'Trial → Regular, 5 அக்கவுண்ட்',
    rows: [
      ['ஒவ்வொண்ணுக்கும் ஆன நாள்', '10, 20, 34, 40, 90', ''],
      ['= மீடியன்', '34 d', 'ஸ்க்ரீன்ல வர்றது'],
      ['சராசரி, கம்பேர் பண்ண', '38.8 d', '90 நாள் அக்கவுண்ட் இழுக்குது'],
    ],
    read: 'அந்த ஸ்டெப் எடுத்த அக்கவுண்ட் மட்டும் சேரும். Trial → Regular ரொம்ப நாள்னா ட்ரயல் கஸ்டமர் அப்படியே விடப்படறாங்க.',
  },
  vel: 'மீடியன்கள். “none yet”னா இன்னும் யாரும் அந்த ஸ்டெப் எடுக்கல.',
  remember: 'ஞாபகம் வெச்சுக்கோங்க',
  rules: [
    '<b>Charged</b> = நீங்க கொண்டு வந்த க்ளோஸ் ஜாப்போட சிஸ்டம் விலை. வசூல் இல்ல',
    '<b>Unpriced</b> ஜாப் எண்ணும், கூட்டாது. <b>Filled</b> 0 நோக்கி போகணும்',
    '<b>ப்ரீமியம்</b>, <b>டிஸ்கவுண்ட்</b> தனித்தனி, கழிக்காது',
    '<b>Won</b>, <b>கன்வர்ஷன்</b> அக்கவுண்ட் திறந்த மாசப்படி',
  ],
}

export const CAPTIONS = { en, ta } as const
export type Lang = keyof typeof CAPTIONS
