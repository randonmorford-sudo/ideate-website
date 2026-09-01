export function Hero() {
  return (
    <section className="hero" id="top" aria-labelledby="hero-heading">
      <div className="container hero__grid">
        <div className="hero__copy">
          <p className="eyebrow">AI-powered product discovery</p>
          <h1 id="hero-heading">Turn ambiguity into product direction.</h1>
          <p className="lead">
            Ideate helps product leaders investigate ideas, challenge
            assumptions, gather evidence, and move from an initial opportunity
            to a defensible product direction.
          </p>
          <div className="hero__actions">
            <a className="btn btn--primary" href="#beta">
              Join the Beta
            </a>
            <a className="btn btn--secondary" href="#how-it-works">
              Explore how it works
            </a>
          </div>
        </div>

        <div className="hero__visual">
          <figure className="hero-shot">
            <img
              className="hero-shot__image"
              src="/ideate-brief-demo.png"
              alt="Ideate Brief for a fictional first-session activation product discovery project"
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
