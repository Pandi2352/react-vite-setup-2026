export interface ChatAttachment {
  id: string;
  name: string;
  type: 'file' | 'folder' | 'code' | 'image';
  path?: string;
  size?: string;
  extension?: string;
  contentPreview?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  status?: 'sent' | 'streaming' | 'error';
  attachments?: ChatAttachment[];
  model?: string;
  tokens?: number;
}

export interface QuickPrompt {
  id: string;
  title: string;
  prompt: string;
  icon?: string;
  category: 'code' | 'architecture' | 'debug' | 'mcp';
}

export interface AIModelOption {
  id: string;
  name: string;
  provider: string;
  badge?: string;
  contextWindow: string;
}
