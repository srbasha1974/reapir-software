/**
 * Module 07 captions, English and Tamil.
 *
 * Tamil follows TAMIL-STYLE.md: spoken shop-floor Tamil, business words in Tamil script, on-screen
 * labels (buttons, fields, statuses) in English letters.
 */
export const CAPTIONS = {
  en: {
    kicker: 'Thulir training · Module 07 · Engineer',
    title: 'Timesheets',
    sub: 'Hours on your own jobs, every day. About 1½ minutes.',
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
    kicker: 'துளிர் ட்ரெயினிங் · மாட்யூல் 07 · Engineer',
    title: 'டைம்ஷீட்',
    sub: 'உங்க சொந்த ஜாப்ல தினமும் ஹவர்ஸ் போடுறது. சுமார் 2 நிமிஷம்.',
    open: 'My timesheet: வாரத்துக்கு ஒரு ஷீட், திங்கள்ல இருந்து.<small>ஒவ்வொரு work order-க்கும் ஒரு ரோ.</small>',
    add: '“Add a work order”.<small>உங்க பெஞ்சுல இருக்கற போர்டு மட்டும் தான் வரும்.</small>',
    type: 'ஹவர்ஸை அந்த நாள் கட்டத்துல டைப் பண்ணுங்க.<small>கட்டத்தை விட்டு வெளிய வந்தா சேவ் ஆயிடும்.</small>',
    total: 'நாள் டோட்டலை சிஸ்டமே கணக்கு போடும்.',
    over: 'டெய்லி லிமிட்டை தாண்டினா? ஏத்துக்காது.<small>ஒரு நாளுக்கு 10 ஹவர்ஸுக்கு மேல போகக் கூடாது. லிமிட் configuration-ல இருக்கு.</small>',
    fix: 'நம்பரை சரி பண்ணுங்க. சேவ் ஆயிடும்.',
    paused: 'நிறுத்தி வெச்ச ஜாப் (Pending Spare, On Hold)? ஹவர்ஸ் போட முடியாது.<small>Closed ஜாப், உங்களோடது இல்லாத ஜாப்லயும் முடியாது.</small>',
    rate: 'ரேட் டைப் பண்ண வேண்டாம்.<small>ஒவ்வொரு ஹவருக்கும் உங்க காஸ்ட் ரேட்டை சிஸ்டமே போடும்.</small>',
    submit: 'வாரம் முடிஞ்சதா? “Submit week”.',
    locked: 'Submit ஆச்சு. வாரம் லாக் ஆயிடுச்சு.<small>ஏதாவது சரி பண்ணணும்னா Service Head கிட்ட பேசுங்க. நீங்களே எடிட் பண்ண முடியாது.</small>',
    remember: 'ஞாபகம் வெச்சுக்கோங்க',
    rules: [
      '<b>தினமும்</b> ஹவர்ஸ் போடுங்க, <b>உங்க சொந்த</b> ஜாப்ல மட்டும்',
      '<b>நிறுத்தி வெச்ச</b> அல்லது <b>Closed</b> ஜாப்ல ஹவர்ஸ் இல்ல',
      'ஒரு நாள் <b>டெய்லி லிமிட்டை</b> தாண்டக் கூடாது',
      'வாரம் முடிஞ்சதும் <b>Submit week</b>. அது லாக் ஆயிடும்',
    ],
  },
} as const

export type Lang = keyof typeof CAPTIONS
