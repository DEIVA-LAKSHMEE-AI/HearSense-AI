interface Report {
  patient: string;
  diagnosis: string;
  confidence: number;
}

interface Props {
  data: Report[];
}

export default function RecentReports({ data }: Props) {
  return (
    <div className="bg-white rounded-3xl shadow-lg p-6">

      <h2 className="text-2xl font-bold mb-6">
        Recent AI Reports
      </h2>

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead>

            <tr className="border-b">

              <th className="text-left py-4 font-semibold">
                Patient
              </th>

              <th className="text-left font-semibold">
                Diagnosis
              </th>

              <th className="text-left font-semibold">
                AI Confidence
              </th>

            </tr>

          </thead>

          <tbody>

            {data.length === 0 ? (

              <tr>

                <td
                  colSpan={3}
                  className="text-center py-8 text-slate-500"
                >
                  No reports available.
                </td>

              </tr>

            ) : (

              data.map((report, index) => (

                <tr
                  key={index}
                  className="border-b hover:bg-slate-50 transition"
                >

                  <td className="py-4">
                    {report.patient}
                  </td>

                  <td>
                    {report.diagnosis}
                  </td>

                  <td className="font-bold text-blue-600">
                    {report.confidence.toFixed(2)}%
                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}