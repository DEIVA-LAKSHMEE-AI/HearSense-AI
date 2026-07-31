type Patient = {
  id: number;
  name: string;
  age: number;
  gender: string;
  phone: string;
  email: string;
};

type Props = {
  patients: Patient[];
  onEdit: (patient: Patient) => void;
  onDelete: (patient: Patient) => void;
};

export default function PatientTable({
  patients,
  onEdit,
  onDelete,
}: Props) {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <table className="w-full">
        <thead>
          <tr className="border-b bg-gray-100">
            <th className="text-left p-3">ID</th>
            <th className="text-left p-3">Name</th>
            <th className="text-left p-3">Age</th>
            <th className="text-left p-3">Gender</th>
            <th className="text-left p-3">Phone</th>
            <th className="text-left p-3">Email</th>
            <th className="text-center p-3">Actions</th>
          </tr>
        </thead>

        <tbody>
          {patients.length === 0 ? (
            <tr>
              <td colSpan={7} className="text-center py-8 text-gray-500">
                No patients found
              </td>
            </tr>
          ) : (
            patients.map((patient, index) => (
              <tr
                key={patient.id}
                className="border-b hover:bg-gray-50"
              >
                <td className="p-3">{index + 1}</td>
                <td className="p-3">{patient.name}</td>
                <td className="p-3">{patient.age}</td>
                <td className="p-3">{patient.gender}</td>
                <td className="p-3">{patient.phone}</td>
                <td className="p-3">{patient.email}</td>

                <td className="p-3">
                  <div className="flex gap-2 justify-center">
                    <button
                      onClick={() => onEdit(patient)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => onDelete(patient)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}