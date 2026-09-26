/**
 * Module 09 captions, English and Tamil.
 *
 * Tamil follows TAMIL-STYLE.md: spoken Tamil, business words in Tamil script, on-screen labels in
 * English letters.
 */
export const CAPTIONS = {
  en: {
    kicker: 'Thulir training · Module 09 · Engineer · Service Head · Liaison',
    title: 'Closing a job',
    sub: 'The three ways a job closes. Under 2 minutes.',
    now: 'Now signed in as',
    three: 'A job closes in one of three ways.<small>Ready for Invoice, Non-Repairable or Customer Rejected.</small>',
    engCannot: 'Engineer: your board can’t be saved?<small>On your job card, press “Cannot repair…”.</small>',
    reason: 'Pick the reason from the list.<small>No free text. Nothing fits? Ask the Operations Manager to add one.</small>',
    noWayBack: 'There is no way back from this.<small>A new attempt is a new job, registered as a rework.</small>',
    closed: 'Closed as Non-Repairable.<small>Hours spent stay on record as wasted time. The board goes back on a challan.</small>',
    hold: '“Put on hold” is not closing.<small>It only pauses an In Progress job. Release it later.</small>',
    leadCannot: 'Service Head or Liaison: “It cannot be saved…”<small>Same reason list, same result: Non-Repairable.</small>',
    leadClosed: 'Closed. Nothing moves a closed job on.<small>Customer wants another try? Register a rework job at the counter.</small>',
    sendBack: 'Open job not right yet? Send it back.<small>Service Head or Liaison. Say why: the engineer starts from this note.</small>',
    backDone: 'Back on the bench, In Progress, with your note.',
    custList: 'Liaison: the customer has tested it.<small>Verification › With the customer.</small>',
    pass: 'Works? “It works — close it”.<small>Still faulty? It goes back to the bench, In Progress.</small>',
    passDone: 'Customer test passed: the job is closed.<small>Status: Closed › Ready for Invoice. It now waits to be billed.</small>',
    withdrewIntro: 'Customer doesn’t want the repair?<small>Reservoir › Before the bench › Under assessment.</small>',
    withdrew: '“Customer withdrew”, and say how you know.',
    rejectedDone: 'Closed as Customer Rejected.<small>It waits for a challan to go back.</small>',
    quoteRejected: 'A rejected quotation does the same.<small>“Record rejection” closes every job on it as Customer Rejected.</small>',
    remember: 'Remember',
    rules: [
      'Non-Repairable: <b>a reason from the list</b>, never free text',
      '<b>Put on hold</b> pauses; it never closes',
      'Customer test passed → <b>Ready for Invoice</b>. Withdrew or rejected → <b>Customer Rejected</b>',
      'Open job not right? <b>Send it back</b>. Closed? <b>New rework job</b>',
    ],
  },
  ta: {
    kicker: 'துளிர் ட்ரெயினிங் · மாட்யூல் 09 · Engineer · Service Head · Liaison',
    title: 'ஜாப்-ஐ க்ளோஸ் பண்றது',
    sub: 'ஒரு ஜாப் க்ளோஸ் ஆகும் மூணு வழிகள். 2 நிமிஷத்துக்குள்.',
    now: 'இப்போ லாகின் பண்ணியிருப்பவர்',
    three: 'ஒரு ஜாப் மூணுல ஒரு வழியில க்ளோஸ் ஆகும்.<small>Ready for Invoice, Non-Repairable, இல்லன்னா Customer Rejected.</small>',
    engCannot: 'இன்ஜினியர்: உங்க போர்டை சரி பண்ண முடியலையா?<small>உங்க ஜாப் கார்டுல “Cannot repair…” அழுத்துங்க.</small>',
    reason: 'லிஸ்ட்ல இருந்து காரணத்தை செலக்ட் பண்ணுங்க.<small>சொந்தமா எழுத இடம் இல்ல. எதுவும் பொருந்தலையா? Operations Manager-கிட்ட சேர்க்கச் சொல்லுங்க.</small>',
    noWayBack: 'இதை திரும்ப மாத்த முடியாது.<small>மறுபடி ட்ரை பண்ணணும்னா, ரீவொர்க்கா புது ஜாப் போடணும்.</small>',
    closed: 'Non-Repairable-ஆ க்ளோஸ் ஆச்சு.<small>செலவான ஹவர்ஸ் வேஸ்ட் டைமா ரெக்கார்டுல இருக்கும். போர்டு சலான்ல திரும்பப் போகும்.</small>',
    hold: '“Put on hold” க்ளோஸ் பண்றது இல்ல.<small>In Progress ஜாப்-ஐ கொஞ்ச நேரம் நிறுத்தி வைக்கும். அப்புறம் ரிலீஸ் பண்ணலாம்.</small>',
    leadCannot: 'சர்வீஸ் ஹெட் அல்லது Liaison: “It cannot be saved…”<small>அதே காரண லிஸ்ட், அதே ரிசல்ட்: Non-Repairable.</small>',
    leadClosed: 'க்ளோஸ் ஆச்சு. க்ளோஸ் ஆன ஜாப் இனி நகராது.<small>கஸ்டமர் மறுபடி ட்ரை பண்ணச் சொன்னா? கவுண்டர்ல ரீவொர்க் ஜாப் போடுங்க.</small>',
    sendBack: 'திறந்த ஜாப் இன்னும் சரியில்லையா? திருப்பி அனுப்புங்க.<small>சர்வீஸ் ஹெட் அல்லது Liaison. ஏன்னு எழுதுங்க: இன்ஜினியர் இந்த நோட்ல இருந்து ஆரம்பிப்பார்.</small>',
    backDone: 'உங்க நோட்டோட பெஞ்சுக்குத் திரும்பிடுச்சு, In Progress.',
    custList: 'Liaison: கஸ்டமர் டெஸ்ட் பண்ணிட்டாங்க.<small>Verification › With the customer.</small>',
    pass: 'வேலை செய்யுதா? “It works — close it”.<small>இன்னும் பிரச்சனையா? போர்டு பெஞ்சுக்குத் திரும்பும், In Progress.</small>',
    passDone: 'கஸ்டமர் டெஸ்ட் பாஸ்: ஜாப் க்ளோஸ் ஆச்சு.<small>ஸ்டேட்டஸ்: Closed › Ready for Invoice. இனி பில்லிங்குக்கு வெயிட் பண்ணும்.</small>',
    withdrewIntro: 'கஸ்டமருக்கு ரிப்பேர் வேண்டாமா?<small>Reservoir › Before the bench › Under assessment.</small>',
    withdrew: '“Customer withdrew” அழுத்தி, எப்படித் தெரியும்னு எழுதுங்க.',
    rejectedDone: 'Customer Rejected-ஆ க்ளோஸ் ஆச்சு.<small>திரும்ப அனுப்ப சலானுக்கு வெயிட் பண்ணும்.</small>',
    quoteRejected: 'கொட்டேஷன் ரிஜெக்ட் ஆனாலும் இதே தான்.<small>“Record rejection” அதுல இருக்கிற எல்லா ஜாப்பையும் Customer Rejected-ஆ க்ளோஸ் பண்ணும்.</small>',
    remember: 'ஞாபகம் வெச்சுக்குங்க',
    rules: [
      'Non-Repairable: <b>லிஸ்ட்ல இருக்கிற காரணம்</b>, சொந்தமா எழுதக் கூடாது',
      '<b>Put on hold</b> நிறுத்தி வைக்கும்; க்ளோஸ் பண்ணாது',
      'கஸ்டமர் டெஸ்ட் பாஸ் → <b>Ready for Invoice</b>. வேண்டாம்னா / ரிஜெக்ட் → <b>Customer Rejected</b>',
      'திறந்த ஜாப் சரியில்லையா? <b>திருப்பி அனுப்புங்க</b>. க்ளோஸ் ஆனதா? <b>புது ரீவொர்க் ஜாப்</b>',
    ],
  },
} as const

export type Lang = keyof typeof CAPTIONS
