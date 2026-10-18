// MESER ICU MASTER - The Prompt Decoder (פענוח שאלת הבוחן: אומדן מול פעולה מיידית)
class PromptDecoderManager {
  constructor() {
    this.currentCaseIndex = 0;
    this.userAssessmentItems = [];
    this.userInterventionItems = [];
    this.score = 0;
    this.isEvaluated = false;

    this.cases = [
      {
        id: "case_desat",
        title: "תרחיש תרגול 1: צניחת סטורציה תחת הנשמה מכנית",
        prompt: "שאלת הבוחן במסר: 'מה האומדנים הדחופים שתבצעי בדקה הראשונה לכניסתך לחדר?'",
        warningNote: "מלכודת הבוחן: נבחנים רבים ממהרים לענות 'אעלה את ה-FiO2 ל-100%' או 'אתן סקשן', ומאבדים את מלוא הניקוד כי השאלה התייחסה לאומדן (איסוף מידע) ולא להתערבות!",
        cards: [
          { id: "c1", text: "האזנה לכניסת אוויר דו-צדדית ושלילת אסימטריה", type: "assessment", explanation: "אומדן קליני מובהק (B - Auscultation) להערכת פיזור האוורור ושלילת חזה אוויר." },
          { id: "c2", text: "העלאת FiO2 במנשם ל-100%", type: "intervention", explanation: "התערבות טיפולית! פעולה אקטיבית לתיקון המצב, אינה נחשבת אומדן בשאלת הבוחן." },
          { id: "c3", text: "בדיקת מיקום הטובוס בשפה ולחץ ה-Cuff במנומטר", type: "assessment", explanation: "אומדן נתיב אוויר אובייקטיבי (A - Airway check) למניעת דליפה או אובדן קיבוע." },
          { id: "c4", text: "מתן בולוס פנטניל 50 מק\"ג ופרופופול", type: "intervention", explanation: "התערבות תרופתית/אנלגזיה! לא איסוף מידע אלא טיפול פעיל." },
          { id: "c5", text: "הסתכלות על לחצי המנשם (Ppeak ו-Pplat) ועקומות הזרימה", type: "assessment", explanation: "אומדן נשימתי מכני (Ventilator graphics assessment) לאבחנה מבדלת בין חסימה לבעיית קומפליאנס." },
          { id: "c6", text: "ביצוע סקשן עמוק בטובוס לשאיבת הפרשות", type: "intervention", explanation: "פעולה / התערבות לניקוי נתיב האוויר, מענה לשאלת 'מה הפעולות הראשונות'." },
          { id: "c7", text: "בדיקת דפקים פריפריים, מילוי קפילרי וטמפרטורת גפיים", type: "assessment", explanation: "אומדן המודינמי פריפרי (C - Circulation) להערכת פרפוזיה רקמתית." },
          { id: "c8", text: "הכנסת נקז חזה (Chest Tube) במרווח בינצלעי 5", type: "intervention", explanation: "פרוצדורה פולשנית / התערבות כירורגית מצילת חיים, לא אומדן." }
        ]
      },
      {
        id: "case_hypotension",
        title: "תרחיש תרגול 2: היפוטנשן פתאומי וטכיקרדיה בפוסט-אופ",
        prompt: "שאלת הבוחן במסר: 'מה הפעולות הראשונות שתנקטי לייצוב המטופל?'",
        warningNote: "שים לב: הפעם הבוחן שואל על פעולות / התערבות (Interventions)! מתן רשימת אומדנים בלבד תיחשב כהיסוס וקיפאון תחת לחץ.",
        cards: [
          { id: "c21", text: "התחלת עירוי נוראדרנלין וטיטרציה ל-MAP ≥ 65", type: "intervention", explanation: "פעולה ראשונה הכרחית לייצוב לחץ פרפוזיה איברי (Morton Ch. 38)." },
          { id: "c22", text: "מתן בולוס קריסטלואידים מאוזנים 500 מ\"ל בלחץ", type: "intervention", explanation: "התערבות החייאת נוזלים (Fluid challenge) ראשונית." },
          { id: "c23", text: "מדידת לחץ דם עורקי בליין (A-Line) ואיפוס הטרנסדוסר לגובה פלבוסטטי", type: "assessment", explanation: "אומדן וכיול ניטור! אינו פעולת תיקון אלא בדיקת מהימנות המדידה." },
          { id: "c24", text: "הפסקת/הפחתת עירוי תרופות סדציה ואופיאטים מדכאי ל\"ד", type: "intervention", explanation: "התערבות מיידית להסרת גורם יאטרוגני המחמיר ואזודילטציה." },
          { id: "c25", text: "הסתכלות על נקזי בטן ובדיקת שיעור דמם שפכי", type: "assessment", explanation: "אומדן כירורגי להערכת מקור היפו-וולמיה מדממת." },
          { id: "c26", text: "שליחת ספירת דם, כימיה, לקטט וגזים עורקיים סטט", type: "assessment", explanation: "אומדן מעבדתי / עזר לאיתור הסיבה לירידה." },
          { id: "c27", text: "הורדת מראשות המיטה ומנח טרנדלנבורג משופר (Passive Leg Raise)", type: "intervention", explanation: "התערבות מנח לשיפור חזרה ורידית (Preload recruitment)." },
          { id: "c28", text: "בדיקת סקאלת כאב ואי-שקט (BPS/CPOT)", type: "assessment", explanation: "אומדן סקאלה נוירו-התנהגותי, לא פעולה מתקנת." }
        ]
      }
    ];
  }

