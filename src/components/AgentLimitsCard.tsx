import React from 'react'
import { useTranslation } from 'react-i18next'
import type { TFunction } from 'i18next'
import { clientInitial, getClientStyle } from '../lib/clients'
import type { AgentUsagePayload, AgentUsageSnapshot, MonthlyCap } from '../lib/agentUsage'
import type { TraceBucket } from '../lib/usage'
import { formatCurrencyMinorUnits, formatRelativeReset } from '../lib/format'
import { useAppLocale } from '../i18n/useAppLocale'
import { en } from '../i18n/locales/en'

interface Props {
  clients: string[]
  trace: TraceBucket[]
  agentUsage: AgentUsagePayload | null
  title?: string
  note?: string
}

interface LimitRow {
  kind: string
  label: string
  usedPercent?: number
  remainingPercent?: number
  resetsAt?: string
  monthlyCap?: MonthlyCap
}

const LIMIT_ROWS: Record<string, LimitRow[]> = {
  codex: [{ kind: 'session', label: 'Session' }, { kind: 'weekly', label: 'Weekly' }],
  claude: [{ kind: 'session', label: 'Session' }, { kind: 'weekly', label: 'Weekly' }],
  gemini: [{ kind: 'pro', label: 'Pro' }, { kind: 'flash', label: 'Flash' }],
}

const KNOWN_WINDOW_KINDS = new Set(Object.keys(en.limits.window))

function normalizeTraceClient(id: string): string {
  if (id === 'claude-code') return 'claude'
  if (id === 'codex-cli') return 'codex'
  if (id === 'gemini-cli') return 'gemini'
  return id.replace(/-cli$/, '')
}

function mark(id: string) {
  const style = getClientStyle(id)
  if (style.iconRaw) {
    return (
      <span
        className={`limit-agent-icon limit-agent-icon-${style.iconType}`}
        style={style.iconType === 'mono' ? { background: style.color } : undefined}
        aria-hidden="true"
        dangerouslySetInnerHTML={{ __html: style.iconRaw }}
      />
    )
  }
  return (
    <span className="limit-agent-icon" style={{ background: style.color }} aria-hidden="true">
      {clientInitial(style.displayName)}
    </span>
  )
}

export function AgentLimitsCard({ clients, trace, agentUsage, title, note }: Props) {
  const { t } = useTranslation()
  const { locale } = useAppLocale()
  const liveClients = new Set(trace.filter(t => t.tokens_per_min > 0).map(t => normalizeTraceClient(t.client)))
  const snapshots = new Map((agentUsage?.agents ?? []).map(agent => [agent.clientId, agent]))
  const visibleClients = Array.from(new Set([
    ...clients.filter(id => LIMIT_ROWS[id] || id === 'codex' || id === 'claude' || id === 'gemini'),
    ...Array.from(snapshots.keys()),
  ]))

  return (
    <div className="limits-card">
      <div className="limits-head">
        <h2 className="limits-title">{title ?? t('limits.defaultTitle')}</h2>
        <span className="limits-note">{note ?? t('limits.oauthQuota')}</span>
      </div>
      {visibleClients.length === 0 ? (
        <div className="limits-empty">{t('limits.empty')}</div>
      ) : (
        <div className={`limits-list${visibleClients.length === 1 ? ' is-single' : ''}`}>
          {visibleClients.map(id => {
            const style = getClientStyle(id)
            const snapshot = snapshots.get(id)
            const rows = snapshot?.windows.length
              ? snapshot.windows
              : LIMIT_ROWS[id] ?? [{ kind: 'generic_limit', label: 'Limit' }]
            const isLive = liveClients.has(id)
            const status = statusText(snapshot, isLive, t)
            return (
              <div className="limit-agent" key={id}>
                <div className="limit-agent-head">
                  <div className="limit-agent-name">
                    {mark(id)}
                    <span>{style.displayName}</span>
                  </div>
                  <span className={`limit-agent-status${isLive ? ' is-live' : ''}${snapshot?.error ? ' is-error' : ''}`}>
                    {status}
                  </span>
                </div>
                {(snapshot?.identity?.email || snapshot?.identity?.plan || snapshot?.error) && (
                  <div className="limit-agent-detail" title={snapshot?.error || undefined}>
                    {snapshot.error || [snapshot.identity?.email, snapshot.identity?.plan].filter(Boolean).join(' · ')}
                  </div>
                )}
                <div className="limit-windows">
                  {rows.map(row => {
                    const remaining = 'remainingPercent' in row ? row.remainingPercent : undefined
                    const fill = remaining ?? 0
                    const percent = remaining === undefined
                      ? null
                      : new Intl.NumberFormat(locale, { style: 'percent', maximumFractionDigits: 0 })
                        .format(Math.max(0, remaining) / 100)
                    const left = percent === null ? t('limits.noData') : t('limits.percentLeft', { percent })
                    const relative = row.resetsAt ? formatRelativeReset(row.resetsAt, locale) : null
                    const monthlyCap = row.monthlyCap
                      ? t('limits.monthlyCap', {
                          current: formatCurrencyMinorUnits(row.monthlyCap.currentMinorUnits, row.monthlyCap.currency, locale),
                          limit: formatCurrencyMinorUnits(row.monthlyCap.limitMinorUnits, row.monthlyCap.currency, locale),
                        })
                      : null
                    const detail = monthlyCap ?? (relative ? t('limits.resets', { relative }) : left)
                    const showLeft = Boolean(monthlyCap || relative)
                    return (
                      <div className="limit-window" key={`${row.kind}:${row.label}`}>
                        <div className="limit-window-meta">
                          <span>{windowLabel(row, t)}</span>
                          <span>{detail}</span>
                        </div>
                        <div className="limit-bar">
                          <div
                            className="limit-bar-fill"
                            style={{
                              width: `${Math.min(100, Math.max(0, fill))}%`,
                              background: style.color,
                            }}
                          />
                        </div>
                        {showLeft && <div className="limit-window-left">{left}</div>}
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

function windowLabel(row: LimitRow, t: TFunction): string {
  return KNOWN_WINDOW_KINDS.has(row.kind) ? t(`limits.window.${row.kind}`) : row.label
}

function statusText(snapshot: AgentUsageSnapshot | undefined, isLive: boolean, t: TFunction): string {
  if (snapshot?.error) return t('limits.error')
  if (snapshot?.windows.length) return snapshot.source.toUpperCase()
  if (isLive) return t('limits.live')
  return t('limits.noQuota')
}
