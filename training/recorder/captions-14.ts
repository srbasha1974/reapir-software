/**
 * Module 14 captions and worked-example cards, English and Tamil.
 *
 * Cards follow training/KPI-CATALOGUE.md §1.8 (Ramachandran's September: boards A–D; Round 4, K3 K4 K5).
 * The screen shows the local demo's scorecard, which also holds other training jobs, so the
 * captions never quote its numbers.
 */
import type { Example } from './13-kpi-helpers'

interface Captions {
  kicker: string
  title: string
  sub: string
  own: string
  closed: string
  exEff: Example
  eff: string
  std: string
  exFirst: Example
  first: string
  exRework: Example
  rework: string
  reworkDont: string
  exNr: Example
  nr: string
  exSmall: Example
  lead: string
  leadRework: string
  small: string
  together: string
  remember: string
  rules: string[]
}

const en: Captions = {
  kicker: 'Thulir training · Module 14 · Engineer · Service Head',
  title: 'Reading your scorecard',
  sub: 'Efficiency, first pass, rework, non-repairable, small sample. About 90 seconds.',
  own: 'Service › Performance. An engineer sees only their own row.<small>Demo figures on screen. Your figures will differ.</small>',
  closed: 'Closed: your jobs that closed this month.<small>Every column is a share of these.</small>',
  exEff: {
    kicker: 'Worked example · Efficiency',
    title: 'Ramachandran’s September: standard ÷ actual',
    rows: [
      ['Board A: standard 6 h, repair hours', '5 h', 'Baleswar’s 1 h check is his, not here'],
      ['Board B: standard 4 h, repair hours', '4 h', ''],
      ['Board C: standard 10 h, repair hours', '8 h', ''],
      ['Board D: no standard time', '—', 'left out on both sides'],
      ['= Efficiency  20 h ÷ 17 h', '117.6%', 'shown “of 3”'],
    ],
    read: 'Above 100% = faster than standard. “of 3” = only 3 of 4 jobs could be compared. Checking hours count as the checker’s.',
  },
  eff: 'Efficiency: on your repair hours, with “of N” when some jobs had no standard time.',
  std: 'Standard times are kept by the Operations Manager.<small>A board with no standard is not compared.</small>',
  exFirst: {
    kicker: 'Worked example · First pass',
    title: 'Passed peer verification first time',
    rows: [
      ['A, B, C: went through verification', '3', 'only these count'],
      ['A, C: passed first time', '2', 'B failed once'],
      ['D: written off, never verified', '—', 'in neither side'],
      ['= First pass  2 ÷ 3', '66.7%', ''],
    ],
    read: 'Only boards that went through peer verification count. A write-off is left out.',
  },
  first: 'First pass: passed first time ÷ boards that went through verification.',
  exRework: {
    kicker: 'Worked example · Rework (scorecard)',
    title: 'Your own work that came back',
    rows: [
      ['Jobs Ramachandran closed in September', '4', 'A, B, C, D'],
      ['31 Oct: A comes back as R', '1', 'Baleswar fixes R'],
      ['= Rework, September  1 ÷ 4', '25%', 'on Ramachandran’s row'],
      ['Baleswar, for fixing R', '0', 'not his rework'],
    ],
    read: 'It counts against the engineer whose repair came back, in the month the original closed. A recent month looks low: its boards have not had time to come back.',
  },
  rework: 'Rework: the share of your closed jobs that later came back.',
  reworkDont: 'Don’t count the comebacks you fixed for others.<small>They count against the engineer whose repair it was.</small>',
  exNr: {
    kicker: 'Worked example · Non-repairable',
    title: 'Closed as cannot-repair',
    rows: [
      ['D: Non-Repairable', '1', ''],
      ['Jobs closed', '4', ''],
      ['= Non-repairable  1 ÷ 4', '25%', ''],
    ],
    read: 'Customer Rejected is not counted here, unlike Yield’s wastage.',
  },
  nr: 'Non-repairable: jobs closed as Non-Repairable ÷ jobs closed.',
  exSmall: {
    kicker: 'Worked example · Small sample',
    title: 'Too few jobs to compare',
    rows: [
      ['Jobs closed by Ramachandran', '4', ''],
      ['Minimum for comparison (configuration)', '5', ''],
      ['= 4 is below 5', 'Small sample', 'listed last, not ranked'],
      ['No closed job with a standard time', 'not comparable', 'Efficiency is not guessed'],
    ],
    read: 'On two or three jobs, a percentage measures luck, not skill.',
  },
  lead: 'The Service Head sees every engineer.',
  leadRework: 'Board A came back, fixed by Test Both Roles: it counts on Test Engineer’s Rework.<small>Your figures will differ.</small>',
  small: 'Small sample: below the minimum, so not ranked.<small>“not comparable”: no job with a standard time.</small>',
  together: 'Read speed next to first pass and rework, never alone.',
  remember: 'Remember',
  rules: [
    '<b>Efficiency</b> = standard hours ÷ hours logged, on comparable jobs only',
    '<b>First pass</b> = passed first time, over boards that went through verification',
    '<b>Rework</b> = your own closures that <b>came back</b>, whoever fixed them',
    '<b>Small sample</b>: fewer than 5 closures, so not ranked',
  ],
}

