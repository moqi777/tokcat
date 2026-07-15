export function humanizeTokens(n: number): string {
  if (n < 1000) return String(n)
  if (n < 1_000_000) return `${(n / 1_000).toFixed(1)}K`
  if (n < 1_000_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n < 1_000_000_000_000) return `${(n / 1_000_000_000).toFixed(1)}B`
  return `${(n / 1_000_000_000_000).toFixed(1)}T`
}

export function formatCost(n: number, locale = 'en-US'): string {
  return `$${new Intl.NumberFormat(locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(n)}`
}

export function formatExactTokens(n: number, locale = 'en-US'): string {
  return new Intl.NumberFormat(locale).format(n)
}

export function formatCurrencyMinorUnits(
  value: number,
  currency: string,
  locale = 'en-US',
): string {
  const code = currency.trim().toUpperCase() || 'USD'
  try {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: code,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value / 100)
  } catch {
    return `${new Intl.NumberFormat(locale, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value / 100)} ${code}`
  }
}

export function formatRelativeReset(resetsAt: string, locale = 'en-US', now = new Date()): string | null {
  const reset = new Date(resetsAt)
  if (Number.isNaN(reset.getTime())) return null
  const seconds = (reset.getTime() - now.getTime()) / 1000
  const formatter = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' })
  if (seconds <= 0) return formatter.format(0, 'second')
  if (seconds < 3600) return formatter.format(Math.ceil(seconds / 60), 'minute')
  if (seconds < 172800) return formatter.format(Math.ceil(seconds / 3600), 'hour')
  return formatter.format(Math.ceil(seconds / 86400), 'day')
}

// Parse YYYY-MM-DD as local date (avoid TZ shift)
export function parseISODate(s: string): Date {
  const [y, m, d] = s.split('-').map(Number)
  return new Date(y, m - 1, d)
}

export function formatMonthDay(s: string, locale = 'en-US'): string {
  const d = parseISODate(s)
  return new Intl.DateTimeFormat(locale, { month: 'short', day: 'numeric' }).format(d)
}

export function formatMMDD(s: string, locale = 'en-US'): string {
  const d = parseISODate(s)
  return new Intl.DateTimeFormat(locale, { month: '2-digit', day: '2-digit' }).format(d)
}

export function isoDate(d: Date): string {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

export function addDays(d: Date, n: number): Date {
  const r = new Date(d)
  r.setDate(r.getDate() + n)
  return r
}

export function diffDays(a: Date, b: Date): number {
  const ms = a.getTime() - b.getTime()
  return Math.round(ms / 86400000)
}
