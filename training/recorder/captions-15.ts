/**
 * Module 15 captions and worked-example cards, English and Tamil.
 *
 * Numbers on the cards follow KPI-CATALOGUE.md's worked month (board A, ₹400/h). The screen shows
 * the local demo's board A, whose hours are costed at ₹700/h, so its margins differ; captions say so.
 * Tamil follows TAMIL-STYLE.md: business words in Tamil script, on-screen labels in English letters.
 */
import type { Row } from './15-cards'

type Card = { k: string; h: string; rows: Row[]; read?: string; wrong?: string }

export const CAPTIONS = {
  en: {
    kicker: 'Thulir training · Module 15 · Liaison · Service Head · Operations Manager',
    title: 'Money 1: how one job’s price splits',
    sub: 'One board, from quote to margin. About 2½ minutes.',
    rule: {
      k: 'The one rule · every board priced from 25 Sep 2026',
      h: 'Prices are all-in: parts are inside the price.',
      rows: [
        ['N · Normal price', '', 'what this board normally costs, parts included'],
        ['Q · Agreed price', '', 'what the customer agreed to pay'],
        ['P · Parts billed', '', 'selling price of the parts fitted (free parts: not in P)'],
        ['+ Customer pays', '', 'the larger of Q and P'],
        ['Labour charge', '', 'N − P, never below ₹0'],
        ['Premium', '', 'what they pay − the larger of N and P, if above ₹0'],
        ['Discount', '', 'the larger of N and P − what they pay, if above ₹0'],
      ],
      read: 'Board A: servo drive, line down. N ₹10,000 · Q ₹12,000 · P ₹2,400.',
    } as Card,
    form: 'Service › Quotations: a board like A, waiting on a price.<small>We fill the form to see the split, and don’t raise it.</small>',
    normal: '“Normal price” = what it normally costs, parts included.',
    byHand: 'No rate card? You type it. It is tagged “Set by hand”.<small>Type what a regular customer pays on a normal day.</small>',
    premium: 'Price above normal → “Premium”. Say why.<small>The reason is required: here, Urgent turnaround.</small>',
    labourLive: '“Engineer’s labour charge”: the normal price, less parts.<small>Parts billed come off it as they are booked.</small>',
    discount: 'Price below normal → “Discount”, on its own line.<small>The labour charge stays ₹10,000 less parts.</small>',
    labourCard: {
      k: 'Labour charge (older boards: “Base price”)',
      h: 'The engineer’s share of the price',
      rows: [
        ['Normal price N', '₹10,000', 'typed, Set by hand'],
        ['Parts billed P', '− ₹2,400', '2 IGBTs + gate driver, at selling price'],
        ['= Labour charge', '₹7,600', 'N − P'],
      ],
      read: 'Read it as: <b>what the work is worth</b>. It is the same whether A was quoted ₹10,000 or ₹25,000.',
      wrong: '✗ “A premium job pays the engineer more.” It doesn’t.',
    } as Card,
    premiumCard: {
      k: 'Opportunity premium',
      h: 'What the customer paid above normal',
      rows: [
        ['Customer pays', '₹12,000', 'the larger of Q ₹12,000 and P ₹2,400'],
        ['Covered by normal', '− ₹10,000', 'the larger of N ₹10,000 and P ₹2,400'],
        ['= Premium', '₹2,000', 'reason: Urgent turnaround'],
      ],
      read: 'Read it as: <b>a commercial result</b> (urgency, out of hours, site visit, scarce part). Nice to have, never to rely on.',
      wrong: '✗ It is not the engineer’s. It never enters the labour margin.',
    } as Card,
    partsCard: {
      k: '“Parts premium”? There is no such figure',
      h: 'Parts above the normal price eat the premium',
      rows: [
        ['Same board A, but parts billed P', '₹11,000', 'more than N ₹10,000'],
        ['Customer pays', '₹12,000', 'the larger of Q ₹12,000 and P ₹11,000'],
        ['Covered by normal', '− ₹11,000', 'the larger of N and P: now the parts'],
        ['= Premium', '₹1,000', 'was ₹2,000: parts ate ₹1,000'],
        ['Labour charge', '₹0', '10,000 − 11,000, never below ₹0'],
      ],
      read: 'Profit on parts (selling − purchase price) is a separate figure: <b>Parts margin</b>.',
      wrong: '✗ Don’t look for a “parts premium” field. It doesn’t exist.',
    } as Card,
    discountCard: {
      k: 'Discount · board C',
      h: 'What the customer paid below normal',
      rows: [
        ['Normal price N', '₹10,000', ''],
        ['Customer pays', '₹8,000', 'the larger of Q ₹8,000 and P ₹1,000'],
        ['= Discount', '₹2,000', 'the larger of N and P − what they pay'],
        ['Labour charge', '₹9,000', 'still N − P = 10,000 − 1,000'],
      ],
      read: 'Read it as: <b>a price decision</b>, recorded apart so the engineer is not blamed for it.',
      wrong: '✗ “The discount came out of my labour charge.” It didn’t.',
    } as Card,
    record: 'Board A’s approved quotation keeps the split.<small>The dashed row is internal. The customer sees ₹12,000 only.</small>',
    fixed: 'The split is fixed when it is approved.<small>A different split needs a new version.</small>',
    jobCard: 'Board A’s job card, as the Service Head.<small>“What it cost, and what it made”: MIS roles only, not engineers.</small>',
    labourShown: '“Labour charge” ₹7,600 = ₹10,000 less ₹2,400 of parts.<small>Recomputed every time a part is booked.</small>',
    charged: '“Charged” ₹12,000 is what the customer pays.<small>Parts are inside it. Never “₹12,000 + parts”.</small>',
    marginCard: {
      k: 'Labour margin · the owner’s “base margin”',
      h: 'What the labour charge left after the hours',
      rows: [
        ['Labour charge', '₹7,600', ''],
        ['Hours', '− ₹2,400', '6 h × ₹400: 5 h repair + 1 h verification'],
        ['Rework rolled up', '− ₹0', 'a comeback’s cost lands here (Module 16)'],
        ['= Labour margin', '₹5,200', ''],
      ],
      read: 'Read it as: <b>how well we delivered</b>. Premium and parts profit are left out on purpose. Over a month, labour margin ÷ labour charge = the “Base margin” %.',
      wrong: '✗ Don’t read it as the job’s profit. That is Total margin.',
    } as Card,
    totalCard: {
      k: 'Parts margin and Total margin',
      h: 'The job’s whole result',
      rows: [
        ['Parts billed', '₹2,400', ''],
        ['Parts cost', '− ₹1,950', '₹1,800 + a ₹150 fuse given free'],
        ['= Parts margin', '₹450', 'procurement’s result, not the engineer’s'],
        ['+ Labour margin', '₹5,200', ''],
        ['Parts margin + premium − discount', '+ ₹2,450', '450 + 2,000 − 0'],
        ['= Total margin', '₹7,650', 'check: ₹12,000 charged − ₹4,350 cost'],
      ],
      read: 'Read it as: <b>the profit on the job</b>: labour, parts, premium and discount together.',
    } as Card,
    onScreen: 'On screen: ₹3,650 · ₹450 · ₹6,100.<small>Here hours cost ₹700/h (senior rate), not ₹400. Your figures will differ.</small>',
    remember: 'Remember',
    rules: [
      'Prices are <b>all-in</b>: parts are inside the price',
      '<b>Labour charge</b> = normal price − parts billed. Premium never reaches it',
      '<b>Premium</b> and <b>Discount</b> sit beside the work, never inside it',
      'No “parts premium”: parts above normal <b>eat the premium</b>; parts profit is <b>Parts margin</b>',
    ],
  },
  ta: {
    kicker: 'துளிர் ட்ரெயினிங் · மாட்யூல் 15 · Liaison · Service Head · Operations Manager',
    title: 'மணி 1: ஒரு ஜாப் ப்ரைஸ் எப்படி பிரியுது',
    sub: 'ஒரு போர்டு, கொட்டேஷன்ல இருந்து மார்ஜின் வரை. சுமார் 3 நிமிடம்.',
    rule: {
      k: 'ஒரே ரூல் · 25 Sep 2026ல இருந்து ப்ரைஸ் போட்ட எல்லா போர்டுக்கும்',
      h: 'ப்ரைஸ் all-in: பார்ட்ஸ் ப்ரைஸுக்குள்ளயே இருக்கு.',
      rows: [
        ['N · Normal price', '', 'இந்த போர்டுக்கு வழக்கமா வாங்குற ப்ரைஸ், பார்ட்ஸ் சேர்த்து'],
        ['Q · ஒத்துக்கிட்ட ப்ரைஸ்', '', 'கஸ்டமர் கொடுக்க ஒத்துக்கிட்டது'],
        ['P · Parts billed', '', 'போட்ட பார்ட்ஸோட செல்லிங் ப்ரைஸ் (ஃப்ரீ பார்ட்ஸ் P-ல வராது)'],
        ['+ கஸ்டமர் கொடுப்பது', '', 'Q, P ரெண்டுல எது பெருசோ அது'],
        ['Labour charge', '', 'N − P, ₹0க்கு கீழ போகாது'],
        ['Premium', '', 'கொடுப்பது − (N, P-ல பெருசு), ₹0க்கு மேல இருந்தா'],
        ['Discount', '', '(N, P-ல பெருசு) − கொடுப்பது, ₹0க்கு மேல இருந்தா'],
      ],
      read: 'போர்டு A: சர்வோ டிரைவ், லைன் நின்னுடுச்சு. N ₹10,000 · Q ₹12,000 · P ₹2,400.',
    } as Card,
    form: 'Service › Quotations: A மாதிரியே ஒரு போர்டு, ப்ரைஸுக்கு வெயிட்டிங்.<small>ஸ்ப்ளிட் பாக்க ஃபார்ம் ஃபில் பண்றோம், raise பண்ணல.</small>',
    normal: '“Normal price” = வழக்கமா வாங்குற ப்ரைஸ், பார்ட்ஸ் சேர்த்து.',
    byHand: 'ரேட் கார்டு இல்லையா? நீங்களே டைப் பண்ணுங்க. “Set by hand”னு டேக் வரும்.<small>ரெகுலர் கஸ்டமர் சாதாரண நாள்ல கொடுக்கற ப்ரைஸை போடுங்க.</small>',
    premium: 'நார்மலுக்கு மேல ப்ரைஸ் → “Premium”. காரணம் சொல்லணும்.<small>காரணம் கட்டாயம்: இங்க Urgent turnaround.</small>',
    labourLive: '“Engineer’s labour charge”: நார்மல் ப்ரைஸ், பார்ட்ஸ் கழிச்சு.<small>பார்ட்ஸ் புக் ஆகும்போது Parts billed இதுல இருந்து கழியும்.</small>',
    discount: 'நார்மலுக்கு கீழ ப்ரைஸ் → “Discount”, தனி லைன்ல.<small>லேபர் சார்ஜ் அப்படியே ₹10,000 less parts.</small>',
    labourCard: {
      k: 'Labour charge (பழைய போர்டுல “Base price”)',
      h: 'ப்ரைஸ்ல இன்ஜினியரோட பங்கு',
      rows: [
        ['Normal price N', '₹10,000', 'டைப் பண்ணது, Set by hand'],
        ['Parts billed P', '− ₹2,400', '2 IGBT + கேட் டிரைவர், செல்லிங் ப்ரைஸ்ல'],
        ['= Labour charge', '₹7,600', 'N − P'],
      ],
      read: 'இப்படி படிங்க: <b>வேலைக்கு உள்ள மதிப்பு</b>. A-க்கு ₹10,000 கொட்டேஷன் போட்டாலும் ₹25,000 போட்டாலும் இது மாறாது.',
      wrong: '✗ “ப்ரீமியம் ஜாப்னா இன்ஜினியருக்கு அதிகம்.” இல்ல.',
    } as Card,
    premiumCard: {
      k: 'Opportunity premium',
      h: 'நார்மலுக்கு மேல கஸ்டமர் கொடுத்தது',
      rows: [
        ['கஸ்டமர் கொடுப்பது', '₹12,000', 'Q ₹12,000, P ₹2,400-ல பெருசு'],
        ['நார்மல் கவர் பண்றது', '− ₹10,000', 'N ₹10,000, P ₹2,400-ல பெருசு'],
        ['= Premium', '₹2,000', 'காரணம்: Urgent turnaround'],
      ],
      read: 'இப்படி படிங்க: <b>கமர்ஷியல் ரிசல்ட்</b> (அவசரம், ஆஃபீஸ் நேரத்துக்கு அப்புறம், சைட் விசிட், கிடைக்காத பார்ட்). வந்தா நல்லது, நம்பி இருக்கக் கூடாது.',
      wrong: '✗ இது இன்ஜினியரோடது இல்ல. லேபர் மார்ஜின்ல சேராது.',
    } as Card,
    partsCard: {
      k: '“பார்ட்ஸ் ப்ரீமியம்”? அப்படி ஒரு ஃபிகர் இல்ல',
      h: 'நார்மலை தாண்டுற பார்ட்ஸ் ப்ரீமியத்தை குறைக்கும்',
      rows: [
        ['அதே போர்டு A, Parts billed P', '₹11,000', 'N ₹10,000-ஐ விட அதிகம்'],
        ['கஸ்டமர் கொடுப்பது', '₹12,000', 'Q ₹12,000, P ₹11,000-ல பெருசு'],
        ['நார்மல் கவர் பண்றது', '− ₹11,000', 'N, P-ல பெருசு: இப்போ பார்ட்ஸ்'],
        ['= Premium', '₹1,000', '₹2,000 இருந்தது: பார்ட்ஸ் ₹1,000 எடுத்துடுச்சு'],
        ['Labour charge', '₹0', '10,000 − 11,000, ₹0க்கு கீழ போகாது'],
      ],
      read: 'பார்ட்ஸ்ல லாபம் (செல்லிங் − பர்சேஸ் ப்ரைஸ்) தனி ஃபிகர்: <b>Parts margin</b>.',
      wrong: '✗ “பார்ட்ஸ் ப்ரீமியம்” ஃபீல்டை தேடாதீங்க. அது இல்ல.',
    } as Card,
    discountCard: {
      k: 'Discount · போர்டு C',
      h: 'நார்மலுக்கு கீழ கஸ்டமர் கொடுத்தது',
      rows: [
        ['Normal price N', '₹10,000', ''],
        ['கஸ்டமர் கொடுப்பது', '₹8,000', 'Q ₹8,000, P ₹1,000-ல பெருசு'],
        ['= Discount', '₹2,000', '(N, P-ல பெருசு) − கொடுப்பது'],
        ['Labour charge', '₹9,000', 'அப்பவும் N − P = 10,000 − 1,000'],
      ],
      read: 'இப்படி படிங்க: <b>ப்ரைஸ் முடிவு</b>. தனியா பதிவாகுது, அதனால இன்ஜினியர் மேல பழி வராது.',
      wrong: '✗ “டிஸ்கவுண்ட் என் லேபர் சார்ஜ்ல இருந்து போச்சு.” இல்ல.',
    } as Card,
    record: 'போர்டு A-வோட அப்ரூவ் ஆன கொட்டேஷன்ல ஸ்ப்ளிட் இருக்கு.<small>டேஷ் போட்ட ரோ உள் விஷயம். கஸ்டமருக்கு ₹12,000 மட்டும் தெரியும்.</small>',
    fixed: 'அப்ரூவ் ஆனதும் ஸ்ப்ளிட் ஃபிக்ஸ் ஆயிடும்.<small>வேற ஸ்ப்ளிட் வேணும்னா புது வெர்ஷன் போடணும்.</small>',
    jobCard: 'போர்டு A-வோட ஜாப் கார்டு, சர்வீஸ் ஹெட் பார்வையில.<small>“What it cost, and what it made”: MIS ரோல்களுக்கு மட்டும், இன்ஜினியருக்கு இல்ல.</small>',
    labourShown: '“Labour charge” ₹7,600 = ₹10,000, ₹2,400 பார்ட்ஸ் கழிச்சு.<small>ஒவ்வொரு பார்ட் புக் ஆகும்போதும் திரும்ப கணக்காகும்.</small>',
    charged: '“Charged” ₹12,000 = கஸ்டமர் கொடுப்பது.<small>பார்ட்ஸ் அதுக்குள்ளயே இருக்கு. “₹12,000 + பார்ட்ஸ்” இல்ல.</small>',
    marginCard: {
      k: 'Labour margin · ஓனர் சொல்ற “base margin”',
      h: 'ஹவர்ஸ் காஸ்ட் போக லேபர் சார்ஜ்ல மிச்சம்',
      rows: [
        ['Labour charge', '₹7,600', ''],
        ['ஹவர்ஸ்', '− ₹2,400', '6 h × ₹400: 5 h ரிப்பேர் + 1 h வெரிஃபிகேஷன்'],
        ['Rework rolled up', '− ₹0', 'திரும்ப வந்த ஜாப் காஸ்ட் இங்க வரும் (மாட்யூல் 16)'],
        ['= Labour margin', '₹5,200', ''],
      ],
      read: 'இப்படி படிங்க: <b>வேலையை எவ்வளவு நல்லா முடிச்சோம்</b>. ப்ரீமியம், பார்ட்ஸ் லாபம் வேணும்னே சேர்க்கல. மாசம் முழுக்க லேபர் மார்ஜின் ÷ லேபர் சார்ஜ் = “Base margin” %.',
      wrong: '✗ இதை ஜாப்போட ப்ராஃபிட்னு படிக்காதீங்க. அது Total margin.',
    } as Card,
    totalCard: {
      k: 'Parts margin, Total margin',
      h: 'ஜாப்போட முழு ரிசல்ட்',
      rows: [
        ['Parts billed', '₹2,400', ''],
        ['பார்ட்ஸ் காஸ்ட்', '− ₹1,950', '₹1,800 + ஃப்ரீயா கொடுத்த ₹150 ஃப்யூஸ்'],
        ['= Parts margin', '₹450', 'பர்சேஸ் பக்க ரிசல்ட், இன்ஜினியரோடது இல்ல'],
        ['+ Labour margin', '₹5,200', ''],
        ['பார்ட்ஸ் மார்ஜின் + ப்ரீமியம் − டிஸ்கவுண்ட்', '+ ₹2,450', '450 + 2,000 − 0'],
        ['= Total margin', '₹7,650', 'செக்: ₹12,000 Charged − ₹4,350 காஸ்ட்'],
      ],
      read: 'இப்படி படிங்க: <b>ஜாப்போட ப்ராஃபிட்</b>: லேபர், பார்ட்ஸ், ப்ரீமியம், டிஸ்கவுண்ட் எல்லாம் சேர்த்து.',
    } as Card,
    onScreen: 'ஸ்கிரீன்ல: ₹3,650 · ₹450 · ₹6,100.<small>இங்க ஹவர் ₹700 (சீனியர் ரேட்), ₹400 இல்ல. உங்க ஃபிகர்ஸ் வேற மாதிரி இருக்கும்.</small>',
    remember: 'ஞாபகம் வெச்சுக்கோங்க',
    rules: [
      'ப்ரைஸ் <b>all-in</b>: பார்ட்ஸ் ப்ரைஸுக்குள்ளயே இருக்கு',
      '<b>Labour charge</b> = நார்மல் ப்ரைஸ் − Parts billed. ப்ரீமியம் அதுல சேராது',
      '<b>Premium</b>, <b>Discount</b> வேலைக்கு பக்கத்துல தனியா, உள்ள இல்ல',
      '“பார்ட்ஸ் ப்ரீமியம்” இல்ல: நார்மலை தாண்டுற பார்ட்ஸ் <b>ப்ரீமியத்தை குறைக்கும்</b>; பார்ட்ஸ் லாபம் = <b>Parts margin</b>',
    ],
  },
} as const

export type Lang = keyof typeof CAPTIONS
