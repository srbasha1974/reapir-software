/**
 * Module 13 captions and worked-example cards, English and Tamil.
 *
 * Numbers on the cards follow training/KPI-CATALOGUE.md's worked month (boards A–D, comeback R,
 * open jobs E and F). The screen shows the local demo's own figures, and the captions say so.
 * Tamil follows TAMIL-STYLE.md: business words in Tamil script, on-screen labels in English letters.
 */
import type { Example } from './13-kpi-helpers'

interface Captions {
  kicker: string
  title: string
  sub: string
  demo: string
  period: string
  exYield: Example
  yieldTile: string
  yieldBar: string
  yieldDont: string
  exWaste: Example
  waste: string
  exRework: Example
  rework: string
  exAging: Example
  agingCols: string
  agingOld: string
  gates: string
  liaison: string
  exStuck: Example
  stuckTile: string
  stuckList: string
  stuckRule: string
  stuckDo: string
  exStalled: Example
  stalled: string
  stalledPending: string
  twoLists: string
  exUnbilled: Example
  unbilledTile: string
  unbilledSplit: string
  unbilledGap: string
  unbilledDont: string
  remember: string
  rules: string[]
}

const en: Captions = {
  kicker: 'Thulir training · Module 13 · Service Head · Operations Manager',
  title: 'Where the floor loses time',
  sub: 'Yield, wastage, rework, queues, stuck boards, unbilled hours. About 3 minutes.',
  demo: 'The MIS dashboard.<small>Demo figures on screen. Your figures will differ.</small>',
  period: 'Every figure follows the period you pick.<small>Here: This month, September.</small>',
  exYield: {
    kicker: 'Worked example · Yield',
    title: 'September: four boards closed',
    rows: [
      ['Boards A, B, C → Ready for Invoice', '3', 'success'],
      ['Board D → Non-Repairable', '1', 'wastage'],
      ['= Yield  3 ÷ (3 + 1)', '75.0%', 'shown as “3 : 1 success to wastage”'],
    ],
    read: 'Customer Rejected is wastage too, even when the customer only refused the price.',
  },
  yieldTile: 'Yield: of the boards closed, the share we repaired.<small>Nothing closed? It says “Nothing to measure”, not 0%.</small>',
  yieldBar: 'The bar splits the closures.<small>Ready for Invoice against written off and customer rejected.</small>',
  yieldDont: 'Don’t read wastage as “engineers failed”.<small>Board type drives it more than skill. Use Segment to see where.</small>',
  exWaste: {
    kicker: 'Worked example · Wastage cost this period',
    title: 'Hours sunk into write-offs',
    rows: [
      ['Board D, written off in September', '6 h', 'every hour ever logged on it'],
      ['… of which logged in August', '2 h', 'still counted'],
      ['= Wastage cost this period', '6 h', ''],
    ],
    read: 'Not a September-hours figure: don’t match it to the month’s timesheets.',
  },
  waste: 'Wastage cost this period.<small>One 30-hour write-off is a job someone should have stopped earlier.</small>',
  exRework: {
    kicker: 'Worked example · Rework rate',
    title: 'Second attempts among closures',
    rows: [
      ['September: 4 closures, none a rework', '0 ÷ 4', ''],
      ['= Rework rate, September', '0.0%', ''],
      ['October: R (board A came back) + 9 others', '1 ÷ 10', 'R has a previous job number'],
      ['= Rework rate, October', '10.0%', ''],
    ],
    read: 'Rising rework = repairs are not holding. The scorecard’s Rework column is a different figure.',
  },
  rework: 'Rework jobs: closures that were a second attempt at an earlier job.',
  exAging: {
    kicker: 'Worked example · Queue aging',
    title: 'Days in the current state',
    rows: [
      ['Board B enters Ready for Verification', '12 Sep', ''],
      ['Looked at on', '20 Sep', ''],
      ['= Days in state', '8 d', '→ column 6–10 d'],
      ['Registered on 1 Aug?', 'still 8 d', 'the job’s total age does not count'],
    ],
    read: 'At a testing gate, 6 days or more is called out: finished repairs that earn nothing yet.',
  },
  agingCols: 'Rows: every open state. Columns: days in that state.<small>Every count opens its boards.</small>',
  agingOld: 'This Pending Spare board has sat 11 days or more.',
  gates: 'The testing gates: Ready for Verification and Awaiting Customer Confirmation.<small>Chase verifiers and customers first.</small>',
  liaison: 'Age in Under Assessment or Awaiting Customer Input is the Liaison’s queue, not the floor’s.',
  exStuck: {
    kicker: 'Worked example · Stuck tasks',
    title: 'Nobody has touched it',
    rows: [
      ['In Progress board, last touched', 'Thu 10 Sep', 'hours, a part, or a status change'],
      ['Thu 17 Sep: business days idle', '5', '5 is not more than 5: not stuck'],
      ['= Fri 18 Sep: business days idle', '6', 'stuck'],
      ['Engineer logs 0.5 h on the 18th', '0', 'the clock resets'],
    ],
    read: 'Monday to Friday only, no holiday calendar. Only Alloted and In Progress are checked.',
  },
  stuckTile: 'Stuck jobs, on the dashboard.',
  stuckList: 'Stuck tasks lists them, idle longest first.<small>Nothing is idle that long in the demo today.</small>',
  stuckRule: 'Any activity resets the clock.<small>Pending Spare, On Hold and the testing gates are left out.</small>',
  stuckDo: 'Every stuck job is a question for stand-up: who is on it?',
  exStalled: {
    kicker: 'Worked example · What has stalled › Stuck',
    title: 'Same state for too long',
    rows: [
      ['Board enters In Progress', 'Thu 10 Sep', ''],
      ['Hours logged on it every day', 'yes', 'does not reset this list'],
      ['= Tue 15 Sep: calendar days in state', '5', 'listed here'],
      ['On MIS Stuck tasks?', 'no', 'it was touched every day'],
    ],
    read: 'This one asks “why is it still here?”. Stuck tasks asks “is anyone touching it?”.',
  },
  stalled: 'What has stalled › Stuck, in Service.<small>Engineers see their own boards here.</small>',
  stalledPending: 'Pending Spare is on neither stuck list.<small>This board has waited weeks for a part: chase it in Spares.</small>',
  twoLists: 'Two lists, one word. Don’t expect the two counts to match.',
  exUnbilled: {
    kicker: 'Worked example · Unbilled hours',
    title: 'Hours that will never reach a price',
    rows: [
      ['A, B, C: billed', '18 h', ''],
      ['D: Non-Repairable', '6 h', 'unbilled'],
      ['F: open, but stuck', '3 h', 'unbilled (idle)'],
      ['E: open, being worked', '10 h', 'not unbilled: “still open”'],
      ['= Unbilled  9 ÷ 37 h logged', '24.3%', 'and “10 h still open”'],
    ],
    read: 'Each hour follows its job’s status today, so September’s figure moves when E or F changes.',
  },
  unbilledTile: 'Unbilled hours, on the dashboard.',
  unbilledSplit: 'The tracer splits the month’s hours: billed, unbilled, still open.',
  unbilledGap: 'Boards with no timesheet at all are invisible here.<small>Unlogged hours make unbilled look smaller.</small>',
  unbilledDont: 'Don’t treat last month’s unbilled hours as final.',
  remember: 'Remember',
  rules: [
    'Yield counts <b>Customer Rejected</b> as wastage too',
    'Queue aging = days in the <b>current state</b>. Clear the <b>testing gates</b> first',
    '<b>Stuck tasks</b>: nobody touched it. <b>What has stalled</b>: same state too long',
    '<b>Unbilled hours</b> follow today’s status. Last month can still move',
  ],
}

