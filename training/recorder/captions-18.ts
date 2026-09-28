/**
 * Module 18 captions: Weekly planning and the meetings (repair-service feature 036, decision log
 * Round 10.33). Every rule here is true of `/service-centre/planning`, the reservoir's allot foot and
 * the functions behind them (migrations 20260928000100–0800). Tamil follows TAMIL-STYLE.md.
 */

export type Lang = 'en' | 'ta'

interface Captions {
  kicker: string
  title: string
  sub: string
  rhythmKicker: string
  rhythmTitle: string
  rhythm: string[]
  rhythmWho: string
  standup: string
  asOf: string
  notLogged: string
  atLimit: string
  blocked: string
  due: string
  stuck: string
  quiet: string
  filterOne: string
  filterBack: string
  noMoney: string
  plan: string
  carry: string
  demand: string
  capacity: string
  list: string
  notPriced: string
  commit: string
  planOne: string
  addOpen: string
  addDone: string
  withdrawOpen: string
  withdrawKeeps: string
  withdrawDone: string
  burnup: string
  done: string
  boards: string
  log: string
  review: string
  causes: string
  flow: string
  pile: string
  change: string
  changeText: string
  changeDone: string
  allot: string
  warn: string
  warnDo: string
  remember: string
  rules: string[]
}

const en: Captions = {
  kicker: 'Thulir training · Module 18 · Operations Manager · Service Head · Liaison · Engineer',
  title: 'Weekly planning and the meetings',
  sub: 'The daily stand-up, the Monday plan, the burn-up and the Saturday review. About 3½ minutes.',
  rhythmKicker: 'The week, Monday to Saturday',
  rhythmTitle: 'Four meetings, one screen',
  rhythm: [
    '<b>Every day · Stand-up</b>: each engineer, what is blocked, due or stuck',
    '<b>Monday · Weekly plan</b>: the boards the team aims to pass verification by Saturday',
    '<b>All week · Burn-up</b>: scope against done',
    '<b>Saturday · Weekly review</b>: what happened, why, and one change',
  ],
  rhythmWho: 'The Operations Manager leads, with the Service Head and the Liaison. Everyone on the floor reads it.',
  standup: 'Service › Weekly planning opens on the Stand-up.<small>One row per engineer. Demo data on screen.</small>',
  asOf: 'It is read when you open it.<small>Press Update for fresh figures. Nothing refreshes by itself.</small>',
  notLogged: 'Who logged no hours on the previous working day.<small>Only logged or not. Never how many.</small>',
  atLimit: 'Boards on the bench against the bench limit.<small>At the limit the row is marked. Over it, “Over limit”.</small>',
  blocked: 'Blocked names its cause.<small>Pending Spare with its purchase request, On Hold with its reason, or waiting for the check.</small>',
  due: 'Due: the SLA date, or the customer’s date.<small>Overdue, due today, or due within three working days.</small>',
  stuck: 'Stuck is the same rule as MIS › Stuck tasks.<small>No hour, part or move for more than 5 working days. Saturday counts; Sunday does not.</small>',
  quiet: 'Rows with something to talk about come first.<small>Rows with nothing to raise are greyed, at the bottom.</small>',
  noMoney: 'No money on the stand-up. It is about the work, not what anyone is worth.',
  filterOne: 'To focus on one person, pick them in the Engineer filter.<small>The tiles still count the whole team.</small>',
  filterBack: 'Every engineer brings the whole floor back.',
  plan: 'Monday: the Weekly plan.',
  carry: 'Last week’s unfinished boards are already on the list.<small>Carried over automatically, with last review’s one change beside them.</small>',
  demand: 'Demand: what could come into the week.<small>Ready to allot, due this week, quotations waiting (as quoted), at the testing gates.</small>',
  capacity: 'Capacity is typed: engineers × working days, less leave.<small>Whose leave it is is never recorded.</small>',
  list: 'This week’s list: the boards to pass verification by Saturday.<small>Value is each board’s agreed price. Totals are for the team only.</small>',
  notPriced: 'A board with no agreed price counts as a board and adds ₹0.<small>It says “Not priced”.</small>',
  commit: 'Commit the week once, on Monday. That is the baseline.<small>If nobody does, the list at the end of Monday is.</small>',
  planOne: 'One engineer’s week: pick them in the Engineer filter.<small>Each board shows its stage. The boards are counted, never their value.</small>',
  addOpen: 'A board joins mid-week with Add to the week.',
  addDone: 'After the commit it reads “Added”, with who and when.',
  withdrawOpen: 'A board that cannot be finished is withdrawn from the week, with a reason.',
  withdrawKeeps: 'Withdrawing takes it off the list only.<small>The board keeps its state. Its hours stay worked. It counts neither as done nor against anyone.</small>',
  withdrawDone: 'To close the board, use its own act: Cannot repair… or Customer withdrew.',
  burnup: 'Burn-up: scope against done, day by day.',
  done: 'Done means passed verification.<small>A board still at Ready for Verification on Saturday is not done. It carries over.</small>',
  boards: 'Switch between value and boards.<small>Every addition and withdrawal is in the log.</small>',
  log: 'Every change to the week, with who and when.',
  review: 'Saturday: the Weekly review. Team figures only.<small>Committed, passed, carried over, withdrawn.</small>',
  causes: 'Why boards waited, grouped by what the system records.<small>Spares by purchase-request state, On Hold, waiting for the check, stuck. Ranked by value.</small>',
  flow: 'Flow: throughput, cycle time and work in progress.<small>From the boards’ own history. Nothing typed.</small>',
  pile: 'Where work piles up, stage by stage.',
  change: 'Close with one change for next week.',
  changeText: 'Check every board at Ready for Verification by 16:00.',
  changeDone: 'Monday’s plan shows it, and next Saturday you record what came of it.',
  allot: 'The bench limit also shows when you allot.',
  warn: 'Past the limit, a warning: their bench, and who is under the limit.',
  warnDo: 'It only warns. Choose someone else, or Allot anyway.',
  remember: 'Remember',
  rules: [
    'Stand-up: <b>press Update</b>. Talk about the highlighted rows first.',
    'Monday: <b>commit the week</b>. Add or withdraw with a reason; the log keeps who and when.',
    'Done is <b>passed verification</b>. Withdrawing never closes a board.',
    'Saturday: team figures only, then <b>one change</b> for next week.',
  ],
}

