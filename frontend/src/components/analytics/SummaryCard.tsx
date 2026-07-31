import { CalendarDays } from "lucide-react";

interface SummaryProps {
  data: {
    patientsAnalyzed: number;
    reportsGenerated: number;
    averageAIConfidence: number;
  };
}

export default function SummaryCard({ data }: SummaryProps) {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-3xl p-8 shadow-xl">

      <div className="flex items-center gap-4 mb-6">
        <CalendarDays size={34} />

        <h2 className="text-3xl font-bold">
          Today's Clinical Summary
        </h2>
      </div>

      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-white/10 rounded-2xl p-5">

          <h3 className="text-4xl font-bold">
            {data.patientsAnalyzed}
          </h3>

          <p className="mt-2">
            Patients Analyzed
          </p>

        </div>

        <div className="bg-white/10 rounded-2xl p-5">

          <h3 className="text-4xl font-bold">
            {data.reportsGenerated}
          </h3>

          <p className="mt-2">
            Reports Generated
          </p>

        </div>

        <div className="bg-white/10 rounded-2xl p-5">

          <h3 className="text-4xl font-bold">
            {data.averageAIConfidence.toFixed(2)}%
          </h3>

          <p className="mt-2">
            Average AI Confidence
          </p>

        </div>

      </div>

    </div>
  );
}