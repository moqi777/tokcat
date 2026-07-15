import React from 'react'
import { useTranslation } from 'react-i18next'
import { humanizeTokens } from '../lib/format'
import { THEMES } from '../lib/themes'
import type { ResolvedLanguage } from '../i18n/language'

interface Props {
  totalTokens: number
  year: string
  years: string[]
  onYearChange: (y: string) => void
  theme: string
  onThemeChange: (t: string) => void
  onRefresh?: () => void
  onOpenSettings?: () => void
  kbdHints?: boolean
  refreshing?: boolean
}

export function HeaderBar({ totalTokens, year, years, onYearChange, theme, onThemeChange, onRefresh, onOpenSettings, kbdHints, refreshing }: Props) {
  const { t, i18n } = useTranslation()
  const language: ResolvedLanguage = i18n.resolvedLanguage === 'zh-CN' ? 'zh-CN' : 'en'
  const yearSelect = (
    <select className="year-select" value={year} onChange={e => onYearChange(e.target.value)}>
      {years.map(y => <option key={y} value={y}>{y}</option>)}
    </select>
  )
  const tokenValue = <span className="header-num" data-tauri-drag-region>{humanizeTokens(totalTokens)}</span>
  return (
    <div className="header-bar" data-tauri-drag-region>
      <div className="header-brand" data-tauri-drag-region>
        <img className="brand-logo" src="/tokcat-logo.png" alt="" aria-hidden="true" data-tauri-drag-region />
        <div className="header-title" data-tauri-drag-region>
          {language === 'zh-CN' ? (
            <>{yearSelect}<span className="header-text" data-tauri-drag-region> {t('header.tokensUsedInYear')} </span>{tokenValue}<span className="header-text"> Token</span></>
          ) : (
            <>{tokenValue}<span className="header-text" data-tauri-drag-region> {t('header.tokensUsedIn')} </span>{yearSelect}</>
          )}
        </div>
      </div>
      <div className="header-controls">
        <select className="theme-select" value={theme} onChange={e => onThemeChange(e.target.value)} aria-label={t('header.theme')}>
          {THEMES.map(themeOption => (
            <option key={themeOption.name} value={themeOption.name}>{t(`themes.${themeOption.name}`)}</option>
          ))}
        </select>
        {onRefresh && (
          <button className="settings-btn" onClick={onRefresh} aria-label={t('common.refresh')} title={t('common.refresh')}>
            <svg className={refreshing ? 'refresh-spin' : undefined} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="23 4 23 10 17 10" />
              <polyline points="1 20 1 14 7 14" />
              <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10" />
              <path d="M20.49 15A9 9 0 0 1 5.64 18.36L1 14" />
            </svg>
            {kbdHints && <span className="kbd-pin" aria-hidden="true">⌘R</span>}
          </button>
        )}
        {onOpenSettings && (
          <button className="settings-btn" onClick={onOpenSettings} aria-label={t('common.settings')}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
            </svg>
            {kbdHints && <span className="kbd-pin" aria-hidden="true">⌘,</span>}
          </button>
        )}
      </div>
    </div>
  )
}
