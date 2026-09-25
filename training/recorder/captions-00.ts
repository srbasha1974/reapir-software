/**
 * Module 00 captions, English and Tamil.
 *
 * Tamil keeps the app's own words in English (stage and sub-status names, button names), because
 * that is what staff will see on screen.
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
    kicker: 'துளிர் பயிற்சி · பாடம் 00 · அனைவருக்கும்',
    title: 'ஒரு போர்டு கடைக்குள் எப்படி நகர்கிறது',
    sub: 'நான்கு நிலைகள், பதினான்கு sub-status-கள், யாருடைய முறை என்பது. சுமார் 70 வினாடிகள்.',
    map: 'ஒவ்வொரு போர்டும் இடமிருந்து வலமாக 4 நிலைகளைக் கடக்கிறது.<small>ஒவ்வொரு நிலைக்கும் தனி sub-status-கள் உண்டு.</small>',
    pre: 'Pre-Repair: பதிவு, assessment, quotation.<small>Front Office பதிவு செய்யும். Liaison அல்லது Service Head assess செய்து quote தருவார்கள்.</small>',
    inRepair: 'In-Repair: allot செய்து, பின் பழுதுபார்ப்பு.<small>Service Head அல்லது Liaison allot செய்வார். Engineer பழுதுபார்ப்பார்.</small>',
    paused: 'Pending Spare, On Hold என்றால் “நிறுத்தப்பட்டது”.<small>இங்கே காத்திருக்கும் job-இல் நேரம் பதிவு செய்ய முடியாது.</small>',
    completed: 'Repair Completed: வேறொரு engineer சரிபார்ப்பார்,<small>பின் Liaison வாடிக்கையாளருடன் சோதிப்பார்.</small>',
    closed: 'Closed: Ready for Invoice, Non-Repairable அல்லது Customer Rejected.<small>Ready for Invoice ஆனவை invoice batch-இல் சேரும்.</small>',
    status: 'ஒரு job-இல், sub-status யாருடைய முறை என்று சொல்லும்.<small>செயல்படும் முன் அதைப் படிக்கவும்.</small>',
    log: 'ஒவ்வொரு நகர்வும் பதிவாகிறது: எப்போது, யாரால்.',
    sendBack: 'திறந்த job-ஐ ஒரு lead மீண்டும் engineer-இடம் அனுப்பலாம்.<small>Service Head அல்லது Liaison, காரணத்துடன்.</small>',
    noReopen: 'மூடப்பட்ட job மீண்டும் திறக்கப்படாது.<small>திரும்பி வரும் போர்டு ஒரு புதிய Rework job.</small>',
    queue: 'Lead-கள் முழு வரிசையையும் இங்கே பார்க்கிறார்கள்.',
    days: 'நாட்கள், இப்போதைய sub-status-க்கு வந்ததிலிருந்து கணக்கிடப்படும்.<small>போர்டு வந்த நாளிலிருந்து அல்ல.</small>',
    stuck: 'ஒரே நிலையில் அதிக நாள்? அது Stuck ஆகக் காட்டப்படும்.<small>வரம்பு configuration-இல் அமைக்கப்படுகிறது.</small>',
    remember: 'நினைவில் கொள்ளுங்கள்',
    rules: [
      '<b>4 நிலைகள்</b>: Pre-Repair → In-Repair → Repair Completed → Closed',
      '<b>Sub-status</b>-ஐப் படிக்கவும்: யாருடைய முறை என்று அது சொல்லும்',
      '<b>Pending Spare / On Hold</b>: நிறுத்தம், நேரம் பதிவு இல்லை',
      'ஒவ்வொரு sub-status-இலும் நேரம் <b>அளக்கப்படுகிறது</b>. மூடிய job மீண்டும் திறக்கப்படாது',
    ],
  },
} as const

export type Lang = keyof typeof CAPTIONS
