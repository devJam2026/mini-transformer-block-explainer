import type { TransformerStage } from "@/data/ai/miniTransformerBlock";

type StageInspectorProps = {
    stage: TransformerStage;
};

export function StageInspector({ stage }: StageInspectorProps) {
    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium uppercase tracking-wide text-slate-500">
                Selected Stage
            </p>

            <h2 className="mt-2 text-2xl font-bold text-slate-950">{stage.title}</h2>

            <p className="mt-3 text-slate-600">{stage.description}</p>

            <div className="mt-5 rounded-xl bg-slate-950 p-4 text-sm text-white">
                <p className="text-xs uppercase tracking-wide text-slate-400">
                    Formula
                </p>
                <p className="mt-2 font-mono">{stage.formula}</p>
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-3">
                <div className="rounded-xl bg-slate-50 p-4">
                    <h3 className="font-semibold text-slate-950">Beginner</h3>
                    <p className="mt-2 text-sm text-slate-600">
                        {stage.beginnerExplanation}
                    </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-4">
                    <h3 className="font-semibold text-slate-950">Engineer</h3>
                    <p className="mt-2 text-sm text-slate-600">
                        {stage.engineerExplanation}
                    </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-4">
                    <h3 className="font-semibold text-slate-950">Why it matters</h3>
                    <p className="mt-2 text-sm text-slate-600">{stage.whyItMatters}</p>
                </div>
            </div>
        </div>
    );
}