/**
 * Module 02 captions, English and Tamil.
 *
 * Tamil keeps the app's own words in English (button names, field labels, statuses), because
 * that is what staff will see on screen.
 */
export const CAPTIONS = {
  en: {
    kicker: 'Thulir training · Module 02 · Front Office',
    title: 'Receiving a delivery',
    sub: 'Booking boards in at the counter. About 90 seconds.',
    arrive: 'A delivery arrives at the counter.<small>One delivery = one Inward.</small>',
    customer: 'Search and pick the customer.<small>The customer code comes from the system. Never type one.</small>',
    newCustomer: 'New customer? Use “They are not on the list”.<small>They are created as Potential. Sales completes the record later.</small>',
    broughtBy: 'Brought by = the customer’s person who sent it.',
    salesEngineer: 'Sales engineer = who gets the credit.<small>Always filled. It is hard to change later.</small>',
    ref: 'Their ref. = their courier docket or delivery note.',
    describe: 'Now describe the item, once.',
    cameWith: 'Came with: write every accessory you receive.<small>The same list goes back on the challan.</small>',
    units: '3 identical units? One item. Add a row per unit.<small>Don’t add the same item 3 times.</small>',
    serial: 'Every unit needs its own serial number.',
    bin: 'One board per bin. Look for the green “free” badge.',
    damage: 'Note damage per unit, before it goes in.<small>Blank means “nobody checked”, not “fine”.</small>',
    numbers: 'Three units = three job numbers.<small>Numbers are only “expected” until you register.</small>',
    done: 'Registered. Each unit is now its own job.<small>Status: Pre-Repair › Inward. Next stop: assessment.</small>',
    remember: 'Remember',
    rules: [
      'Same item, many units → <b>one item, a row per unit</b>',
      '<b>Serial on every unit.</b> One board per bin',
      '<b>Sales engineer</b> always filled',
      'Write <b>accessories</b> and <b>damage</b> at the counter',
    ],
  },
  ta: {
    kicker: 'துளிர் ட்ரெயினிங் · மாட்யூல் 02 · Front Office',
    title: 'டெலிவரி வந்தா எப்படி பதிவு செய்வது',
    sub: 'கவுண்டர்ல போர்டுகளை Inward பண்றது. சுமார் 2 நிமிடம்.',
    arrive: 'கவுண்டருக்கு ஒரு டெலிவரி வருது.<small>ஒரு டெலிவரி = ஒரு Inward.</small>',
    customer: 'கஸ்டமரை சர்ச் பண்ணி செலக்ட் பண்ணுங்க.<small>கஸ்டமர் கோடு சிஸ்டமே போடும். நீங்க டைப் பண்ண வேண்டாம்.</small>',
    newCustomer: 'புது கஸ்டமரா? “They are not on the list” அழுத்துங்க.<small>Potential கஸ்டமரா சேரும். மீதி டீடெயில்ஸ் சேல்ஸ் டீம் போடுவாங்க.</small>',
    broughtBy: 'Brought by = போர்டை அனுப்பின கஸ்டமர் பக்க ஆள்.',
    salesEngineer: 'Sales engineer = இந்த டெலிவரியோட கிரெடிட் யாருக்கு.<small>எப்பவும் ஃபில் பண்ணணும். அப்புறம் மாத்துறது கஷ்டம்.</small>',
    ref: 'Their ref. = அவங்க கூரியர் டாக்கெட் அல்லது டெலிவரி நோட் நம்பர்.',
    describe: 'இப்போ ஐட்டம் டீடெயில்ஸ் ஒரு தடவை மட்டும் போடுங்க.',
    cameWith: 'Came with: கூட வந்த எல்லா அக்சஸரீஸும் எழுதுங்க.<small>இதே லிஸ்ட் சலான்ல திரும்பப் போகும்.</small>',
    units: 'ஒரே மாதிரி 3 யூனிட்டா? ஒரே ஐட்டம். யூனிட்டுக்கு ஒரு ரோ சேருங்க.<small>ஒரே ஐட்டத்தை 3 தடவை சேர்க்காதீங்க.</small>',
    serial: 'ஒவ்வொரு யூனிட்டுக்கும் தனி சீரியல் நம்பர் வேணும்.',
    bin: 'ஒரு பின்ல ஒரு போர்டு மட்டும். பச்சை “free” வருதான்னு பாருங்க.',
    damage: 'ஒவ்வொரு யூனிட்டோட டேமேஜையும் இங்கேயே எழுதுங்க.<small>காலியா விட்டா “யாரும் செக் பண்ணல”ன்னு அர்த்தம், “சரியா இருக்கு”ன்னு இல்ல.</small>',
    numbers: '3 யூனிட் = 3 ஜாப் நம்பர்.<small>Register பண்ற வரைக்கும் இது “expected” நம்பர் மட்டும்.</small>',
    done: 'Register ஆச்சு. ஒவ்வொரு யூனிட்டும் இப்போ தனி ஜாப்.<small>ஸ்டேட்டஸ்: Pre-Repair › Inward. அடுத்தது அசெஸ்மென்ட்.</small>',
    remember: 'ஞாபகம் வெச்சுக்கோங்க',
    rules: [
      'ஒரே ஐட்டம், பல யூனிட் → <b>ஒரே ஐட்டம், யூனிட்டுக்கு ஒரு ரோ</b>',
      '<b>ஒவ்வொரு யூனிட்டுக்கும் சீரியல்.</b> ஒரு பின்ல ஒரு போர்டு',
      '<b>Sales engineer</b> எப்பவும் ஃபில் பண்ணுங்க',
      '<b>அக்சஸரீஸ், டேமேஜ்</b> இரண்டையும் கவுண்டர்லயே எழுதுங்க',
    ],
  },
} as const

export type Lang = keyof typeof CAPTIONS
