/**
 * Basic usage examples for the tokenizer
 */

const { Tokenizer, TokenizerAPI } = require('../index');

console.log('📚 Basic Usage Examples\n');

// Example 1: Simple tokenization
console.log('1. Simple Tokenization');
console.log('-'.repeat(20));

const tokenizer = new Tokenizer();
const text = "Hello, world! How are you?";
const tokens = tokenizer.tokenize(text);
console.log(`Text: "${text}"`);
console.log(`Tokens: [${tokens.map(t => `"${t}"`).join(', ')}]`);

// Example 2: Training and encoding
console.log('\n2. Training and Encoding');
console.log('-'.repeat(25));

const trainingTexts = [
    "The cat sat on the mat.",
    "Dogs love to play fetch.",
    "Birds can fly high in the sky."
];

tokenizer.buildVocab(trainingTexts);
const encoded = tokenizer.encode("The dog sat on the mat.");
const decoded = tokenizer.decode(encoded);

console.log('Training texts:', trainingTexts.length);
console.log('Vocabulary size:', tokenizer.getVocabSize());
console.log(`Encoded: [${encoded.join(', ')}]`);
console.log(`Decoded: "${decoded}"`);

// Example 3: Using the API
console.log('\n3. Using the High-Level API');
console.log('-'.repeat(30));

const api = new TokenizerAPI();
api.train(["Natural language processing is exciting!"]);

const result = api.processText("NLP makes computers understand text.", {
    includeStats: true,
    includeTokens: true
});

console.log('API Result:', {
    tokens: result.tokens,
    encoded: result.encoded,
    stats: result.stats
});

console.log('\n✅ Examples completed!');
