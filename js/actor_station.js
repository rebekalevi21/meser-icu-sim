// MESER ICU MASTER - Actor & Communication Station (שיטת שלושת השלבים בתחנת שחקן)
class ActorStationManager {
  constructor() {
    this.currentStep = 1; // 1: לפני (Pre-encounter), 2: במהלך (Encounter), 3: אחרי (Post-encounter)
    this.timerSeconds = 480; // 8 minutes total
    this.timerInterval = null;
    this.dialogueTurn = 0;
    this.userScore = 0;
    this.checkedRubricItems = new Set();
    this.userSbarText = { s: '', b: '', a: '', r: '' };

    this.scenario = {
      title: "קביעת מוות מוחי-נשימתי מול בן משפחה (אב המטופל)",
      patientName: "דניאל סגל",
      fatherName: "יוסי",
      age: 28,
      background: "חבלת ראש קשה (Severe TBI), בצקת מוחית מסיבית ועליית ICP בלתי נשלטת, לאחר לפרוטומיה וקרניוטומיה דקומפרסיבית. בשעות האחרונות היעלמות מלאה של כל רפלקסי גזע המוח, אישונים מורחבים ומקובעים ללא תגובה לאור. הושלם פרוטוקול בדיקת מוות מוחי מלא על פי חוק מוות מוחי-נשימתי תשס\"ח-2008.",
      doorTrigger: "אביו של דניאל יושב ליד המיטה בחדר 4, אוחז בידו החמה של בנו, רואה דופק במוניטור ובית חזה עולה ויורד עם המנשם, וזועם: 'הרופאים מרימים ידיים! הבן שלי חם ונושם ואתם רוצים לוותר עליו!'",
      
      // Dialogue tree representing realistic father reactions & candidate choices
      dialogueTree: [
        {
          id: 0,
          fatherSpeaker: "יוסי (אבא של דניאל, בקול שבור ורועד מכעס)",
          fatherText: "איך אתם יכולים להגיד לי שהוא מת?! אני מחזיק את היד שלו עכשיו והיא חמה! הלב שלו פועם במוניטור, בית החזה שלו עולה ויורד! אתם הרופאים פשוט התייאשתם ממנו כי נמאס לכם להילחם!",
          options: [
            {
              id: "opt_0_empathy",
              label: "גישה אמפתית מתודית + פירוק המלכודת הוויזואלית (מודל NURSE)",
              response: "שלום יוסי, אני רבקה, האחות שמרכזת את הטיפול בדניאל. אני מבינה לחלוטין למה זה נראה ומרגיש לך ככה. אתה נוגע ביד החמה שלו, רואה את בית החזה עולה ויורד ושומע את צפצוף הדופק. זה המראה הכי מבלבל ומטעה שיכול להיות. אבל חשוב לי לשבת לצידך ולהסביר לך בדיוק מה המכשירים והתרופות עושים כרגע, ומה באמת קרה למוח של דניאל.",
              points: 25,
              rubricIds: ["self_intro", "visual_trap"],
              operatorNote: "מצוין! שימוש נכון ב-NURSE (Understanding & Naming) ללא ויכוח, הצגה עצמית ברורה ופירוק הבלבול שהמנשם מייצר."
            },
            {
              id: "opt_0_cold",
              label: "תגובה טכנית ישירה (שגיאה נפוצה)",
              response: "יוסי, אתה לא מבין ברפואה. הוועדה כבר קבעה מוות מוחי וזה סופי. הדופק שאתה רואה הוא רק בגלל המכונות, ואין טעם להתווכח עם עובדות רפואיות.",
              points: 5,
              rubricIds: [],
              operatorNote: "שגיאה תקשורתית קשה! שפת דיבור מתנשאת ואטומה שמגבירה עוינות ומאבדת את כל ניקוד האמפתיה במסר."
            }
          ]
        },
        {
          id: 1,
          fatherSpeaker: "יוסי (האב)",
          fatherText: "אז מה המכונות עושות? תסבירי לי! אם הלב פועם והוא נושם, אולי המוח שלו ישתקם מחר? אולי הוא ייצא מזה?",
          options: [
            {
              id: "opt_1_physiology",
              label: "הסבר פתופיזיולוגי מפושט לפי Morton 12 והסבר תפקיד המכשירים",
              response: "דניאל ספג פגיעה מוחית אנושה ובלתי הפיכה. המוח הוא מרכז הבקרה שנותן פקודה לגוף לנשום, לווסת לחץ דם ולהיות בהכרה. כרגע, תאי המוח וגזע המוח נהרסו לחלוטין. מה שאתה רואה איננו נשימה של דניאל – המנשם דוחף אוויר לריאות בכוח מכני, והתרופות בעירוי מפעילות את שריר הלב. ברגע שננתק את המכשירים, הגוף לא ייקח אפילו נשימה אחת בעצמו.",
              points: 25,
              rubricIds: ["machine_vs_patient"],
              operatorNote: "מעולה! הסבר פיזיולוגי בהיר ללא שימוש בז'רגון מנוכר, המחבר בין מה שהאב רואה למציאות הקלינית."
            },
            {
              id: "opt_1_superficial",
              label: "הסבר שטחי ועמום",
              response: "המוח נפגע קשה מאוד בתאונה ואי אפשר לתקן אותו. המנשם עושה את העבודה במקומו.",
              points: 10,
              rubricIds: [],
              operatorNote: "הסבר חלקי שאינו מדגיש את אי-ההפיכות של הנזק המוחי ואת תפקיד התרופות בשריר הלב."
            }
          ]
        },
        {
          id: 2,
          fatherSpeaker: "יוסי (האב - דמעות בעיניו)",
          fatherText: "איך אתם בטוחים ב-100%? אולי רופא אחד טעה? מי קבע את זה בכלל?",
          options: [
            {
              id: "opt_2_law_committee",
              label: "פירוט תנאי הסף, הרכב הוועדה הבלתי-תלויה והבדיקות (חוק מוות מוחי)",
              response: "אני כל כך מבינה את הצורך שלך בוודאות מוחלטת, ומגיע לך לדעת. על פי החוק הישראלי, קביעה כזו אינה נעשית על ידי רופא יחיד ובוודאי לא על ידי הצוות המטפל בנו. ועדה מיוחדת של שני רופאים מומחים בלתי תלויים לחלוטין (מומחה בנוירולוגיה ומומחה בטיפול נמרץ) בדקו אותו. לפני הבדיקה וידאנו שאין שום השפעת תרופות הרדמה ושהחום תקין. הם בדקו שכל רפלקסי גזע המוח חסרים (היעדר תגובת אישונים, בליעה, רפלקס שיעול), ביצעו מבחן דום נשימה מלא, וביצעו בדיקה מכשירית שהוכיחה בוודאות שאין שום זרימת דם למוח.",
              points: 30,
              rubricIds: ["prereqs_committee", "brainstem_tests", "ancillary_test"],
              operatorNote: "תשובת מופת! סקירת חוק מוות מוחי, אי-תלות הוועדה, תנאי הסף, רפלקסי גזע המוח והבדיקה המכשירית המאששת."
            },
            {
              id: "opt_2_vague_committee",
              label: "ציון כללי של 'בדיקות מקיפות'",
              response: "הרופאים עשו בדיקות מקיפות וראו שאין תגובות ברפלקסים, וזה בדוק בכל הפרוטוקולים.",
              points: 10,
              rubricIds: [],
              operatorNote: "החמצת נקודות קריטיות: אי-ציון הרכב הוועדה הבלתי תלויה, שלילת סדציה, או בדיקה מכשירית מאששת."
            }
          ]
        },
        {
          id: 3,
          fatherSpeaker: "יוסי (משפיל מבט, בוכה בשקט)",
          fatherText: "...דניאל שלי, הילד שלי איננו... מה אני עושה עכשיו? מה קורה איתנו?",
          options: [
            {
              id: "opt_3_support_teachback",
              label: "הכלה שקטה + בדיקת הבנה + הצגת תמיכה וצעדי המשך (Post-encounter)",
              response: "אני כאן איתך, קח את כל הזמן שאתה צריך... (שתיקה מכילה). דניאל היה מוקף בכל הטיפול והאהבה שאפשר. חשוב לי לוודא שכל מה שדיברנו עליו הובן, ואין לך שאלות שמציקות לך. אנחנו נדאג שיהיה לך ולמשפחה זמן שקט ופרטי לשהות לצידו, ונביא עובדת סוציאלית שתלווה אותך בכל צעד. מנהל המחלקה ישב איתכם גם הוא לשיחה מסודרת בכל שלב.",
              points: 20,
              rubricIds: ["empathic_silence", "teach_back_support"],
              operatorNote: "סגירה מושלמת לשלב 3! מתן מרחב לבכי, Teach-back רגיש, גיוס מעטפת תמיכה והכנה לשיחה עם מנהל המחלקה."
            }
          ]
        }
      ],

      rubricChecklist: [
        { id: "self_intro", title: "הצגה עצמית, תיאום ציפיות וישיבה בגובה העיניים", pts: 10, desc: "הצגה בשם ובתפקיד, פנייה מכבדת לאב, יצירת סביבה שקטה ופרטית." },
        { id: "visual_trap", title: "פירוק המלכודת הוויזואלית (מודל NURSE)", pts: 15, desc: "תיקוף התחושה המבלבלת שהמטופל חם והמוניטור פועם, ללא ביטול רגשותיו." },
        { id: "machine_vs_patient", title: "הסבר ההבדל בין פעולת המכשירים לפיזיולוגיה של המטופל", pts: 15, desc: "הסבר מפושט: המנשם מנשים מכנית, התרופות מכווצות שריר לב, המוח מת בלתי-הפיך." },
        { id: "prereqs_committee", title: "פירוט תנאי הסף והרכב הוועדה הבלתי-תלויה", pts: 15, desc: "שני רופאים מומחים בלתי תלויים שאינם מהצוות המטפל, שלילת היפותרמיה ותרופות סדציה." },
        { id: "brainstem_tests", title: "ציון הבדיקות הקליניות ורפלקסי גזע המוח (Apnea Test)", pts: 15, desc: "היעדר תגובה לכאב, אישונים, קרנית, שיעול ובדיקת דום נשימה מבוקרת." },
        { id: "ancillary_test", title: "ציון חובת בדיקת עזר מכשירית מאששת (חוק ישראלי)", pts: 10, desc: "הדגמת היעדר זרימת דם מוחית (CTA / TCD / מיפוי מוח) לאישוש ודאי." },
        { id: "empathic_silence", title: "שפה מכילה, עמידה בשתיקה והימנעות מקלישאות", pts: 10, desc: "לא להגיד 'תהיה חזק' או לקטוע בכי; מתן מקום לאבל ולעיבוד הבשורה." },
        { id: "teach_back_support", title: "בדיקת הבנה (Teach-back), הצגת תמיכה ו-SBAR לצוות", pts: 10, desc: "בדיקה מה האב הבין, שילוב עו\"ס/גורמי תמיכה, ודיווח SBAR מתועד." }
      ]
    };
  }

