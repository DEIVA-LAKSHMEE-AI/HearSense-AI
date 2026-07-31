import {
  Brain,
  ShieldCheck,
  AudioLines,
  BadgeCheck,
} from "lucide-react";

export default function LatestDiagnosis() {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">

      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide">
            Latest AI Analysis
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-1">
            Clinical Diagnosis Summary
          </h2>
        </div>

        <span className="px-4 py-2 rounded-full bg-green-100 text-green-700 text-sm font-medium">
          Validated
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">

        <div className="flex items-start gap-3">
          <Brain className="text-blue-600 mt-1" size={22} />

          <div>
            <p className="text-sm text-slate-500">
              Diagnosis
            </p>

            <h3 className="font-semibold text-slate-900">
              Sensorineural
            </h3>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <AudioLines className="text-indigo-600 mt-1" size={22} />

          <div>
            <p className="text-sm text-slate-500">
              Pattern
            </p>

            <h3 className="font-semibold text-slate-900">
              Sloping
            </h3>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <BadgeCheck className="text-emerald-600 mt-1" size={22} />

          <div>
            <p className="text-sm text-slate-500">
              Severity
            </p>

            <h3 className="font-semibold text-slate-900">
              Moderate
            </h3>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <ShieldCheck className="text-green-600 mt-1" size={22} />

          <div>
            <p className="text-sm text-slate-500">
              Confidence
            </p>

            <h3 className="font-semibold text-slate-900">
              97.8%
            </h3>
          </div>
        </div>

      </div>

      <div className="mt-8 rounded-lg bg-slate-50 border border-slate-200 p-5">

        <h4 className="font-semibold text-slate-900 mb-2">
          Explainable AI
        </h4>

        <ul className="space-y-2 text-sm text-slate-600">

          <li>• High-frequency hearing loss detected.</li>

          <li>• Sloping audiogram pattern identified.</li>

          <li>• Clinical validation rules passed.</li>

          <li>• Prediction confidence exceeds 97%.</li>

        </ul>

      </div>

    </div>
  );
}