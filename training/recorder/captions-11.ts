/**
 * Module 11 captions, English and Tamil.
 *
 * Tamil keeps the app's own words in English (button names, field labels, statuses), because
 * that is what staff will see on screen.
 */
export const CAPTIONS = {
  en: {
    kicker: 'Thulir training · Module 11 · Liaison · Operations Manager',
    title: 'Invoice batches and Zoho',
    sub: 'Billing finished jobs. About 75 seconds.',
    worklist: 'Closed, priced jobs wait here to be billed.<small>Front office › Invoicing. Liaison and Operations Manager only.</small>',
    zohoOff: 'Zoho Books is not connected on this system yet.<small>You can still build a batch. Only sending needs Zoho.</small>',
    oneCustomer: 'One batch = one customer.<small>Tick two customers and the batch is refused.</small>',
    pick: 'Tick the jobs that go on one invoice.<small>Nothing is batched for you. You choose.</small>',
    nonRep: 'Non-Repairable with an agreed charge can be billed too.',
    prepare: 'Check the customer and total, then prepare.',
    number: 'The batch gets its number: IB/YY-MM/XXXXXX.<small>It stays Draft until it is sent.</small>',
    lines: 'The customer sees one line per job.<small>No parts breakdown, no separate premium. The amount comes from the job.</small>',
    remove: 'Not billing a job now? Remove its line.<small>It goes back to the worklist for a later batch.</small>',
    removed: 'Back on the worklist. A job can sit on one batch only.',
    blocked: 'Send is blocked here: no Zoho organisation is set.<small>The reason is shown on the batch. Ask the Operations Manager.</small>',
    onSend: 'Once connected, Send makes one draft sales order in Zoho.<small>Nothing is emailed to the customer. The batch number is its reference.</small>',
    frozen: 'A sent batch is frozen.<small>No edits, no removals. Its jobs can never be billed again.</small>',
    remember: 'Remember',
    rules: [
      '<b>One customer</b> per batch',
      'A job goes on <b>one batch, ever</b>',
      '<b>Check the lines</b> before Send. Sent = frozen',
      'Wrong job on a draft? <b>Remove its line</b>',
    ],
  },
  ta: {
    kicker: 'துளிர் பயிற்சி · பாடம் 11 · Liaison · Operations Manager',
    title: 'Invoice batch-களும் Zoho-வும்',
    sub: 'முடிந்த job-களுக்குப் பில் போடுதல். சுமார் 80 வினாடிகள்.',
    worklist: 'மூடப்பட்ட, விலை உள்ள job-கள் பில்லுக்காக இங்கே காத்திருக்கும்.<small>Front office › Invoicing. Liaison, Operations Manager மட்டும்.</small>',
    zohoOff: 'இந்த சிஸ்டத்தில் Zoho Books இன்னும் இணைக்கப்படவில்லை.<small>Batch உருவாக்கலாம். அனுப்புவதற்கு மட்டுமே Zoho தேவை.</small>',
    oneCustomer: 'ஒரு batch = ஒரு வாடிக்கையாளர்.<small>இரண்டு வாடிக்கையாளரை டிக் செய்தால் batch மறுக்கப்படும்.</small>',
    pick: 'ஒரே invoice-இல் போகும் job-களை டிக் செய்யவும்.<small>சிஸ்டம் தானாகச் சேர்க்காது. நீங்களே தேர்வு செய்யவும்.</small>',
    nonRep: 'ஒப்புக்கொண்ட கட்டணம் உள்ள Non-Repairable-க்கும் பில் போடலாம்.',
    prepare: 'வாடிக்கையாளர் பெயரையும் மொத்தத்தையும் சரிபார்த்து, prepare செய்யவும்.',
    number: 'Batch-க்கு எண் கிடைக்கும்: IB/YY-MM/XXXXXX.<small>அனுப்பும் வரை Draft நிலையில் இருக்கும்.</small>',
    lines: 'வாடிக்கையாளருக்கு ஒரு job-க்கு ஒரு வரி மட்டும்.<small>உதிரிப் பாகப் பிரிவு இல்லை, தனி premium இல்லை. தொகை job-இலிருந்து வரும்.</small>',
    remove: 'இப்போது பில் போட வேண்டாமா? அதன் வரியை Remove செய்யவும்.<small>பின்னர் வேறு batch-க்காக worklist-க்குத் திரும்பும்.</small>',
    removed: 'Worklist-க்குத் திரும்பியது. ஒரு job ஒரு batch-இல் மட்டுமே இருக்கும்.',
    blocked: 'இங்கே Send தடுக்கப்பட்டுள்ளது: Zoho organisation அமைக்கப்படவில்லை.<small>காரணம் batch-இலேயே தெரியும். Operations Manager-இடம் கேட்கவும்.</small>',
    onSend: 'இணைத்த பிறகு, Send அழுத்தினால் Zoho-வில் ஒரு draft sales order உருவாகும்.<small>வாடிக்கையாளருக்கு email போகாது. Batch எண்ணே அதன் reference.</small>',
    frozen: 'அனுப்பிய batch உறைந்துவிடும்.<small>திருத்தமும் நீக்கமும் இல்லை. அதன் job-களுக்கு மீண்டும் பில் போட முடியாது.</small>',
    remember: 'நினைவில் கொள்ளுங்கள்',
    rules: [
      'ஒரு batch-க்கு <b>ஒரு வாடிக்கையாளர்</b>',
      'ஒரு job <b>ஒரே ஒரு batch-இல் மட்டும்</b>',
      'Send-க்கு முன் <b>வரிகளைச் சரிபார்க்கவும்</b>. அனுப்பியது = உறைந்தது',
      'Draft-இல் தவறான job? <b>அதன் வரியை Remove செய்யவும்</b>',
    ],
  },
} as const

export type Lang = keyof typeof CAPTIONS
