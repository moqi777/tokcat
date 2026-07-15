export interface AgentIdentity {
  email?: string
  plan?: string
}

export interface UsageWindow {
  kind: string
  label: string
  usedPercent: number
  remainingPercent: number
  resetsAt?: string
  resetText?: string
  monthlyCap?: MonthlyCap
}

export interface MonthlyCap {
  currentMinorUnits: number
  limitMinorUnits: number
  currency: string
}

export interface CreditsSnapshot {
  remaining?: number
  unlimited: boolean
}

export interface AgentUsageSnapshot {
  clientId: string
  source: string
  updatedAt: string
  identity?: AgentIdentity
  windows: UsageWindow[]
  credits?: CreditsSnapshot
  error?: string
}

export interface AgentUsagePayload {
  generatedAt: string
  agents: AgentUsageSnapshot[]
}
