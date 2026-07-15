import { useTranslation } from 'react-i18next'
import { localeForLanguage, type ResolvedLanguage } from './language'

export function useAppLocale(): { language: ResolvedLanguage; locale: string } {
  const { i18n } = useTranslation()
  const language: ResolvedLanguage = i18n.resolvedLanguage === 'zh-CN' ? 'zh-CN' : 'en'
  return { language, locale: localeForLanguage(language) }
}
