/**
 * Simple demo showcasing the tokenizer functionality
 */

const { TokenizerAPI } = require('../index');
const path = require('path');

/**
 * Demo class to showcase tokenizer features
 */
class TokenizerDemo {
    constructor() {
        const vocabPath = path.join(__dirname, '..', 'data', 'demo_vocab.json');
        this.api = new TokenizerAPI(vocabPath);
    }

    /**
     * Run the complete demo
     */
    async run() {
        console.log('🚀 Custom Word-Level Tokenizer Demo\n');
        
        try {
            await this.basicDemo();
            await this.advancedDemo();
            await this.batchDemo();
            
            console.log('\n✅ Demo completed successfully!');
            console.log('📖 Check the README.md for more examples and API documentation.');
        } catch (error) {
            console.error('❌ Demo failed:', error.message);
        }
    }

    /**
     * Basic tokenization demo
     */
    async basicDemo() {
        console.log('📝 Basic Tokenization Demo');
        console.log('=' .repeat(30));

        // Train the tokenizer
        const trainingTexts = [
            "Hello, world! This is a simple tokenizer.",
            "It can handle punctuation, numbers like 123, and words.",
            "The quick brown fox jumps over the lazy dog."
        ];

        console.log('Training tokenizer...');
        const trainResult = this.api.train(trainingTexts);
        console.log(`✅ Training complete: Added ${trainResult.tokensAdded} new tokens`);

        // Test basic functionality
        const testText = "Hello, machine learning enthusiasts!";
        console.log(`\nProcessing: "${testText}"`);
        
        const result = await this.api.processText(testText);
        console.log(`Tokens: [${result.tokens.map(t => `"${t}"`).join(', ')}]`);
        console.log(`Encoded: [${result.encoded.join(', ')}]`);
        console.log(`Decoded: "${result.decoded}"`);
        console.log(`Round-trip: ${result.stats.roundTripSuccess ? '✅' : '❌'}`);
    }

    /**
     * Advanced features demo
     */
    async advancedDemo() {
        console.log('\n🔧 Advanced Features Demo');
        console.log('=' .repeat(30));

        // Test vocabulary expansion
        const newText = "Neural networks and deep learning are fascinating!";
        console.log(`\nTesting dynamic vocabulary expansion with: "${newText}"`);
        
        const beforeSize = this.api.getVocabularyInfo().size;
        const result = await this.api.processText(newText, { expandVocab: true });
        const afterSize = this.api.getVocabularyInfo().size;
        
        console.log(`Vocabulary grew from ${beforeSize} to ${afterSize} tokens`);
        console.log(`New tokens added: ${afterSize - beforeSize}`);

        // Test without expansion
        const unknownText = "Completely unknown terminology here!";
        console.log(`\nTesting without expansion: "${unknownText}"`);
        
        const noExpandResult = await this.api.processText(unknownText, { expandVocab: false });
        console.log(`Encoded: [${noExpandResult.encoded.join(', ')}]`);
        console.log(`Decoded: "${noExpandResult.decoded}"`);
    }

    /**
     * Batch processing demo
     */
    async batchDemo() {
        console.log('\n📦 Batch Processing Demo');
        console.log('=' .repeat(30));

        const batchTexts = [
            "First document to process.",
            "Second document with different content.",
            "Third document about artificial intelligence."
        ];

        console.log('Processing batch of documents...');
        const batchResults = await this.api.batchProcess(batchTexts);
        
        batchResults.forEach((item, index) => {
            if (item.success) {
                const stats = item.result.stats;
                console.log(`Document ${index + 1}: ${stats.tokenCount} tokens, ${stats.words} words`);
            } else {
                console.log(`Document ${index + 1}: Failed - ${item.error}`);
            }
        });

        // Show final statistics
        const vocabInfo = this.api.getVocabularyInfo();
        console.log(`\n📊 Final vocabulary statistics:`);
        console.log(`- Total tokens in vocabulary: ${vocabInfo.size}`);
        console.log(`- Has unknown token: ${vocabInfo.statistics.hasUnknownToken ? 'Yes' : 'No'}`);
    }
}

module.exports = {
    run: async () => {
        const demo = new TokenizerDemo();
        await demo.run();
    }
};
