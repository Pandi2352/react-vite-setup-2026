import React from 'react';
import {
  Server,
  Database,
  Search,
  GitBranch,
  FolderTree,
  Play,
  Clock,
  Terminal,
} from 'lucide-react';
import { MCPServer } from '../types/mcp.types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';

export interface MCPServerCardProps {
  server: MCPServer;
  onToggleEnabled: (id: string) => void;
  onSelectToolRunner: (serverId: string) => void;
}

export const MCPServerCard: React.FC<MCPServerCardProps> = ({
  server,
  onToggleEnabled,
  onSelectToolRunner,
}) => {
  const getCategoryIcon = (category: MCPServer['category']) => {
    switch (category) {
      case 'database':
        return <Database className="h-4 w-4 text-emerald-400" />;
      case 'search':
        return <Search className="h-4 w-4 text-amber-400" />;
      case 'git':
        return <GitBranch className="h-4 w-4 text-violet-400" />;
      case 'filesystem':
        return <FolderTree className="h-4 w-4 text-blue-400" />;
      default:
        return <Server className="h-4 w-4 text-primary" />;
    }
  };

  const isConnected = server.status === 'connected';

  return (
    <div
      className={cn(
        'group rounded-xl border p-3.5 space-y-3 transition-all duration-200',
        server.enabled
          ? 'border-border bg-card hover:border-primary/50 shadow-2xs'
          : 'border-border/60 bg-muted/20 opacity-70'
      )}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border bg-muted/60">
            {getCategoryIcon(server.category)}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <h4 className="text-xs font-bold text-foreground font-mono truncate">{server.name}</h4>
              <Badge variant="outline" className="text-[9px] px-1 py-0 h-3.5 font-normal">
                v{server.version}
              </Badge>
            </div>
            <p className="text-[11px] text-muted-foreground line-clamp-1">{server.description}</p>
          </div>
        </div>

        {/* Enable Switch */}
        <Switch
          checked={server.enabled}
          onChange={() => onToggleEnabled(server.id)}
        />
      </div>

      {/* Stats and status tags */}
      <div className="flex items-center justify-between pt-1 border-t border-border/50 text-[11px]">
        <div className="flex items-center gap-2">
          {/* Status indicator */}
          <div className="flex items-center gap-1">
            <span
              className={cn(
                'h-2 w-2 rounded-full',
                isConnected ? 'bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.6)]' : 'bg-muted-foreground'
              )}
            />
            <span className="text-[10px] font-medium text-foreground capitalize">
              {server.status}
            </span>
          </div>

          {isConnected && server.latencyMs !== undefined && (
            <span className="text-[10px] font-mono text-muted-foreground flex items-center gap-0.5">
              <Clock className="h-2.5 w-2.5" />
              {server.latencyMs}ms
            </span>
          )}
        </div>

        {/* Capabilities counts */}
        <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground font-mono">
          <span className="bg-muted px-1.5 py-0.5 rounded" title="Tools count">
            {server.toolsCount} tools
          </span>
          <span className="bg-muted px-1.5 py-0.5 rounded" title="Resources count">
            {server.resourcesCount} res
          </span>
        </div>
      </div>

      {/* Action button */}
      <div className="flex items-center justify-between pt-1">
        <div className="flex items-center gap-1 text-[10px] font-mono text-muted-foreground">
          <Terminal className="h-3 w-3" />
          <span>{server.transport}</span>
        </div>

        <Button
          size="sm"
          variant="outline"
          onClick={() => onSelectToolRunner(server.id)}
          disabled={!server.enabled || !isConnected}
          className="h-6 text-[10px] px-2 gap-1 rounded-md"
        >
          <Play className="h-2.5 w-2.5 text-primary" />
          <span>Test Tools</span>
        </Button>
      </div>
    </div>
  );
};
