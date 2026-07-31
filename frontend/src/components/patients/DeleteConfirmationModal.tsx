type Props = {
  isOpen: boolean;
  patientName: string;
  onCancel: () => void;
  onConfirm: () => void;
};

export default function DeleteConfirmationModal({
  isOpen,
  patientName,
  onCancel,
  onConfirm,
}: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-[420px] p-6">

        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
            <span className="text-red-600 text-3xl">🗑️</span>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-center">
          Delete Patient
        </h2>

        <p className="text-center text-gray-600 mt-3">
          Are you sure you want to delete
        </p>

        <p className="text-center font-semibold text-lg mt-1">
          {patientName}?
        </p>

        <p className="text-center text-gray-500 text-sm mt-2">
          This action cannot be undone.
        </p>

        <div className="flex justify-end gap-3 mt-8">

          <button
            onClick={onCancel}
            className="px-5 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="px-5 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
          >
            Delete
          </button>

        </div>

      </div>
    </div>
  );
}