/**
 * Module 04 captions, English and Tamil. App words (buttons, labels, states) stay in English.
 * Tamil follows TAMIL-STYLE.md: spoken Tamil, business words in Tamil script, screen labels in English.
 */
export const CAPTIONS = {
  en: {
    kicker: 'Thulir training · Module 04 · Liaison · Service Head · Ops Manager',
    title: 'Quotations',
    sub: 'Lines, normal price, premium or discount, revising, the answer. About 2 minutes.',
    list: 'Service › Quotations lists who is waiting on a price.<small>Choose the customer. Only boards Under Assessment are here.</small>',
    tick: 'Tick every board the quotation covers.<small>Nothing is pre-ticked.</small>',
    lines: 'Boards of one kind share a line and a price.<small>Another model gets its own line.</small>',
    own: 'One board needs a different price? Own line.<small>Back with its kind undoes it.</small>',
    normal: 'Normal price = what this repair usually costs, parts included.<small>From the rate card, or typed by you: “Set by hand”.</small>',
    premium: 'Price per unit above normal? The extra is a Premium.<small>Choose why: Urgent turnaround, Scarce component…</small>',
    labour: 'Engineer’s labour charge = normal price less parts.<small>Worked out for you. Never typed.</small>',
    discount: 'Price below normal? The gap is a Discount.<small>Nothing more to fill.</small>',
    internal: 'The customer sees each line’s price and the total.<small>The dashed split rows are internal.</small>',
    sent: 'Sent it by email or on paper? Record as sent.<small>The boards move to Awaiting Quotation Approval.</small>',
    revise: 'New price, or they want only some boards? Revise it.<small>Tick only the boards the new version covers.</small>',
    dropped: 'Version 2 sent. The board left off is back Under Assessment.<small>Quote it again later, or send it back.</small>',
    who: 'Approved? Name the person who decided.<small>Attach their email if you have it.</small>',
    approved: 'Approved. The 2 boards can now be alloted.<small>Next: Module 05.</small>',
    remember: 'Remember',
    rules: [
      'One quotation, <b>one line per kind</b> of board',
      '<b>Normal price</b> = usual cost. Charge more: <b>Premium + why</b>',
      'Charge less: it is a <b>Discount</b>. Labour charge is worked out',
      'New price or fewer boards? <b>Revise</b>, then <b>Record as sent</b>',
    ],
  },
  ta: {
    kicker: 'துளிர் ட்ரெயினிங் · மாட்யூல் 04 · Liaison · Service Head · Ops Manager',
    title: 'கொட்டேஷன்',
    sub: 'லைன், நார்மல் ப்ரைஸ், ப்ரீமியம் அல்லது டிஸ்கவுண்ட், ரிவைஸ், கஸ்டமர் பதில். சுமார் 2 நிமிஷம்.',
    list: '“Service › Quotations”ல ப்ரைஸுக்கு வெயிட் பண்ற கஸ்டமர் லிஸ்ட் இருக்கு.<small>கஸ்டமரை செலக்ட் பண்ணுங்க. “Under Assessment” போர்டு மட்டும் தான் வரும்.</small>',
    tick: 'கொட்டேஷன்ல வர்ற ஒவ்வொரு போர்டையும் டிக் பண்ணுங்க.<small>எதுவும் தானா டிக் ஆகாது.</small>',
    lines: 'ஒரே மாதிரி போர்டுக்கு ஒரே லைன், ஒரே ப்ரைஸ்.<small>வேற மாடலுக்கு தனி லைன் வரும்.</small>',
    own: 'ஒரு போர்டுக்கு மட்டும் வேற ப்ரைஸா? “Own line”.<small>“Back with its kind” அழுத்தினா பழையபடி ஆகும்.</small>',
    normal: '“Normal price” = இந்த ரிப்பேருக்கு வழக்கமா ஆகற விலை, பார்ட்ஸ் சேர்த்து.<small>ரேட் கார்டுல இருந்து வரும், இல்லன்னா நீங்க டைப் பண்ணணும்: “Set by hand”.</small>',
    premium: '“Price per unit” நார்மலை விட அதிகமா? அந்த எக்ஸ்ட்ரா தான் ப்ரீமியம்.<small>ஏன்னு செலக்ட் பண்ணுங்க: “Urgent turnaround”, “Scarce component”…</small>',
    labour: '“Engineer’s labour charge” = நார்மல் ப்ரைஸ் மைனஸ் பார்ட்ஸ்.<small>சிஸ்டமே கணக்கு போடும். டைப் பண்ண வேண்டாம்.</small>',
    discount: 'நார்மலை விட கம்மியா? அந்த வித்தியாசம் டிஸ்கவுண்ட்.<small>வேற எதுவும் ஃபில் பண்ண வேண்டாம்.</small>',
    internal: 'கஸ்டமருக்கு ஒவ்வொரு லைன் ப்ரைஸும் டோட்டலும் மட்டும் தெரியும்.<small>டேஷ் போட்ட ஸ்ப்ளிட் வரிகள் உள்ளுக்கு மட்டும்.</small>',
    sent: 'ஈமெயில் அல்லது பேப்பர்ல அனுப்பிட்டீங்களா? “Record as sent”.<small>போர்டுகள் “Awaiting Quotation Approval”க்கு போகும்.</small>',
    revise: 'புது ப்ரைஸா, இல்ல சில போர்டு மட்டும் வேணுமா? ரிவைஸ் பண்ணுங்க.<small>புது வெர்ஷன்ல வர்ற போர்டை மட்டும் டிக் பண்ணுங்க.</small>',
    dropped: 'வெர்ஷன் 2 அனுப்பியாச்சு. விட்டுப்போன போர்டு திரும்ப “Under Assessment”.<small>அப்புறம் திரும்ப கொட்டேஷன் போடலாம், இல்ல திருப்பி அனுப்பலாம்.</small>',
    who: 'அப்ரூவ் ஆச்சா? முடிவு பண்ணவர் பேரை எழுதுங்க.<small>அவங்க ஈமெயில் இருந்தா அட்டாச் பண்ணுங்க.</small>',
    approved: 'அப்ரூவ் ஆச்சு. இப்போ 2 போர்டையும் அலாட் பண்ணலாம்.<small>அடுத்தது: மாட்யூல் 05.</small>',
    remember: 'ஞாபகம் வெச்சுக்கோங்க',
    rules: [
      'ஒரு கொட்டேஷன், <b>ஒவ்வொரு மாதிரி போர்டுக்கும் ஒரு லைன்</b>',
      '<b>“Normal price”</b> = வழக்கமான விலை. அதிகமா வாங்கினா: <b>ப்ரீமியம் + ஏன்</b>',
      'கம்மியா வாங்கினா அது <b>டிஸ்கவுண்ட்</b>. லேபர் சார்ஜ் சிஸ்டமே போடும்',
      'புது ப்ரைஸ் அல்லது குறைஞ்ச போர்டு? <b>ரிவைஸ்</b>, அப்புறம் <b>“Record as sent”</b>',
    ],
  },
} as const

export type Lang = keyof typeof CAPTIONS
