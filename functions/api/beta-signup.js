/**
 * POST /api/beta-signup
 * Cloudflare Pages Function with D1 binding: BETA_DB
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
