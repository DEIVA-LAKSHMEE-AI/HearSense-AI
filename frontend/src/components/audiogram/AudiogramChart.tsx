import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";



type Props = {
  frequencies: number[];
  rightEar: number[];
  leftEar: number[];
};

export default function AudiogramChart({
  frequencies,
  rightEar,
  leftEar,
}: Props) {
  const data = frequencies.map((frequency, index) => ({
    frequency,
    right: rightEar[index],
    left: leftEar[index],
  }));

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 mt-8">

      <h2 className="text-2xl font-bold text-blue-700 mb-1">
        Audiogram
      </h2>

      <p className="text-gray-500 mb-6">
        Pure Tone Audiometry (PTA)
      </p>

      <div className="w-full h-[500px]">

        <ResponsiveContainer width="100%" height="100%">

          <LineChart
            data={data}
            margin={{
              top: 60,
              right: 20,
              left: 10,
              bottom: 20,
            }}
          >

            <CartesianGrid
              strokeDasharray="3 3"
            />

            <XAxis
              dataKey="frequency"
              label={{
                value: "Frequency (Hz)",
                position: "insideBottom",
                offset: -10,
              }}
            />

            <YAxis
              reversed
              domain={[0, 120]}
              ticks={[
                0,
                10,
                20,
                30,
                40,
                50,
                60,
                70,
                80,
                90,
                100,
                110,
                120,
              ]}
              label={{
                value: "Hearing Level (dB HL)",
                angle: -90,
                position: "insideLeft",
              }}
            />

            <Tooltip />

            <Legend
                verticalAlign="top"
                align="center"
                height={40}
            />

            <Line
              type="monotone"
              dataKey="right"
              name="Right Ear"
              stroke="#dc2626"
              strokeWidth={3}
              dot={{
                r: 6,
              }}
              activeDot={{
                r: 8,
              }}
            />

            <Line
              type="monotone"
              dataKey="left"
              name="Left Ear"
              stroke="#2563eb"
              strokeWidth={3}
              dot={{
                r: 6,
              }}
              activeDot={{
                r: 8,
              }}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

      <div className="mt-5 flex flex-wrap gap-6 text-sm text-gray-600">

        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-red-600"></div>
          Right Ear
        </div>

        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-blue-600"></div>
          Left Ear
        </div>

      </div>

    </div>
  );
}