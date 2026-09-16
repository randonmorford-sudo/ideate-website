const stages = [
  {
    name: 'Goal',
    description: 'Start with a problem, goal, or idea and clarify what matters.',
  },
  {
    name: 'Knowledge',
    description: 'Bring in research, notes, documents, URLs, and reviewed Lumos sources.',
  },
  {
    name: 'Solution',
    description: 'Explore options that respond to the goal and its evidence.',
  },
  {
    name: 'Direction',
    description: 'Turn the reasoning into a clear decision and next steps.',
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
          <h2 id="how-heading">One connected workspace for product decisions.</h2>
          <p className="section-intro">
            Ideate connects the goal, evidence, solution thinking, and direction
            so the team can move forward without losing its reasoning.
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
