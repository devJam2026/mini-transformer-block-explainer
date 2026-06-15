type EmbeddingMatrixViewerProps = {
    title: string;
    tokens: string[];
    matrix: number[][];
};

export function EmbeddingMatrixViewer({
    title,
    tokens,
    matrix,
}: EmbeddingMatrixViewerProps) {
    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-950">{title}</h3>

            <div className="mt-4 overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                    <thead>
                        <tr>
                            <th className="border border-slate-200 bg-slate-50 px-3 py-2 text-left">
                                Token
                            </th>
                            {matrix[0]?.map((_, index) => (
                                <th
                                    key={index}
                                    className="border border-slate-200 bg-slate-50 px-3 py-2 text-center"
                                >
                                    d{index + 1}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody>
                        {matrix.map((row, rowIndex) => (
                            <tr key={tokens[rowIndex]}>
                                <td className="border border-slate-200 px-3 py-2 font-medium text-slate-900">
                                    {tokens[rowIndex]}
                                </td>

                                {row.map((value, colIndex) => (
                                    <td
                                        key={`${rowIndex}-${colIndex}`}
                                        className="border border-slate-200 px-3 py-2 text-center text-slate-700"
                                    >
                                        {value.toFixed(2)}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}