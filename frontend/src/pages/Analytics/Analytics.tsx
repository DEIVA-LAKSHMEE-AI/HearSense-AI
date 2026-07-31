import { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";

import SummaryCard from "../../components/analytics/SummaryCard";
import AnalyticsCards from "../../components/analytics/AnalyticsCards";
import DistributionChart from "../../components/analytics/DistributionChart";
import AgeChart from "../../components/analytics/AgeChart";
import RecentReports from "../../components/analytics/RecentReports";

export default function Analytics() {
  const [analytics, setAnalytics] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://hearsense-ai.onrender.com/analytics")
      .then((res) => res.json())
      .then((data) => {
        setAnalytics(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Analytics Error:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <h1 className="text-2xl font-semibold text-slate-600">
            Loading Analytics...
          </h1>
        </div>
      </Layout>
    );
  }

  if (!analytics) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <h1 className="text-2xl text-red-600">
            Failed to load Analytics
          </h1>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-slate-50 min-h-screen p-8">

        <h1 className="text-4xl font-bold">
          Analytics Dashboard
        </h1>

        <p className="text-slate-600 mt-2 mb-8">
          Clinical insights and AI performance overview.
        </p>

        <SummaryCard data={analytics.summary} />

        <div className="mt-8">
          <AnalyticsCards data={analytics.cards} />
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mt-8">
          <DistributionChart data={analytics.distribution} />
          <AgeChart data={analytics.ageGroups} />
        </div>

        <div className="mt-8">
          <RecentReports data={analytics.recentReports} />
        </div>

      </div>
    </Layout>
  );
}