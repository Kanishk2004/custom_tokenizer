/**
 * Simple API interface for the tokenizer
 */

const Tokenizer = require('./tokenizer');
const TokenizerUtils = require('./utils');

/**
 * High-level API for tokenizer operations
 */
class TokenizerAPI {
    constructor(vocabFile) {
        this.tokenizer = new Tokenizer(vocabFile);
    }

    /**
     * Process text and return comprehensive results
     * @param {string} text - Text to process
     * @param {Object} options - Processing options
     * @returns {Object} Processing results
     */
    async processText(text, options = {}) {
        const {
            expandVocab = true,
            includeStats = true,
            includeTokens = true
        } = options;

        if (!TokenizerUtils.isValidText(text)) {
            throw new Error('Invalid text input');
        }

        const results = {
            original: text,
            processed: TokenizerUtils.cleanText(text)
        };

        if (includeTokens) {
            results.tokens = this.tokenizer.tokenize(results.processed);
        }

        results.encoded = this.tokenizer.encode(results.processed, { expandVocab });
        results.decoded = this.tokenizer.decode(results.encoded);

        if (includeStats) {
            results.stats = {
                ...TokenizerUtils.getTextStats(text),
                vocabSize: this.tokenizer.getVocabSize(),
                tokenCount: results.encoded.length,
                roundTripSuccess: results.processed === results.decoded
            };
        }

        return results;
    }

    /**
     * Batch process multiple texts
     * @param {string[]} texts - Array of texts to process
     * @param {Object} options - Processing options
     * @returns {Object[]} Array of processing results
     */
    async batchProcess(texts, options = {}) {
        if (!Array.isArray(texts)) {
            throw new Error('Texts must be an array');
        }

        return texts.map((text, index) => {
            try {
                return {
                    index,
                    success: true,
                    result: this.processText(text, options)
                };
            } catch (error) {
                return {
                    index,
                    success: false,
                    error: error.message
                };
            }
        });
    }

    /**
     * Get vocabulary information
     * @returns {Object} Vocabulary information
     */
    getVocabularyInfo() {
        const vocab = this.tokenizer.getVocab();
        const stats = this.tokenizer.getVocabStats();

        return {
            vocabulary: vocab,
            statistics: stats,
            size: stats.size,
            tokens: Object.keys(vocab).sort((a, b) => vocab[a] - vocab[b])
        };
    }

    /**
     * Train tokenizer on texts
     * @param {string[]} trainingTexts - Texts for training
     * @returns {Object} Training results
     */
    train(trainingTexts) {
        if (!Array.isArray(trainingTexts)) {
            throw new Error('Training texts must be an array');
        }

        const beforeSize = this.tokenizer.getVocabSize();
        const vocab = this.tokenizer.buildVocab(trainingTexts);
        const afterSize = this.tokenizer.getVocabSize();

        return {
            success: true,
            tokensAdded: afterSize - beforeSize,
            vocabularySize: afterSize,
            trainedOnTexts: trainingTexts.length
        };
    }

    /**
     * Export current state
     * @returns {Object} Current tokenizer state
     */
    exportState() {
        return {
            vocabulary: this.tokenizer.exportVocab(),
            statistics: this.tokenizer.getVocabStats(),
            exportedAt: TokenizerUtils.getTimestamp()
        };
    }

    /**
     * Import state from exported data
     * @param {string} stateJson - Exported state JSON
     */
    importState(stateJson) {
        const state = TokenizerUtils.safeJsonParse(stateJson);
        if (!state || !state.vocabulary) {
            throw new Error('Invalid state data');
        }

        this.tokenizer.importVocab(state.vocabulary);
    }
}

module.exports = TokenizerAPI;
