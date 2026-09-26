/**
 * Module 12 captions, English and Tamil.
 *
 * Tamil follows TAMIL-STYLE.md: spoken shop-floor Tamil, business words in Tamil script, on-screen
 * labels (screens, buttons, statuses) in English letters.
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
    endRate: 'Rates are never edited, only ended.<small>Even a rate that starts later can be ended. Jobs keep their price.</small>',
    retire: 'A sub-status no longer used? Retire it. Never delete.<small>Retiring keeps the history; Restore undoes it. Don’t retire one still in use.</small>',
    flags: 'The flags decide the rules.<small>“No time logging” is what stops hours. Pending Spare and On Hold carry it.</small>',
    roles: 'New person? Grant their role here.<small>People come from the Workspace directory.</small>',
    owner: 'Sales Head: move an account with Change owner.',
    ownerWhy: 'Say why. It is required.',
    ownerDone: 'Moved. Who, when and why are in the account history.',
    remember: 'Remember',
    rules: [
      'Check <b>Needs attention</b> and <b>Stuck tasks</b> daily',
      'New price = <b>a new rate from a date</b>. No overlaps, no edits',
      '<b>Retire</b> a sub-status nobody uses, never delete it',
      'Owner changes need <b>a reason</b>. Targets: per engineer, per month',
    ],
  },
  ta: {
    kicker: 'துளிர் ட்ரெயினிங் · மாட்யூல் 12 · லீட்ஸ்',
    title: 'லீட்ஸுக்கு: க்யூ, ரேட், டாஷ்போர்டு',
    sub: 'Executive, Service Head, Operations Manager, Sales Head. சுமார் 3 நிமிடம்.',
    exec: 'Executive / Ops Manager: MIS டாஷ்போர்டுல ஆரம்பிங்க.<small>ஓப்பன் போர்டு எல்லாம் ஸ்டேஜ் வாரியா. எந்த நம்பரை அழுத்தினாலும் அதுக்குப் பின்னாடி இருக்கற ஜாப்ஸ் வரும்.</small>',
    attention: 'Needs attention today: முதல்ல இதைப் பாருங்க.',
    stuck: 'Stuck = 5 வேலை நாள் ஹவர்ஸ், பார்ட்ஸ், ஸ்டேட்டஸ் மாற்றம் எதுவும் இல்ல.<small>Alloted, In Progress மட்டும். ஏதாவது நடந்தா கணக்கு திரும்ப ஆரம்பிக்கும்.</small>',
    notAge: 'ஜாபை அதோட வயசை வெச்சு இல்ல, இப்போ இருக்கற ஸ்டேட்டஸ்ல எவ்ளோ நாள்னு பாருங்க.<small>Pending Spare, On Hold ரெண்டும் Queue aging-ல பாக்கப்படும்.</small>',
    perf: 'Service Head: Performance-ல ஒவ்வொரு இன்ஜினியரோட மாசம்.',
    target: 'ஒவ்வொரு இன்ஜினியருக்கும் மாச டார்கெட் போடுங்க.<small>அவங்க Closed ஜாப்ஸோட லேபர் மார்ஜின். எப்போ வேணாலும் மாத்தலாம்; யார் மாத்தினாங்கன்னு பதிவாகும்.</small>',
    rates: 'Operations Manager: சர்வீஸ் ரேட், ஒரு கஸ்டமரோட ரேட் கார்டு.',
    rateAdd: 'ஒரு ரேட் = ஒரு போர்டு, ஒரு சர்வீஸ் லெவல், ஒரு தேதியில இருந்து.',
    rateAdded: 'சேர்ந்தாச்சு. அந்த தேதியில இருந்து Inward ஆகுற ஜாப்ஸ் இந்த ரேட் எடுக்கும்.',
    overlap: 'முடியாது: ஒரே போர்டு, ஒரே லெவலுக்கு ரெண்டு ரேட் ஓவர்லாப் ஆகக் கூடாது.<small>ப்ரைஸ் மாறுதா? பழைய ரேட்டை முடிச்சு, புதுசு சேருங்க.</small>',
    endRate: 'ரேட்டை எடிட் பண்ண முடியாது, முடிக்க மட்டும் தான்.<small>இனிமே தான் ஆரம்பிக்கற ரேட்டையும் முடிக்கலாம். ஜாப்ஸ் அவங்க ப்ரைஸை வெச்சுக்கும்.</small>',
    retire: 'யாரும் யூஸ் பண்ணாத sub-status-ஆ? “Retire” பண்ணுங்க. டெலீட் இல்ல.<small>ஹிஸ்டரி அப்படியே இருக்கும்; “Restore” திரும்பக் கொண்டு வரும். யூஸ்ல இருக்கறதை Retire பண்ணாதீங்க.</small>',
    flags: 'ரூல்ஸை முடிவு பண்றது இந்த ஃப்ளாக்ஸ் தான்.<small>“No time logging” தான் ஹவர்ஸை நிறுத்தும். Pending Spare, On Hold ரெண்டுலயும் அது இருக்கு.</small>',
    roles: 'புது ஆளா? அவங்க ரோலை இங்க குடுங்க.<small>ஆட்கள் Workspace directory-ல இருந்து வருவாங்க.</small>',
    owner: 'Sales Head: “Change owner” வெச்சு கஸ்டமரை மாத்துங்க.',
    ownerWhy: 'காரணம் சொல்லுங்க. அது கட்டாயம்.',
    ownerDone: 'மாத்தியாச்சு. யாரு, எப்போ, ஏன் எல்லாம் கஸ்டமர் ஹிஸ்டரில இருக்கு.',
    remember: 'ஞாபகம் வெச்சுக்கோங்க',
    rules: [
      '<b>Needs attention</b>, <b>Stuck tasks</b> தினமும் பாருங்க',
      'புது ப்ரைஸ் = <b>ஒரு தேதியில இருந்து புது ரேட்</b>. ஓவர்லாப் இல்ல, எடிட் இல்ல',
      'யாரும் யூஸ் பண்ணாத sub-status-ஐ <b>Retire</b> பண்ணுங்க, டெலீட் இல்ல',
      'Owner மாத்த <b>காரணம்</b> வேணும். டார்கெட்: இன்ஜினியர் வாரியா, மாச வாரியா',
    ],
  },
} as const

export type Lang = keyof typeof CAPTIONS
