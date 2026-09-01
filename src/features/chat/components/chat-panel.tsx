import React, { useState } from 'react';
import {
  BotMessageSquare,
  Trash2,
  X,
  ChevronDown,
  Zap,
} from 'lucide-react';
import { ChatMessage, ChatAttachment, AIModelOption } from '../types/chat.types';
import { ChatMessages } from './chat-messages';
import { ChatInput } from './chat-input';
import { useUIStore } from '@/store/ui-store';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tooltip } from '@/components/ui/tooltip';

const MODEL_OPTIONS: AIModelOption[] = [
  { id: 'gemini-2.5-pro', name: 'Gemini 2.5 Pro', provider: 'Google', badge: 'Fastest', contextWindow: '2M tokens' },
  { id: 'claude-3.7-sonnet', name: 'Claude 3.7 Sonnet', provider: 'Anthropic', badge: 'Smartest', contextWindow: '200K tokens' },
  { id: 'gpt-4o', name: 'GPT-4o', provider: 'OpenAI', badge: 'Multimodal', contextWindow: '128K tokens' },
];

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'm1',
    role: 'assistant',
    content: `👋 Hello! I am your **Forge AI Engineering Copilot**.\n\nI can help you build features, generate NestJS backends, refactor React components, run unit tests, and query your connected **Model Context Protocol (MCP)** tools.\n\nTry asking me a question or attaching files/folders below!`,
    timestamp: 'Just now',
    model: 'Gemini 2.5 Pro',
    tokens: 48,
  },
];

export const ChatPanel: React.FC = () => {
  const { setActiveRightPanel } = useUIStore();
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [selectedModel, setSelectedModel] = useState<AIModelOption>(MODEL_OPTIONS[0]);
  const [isModelDropdownOpen, setIsModelDropdownOpen] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);

  const handleSendMessage = (content: string, attachments: ChatAttachment[]) => {
    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      role: 'user',
      content,
      attachments,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsStreaming(true);

    // Simulate intelligent AI stream response
    setTimeout(() => {
      let aiResponseText = `Here is the analysis and solution based on **${selectedModel.name}**:\n\n`;

      if (attachments.length > 0) {
        aiResponseText += `📂 **Attached Context Analyzed (${attachments.length} items):**\n`;
        attachments.forEach((a) => {
          aiResponseText += `- \`${a.name}\` (${a.type === 'folder' ? 'Directory' : a.size || 'File'})\n`;
        });
        aiResponseText += `\n`;
      }

      if (content.toLowerCase().includes('mcp')) {
        aiResponseText += `🔧 **MCP Tools Integration Status:**\n- Connected servers: \`filesystem-mcp\`, \`postgres-mcp\`, \`github-mcp\`\n- You can open the **MCP Panel** in the right icon dock to inspect input schemas and test tool execution in real-time.`;
      } else if (content.toLowerCase().includes('test') || content.toLowerCase().includes('vitest')) {
        aiResponseText += `✅ **Vitest Unit Test Example:**\n\`\`\`typescript\nimport { renderHook, act } from '@testing-library/react';\nimport { describe, it, expect } from 'vitest';\n\ndescribe('Feature Component', () => {\n  it('should execute properly', () => {\n    expect(true).toBe(true);\n  });\n});\n\`\`\``;
      } else {
        aiResponseText += `✨ The component and architecture follow modular best practices with TypeScript type safety, custom hooks, and Tailwind CSS.\n\nIs there anything specific you would like me to generate or optimize?`;
      }

      const aiMsg: ChatMessage = {
        id: `a-${Date.now()}`,
        role: 'assistant',
        content: aiResponseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        model: selectedModel.name,
        tokens: Math.floor(Math.random() * 120) + 140,
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsStreaming(false);
    }, 650);
  };

  const handleClearChat = () => {
    setMessages([]);
  };

  const handleRegenerate = () => {
    // Regenerate last response
    setIsStreaming(true);
    setTimeout(() => {
      setIsStreaming(false);
    }, 500);
  };

  return (
    <div className="flex flex-col h-full bg-card text-card-foreground">
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b border-border bg-card/80 backdrop-blur-xs">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <BotMessageSquare className="h-4 w-4" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h2 className="text-xs font-bold text-foreground">AI Copilot</h2>
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
            </div>
            <p className="text-[10px] text-muted-foreground">Engineering assistant</p>
          </div>
        </div>

        {/* Model Selector & Actions */}
        <div className="flex items-center gap-1">
          {/* Model dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsModelDropdownOpen(!isModelDropdownOpen)}
              className="flex items-center gap-1.5 rounded-md border border-border bg-muted/50 px-2 py-1 text-[11px] font-medium text-foreground hover:bg-accent transition-colors cursor-pointer"
            >
              <Zap className="h-3 w-3 text-amber-500" />
              <span className="truncate max-w-[110px]">{selectedModel.name}</span>
              <ChevronDown className="h-3 w-3 text-muted-foreground" />
            </button>

            {isModelDropdownOpen && (
              <div className="absolute right-0 top-8 z-50 w-52 rounded-lg border border-border bg-card p-1 shadow-xl animate-in fade-in zoom-in-95">
                <div className="px-2 py-1 text-[10px] font-semibold text-muted-foreground uppercase">
                  Select AI Model
                </div>
                {MODEL_OPTIONS.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => {
                      setSelectedModel(opt);
                      setIsModelDropdownOpen(false);
                    }}
                    className="w-full flex items-center justify-between rounded-md px-2 py-1.5 text-xs text-left hover:bg-accent transition-colors cursor-pointer"
                  >
                    <div>
                      <p className="font-medium text-foreground">{opt.name}</p>
                      <p className="text-[10px] text-muted-foreground">{opt.provider}</p>
                    </div>
                    {opt.badge && (
                      <Badge variant="secondary" className="text-[9px] px-1 py-0">
                        {opt.badge}
                      </Badge>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          <Tooltip content="Clear conversation" position="bottom">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClearChat}
              className="h-7 w-7 p-0 text-muted-foreground hover:text-destructive"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          </Tooltip>

          <Tooltip content="Close panel" position="bottom">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setActiveRightPanel(null)}
              className="h-7 w-7 p-0 text-muted-foreground hover:text-foreground"
            >
              <X className="h-3.5 w-3.5" />
            </Button>
          </Tooltip>
        </div>
      </div>

      {/* Messages */}
      <ChatMessages
        messages={messages}
        isStreaming={isStreaming}
        onRegenerate={handleRegenerate}
      />

      {/* Input */}
      <ChatInput onSendMessage={handleSendMessage} disabled={isStreaming} />
    </div>
  );
};
