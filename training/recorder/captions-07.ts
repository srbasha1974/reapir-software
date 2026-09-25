/**
 * Module 07 captions, English and Tamil.
 *
 * Tamil keeps the app's own words in English (button names, field labels, statuses), because
 * that is what staff will see on screen.
 */
export const CAPTIONS = {
  en: {
    kicker: 'Thulir training · Module 07 · Engineer',
    title: 'Timesheets',
    sub: 'Hours on your own jobs, every day. About 75 seconds.',
    open: 'My timesheet: one sheet per week, from Monday.<small>A row per work order.</small>',
    add: 'Add a work order.<small>Only boards on your bench are offered.</small>',
    type: 'Type the hours under their day.<small>The cell saves when you leave it.</small>',
    total: 'The day total is worked out by the system.',
    over: 'Over the daily limit? Refused.<small>A day may not pass 10 hours. The limit is set in configuration.</small>',
    fix: 'Correct the number. It saves.',
    paused: 'Paused job (Pending Spare, On Hold)? No hours.<small>Closed jobs, or jobs not yours, take none either.</small>',
    rate: 'No rate to type.<small>The system applies your cost rate to every hour.</small>',
    submit: 'Week finished? Submit week.',
    locked: 'Submitted. The week is locked.<small>A correction is a talk with your Service Head, not an edit.</small>',
    remember: 'Remember',
    rules: [
      'Book hours <b>every day</b>, only on <b>your own</b> jobs',
      'No hours on <b>paused</b> or <b>closed</b> jobs',
      'A day may not pass the <b>daily limit</b>',
      '<b>Submit week</b> when it is done. It locks',
    ],
  },
  ta: {
    kicker: 'துளிர் பயிற்சி · பாடம் 07 · Engineer',
    title: 'Timesheet',
    sub: 'உங்கள் சொந்த job-களில் தினமும் நேரம் பதிவு. சுமார் 85 வினாடிகள்.',
    open: 'My timesheet: வாரத்துக்கு ஒரு sheet, திங்கள் முதல்.<small>ஒவ்வொரு work order-க்கும் ஒரு வரி.</small>',
    add: 'Add a work order.<small>உங்கள் bench-இல் உள்ள போர்டுகள் மட்டுமே வரும்.</small>',
    type: 'நேரத்தை அந்த நாளின் கட்டத்தில் எழுதவும்.<small>Cell-ஐ விட்டு நகர்ந்ததும் சேமிக்கப்படும்.</small>',
    total: 'நாள் மொத்தத்தை சிஸ்டமே கணக்கிடும்.',
    over: 'தினசரி வரம்பைத் தாண்டினால்? மறுக்கப்படும்.<small>ஒரு நாள் 10 மணி நேரத்தைத் தாண்டக்கூடாது. வரம்பு configuration-இல் உள்ளது.</small>',
    fix: 'எண்ணைத் திருத்துங்கள். சேமிக்கப்படும்.',
    paused: 'Paused job (Pending Spare, On Hold)? நேரம் பதிய முடியாது.<small>மூடிய job-களிலும், உங்களுடையதல்லாத job-களிலும் முடியாது.</small>',
    rate: 'Rate எழுத வேண்டியதில்லை.<small>ஒவ்வொரு மணி நேரத்துக்கும் உங்கள் cost rate-ஐ சிஸ்டமே சேர்க்கும்.</small>',
    submit: 'வாரம் முடிந்ததா? Submit week.',
    locked: 'Submit ஆனது. வாரம் பூட்டப்பட்டது.<small>திருத்தம் வேண்டுமானால் Service Head-இடம் பேசுங்கள். நீங்களே மாற்ற முடியாது.</small>',
    remember: 'நினைவில் கொள்ளுங்கள்',
    rules: [
      '<b>தினமும்</b> நேரம் பதியுங்கள், <b>உங்கள் சொந்த</b> job-களில் மட்டும்',
      '<b>Paused</b> அல்லது <b>மூடிய</b> job-களில் நேரம் இல்லை',
      'ஒரு நாள் <b>தினசரி வரம்பைத்</b> தாண்டக்கூடாது',
      'வாரம் முடிந்ததும் <b>Submit week</b>. அது பூட்டப்படும்',
    ],
  },
} as const

export type Lang = keyof typeof CAPTIONS
