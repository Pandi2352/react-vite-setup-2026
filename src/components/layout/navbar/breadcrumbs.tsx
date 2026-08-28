import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { navigationConfig } from '@/config/navigation';

export const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  const getLabelForPath = (segment: string, fullPath: string) => {
    for (const section of navigationConfig) {
      for (const item of section.items) {
        if (item.path === fullPath) return item.label;
        if (item.children) {
          for (const child of item.children) {
            if (child.path === fullPath) return child.label;
          }
        }
      }
    }
    return segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');
  };

  return (
    <nav aria-label="Breadcrumb" className="flex items-center text-xs text-muted-foreground py-1 select-none">
      <ol className="flex items-center gap-1.5 flex-wrap">
        <li>
          <Link
            to="/dashboard"
            className="flex items-center gap-1 hover:text-primary transition-colors font-medium"
          >
            <Home className="h-3.5 w-3.5" />
            <span>Home</span>
          </Link>
        </li>

        {pathnames.map((segment, index) => {
          const fullPath = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;
          const label = getLabelForPath(segment, fullPath);

          return (
            <li key={fullPath} className="flex items-center gap-1.5">
              <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/60 shrink-0" />
              {isLast ? (
                <span className="font-semibold text-foreground" aria-current="page">
                  {label}
                </span>
              ) : (
                <Link to={fullPath} className="hover:text-primary transition-colors font-medium">
                  {label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
