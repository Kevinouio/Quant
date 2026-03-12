"use client";

import { indexSeriesValues } from "../../../lib/passiveIndexingInteractive";
import { usePassiveIndexingDemo } from "./PassiveIndexingDemoContext";

const SVG_WIDTH = 980;
const SVG_HEIGHT = 320;
const CHART_LEFT = 64;
const CHART_RIGHT = 22;
const CHART_TOP = 24;
const CHART_BOTTOM = 52;

function buildSeriesPath(
  points: Array<{ equalWeighted: number; marketCapWeighted: number; priceWeighted: number }>,
  key: "equalWeighted" | "marketCapWeighted" | "priceWeighted",
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
        points.length === 1 ? CHART_LEFT + chartWidth / 2 : CHART_LEFT + (index / (points.length - 1)) * chartWidth;
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

export function PassiveIndexPathsWidget() {
  const { data, loading } = usePassiveIndexingDemo();

  if (!data) {
    return (
      <div className="index-demo__panel">
        <h4>Index Paths Starting at 100</h4>
        <p className="index-demo__message">
          {loading ? "Loading index paths..." : "Run the demo above to generate the three index paths."}
        </p>
      </div>
    );
  }

  const values = indexSeriesValues(data);
  const minChartValue = values.length > 0 ? Math.min(...values) : 99;
  const maxChartValue = values.length > 0 ? Math.max(...values) : 101;
  const equalPath = buildSeriesPath(data.indexPoints, "equalWeighted", minChartValue, maxChartValue);
  const marketCapPath = buildSeriesPath(data.indexPoints, "marketCapWeighted", minChartValue, maxChartValue);
  const pricePath = buildSeriesPath(data.indexPoints, "priceWeighted", minChartValue, maxChartValue);
  const yTicks = [maxChartValue, (maxChartValue + minChartValue) / 2, minChartValue];
  const xAxisY = SVG_HEIGHT - CHART_BOTTOM;

  return (
    <div className="index-demo__panel">
      <h4>Index Paths Starting at 100</h4>
      {data.indexPoints.length > 0 ? (
        <>
          <div className="index-demo__chart-wrap">
            <svg className="index-demo__chart" viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`} role="img">
              <title>Equal-weighted vs market-cap-weighted vs price-weighted index paths</title>
              <desc>
                X-axis shows time across the selected date range. Y-axis shows index level, rebased so all series start at 100.
              </desc>
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
              <path d={equalPath} fill="none" stroke="#205a96" strokeWidth="2.2" />
              <path d={marketCapPath} fill="none" stroke="#1f8f55" strokeWidth="2.2" />
              <path d={pricePath} fill="none" stroke="#b86817" strokeWidth="2.2" />
              <text
                x={(CHART_LEFT + (SVG_WIDTH - CHART_RIGHT)) / 2}
                y={SVG_HEIGHT - 12}
                textAnchor="middle"
                className="index-demo__axis-label"
              >
                Time (selected date range)
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
                {data.indexPoints[0].date}
              </text>
              <text
                x={SVG_WIDTH - CHART_RIGHT}
                y={xAxisY + 18}
                textAnchor="end"
                className="index-demo__axis-tick"
              >
                {data.indexPoints[data.indexPoints.length - 1].date}
              </text>
            </svg>
          </div>
          <div className="index-demo__legend">
            <span>
              <i className="index-demo__legend-dot index-demo__legend-dot--equal" />
              Equal-weighted
            </span>
            <span>
              <i className="index-demo__legend-dot index-demo__legend-dot--mcap" />
              Market-cap-weighted
            </span>
            <span>
              <i className="index-demo__legend-dot index-demo__legend-dot--price" />
              Price-weighted
            </span>
            <span>
              Range: {data.indexPoints[0].date} to {data.indexPoints[data.indexPoints.length - 1].date}
            </span>
          </div>
        </>
      ) : (
        <p className="index-demo__message">No overlapping index points were available for this run.</p>
      )}
    </div>
  );
}
