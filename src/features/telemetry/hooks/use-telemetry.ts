import { useState, useEffect, useRef, useCallback } from 'react';
import {
  TelemetrySummary,
  FpsDataPoint,
  MemoryDataPoint,
  WebVitalMetric,
  NetworkWaterfallItem,
  DomHealthStats,
  MetricHealthStatus,
} from '../types/telemetry.types';

const INITIAL_VITALS: WebVitalMetric[] = [
  {
    id: 'lcp',
    name: 'Largest Contentful Paint',
    shortName: 'LCP',
    value: 1.12,
    unit: 's',
    formattedValue: '1.12s',
    status: 'good',
    goodThreshold: 2.5,
    poorThreshold: 4.0,
    description: 'Time taken to render the largest visible element on screen.',
  },
  {
    id: 'cls',
    name: 'Cumulative Layout Shift',
    shortName: 'CLS',
    value: 0.012,
    unit: '',
    formattedValue: '0.012',
    status: 'good',
    goodThreshold: 0.1,
    poorThreshold: 0.25,
    description: 'Measures visual stability and unexpected layout shifts.',
  },
  {
    id: 'inp',
    name: 'Interaction to Next Paint',
    shortName: 'INP',
    value: 38,
    unit: 'ms',
    formattedValue: '38ms',
    status: 'good',
    goodThreshold: 200,
    poorThreshold: 500,
    description: 'Latency of user interactions (clicks, taps, typing).',
  },
  {
    id: 'fcp',
    name: 'First Contentful Paint',
    shortName: 'FCP',
    value: 0.68,
    unit: 's',
    formattedValue: '0.68s',
    status: 'good',
    goodThreshold: 1.8,
    poorThreshold: 3.0,
    description: 'Time until the browser renders the first piece of DOM content.',
  },
  {
    id: 'ttfb',
    name: 'Time to First Byte',
    shortName: 'TTFB',
    value: 64,
    unit: 'ms',
    formattedValue: '64ms',
    status: 'good',
    goodThreshold: 800,
    poorThreshold: 1800,
    description: 'Speed of web server response after initial HTTP request.',
  },
];

const INITIAL_WATERFALL: NetworkWaterfallItem[] = [
  {
    id: 'res-1',
    name: 'index.html (Document)',
    initiatorType: 'other',
    rawSizeBytes: 3840,
    transferSizeBytes: 1350,
    gzipRatio: 65,
    startTimeMs: 0,
    durationMs: 42,
    status: 200,
  },
  {
    id: 'res-2',
    name: 'index.css (Tailwind v4)',
    initiatorType: 'css',
    rawSizeBytes: 71680,
    transferSizeBytes: 11590,
    gzipRatio: 84,
    startTimeMs: 44,
    durationMs: 38,
    status: 200,
  },
  {
    id: 'res-3',
    name: 'index.js (App Core Bundle)',
    initiatorType: 'script',
    rawSizeBytes: 428000,
    transferSizeBytes: 125400,
    gzipRatio: 71,
    startTimeMs: 48,
    durationMs: 78,
    status: 200,
  },
  {
    id: 'res-4',
    name: 'Inter Font (wght@300..700)',
    initiatorType: 'font',
    rawSizeBytes: 98400,
    transferSizeBytes: 32100,
    gzipRatio: 67,
    startTimeMs: 85,
    durationMs: 45,
    status: 200,
  },
  {
    id: 'res-5',
    name: 'favicon.svg (PWA Logo)',
    initiatorType: 'img',
    rawSizeBytes: 520,
    transferSizeBytes: 380,
    gzipRatio: 27,
    startTimeMs: 130,
    durationMs: 16,
    status: 200,
  },
];

