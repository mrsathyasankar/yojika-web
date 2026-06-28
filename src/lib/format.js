/* Yojika — display formatters for the account portal.
 * Money is stored as paise (integer) per the app-wide convention; dates come back
 * as ISO strings from Postgres. Uses the browser's built-in Intl — no dependency. */

const inr = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' });

// 199900 (paise) -> "₹1,999.00", with Indian lakh/crore grouping.
export function rupees(paise) {
  const n = Number(paise);
  if (!Number.isFinite(n)) return '—';
  return inr.format(n / 100);
}

// ISO timestamp -> "DD/MM/YYYY" (Indian date convention).
export function dmy(iso) {
  if (!iso) return '—';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '—';
  const p = (x) => String(x).padStart(2, '0');
  return `${p(d.getDate())}/${p(d.getMonth() + 1)}/${d.getFullYear()}`;
}
