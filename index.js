/**
 * Main entry point for the Custom Word-Level Tokenizer
 * @author Kanishk Chandna
 * @version 1.0.0
 */

const Tokenizer = require('./src/tokenizer');
const TokenizerAPI = require('./src/api');
const TokenizerUtils = require('./src/utils');

// Export main classes and utilities
module.exports = {
    Tokenizer,
    TokenizerAPI,
    TokenizerUtils,
    
    // Convenience functions for backward compatibility
    createTokenizer: (vocabFile) => new Tokenizer(vocabFile),
    createAPI: (vocabFile) => new TokenizerAPI(vocabFile)
};

// If run directly, show a simple demo
if (require.main === module) {
    const demo = require('./examples/demo');
    demo.run();
}