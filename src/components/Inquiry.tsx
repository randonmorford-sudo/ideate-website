export function Inquiry() {
  return (
    <section className="section inquiry" aria-labelledby="inquiry-heading">
      <div className="container inquiry__grid">
        <div className="inquiry__copy">
          <p className="eyebrow">Inquiry</p>
          <h2 id="inquiry-heading">AI that investigates before it answers.</h2>
          <p>
            Most AI tools are designed to answer. Ideate is designed to
            investigate first.
          </p>
          <p>
            Lumos probes assumptions, identifies missing context, surfaces
            unanswered questions, and helps strengthen the definition of the
            opportunity before moving toward a solution.
          </p>
          <ul className="check-list">
            <li>Challenge weak framing</li>
            <li>Find missing context</li>
            <li>Surface unanswered questions</li>
            <li>Build clarity progressively</li>
            <li>Keep human judgment central</li>
          </ul>
        </div>

        <aside className="inquiry-card" aria-label="Example inquiry pattern">
          <div className="inquiry-card__label">Inquiry pattern</div>
          <div className="inquiry-card__thread">
            <div className="bubble bubble--user">
              We should add AI onboarding for new users.
            </div>
            <div className="bubble bubble--ai">
              What failure are you trying to prevent? What evidence suggests
              onboarding is the highest-leverage place to intervene?
            </div>
            <div className="bubble bubble--user">
              Activation drops after signup. Teams assume users don’t understand
              the product.
            </div>
            <div className="bubble bubble--ai">
              What’s known versus assumed about why activation drops? Which
              users, in which moment, and against what definition of success?
            </div>
          </div>
          <p className="inquiry-card__note">
            Questions deepen the opportunity before solutions take shape.
          </p>
        </aside>
      </div>
    </section>
  )
}
