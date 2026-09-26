/**
 * Module 01 captions, English and Tamil.
 *
 * Tamil follows TAMIL-STYLE.md: spoken shop-floor Tamil, business words in Tamil script, on-screen
 * labels (buttons, fields, statuses) in English letters.
 */
export const CAPTIONS = {
  en: {
    kicker: 'Thulir training · Module 01 · Sales Engineer · Sales Head',
    title: 'Customers, contacts and follow-ups',
    sub: 'A new prospect, its people, the timeline and the lifecycle. About 2 minutes.',
    name: 'New prospect? Only the company name is required.<small>A name already on file is found, however it is typed.</small>',
    system: 'Code, lifecycle and owner are set by the system.<small>You never type a customer code.</small>',
    registered: 'Registered as Potential, with its own TTS code.<small>The code and the clock-in date never change.</small>',
    people: 'Now add the people you deal with.',
    reach: 'Every contact needs an email or a mobile.<small>Tick Primary for the person you reach first.</small>',
    replaces: 'One primary per company.<small>Ticking Primary on a new person replaces the old one. The hint names who.</small>',
    primary: 'Arun is primary now; Priya is not.<small>Later, Make primary on the list does the same.</small>',
    log: 'Log every call, visit or message on the Timeline.',
    late: 'Logging it a day late? Set When.<small>Earlier dates are marked “Backdated”. Future dates are refused.</small>',
    immutable: 'Entries can’t be edited or deleted.<small>A correction is a new entry.</small>',
    typo: 'On the person: typo in a name or title? Fix it here.<small>Save corrections. Every change is recorded.</small>',
    moved: 'Changed company? Don’t rename the contact.<small>Record employment change instead.</small>',
    movedDone: 'Move recorded.<small>What was said before stays with the old company.</small>',
    trialOwner: 'Now the Sales Head: only they convert Trial to Regular.<small>The account became Trial by itself when its first job was booked in.</small>',
    refused: 'Refused: no job has reached Ready for Invoice yet.<small>Convert after a trial job is finished, not before.</small>',
    oneWay: 'Lifecycle moves forward.<small>Only the Operations Manager can move it back, with a reason.</small>',
    remember: 'Remember',
    rules: [
      'Company name only. <b>The system gives the code</b>',
      'Every contact: <b>email or mobile</b>. One <b>primary</b>',
      '<b>Log on the day.</b> Entries are never edited',
      'Changed company → <b>record the move</b>, don’t rename',
    ],
  },
  ta: {
    kicker: 'துளிர் ட்ரெயினிங் · மாட்யூல் 01 · Sales Engineer · Sales Head',
    title: 'கஸ்டமர், காண்டாக்ட், ஃபாலோ-அப்',
    sub: 'புது ப்ராஸ்பெக்ட், அவங்க ஆட்கள், Timeline, Lifecycle. சுமார் 2½ நிமிடம்.',
    name: 'புது ப்ராஸ்பெக்ட்டா? Company name மட்டும் போதும்.<small>ஏற்கனவே இருக்கற பேரை எப்படி டைப் பண்ணாலும் சிஸ்டம் கண்டுபிடிக்கும்.</small>',
    system: 'கோடு, லைஃப்சைக்கிள், ஓனர் எல்லாம் சிஸ்டமே போடும்.<small>கஸ்டமர் கோடு நீங்க டைப் பண்ண வேண்டாம்.</small>',
    registered: 'Potential-ஆ சேர்ந்தாச்சு, தனி TTS கோடோட.<small>கோடும் clock-in தேதியும் எப்பவும் மாறாது.</small>',
    people: 'இப்போ நீங்க பேசுற ஆட்களைச் சேருங்க.',
    reach: 'ஒவ்வொரு காண்டாக்ட்டுக்கும் email அல்லது mobile வேணும்.<small>முதல்ல யாரைக் கூப்பிடுவீங்களோ, அவங்களுக்கு “Primary” டிக் பண்ணுங்க.</small>',
    replaces: 'ஒரு கம்பெனிக்கு ஒரே primary தான்.<small>புது ஆளுக்கு “Primary” டிக் பண்ணா, பழையவர் மாறிடுவாங்க. யாருன்னு கீழே எழுதியிருக்கும்.</small>',
    primary: 'இப்போ Arun தான் primary, Priya இல்ல.<small>அப்புறம் லிஸ்ட்ல “Make primary” அழுத்தினாலும் இதே மாதிரி தான்.</small>',
    log: 'ஒவ்வொரு கால், விசிட், மெசேஜையும் Timeline-ல போடுங்க.',
    late: 'ஒரு நாள் லேட்டா போடுறீங்களா? “When” செட் பண்ணுங்க.<small>பழைய தேதி “Backdated”-ன்னு காட்டும். ஃபியூச்சர் தேதி ஏத்துக்காது.</small>',
    immutable: 'போட்ட என்ட்ரியை எடிட் பண்ணவோ டெலீட் பண்ணவோ முடியாது.<small>திருத்தம்னா புது என்ட்ரி போடுங்க.</small>',
    typo: 'அந்த ஆளோட பக்கம்: பேர்லயோ டைட்டில்லயோ தப்பா? இங்க சரி பண்ணுங்க.<small>“Save corrections”. ஒவ்வொரு மாற்றமும் பதிவாகும்.</small>',
    moved: 'வேற கம்பெனிக்கு மாறிட்டாங்களா? காண்டாக்ட்டை மாத்தி எழுதாதீங்க.<small>“Record employment change” பயன்படுத்துங்க.</small>',
    movedDone: 'மூவ் பதிவாச்சு.<small>முன்னாடி பேசினது எல்லாம் பழைய கம்பெனியோடவே இருக்கும்.</small>',
    trialOwner: 'இப்போ Sales Head. Trial-ஐ Regular ஆக்குறது அவங்க மட்டும் தான்.<small>முதல் ஜாப் Inward ஆனதும் தானா Trial ஆயிடுச்சு.</small>',
    refused: 'முடியாது: இன்னும் எந்த ஜாபும் Ready for Invoice வரல.<small>Trial ஜாப் முடிஞ்சதுக்கு அப்புறம் தான் Convert பண்ணணும்.</small>',
    oneWay: 'Lifecycle முன்னாடி மட்டும் போகும்.<small>பின்னாடி நகர்த்த Operations Manager-ஆல மட்டும் முடியும், காரணத்தோட.</small>',
    remember: 'ஞாபகம் வெச்சுக்கோங்க',
    rules: [
      'Company name மட்டும். <b>கோடு சிஸ்டம் தரும்</b>',
      'ஒவ்வொரு காண்டாக்ட்டுக்கும் <b>email அல்லது mobile</b>. ஒரே <b>primary</b>',
      '<b>அன்னைக்கே பதிவு பண்ணுங்க.</b> என்ட்ரியை எடிட் பண்ண முடியாது',
      'கம்பெனி மாறினா → <b>மூவ் பதிவு பண்ணுங்க</b>, பேரை மாத்தாதீங்க',
    ],
  },
} as const

export type Lang = keyof typeof CAPTIONS
