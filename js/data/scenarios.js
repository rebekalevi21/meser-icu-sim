// MESER ICU MASTER - Clinical Scenarios Database (Morton 12th Ed. + Nursing School MSR Originals)
window.CLINICAL_SCENARIOS = [
  // 1. Septic Shock
  {
    id: "septic_shock",
    title: "הלם ספטי רפרקטורי וסערת ציטוקינים",
    category: "המודינמיקה וספסיס",
    timeLimit: 720,
    doorChart: {
      patientName: "משה כהן",
      age: 64,
      department: "טיפול נמרץ כללי",
      admissionDay: "יום 3 לאשפוז",
      admissionReason: "לאחר לפרוטומיה דחופה ו-Left Hemicolectomy עקב פרפורציה של הדיברטיקולום ופריטוניטיס צואתי.",
      shiftContext: "את/ה מקבל/ת את המטופל בתחילת משמרת בוקר. האחות היוצאת מדווחת: 'המטופל התחיל להראות ירידה הדרגתית בל\"ד בשעה האחרונה למרות העלאת קצב הנוזלים, החום עלה בפתאומיות ויש ירידה במתן שתן'.",
      triggerEvent: "המוניטור מתריע על תת-לחץ דם קשה (MAP 52 mmHg), טכיקרדיה 128 פעימות לדקה, והאחות מדווחת שהשתן בעל אופי עכור ופחות מ-10 מ\"ל בשעתיים האחרונות."
    },
    initialVitals: { hr: 128, rhythm: 'sinus', abpSys: 74, abpDia: 42, map: 52, spo2: 91, rr: 26, etco2: 29, cvp: 4, temp: 39.2 },
    initialVent: { mode: 'VCV', vt: 460, rrSet: 18, rrTotal: 26, peep: 6, fio2: 45, ppeak: 24, pplat: 19 },
    initialLabs: {
      abg: { ph: "7.24 (חמצת קשה)", paco2: "31 mmHg", pao2: "68 mmHg", hco3: "13.5 mEq/L", be: "-11.2", sao2: "91%", lactate: "5.2 mmol/L (קריטי)", interpretation: "Severe Metabolic Acidosis with elevated Lactate and partial Respiratory Compensation (Morton Ch. 19)" },
      cbc: { wbc: "24.8 K/uL (Band forms 18%)", hb: "9.2 g/dL", plt: "94 K/uL" },
      chem: { creatinine: "2.4 mg/dL", urea: "78 mg/dL", potassium: "5.1 mEq/L" }
    },
    actions: [
      { id: "check_cuff_airway", name: "בדיקת נתיב אוויר, מיקום טובוס ולחץ Cuff במנומטר", category: "A - Airway", points: 10, response: "טובוס מס' 8.0 מעוגן ב-22 ס\"מ בשפה, לחץ Cuff 25 cmH2O (תקין למניעת דליפה ואיסכמיה לקנה).", vitalsDelta: {} },
      { id: "lung_auscultation", name: "האזנה לריאות ובדיקת סימטריה נשימתית", category: "B - Breathing", points: 10, response: "כניסת אוויר שווה וסימטרית דו-צדדית, חרחורים עדינים בבסיסים.", vitalsDelta: {} },
      { id: "increase_fio2", name: "העלאת FiO2 ל-60% לשיפור חמצון מיידי", category: "B - Breathing", points: 5, response: "הועלה ריכוז חמצן ל-60%. הסטורציה עלתה ל-96%.", vitalsDelta: { spo2: 96 } },
      { id: "blood_cultures_stat", name: "לקיחת תרביות דם סטריליות (שני סטים משני אתרים שונים)", category: "C - Circulation", points: 10, response: "נלקחו 2 סטים של תרביות דם מאתרים נפרדים (וריד היקפי + ליין CVC) לפני התחלת אנטיביוטיקה.", vitalsDelta: {} },
      { id: "fluid_resuscitation_balanced", name: "מתן בולוס נוזלים מאוזן 30 ml/kg קריסטלואידים (Plasmalyte / Hartmann)", category: "C - Circulation", points: 15, response: "הוחל בולוס נוזלים. CVP עלה מ-4 ל-8 mmHg. הלחץ הדם עלה קלות ל-82/46 (MAP 58).", vitalsDelta: { cvp: 8, abpSys: 82, abpDia: 46, map: 58 } },
      { id: "start_noradrenaline", name: "התחלת עירוי נוראדרנלין (Levophed) דרך ליין מרכזי וטיטרציה ל-MAP ≥ 65", category: "C - Circulation", points: 20, response: "נוראדרנלין הותחל במינון 0.08 mcg/kg/min וטוטר מעלה ל-0.16. לחץ דם התייצב על 108/64 (MAP 78 mmHg), דופק ירד ל-102.", vitalsDelta: { abpSys: 108, abpDia: 64, map: 78, hr: 102 } },
      { id: "antibiotics_stat", name: "מתן אנטיביוטיקה רחבת טווח דרך הווריד תוך שעה ראשונה (Meropenem + Vancomycin)", category: "C - Circulation", points: 10, response: "האנטיביוטיקה הוזרקה בהתאם לפרוטוקול שעת הזהב (Hour-1 Sepsis Bundle).", vitalsDelta: {} },
      { id: "insert_foley_temp", name: "בדיקת תפוקת שתן שעתית (Urimeter) והורדת חום", category: "D - Disability / Care", points: 5, response: "חובר מד תפוקה מדויק, ניתן אקמול IV 1g. חום גוף ירד ל-38.1C.", vitalsDelta: { temp: 38.1 } },
      { id: "send_repeat_lactate", name: "הזמנת גזים חוזרים ומעקב לקטט שעתית (Lactate Clearance)", category: "E - Evaluation", points: 10, response: "נשלחו גזים חוזרים: לקטט ירד ל-3.6 mmol/L (פינוי לקטט חיובי), pH עלה ל-7.31.", vitalsDelta: { etco2: 34 } },
      { id: "trap_give_hypotonic_fluid", name: "מתן בולוס סליין 0.45% או גלוקוז 5% בלחץ", category: "C - Circulation", isRedFlag: true, points: -15, response: "שגיאה קריטית! מתן נוזל היפוטוני בשוק ספטי מגביר בצקת אינטרסטיציאלית ומחמיר היפונתרמיה ובצקת תאית! (Morton Ch. 38)", vitalsDelta: {} },
      { id: "trap_give_lasix", name: "מתן פוסיד (Furosemide) 40mg IV בגלל מיעוט שתן", category: "C - Circulation", isRedFlag: true, points: -20, response: "שגיאה פוסלת! אסור לתת משתן בנוכחות היפווולמיה ותת-פרפוזיה (Pre-renal AKI). הדבר יגרום לקריסה המודינמית סופנית!", vitalsDelta: { abpSys: 62, abpDia: 32, map: 42, hr: 140 } }
    ],
    rubricChecklist: [
      { id: "sec_safety", title: "בטיחות, זיהוי מטופל והגנה על נתיב אוויר (Cuff & Tube)", maxPts: 15, rationale: "מניעת אובדן נתיב אוויר ואספירציה הינה תנאי בסיסי לפי Morton Ch. 22" },
      { id: "sec_assessment", title: "הערכת ABCDE שיטתית והאזנה דו-צדדית", maxPts: 15, rationale: "זיהוי מהיר של מקור ההידרדרות ללא בזבוז זמן מחוץ לחדר" },
      { id: "sec_bundle", title: "יישום Hour-1 Sepsis Bundle (תרביות, לקטט, אנטיביוטיקה)", maxPts: 25, rationale: "כל שעה של עיכוב באנטיביוטיקה ותרביות מעלה תמותה ב-7.6% (Morton Ch. 38)" },
      { id: "sec_hemodynamics", title: "החייאת נוזלים וטיטרציית נוראדרנלין ל-MAP ≥ 65", maxPts: 25, rationale: "נוראדרנלין הוא ואזופרסור הבחירה הראשון לשוק ספטי לפי Surviving Sepsis & Morton" },
      { id: "sec_sbar", title: "דיווח SBAR ממוקד ותקשורת צוותית", maxPts: 20, rationale: "העברת מקרה חדה, כולל לקטט ראשוני/חוזר ותגובה לטיפול ללא השמטת פרטים" }
    ],
    modelSBAR: {
      situation: "משה כהן, בן 64, מטופל מונשם בפוסט-לפרוטומיה, מפתח הלם ספטי סוער עם היפוטנשן (MAP 52) וחמצת לקטית של 5.2 mmol/L.",
      background: "יום 3 לאחר ניתוח עקב פרפורציה של המעי. היה יציב עד שעת הבוקר שבה עלה חומו ל-39.2C והשתן פסק.",
      assessment: "המטופל בהלם ספטי רפרקטורי עם היפופרפוזיה רקמתית קשה ו-AKI. נלקחו 2 סטים של תרביות דם, ניתן בולוס פלזמליט 30 מ\"ל/ק\"ג, והותחל נוראדרנלין המטוטר כעת ל-0.16 mcg/kg/min עם התייצבות ה-MAP על 78 mmHg. הוחל מתן מרופנם + ונקומיצין.",
      recommendation: "ממליץ על הכנסת ליין עורקי ארטריאלי (A-Line) להמשך ניטור רציף, שקילת החדרת Swan-Ganz / PiCCO להערכת CO ו-SVR, ובדיקת גזים ולקטט חוזרת בעוד שעה."
    }
  },

  // 2. Head Injury / Acute Epidural Hematoma & Cushing's Triad (שחזור מקורי בית ספר לסיעוד)
  {
    id: "head_injury_icp",
    title: "חבלת ראש, דימום אפידורלי וטריאדת קושינג",
    category: "נוירולוגיה וטראומה (שחזור מקורי)",
    timeLimit: 720,
    doorChart: {
      patientName: "ח.א.",
      age: 22,
      department: "טיפול נמרץ כללי",
      admissionDay: "יום 1 לאשפוז",
      admissionReason: "נפילה מקומה 2. איבד הכרה, חזר להכרה במיון ('Lucid Interval') ולאחר מכן הידרדר שוב לישנוניות קשה, כאבי ראש עזים וחולשת צד ימין.",
      shiftContext: "המטופל עבר אינטובציה במיון עקב GCS 8 ונותח דחופה בקרניוטומיה לניקוז המטומה אפידורלית עורקית (Middle Meningeal Artery). הוכנס קתטר ICP תוך-מוחי.",
      triggerEvent: "הרופא המלווה מדווח: 'ב-CT לאחר ניתוח יש בצקת מוחית ניכרת. מד ה-ICP מראה כרגע 30 mmHg (קריטי!). המטופל מזיז גפיים באי-שקט, לחץ הדם מטפס ל-180/115 והדופק צונח ל-59'."
    },
    initialVitals: { hr: 59, rhythm: 'sinus', abpSys: 180, abpDia: 115, map: 136, spo2: 97, rr: 14, etco2: 40, cvp: 8, temp: 37.2 },
    initialVent: { mode: 'VCV', vt: 480, rrSet: 14, rrTotal: 14, peep: 5, fio2: 40, ppeak: 22, pplat: 18 },
    initialLabs: {
      abg: { ph: "7.42", paco2: "40 mmHg", pao2: "95 mmHg", hco3: "25 mEq/L", be: "+0.5", sao2: "97%", lactate: "1.2 mmol/L", interpretation: "Normal ABG at baseline, but PaCO2 40 is suboptimal for severe elevated ICP (Target PaCO2 30-35 mmHg for moderate hyperventilation according to Morton Ch. 28)" },
      cbc: { wbc: "11.2 K/uL", hb: "12.8 g/dL", plt: "210 K/uL" },
      chem: { sodium: "140 mEq/L", potassium: "4.1 mEq/L", osmolarity: "295 mOsm/kg" }
    },
    actions: [
      { id: "head_position_neutral_30", name: "יישור ראש למנח ניטרלי והרמת ראש מיטה ל-30 מעלות", category: "A/B - Positioning", points: 15, response: "הראש יושר למנח ניטרלי, ראש המיטה הועלה ל-30 מעלות, צווארון טראומה שוחרר מלחץ על ורידי הג'וגולר. ניקוז ורידי מוחי השתפר, ICP ירד מ-30 ל-24 mmHg.", vitalsDelta: {} },
      { id: "sedation_propofol_fentanyl", name: "העמקת סדציה (Propofol + Fentanyl) להפחתת דרישה מטבולית מוחית (CMRO2)", category: "C - Sedation", points: 15, response: "פרופופול הועלה וניתן בולוס פנטניל. נעלם אי-השקט, צריכת החמצן המוחית פחתה, ה-ICP ירד ל-19 mmHg.", vitalsDelta: { hr: 64, abpSys: 155, abpDia: 90, map: 111 } },
      { id: "hyperventilation_target_paco2", name: "העלאת קצב הנשמה להיפרוונטילציה מתונה (יעד PaCO2 30-35 mmHg)", category: "B - Breathing", points: 15, response: "קצב הנשמה הועלה ל-18/דקה. PaCO2 ירד ל-33 mmHg, נוצר כיווץ כלי דם מוחי מבוקר, ICP ירד ל-16 mmHg.", vitalsDelta: { rr: 18, etco2: 32 } },
      { id: "osmotic_therapy_mannitol", name: "מתן Mannitol IV 20% (0.5-1 g/kg) תוך ניטור אוסמולריות בדם (< 320 mOsm)", category: "C - Medication", points: 20, response: "מניטול ניתן בעירוי מהיר עם פילטר. מפל אוסמוטי ספח נוזלים מבצקת הרקמה המוחית. ICP ירד ל-13 mmHg.", vitalsDelta: {} },
      { id: "calculate_cpp_target", name: "חישוב לחץ פרפוזיה מוחי CPP = MAP - ICP (יעד CPP 60-70 mmHg)", category: "D - Neuro Calculation", points: 15, response: "חישוב מדויק: MAP = 111, ICP = 13 -> CPP = 98 mmHg (מעל סף האיסכמיה 60-70!).", vitalsDelta: {} },
      { id: "avoid_suctioning_cough", name: "הימנעות מסקשן מיותר, מתן מרככי צואה ושמירה על נורמוטרמיה (36-37°C)", category: "E - Nursing Care", points: 10, response: "נמנע גירוי יאטרוגני המעלה לחץ תוך-גולגולתי, שמירה קפדנית על חום גוף תקין.", vitalsDelta: {} },
      // Fatal Red Flag
      { id: "trap_hypotonic_fluid_neuro", name: "מתן עירוי סליין 0.45% או גלוקוז 5% לחולה עם בצקת מוחית", category: "C - Medication", isRedFlag: true, points: -25, response: "שגיאה פוסלת חמורה ביותר! נוזל היפוטוני נכנס במהירות לתאי המוח, מחמיר בצקת מוחית קטלנית וגורם להרניאציה מוחית (Herniation)! (Morton Ch. 28)", vitalsDelta: { abpSys: 195, abpDia: 120, hr: 48 } }
    ],
    rubricChecklist: [
      { id: "sec_icp_position", title: "מנח ניטרלי, ראש 30 מעלות ושחרור לחץ ורידי צוואר", maxPts: 20, rationale: "מקסום ניקוז ורידי דרך Jugular Veins להורדת ICP (Morton Ch. 28)" },
      { id: "sec_icp_sedation", title: "סדציה עמוקה והפחתת דרישה מטבולית מוחית (CMRO2)", maxPts: 20, rationale: "מניעת קפיצות ICP משיעול ואי שקט" },
      { id: "sec_hyperventilation", title: "היפרוונטילציה מתונה ל-PaCO2 30-35 mmHg (לא מתחת ל-25!)", maxPts: 20, rationale: "ואזוקונסטריקציה מוחית זמנית, אך PaCO2 < 25 יגרום לאיסכמיה מוחית קשה" },
      { id: "sec_osmotic", title: "טיפול אוסמוטי (מניטול / סליין היפרטוני 3%) והגבלת אוסמולריות < 320", maxPts: 20, rationale: "ספיחת בצקת מוחית אינטרסטיציאלית" },
      { id: "sec_cpp", title: "זיהוי טריאדת קושינג וחישוב CPP = MAP - ICP", maxPts: 20, rationale: "Cushing Triad (ברדיקרדיה, יל\"ד עם לחץ דופק רחב ונשימות לא סדירות) מעידה על הרניאציה מתהווה" }
    ],
    modelSBAR: {
      situation: "ח.א. בן 22, לאחר קרניוטומיה דחופה עקב המטומה אפידורלית, פיתח יתר לחץ תוך-גולגולתי חריף (ICP 30) עם טריאדת קושינג (ל\"ד 180/115, דופק 59).",
      background: "חבלת ראש לאחר נפילה מקומה 2 עם Lucid Interval ואישון שמאלי מורחב לפני ניתוח. מונשם ומנוטר ICP.",
      assessment: "בצקת מוחית סוערת עם סכנת הרניאציה. יישמנו מנח ראש ניטרלי 30 מעלות, שחררנו לחץ צווארון, העמקנו סדציה עם פרופופול ופנטניל, העלינו קצב הנשמה ל-PaCO2 של 33 mmHg ונתנו מניטול 20%. ה-ICP ירד ל-13 וה-CPP מחושב כעת על 98 mmHg.",
      recommendation: "ממליץ על ביצוע CT ראש דחוף לווידוא היעדר דימום חוזר באזור הניתוח, בדיקת אוסמולריות וגזים חוזרים בעוד שעה, ושמירה על סדציה עמוקה."
    }
  },

  // 3. Severe Hyperkalemia K+ 7.5 & AKI (שחזור מקורי בית ספר שיינברון איכילוב)
  {
    id: "severe_hyperkalemia",
    title: "היפרקלמיה מסכנת חיים וכשל כלייתי חריף",
    category: "נפרולוגיה ואלקטרוליטים (שחזור שיינברון)",
    timeLimit: 720,
    doorChart: {
      patientName: "שלמה לביא",
      age: 62,
      department: "טיפול נמרץ כללי",
      admissionDay: "יום 1 לאשפוז",
      admissionReason: "אי ספיקת כליות סופנית (ESRD) עם אלח דם אורוספטי, לא עבר דיאליזה 4 ימים עקב חוסר היענות.",
      shiftContext: "התקבל ישנוני עם חולשת שרירים קשה בגפיים, בחילות והקאות. המוניטור מראה גלי T מחודדים וגבוהים (Peaked T waves) והרחבה של מקטע QRS.",
      triggerEvent: "המעבדה מתקשרת בבהילות: 'אשלגן 7.5 mEq/L (קריטי!), קריאטינין 5.0 mg/dL, אוראה 80 mg/dL, וחמצת מטבולית pH 7.30 עם ביקרבונט 18'."
    },
    initialVitals: { hr: 52, rhythm: 'sinus', abpSys: 96, abpDia: 54, map: 68, spo2: 95, rr: 20, etco2: 35, cvp: 10, temp: 36.8 },
    initialVent: { mode: 'Spontaneous/Mask', vt: 0, rrSet: 0, rrTotal: 20, peep: 0, fio2: 30, ppeak: 0, pplat: 0 },
    initialLabs: {
      abg: { ph: "7.30", paco2: "30 mmHg", pao2: "78 mmHg", hco3: "18 mEq/L", be: "-7.0", sao2: "95%", lactate: "2.1 mmol/L", interpretation: "Metabolic Acidosis with partial respiratory compensation (Morton Ch. 34)" },
      chem: { potassium: "7.5 mEq/L (קריטי - סכנת אסיסטולה / VF)", creatinine: "5.0 mg/dL", urea: "80 mg/dL", sodium: "145 mEq/L", glucose: "135 mg/dL" }
    },
    actions: [
      { id: "ecg_stat_hyperkalemia", name: "ביצוע תרשים אק\"ג 12 לידים סטט לזיהוי שינויי הולכה", category: "A/B - Assessment", points: 10, response: "אק\"ג הראה Peaked T waves, הארכת מקטע PR, והרחבת QRS (Sign of impending Sine Wave / VF!).", vitalsDelta: {} },
      { id: "calcium_gluconate_stat", name: "מתן Calcium Gluconate 10% 10-20 ml IV מיידי לייצוב ממברנת שריר הלב", category: "C - Life Saving Drug", points: 25, response: "קלציום גלוקונאט הוזרק תוך 3 דקות. הממברנה התייצבה, מקטע QRS הוצר וה-T wave התמתן. מנענו דום לב!", vitalsDelta: { hr: 62 } },
      { id: "insulin_glucose_shift", name: "מתן Regular Insulin 10 units IV יחד עם 50ml Glucose 50% להכנסת אשלגן לתאים", category: "C - Potassium Shift", points: 20, response: "אינסולין וגלוקוז 50% ניתנו בעירוי. מפלס האשלגן התוך-וסקולרי החל לרדת.", vitalsDelta: {} },
      { id: "salbutamol_nebulizer", name: "מתן אינהלציית ונטולין (Salbutamol 10-20 mg) במינון גבוה", category: "B - Potassium Shift", points: 10, response: "אגוניסט בטא-2 מגרה משאבת Na+/K+ ATPase ומאיץ מעבר אשלגן לתוך התאים.", vitalsDelta: { hr: 74 } },
      { id: "sodium_bicarb_iv", name: "מתן סודיום ביקרבונט 8.4% 50 mEq IV לתיקון החמצת", category: "C - Potassium Shift", points: 10, response: "העלאת pH מקלה על יציאת יוני מימן מהתאים וכניסת אשלגן פנימה.", vitalsDelta: {} },
      { id: "stat_nephrology_dialysis", name: "הזמנת נפרולוג והיערכות דחופה להמודיאליזה / CRRT לסילוק מוחלט של האשלגן", category: "D - Definitive Removal", points: 20, response: "נפרולוג הגיע: הוכנס צנתר דיאליזה (Mahurkar) בווריד פמורלי/ג'וגולרי, המטופל חובר למכונת דיאליזה.", vitalsDelta: { abpSys: 110, abpDia: 68, map: 82 } },
      // Fatal Red Flag
      { id: "trap_give_potassium_fluid", name: "מתן עירוי נוזלי רינגר לקטט (מכיל אשלגן) או עיכוב מתן קלציום", category: "C - Medication", isRedFlag: true, points: -30, response: "שגיאה פוסלת קריטית! רינגר לקטט מכיל אשלגן ויגרום להחמרה מיידית! כמו כן, עיכוב במתן קלציום בהיפרקלמיה 7.5 גורם לדום לב ב-VF!", vitalsDelta: { hr: 32, abpSys: 50, abpDia: 25, map: 33 } }
    ],
    rubricChecklist: [
      { id: "sec_ca_gluconate", title: "מתן קלציום גלוקונאט/כלוריד כקו הגנה ראשון לייצוב ממברנה", maxPts: 30, rationale: "קלציום אינו מוריד אשלגן בדם, אך מגן על המיוציט מפני פרפור חדרים (Morton Ch. 34)" },
      { id: "sec_shift_agents", title: "מתן אינסולין+גלוקוז וונטולין להכנסת אשלגן לתוך התא (Shift)", maxPts: 25, rationale: "מוריד אשלגן בסרום תוך 15-30 דקות באופן זמני" },
      { id: "sec_ecg_monitoring", title: "ניטור אק\"ג רציף וזיהוי Peaked T waves והרחבת QRS", maxPts: 15, rationale: "זיהוי הפרעות קצב קטלניות לפני דום לב" },
      { id: "sec_dialysis_removal", title: "היערכות דחופה להמודיאליזה כפתרון דפיניטיבי לפינוי עודף האשלגן", maxPts: 20, rationale: "באי ספיקת כליות אוליגורית, דיאליזה היא הדרך היחידה להוצאת האשלגן מהגוף" },
      { id: "sec_sbar", title: "דיווח SBAR חד עם ערכי אשלגן, אק\"ג וסדרי עדיפויות", maxPts: 10, rationale: "תקשורת מהירה וברורה להפעלת כונן דיאליזה" }
    ],
    modelSBAR: {
      situation: "שלמה לביא, בן 62, מטופל ESRD עם אורוספסיס, מפתח היפרקלמיה מסכנת חיים של 7.5 mEq/L עם הרחבת QRS וברדיקרדיה באק\"ג.",
      background: "לא עבר דיאליזה 4 ימים עקב חוסר היענות. קריאטינין 5.0 mg/dL ואוראה 80 mg/dL.",
      assessment: "סכנת דום לב מיידי ב-VF עקב היפרקלמיה חמורה. נתנו מיד 10 מ\"ל קלציום גלוקונאט 10% IV עם היצרות מוצלחת של ה-QRS, והתחלנו עירוי אינסולין קצר טווח 10 יחידות עם 50 מ\"ל גלוקוז 50% ואינהלציית ונטולין.",
      recommendation: "דרושה הגעה מיידית של כונן נפרולוגיה וצוות דיאליזה להחדרת צנתר ורידי וביצוע המודיאליזה דחופה, והמשך ניטור אק\"ג רציף."
    }
  },

  // 4. Acute CVA / Ischemic Stroke, BP Management & tPA (שחזור כרטיסיות מורטון 696)
  {
    id: "acute_cva_tpa",
    title: "שבץ מוחי איסכמי חריף, משבר יל\"ד וטיטרציית tPA",
    category: "נוירולוגיה וכלי דם (כרטיסיות מורטון 696)",
    timeLimit: 720,
    doorChart: {
      patientName: "יפה מזרחי",
      age: 68,
      department: "טיפול נמרץ כללי",
      admissionDay: "יום 1 לאשפוז",
      admissionReason: "הופעה פתאומית של המיפלגיה מימין ואפזיה מלאה לפני שעה וחצי (חלון זמן מתאים לטרומבוליזה ב-tPA).",
      shiftContext: "הושלם CT מוח ששלל דימום תוך-גולגולתי (No ICH). שוקלת 80 ק\"ג. לחץ הדם מרקיע שחקים ל-220/116 mmHg, דבר המהווה התווית נגד זמנית למתן tPA עד להורדתו מתחת ל-185/110!",
      triggerEvent: "הנוירולוג דורש: 'הורידו את לחץ הדם מתחת ל-185/110 עם IV Labetalol לפי מורטון עמ' 696, וחשבו את מינון ה-tPA המדויק ל-80 ק\"ג כולל בולוס Push 10%!'."
    },
    initialVitals: { hr: 85, rhythm: 'sinus', abpSys: 220, abpDia: 116, map: 150, spo2: 96, rr: 16, etco2: 38, cvp: 7, temp: 37.1 },
    initialVent: { mode: 'Spontaneous/Mask', vt: 0, rrSet: 0, rrTotal: 16, peep: 0, fio2: 28, ppeak: 0, pplat: 0 },
    initialLabs: {
      abg: { ph: "7.39", paco2: "38 mmHg", pao2: "88 mmHg", hco3: "24 mEq/L", be: "0.0", sao2: "96%", lactate: "1.0 mmol/L", interpretation: "Normal ABG" },
      chem: { glucose: "142 mg/dL (שללנו היפוגליקמיה כמחקה שבץ!)", inr: "1.0 (תקין למתן tPA)", platelets: "240 K/uL" }
    },
    actions: [
      { id: "verify_ct_contraindications", name: "שלילת התוויות נגד מוחלטות (CT ללא דימום, שלילת ניתוח/טראומה לאחרונה, גלוקוז > 50)", category: "A - Screening", points: 15, response: "CT מוח נקי מדימום, גלוקוז 142, טסיות ו-INR תקינים. המכשול היחיד ל-tPA הוא יל\"ד מעל 185/110.", vitalsDelta: {} },
      { id: "iv_labetalol_titration", name: "מתן Labetalol 10-20 mg IV Push איטי להורדת ל\"ד אל מתחת ל-185/110 (Morton 696)", category: "C - Blood Pressure Control", points: 25, response: "לביטלול 20 מ\"ג ניתן באיטיות. לחץ הדם ירד ל-165/90 mmHg (MAP 115). הושג יעד לחץ הדם המאפשר מתן tPA בבטחה!", vitalsDelta: { abpSys: 165, abpDia: 90, map: 115, hr: 76 } },
      { id: "calculate_tpa_dose", name: "חישוב מינון Alteplase (tPA): 0.9 mg/kg (מתוך 80 ק\"ג = 72 מ\"ג סה\"כ)", category: "C - Thrombolytic Dosing", points: 20, response: "חישוב מדויק על פי מורטון: סה\"כ 72 מ\"ג (מקסימום 90 מ\"ג). 10% בולוס (7.2 מ\"ג ב-IV Push תוך דקה), ושאר 64.8 מ\"ג בעירוי רציף תוך 60 דקות.", vitalsDelta: {} },
      { id: "neuro_vital_monitoring", name: "מעקב נוירולוגי צמוד (NIHSS) ולחץ דם כל 15 דקות במהלך העירוי", category: "D - Neuro Monitoring", points: 15, response: "מעקב נוירולוגי הדוק לשלילת דימום תוך-מוחי (ICH complication). לחץ הדם נשמר יציב מתחת ל-180/105.", vitalsDelta: {} },
      { id: "avoid_anticoagulants_24h", name: "הימנעות ממתן הפרין/אספירין ופרוצדורות חודרניות ב-24 השעות הראשונות", category: "E - Post-tPA Safety", points: 15, response: "הוצמד שלט 'אין לתת נוגדי קרישה או לבצע דקירות עורקיות למשך 24 שעות'.", vitalsDelta: {} },
      // Fatal Red Flag
      { id: "trap_give_tpa_high_bp", name: "התחלת עירוי tPA באופן מיידי לפני הורדת לחץ הדם (כאשר ל\"ד 220/116)", category: "C - Thrombolytic Safety", isRedFlag: true, points: -35, response: "שגיאה פוסלת קטלנית! מתן tPA בלחץ דם מעל 185/110 גורם לדימום תוך-גולגולתי מסיבי קטלני (Fatal Intracranial Hemorrhage)! חובה להוריד ל\"ד תחילה עם Labetalol או Nicardipine! (Morton Ch. 29)", vitalsDelta: { hr: 50, abpSys: 235, abpDia: 125, map: 161 } }
    ],
    rubricChecklist: [
      { id: "sec_bp_threshold", title: "הקפדה על סף לחץ דם למתן tPA (מתחת ל-185/110)", maxPts: 30, rationale: "מניעת דימום תוך-מוחי קטלני על פי פרוטוקול מורטון 696 ואיגוד השבץ" },
      { id: "sec_labetalol", title: "שימוש מושכל ב-Labetalol / Nicardipine להורדת ל\"ד מבוקרת", maxPts: 20, rationale: "הורדה מבוקרת ללא צניחה חדה העלולה לפגוע ב-Penumbra האיסכמית" },
      { id: "sec_tpa_calc", title: "חישוב מינון tPA (0.9 mg/kg, 10% בולוס, שאר ב-60 דקות)", maxPts: 25, rationale: "דיוק פרמקולוגי במניעת מינון יתר (מקסימום 90 מ\"ג)" },
      { id: "sec_safety_24h", title: "הימנעות מנוגדי קרישה/טסיות ופרוצדורות חודרניות למשך 24 שעות", maxPts: 15, rationale: "מניעת דימומים יאטרוגניים" },
      { id: "sec_sbar", title: "דיווח SBAR עם פירוט שעת הופעה (Onset) ותגובה לטיפול", maxPts: 10, rationale: "תיעוד זמנים קריטי בחלון הזמן לטרומבוליזה" }
    ],
    modelSBAR: {
      situation: "יפה מזרחי, בת 68, הגיעה עם שבץ איסכמי חריף (המיפלגיה מימין ואפזיה) בתוך חלון הזמנים ל-tPA, עם משבר יל\"ד של 220/116.",
      background: "הופעה לפני שעה וחצי. CT ראש שלל דימום תוך-מוחי, רמת סוכר 142 mg/dL. שוקלת 80 ק\"ג.",
      assessment: "מטופלת מתאימה לטרומבוליזה אך נדרשה הורדת ל\"ד מתחת ל-185/110. נתנו 20 מ\"ג Labetalol IV עם ירידת ל\"ד ל-165/90. חישבנו מינון tPA של 72 מ\"ג (7.2 מ\"ג בולוס IV Push והיתרה ב-60 דקות) והעירוי החל.",
      recommendation: "ניטור נוירולוגי ולחץ דם כל 15 דקות, מוכנות להפסקת העירוי במקרה של כאב ראש פתאומי או הידרדרות, והימנעות מנוגדי קרישה למשך 24 שעות."
    }
  },

  // 5. Acute Pericarditis, Tamponade & Pulsus Paradoxus (שחזור מסמך פריקרדיטיס וטמפונדה)
  {
    id: "pericarditis_tamponade",
    title: "פריקרדיטיס חריפה וטמפונדה לבבית",
    category: "קרדיולוגיה (שחזור מקורי בית ספר)",
    timeLimit: 720,
    doorChart: {
      patientName: "ט.א.",
      age: 38,
      department: "טיפול נמרץ כללי",
      admissionDay: "יום 1 לאשפוז",
      admissionReason: "קוצר נשימה מתגבר מלווה בכאבים פלאוריטיים חדים בחזה המוקלים בישיבה והישענות קדימה, שיעול וחום קל 37.8C.",
      shiftContext: "התקבלה עם עליות ST קעורות דיפוזיות באק\"ג ונשמע שפשוף פריקרדיאלי (Pericardial Friction Rub). כעת החלה הידרדרות חדה: לחץ הדם צונח, ורידי הצוואר תפוחים וקולות הלב מרוחקים.",
      triggerEvent: "לחץ דם צונח ל-85/60, דופק 122, גודש ורידי צוואר בולט (JVD), קולות לב מרוחקים מאוד (טריאדת בק - Beck's Triad!), ונמדד Pulsus Paradoxus של 18 mmHg!"
    },
    initialVitals: { hr: 122, rhythm: 'sinus', abpSys: 85, abpDia: 60, map: 68, spo2: 93, rr: 24, etco2: 30, cvp: 18, temp: 37.6 },
    initialVent: { mode: 'Spontaneous/Mask', vt: 0, rrSet: 0, rrTotal: 24, peep: 0, fio2: 40, ppeak: 0, pplat: 0 },
    initialLabs: {
      abg: { ph: "7.32", paco2: "32 mmHg", pao2: "72 mmHg", hco3: "17 mEq/L", be: "-7.0", sao2: "93%", lactate: "3.4 mmol/L", interpretation: "Metabolic Lactic Acidosis secondary to Obstructive Shock (Morton Ch. 15, 38)" },
      chem: { troponin: "0.04 ng/ml (שלילת אוטם מסיבי)", hb: "11.2 g/dL" }
    },
    actions: [
      { id: "recognize_becks_triad", name: "זיהוי טריאדת בק (Beck's Triad: ל\"ד נמוך + גודש ורידי צוואר + קולות לב מרוחקים)", category: "A/B - Assessment", points: 20, response: "זיהוי מיידי של Beck's Triad ו-Pulsus Paradoxus > 10 mmHg. אבחנה קלינית ברורה: Cardiac Tamponade / Obstructive Shock!", vitalsDelta: {} },
      { id: "stat_bedside_echo_pocus", name: "ביצוע אקו לב דחוף (POCUS) לאישוש קולפס דיאסטולי של חדר/עלייה ימנית", category: "D - Diagnostics", points: 15, response: "אקו לב אישר: תפליט פריקרדיאלי גדול עם קולפס דיאסטולי של חדר ימין (Right Ventricular Diastolic Collapse) והפרעה קשה למילוי הלב.", vitalsDelta: {} },
      { id: "fluid_bolus_preload_tamponade", name: "מתן בולוס נוזלים IV מהיר (500-1000 מ\"ל קריסטלואידים) לשמירה זמנית על Preload", category: "C - Circulation", points: 15, response: "העלאת Preload מסייעת זמנית להתגבר על הלחץ הפריקרדיאלי המכווץ. ל\"ד עלה קלות ל-95/65 (MAP 75).", vitalsDelta: { abpSys: 95, abpDia: 65, map: 75 } },
      { id: "emergency_pericardiocentesis", name: "ביצוע ניקוז פריקרדיאלי דחוף (Emergency Pericardiocentesis) תחת הנחיית סונר", category: "C - Life Saving Procedure", points: 30, response: "החדרת מחט/קתטר סוב-קסיפואידי וניקוז 120 מ\"ל נוזל סרו-דמי. מיד נרשמה הקלה דרמטית: ל\"ד זינק ל-122/78 (MAP 92), דופק ירד ל-88, CVP ירד מ-18 ל-8 mmHg!", vitalsDelta: { abpSys: 122, abpDia: 78, map: 92, hr: 88, cvp: 8, spo2: 98 } },
      { id: "pericarditis_medication", name: "טיפול אנטי-דלקתי לפריקרדיטיס (Colchicine + NSAIDs / אספירין)", category: "E - Medication", points: 10, response: "הותחל קולכיצין ו-NSAIDs להפחתת הדלקת ומניעת הישנות התפליט (Morton Ch. 15).", vitalsDelta: {} },
      // Fatal Red Flag
      { id: "trap_give_diuretics_tamponade", name: "מתן משתנים (Furosemide / Lasix) בגלל גודש ורידי צוואר ו-CVP גבוה", category: "C - Medication", isRedFlag: true, points: -35, response: "שגיאה פוסלת קטלנית! בטמפונדה לבבית, מתן פוסיד מפחית Preload ומביא לקריסה המודינמית מוחלטת ודום לב (PEA Arrest)! אסור לתת משתנים או ואזודילטורים! (Morton Ch. 15)", vitalsDelta: { abpSys: 45, abpDia: 20, map: 28, hr: 145 } }
    ],
    rubricChecklist: [
      { id: "sec_becks_dx", title: "זיהוי מהיר של Beck's Triad ו-Pulsus Paradoxus לטמפונדה לבבית", maxPts: 30, rationale: "טמפונדה היא שוק חסימתי מסכן חיים הדורש אבחון תוך דקות (Morton Ch. 15)" },
      { id: "sec_fluids_not_lasix", title: "הימנעות ממשתנים ומתן נוזלים זמני לשמירה על Preload", maxPts: 25, rationale: "שמירה על לחצי מילוי עד לביצוע ניקוז פריקרדיאלי" },
      { id: "sec_pericardiocentesis", title: "ביצוע או הכנת המטופל לניקוז פריקרדיאלי דחוף (Pericardiocentesis)", maxPts: 25, rationale: "טיפול דפיניטיבי מציל חיים" },
      { id: "sec_anti_inflammatory", title: "התחלת קולכיצין ו-NSAIDs לפריקרדיטיס הבסיסית", maxPts: 10, rationale: "מניעת הישנות תפליט" },
      { id: "sec_sbar", title: "דיווח SBAR מסודר ומדויק", maxPts: 10, rationale: "העברת מקרה עם נתוני אקו וכמויות ניקוז" }
    ],
    modelSBAR: {
      situation: "ט.א. בת 38, התקבלה עם פריקרדיטיס חריפה ופיתחה טמפונדה לבבית סוערת (הלם חסימתי עם MAP 68 וטריאדת בק).",
      background: "התקבלה עקב קוצר נשימה וכאב פלאוריטי עם עליות ST קעורות דיפוזיות. פיתחה ל\"ד נמוך, קולות לב מרוחקים, ורידי צוואר גדושים ופולסוס פרדוקסוס 18 mmHg.",
      assessment: "טמפונדה לבבית מאוששת באקו לב (קולפס דיאסטולי של חדר ימין). נמנענו ממתן משתנים, נתנו בולוס נוזלים לשימור Preload, ובוצע ניקוז פריקרדיאלי דחוף של 120 מ\"ל נוזל עם התייצבות מיידית של ל\"ד ל-122/78 ושיפור המודינמי מלא.",
      recommendation: "מעקב נקז פריקרדיאלי, המשך ניטור המודינמי רציף, והתחלת טיפול בקולכיצין ו-NSAIDs למניעת הישנות."
    }
  },

  // 6. Severe ARDS
  {
    id: "severe_ards",
    title: "כשל נשימתי חריף ו-ARDS סוער",
    category: "הנשמה ומערכת הנשימה",
    timeLimit: 720,
    doorChart: {
      patientName: "רותי לוי",
      age: 58,
      department: "טיפול נמרץ כללי",
      admissionDay: "יום 2 לאשפוז",
      admissionReason: "דלקת ריאות אספירטיבית קשה (Severe Aspiration Pneumonia) לאחר אובדן הכרה בביתה.",
      shiftContext: "הונשמה אתמול, מורדמת ומשותקת עם פרופופול ופנטניל. בשעה האחרונה יש צפצופים חוזרים של אזעקת לחץ שיא גבוה במנשם.",
      triggerEvent: "צניחת סטורציה חדה ל-81%, קצב לב עלה ל-120, לחץ שיא במנשם מרקיע ל-46 cmH2O."
    },
    initialVitals: { hr: 120, rhythm: 'sinus', abpSys: 148, abpDia: 88, map: 108, spo2: 81, rr: 28, etco2: 48, cvp: 12, temp: 38.4 },
    initialVent: { mode: 'VCV', vt: 540, rrSet: 20, rrTotal: 28, peep: 5, fio2: 60, ppeak: 46, pplat: 38 },
    initialLabs: {
      abg: { ph: "7.22", paco2: "56 mmHg", pao2: "52 mmHg (P/F = 86 -> Severe ARDS)", hco3: "21 mEq/L", be: "-4.5", sao2: "81%", lactate: "2.8 mmol/L", interpretation: "Severe Hypoxemic Respiratory Failure, Severe ARDS (PaO2/FiO2 < 100), Elevated Driving Pressure (Morton Ch. 24)" }
    },
    actions: [
      { id: "dope_mnemonic_check", name: "ביצוע שלילת DOPE (Displacement, Obstruction, Pneumothorax, Equipment)", category: "A - Airway", points: 10, response: "טובוס לא זז (21 ס\"מ בשפה). מנותק מהמנשם ומונשם ידנית באמבו - מורגשת התנגדות קשה דו-צדדית.", vitalsDelta: { spo2: 84 } },
      { id: "suction_ett", name: "סקשן עמוק דרך הטובוס בטכניקה סטרילית וסגורה", category: "A - Airway", points: 10, response: "נשאבה כמות מעטה של הפרשות, הקתטר עובר בחופשיות ללא עדות לפקק חוסם.", vitalsDelta: {} },
      { id: "lung_auscultation_ards", name: "האזנה לריאות לשלילת פנאומוטורקס והערכת קומפליאנס", category: "B - Breathing", points: 10, response: "כניסת אוויר ירודה מאוד בשני הצדדים, חרחורים גסים מפושטים, ללא חזה אוויר.", vitalsDelta: {} },
      { id: "ardsnet_lung_protective", name: "החלת פרוטוקול ARDSnet: הורדת נפח מנשם ל-6 ml/kg (400 ml) והעלאת PEEP ל-14 cmH2O", category: "B - Breathing", points: 25, response: "נפח הנשמה הופחת ל-400 מ\"ל, PEEP הועלה ל-14 cmH2O, FiO2 ל-80%. Pplat ירד ל-27 cmH2O (מתחת לרף הסכנה 30!). סטורציה עלתה ל-92%.", vitalsDelta: { spo2: 92, abpSys: 130, abpDia: 78, map: 95 } },
      { id: "deep_sedation_paralysis", name: "וידוא סדציה עמוקה ומתן חוסם עצב-שריר (Cisatracurium) להרפיית סינכרוניה", category: "C - Sedation", points: 15, response: "השגת סדציה עמוקה ומתן NMB. נעלמה הטכיפניאה והמטופלת מסונכרנת לחלוטין עם המנשם.", vitalsDelta: { rr: 20, hr: 104 } },
      { id: "prone_positioning_order", name: "ייזום פרונציה (Prone Positioning Protocol) ל-16 שעות", category: "B - Breathing", points: 15, response: "היערכות הצוות לפרונציה מבוקרת בהתאם לפרוטוקול PROSEVA (Morton Ch. 24).", vitalsDelta: { spo2: 95 } },
      { id: "trap_increase_vt", name: "העלאת נפח הנשמה ל-750 מ\"ל כדי 'לשטוף' את הפד\"ח הגבוה", category: "B - Breathing", isRedFlag: true, points: -25, response: "שגיאה פטאלית! העלאת נפח בריאת ARDS פגועה גורמת לוולוטראומה ובראוטראומה עם סכנת קרע אלבאולרי וחזה אוויר בלחץ! לפי Morton יש לאפשר Permissive Hypercapnia!", vitalsDelta: { spo2: 74, ppeak: 54 } }
    ],
    rubricChecklist: [
      { id: "sec_dope", title: "שימוש באלגוריתם DOPE לשלילת חסימה ופנאומוטורקס", maxPts: 20, rationale: "חובה קלינית ראשונית בכל אזעקת לחץ שיא וצניחת חמצון (Morton Ch. 23)" },
      { id: "sec_lung_protect", title: "יישום הנשמה מגנת ריאה (Low Tidal Volume 6ml/kg + Pplat < 30)", maxPts: 30, rationale: "פרוטוקול ARDSnet הוכח כמוריד תמותה ב-22% ומניעת Biotrauma (Morton Ch. 24)" },
      { id: "sec_peep_titration", title: "טיטרציית PEEP ו-FiO2 למניעת קולפס אלבאולרי", maxPts: 20, rationale: "מניעת אטלקטוטראומה ופתיחת נאדיות מגויסות" },
      { id: "sec_prone", title: "הכרה בצורך בפרונציה מוקדמת ב-Severe ARDS (P/F < 150)", maxPts: 15, rationale: "שיפור יחס V/Q וניקוז הפרשות לפי מחקר PROSEVA המצוטט ב-Morton" },
      { id: "sec_sbar", title: "דיווח SBAR עם פירוט מדדי קומפליאנס ו-P/F ratio", maxPts: 15, rationale: "דיווח מקצועי על יחס P/F, לחץ פלאטו ולחץ נהיגה" }
    ],
    modelSBAR: {
      situation: "רותי לוי, בת 58, מונשמת עקב אספירציה, פיתחה Severe ARDS עם צניחת סטורציה חדה ל-81% ויחס PaO2/FiO2 של 86.",
      background: "הונשמה אתמול, מורדמת. בשעה האחרונה עלו לחצי ההנשמה והמנשם צפצף על לחצי שיא.",
      assessment: "שלילת DOPE איששה שאין חסימה או פנאומוטורקס. מדובר בהחמרה קשה של קומפליאנס הריאה (Pplat היה 38 cmH2O). יושם פרוטוקול ARDSnet: הפחתנו נפח ל-400 מ\"ל (6 מ\"ל/ק\"ג), העלינו PEEP ל-14, והשגנו ירידה ב-Pplat ל-27 ושיפור סטורציה ל-92%. הוחל שיתוק שרירים.",
      recommendation: "ממליץ על הכנת המטופלת לפרונציה ל-16 שעות רצופות, ביצוע צילום חזה חוזר ובדיקת גזים בעוד שעה."
    }
  },

  // 7. Cardiogenic Shock
  {
    id: "cardiogenic_shock",
    title: "הלם קרדיוגני ובצקת ריאות חריפה",
    category: "קרדיולוגיה והמודינמיקה",
    timeLimit: 720,
    doorChart: {
      patientName: "יוסף אברהם",
      age: 68,
      department: "טיפול נמרץ כללי",
      admissionDay: "יום 1 לאשפוז",
      admissionReason: "אוטם נרחב בדופן קדמית (Extensive Anterior STEMI) לאחר צנתור דחוף ופתיחת LAD עם תומכן.",
      shiftContext: "הועבר מחדר הצנתורים מונשם. במהלך השעה האחרונה החל להפריש נוזל קצפי ורוד דרך הטובוס, לחץ הדם בצניחה, וגודש ורידי צוואר בולט.",
      triggerEvent: "לחץ דם 78/48 (MAP 58), דופק 114, סטורציה 86% תחת FiO2 60%, ו-CVP מזנק ל-19 mmHg."
    },
    initialVitals: { hr: 114, rhythm: 'sinus', abpSys: 78, abpDia: 48, map: 58, spo2: 86, rr: 24, etco2: 32, cvp: 19, temp: 36.6 },
    initialVent: { mode: 'VCV', vt: 480, rrSet: 18, rrTotal: 24, peep: 5, fio2: 60, ppeak: 38, pplat: 31 },
    initialLabs: {
      abg: { ph: "7.27", paco2: "45 mmHg", pao2: "58 mmHg", hco3: "18 mEq/L", be: "-7.0", sao2: "86%", lactate: "4.1 mmol/L", interpretation: "Hypoxemia and Metabolic Lactic Acidosis secondary to Pump Failure (Morton Ch. 15, 38)" }
    },
    actions: [
      { id: "auscultate_heart_lungs", name: "האזנה ללב ולריאות ובדיקת סימני גודש", category: "A/B - Assessment", points: 10, response: "חרחורים מפושטים, קול לב שלישי (S3 gallop), ורידי צוואר גדושים, שאיבת קצף ורוד מהטובוס.", vitalsDelta: {} },
      { id: "increase_peep_fio2", name: "העלאת PEEP ל-10 cmH2O והעלאת FiO2 ל-80%", category: "B - Breathing", points: 15, response: "העלאת PEEP הפחיתה את ה-Venous Return וה-Afterload של חדר שמאל. סטורציה עלתה ל-93%.", vitalsDelta: { spo2: 93, ppeak: 41 } },
      { id: "start_inotropic_dobutamine", name: "התחלת דובוטמין (Dobutamine) 2.5-5 mcg/kg/min לתמיכה אינוטרופית", category: "C - Circulation", points: 20, response: "דובוטמין הותחל. כוח ההתכווצות השתפר, לחץ הדם עלה ל-88/54 (MAP 65), CVP ירד ל-15 mmHg.", vitalsDelta: { abpSys: 88, abpDia: 54, map: 65, cvp: 15 } },
      { id: "start_noradrenaline_cardio", name: "הוספת נוראדרנלין במינון נמוך להבטחת לחץ פרפוזיה כלילי", category: "C - Circulation", points: 15, response: "נוראדרנלין חובר בליין מרכזי. לחץ דם התייצב על 102/62 (MAP 75 mmHg).", vitalsDelta: { abpSys: 102, abpDia: 62, map: 75, hr: 106 } },
      { id: "stat_echo_cardiology_consult", name: "הזמנת אקו לב ליד מיטת החולה והתייעצות קרדיולוגית ל-IABP", category: "D - Diagnostics", points: 15, response: "אקו לב אישר: LVEF נמוך (18-20%), אקינזיה קדמית. קרדיולוג נערך להכנסת בלון תוך-ותיני (IABP).", vitalsDelta: {} },
      { id: "trap_give_fluid_bolus_cardiogenic", name: "מתן בולוס סליין 1000 מ\"ל עקב תת-לחץ דם (MAP 58)", category: "C - Circulation", isRedFlag: true, points: -30, response: "שגיאה פוסלת חמורה ביותר! במטופל בהלם קרדיוגני עם גודש ריאתי, CVP 19 וקצף ורוד - מתן נוזלים מציף סופית את הריאות ומביא לדום לב בהיפוקסיה! (Morton Ch. 15)", vitalsDelta: { spo2: 72, cvp: 24, abpSys: 60, abpDia: 38, map: 45 } }
    ],
    rubricChecklist: [
      { id: "sec_recognition", title: "זיהוי מהיר של כשל משאבה (Cardiogenic Shock) והימנעות מעומס נוזלים", maxPts: 30, rationale: "זיהוי CVP גבוה וקצף ורוד - אי-מתן נוזלים הוא קריטי (Morton Ch. 15)" },
      { id: "sec_inotropes", title: "התחלת תמיכה אינוטרופית מבוקרת (דובוטמין / נוראדרנלין)", maxPts: 25, rationale: "שיפור כוח כיווץ והעלאת לחץ פרפוזיה קורונרי" },
      { id: "sec_vent_support", title: "התאמת מנשם ו-PEEP לשיפור חמצון והורדת Afterload שמאלי", maxPts: 15, rationale: "לחץ חיובי מוריד חזרת דם ורידי ומסייע לאי ספיקת לב שמאלית" },
      { id: "sec_mechanical_support", title: "גיוס מוקדם של בדיקת אקו ושקילת תמיכה מכנית (IABP)", maxPts: 15, rationale: "הלם קרדיוגני רפרקטורי דורש תמיכה מכנית זמנית" },
      { id: "sec_sbar", title: "העברת דיווח SBAR מובנה ומדויק", maxPts: 15, rationale: "הצגת מקרה תמציתית עם הדגשת סימני הגודש ולחצי המילוי" }
    ],
    modelSBAR: {
      situation: "יוסף אברהם, בן 68, מונשם לאחר צנתור דחוף ל-LAD, מפתח הלם קרדיוגני ובצקת ריאות חריפה עם MAP 58 ו-CVP 19.",
      background: "אוטם נרחב בדופן קדמית. הועבר מהצנתור לפני שעה.",
      assessment: "כשל חמור של משאבת חדר שמאל (EF מוערך כ-20%) עם גודש ריאתי סוער (קצף ורוד בטובוס). נמנענו ממתן נוזלים. העלינו PEEP ל-10 cmH2O, הותחל דובוטמין במינון 5 mcg/kg/min ונוראדרנלין לייצוב ה-MAP ל-75. סטורציה עלתה ל-93%.",
      recommendation: "דרושה הגעה דחופה של קרדיולוג להחדרת IABP לתמיכה מכנית, וביצוע צילום חזה ובדיקת אקו פורטטיבית."
    }
  },

  // 8. Tension Pneumothorax (שחזור מקורי 2019 תאונת דרכים)
  {
    id: "tension_pneumothorax",
    title: "חזה אוויר בלחץ תחת הנשמה מכנית",
    category: "טראומה והנשמה (שחזור 2019)",
    timeLimit: 600,
    doorChart: {
      patientName: "משה פרידמן",
      age: 45,
      department: "טיפול נמרץ כללי",
      admissionDay: "יום 1 לאשפוז",
      admissionReason: "תאונת דרכים חזיתית קשה, שברים בצלעות מימין ושברים בעמוד שדרה צווארי וחזי.",
      shiftContext: "התקבל לטיפול נמרץ כללי מורדם ומונשם. בדקות האחרונות נרשמה צניחה קטסטרופלית בלחץ דם ואזעקת לחץ שיא במנשם.",
      triggerEvent: "לחץ דם 65/38 (MAP 47), דופק 142, סטורציה 78%, לחץ שיא במנשם קפץ ל-52 cmH2O."
    },
    initialVitals: { hr: 142, rhythm: 'sinus', abpSys: 65, abpDia: 38, map: 47, spo2: 78, rr: 32, etco2: 18, cvp: 21, temp: 36.8 },
    initialVent: { mode: 'VCV', vt: 500, rrSet: 16, rrTotal: 32, peep: 8, fio2: 60, ppeak: 52, pplat: 44 },
    actions: [
      { id: "disconnect_bag_ventilate", name: "ניתוק מיידי מהמנשם והנשמה ידנית באמבו עם חמצן 100%", category: "A/B - Airway & Breathing", points: 15, response: "נותק מהמנשם: שקית האמבו נוקשה לחלוטין ('כמו סלע'), לא ניתן להנשים בגלל לחץ תוך-חזי עצום.", vitalsDelta: { spo2: 80 } },
      { id: "rapid_physical_exam", name: "בדיקה גופנית מהירה: האזנה דו-צדדית, מיקום קנה וורידי צוואר", category: "B - Breathing", points: 20, response: "דממה נשימתית מוחלטת מעל המיטורקס ימני, הדיות יתר בניקוש, סטיית קנה הנשימה שמאלה, ורידי צוואר תפוחים. אבחנה ודאית: Tension Pneumothorax!", vitalsDelta: {} },
      { id: "needle_decompression_stat", name: "ביצוע דקומפרסיה דחופה עם מחט 14G במרווח בין-צלעי 2 בקו Mid-Clavicular", category: "B - Urgent Procedure", points: 30, response: "החדרת מחט עבה (14G עם מזרק מים) במרווח בינצלעי שני מימין. נשמע קול שחרור אוויר תחת לחץ ('Hiss') ובועות סוערות. הלחץ התוך-חזי הוקל מיד! ל\"ד קפץ ל-105/68 (MAP 80), דופק ירד ל-108, סטורציה עלתה ל-94%.", vitalsDelta: { abpSys: 105, abpDia: 68, map: 80, hr: 108, spo2: 94, ppeak: 26, cvp: 9 } },
      { id: "chest_tube_prep", name: "הכנת ערכת נקז חזה (Chest Tube 28-32 Fr) וחיבור למערכת שאיבה מים (Underwater seal)", category: "B - Urgent Procedure", points: 20, response: "הוכנס נקז חזה במרווח בין צלעי 5 בקו Mid-Axillary וחולצה כמות אוויר גדולה. הנקז מקובע ומבעבע בבטיחות.", vitalsDelta: { spo2: 97, etco2: 35 } },
      { id: "trap_wait_for_xray", name: "שליחת צילום חזה דחוף והמתנה לתוצאות לפני פעולה פולשנית", category: "B - Breathing", isRedFlag: true, points: -35, response: "שגיאה פוסלת מסכנת חיים! אסור בשום אופן להמתין לצילום רנטגן בנוכחות חזה אוויר בלחץ עם קריסה המודינמית! זו אבחנה קלינית המחייבת דקומפרסיה מיידית! (Morton Ch. 25)", vitalsDelta: { abpSys: 40, abpDia: 20, map: 26, hr: 160 } }
    ],
    rubricChecklist: [
      { id: "sec_immediate_dx", title: "אבחון קליני מיידי של Tension Pneumothorax ללא בזבוז זמן לרנטגן", maxPts: 35, rationale: "מצב חירום כירורגי שבו התעכבות לרנטגן גורמת לדום לב מחוסר מילוי ורידי (Morton Ch. 25)" },
      { id: "sec_needle", title: "דקומפרסיה עם מחט גדולה ללא שיהוי (Needle Thoracostomy)", maxPts: 35, rationale: "הקלה מיידית על הלחץ התוך-חזי והחזרת הפרפוזיה המוחית והלבבית" },
      { id: "sec_tube", title: "הכנסת נקז חזה דפיניטיבי וחיבור למערכת שאיבה תת-מימית", maxPts: 15, rationale: "טיפול מוחלט במקור הדלף" },
      { id: "sec_sbar", title: "דיווח SBAR מהיר וממוקד לרופא התורן", maxPts: 15, rationale: "דיווח מסודר על החייאת הטראומה ומצב הנקז" }
    ],
    modelSBAR: {
      situation: "משה פרידמן, בן 45, פוליטראומה מונשם, פיתח Tension Pneumothorax מימין עם קריסה המודינמית חריפה (MAP 47, לחץ שיא 52).",
      background: "התקבל לאחר תאונת דרכים עם שברים בצלעות מימין. המנשם החל לצפצף ולחץ הדם צנח.",
      assessment: "זיהינו דממה נשימתית מימין, סטיית קנה שמאלה ותפיחות צווארית. בוצעה דקומפרסיה מיידית במחט 14G במרווח בינצלעי שני מימין עם שחרור אוויר דרמטי. לחץ הדם התייצב על 105/68 והסטורציה עלתה ל-94%. הוחדר נקז חזה 28Fr המחובר למערכת חזה.",
      recommendation: "ממליץ על ביצוע צילום חזה כעת לווידוא מיקום הנקז ופרישת הריאה, ובדיקת גזים עורקיים."
    }
  }
];