  init() {
    this.renderCase();
  }

  renderCase() {
    const container = document.getElementById('decoder-content-area');
    if (!container) return;

    const curr = this.cases[this.currentCaseIndex];
    this.userAssessmentItems = [];
    this.userInterventionItems = [];
    this.isEvaluated = false;

    container.innerHTML = `
      <div class="decoder-wrapper">
        <div class="decoder-header-card">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.75rem;">
            <span class="scenario-badge">שלב פענוח שאלה • מקרה ${this.currentCaseIndex + 1} מתוך ${this.cases.length}</span>
            <div style="display:flex; gap:0.5rem;">
              <button class="btn-outline" style="padding:0.3rem 0.8rem; font-size:0.8rem;" onclick="window.promptDecoder.prevCase()" ${this.currentCaseIndex === 0 ? 'disabled' : ''}>← מקרה קודם</button>
              <button class="btn-outline" style="padding:0.3rem 0.8rem; font-size:0.8rem;" onclick="window.promptDecoder.nextCase()" ${this.currentCaseIndex === this.cases.length - 1 ? 'disabled' : ''}>מקרה הבא →</button>
            </div>
          </div>
          <h2 style="font-size:1.35rem; margin-bottom:0.5rem; color:#fff;">${curr.title}</h2>
          <div class="decoder-prompt-box" style="background:#000; border:1px solid #38bdf8; border-radius:8px; padding:1rem; margin-bottom:0.75rem;">
            <p style="font-size:1.1rem; font-weight:700; color:#38bdf8;">🎯 ${curr.prompt}</p>
          </div>
          <div style="background:rgba(245, 158, 11, 0.12); border-right:4px solid #f59e0b; padding:0.75rem 1rem; border-radius:6px; font-size:0.88rem; color:#fde68a;">
            ⚠️ <strong>טיפ זהב למ.ס.ר:</strong> ${curr.warningNote}
          </div>
        </div>

        <div style="display:flex; justify-content:space-between; align-items:center; margin:1.25rem 0 0.5rem 0;">
          <h3 style="font-size:1.05rem; color:#f8fafc;">כרטיסיות למיון (לחצי על כרטיסיה כדי להעביר אותה לעמודה המתאימה):</h3>
          <button class="btn-outline" style="font-size:0.8rem; padding:0.3rem 0.75rem;" onclick="window.promptDecoder.resetCurrentCase()">איפוס מיון</button>
        </div>

        <!-- Pool of unclassified cards -->
        <div id="unclassified-pool" class="cards-pool" style="display:flex; flex-wrap:wrap; gap:0.6rem; min-height:80px; background:rgba(15,23,42,0.6); padding:1rem; border-radius:10px; border:1px dashed #334155; margin-bottom:1.5rem;">
          ${curr.cards.map(c => `
            <div id="card-${c.id}" class="decoder-card" onclick="window.promptDecoder.showMoveOptions('${c.id}')" style="background:#1e293b; border:1px solid #475569; border-radius:8px; padding:0.65rem 0.9rem; font-size:0.88rem; cursor:pointer; color:#fff; display:flex; align-items:center; gap:0.5rem; transition:transform 0.15s ease;">
              <span>${c.text}</span>
              <span style="font-size:0.75rem; color:#94a3b8; background:rgba(0,0,0,0.3); padding:2px 6px; border-radius:4px;">מיין ⇅</span>
            </div>
          `).join('')}
        </div>

        <!-- 2 Destination Columns -->
        <div class="sorting-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1.25rem;">
          <!-- Assessment Column -->
          <div class="sort-column" style="background:#0f172a; border:2px solid #0284c7; border-radius:12px; padding:1.25rem; display:flex; flex-direction:column; gap:0.75rem;">
            <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #1e3a8a; padding-bottom:0.5rem;">
              <h4 style="font-size:1.05rem; color:#38bdf8; font-weight:800; display:flex; align-items:center; gap:0.4rem;">
                🔍 טור אומדן (Assessment)
              </h4>
              <span style="font-size:0.8rem; color:#94a3b8;">איסוף מידע, האזנה, סקאלות, מעבדות</span>
            </div>
            <div id="column-assessment" style="min-height:220px; display:flex; flex-direction:column; gap:0.5rem;">
              <div style="font-size:0.82rem; color:#64748b; text-align:center; padding:2rem 0;" class="empty-hint">אין כרטיסיות עדיין</div>
            </div>
          </div>

          <!-- Intervention Column -->
          <div class="sort-column" style="background:#0f172a; border:2px solid #10b981; border-radius:12px; padding:1.25rem; display:flex; flex-direction:column; gap:0.75rem;">
            <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #065f46; padding-bottom:0.5rem;">
              <h4 style="font-size:1.05rem; color:#34d399; font-weight:800; display:flex; align-items:center; gap:0.4rem;">
                ⚡ טור פעולה / התערבות מיידית (Action)
              </h4>
              <span style="font-size:0.8rem; color:#94a3b8;">טיטרציה, בולוס, סקשן, מנח, תרופות</span>
            </div>
            <div id="column-intervention" style="min-height:220px; display:flex; flex-direction:column; gap:0.5rem;">
              <div style="font-size:0.82rem; color:#64748b; text-align:center; padding:2rem 0;" class="empty-hint">אין כרטיסיות עדיין</div>
            </div>
          </div>
        </div>

        <div style="margin-top:1.5rem; display:flex; justify-content:center; gap:1rem;">
          <button id="btn-eval-decoder" class="btn-primary" style="padding:0.75rem 2.5rem; font-size:1rem;" onclick="window.promptDecoder.evaluate()">
            בדוק את המיון שלי וחשב ציון 📊
          </button>
        </div>

        <div id="decoder-feedback-box" style="margin-top:1.5rem; display:none;"></div>
      </div>
    `;
  }

