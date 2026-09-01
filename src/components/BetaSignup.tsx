import { useId, useState, type FormEvent } from 'react'

type FormStatus =
  | 'idle'
  | 'submitting'
  | 'success'
  | 'already_joined'
  | 'validation_error'
  | 'server_error'

type FieldErrors = {
  name?: string
  role?: string
  email?: string
}

type ApiResponse = {
  ok?: boolean
  status?: 'joined' | 'already_joined'
  error?: string
}

const MAX_NAME = 120
const MAX_ROLE = 120
const MAX_EMAIL = 254
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate(values: {
  name: string
  role: string
  email: string
}): FieldErrors {
  const errors: FieldErrors = {}

  if (!values.name) {
    errors.name = 'Enter your name.'
  } else if (values.name.length > MAX_NAME) {
    errors.name = 'Name is too long.'
  }

  if (!values.role) {
    errors.role = 'Enter your role.'
  } else if (values.role.length > MAX_ROLE) {
    errors.role = 'Role is too long.'
  }

  if (!values.email) {
    errors.email = 'Enter your email.'
  } else if (
    values.email.length > MAX_EMAIL ||
    !EMAIL_PATTERN.test(values.email)
  ) {
    errors.email = 'Enter a valid email address.'
  }

  return errors
}

export function BetaSignup() {
  const formId = useId()
  const [name, setName] = useState('')
  const [role, setRole] = useState('')
  const [email, setEmail] = useState('')
  const [website, setWebsite] = useState('')
  const [status, setStatus] = useState<FormStatus>('idle')
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  const [formError, setFormError] = useState<string | null>(null)

  const isSubmitting = status === 'submitting'
  const isComplete = status === 'success' || status === 'already_joined'

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (isSubmitting) return

    setFormError(null)

    const values = {
      name: name.trim(),
      role: role.trim(),
      email: email.trim().toLowerCase(),
    }

    const errors = validate(values)
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors)
      setStatus('validation_error')
      return
    }

    setFieldErrors({})
    setStatus('submitting')

    try {
      const response = await fetch('/api/beta-signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: values.name,
          role: values.role,
          email: values.email,
          website,
        }),
      })

      let data: ApiResponse = {}
      try {
        data = (await response.json()) as ApiResponse
      } catch {
        data = {}
      }

      if (response.ok && data.ok) {
        if (data.status === 'already_joined') {
          setStatus('already_joined')
          return
        }
        setStatus('success')
        return
      }

      if (response.status === 400) {
        setStatus('validation_error')
        setFormError('Please check your details and try again.')
        return
      }

      setStatus('server_error')
      setFormError(
        'Something went wrong on our side. Please try again in a moment.',
      )
    } catch {
      setStatus('server_error')
      setFormError(
        'We could not reach the server. Check your connection and try again.',
      )
    }
  }

  return (
    <section
      className="section beta"
      id="beta"
      aria-labelledby="beta-heading"
    >
      <div className="container beta__grid">
        <div className="beta__copy">
          <p className="eyebrow">Early access</p>
          <h2 id="beta-heading">Join the Ideate beta.</h2>
          <p>
            Ideate is preparing for a limited beta. Join the list to be among
            the first to try it and help shape what comes next.
          </p>
        </div>

        <div className="beta__panel">
          {isComplete ? (
            <div className="beta-result" role="status" aria-live="polite">
              {status === 'success' ? (
                <>
                  <h3>You’re on the list.</h3>
                  <p>
                    Thanks for your interest in Ideate. I’ll keep you updated as
                    the beta gets closer.
                  </p>
                </>
              ) : (
                <>
                  <h3>You’re already on the beta list.</h3>
                  <p>We’ll keep you updated as the beta gets closer.</p>
                </>
              )}
            </div>
          ) : (
            <form className="beta-form" onSubmit={handleSubmit} noValidate>
              <div className="beta-form__fields">
                <div className="field">
                  <label htmlFor={`${formId}-name`}>Name</label>
                  <input
                    id={`${formId}-name`}
                    name="name"
                    type="text"
                    autoComplete="name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    maxLength={MAX_NAME}
                    disabled={isSubmitting}
                    aria-invalid={fieldErrors.name ? true : undefined}
                    aria-describedby={
                      fieldErrors.name ? `${formId}-name-error` : undefined
                    }
                    required
                  />
                  {fieldErrors.name ? (
                    <p
                      className="field__error"
                      id={`${formId}-name-error`}
                      role="alert"
                    >
                      {fieldErrors.name}
                    </p>
                  ) : null}
                </div>

                <div className="field">
                  <label htmlFor={`${formId}-role`}>Role / Title</label>
                  <input
                    id={`${formId}-role`}
                    name="role"
                    type="text"
                    autoComplete="organization-title"
                    value={role}
                    onChange={(event) => setRole(event.target.value)}
                    maxLength={MAX_ROLE}
                    disabled={isSubmitting}
                    aria-invalid={fieldErrors.role ? true : undefined}
                    aria-describedby={
                      fieldErrors.role ? `${formId}-role-error` : undefined
                    }
                    required
                  />
                  {fieldErrors.role ? (
                    <p
                      className="field__error"
                      id={`${formId}-role-error`}
                      role="alert"
                    >
                      {fieldErrors.role}
                    </p>
                  ) : null}
                </div>

                <div className="field">
                  <label htmlFor={`${formId}-email`}>Email</label>
                  <input
                    id={`${formId}-email`}
                    name="email"
                    type="email"
                    autoComplete="email"
                    inputMode="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    maxLength={MAX_EMAIL}
                    disabled={isSubmitting}
                    aria-invalid={fieldErrors.email ? true : undefined}
                    aria-describedby={
                      fieldErrors.email ? `${formId}-email-error` : undefined
                    }
                    required
                  />
                  {fieldErrors.email ? (
                    <p
                      className="field__error"
                      id={`${formId}-email-error`}
                      role="alert"
                    >
                      {fieldErrors.email}
                    </p>
                  ) : null}
                </div>

                {/* Honeypot - hidden from people, visible to naive bots */}
                <div className="field field--honeypot" aria-hidden="true">
                  <label htmlFor={`${formId}-website`}>Website</label>
                  <input
                    id={`${formId}-website`}
                    name="website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={website}
                    onChange={(event) => setWebsite(event.target.value)}
                  />
                </div>
              </div>

              {formError ? (
                <p className="beta-form__error" role="alert">
                  {formError}
                </p>
              ) : null}

              <button
                type="submit"
                className="btn btn--primary beta-form__submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Joining…' : 'Join the Beta'}
              </button>

              <p className="beta-form__consent">
                By joining, you agree to receive occasional emails about the
                Ideate beta. You can unsubscribe at any time.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
