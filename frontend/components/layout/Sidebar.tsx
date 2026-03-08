type SidebarItem = {
  href: string;
  label: string;
};

type SidebarProps = {
  items: SidebarItem[];
};

/**
 * Reusable sidebar skeleton for textbook navigation.
 */
export function Sidebar({ items }: SidebarProps) {
  return (
    <aside>
      <nav aria-label="Chapter navigation">
        <ul>
          {items.map((item) => (
            <li key={item.href}>
              <a href={item.href}>{item.label}</a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
