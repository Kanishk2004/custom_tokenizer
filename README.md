# Custom Word-Level Tokenizer

A comprehensive, educational web application implementing a word-level tokenizer built in pure JavaScript. This project demonstrates the fundamental concepts of tokenization, vocabulary management, and text encoding/decoding as used in Large Language Models (LLMs).

🚀 **Live Demo**: [https://custom-tokenizer-one-black.vercel.app/](https://custom-tokenizer-one-black.vercel.app/)

![Tokenizer Demo](https://img.shields.io/badge/Demo-Live-green) ![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow) ![Vercel](https://img.shields.io/badge/Deployed-Vercel-black) ![License](https://img.shields.io/badge/License-MIT-red)

## 🎯 Project Overview

This tokenizer is designed to help developers understand the basics of how text is processed in machine learning models. It features a clean, file-based architecture that persists vocabulary between sessions, making it suitable for both learning and practical applications.

## ⚡ Quick Start

🌐 **Try it online**: [https://custom-tokenizer-one-black.vercel.app/](https://custom-tokenizer-one-black.vercel.app/)

Or run locally:

```bash
npm start
# Open http://localhost:3001 in your browser
```

### 🚀 Deployment

This project is deployed on Vercel for instant access worldwide. The live demo showcases all features including:
- Real-time tokenization as you type
- Dynamic vocabulary expansion
- Visual encoding/decoding with token IDs
- Interactive vocabulary management

### Key Features

- ✅ **Pure JavaScript Implementation** - No external dependencies, runs entirely in the browser
- 🌐 **Live Web Application** - Deployed on Vercel with global CDN for fast access
- 🗂️ **Client-Side Vocabulary Storage** - Persistent vocabulary using browser localStorage
- 🔄 **Dynamic Vocabulary Expansion** - Automatically adds new tokens during encoding
- 📝 **Case-Insensitive Processing** - Normalizes text to lowercase for better vocabulary efficiency
- 🎨 **Modern Web Interface** - Beautiful, responsive frontend built with Tailwind CSS
- 🔧 **Educational Focus** - Well-commented code for learning tokenization concepts
- ⚡ **Real-time Processing** - Instant tokenization with visual feedback and debounced input
- 📊 **Interactive Statistics** - Live vocabulary size, token counts, and success rates
- 🎯 **Round-trip Validation** - Ensures encoding/decoding accuracy with visual indicators

## 📋 Table of Contents

- [Installation](#installation)
- [Quick Start](#quick-start)
- [Live Demo](#live-demo)
- [Usage Examples](#usage-examples)
- [Web Interface Features](#web-interface-features)
- [API Reference](#api-reference)
- [Architecture](#architecture)
- [File Structure](#file-structure)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## 🚀 Installation

### Prerequisites

- **Node.js** (version 14 or higher)
- **Web browser** (for web interface)
- **Git** (optional, for cloning)

### Setup Instructions

1. **Try the live demo** (recommended):
   ```
   Visit: https://custom-tokenizer-one-black.vercel.app/
   ```

2. **Or run locally**:
   ```bash
   git clone https://github.com/Kanishk2004/custom_tokenizer.git
   cd custom_tokenizer
   npm start
   ```

3. **No installation required!** This project uses only vanilla JavaScript and built-in Node.js modules.

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

## 🌐 Live Demo

Experience the tokenizer instantly without any setup:

**🔗 Demo URL**: [https://custom-tokenizer-one-black.vercel.app/](https://custom-tokenizer-one-black.vercel.app/)

### Demo Features
- 🚀 **Instant Access** - No downloads or installations required
- 📱 **Mobile Friendly** - Works perfectly on phones and tablets  
- ⚡ **Fast Loading** - Deployed on Vercel's global CDN
- 🔄 **Real-time Updates** - See tokenization results as you type (with smart debouncing)
- 📊 **Live Statistics** - Watch vocabulary grow and see processing metrics
- 🎨 **Professional UI** - Clean, modern interface built with Tailwind CSS

### How to Use the Demo
1. **Visit the demo URL** - Click the link above
2. **Enter text** - Type in the text input area
3. **See tokens** - Watch automatic tokenization (debounced for smooth experience)
4. **Click "Encode"** - Convert tokens to numerical IDs  
5. **Click "Decode"** - Convert IDs back to text
6. **Explore vocabulary** - Use management buttons to view and control the vocabulary

## 💡 Usage Examples

### 🌐 Web Interface Usage (Recommended)

The primary way to use this tokenizer is through the interactive web interface:

**Live Demo**: [https://custom-tokenizer-one-black.vercel.app/](https://custom-tokenizer-one-black.vercel.app/)

1. **Enter text** in the input area (e.g., "Hello, world! This is amazing.")
2. **Watch auto-tokenization** - Tokens appear automatically as you type (debounced)
3. **Click "Encode"** to convert tokens to numerical IDs
4. **Click "Decode"** to convert the IDs back to text  
5. **Manage vocabulary** using the vocabulary management buttons
6. **View statistics** - See real-time vocab size, tokens processed, and success rates

### Example Workflow in Web Interface
```
Input: "Hello, world! Machine learning is fun."
↓ (Auto-tokenization)
Tokens: ["hello", ",", "world", "!", "machine", "learning", "is", "fun", "."]
↓ (Click Encode)  
Encoded: [1, 2, 3, 4, 15, 16, 6, 17, 10]
↓ (Click Decode)
Decoded: "hello, world! machine learning is fun."
```

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

## 🎨 Web Interface Features

The web interface provides an intuitive and powerful way to explore tokenization:

### 🎯 Main Features

- **📝 Smart Text Input** - Auto-tokenization with debounced input (no loading spam!)
- **🔧 Action Buttons** - Tokenize, Encode, Decode, and Clear operations
- **📊 Live Statistics Dashboard** - Real-time metrics displayed in beautiful cards:
  - Vocabulary size with dynamic updates
  - Total tokens processed counter  
  - New tokens added tracker
  - Round-trip success rate percentage
- **📋 Visual Results Display** - Color-coded token and ID visualization
- **🗂️ Vocabulary Management** - Interactive vocabulary controls:
  - Load sample vocabulary with demo tokens
  - Save vocabulary to browser localStorage  
  - Reset to default state
  - View complete vocabulary in a searchable table
- **📰 Activity Log** - Timestamped operation history
- **📱 Responsive Design** - Perfect on desktop, tablet, and mobile

### 🎨 UI Improvements Made

- **Debounced Input** - Auto-tokenization waits 500ms after you stop typing
- **Visual Feedback** - Subtle button color changes indicate successful operations  
- **Smart Clearing** - Empty input automatically clears all outputs
- **Error Handling** - Helpful error messages with clear instructions
- **Professional Styling** - Modern gradient backgrounds and card-based layout
- **Loading States** - Smooth loading animations for longer operations

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

- **`src/tokenizer.js`** - Core Tokenizer class with clean, modular implementation
- **`src/api.js`** - High-level TokenizerAPI wrapper for simplified usage
- **`src/utils.js`** - TokenizerUtils with helper functions and validation
- **`public/index.html`** - Modern, responsive web interface with Tailwind CSS
- **`public/frontend.js`** - Enhanced frontend logic with debouncing and visual feedback
- **`public/server.js`** - Local development server (for npm start)
- **`public/landing.html`** - Professional landing page for Vercel deployment
- **`data/vocabulary.json`** - Auto-generated vocabulary storage (local development)
- **`index.js`** - Main entry point that exports all classes
- **`vercel.json`** - Vercel deployment configuration

## 🚀 Deployment

This project is successfully deployed on **Vercel** for global accessibility:

### Live Application
- **🌐 Production URL**: [https://custom-tokenizer-one-black.vercel.app/](https://custom-tokenizer-one-black.vercel.app/)
- **⚡ Performance**: Global CDN with sub-second loading times
- **📱 Compatibility**: Works across all modern browsers and devices
- **🔒 Security**: HTTPS enabled with automatic SSL certificates

### Deployment Features
- **Static Site Generation**: Pure client-side application for maximum performance
- **Automatic Deployments**: Every push to master branch triggers a new deployment
- **Preview Deployments**: Each pull request gets its own preview URL
- **Custom Domain Ready**: Easy to connect your own domain name

### Deploy Your Own Copy

1. **Fork this repository** on GitHub
2. **Sign up for Vercel** at [vercel.com](https://vercel.com)
3. **Import your fork** in Vercel dashboard
4. **Configure settings**:
   ```
   Framework Preset: Other
   Build Command: npm run build  
   Output Directory: public
   ```
5. **Deploy** - Your app will be live in minutes!

### Local Development vs Production
- **Local**: Uses Node.js server with file-based vocabulary storage
- **Production**: Pure static files with browser localStorage for vocabulary
- **Consistency**: Same tokenization logic and UI experience in both environments
- **`vercel.json`** - Vercel deployment configuration

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
- **Deployment Platform** - Vercel for seamless hosting and global CDN
- **UI Framework** - Tailwind CSS for beautiful, responsive design
- **Community** - Feedback and suggestions from developers and educators

## 📞 Support

- **🌐 Live Demo** - Try it instantly at [https://custom-tokenizer-one-black.vercel.app/](https://custom-tokenizer-one-black.vercel.app/)
- **🐛 Issues** - Report bugs via [GitHub Issues](https://github.com/Kanishk2004/custom_tokenizer/issues)
- **💬 Questions** - Ask questions in [GitHub Discussions](https://github.com/Kanishk2004/custom_tokenizer/discussions)
- **📚 Documentation** - Check this README and explore the live demo

---

**🚀 Built with ❤️ by Kanishk Chandna | Live Demo: [custom-tokenizer-one-black.vercel.app](https://custom-tokenizer-one-black.vercel.app/)**
