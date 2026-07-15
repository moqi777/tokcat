import React from 'react'
import { useTranslation } from 'react-i18next'
import type { Stats } from '../lib/types'
import { formatCost, formatMMDD, formatMonthDay, humanizeTokens } from '../lib/format'
import { localeForLanguage, type ResolvedLanguage } from '../i18n/language'

export function TokenUsageCard({ stats, bare = false }: { stats: Stats; bare?: boolean }) {
  const { t, i18n } = useTranslation()
  const language: ResolvedLanguage = i18n.resolvedLanguage === 'zh-CN' ? 'zh-CN' : 'en'
  const locale = localeForLanguage(language)
  const range = `${formatMMDD(stats.dateRange.start, locale)} → ${formatMMDD(stats.dateRange.end, locale)}`
  const grid = (
    <div className={`usage-row-card${bare ? ' is-bare' : ''}`}>
      <div className="usage-cell">
        <div className="usage-num">{formatCost(stats.totalCost, locale)}</div>
        <div className="usage-label">{t('usage.total')}</div>
        <div className="usage-sub">{range}</div>
      </div>
      <div className="usage-cell">
        <div className="usage-num">{humanizeTokens(stats.totalTokens)}</div>
        <div className="usage-label">{t('usage.tokens')}</div>
        <div className="usage-sub">{t('usage.activeDays', { count: stats.activeDays })}</div>
      </div>
      <div className="usage-cell">
        <div className="usage-num">{formatCost(stats.bestDay?.cost ?? 0, locale)}</div>
        <div className="usage-label">{t('usage.bestDay')}</div>
        <div className="usage-sub">{stats.bestDay ? formatMonthDay(stats.bestDay.date, locale) : '—'}</div>
      </div>
    </div>
  )
  if (bare) return grid
  return (
    <div className="usage-card">
      <h2 className="usage-heading">{t('dashboard.tokenUsage')}</h2>
      {grid}
    </div>
  )
}
