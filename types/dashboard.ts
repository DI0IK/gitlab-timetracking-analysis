export interface Issue {
  title: string;
  timeEstimate: number;
  totalTimeSpent: number;
  category: string;
  iid: string;
  labels: {
    nodes: Array<{ title: string }>;
  };
}

export interface Timelog {
  user: { name: string };
  issue: {
    title: string;
    iid: string;
    labels: { nodes: Array<{ title: string }> };
    timeEstimate: number;
    totalTimeSpent: number;
  };
  spentAt: string;
  timeSpent: number;
}

export interface ProjectMetrics {
  sprintData: Array<{
    sprintStart: string;
    sprintEnd: string;
    totalHours: number;
    categoryHours: Record<string, number>;
    userHours: Record<string, number>;
    sprintNumber: number;
  }>;
  totalSprints: number;
  averageVelocity: number;
  categoryDistribution: Array<{ category: string; hours: number }>;
}

export interface ProductivityPatterns {
  hourlyData: Array<{ hour: string; value: number }>;
  weeklyData: Array<{ day: string; value: number }>;
  peakHour: { hour: string; value: number };
  peakDay: { day: string; value: number };
}

export interface CollaborationData {
  source: string;
  target: string;
  value: number;
}

export interface AverageTeamMembersData {
  category: string;
  averageMembers: number;
  totalIssues: number;
  totalMembers: number;
}

export interface IssueComplexityData {
  category: string;
  averageTime: number;
  totalIssues: number;
  totalTime: number;
}

export interface HeatmapData {
  date: string;
  value: number;
  day: string;
  month: string;
  week: number;
  year: string;
}

export interface TimeConfig {
  SECONDS_PER_HOUR: number;
  SECONDS_PER_MINUTE: number;
  HOURS_PER_DAY: number;
  DAYS_PER_WEEK: number;
  DECIMAL_PLACES: number;
}

export interface RuntimeClientConfig {
  GITLAB_CONFIG?: {
    API_URL?: string;
    GROUP_PATH?: string;
    ISSUE_BASE_URL?: string;
  };
  TEAM_MEMBERS?: string[];
  CATEGORY_MAP?: Record<string, number>;
  COLORS?: { HEATMAP?: string[] } & Record<string, any>;
  TIME_CONFIG?: TimeConfig;
  ERROR_MESSAGES?: Record<string, string>;
  GERMAN_DAYS?: string[];
  [key: string]: any;
}
