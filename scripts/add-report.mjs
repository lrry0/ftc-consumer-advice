import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CALLBACK_URL = 'https://n8n.alphabusinessdesigns.co.uk/webhook/477405ad-5d41-44f4-bec5-8e34c5451f84/report-callback';
const dataFilePath = path.join(__dirname, '../src/data/reportData.json');

// ── Read payload ──────────────────────────────────────────────────────────────
const payloadRaw = process.env.REPORT_PAYLOAD || process.argv[2];

if (!payloadRaw) {
  console.error('Error: No payload provided. Pass it via REPORT_PAYLOAD env var or as the first argument.');
  process.exit(1);
}

let payload;
try {
  payload = JSON.parse(payloadRaw);
} catch {
  console.error('Error: Invalid JSON payload.');
  process.exit(1);
}

// ── Generate recordId if not provided (8-digit random number) ─────────────────
const recordId = payload.recordId || Math.floor(10000000 + Math.random() * 90000000).toString();

// ── Load existing data ────────────────────────────────────────────────────────
const reportData = JSON.parse(fs.readFileSync(dataFilePath, 'utf-8'));

// ── Build the bank URL slug ───────────────────────────────────────────────────
const bankSlug = payload.bank
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/(^-|-$)/g, '');

const generatedUrl = `https://ftc.suprt.eu/advice-and-guidance/report/${recordId}/${bankSlug}-consumer-investigation`;

// ── Build the new entry (id is stored internally, not sent back) ──────────────
const newEntry = {
  ...(payload.id && { id: payload.id }),
  recordId,
  name: payload.name,
  ...(payload.email && { email: payload.email }),
  ...(payload.address && { address: payload.address }),
  bank: payload.bank,
  accountMasked: payload.accountMasked || `XXXXXXXXX${payload.accountEnding}`,
  accountEnding: payload.accountEnding,
  amount: payload.amount,
  initialPenalty: payload.initialPenalty,
  subject: payload.subject,
  reviewUrl: generatedUrl,
};

// ── Persist to JSON ───────────────────────────────────────────────────────────
reportData[recordId] = newEntry;
fs.writeFileSync(dataFilePath, JSON.stringify(reportData, null, 2));

console.log(`✅ Report added: ${recordId}`);
console.log(`🔗 URL: ${generatedUrl}`);

// ── Write URL to GitHub Actions output ───────────────────────────────────────
if (process.env.GITHUB_OUTPUT) {
  fs.appendFileSync(process.env.GITHUB_OUTPUT, `generated_url=${generatedUrl}\n`);
  fs.appendFileSync(process.env.GITHUB_OUTPUT, `record_id=${recordId}\n`);
}

// ── POST callback to n8n ─────────────────────────────────────────────────────
try {
  const headers = { 'Content-Type': 'application/json' };
  const callbackToken = process.env.N8N_CALLBACK_TOKEN;
  if (callbackToken) {
    headers['Authorization'] = `Bearer ${callbackToken}`;
  }

  const response = await fetch(CALLBACK_URL, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      id: payload.id,
      recordId,
      url: generatedUrl,
      status: 'success',
    }),
  });
  console.log(`📬 Callback sent → ${response.status}`);
} catch (err) {
  console.error('⚠️  Callback failed:', err.message);
  // Don't exit — the file was already saved, failure here is non-fatal
}
