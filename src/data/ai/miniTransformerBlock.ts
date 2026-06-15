export type TransformerStage = {
    id: string;
    title: string;
    shortTitle: string;
    description: string;
    formula: string;
    beginnerExplanation: string;
    engineerExplanation: string;
    whyItMatters: string;
};

export const transformerBlockStages: TransformerStage[] = [
    {
        id: "input-embeddings",
        title: "Input Embeddings",
        shortTitle: "Embeddings",
        description: "Each token starts as a vector representation.",
        formula: "X",
        beginnerExplanation:
            "Before a transformer can understand words, every token is converted into numbers called embeddings.",
        engineerExplanation:
            "The input tensor X has shape sequence_length × hidden_dimension. Each row represents one token embedding.",
        whyItMatters:
            "Embeddings are the starting point for all transformer computation.",
    },
    {
        id: "multi-head-attention",
        title: "Multi-Head Self Attention",
        shortTitle: "Attention",
        description: "Tokens exchange contextual information with each other.",
        formula: "Attention(Q,K,V) = softmax(QKᵀ / √dₖ)V",
        beginnerExplanation:
            "Attention lets every token look at other tokens and decide which ones are important.",
        engineerExplanation:
            "Q, K, and V are projected from X. Attention scores are computed using QKᵀ, scaled, normalized with softmax, and multiplied by V.",
        whyItMatters:
            "This is how tokens become context-aware instead of being understood in isolation.",
    },
    {
        id: "residual-1",
        title: "First Residual Connection",
        shortTitle: "Residual 1",
        description: "The original input is added back after attention.",
        formula: "X + Attention(X)",
        beginnerExplanation:
            "The model keeps the original token meaning and adds new context from attention.",
        engineerExplanation:
            "Residual connections improve gradient flow and help preserve information across deep layers.",
        whyItMatters:
            "Without residual connections, deep transformer stacks become harder to train.",
    },
    {
        id: "layernorm-1",
        title: "First LayerNorm",
        shortTitle: "LayerNorm 1",
        description: "Values are normalized for stable computation.",
        formula: "LayerNorm(X + Attention(X))",
        beginnerExplanation:
            "LayerNorm keeps numbers from becoming too large, too small, or unstable.",
        engineerExplanation:
            "LayerNorm normalizes activations across the hidden dimension for each token.",
        whyItMatters:
            "Stable activations make training large transformer models more reliable.",
    },
    {
        id: "feed-forward-network",
        title: "Feed Forward Network",
        shortTitle: "FFN",
        description: "Each token is transformed independently after attention.",
        formula: "FFN(x) = W₂ GELU(W₁x + b₁) + b₂",
        beginnerExplanation:
            "After tokens talk to each other through attention, each token privately improves its own representation.",
        engineerExplanation:
            "The FFN is usually a two-layer MLP applied independently to every token position.",
        whyItMatters:
            "Attention mixes token information. FFN adds non-linear feature transformation.",
    },
    {
        id: "residual-2",
        title: "Second Residual Connection",
        shortTitle: "Residual 2",
        description: "The FFN output is added back to the previous representation.",
        formula: "H + FFN(H)",
        beginnerExplanation:
            "The model keeps the previous representation and adds the FFN improvement.",
        engineerExplanation:
            "A second residual path preserves the representation before the MLP transformation.",
        whyItMatters:
            "This allows deep stacking without losing useful earlier information.",
    },
    {
        id: "layernorm-2",
        title: "Second LayerNorm",
        shortTitle: "LayerNorm 2",
        description: "The final output of the block is normalized.",
        formula: "LayerNorm(H + FFN(H))",
        beginnerExplanation:
            "The final values are cleaned and stabilized before going to the next transformer block.",
        engineerExplanation:
            "The normalized output becomes the input to the next transformer layer.",
        whyItMatters:
            "This makes repeated transformer blocks easier to train and scale.",
    },
];

export const demoTokens = ["The", "cat", "sat"];

export const inputEmbeddings = [
    [0.2, 0.8, 0.1, 0.5],
    [0.9, 0.1, 0.7, 0.3],
    [0.4, 0.6, 0.2, 0.9],
];

export const outputEmbeddings = [
    [0.31, 0.74, 0.28, 0.61],
    [0.82, 0.26, 0.77, 0.42],
    [0.52, 0.68, 0.33, 0.84],
];

export const attentionRows = [
    {
        token: "The",
        attendsTo: "cat",
        reason: "Learns that the word modifies the noun.",
    },
    {
        token: "cat",
        attendsTo: "sat",
        reason: "Learns subject-action relationship.",
    },
    {
        token: "sat",
        attendsTo: "cat",
        reason: "Learns who performed the action.",
    },
];