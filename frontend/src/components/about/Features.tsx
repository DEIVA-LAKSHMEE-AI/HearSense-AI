import {
  Brain,
  Activity,
  Ear,
  FileText,
  ShieldCheck,
  Sparkles,
  ClipboardCheck,
  Stethoscope,
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI Analysis",
    desc: "Automatically analyzes audiograms and identifies hearing patterns.",
  },
  {
    icon: Activity,
    title: "PTA Calculation",
    desc: "Instantly calculates Pure Tone Average with high accuracy.",
  },
  {
    icon: Ear,
    title: "Hearing Loss Detection",
    desc: "Predicts the degree and type of hearing loss.",
  },
  {
    icon: ShieldCheck,
    title: "Clinical Validation",
    desc: "Validates AI predictions using clinical audiology principles.",
  },
  {
    icon: ClipboardCheck,
    title: "Disability Estimation",
    desc: "Estimates hearing disability percentage automatically.",
  },
  {
    icon: FileText,
    title: "Clinical Reports",
    desc: "Generates standardized reports within seconds.",
  },
  {
    icon: Sparkles,
    title: "Explainable AI",
    desc: "Provides transparent reasoning behind AI decisions.",
  },
  {
    icon: Stethoscope,
    title: "Decision Support",
    desc: "Supports audiologists with faster clinical decisions.",
  },
];

export default function Features() {
  return (
    <div className="w-full min-h-screen flex items-center bg-white">
      <div className="max-w-7xl mx-auto w-full px-10">

        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-slate-900">
            What HearSense AI Can Do
          </h2>

          <p className="text-xl text-slate-600 mt-5">
            A complete AI-powered assistant for faster and more consistent
            hearing assessment.
          </p>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">

          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="group bg-white rounded-3xl p-8 shadow-md border hover:border-blue-500 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer"
              >
                <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center group-hover:bg-blue-600 transition">

                  <Icon
                    size={32}
                    className="text-blue-600 group-hover:text-white transition"
                  />

                </div>

                <h3 className="mt-8 text-2xl font-bold">
                  {feature.title}
                </h3>

                <p className="mt-4 text-slate-600 leading-7">
                  {feature.desc}
                </p>
              </div>
            );
          })}

        </div>
      </div>
    </div>
  );
}