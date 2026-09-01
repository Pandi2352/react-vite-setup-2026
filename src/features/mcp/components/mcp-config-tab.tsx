import React, { useState } from 'react';
import { Copy, Check, ShieldCheck } from 'lucide-react';
import { MCPServer } from '../types/mcp.types';
import { Button } from '@/components/ui/button';

export interface MCPConfigTabProps {
  servers: MCPServer[];
}

export const MCPConfigTab: React.FC<MCPConfigTabProps> = ({ servers }) => {
  const [copied, setCopied] = useState(false);

  const configObject = {
    mcpServers: servers.reduce((acc, s) => {
      acc[s.name] = {
        command: s.command || 'npx',
        args: s.args || ['-y', `@modelcontextprotocol/${s.name}`],
        env: s.env || {},
      };
      return acc;
    }, {} as Record<string, any>),
  };

  const jsonString = JSON.stringify(configObject, null, 2);

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-xs font-bold text-foreground">mcp_config.json</h4>
          <p className="text-[11px] text-muted-foreground">Standard Model Context Protocol configuration</p>
        </div>
        <Button
          size="sm"
          variant="outline"
          onClick={handleCopy}
          className="h-7 text-xs gap-1.5 px-2.5"
        >
          {copied ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3" />}
          <span>{copied ? 'Copied' : 'Copy JSON'}</span>
        </Button>
      </div>

      <div className="relative rounded-lg border border-border bg-muted/40 p-3">
        <pre className="max-h-72 overflow-y-auto font-mono text-[10px] text-foreground custom-scrollbar leading-relaxed">
          {jsonString}
        </pre>
      </div>

      <div className="rounded-lg border border-primary/20 bg-primary/5 p-3 space-y-1.5">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-primary">
          <ShieldCheck className="h-4 w-4" />
          <span>Security & Permissions</span>
        </div>
        <p className="text-[11px] text-muted-foreground leading-normal">
          MCP servers run as isolated child processes with explicit filesystem sandbox permissions. Only permitted tools and scopes can be executed by AI agents.
        </p>
      </div>
    </div>
  );
};
