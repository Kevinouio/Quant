import type { PagerTarget } from "../../lib/readingFlow";

function PagerAction({
  target,
  align = "left"
}: {
  target: PagerTarget;
  align?: "left" | "right";
}) {
  const classNames = ["page-pager__action", align === "right" ? "is-right" : ""]
    .filter(Boolean)
    .join(" ");

  return (
    <a className={classNames} href={target.href}>
      <span className="page-pager__eyebrow">{target.actionLabel}</span>
      <span className="page-pager__label">{target.detailLabel}</span>
    </a>
  );
}

export function PagePager({
  prev,
  next
}: {
  prev?: PagerTarget | null;
  next?: PagerTarget | null;
}) {
  if (!prev && !next) {
    return null;
  }

  return (
    <nav className="page-pager" aria-label="Page navigation">
      <div className="page-pager__slot">{prev ? <PagerAction target={prev} align="left" /> : null}</div>
      <div className="page-pager__slot page-pager__slot--right">
        {next ? <PagerAction target={next} align="right" /> : null}
      </div>
    </nav>
  );
}
