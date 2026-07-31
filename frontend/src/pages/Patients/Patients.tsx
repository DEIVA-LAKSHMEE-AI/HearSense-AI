import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { saveAs } from "file-saver";
import PatientTable from "../../components/patients/PatientTable";
import AddPatientModal from "../../components/patients/AddPatientModal";
import Layout from "../../components/layout/Layout";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import DeleteConfirmationModal from "../../components/patients/DeleteConfirmationModal";
import EmptyState from "../../components/common/EmptyState";


import {
  getPatients,
  addPatient,
  updatePatient,
  deletePatient,
} from "../../services/patientService";

type Patient = {
  id: number;
  name: string;
  age: number;
  gender: string;
  phone: string;
  email: string;
};

export default function Patients() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [genderFilter, setGenderFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [editingPatient, setEditingPatient] = useState<Patient | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [patientToDelete, setPatientToDelete] =useState<Patient | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const patientsPerPage = 10;
  
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    phone: "",
    email: "",
  });

  const fetchPatients = async () => {
    try {
        setLoading(true);

        const data = await getPatients();

        setPatients(data);
    } catch (error) {
        console.error(error);
        toast.error("Failed to load patients.");
    } finally {
        setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const resetForm = () => {
    setFormData({
      name: "",
      age: "",
      gender: "",
      phone: "",
      email: "",
    });

    setEditingPatient(null);
  };

  const handleEdit = (patient: Patient) => {
    setEditingPatient(patient);

    setFormData({
      name: patient.name,
      age: patient.age.toString(),
      gender: patient.gender,
      phone: patient.phone,
      email: patient.email,
    });

    setShowModal(true);
  };

  const handleDelete = (patient: Patient) => {
  setPatientToDelete(patient);
  setShowDeleteModal(true);
};

  const confirmDelete = async () => {
    if (!patientToDelete) return;

    try {
        await deletePatient(patientToDelete.id);

        toast.success("Patient deleted successfully!");

        setShowDeleteModal(false);
        setPatientToDelete(null);

        fetchPatients();
    } catch (error) {
        console.error(error);
        toast.error("Failed to delete patient.");
    }
  };

  const handleSubmit = async () => {
    try {
      
      const patient = {
        ...formData,
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim(),
      };

      if (patient.name.length < 2) {
        toast.warning("Patient name must be at least 2 characters.");
        return;
      }

      if (!/^[A-Za-z ]+$/.test(patient.name)) {
        toast.warning("Patient name should contain only letters and spaces.");
        return;
      }

      const age = Number(patient.age);

      if (isNaN(age) || age < 0 || age > 120) {
        toast.warning("Age must be between 0 and 120.");
        return;
      }

      if (!patient.gender) {
        toast.warning("Please select a gender.");
        return;
      }

      if (!/^\d{10}$/.test(patient.phone)) {
        toast.warning("Phone number must contain exactly 10 digits.");
        return;
      }

      

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(patient.email)) {
        toast.warning("Please enter a valid email address.");
        return;
      }

      if (editingPatient) {
        await updatePatient(editingPatient.id, {
            ...patient,
            age,
        });

        toast.success("Patient updated successfully!");
        } else {
        await addPatient({
            ...patient,
            age,
        });

        toast.success("Patient added successfully!");
      }

      await fetchPatients();

      setShowModal(false);

      resetForm();
    } catch (error) {
      console.error(error);
      toast.error("Operation failed.");
    }
  };
  
  const filteredPatients = patients.filter((patient) => {
    const matchesSearch = patient.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesGender =
        genderFilter === "All" || patient.gender === genderFilter;

    return matchesSearch && matchesGender;
  });

  const indexOfLastPatient = currentPage * patientsPerPage;
  const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;

  const currentPatients = filteredPatients.slice(
    indexOfFirstPatient,
    indexOfLastPatient
  );

  const totalPages = Math.ceil(filteredPatients.length / patientsPerPage);

  const totalPatients = patients.length;

const malePatients = patients.filter(
  (patient) => patient.gender === "Male"
).length;

const femalePatients = patients.filter(
  (patient) => patient.gender === "Female"
).length;

const otherPatients = patients.filter(
  (patient) => patient.gender === "Other"
).length;

   const exportCSV = () => {
  const headers = ["Name", "Age", "Gender", "Phone", "Email"];

  const rows = patients.map((p) => [
    p.name,
    p.age,
    p.gender,
    p.phone,
    p.email,
  ]);

  const csv = [
    headers.join(","),
    ...rows.map((r) => r.join(",")),
  ].join("\n");

  const blob = new Blob([csv], {
    type: "text/csv;charset=utf-8;",
  });

  saveAs(blob, "patients.csv");
};

  return (
    <Layout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Patients</h1>

        <div className="flex gap-3">

            <button
                onClick={exportCSV}
                className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg font-medium transition"
            >
                Export CSV
            </button>

            <button
                onClick={() => {
                resetForm();
                setShowModal(true);
                }}
                className="bg-blue-700 hover:bg-blue-800 text-white px-5 py-2 rounded-lg font-medium transition"
            >
                + Add Patient
            </button>

        </div>
      </div>
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">

  <div className="bg-white rounded-xl shadow-md p-5 border-l-4 border-blue-600">
    <h3 className="text-gray-500 text-sm">Total Patients</h3>
    <p className="text-3xl font-bold mt-2">{totalPatients}</p>
  </div>

  <div className="bg-white rounded-xl shadow-md p-5 border-l-4 border-green-600">
    <h3 className="text-gray-500 text-sm">Male Patients</h3>
    <p className="text-3xl font-bold mt-2">{malePatients}</p>
  </div>

  <div className="bg-white rounded-xl shadow-md p-5 border-l-4 border-pink-600">
    <h3 className="text-gray-500 text-sm">Female Patients</h3>
    <p className="text-3xl font-bold mt-2">{femalePatients}</p>
  </div>

  <div className="bg-white rounded-xl shadow-md p-5 border-l-4 border-yellow-500">
    <h3 className="text-gray-500 text-sm">Other Gender</h3>
    <p className="text-3xl font-bold mt-2">{otherPatients}</p>
  </div>

</div>

<>
  <div className="flex gap-4 mb-4">
  <input
    type="text"
    placeholder="🔍 Search patient..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className="flex-1 border rounded-lg p-3"
  />

  <select
    value={genderFilter}
    onChange={(e) => {
      setGenderFilter(e.target.value);
      setCurrentPage(1);
    }}
    className="border rounded-lg p-3 w-48"
  >
    <option value="All">All</option>
    <option value="Male">Male</option>
    <option value="Female">Female</option>
    <option value="Other">Other</option>
  </select>
</div>

  {loading ? (
    <LoadingSpinner />
) : currentPatients.length === 0 ? (
    <EmptyState message="No patients match your search." />
) : (
    <PatientTable
        patients={currentPatients}
        onEdit={handleEdit}
        onDelete={handleDelete}
    />
)}
</>
   
   <div className="flex justify-between items-center mt-6">
  <button
    disabled={currentPage === 1}
    onClick={() => setCurrentPage(currentPage - 1)}
    className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
  >
    Previous
  </button>

  <span>
    Page {currentPage} of {totalPages || 1}
  </span>

  <button
    disabled={currentPage === totalPages || totalPages === 0}
    onClick={() => setCurrentPage(currentPage + 1)}
    className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
  >
    Next
  </button>
</div>

      <AddPatientModal
        showModal={showModal}
        setShowModal={setShowModal}
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
      <DeleteConfirmationModal
        isOpen={showDeleteModal}
        patientName={patientToDelete?.name || ""}
        onCancel={() => {
            setShowDeleteModal(false);
            setPatientToDelete(null);
        }}
        onConfirm={confirmDelete}
      />
    </Layout>
  );
}