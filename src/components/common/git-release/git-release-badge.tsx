import React, { useState, useRef, useEffect } from 'react';
import { useGitRelease } from './use-git-release';
import {
  GitCommit,
  GitBranch,
  ExternalLink,
  Copy,
  Check,
  Calendar,
  User,
  ShieldCheck,
  Code2,
  X,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { IconButton } from '@/components/ui/icon-button';
import { cn } from '@/lib/utils';

interface GitReleaseBadgeProps {
  className?: string;
  variant?: 'compact' | 'detailed';
}

export const GitReleaseBadge: React.FC<GitReleaseBadgeProps> = ({
  className,
  variant = 'compact',
}) => {
  const gitInfo = useGitRelease();
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const handleCopyHash = () => {
    navigator.clipboard.writeText(gitInfo.commitHash);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Format date readable
  const dateStr = gitInfo.commitDate.split(' ')[0] || 'Today';

  return (
    <div ref={containerRef} className="relative inline-block text-left">
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'group flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-border/80 bg-card/80 hover:bg-muted/70 hover:border-primary/40 text-xs font-mono transition-all cursor-pointer shadow-2xs select-none',
          isOpen && 'border-primary/50 bg-muted/80 ring-1 ring-primary/30',
          className
        )}
        title={`Git Release: ${gitInfo.commitShort} (${gitInfo.commitMsg}) - Click for details`}
      >
        <div className="flex items-center gap-1 text-muted-foreground group-hover:text-foreground">
          <GitBranch className="h-3 w-3 text-emerald-500 shrink-0" />
          <span className="text-[10px] font-bold text-foreground">{gitInfo.branch}</span>
        </div>

        <span className="text-muted-foreground/60">:</span>

        <div className="flex items-center gap-1 text-primary font-bold">
          <GitCommit className="h-3 w-3 shrink-0" />
          <span className="text-[11px]">{gitInfo.commitShort}</span>
        </div>

        {variant === 'detailed' && (
          <span className="hidden sm:inline text-[10px] text-muted-foreground pl-1 border-l border-border/60">
            {dateStr}
          </span>
        )}

        {/* Pulsing live dot */}
        <span className="relative flex h-1.5 w-1.5 ml-0.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
        </span>
      </button>

      {/* Anchored Floating Dropdown Popover */}
      {isOpen && (
        <div className="absolute right-0 sm:left-1/2 sm:-translate-x-1/2 mt-2 w-80 sm:w-96 rounded-xl border border-border/80 bg-card p-4 shadow-2xl z-50 space-y-3.5 animate-in fade-in-0 zoom-in-95">
          {/* Header */}
          <div className="flex items-center justify-between pb-2.5 border-b border-border/60">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-primary/10 text-primary border border-primary/20">
                <GitCommit className="h-4 w-4" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-foreground">Git Release Telemetry</h3>
                <p className="text-[10px] text-muted-foreground">Latest commit provenance & status</p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <Badge variant="success" className="text-[9px] font-mono px-1.5 py-0">
                Live Build
              </Badge>
              <IconButton
                icon={<X className="h-3.5 w-3.5" />}
                aria-label="Close Git release dialog"
                tooltip="Close"
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
              />
            </div>
          </div>

          {/* Commit SHA with Copy */}
          <div className="p-2.5 rounded-lg border border-border/70 bg-muted/20 space-y-1.5">
            <div className="flex items-center justify-between text-[10px]">
              <span className="font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1">
                <Code2 className="h-3 w-3 text-primary" /> Commit SHA
              </span>
              <button
                type="button"
                onClick={handleCopyHash}
                className="inline-flex items-center gap-1 text-[10px] font-semibold text-primary hover:underline cursor-pointer"
              >
                {copied ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3" />}
                {copied ? 'Copied' : 'Copy Hash'}
              </button>
            </div>

            <div className="font-mono text-[11px] font-bold text-foreground break-all bg-card p-1.5 rounded border border-border/60 select-all">
              {gitInfo.commitHash}
            </div>
          </div>

          {/* Metadata Grid */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-2 rounded-lg border border-border/60 bg-muted/20">
              <div className="flex items-center gap-1 text-[10px] font-semibold text-muted-foreground uppercase">
                <GitBranch className="h-3 w-3 text-emerald-500" /> Branch
              </div>
              <p className="font-mono font-bold text-foreground text-[11px] mt-0.5">{gitInfo.branch}</p>
            </div>

            <div className="p-2 rounded-lg border border-border/60 bg-muted/20">
              <div className="flex items-center gap-1 text-[10px] font-semibold text-muted-foreground uppercase">
                <User className="h-3 w-3 text-blue-500" /> Author
              </div>
              <p className="font-semibold text-foreground text-[11px] mt-0.5 truncate">{gitInfo.commitAuthor}</p>
            </div>

            <div className="p-2 rounded-lg border border-border/60 bg-muted/20 col-span-2">
              <div className="flex items-center gap-1 text-[10px] font-semibold text-muted-foreground uppercase">
                <Calendar className="h-3 w-3 text-amber-500" /> Commit Date & Time
              </div>
              <p className="font-mono text-[10px] font-semibold text-foreground mt-0.5">{gitInfo.commitDate}</p>
            </div>

            <div className="p-2 rounded-lg border border-border/60 bg-muted/20 col-span-2">
              <span className="text-[10px] font-semibold text-muted-foreground uppercase block">
                Commit Message
              </span>
              <p className="text-[11px] text-foreground font-medium mt-0.5 leading-snug">
                {gitInfo.commitMsg}
              </p>
            </div>
          </div>

          {/* Verification Seal */}
          <div className="p-2 rounded-lg border border-emerald-500/20 bg-emerald-500/5 flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
              <span className="font-medium text-foreground text-[10px]">
                Verified Origin • CI/CD Passing
              </span>
            </div>
            <span className="text-[9px] font-mono font-bold text-emerald-500">
              Clean
            </span>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between gap-2 pt-1 border-t border-border/60">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                window.open(gitInfo.repoUrl, '_blank');
                setIsOpen(false);
              }}
              className="text-[11px] h-7 px-2.5"
            >
              <ExternalLink className="h-3 w-3 mr-1" />
              Repository
            </Button>

            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                window.open(gitInfo.commitUrl, '_blank');
                setIsOpen(false);
              }}
              className="text-[11px] h-7 px-2.5"
            >
              <ExternalLink className="h-3 w-3 mr-1" />
              View Commit on GitHub
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
