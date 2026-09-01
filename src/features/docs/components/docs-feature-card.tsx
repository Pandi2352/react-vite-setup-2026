import React from 'react';
import { DocFeature } from '../types/docs.types';
import { Badge } from '@/components/ui/badge';
import {
  LayoutGrid,
  BotMessageSquare,
  Blocks,
  Activity,
  Globe,
  Palette,
  Clock,
  MapPin,
  Table,
  Search,
  ShieldCheck,
  SidebarClose,
  CheckCircle2,
  Code2,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface DocsFeatureCardProps {
  feature: DocFeature;
}

const getFeatureIcon = (name: string, className: string) => {
  switch (name) {
    case 'LayoutGrid':
      return <LayoutGrid className={className} />;
    case 'SidebarClose':
      return <SidebarClose className={className} />;
    case 'BotMessageSquare':
      return <BotMessageSquare className={className} />;
    case 'Blocks':
      return <Blocks className={className} />;
    case 'Activity':
      return <Activity className={className} />;
    case 'Globe':
      return <Globe className={className} />;
    case 'Palette':
      return <Palette className={className} />;
    case 'Clock':
      return <Clock className={className} />;
    case 'MapPin':
      return <MapPin className={className} />;
    case 'Table':
      return <Table className={className} />;
    case 'Search':
      return <Search className={className} />;
    case 'ShieldCheck':
      return <ShieldCheck className={className} />;
    default:
      return <Code2 className={className} />;
  }
};

export const DocsFeatureCard: React.FC<DocsFeatureCardProps> = ({ feature }) => {
  return (
    <div className="p-3.5 rounded-xl border border-border bg-card/70 hover:bg-card hover:border-primary/40 transition-all space-y-2.5 shadow-2xs">
      {/* Card Header */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-start gap-2.5">
          <div className={cn('flex h-8 w-8 items-center justify-center rounded-lg shrink-0 mt-0.5', feature.iconBg)}>
            {getFeatureIcon(feature.iconName, cn('h-4 w-4', feature.iconColor))}
          </div>
          <div>
            <h3 className="text-xs font-bold text-foreground leading-snug">{feature.title}</h3>
            <p className="text-[11px] text-muted-foreground leading-relaxed mt-0.5">{feature.summary}</p>
          </div>
        </div>

        <Badge variant={feature.badgeVariant || 'secondary'} className="text-[9px] font-mono shrink-0 px-1.5 py-0">
          {feature.badge}
        </Badge>
      </div>

      {/* Bullet Highlights */}
      <div className="space-y-1 bg-muted/20 p-2.5 rounded-lg border border-border/50">
        <span className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">
          Key Capabilities:
        </span>
        {feature.highlights.map((item, idx) => (
          <div key={idx} className="flex items-start gap-1.5 text-[11px] text-foreground/90 leading-tight">
            <CheckCircle2 className="h-3 w-3 text-primary shrink-0 mt-0.5" />
            <span>{item}</span>
          </div>
        ))}
      </div>

      {/* Tech Stack Chips & File Path */}
      <div className="flex items-center justify-between gap-2 pt-1 text-[10px] text-muted-foreground border-t border-border/40">
        <div className="flex flex-wrap gap-1">
          {feature.techStack?.map((tech) => (
            <span key={tech} className="px-1.5 py-0.5 rounded bg-muted text-[9px] font-mono font-medium text-muted-foreground">
              {tech}
            </span>
          ))}
        </div>

        {feature.filePath && (
          <span className="font-mono text-[9px] text-muted-foreground/80 truncate max-w-[140px]" title={feature.filePath}>
            {feature.filePath.split('/').pop()}
          </span>
        )}
      </div>
    </div>
  );
};
