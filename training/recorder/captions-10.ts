/**
 * Module 10 captions, English and Tamil.
 *
 * Tamil follows TAMIL-STYLE.md: spoken Tamil, business words in Tamil script, on-screen labels in
 * English letters.
 */
export const CAPTIONS = {
  en: {
    kicker: 'Thulir training · Module 10 · Front Office · Liaison',
    title: 'Dispatch: the delivery challan',
    sub: 'Everything that leaves the building. Under 2 minutes.',
    list: 'Everything that may leave is listed here.<small>Front office › Challans. Front Office issues; the Liaison can too.</small>',
    tick: 'Tick the boards leaving for one customer.',
    mixed: 'One reason per challan.<small>Repaired and non-repairable boards go on separate challans.</small>',
    leavesAs: '“Leaves as” comes from the job’s state.<small>Nobody picks the reason.</small>',
    accessories: 'Tick every accessory going back.<small>Kept or used up? Press “They stay with us”.</small>',
    number: 'The number is given when you issue.<small>Once issued, a challan can’t be edited. A fix is a new challan.</small>',
    issued: 'Issued. Repaired boards: the shelf is released.',
    print: 'Print it; it goes with the boards.<small>Every copy says “Not a tax invoice”. A challan is a gate pass; billing is separate.</small>',
    testing: 'Going out for customer testing?<small>“Site testing — expected back” is a returnable challan.</small>',
    expected: 'Set “Expected back”. The shelf stays held.',
    stillOut: 'Still out until you record the return.<small>When it comes back, press “Record the return”.</small>',
    accLink: 'Only an accessory leaving? The board stays?<small>“Send an accessory on its own”.</small>',
    accBoard: 'Choose the board it belongs to.<small>Only this customer’s boards still on a shelf are listed.</small>',
    accWhat: '“What is leaving” comes from the inward record.<small>Change it if something else goes.</small>',
    accStays: 'Reason: Accessory only.<small>The board keeps its shelf and its state.</small>',
    accIssued: 'Issued: a challan line with no job.',
    remember: 'Remember',
    rules: [
      '<b>Nothing leaves</b> without a challan. It is a <b>gate pass</b>, not an invoice',
      '<b>One customer, one reason</b> per challan',
      'Tick the <b>accessories</b> going back. Site testing: <b>Expected back</b>',
      'Accessory alone? <b>Send an accessory on its own</b>',
    ],
  },
  ta: {
    kicker: 'துளிர் ட்ரெயினிங் · மாட்யூல் 10 · Front Office · Liaison',
    title: 'டிஸ்பாட்ச்: டெலிவரி சலான்',
    sub: 'வெளியே போகிற எல்லாமே. 2 நிமிஷத்துக்குள்.',
    list: 'வெளியே போகலாம்னு இருக்கிற எல்லாம் இங்கே இருக்கு.<small>Front office › Challans. Front Office இஷ்யூ பண்ணும்; Liaison-ம் பண்ணலாம்.</small>',
    tick: 'ஒரு கஸ்டமருக்குப் போகிற போர்டுகளை டிக் பண்ணுங்க.',
    mixed: 'ஒரு சலானுக்கு ஒரே காரணம்.<small>ரிப்பேர் ஆனதும் Non-repairable-ம் தனித்தனி சலான்ல.</small>',
    leavesAs: '“Leaves as” ஜாப் ஸ்டேட்டஸ்ல இருந்து வருது.<small>காரணத்தை யாரும் செலக்ட் பண்றதில்ல.</small>',
    accessories: 'திரும்பப் போகிற ஒவ்வொரு அக்சஸரியையும் டிக் பண்ணுங்க.<small>நம்மகிட்டயே இருக்கா, யூஸ் ஆயிடுச்சா? “They stay with us”.</small>',
    number: 'இஷ்யூ பண்ணும்போது தான் நம்பர் வரும்.<small>இஷ்யூ ஆன சலானை மாத்த முடியாது. திருத்தம்னா புது சலான்.</small>',
    issued: 'இஷ்யூ ஆச்சு. ரிப்பேர் ஆன போர்டுகளோட பின் ஃப்ரீ ஆகும்.',
    print: 'ப்ரிண்ட் எடுங்க; அது போர்டுகளோட போகும்.<small>ஒவ்வொரு காப்பியிலும் “Not a tax invoice”. சலான் கேட் பாஸ் தான்; பில்லிங் தனி.</small>',
    testing: 'கஸ்டமர் டெஸ்டிங்குக்குப் போகுதா?<small>“Site testing — expected back” திரும்ப வர்ற சலான்.</small>',
    expected: '“Expected back” தேதி போடுங்க. பின் ஃப்ரீ ஆகாது.',
    stillOut: 'ரிட்டர்ன் பதியும் வரை வெளியே தான்னு காட்டும்.<small>திரும்ப வந்ததும் “Record the return” அழுத்துங்க.</small>',
    accLink: 'அக்சஸரி மட்டும் போகுதா? போர்டு இங்கேயே இருக்கா?<small>“Send an accessory on its own”.</small>',
    accBoard: 'அது எந்த போர்டோடதுன்னு செலக்ட் பண்ணுங்க.<small>இந்த கஸ்டமரோட, இன்னும் பின்ல இருக்கிற போர்டுகள் மட்டும் வரும்.</small>',
    accWhat: '“What is leaving” இன்வர்டு ரெக்கார்டுல இருந்து வருது.<small>வேற ஏதாவது போனா மாத்துங்க.</small>',
    accStays: 'காரணம்: Accessory only.<small>போர்டு அதே பின்ல, அதே ஸ்டேட்டஸ்ல இருக்கும்.</small>',
    accIssued: 'இஷ்யூ ஆச்சு: ஜாப் இல்லாத ஒரு சலான் லைன்.',
    remember: 'ஞாபகம் வெச்சுக்குங்க',
    rules: [
      'சலான் இல்லாம <b>எதுவும் வெளியே போகாது</b>. அது <b>கேட் பாஸ்</b>, இன்வாய்ஸ் இல்ல',
      'ஒரு சலானுக்கு <b>ஒரு கஸ்டமர், ஒரு காரணம்</b>',
      'திரும்பப் போகிற <b>அக்சஸரீஸை</b> டிக் பண்ணுங்க. Site testing: <b>Expected back</b>',
      'அக்சஸரி மட்டுமா? <b>Send an accessory on its own</b>',
    ],
  },
} as const

export type Lang = keyof typeof CAPTIONS
