import { Brain, ShieldCheck, Activity, Clock3 } from "lucide-react";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm"
    >
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-blue-600 uppercase tracking-wide">
            HearSense AI
          </p>

          <h1 className="mt-2 text-4xl font-bold text-slate-900">
            AI-Based Pure Tone Audiometry Diagnosis
          </h1>

          <p className="mt-3 text-slate-600 max-w-2xl">
            Clinical Decision Support Platform powered by Machine Learning,
            Explainable AI, and Clinical Validation.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-full bg-green-50 px-4 py-2 border border-green-200">
          <div className="h-2.5 w-2.5 rounded-full bg-green-500"></div>
          <span className="text-sm font-medium text-green-700">
            AI System Online
          </span>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-4 gap-4">
        <div className="rounded-lg border border-slate-200 p-4">
          <Brain className="text-blue-600 mb-2" size={22} />
          <p className="text-sm text-slate-500">Model</p>
          <p className="font-semibold text-slate-800">Random Forest</p>
        </div>

        <div className="rounded-lg border border-slate-200 p-4">
          <ShieldCheck className="text-emerald-600 mb-2" size={22} />
          <p className="text-sm text-slate-500">Validation</p>
          <p className="font-semibold text-slate-800">Enabled</p>
        </div>

        <div className="rounded-lg border border-slate-200 p-4">
          <Activity className="text-sky-600 mb-2" size={22} />
          <p className="text-sm text-slate-500">AI Confidence</p>
          <p className="font-semibold text-slate-800">97.8%</p>
        </div>

        <div className="rounded-lg border border-slate-200 p-4">
          <Clock3 className="text-amber-500 mb-2" size={22} />
          <p className="text-sm text-slate-500">Last Updated</p>
          <p className="font-semibold text-slate-800">Today</p>
        </div>
      </div>
    </motion.div>
  );
}