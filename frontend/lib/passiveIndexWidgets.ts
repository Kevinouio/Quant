export const PASSIVE_INDEX_WIDGET_IDS = [
  "passive-index-choose-stock",
  "passive-index-market-data",
  "passive-index-weights-differ",
  "passive-index-index-paths",
  "passive-index-summary"
] as const;

export function isPassiveIndexWidgetId(widgetId: string): boolean {
  const normalized = widgetId.trim().toLowerCase();
  return (PASSIVE_INDEX_WIDGET_IDS as readonly string[]).includes(normalized);
}