export function useTelemetry(isPaused: boolean = false) {
  const [fps, setFps] = useState<number>(60);
  const [fpsHistory, setFpsHistory] = useState<FpsDataPoint[]>([]);
  const [memoryHistory, setMemoryHistory] = useState<MemoryDataPoint[]>([]);
  const [memoryUsed, setMemoryUsed] = useState<number>(24.8);
  const [memoryTotal, setMemoryTotal] = useState<number>(48.2);
  const [domStats, setDomStats] = useState<DomHealthStats>({
    totalNodes: 320,
    maxDepth: 14,
    bodyChildren: 6,
    eventListenersEstimate: 48,
    status: 'good',
  });
  const [vitals] = useState<WebVitalMetric[]>(INITIAL_VITALS);
  const [waterfall] = useState<NetworkWaterfallItem[]>(INITIAL_WATERFALL);

  const frameCount = useRef(0);
  const lastTime = useRef(performance.now());
  const reqId = useRef<number | null>(null);

  // Measure DOM depth and node counts
  const measureDom = useCallback(() => {
    if (typeof document === 'undefined') return;
    try {
      const allNodes = document.getElementsByTagName('*');
      const total = allNodes.length;

      let maxDepth = 0;
      for (let i = 0; i < Math.min(total, 200); i++) {
        let depth = 0;
        let el = allNodes[i];
        while (el.parentElement) {
          depth++;
          el = el.parentElement;
        }
        if (depth > maxDepth) maxDepth = depth;
      }

      const status: MetricHealthStatus =
        total < 1000 ? 'good' : total < 2000 ? 'needs-improvement' : 'poor';

      setDomStats({
        totalNodes: total || 350,
        maxDepth: maxDepth || 12,
        bodyChildren: document.body?.children?.length || 5,
        eventListenersEstimate: Math.round(total * 0.15),
        status,
      });
    } catch {
      // Ignore DOM inspection errors
    }
  }, []);

  // Frame tick loop
  useEffect(() => {
    if (isPaused) return;

    const tick = (now: number) => {
      frameCount.current++;
      const delta = now - lastTime.current;

      if (delta >= 1000) {
        const currentFps = Math.min(60, Math.round((frameCount.current * 1000) / delta));
        setFps(currentFps);

        const timeStr = new Date().toLocaleTimeString('en-US', {
          minute: '2-digit',
          second: '2-digit',
        });

        setFpsHistory((prev) => {
          const next = [...prev, { time: timeStr, fps: currentFps }];
          return next.slice(-20); // Keep last 20 seconds
        });

        // Measure Memory if Chrome performance.memory API is available
        const perfWithMem = performance as unknown as {
          memory?: { usedJSHeapSize: number; totalJSHeapSize: number };
        };

        let used = 24.5;
        let total = 48.0;

        if (perfWithMem.memory) {
          used = Math.round((perfWithMem.memory.usedJSHeapSize / (1024 * 1024)) * 10) / 10;
          total = Math.round((perfWithMem.memory.totalJSHeapSize / (1024 * 1024)) * 10) / 10;
        } else {
          // Dynamic simulated fluctuation around baseline
          used = Math.round((26 + Math.sin(now / 3000) * 3.5) * 10) / 10;
          total = 52.4;
        }

        setMemoryUsed(used);
        setMemoryTotal(total);

        setMemoryHistory((prev) => {
          const next = [...prev, { time: timeStr, usedMB: used, totalMB: total }];
          return next.slice(-20);
        });

        measureDom();

        frameCount.current = 0;
        lastTime.current = now;
      }

      reqId.current = requestAnimationFrame(tick);
    };

    reqId.current = requestAnimationFrame(tick);

    return () => {
      if (reqId.current) cancelAnimationFrame(reqId.current);
    };
  }, [isPaused, measureDom]);

  const fpsStatus: MetricHealthStatus =
    fps >= 55 ? 'good' : fps >= 35 ? 'needs-improvement' : 'poor';

  const summary: TelemetrySummary = {
    fps,
    fpsStatus,
    memoryUsedMB: memoryUsed,
    memoryTotalMB: memoryTotal,
    domNodes: domStats.totalNodes,
    vitals,
    fpsHistory,
    memoryHistory,
    networkWaterfall: waterfall,
    domStats,
  };

  return summary;
}
