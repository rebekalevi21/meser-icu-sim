// MESER ICU MASTER - SBAR Practice Arena & Voice/Text Evaluator
class SbarArenaManager {
  constructor() {
    this.currentCaseId = 'septic';
    this.isRecording = false;
    this.recognition = null;

    this.cases = [
      {
        id: 'septic',
        title: 'תרחיש 1: העברת מקרה בהלם ספטי רפרקטורי לאחר לפרוטומיה',
        patient: 'משה כהן, בן 64',
        model: {
          s: "משה כהן, בן 64, מונשם לאחר לפרוטומיה דחופה, מפתח הלם ספטי סוער עם MAP 52 וחמצת לקטית של 5.2 mmol/L.",
          b: "יום 3 לפוסט-אופ עקב פרפורציה של המעי. היה יציב עד שעת הבוקר שבה עלה חומו ל-39.2C, ל\"ד צנח והשתן פסק.",
          a: "המטופל בהלם ספטי עם כשל רב-איברי מתהווה (AKI). נלקחו 2 סטים של תרביות דם, ניתן בולוס פלזמליט 30 מ\"ל/ק\"ג והותחל נוראדרנלין המטוטר כעת ל-0.16 mcg/kg/min עם שיפור ה-MAP ל-78 mmHg. הוחל מרופנם וונקומיצין.",
          r: "ממליץ על הכנסת ליין עורקי ארטריאלי (A-Line) להמשך ניטור רציף, שקילת החדרת ליין Swan-Ganz / PiCCO, ומעקב גזים ופינוי לקטט בעוד שעה."
        },
        mustIncludeKeywords: ['לפרוטומיה', 'ספטי', '52', 'לקטט', 'תרביות', 'נוראדרנלין', 'MAP', 'אנטיביוטיקה', 'ליין עורקי']
      },
      {
        id: 'ards',
        title: 'תרחיש 2: העברת מקרה ב-Severe ARDS וצניחת סטורציה פתאומית',
        patient: 'רותי לוי, בת 58',
        model: {
          s: "רותי לוי, בת 58, מונשמת עקב אספירציה, פיתחה Severe ARDS עם צניחת סטורציה חדה ל-81% ויחס PaO2/FiO2 של 86.",
          b: "הונשמה אתמול, מורדמת. בשעה האחרונה עלו לחצי ההנשמה והמנשם צפצף על לחצי שיא.",
          a: "שלילת DOPE איששה שאין חסימת טובוס או פנאומוטורקס. מדובר בירידה קשה בקומפליאנס הריאה (Pplat 38 cmH2O). יישמנו פרוטוקול ARDSnet: הורדת נפח ל-400 מ\"ל (6 מ\"ל/ק\"ג), העלאת PEEP ל-14 ו-FiO2 ל-80%, עם ירידה ב-Pplat ל-27 ושיפור סטורציה ל-92%.",
          r: "ממליץ על היערכות מיידית לפרונציה (Prone position) ל-16 שעות, שיתוק שרירים רציף וביצוע צילום חזה חוזר."
        },
        mustIncludeKeywords: ['ARDS', '81%', 'DOPE', 'Pplat', 'ARDSnet', 'PEEP', 'פרונציה', 'נפח']
      },
      {
        id: 'brain_death',
        title: 'תרחיש 3: דיווח לצוות בתום שיחה על קביעת מוות מוחי-נשימתי',
        patient: 'דניאל סגל, בן 28',
        model: {
          s: "שיחה עם אביו של דניאל בעקבות קביעת מוות מוחי-נשימתי ע\"י הוועדה המוסמכת.",
          b: "מטופל בן 28 לאחר TBI קשה, השלמת כל תנאי הסף, 5 רפלקסי גזע מוח, מבחן Apnea ובדיקת CTA מאששת. האב הביע כעס וקושי לקבל את הקביעה עקב המוניטור הפועם.",
          a: "האב בסערת רגשות עמוקה, קיבל הסבר מפורט על תפקיד המנשם והתרופות, היעדר תפקוד גזע המוח ובדיקות הוועדה. החל להפנים את סופיות המצב.",
          r: "לאפשר לבני המשפחה שהות שקטה בחדר, לתאם כניסת עו\"ס, ולתזמן את מנהל המחלקה לשיחת הסבר רשמית על תהליך הפסקת התמיכה."
        },
        mustIncludeKeywords: ['מוות מוחי', 'וועדה', 'מנשם', 'גזע מוח', 'עו\"ס', 'משפחה', 'הסבר']
      }
    ];

    this.initSpeechRecognition();
  }

