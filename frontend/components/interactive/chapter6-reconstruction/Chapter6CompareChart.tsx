"use client";

import type { Chapter6ComparePoint } from "../../../lib/chapter6Reconstruction";

const SVG_WIDTH = 980;
const SVG_HEIGHT = 320;
const CHART_LEFT = 64;
const CHART_RIGHT = 22;
const CHART_TOP = 24;
const CHART_BOTTOM = 52;

function buildSeriesPath(
  points: Chapter6ComparePoint[],
  key: "reconstructed" | "official",
  minValue: number,
  maxValue: number
): string {
  if (points.length === 0) {
    return "";
  }

  const chartWidth = SVG_WIDTH - CHART_LEFT - CHART_RIGHT;
  const chartHeight = SVG_HEIGHT - CHART_TOP - CHART_BOTTOM;
  const range = Math.max(maxValue - minValue, 1e-9);

  return points
    .map((point, index) => {
      const x =
        points.length === 1
          ? CHART_LEFT + chartWidth / 2
          : CHART_LEFT + (index / (points.length - 1)) * chartWidth;
      const value = point[key];
      const y = CHART_TOP + ((maxValue - value) / range) * chartHeight;
      return `${index === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`;
    })
    .join(" ");
}

function yForValue(value: number, minValue: number, maxValue: number): number {
  const range = Math.max(maxValue - minValue, 1e-9);
  const chartHeight = SVG_HEIGHT - CHART_TOP - CHART_BOTTOM;
  return CHART_TOP + ((maxValue - value) / range) * chartHeight;
}

export function Chapter6CompareChart({
  title,
  description,
  points,
  reconstructedLabel,
  officialLabel,
  reconstructedColor = "#205a96",
  officialColor = "#b86817"
}: {
  title: string;
  description: string;
  points: Chapter6ComparePoint[];
  reconstructedLabel: string;
  officialLabel: string;
  reconstructedColor?: string;
  officialColor?: string;
}) {
  if (points.length === 0) {
    return <p className="index-demo__message">No series points were available for this run.</p>;
  }

  const values = points.flatMap((point) => [point.reconstructed, point.official]);
  const minChartValue = Math.min(...values);
  const maxChartValue = Math.max(...values);
  const reconstructedPath = buildSeriesPath(points, "reconstructed", minChartValue, maxChartValue);
  const officialPath = buildSeriesPath(points, "official", minChartValue, maxChartValue);
  const yTicks = [maxChartValue, (maxChartValue + minChartValue) / 2, minChartValue];
  const xAxisY = SVG_HEIGHT - CHART_BOTTOM;

  return (
    <>
      <div className="index-demo__chart-wrap">
        <svg className="index-demo__chart" viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`} role="img">
          <title>{title}</title>
          <desc>{description}</desc>
          {yTicks.map((tick, index) => {
            const y = yForValue(tick, minChartValue, maxChartValue);
            return (
              <g key={`y-tick-${index}`}>
                <line
                  x1={CHART_LEFT}
                  y1={y}
                  x2={SVG_WIDTH - CHART_RIGHT}
                  y2={y}
                  stroke="#e7eef6"
                  strokeWidth="1"
                />
                <text x={CHART_LEFT - 8} y={y + 4} textAnchor="end" className="index-demo__axis-tick">
                  {tick.toFixed(1)}
                </text>
              </g>
            );
          })}
          <line
            x1={CHART_LEFT}
            y1={xAxisY}
            x2={SVG_WIDTH - CHART_RIGHT}
            y2={xAxisY}
            stroke="#c5d3e4"
            strokeWidth="1"
          />
          <line
            x1={CHART_LEFT}
            y1={CHART_TOP}
            x2={CHART_LEFT}
            y2={xAxisY}
            stroke="#c5d3e4"
            strokeWidth="1"
          />
          <path d={reconstructedPath} fill="none" stroke={reconstructedColor} strokeWidth="2.2" />
          <path d={officialPath} fill="none" stroke={officialColor} strokeWidth="2.2" />
          <text
            x={(CHART_LEFT + (SVG_WIDTH - CHART_RIGHT)) / 2}
            y={SVG_HEIGHT - 12}
            textAnchor="middle"
            className="index-demo__axis-label"
          >
            Time (trading days in selected run)
          </text>
          <text
            x={18}
            y={SVG_HEIGHT / 2}
            textAnchor="middle"
            transform={`rotate(-90 18 ${SVG_HEIGHT / 2})`}
            className="index-demo__axis-label"
          >
            Index level (base = 100)
          </text>
          <text x={CHART_LEFT} y={xAxisY + 18} textAnchor="start" className="index-demo__axis-tick">
            {points[0]?.date}
          </text>
          <text
            x={SVG_WIDTH - CHART_RIGHT}
            y={xAxisY + 18}
            textAnchor="end"
            className="index-demo__axis-tick"
          >
            {points[points.length - 1]?.date}
          </text>
        </svg>
      </div>
      <div className="index-demo__legend">
        <span>
          <i className="index-demo__legend-dot" style={{ background: reconstructedColor }} />
          {reconstructedLabel}
        </span>
        <span>
          <i className="index-demo__legend-dot" style={{ background: officialColor }} />
          {officialLabel}
        </span>
        <span>
          {`Range: ${points[0]?.date} to ${points[points.length - 1]?.date}`}
        </span>
      </div>
    </>
  );
}
