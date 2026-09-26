/**
 * Module 03 captions, English and Tamil. App words (buttons, labels, states) stay in English.
 * Tamil follows TAMIL-STYLE.md: spoken Tamil, business words in Tamil script, screen labels in English.
 */
export const CAPTIONS = {
  en: {
    kicker: 'Thulir training · Module 03 · Liaison · Service Head',
    title: 'Assessment',
    sub: 'Pick up, write what you found, then allot or quote. About 2 minutes.',
    reservoir: 'Service › Reservoir: every board before the bench.<small>Search by job, serial or company.</small>',
    inward: 'New boards say “Not yet assessed”.<small>Their tick is locked: they can’t be alloted.</small>',
    pickup: 'Pick up = you start the assessment.<small>The job moves to Under Assessment.</small>',
    only: 'Pick up is the only way out of Inward.',
    queue: 'Before the bench: your queue, by state.<small>Age = days in that state.</small>',
    narrow: 'Narrow the queue to one customer.<small>Then you can quote their boards from here.</small>',
    findings: 'Choose a board. Write what the assessment found.<small>What is wrong, what you tested, what it needs.</small>',
    findingsSeen: 'Save findings. The engineer reads them on the job card.<small>You can correct them until it is alloted.</small>',
    ask: 'Need something from the customer first?<small>Use Wait for the customer.</small>',
    note: 'Say what you asked them. It is required.<small>The system sends them nothing: you phone or email.</small>',
    waiting: 'Now “Waiting on the customer”.<small>Awaiting Customer Input: it cannot be alloted.</small>',
    back: 'Answer came? Input received, with what came back.<small>It returns to Under Assessment.</small>',
    allot: 'Clear what to do? Tick it here and allot it.<small>No quotation needed, whatever the billing segment. Module 05.</small>',
    quote: 'Price to agree first? Tick the boards, Raise quotation.<small>One customer’s boards on one quotation.</small>',
    carried: 'They arrive on Quotations already ticked.<small>You price them there. Module 04.</small>',
    remember: 'Remember',
    rules: [
      'A board leaves Inward <b>only by Pick up</b>',
      'Write <b>What the assessment found</b>, before it is alloted',
      'Waiting on the customer? <b>Wait for the customer</b>, with a note',
      'Then decide: <b>allot</b> it, or tick it and <b>Raise quotation</b>',
    ],
  },
  ta: {
    kicker: 'துளிர் ட்ரெயினிங் · மாட்யூல் 03 · Liaison · Service Head',
    title: 'அசெஸ்மென்ட்',
    sub: 'Pick up பண்ணுங்க, என்ன கண்டுபிடிச்சீங்கன்னு எழுதுங்க, அப்புறம் அலாட் அல்லது கொட்டேஷன். சுமார் 2 நிமிஷம்.',
    reservoir: '“Service › Reservoir”: பெஞ்சுக்கு முன்னாடி இருக்கற எல்லா போர்டும்.<small>ஜாப், சீரியல் அல்லது கம்பெனி பேர் வெச்சு சர்ச் பண்ணலாம்.</small>',
    inward: 'புது போர்டுல “Not yet assessed”னு இருக்கும்.<small>டிக் லாக் ஆகியிருக்கும்: அலாட் பண்ண முடியாது.</small>',
    pickup: '“Pick up” = நீங்க அசெஸ்மென்ட் ஆரம்பிக்கறீங்க.<small>ஜாப் “Under Assessment”க்கு போகும்.</small>',
    only: '“Inward”ல இருந்து வெளியே வர ஒரே வழி “Pick up”.',
    queue: '“Before the bench”: உங்க க்யூ, ஸ்டேட்டஸ் வாரியா.<small>Age = அந்த ஸ்டேட்டஸ்ல இருந்த நாள்.</small>',
    narrow: 'க்யூவை ஒரு கஸ்டமருக்கு மட்டும் சுருக்குங்க.<small>அப்போ இங்கிருந்தே அவங்க போர்டுக்கு கொட்டேஷன் போடலாம்.</small>',
    findings: 'ஒரு போர்டை செலக்ட் பண்ணுங்க. “What the assessment found” எழுதுங்க.<small>என்ன ப்ராப்ளம், என்ன டெஸ்ட் பண்ணீங்க, என்ன தேவை.</small>',
    findingsSeen: '“Save findings”. இன்ஜினியர் இதை ஜாப் கார்டுல படிப்பாரு.<small>அலாட் ஆகற வரைக்கும் திருத்தலாம்.</small>',
    ask: 'முதல்ல கஸ்டமர்கிட்ட ஏதாவது வேணுமா?<small>“Wait for the customer” யூஸ் பண்ணுங்க.</small>',
    note: 'அவங்ககிட்ட என்ன கேட்டீங்கன்னு எழுதுங்க. இது கட்டாயம்.<small>சிஸ்டம் எதுவும் அனுப்பாது: நீங்களே ஃபோன் அல்லது ஈமெயில் பண்ணணும்.</small>',
    waiting: 'இப்போ “Waiting on the customer”.<small>“Awaiting Customer Input”: அலாட் பண்ண முடியாது.</small>',
    back: 'பதில் வந்துச்சா? “Input received”, என்ன வந்துச்சுன்னு எழுதுங்க.<small>ஜாப் திரும்ப “Under Assessment”க்கு வரும்.</small>',
    allot: 'என்ன பண்ணணும்னு க்ளியரா இருக்கா? இங்கே டிக் பண்ணி அலாட் பண்ணுங்க.<small>எந்த பில்லிங் செக்மென்ட்டா இருந்தாலும் கொட்டேஷன் தேவையில்ல. மாட்யூல் 05.</small>',
    quote: 'முதல்ல ப்ரைஸ் ஒத்துக்கணுமா? போர்டுகளை டிக் பண்ணி “Raise quotation”.<small>ஒரு கஸ்டமரோட போர்டு, ஒரு கொட்டேஷன்ல.</small>',
    carried: 'அவை “Quotations”ல ஏற்கனவே டிக் ஆகி வரும்.<small>அங்கே ப்ரைஸ் போடுங்க. மாட்யூல் 04.</small>',
    remember: 'ஞாபகம் வெச்சுக்கோங்க',
    rules: [
      '“Inward”ல இருந்து போர்டு வெளியே வர <b>“Pick up” மட்டும் தான்</b>',
      'அலாட் பண்றதுக்கு முன்னாடி <b>“What the assessment found”</b> எழுதுங்க',
      'கஸ்டமருக்காக வெயிட்டிங்கா? நோட்டோட <b>“Wait for the customer”</b>',
      'அப்புறம் முடிவு: <b>அலாட்</b>, இல்லன்னா டிக் பண்ணி <b>“Raise quotation”</b>',
    ],
  },
} as const

export type Lang = keyof typeof CAPTIONS
