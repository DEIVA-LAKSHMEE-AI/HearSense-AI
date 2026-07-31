import { Clock, FileX, Calculator, AlertTriangle, CheckCircle2, Brain, FileText, Zap } from "lucide-react";

const traditional = [
  {
    icon: Clock,
    title: "Time Consuming",
    desc: "Manual interpretation requires significant clinical time.",
  },
  {
    icon: Calculator,
    title: "Manual Calculations",
    desc: "PTA and hearing assessment are calculated manually.",
  },
  {
    icon: FileX,
    title: "Paper-Based Reports",
    desc: "Documentation is often manual and less standardized.",
  },
  {
    icon: AlertTriangle,
    title: "Variable Interpretation",
    desc: "Results may vary depending on clinical experience.",
  },
];

const ai = [
  {
    icon: Zap,
    title: "Instant Analysis",
    desc: "AI completes analysis within seconds.",
  },
  {
    icon: Brain,
    title: "Automatic AI Assessment",
    desc: "PTA, pattern detection and classification are automated.",
  },
  {
    icon: FileText,
    title: "Standardized Reports",
    desc: "Generate professional clinical reports instantly.",
  },
  {
    icon: CheckCircle2,
    title: "Consistent Decision Support",
    desc: "Reliable and explainable clinical assistance.",
  },
];

export default function Comparison() {
  return (
    <div className="w-full min-h-screen flex items-center bg-slate-50">
      <div className="max-w-7xl mx-auto w-full px-10">

        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-slate-900">
            Traditional Workflow vs HearSense AI
          </h2>

          <p className="text-xl text-slate-600 mt-4">
            See how AI transforms hearing assessment into a faster,
            smarter and more consistent clinical workflow.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">

          {/* Traditional */}

          <div className="bg-white rounded-3xl shadow-lg border border-red-200 p-8">

            <h3 className="text-3xl font-bold text-red-600 mb-8">
              Traditional Workflow
            </h3>

            <div className="space-y-6">

              {traditional.map((item) => {

                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="flex gap-5 items-start p-5 rounded-2xl hover:bg-red-50 transition"
                  >
                    <div className="bg-red-100 rounded-xl p-3">
                      <Icon className="text-red-600" size={28} />
                    </div>

                    <div>
                      <h4 className="font-bold text-xl">
                        {item.title}
                      </h4>

                      <p className="text-slate-600 mt-2">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );

              })}

            </div>

          </div>

          {/* HearSense */}

          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-3xl shadow-xl text-white p-8">

            <h3 className="text-3xl font-bold mb-8">
              HearSense AI
            </h3>

            <div className="space-y-6">

              {ai.map((item) => {

                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="flex gap-5 items-start rounded-2xl bg-white/10 p-5 hover:bg-white/20 transition"
                  >
                    <div className="bg-white rounded-xl p-3">
                      <Icon className="text-blue-600" size={28} />
                    </div>

                    <div>
                      <h4 className="font-bold text-xl">
                        {item.title}
                      </h4>

                      <p className="text-blue-100 mt-2">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );

              })}

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}