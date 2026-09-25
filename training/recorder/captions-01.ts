/**
 * Module 01 captions, English and Tamil.
 *
 * Tamil keeps the app's own words in English (button names, field labels, statuses), because
 * that is what staff will see on screen.
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
    reach: 'Every contact needs an email or a mobile.',
    primary: 'One primary contact per company.<small>Make primary on another one clears the old one.</small>',
    log: 'Log every call, visit or message on the Timeline.',
    logged: 'Logged. Newest entry on top.',
    late: 'Logging it a day late? Set When.<small>Earlier dates are marked “Backdated”. Future dates are refused.</small>',
    immutable: 'Entries can’t be edited or deleted.<small>A correction is a new entry.</small>',
    contact: 'Open the person to see everything said to them.',
    typo: 'Typo in a name or title? Fix it here.<small>Save corrections. Every change is recorded.</small>',
    moved: 'Changed company? Don’t rename the contact.<small>Record employment change instead.</small>',
    movedDone: 'Move recorded.<small>What was said before stays with the old company.</small>',
    lifecycle: 'Potential → Trial happens by itself<small>when the first work order is booked in.</small>',
    salesHead: 'Now as the Sales Head, on a Trial account.',
    trialOwner: 'A Trial account is the Sales Head’s.<small>The move to Trial is recorded with the job that caused it.</small>',
    convert: 'Only the Sales Head converts Trial to Regular.',
    refused: 'Refused: no job has reached Ready for Invoice yet.<small>Convert after a trial job is finished, not before.</small>',
    oneWay: 'Lifecycle moves only forward and are never edited.<small>Moving back is for the Ops Manager, with a reason.</small>',
    remember: 'Remember',
    rules: [
      'Company name only. <b>The system gives the code</b>',
      'Every contact: <b>email or mobile</b>. One <b>primary</b>',
      '<b>Log on the day.</b> Entries are never edited',
      'Changed company → <b>record the move</b>, don’t rename',
    ],
  },
  ta: {
    kicker: 'துளிர் பயிற்சி · பாடம் 01 · Sales Engineer · Sales Head',
    title: 'வாடிக்கையாளர்கள், தொடர்பாளர்கள், பின்தொடர்தல்',
    sub: 'புதிய வாய்ப்பு, அதன் நபர்கள், timeline, lifecycle. சுமார் 2 நிமிடங்கள்.',
    name: 'புதிய வாய்ப்பா? Company name மட்டுமே கட்டாயம்.<small>ஏற்கனவே உள்ள பெயரை எப்படித் தட்டச்சு செய்தாலும் சிஸ்டம் கண்டுபிடிக்கும்.</small>',
    system: 'Code, lifecycle, owner-ஐ சிஸ்டமே அமைக்கும்.<small>Customer code-ஐ நீங்கள் ஒருபோதும் தட்டச்சு செய்ய வேண்டாம்.</small>',
    registered: 'Potential ஆகப் பதிவானது, தனி TTS code உடன்.<small>Code-உம் clock-in தேதியும் ஒருபோதும் மாறாது.</small>',
    people: 'இப்போது நீங்கள் பேசும் நபர்களைச் சேர்க்கவும்.',
    reach: 'ஒவ்வொரு contact-க்கும் email அல்லது mobile வேண்டும்.',
    primary: 'ஒரு நிறுவனத்துக்கு ஒரே ஒரு primary contact.<small>வேறொருவருக்கு Make primary அழுத்தினால் பழையது நீங்கும்.</small>',
    log: 'ஒவ்வொரு call, visit, message-ஐயும் Timeline-இல் பதிவு செய்யவும்.',
    logged: 'பதிவானது. புதியது மேலே வரும்.',
    late: 'ஒரு நாள் தாமதமாகப் பதிவா? When-ஐ அமைக்கவும்.<small>முந்தைய தேதிகள் “Backdated” எனக் குறிக்கப்படும். எதிர்காலத் தேதி ஏற்கப்படாது.</small>',
    immutable: 'பதிவுகளைத் திருத்தவோ நீக்கவோ முடியாது.<small>திருத்தம் என்பது ஒரு புதிய பதிவு.</small>',
    contact: 'அந்த நபரைத் திறந்தால், அவரிடம் பேசிய அனைத்தும் தெரியும்.',
    typo: 'பெயரிலோ பதவியிலோ எழுத்துப் பிழையா? இங்கே சரிசெய்யவும்.<small>Save corrections. ஒவ்வொரு மாற்றமும் பதிவாகும்.</small>',
    moved: 'வேறு நிறுவனத்துக்கு மாறினாரா? Contact-ஐ மாற்றி எழுத வேண்டாம்.<small>Record employment change பயன்படுத்தவும்.</small>',
    movedDone: 'மாற்றம் பதிவானது.<small>முன்பு பேசியவை பழைய நிறுவனத்துடனே இருக்கும்.</small>',
    lifecycle: 'Potential → Trial தானாகவே நடக்கும்<small>முதல் work order பதிவாகும்போது.</small>',
    salesHead: 'இப்போது Sales Head ஆக, ஒரு Trial கணக்கில்.',
    trialOwner: 'Trial கணக்கு Sales Head-இன் பொறுப்பு.<small>Trial-க்கு மாறியது, அதற்குக் காரணமான job-உடன் பதிவாகிறது.</small>',
    convert: 'Trial-ஐ Regular ஆக்குவது Sales Head மட்டுமே.',
    refused: 'மறுக்கப்பட்டது: எந்த job-உம் Ready for Invoice வரவில்லை.<small>Trial job முடிந்த பிறகே convert செய்யவும், முன்பு அல்ல.</small>',
    oneWay: 'Lifecycle முன்னோக்கி மட்டுமே நகரும், திருத்த முடியாது.<small>பின்னோக்கி நகர்த்துவது Ops Manager மட்டுமே, காரணத்துடன்.</small>',
    remember: 'நினைவில் கொள்ளுங்கள்',
    rules: [
      'Company name மட்டும். <b>Code-ஐ சிஸ்டம் தரும்</b>',
      'ஒவ்வொரு contact-க்கும்: <b>email அல்லது mobile</b>. ஒரே <b>primary</b>',
      '<b>அன்றே பதிவு செய்யவும்.</b> பதிவுகள் திருத்தப்படாது',
      'நிறுவனம் மாறினால் → <b>move-ஐப் பதிவு செய்யவும்</b>, பெயரை மாற்ற வேண்டாம்',
    ],
  },
} as const

export type Lang = keyof typeof CAPTIONS
