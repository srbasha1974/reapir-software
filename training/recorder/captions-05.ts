/**
 * Module 05 captions, English and Tamil. App words (buttons, labels, states) stay in English.
 * Tamil follows TAMIL-STYLE.md: spoken Tamil, business words in Tamil script, screen labels in English.
 */
export const CAPTIONS = {
  en: {
    kicker: 'Thulir training · Module 05 · Service Head · Liaison · Engineer',
    title: 'Allotting and repairing',
    sub: 'Allot with an SLA, start, pause for a spare, hold and release. About 2½ minutes.',
    // Part 1 — Service Head
    part1: 'Service Head or Liaison: Service › Reservoir.<small>Waiting on the customer? Its tick is locked.</small>',
    tick: 'Assessed and clear? Tick it.<small>Several at once is fine: Allot batch.</small>',
    slaBy: 'Business-critical? “SLA by” asks for the SLA date.<small>Pre-filled with the date the customer asked for.</small>',
    slaSet: 'Change it if you promise another date.<small>You set the SLA here, at allotment.</small>',
    giveTo: 'Give it to: choose the engineer.<small>Their load is beside the name. Nothing is pre-chosen.</small>',
    allot: 'Allot. The job is now Alloted, on their bench.',
    // Part 2 — Engineer
    part2: 'Engineer: Service › My jobs, your bench.',
    card: 'Needed by = the SLA date set at allotment.',
    start: 'Start work when you pick it up.<small>The job moves to In Progress.</small>',
    spare: 'Need a part you don’t have? Pending spare.<small>Say which component it is waiting for.</small>',
    noTime: 'A paused job takes no hours.<small>The system refuses them.</small>',
    noResume: 'You can’t resume it or put it on hold yourself.<small>The Liaison or Service Head does.</small>',
    // Part 3 — Liaison
    back: 'Liaison, Service › Spares: part found on the shelf?<small>Back on the bench, say why. A goods receipt also resumes it (Module 06).</small>',
    slaCard: 'The job card shows the SLA and where it stands.<small>“due today” or “Nd over” once it is late.</small>',
    hold: 'Stuck for a reason that isn’t a part? Put on hold.<small>Service Head or Liaison, from In Progress only.</small>',
    held: 'On Hold: the engineer sees why. No hours can be booked.',
    released: 'Cleared? Release hold, say what cleared it.<small>Back In Progress with the same engineer.</small>',
    remember: 'Remember',
    rules: [
      'Business-critical: set the <b>SLA by</b> date as you allot',
      'Engineer: <b>Start work</b>; missing part → <b>Pending spare</b>',
      'Paused or held jobs take <b>no hours</b>',
      '<b>Put on hold / Release hold</b>: Service Head or Liaison, with a reason',
    ],
  },
  ta: {
    kicker: 'துளிர் ட்ரெயினிங் · மாட்யூல் 05 · Service Head · Liaison · Engineer',
    title: 'அலாட் & ரிப்பேர்',
    sub: 'SLA-வோட அலாட், ஸ்டார்ட், ஸ்பேருக்கு நிறுத்தறது, ஹோல்ட், ரிலீஸ். சுமார் 2½ நிமிஷம்.',
    part1: 'சர்வீஸ் ஹெட் அல்லது Liaison: “Service › Reservoir”.<small>கஸ்டமருக்காக வெயிட்டிங்கா? டிக் லாக் ஆகியிருக்கும்.</small>',
    tick: 'அசெஸ் ஆகி க்ளியரா இருக்கா? டிக் பண்ணுங்க.<small>நிறைய ஒரே நேரத்துல பண்ணலாம்: “Allot batch”.</small>',
    slaBy: 'பிசினஸ்-க்ரிட்டிகலா? “SLA by” SLA தேதி கேக்கும்.<small>கஸ்டமர் கேட்ட தேதி ஏற்கனவே போட்டிருக்கும்.</small>',
    slaSet: 'வேற தேதி ப்ராமிஸ் பண்ணா மாத்துங்க.<small>SLA-வை இங்கே, அலாட் பண்ணும்போது தான் போடறீங்க.</small>',
    giveTo: '“Give it to”: இன்ஜினியரை செலக்ட் பண்ணுங்க.<small>பேருக்கு பக்கத்துல அவங்க லோடு இருக்கு. எதுவும் தானா செலக்ட் ஆகாது.</small>',
    allot: '“Allot”. ஜாப் இப்போ “Alloted”, அவங்க பெஞ்சுல.',
    part2: 'இன்ஜினியர்: “Service › My jobs”, உங்க பெஞ்ச்.',
    card: '“Needed by” = அலாட் பண்ணும்போது போட்ட SLA தேதி.',
    start: 'போர்டை எடுக்கும்போது “Start work”.<small>ஜாப் “In Progress”க்கு போகும்.</small>',
    spare: 'உங்ககிட்ட இல்லாத பார்ட் வேணுமா? “Pending spare”.<small>எந்த கம்போனென்ட்டுக்கு வெயிட்டிங்னு எழுதுங்க.</small>',
    noTime: 'நிறுத்தி வெச்ச ஜாப்ல ஹவர்ஸ் போட முடியாது.<small>சிஸ்டம் ஏத்துக்காது.</small>',
    noResume: 'நீங்களே ரெஸ்யூம் பண்ணவோ ஹோல்ட் போடவோ முடியாது.<small>Liaison அல்லது சர்வீஸ் ஹெட் தான் பண்ணுவாங்க.</small>',
    back: 'Liaison, “Service › Spares”: பார்ட் ஷெல்ஃப்லயே கிடைச்சுதா?<small>“Back on the bench”, ஏன்னு எழுதுங்க. குட்ஸ் ரிசீட் போட்டாலும் ரெஸ்யூம் ஆகும் (மாட்யூல் 06).</small>',
    slaCard: 'ஜாப் கார்டுல SLA-வும் அது எங்கே நிக்குதுன்னும் தெரியும்.<small>லேட் ஆனா “due today” அல்லது “Nd over”.</small>',
    hold: 'பார்ட் இல்லாம வேற காரணத்துக்கு நிக்குதா? “Put on hold”.<small>சர்வீஸ் ஹெட் அல்லது Liaison, “In Progress”ல இருந்து மட்டும்.</small>',
    held: '“On Hold”: ஏன்னு இன்ஜினியருக்கு தெரியும். ஹவர்ஸ் போட முடியாது.',
    released: 'க்ளியர் ஆச்சா? “Release hold”, என்ன க்ளியர் ஆச்சுன்னு எழுதுங்க.<small>அதே இன்ஜினியர்கிட்ட திரும்ப “In Progress”.</small>',
    remember: 'ஞாபகம் வெச்சுக்கோங்க',
    rules: [
      'பிசினஸ்-க்ரிட்டிகல்: அலாட் பண்ணும்போது <b>“SLA by”</b> தேதி போடுங்க',
      'இன்ஜினியர்: <b>“Start work”</b>; பார்ட் இல்லன்னா <b>“Pending spare”</b>',
      'ஸ்பேருக்கு நின்ன அல்லது ஹோல்ட்ல இருக்கற ஜாப்ல <b>ஹவர்ஸ் இல்ல</b>',
      '<b>“Put on hold” / “Release hold”</b>: சர்வீஸ் ஹெட் அல்லது Liaison, காரணத்தோட',
    ],
  },
} as const

export type Lang = keyof typeof CAPTIONS