  showMoveOptions(cardId) {
    if (this.isEvaluated) return;
    const curr = this.cases[this.currentCaseIndex];
    const card = curr.cards.find(c => c.id === cardId);
    if (!card) return;

    // Check where card is currently
    const inAssess = this.userAssessmentItems.includes(cardId);
    const inInter = this.userInterventionItems.includes(cardId);

    if (!inAssess && !inInter) {
      // Prompt user to pick where to put it
      const choice = confirm(`לאן לשייך את הפריט:\n"${card.text}"?\n\nלחצי OK עבור: טור אומדן (Assessment)\nלחצי Cancel עבור: טור פעולה מיידית (Intervention)`);
      if (choice) {
        this.userAssessmentItems.push(cardId);
      } else {
        this.userInterventionItems.push(cardId);
      }
    } else if (inAssess) {
      this.userAssessmentItems = this.userAssessmentItems.filter(id => id !== cardId);
      this.userInterventionItems.push(cardId);
    } else {
      this.userInterventionItems = this.userInterventionItems.filter(id => id !== cardId);
      // Back to pool
    }

    this.updateColumnsUI();
  }

  updateColumnsUI() {
    const curr = this.cases[this.currentCaseIndex];
    const pool = document.getElementById('unclassified-pool');
    const colAssess = document.getElementById('column-assessment');
    const colInter = document.getElementById('column-intervention');

    if (!pool || !colAssess || !colInter) return;

    // Render pool
    const unclassified = curr.cards.filter(c => !this.userAssessmentItems.includes(c.id) && !this.userInterventionItems.includes(c.id));
    pool.innerHTML = unclassified.length === 0 
      ? '<div style="color:#64748b; font-size:0.85rem; padding:0.5rem;">כל הכרטיסיות מוינו! לחצי על "בדוק את המיון שלי" למטה.</div>'
      : unclassified.map(c => `
          <div id="card-${c.id}" class="decoder-card" onclick="window.promptDecoder.showMoveOptions('${c.id}')" style="background:#1e293b; border:1px solid #475569; border-radius:8px; padding:0.65rem 0.9rem; font-size:0.88rem; cursor:pointer; color:#fff; display:flex; align-items:center; gap:0.5rem;">
            <span>${c.text}</span>
            <span style="font-size:0.75rem; color:#38bdf8; background:rgba(0,0,0,0.4); padding:2px 6px; border-radius:4px;">מיין ⇅</span>
          </div>
        `).join('');

    // Render Assessment
    colAssess.innerHTML = this.userAssessmentItems.length === 0
      ? '<div style="font-size:0.82rem; color:#64748b; text-align:center; padding:2rem 0;" class="empty-hint">לחצי על כרטיסיה למעלה ובחרי "טור אומדן"</div>'
      : this.userAssessmentItems.map(id => {
          const c = curr.cards.find(x => x.id === id);
          return `
            <div class="decoder-card" onclick="window.promptDecoder.showMoveOptions('${c.id}')" style="background:rgba(2, 132, 199, 0.2); border:1px solid #0284c7; border-radius:8px; padding:0.6rem 0.8rem; font-size:0.86rem; color:#f0f9ff; display:flex; justify-content:space-between; align-items:center; cursor:pointer;">
              <span>${c.text}</span>
              <span style="font-size:0.7rem; color:#38bdf8;">העבר לטור פעולה ⇄</span>
            </div>
          `;
        }).join('');

    // Render Intervention
    colInter.innerHTML = this.userInterventionItems.length === 0
      ? '<div style="font-size:0.82rem; color:#64748b; text-align:center; padding:2rem 0;" class="empty-hint">לחצי על כרטיסיה למעלה ובחרי "טור פעולה מיידית"</div>'
      : this.userInterventionItems.map(id => {
          const c = curr.cards.find(x => x.id === id);
          return `
            <div class="decoder-card" onclick="window.promptDecoder.showMoveOptions('${c.id}')" style="background:rgba(16, 185, 129, 0.2); border:1px solid #10b981; border-radius:8px; padding:0.6rem 0.8rem; font-size:0.86rem; color:#f0fdf4; display:flex; justify-content:space-between; align-items:center; cursor:pointer;">
              <span>${c.text}</span>
              <span style="font-size:0.7rem; color:#34d399;">החזר למאגר ⇄</span>
            </div>
          `;
        }).join('');
  }

