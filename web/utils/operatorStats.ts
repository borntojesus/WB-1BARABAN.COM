import type { Operator } from '~/data/operators'

function parseAmount(a: string): { value: number; currency: string } | null {
  const m = a.match(/^([£€$])\s*([\d.,]+)\s*(m|k|bn)?/i)
  if (!m) return null
  let v = parseFloat(m[2].replace(/,/g, ''))
  const unit = (m[3] || '').toLowerCase()
  if (unit === 'm') v *= 1e6
  else if (unit === 'k') v *= 1e3
  else if (unit === 'bn') v *= 1e9
  return { value: v, currency: m[1] }
}

function fmt(v: number, cur: string): string {
  if (v >= 1e6) return `${cur}${(v / 1e6).toFixed(2).replace(/\.?0+$/, '')}m`
  return `${cur}${Math.round(v).toLocaleString('en-GB')}`
}

/** Count and total of the listed regulatory action amounts, as plain text. */
export function penaltySummary(op: Operator): string {
  const n = op.regulatoryActions.length
  if (n === 0) return 'None listed'
  const totals = new Map<string, number>()
  let unparsed = 0
  for (const a of op.regulatoryActions) {
    const p = parseAmount(a.amount)
    if (!p) { unparsed++; continue }
    totals.set(p.currency, (totals.get(p.currency) || 0) + p.value)
  }
  const parts = [...totals].map(([c, v]) => fmt(v, c))
  let text = `${n} listed`
  if (parts.length) text += `, total ${parts.join(' + ')}`
  if (unparsed) text += ` (${unparsed} without a stated amount)`
  return text
}
