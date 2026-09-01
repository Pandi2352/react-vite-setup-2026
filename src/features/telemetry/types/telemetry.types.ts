export type MetricHealthStatus = 'good' | 'needs-improvement' | 'poor';

export interface WebVitalMetric {
  id: 'lcp' | 'cls' | 'inp' | 'fcp' | 'ttfb';
  name: string;
  shortName: string;
  value: number;
  unit: 'ms' | 's' | '' | 'pts';
  formattedValue: string;
  status: MetricHealthStatus;
  goodThreshold: number;
  poorThreshold: number;
  description: string;
}

export interface FpsDataPoint {
  time: string;
  fps: number;
}

export interface MemoryDataPoint {
  time: string;
  usedMB: number;
  totalMB: number;
}

export interface DomHealthStats {
  totalNodes: number;
  maxDepth: number;
  bodyChildren: number;
  eventListenersEstimate: number;
  status: MetricHealthStatus;
}

export interface NetworkWaterfallItem {
  id: string;
  name: string;
  initiatorType: 'script' | 'css' | 'fetch' | 'font' | 'img' | 'other';
  rawSizeBytes: number;
  transferSizeBytes: number;
  gzipRatio: number; // percentage savings e.g. 70%
  startTimeMs: number;
  durationMs: number;
  status: number;
}

export interface TelemetrySummary {
  fps: number;
  fpsStatus: MetricHealthStatus;
  memoryUsedMB: number;
  memoryTotalMB: number;
  domNodes: number;
  vitals: WebVitalMetric[];
  fpsHistory: FpsDataPoint[];
  memoryHistory: MemoryDataPoint[];
  networkWaterfall: NetworkWaterfallItem[];
  domStats: DomHealthStats;
}