  evaluate() {
    const curr = this.cases[this.currentCaseIndex];
    const total = curr.cards.length;
    let correctCount = 0;
    const errors = [];

    curr.cards.forEach(card => {
      const isClassifiedAssess = this.userAssessmentItems.includes(card.id);
      const isClassifiedInter = this.userInterventionItems.includes(card.id);

      if (card.type === 'assessment' && isClassifiedAssess) {
        correctCount++;
      } else if (card.type === 'intervention' && isClassifiedInter) {
        correctCount++;
      } else {
        const userPicked = isClassifiedAssess ? 'אומדן' : (isClassifiedInter ? 'פעולה מיידית' : 'לא מוין');
        const correct = card.type === 'assessment' ? 'אומדן (Assessment)' : 'פעולה מיידית (Intervention)';
        errors.push({
          card,
          userPicked,
          correct
        });
      }
    });

    const percent = Math.round((correctCount / total) * 100);
    this.isEvaluated = true;

    const feedbackBox = document.getElementById('decoder-feedback-box');
    feedbackBox.style.display = 'block';
    feedbackBox.innerHTML = `
      <div style="background:#0b1329; border:2px solid ${percent >= 80 ? '#10b981' : '#f59e0b'}; border-radius:12px; padding:1.5rem; animation:fadeIn 0.3s ease;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem;">
          <h3 style="font-size:1.25rem; color:#fff;">תוצאות בדיקת פענוח שאלת הבוחן:</h3>
          <span style="font-family:var(--font-mono); font-size:1.6rem; font-weight:800; color:${percent >= 80 ? '#10b981' : '#f59e0b'};">
            ${percent}% (${correctCount}/${total} מדויק)
          </span>
        </div>

        ${percent === 100 
          ? `<div style="background:rgba(16,185,129,0.15); border:1px solid #10b981; border-radius:8px; padding:1rem; color:#a7f3d0; margin-bottom:1rem;">
              🌟 <strong>מושלם!</strong> הבנת את ההבדל הקריטי בין איסוף נתונים לפעולה פעילה. בתחנת מ.ס.ר תעני בדיוק על מה שנשאלת ותקבלי את מלוא הניקוד!
             </div>`
          : `<div style="background:rgba(239,68,68,0.12); border:1px solid #ef4444; border-radius:8px; padding:1rem; color:#fca5a5; margin-bottom:1rem;">
              ⚠️ <strong>שימי לב למלכודות הבאות:</strong> ערבוב בין אומדן לפעולה הוא הגורם מס' 1 לאובדן נקודות בוחן במ.ס.ר!
             </div>`
        }

        <div style="display:flex; flex-direction:column; gap:0.75rem;">
          ${curr.cards.map(c => {
            const isCorrect = (c.type === 'assessment' && this.userAssessmentItems.includes(c.id)) ||
                              (c.type === 'intervention' && this.userInterventionItems.includes(c.id));
            return `
              <div style="background:rgba(15,23,42,0.8); border-right:4px solid ${isCorrect ? '#10b981' : '#ef4444'}; border-radius:6px; padding:0.75rem 1rem;">
                <div style="display:flex; justify-content:space-between; align-items:center;">
                  <strong style="color:#fff; font-size:0.92rem;">${c.text}</strong>
                  <span style="font-size:0.8rem; font-weight:700; color:${isCorrect ? '#10b981' : '#ef4444'};">
                    ${isCorrect ? '✓ נכון' : '✗ שגיאה'}
                  </span>
                </div>
                <div style="font-size:0.82rem; color:#cbd5e1; margin-top:0.3rem;">
                  <strong>הסיווג הנכון:</strong> <span style="color:#38bdf8;">${c.type === 'assessment' ? 'אומדן בלבד' : 'התערבות / פעולה מיידית'}</span>
                  — ${c.explanation}
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  }

  resetCurrentCase() {
    this.userAssessmentItems = [];
    this.userInterventionItems = [];
    this.isEvaluated = false;
    this.renderCase();
  }

  nextCase() {
    if (this.currentCaseIndex < this.cases.length - 1) {
      this.currentCaseIndex++;
      this.renderCase();
    }
  }

  prevCase() {
    if (this.currentCaseIndex > 0) {
      this.currentCaseIndex--;
      this.renderCase();
    }
  }
}

window.promptDecoder = new PromptDecoderManager();
