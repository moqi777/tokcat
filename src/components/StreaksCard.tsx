import React from 'react'
import { useTranslation } from 'react-i18next'

interface Props {
  longest: number
  current: number
}

export function StreaksCard({ longest, current }: Props) {
  const { t } = useTranslation()
  return (
    <div className="streaks-card">
      <h2 className="streaks-heading">{t('streaks.title')}</h2>
      <div className="streaks-row">
        <div className="streak-item">
          <div className="streak-num">{longest}<span className="streak-unit">{t('streaks.dayUnit', { count: longest })}</span></div>
          <div className="streak-label">{t('streaks.longest')}</div>
        </div>
        <div className="streak-item">
          <div className="streak-num">{current}<span className="streak-unit">{t('streaks.dayUnit', { count: current })}</span></div>
          <div className="streak-label">{t('streaks.current')}</div>
        </div>
      </div>
    </div>
  )
}
