"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

// Client-visible configuration shape (partial, only properties used by components)
export type RuntimeClientConfig = {
  GITLAB_CONFIG?: {
    API_URL?: string;
    GROUP_PATH?: string;
    ISSUE_BASE_URL?: string;
  };
  TEAM_MEMBERS?: string[];
  CATEGORIES?: Record<string, string>;
  CATEGORY_LIST?: string[];
  CATEGORY_MAP?: Record<string, number>;
  COLORS?: {
    PRIMARY?: string[];
    TEAM?: string[];
    HEATMAP?: string[];
    CATEGORY?: Record<string, string>;
  };
  CHART_CONFIG?: {
    HEIGHTS: { SMALL: number; MEDIUM: number; LARGE: number };
    ANGLES: { LABEL_ROTATION: number };
    DECIMAL_PLACES: number;
  };
  TIME_CONFIG?: {
    SECONDS_PER_HOUR: number;
    SECONDS_PER_MINUTE: number;
    HOURS_PER_DAY: number;
    DAYS_PER_WEEK: number;
  };
  ERROR_MESSAGES?: Record<string, string>;
  GERMAN_DAYS?: string[];
  GERMAN_DAY_SHORT?: string[];
  CHART_TITLES?: Record<string, string>;
  CHART_LABELS?: Record<string, string>;
  TOOLTIP_LABELS?: Record<string, string>;
  DISPLAY_CONFIG?: Record<string, number>;
  KPI_LABELS?: Record<string, string>;
  DEVIATION_THRESHOLDS?: Record<string, number>;
  START_DATE?: string | null;
  END_DATE?: string | null;
};

const RuntimeConfigContext = createContext<{
  config: RuntimeClientConfig | null;
  loading: boolean;
  error: string | null;
}>({ config: null, loading: true, error: null });

export const RuntimeConfigProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [config, setConfig] = useState<RuntimeClientConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    const fetchConfig = async () => {
      try {
        const res = await fetch("/api/config");
        if (!res.ok) throw new Error(`Failed to load config: ${res.status}`);
        const json = await res.json();
        if (mounted) setConfig(json as RuntimeClientConfig);
      } catch (err) {
        if (mounted) setError((err as Error)?.message ?? String(err));
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetchConfig();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <RuntimeConfigContext.Provider value={{ config, loading, error }}>
      {children}
    </RuntimeConfigContext.Provider>
  );
};

export const useRuntimeConfig = () => {
  const ctx = useContext(RuntimeConfigContext);
  if (!ctx)
    throw new Error(
      "useRuntimeConfig must be used within RuntimeConfigProvider"
    );
  return ctx;
};