const ta: Captions = {
  kicker: 'துளிர் ட்ரெயினிங் · மாட்யூல் 13 · சர்வீஸ் ஹெட் · ஆப்பரேஷன்ஸ் மேனேஜர்',
  title: 'ஃப்ளோர்ல நேரம் எங்க போகுது',
  sub: 'யீல்டு, வேஸ்டேஜ், ரீவொர்க், க்யூ, ஸ்டக் போர்டு, அன்பில்டு ஹவர்ஸ். சுமார் 3 நிமிடம்.',
  demo: 'இது MIS டாஷ்போர்டு.<small>ஸ்க்ரீன்ல இருக்கறது டெமோ நம்பர். உங்க நம்பர் வேற மாதிரி இருக்கும்.</small>',
  period: 'எல்லா நம்பரும் நீங்க செலக்ட் பண்ற பீரியட்படி வரும்.<small>இங்க: “This month”, செப்டம்பர்.</small>',
  exYield: {
    kicker: 'உதாரணம் · Yield',
    title: 'செப்டம்பர்: 4 போர்டு க்ளோஸ் ஆச்சு',
    rows: [
      ['போர்டு A, B, C → Ready for Invoice', '3', 'சக்சஸ்'],
      ['போர்டு D → Non-Repairable', '1', 'வேஸ்டேஜ்'],
      ['= யீல்டு  3 ÷ (3 + 1)', '75.0%', '“3 : 1 success to wastage” ன்னு வரும்'],
    ],
    read: 'Customer Rejected-உம் வேஸ்டேஜ் தான். கஸ்டமர் விலைக்கு மட்டும் “வேண்டாம்” சொன்னாலும் கூட.',
  },
  yieldTile: 'Yield: க்ளோஸ் ஆன போர்டுல எத்தனை சதவீதம் ரிப்பேர் ஆச்சு.<small>எதுவும் க்ளோஸ் ஆகலைன்னா “Nothing to measure” வரும், 0% இல்ல.</small>',
  yieldBar: 'இந்த பார் க்ளோஸ் ஆனதை பிரிச்சு காட்டுது.<small>Ready for Invoice ஒரு பக்கம், ரைட்-ஆஃப், Customer Rejected இன்னொரு பக்கம்.</small>',
  yieldDont: 'வேஸ்டேஜ்னா “இன்ஜினியர் ஃபெயில்”ன்னு எடுத்துக்காதீங்க.<small>ஸ்கில்லை விட போர்டு டைப் தான் அதிகம் காரணம். “Segment”-ல எங்கன்னு பாருங்க.</small>',
  exWaste: {
    kicker: 'உதாரணம் · Wastage cost this period',
    title: 'ரைட்-ஆஃப் போர்டுல போன ஹவர்ஸ்',
    rows: [
      ['போர்டு D, செப்டம்பர்ல ரைட்-ஆஃப்', '6 h', 'அதுல போட்ட எல்லா ஹவர்ஸும்'],
      ['… அதுல ஆகஸ்ட்ல போட்டது', '2 h', 'இதுவும் சேரும்'],
      ['= Wastage cost this period', '6 h', ''],
    ],
    read: 'இது செப்டம்பர் மாச ஹவர்ஸ் இல்ல. மாச டைம்ஷீட்டோட மேட்ச் பண்ணாதீங்க.',
  },
  waste: '“Wastage cost this period”.<small>ஒரே போர்டுல 30 மணி நேரம் போய் ரைட்-ஆஃப்னா, அதை முன்னாடியே நிறுத்தியிருக்கணும்.</small>',
  exRework: {
    kicker: 'உதாரணம் · Rework rate',
    title: 'க்ளோஸ் ஆனதுல ரெண்டாவது முயற்சி எத்தனை',
    rows: [
      ['செப்டம்பர்: 4 க்ளோஸ், ரீவொர்க் இல்ல', '0 ÷ 4', ''],
      ['= ரீவொர்க் ரேட், செப்டம்பர்', '0.0%', ''],
      ['அக்டோபர்: R (போர்டு A திரும்ப வந்தது) + 9', '1 ÷ 10', 'R-க்கு previous job number இருக்கு'],
      ['= ரீவொர்க் ரேட், அக்டோபர்', '10.0%', ''],
    ],
    read: 'ரீவொர்க் ஏறுதுன்னா ரிப்பேர் நிக்கல. ஸ்கோர்கார்டுல இருக்கற Rework காலம் வேற நம்பர்.',
  },
  rework: '“Rework jobs”: முந்தைய ஜாப்புக்கு ரெண்டாவது முயற்சியா க்ளோஸ் ஆனது.',
  exAging: {
    kicker: 'உதாரணம் · Queue aging',
    title: 'இப்போ இருக்கற ஸ்டேட்டஸ்ல எத்தனை நாள்',
    rows: [
      ['போர்டு B, Ready for Verification-க்கு வந்தது', '12 Sep', ''],
      ['பார்க்கற தேதி', '20 Sep', ''],
      ['= ஸ்டேட்டஸ்ல இருக்கற நாள்', '8 d', '→ 6–10 d காலம்'],
      ['1 Aug-ல ரெஜிஸ்டர் ஆனதா?', 'அப்பவும் 8 d', 'ஜாப்போட மொத்த வயசு கணக்கில்ல'],
    ],
    read: 'டெஸ்டிங் கேட்ல 6 நாளோ அதுக்கு மேலயோ இருந்தா தனியா காட்டும். ரிப்பேர் முடிஞ்சும் இன்னும் பணம் வரல.',
  },
  agingCols: 'ரோ: ஓப்பன் ஸ்டேட்டஸ் எல்லாம். காலம்: அந்த ஸ்டேட்டஸ்ல எத்தனை நாள்.<small>எந்த நம்பரை க்ளிக் பண்ணாலும் அதோட போர்டுகள் வரும்.</small>',
  agingOld: 'இந்த Pending Spare போர்டு 11 நாளுக்கு மேல அப்படியே இருக்கு.',
  gates: 'டெஸ்டிங் கேட்: Ready for Verification, Awaiting Customer Confirmation.<small>வெரிஃபை பண்றவங்களையும் கஸ்டமரையும் முதல்ல ஃபாலோ பண்ணுங்க.</small>',
  liaison: 'Under Assessment, Awaiting Customer Input-ல இருக்கற வயசு லையசன் க்யூ. ஃப்ளோர் தப்பு இல்ல.',
  exStuck: {
    kicker: 'உதாரணம் · Stuck tasks',
    title: 'யாரும் தொடல',
    rows: [
      ['In Progress போர்டு, கடைசியா தொட்டது', 'Thu 10 Sep', 'ஹவர்ஸ், பார்ட், அல்லது ஸ்டேட்டஸ் மாற்றம்'],
      ['Thu 17 Sep: வேலை நாள் ஐடில்', '5', '5, 5-ஐ விட அதிகம் இல்ல: ஸ்டக் இல்ல'],
      ['= Fri 18 Sep: வேலை நாள் ஐடில்', '6', 'ஸ்டக்'],
      ['18-ஆம் தேதி இன்ஜினியர் 0.5 h போட்டா', '0', 'கடிகாரம் மறுபடி 0'],
    ],
    read: 'திங்கள் முதல் வெள்ளி மட்டும், லீவு நாள் கணக்கில்ல. Alloted, In Progress மட்டும் தான் பார்க்கும்.',
  },
  stuckTile: 'டாஷ்போர்டுல “Stuck jobs”.',
  stuckList: '“Stuck tasks” அவற்றை லிஸ்ட் பண்ணும், ரொம்ப நாள் ஐடில் முதல்ல.<small>டெமோவுல இன்னைக்கு அவ்வளவு நாள் ஐடில் எதுவும் இல்ல.</small>',
  stuckRule: 'எந்த வேலை நடந்தாலும் கடிகாரம் மறுபடி 0.<small>Pending Spare, On Hold, டெஸ்டிங் கேட் இதுல சேராது.</small>',
  stuckDo: 'ஒவ்வொரு ஸ்டக் ஜாப்பையும் ஸ்டாண்ட்-அப்ல கேளுங்க: யார் பார்க்கறாங்க?',
  exStalled: {
    kicker: 'உதாரணம் · What has stalled › Stuck',
    title: 'ஒரே ஸ்டேட்டஸ்ல ரொம்ப நாள்',
    rows: [
      ['போர்டு In Progress-க்கு வந்தது', 'Thu 10 Sep', ''],
      ['தினமும் ஹவர்ஸ் போட்டாங்க', 'ஆமா', 'இந்த லிஸ்ட் ரீசெட் ஆகாது'],
      ['= Tue 15 Sep: ஸ்டேட்டஸ்ல இருக்கற நாள்', '5', 'இங்க வரும்'],
      ['MIS “Stuck tasks”-ல வருமா?', 'இல்ல', 'தினமும் தொட்டிருக்காங்க'],
    ],
    read: 'இது கேக்கறது “ஏன் இன்னும் இங்கயே இருக்கு?”. Stuck tasks கேக்கறது “யாராவது தொடறாங்களா?”.',
  },
  stalled: 'Service-ல “What has stalled › Stuck”.<small>இன்ஜினியருக்கு அவங்க போர்டு மட்டும் தெரியும்.</small>',
  stalledPending: 'Pending Spare எந்த ஸ்டக் லிஸ்ட்லயும் வராது.<small>இந்த போர்டு பல வாரமா பார்ட்டுக்கு காத்திருக்கு: Spares-ல ஃபாலோ பண்ணுங்க.</small>',
  twoLists: 'ரெண்டு லிஸ்ட், ஒரே பேர். ரெண்டு கவுண்ட்டும் ஒண்ணா இருக்கும்னு எதிர்பார்க்காதீங்க.',
  exUnbilled: {
    kicker: 'உதாரணம் · Unbilled hours',
    title: 'விலைக்கு போகவே போகாத ஹவர்ஸ்',
    rows: [
      ['A, B, C: பில் ஆச்சு', '18 h', ''],
      ['D: Non-Repairable', '6 h', 'அன்பில்டு'],
      ['F: ஓப்பன், ஆனா ஸ்டக்', '3 h', 'அன்பில்டு (ஐடில்)'],
      ['E: ஓப்பன், வேலை நடக்குது', '10 h', 'அன்பில்டு இல்ல: “still open”'],
      ['= அன்பில்டு  9 ÷ 37 h', '24.3%', 'கூட “10 h still open”'],
    ],
    read: 'ஒவ்வொரு ஹவரும் அதோட ஜாப்போட இன்னைய ஸ்டேட்டஸ்படி. E, F மாறினா செப்டம்பர் நம்பரும் மாறும்.',
  },
  unbilledTile: 'டாஷ்போர்டுல “Unbilled hours”.',
  unbilledSplit: 'ட்ரேசர் மாச ஹவர்ஸை பிரிக்குது: billed, unbilled, still open.',
  unbilledGap: 'டைம்ஷீட்டே இல்லாத போர்டு இங்க தெரியாது.<small>போடாத ஹவர்ஸ் அன்பில்டை சின்னதா காட்டும்.</small>',
  unbilledDont: 'போன மாச அன்பில்டு ஹவர்ஸ் ஃபைனல்னு நினைக்காதீங்க.',
  remember: 'ஞாபகம் வெச்சுக்கோங்க',
  rules: [
    'யீல்டுல <b>Customer Rejected</b>-உம் வேஸ்டேஜ் தான்',
    'Queue aging = <b>இப்போ இருக்கற ஸ்டேட்டஸ்ல</b> நாள். <b>டெஸ்டிங் கேட்</b> முதல்ல க்ளியர் பண்ணுங்க',
    '<b>Stuck tasks</b>: யாரும் தொடல. <b>What has stalled</b>: ஒரே ஸ்டேட்டஸ்ல ரொம்ப நாள்',
    '<b>அன்பில்டு ஹவர்ஸ்</b> இன்னைய ஸ்டேட்டஸ்படி. போன மாசமும் மாறலாம்',
  ],
}

export const CAPTIONS = { en, ta } as const
export type Lang = keyof typeof CAPTIONS
