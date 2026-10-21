import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Set strict anti-cache headers for HTML, JS, CSS, and Service Worker so phones always fetch live files
const staticOptions = {
  etag: true,
  lastModified: true,
  setHeaders: (res, filePath) => {
    if (
      filePath.endsWith('.html') ||
      filePath.endsWith('.js') ||
      filePath.endsWith('.css') ||
      filePath.endsWith('sw.js') ||
      filePath.endsWith('.json') ||
      filePath.endsWith('.webmanifest')
    ) {
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', '0');
    }
  }
};

app.use(express.static(__dirname, staticOptions));
app.use('/my_journey', express.static(__dirname, staticOptions));

const sendIndex = (req, res) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  res.sendFile(path.join(__dirname, 'index.html'));
};

app.get('/', sendIndex);
app.get('/my_journey', sendIndex);
app.use(sendIndex);

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running at http://0.0.0.0:${PORT}`);
});
