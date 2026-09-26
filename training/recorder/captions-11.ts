/**
 * Module 11 captions, English and Tamil.
 *
 * Tamil follows TAMIL-STYLE.md: spoken Tamil, business words in Tamil script, on-screen labels in
 * English letters.
 */
export const CAPTIONS = {
  en: {
    kicker: 'Thulir training · Module 11 · Liaison · Operations Manager',
    title: 'Invoice batches and Zoho',
    sub: 'Billing finished jobs. About 80 seconds.',
    worklist: 'Closed, priced jobs wait here to be billed.<small>Front office › Invoicing. Liaison and Operations Manager only.</small>',
    zohoOff: 'Zoho Books is not connected on this system yet.<small>You can still build a batch. Only sending needs Zoho.</small>',
    oneCustomer: 'One batch = one customer.<small>Tick two customers and the batch is refused.</small>',
    pick: 'Tick the jobs that go on one invoice.<small>Nothing is batched for you. You choose.</small>',
    nonRep: 'Non-Repairable with an agreed charge can be billed too.',
    prepare: 'Check the customer and total, then prepare.',
    number: 'The batch gets its number: IB/YY-MM/XXXXXX.<small>It stays Draft until it is sent.</small>',
    lines: 'The customer sees one line per job.<small>No parts breakdown, no separate premium.</small>',
    lineText: 'Read each line: this is what the customer reads.<small>Fix the words and press Save. The amount comes from the job.</small>',
    remove: 'Not billing a job now? Remove its line.<small>It goes back to the worklist for a later batch.</small>',
    removed: 'Back on the worklist. A job can sit on one batch only.',
    blocked: 'Send is blocked here: no Zoho organisation is set.<small>The reason is shown on the batch. Ask the Operations Manager.</small>',
    onSend: 'Once connected, Send makes one draft sales order in Zoho.<small>Nothing is emailed to the customer. The batch number is its reference.</small>',
    frozen: 'A sent batch is frozen.<small>No edits, no removals. Its jobs can never be billed again.</small>',
    remember: 'Remember',
    rules: [
      '<b>One customer</b> per batch',
      'A job goes on <b>one batch, ever</b>',
      '<b>Read every line</b> before Send. Sent = frozen',
      'Wrong job on a draft? <b>Remove its line</b>',
    ],
  },
  ta: {
    kicker: 'துளிர் ட்ரெயினிங் · மாட்யூல் 11 · Liaison · Operations Manager',
    title: 'இன்வாய்ஸ் பேட்ச்சும் Zoho-வும்',
    sub: 'முடிஞ்ச ஜாப்புக்கு பில்லிங். சுமார் 80 செகண்ட்.',
    worklist: 'க்ளோஸ் ஆன, ப்ரைஸ் போட்ட ஜாப்ஸ் பில்லிங்குக்கு இங்கே வெயிட் பண்ணும்.<small>Front office › Invoicing. Liaison, Operations Manager மட்டும்.</small>',
    zohoOff: 'இந்த சிஸ்டத்துல Zoho Books இன்னும் கனெக்ட் ஆகல.<small>பேட்ச் போடலாம். அனுப்ப மட்டும் தான் Zoho வேணும்.</small>',
    oneCustomer: 'ஒரு பேட்ச் = ஒரு கஸ்டமர்.<small>ரெண்டு கஸ்டமரை டிக் பண்ணா பேட்ச் ஏத்துக்காது.</small>',
    pick: 'ஒரே இன்வாய்ஸ்ல போற ஜாப்ஸை டிக் பண்ணுங்க.<small>சிஸ்டம் தானா சேர்க்காது. நீங்களே செலக்ட் பண்ணுங்க.</small>',
    nonRep: 'அக்ரீ பண்ண சார்ஜ் இருக்கிற Non-Repairable-க்கும் பில் போடலாம்.',
    prepare: 'கஸ்டமர் பேரையும் டோட்டலையும் செக் பண்ணிட்டு prepare பண்ணுங்க.',
    number: 'பேட்ச்சுக்கு நம்பர் வரும்: IB/YY-MM/XXXXXX.<small>அனுப்புற வரை Draft-ஆ இருக்கும்.</small>',
    lines: 'கஸ்டமருக்கு ஒரு ஜாப்புக்கு ஒரு லைன் தான்.<small>பார்ட்ஸ் பிரிச்சு காட்டாது, தனி ப்ரீமியம் இல்ல.</small>',
    lineText: 'ஒவ்வொரு லைனையும் படிங்க: கஸ்டமர் படிக்கிறது இது தான்.<small>வார்த்தையை திருத்தி Save அழுத்துங்க. அமௌண்ட் ஜாப்ல இருந்து வருது.</small>',
    remove: 'இந்த ஜாப்புக்கு இப்போ பில் வேண்டாமா? அதோட லைனை Remove பண்ணுங்க.<small>அடுத்த பேட்ச்சுக்காக worklist-க்குத் திரும்பும்.</small>',
    removed: 'Worklist-க்குத் திரும்பிடுச்சு. ஒரு ஜாப் ஒரு பேட்ச்ல மட்டும் தான் இருக்கும்.',
    blocked: 'இங்கே Send ப்ளாக் ஆகியிருக்கு: Zoho organisation செட் பண்ணல.<small>காரணம் பேட்ச்லயே தெரியும். Operations Manager-கிட்ட கேளுங்க.</small>',
    onSend: 'கனெக்ட் ஆனதும், Send அழுத்தினா Zoho-ல ஒரு draft sales order வரும்.<small>கஸ்டமருக்கு email போகாது. பேட்ச் நம்பர் தான் அதோட reference.</small>',
    frozen: 'அனுப்பின பேட்ச் ஃப்ரீஸ் ஆயிடும்.<small>எடிட்டும் இல்ல, ரிமூவும் இல்ல. அதோட ஜாப்ஸுக்கு மறுபடி பில் போட முடியாது.</small>',
    remember: 'ஞாபகம் வெச்சுக்குங்க',
    rules: [
      'ஒரு பேட்ச்சுக்கு <b>ஒரு கஸ்டமர்</b>',
      'ஒரு ஜாப் <b>ஒரே ஒரு பேட்ச்ல மட்டும்</b>',
      'Send-க்கு முன்னாடி <b>ஒவ்வொரு லைனையும் படிங்க</b>. அனுப்பினா ஃப்ரீஸ்',
      'Draft-ல தப்பான ஜாப்? <b>அதோட லைனை Remove பண்ணுங்க</b>',
    ],
  },
} as const

export type Lang = keyof typeof CAPTIONS
