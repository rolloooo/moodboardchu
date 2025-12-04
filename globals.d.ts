// globals.d.ts
declare module "*.css";
// src/chroma.d.ts
declare module 'chroma-js';

declare global {
  interface Window {
    webkitAudioContext?: typeof AudioContext;
  }
}

declare module "@vercel/analytics/next" {
  type AnalyticsEvent = "page_view" | "click" | "custom";

  interface Analytics {
    track: (event: AnalyticsEvent, properties?: Record<string, unknown>) => void;
  }

  const analytics: Analytics;
  export default analytics;
}

