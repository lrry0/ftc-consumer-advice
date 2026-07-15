import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataFilePath = path.join(__dirname, '../src/data/reportData.json');

// Get recordId to delete
const recordId = process.env.RECORD_ID || process.argv[2];

if (!recordId) {
  console.error('Error: Please provide a RECORD_ID as env var or command line argument.');
  process.exit(1);
}

if (!fs.existsSync(dataFilePath)) {
  console.error('Error: Data file not found.');
  process.exit(1);
}

let reportData = JSON.parse(fs.readFileSync(dataFilePath, 'utf-8'));

if (recordId.toLowerCase() === 'all' || recordId.toLowerCase() === 'clear') {
  // Preserve default static records so the demo site maintains initial state
  const preservedKeys = ["77391024", "88401925", "99512036"];
  const newReportData = {};
  for (const key of preservedKeys) {
    if (reportData[key]) {
      newReportData[key] = reportData[key];
    }
  }
  reportData = newReportData;
  console.log('🧹 Cleared all dynamic reports. Preserved default static records.');
} else {
  if (!reportData[recordId]) {
    console.error(`Error: Record ID ${recordId} not found in database.`);
    process.exit(1);
  }
  delete reportData[recordId];
  console.log(`✅ Successfully deleted Record ID: ${recordId}`);
}

fs.writeFileSync(dataFilePath, JSON.stringify(reportData, null, 2));
