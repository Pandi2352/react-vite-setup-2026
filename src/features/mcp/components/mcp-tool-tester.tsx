import React, { useState } from 'react';
import { Play, CheckCircle, Copy, AlertTriangle, Code } from 'lucide-react';
import { MCPTool } from '../types/mcp.types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tooltip } from '@/components/ui/tooltip';

export interface MCPToolTesterProps {
  tools: MCPTool[];
  selectedToolName?: string;
  onSelectTool: (toolName: string) => void;
}

export const MCPToolTester: React.FC<MCPToolTesterProps> = ({
  tools,
  selectedToolName,
  onSelectTool,
}) => {
  const currentTool = tools.find((t) => t.name === selectedToolName) || tools[0];

  const [argsJson, setArgsJson] = useState<string>(() => {
    if (!currentTool) return '{}';
    const sample: Record<string, any> = {};
    Object.entries(currentTool.inputSchema.properties).forEach(([key, val]) => {
      sample[key] = val.default !== undefined ? val.default : val.type === 'string' ? '' : 0;
    });
    return JSON.stringify(sample, null, 2);
  });

  const [isRunning, setIsRunning] = useState(false);
  const [outputResult, setOutputResult] = useState<any | null>(null);
  const [executionTimeMs, setExecutionTimeMs] = useState<number | null>(null);
  const [errorText, setErrorText] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Switch tool handler
  const handleToolChange = (tool: MCPTool) => {
    onSelectTool(tool.name);
    const sample: Record<string, any> = {};
    Object.entries(tool.inputSchema.properties).forEach(([key, val]) => {
      sample[key] = val.default !== undefined ? val.default : val.type === 'string' ? 'sample_val' : 10;
    });
    setArgsJson(JSON.stringify(sample, null, 2));
    setOutputResult(null);
    setErrorText(null);
  };

  const handleExecute = () => {
    setErrorText(null);
    setIsRunning(true);

    try {
      JSON.parse(argsJson);
    } catch (e: any) {
      setIsRunning(false);
      setErrorText(`Invalid JSON Arguments: ${e.message}`);
      return;
    }

    const start = performance.now();
    setTimeout(() => {
      const elapsed = Math.round(performance.now() - start);
      setExecutionTimeMs(elapsed);

      let mockOutput: any;
      if (currentTool.name === 'read_file') {
        mockOutput = {
          success: true,
          path: 'src/components/layout/sidebar/sidebar.tsx',
          sizeBytes: 2314,
          lines: 74,
          content: 'export const Sidebar: React.FC = () => { ... }',
        };
      } else if (currentTool.name === 'query_database') {
        mockOutput = {
          success: true,
          rowCount: 3,
          rows: [
            { id: 1, name: 'Alice Admin', role: 'SUPER_ADMIN', active: true },
            { id: 2, name: 'Bob Developer', role: 'DEVELOPER', active: true },
            { id: 3, name: 'Carol Viewer', role: 'VIEWER', active: false },
          ],
        };
      } else if (currentTool.name === 'search_github_issues') {
        mockOutput = {
          total: 12,
          issues: [
            { number: 104, title: 'Add resizable sidebar handle', state: 'closed', labels: ['ui', 'enhancement'] },
            { number: 105, title: 'Support MCP third-party tool runner', state: 'open', labels: ['feature'] },
          ],
        };
      } else {
        mockOutput = {
          status: 'ok',
          message: `Successfully executed tool "${currentTool.name}" on server "${currentTool.serverName}"`,
          timestamp: new Date().toISOString(),
        };
      }

      setOutputResult(mockOutput);
      setIsRunning(false);
    }, 450);
  };

  const handleCopyOutput = () => {
    if (!outputResult) return;
    navigator.clipboard.writeText(JSON.stringify(outputResult, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!currentTool) {
    return (
      <div className="p-6 text-center text-muted-foreground text-xs">
        No active MCP tools found.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Tool Selector Dropdown */}
      <div className="space-y-1.5">
        <label className="text-[11px] font-semibold text-foreground flex items-center justify-between">
          <span>Active Tool</span>
          <Badge variant="outline" className="text-[9px] font-mono">
            {currentTool.serverName}
          </Badge>
        </label>
        <select
          value={currentTool.name}
          onChange={(e) => {
            const found = tools.find((t) => t.name === e.target.value);
            if (found) handleToolChange(found);
          }}
          className="w-full rounded-lg border border-input bg-card px-3 py-2 text-xs font-mono text-foreground focus:border-primary focus:outline-none"
        >
          {tools.map((t) => (
            <option key={t.name} value={t.name}>
              {t.name} ({t.serverName})
            </option>
          ))}
        </select>
        <p className="text-[11px] text-muted-foreground pt-0.5">{currentTool.description}</p>
      </div>

      {/* Input Schema Properties Table */}
      <div className="rounded-lg border border-border bg-muted/20 p-2.5 space-y-2">
        <div className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
          Tool Schema Parameters
        </div>
        <div className="space-y-1 text-xs">
          {Object.entries(currentTool.inputSchema.properties).map(([param, prop]) => {
            const isReq = currentTool.inputSchema.required?.includes(param);
            return (
              <div key={param} className="flex items-start justify-between gap-2 py-0.5">
                <div className="flex items-center gap-1.5 min-w-0">
                  <span className="font-mono text-primary font-semibold text-[11px]">{param}</span>
                  {isReq && (
                    <span className="text-[9px] text-destructive font-bold">*required</span>
                  )}
                </div>
                <span className="text-[10px] font-mono text-muted-foreground">{prop.type}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* JSON Arguments Editor */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <label className="text-[11px] font-semibold text-foreground flex items-center gap-1.5">
            <Code className="h-3.5 w-3.5 text-primary" />
            <span>Arguments (JSON)</span>
          </label>
        </div>
        <textarea
          rows={4}
          value={argsJson}
          onChange={(e) => setArgsJson(e.target.value)}
          className="w-full font-mono text-[11px] rounded-lg border border-input bg-muted/30 p-2.5 text-foreground focus:border-primary focus:outline-none custom-scrollbar"
        />
      </div>

      {/* Error display */}
      {errorText && (
        <div className="flex items-center gap-2 rounded-lg border border-destructive/40 bg-destructive/10 p-2 text-xs text-destructive">
          <AlertTriangle className="h-4 w-4 shrink-0" />
          <span>{errorText}</span>
        </div>
      )}

      {/* Run Tool Button */}
      <Button
        onClick={handleExecute}
        disabled={isRunning}
        className="w-full text-xs font-semibold gap-2 py-2 shadow-xs"
      >
        <Play className="h-3.5 w-3.5" />
        <span>{isRunning ? 'Executing MCP Tool...' : 'Execute Tool'}</span>
      </Button>

      {/* Output Response Section */}
      {outputResult && (
        <div className="space-y-2 rounded-lg border border-border bg-card p-3 animate-in fade-in zoom-in-95">
          <div className="flex items-center justify-between text-xs border-b border-border pb-2">
            <div className="flex items-center gap-1.5 font-semibold text-foreground">
              <CheckCircle className="h-3.5 w-3.5 text-emerald-500" />
              <span>Result Output</span>
              {executionTimeMs !== null && (
                <Badge variant="secondary" className="text-[9px] font-mono h-4 px-1">
                  {executionTimeMs}ms
                </Badge>
              )}
            </div>
            <Tooltip content={copied ? 'Copied!' : 'Copy JSON'} position="top">
              <button
                type="button"
                onClick={handleCopyOutput}
                className="h-6 w-6 rounded flex items-center justify-center hover:bg-muted text-muted-foreground hover:text-foreground cursor-pointer"
              >
                <Copy className="h-3 w-3" />
              </button>
            </Tooltip>
          </div>

          <pre className="max-h-48 overflow-y-auto font-mono text-[10px] text-foreground/90 bg-muted/40 p-2.5 rounded-md custom-scrollbar whitespace-pre-wrap">
            {JSON.stringify(outputResult, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};
