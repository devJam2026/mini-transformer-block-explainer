type StageVisualExplainerProps = {
    stageId: string;
};

const stageVisuals: Record<
    string,
    {
        title: string;
        subtitle: string;
        leftLabel: string;
        operator: string;
        rightLabel: string;
        resultLabel: string;
    }
> = {
    "input-embeddings": {
        title: "Token to Embedding",
        subtitle: "Every word starts as a numeric vector before the transformer can process it.",
        leftLabel: "Token",
        operator: "→",
        rightLabel: "Embedding Vector",
        resultLabel: "Numerical meaning",
    },
    "multi-head-attention": {
        title: "Self-Attention",
        subtitle: "Each token looks at other tokens and collects useful context.",
        leftLabel: "Current Token",
        operator: "attends to",
        rightLabel: "Other Tokens",
        resultLabel: "Context-aware token",
    },
    "residual-1": {
        title: "Residual Connection",
        subtitle: "The original token representation is added back after attention.",
        leftLabel: "Original Meaning",
        operator: "+",
        rightLabel: "Attention Context",
        resultLabel: "Preserved + updated meaning",
    },
    "layernorm-1": {
        title: "LayerNorm Stabilization",
        subtitle: "LayerNorm keeps values controlled so deep transformer stacks remain trainable.",
        leftLabel: "Unstable Values",
        operator: "normalize",
        rightLabel: "Mean / Variance",
        resultLabel: "Stable Values",
    },
    "feed-forward-network": {
        title: "Feed Forward Network",
        subtitle: "After attention mixes tokens, FFN transforms each token independently.",
        leftLabel: "Context Token",
        operator: "MLP",
        rightLabel: "Non-linear Transform",
        resultLabel: "Improved token features",
    },
    "residual-2": {
        title: "Second Residual Connection",
        subtitle: "The model keeps the representation before FFN and adds the FFN improvement.",
        leftLabel: "Before FFN",
        operator: "+",
        rightLabel: "FFN Output",
        resultLabel: "Enhanced representation",
    },
    "layernorm-2": {
        title: "Final LayerNorm",
        subtitle: "The final output is normalized before being passed to the next transformer block.",
        leftLabel: "Residual Output",
        operator: "normalize",
        rightLabel: "LayerNorm",
        resultLabel: "Final block output",
    },
};

export function StageVisualExplainer({ stageId }: StageVisualExplainerProps) {
    const visual = stageVisuals[stageId] ?? stageVisuals["input-embeddings"];

    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-950">{visual.title}</h3>

            <p className="mt-2 text-sm leading-6 text-slate-600">
                {visual.subtitle}
            </p>

            <div className="mt-5 grid gap-3 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-center">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-center">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Input
                    </p>
                    <p className="mt-2 font-semibold text-slate-950">
                        {visual.leftLabel}
                    </p>
                </div>

                <div className="text-center text-xl font-bold text-slate-400">
                    {visual.operator}
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-center">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Operation
                    </p>
                    <p className="mt-2 font-semibold text-slate-950">
                        {visual.rightLabel}
                    </p>
                </div>

                <div className="text-center text-xl font-bold text-slate-400">=</div>

                <div className="rounded-2xl border border-slate-950 bg-slate-950 p-4 text-center text-white">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                        Output
                    </p>
                    <p className="mt-2 font-semibold">{visual.resultLabel}</p>
                </div>
            </div>
        </div>
    );
}