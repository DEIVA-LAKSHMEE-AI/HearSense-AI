import { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import { getPatients } from "../../services/patientService";
import { saveAudiogram } from "../../services/audiogramService";
import {
  analyzeAudiogram,
  downloadClinicalReport,
} from "../../services/analysisService";
import AudiogramChart from "../../components/audiogram/AudiogramChart";
import AnalysisResult from "../../components/audiogram/AnalysisResult";
import { toast } from "react-toastify";
import { uploadAudiogramImage } from "../../services/imageAnalysisService";
import Select from "react-select";

type Patient = {
  id: number;
  name: string;
  age: number;
  gender: string;
  phone: string;
  email: string;
};

const frequencies = [250, 500, 1000, 2000, 4000, 8000];

export default function Audiogram() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [selectedPatient, setSelectedPatient] = useState("");

  const [testDate, setTestDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const [inputMethod, setInputMethod] = useState<
    "manual" | "image" 
  >("manual");

  const [rightEar, setRightEar] = useState<number[]>(
    Array(frequencies.length).fill(0)
  );

  const [leftEar, setLeftEar] = useState<number[]>(
    Array(frequencies.length).fill(0)
  );

  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [savedAudiogramId, setSavedAudiogramId] = useState<number | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const [imageResult, setImageResult] = useState<any>(null);

  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const loadPatients = async () => {
      try {
        const data = await getPatients();
        setPatients(data);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load patients.");
      }
    };

    loadPatients();
  }, []);

  const handleImageUpload = async () => {
    if (!selectedImage) {
      toast.warning("Please choose an image.");
      return;
    }

    try {
      setUploading(true);

      const result = await uploadAudiogramImage(selectedImage);

      setImageResult(result);

      toast.success("Audiogram processed successfully.");

    } catch (error) {
      console.error(error);
      toast.error("Image upload failed.");
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    if (!selectedPatient) {
      toast.warning("Please select a patient.");
      return;
    }

    try {
      const response = await saveAudiogram({
        patient_id: Number(selectedPatient),
        test_date: testDate,

        right_250: rightEar[0],
        right_500: rightEar[1],
        right_1000: rightEar[2],
        right_2000: rightEar[3],
        right_4000: rightEar[4],
        right_8000: rightEar[5],

        left_250: leftEar[0],
        left_500: leftEar[1],
        left_1000: leftEar[2],
        left_2000: leftEar[3],
        left_4000: leftEar[4],
        left_8000: leftEar[5],
      });

      setSavedAudiogramId(response.id);

      toast.success("Audiogram saved successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to save audiogram.");
    }
  };

  const handleAnalyze = async () => {
    if (!savedAudiogramId) {
      toast.warning("Please save the audiogram first.");
      return;
    }

    try {
      const result = await analyzeAudiogram(savedAudiogramId);
      setAnalysisResult(result);
      toast.success("AI analysis completed!");
    } catch (error) {
      console.error(error);
      toast.error("AI analysis failed.");
    }
  };

  const handleDownloadReport = async () => {
  if (!savedAudiogramId) {
    toast.warning("Please save the audiogram first.");
    return;
  }

  try {
    const blob = await downloadClinicalReport(savedAudiogramId);

    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = "HearSense_AI_Report.pdf";

    document.body.appendChild(link);

    link.click();

    link.remove();

    window.URL.revokeObjectURL(url);

    toast.success("Clinical report downloaded.");
  } catch (error) {
    console.error(error);
    toast.error("Failed to download report.");
  }
};

  const handleReset = () => {
    setSelectedPatient("");
    setTestDate(new Date().toISOString().split("T")[0]);
    setInputMethod("manual");

    setRightEar(Array(frequencies.length).fill(0));
    setLeftEar(Array(frequencies.length).fill(0));

    setSavedAudiogramId(null);
    setAnalysisResult(null);

    toast.info("Form reset.");
  };

  const selected = patients.find(
    (p) => p.id === Number(selectedPatient)
  );

    return (
    <Layout>
      <div className="space-y-6">

        {/* Header */}

        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Pure Tone Audiogram
          </h1>

          <p className="text-gray-500 mt-2">
            Enter Pure Tone Audiometry data or upload an audiogram for AI
            analysis.
          </p>
        </div>

        {/* Patient Information */}

        <div className="bg-white rounded-xl shadow-md p-6">

          <h2 className="text-xl font-semibold mb-5">
            Patient Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            <div>

              <label className="block mb-2 font-medium">
                Select Patient
              </label>

              <Select
                options={patients.map((patient) => ({
                  value: patient.id,
                  label: `${patient.name} • ${patient.gender} • ${patient.age} yrs`,
                }))}
                value={
                  patients
                    .filter((p) => p.id === Number(selectedPatient))
                    .map((p) => ({
                      value: p.id,
                      label: `${p.name} • ${p.gender} • ${p.age} yrs`,
                    }))[0] || null
                }
                onChange={(option) =>
                  setSelectedPatient(option ? String(option.value) : "")
                }
                placeholder="Search Patient..."
                isSearchable
                styles={{
                  control: (base) => ({
                    ...base,
                    minHeight: 50,
                    borderRadius: 10,
                    borderColor: "#d1d5db",
                    boxShadow: "none",
                  }),
                  option: (base, state) => ({
                    ...base,
                    backgroundColor: state.isFocused ? "#2563eb" : "#fff",
                    color: state.isFocused ? "#fff" : "#111827",
                    cursor: "pointer",
                  }),
                }}
              />

            </div>

            <div>

              <label className="block mb-2 font-medium">
                Test Date
              </label>

              <input
                type="date"
                value={testDate}
                onChange={(e) => setTestDate(e.target.value)}
                className="w-full border rounded-lg p-3"
              />

            </div>

          </div>

        </div>

        {/* Selected Patient */}

        {selected && (

          <div className="bg-blue-50 rounded-xl border border-blue-200 p-5">

            <h3 className="text-lg font-semibold mb-4">
              Selected Patient
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">

              <div>
                <p className="text-gray-500 text-sm">
                  Name
                </p>

                <p className="font-semibold">
                  {selected.name}
                </p>
              </div>

              <div>
                <p className="text-gray-500 text-sm">
                  Age
                </p>

                <p className="font-semibold">
                  {selected.age}
                </p>
              </div>

              <div>
                <p className="text-gray-500 text-sm">
                  Gender
                </p>

                <p className="font-semibold">
                  {selected.gender}
                </p>
              </div>

              <div>
                <p className="text-gray-500 text-sm">
                  Patient ID
                </p>

                <p className="font-semibold">
                  #{selected.id}
                </p>
              </div>

            </div>

          </div>

        )}

        {/* Input Method */}

        <div className="bg-white rounded-xl shadow-md p-6">

          <h2 className="text-xl font-semibold mb-5">
            Audiogram Input Method
          </h2>

          <div className="flex flex-wrap gap-8">

            <label className="flex items-center gap-2">

              <input
                type="radio"
                checked={inputMethod === "manual"}
                onChange={() => setInputMethod("manual")}
              />

              Manual Entry

            </label>

            <label className="flex items-center gap-2">

              <input
                type="radio"
                checked={inputMethod === "image"}
                onChange={() => setInputMethod("image")}
              />

              Upload Image

            </label>

            

          </div>

        </div>

        {/* Manual Entry */}
        {inputMethod === "manual" && (
  <div className="bg-white rounded-xl shadow-md p-6">

    <h2 className="text-xl font-semibold mb-5">
      Pure Tone Audiometry Thresholds
    </h2>

    <div className="overflow-x-auto">

      <table className="min-w-full border border-gray-300">

        <thead className="bg-blue-600 text-white">

          <tr>
            <th className="border p-3">
              Frequency (Hz)
            </th>

            <th className="border p-3">
              Right Ear (dB HL)
            </th>

            <th className="border p-3">
              Left Ear (dB HL)
            </th>
          </tr>

        </thead>

        <tbody>

          {frequencies.map((freq, index) => (

            <tr
              key={freq}
              className="text-center hover:bg-gray-50"
            >

              <td className="border p-3 font-semibold">
                {freq}
              </td>

              <td className="border p-3">

                <input
                  type="number"
                  min={0}
                  max={120}
                  value={rightEar[index]}
                  onChange={(e) => {
                    const updated = [...rightEar];
                    updated[index] = Number(e.target.value);
                    setRightEar(updated);
                  }}
                  className="border rounded-lg p-2 w-24 text-center"
                />

              </td>

              <td className="border p-3">

                <input
                  type="number"
                  min={0}
                  max={120}
                  value={leftEar[index]}
                  onChange={(e) => {
                    const updated = [...leftEar];
                    updated[index] = Number(e.target.value);
                    setLeftEar(updated);
                  }}
                  className="border rounded-lg p-2 w-24 text-center"
                />

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

    <div className="mt-8">

      <AudiogramChart
        frequencies={frequencies}
        rightEar={rightEar}
        leftEar={leftEar}
      />

    </div>

  </div>
)}

{/* Upload Image */}

{inputMethod === "image" && (
  <div className="bg-white rounded-xl shadow-md p-8">
    <div className="border-2 border-dashed border-blue-400 rounded-xl p-12 text-center">
      <p className="text-5xl mb-4">🖼️</p>

      <h2 className="text-xl font-semibold">
        Upload Audiogram Image
      </h2>

      <p className="text-gray-500 mt-2">
        JPG, JPEG or PNG
      </p>

      <div className="mt-8 flex flex-col items-center gap-5">

  <input
    id="audiogram-upload"
    type="file"
    accept=".png,.jpg,.jpeg"
    className="hidden"
    onChange={(e) => {
      if (e.target.files?.length) {
        setSelectedImage(e.target.files[0]);
      }
    }}
  />

  <label
      htmlFor="audiogram-upload"
      className="cursor-pointer rounded-lg bg-slate-800 hover:bg-slate-900 text-white px-6 py-3 font-medium transition"
    >
      Choose Image
    </label>

    <p className="text-sm text-slate-500">
      {selectedImage
        ? `Selected: ${selectedImage.name}`
        : "No image selected"}
    </p>

  </div>

      <button
  onClick={handleImageUpload}
  disabled={uploading || !selectedImage}
  className="mt-6 bg-blue-700 hover:bg-blue-800 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-8 py-3 rounded-lg font-medium transition"
>
  {uploading ? "Processing..." : "Upload & Process"}
</button>

      {imageResult && (
        <div className="grid grid-cols-2 gap-6 mt-8">
          <div>
            <h3 className="font-bold">Original</h3>
            <img
              src={`https://hearsense-ai.onrender.com/${imageResult.original.replace(/\\/g, "/")}`}
              className="rounded-lg border"
            />
          </div>

          <div>
            <h3 className="font-bold">Processed</h3>
            <img
              src={`https://hearsense-ai.onrender.com/${imageResult.processed.replace(/\\/g, "/")}`}
              className="rounded-lg border"
            />
          </div>

          <div>
            <h3 className="font-bold">Grid Detection</h3>
            <img
              src={`/${imageResult.grid_image.replace(/\\/g, "/")}`}
              className="rounded-lg border"
            />
          </div>

          <div>
            <h3 className="font-bold">Cropped Graph</h3>
            <img
              src={`https://hearsense-ai.onrender.com/${imageResult.cropped_graph.replace(/\\/g, "/")}`}
              className="rounded-lg border"
            />
          </div>
        </div>
      )}
    </div>
  </div>
)}



{/* Action Buttons */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8"> 

  <button
  onClick={handleSave}
  className="w-full bg-blue-700 hover:bg-blue-800 text-white py-3 rounded-lg font-medium transition"
>
  Save Test
</button>

<button
  onClick={handleAnalyze}
  className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium transition"
>
  Analyze Using AI
</button>

<button
  onClick={handleDownloadReport}
  className="w-full bg-purple-700 hover:bg-purple-800 text-white py-3 rounded-lg font-medium transition"
>
  Download AI Report
</button>

<button
  onClick={handleReset}
  className="w-full bg-gray-300 hover:bg-gray-400 py-3 rounded-lg font-medium transition"
>
  Reset
</button>

</div>

{/* AI Analysis Result */}

{analysisResult && (

  <div className="mt-6">

    <AnalysisResult result={analysisResult} />

  </div>

)}

</div>

</Layout>

);
}