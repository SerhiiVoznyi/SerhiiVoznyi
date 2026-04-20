import './home.sass'

import { Article, Section } from '../../components'
import { Link } from 'react-router-dom'

import * as routing from '../../config/routing'
import { HomeBanner } from './HomeBanner/HomeBanner'

export const Home = () => {
  return (
    <Article keyId="app-page-home">
      <HomeBanner />
      <Section flex>
        <h1
          className="text-bold"
          style={{ color: 'white' }}>
          Personal blog by <span className="text-decorated">Serhii Voznyi</span>
        </h1>
        <p style={{ color: 'white', maxWidth: '36rem' }}>
          A quiet place for writing, experiments, and longer-form notes. New posts will show up on
          the blog when they are ready.
        </p>
        <p>
          <Link
            to={routing.blog.path}
            style={{ color: 'white', textDecoration: 'underline' }}>
            Go to blog →
          </Link>
        </p>
      </Section>
      <Section></Section>
    </Article>
  )
}
