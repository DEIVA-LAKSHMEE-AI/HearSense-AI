import {
  User,
  Activity,
  Brain,
  ShieldCheck,
  FileText,
  HeartHandshake,
} from "lucide-react";

const journey = [
  {
    icon: User,
    title: "Patient Visit",
    text: "Patient arrives with hearing concerns.",
  },
  {
    icon: Activity,
    title: "Audiogram",
    text: "Pure Tone Audiometry is performed.",
  },
  {
    icon: Brain,
    title: "AI Analysis",
    text: "HearSense AI analyzes the hearing thresholds.",
  },
  {
    icon: ShieldCheck,
    title: "Clinical Validation",
    text: "AI findings are validated using clinical rules.",
  },
  {
    icon: FileText,
    title: "Clinical Report",
    text: "A standardized report is generated instantly.",
  },
  {
    icon: HeartHandshake,
    title: "Better Patient Care",
    text: "Supports faster diagnosis and timely treatment.",
  },
];

export default function Impact() {
  return (
    <div className="w-full min-h-screen flex items-center bg-gradient-to-b from-white to-blue-50">

      <div className="max-w-7xl mx-auto w-full px-10">
        <div className="text-center mb-20">

          <h2 className="text-5xl font-bold">
            Transforming the Hearing Care Journey
          </h2>

          <p className="mt-5 text-xl text-slate-600">
            HearSense AI streamlines every stage of the clinical workflow,
            helping audiologists make faster and more informed decisions.
          </p>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {journey.map((step) => {

            const Icon = step.icon;

            return (

              <div
                key={step.title}
                className="bg-white rounded-3xl shadow-lg p-8 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
              >

                <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center">

                  <Icon className="text-blue-600" size={34} />

                </div>

                <h3 className="text-2xl font-bold mt-8">
                  {step.title}
                </h3>

                <p className="text-slate-600 mt-4 leading-8">
                  {step.text}
                </p>

              </div>

            );

          })}

        </div>

        <div className="mt-24 rounded-3xl bg-blue-700 text-white p-14 text-center">

          <h2 className="text-5xl font-bold">
            Why Choose HearSense AI?
          </h2>

          <p className="mt-8 text-xl leading-9 max-w-4xl mx-auto">

            HearSense AI is designed to assist audiologists by reducing
            manual effort, improving consistency, accelerating report
            generation, and providing explainable AI-driven clinical
            decision support. It empowers healthcare professionals to
            focus more on patient care while ensuring reliable and
            standardized hearing assessments.

          </p>

          <div className="grid md:grid-cols-3 gap-8 mt-14">

            <div className="bg-white/10 rounded-2xl p-6">
              <h3 className="text-3xl font-bold">⚡ Faster</h3>
              <p className="mt-3">Instant AI-assisted analysis</p>
            </div>

            <div className="bg-white/10 rounded-2xl p-6">
              <h3 className="text-3xl font-bold">🧠 Smarter</h3>
              <p className="mt-3">Explainable Clinical Intelligence</p>
            </div>

            <div className="bg-white/10 rounded-2xl p-6">
              <h3 className="text-3xl font-bold">❤️ Better Care</h3>
              <p className="mt-3">Supports informed treatment decisions</p>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}