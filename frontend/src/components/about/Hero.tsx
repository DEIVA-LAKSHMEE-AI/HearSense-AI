export default function Hero() {
  return (
    <div className="relative w-full">
      <div className="max-w-7xl mx-auto w-full px-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left Content */}

          <div>
            <span className="inline-block px-4 py-2 rounded-full bg-blue-100 text-blue-700 font-semibold mb-6">
              AI-Powered Clinical Decision Support
            </span>

            <h1 className="text-6xl font-extrabold text-slate-900 leading-tight">
              HearSense AI
            </h1>

            <p className="mt-6 text-xl text-slate-600 leading-9 max-w-xl">
              Transforming Pure Tone Audiometry into an intelligent,
              faster, and more consistent clinical decision support
              experience for audiologists.
            </p>

            <button
              className="mt-10 px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-xl text-white font-semibold transition-all duration-300"
              onClick={() =>
                document
                  .getElementById("workflow")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Explore How It Works
            </button>
          </div>

          {/* Right Workflow */}

          <div className="flex justify-center">
            <div className="space-y-5 w-72">

              <div className="bg-white rounded-2xl shadow-lg py-5 text-center font-semibold">
                👤 Patient
              </div>

              <div className="text-center text-blue-500 text-2xl">
                ↓
              </div>

              <div className="bg-white rounded-2xl shadow-lg py-5 text-center font-semibold">
                📈 Audiogram
              </div>

              <div className="text-center text-blue-500 text-2xl">
                ↓
              </div>

              <div className="bg-white rounded-2xl shadow-lg py-5 text-center font-semibold">
                🤖 AI Analysis
              </div>

              <div className="text-center text-blue-500 text-2xl">
                ↓
              </div>

              <div className="bg-white rounded-2xl shadow-lg py-5 text-center font-semibold">
                🩺 Clinical Validation
              </div>

              <div className="text-center text-blue-500 text-2xl">
                ↓
              </div>

              <div className="bg-white rounded-2xl shadow-lg py-5 text-center font-semibold">
                📄 AI Report
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}