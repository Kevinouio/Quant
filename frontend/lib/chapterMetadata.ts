/**
 * Central chapter registry for navigation and ordering.
 * This can be consumed by app routes and sidebar components later.
 */
export type ChapterMeta = {
  slug: string;
  title: string;
  order: number;
  level: "beginner" | "intermediate" | "advanced";
  summary: string;
};

export const chapters: ChapterMeta[] = [
  {
    slug: "passive-indexing",
    title: "Passive Indexing",
    order: 1,
    level: "beginner",
    summary: "Core principles of benchmark tracking and low-cost exposure."
  },
  {
    slug: "random-walks",
    title: "Random Walks in Markets",
    order: 2,
    level: "beginner",
    summary: "What random walk assumptions imply for forecasting and risk."
  },
  {
    slug: "ewma-volatility",
    title: "EWMA Volatility Modeling",
    order: 3,
    level: "intermediate",
    summary: "Exponentially weighted volatility estimation for risk tracking."
  },
  {
    slug: "mean-reversion",
    title: "Mean Reversion Basics",
    order: 4,
    level: "intermediate",
    summary: "Detecting and testing reversion behavior in price series."
  },
  {
    slug: "factor-investing",
    title: "Factor Investing Fundamentals",
    order: 5,
    level: "advanced",
    summary: "Building intuition for factor premia and portfolio construction."
  }
];
