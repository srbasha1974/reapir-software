/**
 * Module 00 captions, English and Tamil.
 *
 * Tamil follows TAMIL-STYLE.md: spoken shop-floor Tamil, business words in Tamil script, on-screen
 * labels (stages, sub-statuses, buttons) in English letters.
 */
export const CAPTIONS = {
  en: {
    kicker: 'Thulir training · Module 00 · Everyone',
    title: 'How a board moves through the shop',
    sub: 'Four stages, fourteen sub-statuses, and whose turn it is. About 70 seconds.',
    map: 'Every board moves through 4 stages, left to right.<small>Each stage has its own sub-statuses.</small>',
    pre: 'Pre-Repair: booked in, assessed, quoted.<small>Front Office books it in. Liaison or Service Head assess and quote.</small>',
    inRepair: 'In-Repair: allotted, then repaired.<small>Service Head or Liaison allots. The engineer does the repair.</small>',
    paused: 'Pending Spare and On Hold mean “paused”.<small>No hours can be logged on a job while it waits here.</small>',
    hold: 'On Hold is the Service Head’s or Liaison’s call.<small>Put on hold from In Progress, with a reason. Release hold ends it.</small>',
    completed: 'Repair Completed: another engineer verifies it,<small>then the Liaison tests it with the customer.</small>',
    closed: 'Closed: Ready for Invoice, Non-Repairable or Customer Rejected.<small>Ready for Invoice goes on an invoice batch.</small>',
    status: 'On a job, the sub-status says whose turn it is.<small>Read it before you act.</small>',
    log: 'Every move is logged: when, and by whom.',
    sendBack: 'A lead can send an open job back to the engineer.<small>Service Head or Liaison, with a reason.</small>',
    noReopen: 'A closed job is never reopened.<small>A board that comes back is a new Rework job.</small>',
    queue: 'Leads watch the whole queue here.',
    days: 'Days count from entering the current sub-status.<small>Not from the day the board arrived.</small>',
    stuck: 'Sitting too long in one state? It shows as Stuck.<small>The limit is set in configuration.</small>',
    remember: 'Remember',
    rules: [
      '<b>4 stages</b>: Pre-Repair → In-Repair → Repair Completed → Closed',
      'Read the <b>sub-status</b>: it tells you whose turn it is',
      '<b>Pending Spare / On Hold</b>: paused, no hours',
      'Time in each sub-status is <b>measured</b>. Closed jobs are not reopened',
    ],
  },
  ta: {
    kicker: 'துளிர் ட்ரெயினிங் · மாட்யூல் 00 · எல்லாருக்கும்',
    title: 'ஒரு போர்டு ஷாப்புக்குள்ள எப்படி நகருது',
    sub: '4 ஸ்டேஜ், 14 sub-status, யாரோட டர்ன். சுமார் 90 செகண்ட்.',
    map: 'ஒவ்வொரு போர்டும் இடமிருந்து வலமா 4 ஸ்டேஜ் போகும்.<small>ஒவ்வொரு ஸ்டேஜுக்கும் தனி sub-status இருக்கு.</small>',
    pre: 'Pre-Repair: Inward, அசெஸ்மென்ட், கொட்டேஷன்.<small>Front Office Inward பண்ணுவாங்க. Liaison அல்லது Service Head அசெஸ் பண்ணி கொட்டேஷன் தருவாங்க.</small>',
    inRepair: 'In-Repair: அலாட், அப்புறம் ரிப்பேர்.<small>Service Head அல்லது Liaison அலாட் பண்ணுவாங்க. இன்ஜினியர் ரிப்பேர் பண்ணுவாங்க.</small>',
    paused: 'Pending Spare, On Hold-னா வேலை நிறுத்தி வெச்சிருக்கு.<small>இங்க இருக்கற ஜாப்ல ஹவர்ஸ் போட முடியாது.</small>',
    hold: 'On Hold போடுறது Service Head அல்லது Liaison மட்டும்.<small>In Progress-ல இருந்து “Put on hold”, காரணத்தோட. “Release hold” போட்டா முடியும்.</small>',
    completed: 'Repair Completed: வேற ஒரு இன்ஜினியர் வெரிஃபை பண்ணுவாங்க,<small>அப்புறம் Liaison கஸ்டமரோட டெஸ்ட் பண்ணுவாங்க.</small>',
    closed: 'Closed: Ready for Invoice, Non-Repairable, அல்லது Customer Rejected.<small>Ready for Invoice ஆனது இன்வாய்ஸ் பேட்ச்ல சேரும்.</small>',
    status: 'ஜாப்ல, sub-status தான் யாரோட டர்ன்னு சொல்லும்.<small>எதுவும் பண்றதுக்கு முன்னாடி அதைப் பாருங்க.</small>',
    log: 'ஒவ்வொரு மூவும் பதிவாகும்: எப்போ, யாரு.',
    sendBack: 'ஓப்பன் ஜாபை லீட் திரும்ப இன்ஜினியருக்கு அனுப்பலாம்.<small>Service Head அல்லது Liaison, காரணத்தோட.</small>',
    noReopen: 'Closed ஜாபை திரும்ப ஓப்பன் பண்ண முடியாது.<small>திரும்ப வர்ற போர்டு = புது Rework ஜாப்.</small>',
    queue: 'லீட்ஸ் முழு க்யூவையும் இங்க பாப்பாங்க.',
    days: 'Days = இப்போ இருக்கற sub-status-க்கு வந்ததுல இருந்து.<small>போர்டு வந்த நாள்ல இருந்து இல்ல.</small>',
    stuck: 'ஒரே ஸ்டேட்டஸ்ல ரொம்ப நாள்? Stuck-ன்னு காட்டும்.<small>லிமிட் configuration-ல செட் பண்ணியிருக்கு.</small>',
    remember: 'ஞாபகம் வெச்சுக்கோங்க',
    rules: [
      '<b>4 ஸ்டேஜ்</b>: Pre-Repair → In-Repair → Repair Completed → Closed',
      '<b>Sub-status</b> பாருங்க: யாரோட டர்ன்னு அது சொல்லும்',
      '<b>Pending Spare / On Hold</b>: வேலை நிக்குது, ஹவர்ஸ் போட முடியாது',
      'ஒவ்வொரு sub-status-லயும் டைம் <b>கணக்காகும்</b>. Closed ஜாப் திரும்ப ஓப்பன் ஆகாது',
    ],
  },
} as const

export type Lang = keyof typeof CAPTIONS
