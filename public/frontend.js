/**
 * Frontend JavaScript for Custom Tokenizer
 * Simulates the tokenizer functionality for demo purposes
 */

class TokenizerUI {
	constructor() {
		this.vocabulary = {
			'[UNK]': 0,
			hello: 1,
			',': 2,
			world: 3,
			'!': 4,
			this: 5,
			is: 6,
			a: 7,
			simple: 8,
			tokenizer: 9,
			'.': 10,
		};
		this.reverseVocabulary = {};
		this.nextTokenId = 11;
		this.lastEncodedIds = []; // Store the last encoded IDs for decoding
		this.stats = {
			vocabSize: 11,
			tokensProcessed: 0,
			newTokensAdded: 0,
			roundTripSuccess: 100,
		};

		this.initializeReverseVocab();
		this.bindEvents();
		this.updateStats();
		this.logActivity('Tokenizer UI initialized successfully');
	}

	initializeReverseVocab() {
		for (const [token, id] of Object.entries(this.vocabulary)) {
			this.reverseVocabulary[id] = token;
		}
	}

	bindEvents() {
		// Main action buttons
		document
			.getElementById('tokenizeBtn')
			.addEventListener('click', () => this.tokenizeText());
		document
			.getElementById('encodeBtn')
			.addEventListener('click', () => this.encodeText());
		document
			.getElementById('decodeBtn')
			.addEventListener('click', () => this.decodeFromInput());
		document
			.getElementById('clearBtn')
			.addEventListener('click', () => this.clearAll());

		// Vocabulary management buttons
		document
			.getElementById('loadVocabBtn')
			.addEventListener('click', () => this.loadVocabulary());
		document
			.getElementById('saveVocabBtn')
			.addEventListener('click', () => this.saveVocabulary());
		document
			.getElementById('resetVocabBtn')
			.addEventListener('click', () => this.resetVocabulary());
		document
			.getElementById('showVocabBtn')
			.addEventListener('click', () => this.displayVocabulary());

		// Auto-tokenize with debounce to prevent constant loading animations
		let debounceTimer;
		document.getElementById('inputText').addEventListener('input', () => {
			clearTimeout(debounceTimer);
			debounceTimer = setTimeout(() => {
				const text = document.getElementById('inputText').value.trim();
				if (text) {
					this.tokenizeTextQuiet(); // Use quiet version without loading animation
				}
			}, 500); // Wait 500ms after user stops typing
		});
	}

	showLoading() {
		document.getElementById('loadingOverlay').classList.remove('hidden');
	}

	hideLoading() {
		document.getElementById('loadingOverlay').classList.add('hidden');
	}

	logActivity(message) {
		const logContainer = document.getElementById('activityLog');
		const timestamp = new Date().toLocaleTimeString();
		const logEntry = document.createElement('div');
		logEntry.className = 'text-gray-700 mb-1';
		logEntry.innerHTML = `<span class="text-gray-500">[${timestamp}]</span> ${message}`;

		// Insert at the beginning
		if (
			logContainer.firstChild &&
			!logContainer.firstChild.classList?.contains('italic')
		) {
			logContainer.insertBefore(logEntry, logContainer.firstChild);
		} else {
			logContainer.innerHTML = '';
			logContainer.appendChild(logEntry);
		}

		// Keep only last 10 entries
		const entries = logContainer.children;
		while (entries.length > 10) {
			logContainer.removeChild(entries[entries.length - 1]);
		}
	}

	updateStats() {
		document.getElementById('vocabSize').textContent = this.stats.vocabSize;
		document.getElementById('tokensProcessed').textContent =
			this.stats.tokensProcessed;
		document.getElementById('newTokensAdded').textContent =
			this.stats.newTokensAdded;
		document.getElementById('roundTripSuccess').textContent =
			this.stats.roundTripSuccess + '%';
	}

	tokenize(text) {
		if (!text || typeof text !== 'string') {
			return [];
		}

		// Same regex as the Node.js version
		const tokens = text.match(/\w+|[^\w\s]/g) || [];

		// Convert words to lowercase, keep punctuation as-is
		return tokens.map((token) => {
			return /\w/.test(token) ? token.toLowerCase() : token;
		});
	}

	addTokenToVocab(token) {
		if (!(token in this.vocabulary)) {
			const id = this.nextTokenId++;
			this.vocabulary[token] = id;
			this.reverseVocabulary[id] = token;
			this.stats.vocabSize++;
			this.stats.newTokensAdded++;
			this.logActivity(`📝 Added new token: "${token}" (ID: ${id})`);
			return id;
		}
		return this.vocabulary[token];
	}

