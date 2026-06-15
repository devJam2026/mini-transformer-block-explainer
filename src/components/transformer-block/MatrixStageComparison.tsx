import { EmbeddingMatrixViewer } from "./EmbeddingMatrixViewer";

type MatrixStageComparisonProps = {
    tokens: string[];
    stages: {
        title: string;
        matrix: number[][];
    }[];
};

export function MatrixStageComparison({
    tokens,
    stages,
}: MatrixStageComparisonProps) {
    return (
        <div className="space-y-6">
            {stages.map((stage) => (
                <EmbeddingMatrixViewer
                    key={stage.title}
                    title={stage.title}
                    tokens={tokens}
                    matrix={stage.matrix}
                />
            ))}
        </div>
    );
}