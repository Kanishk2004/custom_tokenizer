const { Tokenizer } = require('../src/tokenizer');

// Initialize tokenizer
let tokenizer;
try {
  tokenizer = new Tokenizer();
} catch (error) {
  console.error('Failed to initialize tokenizer:', error);
}

module.exports = async (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'POST') {
    try {
      const { action, text, ids, expandVocab = true } = req.body;
      
      if (!tokenizer) {
        tokenizer = new Tokenizer();
      }

      let result;
      
      switch (action) {
        case 'tokenize':
          result = {
            success: true,
            tokens: tokenizer.tokenize(text),
            vocabSize: tokenizer.getVocabSize()
          };
          break;
          
        case 'encode':
          const tokens = tokenizer.tokenize(text);
          const encoded = tokenizer.encode(text, expandVocab);
          result = {
            success: true,
            tokens,
            encoded,
            vocabSize: tokenizer.getVocabSize()
          };
          break;
          
        case 'decode':
          result = {
            success: true,
            decoded: tokenizer.decode(ids),
            vocabSize: tokenizer.getVocabSize()
          };
          break;
          
        case 'getVocab':
          result = {
            success: true,
            vocabulary: tokenizer.getVocabulary(),
            vocabSize: tokenizer.getVocabSize()
          };
          break;
          
        default:
          result = {
            success: false,
            error: 'Invalid action'
          };
      }
      
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  } else {
    res.status(405).json({
      success: false,
      error: 'Method not allowed'
    });
  }
};
