// MESER ICU MASTER - Clinical Station Simulator Engine
class ICUSimulatorEngine {
  constructor() {
    this.currentScenarioIndex = 0;
    this.stage = 'door'; // 'door', 'active', 'sbar', 'debrief'
    this.doorTimer = 60;
    this.doorTimerInterval = null;
    this.stationTimer = 720; // 12 minutes
    this.stationTimerInterval = null;

    this.executedActionIds = new Set();
    this.operatorLog = [];
    this.score = 0;
    this.criticalErrors = [];
    this.sbarReport = { s: '', b: '', a: '', r: '' };
  }

  getScenario() {
    return window.CLINICAL_SCENARIOS[this.currentScenarioIndex];
  }

  init() {
    this.loadScenario(0);
  }

  loadScenario(index) {
    this.currentScenarioIndex = index;
    const sc = this.getScenario();
    this.stage = 'door';
    this.doorTimer = 60;
    this.stationTimer = sc.timeLimit || 720;
    this.executedActionIds.clear();
    this.operatorLog = [];
    this.score = 0;
    this.criticalErrors = [];

    // Clear timers
    if (this.doorTimerInterval) clearInterval(this.doorTimerInterval);
    if (this.stationTimerInterval) clearInterval(this.stationTimerInterval);

    // Initialize monitor with initial vitals
    if (window.icuMonitor) {
      window.icuMonitor.updateVitals(sc.initialVitals);
    }

    this.renderDoorChart();
    this.renderSimulatorInterface();
    this.startDoorTimer();
  }

  startDoorTimer() {
    const el = document.getElementById('door-timer-num');
    this.doorTimerInterval = setInterval(() => {
      this.doorTimer--;
      if (el) el.textContent = this.doorTimer;
      if (this.doorTimer <= 0) {
        clearInterval(this.doorTimerInterval);
        this.enterRoom();
      }
    }, 1000);
  }

  renderDoorChart() {
    const sc = this.getScenario();
    const overlay = document.getElementById('door-chart-modal');
    if (!overlay) return;

    overlay.style.display = 'flex';
    overlay.innerHTML = `
      <div class="door-chart-card">
        <div class="door-chart-header">
          <h3>📋 דף מקרה מחוץ לתחנה (Door Chart)</h3>
          <div class="door-countdown-circle">
            <span id="door-timer-num">${this.doorTimer}</span>
          </div>
        </div>
        <div class="door-chart-body">
          <div class="scenario-badge" style="width:fit-content;">${sc.category} • ${sc.title}</div>
          <table class="patient-info-table">
            <tr>
              <td>שם ופרטי מטופל:</td>
              <td><strong>${sc.doorChart.patientName}</strong>, גיל ${sc.doorChart.age} (${sc.doorChart.department})</td>
            </tr>
            <tr>
              <td>יום אשפוז וסיבה:</td>
              <td>${sc.doorChart.admissionDay} — ${sc.doorChart.admissionReason}</td>
            </tr>
            <tr>
              <td>הקשר משמרת ודיווח:</td>
              <td>${sc.doorChart.shiftContext}</td>
            </tr>
          </table>

          <div class="door-alert-box">
            🚨 <strong>טריגר כניסה לתחנה:</strong> ${sc.doorChart.triggerEvent}
          </div>

          <div style="font-size:0.85rem; color:#94a3b8; line-height:1.4;">
            💡 <strong>הוראות הבוחן במסר:</strong> יש לך 60 שניות לקריאת המקרה. עם סיום הטיימר או בלחיצה על 'היכנס לתחנה', תופעל תחנת הטיפול הנמרץ ל-12 דקות עם מוניטור חי, עץ החלטות קליני ודרישת דיווח SBAR בסיום.
          </div>
        </div>
        <div class="door-chart-footer">
          <span style="font-size:0.85rem; color:#64748b;">ספר מנחה: Morton 12th Ed.</span>
          <button class="btn-primary" onclick="window.icuSimulator.enterRoom()">היכנס לתחנה כעת (הפעל 12 דקות) ←</button>
        </div>
      </div>
    `;
  }

  enterRoom() {
    if (this.doorTimerInterval) clearInterval(this.doorTimerInterval);
    const overlay = document.getElementById('door-chart-modal');
    if (overlay) overlay.style.display = 'none';

    this.stage = 'active';
    this.logOperatorEvent("נכנסת לחדר הטיפול הנמרץ. המוניטור והמנשם פועלים. זמן התחנה החל.", 'operator');

    if (window.icuAudio) {
      window.icuAudio.init();
    }

    this.startStationTimer();
    this.renderSimulatorInterface();
  }

