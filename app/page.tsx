import TimeTrackingDashboard from "@/components/TimeTrackingDashboard";
import { useRuntimeConfig } from "../lib/runtimeConfig";

export default function Home() {
  const { config } = useRuntimeConfig();

  if (!config) return <div>Loading configuration...</div>;

  const startDate = config?.START_DATE
    ? new Date(config.START_DATE)
    : undefined;
  const endDate = config?.END_DATE ? new Date(config.END_DATE) : undefined;

  if (startDate && isNaN(startDate.getTime())) {
    console.error("Invalid START_DATE in configuration:", config.START_DATE);
  }
  if (endDate && isNaN(endDate.getTime())) {
    console.error("Invalid END_DATE in configuration:", config.END_DATE);
  }

  if (!startDate || !endDate) {
    return <div>Configuration error: START_DATE and END_DATE are not set.</div>;
  } else {
    return <TimeTrackingDashboard startDate={startDate} endDate={endDate} />;
  }
}
