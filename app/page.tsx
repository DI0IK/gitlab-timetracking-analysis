import TimeTrackingDashboard from "@/components/TimeTrackingDashboard";

function parseEnvDate(key: string, fallback: string) {
  const raw = process.env[key] ?? fallback;
  const d = new Date(raw);
  if (isNaN(d.getTime())) return new Date(fallback);
  return d;
}

export default function Home() {
  // These env vars are read server-side. Use ISO date strings (YYYY-MM-DD).
  const startDate = parseEnvDate("START_DATE", "2024-10-01");
  const endDate = parseEnvDate("END_DATE", "2025-07-01");

  return <TimeTrackingDashboard startDate={startDate} endDate={endDate} />;
}