	encode(text, expandVocab = true) {
		const tokens = this.tokenize(text);
		const unknownId = this.vocabulary['[UNK]'];

		const tokenIds = tokens.map((token) => {
			if (token in this.vocabulary) {
				return this.vocabulary[token];
			} else if (expandVocab) {
				return this.addTokenToVocab(token);
			} else {
				return unknownId;
			}
		});

		this.stats.tokensProcessed += tokens.length;
		return tokenIds;
	}

	decode(ids) {
		const tokens = ids.map((id) => {
			const token = this.reverseVocabulary[id];
			if (!token) {
				console.warn(
					`Unknown token ID: ${id}. Available IDs:`,
					Object.keys(this.reverseVocabulary)
				);
				return '[UNK]';
			}
			return token;
		});

		// Smart text reconstruction - don't add spaces before punctuation
		let result = '';
		for (let i = 0; i < tokens.length; i++) {
			const token = tokens[i];

			if (i === 0) {
				// First token
				result += token;
			} else if (/^[^\w\s]$/.test(token)) {
				// Punctuation - attach directly to previous token
				result += token;
			} else {
				// Regular word - add space before it
				result += ' ' + token;
			}
		}

		return result;
	}

	// Helper method to reconstruct text from tokens using same logic as decode
	reconstructText(tokens) {
		let result = '';
		for (let i = 0; i < tokens.length; i++) {
			const token = tokens[i];

			if (i === 0) {
				// First token
				result += token;
			} else if (/^[^\w\s]$/.test(token)) {
				// Punctuation - attach directly to previous token
				result += token;
			} else {
				// Regular word - add space before it
				result += ' ' + token;
			}
		}

		return result;
	}

	tokenizeText() {
		const text = document.getElementById('inputText').value.trim();
		if (!text) {
			this.showError('tokensOutput', 'Please enter some text to tokenize');
			return;
		}

		this.showLoading();

		setTimeout(() => {
			try {
				const tokens = this.tokenize(text);
				this.displayTokens(tokens);
				this.logActivity(`Tokenized text into ${tokens.length} tokens`);
				this.updateStats();
			} catch (error) {
				this.showError(
					'tokensOutput',
					'Error during tokenization: ' + error.message
				);
			} finally {
				this.hideLoading();
			}
		}, 300);
	}

	// Quiet version without loading animation for auto-tokenize
	tokenizeTextQuiet() {
		const text = document.getElementById('inputText').value.trim();
		if (!text) {
			// Clear outputs if text is empty
			document.getElementById('tokensOutput').innerHTML =
				'<span class="text-gray-500 italic">Tokens will appear here...</span>';
			document.getElementById('encodedOutput').innerHTML =
				'<span class="text-gray-500 italic">Encoded tokens will appear here...</span>';
			document.getElementById('decodedOutput').innerHTML =
				'<span class="text-gray-500 italic">Decoded text will appear here...</span>';
			this.lastEncodedIds = []; // Clear encoded IDs
			return;
		}

		try {
			const tokens = this.tokenize(text);
			this.displayTokens(tokens);
			this.updateStats();

			// Clear encoded and decoded outputs since text changed
			document.getElementById('encodedOutput').innerHTML =
				'<span class="text-gray-500 italic">Encoded tokens will appear here...</span>';
			document.getElementById('decodedOutput').innerHTML =
				'<span class="text-gray-500 italic">Decoded text will appear here...</span>';
			this.lastEncodedIds = []; // Clear encoded IDs

			// Add subtle visual feedback
			const button = document.getElementById('tokenizeBtn');
			button.classList.add('bg-green-500');
			setTimeout(() => button.classList.remove('bg-green-500'), 200);
		} catch (error) {
			this.showError(
				'tokensOutput',
				'Error during tokenization: ' + error.message
			);
		}
	}

	encodeText() {
		const text = document.getElementById('inputText').value.trim();
		if (!text) {
			this.showError('encodedOutput', 'Please enter some text to encode');
			return;
		}

		this.showLoading();

		setTimeout(() => {
			try {
				const expandVocab = document.getElementById('expandVocab').checked;
				const initialVocabSize = this.stats.vocabSize;

				const tokens = this.tokenize(text);
				const encoded = this.encode(text, expandVocab);

				// Store the encoded IDs for decoding
				this.lastEncodedIds = encoded;

				this.displayTokens(tokens);
				this.displayEncoded(encoded);

				const newTokensCount = this.stats.vocabSize - initialVocabSize;
				if (newTokensCount > 0) {
					this.logActivity(
						`Encoded text with ${newTokensCount} new tokens added to vocabulary`
					);
				} else {
					this.logActivity(`Encoded text using existing vocabulary`);
				}

				this.updateStats();
			} catch (error) {
				this.showError(
					'encodedOutput',
					'Error during encoding: ' + error.message
				);
			} finally {
				this.hideLoading();
			}
		}, 300);
	}

