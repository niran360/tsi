export default function AboutPage({ aboutPillars, founders }) {
  return (
    <main>
      <section className="section about-page-hero">
        <div className="about-page-hero-layout">
          <div className="about-page-hero-content">
            <h2>Who We Are</h2>
            <p className="about-lead">
              Talent Search Initiative is dedicated to discovering, developing, and
              connecting exceptional individuals with meaningful opportunities. We
              believe talent exists everywhere, but access does not. Our work is
              built to close that gap through structured development pathways,
              practical support systems, and transparent opportunity channels.
            </p>
          </div>
          <div className="about-page-hero-media" aria-hidden="true">
            <img
              src="/6.png"
              alt=""
              loading="eager"
              decoding="async"
              fetchPriority="high"
              width="520"
              height="650"
            />
          </div>
        </div>
      </section>

      <section className="section about-page-story">
        <div className="about-page-story-layout">
          <div className="about-page-story-content">
            <h2>Our Story</h2>
            <p>
              Nigeria has one of the largest youth populations in the world, with
              millions of young people under 30 carrying immense creativity and
              potential. Yet many continue to face poverty, limited access to
              quality development systems, and unstable employment pathways.
              Too often, high-potential individuals are overlooked because they
              are disconnected from visibility networks and structured support.
            </p>
            <p>
              Talent Search Initiative was created to change this reality. We
              identify gifted boys and girls from street environments, community
              fields, and underprivileged neighborhoods, then bring them into a
              clear development pathway that combines athletic growth with life
              skills, mentorship, educational support, and access to trusted
              opportunities.
            </p>
            <p>
              Our objective is long-term impact: to help participants build
              confidence, capability, and direction while enabling clubs,
              academies, and employers to discover skilled and motivated talent.
            </p>
          </div>
          <div className="about-page-story-media" aria-hidden="true">
            <img
              src="/2.png"
              alt=""
              loading="lazy"
              decoding="async"
              width="640"
              height="420"
            />
          </div>
        </div>
      </section>

      <section className="section about-page-pillars">
        <h2>What We Do</h2>
        <div className="about-pillars-grid">
          {aboutPillars.map((pillar) => (
            <article className="about-pillar-card" key={pillar.title}>
              <h3>{pillar.title}</h3>
              <p>{pillar.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section about-page-founders">
        <h2>Meet Our Founders</h2>
        <div className="about-founders-grid">
          {founders.map((founder) => (
            <article className="about-founder-card" key={founder.email}>
              <h3>{founder.name}</h3>
              <p>{founder.role}</p>
              <a href={`mailto:${founder.email}`}>{founder.email}</a>
            </article>
          ))}
        </div>
      </section>

      <section className="section about-page-cta">
        <h2>Work With Us</h2>
        <p>
          If you are a partner organisation, academy, sponsor, or volunteer,
          we welcome collaboration that expands access, strengthens
          development, and creates measurable career outcomes.
        </p>
        <div className="live-actions">
          <a className="cta" href="/become-a-partner">Contact Team</a>
          <a className="ghost" href="/">Back To Home</a>
        </div>
      </section>
    </main>
  )
}

