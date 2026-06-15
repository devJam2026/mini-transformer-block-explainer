type PlaygroundControlsProps = {
    sentence: string;
    onSentenceChange: (sentence: string) => void;
    tokens: string[];
};

export function PlaygroundControls({
    sentence,
    onSentenceChange,
    tokens,
}: PlaygroundControlsProps) {
    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-950">
                Interactive Sentence Input
            </h2>

            <p className="mt-2 text-sm text-slate-600">
                Enter a short sentence. The playground will convert each word into a
                small demo embedding and pass it through a simplified transformer block.
            </p>

            <textarea
                value={sentence}
                onChange={(event) => onSentenceChange(event.target.value)}
                className="mt-4 min-h-24 w-full rounded-xl border border-slate-300 bg-white p-4 text-sm text-slate-900 outline-none transition focus:border-slate-950"
                placeholder="The cat sat"
            />

            <div className="mt-4">
                <p className="text-sm font-semibold text-slate-950">Tokens</p>

                <div className="mt-2 flex flex-wrap gap-2">
                    {tokens.map((token) => (
                        <span
                            key={token}
                            className="rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white"
                        >
                            {token}
                        </span>
                    ))}
                </div>

                <p className="mt-3 text-xs text-slate-500">
                    MVP limit: maximum 6 tokens to keep the matrix readable.
                </p>
            </div>
        </div>
    );
}