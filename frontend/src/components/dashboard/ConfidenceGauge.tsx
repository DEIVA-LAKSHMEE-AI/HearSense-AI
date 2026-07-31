import {
  Brain,
  ShieldCheck,
  CheckCircle2,
  Activity,
} from "lucide-react";

export default function ConfidenceGauge() {
  const confidence = 97.8;

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 h-full">

      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
            AI Confidence
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-1">
            Prediction Reliability
          </h2>
        </div>

        <Brain className="text-blue-600" size={32} />
      </div>

      {/* Circular Gauge */}

      <div className="mt-8 flex justify-center">

        <div className="relative w-44 h-44">

          <svg
            className="w-full h-full -rotate-90"
            viewBox="0 0 160 160"
          >
            <circle
              cx="80"
              cy="80"
              r="68"
              stroke="#E2E8F0"
              strokeWidth="12"
              fill="none"
            />

            <circle
              cx="80"
              cy="80"
              r="68"
              stroke="#2563EB"
              strokeWidth="12"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={427}
              strokeDashoffset={427 - (427 * confidence) / 100}
            />
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center">

            <p className="text-4xl font-bold text-slate-900">
              {confidence}%
            </p>

            <p className="text-sm text-slate-500">
              Confidence
            </p>

          </div>

        </div>

      </div>

      <div className="mt-8 space-y-4">

        <div className="flex justify-between items-center">

          <div className="flex items-center gap-2">
            <ShieldCheck size={18} className="text-emerald-600" />
            <span className="text-slate-600">
              Clinical Validation
            </span>
          </div>

          <span className="font-semibold text-emerald-600">
            Passed
          </span>

        </div>

        <div className="flex justify-between items-center">

          <div className="flex items-center gap-2">
            <Activity size={18} className="text-sky-600" />
            <span className="text-slate-600">
              Model Status
            </span>
          </div>

          <span className="font-semibold text-sky-600">
            Active
          </span>

        </div>

        <div className="flex justify-between items-center">

          <div className="flex items-center gap-2">
            <CheckCircle2 size={18} className="text-green-600" />
            <span className="text-slate-600">
              Reliability
            </span>
          </div>

          <span className="font-semibold text-green-600">
            Excellent
          </span>

        </div>

      </div>

    </div>
  );
}