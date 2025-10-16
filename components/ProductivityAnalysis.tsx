import React from "react";
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { useRuntimeConfig } from "../lib/runtimeConfig";
import { ProductivityPatterns, RuntimeClientConfig } from "@/types/dashboard";

interface ProductivityAnalysisProps {
  productivityPatterns: ProductivityPatterns;
}

const ProductivityAnalysis: React.FC<ProductivityAnalysisProps> = ({
  productivityPatterns,
}) => {
  const { config, loading } = useRuntimeConfig();
  if (loading) return null;
  const { CHART_CONFIG, CHART_TITLES, TOOLTIP_LABELS, CHART_LABELS } =
    (config ?? {}) as RuntimeClientConfig;
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-6 text-gray-800">
        Produktivitätsanalyse
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Hourly Pattern */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">
            {CHART_TITLES.HOURLY_DISTRIBUTION}
          </h4>
          <ResponsiveContainer
            width="100%"
            height={CHART_CONFIG.HEIGHTS.MEDIUM}
          >
            <BarChart data={productivityPatterns.hourlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="hour"
                label={{ value: "Uhrzeit", position: "bottom" }}
              />
              <YAxis
                label={{
                  value: TOOLTIP_LABELS.HOURS,
                  angle: -90,
                  position: "insideLeft",
                }}
              />
              <Tooltip
                formatter={(value: number) => [
                  `${value.toFixed(CHART_CONFIG.DECIMAL_PLACES)}h`,
                  TOOLTIP_LABELS.HOURS,
                ]}
              />
              <Bar dataKey="value" fill="#8884d8" name={CHART_LABELS.WORK_TIME}>
                {productivityPatterns.hourlyData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={
                      entry.hour === productivityPatterns.peakHour.hour
                        ? "#4CAF50"
                        : "#8884d8"
                    }
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Weekly Pattern */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">
            {CHART_TITLES.WEEKLY_DISTRIBUTION}
          </h4>
          <ResponsiveContainer
            width="100%"
            height={CHART_CONFIG.HEIGHTS.MEDIUM}
          >
            <BarChart data={productivityPatterns.weeklyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="day"
                label={{ value: "Wochentag", position: "bottom" }}
              />
              <YAxis
                label={{
                  value: TOOLTIP_LABELS.HOURS,
                  angle: -90,
                  position: "insideLeft",
                }}
              />
              <Tooltip
                formatter={(value: number) => [
                  `${value.toFixed(CHART_CONFIG.DECIMAL_PLACES)}h`,
                  TOOLTIP_LABELS.HOURS,
                ]}
              />
              <Bar dataKey="value" fill="#82ca9d" name={CHART_LABELS.WORK_TIME}>
                {productivityPatterns.weeklyData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={
                      entry.day === productivityPatterns.peakDay.day
                        ? "#4CAF50"
                        : "#82ca9d"
                    }
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default ProductivityAnalysis;
