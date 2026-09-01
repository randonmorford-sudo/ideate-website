const stages = [
  {
    name: 'Idea',
    description: 'Start with an ambiguous opportunity, not a forced frame.',
  },
  {
    name: 'Inquiry',
    description: 'Probe assumptions, gaps, and unanswered questions.',
  },
  {
    name: 'Brief',
    description: 'Synthesize a coherent product narrative that can evolve.',
  },
  {
    name: 'Evidence',
    description: 'Ground the opportunity in project knowledge and signals.',
  },
  {
    name: 'Solution Exploration',
    description: 'Explore solutions only after the opportunity is clear.',
  },
  {
    name: 'Direction',
    description: 'Arrive at a defensible direction tied to inquiry and evidence.',
  },
] as const

export function HowItWorks() {
  return (
    <section
      className="section how"
      id="how-it-works"
      aria-labelledby="how-heading"
    >
      <div className="container">
        <div className="section-header">
          <p className="eyebrow">How it works</p>
          <h2 id="how-heading">From idea to direction, deliberately.</h2>
          <p className="section-intro">
            Ideate connects each discovery stage so the work stays coherent from
            first signal to chosen direction.
          </p>
        </div>

        <ol className="workflow" aria-label="Ideate workflow">
          {stages.map((stage, index) => (
            <li className="workflow__item" key={stage.name}>
              <div className="workflow__index" aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </div>
              <div className="workflow__content">
                <h3>{stage.name}</h3>
                <p>{stage.description}</p>
              </div>
              {index < stages.length - 1 ? (
                <span className="workflow__connector" aria-hidden="true" />
              ) : null}
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
