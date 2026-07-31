import { useState } from "react";
import {
  User,
  Activity,
  Brain,
  ShieldCheck,
  FileText,
  ChevronDown,
} from "lucide-react";

const workflowSteps = [
  {
    icon: User,
    title: "Patient",
    description:
      "Patient information and hearing thresholds are securely recorded before analysis begins.",
    points: [
      "Patient Registration",
      "Medical History",
      "Secure Records",
    ],
  },
  {
    icon: Activity,
    title: "Audiogram",
    description:
      "Pure Tone Audiometry results are entered manually or uploaded for AI interpretation.",
    points: [
      "Manual Entry",
      "Image Upload",
      "Frequency Thresholds",
    ],
  },
  {
    icon: Brain,
    title: "AI Analysis",
    description:
      "HearSense AI analyzes hearing thresholds to identify hearing loss patterns and estimate hearing performance.",
    points: [
      "PTA Calculation",
      "Pattern Detection",
      "Hearing Loss Classification",
      "Disability Estimation",
    ],
  },
  {
    icon: ShieldCheck,
    title: "Clinical Validation",
    description:
      "AI predictions are validated using established clinical audiology principles before generating the final report.",
    points: [
      "Clinical Rules",
      "Reliable Results",
      "Explainable AI",
    ],
  },
  {
    icon: FileText,
    title: "Clinical Report",
    description:
      "A comprehensive AI-assisted report is generated to support faster and more consistent clinical decision-making.",
    points: [
      "Diagnosis Summary",
      "Recommendations",
      "Download Report",
    ],
  },
];

export default function Workflow() {
  const [selected, setSelected] = useState(2);

  const active = workflowSteps[selected];

  return (
    <div
      id="workflow"
      className="w-full min-h-screen flex items-center bg-slate-50"
    >
      <div className="max-w-7xl mx-auto w-full px-10">

        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-slate-900">
            How HearSense AI Works
          </h2>

          <p className="text-xl text-slate-600 mt-5">
            Every step is designed to assist audiologists with faster,
            smarter and more consistent hearing assessment.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-14 items-center">

          {/* FLOW */}

          <div className="flex flex-col items-center">

            {workflowSteps.map((step, index) => {

              const Icon = step.icon;

              return (
                <div key={index} className="flex flex-col items-center">

                  <button
                    onClick={() => setSelected(index)}
                    className={`w-72 rounded-2xl transition-all duration-300 p-6 shadow-lg border-2

                    ${
                      selected === index
                        ? "bg-blue-600 text-white border-blue-600 scale-105"
                        : "bg-white border-white hover:border-blue-500 hover:scale-105"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <Icon size={28} />
                      <span className="font-semibold text-lg">
                        {step.title}
                      </span>
                    </div>
                  </button>

                  {index !== workflowSteps.length - 1 && (
                    <ChevronDown
                      size={34}
                      className="my-4 text-blue-500 animate-bounce"
                    />
                  )}

                </div>
              );
            })}
          </div>

          {/* DETAILS */}

          <div className="bg-white rounded-3xl shadow-xl p-10 min-h-[470px]">

            <div className="flex items-center gap-4 mb-8">

              <active.icon className="text-blue-600" size={42} />

              <h3 className="text-3xl font-bold">
                {active.title}
              </h3>

            </div>

            <p className="text-lg text-slate-600 leading-9">
              {active.description}
            </p>

            <div className="mt-10 space-y-4">

              {active.points.map((point) => (

                <div
                  key={point}
                  className="flex items-center gap-3 bg-blue-50 rounded-xl p-4"
                >
                  <div className="w-3 h-3 rounded-full bg-blue-600"></div>

                  <span className="font-medium">
                    {point}
                  </span>
                </div>

              ))}

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}