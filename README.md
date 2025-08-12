# Custom Word-Level Tokenizer

A comprehensive, educational web application implementing a word-level tokenizer built in pure JavaScript. This project demonstrates the fundamental concepts of tokenization, vocabulary management, and text encoding/decoding as used in Large Language Models (LLMs).

![Tokenizer Demo](https://img.shields.io/badge/Demo-Live-green) ![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow) ![File-Based](https://img.shields.io/badge/Storage-File--Based-blue) ![License](https://img.shields.io/badge/License-MIT-red)

## 🎯 Project Overview

This tokenizer is designed to help developers understand the basics of how text is processed in machine learning models. It features a clean, file-based architecture that persists vocabulary between sessions, making it suitable for both learning and practical applications.

## ⚡ Quick Start

Get up and running in seconds:

```bash
npm start
# Open http://localhost:3001 in your browser
```

That's it! The web interface will open where you can immediately start tokenizing text.

### Key Features

- ✅ **Pure JavaScript Implementation** - No external dependencies
- 🗂️ **File-Based Vocabulary Storage** - Persistent vocabulary that survives restarts
- 🔄 **Dynamic Vocabulary Expansion** - Automatically adds new tokens during encoding
- 📝 **Case-Insensitive Processing** - Normalizes text to lowercase for better vocabulary efficiency
- 🎨 **Modern Web Interface** - Beautiful, responsive frontend for interactive testing
- 🔧 **Educational Focus** - Well-commented code for learning purposes
- ⚡ **Real-time Processing** - Instant tokenization and encoding feedback

## 📋 Table of Contents

- [Installation](#installation)
- [Quick Start](#quick-start)
- [Usage Examples](#usage-examples)
- [API Reference](#api-reference)
- [Web Interface](#web-interface)
- [Architecture](#architecture)
- [File Structure](#file-structure)
- [Contributing](#contributing)
- [License](#license)

## 🚀 Installation

### Prerequisites

- **Node.js** (version 14 or higher)
- **Web browser** (for web interface)
- **Git** (optional, for cloning)

### Setup Instructions

1. **Clone the repository** (or download as ZIP):
   ```bash
   git clone <your-repo-url>
   cd custom-word-level-tokenizer
   ```

2. **No additional installation required!** This project uses only vanilla JavaScript and built-in Node.js modules.

## 🏃‍♂️ Quick Start

### Starting the Application

```bash
# Start the web server
npm start

# Alternative: development mode (same as start)
npm run dev
```

### Using the Web Interface

1. **Start the application**:
   ```bash
   npm start
   ```

2. **Open your browser** to the URL shown in the terminal (typically `http://localhost:3001`)

3. **Start tokenizing!** Enter text and see real-time results in the beautiful web interface.

## 💡 Usage Examples

### Web Interface Usage

The primary way to use this tokenizer is through the interactive web interface:

1. **Enter text** in the input area
2. **Click "Tokenize"** to see the text split into tokens
3. **Click "Encode"** to convert tokens to numerical IDs
4. **Click "Decode"** to convert the IDs back to text
5. **Manage vocabulary** using the vocabulary management buttons

### Programmatic Usage

You can also use the tokenizer programmatically:

```javascript
const { Tokenizer } = require('./index.js');

// Create a new tokenizer instance
const tokenizer = new Tokenizer();

// Tokenize text into words and punctuation
const text = "Hello, world! This is a test.";
const tokens = tokenizer.tokenize(text);
console.log(tokens);
// Output: ['hello', ',', 'world', '!', 'this', 'is', 'a', 'test', '.']
```

### High-Level API Usage

```javascript
const { TokenizerAPI } = require('./index.js');

// Create API instance
const api = new TokenizerAPI();

// Process text with automatic vocabulary building
const result = await api.processText("Hello, world!");
console.log(result);
// Output: { tokens: [...], encodedIds: [...], vocabSize: 8 }
```

### Building Vocabulary

```javascript
// Build vocabulary from training texts
const trainingTexts = [
    "Hello, world! This is a simple tokenizer.",
    "It can handle punctuation and words.",
    "Machine learning is fascinating!"
];

const vocab = tokenizer.buildVocab(trainingTexts);
console.log('Vocabulary size:', tokenizer.getVocabSize());
```

### Encoding and Decoding

```javascript
// Encode text to token IDs
const text = "Hello, machine learning!";
const encoded = tokenizer.encode(text, true); // true = expand vocabulary
console.log('Encoded:', encoded);

// Decode back to text
const decoded = tokenizer.decode(encoded);
console.log('Decoded:', decoded);
```

### Working with Unknown Tokens

```javascript
// Encoding without vocabulary expansion
const unknownText = "This contains completely_new_words.";
const encoded = tokenizer.encode(unknownText, false); // false = no expansion
console.log('Encoded with UNK tokens:', encoded);

const decoded = tokenizer.decode(encoded);
console.log('Decoded:', decoded);
// Output: "this contains [UNK] [UNK]."
```

## 📚 API Reference

### Core Functions

#### `tokenize(text)`
Converts text into an array of tokens (words and punctuation).

- **Parameters**: `text` (string) - Input text to tokenize
- **Returns**: `string[]` - Array of lowercase tokens
- **Example**:
  ```javascript
  tokenize("Hello, World!") // ['hello', ',', 'world', '!']
  ```

#### `buildVocab(texts, filename?)`
Builds vocabulary from an array of training texts.

- **Parameters**: 
  - `texts` (string[]) - Array of training texts
  - `filename` (string, optional) - Vocabulary file path (default: 'vocab.json')
- **Returns**: `Object` - Vocabulary mapping (token → ID)

#### `encode(text, expandVocab?, filename?)`
Encodes text into an array of token IDs.

- **Parameters**:
  - `text` (string) - Text to encode
  - `expandVocab` (boolean, default: true) - Whether to add new tokens to vocabulary
  - `filename` (string, optional) - Vocabulary file path
- **Returns**: `number[]` - Array of token IDs

#### `decode(ids, filename?)`
Decodes array of token IDs back to text.

- **Parameters**:
  - `ids` (number[]) - Array of token IDs
  - `filename` (string, optional) - Vocabulary file path
- **Returns**: `string` - Decoded text

### Utility Functions

#### `getVocabSize(filename?)`
Returns the current vocabulary size.

#### `printVocab(filename?)`
Prints the vocabulary to console for debugging.

#### `saveVocabToFile(filename?)`
Manually saves vocabulary to file.

#### `loadVocabFromFile(filename?)`
Loads vocabulary from file.

## 🎨 Web Interface

The web interface provides an intuitive way to test the tokenizer:

### Features

- **📝 Text Input Area** - Enter text for tokenization
- **🔧 Control Panel** - Buttons for encode, decode, and clear operations
- **📊 Live Statistics** - Real-time vocabulary size and processing stats
- **📋 Results Display** - Visual representation of tokens, encoded IDs, and decoded text
- **🗂️ Vocabulary Management** - Load, save, reset, and view vocabulary
- **📰 Activity Log** - Track all operations and changes
- **📱 Responsive Design** - Works on desktop and mobile devices

### Interface Sections

1. **Header** - Project title and status indicators
2. **Statistics Cards** - Key metrics (vocab size, tokens processed, etc.)
3. **Input Panel** - Text area and control buttons
4. **Results Panel** - Tokenization and encoding results
5. **Vocabulary Display** - Current vocabulary table
6. **Activity Log** - Operation history

## 🏗️ Architecture

### Design Principles

- **File-First Approach** - Vocabulary stored in JSON files
- **Stateless Functions** - No global state, all data from files
- **Atomic Operations** - Each operation is independent and safe
- **Educational Focus** - Code is readable and well-documented

### Data Flow

```
Text Input → Tokenization → Vocabulary Lookup → Encoding → File Storage
     ↓
File Storage → Vocabulary Load → Decoding → Text Output
```

### File-Based Storage

- **vocab.json** - Primary vocabulary file
- **Automatic Persistence** - Changes saved immediately
- **JSON Format** - Human-readable and debuggable
- **Metadata Included** - Timestamps and version information

## 📁 File Structure

```
01_customTokeniser/
├── src/                  # Core source code
│   ├── tokenizer.js      # Main Tokenizer class
│   ├── api.js            # High-level API wrapper
│   └── utils.js          # Utility functions
├── public/               # Web application
│   ├── index.html        # Beautiful web interface
│   ├── frontend.js       # Frontend JavaScript logic
│   └── server.js         # Web server
├── data/                 # Data storage
│   └── vocabulary.json   # Auto-generated vocabulary
├── index.js              # Main entry point (exports all classes)
├── package.json          # Project configuration
├── README.md             # This documentation
└── .gitignore            # Git ignore patterns
```

### File Descriptions

- **`src/tokenizer.js`** - Core Tokenizer class with clean implementation
- **`src/api.js`** - High-level TokenizerAPI for simplified usage
- **`src/utils.js`** - TokenizerUtils with helper functions
- **`public/index.html`** - Modern, responsive web interface
- **`public/frontend.js`** - Web interface logic and UI interactions
- **`public/server.js`** - Web server for the application
- **`data/vocabulary.json`** - Auto-generated vocabulary storage
- **`index.js`** - Main entry point that exports all classes

## 🔧 Advanced Features

### Custom Vocabulary Management

```javascript
// Load custom vocabulary
tokenizer.loadVocabFromFile('custom_vocab.json');

// Save current vocabulary
tokenizer.saveVocabToFile('backup_vocab.json');

// Get vocabulary statistics
console.log('Size:', tokenizer.getVocabSize());
console.log('Vocab:', tokenizer.getVocab());
```

### Batch Processing

```javascript
// Process multiple texts
const texts = [
    "First document to process",
    "Second document with different content",
    "Third document with more text"
];

texts.forEach((text, index) => {
    const encoded = tokenizer.encode(text);
    console.log(`Document ${index + 1}:`, encoded);
});
```

### Integration with Other Systems

```javascript
// Use in Express.js API
app.post('/tokenize', (req, res) => {
    const { text } = req.body;
    const tokens = tokenizer.tokenize(text);
    const encoded = tokenizer.encode(text);
    
    res.json({
        original: text,
        tokens: tokens,
        encoded: encoded,
        vocabSize: tokenizer.getVocabSize()
    });
});
```

## 🤝 Contributing

We welcome contributions! Here's how to get started:

### Development Setup

1. **Fork the repository**
2. **Create a feature branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes**
4. **Test thoroughly**:
   ```bash
   node index.js  # Test core functionality
   # Open index.html in browser to test frontend
   ```
5. **Submit a pull request**

### Contribution Guidelines

- **Code Style** - Use consistent formatting and meaningful names
- **Documentation** - Update README and code comments
- **Testing** - Ensure all features work as expected
- **Compatibility** - Maintain Node.js 14+ compatibility

### Ideas for Contributions

- 🚀 **Performance Optimizations** - Faster tokenization algorithms
- 🎨 **UI Improvements** - Better frontend design and UX
- 📊 **Analytics** - Token frequency analysis and statistics
- 🔧 **Additional Features** - Subword tokenization, custom rules
- 📱 **Mobile App** - React Native or Flutter implementation

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Inspiration** - Modern tokenizers like GPT's BPE and SentencePiece
- **Educational Resources** - Various NLP and machine learning courses
- **Community** - Feedback and suggestions from developers

## 📞 Support

- **Issues** - Report bugs via GitHub Issues
- **Questions** - Ask questions in GitHub Discussions
- **Documentation** - Check this README and code comments

---

**Built with ❤️ for the developer community to understand tokenization in LLMs**
