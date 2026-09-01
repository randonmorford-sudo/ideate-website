/**
 * POST /api/beta-signup
 * Cloudflare Pages Function with D1 binding: BETA_DB
 * Optional Resend notification via RESEND_API_KEY + BETA_NOTIFY_EMAIL
 */

const MAX_NAME = 120
const MAX_ROLE = 120
const MAX_EMAIL = 254

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  })
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

/**
 * Fire-and-forget style notification after a successful new signup.
 * Failures are logged minimally and never surface to the client.
 */
async function sendSignupNotification(env, signup) {
  const apiKey = env?.RESEND_API_KEY
  const notifyTo = env?.BETA_NOTIFY_EMAIL

  if (!apiKey || !notifyTo) {
    console.error('beta-signup notification skipped: missing configuration')
    return
  }

  const source = 'website'
  // en-US + Denver yields e.g. "September 1, 2026, 12:32 PM MDT"
  // Normalize the second comma into " at " for readability.
  const formattedTimestamp = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Denver',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    timeZoneName: 'short',
  })
    .format(new Date())
    .replace(/, (\d{1,2}:)/, ' at $1')

  const text = [
    'New Ideate beta signup',
    '',
    `Name: ${signup.name}`,
    `Role / Title: ${signup.role}`,
    `Email: ${signup.email}`,
    `Source: ${source}`,
    `Signup timestamp: ${formattedTimestamp}`,
  ].join('\n')

  const html = `
    <div style="font-family: system-ui, -apple-system, sans-serif; line-height: 1.5; color: #1c1917;">
      <p style="margin: 0 0 12px;"><strong>New Ideate beta signup</strong></p>
      <table style="border-collapse: collapse; font-size: 14px;">
        <tr>
          <td style="padding: 4px 16px 4px 0; color: #57534e;">Name</td>
          <td style="padding: 4px 0;">${escapeHtml(signup.name)}</td>
        </tr>
        <tr>
          <td style="padding: 4px 16px 4px 0; color: #57534e;">Role / Title</td>
          <td style="padding: 4px 0;">${escapeHtml(signup.role)}</td>
        </tr>
        <tr>
          <td style="padding: 4px 16px 4px 0; color: #57534e;">Email</td>
          <td style="padding: 4px 0;">${escapeHtml(signup.email)}</td>
        </tr>
        <tr>
          <td style="padding: 4px 16px 4px 0; color: #57534e;">Source</td>
          <td style="padding: 4px 0;">${escapeHtml(source)}</td>
        </tr>
        <tr>
          <td style="padding: 4px 16px 4px 0; color: #57534e;">Signup timestamp</td>
          <td style="padding: 4px 0;">${escapeHtml(formattedTimestamp)}</td>
        </tr>
      </table>
    </div>
  `.trim()

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Ideate Beta <beta@ideateproduct.com>',
        to: [notifyTo],
        subject: `New Ideate beta signup: ${signup.name}`,
        text,
        html,
      }),
    })

    if (!response.ok) {
      console.error(
        `beta-signup notification failed: resend returned ${response.status}`,
      )
    }
  } catch {
    console.error('beta-signup notification failed: request error')
  }
}

export async function onRequest(context) {
  const { request, env } = context

  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        Allow: 'POST, OPTIONS',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Max-Age': '86400',
      },
    })
  }

  if (request.method !== 'POST') {
    return json({ ok: false, error: 'method_not_allowed' }, 405)
  }

  let body
  try {
    body = await request.json()
  } catch {
    return json({ ok: false, error: 'invalid_json' }, 400)
  }

  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return json({ ok: false, error: 'invalid_body' }, 400)
  }

  // Honeypot: bots fill "website". Humans never see it.
  // Return a normal success shape so scrapers learn nothing useful.
  const honeypot = typeof body.website === 'string' ? body.website.trim() : ''
  if (honeypot.length > 0) {
    return json({ ok: true, status: 'joined' }, 200)
  }

  const name = typeof body.name === 'string' ? body.name.trim() : ''
  const role = typeof body.role === 'string' ? body.role.trim() : ''
  const emailRaw = typeof body.email === 'string' ? body.email.trim() : ''
  const email = emailRaw.toLowerCase()

  if (!name || !role || !email) {
    return json({ ok: false, error: 'missing_fields' }, 400)
  }

  if (name.length > MAX_NAME || role.length > MAX_ROLE || email.length > MAX_EMAIL) {
    return json({ ok: false, error: 'invalid_fields' }, 400)
  }

  if (!EMAIL_PATTERN.test(email)) {
    return json({ ok: false, error: 'invalid_email' }, 400)
  }

  const db = env?.BETA_DB
  if (!db) {
    console.error('BETA_DB binding is missing')
    return json({ ok: false, error: 'server_error' }, 500)
  }

  try {
    const result = await db
      .prepare(
        `INSERT OR IGNORE INTO beta_signups (name, role, email)
         VALUES (?1, ?2, ?3)`,
      )
      .bind(name, role, email)
      .run()

    if (!result?.success) {
      console.error('D1 insert did not succeed')
      return json({ ok: false, error: 'server_error' }, 500)
    }

    const changes = Number(result?.meta?.changes ?? 0)

    if (changes === 1) {
      // Signup is persisted. Notification must not fail the user response.
      await sendSignupNotification(env, { name, role, email })
      return json({ ok: true, status: 'joined' }, 201)
    }

    if (changes === 0) {
      return json({ ok: true, status: 'already_joined' }, 200)
    }

    console.error('D1 insert returned unexpected change count')
    return json({ ok: false, error: 'server_error' }, 500)
  } catch {
    console.error('beta-signup insert failed')
    return json({ ok: false, error: 'server_error' }, 500)
  }
}
