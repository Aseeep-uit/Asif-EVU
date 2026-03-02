// ===================== MULTI-LANGUAGE SUPPORT =====================
// Add this script to all HTML files for internationalization

const translations = {
  no: {
    // Navigation
    dashboard: 'Oversikt',
    analytics: 'Analytics',
    del1: 'Del 1: Egenomsorg',
    del2: 'Del 2: Reseptur',
    del3: 'Del 3: Arbeidskrav',
    del4: 'Del 4: Kontinuerlige',
    del5: 'Del 5: Apokus',
    del6: 'Del 6: Vitusapotek',
    gantt: 'Gantt-diagram',
    
    // Dashboard
    total_progress: 'Total framgang',
    completed: 'Fullført',
    total: 'Totalt',
    progress: 'Framgang',
    modules_started: 'Deler startet',
    elements_completed: 'elementer fullført',
    
    // Countdown
    to_osce_exam: 'TIL OSCE EKSAMEN',
    days_left: 'dager igjen',
    
    // Search
    search_placeholder: 'Søk i alle moduler...',
    showing_results: 'Viser',
    of: 'av',
    modules: 'moduler',
    
    // Stats
    current_streak: 'Nåværende streak',
    days_in_row: 'dager på rad',
    avg_per_day: 'Gjennomsnitt per dag',
    items_per_day: 'elementer/dag',
    estimated_completion: 'Estimert tid til 100%',
    days_remaining: 'dager igjen',
    
    // AI Insights
    ai_insights: 'AI Insights',
    on_track: 'Du er på riktig spor!',
    increase_pace: 'Øk tempoet!',
    unbalanced_progress: 'Ubalansert fremgang',
    start_streak: 'Start en streak i dag!',
    prioritize_these: 'Prioriter disse!',
    
    // Milestones
    milestone_25: '🎉 25% fullført! Fortsett sånn!',
    milestone_50: '🎊 Halvveis der! Fantastisk jobb!',
    milestone_75: '🌟 75% fullført! Nesten i mål!',
    milestone_100: '🏆 GRATULERER! Du har fullført ALT! 🎉',
    
    // Theme
    dark_mode: 'Dark Mode',
    light_mode: 'Light Mode',
    
    // Quick Links
    quick_links: 'Hurtiglenker',
    
    // Footer
    vitusapotek_location: 'Vitusapotek Stovner'
  },
  
  en: {
    // Navigation
    dashboard: 'Dashboard',
    analytics: 'Analytics',
    del1: 'Part 1: Self-care',
    del2: 'Part 2: Compounding',
    del3: 'Part 3: Assignments',
    del4: 'Part 4: Continuous',
    del5: 'Part 5: Apokus',
    del6: 'Part 6: Vitusapotek',
    gantt: 'Gantt Chart',
    
    // Dashboard
    total_progress: 'Total Progress',
    completed: 'Completed',
    total: 'Total',
    progress: 'Progress',
    modules_started: 'Parts Started',
    elements_completed: 'elements completed',
    
    // Countdown
    to_osce_exam: 'TO OSCE EXAM',
    days_left: 'days left',
    
    // Search
    search_placeholder: 'Search all modules...',
    showing_results: 'Showing',
    of: 'of',
    modules: 'modules',
    
    // Stats
    current_streak: 'Current Streak',
    days_in_row: 'days in a row',
    avg_per_day: 'Average per day',
    items_per_day: 'items/day',
    estimated_completion: 'Estimated time to 100%',
    days_remaining: 'days remaining',
    
    // AI Insights
    ai_insights: 'AI Insights',
    on_track: 'You are on track!',
    increase_pace: 'Increase pace!',
    unbalanced_progress: 'Unbalanced progress',
    start_streak: 'Start a streak today!',
    prioritize_these: 'Prioritize these!',
    
    // Milestones
    milestone_25: '🎉 25% completed! Keep going!',
    milestone_50: '🎊 Halfway there! Amazing work!',
    milestone_75: '🌟 75% completed! Almost there!',
    milestone_100: '🏆 CONGRATULATIONS! You completed EVERYTHING! 🎉',
    
    // Theme
    dark_mode: 'Dark Mode',
    light_mode: 'Light Mode',
    
    // Quick Links
    quick_links: 'Quick Links',
    
    // Footer
    vitusapotek_location: 'Vitusapotek Stovner'
  },
  
  sv: {
    // Navigation
    dashboard: 'Översikt',
    analytics: 'Analys',
    del1: 'Del 1: Egenvård',
    del2: 'Del 2: Beredning',
    del3: 'Del 3: Arbetsuppgifter',
    del4: 'Del 4: Kontinuerliga',
    del5: 'Del 5: Apokus',
    del6: 'Del 6: Vitusapotek',
    gantt: 'Gantt-diagram',
    
    // Dashboard
    total_progress: 'Total framsteg',
    completed: 'Slutfört',
    total: 'Totalt',
    progress: 'Framsteg',
    modules_started: 'Delar påbörjade',
    elements_completed: 'element slutförda',
    
    // Countdown
    to_osce_exam: 'TILL OSCE EXAMEN',
    days_left: 'dagar kvar',
    
    // Search
    search_placeholder: 'Sök i alla moduler...',
    showing_results: 'Visar',
    of: 'av',
    modules: 'moduler',
    
    // Stats
    current_streak: 'Nuvarande streak',
    days_in_row: 'dagar i rad',
    avg_per_day: 'Genomsnitt per dag',
    items_per_day: 'element/dag',
    estimated_completion: 'Beräknad tid till 100%',
    days_remaining: 'dagar kvar',
    
    // AI Insights
    ai_insights: 'AI Insikter',
    on_track: 'Du är på rätt spår!',
    increase_pace: 'Öka tempot!',
    unbalanced_progress: 'Obalanserad framsteg',
    start_streak: 'Starta en streak idag!',
    prioritize_these: 'Prioritera dessa!',
    
    // Milestones
    milestone_25: '🎉 25% slutfört! Fortsätt så!',
    milestone_50: '🎊 Halvvägs! Fantastiskt arbete!',
    milestone_75: '🌟 75% slutfört! Nästan där!',
    milestone_100: '🏆 GRATTIS! Du har slutfört ALLT! 🎉',
    
    // Theme
    dark_mode: 'Mörkt Läge',
    light_mode: 'Ljust Läge',
    
    // Quick Links
    quick_links: 'Snabblänkar',
    
    // Footer
    vitusapotek_location: 'Vitusapotek Stovner'
  }
};

