/**
 * Module 05 captions, English and Tamil. App words (buttons, labels, states) stay in English.
 */
export const CAPTIONS = {
  en: {
    kicker: 'Thulir training · Module 05 · Service Head · Liaison · Engineer',
    title: 'Allotting and repairing',
    sub: 'Giving a board to an engineer, starting, pausing and resuming. About 2 minutes.',
    // Part 1 — Service Head
    part1: 'Service Head (or Liaison): Service › Reservoir.',
    locked: 'Waiting on the customer? The tick is locked.<small>Awaiting Customer Input can’t be alloted.</small>',
    tick: 'Assessed and clear? Tick it.<small>Several at once is fine: Allot batch.</small>',
    giveTo: 'Give it to: choose the engineer.<small>Their load is beside the name. Nothing is pre-chosen.</small>',
    allot: 'Allot. The job is now Alloted, on their bench.',
    // Part 2 — Engineer
    part2: 'Engineer: Service › My jobs, your bench.',
    card: 'Choose the board. Needed by = its SLA date.<small>Set at the counter for business-critical boards.</small>',
    start: 'Start work when you pick it up.<small>The job moves to In Progress.</small>',
    started: 'In Progress. Book your hours against it.',
    spare: 'Need a part you don’t have? Pending spare.<small>Say which component it is waiting for.</small>',
    paused: 'Paused: Pending Spare. The Liaison sees what it needs.',
    noTime: 'A paused job takes no hours.<small>The system refuses them.</small>',
    hold: 'On Hold is not on your bench.<small>A hold is the Service Head’s call.</small>',
    // Part 3 — Liaison
    part3: 'Liaison: Service › Spares.',
    receipt: 'Part delivered? Recording the goods receipt resumes the board.<small>Module 06.</small>',
    back: 'Found it on the shelf? Back on the bench.<small>Say what happened.</small>',
    resumed: 'Back In Progress on the engineer’s bench.',
    rework: 'Board back under warranty? Don’t reopen the old job.<small>Register a new Rework job at Inward, linked to it.</small>',
    remember: 'Remember',
    rules: [
      '<b>Assessed</b> jobs only: Awaiting Customer Input can’t be alloted',
      'Engineer: <b>Start work</b> when you pick the board up',
      'Waiting for a part? <b>Pending spare</b>, naming the part',
      'Paused jobs take <b>no hours</b>. Rework is a <b>new linked job</b>',
    ],
  },
  ta: {
    kicker: 'துளிர் பயிற்சி · பாடம் 05 · Service Head · Liaison · Engineer',
    title: 'Allot செய்தல், பழுதுபார்த்தல்',
    sub: 'Engineer-க்கு போர்டைக் கொடுப்பது, தொடங்குவது, நிறுத்துவது, மீண்டும் தொடர்வது. சுமார் 2½ நிமிடம்.',
    part1: 'Service Head (அல்லது Liaison): Service › Reservoir.',
    locked: 'வாடிக்கையாளருக்காகக் காத்திருக்கிறதா? Tick பூட்டப்பட்டுள்ளது.<small>Awaiting Customer Input-ஐ allot செய்ய முடியாது.</small>',
    tick: 'Assess ஆகி தெளிவாக உள்ளதா? Tick செய்யவும்.<small>பலவற்றை ஒரே நேரத்தில் செய்யலாம்: Allot batch.</small>',
    giveTo: 'Give it to: engineer-ஐத் தேர்ந்தெடுக்கவும்.<small>பெயருக்கு அருகில் அவர்களின் வேலைச்சுமை. எதுவும் முன்பே தேர்வாகாது.</small>',
    allot: 'Allot. Job இப்போது Alloted, அவர்களின் bench-இல்.',
    part2: 'Engineer: Service › My jobs, உங்கள் bench.',
    card: 'போர்டைத் தேர்ந்தெடுக்கவும். Needed by = அதன் SLA தேதி.<small>Business-critical போர்டுகளுக்குக் கவுண்டரிலேயே அமைக்கப்படும்.</small>',
    start: 'போர்டை எடுக்கும்போது Start work அழுத்தவும்.<small>Job, In Progress-க்கு மாறும்.</small>',
    started: 'In Progress. உங்கள் நேரத்தை இதில் பதிவு செய்யவும்.',
    spare: 'உங்களிடம் இல்லாத part தேவையா? Pending spare.<small>எந்த component-க்காகக் காத்திருக்கிறது என்று எழுதவும்.</small>',
    paused: 'நிறுத்தப்பட்டது: Pending Spare. என்ன தேவை என்று Liaison பார்ப்பார்.',
    noTime: 'நிறுத்திய job-இல் நேரம் பதிவு செய்ய முடியாது.<small>சிஸ்டம் மறுத்துவிடும்.</small>',
    hold: 'On Hold உங்கள் bench-இல் இல்லை.<small>Hold என்பது Service Head எடுக்கும் முடிவு.</small>',
    part3: 'Liaison: Service › Spares.',
    receipt: 'Part வந்துவிட்டதா? Goods receipt பதிவு செய்தால் போர்டு மீண்டும் தொடரும்.<small>பாடம் 06.</small>',
    back: 'Shelf-இலேயே கிடைத்ததா? Back on the bench.<small>என்ன நடந்தது என்று எழுதவும்.</small>',
    resumed: 'Engineer-இன் bench-இல் மீண்டும் In Progress.',
    rework: 'வாரண்டியில் போர்டு திரும்பி வந்ததா? பழைய job-ஐத் திறக்க வேண்டாம்.<small>Inward-இல் அதனுடன் இணைந்த புதிய Rework job-ஐப் பதிவு செய்யவும்.</small>',
    remember: 'நினைவில் கொள்ளுங்கள்',
    rules: [
      '<b>Assess ஆன</b> job-கள் மட்டும்: Awaiting Customer Input-ஐ allot செய்ய முடியாது',
      'Engineer: போர்டை எடுக்கும்போது <b>Start work</b>',
      'Part-க்காகக் காத்திருக்கிறீர்களா? Part பெயருடன் <b>Pending spare</b>',
      'நிறுத்திய job-இல் <b>நேரம் இல்லை</b>. Rework = <b>இணைந்த புதிய job</b>',
    ],
  },
} as const

export type Lang = keyof typeof CAPTIONS