  startStationTimer() {
    const digitsEl = document.getElementById('station-timer-digits');
    this.stationTimerInterval = setInterval(() => {
      this.stationTimer--;
      const mins = Math.floor(this.stationTimer / 60);
      const secs = this.stationTimer % 60;
      const str = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;

      if (digitsEl) {
        digitsEl.textContent = str;
        if (this.stationTimer <= 120 && this.stationTimer > 60) {
          digitsEl.className = 'timer-digits warning';
        } else if (this.stationTimer <= 60) {
          digitsEl.className = 'timer-digits critical';
        }
      }

      // 2 Minute Alert
      if (this.stationTimer === 120) {
        this.logOperatorEvent("⚠️ שתי דקות לסיום התחנה – נא להיערך למסירת דיווח SBAR!", 'red-flag');
        if (window.icuAudio) window.icuAudio.playTwoMinuteWarning();
      }

      // Station Time Out
      if (this.stationTimer <= 0) {
        clearInterval(this.stationTimerInterval);
        this.openSbarModal();
      }
    }, 1000);
  }

  logOperatorEvent(text, type = 'operator') {
    const timeStr = new Date().toLocaleTimeString('he-IL', { minute: '2-digit', second: '2-digit' });
    this.operatorLog.unshift({ time: timeStr, text, type });
    this.renderFeed();
  }

  renderFeed() {
    const feed = document.getElementById('operator-feed-box');
    if (!feed) return;
    feed.innerHTML = this.operatorLog.map(item => `
      <div class="feed-item">
        <span class="feed-time">[${item.time}]</span>
        <span class="feed-text ${item.type}">${item.text}</span>
      </div>
    `).join('');
  }

  executeAction(actionId) {
    if (this.executedActionIds.has(actionId)) return;
    const sc = this.getScenario();
    const action = sc.actions.find(a => a.id === actionId);
    if (!action) return;

    this.executedActionIds.add(actionId);

    if (action.isRedFlag) {
      this.criticalErrors.push(action);
      this.score += action.points; // negative points
      this.logOperatorEvent(`🚫 שגיאה פוסלת! ${action.response}`, 'red-flag');
      if (window.icuAudio) window.icuAudio.playAlarm();
    } else {
      this.score += action.points;
      this.logOperatorEvent(`✓ ${action.response}`, 'success');
    }

    // Apply vitals updates to live monitor
    if (action.vitalsDelta && window.icuMonitor) {
      window.icuMonitor.updateVitals(action.vitalsDelta);
    }

    this.renderSimulatorInterface();
  }

