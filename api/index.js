module.exports = async (req, res) => {
  res.status(200).json({
    message: "Custom Word-Level Tokenizer API",
    version: "1.0.0",
    author: "Kanishk Chandna",
    endpoints: {
      tokenizer: "/api/tokenizer"
    },
    documentation: "https://github.com/Kanishk2004/custom_tokenizer"
  });
};
