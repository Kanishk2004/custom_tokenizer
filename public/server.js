/**
 * Simple HTTP server to serve the tokenizer frontend
 * Run with: node server.js
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3001;

// MIME types for different file extensions
const mimeTypes = {
	'.html': 'text/html',
	'.js': 'text/javascript',
	'.css': 'text/css',
	'.json': 'application/json',
	'.ico': 'image/x-icon',
};

const server = http.createServer((req, res) => {
	let filePath = req.url === '/' ? '/index.html' : req.url;
	filePath = path.join(__dirname, filePath);

	const extname = path.extname(filePath);
	const contentType = mimeTypes[extname] || 'text/plain';

	fs.readFile(filePath, (err, content) => {
		if (err) {
			if (err.code === 'ENOENT') {
				res.writeHead(404, { 'Content-Type': 'text/html' });
				res.end(`
                    <html>
                        <body style="font-family: Arial, sans-serif; text-align: center; padding: 50px;">
                            <h1>404 - File Not Found</h1>
                            <p>The file you requested could not be found.</p>
                            <a href="/">Go back to home</a>
                        </body>
                    </html>
                `);
			} else {
				res.writeHead(500);
				res.end(`Server Error: ${err.code}`);
			}
		} else {
			res.writeHead(200, { 'Content-Type': contentType });
			res.end(content, 'utf8');
		}
	});
});

server.listen(PORT, () => {
	console.log(`Tokenizer Frontend Server running at:`);
	console.log(`   Local:   http://localhost:${PORT}`);
	console.log(`   Network: http://127.0.0.1:${PORT}`);
	console.log(`\nOpen your browser and start tokenizing!`);
	console.log(`\nPress Ctrl+C to stop the server`);
});

// Graceful shutdowns
process.on('SIGINT', () => {
	console.log('\n\nServer shutting down gracefully...');
	server.close(() => {
		console.log('Server closed successfully');
		process.exit(0);
	});
});
