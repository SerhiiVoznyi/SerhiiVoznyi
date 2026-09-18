import './home.sass'

import { Anchor, Button, Group, Text, Title } from '@mantine/core'

const PROFILE = {
  name: 'Serhii Voznyi',
  role: 'Lead Software Engineer · .NET / AWS Architect',
  location: 'Wrocław, Poland',
  summary:
    'I design and deliver scalable backend systems, cloud-native applications, and clean architectures — across hands-on development, architecture, and team leadership.',
  about:
    'Lead Software Engineer with 12+ years building enterprise software with .NET, C#, and modern cloud platforms (AWS, Azure). I help teams ship systems that scale and evolve without breaking.',
  focus: [
    'Scalable backend and cloud architectures for high-load platforms',
    'Distributed systems with .NET and AWS — serverless, containers, events',
    'Legacy modernization into maintainable, service-oriented platforms',
    'Mentoring engineers and owning technical direction',
  ],
  stack: ['C#', '.NET', 'ASP.NET Core', 'AWS', 'Azure', 'Distributed Systems'],
  links: {
    linkedIn: 'https://www.linkedin.com/in/serhii-voznyi/',
    gitHub: 'https://github.com/SerhiiVoznyi',
    email: 'mailto:serhiivoznyi@gmail.com',
  },
} as const

export const HomePage = () => {
  return (
    <div className="home">
      <header className="home-hero">
        <p className="home-hero__location">{PROFILE.location}</p>
        <Title
          order={1}
          className="home-hero__name">
          {PROFILE.name}
        </Title>
        <p className="home-hero__role">{PROFILE.role}</p>
        <Text className="home-hero__summary">{PROFILE.summary}</Text>
        <Group
          className="home-hero__actions"
          gap="sm">
          <Button
            component="a"
            href={PROFILE.links.linkedIn}
            target="_blank"
            rel="noreferrer"
            className="home-hero__cta home-hero__cta--primary">
            LinkedIn
          </Button>
          <Button
            component="a"
            href={PROFILE.links.gitHub}
            target="_blank"
            rel="noreferrer"
            variant="outline"
            className="home-hero__cta">
            GitHub
          </Button>
          <Button
            component="a"
            href={PROFILE.links.email}
            variant="subtle"
            className="home-hero__cta">
            Email
          </Button>
        </Group>
      </header>

      <section
        className="home-section"
        aria-labelledby="about-heading">
        <Title
          order={2}
          id="about-heading"
          className="home-section__title">
          About
        </Title>
        <Text className="home-section__body">{PROFILE.about}</Text>
      </section>

      <section
        className="home-section"
        aria-labelledby="focus-heading">
        <Title
          order={2}
          id="focus-heading"
          className="home-section__title">
          What I do
        </Title>
        <ul className="home-focus">
          {PROFILE.focus.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section
        className="home-section"
        aria-labelledby="stack-heading">
        <Title
          order={2}
          id="stack-heading"
          className="home-section__title">
          Primary stack
        </Title>
        <ul className="home-stack">
          {PROFILE.stack.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section
        className="home-section home-section--connect"
        aria-labelledby="connect-heading">
        <Title
          order={2}
          id="connect-heading"
          className="home-section__title">
          Connect
        </Title>
        <Text className="home-section__body">
          Happy to talk about architecture, .NET / AWS platform work, or engineering leadership.
        </Text>
        <nav
          className="home-connect"
          aria-label="Social links">
          <Anchor
            href={PROFILE.links.linkedIn}
            target="_blank"
            rel="noreferrer">
            LinkedIn
          </Anchor>
          <Anchor
            href={PROFILE.links.gitHub}
            target="_blank"
            rel="noreferrer">
            GitHub
          </Anchor>
          <Anchor href={PROFILE.links.email}>Email</Anchor>
        </nav>
      </section>
    </div>
  )
}
