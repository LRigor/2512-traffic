import type { Tool } from "@/types/tools";

interface UseCasesProps {
  tool: Tool;
}

export default function UseCases({ tool }: UseCasesProps) {
  if (!tool.general_use_cases || tool.general_use_cases.length === 0) {
    return null;
  }

  return (
    <section className="mb-12 flex justify-center items-center">
      <div className="flex-1 max-w-3xl">
        <h2 className="text-2xl font-bold text-black mb-6">Use Cases</h2>
        <div className="space-y-0 border-t border-gray-200">
          {tool.general_use_cases.map((useCase, index) => (
            <div
              key={useCase._id || index}
              className="border-b border-gray-200 py-4"
            >
              <h3 className="font-semibold text-blue-600 mb-2">
                {useCase.who_needs_this}
              </h3>
              <p className="text-gray-600">{useCase.use_case_text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
