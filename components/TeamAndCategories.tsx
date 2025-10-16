import React from "react";
import { useRuntimeConfig } from "../lib/runtimeConfig";
import { RuntimeClientConfig } from "@/types/dashboard";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface TeamAndCategoriesProps {
  pieData: Array<{ name: string; value: number }>;
  barData: Array<{ name: string; value: number }>;
  COLORS: string[];
}

const TeamAndCategories: React.FC<TeamAndCategoriesProps> = ({
  pieData,
  barData,
  COLORS,
}) => {
  const { config, loading } = useRuntimeConfig();
  if (loading) return null;
  const { CHART_CONFIG, CHART_TITLES, TOOLTIP_LABELS } = (config ??
    {}) as RuntimeClientConfig;

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-6 text-gray-800">
        Team & Kategorien
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">
            {CHART_TITLES?.CATEGORY_DISTRIBUTION}
          </h4>
          <ResponsiveContainer
            width="100%"
            height={CHART_CONFIG.HEIGHTS.MEDIUM}
          >
            <PieChart>
              <Pie
                dataKey="value"
                data={pieData}
                outerRadius={100}
                label={({ name, value }: { name: string; value?: number }) =>
                  value !== undefined
                    ? `${name}\n${value.toFixed(CHART_CONFIG.DECIMAL_PLACES)}h`
                    : name
                }
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number) => [
                  `${value.toFixed(CHART_CONFIG.DECIMAL_PLACES)}h`,
                  TOOLTIP_LABELS?.HOURS,
                ]}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">
            {CHART_TITLES?.TEAM_ACTIVITY}
          </h4>
          <ResponsiveContainer
            width="100%"
            height={CHART_CONFIG.HEIGHTS.MEDIUM}
          >
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip
                formatter={(value: number) => [
                  `${value.toFixed(CHART_CONFIG.DECIMAL_PLACES)}h`,
                  TOOLTIP_LABELS?.HOURS,
                ]}
              />
              <Legend />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default TeamAndCategories;
