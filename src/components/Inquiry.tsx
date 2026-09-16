export function Inquiry() {
  return (
    <section className="section inquiry" aria-labelledby="inquiry-heading">
      <div className="container inquiry__grid">
        <div className="inquiry__copy">
          <p className="eyebrow">Lumos</p>
          <h2 id="inquiry-heading">One guide for research, framing, and decisions.</h2>
          <p>
            Lumos is Ideate’s single visible guide. It helps teams investigate
            before committing to a solution.
          </p>
          <p>
            Ask Lumos to probe assumptions, find missing context, research the
            web, refine the Goal, explore solutions, assess risks, or review a
            direction. The team reviews the results and chooses what to add.
          </p>
          <ul className="check-list">
            <li>Challenge weak framing</li>
            <li>Research the web and review suggested sources</li>
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
