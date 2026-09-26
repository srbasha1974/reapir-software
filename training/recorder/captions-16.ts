/**
 * Module 16 captions and worked-example cards, English and Tamil.
 *
 * Cards follow KPI-CATALOGUE.md's worked month (A–D at ₹400/h, comeback R ₹1,100). The screens show
 * the shared local demo, whose September holds many other agents' jobs, so captions never quote a
 * screen total as if it were the card's.
 */
import type { Row } from './15-cards'

type Card = { k: string; h: string; rows: Row[]; read?: string; wrong?: string }

export const CAPTIONS = {
  en: {
    kicker: 'Thulir training · Module 16 · Operations Manager · Service Head',
    title: 'Money 2: the month in money',
    sub: 'Base margin, premium share, total margin, rework, achievement. About 2½ minutes.',
    month: {
      k: 'The worked month · September',
      h: 'Four boards closed. Hours cost ₹400.',
      rows: [
        ['A · servo drive', '₹5,200', 'labour charge ₹7,600 − 6 h · premium ₹2,000 · charged ₹12,000'],
        ['B · power supply', '₹3,900', 'labour charge ₹5,500 − 4 h · charged ₹6,000'],
        ['C · VFD board', '₹5,800', 'labour charge ₹9,000 − 8 h · discount ₹2,000 · charged ₹8,000'],
        ['D · write-off', '—', 'never priced · 6 h = ₹2,400 of hours'],
        ['= Labour margin', '₹14,900', 'on labour charge ₹22,100 · charged ₹26,000'],
      ],
      read: 'The figures next to each board are its <b>labour margin</b> (Module 15).',
    } as Card,
    refresh: 'MIS reads a copy, refreshed nightly.<small>Press “Refresh now” before you read a month.</small>',
    baseCard: {
      k: 'Base margin %',
      h: 'Labour margin ÷ labour charge',
      rows: [
        ['Labour margin, A + B + C', '₹14,900', ''],
        ['Labour charge, A + B + C', '÷ ₹22,100', ''],
        ['= Base margin', '67.4%', ''],
      ],
      read: 'Read it as: of every ₹100 the work was worth, ₹67 was left after paying for the hours. <b>How well we delivered.</b>',
      wrong: '✗ The write-off D is not in it: an unpriced job has no margin, so its ₹2,400 of hours drop out.',
    } as Card,
    baseTile: '“Base margin”: the same sum, over this month’s closures.<small>Demo data here. Your figures will differ.</small>',
    premCard: {
      k: 'Premium captured · share of revenue',
      h: 'How much came from urgency, not the work',
      rows: [
        ['Premium, board A', '₹2,000', 'Urgent turnaround'],
        ['Charged, A + B + C', '÷ ₹26,000', ''],
        ['= Premium share', '7.7%', 'of revenue'],
      ],
      read: 'Read it next to Base margin. A <b>rising share is a warning</b>, not an achievement: the work itself is earning less.',
    } as Card,
    premTile: '“Premium captured”: board A’s ₹2,000 is in here.<small>Commercial, not delivery: never inside Base margin.</small>',
    totalCard: {
      k: 'Total margin · and why Revenue − Cost differs',
      h: 'Don’t subtract the two screen totals',
      rows: [
        ['Revenue (charged)', '₹26,000', 'A + B + C'],
        ['Cost', '− ₹12,600', 'hours ₹9,600 (includes D’s ₹2,400) + parts ₹3,000'],
        ['= Revenue − Cost', '₹13,400', ''],
        ['+ Total margin', '₹15,800', '60.8% of revenue: priced jobs only'],
      ],
      read: 'The ₹2,400 gap is <b>the write-off D</b>: its hours are in Cost, but an unpriced job has no Total margin.',
      wrong: '✗ Don’t expect Revenue − Cost to equal Total margin on this screen.',
    } as Card,
    totalShown: 'Job profitability: Revenue, Cost, Total margin.<small>Cost counts unpriced write-offs; Total margin skips them.</small>',
    reworkCard: {
      k: 'Cost of rework carried',
      h: 'A comeback is charged to the job that failed',
      rows: [
        ['R: A came back, repaired free', '₹1,100', '2 h = ₹800 + a ₹300 part given free'],
        ['A’s labour margin', '₹5,200 → ₹4,100', '7,600 − 2,400 − 1,100'],
        ['= September base margin', '67.4% → 62.4%', '13,800 ÷ 22,100'],
      ],
      read: 'It moves <b>the month A closed in</b>, even when R comes back in October.',
      wrong: '✗ “Last month’s figures are final.” A comeback rewrites them.',
    } as Card,
    reworkCost: 'Here R’s cost already sits on A: “rework” in Cost.<small>It rolls up as soon as R books hours or parts.</small>',
    reworkTab: '“Rework carried” names both jobs once R closes.<small>R is still open, so the list is empty. The cost is already counted.</small>',
    spares: '“Spares not charged”: parts fitted free. The cost is real.<small>Board A’s ₹150 fuse. It counts against Parts margin.</small>',
    uncosted: '“Uncosted hours” should read 0h.<small>Hours with no rate cost ₹0 and overstate every margin. Fix the rate first.</small>',
    achCard: {
      k: 'Actual · Target · Achievement (Performance)',
      h: 'The engineer’s month: labour margin only',
      rows: [
        ['A', '₹5,600', '5,200 + ₹400 verification by someone else, added back'],
        ['B + C', '₹9,700', '3,900 + 5,800 · D is unpriced, adds nothing'],
        ['= Actual', '₹15,300', ''],
        ['Target', '₹20,000', 'set by the Service Head'],
        ['= Achievement', '76.5% · below', 'after R rolls onto A: ₹14,200 = 71.0%'],
      ],
      read: 'The premium on A earned the engineer nothing, by design.',
      wrong: '✗ Don’t match it to Profitability › By engineer (₹14,900): that one does not add verification back.',
    } as Card,
    perf: 'Performance: Actual, Target, Achievement.<small>Demo data: this engineer has many other jobs this month.</small>',
    openCard: {
      k: 'Labour on open boards (Overview)',
      h: 'What our time has already cost, on boards still here',
      rows: [
        ['E · open', '₹4,000', '10 h × ₹400'],
        ['F · open', '₹1,200', '3 h × ₹400'],
        ['= Labour on open boards', '₹5,200', 'today'],
      ],
      read: 'A stock, not a month: <b>neither revenue nor waste yet</b>. Big figures on a few boards → push them to a price decision.',
    } as Card,
    open: 'Overview › “Labour on open boards”.<small>The total is every open board. The five rows are only the largest.</small>',
    remember: 'Remember',
    rules: [
      'Press <b>Refresh now</b> before you read a month',
      '<b>Base margin</b> = labour margin ÷ labour charge: delivery only',
      'A rising <b>premium share</b> is a warning, not a win',
      'A comeback <b>rewrites</b> the month the original closed in',
    ],
  },
  ta: {
    kicker: 'துளிர் ட்ரெயினிங் · மாட்யூல் 16 · Operations Manager · Service Head',
    title: 'மணி 2: மாசக் கணக்கு',
    sub: 'Base margin, ப்ரீமியம் பங்கு, Total margin, ரீவொர்க், அச்சீவ்மென்ட். சுமார் 3 நிமிடம்.',
    month: {
      k: 'உதாரண மாசம் · செப்டம்பர்',
      h: 'நாலு போர்டு க்ளோஸ் ஆச்சு. ஹவர் காஸ்ட் ₹400.',
      rows: [
        ['A · சர்வோ டிரைவ்', '₹5,200', 'லேபர் சார்ஜ் ₹7,600 − 6 h · ப்ரீமியம் ₹2,000 · Charged ₹12,000'],
        ['B · பவர் சப்ளை', '₹3,900', 'லேபர் சார்ஜ் ₹5,500 − 4 h · Charged ₹6,000'],
        ['C · VFD போர்டு', '₹5,800', 'லேபர் சார்ஜ் ₹9,000 − 8 h · டிஸ்கவுண்ட் ₹2,000 · Charged ₹8,000'],
        ['D · ரைட்-ஆஃப்', '—', 'ப்ரைஸ் போடல · 6 h = ₹2,400 ஹவர்ஸ்'],
        ['= Labour margin', '₹14,900', 'லேபர் சார்ஜ் ₹22,100 மேல · Charged ₹26,000'],
      ],
      read: 'ஒவ்வொரு போர்டு பக்கத்துலயும் இருக்கறது அதோட <b>லேபர் மார்ஜின்</b> (மாட்யூல் 15).',
    } as Card,
    refresh: 'MIS ஒரு காப்பியை படிக்குது, ராத்திரி அப்டேட் ஆகும்.<small>மாசத்தை படிக்கறதுக்கு முன்னாடி “Refresh now” அழுத்துங்க.</small>',
    baseCard: {
      k: 'Base margin %',
      h: 'லேபர் மார்ஜின் ÷ லேபர் சார்ஜ்',
      rows: [
        ['லேபர் மார்ஜின், A + B + C', '₹14,900', ''],
        ['லேபர் சார்ஜ், A + B + C', '÷ ₹22,100', ''],
        ['= Base margin', '67.4%', ''],
      ],
      read: 'இப்படி படிங்க: வேலைக்கு உள்ள ஒவ்வொரு ₹100-லயும், ஹவர்ஸ் காஸ்ட் போக ₹67 மிச்சம். <b>வேலையை எவ்வளவு நல்லா முடிச்சோம்.</b>',
      wrong: '✗ ரைட்-ஆஃப் D இதுல இல்ல: ப்ரைஸ் இல்லாத ஜாப்புக்கு மார்ஜின் இல்ல, அதனால அதோட ₹2,400 ஹவர்ஸ் விட்டுப் போகும்.',
    } as Card,
    baseTile: '“Base margin”: இதே கணக்கு, இந்த மாசம் க்ளோஸ் ஆனதுக்கு.<small>இங்க டெமோ டேட்டா. உங்க ஃபிகர்ஸ் வேற மாதிரி இருக்கும்.</small>',
    premCard: {
      k: 'Premium captured · ரெவென்யூல பங்கு',
      h: 'வேலையால இல்ல, அவசரத்தால வந்தது எவ்வளவு',
      rows: [
        ['ப்ரீமியம், போர்டு A', '₹2,000', 'Urgent turnaround'],
        ['Charged, A + B + C', '÷ ₹26,000', ''],
        ['= ப்ரீமியம் பங்கு', '7.7%', 'ரெவென்யூல'],
      ],
      read: 'Base margin கூட சேர்த்து படிங்க. <b>பங்கு ஏறினா அது எச்சரிக்கை</b>, சாதனை இல்ல: வேலையால வர்றது குறையுதுன்னு அர்த்தம்.',
    } as Card,
    premTile: '“Premium captured”: போர்டு A-வோட ₹2,000 இதுல இருக்கு.<small>கமர்ஷியல், டெலிவரி இல்ல: Base margin-க்குள்ள வராது.</small>',
    totalCard: {
      k: 'Total margin · Revenue − Cost ஏன் வேற',
      h: 'ஸ்கிரீன்ல இருக்கற ரெண்டு டோட்டலையும் கழிக்காதீங்க',
      rows: [
        ['Revenue (Charged)', '₹26,000', 'A + B + C'],
        ['Cost', '− ₹12,600', 'ஹவர்ஸ் ₹9,600 (D-யோட ₹2,400 சேர்த்து) + பார்ட்ஸ் ₹3,000'],
        ['= Revenue − Cost', '₹13,400', ''],
        ['+ Total margin', '₹15,800', 'ரெவென்யூல 60.8%: ப்ரைஸ் போட்ட ஜாப் மட்டும்'],
      ],
      read: '₹2,400 வித்தியாசம் = <b>ரைட்-ஆஃப் D</b>: அதோட ஹவர்ஸ் Cost-ல இருக்கு, ஆனா ப்ரைஸ் இல்லாத ஜாப்புக்கு Total margin இல்ல.',
      wrong: '✗ இந்த ஸ்கிரீன்ல Revenue − Cost = Total margin வரும்னு எதிர்பார்க்காதீங்க.',
    } as Card,
    totalShown: 'Job profitability: Revenue, Cost, Total margin.<small>Cost-ல ப்ரைஸ் இல்லாத ரைட்-ஆஃப் சேரும்; Total margin-ல சேராது.</small>',
    reworkCard: {
      k: 'Cost of rework carried',
      h: 'திரும்ப வந்த வேலையோட காஸ்ட், ஃபெயில் ஆன ஜாப் மேல',
      rows: [
        ['R: A திரும்ப வந்துச்சு, ஃப்ரீயா ரிப்பேர்', '₹1,100', '2 h = ₹800 + ஃப்ரீயா போட்ட ₹300 பார்ட்'],
        ['A-வோட லேபர் மார்ஜின்', '₹5,200 → ₹4,100', '7,600 − 2,400 − 1,100'],
        ['= செப்டம்பர் base margin', '67.4% → 62.4%', '13,800 ÷ 22,100'],
      ],
      read: '<b>A க்ளோஸ் ஆன மாசம்</b> மாறும், R அக்டோபர்ல வந்தாலும் கூட.',
      wrong: '✗ “போன மாச ஃபிகர்ஸ் ஃபைனல்.” ரீவொர்க் வந்தா அது மாறும்.',
    } as Card,
    reworkCost: 'இங்க R-ஓட காஸ்ட் ஏற்கனவே A மேல இருக்கு: Cost-ல “rework”.<small>R-ல ஹவர்ஸ் அல்லது பார்ட்ஸ் புக் ஆனதுமே ஏறிடும்.</small>',
    reworkTab: 'R க்ளோஸ் ஆனதும் “Rework carried” ரெண்டு ஜாப்பையும் காட்டும்.<small>R இன்னும் ஓப்பன், அதனால லிஸ்ட் காலி. காஸ்ட் ஏற்கனவே கணக்குல இருக்கு.</small>',
    spares: '“Spares not charged”: ஃப்ரீயா போட்ட பார்ட்ஸ். காஸ்ட் உண்மை.<small>போர்டு A-வோட ₹150 ஃப்யூஸ். Parts margin-ல கழியும்.</small>',
    uncosted: '“Uncosted hours” 0h-ஆ இருக்கணும்.<small>ரேட் இல்லாத ஹவர்ஸ் ₹0 காஸ்ட்; எல்லா மார்ஜினும் அதிகமா தெரியும். முதல்ல ரேட்டை சரி பண்ணுங்க.</small>',
    achCard: {
      k: 'Actual · Target · Achievement (Performance)',
      h: 'இன்ஜினியரோட மாசம்: லேபர் மார்ஜின் மட்டும்',
      rows: [
        ['A', '₹5,600', '5,200 + வேற ஒருத்தர் செஞ்ச ₹400 வெரிஃபிகேஷன், திரும்ப சேர்த்து'],
        ['B + C', '₹9,700', '3,900 + 5,800 · D-க்கு ப்ரைஸ் இல்ல, எதுவும் சேராது'],
        ['= Actual', '₹15,300', ''],
        ['Target', '₹20,000', 'சர்வீஸ் ஹெட் போட்டது'],
        ['= Achievement', '76.5% · below', 'R-ஓட காஸ்ட் A மேல வந்ததும்: ₹14,200 = 71.0%'],
      ],
      read: 'A-வோட ப்ரீமியம் இன்ஜினியருக்கு எதுவும் சேர்க்கல. வேணும்னே அப்படி.',
      wrong: '✗ Profitability › By engineer (₹14,900) கூட ஒப்பிடாதீங்க: அதுல வெரிஃபிகேஷன் திரும்ப சேர்க்கப்படல.',
    } as Card,
    perf: 'Performance: Actual, Target, Achievement.<small>டெமோ டேட்டா: இந்த இன்ஜினியருக்கு இந்த மாசம் வேற நிறைய ஜாப் இருக்கு.</small>',
    openCard: {
      k: 'Labour on open boards (Overview)',
      h: 'இன்னும் இங்க இருக்கற போர்டுகள்ல நம்ம நேரம் ஆன காஸ்ட்',
      rows: [
        ['E · ஓப்பன்', '₹4,000', '10 h × ₹400'],
        ['F · ஓப்பன்', '₹1,200', '3 h × ₹400'],
        ['= Labour on open boards', '₹5,200', 'இன்னைக்கு'],
      ],
      read: 'இது மாசக் கணக்கு இல்ல, கையிருப்பு: <b>இன்னும் ரெவென்யூவும் இல்ல, வேஸ்ட்டும் இல்ல</b>. சில போர்டுல பெரிய தொகைன்னா, ப்ரைஸ் முடிவுக்கு தள்ளுங்க.',
    } as Card,
    open: 'Overview › “Labour on open boards”.<small>டோட்டல் எல்லா ஓப்பன் போர்டுக்கும். அஞ்சு ரோ பெரியது மட்டும்.</small>',
    remember: 'ஞாபகம் வெச்சுக்கோங்க',
    rules: [
      'மாசத்தை படிக்கறதுக்கு முன்னாடி <b>Refresh now</b> அழுத்துங்க',
      '<b>Base margin</b> = லேபர் மார்ஜின் ÷ லேபர் சார்ஜ்: டெலிவரி மட்டும்',
      '<b>ப்ரீமியம் பங்கு</b> ஏறினா எச்சரிக்கை, வெற்றி இல்ல',
      'ரீவொர்க் வந்தா ஒரிஜினல் க்ளோஸ் ஆன <b>மாசம் மாறும்</b>',
    ],
  },
} as const

export type Lang = keyof typeof CAPTIONS
