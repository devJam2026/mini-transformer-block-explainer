type OutputComparisonTableProps = {
    tokens: string[];
};

const rows = [
    {
        token: "The",
        inputMeaning: "Basic token meaning",
        outputMeaning: "Now linked to cat",
    },
    {
        token: "cat",
        inputMeaning: "Animal concept",
        outputMeaning: "Subject of the sentence",
    },
    {
        token: "sat",
        inputMeaning: "Action concept",
        outputMeaning: "Action connected to cat",
    },
];

export function OutputComparisonTable({ tokens }: OutputComparisonTableProps) {
    const visibleRows = rows.filter((row) => tokens.includes(row.token));

    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-950">
                Input vs Output Meaning
            </h3>

            <div className="mt-4 overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                    <thead>
                        <tr>
                            <th className="border border-slate-200 bg-slate-50 px-3 py-2 text-left">
                                Token
                            </th>
                            <th className="border border-slate-200 bg-slate-50 px-3 py-2 text-left">
                                Before Block
                            </th>
                            <th className="border border-slate-200 bg-slate-50 px-3 py-2 text-left">
                                After Block
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {visibleRows.map((row) => (
                            <tr key={row.token}>
                                <td className="border border-slate-200 px-3 py-2 font-medium text-slate-900">
                                    {row.token}
                                </td>
                                <td className="border border-slate-200 px-3 py-2 text-slate-700">
                                    {row.inputMeaning}
                                </td>
                                <td className="border border-slate-200 px-3 py-2 text-slate-700">
                                    {row.outputMeaning}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}