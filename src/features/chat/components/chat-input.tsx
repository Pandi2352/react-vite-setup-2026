import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  Paperclip,
  FolderPlus,
  FilePlus,
  Sparkles,
} from 'lucide-react';
import { ChatAttachment, QuickPrompt } from '../types/chat.types';
import { ChatAttachments } from './chat-attachments';
import { Button } from '@/components/ui/button';
import { Tooltip } from '@/components/ui/tooltip';

const QUICK_PROMPTS: QuickPrompt[] = [
  { id: '1', title: 'Refactor Hook', prompt: 'Refactor this logic into a custom reusable React hook with TypeScript types.', category: 'code' },
  { id: '2', title: 'Add Vitest Unit Test', prompt: 'Write comprehensive Vitest unit tests with 100% edge case coverage for this component.', category: 'code' },
  { id: '3', title: 'Inspect MCP Tools', prompt: 'List all connected MCP server tools and explain their parameters and JSON schemas.', category: 'mcp' },
  { id: '4', title: 'Debug Errors', prompt: 'Analyze potential runtime exceptions and memory leaks in this module.', category: 'debug' },
];

const PRESET_FILES: ChatAttachment[] = [
  { id: 'f1', name: 'src/components/layout/', type: 'folder', path: 'src/components/layout' },
  { id: 'f2', name: 'src/store/ui-store.ts', type: 'file', extension: 'ts', size: '4.2 KB' },
  { id: 'f3', name: 'src/hooks/use-sidebar-resize.ts', type: 'file', extension: 'ts', size: '5.1 KB' },
  { id: 'f4', name: 'package.json', type: 'file', extension: 'json', size: '1.5 KB' },
];

export interface ChatInputProps {
  onSendMessage: (content: string, attachments: ChatAttachment[]) => void;
  disabled?: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, disabled }) => {
  const [content, setContent] = useState('');
  const [attachments, setAttachments] = useState<ChatAttachment[]>([]);
  const [isAttachMenuOpen, setIsAttachMenuOpen] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const attachMenuRef = useRef<HTMLDivElement>(null);

  // Close attach menu on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (attachMenuRef.current && !attachMenuRef.current.contains(e.target as Node)) {
        setIsAttachMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSend = () => {
    if ((!content.trim() && attachments.length === 0) || disabled) return;
    onSendMessage(content.trim(), attachments);
    setContent('');
    setAttachments([]);
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = `${Math.min(e.target.scrollHeight, 140)}px`;
  };

  const handleAddAttachment = (item: ChatAttachment) => {
    if (!attachments.some((a: ChatAttachment) => a.id === item.id)) {
      setAttachments((prev: ChatAttachment[]) => [...prev, item]);
    }
    setIsAttachMenuOpen(false);
  };

  const handleRemoveAttachment = (id: string) => {
    setAttachments((prev: ChatAttachment[]) => prev.filter((item: ChatAttachment) => item.id !== id));
  };

  const handleSelectQuickPrompt = (prompt: QuickPrompt) => {
    setContent(prompt.prompt);
    textareaRef.current?.focus();
  };

  return (
    <div className="border-t border-border bg-card p-3 space-y-2">
      {/* Quick Prompts Carousel */}
      <div className="flex items-center gap-1.5 overflow-x-auto custom-scrollbar pb-1">
        {QUICK_PROMPTS.map((qp) => (
          <button
            key={qp.id}
            type="button"
            onClick={() => handleSelectQuickPrompt(qp)}
            className="flex items-center gap-1 shrink-0 rounded-full border border-border bg-muted/60 px-2.5 py-1 text-[10px] font-medium text-muted-foreground hover:border-primary/50 hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer"
          >
            <Sparkles className="h-2.5 w-2.5 text-primary" />
            <span>{qp.title}</span>
          </button>
        ))}
      </div>

      {/* Attachments list if any */}
      <ChatAttachments attachments={attachments} onRemove={handleRemoveAttachment} />

      {/* Main Input Box */}
      <div className="relative flex flex-col rounded-xl border border-input bg-card shadow-2xs focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all">
        <textarea
          ref={textareaRef}
          rows={2}
          value={content}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          placeholder="Ask AI, describe task, or type prompt... (Enter to send, Shift+Enter for newline)"
          className="w-full resize-none bg-transparent px-3 pt-2.5 pb-8 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none custom-scrollbar"
        />

        {/* Input Bar Controls */}
        <div className="absolute bottom-1.5 left-2 right-2 flex items-center justify-between pointer-events-auto">
          {/* Attach Button & Popup */}
          <div className="relative" ref={attachMenuRef}>
            <Tooltip content="Attach project files or folders" position="top">
              <button
                type="button"
                onClick={() => setIsAttachMenuOpen(!isAttachMenuOpen)}
                className="flex items-center gap-1 h-7 px-2 rounded-md text-[11px] text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
              >
                <Paperclip className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Attach Context</span>
              </button>
            </Tooltip>

            {/* Quick Context Attachment Dropdown */}
            {isAttachMenuOpen && (
              <div className="absolute bottom-8 left-0 z-50 w-64 rounded-lg border border-border bg-card p-2 shadow-xl animate-in fade-in zoom-in-95">
                <div className="px-2 py-1 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                  Select Project File / Folder
                </div>
                <div className="space-y-0.5 mt-1">
                  {PRESET_FILES.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleAddAttachment(item)}
                      className="w-full flex items-center gap-2 rounded-md px-2 py-1.5 text-xs text-foreground hover:bg-accent text-left transition-colors cursor-pointer"
                    >
                      {item.type === 'folder' ? (
                        <FolderPlus className="h-3.5 w-3.5 text-amber-500 shrink-0" />
                      ) : (
                        <FilePlus className="h-3.5 w-3.5 text-blue-400 shrink-0" />
                      )}
                      <span className="truncate font-mono text-[11px] flex-1">{item.name}</span>
                      {item.size && (
                        <span className="text-[10px] text-muted-foreground">{item.size}</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Send Button */}
          <Button
            size="sm"
            onClick={handleSend}
            disabled={(!content.trim() && attachments.length === 0) || disabled}
            className="h-7 px-3 text-xs gap-1.5 rounded-lg shadow-xs"
          >
            <span>Send</span>
            <Send className="h-3 w-3" />
          </Button>
        </div>
      </div>
    </div>
  );
};
