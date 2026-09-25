/**
 * Module 08 captions, English and Tamil.
 *
 * Tamil keeps the app's own words in English (button names, field labels, statuses), because
 * that is what staff will see on screen.
 */
export const CAPTIONS = {
  en: {
    kicker: 'Thulir training · Module 08 · Liaison · Service Head · Engineer',
    title: 'Verification and customer testing',
    sub: 'A peer checks the repair, then the customer tests it. About 2 minutes.',

    giveK: 'Liaison or Service Head · Verification',
    giveH: 'Give boards out to be checked',
    queue: 'Repaired boards wait here to be given out.',
    tick: 'Tick the boards. Then choose who checks them.',
    self: 'The engineer who repaired them? Allowed, but recorded.<small>It counts as self-verification. Use it only when nobody else can.</small>',
    peer: 'Choose a peer: somebody who did not repair it.',
    given: 'Given out. Now they are In Verification.',

    chkK: 'Engineer (the checker) · Verification',
    chkH: 'Check it',
    mine: 'Your boards are under With you to check.',
    hours: 'Checking takes time? Book it while you hold the board.',
    booked: 'Booked on your timesheet as checking time.<small>The job carries the cost.</small>',
    symptom: 'It fails? Write what you saw.<small>Fail needs a symptom. The button waits for it.</small>',
    failed: 'Back on the bench: In Progress, with your symptom.<small>Every failed check stays on the record.</small>',
    pass: 'It works? Pass.',
    passed: 'Passed. It now waits for the customer’s test.',

    custK: 'Liaison · Verification',
    custH: 'Customer testing',
    withCust: 'The customer tests it on their own device.<small>You record the result for them.</small>',
    said: 'Write what they said.',
    choices: 'Still faulty? It goes back to the bench.',
    closed: 'It works: the job closes, Ready for Invoice.',

    remember: 'Remember',
    rules: [
      'A <b>peer</b> checks the repair, not the repairer',
      'Fail → write the <b>symptom</b>. It goes back to the bench',
      'Checking hours go on <b>your timesheet</b> while you hold it',
      'Liaison records <b>customer testing</b>. Pass → Ready for Invoice',
    ],
  },
  ta: {
    kicker: 'துளிர் பயிற்சி · பாடம் 08 · Liaison · Service Head · Engineer',
    title: 'Verification, customer testing',
    sub: 'சக engineer பழுதுபார்ப்பைச் சோதிப்பார், பின்னர் வாடிக்கையாளர் சோதிப்பார். சுமார் 2 நிமிடங்கள்.',

    giveK: 'Liaison அல்லது Service Head · Verification',
    giveH: 'சோதனைக்குப் போர்டுகளை ஒப்படைத்தல்',
    queue: 'பழுதுபார்த்த போர்டுகள் ஒப்படைக்கப்பட இங்கே காத்திருக்கும்.',
    tick: 'போர்டுகளை டிக் செய்து, யார் சோதிப்பார் என்று தேர்ந்தெடுக்கவும்.',
    self: 'பழுதுபார்த்த அதே engineer-ஆ? அனுமதி உண்டு, ஆனால் பதிவாகும்.<small>அது self-verification ஆகக் கணக்கிடப்படும். வேறு யாரும் இல்லாதபோது மட்டும்.</small>',
    peer: 'சக engineer-ஐத் தேர்ந்தெடுக்கவும்: அதைப் பழுதுபார்க்காதவர்.',
    given: 'ஒப்படைக்கப்பட்டது. இப்போது அவை In Verification.',

    chkK: 'Engineer (சோதிப்பவர்) · Verification',
    chkH: 'சோதித்தல்',
    mine: 'உங்கள் போர்டுகள் With you to check-இல் இருக்கும்.',
    hours: 'சோதனைக்கு நேரம் ஆகிறதா? போர்டு உங்களிடம் இருக்கும்போதே பதியுங்கள்.',
    booked: 'உங்கள் timesheet-இல் சோதனை நேரமாகப் பதிவானது.<small>செலவு அந்த job-க்குச் சேரும்.</small>',
    symptom: 'சோதனையில் தோல்வியா? பார்த்ததை எழுதுங்கள்.<small>Fail-க்கு symptom கட்டாயம். அதுவரை பொத்தான் காத்திருக்கும்.</small>',
    failed: 'மீண்டும் bench-க்கு: In Progress, உங்கள் symptom-உடன்.<small>ஒவ்வொரு தோல்வியும் பதிவில் இருக்கும்.</small>',
    pass: 'சரியாக வேலை செய்கிறதா? Pass.',
    passed: 'Pass ஆனது. இப்போது வாடிக்கையாளர் சோதனைக்குக் காத்திருக்கிறது.',

    custK: 'Liaison · Verification',
    custH: 'வாடிக்கையாளர் சோதனை',
    withCust: 'வாடிக்கையாளர் தங்கள் சொந்த சாதனத்தில் சோதிப்பார்.<small>முடிவை அவர்கள் சார்பில் நீங்கள் பதிவு செய்கிறீர்கள்.</small>',
    said: 'அவர்கள் சொன்னதை எழுதுங்கள்.',
    choices: 'இன்னும் கோளாறா? மீண்டும் bench-க்குப் போகும்.',
    closed: 'வேலை செய்கிறது: job மூடப்படும், Ready for Invoice.',

    remember: 'நினைவில் கொள்ளுங்கள்',
    rules: [
      'பழுதுபார்த்தவர் அல்ல, <b>சக engineer</b> சோதிப்பார்',
      'Fail → <b>symptom</b> எழுதுங்கள். போர்டு bench-க்குத் திரும்பும்',
      'சோதனை நேரம் <b>உங்கள் timesheet</b>-இல், போர்டு உங்களிடம் இருக்கும்போது',
      'Liaison <b>customer testing</b> பதிவார். Pass → Ready for Invoice',
    ],
  },
} as const

export type Lang = keyof typeof CAPTIONS
