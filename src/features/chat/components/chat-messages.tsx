import React, { useState } from 'react';
import { Bot, User, Copy, Check, Sparkles, RotateCw, FileCode, Folder } from 'lucide-react';
import { ChatMessage } from '../types/chat.types';
import { Badge } from '@/components/ui/badge';
import { Tooltip } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

export interface ChatMessagesProps {
  messages: ChatMessage[];
  isStreaming?: boolean;
  onRegenerate?: (messageId: string) => void;
}

export const ChatMessages: React.FC<ChatMessagesProps> = ({
  messages,
  isStreaming,
  onRegenerate,
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (messages.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center text-muted-foreground space-y-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary shadow-inner">
          <Sparkles className="h-6 w-6" />
        </div>
        <div className="space-y-1">
          <h3 className="text-sm font-semibold text-foreground">AI Engineering Assistant</h3>
          <p className="text-xs text-muted-foreground max-w-[260px]">
            Ask code questions, refactor components, analyze files, or inspect MCP server tools.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
      {messages.map((message) => {
        const isUser = message.role === 'user';

        return (
          <div
            key={message.id}
            className={cn(
              'flex flex-col gap-1.5 animate-in fade-in slide-in-from-bottom-1 duration-200',
              isUser ? 'items-end' : 'items-start'
            )}
          >
            {/* Header info */}
            <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground px-1">
              {isUser ? (
                <>
                  <span>You</span>
                  <span>•</span>
                  <span>{message.timestamp}</span>
                  <div className="h-4 w-4 rounded-full bg-muted flex items-center justify-center text-foreground font-semibold">
                    <User className="h-2.5 w-2.5" />
                  </div>
                </>
              ) : (
                <>
                  <div className="h-4 w-4 rounded-full bg-primary/20 flex items-center justify-center text-primary font-semibold">
                    <Bot className="h-2.5 w-2.5" />
                  </div>
                  <span className="font-semibold text-primary">Forge AI</span>
                  {message.model && (
                    <Badge variant="secondary" className="text-[9px] px-1 py-0 h-3.5">
                      {message.model}
                    </Badge>
                  )}
                  <span>•</span>
                  <span>{message.timestamp}</span>
                </>
              )}
            </div>

            {/* Attached files/folders preview in user message */}
            {message.attachments && message.attachments.length > 0 && (
              <div className="flex flex-wrap gap-1 max-w-[90%] mb-1">
                {message.attachments.map((att) => (
                  <span
                    key={att.id}
                    className="inline-flex items-center gap-1 rounded bg-muted/80 border border-border px-2 py-0.5 text-[10px] font-mono text-muted-foreground"
                  >
                    {att.type === 'folder' ? (
                      <Folder className="h-3 w-3 text-amber-500" />
                    ) : (
                      <FileCode className="h-3 w-3 text-blue-400" />
                    )}
                    <span className="truncate max-w-[120px]">{att.name}</span>
                  </span>
                ))}
              </div>
            )}

            {/* Bubble */}
            <div
              className={cn(
                'relative max-w-[95%] rounded-xl px-3.5 py-2.5 text-xs shadow-xs leading-relaxed',
                isUser
                  ? 'bg-primary text-primary-foreground rounded-br-xs'
                  : 'bg-card border border-border text-card-foreground rounded-bl-xs'
              )}
            >
              <div className="whitespace-pre-wrap break-words font-sans selection:bg-accent">
                {message.content}
              </div>

              {/* Message Actions for Assistant */}
              {!isUser && (
                <div className="mt-2.5 pt-2 border-t border-border/50 flex items-center justify-between text-[10px] text-muted-foreground">
                  <div className="flex items-center gap-2">
                    {message.tokens && (
                      <span className="font-mono text-[9px] bg-muted px-1.5 py-0.5 rounded">
                        {message.tokens} tokens
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    <Tooltip content={copiedId === message.id ? 'Copied!' : 'Copy response'} position="top">
                      <button
                        type="button"
                        onClick={() => handleCopy(message.content, message.id)}
                        className="h-6 w-6 rounded flex items-center justify-center hover:bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                      >
                        {copiedId === message.id ? (
                          <Check className="h-3 w-3 text-emerald-500" />
                        ) : (
                          <Copy className="h-3 w-3" />
                        )}
                      </button>
                    </Tooltip>

                    {onRegenerate && (
                      <Tooltip content="Regenerate response" position="top">
                        <button
                          type="button"
                          onClick={() => onRegenerate(message.id)}
                          className="h-6 w-6 rounded flex items-center justify-center hover:bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                        >
                          <RotateCw className="h-3 w-3" />
                        </button>
                      </Tooltip>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })}

      {isStreaming && (
        <div className="flex items-center gap-2 text-xs text-muted-foreground p-2 animate-pulse">
          <Bot className="h-3.5 w-3.5 text-primary animate-spin" />
          <span>Generating AI response...</span>
        </div>
      )}
    </div>
  );
};
