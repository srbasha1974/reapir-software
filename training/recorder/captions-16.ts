/**
 * Module 16 captions and worked-example cards, English and Tamil. Round 4: every rupee counted once
 * (K1 write-offs in Total margin, K2 a rework once in its month, K5 checking is the checker's).
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
    sub: 'Base margin, premium share, total margin, rework, checking, achievement. About 3 minutes.',
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
      read: 'The figures next to each board are its <b>labour margin</b> (clip Money 1). D has no price, but its hours still cost.',
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
      wrong: '✗ Don’t expect the write-off D to lower it: an unpriced job has no labour charge. Its ₹2,400 of hours are in Total margin.',
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
      k: 'Total margin · the whole month, write-off included',
      h: 'Revenue − Cost = Total margin',
      rows: [
        ['Revenue (charged)', '₹26,000', 'A + B + C · D adds ₹0'],
        ['Cost', '− ₹12,600', 'hours ₹9,600 (D’s ₹2,400 included) + parts ₹3,000'],
        ['= Total margin', '₹13,400', '51.5% of revenue'],
        ['of which D, written off', '− ₹2,400', 'on the “Jobs at a loss” list'],
      ],
      read: 'A write-off is <b>not free</b>: no price, but its hours cost, in Cost and in Total margin alike.',
    } as Card,
    totalShown: 'Job profitability: Revenue − Cost = Total margin.<small>Demo figures. Your figures will differ.</small>',
    lossTab: '“Jobs at a loss”: the write-off is here, and a rework says “rework of …”.<small>Each job’s own figures, once.</small>',
    reworkCard: {
      k: 'A comeback, counted once',
      h: 'On the rework, in its month, charged to the engineer whose repair came back',
      rows: [
        ['31 Oct: A comes back as R, Baleswar fixes it', '₹1,100', '2 h = ₹800 + a ₹300 part given free'],
        ['October: Cost “of which rework”', '₹1,100', 'counted once, on R'],
        ['October: charged to Ramachandran', '− ₹800', 'R’s labour margin, not Baleswar’s'],
        ['September', 'unchanged', 'base margin stays 67.4%'],
        ['A’s own record', '₹5,200 → ₹4,100', '“Rework rolled up”: whole-life, per job only'],
      ],
      read: 'A closed month’s figures <b>do not move</b> when a board comes back later.',
      wrong: '✗ Don’t add A’s “Rework rolled up” to a month’s Cost: the month already has it, on R.',
    } as Card,
    reworkCost: 'In the demo, R came back and closed in September.<small>Its cost is here once: “of which rework”.</small>',
    reworkTab: '“Rework carried”: R, charged back to A.<small>A’s job card shows it as “Rework rolled up”.</small>',
    engCard: {
      k: 'Profitability › By engineer · the Checking column',
      h: 'Checking hours are the checker’s',
      rows: [
        ['Ramachandran: labour margin', '₹15,300', 'A 5,600 + B 3,900 + C 5,800'],
        ['… A counted without Baleswar’s hour', '+ ₹400', 'added back: it is Baleswar’s'],
        ['Baleswar: Checking', '1 h', '₹400, beside his margin, not in it'],
        ['= Ramachandran − Baleswar’s checking', '₹14,900', 'the month’s Base margin'],
      ],
      read: 'By engineer and Performance now show <b>the same</b> labour margin for an engineer.',
    } as Card,
    engTab: 'By engineer: the “Checking” column is the hours spent checking others’ boards.<small>A rework’s cost sits on the engineer whose repair came back.</small>',
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
        ['= Achievement', '76.5% · below', 'R’s − ₹800 counts in October, not here'],
      ],
      read: 'The premium on A earned the engineer nothing, by design. Baleswar’s Actual gets ₹400 for checking A.',
    } as Card,
    perf: 'Performance: Actual, Target, Achievement.<small>Demo data: this engineer has many other jobs this month. Your figures will differ.</small>',
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
      '<b>Revenue − Cost = Total margin</b>: a write-off’s hours count',
      'A comeback counts <b>once</b>, in its month, on the engineer whose repair came back',
    ],
  },
  ta: {
    kicker: 'துளிர் ட்ரெயினிங் · மாட்யூல் 16 · Operations Manager · Service Head',
    title: 'மணி 2: மாசக் கணக்கு',
    sub: 'Base margin, ப்ரீமியம் பங்கு, Total margin, ரீவொர்க், செக்கிங், அச்சீவ்மென்ட். சுமார் 3 நிமிடம்.',
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
      read: 'ஒவ்வொரு போர்டு பக்கத்துலயும் இருக்கறது அதோட <b>லேபர் மார்ஜின்</b> (மணி 1 கிளிப்). D-க்கு ப்ரைஸ் இல்ல, ஆனா ஹவர்ஸ் காஸ்ட் இருக்கு.',
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
      wrong: '✗ ரைட்-ஆஃப் D இதை குறைக்கும்னு எதிர்பார்க்காதீங்க: ப்ரைஸ் இல்லாத ஜாப்புக்கு லேபர் சார்ஜ் இல்ல. அதோட ₹2,400 ஹவர்ஸ் Total margin-ல இருக்கு.',
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
      k: 'Total margin · முழு மாசம், ரைட்-ஆஃப் சேர்த்து',
      h: 'Revenue − Cost = Total margin',
      rows: [
        ['Revenue (Charged)', '₹26,000', 'A + B + C · D ₹0'],
        ['Cost', '− ₹12,600', 'ஹவர்ஸ் ₹9,600 (D-யோட ₹2,400 சேர்த்து) + பார்ட்ஸ் ₹3,000'],
        ['= Total margin', '₹13,400', 'ரெவென்யூல 51.5%'],
        ['அதுல D, ரைட்-ஆஃப்', '− ₹2,400', '“Jobs at a loss” லிஸ்ட்ல வரும்'],
      ],
      read: 'ரைட்-ஆஃப் <b>ஃப்ரீ இல்ல</b>: ப்ரைஸ் இல்ல, ஆனா ஹவர்ஸ் காஸ்ட் Cost-லயும் Total margin-லயும் சேரும்.',
    } as Card,
    totalShown: 'Job profitability: Revenue − Cost = Total margin.<small>டெமோ நம்பர். உங்க நம்பர் வேற மாதிரி இருக்கும்.</small>',
    lossTab: '“Jobs at a loss”: ரைட்-ஆஃப் இங்க இருக்கு, ரீவொர்க்குக்கு “rework of …” வரும்.<small>ஒவ்வொரு ஜாப்போட சொந்த ஃபிகர், ஒரு தடவை மட்டும்.</small>',
    reworkCard: {
      k: 'திரும்ப வந்தது, ஒரு தடவை மட்டும்',
      h: 'ரீவொர்க் மேல, அதோட மாசத்துல, ரிப்பேர் திரும்ப வந்த இன்ஜினியர் மேல',
      rows: [
        ['31 Oct: A, R-ஆ திரும்ப வருது, பாலேஸ்வர் சரி பண்றார்', '₹1,100', '2 h = ₹800 + ஃப்ரீயா போட்ட ₹300 பார்ட்'],
        ['அக்டோபர்: Cost “of which rework”', '₹1,100', 'R மேல ஒரு தடவை'],
        ['அக்டோபர்: ராமச்சந்திரன் மேல', '− ₹800', 'R-ஓட லேபர் மார்ஜின், பாலேஸ்வர் மேல இல்ல'],
        ['செப்டம்பர்', 'மாறாது', 'base margin 67.4% தான்'],
        ['A-வோட ரெக்கார்டு', '₹5,200 → ₹4,100', '“Rework rolled up”: அந்த ஜாப்புக்கு மட்டும்'],
      ],
      read: 'க்ளோஸ் ஆன மாசத்தோட ஃபிகர்ஸ் அப்புறம் போர்டு திரும்ப வந்தாலும் <b>மாறாது</b>.',
      wrong: '✗ A-வோட “Rework rolled up”-ஐ மாச Cost-ல கூட்டாதீங்க: அது ஏற்கனவே R மேல இருக்கு.',
    } as Card,
    reworkCost: 'டெமோவுல R செப்டம்பர்லயே திரும்ப வந்து க்ளோஸ் ஆச்சு.<small>அதோட காஸ்ட் இங்க ஒரு தடவை: “of which rework”.</small>',
    reworkTab: '“Rework carried”: R, A மேல சார்ஜ்.<small>A-வோட ஜாப் கார்டுல “Rework rolled up”-ஆ தெரியும்.</small>',
    engCard: {
      k: 'Profitability › By engineer · Checking காலம்',
      h: 'செக் பண்ண ஹவர்ஸ் செக் பண்ணவரோடது',
      rows: [
        ['ராமச்சந்திரன்: லேபர் மார்ஜின்', '₹15,300', 'A 5,600 + B 3,900 + C 5,800'],
        ['… A-ல பாலேஸ்வர் ஹவர் இல்லாம', '+ ₹400', 'திரும்ப சேர்த்தது: அது பாலேஸ்வரோடது'],
        ['பாலேஸ்வர்: Checking', '1 h', '₹400, அவர் மார்ஜினுக்கு பக்கத்துல, உள்ள இல்ல'],
        ['= ராமச்சந்திரன் − பாலேஸ்வர் செக்', '₹14,900', 'மாசத்தோட Base margin'],
      ],
      read: 'By engineer-லயும் Performance-லயும் இப்போ ஒரு இன்ஜினியருக்கு <b>அதே</b> லேபர் மார்ஜின்.',
    } as Card,
    engTab: 'By engineer: “Checking” = மத்தவங்க போர்டை செக் பண்ண ஹவர்ஸ்.<small>ரீவொர்க் காஸ்ட், ரிப்பேர் திரும்ப வந்த இன்ஜினியர் மேல.</small>',
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
        ['= Achievement', '76.5% · below', 'R-ஓட − ₹800 அக்டோபர்ல, இங்க இல்ல'],
      ],
      read: 'A-வோட ப்ரீமியம் இன்ஜினியருக்கு எதுவும் சேர்க்கல. வேணும்னே அப்படி. A-வை செக் பண்ணதுக்கு பாலேஸ்வர் Actual-ல ₹400.',
    } as Card,
    perf: 'Performance: Actual, Target, Achievement.<small>டெமோ டேட்டா: இந்த இன்ஜினியருக்கு வேற நிறைய ஜாப் இருக்கு. உங்க நம்பர் வேற மாதிரி.</small>',
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
      '<b>Revenue − Cost = Total margin</b>: ரைட்-ஆஃப் ஹவர்ஸும் சேரும்',
      'திரும்ப வந்தது <b>ஒரு தடவை</b>, அதோட மாசத்துல, ரிப்பேர் பண்ணவர் மேல',
    ],
  },
} as const

export type Lang = keyof typeof CAPTIONS
