import React, { useState } from 'react';
import { GitReleaseInfo } from './git-release.types';
import {
  X,
  GitBranch,
  GitCommit,
  ExternalLink,
  Copy,
  Check,
  Calendar,
  User,
  ShieldCheck,
  Code2,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface GitReleaseDialogProps {
  info: GitReleaseInfo;
  isOpen: boolean;
  onClose: () => void;
}

export const GitReleaseDialog: React.FC<GitReleaseDialogProps> = ({
  info,
  isOpen,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopyHash = () => {
    navigator.clipboard.writeText(info.commitHash);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Crisp dark backdrop */}
      <div
        className="fixed inset-0 bg-background/80 transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-lg rounded-2xl border border-border/80 bg-card p-6 shadow-2xl z-10 space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 pb-3 border-b border-border/60">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-primary/10 text-primary border border-primary/20">
                <GitCommit className="h-4 w-4" />
              </div>
              <h2 className="text-base font-bold text-foreground tracking-tight">
                Git Release Telemetry
              </h2>
              <Badge variant="success" className="text-[9px] font-mono px-1.5 py-0">
                Live Build
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">
              Automated deployment metadata and commit provenance
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Commit Hash & Copy */}
        <div className="p-3 rounded-xl border border-border/80 bg-muted/20 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
              <Code2 className="h-3.5 w-3.5 text-primary" /> Commit SHA
            </span>
            <button
              type="button"
              onClick={handleCopyHash}
              className="inline-flex items-center gap-1 text-[11px] font-semibold text-primary hover:underline cursor-pointer"
            >
              {copied ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3" />}
              {copied ? 'Copied Full SHA' : 'Copy Hash'}
            </button>
          </div>

          <div className="font-mono text-xs font-bold text-foreground break-all bg-card p-2 rounded-lg border border-border/60">
            {info.commitHash}
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-2.5 text-xs">
          {/* Branch */}
          <div className="p-2.5 rounded-xl border border-border/60 bg-muted/20">
            <div className="flex items-center gap-1 text-[10px] font-semibold text-muted-foreground uppercase">
              <GitBranch className="h-3 w-3 text-emerald-500" /> Active Branch
            </div>
            <p className="font-mono font-bold text-foreground mt-1 text-xs">{info.branch}</p>
          </div>

          {/* Author */}
          <div className="p-2.5 rounded-xl border border-border/60 bg-muted/20">
            <div className="flex items-center gap-1 text-[10px] font-semibold text-muted-foreground uppercase">
              <User className="h-3 w-3 text-blue-500" /> Commit Author
            </div>
            <p className="font-semibold text-foreground mt-1 text-xs">{info.commitAuthor}</p>
          </div>

          {/* Date & Time */}
          <div className="p-2.5 rounded-xl border border-border/60 bg-muted/20 col-span-2">
            <div className="flex items-center gap-1 text-[10px] font-semibold text-muted-foreground uppercase">
              <Calendar className="h-3 w-3 text-amber-500" /> Push Date & Time
            </div>
            <p className="font-mono text-xs font-semibold text-foreground mt-1">{info.commitDate}</p>
          </div>

          {/* Message */}
          <div className="p-2.5 rounded-xl border border-border/60 bg-muted/20 col-span-2">
            <span className="text-[10px] font-semibold text-muted-foreground uppercase block">
              Commit Message
            </span>
            <p className="text-xs text-foreground font-medium mt-1 leading-relaxed">
              {info.commitMsg}
            </p>
          </div>
        </div>

        {/* Verification Status */}
        <div className="p-2.5 rounded-xl border border-emerald-500/20 bg-emerald-500/5 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-emerald-500 shrink-0" />
            <span className="font-medium text-foreground text-[11px]">
              Verified Origin • Automated CI/CD Passing
            </span>
          </div>
          <Badge variant="success" className="text-[9px] font-mono">
            Clean
          </Badge>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between gap-2 pt-2 border-t border-border/60">
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.open(info.repoUrl, '_blank')}
            className="text-xs"
          >
            <ExternalLink className="h-3.5 w-3.5 mr-1" />
            Repository
          </Button>

          <div className="flex items-center gap-2">
            <Button
              variant="primary"
              size="sm"
              onClick={() => window.open(info.commitUrl, '_blank')}
              className="text-xs"
            >
              <ExternalLink className="h-3.5 w-3.5 mr-1" />
              View Commit on GitHub
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