	decodeFromInput() {
		// Use the stored encoded IDs instead of parsing HTML
		if (!this.lastEncodedIds || this.lastEncodedIds.length === 0) {
			this.showError(
				'decodedOutput',
				'Please encode some text first to decode'
			);
			return;
		}

		this.showLoading();

		setTimeout(() => {
			try {
				console.log('Decoding IDs:', this.lastEncodedIds);
				console.log('Reverse vocabulary:', this.reverseVocabulary);

				const decoded = this.decode(this.lastEncodedIds);
				console.log('Decoded result:', decoded);

				this.displayDecoded(decoded);

				// Check round-trip success - compare with proper tokenization/reconstruction
				const originalText = document.getElementById('inputText').value.trim();
				const originalTokens = this.tokenize(originalText);
				const reconstructedFromOriginal = this.reconstructText(originalTokens);
				const isMatch = reconstructedFromOriginal === decoded;

				this.stats.roundTripSuccess = isMatch
					? 100
					: Math.max(0, this.stats.roundTripSuccess - 5);
				this.logActivity(
					`Decoded ${this.lastEncodedIds.length} token IDs back to text`
				);

				this.updateStats();
			} catch (error) {
				this.showError(
					'decodedOutput',
					'Error during decoding: ' + error.message
				);
			} finally {
				this.hideLoading();
			}
		}, 300);
	}

	displayTokens(tokens) {
		const container = document.getElementById('tokensOutput');
		container.innerHTML = '';

		tokens.forEach((token, index) => {
			const tokenElement = document.createElement('span');
			tokenElement.className =
				'inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded mr-2 mb-2 text-xs font-medium';
			tokenElement.textContent = `"${token}"`;
			container.appendChild(tokenElement);
		});

		if (tokens.length === 0) {
			container.innerHTML =
				'<span class="text-gray-500 italic">No tokens found</span>';
		}
	}

	displayEncoded(encoded) {
		const container = document.getElementById('encodedOutput');
		container.innerHTML = '';

		encoded.forEach((id, index) => {
			const idElement = document.createElement('span');
			idElement.className =
				'inline-block bg-green-100 text-green-800 px-2 py-1 rounded mr-2 mb-2 text-xs font-medium';
			idElement.textContent = id;
			container.appendChild(idElement);
		});

		if (encoded.length === 0) {
			container.innerHTML =
				'<span class="text-gray-500 italic">No encoded tokens</span>';
		}
	}

	displayDecoded(decoded) {
		const container = document.getElementById('decodedOutput');
		container.innerHTML = `<span class="text-gray-800">${decoded}</span>`;
	}

	showError(containerId, message) {
		const container = document.getElementById(containerId);
		container.innerHTML = `<span class="text-red-500"><i class="fas fa-exclamation-triangle mr-1"></i>${message}</span>`;
	}

	clearAll() {
		document.getElementById('inputText').value = '';
		document.getElementById('tokensOutput').innerHTML =
			'<span class="text-gray-500 italic">Tokens will appear here...</span>';
		document.getElementById('encodedOutput').innerHTML =
			'<span class="text-gray-500 italic">Encoded tokens will appear here...</span>';
		document.getElementById('decodedOutput').innerHTML =
			'<span class="text-gray-500 italic">Decoded text will appear here...</span>';
		this.lastEncodedIds = []; // Clear the stored encoded IDs
		this.logActivity('🧹 Cleared all inputs and outputs');
	}

	loadVocabulary() {
		// Simulate loading vocabulary
		this.showLoading();

		setTimeout(() => {
			try {
				// Add some demo vocabulary
				const demoTokens = [
					'the',
					'quick',
					'brown',
					'fox',
					'jumps',
					'over',
					'lazy',
					'dog',
				];
				let addedCount = 0;

				demoTokens.forEach((token) => {
					if (!(token in this.vocabulary)) {
						this.addTokenToVocab(token);
						addedCount++;
					}
				});

				document.getElementById(
					'vocabStatus'
				).innerHTML = `<i class="fas fa-check-circle text-green-500 mr-1"></i>Vocabulary loaded successfully (${addedCount} new tokens added)`;

				this.displayVocabulary();
				this.updateStats();
				this.logActivity(`📂 Loaded vocabulary with ${addedCount} new tokens`);
			} catch (error) {
				document.getElementById(
					'vocabStatus'
				).innerHTML = `<i class="fas fa-exclamation-triangle text-red-500 mr-1"></i>Error loading vocabulary: ${error.message}`;
			} finally {
				this.hideLoading();
			}
		}, 500);
	}

