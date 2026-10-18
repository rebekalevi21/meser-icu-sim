// MESER ICU MASTER - Protocols & Interactive Clinical Calculators View
class ProtocolsViewManager {
  constructor() {
    this.activeSection = 'brain_death'; // 'brain_death', 'shock_table', 'abg_calc', 'drug_titration'
  }

  init() {
    this.render();
  }

  setSection(sectionId) {
    this.activeSection = sectionId;
    this.render();
  }

  render() {
    const container = document.getElementById('protocols-content-area');
    if (!container) return;

    container.innerHTML = `
      <div class="protocol-grid">
        <!-- Sidebar Navigation -->
        <div class="protocol-sidebar">
          <div style="font-size:0.75rem; color:#94a3b8; font-weight:700; text-transform:uppercase; margin-bottom:0.5rem;">
            מאגר פרוטוקולים מבוסס Morton 12
          </div>
          <button class="protocol-nav-btn ${this.activeSection === 'brain_death' ? 'active' : ''}" onclick="window.protocolsView.setSection('brain_death')">
            <span>⚖️</span> <span>חוק מוות מוחי-נשימתי (2008)</span>
          </button>
          <button class="protocol-nav-btn ${this.activeSection === 'shock_table' ? 'active' : ''}" onclick="window.protocolsView.setSection('shock_table')">
            <span>📊</span> <span>טבלת השוואת סוגי הלם (Shock)</span>
          </button>
          <button class="protocol-nav-btn ${this.activeSection === 'abg_calc' ? 'active' : ''}" onclick="window.protocolsView.setSection('abg_calc')">
            <span>🧪</span> <span>מחשבון גזים עורקיים (ABG Analyzer)</span>
          </button>
          <button class="protocol-nav-btn ${this.activeSection === 'drug_titration' ? 'active' : ''}" onclick="window.protocolsView.setSection('drug_titration')">
            <span>💉</span> <span>סרגלי טיטרציית תרופות חירום</span>
          </button>
        </div>

        <!-- Main Content Area -->
        <div class="protocol-view-content">
          ${this.renderSectionContent()}
        </div>
      </div>
    `;
  }

