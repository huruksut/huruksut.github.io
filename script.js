const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('.site-nav');

if (menuButton && nav) {
  menuButton.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(open));
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
  }));
}

document.getElementById('year').textContent = new Date().getFullYear();

// ---------- Privacy-friendly Google Analytics consent ----------

const GA_MEASUREMENT_ID = 'G-4V7W51FE6N';
const ANALYTICS_CONSENT_KEY = 'analytics-consent';

const consentBar = document.getElementById('analytics-consent');
const allowAnalytics = document.getElementById('allow-analytics');
const declineAnalytics = document.getElementById('decline-analytics');

function loadGoogleAnalytics() {
  if (window.__gaLoaded) return;
  window.__gaLoaded = true;

  window.dataLayer = window.dataLayer || [];
  window.gtag = function () {
    window.dataLayer.push(arguments);
  };

  window.gtag('js', new Date());
  window.gtag('config', GA_MEASUREMENT_ID);

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);
}

function saveAnalyticsChoice(choice) {
  try {
    localStorage.setItem(ANALYTICS_CONSENT_KEY, choice);
  } catch (error) {
    // If storage is unavailable, the choice applies only to this page load.
  }
}

function getAnalyticsChoice() {
  try {
    return localStorage.getItem(ANALYTICS_CONSENT_KEY);
  } catch (error) {
    return null;
  }
}

const analyticsChoice = getAnalyticsChoice();

if (analyticsChoice === 'allowed') {
  loadGoogleAnalytics();
} else if (analyticsChoice !== 'declined' && consentBar) {
  consentBar.hidden = false;
}

if (allowAnalytics) {
  allowAnalytics.addEventListener('click', () => {
    saveAnalyticsChoice('allowed');
    if (consentBar) consentBar.hidden = true;
    loadGoogleAnalytics();
  });
}

if (declineAnalytics) {
  declineAnalytics.addEventListener('click', () => {
    saveAnalyticsChoice('declined');
    if (consentBar) consentBar.hidden = true;
  });
}