const ta: Captions = {
  kicker: 'துளிர் ட்ரெயினிங் · மாட்யூல் 18 · ஆப்பரேஷன்ஸ் மேனேஜர் · சர்வீஸ் ஹெட் · லியாசன் · இன்ஜினியர்',
  title: 'வாராந்திர ப்ளானிங் & மீட்டிங்ஸ்',
  sub: 'டெய்லி ஸ்டாண்ட்-அப், திங்கள் ப்ளான், பர்ன்-அப், சனிக்கிழமை ரிவ்யூ. சுமார் 4 நிமிடம்.',
  rhythmKicker: 'வாரம்: திங்கள் முதல் சனி வரை',
  rhythmTitle: '4 மீட்டிங், ஒரே ஸ்க்ரீன்',
  rhythm: [
    '<b>தினமும் · Stand-up</b>: ஒவ்வொரு இன்ஜினியரும், எது ப்ளாக், எது டியூ, எது ஸ்டக்',
    '<b>திங்கள் · Weekly plan</b>: சனிக்குள்ள வெரிஃபிகேஷன் பாஸ் பண்ண டீம் எடுக்கற போர்டுகள்',
    '<b>வாரம் முழுக்க · Burn-up</b>: ஸ்கோப் vs டன்',
    '<b>சனி · Weekly review</b>: என்ன ஆச்சு, ஏன், ஒரு மாற்றம்',
  ],
  rhythmWho: 'ஆப்பரேஷன்ஸ் மேனேஜர் நடத்துவாங்க, சர்வீஸ் ஹெட்டும் லியாசனும் கூட. ஃப்ளோர்ல எல்லாரும் படிக்கலாம்.',
  standup: '“Service › Weekly planning” திறந்தா முதல்ல Stand-up.<small>ஒரு இன்ஜினியருக்கு ஒரு ரோ. ஸ்க்ரீன்ல டெமோ டேட்டா.</small>',
  asOf: 'திறக்கும்போது படிச்சது தான்.<small>புது நம்பருக்கு “Update” அழுத்துங்க. தானா ரெஃப்ரெஷ் ஆகாது.</small>',
  notLogged: 'முந்தைய வேலை நாள்ல ஹவர்ஸ் போடாதவங்க.<small>போட்டாங்களா இல்லையான்னு மட்டும். எத்தனை மணின்னு இல்ல.</small>',
  atLimit: 'பெஞ்ச்ல இருக்கற போர்டுகள் vs “bench limit”.<small>லிமிட்ல இருந்தா ரோ மார்க் ஆகும். தாண்டினா “Over limit”.</small>',
  blocked: 'Blocked-ல காரணம் சொல்லும்.<small>Pending Spare-க்கு அதோட PR, On Hold-க்கு காரணம், இல்ல செக்குக்கு வெயிட்டிங்.</small>',
  due: 'Due: SLA தேதி, இல்லன்னா கஸ்டமர் தேதி.<small>ஓவர்டியூ, இன்னைக்கு டியூ, இல்ல 3 வேலை நாள்குள்ள.</small>',
  stuck: 'Stuck: MIS › Stuck tasks-ல இருக்கற அதே ரூல்.<small>5 வேலை நாளுக்கு மேல ஹவர், பார்ட், மூவ் எதுவும் இல்ல. சனி எண்ணும்; ஞாயிறு எண்ணாது.</small>',
  quiet: 'பேச வேண்டிய ரோ முதல்ல வரும்.<small>பேச எதுவும் இல்லாத ரோ க்ரே ஆகி கீழ போகும்.</small>',
  noMoney: 'ஸ்டாண்ட்-அப்ல பணம் கிடையாது. இது வேலையை பத்தி, யார் மதிப்பையும் பத்தி இல்ல.',
  filterOne: 'ஒருத்தர் மேல மட்டும் கவனம் வைக்க, Engineer ஃபில்டர்ல அவங்களை செலக்ட் பண்ணுங்க.<small>டைல்ஸ் இன்னும் முழு டீமையும் எண்ணும்.</small>',
  filterBack: '“Every engineer” முழு ஃப்ளோரையும் திரும்ப காட்டும்.',
  plan: 'திங்கள்: Weekly plan.',
  carry: 'போன வாரம் முடியாத போர்டுகள் ஏற்கனவே லிஸ்ட்ல இருக்கும்.<small>தானா கேரி-ஓவர் ஆகும், போன ரிவ்யூவோட ஒரு மாற்றமும் பக்கத்துல.</small>',
  demand: 'Demand: வாரத்துக்குள்ள வரக்கூடியது.<small>அலாட் பண்ண ரெடி, இந்த வாரம் டியூ, கொட்டேஷன் வெயிட்டிங் (கொட்டேஷன் விலைல), டெஸ்டிங் கேட்ல.</small>',
  capacity: 'Capacity டைப் பண்ணணும்: இன்ஜினியர்ஸ் × வேலை நாள், லீவ் கழிச்சு.<small>யாரோட லீவ்னு பதிவு ஆகாது.</small>',
  list: 'இந்த வார லிஸ்ட்: சனிக்குள்ள வெரிஃபிகேஷன் பாஸ் பண்ண வேண்டிய போர்டுகள்.<small>மதிப்பு = ஒவ்வொரு போர்டோட அக்ரீட் ப்ரைஸ். டோட்டல் டீமுக்கு மட்டும்.</small>',
  notPriced: 'விலை இல்லாத போர்டு ஒரு போர்டா எண்ணும், ₹0 சேர்க்கும்.<small>“Not priced”-ன்னு காட்டும்.</small>',
  commit: 'திங்கள் அன்னைக்கு ஒரு தடவை “Commit the week”. அது தான் பேஸ்லைன்.<small>யாரும் பண்ணலன்னா, திங்கள் முடிவுல இருந்த லிஸ்ட் தான்.</small>',
  planOne: 'ஒரு இன்ஜினியரோட வாரம்: Engineer ஃபில்டர்ல அவங்களை செலக்ட் பண்ணுங்க.<small>ஒவ்வொரு போர்டோட ஸ்டேஜும் தெரியும். போர்டுகளை எண்ணும், மதிப்பை கூட்டாது.</small>',
  addOpen: 'வாரத்துக்கு நடுவுல “Add to the week”-ல போர்டு சேர்க்கலாம்.',
  addDone: 'கமிட் ஆன பிறகு சேர்த்தது “Added”-ன்னு வரும், யார், எப்போன்னு.',
  withdrawOpen: 'முடிக்க முடியாத போர்டை காரணத்தோட வாரத்துல இருந்து “Withdraw” பண்ணுங்க.',
  withdrawKeeps: 'Withdraw பண்ணா லிஸ்ட்ல இருந்து மட்டும் போகும்.<small>போர்டோட ஸ்டேட்டஸ் மாறாது. ஹவர்ஸ் வேலை செஞ்சதா தான் இருக்கும். டன்னாவும் எண்ணாது, யாருக்கு எதிராவும் எண்ணாது.</small>',
  withdrawDone: 'போர்டை க்ளோஸ் பண்ண அதோட ஆக்ட் தனி: “Cannot repair…” இல்ல “Customer withdrew”.',
  burnup: 'Burn-up: தினமும் ஸ்கோப் vs டன்.',
  done: 'டன்னா வெரிஃபிகேஷன் பாஸ்.<small>சனிக்கிழமை Ready for Verification-லேயே இருந்தா டன் இல்ல. அடுத்த வாரத்துக்கு போகும்.</small>',
  boards: 'மதிப்பு, போர்டுகள்: ரெண்டுக்கும் ஸ்விட்ச் பண்ணலாம்.<small>ஒவ்வொரு சேர்ப்பும் Withdraw-ம் லாக்ல இருக்கும்.</small>',
  log: 'வாரத்துல நடந்த ஒவ்வொரு மாற்றமும், யார், எப்போன்னு.',
  review: 'சனி: Weekly review. டீம் நம்பர் மட்டும்.<small>கமிட், பாஸ், கேரி-ஓவர், Withdraw.</small>',
  causes: 'போர்டு ஏன் காத்திருந்துச்சு, சிஸ்டம் பதிவு பண்றபடி குரூப்.<small>PR ஸ்டேட்டஸ்படி ஸ்பேர், On Hold, செக்குக்கு வெயிட்டிங், ஸ்டக். மதிப்புப்படி வரிசை.</small>',
  flow: 'Flow: த்ரூபுட், சைக்கிள் டைம், வொர்க் இன் ப்ராக்ரஸ்.<small>போர்டுகளோட ஹிஸ்டரில இருந்து. எதுவும் டைப் பண்ணல.</small>',
  pile: 'எந்த ஸ்டேஜ்ல வேலை குவியுது.',
  change: 'கடைசில அடுத்த வாரத்துக்கு ஒரு மாற்றம்.',
  changeText: 'Ready for Verification-ல இருக்கற எல்லா போர்டையும் 16:00-க்குள்ள செக் பண்ணணும்.',
  changeDone: 'திங்கள் ப்ளான்ல இது வரும், அடுத்த சனி என்ன ஆச்சுன்னு பதிவு பண்ணுவீங்க.',
  allot: 'அலாட் பண்ணும்போதும் bench limit தெரியும்.',
  warn: 'லிமிட் தாண்டினா வார்னிங்: அவங்க பெஞ்ச், லிமிட்டுக்கு கீழ யார் இருக்காங்க.',
  warnDo: 'வார்னிங் மட்டும் தான். “Choose someone else”, இல்ல “Allot anyway”.',
  remember: 'நினைவில் வெச்சுக்கோங்க',
  rules: [
    'Stand-up: <b>“Update” அழுத்துங்க</b>. ஹைலைட் ஆன ரோவை முதல்ல பேசுங்க.',
    'திங்கள்: <b>“Commit the week”</b>. காரணத்தோட சேருங்க, Withdraw பண்ணுங்க; யார், எப்போன்னு லாக்ல இருக்கும்.',
    'டன்னா <b>வெரிஃபிகேஷன் பாஸ்</b>. Withdraw பண்ணா போர்டு க்ளோஸ் ஆகாது.',
    'சனி: டீம் நம்பர் மட்டும், அப்புறம் அடுத்த வாரத்துக்கு <b>ஒரு மாற்றம்</b>.',
  ],
}

export const CAPTIONS: Record<Lang, Captions> = { en, ta }
