type ProductPreviewProps = {
  variant: 'hero' | 'workspace'
}

const navItems = [
  'Goal',
  'Knowledge',
  'Solutions',
  'Direction',
] as const

export function ProductPreview({ variant }: ProductPreviewProps) {
  const isHero = variant === 'hero'

  return (
    <div
      className={`product-preview product-preview--${variant}`}
      role="img"
      aria-label="Ideate product workspace showing a Goal, Knowledge, solution exploration, direction, and Lumos"
    >
      <div className="product-preview__chrome">
        <div className="product-preview__dots" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <div className="product-preview__title">Ideate · Activation opportunity</div>
      </div>

      <div className="product-preview__body">
        <aside className="product-preview__rail" aria-hidden="true">
          <div className="rail-brand">Ideate</div>
          <nav className="rail-nav">
            {navItems.map((item, index) => (
              <div
                key={item}
                className={`rail-nav__item${index === 0 ? ' is-active' : ''}`}
              >
                {item}
              </div>
            ))}
          </nav>
          <div className="rail-footer">Project knowledge</div>
        </aside>

        <div className="product-preview__main">
          <div className="preview-panel preview-panel--brief">
            <div className="preview-panel__meta">
              <span>Goal</span>
              <span className="pill">Refining</span>
            </div>
            <h3>New users stall before experiencing core value.</h3>
            <p>
              Early drop-off suggests guidance and timing gaps after signup, not
              a lack of interest in the product itself.
            </p>
            <div className="preview-fields">
              <div>
                <span>Who</span>
                <strong>First-time operators evaluating the workspace</strong>
              </div>
              <div>
                <span>Why</span>
                <strong>Activation fails before value is felt</strong>
              </div>
            </div>
          </div>

          {!isHero ? (
            <div className="preview-split">
              <div className="preview-panel">
                <div className="preview-panel__meta">
                  <span>Knowledge / Project evidence</span>
                </div>
                <ul className="preview-list">
                  <li>Support notes cite confusion in first session</li>
                  <li>Activation definition still inconsistent</li>
                  <li>Interview themes point to missing guidance</li>
                </ul>
              </div>
              <div className="preview-panel">
                <div className="preview-panel__meta">
                  <span>Solution exploration</span>
                </div>
                <ul className="preview-list preview-list--muted">
                  <li>Guided first-run path</li>
                  <li>Contextual prompts at decision points</li>
                  <li>Deferred until inquiry stabilizes</li>
                </ul>
              </div>
            </div>
          ) : null}

          <div className="preview-bottom">
            <div className="preview-panel preview-panel--direction">
              <div className="preview-panel__meta">
                <span>Direction</span>
              </div>
              <p>
                Investigate activation friction before committing to an
                onboarding feature set.
              </p>
            </div>

            <div className="preview-panel preview-panel--lumos">
              <div className="preview-panel__meta">
                <span>Lumos AI</span>
                <span className="pill pill--quiet">Inquiry</span>
              </div>
              <p>
                Which assumption about first-session behavior is least supported
                by current evidence?
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
