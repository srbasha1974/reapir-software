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
    kicker: 'துளிர் பயிற்சி · பாடம் 02 · Front Office',
    title: 'டெலிவரியைப் பதிவு செய்தல்',
    sub: 'கவுண்டரில் போர்டுகளைப் பதிவு செய்வது எப்படி. சுமார் 90 வினாடிகள்.',
    arrive: 'கவுண்டருக்கு ஒரு டெலிவரி வருகிறது.<small>ஒரு டெலிவரி = ஒரு Inward.</small>',
    customer: 'வாடிக்கையாளரைத் தேடித் தேர்ந்தெடுக்கவும்.<small>Customer code-ஐ சிஸ்டமே தரும். நீங்கள் தட்டச்சு செய்ய வேண்டாம்.</small>',
    newCustomer: 'புதிய வாடிக்கையாளரா? “They are not on the list” அழுத்தவும்.<small>அவர்கள் Potential ஆகப் பதிவாவார்கள். மீதி விவரங்களை Sales பின்னர் நிரப்பும்.</small>',
    broughtBy: 'Brought by = பொருளை அனுப்பிய வாடிக்கையாளர் தரப்பு நபர்.',
    salesEngineer: 'Sales engineer = இந்த டெலிவரிக்கான கிரெடிட் யாருக்கு.<small>எப்போதும் நிரப்ப வேண்டும். பின்னர் மாற்றுவது கடினம்.</small>',
    ref: 'Their ref. = அவர்களின் கூரியர் டாக்கெட் அல்லது டெலிவரி நோட் எண்.',
    describe: 'இப்போது பொருளை ஒருமுறை மட்டும் விவரிக்கவும்.',
    cameWith: 'Came with: கூட வந்த ஒவ்வொரு உபகரணத்தையும் எழுதவும்.<small>இதே பட்டியல் சலானில் திரும்பச் செல்லும்.</small>',
    units: 'ஒரே மாதிரி 3 யூனிட்டா? ஒரே item. யூனிட்டுக்கு ஒரு வரி சேர்க்கவும்.<small>ஒரே item-ஐ 3 முறை சேர்க்க வேண்டாம்.</small>',
    serial: 'ஒவ்வொரு யூனிட்டுக்கும் தனி serial number வேண்டும்.',
    bin: 'ஒரு bin-இல் ஒரு போர்டு மட்டும். பச்சை “free” குறியைப் பாருங்கள்.',
    damage: 'ஒவ்வொரு யூனிட்டின் சேதத்தையும் இங்கேயே குறிக்கவும்.<small>காலியாக விட்டால் “யாரும் பார்க்கவில்லை” என்று பொருள், “சரியாக உள்ளது” அல்ல.</small>',
    numbers: 'மூன்று யூனிட் = மூன்று job number.<small>Register செய்யும் வரை இவை “expected” எண்கள் மட்டுமே.</small>',
    done: 'பதிவு முடிந்தது. ஒவ்வொரு யூனிட்டும் இப்போது தனி job.<small>Status: Pre-Repair › Inward. அடுத்தது: assessment.</small>',
    remember: 'நினைவில் கொள்ளுங்கள்',
    rules: [
      'ஒரே பொருள், பல யூனிட் → <b>ஒரே item, யூனிட்டுக்கு ஒரு வரி</b>',
      '<b>ஒவ்வொரு யூனிட்டுக்கும் serial.</b> ஒரு bin-இல் ஒரு போர்டு',
      '<b>Sales engineer</b> எப்போதும் நிரப்பவும்',
      '<b>உபகரணங்களையும் சேதத்தையும்</b> கவுண்டரிலேயே எழுதவும்',
    ],
  },
} as const

export type Lang = keyof typeof CAPTIONS
