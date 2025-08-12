/**
 * Custom Word-Level Tokenizer
 * A file-based tokenizer for educational purposes and practical use
 * @author Kanishk Chandna
 * @version 1.0.0
 */

const fs = require('fs');
const path = require('path');

// Constants
const UNK_TOKEN = '[UNK]';
const DEFAULT_VOCAB_FILE = path.join(__dirname, '..', 'data', 'vocab.json');

/**
 * Core Tokenizer Class
 */
class Tokenizer {
    constructor(vocabFile = DEFAULT_VOCAB_FILE) {
        this.vocabFile = vocabFile;
        this.ensureDataDirectory();
    }

    /**
     * Ensure data directory exists
     * @private
     */
    ensureDataDirectory() {
        const dataDir = path.dirname(this.vocabFile);
        if (!fs.existsSync(dataDir)) {
            fs.mkdirSync(dataDir, { recursive: true });
        }
    }

    /**
     * Tokenize text into words and punctuation
     * @param {string} text - Input text to tokenize
     * @returns {string[]} Array of normalized tokens
     */
    tokenize(text) {
        if (!text || typeof text !== 'string') {
            return [];
        }

        const tokens = text.match(/\w+|[^\w\s]/g) || [];
        return tokens.map(token => {
            return /\w/.test(token) ? token.toLowerCase() : token;
        });
    }

    /**
     * Load vocabulary data from file
     * @param {string} filename - Vocabulary file path
     * @returns {Object} Vocabulary data structure
     * @private
     */
    _loadVocabData(filename = this.vocabFile) {
        try {
            if (!fs.existsSync(filename)) {
                return this._createEmptyVocab();
            }
            
            const jsonString = fs.readFileSync(filename, 'utf8');
            const data = JSON.parse(jsonString);
            
            return {
                vocab: data.vocab || {},
                reverseVocab: data.reverseVocab || {},
                nextTokenId: data.nextTokenId || 0
            };
        } catch (error) {
            throw new Error(`Failed to load vocabulary: ${error.message}`);
        }
    }

    /**
     * Create empty vocabulary structure
     * @returns {Object} Empty vocabulary data
     * @private
     */
    _createEmptyVocab() {
        return {
            vocab: {},
            reverseVocab: {},
            nextTokenId: 0
        };
    }

    /**
     * Save vocabulary data to file
     * @param {Object} vocabData - Vocabulary data to save
     * @param {string} filename - Target file path
     * @private
     */
    _saveVocabData(vocabData, filename = this.vocabFile) {
        try {
            const dataToSave = {
                vocab: vocabData.vocab,
                reverseVocab: vocabData.reverseVocab,
                nextTokenId: vocabData.nextTokenId,
                savedAt: new Date().toISOString(),
                version: "1.0.0"
            };
            
            const jsonString = JSON.stringify(dataToSave, null, 2);
            fs.writeFileSync(filename, jsonString, 'utf8');
        } catch (error) {
            throw new Error(`Failed to save vocabulary: ${error.message}`);
        }
    }

    /**
     * Add token to vocabulary data structure
     * @param {Object} vocabData - Vocabulary data
     * @param {string} token - Token to add
     * @returns {number} Token ID
     * @private
     */
    _addTokenToVocabData(vocabData, token) {
        if (!(token in vocabData.vocab)) {
            const id = vocabData.nextTokenId++;
            vocabData.vocab[token] = id;
            vocabData.reverseVocab[id] = token;
            return id;
        }
        return vocabData.vocab[token];
    }

    /**
     * Initialize vocabulary with special tokens
     * @param {string} filename - Vocabulary file path
     * @returns {Object} Initialized vocabulary data
     */
    initializeVocab(filename = this.vocabFile) {
        const vocabData = this._createEmptyVocab();
        this._addTokenToVocabData(vocabData, UNK_TOKEN);
        this._saveVocabData(vocabData, filename);
        return vocabData;
    }

    /**
     * Build vocabulary from training texts
     * @param {string[]} texts - Array of training texts
     * @param {string} filename - Vocabulary file path
     * @returns {Object} Vocabulary mapping (token → ID)
     */
    buildVocab(texts, filename = this.vocabFile) {
        if (!Array.isArray(texts)) {
            throw new Error('Training texts must be an array of strings');
        }

        const vocabData = this.initializeVocab(filename);
        
        for (const text of texts) {
            const tokens = this.tokenize(text);
            tokens.forEach(token => this._addTokenToVocabData(vocabData, token));
        }
        
        this._saveVocabData(vocabData, filename);
        return { ...vocabData.vocab };
    }

