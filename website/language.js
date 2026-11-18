(() => {
    const root = document.documentElement;
    const url = new URL(location.href);
    const key = 'keypresser.language';
    const isLanguage = value => value === 'zh' || value === 'en';

    document.addEventListener('DOMContentLoaded', () => {
        const switcher = document.querySelector('.language-switch');
        const syncHash = () => { switcher.hash = location.hash; };
        syncHash();
        window.addEventListener('hashchange', syncHash);
    });

    const language = url.searchParams.get('lang');
    let preferred;
    try {
        if (isLanguage(language)) localStorage.setItem(key, language);
        preferred = localStorage.getItem(key);
    } catch { /* Storage may be disabled. */ }
    if (isLanguage(language) || root.lang === 'en') return;

    function showEnglish() {
        const english = new URL(root.dataset.englishPage, url);
        english.search = url.search;
        english.hash = location.hash;
        location.replace(english.href);
    }

    if (isLanguage(preferred)) {
        if (preferred === 'en') showEnglish();
        return;
    }

    const countryKey = 'keypresser.country';
    let cachedCountry;
    try { cachedCountry = sessionStorage.getItem(countryKey); }
    catch { /* Storage may be disabled. */ }
    if (cachedCountry) {
        if (cachedCountry !== 'CN') showEnglish();
        return;
    }

    const controller = new AbortController();
    const deadline = setTimeout(() => controller.abort(), 1200);
    fetch('https://api.country.is/', {
        signal: controller.signal,
        credentials: 'omit',
        referrerPolicy: 'no-referrer'
    })
        .then(response => {
            if (!response.ok) throw new Error('Country lookup failed');
            return response.json();
        })
        .then(({ country }) => {
            if (!/^[A-Z]{2}$/.test(country ?? '') || country === 'XX') {
                throw new Error('Country unavailable');
            }
            try { sessionStorage.setItem(countryKey, country); }
            catch { /* Storage may be disabled. */ }
            if (country !== 'CN') showEnglish();
        })
        .catch(() => {
            const chineseLocale = /^zh(?:-|$)/i.test(navigator.language);
            const chineseTimezone = ['Asia/Shanghai', 'Asia/Chongqing', 'Asia/Harbin', 'Asia/Urumqi']
                .includes(Intl.DateTimeFormat().resolvedOptions().timeZone);
            if (!chineseLocale && !chineseTimezone) showEnglish();
        })
        .finally(() => clearTimeout(deadline));
})();
