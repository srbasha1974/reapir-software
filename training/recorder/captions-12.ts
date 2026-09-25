/**
 * Module 12 captions, English and Tamil.
 *
 * Tamil keeps the app's own words in English (screen names, button names, statuses), because
 * that is what staff will see on screen.
 */
export const CAPTIONS = {
  en: {
    kicker: 'Thulir training · Module 12 · Leads',
    title: 'For leads: queues, rates and dashboards',
    sub: 'Executive, Service Head, Operations Manager, Sales Head. About 2½ minutes.',
    exec: 'Executive / Ops Manager: start on the MIS dashboard.<small>Every open board by stage. Each figure opens the jobs behind it.</small>',
    attention: 'Needs attention today: what to chase first.',
    stuck: 'Stuck = no hours, parts or status change for 5 business days.<small>Only Alloted and In Progress. Any activity resets the clock.</small>',
    notAge: 'Judge a job by time in its current state, not its age.<small>Pending Spare and On Hold are watched on Queue aging.</small>',
    perf: 'Service Head: each engineer’s month on Performance.',
    target: 'Set a monthly target per engineer.<small>Labour margin on their closed jobs. Revise any time; who changed it is recorded.</small>',
    rates: 'Operations Manager: service rates, one customer’s card.',
    rateAdd: 'A rate = one board, one service level, from a date.',
    rateAdded: 'Added. Jobs registered from that date take it.',
    overlap: 'Refused: two rates can’t overlap for one board and level.<small>Price change? End the old rate, then add the new one.</small>',
    endRate: 'Rates are never edited, only ended.<small>Jobs keep the price they were registered at.</small>',
    retire: 'A sub-status no longer used? Retire it. Never delete.<small>Retiring keeps the history, and Restore undoes it.</small>',
    flags: 'The flags decide the rules.<small>No time logging, stuck-task scope, success, wastage.</small>',
    roles: 'New person? Grant their role here.<small>People come from the Workspace directory.</small>',
    owner: 'Sales Head: move an account with Change owner.',
    ownerWhy: 'Say why. It is required.',
    ownerDone: 'Moved. Who, when and why are in the account history.',
    remember: 'Remember',
    rules: [
      'Check <b>Needs attention</b> and <b>Stuck tasks</b> daily',
      'New price = <b>a new rate from a date</b>. No overlaps, no edits',
      '<b>Retire</b> a sub-status, never delete it',
      'Owner changes need <b>a reason</b>. Targets: per engineer, per month',
    ],
  },
  ta: {
    kicker: 'துளிர் பயிற்சி · பாடம் 12 · Lead-கள்',
    title: 'Lead-களுக்கு: வரிசைகள், rate-கள், dashboard-கள்',
    sub: 'Executive, Service Head, Operations Manager, Sales Head. சுமார் 3 நிமிடங்கள்.',
    exec: 'Executive / Ops Manager: MIS dashboard-இல் தொடங்கவும்.<small>ஒவ்வொரு திறந்த போர்டும் நிலை வாரியாக. ஒவ்வொரு எண்ணும் அதன் பின்னுள்ள job-களைத் திறக்கும்.</small>',
    attention: 'Needs attention today: முதலில் கவனிக்க வேண்டியவை.',
    stuck: 'Stuck = 5 வேலை நாட்கள் நேரம், parts, status மாற்றம் எதுவும் இல்லை.<small>Alloted, In Progress மட்டும். எந்தச் செயலும் கணக்கை மீண்டும் தொடங்கும்.</small>',
    notAge: 'Job-ஐ அதன் வயதால் அல்ல, இப்போதைய நிலையில் இருக்கும் நேரத்தால் மதிப்பிடவும்.<small>Pending Spare, On Hold ஆகியவை Queue aging-இல் கண்காணிக்கப்படும்.</small>',
    perf: 'Service Head: Performance-இல் ஒவ்வொரு engineer-இன் மாதம்.',
    target: 'ஒவ்வொரு engineer-க்கும் மாத target அமைக்கவும்.<small>மூடிய job-களின் labour margin. எப்போதும் மாற்றலாம்; யார் மாற்றினார் என்பது பதிவாகும்.</small>',
    rates: 'Operations Manager: service rate-கள், ஒரு வாடிக்கையாளரின் card.',
    rateAdd: 'ஒரு rate = ஒரு போர்டு, ஒரு service level, ஒரு தேதியிலிருந்து.',
    rateAdded: 'சேர்க்கப்பட்டது. அந்தத் தேதியிலிருந்து பதிவாகும் job-கள் இதைப் பெறும்.',
    overlap: 'மறுக்கப்பட்டது: ஒரே போர்டு, level-க்கு இரண்டு rate-கள் ஒன்றின் மேல் ஒன்று வரக்கூடாது.<small>விலை மாற்றமா? பழைய rate-ஐ முடித்து, புதியதைச் சேர்க்கவும்.</small>',
    endRate: 'Rate-கள் திருத்தப்படுவதில்லை, முடிக்கப்படும் மட்டுமே.<small>Job-கள் பதிவான நேரத்து விலையையே வைத்திருக்கும்.</small>',
    retire: 'பயன்படாத sub-status? Retire செய்யவும். நீக்க வேண்டாம்.<small>Retire வரலாற்றைக் காக்கும்; Restore அதைத் திரும்பப் பெறும்.</small>',
    flags: 'Flag-களே விதிகளைத் தீர்மானிக்கின்றன.<small>No time logging, stuck-task scope, success, wastage.</small>',
    roles: 'புதிய நபரா? அவரது role-ஐ இங்கே வழங்கவும்.<small>நபர்கள் Workspace directory-இலிருந்து வருவார்கள்.</small>',
    owner: 'Sales Head: Change owner மூலம் கணக்கை மாற்றவும்.',
    ownerWhy: 'காரணம் சொல்லவும். அது கட்டாயம்.',
    ownerDone: 'மாற்றப்பட்டது. யார், எப்போது, ஏன் என்பது கணக்கு வரலாற்றில் உள்ளது.',
    remember: 'நினைவில் கொள்ளுங்கள்',
    rules: [
      '<b>Needs attention</b>, <b>Stuck tasks</b> தினமும் பார்க்கவும்',
      'புதிய விலை = <b>ஒரு தேதியிலிருந்து புதிய rate</b>. Overlap இல்லை, திருத்தம் இல்லை',
      'Sub-status-ஐ <b>Retire</b> செய்யவும், நீக்க வேண்டாம்',
      'Owner மாற்றத்துக்கு <b>காரணம்</b> வேண்டும். Target: engineer வாரியாக, மாத வாரியாக',
    ],
  },
} as const

export type Lang = keyof typeof CAPTIONS
