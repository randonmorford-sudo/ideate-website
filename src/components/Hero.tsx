import { APP_LOGIN_URL } from '../lib/urls'

export function Hero() {
  return (
    <section className="hero" id="top" aria-labelledby="hero-heading">
      <div className="container hero__grid">
        <div className="hero__copy">
          <p className="eyebrow">AI-powered product thinking</p>
          <h1 id="hero-heading">Turn a product idea into clear direction.</h1>
          <p className="lead">
            Ideate helps product teams define a goal, bring in evidence, explore
            solution options, and decide what to do next. Lumos keeps the work
            connected from first question to final direction.
          </p>
          <div className="hero__actions">
            <a className="btn btn--primary" href={APP_LOGIN_URL}>
              Open Ideate
            </a>
            <a className="btn btn--secondary" href="#how-it-works">
              Explore how it works
            </a>
          </div>
          <p className="hero__sign-in">
            Already have an account? <a href={APP_LOGIN_URL}>Sign in to Ideate</a>
          </p>
        </div>

        <div className="hero__visual">
          <figure className="hero-shot">
            <img
              className="hero-shot__image"
              src="/ideate-brief-demo.png"
              alt="Ideate workspace showing a Goal, evidence, solution exploration, and Lumos"
              width={1382}
              height={1052}
              decoding="async"
              fetchPriority="high"
            />
          </figure>
        </div>
      </div>
    </section>
  )
}
