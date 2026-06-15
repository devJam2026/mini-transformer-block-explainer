import type { TransformerStage } from "@/data/ai/miniTransformerBlock";

type TransformerPipelineDiagramProps = {
    stages: TransformerStage[];
    selectedStageId: string;
    onSelectStage: (stageId: string) => void;
};

export function TransformerPipelineDiagram({
    stages,
    selectedStageId,
    onSelectStage,
}: TransformerPipelineDiagramProps) {
    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-950">
                Transformer Block Pipeline
            </h2>

            <div className="mt-5 space-y-3">
                {stages.map((stage, index) => {
                    const isSelected = stage.id === selectedStageId;

                    return (
                        <div key={stage.id}>
                            <button
                                onClick={() => onSelectStage(stage.id)}
                                className={`w-full rounded-xl border px-4 py-3 text-left transition ${isSelected
                                    ? "border-slate-950 bg-slate-950 text-white"
                                    : "border-slate-200 bg-slate-50 text-slate-800 hover:bg-slate-100"
                                    }`}
                            >
                                <div className="text-sm font-semibold">
                                    {index + 1}. {stage.title}
                                </div>
                                <div
                                    className={`mt-1 text-xs ${isSelected ? "text-slate-200" : "text-slate-500"
                                        }`}
                                >
                                    {stage.description}
                                </div>
                            </button>

                            {index < stages.length - 1 && (
                                <div className="flex justify-center py-1 text-slate-400">↓</div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}