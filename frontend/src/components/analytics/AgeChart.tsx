import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

interface AgeGroup {
  group: string;
  count: number;
}

interface Props {
  data: AgeGroup[];
}

export default function AgeChart({ data }: Props) {
  return (
    <div className="bg-white rounded-3xl shadow-lg p-6 h-[420px]">

      <h2 className="text-2xl font-bold mb-6">
        Patients by Age Group
      </h2>

      <ResponsiveContainer width="100%" height="90%">
        <BarChart data={data}>

          <XAxis dataKey="group" />

          <YAxis />

          <Tooltip />

          <Bar
            dataKey="count"
            radius={[8, 8, 0, 0]}
          />

        </BarChart>
      </ResponsiveContainer>

    </div>
  );
}