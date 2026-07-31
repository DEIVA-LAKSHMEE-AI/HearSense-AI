import Layout from "../../components/layout/Layout";
import { useEffect, useState } from "react";

import Hero from "../../components/dashboard/Hero";
import LatestDiagnosis from "../../components/dashboard/LatestDiagnosis";
import ConfidenceGauge from "../../components/dashboard/ConfidenceGauge";

import { getDashboardSummary } from "../../services/dashboardService";

export default function Dashboard() {

  const [summary, setSummary] = useState({
    patients: 0,
    audiograms: 0,
    latest_audiogram_id: null as number | null,
  });

  useEffect(() => {

    const loadDashboard = async () => {

      try {

        const data = await getDashboardSummary();

        setSummary(data);

      } catch (error) {

        console.error("Error loading dashboard:", error);

      }

    };

    loadDashboard();

  }, []);

  return (
    <Layout>

      <div className="space-y-8">

        {/* Hero Section */}
        <Hero />

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

          {/* Patients */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300">

            <p className="text-sm font-medium text-slate-500">
              Patients
            </p>

            <h2 className="mt-3 text-4xl font-bold text-slate-900">
              {summary.patients}
            </h2>

            <p className="mt-2 text-sm text-emerald-600">
              Registered Patients
            </p>

          </div>

          {/* Audiograms */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300">

            <p className="text-sm font-medium text-slate-500">
              Audiograms
            </p>

            <h2 className="mt-3 text-4xl font-bold text-slate-900">
              {summary.audiograms}
            </h2>

            <p className="mt-2 text-sm text-blue-600">
              Total Tests
            </p>

          </div>

          {/* Latest Audiogram */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300">

            <p className="text-sm font-medium text-slate-500">
              Latest Audiogram
            </p>

            <h2 className="mt-3 text-4xl font-bold text-slate-900">
              {summary.latest_audiogram_id ?? "-"}
            </h2>

            <p className="mt-2 text-sm text-amber-600">
              Ready for AI Analysis
            </p>

          </div>

          {/* AI Status */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300">

            <p className="text-sm font-medium text-slate-500">
              AI Status
            </p>

            <h2 className="mt-3 text-4xl font-bold text-emerald-600">
              Online
            </h2>

            <p className="mt-2 text-sm text-emerald-600">
              Clinical Validation Enabled
            </p>

          </div>

        </div>

        {/* Dashboard Components */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

          <div className="xl:col-span-2">
            <LatestDiagnosis />
          </div>

          <div>
            <ConfidenceGauge />
          </div>

        </div>

      </div>

    </Layout>
  );
}