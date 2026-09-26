/**
 * Module 14 captions and worked-example cards, English and Tamil.
 *
 * Cards follow training/KPI-CATALOGUE.md §1.8 (Ramachandran's September: boards A–D).
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
      ['Board A: standard 6 h, logged', '6 h', 'includes 1 h of peer verification'],
      ['Board B: standard 4 h, logged', '4 h', ''],
      ['Board C: standard 10 h, logged', '8 h', ''],
      ['Board D: no standard time', '—', 'left out on both sides'],
      ['= Efficiency  20 h ÷ 18 h', '111.1%', 'shown “of 3”'],
    ],
    read: 'Above 100% = faster than standard. “of 3” = only 3 of 4 jobs could be compared.',
  },
  eff: 'Efficiency, with “of N” when some jobs had no standard time.',
  std: 'Standard times are kept by the Operations Manager.<small>A board with no standard is not compared.</small>',
  exFirst: {
    kicker: 'Worked example · First pass',
    title: 'Passed peer verification first time',
    rows: [
      ['A, C: passed first time', '2', ''],
      ['B: failed once, then passed', '0', 'not a first pass'],
      ['D: written off, never verified', '1', 'still counts as a first pass'],
      ['= First pass  3 ÷ 4', '75%', ''],
    ],
    read: 'A write-off with no failed verification counts as a first pass.',
  },
  first: 'First pass: jobs with no failed verification ÷ jobs closed.',
  exRework: {
    kicker: 'Worked example · Rework (scorecard)',
    title: 'Rework jobs among the jobs you closed',
    rows: [
      ['Jobs closed in September', '4', 'none of them a rework job'],
      ['= Rework  0 ÷ 4', '0%', ''],
      ['October: you close R (A came back) + 9 others', '1 ÷ 10', 'R is a rework job'],
      ['= Rework, October', '10%', 'even if someone else did A'],
    ],
    read: 'It counts rework jobs you handled. The comeback’s cost is charged to the original job.',
  },
  rework: 'Rework: the share of your closed jobs that were rework jobs.',
  reworkDont: 'Don’t read Rework as “my repairs came back”.<small>A comeback you fix for someone else counts here.</small>',
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
  small: 'Small sample: below the minimum, so not ranked.<small>“not comparable”: no job with a standard time.</small>',
  together: 'Read speed next to first pass and rework, never alone.',
  remember: 'Remember',
  rules: [
    '<b>Efficiency</b> = standard hours ÷ hours logged, on comparable jobs only',
    '<b>First pass</b> = no failed verification. Write-offs count as first pass',
    '<b>Rework</b> = rework jobs you closed, not comebacks of your own work',
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
      ['போர்டு A: ஸ்டாண்டர்டு 6 h, போட்டது', '6 h', '1 h பியர் வெரிஃபிகேஷனும் சேர்ந்து'],
      ['போர்டு B: ஸ்டாண்டர்டு 4 h, போட்டது', '4 h', ''],
      ['போர்டு C: ஸ்டாண்டர்டு 10 h, போட்டது', '8 h', ''],
      ['போர்டு D: ஸ்டாண்டர்டு டைம் இல்ல', '—', 'ரெண்டு பக்கமும் சேராது'],
      ['= எஃபிஷியன்சி  20 h ÷ 18 h', '111.1%', '“of 3” ன்னு வரும்'],
    ],
    read: '100%-க்கு மேலன்னா ஸ்டாண்டர்டை விட வேகம். “of 3” = 4-ல 3 ஜாப் மட்டும் கம்பேர் ஆச்சு.',
  },
  eff: 'Efficiency. சில ஜாப்புக்கு ஸ்டாண்டர்டு டைம் இல்லன்னா “of N” வரும்.',
  std: 'ஸ்டாண்டர்டு டைம் ஆப்பரேஷன்ஸ் மேனேஜர் வெச்சுக்கறாங்க.<small>ஸ்டாண்டர்டு இல்லாத போர்டு கம்பேர் ஆகாது.</small>',
  exFirst: {
    kicker: 'உதாரணம் · First pass',
    title: 'முதல் தடவையே பியர் வெரிஃபிகேஷன் பாஸ்',
    rows: [
      ['A, C: முதல் தடவையே பாஸ்', '2', ''],
      ['B: ஒரு தடவை ஃபெயில், அப்புறம் பாஸ்', '0', 'ஃபர்ஸ்ட் பாஸ் இல்ல'],
      ['D: ரைட்-ஆஃப், வெரிஃபை ஆகவே இல்ல', '1', 'இதுவும் ஃபர்ஸ்ட் பாஸ் கணக்கு'],
      ['= ஃபர்ஸ்ட் பாஸ்  3 ÷ 4', '75%', ''],
    ],
    read: 'வெரிஃபிகேஷன் ஃபெயில் இல்லாத ரைட்-ஆஃப்பும் ஃபர்ஸ்ட் பாஸ்ல சேரும்.',
  },
  first: 'First pass: வெரிஃபிகேஷன் ஃபெயில் இல்லாத ஜாப் ÷ க்ளோஸ் ஆன ஜாப்.',
  exRework: {
    kicker: 'உதாரணம் · Rework (ஸ்கோர்கார்டு)',
    title: 'நீங்க க்ளோஸ் பண்ணதுல ரீவொர்க் ஜாப் எத்தனை',
    rows: [
      ['செப்டம்பர்ல க்ளோஸ் ஆனது', '4', 'எதுவும் ரீவொர்க் ஜாப் இல்ல'],
      ['= ரீவொர்க்  0 ÷ 4', '0%', ''],
      ['அக்டோபர்: R (A திரும்ப வந்தது) + 9 க்ளோஸ்', '1 ÷ 10', 'R ஒரு ரீவொர்க் ஜாப்'],
      ['= ரீவொர்க், அக்டோபர்', '10%', 'A-வை வேற யாரு பண்ணியிருந்தாலும்'],
    ],
    read: 'நீங்க கையாண்ட ரீவொர்க் ஜாப்பை எண்ணும். திரும்ப வந்ததோட காஸ்ட் பழைய ஜாப் மேல போகும்.',
  },
  rework: 'Rework: நீங்க க்ளோஸ் பண்ணதுல ரீவொர்க் ஜாப் எத்தனை சதவீதம்.',
  reworkDont: 'Rework-ஐ “என் ரிப்பேர் திரும்ப வந்தது”ன்னு படிக்காதீங்க.<small>வேற ஒருத்தரோட போர்டை நீங்க சரி பண்ணாலும் இங்க சேரும்.</small>',
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
  small: 'Small sample: குறைந்தபட்சத்துக்கு கீழ, அதனால ரேங்க் இல்ல.<small>“not comparable”: ஸ்டாண்டர்டு டைம் உள்ள ஜாப் இல்ல.</small>',
  together: 'வேகத்தை தனியா பார்க்காதீங்க. ஃபர்ஸ்ட் பாஸ், ரீவொர்க் கூட சேர்த்து பாருங்க.',
  remember: 'ஞாபகம் வெச்சுக்கோங்க',
  rules: [
    '<b>எஃபிஷியன்சி</b> = ஸ்டாண்டர்டு ஹவர்ஸ் ÷ போட்ட ஹவர்ஸ், கம்பேர் ஆகற ஜாப் மட்டும்',
    '<b>ஃபர்ஸ்ட் பாஸ்</b> = வெரிஃபிகேஷன் ஃபெயில் இல்ல. ரைட்-ஆஃப்பும் சேரும்',
    '<b>ரீவொர்க்</b> = நீங்க க்ளோஸ் பண்ண ரீவொர்க் ஜாப், உங்க வேலை திரும்ப வந்தது இல்ல',
    '<b>Small sample</b>: 5-க்கு கம்மியான க்ளோஸ், ரேங்க் இல்ல',
  ],
}

export const CAPTIONS = { en, ta } as const
export type Lang = keyof typeof CAPTIONS