    /**
     * Encode text to token IDs
     * @param {string} text - Text to encode
     * @param {Object} options - Encoding options
     * @param {boolean} options.expandVocab - Whether to add new tokens (default: true)
     * @param {string} options.vocabFile - Vocabulary file path
     * @returns {number[]} Array of token IDs
     */
    encode(text, options = {}) {
        const { expandVocab = true, vocabFile = this.vocabFile } = options;
        
        if (!text || typeof text !== 'string') {
            return [];
        }

        const vocabData = this._loadVocabData(vocabFile);
        
        if (Object.keys(vocabData.vocab).length === 0) {
            throw new Error('No vocabulary found. Build vocabulary first using buildVocab()');
        }

        const tokens = this.tokenize(text);
        const unknownId = vocabData.vocab[UNK_TOKEN];
        let vocabChanged = false;

        const tokenIds = tokens.map(token => {
            if (token in vocabData.vocab) {
                return vocabData.vocab[token];
            } else if (expandVocab) {
                const tokenId = this._addTokenToVocabData(vocabData, token);
                vocabChanged = true;
                return tokenId;
            } else {
                return unknownId;
            }
        });

        if (vocabChanged) {
            this._saveVocabData(vocabData, vocabFile);
        }

        return tokenIds;
    }

    /**
     * Decode token IDs back to text
     * @param {number[]} ids - Array of token IDs
     * @param {string} vocabFile - Vocabulary file path
     * @returns {string} Decoded text
     */
    decode(ids, vocabFile = this.vocabFile) {
        if (!Array.isArray(ids)) {
            throw new Error('Token IDs must be an array of numbers');
        }

        const vocabData = this._loadVocabData(vocabFile);
        
        if (Object.keys(vocabData.reverseVocab).length === 0) {
            throw new Error('No vocabulary found. Build vocabulary first using buildVocab()');
        }

        const tokens = ids.map(id => {
            return vocabData.reverseVocab[id] || UNK_TOKEN;
        });

        return this._reconstructText(tokens);
    }

    /**
     * Reconstruct text from tokens with proper spacing
     * @param {string[]} tokens - Array of tokens
     * @returns {string} Reconstructed text
     * @private
     */
    _reconstructText(tokens) {
        let result = '';
        
        for (let i = 0; i < tokens.length; i++) {
            const token = tokens[i];
            
            if (i === 0 || /^[^\w\s]$/.test(token)) {
                result += token;
            } else {
                result += ' ' + token;
            }
        }
        
        return result;
    }

    /**
     * Get current vocabulary size
     * @param {string} vocabFile - Vocabulary file path
     * @returns {number} Number of tokens in vocabulary
     */
    getVocabSize(vocabFile = this.vocabFile) {
        const vocabData = this._loadVocabData(vocabFile);
        return Object.keys(vocabData.vocab).length;
    }

    /**
     * Get vocabulary mapping
     * @param {string} vocabFile - Vocabulary file path
     * @returns {Object} Copy of vocabulary mapping
     */
    getVocab(vocabFile = this.vocabFile) {
        const vocabData = this._loadVocabData(vocabFile);
        return { ...vocabData.vocab };
    }

    /**
     * Get vocabulary statistics
     * @param {string} vocabFile - Vocabulary file path
     * @returns {Object} Vocabulary statistics
     */
    getVocabStats(vocabFile = this.vocabFile) {
        const vocabData = this._loadVocabData(vocabFile);
        return {
            size: Object.keys(vocabData.vocab).length,
            nextTokenId: vocabData.nextTokenId,
            hasUnknownToken: UNK_TOKEN in vocabData.vocab
        };
    }

    /**
     * Export vocabulary to JSON string
     * @param {string} vocabFile - Vocabulary file path
     * @returns {string} JSON representation
     */
    exportVocab(vocabFile = this.vocabFile) {
        const vocabData = this._loadVocabData(vocabFile);
        return JSON.stringify({
            vocab: vocabData.vocab,
            reverseVocab: vocabData.reverseVocab,
            nextTokenId: vocabData.nextTokenId
        }, null, 2);
    }

    /**
     * Import vocabulary from JSON string
     * @param {string} jsonString - JSON vocabulary data
     * @param {string} vocabFile - Target vocabulary file
     */
    importVocab(jsonString, vocabFile = this.vocabFile) {
        try {
            const data = JSON.parse(jsonString);
            const vocabData = {
                vocab: data.vocab || {},
                reverseVocab: data.reverseVocab || {},
                nextTokenId: data.nextTokenId || 0
            };
            this._saveVocabData(vocabData, vocabFile);
        } catch (error) {
            throw new Error(`Invalid vocabulary JSON: ${error.message}`);
        }
    }

    /**
     * Reset vocabulary to initial state
     * @param {string} vocabFile - Vocabulary file path
     */
    resetVocab(vocabFile = this.vocabFile) {
        if (fs.existsSync(vocabFile)) {
            fs.unlinkSync(vocabFile);
        }
        this.initializeVocab(vocabFile);
    }
}

module.exports = Tokenizer;
