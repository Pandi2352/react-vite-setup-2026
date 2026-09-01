import React from 'react';
import { FileText, Folder, Code, Image, X } from 'lucide-react';
import { ChatAttachment } from '../types/chat.types';
import { Badge } from '@/components/ui/badge';
import { IconButton } from '@/components/ui/icon-button';
import { cn } from '@/lib/utils';

export interface ChatAttachmentsProps {
  attachments: ChatAttachment[];
  onRemove: (id: string) => void;
  className?: string;
}

export const ChatAttachments: React.FC<ChatAttachmentsProps> = ({
  attachments,
  onRemove,
  className,
}) => {
  if (attachments.length === 0) return null;

  const getIcon = (type: ChatAttachment['type'], ext?: string) => {
    switch (type) {
      case 'folder':
        return <Folder className="h-3.5 w-3.5 text-amber-500 shrink-0" />;
      case 'image':
        return <Image className="h-3.5 w-3.5 text-blue-400 shrink-0" />;
      case 'code':
        return <Code className="h-3.5 w-3.5 text-emerald-400 shrink-0" />;
      default:
        if (ext === 'ts' || ext === 'tsx') return <Code className="h-3.5 w-3.5 text-blue-400 shrink-0" />;
        if (ext === 'json') return <FileText className="h-3.5 w-3.5 text-yellow-400 shrink-0" />;
        return <FileText className="h-3.5 w-3.5 text-muted-foreground shrink-0" />;
    }
  };

  return (
    <div className={cn('flex flex-wrap items-center gap-1.5 py-1.5', className)}>
      {attachments.map((item) => (
        <div
          key={item.id}
          className="group flex items-center gap-1.5 rounded-md border border-border bg-card/80 px-2 py-1 text-xs shadow-2xs hover:border-primary/50 transition-colors animate-in fade-in zoom-in-95"
        >
          {getIcon(item.type, item.extension)}
          <span className="font-mono text-[11px] font-medium text-foreground max-w-[130px] truncate">
            {item.name}
          </span>
          {item.size && (
            <span className="text-[10px] text-muted-foreground">({item.size})</span>
          )}
          {item.type === 'folder' && (
            <Badge variant="outline" className="text-[9px] px-1 py-0 h-3.5 font-normal">
              dir
            </Badge>
          )}
          <IconButton
            icon={<X className="h-2.5 w-2.5" />}
            aria-label={`Remove ${item.name}`}
            size="xs"
            shape="circle"
            variant="ghost"
            onClick={() => onRemove(item.id)}
            className="h-4 w-4 ml-0.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
          />
        </div>
      ))}
    </div>
  );
};
