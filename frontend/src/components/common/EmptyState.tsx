type Props = {
  message?: string;
};

export default function EmptyState({
  message = "No patients found.",
}: Props) {
  return (
    <div className="bg-white rounded-xl shadow p-12 text-center">
      <div className="text-6xl mb-4">📂</div>

      <h2 className="text-2xl font-semibold">
        No Data Available
      </h2>

      <p className="text-gray-500 mt-2">
        {message}
      </p>
    </div>
  );
}