// MESER ICU MASTER - Briefing Room & Methodology Guide
class BriefingManager {
  constructor() {}

  init() {
    this.render();
  }

  render() {
    const container = document.getElementById('briefing-content-area');
    if (!container) return;

    container.innerHTML = `
      <div style="display:flex; flex-direction:column; gap:1.75rem;">
        <!-- Header Banner -->
        <div style="background:linear-gradient(135deg, rgba(2, 132, 199, 0.2), rgba(99, 102, 241, 0.15)); border:1px solid #0284c7; border-radius:12px; padding:1.5rem;">
          <h2 style="font-size:1.5rem; color:#fff; margin-bottom:0.4rem;">🏛️ חדר תדרוך ומתודיקה: המדריך המלא לפיצוח בחינת מ.ס.ר</h2>
          <p style="font-size:0.95rem; color:#cbd5e1; line-height:1.6;">
            בחינת הסימולציה במ.ס.ר אינה בוחנת רק ידע תיאורטי מ-<em>Morton 12</em>, אלא את <strong>תרגום הידע בזמן אמת תחת לחץ קיצוני</strong>. 
            נבחנים מצטיינים נכשלים לא בגלל שלא ידעו את המינון, אלא בגלל קיפאון מול המוניטור, איבוד סדר הפעולות, ערבוב בין אומדן להתערבות, ודיווח SBAR לא ממוקד.
          </p>
        </div>

        <!-- 4 Core Pillars Grid -->
        <div class="briefing-grid">
          <!-- Card 1: Time Breakdown -->
          <div class="briefing-card">
            <div class="briefing-card-step-badge">01</div>
            <h3>⏱️ חלוקת הזמנים המנצחת (12 דקות)</h3>
            <ul class="step-timeline-list">
              <li><strong>דקה 0-1 (מחוץ לדלת):</strong> קריאה פעילה של דף המקרה, זיהוי סיבת האשפוז, הטריגר הראשוני, וניסוח שאלת מפתח: "מה רוצים ממני כאן?".</li>
              <li><strong>דקה 1-2 (כניסה לבובה):</strong> בטיחות סביבתית, זיהוי מטופל, כפפות, וידוא קיבוע טובוס ולחץ Cuff (5-10 נקודות אוטומטיות!).</li>
              <li><strong>דקה 2-5 (ABCDE ראשוני):</strong> האזנה דו-צדדית, בדיקת לחצי מנשם, הסתכלות על ליין עורקי, לקיחת בדיקות דם דחופות (גזים, לקטט, תרביות).</li>
              <li><strong>דקה 5-9 (התערבות וטיטרציה):</strong> החייאת נוזלים / התחלת נוראדרנלין / טיטרציית PEEP ו-FiO2 / שלילת שגיאות פוסלות.</li>
              <li><strong>דקה 10-12 (SBAR סגירה):</strong> עצירת כל הפעולות, סידור המחשבות ומסירת דיווח SBAR מובנה לרופא/אחות בכירה.</li>
            </ul>
          </div>

          <!-- Card 2: Assessment vs Intervention -->
          <div class="briefing-card">
            <div class="briefing-card-step-badge">02</div>
            <h3>🎯 פענוח שאלת הבוחן (מלכודת הניקוד)</h3>
            <p style="font-size:0.88rem; color:#cbd5e1; line-height:1.5;">
              הבוחנים עובדים עם מחוון סגור. אם הבוחן שואל <em>"מה האומדנים שתבצעי?"</em> ואת עונה <em>"אתן בולוס סליין ואעלה PEEP"</em> — <strong>קיבלת 0 נקודות על השאלה!</strong>
            </p>
            <div style="background:#090d16; padding:0.75rem; border-radius:6px; font-size:0.84rem; display:flex; flex-direction:column; gap:0.4rem; margin-top:0.5rem;">
              <div><strong style="color:#38bdf8;">אומדן (Assessment):</strong> רק איסוף מידע! הסתכלות, האזנה, מישוש, סקאלות (GCS/RASS/CAM-ICU), ניטור, בדיקות עזר.</div>
              <div><strong style="color:#34d399;">התערבות/פעולה (Action):</strong> טיטרציה תרופתית, בולוס, שינוי מנח, סקשן, שינוי פרמטרים במנשם.</div>
            </div>
          </div>

          <!-- Card 3: The 3-Step Actor Station -->
          <div class="briefing-card">
            <div class="briefing-card-step-badge">03</div>
            <h3>🎭 תחנת שחקן: שיטת 3 השלבים</h3>
            <ul class="step-timeline-list">
              <li><strong>שלב 1: לפני (Pre-encounter):</strong> קריאת תרחיש הדלת, הבנת מטרת השיחה, הבאת כיסא לישיבה בגובה העיניים, טישו זמין, ויסות נשימה.</li>
              <li><strong>שלב 2: במהלך (Encounter):</strong> הצגה עצמית, אימות מה המשפחה כבר יודעת, שימוש במודל <strong>NURSE</strong>, שתיקה מכילה בזמן בכי, פירוק אשליית המנשם/דופק.</li>
              <li><strong>שלב 3: סגירה (Post-encounter):</strong> בדיקת הבנה עדינה (Teach-back), הצגת גורמי תמיכה (עו\"ס), ודיווח SBAR מתועד.</li>
            </ul>
          </div>

          <!-- Card 4: The Simulator Nuances -->
          <div class="briefing-card">
            <div class="briefing-card-step-badge">04</div>
            <h3>🤖 מגבלות הבובה וכללי מסר</h3>
            <ul class="step-timeline-list">
              <li><strong>הבוחן אינו מתערב:</strong> הבוחן יושב בצד עם טאבלט ופני פוקר. אל תצפי לאישור או הנהון. פעלי בביטחון.</li>
              <li><strong>דברי בקול רם (Think Aloud):</strong> הבובה אינה יכולה למצמץ או להתלונן על כאב; כל פעולה שלא נאמרת בקול ("אני מאזינה לריאות", "אני בודקת לחץ Cuff במנומטר") — <em>לא קיימת עבור הבוחן!</em></li>
              <li><strong>בקשת נתונים מהמפעיל:</strong> מעבדות, צילום חזה, או גזים יש לבקש בצורה מפורשת: "אני שולחת כעת גזים עורקיים סטט ומבקשת תוצאה".</li>
            </ul>
          </div>
        </div>

        <!-- Downloadable Pocket Guides Section -->
        <div style="background:#0f172a; border:1px solid #1e293b; border-radius:12px; padding:1.5rem;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem;">
            <div>
              <h3 style="font-size:1.25rem; color:#fff;">📋 כרטיסיות כיס להדפסה ושינון (Pocket Guides)</h3>
              <p style="font-size:0.85rem; color:#94a3b8;">תרשימי זרימה קומפקטיים שתוכלי להדפיס או לשמור כ-PDF לחזרה מהירה לפני המבחן</p>
            </div>
            <button class="btn-primary" onclick="window.print()">הדפס כרטיסיות כיס 🖨️</button>
          </div>

          <div style="display:grid; grid-template-columns:1fr 1fr; gap:1.25rem;">
            <!-- Pocket Guide 1 -->
            <div style="background:#090d16; border:1px solid #334155; border-radius:8px; padding:1.25rem;">
              <h4 style="color:#38bdf8; font-size:1rem; margin-bottom:0.5rem;">תרשים 1: עץ פעולות ABCDE בטיפול נמרץ</h4>
              <div style="font-size:0.82rem; color:#cbd5e1; line-height:1.6;">
                <p><strong>A (Airway):</strong> מיקום טובוס בשפה (21-23 ס\"מ) + לחץ Cuff במנומטר (20-30 cmH2O) + שלילת חסימה ב-DOPE.</p>
                <p><strong>B (Breathing):</strong> האזנה דו-צדדית + לחצי מנשם (Ppeak < 35, Pplat < 30) + יחס PaO2/FiO2 + הימנעות מוולוטראומה (Vt 6ml/kg ב-ARDS).</p>
                <p><strong>C (Circulation):</strong> דופק ומקצב + ליין עורקי מכויל + יעד MAP ≥ 65 + נוראדרנלין קו 1 + הימנעות מנוזלים בשוק קרדיוגני!</p>
                <p><strong>D (Disability):</strong> אישונים + RASS / סקאלת כאב CPOT/BPS + חום ליבה וסוכר.</p>
                <p><strong>E (Exposure/Eval):</strong> בדיקת נקזים, שתן שפכי, תרביות דם, לקטט חוזר תוך שעתיים.</p>
              </div>
            </div>

            <!-- Pocket Guide 2 -->
            <div style="background:#090d16; border:1px solid #334155; border-radius:8px; padding:1.25rem;">
              <h4 style="color:#34d399; font-size:1rem; margin-bottom:0.5rem;">תרשים 2: צ'ק-ליסט תחנת שחקן (לפני-במהלך-אחרי)</h4>
              <div style="font-size:0.82rem; color:#cbd5e1; line-height:1.6;">
                <p><strong>1. לפני (1 דקה):</strong> תרחיש דלת, מטרת שיחה, סידור כיסאות, טישו, ויסות עצמי.</p>
                <p><strong>2. במהלך (6 דקות):</strong> הצגה עצמית ("אני רבקה האחות"), בדיקת מה המשפחה יודעת, מודל NURSE (Naming, Understanding, Respecting, Supporting, Exploring), פירוק אשליית המנשם, שתיקה בזמן בכי.</p>
                <p><strong>3. אחרי (1 דקה):</strong> שאלת Teach-back ("מה הכי מדאיג אותך כעת?"), גיוס עו\"ס/גורמי תמיכה, דיווח SBAR מובנה לצוות.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

window.briefingManager = new BriefingManager();
