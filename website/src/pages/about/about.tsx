import './about.sass'

import { Article, Brand, Section } from '../../components'

const About = () => {
  return (
    <Article keyId="app-page-about">
      <h1>
        About <Brand />
      </h1>

      <Section title="Hello">
        This site is my personal blog: a space to share what I am learning, building, and thinking
        about. The layout and tooling are intentionally minimal while the content grows.
      </Section>

      <Section title="This site">
        Pages and navigation may change as I add posts, projects, and integrations. If something
        looks unfinished, it probably is — check back later.
      </Section>

      <Section title="Colophon">
        Built with React, Vite, and Mantine. Hosted and deployed like any other small static or
        SPA site — details can land here when they are worth documenting.
      </Section>
    </Article>
  )
}

export { About }
