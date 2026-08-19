// The shop runs on Asia/Jakarta; Vercel crons fire in UTC.
const WIB_OFFSET_MS = 7 * 60 * 60 * 1000;
const DAY_MS = 24 * 60 * 60 * 1000;

// The UTC window covering the WIB calendar day that `now` falls in.
export function wibDayWindow(now: Date): { start: Date; end: Date } {
  const wibNow = now.getTime() + WIB_OFFSET_MS;
  const wibMidnight = Math.floor(wibNow / DAY_MS) * DAY_MS;
  const start = new Date(wibMidnight - WIB_OFFSET_MS);
  return { start, end: new Date(start.getTime() + DAY_MS) };
}

export function formatWibTime(iso: string): string {
  return new Intl.DateTimeFormat("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Jakarta",
  }).format(new Date(iso));
}
