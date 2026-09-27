import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static assets from the current directory at root
app.use(express.static(__dirname));

// Also serve static assets with /my_journey prefix for GitHub Pages path compatibility
app.use('/my_journey', express.static(__dirname));

// Route handlers for entry points
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/my_journey', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Fallback for HTML5 navigation
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running at http://0.0.0.0:${PORT}`);
});
