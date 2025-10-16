import { NextResponse } from "next/server";
import {
  GITLAB_CONFIG as SERVER_GITLAB_CONFIG,
  TEAM_MEMBERS as SERVER_TEAM_MEMBERS,
  CATEGORIES as SERVER_CATEGORIES,
  CATEGORY_LIST as SERVER_CATEGORY_LIST,
  CATEGORY_MAP as SERVER_CATEGORY_MAP,
  COLORS,
  CHART_CONFIG,
  TIME_CONFIG,
  DEVIATION_THRESHOLDS,
  ERROR_MESSAGES,
  GERMAN_DAYS,
  GERMAN_DAY_SHORT,
  CHART_TITLES,
  CHART_LABELS,
  TOOLTIP_LABELS,
  DISPLAY_CONFIG,
  KPI_LABELS,
} from "../../../config/dashboardConfig";

// Server runtime API that exposes non-secret configuration to the client at runtime.
export async function GET() {
  const payload = {
    GITLAB_CONFIG: {
      API_URL:
        process.env.NEXT_PUBLIC_GITLAB_API_URL ?? SERVER_GITLAB_CONFIG.API_URL,
      GROUP_PATH:
        process.env.NEXT_PUBLIC_GITLAB_GROUP_PATH ??
        SERVER_GITLAB_CONFIG.GROUP_PATH,
      ISSUE_BASE_URL:
        process.env.NEXT_PUBLIC_GITLAB_ISSUE_BASE_URL ??
        SERVER_GITLAB_CONFIG.ISSUE_BASE_URL,
    },
    TEAM_MEMBERS:
      process.env.NEXT_PUBLIC_TEAM_MEMBERS?.split(",")
        .map((s) => s.trim())
        .filter(Boolean) ??
      (Array.isArray(SERVER_TEAM_MEMBERS) ? SERVER_TEAM_MEMBERS : []),
    CATEGORIES: (() => {
      const raw = process.env.NEXT_PUBLIC_CATEGORIES;
      if (!raw) return SERVER_CATEGORIES ?? {};
      try {
        const parsed = JSON.parse(String(raw));
        if (parsed && typeof parsed === "object" && !Array.isArray(parsed))
          return parsed;
      } catch {
        // fall back
      }
      return SERVER_CATEGORIES ?? {};
    })(),
    CATEGORY_LIST: SERVER_CATEGORY_LIST,
    CATEGORY_MAP: SERVER_CATEGORY_MAP,
    COLORS,
    CHART_CONFIG,
    TIME_CONFIG,
    ERROR_MESSAGES,
    GERMAN_DAYS,
    GERMAN_DAY_SHORT,
    CHART_TITLES,
    CHART_LABELS,
    TOOLTIP_LABELS,
    DEVIATION_THRESHOLDS,
    DISPLAY_CONFIG,
    KPI_LABELS,
    START_DATE: process.env.START_DATE || null,
    END_DATE: process.env.END_DATE || null,
  };

  return NextResponse.json(payload);
}
