/**
 * Module 09 captions, English and Tamil.
 *
 * Tamil keeps the app's own words in English (button names, field labels, statuses), because
 * that is what staff will see on screen.
 */
export const CAPTIONS = {
  en: {
    kicker: 'Thulir training · Module 09 · Service Head · Liaison',
    title: 'Closing a job',
    sub: 'The three ways a job closes. About 2 minutes.',
    now: 'Now signed in as',
    three: 'A job closes in one of three ways.<small>Ready for Invoice, Non-Repairable or Customer Rejected.</small>',
    cannot: 'Service Head: the board can’t be saved?<small>Open the job and press “It cannot be saved…”.</small>',
    reason: 'Pick the reason from the list.<small>No free text. Nothing fits? Ask the Operations Manager to add one.</small>',
    noWayBack: 'There is no way back from this.<small>A new attempt is a new job, registered as a rework.</small>',
    closed: 'Closed as Non-Repairable.<small>Hours spent stay on record as wasted time. The board goes back on a challan.</small>',
    custList: 'Liaison: the customer has tested it.<small>Verification › With the customer.</small>',
    whatSaid: 'Write what the customer said.',
    pass: 'Works? “It works — close it”.<small>Still faulty? It goes back to the bench, In Progress.</small>',
    passDone: 'Customer test passed: the job is closed.<small>Status: Closed › Ready for Invoice. It now waits to be billed.</small>',
    withdrewIntro: 'Customer doesn’t want the repair?<small>Reservoir › Before the bench › Under assessment.</small>',
    withdrew: '“Customer withdrew”, and say how you know.',
    rejectedDone: 'Closed as Customer Rejected.<small>It waits for a challan to go back.</small>',
    quoteRejected: 'A rejected quotation does the same.<small>“Record rejection” closes every job on it as Customer Rejected.</small>',
    sendBack: 'Open job not right yet? Send it back.<small>Service Head or Liaison, from any open state.</small>',
    sendWhy: 'Say why. The engineer starts from this note.',
    backDone: 'Back on the bench, In Progress, with your note.',
    closedFinal: 'A closed job can’t be sent back.<small>Register a rework job at the counter instead.</small>',
    remember: 'Remember',
    rules: [
      'Non-Repairable: <b>a reason from the list</b>, never free text',
      'Customer test passed → <b>Ready for Invoice</b>',
      'Withdrew, or quotation rejected → <b>Customer Rejected</b>',
      'Open job not right? <b>Send it back</b>. Closed? <b>New rework job</b>',
    ],
  },
  ta: {
    kicker: 'துளிர் பயிற்சி · பாடம் 09 · Service Head · Liaison',
    title: 'Job-ஐ மூடுதல்',
    sub: 'ஒரு job மூடப்படும் மூன்று வழிகள். சுமார் 2 நிமிடங்கள்.',
    now: 'இப்போது உள்நுழைந்திருப்பவர்',
    three: 'ஒரு job மூன்றில் ஒரு வழியில் மூடப்படும்.<small>Ready for Invoice, Non-Repairable அல்லது Customer Rejected.</small>',
    cannot: 'Service Head: போர்டைச் சரிசெய்ய முடியவில்லையா?<small>Job-ஐத் திறந்து “It cannot be saved…” அழுத்தவும்.</small>',
    reason: 'பட்டியலில் இருந்து காரணத்தைத் தேர்ந்தெடுக்கவும்.<small>சொந்தமாக எழுத இடம் இல்லை. பொருந்தவில்லையா? Operations Manager-இடம் சேர்க்கச் சொல்லவும்.</small>',
    noWayBack: 'இதைத் திரும்பப் பெற முடியாது.<small>மீண்டும் முயற்சிக்க, rework ஆகப் புதிய job பதிவு செய்ய வேண்டும்.</small>',
    closed: 'Non-Repairable ஆக மூடப்பட்டது.<small>செலவான நேரம் வீணான நேரமாகப் பதிவில் இருக்கும். போர்டு சலானில் திரும்பும்.</small>',
    custList: 'Liaison: வாடிக்கையாளர் சோதித்துவிட்டார்.<small>Verification › With the customer.</small>',
    whatSaid: 'வாடிக்கையாளர் சொன்னதை எழுதவும்.',
    pass: 'வேலை செய்கிறதா? “It works — close it”.<small>இன்னும் பழுதா? போர்டு bench-க்குத் திரும்பும், In Progress.</small>',
    passDone: 'வாடிக்கையாளர் சோதனை வெற்றி: job மூடப்பட்டது.<small>Status: Closed › Ready for Invoice. இனி பில் செய்யக் காத்திருக்கும்.</small>',
    withdrewIntro: 'வாடிக்கையாளருக்குப் பழுதுபார்ப்பு வேண்டாமா?<small>Reservoir › Before the bench › Under assessment.</small>',
    withdrew: '“Customer withdrew” அழுத்தி, எப்படித் தெரியும் என்று எழுதவும்.',
    rejectedDone: 'Customer Rejected ஆக மூடப்பட்டது.<small>திரும்ப அனுப்ப சலானுக்குக் காத்திருக்கும்.</small>',
    quoteRejected: 'Quotation நிராகரிக்கப்பட்டாலும் இதுவே நடக்கும்.<small>“Record rejection” அதிலுள்ள எல்லா job-களையும் Customer Rejected ஆக மூடும்.</small>',
    sendBack: 'திறந்த job இன்னும் சரியில்லையா? திருப்பி அனுப்பவும்.<small>Service Head அல்லது Liaison, திறந்திருக்கும் எந்த நிலையிலிருந்தும்.</small>',
    sendWhy: 'ஏன் என்று எழுதவும். Engineer இந்தக் குறிப்பிலிருந்தே தொடங்குவார்.',
    backDone: 'உங்கள் குறிப்புடன் bench-க்குத் திரும்பியது, In Progress.',
    closedFinal: 'மூடிய job-ஐத் திருப்பி அனுப்ப முடியாது.<small>பதிலாக, கவுண்டரில் rework job பதிவு செய்யவும்.</small>',
    remember: 'நினைவில் கொள்ளுங்கள்',
    rules: [
      'Non-Repairable: <b>பட்டியலில் உள்ள காரணம்</b>, சொந்த வார்த்தைகள் இல்லை',
      'வாடிக்கையாளர் சோதனை வெற்றி → <b>Ready for Invoice</b>',
      'வாடிக்கையாளர் விலகினால் அல்லது quotation நிராகரிப்பு → <b>Customer Rejected</b>',
      'திறந்த job சரியில்லையா? <b>திருப்பி அனுப்பவும்</b>. மூடியதா? <b>புதிய rework job</b>',
    ],
  },
} as const

export type Lang = keyof typeof CAPTIONS