  renderSectionContent() {
    const p = window.CLINICAL_PROTOCOLS;

    if (this.activeSection === 'brain_death') {
      return `
        <div>
          <span class="scenario-badge">חוק המדינה & מורטון פרק 29</span>
          <h2 style="font-size:1.4rem; color:#fff; margin:0.5rem 0 1rem 0;">${p.brainDeath.title}</h2>
          
          <!-- Prerequisites -->
          <div style="margin-bottom:1.5rem;">
            <h3 style="font-size:1.1rem; color:#38bdf8; margin-bottom:0.6rem;">1. תנאי סף מקדימים חובה (Prerequisites)</h3>
            <div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(280px, 1fr)); gap:0.75rem;">
              ${p.brainDeath.lawPrerequisites.map(item => `
                <div style="background:#0f172a; border:1px solid #1e293b; border-radius:8px; padding:0.85rem;">
                  <strong style="color:#fff; font-size:0.9rem;">${item.name}</strong>
                  <p style="font-size:0.82rem; color:#94a3b8; margin-top:0.3rem;">${item.detail}</p>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Committee -->
          <div style="margin-bottom:1.5rem;">
            <h3 style="font-size:1.1rem; color:#38bdf8; margin-bottom:0.6rem;">2. הרכב הוועדה המוסמכת (חוק ישראלי)</h3>
            <div style="background:#090d16; border:1px solid #1e3a8a; border-radius:8px; padding:1rem; display:flex; flex-direction:column; gap:0.6rem; font-size:0.88rem;">
              ${p.brainDeath.committeeComposition.map(c => `
                <div style="display:flex; justify-content:space-between; border-bottom:1px solid rgba(255,255,255,0.05); padding-bottom:0.4rem;">
                  <strong style="color:#a5b4fc;">${c.role}:</strong>
                  <span style="color:#e2e8f0;">${c.specialty}</span>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Brainstem Reflexes -->
          <div style="margin-bottom:1.5rem;">
            <h3 style="font-size:1.1rem; color:#38bdf8; margin-bottom:0.6rem;">3. חמשת רפלקסי גזע המוח (Brainstem Reflexes)</h3>
            <table class="comparison-table">
              <thead>
                <tr><th>רפלקס</th><th>שיטת הבדיקה</th><th>ממצא קובע</th></tr>
              </thead>
              <tbody>
                ${p.brainDeath.brainstemReflexes.map(r => `
                  <tr>
                    <td><strong>${r.name}</strong></td>
                    <td>${r.method}</td>
                    <td style="color:#f87171;">היעדר תגובה מוחלט</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>

          <!-- Apnea & Ancillary -->
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:1.25rem;">
            <div style="background:#0f172a; border:1px solid #1e293b; border-radius:8px; padding:1rem;">
              <h4 style="color:#f59e0b; font-size:0.95rem; margin-bottom:0.5rem;">מבחן דום נשימה (Apnea Test)</h4>
              <ul style="font-size:0.82rem; color:#cbd5e1; list-style:none; display:flex; flex-direction:column; gap:0.4rem;">
                ${p.brainDeath.apneaTest.steps.map(s => `<li>• ${s}</li>`).join('')}
              </ul>
            </div>

            <div style="background:#0f172a; border:1px solid #1e293b; border-radius:8px; padding:1rem;">
              <h4 style="color:#10b981; font-size:0.95rem; margin-bottom:0.5rem;">בדיקה מכשירית מאששת (חובה בישראל)</h4>
              <p style="font-size:0.82rem; color:#94a3b8; margin-bottom:0.5rem;">${p.brainDeath.ancillaryTests.description}</p>
              <ul style="font-size:0.82rem; color:#cbd5e1; list-style:none; display:flex; flex-direction:column; gap:0.4rem;">
                ${p.brainDeath.ancillaryTests.options.map(o => `<li>✓ ${o}</li>`).join('')}
              </ul>
            </div>
          </div>
        </div>
      `;
    }

    if (this.activeSection === 'shock_table') {
      return `
        <div>
          <span class="scenario-badge">המודינמיקה קלינית • Morton Ch. 38</span>
          <h2 style="font-size:1.4rem; color:#fff; margin:0.5rem 0 0.5rem 0;">טבלת השוואת סוגי הלם (Differential Shock Matrix)</h2>
          <p style="font-size:0.88rem; color:#94a3b8; margin-bottom:1rem;">
            בחינת מ.ס.ר דורשת אבחנה מבדלת מיידית לפי Preload, Afterload, ותפוקת לב עוד לפני שתוצאות מעבדה מגיעות!
          </p>

          <table class="comparison-table">
            <thead>
              <tr>
                <th>סוג ההלם</th>
                <th>Cardiac Output (CO)</th>
                <th>Preload (CVP/PAOP)</th>
                <th>Afterload (SVR)</th>
                <th>SvO2</th>
                <th>עור ומראה קליני</th>
                <th>קו טיפול ראשון (Morton 12)</th>
              </tr>
            </thead>
            <tbody>
              ${p.shockComparison.map(s => `
                <tr>
                  <td><strong>${s.type}</strong></td>
                  <td style="font-family:var(--font-mono);">${s.co}</td>
                  <td style="font-family:var(--font-mono);">${s.preload}</td>
                  <td style="font-family:var(--font-mono);">${s.afterload}</td>
                  <td style="font-family:var(--font-mono);">${s.svo2}</td>
                  <td>${s.skin}</td>
                  <td style="color:#38bdf8; font-weight:600;">${s.firstLine}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `;
    }

    if (this.activeSection === 'abg_calc') {
      return `
        <div style="display:flex; flex-direction:column; gap:1.25rem;">
          <div>
            <span class="scenario-badge">מחשבון אינטראקטיבי • Morton Ch. 19</span>
            <h2 style="font-size:1.4rem; color:#fff; margin:0.5rem 0 0.25rem 0;">מפענח גזים עורקיים וחמצת/בסיס (ABG Analyzer)</h2>
            <p style="font-size:0.88rem; color:#94a3b8;">הזיני את ערכי הגזים שהתקבלו בתחנה וקבלי אבחנה מדויקת ורציונל קליני לפי מורטון.</p>
          </div>

          <div class="abg-calc-card">
            <div class="abg-inputs-grid">
              <div class="abg-input-group">
                <label>pH (תקין 7.35 - 7.45):</label>
                <input id="calc-ph" type="number" step="0.01" value="7.24" class="abg-input" oninput="window.protocolsView.calculateAbg()">
              </div>
              <div class="abg-input-group">
                <label>PaCO2 (תקין 35 - 45 mmHg):</label>
                <input id="calc-paco2" type="number" step="1" value="31" class="abg-input" oninput="window.protocolsView.calculateAbg()">
              </div>
              <div class="abg-input-group">
                <label>HCO3 (תקין 22 - 26 mEq/L):</label>
                <input id="calc-hco3" type="number" step="0.5" value="13.5" class="abg-input" oninput="window.protocolsView.calculateAbg()">
              </div>
            </div>

            <div id="abg-result-box" class="abg-result-banner">
              <!-- Rendered via calculateAbg -->
            </div>
          </div>

          <div style="background:#0f172a; border:1px solid #1e293b; border-radius:8px; padding:1.25rem;">
            <h4 style="color:#38bdf8; font-size:0.95rem; margin-bottom:0.5rem;">עקרונות הפיצוי במורטון 12:</h4>
            <ul style="font-size:0.85rem; color:#cbd5e1; list-style:none; display:flex; flex-direction:column; gap:0.4rem;">
              ${p.abgReference.rules.map(r => `<li>• ${r}</li>`).join('')}
            </ul>
          </div>
        </div>
      `;
    }

    if (this.activeSection === 'drug_titration') {
      return `
        <div style="display:flex; flex-direction:column; gap:1.5rem;">
          <div>
            <span class="scenario-badge">פרמקולוגיה וטיטרציה בטיפול נמרץ</span>
            <h2 style="font-size:1.4rem; color:#fff; margin:0.5rem 0 0.25rem 0;">סרגלי טיטרציית תרופות חירום (Emergency Drug Sliders)</h2>
            <p style="font-size:0.88rem; color:#94a3b8;">התאמת מינונים, רצפטורים אדרנרגיים ונקודות סיעודיות קריטיות.</p>
          </div>

          <div style="display:grid; grid-template-columns:1fr 1fr; gap:1.25rem;">
            ${p.emergencyDrugs.map((drug, idx) => `
              <div class="drug-titration-box">
                <div style="display:flex; justify-content:space-between; align-items:center;">
                  <strong style="color:#38bdf8; font-size:1rem;">${drug.name}</strong>
                  <span style="font-size:0.75rem; background:rgba(255,255,255,0.05); padding:2px 8px; border-radius:4px; color:#cbd5e1;">${drug.doseRange}</span>
                </div>
                <div style="font-size:0.84rem; color:#e2e8f0;"><strong>אינדיקציה:</strong> ${drug.indication}</div>
                <div style="font-size:0.82rem; color:#a5b4fc;"><strong>רצפטורים:</strong> ${drug.receptors}</div>
                <div style="font-size:0.82rem; color:#34d399;"><strong>יעד קליני:</strong> ${drug.target}</div>
                
                <div style="background:rgba(0,0,0,0.3); border-right:3px solid #f59e0b; padding:0.6rem; border-radius:4px; font-size:0.8rem; color:#fde68a;">
                  ⚠️ <strong>דגש סיעודי:</strong> ${drug.nursingPoints}
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    return '';
  }

  calculateAbg() {
    const phEl = document.getElementById('calc-ph');
    const paco2El = document.getElementById('calc-paco2');
    const hco3El = document.getElementById('calc-hco3');
    const resBox = document.getElementById('abg-result-box');
    if (!phEl || !paco2El || !hco3El || !resBox) return;

    const ph = parseFloat(phEl.value);
    const paco2 = parseFloat(paco2El.value);
    const hco3 = parseFloat(hco3El.value);

    let primary = '';
    let compensation = '';
    let clinicalAction = '';

    if (ph < 7.35) {
      // Acidosis
      if (paco2 > 45 && hco3 < 22) {
        primary = 'חמצת מעורבת: נשימתית ומטבולית (Mixed Respiratory & Metabolic Acidosis)';
        compensation = 'אין פיצוי – שני המנגנונים תורמים לחמצת (כשל נשימתי + היפופרפוזיה/דום לב).';
        clinicalAction = 'אינטובציה והנשמה דחופה + החייאת נוזלים / תיקון פרפוזיה.';
      } else if (paco2 > 45) {
        primary = 'חמצת נשימתית (Respiratory Acidosis)';
        compensation = hco3 > 26 ? 'פיצוי מטבולי חלקי (כלייתי)' : 'חריף (ללא פיצוי כליות)';
        clinicalAction = 'העלאת Minute Ventilation במנשם (העלאת קצב או נפח), בדיקת סקשן ושלילת DOPE.';
      } else if (hco3 < 22) {
        primary = 'חמצת מטבולית (Metabolic Acidosis)';
        compensation = paco2 < 35 ? 'פיצוי נשימתי חלקי (היפרוונטילציה לפליטת CO2)' : 'ללא פיצוי נשימתי';
        clinicalAction = 'בירור Anion Gap (לקטט, ספסיס, DKA, רעילות), החייאת נוזלים מאוזנת ונוראדרנלין.';
      }
    } else if (ph > 7.45) {
      // Alkalosis
      if (paco2 < 35) {
        primary = 'בססת נשימתית (Respiratory Alkalosis)';
        compensation = hco3 < 22 ? 'פיצוי כלייתי חלקי' : 'חריפה (Uncompensated)';
        clinicalAction = 'טיפול בכאב/חרדה, הפחתת קצב הנשמה עודף במנשם.';
      } else if (hco3 > 26) {
        primary = 'בססת מטבולית (Metabolic Alkalosis)';
        compensation = paco2 > 45 ? 'פיצוי נשימתי (היפוונטילציה)' : 'ללא פיצוי';
        clinicalAction = 'החזרת נוזלים ומלחים (כלוריד), תיקון היפוקלמיה.';
      }
    } else {
      primary = 'pH בטווח התקין (7.35 - 7.45)';
      if (paco2 !== 40 && hco3 !== 24) {
        compensation = 'פיצוי מלא (Fully Compensated Acid-Base Disturbance)';
        clinicalAction = 'ניטור רציף וזיהוי הגורם הראשוני שגרם להפרעה.';
      } else {
        compensation = 'מאזן חמצה-בסיס תקין לחלוטין.';
        clinicalAction = 'המשך מעקב שגרתי.';
      }
    }

    resBox.innerHTML = `
      <div style="font-size:1.1rem; font-weight:800; color:#38bdf8; margin-bottom:0.4rem;">
        🩺 אבחנה: ${primary}
      </div>
      <div style="font-size:0.9rem; color:#f8fafc; margin-bottom:0.4rem;">
        <strong>מצב פיצוי:</strong> ${compensation}
      </div>
      <div style="font-size:0.85rem; color:#a7f3d0; background:rgba(16,185,129,0.1); padding:0.5rem; border-radius:4px; border:1px solid rgba(16,185,129,0.2);">
        🎯 <strong>פעולה קלינית נדרשת במסר:</strong> ${clinicalAction}
      </div>
    `;
  }
}

window.protocolsView = new ProtocolsViewManager();
