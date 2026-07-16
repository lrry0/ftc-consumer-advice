/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export default async function handler(req, res) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const kvUrl = process.env.KV_REST_API_URL;
  const kvToken = process.env.KV_REST_API_TOKEN;

  // Fallback to static JSON file if Vercel KV is not connected (e.g. running locally/development)
  if (!kvUrl || !kvToken) {
    try {
      const fs = await import('fs');
      const path = await import('path');
      const fileURLToPath = await import('url').then(m => m.fileURLToPath);
      const __filename = fileURLToPath(import.meta.url);
      const __dirname = path.dirname(__filename);
      
      const dataFilePath = path.join(__dirname, '../src/data/reportData.json');
      const staticData = JSON.parse(fs.readFileSync(dataFilePath, 'utf-8'));
      return res.status(200).json(staticData);
    } catch (err) {
      console.error('Failed to load static JSON database:', err);
      return res.status(200).json({});
    }
  }

  try {
    // Fetch reports database from Vercel KV
    const kvResponse = await fetch(`${kvUrl}/get/reports_db`, {
      headers: { Authorization: `Bearer ${kvToken}` }
    });

    if (!kvResponse.ok) {
      throw new Error('Failed to fetch reports database from Vercel KV');
    }

    const kvData = await kvResponse.json();
    const reportsJson = kvData.result ? JSON.parse(kvData.result) : {};
    return res.status(200).json(reportsJson);
  } catch (err) {
    console.error('Error fetching reports from KV database:', err);
    return res.status(500).json({ error: 'Failed to retrieve reports from KV database' });
  }
}
