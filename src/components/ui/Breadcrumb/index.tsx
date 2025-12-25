import Link from "next/link";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export default function Breadcrumb({ items, className = "" }: BreadcrumbProps) {
  return (
    <nav className={`text-sm text-gray-600 ${className}`}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <span key={index}>
            {item.href && !isLast ? (
              <Link href={item.href} className="hover:text-gray-900">
                {item.label}
              </Link>
            ) : (
              <span className={isLast ? "text-gray-900" : ""}>
                {item.label}
              </span>
            )}
            {!isLast && " / "}
          </span>
        );
      })}
    </nav>
  );
}