  renderSimulatorInterface() {
    const sc = this.getScenario();
    const actionsContainer = document.getElementById('actions-container');
    const labsContainer = document.getElementById('labs-container');

    // Update Scenario Title & Badge
    const titleEl = document.getElementById('station-scenario-title');
    const badgeEl = document.getElementById('station-scenario-badge');
    if (titleEl) titleEl.textContent = sc.title;
    if (badgeEl) badgeEl.textContent = sc.category;

    // Render Actions Grouped by Category
    if (actionsContainer) {
      const categories = ['A - Airway', 'B - Breathing', 'C - Circulation', 'D - Diagnostics', 'E - Evaluation'];
      const actionsByCategory = {};
      sc.actions.forEach(a => {
        const cat = a.category.split('/')[0].trim();
        if (!actionsByCategory[cat]) actionsByCategory[cat] = [];
        actionsByCategory[cat].push(a);
      });

      actionsContainer.innerHTML = Object.keys(actionsByCategory).map(catName => `
        <div style="margin-bottom:1rem;">
          <div class="actions-category-title">
            <span>🔹</span> <span>${catName}</span>
          </div>
          <div class="actions-button-grid">
            ${actionsByCategory[catName].map(act => {
              const isExecuted = this.executedActionIds.has(act.id);
              let btnClass = 'action-btn';
              if (isExecuted) {
                btnClass += act.isRedFlag ? ' red-flag-hit executed' : ' executed';
              }
              return `
                <button class="${btnClass}" onclick="window.icuSimulator.executeAction('${act.id}')" ${isExecuted ? 'disabled' : ''}>
                  <span>${act.name}</span>
                  <span>${isExecuted ? (act.isRedFlag ? '✗' : '✓') : '+'}</span>
                </button>
              `;
            }).join('')}
          </div>
        </div>
      `).join('');
    }

    // Render Labs & Diagnostics Tab
    if (labsContainer && sc.initialLabs) {
      labsContainer.innerHTML = `
        <div class="lab-card">
          <div class="lab-title">
            <span>גזים עורקיים (Arterial Blood Gas - ABG)</span>
            <span class="morton-tag">Morton Ch. 19</span>
          </div>
          <table class="lab-table">
            <tr><th>מדד</th><th>ערך נמדד</th><th>טווח נורמלי</th></tr>
            <tr><td>pH</td><td class="val-critical">${sc.initialLabs.abg.ph}</td><td>7.35 - 7.45</td></tr>
            <tr><td>PaCO2</td><td class="val-abnormal-low">${sc.initialLabs.abg.paco2}</td><td>35 - 45 mmHg</td></tr>
            <tr><td>PaO2</td><td>${sc.initialLabs.abg.pao2}</td><td>80 - 100 mmHg</td></tr>
            <tr><td>HCO3</td><td class="val-abnormal-low">${sc.initialLabs.abg.hco3}</td><td>22 - 26 mEq/L</td></tr>
            <tr><td>Lactate</td><td class="val-critical">${sc.initialLabs.abg.lactate}</td><td>0.5 - 1.6 mmol/L</td></tr>
          </table>
          <div style="margin-top:0.6rem; font-size:0.8rem; color:#38bdf8; background:rgba(0,0,0,0.4); padding:0.5rem; border-radius:4px;">
            <strong>פענוח מעבדה:</strong> ${sc.initialLabs.abg.interpretation}
          </div>
        </div>

        ${sc.initialLabs.cbc ? `
          <div class="lab-card">
            <div class="lab-title">ספירת דם מלאה (CBC)</div>
            <table class="lab-table">
              <tr><th>בדיקה</th><th>תוצאה</th><th>ערך ייחוס</th></tr>
              <tr><td>WBC</td><td class="val-abnormal-high">${sc.initialLabs.cbc.wbc}</td><td>4.5 - 11.0 K/uL</td></tr>
              <tr><td>Hb</td><td>${sc.initialLabs.cbc.hb}</td><td>12.0 - 16.0 g/dL</td></tr>
              <tr><td>Platelets</td><td class="val-abnormal-low">${sc.initialLabs.cbc.plt}</td><td>150 - 450 K/uL</td></tr>
            </table>
          </div>
        ` : ''}

        ${sc.initialLabs.chem ? `
          <div class="lab-card">
            <div class="lab-title">כימיה ותפקודי כליות</div>
            <table class="lab-table">
              <tr><th>בדיקה</th><th>תוצאה</th><th>ערך ייחוס</th></tr>
              <tr><td>Creatinine</td><td class="val-abnormal-high">${sc.initialLabs.chem.creatinine}</td><td>0.6 - 1.2 mg/dL</td></tr>
              <tr><td>Urea</td><td>${sc.initialLabs.chem.urea}</td><td>15 - 45 mg/dL</td></tr>
              <tr><td>Potassium</td><td>${sc.initialLabs.chem.potassium}</td><td>3.5 - 5.0 mEq/L</td></tr>
            </table>
          </div>
        ` : ''}
      `;
    }

    // Render Ventilator parameters strip
    if (sc.initialVent) {
      document.getElementById('vent-val-mode').textContent = sc.initialVent.mode;
      document.getElementById('vent-val-vt').textContent = sc.initialVent.vt;
      document.getElementById('vent-val-rr').textContent = `${sc.initialVent.rrSet}/${sc.initialVent.rrTotal}`;
      document.getElementById('vent-val-peep').textContent = sc.initialVent.peep;
      document.getElementById('vent-val-fio2').textContent = `${sc.initialVent.fio2}%`;
      document.getElementById('vent-val-ppeak').textContent = sc.initialVent.ppeak;
      document.getElementById('vent-val-pplat').textContent = sc.initialVent.pplat;
    }

    this.renderFeed();
  }

  openSbarModal() {
    const modal = document.getElementById('sbar-submission-modal');
    if (!modal) return;
    modal.style.display = 'flex';
  }

  submitStationSbar() {
    const s = document.getElementById('sim-sbar-s')?.value || '';
    const b = document.getElementById('sim-sbar-b')?.value || '';
    const a = document.getElementById('sim-sbar-a')?.value || '';
    const r = document.getElementById('sim-sbar-r')?.value || '';

    this.sbarReport = { s, b, a, r };
    
    // Add communication points if filled
    if (s.length > 10 && b.length > 10 && a.length > 10 && r.length > 10) {
      this.score += 20;
    }

    const modal = document.getElementById('sbar-submission-modal');
    if (modal) modal.style.display = 'none';

    this.showDebriefingModal();
  }