  initSpeechRecognition() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      this.recognition = new SpeechRecognition();
      this.recognition.lang = 'he-IL';
      this.recognition.continuous = true;
      this.recognition.interimResults = false;
    }
  }

  init() {
    this.render();
  }

  setCase(caseId) {
    this.currentCaseId = caseId;
    this.render();
  }

  getCurrentCase() {
    return this.cases.find(c => c.id === this.currentCaseId) || this.cases[0];
  }

  render() {
    const container = document.getElementById('sbar-content-area');
    if (!container) return;

    const curr = this.getCurrentCase();

    container.innerHTML = `
      <div style="display:flex; flex-direction:column; gap:1.5rem;">
        <!-- Header & Case Selector -->
        <div style="background:#0f172a; border:1px solid #1e293b; border-radius:12px; padding:1.25rem 1.75rem; display:flex; justify-content:space-between; align-items:center;">
          <div>
            <span class="scenario-badge">אימון תקשורת קלינית • מודל SBAR</span>
            <h2 style="font-size:1.35rem; color:#fff; margin-top:0.4rem;">${curr.title}</h2>
            <p style="font-size:0.85rem; color:#94a3b8;">מטופל: <strong>${curr.patient}</strong></p>
          </div>

          <div style="display:flex; gap:0.5rem;">
            ${this.cases.map(c => `
              <button class="btn-outline ${c.id === this.currentCaseId ? 'active' : ''}" style="${c.id === this.currentCaseId ? 'border-color:#38bdf8; color:#38bdf8;' : ''}" onclick="window.sbarArena.setCase('${c.id}')">
                ${c.patient.split(',')[0]}
              </button>
            `).join('')}
          </div>
        </div>

        <!-- SBAR Main Grid -->
        <div class="sbar-container">
          <!-- Left: User Input Form -->
          <div class="sbar-card">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <h3 style="font-size:1.15rem; color:#fff;">הזנת דיווח ה-SBAR שלך</h3>
              <button id="btn-voice-record" class="btn-icon-pill" onclick="window.sbarArena.toggleVoiceInput()">
                <span>🎙️</span> <span id="voice-label">הקלטה קולית בעברית</span>
              </button>
            </div>

            <!-- Situation -->
            <div class="sbar-section-box">
              <label style="font-weight:700; color:#ef4444; font-size:0.9rem;">
                <span class="sbar-letter-tag sbar-letter-s">S</span> Situation (המצב המיידי):
              </label>
              <textarea id="arena-sbar-s" class="sbar-textarea" placeholder="מי המטופל, איפה נמצא, ומהי הבעיה החריפה כרגע? (למשל: ירידת ל\"ד פתאומית, לקטט 5.2)..."></textarea>
            </div>

            <!-- Background -->
            <div class="sbar-section-box">
              <label style="font-weight:700; color:#f59e0b; font-size:0.9rem;">
                <span class="sbar-letter-tag sbar-letter-b">B</span> Background (רקע קליני רלוונטי בלבד):
              </label>
              <textarea id="arena-sbar-b" class="sbar-textarea" placeholder="סיבת אשפוז, יום פוסט-אופ, מהלך המשמרת עד למשבר... (להימנע מפירוט יתר לא רלוונטי!)"></textarea>
            </div>

            <!-- Assessment -->
            <div class="sbar-section-box">
              <label style="font-weight:700; color:#06b6d4; font-size:0.9rem;">
                <span class="sbar-letter-tag sbar-letter-a">A</span> Assessment (הערכתך הקלינית והפעולות שכבר ביצעת):
              </label>
              <textarea id="arena-sbar-a" class="sbar-textarea" placeholder="מה את חושבת שקורה (אבחנה מבדלת לפי מורטון), מה בוצע (נוזלים, נוראדרנלין, גזים, תרביות) ומה התגובה..."></textarea>
            </div>

            <!-- Recommendation -->
            <div class="sbar-section-box">
              <label style="font-weight:700; color:#10b981; font-size:0.9rem;">
                <span class="sbar-letter-tag sbar-letter-r">R</span> Recommendation (המלצה וצעדים מיידיים נדרשים):
              </label>
              <textarea id="arena-sbar-r" class="sbar-textarea" placeholder="מה את צריכה מהרופא/מחליף עכשיו? (ליין עורקי, הגעה למיטה, ייעוץ, בדיקה חוזרת)..."></textarea>
            </div>

            <div style="display:flex; justify-content:space-between; align-items:center; margin-top:0.5rem;">
              <button class="btn-primary" style="padding:0.75rem 2rem;" onclick="window.sbarArena.evaluateSbar()">בדוק את הדיווח וחשב ציון 📊</button>
              <button class="btn-outline" onclick="window.sbarArena.fillWithModel()">מלא דוגמה מעולה (Gold Standard)</button>
            </div>
          </div>

          <!-- Right: Evaluation & Golden Standard Comparison -->
          <div class="sbar-card">
            <h3 style="font-size:1.15rem; color:#fff;">משוב קליני ודיווח מודל (Morton 12 Standard)</h3>

            <div id="sbar-eval-results" style="display:none;"></div>

            <div style="background:#090d16; border:1px solid #1e293b; border-radius:10px; padding:1.25rem; display:flex; flex-direction:column; gap:1rem;">
              <h4 style="color:#38bdf8; font-size:1rem; border-bottom:1px solid #1e3a8a; padding-bottom:0.4rem;">
                🌟 דיווח מודל תקני (Exemplar):
              </h4>
              <div style="display:flex; flex-direction:column; gap:0.6rem; font-size:0.86rem; line-height:1.6; color:#e2e8f0;">
                <p><strong style="color:#ef4444;">Situation:</strong> ${curr.model.s}</p>
                <p><strong style="color:#f59e0b;">Background:</strong> ${curr.model.b}</p>
                <p><strong style="color:#06b6d4;">Assessment:</strong> ${curr.model.a}</p>
                <p><strong style="color:#10b981;">Recommendation:</strong> ${curr.model.r}</p>
              </div>
            </div>

            <div style="background:rgba(245, 158, 11, 0.1); border-right:4px solid #f59e0b; border-radius:8px; padding:1rem; font-size:0.84rem; color:#fde68a; line-height:1.5;">
              📌 <strong>כללי הזהב של מסר למסירת SBAR:</strong>
              <ul style="margin-top:0.4rem; padding-right:1rem;">
                <li>לא להאריך בפרטי רקע עבר שאינם קשורים ישירות למשבר.</li>
                <li>להזכיר תמיד מדדים קריטיים במספרים (MAP מדויק, ערך לקטט, ערך Pplat, סטורציה).</li>
                <li>ב-Recommendation: אסור להגיד "תעשה מה שאתה מבין" — על האחות להציג המלצה מובילה ואסרטיבית!</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  evaluateSbar() {
    const s = document.getElementById('arena-sbar-s')?.value || '';
    const b = document.getElementById('arena-sbar-b')?.value || '';
    const a = document.getElementById('arena-sbar-a')?.value || '';
    const r = document.getElementById('arena-sbar-r')?.value || '';

    const curr = this.getCurrentCase();
    const fullText = `${s} ${b} ${a} ${r}`;

    // Criteria checks
    let score = 0;
    const feedback = [];

    // Length check
    if (s.trim().length >= 15) { score += 20; } else { feedback.push("סעיף Situation קצר מדי או אינו מגדיר את הבעיה בבירור."); }
    if (b.trim().length >= 15) { score += 20; } else { feedback.push("סעיף Background אינו מספק רקע מספק."); }
    if (a.trim().length >= 25) { score += 30; } else { feedback.push("סעיף Assessment חלקי: עליך לפרט את הפעולות שבוצעו ואת תגובת המטופל."); }
    if (r.trim().length >= 15) { score += 20; } else { feedback.push("סעיף Recommendation חייב לכלול המלצה מעשית קונקרטית."); }

    // Keyword hits
    let kwHits = 0;
    curr.mustIncludeKeywords.forEach(kw => {
      if (fullText.includes(kw)) kwHits++;
    });
    const kwPercent = Math.round((kwHits / curr.mustIncludeKeywords.length) * 10);
    score += kwPercent;

    score = Math.min(100, score);

    const resBox = document.getElementById('sbar-eval-results');
    if (!resBox) return;

    resBox.style.display = 'block';
    resBox.innerHTML = `
      <div style="background:#0b1329; border:2px solid ${score >= 80 ? '#10b981' : (score >= 60 ? '#f59e0b' : '#ef4444')}; border-radius:10px; padding:1.25rem; margin-bottom:1rem; animation:fadeIn 0.3s ease;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.6rem;">
          <h4 style="font-size:1.1rem; color:#fff;">תוצאת הערכת SBAR:</h4>
          <span style="font-family:var(--font-mono); font-size:1.8rem; font-weight:800; color:${score >= 80 ? '#10b981' : (score >= 60 ? '#f59e0b' : '#ef4444')};">
            ${score}/100
          </span>
        </div>

        <p style="font-size:0.85rem; color:#cbd5e1;">
          זוהו <strong>${kwHits} מתוך ${curr.mustIncludeKeywords.length}</strong> מילות מפתח קליניות קריטיות (עוגני מחוון מסר).
        </p>

        ${feedback.length > 0 ? `
          <div style="margin-top:0.6rem; font-size:0.82rem; color:#fca5a5;">
            ${feedback.map(f => `<div>• ${f}</div>`).join('')}
          </div>
        ` : `
          <div style="margin-top:0.6rem; font-size:0.85rem; color:#a7f3d0;">
            ✓ כל 4 חלקי ה-SBAR מולאו במבנה אסרטיבי ומקצועי!
          </div>
        `}
      </div>
    `;
  }

  fillWithModel() {
    const curr = this.getCurrentCase();
    const sEl = document.getElementById('arena-sbar-s');
    const bEl = document.getElementById('arena-sbar-b');
    const aEl = document.getElementById('arena-sbar-a');
    const rEl = document.getElementById('arena-sbar-r');

    if (sEl) sEl.value = curr.model.s;
    if (bEl) bEl.value = curr.model.b;
    if (aEl) aEl.value = curr.model.a;
    if (rEl) rEl.value = curr.model.r;
  }

  toggleVoiceInput() {
    if (!this.recognition) {
      alert("זיהוי קולי אינו נתמך בדפדפן זה (מומלץ Chrome). ניתן להקליד ישירות בשדות.");
      return;
    }

    const btn = document.getElementById('btn-voice-record');
    const label = document.getElementById('voice-label');

    if (!this.isRecording) {
      this.recognition.start();
      this.isRecording = true;
      if (btn) btn.classList.add('active');
      if (label) label.textContent = 'מקליט... דברי כעת';

      this.recognition.onresult = (event) => {
        const transcript = event.results[event.results.length - 1][0].transcript;
        // Append to currently focused or active input (default to Situation)
        const activeEl = document.activeElement;
        if (activeEl && activeEl.tagName === 'TEXTAREA') {
          activeEl.value += (activeEl.value ? ' ' : '') + transcript;
        } else {
          const sEl = document.getElementById('arena-sbar-s');
          if (sEl) sEl.value += (sEl.value ? ' ' : '') + transcript;
        }
      };

      this.recognition.onerror = () => {
        this.stopRecording();
      };
    } else {
      this.stopRecording();
    }
  }

  stopRecording() {
    if (this.recognition && this.isRecording) {
      this.recognition.stop();
      this.isRecording = false;
      const btn = document.getElementById('btn-voice-record');
      const label = document.getElementById('voice-label');
      if (btn) btn.classList.remove('active');
      if (label) label.textContent = 'הקלטה קולית בעברית';
    }
  }
}

window.sbarArena = new SbarArenaManager();
