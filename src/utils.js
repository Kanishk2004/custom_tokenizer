/**
 * Utility functions for the tokenizer
 */

const fs = require('fs');
const path = require('path');

/**
 * Utility class with static helper methods
 */
class TokenizerUtils {
    /**
     * Validate file path and create directory if needed
     * @param {string} filePath - File path to validate
     * @returns {boolean} True if valid
     */
    static ensureFilePath(filePath) {
        try {
            const dir = path.dirname(filePath);
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }
            return true;
        } catch (error) {
            return false;
        }
    }

    /**
     * Validate text input
     * @param {any} text - Text to validate
     * @returns {boolean} True if valid string
     */
    static isValidText(text) {
        return typeof text === 'string' && text.trim().length > 0;
    }

    /**
     * Validate token ID array
     * @param {any} ids - Array to validate
     * @returns {boolean} True if valid array of numbers
     */
    static isValidTokenIds(ids) {
        return Array.isArray(ids) && ids.every(id => typeof id === 'number' && id >= 0);
    }

    /**
     * Safe JSON parse with error handling
     * @param {string} jsonString - JSON string to parse
     * @returns {Object|null} Parsed object or null if invalid
     */
    static safeJsonParse(jsonString) {
        try {
            return JSON.parse(jsonString);
        } catch (error) {
            return null;
        }
    }

    /**
     * Get file extension
     * @param {string} filename - File name
     * @returns {string} File extension
     */
    static getFileExtension(filename) {
        return path.extname(filename).toLowerCase();
    }

    /**
     * Generate timestamp string
     * @returns {string} ISO timestamp
     */
    static getTimestamp() {
        return new Date().toISOString();
    }

    /**
     * Format file size in human readable format
     * @param {number} bytes - File size in bytes
     * @returns {string} Formatted size
     */
    static formatFileSize(bytes) {
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        if (bytes === 0) return '0 Bytes';
        const i = Math.floor(Math.log(bytes) / Math.log(1024));
        return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
    }

    /**
     * Calculate text statistics
     * @param {string} text - Input text
     * @returns {Object} Text statistics
     */
    static getTextStats(text) {
        if (!this.isValidText(text)) {
            return { words: 0, characters: 0, lines: 0 };
        }

        const words = text.match(/\w+/g)?.length || 0;
        const characters = text.length;
        const lines = text.split('\n').length;

        return { words, characters, lines };
    }

    /**
     * Clean and normalize text
     * @param {string} text - Text to clean
     * @returns {string} Cleaned text
     */
    static cleanText(text) {
        if (!this.isValidText(text)) {
            return '';
        }

        return text
            .replace(/\s+/g, ' ')  // Replace multiple spaces with single space
            .trim();               // Remove leading/trailing whitespace
    }
}

module.exports = TokenizerUtils;
