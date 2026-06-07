import { Analytics as VercelAnalytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

/**
 * Vercel Analytics + Speed Insights.
 *
 * Tracks automatically:
 *  - Page views & unique visitors
 *  - Session duration
 *  - Referrer / traffic source
 *  - Country & device
 *  - Core Web Vitals (LCP, FID, CLS)
 *
 * Dashboard: vercel.com/[your-team]/[project]/analytics
 *
 * Free tier: 2,500 events/month (plenty for a portfolio).
 * No config needed — works automatically when deployed on Vercel.
 */
export function Analytics() {
  return (
    <>
      <VercelAnalytics />
      <SpeedInsights />
    </>
  );
}