  init() {
    this.render();
  }

  setStep(stepNum) {
    this.currentStep = stepNum;
    this.render();
  }

  render() {
    const container = document.getElementById('actor-station-content');
    if (!container) return;

    container.innerHTML = `
      <div class="actor-station-wrapper">
        <!-- Top Workflow Nav (3 Steps) -->
        <div class="actor-stepper-bar" style="background:#0f172a; border:1px solid #1e293b; border-radius:12px; padding:1rem 1.5rem; display:flex; justify-content:space-between; align-items:center; margin-bottom:1.25rem;">
          <div style="display:flex; align-items:center; gap:1.5rem;">
            <div class="step-nav-pill ${this.currentStep === 1 ? 'active' : ''}" onclick="window.actorStation.setStep(1)" style="cursor:pointer; display:flex; align-items:center; gap:0.5rem; font-weight:700; color:${this.currentStep === 1 ? '#38bdf8' : '#94a3b8'};">
              <span style="background:${this.currentStep === 1 ? '#0284c7' : '#334155'}; color:#fff; width:26px; height:26px; border-radius:50%; display:inline-flex; align-items:center; justify-content:center; font-size:0.85rem;">1</span>
              <span>שלב 1: לפני הכניסה (Pre-encounter)</span>
            </div>
            <span style="color:#475569;">←</span>
            <div class="step-nav-pill ${this.currentStep === 2 ? 'active' : ''}" onclick="window.actorStation.setStep(2)" style="cursor:pointer; display:flex; align-items:center; gap:0.5rem; font-weight:700; color:${this.currentStep === 2 ? '#38bdf8' : '#94a3b8'};">
              <span style="background:${this.currentStep === 2 ? '#0284c7' : '#334155'}; color:#fff; width:26px; height:26px; border-radius:50%; display:inline-flex; align-items:center; justify-content:center; font-size:0.85rem;">2</span>
              <span>שלב 2: במהלך המפגש (Encounter)</span>
            </div>
            <span style="color:#475569;">←</span>
            <div class="step-nav-pill ${this.currentStep === 3 ? 'active' : ''}" onclick="window.actorStation.setStep(3)" style="cursor:pointer; display:flex; align-items:center; gap:0.5rem; font-weight:700; color:${this.currentStep === 3 ? '#38bdf8' : '#94a3b8'};">
              <span style="background:${this.currentStep === 3 ? '#0284c7' : '#334155'}; color:#fff; width:26px; height:26px; border-radius:50%; display:inline-flex; align-items:center; justify-content:center; font-size:0.85rem;">3</span>
              <span>שלב 3: סגירה והמשך (Post-encounter)</span>
            </div>
          </div>

          <div style="display:flex; align-items:center; gap:1rem;">
            <div style="background:#000; padding:0.4rem 1rem; border-radius:8px; border:1px solid #334155; display:flex; align-items:center; gap:0.5rem;">
              <span style="font-size:0.75rem; color:#94a3b8;">טיימר תחנת שחקן:</span>
              <span id="actor-timer-display" style="font-family:var(--font-mono); font-size:1.25rem; font-weight:800; color:#38bdf8;">08:00</span>
            </div>
            <button class="btn-primary" style="padding:0.4rem 1rem; font-size:0.85rem;" onclick="window.actorStation.startTimer()">הפעל טיימר ▶</button>
          </div>
        </div>

        <!-- Render Current Step Content -->
        ${this.renderStepContent()}
      </div>
    `;
  }

