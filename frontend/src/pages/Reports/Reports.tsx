import { useEffect, useState } from "react";
import { Download, Trash2 } from "lucide-react";

interface Report {
  id: number;
  patient_id: number;
  patient_name: string;
  test_date: string;
}

export default function Reports() {
  const [reports, setReports] = useState<Report[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadReports();
  }, []);

  const loadReports = async () => {
    const res = await fetch("https://hearsense-ai.onrender.com/audiograms");
    const data = await res.json();
    setReports(data);
  };

const filtered = reports.filter((r) =>
  (r.patient_name ?? "").toLowerCase().includes(search.toLowerCase())
);

const deleteReport = async (id: number) => {
  if (!window.confirm("Delete this report?")) return;

  await fetch(`https://hearsense-ai.onrender.com/audiograms/${id}`, {
    method: "DELETE",
  });

  loadReports();
};

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">
        AI Clinical Reports
      </h1>

      <input
        placeholder="Search Patient..."
        className="border p-3 rounded-lg w-full mb-6"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <table className="w-full bg-white rounded-xl shadow">
        <thead className="bg-blue-700 text-white">
          <tr>
            <th className="p-4">Patient</th>
            <th>Test Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filtered.map((report) => (
            <tr key={report.id} className="border-b">
              <td className="p-4">{report.patient_name}</td>

              <td>{report.test_date}</td>

              <td>
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
                  Ready
                </span>
              </td>

              <td>
                <button
                    className="text-blue-700 mr-4"
                    onClick={() =>
                        window.open(
                        `https://hearsense-ai.onrender.com/report/${report.id}`,
                        "_blank"
                        )
                    }
                >
  <Download size={18} />
</button>
            <button
                className="text-red-600"
                onClick={() => deleteReport(report.id)}
                >
                <Trash2 size={18} />
            </button>
                                
                  
                
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}