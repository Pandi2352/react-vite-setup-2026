export type MCPTransport = 'stdio' | 'sse' | 'websocket';
export type MCPStatus = 'connected' | 'connecting' | 'disconnected' | 'error';

export interface MCPServer {
  id: string;
  name: string;
  version: string;
  description: string;
  transport: MCPTransport;
  status: MCPStatus;
  latencyMs?: number;
  toolsCount: number;
  resourcesCount: number;
  promptsCount: number;
  enabled: boolean;
  command?: string;
  args?: string[];
  env?: Record<string, string>;
  category: 'database' | 'search' | 'git' | 'filesystem' | 'automation';
}

export interface MCPToolProperty {
  type: string;
  description?: string;
  default?: any;
  enum?: string[];
}

export interface MCPToolInputSchema {
  type: 'object';
  properties: Record<string, MCPToolProperty>;
  required?: string[];
}

export interface MCPTool {
  name: string;
  serverId: string;
  serverName: string;
  description: string;
  inputSchema: MCPToolInputSchema;
  isAsync?: boolean;
}

export interface MCPLogEntry {
  id: string;
  timestamp: string;
  level: 'info' | 'warn' | 'error' | 'debug';
  server: string;
  message: string;
}