  renderStepContent() {
    if (this.currentStep === 1) {
      return `
        <div style="display:grid; grid-template-columns:1.2fr 0.8fr; gap:1.25rem; animation:fadeIn 0.2s ease;">
          <div style="background:#111827; border:1px solid #1e293b; border-radius:12px; padding:1.5rem; display:flex; flex-direction:column; gap:1rem;">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <span class="scenario-badge">שלב 1 • דקת ההתארגנות מחוץ לחדר</span>
              <span style="font-size:0.8rem; color:#94a3b8;">הקצאת זמן: 60 שניות</span>
            </div>
            <h3 style="font-size:1.3rem; color:#fff;">תרחיש הדלת: ${this.scenario.title}</h3>
            
            <div style="background:#090d16; border-right:4px solid #38bdf8; padding:1rem; border-radius:8px; font-size:0.95rem; line-height:1.6;">
              <p><strong>מטופל:</strong> ${this.scenario.patientName}, בן ${this.scenario.age}.</p>
              <p style="margin-top:0.4rem;"><strong>רקע:</strong> ${this.scenario.background}</p>
            </div>

            <div style="background:rgba(239, 68, 68, 0.12); border-right:4px solid #ef4444; padding:1rem; border-radius:8px; font-size:0.92rem; color:#fca5a5;">
              <strong>הטריגר בכניסה לחדר:</strong><br>
              ${this.scenario.doorTrigger}
            </div>

            <div style="margin-top:0.5rem;">
              <h4 style="color:#38bdf8; font-size:0.95rem; margin-bottom:0.4rem;">שלושת יעדי הברזל לדקה זו (Pre-encounter Checklist):</h4>
              <ul style="list-style:none; display:flex; flex-direction:column; gap:0.4rem; font-size:0.88rem; color:#cbd5e1;">
                <li>✓ <strong>הגדרת תפקיד ומטרה:</strong> הסבר רגיש על קביעת המוות המוחי, פירוק אשליית המנשם/דופק, הבאת עובדות החוק.</li>
                <li>✓ <strong>הכנת הסביבה הפיזית:</strong> סגירת וילון, הבאת כיסא לישיבה בגובה העיניים, טישו זמין, כיבוי צלצולים בטלפון.</li>
                <li>✓ <strong>ויסות עצמי:</strong> נשימה עמוקה, לא להיכנס במגננה מול כעס האב, להגיע בעמדת הקשבה ומנהיגות קלינית.</li>
              </ul>
            </div>

            <div style="margin-top:1rem; display:flex; justify-content:flex-end;">
              <button class="btn-primary" onclick="window.actorStation.setStep(2)">היכנס לחדר והתחל שיחה עם האב (שלב 2) ←</button>
            </div>
          </div>

          <!-- Side: Brain Death Law Fast Reference Card -->
          <div style="background:#0b1329; border:1px solid #1e3a8a; border-radius:12px; padding:1.25rem; display:flex; flex-direction:column; gap:0.85rem;">
            <h4 style="color:#38bdf8; font-size:1.05rem; display:flex; align-items:center; gap:0.4rem;">
              ⚖️ תמצית חוק מוות מוחי-נשימתי (2008)
            </h4>
            <div style="font-size:0.82rem; color:#cbd5e1; display:flex; flex-direction:column; gap:0.6rem;">
              <div style="background:rgba(0,0,0,0.3); padding:0.6rem; border-radius:6px;">
                <strong style="color:#fff;">הרכב הוועדה:</strong> 2 רופאים מומחים (נוירולוגיה/נוירוכירורגיה + טיפול נמרץ/הרדמה/פנימית) בלתי תלויים שאינם מהצוות המטפל ואינם עוסקים בהשתלות.
              </div>
              <div style="background:rgba(0,0,0,0.3); padding:0.6rem; border-radius:6px;">
                <strong style="color:#fff;">תנאי סף:</strong> חום מעל 36.0C, ל\"ד יציב (סיסטולי > 100), היעדר השפעת תרופות סדציה/משתקים (חלף זמן פינוי מלא).
              </div>
              <div style="background:rgba(0,0,0,0.3); padding:0.6rem; border-radius:6px;">
                <strong style="color:#fff;">בדיקות קליניות:</strong> היעדר הכרה, 5 רפלקסי גזע מוח (אישונים, קרנית, עיני בובה, קלורי, שיעול), ומבחן דום נשימה (Apnea Test) ל-PaCO2 > 60.
              </div>
              <div style="background:rgba(0,0,0,0.3); padding:0.6rem; border-radius:6px;">
                <strong style="color:#fff;">חובת בדיקה מכשירית בישראל:</strong> בדיקת הדמיה אובייקטיבית המוכיחה היעדר זרימת דם מוחית (CTA, TCD, מיפוי מוח).
              </div>
            </div>
          </div>
        </div>
      `;
    }

    if (this.currentStep === 2) {
      const turn = this.scenario.dialogueTree[this.dialogueTurn];
      return `
        <div style="display:grid; grid-template-columns:1.3fr 0.7fr; gap:1.25rem; animation:fadeIn 0.2s ease;">
          <!-- Left: Active Interactive Dialogue -->
          <div style="background:#111827; border:1px solid #1e293b; border-radius:12px; padding:1.5rem; display:flex; flex-direction:column; gap:1.25rem;">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <span class="scenario-badge" style="background:rgba(16,185,129,0.15); color:#34d399; border-color:rgba(16,185,129,0.3);">
                שלב 2 • ניהול השיחה בחדר (סבב ${this.dialogueTurn + 1} מתוך ${this.scenario.dialogueTree.length})
              </span>
              <span style="font-size:0.85rem; color:#94a3b8;">ציון מצטבר: <strong style="color:#38bdf8;">${this.userScore}</strong> נק'</span>
            </div>

            <!-- Father Statement Box -->
            <div style="background:rgba(239, 68, 68, 0.08); border:2px solid #ef4444; border-radius:10px; padding:1.25rem; display:flex; gap:1rem; align-items:flex-start;">
              <div style="background:#ef4444; color:#fff; font-weight:800; border-radius:50%; width:40px; height:40px; display:flex; align-items:center; justify-content:center; flex-shrink:0;">
                אב
              </div>
              <div>
                <h4 style="color:#fca5a5; font-size:0.95rem; margin-bottom:0.3rem;">${turn.fatherSpeaker}:</h4>
                <p style="font-size:1.05rem; color:#fff; line-height:1.5; font-weight:600;">"${turn.fatherText}"</p>
              </div>
            </div>

            <!-- Candidate Response Options -->
            <div>
              <h4 style="font-size:0.95rem; color:#38bdf8; margin-bottom:0.6rem;">איזו תגובה תבחרי להשיב לאב ברגע זה?</h4>
              <div style="display:flex; flex-direction:column; gap:0.75rem;">
                ${turn.options.map(opt => `
                  <div onclick="window.actorStation.selectDialogueOption('${opt.id}')" style="background:#0f172a; border:1px solid #334155; border-radius:8px; padding:1rem; cursor:pointer; transition:all 0.15s ease;" onmouseover="this.style.borderColor='#38bdf8'; this.style.background='#131f37';" onmouseout="this.style.borderColor='#334155'; this.style.background='#0f172a';">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.4rem;">
                      <strong style="color:#38bdf8; font-size:0.88rem;">${opt.label}</strong>
                      <span style="font-size:0.75rem; color:#94a3b8; background:rgba(0,0,0,0.4); padding:2px 8px; border-radius:4px;">בחר תגובה זו ⏎</span>
                    </div>
                    <p style="font-size:0.92rem; color:#e2e8f0; line-height:1.5;">"${opt.response}"</p>
                  </div>
                `).join('')}
              </div>
            </div>

            <div id="dialogue-feedback-card" style="display:none; margin-top:0.5rem;"></div>
          </div>

          <!-- Right: Live Evaluation Checklist (Rubric) -->
          <div style="background:#0b1329; border:1px solid #1e293b; border-radius:12px; padding:1.25rem; display:flex; flex-direction:column; gap:0.75rem;">
            <h4 style="color:#fff; font-size:1rem; border-bottom:1px solid #1e3a8a; padding-bottom:0.5rem; display:flex; justify-content:space-between;">
              <span>טופס מחוון הבוחן בתחנה</span>
              <span style="font-family:var(--font-mono); color:#38bdf8;">${this.checkedRubricItems.size}/${this.scenario.rubricChecklist.length}</span>
            </h4>
            
            <div style="display:flex; flex-direction:column; gap:0.5rem; max-height:480px; overflow-y:auto;">
              ${this.scenario.rubricChecklist.map(r => {
                const isChecked = this.checkedRubricItems.has(r.id);
                return `
                  <div style="background:rgba(15,23,42,0.6); border-right:3px solid ${isChecked ? '#10b981' : '#475569'}; border-radius:6px; padding:0.6rem 0.8rem; font-size:0.82rem;">
                    <div style="display:flex; justify-content:space-between; align-items:center;">
                      <strong style="color:${isChecked ? '#a7f3d0' : '#cbd5e1'};">${r.title}</strong>
                      <span style="font-weight:700; color:${isChecked ? '#10b981' : '#64748b'};">${isChecked ? `+${r.pts}` : `${r.pts} נק'`}</span>
                    </div>
                    <div style="font-size:0.75rem; color:#94a3b8; margin-top:0.25rem;">${r.desc}</div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        </div>
      `;
    }

    if (this.currentStep === 3) {
      return `
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:1.25rem; animation:fadeIn 0.2s ease;">
          <!-- Left: Post-Encounter Protocol & SBAR Drill -->
          <div style="background:#111827; border:1px solid #1e293b; border-radius:12px; padding:1.5rem; display:flex; flex-direction:column; gap:1rem;">
            <span class="scenario-badge">שלב 3 • סיום השיחה, תיעוד ו-SBAR</span>
            <h3 style="font-size:1.2rem; color:#fff;">העברת מקרה לצוות המטפל (SBAR Hand-off)</h3>
            <p style="font-size:0.88rem; color:#94a3b8;">
              בתום השיחה עם האב, עליך לדווח מיידית לאחות האחראית ולרופא התורן. נסח/י את הדיווח בפורמט SBAR מדויק:
            </p>

            <div class="sbar-section-box">
              <label style="font-weight:700; color:#ef4444; font-size:0.85rem;"><span class="sbar-letter-tag sbar-letter-s">S</span> Situation (מה קרה כרגע?):</label>
              <textarea id="sbar-in-s" class="sbar-textarea" placeholder="למשל: שיחה עם אביו של דניאל בעקבות קביעת מוות מוחי ע\"י הוועדה..."></textarea>
            </div>

            <div class="sbar-section-box">
              <label style="font-weight:700; color:#f59e0b; font-size:0.85rem;"><span class="sbar-letter-tag sbar-letter-b">B</span> Background (רקע המטופל והוועדה):</label>
              <textarea id="sbar-in-b" class="sbar-textarea" placeholder="למשל: TBI קשה, השלמת כל תנאי הסף והבדיקה המכשירית. האב הביע קושי עקב נוכחות מוניטור..."></textarea>
            </div>

            <div class="sbar-section-box">
              <label style="font-weight:700; color:#06b6d4; font-size:0.85rem;"><span class="sbar-letter-tag sbar-letter-a">A</span> Assessment (תגובת המשפחה והערכתך):</label>
              <textarea id="sbar-in-a" class="sbar-textarea" placeholder="למשל: סערת רגשות עמוקה, קיבל הסבר על תפקיד המנשם והיעדר תפקוד גזע המוח, החל להפנים..."></textarea>
            </div>

            <div class="sbar-section-box">
              <label style="font-weight:700; color:#10b981; font-size:0.85rem;"><span class="sbar-letter-tag sbar-letter-r">R</span> Recommendation (מה נדרש כעת?):</label>
              <textarea id="sbar-in-r" class="sbar-textarea" placeholder="למשל: לאפשר למשפחה שהות שקטה בחדר, לתאם כניסת עו\"ס, ולתזמן שיחת רופא בכיר..."></textarea>
            </div>

            <div style="display:flex; justify-content:space-between; align-items:center;">
              <button class="btn-primary" onclick="window.actorStation.submitSbar()">הגש דיווח וחשב ציון כולל לתחנה 📊</button>
              <button class="btn-outline" onclick="window.actorStation.showModelSbar()">הצג דיווח לדוגמה (Gold Standard)</button>
            </div>
          </div>

          <!-- Right: Summary & Scorecard -->
          <div style="background:#0b1329; border:1px solid #1e3a8a; border-radius:12px; padding:1.5rem; display:flex; flex-direction:column; gap:1.25rem;">
            <h3 style="font-size:1.2rem; color:#fff;">סיכום תחנת השחקן</h3>
            
            <div class="score-summary-banner">
              <div class="score-metric">
                <h4>ציון שיחה ומיומנות</h4>
                <div class="value">${this.userScore}</div>
              </div>
              <div class="score-metric">
                <h4>סעיפי מחוון שבוצעו</h4>
                <div class="value" style="color:#10b981;">${this.checkedRubricItems.size}/8</div>
              </div>
            </div>

            <div id="actor-sbar-comparison-box" style="display:none;"></div>

            <div style="background:rgba(15,23,42,0.8); border-radius:8px; padding:1rem; font-size:0.88rem; color:#cbd5e1; line-height:1.6;">
              <h4 style="color:#38bdf8; margin-bottom:0.5rem;">🌟 דגשי המאסטרי לתחנת קביעת מוות מוחי:</h4>
              <p>1. <strong>לא להתווכח על המראה:</strong> לאשר שהיד חמה והמנשם מעלה את בית החזה, אך להסביר את ההפרדה בין המכונה למוח.</p>
              <p style="margin-top:0.4rem;">2. <strong>אי-תלות הוועדה:</strong> להדגיש כי שני הרופאים המומחים אינם הצוות המטפל ואינם עוסקים בהשתלות.</p>
              <p style="margin-top:0.4rem;">3. <strong>ודאות מוחלטת:</strong> להזכיר את מבחן דום הנשימה ואת בדיקת הדימות המכשירית (חובת החוק בישראל).</p>
            </div>
          </div>
        </div>
      `;
    }
  }

  selectDialogueOption(optId) {
    const turn = this.scenario.dialogueTree[this.dialogueTurn];
    const opt = turn.options.find(o => o.id === optId);
    if (!opt) return;

    this.userScore += opt.points;
    if (opt.rubricIds) {
      opt.rubricIds.forEach(id => this.checkedRubricItems.add(id));
    }

    const feedbackBox = document.getElementById('dialogue-feedback-card');
    if (feedbackBox) {
      feedbackBox.style.display = 'block';
      feedbackBox.innerHTML = `
        <div style="background:${opt.points >= 20 ? 'rgba(16,185,129,0.15)' : 'rgba(239,68,68,0.15)'}; border:1px solid ${opt.points >= 20 ? '#10b981' : '#ef4444'}; border-radius:8px; padding:1rem; margin-top:0.5rem;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.4rem;">
            <strong style="color:${opt.points >= 20 ? '#34d399' : '#f87171'}; font-size:0.95rem;">משוב הבוחן (MSR Examiner Feedback):</strong>
            <span style="font-weight:800; color:${opt.points >= 20 ? '#10b981' : '#ef4444'};">+${opt.points} נקודות</span>
          </div>
          <p style="font-size:0.88rem; color:#e2e8f0; line-height:1.5;">${opt.operatorNote}</p>
          
          <div style="margin-top:0.8rem; display:flex; justify-content:flex-end;">
            ${this.dialogueTurn < this.scenario.dialogueTree.length - 1 
              ? `<button class="btn-primary" style="padding:0.4rem 1.2rem; font-size:0.85rem;" onclick="window.actorStation.nextTurn()">המשך לסבב הבא בשיחה ←</button>`
              : `<button class="btn-primary" style="padding:0.4rem 1.2rem; font-size:0.85rem;" onclick="window.actorStation.setStep(3)">סיום השיחה ומעבר לשלב 3 (Post-encounter) ←</button>`
            }
          </div>
        </div>
      `;
    }
  }

  nextTurn() {
    if (this.dialogueTurn < this.scenario.dialogueTree.length - 1) {
      this.dialogueTurn++;
      this.render();
    }
  }

  startTimer() {
    if (this.timerInterval) clearInterval(this.timerInterval);
    this.timerSeconds = 480;

    const display = document.getElementById('actor-timer-display');
    this.timerInterval = setInterval(() => {
      this.timerSeconds--;
      if (this.timerSeconds < 0) {
        clearInterval(this.timerInterval);
        alert("תם הזמן לתחנת השחקן (8 דקות)! עברי לשלב 3 לסיכום.");
        this.setStep(3);
        return;
      }
      const mins = Math.floor(this.timerSeconds / 60);
      const secs = this.timerSeconds % 60;
      if (display) {
        display.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
        if (this.timerSeconds === 120 && window.icuAudio) {
          window.icuAudio.playTwoMinuteWarning();
        }
      }
    }, 1000);
  }

  submitSbar() {
    this.checkedRubricItems.add("teach_back_support");
    this.userScore += 10;
    this.showModelSbar();
  }

  showModelSbar() {
    const box = document.getElementById('actor-sbar-comparison-box');
    if (!box) return;

    box.style.display = 'block';
    box.innerHTML = `
      <div style="background:#090d16; border:1px solid #10b981; border-radius:8px; padding:1.25rem; margin-top:0.5rem; animation:fadeIn 0.3s ease;">
        <h4 style="color:#10b981; font-size:0.95rem; margin-bottom:0.5rem;">🌟 דיווח SBAR תקני ומצטיין (Gold Standard Model):</h4>
        <div style="font-size:0.85rem; color:#cbd5e1; display:flex; flex-direction:column; gap:0.5rem;">
          <p><strong>S (Situation):</strong> שיחה עם אביו של דניאל בעקבות קביעת מוות מוחי-נשימתי ע\"י הוועדה המוסמכת.</p>
          <p><strong>B (Background):</strong> מטופל בן 28 לאחר TBI קשה, השלמת כל תנאי הסף, 5 רפלקסי גזע מוח, מבחן Apnea ובדיקת הדמיה מאששת. האב הביע קושי לקבל את הקביעה עקב נוכחות מדדים במוניטור.</p>
          <p><strong>A (Assessment):</strong> האב בסערת רגשות עמוקה, קיבל הסבר מפורט על תפקיד המנשם והתרופות, היעדר תפקוד גזע המוח ובדיקות הוועדה. החל להפנים את סופיות המצב.</p>
          <p><strong>R (Recommendation):</strong> לאפשר לבני המשפחה שהות שקטה בחדר, לתאם כניסת עו\"ס, ולתזמן את מנהל המחלקה לשיחת הסבר רשמית על תהליך הפסקת התמיכה.</p>
        </div>
      </div>
    `;
  }
}

window.actorStation = new ActorStationManager();
