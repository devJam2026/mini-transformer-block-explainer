"use client";

import { useMemo, useState } from "react";
import {
    attentionRows,
    transformerBlockStages,
} from "@/data/ai/miniTransformerBlock";
import { ArchitectureComparisonCard } from "@/components/transformer-block/ArchitectureComparisonCard";
import { MatrixStageComparison } from "@/components/transformer-block/MatrixStageComparison";
import { OutputComparisonTable } from "@/components/transformer-block/OutputComparisonTable";
import { PlaygroundControls } from "@/components/transformer-block/PlaygroundControls";
import { StageInspector } from "@/components/transformer-block/StageInspector";
import { TransformerPipelineDiagram } from "@/components/transformer-block/TransformerPipelineDiagram";
import {
    buildTransformerBlockDemo,
    tokenizeSentence,
} from "@/lib/transformerMath";
import { StageVisualExplainer } from "@/components/transformer-block/StageVisualExplainer";

export default function MiniTransformerBlockPage() {
    const [sentence, setSentence] = useState("The cat sat");
    const [selectedStageId, setSelectedStageId] = useState(
        transformerBlockStages[0].id
    );

    const tokens = useMemo(() => {
        const parsedTokens = tokenizeSentence(sentence);
        return parsedTokens.length > 0 ? parsedTokens : ["The", "cat", "sat"];
    }, [sentence]);

    const blockDemo = useMemo(() => buildTransformerBlockDemo(tokens), [tokens]);

    const selectedStage = useMemo(
        () =>
            transformerBlockStages.find((stage) => stage.id === selectedStageId) ??
            transformerBlockStages[0],
        [selectedStageId]
    );

    const selectedMatrices = useMemo(() => {
        switch (selectedStageId) {
            case "input-embeddings":
                return [{ title: "Input Embeddings", matrix: blockDemo.input }];

            case "multi-head-attention":
                return [
                    { title: "Input to Attention", matrix: blockDemo.input },
                    { title: "Attention Output", matrix: blockDemo.attentionOutput },
                ];

            case "residual-1":
                return [
                    { title: "Input Embeddings", matrix: blockDemo.input },
                    { title: "Attention Output", matrix: blockDemo.attentionOutput },
                    { title: "Input + Attention Output", matrix: blockDemo.residualOne },
                ];

            case "layernorm-1":
                return [
                    { title: "Before First LayerNorm", matrix: blockDemo.residualOne },
                    { title: "After First LayerNorm", matrix: blockDemo.layerNormOne },
                ];

            case "feed-forward-network":
                return [
                    { title: "Input to FFN", matrix: blockDemo.layerNormOne },
                    { title: "FFN Output", matrix: blockDemo.ffnOutput },
                ];

            case "residual-2":
                return [
                    { title: "Input to FFN Residual", matrix: blockDemo.layerNormOne },
                    { title: "FFN Output", matrix: blockDemo.ffnOutput },
                    { title: "LayerNorm Output + FFN Output", matrix: blockDemo.residualTwo },
                ];

            case "layernorm-2":
                return [
                    { title: "Before Final LayerNorm", matrix: blockDemo.residualTwo },
                    { title: "Final Block Output", matrix: blockDemo.output },
                ];

            default:
                return [{ title: "Input Embeddings", matrix: blockDemo.input }];
        }
    }, [blockDemo, selectedStageId]);

    return (
        <main className="min-h-screen bg-slate-50 px-6 py-10 text-slate-900">
            <section className="mx-auto max-w-7xl">
                <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                    <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                        DevJam AI Engineer · Project 10
                    </p>

                    <h1 className="mt-3 max-w-4xl text-4xl font-bold tracking-tight text-slate-950 md:text-6xl">
                        Mini Transformer Block Explainer
                    </h1>

                    <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
                        Understand how token embeddings move through attention, residual
                        connections, LayerNorm, and feed-forward layers inside one
                        transformer block.
                    </p>

                    <div className="mt-6 flex flex-wrap gap-3">
                        {[
                            "Attention",
                            "Residual",
                            "LayerNorm",
                            "FFN",
                            "Pre-LN vs Post-LN",
                        ].map((item) => (
                            <span
                                key={item}
                                className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700"
                            >
                                {item}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="mt-8 grid gap-6 lg:grid-cols-[360px_1fr]">
                    <aside className="space-y-6 lg:sticky lg:top-6 lg:self-start">
                        <TransformerPipelineDiagram
                            stages={transformerBlockStages}
                            selectedStageId={selectedStageId}
                            onSelectStage={setSelectedStageId}
                        />

                        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                            <h3 className="font-semibold text-slate-950">
                                Interview One-Liner
                            </h3>
                            <p className="mt-2 text-sm leading-6 text-slate-600">
                                Attention lets tokens communicate, residuals preserve signal,
                                LayerNorm stabilizes values, and FFN transforms each token
                                independently.
                            </p>
                        </div>
                    </aside>

                    <section className="space-y-6">
                        <PlaygroundControls
                            sentence={sentence}
                            onSentenceChange={setSentence}
                            tokens={tokens}
                        />

                        <StageInspector stage={selectedStage} />

                        <StageVisualExplainer stageId={selectedStageId} />

                        <MatrixStageComparison tokens={tokens} stages={selectedMatrices} />
                        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                            <h3 className="text-lg font-semibold text-slate-950">
                                Mini Attention Relationship
                            </h3>

                            <p className="mt-2 text-sm text-slate-600">
                                This simplified table shows how tokens start becoming
                                context-aware through self-attention.
                            </p>

                            <div className="mt-4 overflow-x-auto">
                                <table className="w-full border-collapse text-sm">
                                    <thead>
                                        <tr>
                                            <th className="border border-slate-200 bg-slate-50 px-3 py-2 text-left">
                                                Token
                                            </th>
                                            <th className="border border-slate-200 bg-slate-50 px-3 py-2 text-left">
                                                Attends Most To
                                            </th>
                                            <th className="border border-slate-200 bg-slate-50 px-3 py-2 text-left">
                                                Why
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {attentionRows.map((row) => (
                                            <tr key={row.token}>
                                                <td className="border border-slate-200 px-3 py-2 font-medium text-slate-900">
                                                    {row.token}
                                                </td>
                                                <td className="border border-slate-200 px-3 py-2 text-slate-700">
                                                    {row.attendsTo}
                                                </td>
                                                <td className="border border-slate-200 px-3 py-2 text-slate-700">
                                                    {row.reason}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <OutputComparisonTable tokens={tokens} />

                        <ArchitectureComparisonCard />

                        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                            <h3 className="text-lg font-semibold text-slate-950">
                                Interview Explanation
                            </h3>

                            <p className="mt-3 leading-7 text-slate-600">
                                A transformer block is the core repeated unit inside
                                transformer-based LLMs. It first uses multi-head self-attention
                                to let tokens exchange contextual information. Then residual
                                connections preserve the original representation, LayerNorm
                                stabilizes training, and the feed-forward network transforms
                                each token independently. By stacking many such blocks, the
                                model gradually builds richer contextual representations.
                            </p>
                        </div>
                    </section>
                </div>
            </section>
        </main>
    );
}