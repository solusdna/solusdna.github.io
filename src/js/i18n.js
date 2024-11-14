import { en } from '../translations/en.js';
import { ru } from '../translations/ru.js';

class I18n {
  constructor() {
    this.translations = { en, ru };
    this.currentLocale = localStorage.getItem('language') || 'en';
    this.init();
  }

  init() {
  
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.getAttribute('data-lang');
            this.setLanguage(lang);
        });
    });
    
    this.updateLanguageToggle();
    this.translate();
  }

  setLanguage(locale) {
    const elements = document.querySelectorAll('[data-i18n]');
    
    elements.forEach(el => {
        el.style.transition = 'opacity 0.3s ease';
        el.style.opacity = '0';
    });

    setTimeout(() => {
        this.currentLocale = locale;
        localStorage.setItem('language', locale);
        this.translate();
        this.updateLanguageToggle();
        
        elements.forEach(el => {
            el.style.opacity = '1';
        });
    }, 300);
  }

  translate() {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(element => {
      const key = element.getAttribute('data-i18n');
      const translation = this.getTranslation(key);
      if (translation) {
        if (element.tagName === 'INPUT' && element.type === 'submit') {
          element.value = translation;
        } else {
          element.textContent = translation;
        }
      }
    });
  }

  t(key) {
    return this.getTranslation(key);
  }

  getTranslation(key) {
    const keys = key.split('.');
    let translation = this.translations[this.currentLocale];
    
    for (const k of keys) {
      if (translation && translation[k]) {
        translation = translation[k];
      } else {
        return key;
      }
    }
    
    return translation;
  }

  updateLanguageToggle() {
    const buttons = document.querySelectorAll('.lang-btn');
    buttons.forEach(btn => {
        const lang = btn.getAttribute('data-lang');
        if (lang === this.currentLocale) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
  }
}

export const i18n = new I18n();

window.i18n = i18n;

document.addEventListener('DOMContentLoaded', () => {
  i18n.translate();
  i18n.updateLanguageToggle();
});