import { useState } from "react";

import Layout from "../../components/layout/Layout";
import Hero from "../../components/about/Hero";
import Workflow from "../../components/about/Workflow";
import Features from "../../components/about/Features";
import Comparison from "../../components/about/Comparison";
import Impact from "../../components/about/Impact";

const tabs = [
  "Overview",
  "Workflow",
  "Features",
  "Comparison",
  "Impact",
];

export default function About() {
  const [activeTab, setActiveTab] = useState("Overview");

  return (
    <Layout>
      <div className="bg-slate-50 min-h-screen">

        {/* Header */}

        <div className="bg-white border-b sticky top-0 z-20">

          <div className="max-w-7xl mx-auto px-8 py-6">

            <h1 className="text-3xl font-bold">
              About HearSense AI
            </h1>

            <div className="flex gap-3 mt-6 flex-wrap">

              {tabs.map((tab) => (

                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 rounded-xl font-medium transition

                  ${
                    activeTab === tab
                      ? "bg-blue-600 text-white"
                      : "bg-slate-100 hover:bg-slate-200"
                  }`}
                >
                  {tab}
                </button>

              ))}

            </div>

          </div>

        </div>

        {/* Content */}

        <div className="max-w-7xl mx-auto px-8 py-10">

          {activeTab === "Overview" && <Hero />}

          {activeTab === "Workflow" && <Workflow />}

          {activeTab === "Features" && <Features />}

          {activeTab === "Comparison" && <Comparison />}

          {activeTab === "Impact" && <Impact />}

        </div>

      </div>
    </Layout>
  );
}