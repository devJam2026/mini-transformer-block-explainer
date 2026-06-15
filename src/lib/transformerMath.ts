export function tokenizeSentence(sentence: string): string[] {
    return sentence
        .trim()
        .split(/\s+/)
        .map((token) => token.replace(/[^\w]/g, ""))
        .filter(Boolean)
        .slice(0, 6);
}

export function generateEmbedding(token: string, dimension = 4): number[] {
    const seed = token
        .split("")
        .reduce((sum, char) => sum + char.charCodeAt(0), 0);

    return Array.from({ length: dimension }, (_, index) => {
        const value = ((seed * (index + 3)) % 100) / 100;
        return Number(value.toFixed(2));
    });
}

export function generateEmbeddingMatrix(tokens: string[]): number[][] {
    return tokens.map((token) => generateEmbedding(token));
}

export function generateAttentionOutput(matrix: number[][]): number[][] {
    return matrix.map((row, rowIndex) =>
        row.map((value, colIndex) => {
            const neighborRow = matrix[(rowIndex + 1) % matrix.length] ?? row;
            const mixedValue = value * 0.72 + neighborRow[colIndex] * 0.28;
            return Number(mixedValue.toFixed(2));
        })
    );
}

export function addMatrices(a: number[][], b: number[][]): number[][] {
    return a.map((row, rowIndex) =>
        row.map((value, colIndex) =>
            Number((value + (b[rowIndex]?.[colIndex] ?? 0)).toFixed(2))
        )
    );
}

export function layerNormVector(vector: number[]): number[] {
    const mean = vector.reduce((sum, value) => sum + value, 0) / vector.length;

    const variance =
        vector.reduce((sum, value) => sum + Math.pow(value - mean, 2), 0) /
        vector.length;

    const std = Math.sqrt(variance + 1e-5);

    return vector.map((value) => Number(((value - mean) / std).toFixed(2)));
}

export function layerNormMatrix(matrix: number[][]): number[][] {
    return matrix.map((row) => layerNormVector(row));
}

export function feedForwardMatrix(matrix: number[][]): number[][] {
    return matrix.map((row) =>
        row.map((value, index) => {
            const expanded = value * (1.2 + index * 0.1);
            const activated = Math.max(0, expanded);
            const projected = activated * 0.75;
            return Number(projected.toFixed(2));
        })
    );
}

export function buildTransformerBlockDemo(tokens: string[]) {
    const input = generateEmbeddingMatrix(tokens);

    const attentionOutput = generateAttentionOutput(input);
    const residualOne = addMatrices(input, attentionOutput);
    const layerNormOne = layerNormMatrix(residualOne);

    const ffnOutput = feedForwardMatrix(layerNormOne);
    const residualTwo = addMatrices(layerNormOne, ffnOutput);
    const layerNormTwo = layerNormMatrix(residualTwo);

    return {
        input,
        attentionOutput,
        residualOne,
        layerNormOne,
        ffnOutput,
        residualTwo,
        output: layerNormTwo,
    };
}