// Language switcher functions
function getCurrentLanguage() {
  return localStorage.getItem('language') || 'no';
}

function setLanguage(lang) {
  localStorage.setItem('language', lang);
  translatePage(lang);
}

function translatePage(lang) {
  const t = translations[lang];
  if (!t) return;
  
  // Translate all elements with data-i18n attribute
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key]) {
      if (el.placeholder !== undefined) {
        el.placeholder = t[key];
      } else {
        el.textContent = t[key];
      }
    }
  });
  
  // Update language selector
  const selector = document.getElementById('lang-selector');
  if (selector) {
    selector.value = lang;
  }
}

// Initialize language on page load
window.addEventListener('DOMContentLoaded', () => {
  const currentLang = getCurrentLanguage();
  translatePage(currentLang);
});

// Helper function to get translation
function t(key, lang = null) {
  const currentLang = lang || getCurrentLanguage();
  return translations[currentLang][key] || key;
}

/* ===================== USAGE INSTRUCTIONS =====================

1. ADD LANGUAGE SELECTOR TO NAVIGATION:

<select id="lang-selector" onchange="setLanguage(this.value)" 
        style="padding: 0.5rem; border-radius: 8px; border: 1px solid var(--border); 
               background: var(--bg-card); color: var(--text); font-weight: 600;">
  <option value="no">🇳🇴 Norsk</option>
  <option value="en">🇬🇧 English</option>
  <option value="sv">🇸🇪 Svenska</option>
</select>

2. ADD data-i18n ATTRIBUTE TO ELEMENTS:

<h1 data-i18n="dashboard">Oversikt</h1>
<span data-i18n="completed">Fullført</span>
<input type="text" data-i18n="search_placeholder" placeholder="Søk...">

3. USE IN JAVASCRIPT:

const message = t('milestone_100'); // Gets translation for current language
showToast(t('completed'), 'success');

4. DYNAMIC TRANSLATION:

function updateStats() {
  document.querySelector('.stat-label').textContent = t('current_streak');
}

================================================================ */
