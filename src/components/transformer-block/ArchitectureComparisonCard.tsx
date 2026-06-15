const rows = [
    {
        type: "Post-LN",
        structure: "Attention → Add → LayerNorm → FFN → Add → LayerNorm",
        note: "Useful for teaching the classic transformer flow.",
    },
    {
        type: "Pre-LN",
        structure: "LayerNorm → Attention → Add → LayerNorm → FFN → Add",
        note: "Common in many modern large language model architectures.",
    },
];

export function ArchitectureComparisonCard() {
    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-950">
                Pre-LN vs Post-LN
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-600">
                The same transformer block idea can be arranged in different ways. Your
                visualizer teaches the Post-LN style first because it is easier for
                beginners to follow.
            </p>

            <div className="mt-4 overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                    <thead>
                        <tr>
                            <th className="border border-slate-200 bg-slate-50 px-3 py-2 text-left">
                                Type
                            </th>
                            <th className="border border-slate-200 bg-slate-50 px-3 py-2 text-left">
                                Structure
                            </th>
                            <th className="border border-slate-200 bg-slate-50 px-3 py-2 text-left">
                                Note
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {rows.map((row) => (
                            <tr key={row.type}>
                                <td className="border border-slate-200 px-3 py-2 font-medium text-slate-900">
                                    {row.type}
                                </td>
                                <td className="border border-slate-200 px-3 py-2 font-mono text-xs text-slate-700">
                                    {row.structure}
                                </td>
                                <td className="border border-slate-200 px-3 py-2 text-slate-700">
                                    {row.note}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}