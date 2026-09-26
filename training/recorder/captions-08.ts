/**
 * Module 08 captions, English and Tamil.
 *
 * Tamil follows TAMIL-STYLE.md: spoken shop-floor Tamil, business words in Tamil script, on-screen
 * labels (buttons, fields, statuses) in English letters.
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
    kicker: 'துளிர் ட்ரெயினிங் · மாட்யூல் 08 · Liaison · Service Head · Engineer',
    title: 'வெரிஃபிகேஷன், கஸ்டமர் டெஸ்டிங்',
    sub: 'வேற இன்ஜினியர் ரிப்பேரை செக் பண்ணுவாங்க, அப்புறம் கஸ்டமர் டெஸ்ட் பண்ணுவாங்க. சுமார் 2½ நிமிடம்.',

    giveK: 'Liaison அல்லது Service Head · Verification',
    giveH: 'செக் பண்ண போர்டுகளை கொடுங்க',
    queue: 'ரிப்பேர் ஆன போர்டுகள் இங்க வெயிட் பண்ணும்.',
    tick: 'போர்டுகளை டிக் பண்ணுங்க. அப்புறம் யார் செக் பண்ணணும்னு செலக்ட் பண்ணுங்க.',
    self: 'ரிப்பேர் பண்ண அதே இன்ஜினியரா? முடியும், ஆனா பதிவாகும்.<small>அது self-verification-ஆ கணக்காகும். வேற யாரும் இல்லைன்னா மட்டும்.</small>',
    peer: 'ரிப்பேர் பண்ணாத வேற இன்ஜினியரை செலக்ட் பண்ணுங்க.',
    given: 'கொடுத்தாச்சு. இப்போ “In Verification”.',

    chkK: 'Engineer (செக் பண்றவர்) · Verification',
    chkH: 'செக் பண்ணுங்க',
    mine: 'உங்க போர்டுகள் “With you to check”-ல இருக்கும்.',
    hours: 'செக் பண்ண டைம் ஆகுதா? போர்டு உங்க கிட்ட இருக்கும்போதே ஹவர்ஸ் போடுங்க.',
    booked: 'உங்க டைம்ஷீட்ல செக்கிங் டைமா புக் ஆச்சு.<small>காஸ்ட் அந்த ஜாபுக்கு போகும்.</small>',
    symptom: 'ஃபெயிலா? என்ன பார்த்தீங்கன்னு எழுதுங்க.<small>Fail-க்கு symptom கட்டாயம். எழுதற வரைக்கும் பட்டன் வெயிட் பண்ணும்.</small>',
    failed: 'திரும்ப பெஞ்சுக்கு: “In Progress”, உங்க symptom-ஓட.<small>ஒவ்வொரு ஃபெயிலான செக்கும் பதிவுல இருக்கும்.</small>',
    pass: 'சரியா வேலை செய்யுதா? “Pass”.',
    passed: 'Pass ஆச்சு. இப்போ கஸ்டமர் டெஸ்ட்டுக்கு வெயிட் பண்ணுது.',

    custK: 'Liaison · Verification',
    custH: 'கஸ்டமர் டெஸ்டிங்',
    withCust: 'கஸ்டமர் அவங்க மெஷின்ல டெஸ்ட் பண்ணுவாங்க.<small>ரிசல்ட்டை அவங்க சார்பா நீங்க பதிவு பண்ணுங்க.</small>',
    said: 'அவங்க சொன்னதை எழுதுங்க.',
    choices: 'இன்னும் ஃபால்ட்டா? திரும்ப பெஞ்சுக்கு போகும்.',
    closed: 'வேலை செய்யுது: ஜாப் க்ளோஸ் ஆகும், “Ready for Invoice”.',

    remember: 'ஞாபகம் வெச்சுக்கோங்க',
    rules: [
      'ரிப்பேர் பண்ணவர் இல்ல, <b>வேற இன்ஜினியர்</b> செக் பண்ணணும்',
      'Fail → <b>symptom</b> எழுதுங்க. போர்டு பெஞ்சுக்கு திரும்பும்',
      'செக்கிங் ஹவர்ஸ் <b>உங்க டைம்ஷீட்ல</b>, போர்டு உங்க கிட்ட இருக்கும்போது',
      'Liaison <b>கஸ்டமர் டெஸ்டிங்</b> பதிவு பண்ணுவாங்க. Pass → Ready for Invoice',
    ],
  },
} as const

export type Lang = keyof typeof CAPTIONS