const ta: Captions = {
  kicker: 'துளிர் ட்ரெயினிங் · மாட்யூல் 14 · இன்ஜினியர் · சர்வீஸ் ஹெட்',
  title: 'உங்க ஸ்கோர்கார்டை எப்படி படிக்கறது',
  sub: 'எஃபிஷியன்சி, ஃபர்ஸ்ட் பாஸ், ரீவொர்க், நான்-ரிப்பேரபிள், ஸ்மால் சாம்பிள். சுமார் 2 நிமிடம்.',
  own: 'Service › Performance. இன்ஜினியருக்கு அவங்க ரோ மட்டும் தெரியும்.<small>ஸ்க்ரீன்ல இருக்கறது டெமோ நம்பர். உங்க நம்பர் வேற மாதிரி இருக்கும்.</small>',
  closed: 'Closed: இந்த மாசம் க்ளோஸ் ஆன உங்க ஜாப்.<small>எல்லா காலமும் இதுல எத்தனை சதவீதம்னு தான்.</small>',
  exEff: {
    kicker: 'உதாரணம் · Efficiency',
    title: 'ராமச்சந்திரன் செப்டம்பர்: ஸ்டாண்டர்டு ÷ போட்ட ஹவர்ஸ்',
    rows: [
      ['போர்டு A: ஸ்டாண்டர்டு 6 h, ரிப்பேர் ஹவர்ஸ்', '5 h', 'பாலேஸ்வரோட 1 h செக் அவரோடது, இதுல இல்ல'],
      ['போர்டு B: ஸ்டாண்டர்டு 4 h, ரிப்பேர் ஹவர்ஸ்', '4 h', ''],
      ['போர்டு C: ஸ்டாண்டர்டு 10 h, ரிப்பேர் ஹவர்ஸ்', '8 h', ''],
      ['போர்டு D: ஸ்டாண்டர்டு டைம் இல்ல', '—', 'ரெண்டு பக்கமும் சேராது'],
      ['= எஃபிஷியன்சி  20 h ÷ 17 h', '117.6%', '“of 3” ன்னு வரும்'],
    ],
    read: '100%-க்கு மேலன்னா ஸ்டாண்டர்டை விட வேகம். “of 3” = 4-ல 3 ஜாப் மட்டும் கம்பேர் ஆச்சு. செக் பண்ண ஹவர்ஸ் செக் பண்ணவரோடது.',
  },
  eff: 'Efficiency: உங்க ரிப்பேர் ஹவர்ஸ் மேல. சில ஜாப்புக்கு ஸ்டாண்டர்டு டைம் இல்லன்னா “of N” வரும்.',
  std: 'ஸ்டாண்டர்டு டைம் ஆப்பரேஷன்ஸ் மேனேஜர் வெச்சுக்கறாங்க.<small>ஸ்டாண்டர்டு இல்லாத போர்டு கம்பேர் ஆகாது.</small>',
  exFirst: {
    kicker: 'உதாரணம் · First pass',
    title: 'முதல் தடவையே பியர் வெரிஃபிகேஷன் பாஸ்',
    rows: [
      ['A, B, C: வெரிஃபிகேஷன் போனது', '3', 'இது மட்டும் கணக்கு'],
      ['A, C: முதல் தடவையே பாஸ்', '2', 'B ஒரு தடவை ஃபெயில்'],
      ['D: ரைட்-ஆஃப், வெரிஃபை ஆகவே இல்ல', '—', 'எந்த பக்கமும் சேராது'],
      ['= ஃபர்ஸ்ட் பாஸ்  2 ÷ 3', '66.7%', ''],
    ],
    read: 'பியர் வெரிஃபிகேஷன் போன போர்டு மட்டும் கணக்கு. ரைட்-ஆஃப் சேராது.',
  },
  first: 'First pass: முதல் தடவையே பாஸ் ÷ வெரிஃபிகேஷன் போன போர்டு.',
  exRework: {
    kicker: 'உதாரணம் · Rework (ஸ்கோர்கார்டு)',
    title: 'உங்க வேலை திரும்ப வந்தது',
    rows: [
      ['ராமச்சந்திரன் செப்டம்பர்ல க்ளோஸ் பண்ணது', '4', 'A, B, C, D'],
      ['31 Oct: A, R-ஆ திரும்ப வருது', '1', 'R-ஐ பாலேஸ்வர் சரி பண்றார்'],
      ['= ரீவொர்க், செப்டம்பர்  1 ÷ 4', '25%', 'ராமச்சந்திரன் ரோவுல'],
      ['R-ஐ சரி பண்ணதுக்கு பாலேஸ்வருக்கு', '0', 'அவரோட ரீவொர்க் இல்ல'],
    ],
    read: 'யாரோட ரிப்பேர் திரும்ப வந்துச்சோ அவங்க மேல, ஒரிஜினல் க்ளோஸ் ஆன மாசத்துல எண்ணும். ரீசன்ட் மாசம் கம்மியா தெரியும்: போர்டு திரும்ப வர டைம் ஆகல.',
  },
  rework: 'Rework: நீங்க க்ளோஸ் பண்ணதுல அப்புறம் திரும்ப வந்தது எத்தனை சதவீதம்.',
  reworkDont: 'மத்தவங்களுக்கு நீங்க சரி பண்ண ரீவொர்க்கை எண்ணாதீங்க.<small>அது யாரோட ரிப்பேரோ அவங்க மேல தான்.</small>',
  exNr: {
    kicker: 'உதாரணம் · Non-repairable',
    title: 'ரிப்பேர் பண்ண முடியாதுன்னு க்ளோஸ்',
    rows: [
      ['D: Non-Repairable', '1', ''],
      ['க்ளோஸ் ஆன ஜாப்', '4', ''],
      ['= நான்-ரிப்பேரபிள்  1 ÷ 4', '25%', ''],
    ],
    read: 'Customer Rejected இங்க சேராது. யீல்டுல வேஸ்டேஜ்ல சேரும், இங்க இல்ல.',
  },
  nr: 'Non-repairable: Non-Repairable-ஆ க்ளோஸ் ஆனது ÷ க்ளோஸ் ஆன ஜாப்.',
  exSmall: {
    kicker: 'உதாரணம் · Small sample',
    title: 'கம்பேர் பண்ண ஜாப் பத்தாது',
    rows: [
      ['ராமச்சந்திரன் க்ளோஸ் பண்ணது', '4', ''],
      ['கம்பேர் பண்ண குறைந்தபட்சம் (கான்ஃபிகரேஷன்)', '5', ''],
      ['= 4, 5-ஐ விட கம்மி', 'Small sample', 'கடைசியா வரும், ரேங்க் இல்ல'],
      ['ஸ்டாண்டர்டு டைம் உள்ள ஜாப் இல்ல', 'not comparable', 'எஃபிஷியன்சியை ஊகிக்காது'],
    ],
    read: '2, 3 ஜாப்ல வர்ற சதவீதம் லக், ஸ்கில் இல்ல.',
  },
  lead: 'சர்வீஸ் ஹெட்டுக்கு எல்லா இன்ஜினியரும் தெரியும்.',
  leadRework: 'போர்டு A திரும்ப வந்துச்சு, Test Both Roles சரி பண்ணார்: அது Test Engineer-ஓட Rework-ல சேருது.<small>உங்க நம்பர் வேற மாதிரி இருக்கும்.</small>',
  small: 'Small sample: குறைந்தபட்சத்துக்கு கீழ, அதனால ரேங்க் இல்ல.<small>“not comparable”: ஸ்டாண்டர்டு டைம் உள்ள ஜாப் இல்ல.</small>',
  together: 'வேகத்தை தனியா பார்க்காதீங்க. ஃபர்ஸ்ட் பாஸ், ரீவொர்க் கூட சேர்த்து பாருங்க.',
  remember: 'ஞாபகம் வெச்சுக்கோங்க',
  rules: [
    '<b>எஃபிஷியன்சி</b> = ஸ்டாண்டர்டு ஹவர்ஸ் ÷ போட்ட ஹவர்ஸ், கம்பேர் ஆகற ஜாப் மட்டும்',
    '<b>ஃபர்ஸ்ட் பாஸ்</b> = வெரிஃபிகேஷன் போன போர்டுல முதல் தடவையே பாஸ்',
    '<b>ரீவொர்க்</b> = உங்க க்ளோஸ் <b>திரும்ப வந்தது</b>, யார் சரி பண்ணாலும்',
    '<b>Small sample</b>: 5-க்கு கம்மியான க்ளோஸ், ரேங்க் இல்ல',
  ],
}

export const CAPTIONS = { en, ta } as const
export type Lang = keyof typeof CAPTIONS
