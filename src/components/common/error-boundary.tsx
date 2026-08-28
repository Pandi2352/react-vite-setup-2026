import { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error in React Component:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: undefined });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-background text-foreground">
          <div className="max-w-md w-full rounded-2xl border border-border bg-card p-8 shadow-2xl text-center space-y-6">
            <div className="mx-auto w-16 h-16 rounded-full bg-rose-500/10 flex items-center justify-center text-rose-500">
              <AlertTriangle className="h-8 w-8" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold tracking-tight">Something went wrong</h2>
              <p className="text-sm text-muted-foreground">
                An unexpected application error occurred. You can try refreshing the page.
              </p>
              {this.state.error && (
                <div className="mt-4 p-3 rounded-md bg-muted text-xs font-mono text-left overflow-x-auto max-h-32">
                  {this.state.error.message}
                </div>
              )}
            </div>
            <Button variant="primary" onClick={this.handleReset} leftIcon={<RotateCcw className="h-4 w-4" />}>
              Reload Application
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
