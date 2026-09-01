const capabilities = [
  '0 to 1 product development',
  'AI interaction design',
  'Product architecture and UX',
  'AI-native development',
  'Product discovery and evidence workflows',
] as const

export function Builder() {
  return (
    <section
      className="section builder"
      id="about"
      aria-labelledby="builder-heading"
    >
      <div className="container builder__grid">
        <div className="builder__copy">
          <p className="eyebrow">From thesis to software</p>
          <h2 id="builder-heading">
            Built from product thesis to working software.
          </h2>
          <p>
            Ideate was conceived, product-designed, and built by Randon Morford
            to explore a larger question: what changes when a product leader can
            move directly from product thesis to working software?
          </p>
          <p>
            The result is both a working product and an ongoing exploration of
            AI-native product development.
          </p>
          <div className="builder__identity">
            <div className="builder__avatar" aria-hidden="true">
              RM
            </div>
            <div>
              <p className="builder__name">Randon Morford</p>
              <p className="builder__role">
                Product Executive and Creator of Ideate
              </p>
            </div>
          </div>
        </div>

        <div className="builder__capabilities">
          <h3 className="builder__capabilities-title">Capability areas</h3>
          <ul>
            {capabilities.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
