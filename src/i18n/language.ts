export const SUPPORTED_LANGUAGES = [
  { value: 'auto', labelKey: 'settings.language.followSystem' },
  { value: 'en', nativeName: 'English' },
  { value: 'zh-CN', nativeName: '简体中文' },
] as const

export type AppLanguage = (typeof SUPPORTED_LANGUAGES)[number]['value']
export type ResolvedLanguage = Exclude<AppLanguage, 'auto'>

export function isAppLanguage(value: unknown): value is AppLanguage {
  return SUPPORTED_LANGUAGES.some(language => language.value === value)
}

export function resolveLanguage(
  preference: AppLanguage,
  browserLanguages: readonly string[] = getBrowserLanguages(),
): ResolvedLanguage {
  if (preference !== 'auto') return preference
  return browserLanguages.some(isSimplifiedChinese) ? 'zh-CN' : 'en'
}

export function localeForLanguage(language: ResolvedLanguage): string {
  return language === 'zh-CN' ? 'zh-CN' : 'en-US'
}

function getBrowserLanguages(): readonly string[] {
  if (typeof navigator === 'undefined') return []
  return navigator.languages?.length ? navigator.languages : [navigator.language]
}

function isSimplifiedChinese(language: string): boolean {
  const normalized = language.trim().replaceAll('_', '-').toLowerCase()
  if (!normalized.startsWith('zh')) return false
  return !/-(tw|hk|mo|hant)(-|$)/.test(normalized)
}
