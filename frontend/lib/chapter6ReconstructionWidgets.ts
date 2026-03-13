export const CHAPTER6_RECONSTRUCTION_WIDGET_IDS = [
  "chapter6-recon-run-controls",
  "chapter6-recon-sp-compare",
  "chapter6-recon-dow-compare",
  "chapter6-recon-sp-weights",
  "chapter6-recon-dow-weights",
  "chapter6-recon-summary"
] as const;

export function isChapter6ReconstructionWidgetId(widgetId: string): boolean {
  const normalized = widgetId.trim().toLowerCase();
  return (CHAPTER6_RECONSTRUCTION_WIDGET_IDS as readonly string[]).includes(normalized);
}