  showDebriefingModal() {
    const sc = this.getScenario();
    const modal = document.getElementById('debrief-modal');
    if (!modal) return;

    modal.style.display = 'flex';

    // Calculate maximum available points
    const maxPositive = sc.actions.filter(a => !a.isRedFlag).reduce((acc, a) => acc + a.points, 0) + 20; // 20 for sbar
    const finalScore = Math.max(0, Math.min(100, Math.round((this.score / maxPositive) * 100)));

    modal.innerHTML = `
      <div class="modal-content">
        <div class="modal-header">
          <div style="display:flex; align-items:center; gap:0.75rem;">
            <span style="font-size:1.5rem;">🎓</span>
            <div>
              <h3 style="font-size:1.25rem; color:#fff;">דוח משוב ו-Debriefing מבוסס Morton 12</h3>
              <p style="font-size:0.75rem; color:#94a3b8;">${sc.title} • בחינת רישוי מ.ס.ר טיפול נמרץ כללי</p>
            </div>
          </div>
          <button class="btn-outline" onclick="window.icuSimulator.closeDebrief()">סגור ✕</button>
        </div>

        <div class="modal-body">
          <div class="score-summary-banner">
            <div class="score-metric">
              <h4>ציון משוקלל סופי</h4>
              <div class="value" style="color:${finalScore >= 75 ? '#10b981' : (finalScore >= 60 ? '#f59e0b' : '#ef4444')};">
                ${finalScore}
              </div>
            </div>
            <div class="score-metric">
              <h4>פעולות קליניות שבוצעו</h4>
              <div class="value" style="color:#38bdf8;">
                ${this.executedActionIds.size}/${sc.actions.length}
              </div>
            </div>
            <div class="score-metric">
              <h4>טעויות פוסלות (Red Flags)</h4>
              <div class="value" style="color:${this.criticalErrors.length === 0 ? '#10b981' : '#ef4444'};">
                ${this.criticalErrors.length}
              </div>
            </div>
          </div>

          ${this.criticalErrors.length > 0 ? `
            <div style="background:rgba(239,68,68,0.12); border:2px solid #ef4444; border-radius:10px; padding:1.25rem;">
              <h4 style="color:#f87171; font-size:1rem; margin-bottom:0.5rem;">🚨 שגיאות פוסלות שבוצעו בתחנה:</h4>
              <ul style="list-style:none; display:flex; flex-direction:column; gap:0.5rem; font-size:0.88rem; color:#fca5a5;">
                ${this.criticalErrors.map(err => `
                  <li><strong>${err.name}:</strong> ${err.response}</li>
                `).join('')}
              </ul>
            </div>
          ` : `
            <div style="background:rgba(16,185,129,0.12); border:1px solid #10b981; border-radius:10px; padding:1rem; color:#a7f3d0; font-size:0.9rem;">
              🌟 <strong>מצוין!</strong> לא ביצעת אף מלכודת פוסלת (Red Flag). פעלת על פי שיקול דעת קליני בטוח בהתאם ל-Morton.
            </div>
          `}

          <!-- Checklist Rubric Breakdown -->
          <div>
            <h4 style="font-size:1.05rem; color:#fff; margin-bottom:0.75rem;">טופס מחוון הבוחן הרשמי (Official MSR Rubric):</h4>
            <div class="rubric-list">
              ${sc.rubricChecklist.map(item => `
                <div class="rubric-item passed">
                  <div class="rubric-pts green">+${item.maxPts}</div>
                  <div class="rubric-details" style="flex:1;">
                    <h5 style="color:#fff;">${item.title}</h5>
                    <div class="rubric-rationale">
                      <strong>רציונל קליני (Morton 12):</strong> ${item.rationale}
                    </div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- SBAR Comparison -->
          <div style="background:#090d16; border:1px solid #334155; border-radius:10px; padding:1.25rem;">
            <h4 style="font-size:1rem; color:#38bdf8; margin-bottom:0.75rem;">השוואת דיווח ה-SBAR מול דיווח מודל (Gold Standard SBAR):</h4>
            <div style="font-size:0.85rem; line-height:1.6; color:#e2e8f0; display:flex; flex-direction:column; gap:0.5rem;">
              <p><strong style="color:#ef4444;">S:</strong> ${sc.modelSBAR.situation}</p>
              <p><strong style="color:#f59e0b;">B:</strong> ${sc.modelSBAR.background}</p>
              <p><strong style="color:#06b6d4;">A:</strong> ${sc.modelSBAR.assessment}</p>
              <p><strong style="color:#10b981;">R:</strong> ${sc.modelSBAR.recommendation}</p>
            </div>
          </div>
        </div>

        <div class="modal-footer">
          <button class="btn-primary" onclick="window.icuSimulator.loadScenario(window.icuSimulator.currentScenarioIndex)">תרגל תרחיש זה שוב ↺</button>
          <button class="btn-outline" onclick="window.icuSimulator.nextScenario()">תרחיש הבא ←</button>
        </div>
      </div>
    `;
  }

  closeDebrief() {
    const modal = document.getElementById('debrief-modal');
    if (modal) modal.style.display = 'none';
  }

  nextScenario() {
    this.closeDebrief();
    const nextIdx = (this.currentScenarioIndex + 1) % window.CLINICAL_SCENARIOS.length;
    this.loadScenario(nextIdx);
  }
}

window.icuSimulator = new ICUSimulatorEngine();
