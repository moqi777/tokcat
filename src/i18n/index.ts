import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { resolveLanguage, type ResolvedLanguage } from './language'
import { en } from './locales/en'
import { zhCN } from './locales/zh-CN'
import { loadSettings } from '../lib/settings'

const initialLanguage = resolveLanguage(loadSettings().language)
document.documentElement.lang = initialLanguage

void i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    'zh-CN': { translation: zhCN },
  },
  lng: initialLanguage,
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
  returnNull: false,
  saveMissing: import.meta.env.DEV,
  missingKeyHandler: import.meta.env.DEV
    ? (_languages, _namespace, key) => console.warn(`[i18n] Missing translation: ${key}`)
    : undefined,
})

export async function setResolvedLanguage(language: ResolvedLanguage): Promise<void> {
  document.documentElement.lang = language
  if (i18n.resolvedLanguage !== language) await i18n.changeLanguage(language)
}

export default i18n