	saveVocabulary() {
		this.showLoading();

		setTimeout(() => {
			try {
				const vocabData = {
					vocabulary: this.vocabulary,
					reverseVocabulary: this.reverseVocabulary,
					nextTokenId: this.nextTokenId,
					savedAt: new Date().toISOString(),
				};

				// Simulate saving to local storage
				localStorage.setItem('tokenizer_vocab', JSON.stringify(vocabData));

				document.getElementById(
					'vocabStatus'
				).innerHTML = `<i class="fas fa-check-circle text-green-500 mr-1"></i>Vocabulary saved successfully (${this.stats.vocabSize} tokens)`;

				this.logActivity(
					`💾 Saved vocabulary with ${this.stats.vocabSize} tokens`
				);
			} catch (error) {
				document.getElementById(
					'vocabStatus'
				).innerHTML = `<i class="fas fa-exclamation-triangle text-red-500 mr-1"></i>Error saving vocabulary: ${error.message}`;
			} finally {
				this.hideLoading();
			}
		}, 300);
	}

	resetVocabulary() {
		if (
			confirm(
				'Are you sure you want to reset the vocabulary? This will remove all custom tokens.'
			)
		) {
			this.vocabulary = {
				'[UNK]': 0,
				hello: 1,
				',': 2,
				world: 3,
				'!': 4,
				this: 5,
				is: 6,
				a: 7,
				simple: 8,
				tokenizer: 9,
				'.': 10,
			};
			this.reverseVocabulary = {};
			this.nextTokenId = 11;
			this.stats = {
				vocabSize: 11,
				tokensProcessed: 0,
				newTokensAdded: 0,
				roundTripSuccess: 100,
			};

			this.initializeReverseVocab();
			this.displayVocabulary();
			this.updateStats();

			document.getElementById(
				'vocabStatus'
			).innerHTML = `<i class="fas fa-refresh text-blue-500 mr-1"></i>Vocabulary reset to default state (11 tokens)`;

			this.logActivity('🔄 Reset vocabulary to default state');
		}
	}

	displayVocabulary() {
		const container = document.getElementById('vocabularyDisplay');
		container.innerHTML = '';

		const sortedEntries = Object.entries(this.vocabulary).sort(
			(a, b) => a[1] - b[1]
		);

		if (sortedEntries.length === 0) {
			container.innerHTML =
				'<span class="text-gray-500 italic">No vocabulary loaded</span>';
			return;
		}

		const table = document.createElement('table');
		table.className = 'w-full text-sm';

		// Header
		const header = document.createElement('thead');
		header.innerHTML = `
            <tr class="border-b border-gray-300">
                <th class="text-left py-2 font-semibold text-gray-700">ID</th>
                <th class="text-left py-2 font-semibold text-gray-700">Token</th>
            </tr>
        `;
		table.appendChild(header);

		// Body
		const tbody = document.createElement('tbody');
		sortedEntries.forEach(([token, id]) => {
			const row = document.createElement('tr');
			row.className = 'border-b border-gray-100 hover:bg-gray-50';
			row.innerHTML = `
                <td class="py-2 font-mono text-blue-600">${id}</td>
                <td class="py-2 font-mono">"${token}"</td>
            `;
			tbody.appendChild(row);
		});
		table.appendChild(tbody);

		container.appendChild(table);

		this.logActivity(
			`👁️ Displayed vocabulary with ${sortedEntries.length} tokens`
		);
	}
}

// Initialize the tokenizer UI when the page loads
document.addEventListener('DOMContentLoaded', () => {
	window.tokenizerUI = new TokenizerUI();
});

// Add some demo functionality
document.addEventListener('DOMContentLoaded', () => {
	// Add sample text buttons
	const sampleTexts = [
		'Hello, world! This is a simple test.',
		'The quick brown fox jumps over the lazy dog.',
		'Machine learning and natural language processing are fascinating!',
		'Tokenization is the first step in text preprocessing for LLMs.',
	];

	// Create sample text buttons
	const inputContainer = document.getElementById('inputText').parentElement;
	const sampleContainer = document.createElement('div');
	sampleContainer.className = 'mt-2';
	sampleContainer.innerHTML =
		'<p class="text-sm text-gray-600 mb-2">Quick samples:</p>';

	const buttonContainer = document.createElement('div');
	buttonContainer.className = 'flex flex-wrap gap-2';

	sampleTexts.forEach((text, index) => {
		const button = document.createElement('button');
		button.className =
			'text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full transition-colors duration-200';
		button.textContent = `Sample ${index + 1}`;
		button.addEventListener('click', () => {
			document.getElementById('inputText').value = text;
			window.tokenizerUI.tokenizeText();
		});
		buttonContainer.appendChild(button);
	});

	sampleContainer.appendChild(buttonContainer);
	inputContainer.appendChild(sampleContainer);
});
