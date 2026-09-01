import React, { useState } from 'react';
import {
  Blocks,
  Server,
  Play,
  FileCode,
  Search,
  RefreshCw,
  X,
  Activity,
} from 'lucide-react';
import { MCPServer, MCPTool, MCPLogEntry } from '../types/mcp.types';
import { INITIAL_MCP_SERVERS, INITIAL_MCP_TOOLS, INITIAL_MCP_LOGS } from '../mocks/mcp-data';
import { MCPServerCard } from './mcp-server-card';
import { MCPToolTester } from './mcp-tool-tester';
import { MCPConfigTab } from './mcp-config-tab';
import { useUIStore } from '@/store/ui-store';
import { Badge } from '@/components/ui/badge';
import { IconButton } from '@/components/ui/icon-button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

export const MCPPanel: React.FC = () => {
  const { setActiveRightPanel } = useUIStore();
  const [activeTab, setActiveTab] = useState<'servers' | 'tools' | 'config' | 'logs'>('servers');
  const [servers, setServers] = useState<MCPServer[]>(INITIAL_MCP_SERVERS);
  const [tools] = useState<MCPTool[]>(INITIAL_MCP_TOOLS);
  const [logs, setLogs] = useState<MCPLogEntry[]>(INITIAL_MCP_LOGS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedToolName, setSelectedToolName] = useState<string>(INITIAL_MCP_TOOLS[0].name);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const connectedCount = servers.filter((s) => s.status === 'connected' && s.enabled).length;

  const handleToggleEnabled = (id: string) => {
    setServers((prev) =>
      prev.map((s) => (s.id === id ? { ...s, enabled: !s.enabled, status: !s.enabled ? 'connected' : 'disconnected' } : s))
    );
  };

  const handleSelectToolRunner = (serverId: string) => {
    const matchingTool = tools.find((t) => t.serverId === serverId);
    if (matchingTool) {
      setSelectedToolName(matchingTool.name);
    }
    setActiveTab('tools');
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setLogs((prev) => [
        {
          id: `log-${Date.now()}`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
          level: 'info',
          server: 'all',
          message: 'Heartbeat ping refreshed all active MCP servers successfully.',
        },
        ...prev,
      ]);
    }, 600);
  };

  const filteredServers = servers.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full bg-card text-card-foreground">
      {/* Panel Header */}
      <div className="flex items-center justify-between p-3 border-b border-border bg-card/80 backdrop-blur-xs">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Blocks className="h-4 w-4" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h2 className="text-xs font-bold text-foreground">MCP Integration</h2>
              <Badge variant="secondary" className="text-[9px] px-1 py-0 h-3.5">
                {connectedCount}/{servers.length} Active
              </Badge>
            </div>
            <p className="text-[10px] text-muted-foreground">Model Context Protocol tools</p>
          </div>
        </div>

        {/* Header Action Buttons */}
        <div className="flex items-center gap-1">
          <IconButton
            icon={<RefreshCw className={cn('h-3.5 w-3.5', isRefreshing && 'animate-spin text-primary')} />}
            aria-label="Refresh server connections"
            tooltip="Refresh server connections"
            variant="ghost"
            size="sm"
            onClick={handleRefresh}
          />

          <IconButton
            icon={<X className="h-3.5 w-3.5" />}
            aria-label="Close MCP panel"
            tooltip="Close panel"
            variant="ghost"
            size="sm"
            onClick={() => setActiveRightPanel(null)}
          />
        </div>
      </div>

      {/* Tabs Bar */}
      <div className="flex border-b border-border bg-muted/30 p-1 gap-1">
        <button
          type="button"
          onClick={() => setActiveTab('servers')}
          className={cn(
            'flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer',
            activeTab === 'servers'
              ? 'bg-card text-foreground border border-border shadow-2xs'
              : 'text-muted-foreground hover:text-foreground'
          )}
        >
          <Server className="h-3.5 w-3.5 text-primary" />
          <span>Servers ({servers.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('tools')}
          className={cn(
            'flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer',
            activeTab === 'tools'
              ? 'bg-card text-foreground border border-border shadow-2xs'
              : 'text-muted-foreground hover:text-foreground'
          )}
        >
          <Play className="h-3.5 w-3.5 text-emerald-500" />
          <span>Runner</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('config')}
          className={cn(
            'flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer',
            activeTab === 'config'
              ? 'bg-card text-foreground border border-border shadow-2xs'
              : 'text-muted-foreground hover:text-foreground'
          )}
        >
          <FileCode className="h-3.5 w-3.5 text-amber-500" />
          <span>Config</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('logs')}
          className={cn(
            'flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer',
            activeTab === 'logs'
              ? 'bg-card text-foreground border border-border shadow-2xs'
              : 'text-muted-foreground hover:text-foreground'
          )}
        >
          <Activity className="h-3.5 w-3.5 text-violet-500" />
          <span>Logs</span>
        </button>
      </div>

      {/* Body Area */}
      <div className="flex-1 overflow-y-auto p-3.5 space-y-3 custom-scrollbar">
        {/* Tab 1: Servers List */}
        {activeTab === 'servers' && (
          <div className="space-y-3">
            <Input
              placeholder="Search MCP servers (postgres, github, filesystem)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leftIcon={<Search className="h-3.5 w-3.5" />}
              className="h-8 text-xs"
            />

            <div className="space-y-2.5">
              {filteredServers.map((server) => (
                <MCPServerCard
                  key={server.id}
                  server={server}
                  onToggleEnabled={handleToggleEnabled}
                  onSelectToolRunner={handleSelectToolRunner}
                />
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Tool Runner */}
        {activeTab === 'tools' && (
          <MCPToolTester
            tools={tools}
            selectedToolName={selectedToolName}
            onSelectTool={setSelectedToolName}
          />
        )}

        {/* Tab 3: Config JSON */}
        {activeTab === 'config' && <MCPConfigTab servers={servers} />}

        {/* Tab 4: Real-time Logs */}
        {activeTab === 'logs' && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-muted-foreground pb-1">
              <span>MCP Protocol Activity Stream</span>
              <Badge variant="outline" className="text-[9px] font-mono">{logs.length} events</Badge>
            </div>
            <div className="space-y-1.5">
              {logs.map((log) => (
                <div
                  key={log.id}
                  className="rounded-lg border border-border bg-card p-2 text-[11px] font-mono space-y-1"
                >
                  <div className="flex items-center justify-between text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <span className="text-primary font-bold">{log.server}</span>
                      <Badge
                        variant={log.level === 'error' ? 'danger' : log.level === 'warn' ? 'warning' : 'secondary'}
                        className="text-[8px] px-1 py-0 uppercase"
                      >
                        {log.level}
                      </Badge>
                    </div>
                    <span className="text-[10px] text-muted-foreground/70">{log.timestamp}</span>
                  </div>
                  <p className="text-foreground text-[10px] whitespace-pre-wrap">{log.message}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
