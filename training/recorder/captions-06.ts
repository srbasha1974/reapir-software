/**
 * Module 06 captions, English and Tamil.
 *
 * Tamil keeps the app's own words in English (button names, field labels, statuses), because
 * that is what staff will see on screen.
 */
export const CAPTIONS = {
  en: {
    kicker: 'Thulir training · Module 06 · Engineer · Liaison · Front Office',
    title: 'Parts, purchase requests and stock',
    sub: 'Book a part, raise a request, receive it, fix a count. About 2 minutes.',

    engK: 'Engineer · job card',
    engH: 'Book what you fit',
    catalogue: 'A catalogued part? Use From catalogue.',
    choose: 'Choose the part from the list. Say how many.<small>Typing a name is not choosing one.</small>',
    booked: 'Booked. Stock went down by 2.<small>The catalogue refuses more than it holds.</small>',
    other: 'Small bits not in the catalogue? Other spares.',
    otherHow: 'Say what they were and what they cost.<small>No stock moves.</small>',
    oneOrOther: 'Each booking is one or the other.<small>A catalogued part booked as Other spares leaves the stock wrong.</small>',
    pause: 'Part not in stock? Pending spare.',
    pauseHow: 'Name the part it waits for.<small>The Liaison sources from this. Hours stop until it arrives.</small>',

    liaK: 'Liaison · Spares',
    liaH: 'Raise the purchase request',
    line: 'One line per part, with how many.',
    tick: 'Tick the boards this line releases.<small>One request can serve several boards.</small>',
    raised: 'The system numbers it: PR/YY-MM/NNNNNN.<small>It starts as Draft.</small>',
    send: 'Ready? Send to the front office.',
    sent: 'Now: Sent to front office, with the date.',

    foK: 'Front Office · Spares',
    foH: 'Order it. Receive it.',
    zoho: 'Place the order in Zoho Books from this request.<small>That step is done in Zoho, not here.</small>',
    receive: 'Goods arrive? Record a delivery against the request line.<small>Front Office or Liaison.</small>',
    accepted: 'Only 1 of 2 came. Accepted = what you keep.<small>Rejected units are recorded, never stocked.</small>',
    partial: 'One board is back on the bench.<small>A board resumes only when its whole need has arrived.</small>',
    partialState: 'The request stays open: Partially received.',

    adjK: 'Liaison · Stock',
    adjH: 'Fix a wrong count',
    noEdit: 'A goods receipt is never edited.<small>Correct the count here instead.</small>',
    adjust: 'New count, a reason from the list, a note.',
    adjusted: 'Corrected. Before and after are both kept.<small>No cost goes to any job.</small>',

    remember: 'Remember',
    rules: [
      'Catalogued part → <b>From catalogue</b>. Small bits → <b>Other spares</b>',
      'No part? <b>Pending spare</b>, and name the part',
      'Liaison raises the PR → <b>Send to the front office</b> → order in <b>Zoho</b>',
      'Receipts are final. Fix counts with a <b>stock adjustment</b>',
    ],
  },
  ta: {
    kicker: 'துளிர் பயிற்சி · பாடம் 06 · Engineer · Liaison · Front Office',
    title: 'பாகங்கள், purchase request, ஸ்டாக்',
    sub: 'பாகத்தைப் பதிவு செய்தல், request எழுப்புதல், பெறுதல், எண்ணிக்கையைத் திருத்துதல். சுமார் 2½ நிமிடங்கள்.',

    engK: 'Engineer · job card',
    engH: 'பொருத்திய பாகத்தைப் பதிவு செய்யுங்கள்',
    catalogue: 'Catalogue-இல் உள்ள பாகமா? From catalogue பயன்படுத்தவும்.',
    choose: 'பட்டியலிலிருந்து பாகத்தைத் தேர்ந்தெடுத்து, எத்தனை என்று சொல்லவும்.<small>பெயரைத் தட்டச்சு செய்வது தேர்ந்தெடுப்பது ஆகாது.</small>',
    booked: 'பதிவானது. ஸ்டாக் 2 குறைந்தது.<small>இருப்பதை விட அதிகமாக catalogue ஏற்காது.</small>',
    other: 'Catalogue-இல் இல்லாத சிறு பொருட்களா? Other spares.',
    otherHow: 'அவை என்ன, விலை என்ன என்று எழுதவும்.<small>ஸ்டாக் மாறாது.</small>',
    oneOrOther: 'ஒவ்வொரு பதிவும் இரண்டில் ஒன்று மட்டுமே.<small>Catalogue பாகத்தை Other spares-ஆகப் பதிந்தால் ஸ்டாக் தவறாகும்.</small>',
    pause: 'பாகம் ஸ்டாக்கில் இல்லையா? Pending spare.',
    pauseHow: 'காத்திருக்கும் பாகத்தின் பெயரை எழுதவும்.<small>இதைப் பார்த்துதான் Liaison வாங்குவார். பாகம் வரும் வரை நேரம் பதிய முடியாது.</small>',

    liaK: 'Liaison · Spares',
    liaH: 'Purchase request எழுப்புதல்',
    line: 'ஒரு பாகத்துக்கு ஒரு வரி, எத்தனை என்றும் சேர்த்து.',
    tick: 'இந்த வரி விடுவிக்கும் போர்டுகளை டிக் செய்யவும்.<small>ஒரே request பல போர்டுகளுக்கு உதவலாம்.</small>',
    raised: 'எண்ணை சிஸ்டமே தரும்: PR/YY-MM/NNNNNN.<small>முதலில் Draft நிலையில் இருக்கும்.</small>',
    send: 'தயாரா? Send to the front office அழுத்தவும்.',
    sent: 'இப்போது: Sent to front office, தேதியுடன்.',

    foK: 'Front Office · Spares',
    foH: 'ஆர்டர் செய்து, பெற்றுக்கொள்ளுங்கள்',
    zoho: 'இந்த request-ஐப் பார்த்து Zoho Books-இல் ஆர்டர் போடவும்.<small>அந்த வேலை Zoho-வில் நடக்கும், இங்கே அல்ல.</small>',
    receive: 'பொருள் வந்ததா? Request வரிக்கு எதிராக Record a delivery.<small>Front Office அல்லது Liaison.</small>',
    accepted: '2-இல் 1 மட்டுமே வந்தது. Accepted = நீங்கள் வைத்துக்கொள்வது.<small>Rejected பதிவாகும், ஸ்டாக்கில் சேராது.</small>',
    partial: 'ஒரு போர்டு மீண்டும் bench-க்கு வந்தது.<small>ஒரு போர்டுக்குத் தேவையானது முழுவதும் வந்தால் மட்டுமே அது தொடரும்.</small>',
    partialState: 'Request திறந்தே இருக்கும்: Partially received.',

    adjK: 'Liaison · Stock',
    adjH: 'தவறான எண்ணிக்கையைத் திருத்துதல்',
    noEdit: 'Goods receipt-ஐ ஒருபோதும் மாற்ற முடியாது.<small>அதற்குப் பதில் இங்கே எண்ணிக்கையைத் திருத்தவும்.</small>',
    adjust: 'புதிய எண்ணிக்கை, பட்டியலிலிருந்து ஒரு காரணம், ஒரு குறிப்பு.',
    adjusted: 'திருத்தப்பட்டது. முன்பும் பின்பும் இரண்டும் பதிவில் இருக்கும்.<small>எந்த job-க்கும் செலவு சேராது.</small>',

    remember: 'நினைவில் கொள்ளுங்கள்',
    rules: [
      'Catalogue பாகம் → <b>From catalogue</b>. சிறு பொருட்கள் → <b>Other spares</b>',
      'பாகம் இல்லையா? <b>Pending spare</b>, பாகத்தின் பெயருடன்',
      'Liaison PR எழுப்புவார் → <b>Send to the front office</b> → <b>Zoho</b>-வில் ஆர்டர்',
      'Receipt இறுதியானது. எண்ணிக்கையை <b>stock adjustment</b> மூலம் திருத்தவும்',
    ],
  },
} as const

export type Lang = keyof typeof CAPTIONS
