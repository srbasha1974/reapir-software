/**
 * Module 10 captions, English and Tamil.
 *
 * Tamil keeps the app's own words in English (button names, field labels, statuses), because
 * that is what staff will see on screen.
 */
export const CAPTIONS = {
  en: {
    kicker: 'Thulir training · Module 10 · Front Office · Liaison',
    title: 'Dispatch: the delivery challan',
    sub: 'Everything that leaves the building. About 90 seconds.',
    list: 'Everything that may leave is listed here.<small>Front office › Challans. Front Office issues; the Liaison can too.</small>',
    gatePass: 'A challan is a gate pass, not an invoice.<small>It records custody. The customer is billed separately.</small>',
    tick: 'Tick the boards leaving for one customer.',
    mixed: 'One reason per challan.<small>Repaired and non-repairable boards go on separate challans.</small>',
    leavesAs: '“Leaves as” comes from the job’s state.<small>Nobody picks the reason.</small>',
    accessories: 'Tick every accessory going back.<small>Kept or used up? Press “They stay with us”.</small>',
    carrier: 'Who carries it, and how it goes.',
    number: 'The number is given when you issue.<small>Once issued, a challan can’t be edited. A fix is a new challan.</small>',
    issued: 'Issued. Repaired boards: the shelf is released.',
    print: 'Print it. The printout goes with the boards.',
    printed: '“Not a tax invoice”, printed on every copy.',
    testing: 'Going out for customer testing?<small>“Site testing — expected back” is a returnable challan.</small>',
    expected: 'Set “Expected back”. The shelf stays held.',
    stillOut: 'Still out until you record the return.<small>When it comes back, press “Record the return”.</small>',
    remember: 'Remember',
    rules: [
      '<b>Nothing leaves</b> without a challan',
      'A challan is a <b>gate pass</b>, not an invoice',
      '<b>One customer, one reason</b> per challan',
      'Tick the <b>accessories</b> going back. Site testing: <b>Expected back</b>',
    ],
  },
  ta: {
    kicker: 'துளிர் பயிற்சி · பாடம் 10 · Front Office · Liaison',
    title: 'அனுப்புதல்: டெலிவரி சலான்',
    sub: 'கட்டடத்தை விட்டு வெளியே செல்லும் அனைத்தும். சுமார் 100 வினாடிகள்.',
    list: 'வெளியே செல்லக்கூடிய அனைத்தும் இங்கே உள்ளன.<small>Front office › Challans. Front Office வழங்கும்; Liaison-உம் வழங்கலாம்.</small>',
    gatePass: 'சலான் ஒரு gate pass, invoice அல்ல.<small>பொருள் யாரிடம் சென்றது என்ற பதிவு. பில் தனியாகப் போகும்.</small>',
    tick: 'ஒரு வாடிக்கையாளருக்குச் செல்லும் போர்டுகளை டிக் செய்யவும்.',
    mixed: 'ஒரு சலானுக்கு ஒரே காரணம்.<small>பழுது நீக்கியதும் Non-repairable-உம் தனித்தனி சலானில்.</small>',
    leavesAs: '“Leaves as” job-இன் நிலையிலிருந்து வருகிறது.<small>காரணத்தை யாரும் தேர்வு செய்வதில்லை.</small>',
    accessories: 'திரும்பச் செல்லும் ஒவ்வொரு உபகரணத்தையும் டிக் செய்யவும்.<small>வைத்துக்கொண்டோமா, பயன்படுத்திவிட்டோமா? “They stay with us”.</small>',
    carrier: 'யார் கொண்டு செல்கிறார், எப்படிச் செல்கிறது.',
    number: 'Issue செய்யும்போது எண் கிடைக்கும்.<small>Issue செய்த சலானை மாற்ற முடியாது. திருத்தம் = புதிய சலான்.</small>',
    issued: 'Issue ஆனது. பழுது நீக்கிய போர்டுகளின் shelf விடுவிக்கப்படும்.',
    print: 'Print செய்யவும். பிரதி போர்டுகளுடன் செல்லும்.',
    printed: 'ஒவ்வொரு பிரதியிலும் “Not a tax invoice” என்று இருக்கும்.',
    testing: 'வாடிக்கையாளர் சோதனைக்குச் செல்கிறதா?<small>“Site testing — expected back” என்பது திரும்ப வரும் சலான்.</small>',
    expected: '“Expected back” தேதியை இடவும். Shelf காலியாகாது.',
    stillOut: 'திரும்பப் பதிவு செய்யும் வரை வெளியே என்றே காட்டும்.<small>திரும்பி வந்ததும் “Record the return” அழுத்தவும்.</small>',
    remember: 'நினைவில் கொள்ளுங்கள்',
    rules: [
      'சலான் இல்லாமல் <b>எதுவும் வெளியே போகாது</b>',
      'சலான் ஒரு <b>gate pass</b>, invoice அல்ல',
      'ஒரு சலானுக்கு <b>ஒரு வாடிக்கையாளர், ஒரு காரணம்</b>',
      'திரும்பும் <b>உபகரணங்களை</b> டிக் செய்யவும். Site testing: <b>Expected back</b>',
    ],
  },
} as const

export type Lang = keyof typeof CAPTIONS
