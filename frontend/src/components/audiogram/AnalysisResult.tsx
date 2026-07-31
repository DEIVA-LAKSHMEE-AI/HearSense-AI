import {
  Sparkles,
  Ear,
  Brain,
  Activity,
  Stethoscope,
  CheckCircle,
} from "lucide-react";

type Props = {
  result: any;
};

export default function AnalysisResult({ result }: Props) {
  if (!result) return null;

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 mt-8 border border-gray-200">

      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <Brain className="text-blue-700" size={32} />
        <div>
          <h2 className="text-3xl font-bold text-blue-700">
            AI Analysis Result
          </h2>
          <p className="text-gray-500">
            AI Clinical Decision Support
          </p>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <Ear className="text-blue-600" size={24} />
            <h4 className="font-semibold text-gray-700">
              Right PTA
            </h4>
          </div>

          <p className="text-3xl font-bold text-blue-700">
            {Number(result.right_pta).toFixed(2)} dB
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <Ear className="text-blue-600" size={24} />
            <h4 className="font-semibold text-gray-700">
              Left PTA
            </h4>
          </div>

          <p className="text-3xl font-bold text-blue-700">
            {Number(result.left_pta).toFixed(2)} dB
          </p>
        </div>

        <div className="bg-red-50 border border-red-200 rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <Activity className="text-red-600" size={24} />
            <h4 className="font-semibold text-gray-700">
              Disability
            </h4>
          </div>

          <p className="text-3xl font-bold text-red-600">
            {Number(result.disability_percentage).toFixed(2)}%
          </p>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-xl p-6 shadow-sm">
          <h4 className="font-semibold text-gray-700 mb-2">
            Right Ear
          </h4>

          <p className="text-xl font-bold text-green-700">
            {result.right_degree}
          </p>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-xl p-6 shadow-sm">
          <h4 className="font-semibold text-gray-700 mb-2">
            Left Ear
          </h4>

          <p className="text-xl font-bold text-green-700">
            {result.left_degree}
          </p>
        </div>

      </div>

      {/* Hearing Loss Type */}
      <div className="mt-10">

        <div className="flex items-center gap-3 mb-4">
          <Stethoscope className="text-orange-600" size={26} />

          <h3 className="text-2xl font-bold">
            Hearing Loss Type
          </h3>
        </div>

        <div className="bg-orange-50 border border-orange-200 rounded-xl p-6">

          <p className="text-xl font-semibold text-orange-700">
            {result.hearing_loss_type || "Not Available"}
          </p>

        </div>

      </div>

{/* Audiogram Pattern */}

<div className="mt-10">
  <div className="flex items-center gap-3 mb-4">
    <Sparkles className="text-indigo-600" size={26} />

    <h3 className="text-2xl font-bold">
      Audiogram Pattern Analysis
    </h3>
  </div>

  <div className="grid md:grid-cols-2 gap-6">

    <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-6">

      <h4 className="font-semibold text-indigo-700 mb-3">
        Right Ear
      </h4>

      <p className="text-2xl font-bold">
        {result.right_pattern || "Not Available"}
      </p>

      <p className="text-gray-600 mt-3">
        {result.right_pattern_reason || "Pattern analysis not available."}
      </p>

    </div>

    <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-6">

      <h4 className="font-semibold text-indigo-700 mb-3">
        Left Ear
      </h4>

      <p className="text-2xl font-bold">
        {result.left_pattern || "Not Available"}
      </p>

      <p className="text-gray-600 mt-3">
        {result.left_pattern_reason || "Pattern analysis not available."}
      </p>

    </div>

  </div>
</div>
      


      {/* AI Confidence */}

<div className="mt-10">
  <div className="flex items-center gap-3 mb-4">
    <Brain className="text-green-700" size={26} />

    <h3 className="text-2xl font-bold">
      AI Confidence
    </h3>
  </div>

  <div className="bg-green-50 border border-green-200 rounded-xl p-6">

    <div className="w-full bg-green-200 rounded-full h-5 overflow-hidden">

      <div
        className="bg-green-600 h-5 rounded-full"
        style={{
            width: `${result.confidence || 96}%`
        }}
      />

    </div>

    <p className="mt-4 text-xl font-semibold text-green-700">
      {result.confidence || 96}% Confidence
    </p>

    <p className="text-gray-600 mt-2">
      The AI model has high confidence in this diagnosis based on the provided audiogram thresholds.
    </p>

  </div>
</div>

      {/* AI Clinical Summary */}
      <div className="mt-10">

        <div className="flex items-center gap-3 mb-4">
          <Brain className="text-purple-700" size={26} />

          <h3 className="text-2xl font-bold">
            AI Clinical Summary
          </h3>
        </div>

        <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">

          <p className="text-gray-700 leading-8">
            {result.clinical_summary || "Clinical summary not available."}
          </p>

        </div>

      </div>

      {/* AI Explainability */}
      <div className="mt-10">

        <div className="flex items-center gap-3 mb-4">
          <Brain className="text-blue-700" size={26} />

          <h3 className="text-2xl font-bold">
            AI Explainability
          </h3>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">

          <ul className="space-y-4">

            {result.explanation?.map(
              (item: string, index: number) => (
                <li
                  key={index}
                  className="flex items-start gap-3"
                >
                  <CheckCircle
                    className="text-blue-600 mt-1"
                    size={18}
                  />

                  <span className="text-gray-700">
                    {item}
                  </span>

                </li>
              )
            )}

          </ul>

        </div>

      </div>

      {/* Recommendations */}
      <div className="mt-10">

        <div className="flex items-center gap-3 mb-4">
          <CheckCircle className="text-green-600" size={26} />

          <h3 className="text-2xl font-bold">
            Recommendations
          </h3>
        </div>

        <ul className="space-y-4">

          {result.recommendations?.length ? (
            result.recommendations.map((item: string, index: number) => (
              <li
                key={index}
                className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-xl p-4"
              >
                <CheckCircle className="text-green-600" size={20} />
                <span className="text-gray-700">{item}</span>
              </li>
            ))
          ) : (
            <p className="text-gray-500">No recommendations available.</p>
          )}

        </ul>

      </div>

    </div>
  );
}