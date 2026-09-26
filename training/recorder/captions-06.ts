/**
 * Module 06 captions, English and Tamil.
 *
 * Tamil follows TAMIL-STYLE.md: spoken shop-floor Tamil, business words in Tamil script, on-screen
 * labels (buttons, fields, status tags) in English letters.
 */
export const CAPTIONS = {
  en: {
    kicker: 'Thulir training · Module 06 · Engineer · Liaison · Front Office',
    title: 'Parts, purchase requests and stock',
    sub: 'Book a part, raise a request, order it, receive it, fix a count. About 2¼ minutes.',

    engK: 'Engineer · job card',
    engH: 'Book what you fit',
    catalogue: 'A catalogued part? Use From catalogue.',
    choose: 'Choose the part from the list. Say how many.<small>Typing a name is not choosing one.</small>',
    booked: 'Booked. Stock went down by 2.<small>The catalogue refuses more than it holds.</small>',
    other: 'Small bits not in the catalogue? Other spares.',
    otherHow: 'Say what they were and what they cost.<small>No stock moves.</small>',
    oneOrOther: 'Each booking is one or the other.<small>A catalogued part booked as Other spares leaves the stock wrong.</small>',

    liaK: 'Liaison · Spares',
    liaH: 'Raise the purchase request',
    line: 'One line per part, with how many.',
    tick: 'Tick the boards this line releases.<small>One request can serve several boards.</small>',
    raised: 'The system numbers it: PR/YY-MM/NNNNNN.<small>It starts as Draft.</small>',
    send: 'Ready? Send to the front office.<small>Only the Liaison has this button.</small>',
    sent: 'Now: With front office, with the date.',

    foK: 'Front Office · Spares',
    foH: 'Order it. Mark it. Receive it.',
    zoho: 'With front office? Place the order in Zoho Books.<small>The order itself is made in Zoho, not here.</small>',
    po: 'Type the Zoho PO no., then Mark ordered.<small>The button waits for the number.</small>',
    ordered: 'Now: Ordered, with its PO number.<small>The Liaison sees the same.</small>',
    receive: 'Goods arrive? Record a delivery against the request.<small>Front Office or Liaison.</small>',
    accepted: 'Only 1 of 2 came. Accepted = what you keep.<small>Rejected units are recorded, never stocked.</small>',
    partial: 'One board is back on the bench.<small>The other still waits for its part.</small>',
    partialState: 'The request stays open: Part received.<small>Draft → With front office → Ordered → Part received → Received</small>',

    adjK: 'Liaison · Stock',
    adjH: 'Fix a wrong count',
    noEdit: 'A goods receipt is never edited.<small>Correct the count here instead.</small>',
    adjust: 'New count, a reason from the list, a note.',
    adjusted: 'Corrected. Before and after are both kept.<small>No cost goes to any job.</small>',

    remember: 'Remember',
    rules: [
      'Catalogued part → <b>From catalogue</b>. Small bits → <b>Other spares</b>',
      'Liaison raises the PR → <b>Send to the front office</b>',
      'Front Office orders in <b>Zoho</b> → <b>Mark ordered</b> with the PO no.',
      'Receipts are final. Fix counts with a <b>stock adjustment</b>',
    ],
  },
  ta: {
    kicker: 'துளிர் ட்ரெயினிங் · மாட்யூல் 06 · Engineer · Liaison · Front Office',
    title: 'பார்ட்ஸ், பர்சேஸ் ரிக்வெஸ்ட், ஸ்டாக்',
    sub: 'பார்ட் புக் பண்றது, PR போடுறது, ஆர்டர், டெலிவரி, ஸ்டாக் கரெக்ஷன். சுமார் 2½ நிமிடம்.',

    engK: 'Engineer · ஜாப் கார்டு',
    engH: 'போட்ட பார்ட்டை புக் பண்ணுங்க',
    catalogue: 'கேட்டலாக்ல இருக்கற பார்ட்டா? “From catalogue” யூஸ் பண்ணுங்க.',
    choose: 'லிஸ்ட்ல இருந்து பார்ட்டை செலக்ட் பண்ணுங்க. எத்தனைன்னு போடுங்க.<small>பேரை டைப் பண்ணா மட்டும் போதாது, செலக்ட் பண்ணணும்.</small>',
    booked: 'புக் ஆச்சு. ஸ்டாக் 2 குறைஞ்சது.<small>இருக்கறதை விட அதிகமா கேட்டலாக் ஏத்துக்காது.</small>',
    other: 'கேட்டலாக்ல இல்லாத சின்ன பொருளா? “Other spares”.',
    otherHow: 'என்ன பொருள், எவ்வளவு காஸ்ட்னு எழுதுங்க.<small>ஸ்டாக் மாறாது.</small>',
    oneOrOther: 'ஒவ்வொரு புக்கிங்கும் இதுல ஒண்ணு தான்.<small>கேட்டலாக் பார்ட்டை “Other spares”-ல போட்டா ஸ்டாக் தப்பாயிடும்.</small>',

    liaK: 'Liaison · Spares',
    liaH: 'பர்சேஸ் ரிக்வெஸ்ட் போடுங்க',
    line: 'ஒரு பார்ட்டுக்கு ஒரு லைன், எத்தனைன்னும் சேர்த்து.',
    tick: 'இந்த லைன் ரிலீஸ் பண்ற போர்டுகளை டிக் பண்ணுங்க.<small>ஒரே PR பல போர்டுக்கு யூஸ் ஆகலாம்.</small>',
    raised: 'நம்பர் சிஸ்டமே போடும்: PR/YY-MM/NNNNNN.<small>முதல்ல “Draft”-ஆ இருக்கும்.</small>',
    send: 'ரெடியா? “Send to the front office”.<small>இந்த பட்டன் Liaison-க்கு மட்டும் தான்.</small>',
    sent: 'இப்போ: “With front office”, தேதியோட.',

    foK: 'Front Office · Spares',
    foH: 'ஆர்டர் போடுங்க, மார்க் பண்ணுங்க, டெலிவரி எடுங்க',
    zoho: '“With front office”-ஆ? Zoho Books-ல ஆர்டர் போடுங்க.<small>ஆர்டர் Zoho-ல தான், இங்க இல்ல.</small>',
    po: 'Zoho PO நம்பரை டைப் பண்ணி “Mark ordered” அழுத்துங்க.<small>நம்பர் போடற வரைக்கும் பட்டன் வெயிட் பண்ணும்.</small>',
    ordered: 'இப்போ: “Ordered”, PO நம்பரோட.<small>Liaison-க்கும் இதே தெரியும்.</small>',
    receive: 'பொருள் வந்துடுச்சா? PR-க்கு எதிரா டெலிவரியை ரெக்கார்ட் பண்ணுங்க.<small>Front Office அல்லது Liaison.</small>',
    accepted: '2-ல 1 தான் வந்தது. “Accepted” = நீங்க வெச்சுக்கறது.<small>“Rejected” பதிவாகும், ஸ்டாக்ல சேராது.</small>',
    partial: 'ஒரு போர்டு திரும்ப பெஞ்சுக்கு வந்தது.<small>இன்னொண்ணு இன்னும் பார்ட்டுக்கு வெயிட் பண்ணுது.</small>',
    partialState: 'PR ஓப்பனா இருக்கும்: “Part received”.<small>Draft → With front office → Ordered → Part received → Received</small>',

    adjK: 'Liaison · Stock',
    adjH: 'தப்பான ஸ்டாக் கவுண்ட்டை சரி பண்ணுங்க',
    noEdit: 'Goods receipt-ஐ எப்பவும் எடிட் பண்ண முடியாது.<small>அதுக்கு பதிலா இங்க கவுண்ட்டை சரி பண்ணுங்க.</small>',
    adjust: 'புது கவுண்ட், லிஸ்ட்ல இருந்து ஒரு காரணம், ஒரு நோட்.',
    adjusted: 'சரி ஆச்சு. முன்னாடி, பின்னாடி ரெண்டும் பதிவுல இருக்கும்.<small>எந்த ஜாபுக்கும் காஸ்ட் போகாது.</small>',

    remember: 'ஞாபகம் வெச்சுக்கோங்க',
    rules: [
      'கேட்டலாக் பார்ட் → <b>From catalogue</b>. சின்ன பொருள் → <b>Other spares</b>',
      'Liaison PR போடுவாங்க → <b>Send to the front office</b>',
      'Front Office <b>Zoho</b>-ல ஆர்டர் → PO நம்பரோட <b>Mark ordered</b>',
      'Receipt ஃபைனல். கவுண்ட்டை <b>stock adjustment</b>-ல சரி பண்ணுங்க',
    ],
  },
} as const

export type Lang = keyof typeof CAPTIONS
