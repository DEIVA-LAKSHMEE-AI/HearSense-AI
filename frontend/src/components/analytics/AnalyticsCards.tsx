import {
  Users,
  FileText,
  Activity,
  Brain,
} from "lucide-react";

interface AnalyticsCardsProps {
  data: {
    totalPatients: number;
    reportsGenerated: number;
    averagePTA: number;
    aiAccuracy: number;
  };
}

export default function AnalyticsCards({
  data,
}: AnalyticsCardsProps) {

  const cards = [
    {
      title: "Total Patients",
      value: data.totalPatients,
      icon: Users,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Reports Generated",
      value: data.reportsGenerated,
      icon: FileText,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Average PTA",
      value: `${data.averagePTA.toFixed(2)} dB`,
      icon: Activity,
      color: "bg-orange-100 text-orange-600",
    },
    {
      title: "AI Accuracy",
      value: `${data.aiAccuracy.toFixed(2)}%`,
      icon: Brain,
      color: "bg-purple-100 text-purple-600",
    },
  ];

  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

      {cards.map((card) => {

        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="bg-white rounded-2xl shadow-lg p-6"
          >

            <div
              className={`w-14 h-14 rounded-xl flex items-center justify-center ${card.color}`}
            >
              <Icon size={28} />
            </div>

            <h2 className="mt-5 text-slate-500">
              {card.title}
            </h2>

            <h1 className="text-4xl font-bold mt-2">
              {card.value}
            </h1>

          </div>
        );

      })}

    </div>
  );
}